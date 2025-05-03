function Progress({ numQuestions, index, scores, maxPossibleScores, anwer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(anwer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>
          {scores} / {maxPossibleScores}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
