
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load FAISS index
embedding_model_name = "sentence-transformers/all-MiniLM-L6-v2"
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db = FAISS.load_local("faiss_index", embeddings=embedding_model,allow_dangerous_deserialization=True)

# Ask a question
query = "What is the gross amount and who is the receiver?"

# Retrieve relevant context
docs = db.similarity_search(query, k=3)
context = "\n".join([doc.page_content for doc in docs])

# Load Qwen model and tokenizer
model_name = "Qwen/Qwen-7B"
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(model_name, trust_remote_code=True).half().cuda()
model.eval()

# Generate prompt for LLM
prompt = f"""Answer the question based on the following context:\n{context}\n\nQuestion: {query}\nAnswer:"""
inputs = tokenizer(prompt, return_tensors="pt").to("cuda")

# Generate output
with torch.no_grad():
    output = model.generate(**inputs, max_new_tokens=100)
    answer = tokenizer.decode(output[0], skip_special_tokens=True)

print("Answer:\n", answer)
