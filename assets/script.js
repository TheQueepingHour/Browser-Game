document.addEventListener('DOMContentLoaded',async () => {
    
    //Stick logic
    
    //Initial amount of sticks for each player
    let initialSticks = 1;
    //Maximum amount of sticks per bundle
    let maxSticks = 4;
    
    //Object containing bundle values
    let stickBundle = {
        p1Bundle: initialSticks,
        p2Bundle: initialSticks,
        p1Bundle2: initialSticks,
        p2Bundle2: initialSticks
    }
    

    //Function for showing amount of sticks
    function handleBundles() {
        for (let bundle in stickBundle) {
            document.getElementById(bundle).innerText = bundle + " " + stickBundle[bundle]
        }
    }
    
    //Function for adding sticks between bundles
    function handleSticks(bundle, target) {
        //Adding current bundle value to the target bundle
        stickBundle[target] += stickBundle[bundle]

        //Disable bundle if bundle exceeds max amount of sticks
        if(stickBundle[bundle] > maxSticks) {
            document.getElementById(bundle).disabled = true;
        }

        //Run handleBundles to update bundles
        handleBundles()
    }

    //Event listeners for bundles
    document.getElementById('p1Bundle').addEventListener('click', () => {
        handleSticks('p1Bundle', 'p2bundle');
    })
    
    document.getElementById('p1Bundle2').addEventListener('click', () => {
        handleSticks('p1Bundle2', 'p2Bundle2')
    })
    handleBundles()

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