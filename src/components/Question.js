import Options from "./Options";
function Question({ question, dispatch }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
      <button
        className="btn"
        onClick={() => dispatch({ type: "nextQuestion", payload: 1 })}
      >
        Next
      </button>
    </div>
  );
}

export default Question;
