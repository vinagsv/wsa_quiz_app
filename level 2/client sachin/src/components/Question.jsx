const question = {
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Kilimanjaro", "Mount Everest", "Mount McKinley"],
};

import { useDispatch } from "react-redux";
import { useQuestionState } from "../hooks/useQuestionState";
import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchQuestionsAPI, submitQuizAPI, validateAnswerAPI } from "../store/thunk/questionsThunk";
import { activeNextQuestion } from "../store/slices/questionSlice";

function Question() {
    const dispatch = useDispatch();
    const [userSelectedOption, setUserSelectedOption] = useState("");
    // use custom hook that returns the redux state values
    const {
        activeQuestion,
        activeQuestionId, // id of the active question
        activeQuestionNumber,
        totalQuestions,
        isValidatingAnswer, // flag to show if the answer is being validated
        isSubmittingQuiz, // flag to show if the quiz is being submitted
        loading, // flag to show if the questions are being fetched
        error, // error message
    } = useQuestionState();

    useEffect(() => {
        dispatch(fetchQuestionsAPI());
    }, [dispatch]);

    useEffect(() => {
        setUserSelectedOption("");
    }, [activeQuestion]);

    const hasAttempted = useMemo(() => Boolean(userSelectedOption), [useQuestionState]);
    const isFinalQuestion = useMemo(
        () => activeQuestionNumber === totalQuestions,
        [activeQuestionNumber, totalQuestions]
    );

    const handleClick = useCallback(
        (selectOption) => {
            setUserSelectedOption(selectOption._id);
            dispatch(validateAnswerAPI({ questionId: activeQuestionId, answer: selectOption }));
        },
        [activeQuestionId, dispatch]
    );

    const moveForward = useCallback(() => {
        if (isFinalQuestion) {
            dispatch(submitQuizAPI());
        } else {
            dispatch(activeNextQuestion());
        }
    });

    console.log(activeQuestion);

    if (loading) return <div className="loading loaging-spinner m-auto"></div>;
    if (error) return <div className="text-red-500">something went wrong!</div>;

    return (
        <div className="card w-1/3 bg-base-300 text-center p-10 shadow-2xl indicator">
            <span className="indicator-item indicator-center badge badge-primary text-2xl p-5 rounded-lg font-bold">
                {activeQuestionNumber}/ {totalQuestions}
            </span>
            {/* question */}
            <div className="text-2xl font-extrabold">{activeQuestion?.question}</div>

            {/* card body */}
            <div className="card-body flex flex-col gap-5 mt-5">
                {/* options */}
                <div className="flex flex-col gap-5 justify-center">
                    {activeQuestion?.options.map((option) => (
                        <div
                            key={option._id}
                            className="p-5 border border-gray-800/50 flex flex-row justify-between"
                        >
                            <div className="text-lg font-medium">{option?.value}</div>
                            <input
                                type="radio"
                                name="option"
                                value={option?.value}
                                className="radio radio-secondary rounded-full"
                                onClick={() => handleClick(option)}
                            />
                        </div>
                    ))}
                </div>

                {/* next button */}
                <div className="text-center">
                    <button className="btn btn-primary mt-5 w-1/2">Next</button>
                </div>
            </div>
        </div>
    );
}

export default Question;
