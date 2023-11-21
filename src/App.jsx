import useFetch from "./hook/useFetch";
import Loader from "./components/Loader";
import { useState } from "react";
import Summary from "./components/Summary";


function App() {
  const { loader, quiz } = useFetch();
  const [activeQuiz, setActiveQuiz] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(false); // or {...}
  const [summary, setSummary] = useState({correct:0, wrong:0});
  // console.log(quiz);

  const currentQuestion = quiz[activeQuiz]?.question || '';
  const currentAnswers = quiz[activeQuiz]?.answers || [];

  const renderActiveAnswer = (ans) => {
    setActiveAnswer(ans);
  };

  const renderNext = () => {
    setActiveQuiz(activeQuiz + 1);
    setActiveAnswer(false);
    if(activeAnswer.isCorrect) {
      setSummary({correct:summary.correct + 1, wrong: summary.wrong});
    } else {
      setSummary({correct:summary.correct, wrong:summary.wrong + 1})
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="relative bg-white rounded-xl shadow-md p-8 w-full md:w-2/3 h-full md:h-1/3 max-h-md">
        <div className="flex justify-center items-center p-3">
          {loader && <Loader />}
        </div>
        <div className="flex justify-center items-center p-3">
          {
            !loader && quiz.length  < activeQuiz + 1 && <Summary quizCount={quiz.length} summary={summary} />
          }
        </div>
        <div className="space-y-5">
          <h1 className=" font-extrabold text-base sm:text-2xl text-green-600">
            {currentQuestion}
          </h1>
          <div>
            <ul className="space-y-3">
              {
                currentAnswers.map((ans, index) => (
                  <div key={index}>
                    <li
                      className={`
                        p-2 rounded text-white font-bold cursor-pointer text-xs sm:text-base
                        ${activeAnswer !== false && activeAnswer.isCorrect === false && activeAnswer._id === ans._id ? "bg-red-500" : "bg-gray-600"}
                        ${activeAnswer !== false && activeAnswer.isCorrect === true && activeAnswer._id === ans._id ? "bg-green-600" : "bg-gray-600"}
                        ${activeAnswer !== false && "pointer-events-none"}
                      `}
                      onClick={() => renderActiveAnswer(ans)}
                    >
                      {ans.answer}
                    </li>
                  </div>
                ))
              }
            </ul>
          </div>
          <div className="flex justify-between items-center pt-8">
            <button
              className={`
                  bg-green-600 hover:bg-green-700 
                  px-4 py-2 rounded text-white font-bold
                  ${activeAnswer === false && "pointer-events-none"}
                  `}
              onClick={renderNext}
            >
              NEXT
            </button>
            {
              activeAnswer !== false && (
                <h6 className={`
                ${activeAnswer.isCorrect === true ? "correct-answer" : "wrong-answer"}
                `}>
                  {
                    activeAnswer.isCorrect === true ? "correct answer" : "wrong answer"
                  }
                </h6>
              )
            }
          </div>
          <div className=" absolute top-0 right-5">
            <p className=" bg-green-600 px-2 py-1 rounded-md text-white font-bold text-xs">
              {activeQuiz + 1}/{quiz.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
