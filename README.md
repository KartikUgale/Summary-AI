# 🧠 Smart Summary AI – Chrome Extension

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![Gemini API](https://img.shields.io/badge/Google%20Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)




Smart Summary AI is a Chrome Extension that automatically summarizes selected text from any webpage using Google Gemini AI. Users can also save important summaries as notes stored securely in Chrome Storage.

---

## 🖼 Screenshot Preview
<div align="center">
  <img src="Frontend/sc.png" width="400">
</div>

---

## 🚀 Features

- ✅ AI-powered text summarization using `Gemini API`
- ✅ Save summaries as notes for future reference
- ✅ Notes persist in Chrome storage
- ✅ Fast and lightweight UI using React (Vite)
- ✅ Works on all websites
- ✅ Spring Boot backend for secure API calls

---

## ⚙️ How It Works

1. Select any text on a webpage  
2. Click the extension icon  
3. click summarize / suggest button according to need
4. Text is sent to backend → Gemini AI generates summary  
5. View summary in extension panel  
6. Save summary as note if needed 

---

## 📝 Notes Panel

- View all saved summaries
- Delete or copy notes anytime
- Notes persist after browser restart

---

## 🔑 Environment Variables

Add Gemini API key into Spring Boot environment:

```
gemini.api.url=${GEMINI_URL}
gemini.api.key=${GEMINI_KEY}
```
---

## ▶️ Installation & Usage

1. Clone this repo  
2. Configure Gemini API key in backend  
3. Run the backend server  
4. Go to `chrome://extensions/`  
5. Enable **Developer Mode**  
6. Click **Load unpacked** and select `frontend` folder  
7. Select text → Click Extension → select `Summarize` or `Suggest`

---

## 🤝 Contributing

PRs and feature requests are welcome!  
Feel free to star ⭐ the project if you like it!

---

## 📄 License

Distributed under the **MIT License**.