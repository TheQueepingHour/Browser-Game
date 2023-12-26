document.addEventListener('DOMContentLoaded',async () => {
    

    //Button Logic
    let footer = document.getElementById('pageFoot')
    let infoButton = document.getElementById('infoButton')
    infoButton.addEventListener('click', () => {
        let infoDiv = document.getElementById('gameInfo')
        
        if(infoDiv){
            footer.removeChild(infoDiv)
        } else {
            infoDiv = document.createElement('div')
            infoDiv.textContent = "Sticks is a turn based player vs player game that is very simple. Each player is given two bundles, and each bundle can hold up to 4 sticks. Players will take turns adding their amount of sticks to the other player(without losing their own), until the player reaches 4 sticks. If a bundle goes over 4 sticks, their bundle will break and cannot be used for giving/taking. The game is won if you break both of the opponents bundles. If a player loses one of their bundles, that bundle is destroyed until the player makes a split. A split is a move that will divide your current sticks into 2 equal bundles and reinstate your broken bundle. However, a split can only be performed on bundles that have an even number of sticks(E.g. A player can split a bundle of 2 or 4, but not 1 or 3). "
            infoDiv.setAttribute('class', 'container-xl flex-grow-1')
            infoDiv.setAttribute('id', 'gameInfo')
            footer.append(infoDiv)
        }
    })
})