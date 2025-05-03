import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "../StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";

const initialStates = {
  questions: [],
  // Could be "loading", "error", "ready". "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  scores: 0,
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
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialStates
  );
  const numQuestions = questions.length;

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
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
