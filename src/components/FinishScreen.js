function FinishScreen({ scores, maxPossibleScores, highscore, dispatch }) {
  const percentage = (scores / maxPossibleScores) * 100;
  let emoji;

  if (percentage === 100) {
    emoji = "🥇";
  } else if (percentage >= 80) {
    emoji = "🥈";
  } else if (percentage >= 50) {
    emoji = "🥉";
  } else if (percentage > 0) {
    emoji = "🎉";
  } else {
    emoji = "😭";
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{scores}</strong> out of{" "}
        {maxPossibleScores} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} scores)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
