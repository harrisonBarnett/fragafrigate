import React from 'react';

import Ship from './Ship';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.patrol = new Ship('patrol', 2, []);
        this.frigate = new Ship('frigate', 3, []);
        this.submarine = new Ship('submarine', 3, []);
        this.cruiser = new Ship('cruiser', 4, []);
        this.carrier = new Ship('carrier', 5, []);

        this.receiveAttack = this.receiveAttack.bind(this);
        this.setPosition = this.setPosition.bind(this);
    }

    receiveAttack(type, coord) {
        switch(type) {
            case 'patrol':
                if(this.patrol.position.includes(coord)) {
                    this.patrol.hit();
                    return ('attack received');
                }
                break;
            default:
                return //
            
        }
    }

    setPosition(type, coord) {
        switch(type) {
            case 'patrol':
                this.patrol.position = coord;
                break;
            default:
                return //
        }
        return this.patrol.position[0];
    }


    render() {
        const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

        return(
            <>
                <div 
                className={`gameboard-container ${this.props.boardType}-gameboard-container`}
                id={this.props.boardType+'-container'}>
                    { rows.map((row, rowIndex) => 
                        <div key={ rowIndex } className="gameboard-row">
                            { cols.map((col, colIndex) => 
                            <div 
                            key={ colIndex }
                            id={ this.props.boardType + '-' + rowIndex + colIndex }
                            className={ `gameboard-cell ${this.props.boardType}-cell` }
                            data={rowIndex + "" + colIndex}
                            onClick={ () => { this.props.handleCellClick((rowIndex + "" + colIndex)) } }>
                                { row + "-" + col }
                            </div>)}
                        </div>) }
                </div>
            </>
        )
    }
}
export default Board;