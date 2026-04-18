import Question from "../Question/Question";
import Answer from "../AnswerButton/AnswerButton";
import HelpButton from "../HelpButton/HelpButton";
import Score from "../Score/Score";
import SubmitNextButton from "../SubmitNextButton/SubmitNextButton";

function MainBlock() {
    return (
        <div>
            <h3>Main block</h3>
            <Question />
            <Answer />
            <Answer />
            <Answer />
            <Answer />
            <HelpButton />
            <Score/>
            <SubmitNextButton />
        </div>
    )
}

export default MainBlock;