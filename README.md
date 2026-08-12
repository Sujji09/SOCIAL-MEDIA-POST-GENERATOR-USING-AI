# Social Media Post Generator using AI

An AI-powered web application that generates platform-specific social media posts from a single piece of raw content. Users can provide text, select their preferred social media platforms, and generate customized posts using the Google Gemini API.

## 🚀 Features

* Generate social media posts using AI
* Convert raw text into platform-specific content
* Support for:

  * LinkedIn
  * Instagram
  * Twitter
* Generate posts for multiple platforms at once
* Display generated content in separate platform cards
* Copy generated posts to the clipboard
* Clear input and generated content
* Loading and error states for API requests
* Responsive and simple user interface

## 🛠️ Technologies Used

* **React.js** – Frontend application
* **JavaScript (ES6+)** – Application logic
* **Vite** – Development and build tooling
* **CSS** – User interface styling
* **Google Gemini API** – AI-powered content generation

## 📂 Project Structure

```text
Demo/
├── public/
├── src/
│   ├── Components/
│   │   ├── Homepage.jsx
│   │   └── Homepage.css
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⚙️ How It Works

The application follows a simple workflow:

```text
User enters raw content
        ↓
Selects social media platforms
        ↓
React prepares the request
        ↓
Google Gemini API
        ↓
AI generates platform-specific posts
        ↓
JSON response is parsed
        ↓
Posts are displayed by platform
        ↓
User can copy the generated content
```

## 🤖 AI Integration

The application uses the **Google Gemini API** to transform raw text into social media content.

The application sends the user's input along with the selected platforms and instructs the model to return structured JSON containing the platform name and generated post.

Example response format:

```json
[
  {
    "platform": "Linkedin",
    "post": "Generated LinkedIn post..."
  },
  {
    "platform": "Instagram",
    "post": "Generated Instagram post..."
  }
]
```

The application then parses the response and displays each generated post separately.

## 💻 Getting Started

### Prerequisites

Make sure you have:

* Node.js installed
* npm installed
* A Google Gemini API key

### Installation

Clone the repository:

```bash
git clone https://github.com/Sujji09/SOCIAL-MEDIA-POST-GENERATOR-USING-AI.git
```

Navigate to the Demo application:

```bash
cd SOCIAL-MEDIA-POST-GENERATOR-USING-AI/Demo
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## 🔐 API Key Configuration

The Gemini API key should **never be hard-coded into the source code or committed to a public repository**.

For a production-ready implementation, store the API key securely using environment variables and move API communication to a backend/server-side layer.

Example:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

> Never commit your real API key to GitHub.

## 📌 Key Components

### `Homepage.jsx`

The main application component responsible for:

* Managing user input
* Managing selected platforms
* Calling the Gemini API
* Processing AI responses
* Parsing generated JSON
* Displaying generated posts
* Copying generated content
* Clearing the form
* Handling loading and error states

### `App.jsx`

Acts as the root React component and renders the main homepage.

### `Homepage.css`

Contains the styling for the social media post generator interface.

## 🎯 Use Cases

This application can be used for:

* Social media content creation
* Personal branding
* Marketing content generation
* Product announcements
* LinkedIn post creation
* Instagram content ideas
* Twitter/X post generation

## 🔮 Future Improvements

* Add support for additional social media platforms
* Add customizable tone and writing style
* Add post length controls
* Add hashtags and keyword generation
* Add post history and saved drafts
* Add user authentication
* Move AI requests to a secure backend
* Add scheduling and publishing capabilities
* Add analytics for generated content

## 📄 License

This project is available for educational and personal use.
