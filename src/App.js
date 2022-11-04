import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import { Alert } from "./components/Alert";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/noteState";

function App() {
  return (
    <div className="App">
      <>
        <NoteState>
          <Router>
            <Navbar />
            <Alert />
            <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
            </div>
          </Router>
        </NoteState>
      </>
    </div>
  );
}

export default App;
