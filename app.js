function init() {
    
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
    
    let counter = 0, currentPoints = 0, highestPoints = 0;
    let toBeChecked = [];

    let backSideEl = document.querySelectorAll('.back');

    console.log(backSideEl);

    let imgEl = document.querySelectorAll('img');
    let scoreEl = document.querySelector('.current-guesses');

    imgEl.forEach(x => {
        let randomNum = Math.floor(Math.random() * fruits.length);
        let fruit = fruits.splice(randomNum, 1);
        x.setAttribute('src', fruit);
    });

    const flipCard = (e) => {
        counter++;

        let displayStyle = e.currentTarget.children[1].style.display;

        if (displayStyle === 'none') {
            e.currentTarget.children[0].style.display = 'none';
            e.currentTarget.children[1].style.display = 'flex';
        }
        else {
            e.currentTarget.children[1].style.display = 'none';
            e.currentTarget.children[0].style.display = 'flex';
        }

        toBeChecked.push(e.currentTarget);
        
        console.log(toBeChecked);

        if (counter > 0 && counter % 2 === 0) {
            
            let last = toBeChecked[toBeChecked.length - 1].children[1].children[0].src;
            let previous = toBeChecked[toBeChecked.length - 2].children[1].children[0].src;
            
            currentPoints = counter / 2;
            scoreEl.innerHTML = currentPoints;
            
            if (last === previous || ((previous.includes('star')) || (last.includes('star')))) {
                
                toBeChecked[toBeChecked.length - 1].removeEventListener('onclick', flipCard);
                toBeChecked[toBeChecked.length - 2].removeEventListener('onclick', flipCard);

            }
            else {
                setTimeout(function () {
                    toBeChecked[toBeChecked.length - 1].children[0].style.display = 'flex';
                    toBeChecked[toBeChecked.length - 1].children[1].style.display = 'none';
    
                    toBeChecked[toBeChecked.length - 2].children[0].style.display = 'flex';
                    toBeChecked[toBeChecked.length - 2].children[1].style.display = 'none';
                }, 700)
            }

        }

    }

    let cards = document.querySelectorAll('.card');

    cards.forEach(x => {
        x.addEventListener('click', e => {
            flipCard(e);
        })
    });

}

window.onload = init;