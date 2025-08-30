# Anime Recommendation System

A full-stack machine learning project that recommends anime titles to users based on their preferences, using collaborative filtering with TensorFlow. The system is divided into three main modules: Training, Backend, and Frontend.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Acknowledgments](#acknowledgments)

---

## Features

- **Collaborative Filtering:** Personalized recommendations using TensorFlow embeddings.
- **REST API:** Backend exposes endpoints for recommendation queries.
- **Modern Web UI:** React + Vite frontend for user interaction.

---

## Architecture

1. **Training ([Training](Training))**
   - Preprocesses anime/user data.
   - Trains collaborative filtering model.
   - Saves model weights.

2. **Backend ([Backend](Backend))**
   - Loads trained model ([`cfmodel.py`](Backend/cfmodel.py)).
   - Serves recommendations via API ([`main.py`](Backend/main.py)).
   - Uses CSV files for anime/user data.

3. **Frontend ([Frontend](Frontend))**
   - React-based UI ([`App.jsx`](Frontend/src/App.jsx)).
   - Fetches recommendations from backend.
   - Displays results interactively.

---

## Project Structure

```
Anime_Recommendation/
├── Backend/
│   ├── anime.csv
│   ├── anime_images.csv
│   ├── anime_list.csv
│   ├── anime.keras
│   ├── cfmodel.py
│   ├── main.py
│   ├── poster.csv
│   └── userlist.csv
├── Frontend/
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── Components/
│   │       ├── Recommend.jsx
│   │       ├── autosearch.jsx
│   │       └── AnimatedList.jsx
├── Training/
│   ├── Main.ipynb
│   └── train.py
├── readme
└── .gitignore
```

---

## Setup & Installation

### 1. Clone the repository

```sh
git clone https://github.com/Vidit-01/Anime_Recommendation.git
cd Anime_Recommendation
```

### 2. Python Environment (Backend & Training)

```sh
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt  # Add requirements.txt if missing
```

### 3. Train the Model

```sh
cd Training
python untitled1.py  # Or run the notebook for training
```

### 4. Start Backend API

```sh
cd ../Backend
python main.py
```

### 5. Start Frontend

```sh
cd ../Frontend
npm install
npm run dev  # Or npm start
```

---

## Usage

1. **Train the model** (if starting fresh).
2. **Start the backend server**.
3. **Launch the frontend** (`npm run dev`).
4. **Interact via UI**: Input anime preferences, get recommendations.

---

## Future Enhancements

- Hybrid filtering (collaborative + content-based)
- User feedback for improved recommendations
- Advanced models (GNNs, transformers)
- Dockerization and cloud deployment
- Enhanced UI/UX features

---

## Acknowledgments

- Inspired by open-source anime recommendation systems and collaborative filtering research.
- Built with TensorFlow, Flask/FastAPI, React, and Vite.

---

**Feel free to update this README with dataset sources, API details, screenshots, or contribution guidelines as