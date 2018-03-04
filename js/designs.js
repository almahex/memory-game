// let flippedPair = 0;
// let firstCard;
// let score = 0;

// All my cards
const cards = ['❤','❤','☂','☂','❄','❄'];
let flippedPair = [];
let totalMoves = 0;
let flippedCards = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Set up the board with all the cards shuffled
function setUpBoard() {
	let shuffledCards = shuffle(cards);
	const fragment = document.createDocumentFragment();
	for (let i=0; i<shuffledCards.length; i++) {
		const newElement = document.createElement('div');
		newElement.classList.add('card', 'back-card');
		newElement.textContent += shuffledCards[i];
       	fragment.appendChild(newElement);
    }
    let board = document.getElementsByClassName('board')[0];
    board.appendChild(fragment);
    return board;
}

document.addEventListener('DOMContentLoaded', function() {
	setUpBoard();
});

function flipCard(selectedCard) {
	selectedCard.classList.replace('back-card', 'front-card');
	flippedPair.push(selectedCard);
}

function flipBack(card) {
	card.classList.replace('front-card', 'back-card');
}

function youWon() {
	const message = `Congratulations! You won the game with a total of ${totalMoves} moves!`
	console.log(message);
}

function showMoves() {
	if (totalMoves === 1) {
		document.getElementsByClassName('moves')[0].textContent = `${totalMoves} Move`;
	} else {
		document.getElementsByClassName('moves')[0].textContent = `${totalMoves} Moves`;
	}
}

function checkCards() {
	console.log(flippedPair);
	if (flippedPair[0].textContent === flippedPair[1].textContent) {
		flippedPair[0].classList.add('match');
		flippedPair[1].classList.add('match');
		console.log("It is a match!");
		totalMoves += 1;
		showMoves();
		flippedCards += 2;
		if (flippedCards === cards.length) {
			youWon();
		} 
	} else {
		flippedPair[0].classList.add('fail');
		flippedPair[1].classList.add('fail');
		console.log("Keep trying!");
		flipBack(flippedPair[0]);
	    flipBack(flippedPair[1]);
		totalMoves += 1;
		showMoves();
	}
	flippedPair.pop();
	flippedPair.pop();
};

function getCard(card) {
	if (card.classList.contains("card")){
		return card;
	} else {
		return false;
	}
}

document.addEventListener('click', function(e) {
	card = getCard(e.target);
	if (card != false) {
		card.classList.remove('fail');
		if (flippedPair.length === 0) {
			flipCard(card);
		} else if (flippedPair.length === 1) {
			flipCard(card);
	    	setTimeout(function () {
	    		checkCards();
			}, 2000);
		}
	} else {
		console.log("Please, select a card.");
	}
});

// function checkContent() {
// 	return this.textContent;
// };

// function checkCards() {
// 	const firstCard = document.getElementsByClassName('front-card')[0];
// 	const secondCard = document.getElementsByClassName('front-card')[1];
// 	if (firstCard.textContent === secondCard.textContent) {
// 		console.log("It is a match!");
// 	}
// };

// function flipCard(selectedCard) {
// 	const backCard = selectedCard.getElementsByClassName('back-card')[0];
// 	const frontCard = selectedCard.getElementsByClassName('front-card')[0];
// 	backCard.style.display = 'none';
// 	frontCard.style.animation = 'flipInY 2s';
// 	frontCard.style.display = 'block';
// };

// document.addEventListener('click', function (e) {
// 	const selectedCard = e.path[0];
// 	if (selectedCard.className === "card"){
// 		flipCard(selectedCard);
// 	} else if (selectedCard.className === "front-card" || selectedCard.className === "back-card") {
// 		flipCard(selectedCard.parentNode);
// 	} else {
// 		console.log("this is not a card");
// 	}
// 	if (flippedPair === 1) {
// 		if (firstCard.textContent === selectedCard.getElementsByClassName('front-card')[0].textContent) {
// 			console.log("It is a match!");
// //			score += 1;
// //			restartGame();
// 		} else {
// 			console.log("Try again!");
// 			restartGame();
// 		}
// 		flippedPair = 0;
// 	} else if (flippedPair === 0) {
// 		if (selectedCard.className === "card"){
// 			firstCard = document.getElementsByClassName('front-card')[0];
// 			flippedPair = 1;
// 		} else if (selectedCard.className === "front-card" || selectedCard.className === "back-card") {
// 			firstCard = document.getElementsByClassName('front-card')[0];
// 			flippedPair = 1;
// 		} else {
// 			console.log("this is not a card");
// 		}
// 	}
// });

// document.addEventListener('animationend', function () {
// 	const frontCard = document.getElementsByClassName('front-card')[0];
// 	frontCard.style.animation = '';
// });

// function restartGame() {
// 	const frontCards = document.getElementsByClassName('front-card');
// 	const backCards = document.getElementsByClassName('back-card');
// 	for (let i=0; i<backCards.length; i++) {
// 		frontCards[i].style.display = 'none';
// 		backCards[i].style.animation = 'flipInY 3s';
// 		backCards[i].style.display = 'block';
// 	}
// 	flippedPair = 0;
// };

// const refresh = document.getElementsByClassName('refresh')[0];

// refresh.addEventListener('click', function() {
// 	restartGame();
// });