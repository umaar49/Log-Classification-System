# Log-Classification-System
An intelligent, multi-layered log analysis platform that leverages Natural Language Processing (NLP) and Generative AI to automate the categorization of system logs. This project demonstrates a hybrid classification pipeline designed for high performance and accuracy in DevOps and Cybersecurity monitoring.

---
# 🚀 Deployment

- Backend: Developed with FastAPI and containerized with Docker.

- Hosting: Deployed on Hugging Face Spaces for robust model serving.

- Frontend: Built with React.js and hosted on Vercel.

---

# 💡 Importance of the Project
In modern cloud environments, systems generate millions of log entries daily. Manually identifying critical errors among thousands of "Info" messages is impossible.

- Operational Efficiency: Reduces the time taken to identify root causes of system failures.

- Scalability: Processes large CSV datasets in seconds.

- Hybrid Intelligence: Combines the speed of traditional rules with the deep understanding of modern AI.

---

# 🧠 The Classification Pipeline
This project utilizes a unique three-tier approach to process logs, ensuring that every message is handled by the most appropriate technology:

## 1. Simple Regex (Rule-Based)
- Purpose: Instant filtering.

- How it works: Uses predefined patterns to immediately catch common log signatures (e.g., standard "Status 200" or   "Heartbeat" signals). This layer saves computational power by handling the easiest tasks first.

## 2. BERT (Machine Learning)
- Purpose: Deep semantic classification.

- How it works: A fine-tuned BERT (Bidirectional Encoder Representations from Transformers) model processes the logs. Unlike simple keyword matching, BERT understands the context and relationship between words in a log message, accurately distinguishing between complex "Warning" and "Error" states.

## 3. LLM - GenAI (Generative Intelligence)
- Purpose: Handling ambiguity and complex reasoning.

- How it works: For logs that are highly unusual or require deep reasoning, the system leverages Large Language Models (Google Gemini API). The LLM acts as the "final judge," providing a human-like understanding of rare edge cases.

---

# 🛠️ Technical Stack
## Backend
- Framework: FastAPI (Python)

- ML Libraries: PyTorch (CPU), Transformers (Hugging Face), Scikit-learn

- Data Handling: Pandas, Joblib

- Containerization: Docker

## Frontend
- Framework: React.js

- Styling: Modern CSS-in-JS with high-performance animations

- API Integration: Environment-aware Fetch API

---

# 🎓 Acknowledgments & Disclaimer
- Educational Purpose: This project was developed as an educational initiative to explore the integration of classical NLP and modern Generative AI within a DevOps context.

- Credits: A special thanks to Codebasics for providing the foundational guidance and inspiration that helped bring the logic of this hybrid classification system to life.

---

# Live Demo

- https://log-classification-system.vercel.app/
