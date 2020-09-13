import React from "react";
import { connect } from 'react-redux';

interface State {};

const gameSettings = {
    totalPlayers: 2,
    boardWidth: 15,
    boardHeight: 15,
};

class Grid {
    grid: (string | undefined)[];
    constructor() {
        const totalSize = gameSettings.boardWidth * gameSettings.boardHeight;
        this.grid = new Array(totalSize);
        for (let i = 0; i < totalSize; i++) {
            this.grid[i] = undefined;
        }
    }
    getPiece(x: number, y: number) {
        return this.grid[x + y * gameSettings.boardWidth];
    }
    setPiece(x: number, y: number, piece: string) {
        this.grid[x + y * gameSettings.boardWidth] = piece;
    }
}

function everyFrame(canvas: any, context: any, grid: Grid) {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 600, 600);
    // Draw grid
    const tileWidth = canvas.width / gameSettings.boardWidth;
    const tileHeight = canvas.height / gameSettings.boardHeight;
    context.strokeStyle = "#000000";
    for (let x = 0; x < gameSettings.boardWidth; x++) {
        context.beginPath();
        context.moveTo(x * tileWidth, 0);
        context.lineTo(x * tileWidth, canvas.height);
        context.stroke();
    }
    for (let y = 0; y < gameSettings.boardHeight; y++) {
        context.beginPath();
        context.moveTo(0, y * tileHeight);
        context.lineTo(canvas.width, y * tileHeight);
        context.stroke();
    }
    // Draw pieces
    context.fillStyle = '#aaaaaa';
    for (let x = 0; x < gameSettings.boardWidth; x++) {
        for (let y = 0; y < gameSettings.boardHeight; y++) {
            if (grid.getPiece(x, y) === undefined) {
                continue;
            }
            // Draw every piece the same for now
            if (grid.getPiece(x, y) == "white") {
                context.fillStyle = "#dddddd";
            } else if (grid.getPiece(x, y) == "black") {
                context.fillStyle = "#222222";
            } else {
                context.fillStyle = "#ff0000"; // Means theres a bug
            }
            context.beginPath();
			context.arc(
				(x + 0.5) * tileWidth,
				(y + 0.5) * tileHeight,
				0.45 * tileWidth,
				0, 2 * Math.PI
			);
            context.stroke();
			context.fill();
        }
    }
}

function onClick(event: any, grid: Grid, gameState: any) {
    if (gameState.whoseTurn != gameState.playerNumber) {
        // Can't do anything if it's not your turn.
        return;
    }
    if (event.which !== 1) {
        return;
    }
    let rect = event.target.getBoundingClientRect();
    let absX = event.clientX - rect.left;
    let absY = event.clientY - rect.top;
    let colW = event.target.clientWidth / gameSettings.boardWidth;
    let rowH = event.target.clientHeight / gameSettings.boardHeight;
    let x = Math.trunc(absX / colW);
    let y = Math.trunc(absY / rowH);

    if (grid.getPiece(x, y) === undefined) {
        grid.setPiece(x, y, (gameState.playerNumber === 0) ? "white" : "black");
    }
    gameState.whoseTurn++;
    gameState.whoseTurn %= gameSettings.totalPlayers;
}

class GameComponent extends React.Component<{}, State> {
    componentDidMount() {
        // At this point, we should do a GET request to the server to get
        // the gameSettings for whatever game we're playing. We should
        // also do a GET request for our specific game to see which player
        // we are, whose turn it is, and so on.
        let canvas: any = document.getElementById("game-canvas");
        let context = canvas.getContext("2d");
        let grid = new Grid();

        let gameState = {
            playerNumber: 0, // This is different for all players involved
            whoseTurn: 0
        };

        const frameTime = 1.0 / 3.0 * 1000.0;
        setInterval(function() {
            everyFrame(canvas, context, grid);
        }, frameTime);
        
        canvas.addEventListener(
            "click",
            function(event: any) {
                onClick(event, grid, gameState)
            },
            false
        );
    }
    render() {
        const canvasStyle = {
            border: "1px solid #000000"
        };
        return (
            <div id={"game-canvas-container"}>
                <canvas id={"game-canvas"} width={600} height={600} style={canvasStyle}></canvas>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {}
};
export const GameContainer =
    connect(mapStateToProps, mapDispatchToProps)(GameComponent as any);
