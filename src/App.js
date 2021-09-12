import React from 'react';
import Board from './Board';
import Ship from './Ship';
import SetupPrompt from './SetupPrompt';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      setupState: null
    }
    this.tempSetupArr = [];
    this.playerCoords = [];
    this.computerCoords = [];

    this.patrol = new Ship('patrol', 2, []);
    this.frigate = new Ship('frigate', 3, []);
    this.submarine = new Ship('submarine', 3, []);
    this.cruiser = new Ship('cruiser', 4, []);
    this.carrier = new Ship('carrier', 5, []);

    this.NPCpatrol = new Ship('patrol', 2, []);
    this.NPCfrigate = new Ship('frigate', 3, []);
    this.NPCsubmarine = new Ship('submarine', 3, []);
    this.NPCcruiser = new Ship('cruiser', 4, []);
    this.NPCcarrier = new Ship('carrier', 5, []);

    this.handleStartMenuClick = this.handleStartMenuClick.bind(this);
    this.handleSetupClick = this.handleSetupClick.bind(this);
    this.handleSetupSubmission = this.handleSetupSubmission.bind(this);

  }

  handleStartMenuClick() {
    const menu = document.querySelector('.start-menu-container');
    menu.classList.toggle('hide');

    const setup = document.querySelector('#setup-container');
    setup.classList.toggle('show');

    const setupPromptWindow = document.querySelector('.setup-prompt-window');
    setupPromptWindow.classList.toggle('show');

    this.setState({ setupState: 'patrol' });
  }

  handleSetupClick(index) {
    const cell = document.querySelector(`#setup-${index}`);

    console.log(this.state.setupState);

    if(this.canPlace(index)) {      
      cell.classList.add('player-occupied');
      this.playerCoords.push(index);

      const switchCase = this.state.setupState;
      switch(switchCase) {
        case 'patrol':
          cell.classList.add('player-patrol');
          this.tempSetupArr.push(index);
          this.patrol.position.push(index);

          if(this.patrol.position.length === this.patrol.size) {
            this.tempSetupArr = [];
            this.setState({ setupState: 'frigate' });
          }
          break;
        case 'frigate':
          cell.classList.add('player-frigate');
          this.tempSetupArr.push(index);
          this.frigate.position.push(index);

          if(this.frigate.position.length === this.frigate.size) {
            this.tempSetupArr = [];
            this.setState({ setupState: 'submarine' });
          }
          break;
        case 'submarine':
          cell.classList.add('player-submarine');
          this.tempSetupArr.push(index);
          this.submarine.position.push(index);

          if(this.submarine.position.length === this.submarine.size) {
            this.tempSetupArr = [];
            this.setState({ setupState: 'cruiser' });
          }
          break;
        case 'cruiser':
          cell.classList.add('player-cruiser');
          this.tempSetupArr.push(index);
          this.cruiser.position.push(index);

          if(this.cruiser.position.length === this.cruiser.size) {
            this.tempSetupArr = [];
            this.setState({ setupState: 'carrier' });
          }
          break;
        case 'carrier':
          cell.classList.add('player-carrier');
          this.tempSetupArr.push(index);
          this.carrier.position.push(index);

          if(this.carrier.position.length === this.carrier.size) {
            this.tempSetupArr = [];
            alert('setup complete');
          }
          break;
        default: 
          alert('something went wrong');
      }

    } else {
      alert('reassess placement please');
    }

  }

  handleSetupSubmission() {
    const setupBoard = document.querySelector('#setup-container');
    setupBoard.classList.toggle('show');
    const setupWindow = document.querySelector('#setup-prompt-window');
    setupWindow.classList.toggle('show');

    this.renderPlayerBoard();
    this.randomizeComputerBoard();
    this.renderComputerBoard();
  }
  renderPlayerBoard() {
    this.patrol.position.forEach(position => {
      const cell = document.querySelector(`#player-${position}`);
      cell.classList.add('player-patrol');
    });
    this.frigate.position.forEach(position => {
      const cell = document.querySelector(`#player-${position}`);
      cell.classList.add('player-frigate');
    });
    this.submarine.position.forEach(position => {
      const cell = document.querySelector(`#player-${position}`);
      cell.classList.add('player-submarine');
    });
    this.cruiser.position.forEach(position => {
      const cell = document.querySelector(`#player-${position}`);
      cell.classList.add('player-cruiser');
    });
    this.carrier.position.forEach(position => {
      const cell = document.querySelector(`#player-${position}`);
      cell.classList.add('player-carrier');
    });


    const board = document.querySelector('#player-container');
    board.classList.toggle('show');
  }
  randomizeComputerBoard() {
    function getRandomIndex() {
      var rand = Math.floor(Math.random() * 99);
      return (rand).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    }

    while(this.NPCpatrol.position.length < this.NPCpatrol.size) {
      var index = getRandomIndex();
      if(this.canPlace(index) && !this.computerCoords.includes(index) ) {
        this.NPCpatrol.position.push(index);
        this.tempSetupArr.push(index);
        this.computerCoords.push(index);
      } 
    }
    this.tempSetupArr = [];
    while(this.NPCfrigate.position.length < this.NPCfrigate.size) {
      var index = getRandomIndex();
      if(this.canPlace(index) && !this.computerCoords.includes(index) ) {
        this.NPCfrigate.position.push(index);
        this.tempSetupArr.push(index);
        this.computerCoords.push(index);
      } 
    }
    this.tempSetupArr = [];
    while(this.NPCsubmarine.position.length < this.NPCsubmarine.size) {
      var index = getRandomIndex();
      if(this.canPlace(index) && !this.computerCoords.includes(index) ) {
        this.NPCsubmarine.position.push(index);
        this.tempSetupArr.push(index);
        this.computerCoords.push(index);
      } 
    }
    this.tempSetupArr = [];
    while(this.NPCcruiser.position.length < this.NPCcruiser.size) {
      var index = getRandomIndex();
      if(this.canPlace(index) && !this.computerCoords.includes(index) ) {
        this.NPCcruiser.position.push(index);
        this.tempSetupArr.push(index);
        this.computerCoords.push(index);
      } 
    }
    this.tempSetupArr = [];
    while(this.NPCcarrier.position.length < this.NPCcarrier.size) {
      var index = getRandomIndex();
      if(this.canPlace(index) && !this.computerCoords.includes(index) ) {
        this.NPCcarrier.position.push(index);
        this.tempSetupArr.push(index);
        this.computerCoords.push(index);
      } 
    }
    this.tempSetupArr = [];

    if(this.NPCpatrol.position.length !== this.NPCpatrol.size &&
      this.NPCfrigate.position.length !== this.NPCfrigate.size &&
      this.NPCsubmarine.position.length !== this.NPCsubmarine.size &&
      this.NPCcruiser.position.length !== this.NPCcruiser.size &&
      this.NPCcarrier.position.length !== this.NPCcarrier.size ) {
        this.randomizeComputerBoard();
    }

    console.log(this.computerCoords);
  }
  renderComputerBoard() {
    const board = document.querySelector('#computer-container');
    board.classList.toggle('show');
  }

  canPlace(index) {
    const intIndex = parseInt(index);

    // first cell
    if(this.tempSetupArr.length === 0) {
      return true;
    // second cell
    } else if (this.tempSetupArr.length === 1) {
      // check wraparounds
      if((this.tempSetupArr[0].charAt(1) === 9 && index.charAt(1) == 0) ||
         (this.tempSetupArr[0].charAt(1) == 0 && index.charAt(1) == 9 )) {
        return false;
      }

      // immediate above and below
      if(this.tempSetupArr[0] == intIndex + 10 ||
         this.tempSetupArr[0] == intIndex - 10 ) {
           return true;
         }

      // immediate left and right
      if(this.tempSetupArr[0] == intIndex + 1 ||
         this.tempSetupArr[0] == intIndex - 1 ) {
           return true;
         }
    // third+ cell
    } else {
      // sort tempArr to for organized traversal
      this.tempSetupArr.sort(function(a,b){return a-b;});

      // horizontal ship
      if(Math.abs(this.tempSetupArr[0] - this.tempSetupArr[1]) === 1 ) {
        if( this.tempSetupArr[0] == intIndex + 1 ||
          this.tempSetupArr[0] == intIndex - 1 ||
          this.tempSetupArr[this.tempSetupArr.length - 1] == intIndex + 1 ||
          this.tempSetupArr[this.tempSetupArr.length - 1] == intIndex - 1 ) {
            return true;
          }
      // vertical ship
      } else {
        if(this.tempSetupArr[0] == intIndex + 10 ||
          this.tempSetupArr[0] == intIndex - 10 ||
          this.tempSetupArr[this.tempSetupArr.length - 1] == intIndex + 10 ||
          this.tempSetupArr[this.tempSetupArr.length - 1] == intIndex - 10 ) {
            return true;
          }
      }
    }

  }


  handlePlayerClick() {
    alert('player clicked');
  }


  render() {
    return(
      <>
      <div className='start-menu-container'>
        <h1>Welcome to Frag-A-Frigate</h1>
        <button onClick={ this.handleStartMenuClick }>click to begin</button>
      </div>
      <Board 
      boardType='setup'
      handleCellClick={ this.handleSetupClick }/>
      <SetupPrompt 
      setupState={this.state.setupState}
      handleSubmitClick={this.handleSetupSubmission}
      />

      <Board 
      boardType='player'
      handleCellClick={ null }/>

      <Board 
      boardType='computer'
      handleCellClick= { this.handlePlayerClick }/>
      </>
    )
  }
}

export default App;
