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

    //Moved button variables
    let button1 = document.getElementById('p1BundleBtn')
    let button2 = document.getElementById('p2BundleBtn')
    let button3 = document.getElementById('p1Bundle2Btn')
    let button4 = document.getElementById('p2Bundle2Btn')


    //Function for showing amount of sticks
    function handleBundles() {
        for (let bundle in stickBundle) {
            let textTag = document.getElementById(`${bundle}`)
            textTag.textContent = stickBundle[bundle]
        }
    }
    handleBundles()

    //Function to check for changes in stick amount
    function stickCheck() {
        for (let bundle in stickBundle) {
            if(stickBundle[bundle] !== prevBundleAmount[bundle]){
                //test log
                console.log('bundle change occurred')
                turnSwitch()
            }
            //break player bundle after they reach max sticks
            if(stickBundle[bundle] > maxSticks) {
                bundleBreak(bundle)
            }
        }
        prevBundleAmount = {...stickBundle}
    }
    //Event listener for turn changing
    document.addEventListener('click', () => {
        stickCheck()
    })
    //New function for determining button ID based on bundle
    function bundleButtonID(bundleID){
        let playerNumber = bundleID.charAt(1)
        let buttonNumber = bundleID.includes("2", 7) ? "2Btn" : "Btn"
        console.log(buttonNumber)
        return `p${playerNumber}Bundle${buttonNumber}`
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
        enableButtons(null)
        if(currentPlayer === "Player 1") {
            turnDiv.setAttribute('style', 'color: black')
            // button2.disabled = true
            // button4.disabled = true
            return turnDiv.textContent = currentTurn
        } else if (currentPlayer === "Player 2") {
            turnDiv.setAttribute('style', 'color: white')
            // button1.disabled = true
            // button3.disabled = true
            return turnDiv.textContent = currentTurn
        }

    }
    //Display starting player's turn (player 1)
    turnDisplay()
    //Turn switching function
    function turnSwitch() {
        currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1"
        currentTurn = `${currentPlayer}'s turn!`
        console.log('turn switched to ', currentPlayer)
        turnDisplay()
    }

    //Function to enable/disabled buttons
    function enableButtons(button) {
        if(button === button1){
            // button3.disabled = true
            if(currentPlayer === "Player 1"){
                button3.disabled = true
                button2.disabled = false
                button4.disabled = false
            } else if(currentPlayer === "Player 2"){
                button1.disabled = false
                button3.disabled = false
            }
        } else if(button === button3){
            button1.disabled = true
            if(currentPlayer === "Player 1"){
                button2.disabled = false
                button4.disabled = false
            } else if(currentPlayer === "Player 2"){
                button1.disabled = false
                button3.disabled = false
            }
        } else if(button === button2){
            button4.disabled = true
            
        } else if(button === button4){
            button2.disabled = true
        }
        
    }
    
    
    //Function for adding sticks
    //Store variable for current selected amount
    let currentBundle = null

    function handleSticks(bundle) {
        if (currentBundle === null) {
            currentBundle = bundle
        } else {
            stickBundle[bundle] += stickBundle[currentBundle]
            currentBundle = null
            handleBundles()
            stickCheck()
        }
    }
    //Event listeners for buttons
    button1.addEventListener('click', () => {
        handleSticks('p1BundleAmount')
        enableButtons(button1)
        button1.disabled = true
    })
    
    button2.addEventListener('click', () => {
        handleSticks('p2BundleAmount')
        enableButtons(button2)
        button2.disabled = true
    })
    
    button3.addEventListener('click', () => {
        handleSticks('p1Bundle2Amount')
        enableButtons(button3)
        button3.disabled = true
    })
    
    button4.addEventListener('click', () => {
        handleSticks('p2Bundle2Amount')
        enableButtons(button4)
        button4.disabled = true
    })

    //Breaks bundle(s) when they exceed max sticks
    function bundleBreak(bundle) {
        let buttonID = bundleButtonID(bundle)
        let button = document.getElementById(buttonID)
        console.log(buttonID, button)
        if(button) {
            button.disabled = true
            button.setAttribute('class', 'brokenBundle')
            console.log(button.classList)
        }
    }

    //Win condition logic
    

    //Button Logic
    let footer = document.getElementById('pageFoot')
    let infoButton = document.getElementById('infoButton')
    infoButton.addEventListener('click', () => {
        let infoDiv = document.getElementById('gameInfo')
        
        if(infoDiv){
            footer.removeChild(infoDiv)
        } else {
            infoDiv = document.createElement('div')
            infoDiv.innerHTML = `Sticks is a turn based player vs player game that is very simple.<br> Each player is given two bundles, and each bundle can hold up to 4 sticks.<br> Players will take turns adding their amount of sticks to the other player's bundles. If a bundle goes over 4 sticks, their bundle will break and cannot be used for giving/taking.<br> The game is won if you break both of the opponents bundles.<br> If a player loses one of their bundles, that bundle is destroyed until the player makes a split.<br> A split is a move that will divide your current sticks into 2 equal bundles and reinstate your broken bundle. However, a split can only be performed on bundles that have an even number of sticks(E.g. A player can split a bundle of 2 or 4, but not 1 or 3).<br> For each turn, players will click on one of their bundles, and then choose which of their opponent's bundles that will be added to. `
            infoDiv.setAttribute('class', 'container-xl flex-grow-1 overflow-scroll')
            infoDiv.setAttribute('id', 'gameInfo')
            infoDiv.setAttribute('style', 'background: #839791')
            footer.append(infoDiv)
        }
    })
})