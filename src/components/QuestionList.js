import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestion] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestion(data));
  }, []);
  function onDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() =>
        setQuestion((questions) => questions.filter((q) => q.id !== id))
      );
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
