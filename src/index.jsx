
import React from 'react'; /* React is JS lib buildon UI interactive apps Web/Mobile*/
import ReactDOM from 'react-dom/client'; /* ReactDOM */
import './index.css';

// Square is a component here a function component
// props is an object that stores the properties of the component
// props is read-only -> immutable
// props are passed from a parent component to a child component
function Square(props) {
	return (
	  <button className="square" onClick={props.onClick}>
		{props.value}
	  </button>
	)
}
// OTHER WAY TO DO IT
//  class Square extends React.Component {

// 	render() {
// 	  return (
// 		React.createElement('button', {className:'square', onClick:'{()=> alert("clic")}'}, this.props.value)
// 	  );
// 	}
//  }

// Calculate Winner of the game
function CalculateWinnerOfTheGame(squares) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }
	}
	return null;
  }

// Fonction
// square is an array stored in Board
class Board extends React.Component {



	renderSquare(i) {
		return (
		<Square
			value={this.props.squares[i]}
			// onClick is what is called when the button is clicked
			onClick={() => this.props.onClick(i)}
		/>
		);
	}


	render() {

		return (
		<div>
		  <div className="board-row">
			{this.renderSquare(0)}
			{this.renderSquare(1)}
			{this.renderSquare(2)}
		  </div>
		  <div className="board-row">
			{this.renderSquare(3)}
			{this.renderSquare(4)}
			{this.renderSquare(5)}
		  </div>
		  <div className="board-row">
			{this.renderSquare(6)}
			{this.renderSquare(7)}
			{this.renderSquare(8)}
		  </div>
		</div>
	  );
	}
  }

class Game extends React.Component {

	constructor(props) {   
		super(props);
		this.state = {  
				// an array to store the history of the game
			    history: [{squares: Array(9).fill(null),}],
				// used to know whose turn it is
				xIsNext: true,
				// setNumper is used to know which step we are in
				stepNumber: 0,
				};
			}
		
	handleClick(i) {
			const history = this.state.history.slice(0, this.state.stepNumber + 1);
			const current = history[history.length - 1];
			const squares = current.squares.slice();
			if (CalculateWinnerOfTheGame(squares) || squares[i]) {
			  return;
			}
			squares[i] = this.state.xIsNext ? 'X' : 'O';
			this.setState({
				// history is updated with the new array
				// concat() is used to add a new element to the array
				history: history.concat([{
					squares: squares
				}]),
			squares: squares,
			stepNumber:history.length,
			xIsNext: !this.state.xIsNext,
			});
		}
	
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	render() {
		const History = this.state.history;
		const Current = History[this.state.stepNumber];
		let status;
		const WinnerOfTheGame = CalculateWinnerOfTheGame(Current.squares);
		
		if (WinnerOfTheGame) {
			status = 'Winner: ' + WinnerOfTheGame;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		const moves = History.map((step, move)=>{
			const desc = move ? 
			'Go to move numéro : ' + move :
			'Go to game start' ;
			return (
				<li key={move}>
					<button onClick={()=> this.jumpTo(move)}>{desc}</button>
				</li>
			)
		})

	  	return (
		<div className="game">
		  <div className="game-board">
			<Board 
			 	squares={Current.squares}
				onClick={(i) => this.handleClick(i)}/>
		  </div>
		  <div className="game-info">
			<div>{status}</div>
			<ol>{moves}</ol>
		  </div>
		</div>
	  );
	}
  }

  // ========================================

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
