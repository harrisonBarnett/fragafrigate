import React from 'react';

class SetupPrompt extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
            <div
            id="setup-prompt-window"
            className='setup-prompt-window'>
                <h1>place your {this.props.setupState}</h1>
                <button
                onClick={() => {this.props.handleSubmitClick()}}>submit your board</button>
            </div>
            </>
        )
    }
}
export default SetupPrompt;