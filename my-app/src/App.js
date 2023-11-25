// Import the useState
import React, { useState, useEffect } from "react";
import logo from "./logo192.png";

//useEffect and useRef - ref allows us to get reference of different elements in our page

// No need to call a child function, otherwise it'll doubledown whatever the parent function is rendering
//flashcards={flashcards} => we are gonna pass each one of our flashcard so we pass the array of flashcards
function App() {
  const [flashcards, setFlashcards] = useState(flashcardsData);

  return (
    <>
      <Header />
      <Form flashcards={flashcards} setFlashcards={setFlashcards} />
      <div className="container">
        <FlashcardList flashcards={flashcards} setFlashcards={setFlashcards} />
      </div>
      <Footer flashcards={flashcards} />
    </>
  );
}

function Header() {
  return (
    <div id="header-container">
      <img src={logo} alt="Logo" id="header-logo"></img>
      <h1>React Flashcards</h1>
      <p>😃 Expand your react knowlagde, one flashcard at a time! 😃</p>
    </div>
  );
}

// Set up the input so it handles the changes
// These changes needs to be reflect within array of objects

function Form({ flashcards, setFlashcards }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const addFlashcard = (e) => {
    e.preventDefault();
    const newFlashcard = {
      id: String(flashcards.length + 1),
      question: question,
      answer: answer,
    };
    setFlashcards([...flashcards, newFlashcard]);
    setQuestion(""); // Clear the input fields after adding a flashcard
    setAnswer("");
  };
  // Add an effect that logs flashcards when the component mounts
  useEffect(() => {
    console.log("flashcards (before adding):", flashcards);
    // eslint-disable-next-line
  }, []); // The empty dependency array ensures it runs only once on mount
  return (
    <form className="form">
      <p>Question:</p>
      <input
        type="text"
        className="input-box"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></input>
      <p>Answer:</p>
      <input
        type="text"
        className="input-box"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></input>
      <button id="form-btn" onClick={addFlashcard}>
        Add
      </button>
    </form>
  );
}

// Parent function for Flashcard, reflecting Flashcard function
//we can bring in the flashcards (shortcutting the props as variable)
function FlashcardList({ flashcards, setFlashcards }) {
  const handleDelete = (id) => {
    // For example, update the flashcards state to exclude the deleted card
    setFlashcards((prevFlashcards) =>
      prevFlashcards.filter((card) => card.id !== id)
    );
  };
  return (
    <div className="card-grid">
      {flashcards.length === 0 ? (
        <div className="no-flashcards-message">
          You haven't added any flashcards yet! Start creating your learning
          set.
        </div>
      ) : (
        flashcards.map(
          (
            flashcard //look trough the flashcards
          ) => (
            <Flashcard
              flashcard={flashcard}
              key={flashcard.id}
              onDelete={handleDelete}
            />
          )
        ) //for each we want to return the flshacard component and flashcard is passed down to the flashcard component
        //the key is allowing React to render only the once that actually changed. unique id that is associated with each element in the array so we do not re-render
      )}
    </div>
  );
}

function Flashcard({ flashcard, onDelete }) {
  const [flip, setFlip] = useState(false); //set to false so it shows thee question - below we set the flip value to the opposite so each time we switch true/false
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevents the card from flipping when the delete button is clicked
    onDelete(flashcard.id);
  };
  return (
    //we set a className with JS so it is dynamic, if flip true set class of show-A for answer side if false show class show-Q for question side
    //handle dynamic classed with default React and JS
    <div
      className={`card ${flip ? "show-A" : "show-Q"}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front">
        😃 {flashcard.question}
        <div id="delete-btn" onClick={handleDeleteClick}>
          X
        </div>
      </div>
      <div className="back">👏 {flashcard.answer}</div>
      {/* {flip ? "👏" : "😃"} */}
      {/* {flip ? flashcard.answer : flashcard.question} */}
    </div>
  );
}

function Footer({ flashcards }) {
  const flashcardCount = flashcards.length;
  return (
    <>
      <div className="flashcard-count">
        You have added {flashcardCount}{" "}
        {flashcardCount === 1 ? "flashcard" : "flashcards"}
      </div>
      <div id="footer">
        <p id="footer-p">Built with React</p>
        <img src={logo} alt="Logo" id="footer-logo"></img>
      </div>
    </>
  );
}

export default App;

const flashcardsData = [
  {
    id: "1",
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces. It's developed and maintained by Facebook and is used for creating reusable UI components for web applications.",
  },
  {
    id: "2",
    question: "What is JSX in React?",
    answer:
      "JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript code. It's used in React to describe the structure of the UI components.",
  },
  {
    id: "3",
    question: "What is a component in React?",
    answer:
      "A component in React is a reusable piece of user interface that can be created and composed to build complex user interfaces. Components can be either functional or class-based.",
  },
  {
    id: "4",
    question: "What is the difference between state and props in React?",
    answer:
      "State is used to manage and store data that can change over time within a component. Props (short for properties) are used to pass data from a parent component to a child component. Props are immutable, while state is mutable and can be changed.",
  },
  {
    id: "5",
    question: "What is a React virtual DOM?",
    answer:
      "The virtual DOM (Document Object Model) is a lightweight in-memory representation of the actual DOM in a web application. React uses the virtual DOM to efficiently update and manipulate the real DOM, which helps improve performance and speed in rendering changes.",
  },
  {
    id: "6",
    question: "What is a React component lifecycle?",
    answer:
      "The component lifecycle in React represents the various stages a component goes through from creation to destruction. It includes methods like componentDidMount, componentDidUpdate, and componentWillUnmount, which allow you to perform actions at specific points in a component's life.",
  },
  {
    id: "7",
    question: "What are React Hooks?",
    answer:
      "React Hooks are functions that allow you to use state and other React features in functional components. They provide a way to add state and side effects to functional components without needing to convert them to class components.",
  },
  {
    id: "8",
    question: "What is React Router?",
    answer:
      "React Router is a popular library for handling routing and navigation in React applications. It allows you to define different routes and render different components based on the URL, enabling the creation of single-page applications (SPAs).",
  },
  {
    id: "9",
    question: "What is Redux in React?",
    answer:
      "Redux is a state management library for React applications. It provides a predictable state container that helps manage the state of your application in a centralized and predictable way.",
  },
  {
    id: "10",
    question: "What is the purpose of React's Context API?",
    answer:
      "React's Context API allows you to share data between components without having to pass props manually through every level of the component tree. It's especially useful for global data, theming, or settings that multiple components need access to.",
  },
];
