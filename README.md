# 🧠 Smart Summary AI – Chrome Extension

[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/in/java/technologies/downloads/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://web.dev/learn/css)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white)](https://www.jetbrains.com/idea/)
[![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions)
[![Gemini API](https://img.shields.io/badge/Google%20Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)]()




Smart Summary AI is a Chrome Extension that automatically summarizes selected text from any webpage using Google Gemini AI. Users can also save important summaries as notes stored securely in Chrome Storage.

---

## 🖼 Screenshot Preview
<div align="center">
  <img src="assets/readme/demoSC.png" width="400">
  <img src="assets/readme/historySC.png" width="400">
</div>

---

## 🚀 Features

- ✅ AI-powered text summarization using **Google Gemini API**
- ✅ Smart **history tracking system** to view all past summaries and suggestions
- ✅ **Markdown rendering** for beautifully formatted AI responses
- ✅ Save and manage **personal research notes** for future reference
- ✅ Notes persist in **Chrome local storage**
- ✅ Fast, responsive, and lightweight **React (Vite)** frontend
- ✅ Secure and scalable **Spring Boot + MySQL** backend
- ✅ Real-time integration between browser extension and backend API
- ✅ Works seamlessly on **any website**


---

## ⚙️ How It Works

1. Select any text on a webpage  
2. Click the **Summary AI** browser extension icon  
3. Choose **Summarize** or **Suggest** based on your need  
4. The selected text is sent to the **Spring Boot backend**, which calls **Google Gemini API** to generate a response  
5. The generated summary is **saved to the MySQL database**  
6. The summarized content is instantly displayed in the **extension panel**  
7. All results are stored and can be **viewed later in the History section**  
8. Optionally, save any response as a **personal note** in Chrome local storage  


---

## 📝 Notes Panel

- View all saved summaries
- Delete or copy notes anytime
- Notes persist after browser restart

---

## 🕒 History Panel

- Automatically stores all past summaries and suggestions  
- View detailed responses with a single click  
- Expand or collapse individual history items for clarity  
- Data is securely saved in the MySQL database  
- Quickly revisit or reuse any previous summary  

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
6. Click **Load unpacked** and select `dist` folder inside `Frontend` folder  
7. Select text → Click Extension → select `Summarize` or `Suggest`

---

## 🤝 Contributing

PRs and feature requests are welcome!  
Feel free to star ⭐ the project if you like it!

---

## 📄 License

Distributed under the **MIT License**.