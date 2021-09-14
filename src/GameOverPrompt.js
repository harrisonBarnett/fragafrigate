import React from 'react';

class GameOverPrompt extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <div 
                id='game-over-container'
                className='game-over-container'
                >
                    <h1>this is the game over container</h1>
                    <button
                    id='game-over-button'
                    onClick={()=>{this.props.handleGameOverClick()}}>restart</button>
                </div>
            </>
        )
    }
}
export default GameOverPrompt;