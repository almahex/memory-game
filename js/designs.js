function flipCard(selectedCard) {
	const backCard = selectedCard.getElementsByClassName('back-card')[0];
	const frontCard = selectedCard.getElementsByClassName('front-card')[0];
	backCard.style.display = 'none';
	frontCard.style.animation = 'flipInY 2s';
	frontCard.style.display = 'block';
	frontCard.setAttribute("isFlipped", "true");
};

document.addEventListener('click', function (e) {
	const selectedCard = e.path[0];
	if (selectedCard.className === "card"){
		flipCard(selectedCard);
	} else if (selectedCard.className === "front-card" || selectedCard.className === "back-card") {
		flipCard(selectedCard.parentNode);
	} else {
		console.log("this is not a card");
	}
});

document.addEventListener('animationend', function () {
	const frontCard = document.getElementsByClassName('front-card');
	const count = 0;
	//console.log(frontCard);
	for (let i=0; i<frontCard.length; i++) {
		if (frontCard.isFlipped === "true"){
			count += 1;
		}
	}
	if (count === 1) {
		frontCard[0].style.animation = '';
	}
	if (count > 1) {
		frontCard[0].style.animation = '';
		restartGame();
	}
});

function restartGame() {
	const frontCards = document.getElementsByClassName('front-card');
	const backCards = document.getElementsByClassName('back-card');
	for (let i=0; i<backCards.length; i++) {
		frontCards[i].style.display = 'none';
		//frontCard[i].setAttribute("isFlipped", "false");
		backCards[i].style.animation = 'flipInY 3s';
		backCards[i].style.display = 'block';
	}
};

const refresh = document.getElementsByClassName('refresh')[0];

refresh.addEventListener('click', function() {
	restartGame();
});