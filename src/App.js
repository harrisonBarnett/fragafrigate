import React from 'react';
import Board from './Board';
import Ship from './Ship';
import SetupPrompt from './SetupPrompt';
import GameOverPrompt from './GameOverPrompt';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      setupState: null,
      winner: null
    }
    // temp and reference coordinate arrays
    this.tempSetupArr = [];
    this.playerCoords = [];
    this.cpuCoords = [];

    this.computerGuesses = [];

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
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    this.handleGameOverClick = this.handleGameOverClick.bind(this);
  }

  handleStartMenuClick() {
    // remove start menu elements
    const menu = document.querySelector('.start-menu-container');
    menu.classList.toggle('hide');

    // render setup elements
    const setup = document.querySelector('#setup-container');
    setup.classList.toggle('show');
    const setupPromptWindow = document.querySelector('.setup-prompt-window');
    setupPromptWindow.classList.toggle('show');

    this.setState({ setupState: 'patrol' });

    // disable the submission button
    const button = document.querySelector('#setup-submission-btn');
    button.disabled = true;
  }

  handleSetupClick(index) {
    const cell = document.querySelector(`#setup-${index}`);
    
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
            // disable the setup board
            const cells = document.querySelectorAll('.setup-cell');
            cells.forEach(cell => {
              cell.classList.toggle('unclickable');
            });
            // enable the submission button
            const button = document.querySelector('#setup-submission-btn');
            button.disabled = false;
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
    // remove all setup elements
    const setupBoard = document.querySelector('#setup-container');
    setupBoard.classList.toggle('show');
    const setupWindow = document.querySelector('#setup-prompt-window');
    setupWindow.classList.toggle('show');

    // render the player board
    this.renderPlayerBoard();
    // randomize the computer board
    // computer board is rendered within the randomize function
    this.randomizeComputerBoard();
  }
  renderPlayerBoard() {
    // coloring position of player ships
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

    // disable click on player board
    const cells = document.querySelectorAll('.player-cell');
    cells.forEach(cell => {
      cell.style = 'pointer-events: none;';
    })
    // render the player board
    const board = document.querySelector('#player-container');
    board.classList.toggle('show');
  }
  getRandomIndex() {
    var rand = Math.floor(Math.random() * 99);
    // formatted to 00 format
    return ('00' + rand).slice(-2);
  }
  coinFlip() {
    return Math.round(Math.random());
  }
  placePatrol() {
    this.NPCpatrol.position = [];
    this.tempSetupArr = [];
    const index = this.getRandomIndex();
    // place first cell
    if(this.cpuCoords.includes(index)) {
      this.placePatrol();
    } else {
      this.NPCpatrol.position.push(index);
      this.tempSetupArr.push(index);
    }

    if(this.coinFlip() == 0) {
      // place horizontally 
      // check lateral wraparound
      while(this.NPCpatrol.position.length < 2) {
        if(this.NPCpatrol.position[this.NPCpatrol.position.length - 1].charAt(1) == 9) {
          this.placePatrol();
        } 
        const nextIndex = parseInt(this.NPCpatrol.position[this.NPCpatrol.position.length - 1]) + 1;
        const strIndex = ('00' + nextIndex).slice(-2);
        if(this.canPlace(strIndex)) {
          this.NPCpatrol.position.push(strIndex);
          this.tempSetupArr.push(strIndex);
        } else {
          this.placePatrol();
        }
      }
      
    } else {
      // place veritcally
      // check vertical wraparound
      while(this.NPCpatrol.position.length < 2) {
        if(this.NPCpatrol.position[this.NPCpatrol.position.length - 1].charAt(0) == 9) {
          this.placePatrol();
        } 
        const nextIndex = parseInt(this.NPCpatrol.position[this.NPCpatrol.position.length - 1]) + 1;
        const strIndex = ('00' + nextIndex).slice(-2);
        if(this.canPlace(strIndex)) {
          this.NPCpatrol.position.push(strIndex);
          this.tempSetupArr.push(strIndex);
        } else {
          this.placePatrol();
        }
      }
    }
    if(this.NPCpatrol.position.length != 2) {
      this.placePatrol();
    }
    this.NPCpatrol.position.forEach(coord => {
      this.cpuCoords.push(coord);
    });
  }
  placeFrigate() {
    this.NPCfrigate.position = [];
    this.tempSetupArr = [];
    const index = this.getRandomIndex();
    // place first cell
    if(this.cpuCoords.includes(index)) {
      this.placeFrigate();
    } else {
      this.NPCfrigate.position.push(index);
      this.tempSetupArr.push(index);
    }

    if(this.coinFlip() == 0) {
      // place horizontally 
      // check lateral wraparound
      while(this.NPCfrigate.position.length < 3) {
        if(this.NPCfrigate.position[this.NPCfrigate.position.length - 1].charAt(1) == 9) {
          this.placeFrigate();
        } 
        const nextIndex = parseInt(this.NPCfrigate.position[this.NPCfrigate.position.length - 1]) + 1;
        const strIndex = ('00' + nextIndex).slice(-2);
        if(this.canPlace(strIndex)) {
          this.NPCfrigate.position.push(strIndex);
          this.tempSetupArr.push(strIndex);
        } else {
          this.placeFrigate();
        }
      }
      
    } else {
      // place veritcally
      // check vertical wraparound
      while(this.NPCfrigate.position.length < 3) {
        if(this.NPCfrigate.position[this.NPCfrigate.position.length - 1].charAt(0) == 9) {
          this.placeFrigate();
        } 
        const nextIndex = parseInt(this.NPCfrigate.position[this.NPCfrigate.position.length - 1]) + 1;
        const strIndex = ('00' + nextIndex).slice(-2);
        if(this.canPlace(strIndex)) {
          this.NPCfrigate.position.push(strIndex);
          this.tempSetupArr.push(strIndex);
        } else {
          this.placeFrigate();
        }
      }
    }
    if(this.NPCfrigate.position.length != 3) {
      this.placeFrigate();
    }
    this.NPCfrigate.position.forEach(coord => {
      this.cpuCoords.push(coord);
    });
  }
  placeSubmarine() {
    this.NPCsubmarine.position = [];
    this.tempSetupArr = [];
    const index = this.getRandomIndex();
    // place first cell
    if(this.cpuCoords.includes(index)) {
      this.placeSubmarine();
    } else {
      this.NPCsubmarine.position.push(index);
      this.tempSetupArr.push(index);
    }

    if(this.coinFlip() == 0) {
      // place horizontally 
      // check lateral wraparound
      while(this.NPCsubmarine.position.length < 3) {
        if(this.NPCsubmarine.position[this.NPCsubmarine.position.length - 1].charAt(1) == 9) {
          this.placeSubmarine();
        } 
        const nextIndex = parseInt(this.NPCsubmarine.position[this.NPCsubmarine.position.length - 1]) + 1;
        const strIndex = ('00' + nextIndex).slice(-2);
        if(this.canPlace(strIndex)) {
          this.NPCsubmarine.position.push(strIndex);
          this.tempSetupArr.push(strIndex);
        } else {
          this.placeSubmarine();
        }
      }
      
    } else {
      // place veritcally
      // check vertical wraparound
      while(this.NPCsubmarine.position.length < 3) {
        if(this.NPCsubmarine.position[this.NPCsubmarine.position.length - 1].charAt(0) == 9) {
          this.placeSubmarine();
        } 
        const nextIndex = parseInt(this.NPCsubmarine.position[this.NPCsubmarine.position.length - 1]) + 1;
        const strIndex = ('00' + nextIndex).slice(-2);
        if(this.canPlace(strIndex)) {
          this.NPCsubmarine.position.push(strIndex);
          this.tempSetupArr.push(strIndex);
        } else {
          this.placeSubmarine();
        }
      }
    }

    if(this.NPCsubmarine.position.length != 3) {
      this.placeSubmarine();
    }

    this.NPCsubmarine.position.forEach(coord => {
      this.cpuCoords.push(coord);
    });
  }
  placeCruiser() {
    this.NPCcruiser.position = [];
    this.tempSetupArr = [];
    const index = this.getRandomIndex();
    // place first cell
    if(this.cpuCoords.includes(index)) {
      this.placeCruiser();
    } else {
      this.NPCcruiser.position.push(index);
      this.tempSetupArr.push(index);
    }

    if(this.coinFlip() == 0) {
      // place horizontally 
      // check lateral wraparound
      while(this.NPCcruiser.position.length < 4) {
        if(this.NPCcruiser.position[this.NPCcruiser.position.length - 1].charAt(1) == 9) {
          this.placeCruiser();
        } 
        const nextIndex = parseInt(this.NPCcruiser.position[this.NPCcruiser.position.length - 1]) + 1;
        const strIndex = ('00' + nextIndex).slice(-2);
        if(this.canPlace(strIndex)) {
          this.NPCcruiser.position.push(strIndex);
          this.tempSetupArr.push(strIndex);
        } else {
          this.placeCruiser();
        }
      }
      
    } else {
      // place veritcally
      // check vertical wraparound
      while(this.NPCcruiser.position.length < 4) {
        if(this.NPCcruiser.position[this.NPCcruiser.position.length - 1].charAt(0) == 9) {
          this.placeCruiser();
        } 
        const nextIndex = parseInt(this.NPCcruiser.position[this.NPCcruiser.position.length - 1]) + 1;
        const strIndex = ('00' + nextIndex).slice(-2);
        if(this.canPlace(strIndex)) {
          this.NPCcruiser.position.push(strIndex);
          this.tempSetupArr.push(strIndex);
        } else {
          this.placeCruiser();
        }
      }
    }

    if(this.NPCcruiser.position.length != 4) {
      this.placeCruiser();
    }

    this.NPCcruiser.position.forEach(coord => {
      this.cpuCoords.push(coord);
    });
  }
  placeCarrier() {
    this.NPCcarrier.position = [];
    this.tempSetupArr = [];
    const index = this.getRandomIndex();
    // place first cell
    if(this.cpuCoords.includes(index)) {
      this.placeCarrier();
    } else {
      this.NPCcarrier.position.push(index);
      this.tempSetupArr.push(index);
    }

    if(this.coinFlip() == 0) {
      // place horizontally 
      // check lateral wraparound
      while(this.NPCcarrier.position.length < 5) {
        if(this.NPCcarrier.position[this.NPCcarrier.position.length - 1].charAt(1) == 9) {
          this.placeCarrier();
        } 
        const nextIndex = parseInt(this.NPCcarrier.position[this.NPCcarrier.position.length - 1]) + 1;
        const strIndex = ('00' + nextIndex).slice(-2);
        if(this.canPlace(strIndex)) {
          this.NPCcarrier.position.push(strIndex);
          this.tempSetupArr.push(strIndex);
        } else {
          this.placeCarrier();
        }
      }
      
    } else {
      // place veritcally
      // check vertical wraparound
      while(this.NPCcarrier.position.length < 5) {
        if(this.NPCcarrier.position[this.NPCcarrier.position.length - 1].charAt(0) == 9) {
          this.placeCarrier();
        } 
        const nextIndex = parseInt(this.NPCcarrier.position[this.NPCcarrier.position.length - 1]) + 1;
        const strIndex = ('00' + nextIndex).slice(-2);
        if(this.canPlace(strIndex)) {
          this.NPCcarrier.position.push(strIndex);
          this.tempSetupArr.push(strIndex);
        } else {
          this.placeCarrier();
        }
      }
    }

    if(this.NPCcarrier.position.length != 5) {
      this.placeCarrier();
    }

    this.NPCcarrier.position.forEach(coord => {
      this.cpuCoords.push(coord);
    });
  }
  randomizeComputerBoard() {

    this.placePatrol();
    this.placeFrigate();
    this.placeSubmarine();
    this.placeCruiser();
    this.placeCarrier();
    
    this.renderComputerBoard();

  }
  renderComputerBoard() {
    // setting classes for each cell per computer ship component
    this.NPCpatrol.position.forEach( coord => {
      const cell = document.querySelector(`#computer-${coord}`);
      cell.classList.add('computer-occupied');
      cell.classList.add('computer-patrol');
    });
    this.NPCfrigate.position.forEach( coord => {
      const cell = document.querySelector(`#computer-${coord}`);
      cell.classList.add('computer-occupied');
      cell.classList.add('computer-frigate');
    });
    this.NPCsubmarine.position.forEach( coord => {
      const cell = document.querySelector(`#computer-${coord}`);
      cell.classList.add('computer-occupied');
      cell.classList.add('computer-submarine');
    });
    this.NPCcruiser.position.forEach( coord => {
      const cell = document.querySelector(`#computer-${coord}`);
      cell.classList.add('computer-occupied');
      cell.classList.add('computer-cruiser');
    });
    this.NPCcarrier.position.forEach( coord => {
      const cell = document.querySelector(`#computer-${coord}`);
      cell.classList.add('computer-occupied');
      cell.classList.add('computer-carrier');
    });

    const board = document.querySelector('#computer-container');
    board.classList.toggle('show');

    this.forceUpdate();
  }

  canPlace(index) {
    // check for randomized computer placement
    if(this.cpuCoords.includes(index)) {
      return false;
    }
    // used for numerical comparisons
    const intIndex = parseInt(index);

    // first cell
    if(this.tempSetupArr.length === 0) {
      return true;
    // second cell
    } else if (this.tempSetupArr.length === 1) {
      // check wraparounds
      if((this.tempSetupArr[0].charAt(1) == 9 && index.charAt(1) == 0) ||
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
        if( 
          // check left and right of the beginning and end of array
          (this.tempSetupArr[0] == intIndex + 1 ||
          this.tempSetupArr[0] == intIndex - 1 ||
          this.tempSetupArr[this.tempSetupArr.length - 1] == intIndex + 1 ||
          this.tempSetupArr[this.tempSetupArr.length - 1] == intIndex - 1) &&
          // check wraparound placement
          (this.tempSetupArr[0].charAt(0) == index.charAt(0)) 
          ){
            return true;
          }
      // vertical ship
      } else {
        // check above and below of the beginnign and end of array
        if(this.tempSetupArr[0] == intIndex + 10 ||
          this.tempSetupArr[0] == intIndex - 10 ||
          this.tempSetupArr[this.tempSetupArr.length - 1] == intIndex + 10 ||
          this.tempSetupArr[this.tempSetupArr.length - 1] == intIndex - 10 ) {
            return true;
          }
      }
    }

  }


  handlePlayerClick(index) {
    const cell = document.querySelector(`#computer-${index}`);
    const switchCase = cell.classList[3];

    switch(switchCase) {
      case 'computer-patrol':
        this.NPCpatrol.hit();
        cell.classList.toggle('hit');
        break;
      case 'computer-frigate':
        this.NPCfrigate.hit();
        cell.classList.toggle('hit');
        break;
      case 'computer-submarine':
        this.NPCsubmarine.hit();
        cell.classList.toggle('hit');
        break;
      case 'computer-cruiser':
        this.NPCcruiser.hit();
        cell.classList.toggle('hit');
        break;
      case 'computer-carrier':
        this.NPCcarrier.hit();
        cell.classList.toggle('hit');
        break;
      default:
        cell.classList.toggle('miss');
        break;
    }
    // check the isSunk condition of the cell
    this.checkShip('player', switchCase);
    // check the win condition after every click
    this.checkWin('player');
    // follow up win condition check with computer move
    this.computerMove(); 
  }

  checkShip(user, shipType) {
    // check if player sunk the computer's ship
    if(user === 'player') {
      switch(shipType) {
        case 'computer-patrol':
          if(this.NPCpatrol.isSunk()) {
            alert('sunk computer patrol');
          }
          break;
        case 'computer-frigate':
          if(this.NPCfrigate.isSunk()) {
            alert('sunk computer frigate');
          }
          break;
        case 'computer-submarine':
          if(this.NPCsubmarine.isSunk()) {
            alert('sunk computer submarine');
          }
          break;
        case 'computer-cruiser':
          if(this.NPCcruiser.isSunk()) {
            alert('sunk computer cruiser');
          }
          break;
        case 'computer-carrier':
          if(this.NPCcarrier.isSunk()) {
            alert('sunk computer carrier');
          }
          break;
        default:
          break;
      }
    // check if computer sunk the player's ship
    } else {
      switch(shipType) {
        case 'player-patrol':
          if(this.patrol.isSunk()) {
            alert('sunk player patrol boat');
          }
          break;
        case 'player-frigate':
          if(this.frigate.isSunk()) {
            alert('sunk player frigate boat');
          }
          break;
        case 'player-submarine':
          if(this.submarine.isSunk()) {
            alert('sunk player submarine boat');
          }
          break;
        case 'player-cruiser':
          if(this.cruiser.isSunk()) {
            alert('sunk player cruiser boat');
          }
          break;
        case 'player-carrier':
          if(this.carrier.isSunk()) {
            alert('sunk player carrier boat');
          }
          break;
        default:
          break;
      }
    }
  }

  checkWin(user) {
    if(user === 'player') {
      if
        (this.NPCpatrol.isSunk() &&
        this.NPCfrigate.isSunk() &&
        this.NPCsubmarine.isSunk() &&
        this.NPCcruiser.isSunk() &&
        this.NPCcarrier.isSunk() ){
          this.setState({ winner: 'you' });
          this.gameOver('player');
      } else {
        return;
      }
    } else if (user === 'computer') {
      if
        (this.patrol.isSunk() &&
        this.frigate.isSunk() &&
        this.submarine.isSunk() &&
        this.cruiser.isSunk() &&
        this.carrier.isSunk() ){
          this.setState({ winner: 'computer' });
          this.gameOver('computer');
      } else {
        return;
      }
    }
  }

  gameOver(user) {
    const gameOverPrompt = document.querySelector('#game-over-container');
    gameOverPrompt.classList.toggle('show');
  }

  computerMove() {
    var index = Math.floor(Math.random() * 99).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    const cell = document.querySelector(`#player-${index}`);
    const cellType = cell.classList[2];

    if(!this.computerGuesses.includes(index)) {
      if(this.playerCoords.includes(index)) {
        switch(cellType) {
          case 'player-patrol':
            this.patrol.hit();
            break;
          case 'player-frigate':
            this.frigate.hit();
            break;
          case 'player-submarine':
            this.submarine.hit();
            break;
          case 'player-cruiser':
            this.cruiser.hit();
            break;
          case 'player-carrier':
            this.carrier.hit();
            break;
          default:
            break;
        }
        cell.classList.toggle('hit');
      } else {
        cell.classList.toggle('miss');
      }
      this.computerGuesses.push(index);

    } else {
      this.computerMove();
    }
    // check the isSunk condition of the cell
    this.checkShip('computer', cellType);
    // check the win condition after every move
    this.checkWin('computer');
  }

  handleGameOverClick() {
    window.location.reload(true);
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
      boardType='player'/>

      <Board 
      boardType='computer'
      handleCellClick= { this.handlePlayerClick }/>

      <GameOverPrompt 
      winner={this.state.winner}
      handleGameOverClick={this.handleGameOverClick}
      />

      </>
    )
  }
}

export default App;
