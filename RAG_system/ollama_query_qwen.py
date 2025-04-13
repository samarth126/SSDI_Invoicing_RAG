import requests
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

# Load FAISS vector DB
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db = FAISS.load_local("faiss_index", embeddings=embedding_model, allow_dangerous_deserialization=True)

# Ask your query
query = "how many people are from GUJARAT"

# Perform similarity search
docs = db.similarity_search(query, k=3)
context = "\n".join([doc.page_content for doc in docs])


prompt = f"""Answer the question based on the following context:\n{context}\n\nQuestion: {query}\nAnswer:"""


response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "qwen2.5:3b", 
        "prompt": prompt,
        "stream": False
    }
)

# Print the answer
answer = response.json()["response"]
print(" Answer:\n", answer)
