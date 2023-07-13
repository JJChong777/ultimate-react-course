import { useQuizContext } from "../context/QuizContext";
import Options from "./Options";

function Question() {
  const { question } = useQuizContext();
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
