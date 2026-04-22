import React from "react";
import Question from "../Question/Question";
import Answer from "../AnswerButton/AnswerButton";
import HelpButton from "../HelpButton/HelpButton";
import Score from "../Score/Score";
import SubmitNextButton from "../SubmitNextButton/SubmitNextButton";
import './MainBlock.css'

function shuffleArray(array) {
    // Fisher-Yates shuffle
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

class MainBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    text: "What is 2 + 2?",
                    answers: ["3", "4", "5", "6"],
                    correct: 1
                },
                // Add more questions as needed
            ],
            currentQuestion: 0,
            shuffledAnswers: [],
            selectedAnswer: null,
            showResult: false,
            score: 0
        };
        this.handleAnswerSelect = this.handleAnswerSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    componentDidMount() {
        this.shuffleAnswersForCurrent();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentQuestion !== this.state.currentQuestion) {
            this.shuffleAnswersForCurrent();
        }
    }

    shuffleAnswersForCurrent() {
        const { questions, currentQuestion } = this.state;
        const answers = questions[currentQuestion].answers;
        const shuffled = shuffleArray(answers);
        this.setState({ shuffledAnswers: shuffled, selectedAnswer: null, showResult: false });
    }

    handleAnswerSelect(answer) {
        if (!this.state.showResult) {
            this.setState({ selectedAnswer: answer });
        }
    }

    handleSubmit() {
        const { selectedAnswer, questions, currentQuestion, shuffledAnswers, showResult, score } = this.state;
        if (showResult || selectedAnswer === null) return;
        // Find correct answer value
        const correctAnswer = questions[currentQuestion].answers[questions[currentQuestion].correct];
        let newScore = score;
        if (selectedAnswer === correctAnswer) {
            newScore += 1;
        }
        this.setState({ showResult: true, score: newScore });
    }

    handleNext() {
        const { currentQuestion, questions } = this.state;
        if (currentQuestion < questions.length - 1) {
            this.setState({ currentQuestion: currentQuestion + 1 });
        } else {
            // Optionally reset or show final score
            this.setState({ currentQuestion: 0, score: 0 });
        }
    }

    render() {
        const { questions, currentQuestion, shuffledAnswers, selectedAnswer, showResult, score } = this.state;
        const correctAnswer = questions[currentQuestion].answers[questions[currentQuestion].correct];
        // Helper to get status for each answer
        const getStatus = (ans) => {
            if (!showResult) return '';
            if (ans === correctAnswer) return 'correct';
            if (ans === selectedAnswer) return 'incorrect';
            return '';
        };
        return (
            <div className="MainBlock">
                <Question question={questions[currentQuestion].text} />
                <div className="AnswerBlock">
                    <div className="AnswerRowOne">
                        <Answer
                            answer={shuffledAnswers[0]}
                            onSelect={this.handleAnswerSelect}
                            isSelected={selectedAnswer === shuffledAnswers[0]}
                            status={getStatus(shuffledAnswers[0])}
                        />
                        <Answer
                            answer={shuffledAnswers[1]}
                            onSelect={this.handleAnswerSelect}
                            isSelected={selectedAnswer === shuffledAnswers[1]}
                            status={getStatus(shuffledAnswers[1])}
                        />
                    </div>
                    <div className="AnswerRowTwo">
                        <Answer
                            answer={shuffledAnswers[2]}
                            onSelect={this.handleAnswerSelect}
                            isSelected={selectedAnswer === shuffledAnswers[2]}
                            status={getStatus(shuffledAnswers[2])}
                        />
                        <Answer
                            answer={shuffledAnswers[3]}
                            onSelect={this.handleAnswerSelect}
                            isSelected={selectedAnswer === shuffledAnswers[3]}
                            status={getStatus(shuffledAnswers[3])}
                        />
                    </div>
                </div>
                <div className="BottomBar">
                    <HelpButton />
                    <Score score={score} />
                    <div onClick={showResult ? this.handleNext : this.handleSubmit}>
                        <SubmitNextButton label={showResult ? "Next" : "Submit"} />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainBlock;