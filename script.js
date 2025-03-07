document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const forgotForm = document.getElementById("forgotForm");
  const signupLink = document.getElementById("signupLink");
  const loginLink = document.getElementById("loginLink");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");
  const backToLoginLink = document.getElementById("backToLoginLink");
  const submitButton = document.getElementById("submit");
  const quizForm = document.getElementById("quizForm");
  const quizContainer = document.getElementById("quiz-container");
  const scoreContainer = document.getElementById("score-container");

  // Toggle forms
  signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms(signupForm);
  });

  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms(loginForm);
  });

  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms(forgotForm);
  });

  backToLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms(loginForm);
  });

  // Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      alert("Login successful!");
      window.location.href = "quiz.html";
    } else {
      alert("Invalid email or password.");
    }
  });

  // Sign up
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === email)) {
      alert("Email already registered.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign-up successful! Please log in.");
    toggleForms(loginForm);
  });

  // Forgot password
  forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("forgotEmail").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email);

    if (user) {
      alert("A reset link has been sent to your email.");
    } else {
      alert("Email not found.");
    }
  });

  // Start quiz
  if (submitButton) {
    submitButton.addEventListener("click", () => {
      const topic = document.getElementById("topics").value;
      const difficulty = document.getElementById("difficulty").value;
      const numQuestions = parseInt(document.getElementById("numQuestions").value, 10);

      if (!topic || !difficulty || !numQuestions) {
        alert("Please fill all fields.");
        return;
      }

      // Fetch questions dynamically from local storage
      const questions = JSON.parse(localStorage.getItem("questions")) || [];
      const filteredQuestions = questions.filter(
        (q) => q.topic === topic && q.difficulty === difficulty
      );

      if (filteredQuestions.length < numQuestions) {
        alert("Not enough questions available.");
        return;
      }

      // Start the quiz
      startQuiz(filteredQuestions.slice(0, numQuestions), difficulty);
    });
  }

  function startQuiz(questions, difficulty) {
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    const questionTime = difficulty === "beginner" ? 20 : difficulty === "average" ? 30 : 60;

    quizForm.style.display = "none";
    quizContainer.style.display = "block";

    const displayQuestion = () => {
      if (currentQuestionIndex >= questions.length) {
        clearInterval(timer);
        showScore(score, questions.length);
        return;
      }

      const question = questions[currentQuestionIndex];
      document.getElementById("quiz-title").innerText = question.topic;
      document.getElementById("question").innerText = question.question;
      const answersDiv = document.getElementById("answers");
      answersDiv.innerHTML = "";
      question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.className = "btn";
        button.addEventListener("click", () => {
          clearInterval(timer);
          if (index === question.correct) {
            score++;
            button.classList.add("correct");
          } else {
            button.classList.add("incorrect");
          }

          setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
          }, 1000);
        });
        answersDiv.appendChild(button);
      });

      startTimer(questionTime);
    };

    const startTimer = (time) => {
      const timerElement = document.getElementById("timer");
      timerElement.innerText = `Time: ${time}s`;
      timer = setInterval(() => {
        time--;
        timerElement.innerText = `Time: ${time}s`;
        if (time <= 0) {
          clearInterval(timer);
          currentQuestionIndex++;
          displayQuestion();
        }
      }, 1000);
    };

    displayQuestion();
  }

  function showScore(score, total) {
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    document.getElementById("score").innerText = `${score} / ${total}`;
  }

  function toggleForms(activeForm) {
    [loginForm, signupForm, forgotForm].forEach((form) => form.classList.remove("active"));
    activeForm.classList.add("active");
  }
});
