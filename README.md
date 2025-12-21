# Pokémon Memory Card Game (Jeu de mémorisation) ⚛️
A full responsive React memory card game built with React hooks and external API data fetching, developed as part of The Odin Project JavaScript/React curriculum. This project demonstrates the use of side effects (useEffect), state management, and API integration to build an interactive, data-driven frontend. 

## 🚀 Project Summary
This application presents a memory card matching game where:
- Pokémon data (images and names) are fetched from a public API
- Cards are displayed in a randomized layout each game
- The player selects cards to find matching pairs
- The game tracks score and best score
- The layout updates dynamically based on user interactions and API data
The game uses React state hooks (useState, useEffect) and properly handles side effects to fetch and manage asynchronous data. 

 ## 🎨 Live preview
 [Try the game (Jouer)](https://testyourmemo.netlify.app/)


## ✨ Key Concepts & Learnings
1. 🌐 API Consumption & Asynchronous Logic
- Fetching data from an external API (e.g., Pokémon API)
- Handling API responses and storing them in component state
- Updating UI based on fetched JSON data
- Displaying dynamic images and info from real API data 

2. 📌 Managing Side Effects with useEffect
- Using useEffect to trigger API fetch on component mount
- Understanding dependency arrays to control when effects run
- Separating side-effect logic from render logic
- Cleaning up or re-fetching when needed for replay functionality 

3. 📊 State Management
- Using useState to track game state, score, and game progress
- Updating state safely without re-render loops
- Managing complex state transitions from user interactions

## 📁 Project structure
```
.
├── README.md
├── dist/
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   ├── components/
│   ├── index.css
│   ├── main.jsx
│   ├── services
│   └── styles/
└── vite.config.js
```
## 🏁 Conclusion
The Pokémon Memory Card project helped me refine my skills in React hooks (useEffect, useState), fetching and integrating API data, and managing asynchronous logic in an interactive UI. Working with real API data marked an important step toward building dynamic, data-driven applications in React.
