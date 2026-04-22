import React from 'react';
import './AnswerButton.css'

class Answer extends React.Component {
    render() {
        const { answer, onSelect, isSelected, status } = this.props;
        return (
            <div className={`Answer${isSelected ? ' selected' : ''}${status ? ' ' + status : ''}`} onClick={() => onSelect(answer)}>
                <p>{answer}</p>
            </div>
        )
    }
}

export default Answer;