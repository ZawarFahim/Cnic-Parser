# CNIC.io Backend Foundation

This is the FastAPI backend foundation for **CNIC.io** (AI-based Pakistani CNIC Parser). It exposes a production-ready folder structure, environment configuration, health check routing, MongoDB connection helpers (using Motor/pymongo), and standard Pydantic validation schemas.

---

## 🛠️ Tech Stack

| Layer             | Technology                 |
|-------------------|----------------------------|
| Framework         | FastAPI                    |
| ASGI Server       | Uvicorn                    |
| Database Driver   | Motor (Async MongoDB)      |
| Validation        | Pydantic v2                |
| Configuration     | Pydantic Settings          |

---

## 📁 Project Structure

```
├── app/
│   ├── core/
│   ├── models/
│   │   ├── __init__.py
│   │   └── cnic_model.py          # MongoDB document definitions
│   ├── routes/
│   │   ├── __init__.py
│   │   └── extract.py             # POST /extract route logic (dummy response)
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── request_schema.py      # Request schemas
│   │   └── response_schema.py     # Response schemas
│   ├── services/
│   │   ├── __init__.py
│   │   └── database_service.py    # db queries (save_record, get_record, etc.)
│   ├── config.py                  # Pydantic BaseSettings config
│   ├── database.py                # MongoDB setup & lifecycle events
│   └── main.py                    # Root FastAPI app initiation
├── .env.example
├── requirements.txt
├── vercel.json                    # Deployment config for Vercel
└── README.md
```

---

## 🚀 Setup & Installation

### 1. Prerequisites
Ensure you have Python 3.10+ installed.

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in the required keys:
```bash
cp .env.example .env
```
Provide your actual `MONGODB_URI` and `GEMINI_API_KEY`.

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Dev Server
```bash
uvicorn app.main:app --reload
```
The server will run on [http://localhost:8000](http://localhost:8000).

---

## 🔌 API Endpoints

- **GET `/`**: Returns base root metadata.
- **GET `/health`**: Health status of the server and active MongoDB connection.
- **POST `/extract`**: Upload a JPEG/PNG image to parse. Currently returns a mock Pakistani CNIC structure and saves it to MongoDB.

---

## 📄 License

MIT © CNIC.io
