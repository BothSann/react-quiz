function FinishScreen({ scores, maxPossibleScores, highscore }) {
  const percentage = (scores / maxPossibleScores) * 100;
  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage >= 0 && percentage < 50) emoji = "🎉";
  if (percentage === 0) emoji = "😭";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{scores}</strong> out of{" "}
        {maxPossibleScores} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} scores)</p>
    </>
  );
}

export default FinishScreen;
