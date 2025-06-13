const data = [
  {
    question: "Question 1",
    correctAnswer: {
      no: 1,
      answer: "Answer 1"
    },
    yourAnswer: {
      no: 2,
      answer: "Answer 2"
    },
  },
  {
    question: "Question 2",
    correctAnswer: {
      no: 1,
      answer: "Answer 1"
    },
    yourAnswer: {
      no: 2,
      answer: "Answer 2"
    },
  },
  {
    question: "Question 3",
    correctAnswer: {
      no: 1,
      answer: "Answer 1"
    },
    yourAnswer: {
      no: 2,
      answer: "Answer 2"
    },
  }
]

function ResultPage() {
  return (
    <div className="flex flex-1 flex-col lg:flex-row gap-5">

      {/* score board */}
      <Card>
        <div className="text-2xl font-extrabold p-5">Score board</div>
        <div className="flex flex-col gap-10 justify-around h-full mt-10">
          <div className="text-3xl font-extrabold">you Have played a total 1 Quiz</div>

          <div>
            <div className="radial-progress text-accent font-bold" style={{ "--value": 70, "--size": "12rem", "--thickness": "10px" }} aria-valuenow={70} role="progressbar">
              70%
            </div>
          </div>

          <div className="divider divider-horizontal"></div>

          <div className="flex">
            <Card className={"bg-secondary/20 hover:bg-secondary/60 text-left p-10"}>
              <p className="text-5xl font-extrabold text-secondary">100%</p>
              <p className="text-sm font-bold">Completions</p>
            </Card>
            <Card className={"bg-success/20 hover:bg-success/60 text-left p-10"}>
              <p className="text-5xl font-extrabold text-success">10</p>
              <p className="text-sm font-bold">Total Question</p>
            </Card>
          </div>

        </div>
      </Card>

      {/* your answer */}
      <Card className={`h-full lg:h-[840px]`}>
        <div className="text-2xl font-extrabold p-5 ">Your Answer</div>

        <div className="flex flex-col mt-10 overflow-y-scroll  h-full">
          {data.map((item, index) => (
            <QuestionAndAnswer className={`text-left`} data={item} key={index} />
          ))}
        </div>
      </Card>
    </div>
  )
}

export default ResultPage

const Card = ({ className, children }) => {
  return (
    <div className={`card w-full bg-base-300 m-5 text-center ${className}`}>
      {children}
    </div>
  )
}

const QuestionAndAnswer = ({ className, data }) => {
  return (
    <div className={`flex flex-col gap-5  p-5 ${className}`}>
      <h1 className="text-2xl text-left m-5">{data.question}</h1>
      <p className="font-bold">selected Answer</p>
      <div className="bg-error p-5">
        <p className="font-bold">{data.yourAnswer.answer}</p>
      </div>

      <p className="font-bold">Correct Answer</p>
      <div className="bg-success p-5">
        <p className="font-bold">{data.correctAnswer.answer}</p>
      </div>
    </div>
  )
}