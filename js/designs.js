const cards = [
	'fa-umbrella',
	'fa-umbrella', 
	'fa-anchor', 
	'fa-anchor', 
	'fa-snowflake', 
	'fa-snowflake',
	'fa-heart',
	'fa-heart',
	'fa-gem',
	'fa-gem',
	'fa-bug',
	'fa-bug',
	'fa-moon',
	'fa-moon',
	'fa-star',
	'fa-star'];
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
		const innerNewElement = document.createElement('div');
		newElement.classList.add('card', 'back-card');
		innerNewElement.classList.add('fas', shuffledCards[i], 'fa-7x');
		newElement.appendChild(innerNewElement);
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

function restartGame() {
	boardCards = document.getElementsByClassName('card');
	for (let i=0; i<boardCards.length; i++) {
		boardCards[i].classList.remove('front-card');
		boardCards[i].classList.add('back-card');
	}
	flippedPair = [];
	totalMoves = 0;
	flippedCards = 0;
	showMoves();
}

function youWon() {
	let message = `Congratulations! You won the game with a total of ${totalMoves} Moves.`;
	console.log(message);
    let board = document.getElementsByClassName('board')[0];
    board.classList.add('win');
	board.innerHTML = `<p class="win-message">${message}</p></br>
					   <p class="win-message">Do you want to play again?</p>
					   <button class="play-again">Play</button>`;
	return board;
}

function showMoves() {
	if (totalMoves === 1) {
		document.getElementsByClassName('moves')[0].textContent = `${totalMoves} Move`;
	} else {
		document.getElementsByClassName('moves')[0].textContent = `${totalMoves} Moves`;
	}
}

function checkCards() {
	if (flippedPair[0].innerHTML === flippedPair[1].innerHTML) {
		flippedPair[0].classList.add('match');
		flippedPair[1].classList.add('match');
		console.log("It is a match!");
		totalMoves += 1;
		showMoves();
		flippedCards += 2;
		if (flippedCards === cards.length) {
			setTimeout(function () {
	    		youWon();
			}, 2500);
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
}

function getElement(element) {
	if (element.parentNode.nodeName === '#document' || element.parentNode.parentNode.nodeName === '#document') {
		return false;
	} else {
		if (element.classList.contains("card")) {
			return element;
		} else if (element.parentNode.classList.contains("card") || element.parentNode.classList.contains("inner-refresh")) {
			return element.parentNode;
		} else if (element.parentNode.parentNode.classList.contains("card") || element.parentNode.parentNode.classList.contains("inner-refresh")) {
			return element.parentNode.parentNode;
		} else {
			return false;
		}
	}
}

document.addEventListener('click', function(e) {
	element = getElement(e.target);
	let board = document.getElementsByClassName('board')[0];
	if (element != false && element != undefined && element != null) {
		if (element.classList.contains('fail') && element.classList.contains('card') && !element.classList.contains('front-card')) {
			element.classList.remove('fail');
		}
		if (flippedPair.length === 0 && element.classList.contains('card') && !element.classList.contains('front-card')) {
			flipCard(element);
		} else if (flippedPair.length === 1 && element.classList.contains('card') && !element.classList.contains('front-card')) {
			flipCard(element);
		    setTimeout(function () {
		    	checkCards();
			}, 2000);
		} else if (element.classList.contains('inner-refresh')) {
			board.innerHTML = "";
			restartGame();
	    	setUpBoard();
		}
	}
	if (e.target.classList.contains('play-again')) {
		board.classList.remove('win');
		board.innerHTML = "";
		restartGame();
	    setUpBoard();
	}
});
