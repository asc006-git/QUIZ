<p align="center">
<svg width="100%" height="280" viewBox="0 0 1280 280" xmlns="http://www.w3.org/2000/svg">

<style>

@keyframes pulse {
0% {opacity:0.3;}
50% {opacity:1;}
100% {opacity:0.3;}
}

@keyframes glow {
0% {text-shadow:0 0 5px #00c8ff;}
50% {text-shadow:0 0 20px #00c8ff;}
100% {text-shadow:0 0 5px #00c8ff;}
}

.node {
animation:pulse 4s infinite;
fill:#00c8ff;
}

.title {
font-family:Arial, sans-serif;
font-size:52px;
font-weight:bold;
fill:#00c8ff;
animation:glow 3s infinite;
}

.subtitle {
font-family:Arial, sans-serif;
font-size:26px;
fill:white;
}

.tagline {
font-family:Arial, sans-serif;
font-size:18px;
fill:#7fdfff;
}

</style>

<rect width="1280" height="280" fill="#0b0f14"/>

<!-- connections -->
<g stroke="#1fa3d8" stroke-width="1" opacity="0.4">
<line x1="100" y1="60" x2="300" y2="120"/>
<line x1="300" y1="120" x2="500" y2="70"/>
<line x1="500" y1="70" x2="700" y2="130"/>
<line x1="700" y1="130" x2="900" y2="80"/>
<line x1="900" y1="80" x2="1100" y2="140"/>
</g>

<!-- nodes -->
<circle class="node" cx="100" cy="60" r="4"/>
<circle class="node" cx="300" cy="120" r="4"/>
<circle class="node" cx="500" cy="70" r="4"/>
<circle class="node" cx="700" cy="130" r="4"/>
<circle class="node" cx="900" cy="80" r="4"/>
<circle class="node" cx="1100" cy="140" r="4"/>

<!-- text -->
<text x="640" y="110" text-anchor="middle" class="subtitle">
Hey! I am
</text>

<text x="640" y="170" text-anchor="middle" class="title">
ADHYATMA SINGH CHAUHAN
</text>

<text x="640" y="210" text-anchor="middle" class="tagline">
AI Systems • Backend • Security
</text>

</svg>
</p>


Coding Quiz Website

Welcome to Coding Quiz, a basic quiz website where users can sign up, log in, and attempt quizzes based on selected topics and difficulty levels.  
This project is built using **HTML, CSS, and JavaScript**, and uses **localStorage** for handling user authentication and quiz question management.

✨ Features

- **User Authentication**  
  - Sign Up with Name, Email, and Password
  - Log In using registered credentials
  - Forgot Password flow (mocked with a simple alert)

- **Quiz Functionality**
  - Select quiz topic (Arrays, Linked Lists, Graphs)
  - Choose difficulty level (Beginner, Average, Hard)
  - Select the number of questions
  - Timed quiz based on selected difficulty
  - Score display at the end of the quiz

- **Local Storage Integration**
  - Stores user accounts and quiz questions
  - Fetches quiz questions dynamically based on user selection

- **Additional Features**
  - Timer for each question
  - Immediate feedback on correct/incorrect answers
  - Sound effects for correct and wrong answers
  - Fun glitter effect on the final score page

## Getting Started

To run the project locally:

1. **Clone the Repository**
   bash
   git clone https://github.com/asc006-git/QUIZ.git
   cd coding-quiz

2. **Open index.html in your browser to start.

> No server setup required — it is a pure frontend project!

## 🛠️ Built With

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **LocalStorage API**

Pull requests are welcome!  
If you find any bugs or have suggestions for improvements, feel free to open an issue.
