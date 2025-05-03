function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;

  return (
    <>
      <div className="options">
        {question.options.map((option, optIndex) => (
          <button
            className={`btn btn-option ${optIndex === answer ? "answer" : ""} ${
              hasAnswer && optIndex === question.correctOption
                ? "correct"
                : "wrong"
            }`}
            key={option}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: optIndex })}
          >
            {option}
          </button>
        ))}
      </div>

      {hasAnswer && (
        <button
          className="btn"
          onClick={() => dispatch({ type: "nextQuestion", payload: 1 })}
        >
          Next
        </button>
      )}
    </>
  );
}

export default Options;
