
// elements
const cards = document.querySelectorAll('.img-card');
const imageFront = document.querySelectorAll('.img-front');
const countScore = document.querySelector('.game-score');
const HighScore = document.querySelector('.high-score');
console.log(countScore)
let cardFlipped = false;
let cardOne;
let cardTwo;
// store score in local storage and load it with the satrt of the game
let score = 1;
// end the game under a certain condition
let endGame = 0;
lock = false;
// console.log(cards.length)

// handler
class Handler {
    constructor() {

    }
    showHighScore() {
        if (!localStorage.getItem('HighScore') === true) {
            HighScore.innerText = "High Score: " + 0;
        }
        else {
            HighScore.innerText =  localStorage.getItem('HighScore');
        }

    }
    flip(e) {
        // disable flipping a card twice
        if (lock) return;
        // disable comparing the same card
        if (e.target.parentElement === cardOne) return;
        // flip card
        e.target.parentElement.classList.toggle('flipped');
        if (!cardFlipped) {
            cardFlipped = true;
            cardOne = e.target.parentElement;
            cardOperation.gameScore(score++);
            // score++;
        }
        else {
            cardTwo = e.target.parentElement;
            cardOperation.gameScore(score++);
            // score++;
            cardFlipped = false;
            // compare the two cards
            cardOperation.compare(cardOne, cardTwo);
        }
        console.log(score)
    }
    compare(first, second) {
        // console.log(first)
        // console.log(second)
        let firstSrc = first.children[0].getAttribute('src');
        let secondSrc = second.children[0].getAttribute('src')
        // cards don't show the same img
        if (firstSrc !== secondSrc) {
            lock = true;
            console.log('there are not equal')
            setTimeout(function () {
                first.classList.toggle('flipped')
                second.classList.toggle('flipped')
                lock = false;
            }, 1000)
        }
        else {
            // keep cards flipped
            first.removeEventListener('click', cardOperation.flip)
            second.removeEventListener('click', cardOperation.flip)
            endGame += 2
            cardOperation.endGame(endGame)

            console.log('they are equal and event listener has been removed')
        }

    }
    gameScore(score) {
        // score = ' ' + score

        countScore.innerText = "Score: " + score
        console.log(countScore.innerText)
    }
    endGame(cardsRevealed) {
        if (cardsRevealed === cards.length) {
            countScore.innerText = "Score: " + score
            HighScore.innerText = "High Score: " + score;
            localStorage.setItem('HighScore', HighScore.innerText)
            console.log('game is over');
        }
        else {
            console.log('score: ', score)
            console.log('cards Revealed: ', cardsRevealed);
        }
    }
    shuffle() {
        let shuffle = []
        console.log(cards.length)
        let paths = [];
        for (let i = 1; i <=cards.length /2; i++){
            shuffle.push(i);
        }
        shuffle = shuffle.concat(shuffle)
        shuffle = shuffle.sort(() => Math.random() - 0.5)
        // console.log(shuffle)
        for (let p of shuffle){
            let path = `imgs/dog${p}.jpg`
            // console.log(path)
            paths.push(path);
        }
        console.log(paths)
         cardOperation.populate(paths);
    }
    populate(srcs) {
        for (let i = 0; i < srcs.length; i++) {
            imageFront[i].setAttribute('src', srcs[i])
        }
        // console.log(imageFront);
    }
}

const cardOperation = new Handler()

// eventListeners
document.addEventListener('DOMContentLoaded', cardOperation.shuffle);
document.addEventListener('DOMContentLoaded', cardOperation.showHighScore);
cards.forEach(card => {
    card.addEventListener('click', cardOperation.flip)
})