//////////////////////////
// Landscaper
//////////////////////////

// By Christian Unger

//////////////////////////
// Player Object
//////////////////////////

const player = {
    // set up initial game state:
    wallet: 0,
    toolArr: ['teeth'],
    workDay: 1,
    // Cut Grass Function:
    mowLawns: () => {
        player.wallet += player.workDay;
        checkState();
        document.getElementById('wallet').innerHTML = `$${player.wallet}`;
        // console.log(player.wallet);
    },
    // Add Tools Method:
    getTool: (obj) => {
        if (player.toolArr.includes(obj.prerequisite) && (player.wallet >= obj.cost)) {
            if (player.toolArr.includes('teeth')) {
                player.toolArr = [];
                player.workDay = 0;
            }
            obj.prerequisite = 1;
            player.toolArr.push(obj.name, 1);
            player.wallet -= obj.cost;
            player.workDay += obj.workDay;
        }
        document.getElementById('mow-lawns').innerHTML = `$${player.workDay}`;
        document.getElementById('wallet').innerHTML = `$${player.wallet}`;
        // console.log(player.toolArr, player.wallet);
    },
    // Sell Tools Methhod:
    sellTool: (obj) => {
        let arr = player.toolArr;
        for (let i = 0; i < arr; i++) {
            if (arr[i] === obj.name) {
                arr.splice(i, 1);
            }
        }
        player.wallet += obj.cost;
        checkState();
        player.workDay -= obj.workDay;
        document.getElementById('mow-lawns').innerHTML = `$${player.workDay}`;
        document.getElementById('wallet').innerHTML = `$${player.wallet}`;
    },
};

//////////////////////////
// Tool Objects
//////////////////////////

const tools = {
    scissors: {
        name: 'scissors',
        prerequisite: 'teeth',
        cost: 5,
        workDay: 5,
        buyMessage: 'You bought a rusty pair of scissors!',
        sellMessage: 'You sold a pair of scissors!'
    },
    pushMower: {
        name: 'old-timey push mower',
        prerequisite: 'scissors',
        cost: 25,
        workDay: 50,
        buyMessage: 'You bought an old-timey push mower!',
        sellMessage: 'You sould an old-timey push mower!'
    },
    batteryMower: {
        name: 'battery-powered mower',
        prerequisite: 'old-timey push mower',
        cost: 250,
        workDay: 100,
        buyMessage: 'You bought a fancy battery-powered lawnmower!',
        sellMessage: 'You sold a battery-powered lawnmower!'
    },
    team: {
        name: 'team',
        prerequisite: 'battery-powered mower',
        cost: 500,
        workDay: 250,
        buyMessage: 'You hired a team of starving students!',
        sellMessage: 'You fired a team of starving students!'
    }
}

//////////////////////////
// Event Listeners
//////////////////////////

// Mow Lawns:
let mowLawnsL = document.getElementById('mow-lawns');
mowLawnsL.addEventListener("click", player.mowLawns);

//////////////////////////
// Buy Tool Listeners
//////////////////////////

// Buy Scissors:
document.getElementById('buy-scissors').addEventListener("click", function(){player.getTool(tools.scissors)});

// Buy Push Mower:
document.getElementById('buy-push-mower').addEventListener("click", function(){player.getTool(tools.pushMower)});

// Buy Battery Mower:
document.getElementById('buy-battery-mower').addEventListener("click", function(){player.getTool(tools.batteryMower)});

// Hire Team:
document.getElementById('hire-team').addEventListener("click", function(){player.getTool(tools.team)});

//////////////////////////
// Sell Tool Listeners
//////////////////////////

// sell Scissors:
document.getElementById('sell-scissors').addEventListener("click", function(){player.sellTool(tools.scissors)});

// sell Push Mower:
document.getElementById('sell-push-mower').addEventListener("click", function(){player.sellTool(tools.pushMower)});

// sell Battery Mower:
document.getElementById('sell-battery-mower').addEventListener("click", function(){player.sellTool(tools.batteryMower)});

// Hire Team:
document.getElementById('hire-team').addEventListener("click", function(){player.sellTool(tools.team)});

//////////////////////////
// Reset
//////////////////////////

const reset = () => {
    player.wallet = 0;
    player.toolArr = ['teeth'];
    player.workDay = 1;
    document.getElementById('mow-lawns').innerHTML = `$${player.workDay}`;
    document.getElementById('wallet').innerHTML = `$${player.wallet}`;
}

// Listener: 
document.getElementById('reset').addEventListener("click", reset);


const checkState = () => {
    if (player.wallet >= 5) {
        document.getElementById('buy-scissors').classList.remove('grey')
    }
    if (player.wallet >= 25) {
        document.getElementById('buy-push-mower').classList.remove('grey')
    }
    if (player.wallet >= 250) {
        document.getElementById('buy-battery-mower').classList.remove('grey')
    }
    if (player.wallet >= 500) {
        document.getElementById('hire-team').classList.remove('grey')
    }
    if (player.wallet >= 1000) {
        alert('You win!');
    }
}


//////////////////////////
// In-Game Messages
//////////////////////////

const updateBoard = (obj, buySellWin) => {
    let board = document.getElementById('hero-txt');
    let message = '';
    switch(buySellWin) {
        case 'buy':
            message += obj.buyMessage;
            break;
        case 'sell':
            message += obj.sellMessage;
            break;
        case 'win':
            message += 'YOU WIN!';
            break;
    }
    board.innerHTML = message;
}


////////////////////////////////////////////////

// fix infinite sell bug
// finish messaging logic
// add logic to grey out buttons if wallet drops below threshold - on anything that decrements wallet
