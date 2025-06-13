import Question from "../components/Question"

function QuestionPage() {
  return (
    <div className="flex flex-1 flex-col gap-10 bg-base-100 justify-center items-center relative">
      <progress className="progress progress-accent w-full absolute top-5" value={50} max="100"></progress>
      <Question />
    </div>
  )
}

export default QuestionPage