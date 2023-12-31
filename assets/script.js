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
                if(currentTurn === "Player 1's turn!"){
                    currentTurn = "Player 2's turn!"
                } else {
                    currentTurn = "Player 1's turn!"
                }
                turnDisplay()
            }
        }
        prevBundleAmount = {...stickBundle}
    }

    //Turn based display & functionality
    let turnSec = document.getElementById('turnSec')
    let currentTurn = "Player 1's turn!"
    function turnDisplay() {
        let turnDiv = document.getElementById('turnDiv')
        if(!turnDiv) {
            turnDiv = document.createElement('div')
            turnDiv.setAttribute('id', 'turnDiv')
            turnDiv.setAttribute('class', 'fs-4 text-center p-4')
            turnSec.appendChild(turnDiv)
        }
        return turnDiv.textContent = currentTurn
    }

    //Display starting player's turn (player 1)
    turnDisplay()

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
            infoDiv.textContent = "Game Info"
            infoDiv.setAttribute('class', 'container-xl flex-grow-1')
            infoDiv.setAttribute('id', 'gameInfo')
            footer.append(infoDiv)
        }
    })
})