
function init() {
    
    let counter = 0, currentPoints = 0, highestPoints = 100;
    let toBeChecked = [];
    let gameFinished;
    
    let cardEl = document.querySelectorAll('.card');
    let backSideEl = document.querySelectorAll('.back');
    let imgEl = document.querySelectorAll('img');
    let scoreEl = document.querySelector('.current-guesses');
    let highestScoreEl = document.querySelector('.best-score');
    let startNewGameBtn = document.querySelector('.btn');

    let backSideArr = Array.from(backSideEl);
    

    // Creates new game
    const createNewGame = () => {

        gameFinished = false;
        toBeChecked = [];

        let fruits = ['./fruits-image/apple.png', './fruits-image/kiwi.png', 
        './fruits-image/blueberry.png', './fruits-image/cherry.png', 
        './fruits-image/grape.png', './fruits-image/mango.png', 
        './fruits-image/orange.png', './fruits-image/apple.png', 
        './fruits-image/kiwi.png', './fruits-image/blueberry.png', 
        './fruits-image/cherry.png', './fruits-image/grape.png', 
        './fruits-image/mango.png', './fruits-image/orange.png', 
        './fruits-image/coconut.png', './fruits-image/joker.png', 
        './fruits-image/coconut.png', './fruits-image/joker.png', 
        './fruits-image/pineapple.png', './fruits-image/pineapple.png'];

        imgEl.forEach(x => {
            let randomNum = Math.floor(Math.random() * fruits.length);
            let fruit = fruits.splice(randomNum, 1);
            x.setAttribute('src', fruit);
        });

        cardEl.forEach(x => {
            x.children[0].style.display = 'flex';
            x.children[1].style.display = 'none';
        });

        scoreEl.innerHTML = 'Current guesses: ';
        counter = 0;

    }


    // Event handler for card click
    const flipCard = (e) => {
        counter++;
        let displayStyle = e.currentTarget.style.display;
        
        if (displayStyle === 'flex') {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.children[1].style.display = 'flex';
        }
        else {
            e.currentTarget.style.display = 'flex';
            e.currentTarget.parentElement.children[1].style.display = 'none';
        }
        
        toBeChecked.push(e.currentTarget);
        

        // Checks if the flipped cards match up
        if (counter > 0 && counter % 2 === 0) {
            
            let last = toBeChecked[toBeChecked.length - 1].parentElement.children[1].children[0].src;
            let previous = toBeChecked[toBeChecked.length - 2].parentElement.children[1].children[0].src;
            
            currentPoints = counter / 2;
            scoreEl.innerHTML = `Current guesses: ${currentPoints}`;
            
            if (!(last === previous)) {
                setTimeout(function () {
                    toBeChecked[toBeChecked.length - 1].parentElement.children[1].style.display = 'none';
                    toBeChecked[toBeChecked.length - 1].style.display = 'flex';
    
                    toBeChecked[toBeChecked.length - 2].parentElement.children[1].style.display = 'none';
                    toBeChecked[toBeChecked.length - 2].style.display = 'flex';
                }, 700)
            }
            
        }


        // Checks if the game is finished
        if (counter >= 20) {

            for (let i in backSideArr) {
                if (backSideEl[i].style.display === 'flex') {
                    gameFinished = false;
                    break;
                }
                else {
                    gameFinished = true;
                }
            }
        }


        if (gameFinished) {
            if (currentPoints < highestPoints) {
                highestPoints = currentPoints;
            }
            highestScoreEl.innerHTML = `Best score: ${highestPoints}`;
        }
        
    }
    
    backSideEl.forEach(x => {
        x.addEventListener('click', e => {
            flipCard(e);
        })
    });
    
    startNewGameBtn.addEventListener('click', createNewGame);
    
    createNewGame();
}

window.onload = init;