import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;
const initialStates = {
  questions: [],
  // Could be "loading", "error", "ready". "active", "finish"
  status: "loading",
  index: 0,
  answer: null,
  scores: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(states, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...states,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...states,
        status: "error",
      };
    case "start":
      return {
        ...states,
        status: "active",
        secondsRemaining: states.questions.length * SECS_PER_QUESTION,
      };
    case "finish":
      return {
        ...states,
        status: "finish",
        highscore:
          states.scores > states.highscore ? states.scores : states.highscore,
      };
    case "restart":
      return {
        ...initialStates,
        questions: states.questions,
        status: "ready",
      };
    case "newAnswer":
      const currentQuestion = states.questions.at(states.index);

      return {
        ...states,
        answer: action.payload,
        scores:
          action.payload === currentQuestion.correctOption
            ? states.scores + currentQuestion.points
            : states.scores,
      };
    case "nextQuestion":
      return {
        ...states,
        index: states.index + 1,
        answer: null,
      };
    case "tick":
      return {
        ...states,
        secondsRemaining: states.secondsRemaining - 1,
        status: states.secondsRemaining === 0 ? "finish" : states.status,
      };
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, scores, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialStates);
  const numQuestions = questions.length;
  const maxPossibleScores = questions.reduce((accu, curVal) => {
    return accu + curVal.points;
  }, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              scores={scores}
              maxPossibleScores={maxPossibleScores}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            scores={scores}
            maxPossibleScores={maxPossibleScores}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
