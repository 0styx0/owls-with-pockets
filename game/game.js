const gameSettings = {
    boardWidth: 3,
    boardHeight: 3,
    gameScript: `
-- No setup required
Log("Setup!")

function getMyPiece()
    if PlayerNumber == 0 then
        return "white"
    elseif PlayerNumber == 1 then
        return "black"
    end
end

function placed(x, y)
    if GetPiece(x, y) == null then
        SetPiece(x, y, getMyPiece())
    end
end
CallbackPlaced(placed)

function testForWin(coord)
    
end
CallbackTestForWin(testForWin)
`,
};

class Grid {
    constructor() {
        const totalSize = gameSettings.boardWidth * gameSettings.boardHeight;
        this.grid = new Array(totalSize);
        for (let i = 0; i < totalSize; i++) {
            this.grid[i] = undefined;
        }
    }
    getPiece(x, y) {
        return this.grid[x + y * gameSettings.boardWidth];
    }
    setPiece(x, y, piece) {
        this.grid[x + y * gameSettings.boardWidth] = piece;
    }
}

window.onload = function() {
    let compileVM = new shine.VM();
    shine.luac.init(compileVM);
    shine.luac.compile(gameSettings.gameScript, function (err, bc) {
        if (err) {
            console.log("ERROR COMPILING SCRIPT", err);
        }
        
        let canvas = document.getElementById("game-canvas");
        let context = canvas.getContext("2d");
        let grid = new Grid();

        let scriptCallbacks = {};
        let vm = new shine.VM({
            PlayerNumber: 0,
            Log: function (msg) { console.log(msg); },
            CallbackPlaced: function (f) { scriptCallbacks.placed = f; },
            CallbackTestForWin: function (f) { scriptCallbacks.testForWin = f; },
            GetPiece: function(x, y) { grid.getPiece(x, y); },
            SetPiece: function(x, y, piece) { grid.setPiece(x, y, piece); }
        });
        vm.load(bc);

        const frameTime = 1.0 / 3.0 * 1000.0;
        setInterval(function() {
            everyFrame(canvas, context, grid, scriptCallbacks);
        }, frameTime);
        canvas.addEventListener("click",
                                function(event) {
                                    onClick(event, scriptCallbacks)
                                },
                                false);
    })
};

function everyFrame(canvas, context, grid, callbacks) {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
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
            context.beginPath();
			context.arc(
				(x + 0.5) * tileWidth,
				(y + 0.5) * tileHeight,
				0.45 * tileWidth,
				0, 2 * Math.PI
			);
			context.fill();
        }
    }
    // Test for win condition
    if (callbacks.testForWin) {
        callbacks.testForWin.call();
    }
}

function onClick(event, callbacks) {
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
    callbacks.placed.apply([x, y]);
}
