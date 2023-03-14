function init() {
  let counter = 0,
    currentPoints = 0,
    highestPoints = 100
  let toBeChecked = []
  let gameFinished = null

  const cardEl = document.querySelectorAll('.card')
  const backSideEl = document.querySelectorAll('.back')
  const imgEl = document.querySelectorAll('img')
  const scoreEl = document.querySelector('.current-guesses')
  const highestScoreEl = document.querySelector('.best-score')
  const startNewGameBtn = document.querySelector('.btn')

  const backSideArr = Array.from(backSideEl)

  // Creates new game
  const createNewGame = () => {
    gameFinished = false
    toBeChecked = []

    const fruits = [
      './fruit-images/apple.png',
      './fruit-images/kiwi.png',
      './fruit-images/blueberry.png',
      './fruit-images/cherry.png',
      './fruit-images/grape.png',
      './fruit-images/mango.png',
      './fruit-images/orange.png',
      './fruit-images/apple.png',
      './fruit-images/kiwi.png',
      './fruit-images/blueberry.png',
      './fruit-images/cherry.png',
      './fruit-images/grape.png',
      './fruit-images/mango.png',
      './fruit-images/orange.png',
      './fruit-images/coconut.png',
      './fruit-images/joker.png',
      './fruit-images/coconut.png',
      './fruit-images/joker.png',
      './fruit-images/pineapple.png',
      './fruit-images/pineapple.png',
    ]

    imgEl.forEach((img) => {
      const randomNum = Math.floor(Math.random() * fruits.length)
      const fruit = fruits.splice(randomNum, 1)
      img.setAttribute('src', fruit)
    })

    cardEl.forEach((card) => {
      card.children[0].style.display = 'flex'
      card.children[1].style.display = 'none'
    })

    scoreEl.innerHTML = 'Current guesses: '
    counter = 0
  }

  // Event handler for card click
  const flipCard = (e) => {
    counter++
    let displayStyle = e.currentTarget.style.display

    if (displayStyle === 'flex') {
      e.currentTarget.style.display = 'none'
      e.currentTarget.parentElement.children[1].style.display = 'flex'
    } else {
      e.currentTarget.style.display = 'flex'
      e.currentTarget.parentElement.children[1].style.display = 'none'
    }

    toBeChecked.push(e.currentTarget)

    // Checks if the flipped cards match up
    if (counter > 0 && counter % 2 === 0) {
      backSideEl.forEach((backSide) => {
        backSide.style.pointerEvents = 'none'
      })

      let last =
        toBeChecked[toBeChecked.length - 1].parentElement.children[1]
          .children[0].src
      let previous =
        toBeChecked[toBeChecked.length - 2].parentElement.children[1]
          .children[0].src

      currentPoints = counter / 2
      scoreEl.innerHTML = `Current guesses: ${currentPoints}`

      if (!(last === previous)) {
        setTimeout(() => {
          toBeChecked[
            toBeChecked.length - 1
          ].parentElement.children[1].style.display = 'none'
          toBeChecked[toBeChecked.length - 1].style.display = 'flex'

          toBeChecked[
            toBeChecked.length - 2
          ].parentElement.children[1].style.display = 'none'
          toBeChecked[toBeChecked.length - 2].style.display = 'flex'

          backSideEl.forEach((backSide) => {
            backSide.style.pointerEvents = 'auto'
          })
        }, 700)
      } else {
        setTimeout(() => {
          backSideEl.forEach((backSide) => {
            backSide.style.pointerEvents = 'auto'
          })
        }, 700)
      }
    }

    // Checks if the game is finished
    if (counter >= 20) {
      for (let i in backSideArr) {
        if (backSideEl[i].style.display === 'flex') {
          gameFinished = false
          break
        } else {
          gameFinished = true
        }
      }
    }

    if (gameFinished) {
      if (currentPoints < highestPoints) {
        highestPoints = currentPoints
      }
      highestScoreEl.innerHTML = `Best score: ${highestPoints}`
    }
  }

  backSideEl.forEach((backSide) => {
    backSide.addEventListener('click', (e) => {
      flipCard(e)
    })
  })

  startNewGameBtn.addEventListener('click', createNewGame)

  createNewGame()
}

window.onload = init
