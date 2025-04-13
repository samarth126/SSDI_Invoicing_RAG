import json
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.docstore.document import Document

# Load JSON
with open("JcPreInvoice_pdf.json") as f:
    data = json.load(f)

# Convert JSON to text (flatten each field as one string entry)
texts = []
for item in data["headerFields"]:
    line = f"{item['label']}: {item['value']}"
    texts.append(line)

# Split text using LangChain's text splitter
text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
docs = [Document(page_content=text) for text in texts]
split_docs = text_splitter.split_documents(docs)

# Initialize HuggingFace Embeddings (use a lightweight embedding model if needed)
embedding_model_name = "sentence-transformers/all-MiniLM-L6-v2"
embedding_model = HuggingFaceEmbeddings(model_name=embedding_model_name)

# Create FAISS vector DB
db = FAISS.from_documents(split_docs, embedding_model)
db.save_local("faiss_index")
print("✅ FAISS index created and saved.")
