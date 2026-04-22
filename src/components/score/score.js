import React from "react";

class Score extends React.Component {
    render() {
        return (
            <div className="Score">
                <p>Score: {this.props.score}</p>
            </div>
        )
    }
}

export default Score;