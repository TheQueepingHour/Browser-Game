document.addEventListener('DOMContentLoaded', () => {

    //Stick logic
    
    //Initial amount of sticks for each player
    let initialSticks = 1;
    //Maximum amount of sticks per bundle
    let maxSticks = 4;
    //Object containing bundle values
    let stickBundle = {
        p1BundleAmount: initialSticks,
        p2BundleAmount: initialSticks,
        p1Bundle2Amount: initialSticks,
        p2Bundle2Amount: initialSticks
    }
    //Object containing previous amounts of sticks
    let prevBundleAmount = {...stickBundle}


    //Function for showing amount of sticks
    function handleBundles() {
        for (let bundle in stickBundle) {
            let textTag = document.getElementById(`${bundle}`)
            textTag.textContent = stickBundle[bundle]
        }
    }
    handleBundles()

    //Check for changes in stick amount
    function stickCheck() {
        for (let bundle in stickBundle) {
            if(stickBundle[bundle] !== prevBundleAmount[bundle]){
                //test log
                console.log('bundle change occurred')
                turnSwitch()
            }
        }
        prevBundleAmount = {...stickBundle}
    }
    //New function for determining button ID based on bundle
    function bundleButtonID(bundleID){

    }

    //Turn based display & functionality
    let turnSec = document.getElementById('turnSec')
    let currentPlayer = "Player 1"
    let currentTurn = `${currentPlayer}'s turn!`
    function turnDisplay() {
        let turnDiv = document.getElementById('turnDiv')
        if(!turnDiv) {
            turnDiv = document.createElement('div')
            turnDiv.setAttribute('id', 'turnDiv')
            turnDiv.setAttribute('class', 'fs-4 text-center pb-4')
            turnSec.appendChild(turnDiv)
        }
        // return turnDiv.textContent = currentTurn
        if(currentPlayer === "Player 1") {
            turnDiv.setAttribute('style', 'color: black')
            return turnDiv.textContent = currentTurn
        } else if (currentPlayer === "Player 2") {
            turnDiv.setAttribute('style', 'color: white')
            return turnDiv.textContent = currentTurn
        }
    }
    //Display starting player's turn (player 1)
    turnDisplay()
    //Turn switching function
    function turnSwitch() {
        currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1"
        currentTurn = `${currentPlayer}'s turn!`
        turnDisplay()
    }
    //Event listener for turn changing
    document.addEventListener('click', () => {
        stickCheck()
    })
    
    
    //Function for adding sticks
    //Store variable for current selected amount
    let currentBundle = null

    function handleSticks(bundle) {
        if (currentBundle === null) {
            currentBundle = bundle
        } else {
            stickBundle[currentBundle] += stickBundle[bundle]
            currentBundle = null
            handleBundles()
            stickCheck()
        }
    }
    //Event listeners for buttons
    let button1 = document.getElementById('p1BundleBtn')
    button1.addEventListener('click', () => {
        handleSticks('p1BundleAmount')
    })

    let button2 = document.getElementById('p2BundleBtn')
    button2.addEventListener('click', () => {
        handleSticks('p2BundleAmount')
    })

    let button3 = document.getElementById('p1Bundle2Btn')
    button3.addEventListener('click', () => {
        handleSticks('p1Bundle2Amount')
    })

    let button4 = document.getElementById('p2Bundle2Btn')
    button4.addEventListener('click', () => {
        handleSticks('p2Bundle2Amount')
    })



    //Button Logic
    let footer = document.getElementById('pageFoot')
    let infoButton = document.getElementById('infoButton')
    infoButton.addEventListener('click', () => {
        let infoDiv = document.getElementById('gameInfo')
        
        if(infoDiv){
            footer.removeChild(infoDiv)
        } else {
            infoDiv = document.createElement('div')
            infoDiv.textContent = "Sticks is a turn based player vs player game that is very simple. Each player is given two bundles, and each bundle can hold up to 4 sticks. Players will take turns adding their amount of sticks to the other player(without losing their own), until the player reaches 4 sticks. If a bundle goes over 4 sticks, their bundle will break and cannot be used for giving/taking. The game is won if you break both of the opponents bundles. If a player loses one of their bundles, that bundle is destroyed until the player makes a split. A split is a move that will divide your current sticks into 2 equal bundles and reinstate your broken bundle. However, a split can only be performed on bundles that have an even number of sticks(E.g. A player can split a bundle of 2 or 4, but not 1 or 3). For each turn, players will click on one of their opponents bundles to add to, and then choose which of their bundles that will be added to the other player’s bundle."
            infoDiv.setAttribute('class', 'container-xl flex-grow-1 overflow-scroll')
            infoDiv.setAttribute('id', 'gameInfo')
            infoDiv.setAttribute('style', 'background: #839791')
            footer.append(infoDiv)
        }
    })
})