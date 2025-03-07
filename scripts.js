document.addEventListener("DOMContentLoaded", function () {
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let questionTime;

    const quizForm = document.getElementById('quizForm');
    const quizContainer = document.getElementById('quiz-container');
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextBtn = document.getElementById('next-btn');
    const timerElement = document.getElementById('timer');
    const scoreContainer = document.getElementById('score-container');
    

    const startQuiz = () => {
        const topic = document.getElementById('topics').value;
        const difficulty = document.getElementById('difficulty').value;
        const numQuestions = document.getElementById('numQuestions').value;

        // Check if questions are stored in localStorage, otherwise use the hardcoded questions
        const storedQuestions = localStorage.getItem('questions');
        const questions = storedQuestions ? JSON.parse(storedQuestions) : [
                {
                    "arrays": [
                      {
                        "difficulty": "Beginner",
                        "questions": [
                          {
                            "question": "What is the time complexity of accessing an element in an array?",
                            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            "answer": "O(1)"
                          },
                          {
                            "question": "Which of the following operations can be performed on an array?",
                            "options": ["Insertion", "Deletion", "Access", "All of the above"],
                            "answer": "All of the above"
                          },
                          {
                            "question": "What is the index of the first element of an array in most programming languages?",
                            "options": ["0", "1", "-1", "None of the above"],
                            "answer": "0"
                          },
                          {
                            "question": "What does an array in C consist of?",
                            "options": ["Homogeneous elements", "Heterogeneous elements", "Objects", "None of the above"],
                            "answer": "Homogeneous elements"
                          },
                          {
                            "question": "Which of the following is true about arrays in memory?",
                            "options": ["Arrays are contiguous blocks of memory", "Arrays are scattered in memory", "Arrays require dynamic memory allocation", "None of the above"],
                            "answer": "Arrays are contiguous blocks of memory"
                          },
                          {
                            "question": "Which of the following operations on arrays has the time complexity O(n)?",
                            "options": ["Search", "Insertion", "Access", "Traversal"],
                            "answer": "Traversal"
                          },
                          {
                            "question": "Which of the following is an advantage of using arrays?",
                            "options": ["Ease of access", "Fixed size", "Memory inefficiency", "None of the above"],
                            "answer": "Ease of access"
                          },
                          {
                            "question": "What will be the output of the following code? int arr[3] = {1, 2, 3}; printf(arr[1]);",
                            "options": ["1", "2", "3", "Error"],
                            "answer": "2"
                          },
                          {
                            "question": "In an array of integers, how can we access the fifth element?",
                            "options": ["arr[5]", "arr[4]", "arr[6]", "arr[3]"],
                            "answer": "arr[4]"
                          },
                          {
                            "question": "Which of the following is a disadvantage of arrays?",
                            "options": ["Fixed size", "Efficient access", "Ease of use", "None of the above"],
                            "answer": "Fixed size"
                          }
                        ]
                      },
                      {
                        "difficulty": "Average",
                        "questions": [
                          {
                            "question": "How do you reverse an array in place in C++?",
                            "options": ["Use a second array", "Swap elements in the original array", "Use a stack", "Use a queue"],
                            "answer": "Swap elements in the original array"
                          },
                          {
                            "question": "What is the time complexity of inserting an element at the beginning of an array?",
                            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            "answer": "O(n)"
                          },
                          {
                            "question": "Which sorting algorithm works efficiently on arrays with few unique elements?",
                            "options": ["Merge Sort", "Quick Sort", "Heap Sort", "Counting Sort"],
                            "answer": "Counting Sort"
                          },
                          {
                            "question": "What is the space complexity of merge sort in the worst case?",
                            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            "answer": "O(n)"
                          },
                          {
                            "question": "Which of the following array operations is costly in terms of time complexity?",
                            "options": ["Push back", "Pop", "Insert at a random position", "Access"],
                            "answer": "Insert at a random position"
                          },
                          {
                            "question": "Which is the most efficient method to find the maximum element in an unsorted array?",
                            "options": ["Linear Search", "Binary Search", "Quick Sort", "Heap Sort"],
                            "answer": "Linear Search"
                          },
                          {
                            "question": "Which of the following is an advantage of using arrays over linked lists?",
                            "options": ["Fixed size", "Dynamic size", "Faster access", "Faster insertions"],
                            "answer": "Faster access"
                          },
                          {
                            "question": "Which algorithm is best for sorting large arrays in terms of time complexity?",
                            "options": ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
                            "answer": "Quick Sort"
                          },
                          {
                            "question": "Given an array of integers, how would you find the subarray with the maximum sum?",
                            "options": ["Kadane's Algorithm", "Merge Sort", "Binary Search", "Bubble Sort"],
                            "answer": "Kadane's Algorithm"
                          },
                          {
                            "question": "What is the worst-case time complexity of quicksort?",
                            "options": ["O(n^2)", "O(n log n)", "O(log n)", "O(n)"],
                            "answer": "O(n^2)"
                          }
                        ]
                      },
                      {
                        "difficulty": "Hard",
                        "questions": [
                          {
                            "question": "In an array of integers, what is the time complexity of finding the kth smallest element using Quickselect?",
                            "options": ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
                            "answer": "O(n)"
                          },
                          {
                            "question": "Which of the following algorithms is used to sort an array in parallel computing environments?",
                            "options": ["Radix Sort", "Merge Sort", "Quick Sort", "All of the above"],
                            "answer": "All of the above"
                          },
                          {
                            "question": "In a binary search algorithm on an array, how many comparisons are needed to search for an element?",
                            "options": ["O(log n)", "O(n)", "O(n^2)", "O(1)"],
                            "answer": "O(log n)"
                          },
                          {
                            "question": "What is the optimal space complexity of merge sort for sorting large arrays?",
                            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            "answer": "O(n)"
                          },
                          {
                            "question": "Which sorting algorithm is the most efficient in terms of average time complexity for large arrays?",
                            "options": ["Merge Sort", "Quick Sort", "Heap Sort", "Bubble Sort"],
                            "answer": "Quick Sort"
                          },
                          {
                            "question": "What is the worst-case time complexity of heap sort?",
                            "options": ["O(n log n)", "O(n^2)", "O(log n)", "O(n)"],
                            "answer": "O(n log n)"
                          },
                          {
                            "question": "What is the time complexity of searching for an element in an unsorted array?",
                            "options": ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
                            "answer": "O(n)"
                          },
                          {
                            "question": "Which of the following techniques is used to solve problems like the knapsack problem efficiently using dynamic programming?",
                            "options": ["Top-down", "Bottom-up", "Greedy algorithm", "Divide and conquer"],
                            "answer": "Bottom-up"
                          },
                          {
                            "question": "What is the time complexity of finding the median in an unsorted array using a median of medians algorithm?",
                            "options": ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"],
                            "answer": "O(n)"
                          },
                          {
                            "question": "What is the primary disadvantage of arrays in terms of space complexity?",
                            "options": ["Waste of space due to fixed size", "Slower access", "Requires dynamic memory", "None of the above"],
                            "answer": "Waste of space due to fixed size"
                          }
                        ]
                      }
                    ],
                    "linked_lists": [
                      {
                        "difficulty": "Beginner",
                        "questions": [
                          {
                            "question": "What is a linked list?",
                            "options": ["A data structure consisting of nodes", "A linear array", "A collection of arrays", "None of the above"],
                            "answer": "A data structure consisting of nodes"
                          },
                          {
                            "question": "Which type of linked list allows traversal in both directions?",
                            "options": ["Singly linked list", "Doubly linked list", "Circular linked list", "None of the above"],
                            "answer": "Doubly linked list"
                          },
                          {
                            "question": "What does a node in a singly linked list contain?",
                            "options": ["Data and pointer to next node", "Data and pointer to previous node", "Only data", "Only pointer to next node"],
                            "answer": "Data and pointer to next node"
                          },
                          {
                            "question": "What is the time complexity of inserting an element at the beginning of a linked list?",
                            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            "answer": "O(1)"
                          },
                          {
                            "question": "Which of the following operations can be done in O(1) time in a singly linked list?",
                            "options": ["Insert at the beginning", "Insert at the end", "Search for an element", "Delete a node at a specific position"],
                            "answer": "Insert at the beginning"
                          },
                          {
                            "question": "What is the space complexity of a singly linked list?",
                            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            "answer": "O(n)"
                          },
                          {
                            "question": "Which of the following is true about a doubly linked list?",
                            "options": ["Each node has two pointers", "Each node has only one pointer", "Traversal is one-way", "None of the above"],
                            "answer": "Each node has two pointers"
                          },
                          {
                            "question": "How do you reverse a singly linked list?",
                            "options": ["Reverse pointers", "Reverse data", "Both of the above", "None of the above"],
                            "answer": "Reverse pointers"
                          },
                          {
                            "question": "Which of the following is a disadvantage of using a linked list over an array?",
                            "options": ["Extra memory for pointers", "Slower access time", "Both of the above", "None of the above"],
                            "answer": "Both of the above"
                          },
                          {
                            "question": "What does the last node of a singly linked list point to?",
                            "options": ["Null", "Head", "Next node", "Previous node"],
                            "answer": "Null"
                          }
                        ]
                      },
                      {
                        "difficulty": "Average",
                        "questions": [
                          {
                            "question": "What is the time complexity of deleting an element from a singly linked list?",
                            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            "answer": "O(n)"
                          },
                          {
                            "question": "Which of the following operations takes O(n) time in a doubly linked list?",
                            "options": ["Search", "Insert at the beginning", "Delete from the end", "None of the above"],
                            "answer": "Search"
                          },
                          {
                            "question": "Which of the following is true about a circular linked list?",
                            "options": ["Last node points to the first node", "Last node points to null", "First node points to null", "None of the above"],
                            "answer": "Last node points to the first node"
                          },
                          {
                            "question": "Which type of linked list can be used for implementing a stack?",
                            "options": ["Singly linked list", "Doubly linked list", "Circular linked list", "All of the above"],
                            "answer": "All of the above"
                          },
                          {
                            "question": "What happens if a linked list is not properly null-terminated?",
                            "options": ["Infinite loop", "Memory leak", "Segmentation fault", "None of the above"],
                            "answer": "Infinite loop"
                          },
                          {
                            "question": "What is the time complexity of searching for an element in a linked list?",
                            "options": ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
                            "answer": "O(n)"
                          },
                          {
                            "question": "Which of the following is true about the insert operation in a doubly linked list?",
                            "options": ["It takes constant time for insertion at both ends", "It takes linear time", "It requires traversal", "None of the above"],
                            "answer": "It takes constant time for insertion at both ends"
                          },
                          {
                            "question": "Which of the following algorithms can be used to detect a loop in a linked list?",
                            "options": ["Floyd’s Cycle Detection", "Binary Search", "Depth-First Search", "Breadth-First Search"],
                            "answer": "Floyd’s Cycle Detection"
                          },
                          {
                            "question": "What is the time complexity of removing a node from a doubly linked list?",
                            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            "answer": "O(1)"
                          },
                          {
                            "question": "In a doubly linked list, what would happen if you forget to update the previous pointer while inserting a new node?",
                            "options": ["Segmentation fault", "Memory leak", "Broken links", "None of the above"],
                            "answer": "Broken links"
                          }
                        ]
                      },
                      {
                        "difficulty": "Hard",
                        "questions": [
                          {
                            "question": "How would you find the middle element of a linked list in O(n) time complexity?",
                            "options": ["By iterating through the list twice", "By using a fast and slow pointer", "By storing all elements in an array", "By using a stack"],
                            "answer": "By using a fast and slow pointer"
                          },
                          {
                            "question": "How would you reverse a doubly linked list in-place?",
                            "options": ["Swap the next and previous pointers of each node", "Only reverse the data", "Create a new linked list and copy data", "None of the above"],
                            "answer": "Swap the next and previous pointers of each node"
                          },
                          {
                            "question": "Which of the following is true about the time complexity of deleting the last element in a doubly linked list?",
                            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            "answer": "O(1)"
                          },
                          {
                            "question": "Which of the following methods would be most efficient for merging two sorted linked lists?",
                            "options": ["Recursion", "Iterative approach", "Using a queue", "None of the above"],
                            "answer": "Iterative approach"
                          },
                          {
                            "question": "In which of the following cases is a linked list a better choice than an array?",
                            "options": ["When you need random access", "When you need fast insertions/deletions", "When you need memory efficiency", "None of the above"],
                            "answer": "When you need fast insertions/deletions"
                          },
                          {
                            "question": "What is the time complexity of deleting a node from a doubly linked list when you have a reference to that node?",
                            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                            "answer": "O(1)"
                          },
                          {
                            "question": "What happens if a doubly linked list is not properly null-terminated?",
                            "options": ["Infinite loop", "Memory leak", "Segmentation fault", "None of the above"],
                            "answer": "Infinite loop"
                          },
                          {
                            "question": "Which algorithm is used to detect the loop in a linked list?",
                            "options": ["Floyd's Tortoise and Hare", "Binary Search", "Merge Sort", "Quick Sort"],
                            "answer": "Floyd's Tortoise and Hare"
                          },
                          {
                            "question": "How would you delete a node from a linked list without having a reference to the head?",
                            "options": ["By passing the pointer to the next node", "By searching the entire list", "By using a stack", "None of the above"],
                            "answer": "By passing the pointer to the next node"
                          },
                          {
                            "question": "How would you merge two sorted singly linked lists in O(n) time?",
                            "options": ["By using recursion", "By iterating through the lists and comparing elements", "By using a priority queue", "None of the above"],
                            "answer": "By iterating through the lists and comparing elements"
                          }
                        ]
                      }
                    ],
                    "graphs": [
                      {
                        "difficulty": "Beginner",
                        "questions": [
                          {
                            "question": "What is a graph?",
                            "options": ["A collection of nodes and edges", "A collection of arrays", "A collection of linked lists", "None of the above"],
                            "answer": "A collection of nodes and edges"
                          },
                          {
                            "question": "Which of the following is true about an undirected graph?",
                            "options": ["Edges do not have a direction", "Each edge has a direction", "Edges are weighted", "None of the above"],
                            "answer": "Edges do not have a direction"
                          },
                          {
                            "question": "What is the degree of a node in a graph?",
                            "options": ["The number of edges connected to the node", "The number of nodes in the graph", "The number of vertices", "None of the above"],
                            "answer": "The number of edges connected to the node"
                          },
                          {
                            "question": "In an adjacency matrix, how are edges represented?",
                            "options": ["By 1 for an edge and 0 for no edge", "By the node number", "By using a pointer", "None of the above"],
                            "answer": "By 1 for an edge and 0 for no edge"
                          },
                          {
                            "question": "Which of the following types of graphs has a direction associated with the edges?",
                            "options": ["Undirected graph", "Directed graph", "Weighted graph", "None of the above"],
                            "answer": "Directed graph"
                          },
                          {
                            "question": "What is a directed acyclic graph (DAG)?",
                            "options": ["A graph with directed edges and no cycles", "A graph with only acyclic edges", "A graph with undirected edges", "None of the above"],
                            "answer": "A graph with directed edges and no cycles"
                          },
                          {
                            "question": "What is a tree?",
                            "options": ["A connected graph with no cycles", "A graph with directed edges", "A graph with only nodes", "None of the above"],
                            "answer": "A connected graph with no cycles"
                          },
                          {
                            "question": "Which algorithm is used to find the shortest path between nodes in an unweighted graph?",
                            "options": ["Dijkstra’s Algorithm", "Bellman-Ford Algorithm", "Breadth-First Search (BFS)", "Depth-First Search (DFS)"],
                            "answer": "Breadth-First Search (BFS)"
                          },
                          {
                            "question": "Which data structure is commonly used to implement a graph?",
                            "options": ["Array", "Linked List", "Hash Table", "Matrix"],
                            "answer": "Matrix"
                          },
                          {
                            "question": "Which of the following is true for a bipartite graph?",
                            "options": ["The graph can be colored with two colors", "The graph has no cycles", "The graph is always directed", "None of the above"],
                            "answer": "The graph can be colored with two colors"
                          }
                        ]
                      },
                      {
                        "difficulty": "Average",
                        "questions": [
                          {
                            "question": "Which algorithm is used to find the shortest path in a weighted graph?",
                            "options": ["Dijkstra’s Algorithm", "Breadth-First Search (BFS)", "Bellman-Ford Algorithm", "Floyd-Warshall Algorithm"],
                            "answer": "Dijkstra’s Algorithm"
                          },
                          {
                            "question": "Which of the following is used to detect cycles in a directed graph?",
                            "options": ["DFS with back edges", "DFS with forward edges", "BFS", "Topological Sort"],
                            "answer": "DFS with back edges"
                          },
                          {
                            "question": "Which algorithm is used to find the minimum spanning tree in a graph?",
                            "options": ["Prim’s Algorithm", "Kruskal’s Algorithm", "Bellman-Ford Algorithm", "A* Algorithm"],
                            "answer": "Prim’s Algorithm"
                          },
                          {
                            "question": "What is the time complexity of performing a BFS on a graph?",
                            "options": ["O(V + E)", "O(V^2)", "O(E^2)", "O(log n)"],
                            "answer": "O(V + E)"
                          },
                          {
                            "question": "Which of the following can be used for searching in a graph?",
                            "options": ["Breadth-First Search", "Depth-First Search", "Both BFS and DFS", "None of the above"],
                            "answer": "Both BFS and DFS"
                          },
                          {
                            "question": "Which of the following is true about a tree?",
                            "options": ["A tree is a special case of a graph", "A tree contains cycles", "A tree has no edges", "None of the above"],
                            "answer": "A tree is a special case of a graph"
                          },
                          {
                            "question": "Which algorithm is used to traverse a graph?",
                            "options": ["DFS", "BFS", "Both DFS and BFS", "None of the above"],
                            "answer": "Both DFS and BFS"
                          },
                          {
                            "question": "Which of the following is true about a complete graph?",
                            "options": ["Every pair of nodes is connected", "No pair of nodes are connected", "It is a tree", "None of the above"],
                            "answer": "Every pair of nodes is connected"
                          },
                          {
                            "question": "Which of the following is a greedy algorithm for graph-based problems?",
                            "options": ["Prim’s Algorithm", "Dijkstra’s Algorithm", "Kruskal’s Algorithm", "All of the above"],
                            "answer": "All of the above"
                          },
                          {
                            "question": "Which of the following algorithms can be used for topological sorting in a directed acyclic graph (DAG)?",
                            "options": ["DFS", "BFS", "Kruskal’s Algorithm", "Dijkstra’s Algorithm"],
                            "answer": "DFS"
                          }
                        ]
                      },
                      {
                        "difficulty": "Hard",
                        "questions": [
                          {
                            "question": "Which of the following is true about Dijkstra’s Algorithm?",
                            "options": ["It can handle negative weight edges", "It finds the shortest path in a graph with positive weights", "It is used for cycle detection", "It can be used on both directed and undirected graphs"],
                            "answer": "It finds the shortest path in a graph with positive weights"
                          },
                          {
                            "question": "What is the time complexity of Dijkstra’s Algorithm using a priority queue?",
                            "options": ["O(V + E log V)", "O(V^2)", "O(E^2)", "O(V log V)"],
                            "answer": "O(V + E log V)"
                          },
                          {
                            "question": "Which of the following is true about Bellman-Ford Algorithm?",
                            "options": ["It works for graphs with negative weight edges", "It works for graphs without negative weight edges", "It is slower than Dijkstra’s Algorithm", "It is only applicable for undirected graphs"],
                            "answer": "It works for graphs with negative weight edges"
                          },
                          {
                            "question": "Which of the following is used to detect negative weight cycles in a graph?",
                            "options": ["Bellman-Ford Algorithm", "Dijkstra’s Algorithm", "Kruskal’s Algorithm", "Floyd-Warshall Algorithm"],
                            "answer": "Bellman-Ford Algorithm"
                          },
                          {
                            "question": "Which of the following algorithms is used to find the strongly connected components of a directed graph?",
                            "options": ["Kosaraju’s Algorithm", "Floyd-Warshall Algorithm", "Dijkstra’s Algorithm", "Kruskal’s Algorithm"],
                            "answer": "Kosaraju’s Algorithm"
                          },
                          {
                            "question": "Which algorithm is used to find the shortest path between all pairs of nodes in a graph?",
                            "options": ["Floyd-Warshall Algorithm", "Bellman-Ford Algorithm", "Dijkstra’s Algorithm", "Prim’s Algorithm"],
                            "answer": "Floyd-Warshall Algorithm"
                          },
                          {
                            "question": "Which of the following is a correct application of a minimum spanning tree?",
                            "options": ["Designing a network of connected cities", "Shortest path finding", "Cycle detection", "Topological sorting"],
                            "answer": "Designing a network of connected cities"
                          },
                          {
                            "question": "Which of the following is true about a strongly connected graph?",
                            "options": ["There is a path between every pair of vertices", "There is no path between every pair of vertices", "It is a tree", "None of the above"],
                            "answer": "There is a path between every pair of vertices"
                          },
                          {
                            "question": "Which of the following algorithms is used for finding the maximum flow in a flow network?",
                            "options": ["Ford-Fulkerson Algorithm", "Bellman-Ford Algorithm", "Kruskal’s Algorithm", "Floyd-Warshall Algorithm"],
                            "answer": "Ford-Fulkerson Algorithm"
                          },
                          {
                            "question": "What is the time complexity of the Floyd-Warshall Algorithm?",
                            "options": ["O(V^3)", "O(V^2)", "O(V^2 + E)", "O(E log V)"],
                            "answer": "O(V^3)"
                          }
                        ]
                      }
                    ]
                  }
        ];

        localStorage.setItem('questions', JSON.stringify(questions));

        if (questions.length === 0) {
            alert("No questions found!");
            return;
        }

        const selectedTopicQuestions = questions[0][topic]; // Select questions based on the topic
        const filteredQuestions = selectedTopicQuestions ? selectedTopicQuestions[0].questions.slice(0, numQuestions) : [];

        if (filteredQuestions.length === 0) {
            alert("No questions available for this topic!");
            return;
        }
        function showQuestion() {
          const questionObj = questions[questionIndex];
          document.getElementById('intro-text').textContent = `Question ${questionIndex + 1}: ${questionObj.question}`;
          const answersContainer = document.getElementById('answers');
          answersContainer.innerHTML = ''; // Clear previous options
          questionObj.answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.textContent = answer;
            btn.className = 'answer-option'; // Add class for styling
            btn.onclick = () => checkAnswer(index);
            answersContainer.appendChild(btn);
          });
        }
        quizForm.style.display = 'none';
        quizContainer.style.display = 'block';

        const loadQuestion = (index) => {
            if (index >= filteredQuestions.length) {
                endQuiz();
                return;
            }

            const currentQuestion = filteredQuestions[index];
            questionElement.textContent = currentQuestion.question;
            answersElement.innerHTML = '';

            currentQuestion.options.forEach((option, i) => {
                const answerButton = document.createElement('button');
                answerButton.classList.add('answer-btn');
                answerButton.textContent = option;
                answerButton.addEventListener('click', () => checkAnswer(option, currentQuestion.answer));
                answersElement.appendChild(answerButton);
            });

            currentQuestionIndex = index;
            startTimer(difficulty);
        };

        /*const checkAnswer = (selectedOption, correctAnswer) => {
            const answerBtns = document.querySelectorAll('.answer-btn');
            const correctSound = document.getElementById('correct-sound');
            const wrongSound = document.getElementById('wrong-sound');
            answerBtns.forEach(btn => {
                btn.disabled = true;
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                    correctSound.play();
                } else {
                    btn.classList.add('incorrect');
                    wrongSound.play();
                }
            });

            if (selectedOption === correctAnswer) {
                score++;
            }
            nextBtn.style.display = 'block';
        };

        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            nextBtn.style.display = 'none';
        });*/
        const checkAnswer = (selectedOption, correctAnswer) => {
          const answerBtns = document.querySelectorAll('.answer-btn');
          answerBtns.forEach((btn) => {
            btn.disabled = true; // Disable all buttons after selection
          });
        
          // Highlight correct answer with green and play the correct sound
          if (selectedOption === correctAnswer) {
            score++;
            const selectedBtn = [...answerBtns].find((btn) => btn.textContent === selectedOption);
            selectedBtn.classList.add('correct');
            document.getElementById('correct-sound').play();
          } else {
            // Highlight selected wrong answer with red and play the wrong sound
            const selectedBtn = [...answerBtns].find((btn) => btn.textContent === selectedOption);
            selectedBtn.classList.add('incorrect');
            document.getElementById('wrong-sound').play();
        
            // Highlight the correct answer with green for user feedback
            const correctBtn = [...answerBtns].find((btn) => btn.textContent === correctAnswer);
            correctBtn.classList.add('correct');
          }
        
          // Show the "Next" button
         document.getElementById('next-btn').style.display = 'block';};
          document.getElementById('next-btn').addEventListener('click', () => {
            const answerBtns = document.querySelectorAll('.answer-btn');
            answerBtns.forEach((btn) => {
              btn.classList.remove('correct', 'incorrect');
              btn.disabled = false; // Re-enable all buttons for the next question
            });
          
            currentQuestionIndex++;
          
            if (currentQuestionIndex < filteredQuestions.length) {
              // Load the next question
              loadQuestion(currentQuestionIndex);
              document.getElementById('next-btn').style.display = 'none'; // Hide "Next" button
            } else {
              // End the quiz if all questions are completed
              endQuiz();
            }
          });          
        
        const startTimer = (difficulty) => {
            clearInterval(timer);
            let timeLimit = difficulty === 'beginner' ? 20 : (difficulty === 'average' ? 30 : 60);
            timerElement.textContent = `Time: ${timeLimit}s`;

            timer = setInterval(() => {
                timeLimit--;
                timerElement.textContent = `Time: ${timeLimit}s`;

                if (timeLimit <= 0) {
                    clearInterval(timer);
                    nextBtn.style.display = 'block';
                }
            }, 1000);
        };
        const showFireworkEffect = () => {
          const glitterContainer = document.getElementById('glitter-container');
          glitterContainer.style.display = 'block'; // Show the firework container
        
          // Get the center of the screen
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
        
          // Generate 100 particles (fireworks)
          for (let i = 0; i < 100; i++) {
            const firework = document.createElement('div');
            firework.classList.add('firework');
        
            // Set random angle and distance for the firework particles
            const angle = Math.random() * Math.PI * 2; // Random angle in radians
            const distance = Math.random() * 300 + 200; // Random distance from the center
        
            // Calculate the random position using trigonometry to spread particles in all directions
            const xOffset = Math.cos(angle) * distance; // x displacement
            const yOffset = Math.sin(angle) * distance; // y displacement
        
            // Set custom properties for animation
            firework.style.setProperty('--x', `${xOffset}px`);
            firework.style.setProperty('--y', `${yOffset}px`);
        
            // Position the firework at the center of the screen
            firework.style.left = `${centerX - 5}px`; // Subtract half of the width for centering
            firework.style.top = `${centerY - 5}px`;  // Subtract half of the height for centering
        
            // Add the firework particle to the container
            glitterContainer.appendChild(firework);
          }
        
          // Remove the firework container after 3 seconds to clean up
          setTimeout(() => {
            glitterContainer.style.display = 'none'; // Hide the firework effect
            glitterContainer.innerHTML = ''; // Clear all firework particles
          }, 15000); // Duration of the effect
        };
        
        const endQuiz = () => {
            quizContainer.style.display = 'none';
            scoreContainer.style.display = 'block';
            document.getElementById('score').textContent = score;

            // Display final message based on score
            if (score === filteredQuestions.length) {
                document.getElementById('message').textContent = 'Congratulations! You scored 100%! 🎉';
                showFireworkEffect();
            } else if (score >= filteredQuestions.length / 2) {
                document.getElementById('message').textContent = `Well done! You scored ${score} out of ${filteredQuestions.length}. 👍`;
            } else {
                document.getElementById('message').textContent = `Better luck next time! You scored ${score} out of ${filteredQuestions.length}. 👌`;
            }
        };

        loadQuestion(currentQuestionIndex);
    };

    // Event Listener to start quiz
    document.getElementById('submit').addEventListener('click', startQuiz);
});
