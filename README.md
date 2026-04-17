# 📚 My Vocabulary Dictionary Web App

A modern, full-featured Vocabulary Dictionary Web Application built with **ReactJS, Tailwind CSS, Firebase Authentication, and Google Sheets API**.  
This project allows users to explore vocabulary words while providing an admin panel for managing the entire dictionary dynamically.

---

## 🚀 Live Features

### 👀 User Features
- Browse vocabulary words
- Search words by:
  - English word
  - Bangla meaning
  - Synonyms
- View detailed word information:
  - Definition
  - Bangla meaning
  - Synonyms & Antonyms
  - Example sentences
- Responsive UI (Mobile, Tablet, Desktop)

---

### 🔐 Admin Features (Protected)
- Google Gmail Authentication
- Private Admin Dashboard
- Add new vocabulary words
- Edit existing words
- Delete words
- Manage Google Sheets data
- View total vocabulary count

---

## 🛠️ Tech Stack

### Frontend
- ReactJS (Vite)
- Tailwind CSS
- React Router DOM
- React Icons

### Backend (Serverless)
- Google Sheets (Database)
- Google Apps Script API

### Authentication
- Firebase Authentication (Google Sign-In)

### State Management
- Custom React Hooks (Context-based Data Provider)

---

## 📊 Database Structure (Google Sheets)

Create a Google Sheet with the following structure:

| id | word | definition | bangla | synonyms | antonyms | example |
|----|------|------------|--------|----------|-----------|----------|

### Example:

| 1 | Abundant | Existing in large amounts | প্রচুর | Plenty, Ample | Scarce | Food was abundant |

---

## 🔌 Google Apps Script API

### Required Endpoints

#### 📥 Get All Words
- Method: `GET`
- Returns: JSON list of vocabulary

#### ➕ Insert Word
- Method: `POST`
- Adds new vocabulary entry

#### ✏️ Update Word
- Method: `POST`
- Updates existing word

#### ❌ Delete Word
- Method: `POST`
- Deletes word from sheet

---

## 🔥 Firebase Authentication

- Google Sign-In Only
- Admin-only access control

### Allowed Admin Emails:
```js
const adminEmails = [
  "ashikali0204@gmail.com",
];