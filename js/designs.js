const frontCard = document.getElementsByClassName('front-card')[0];
const backCard = document.getElementsByClassName('back-card')[0];


frontCard.addEventListener('click', function (e) {
	frontCard.style.display = 'none';
	backCard.style.animation = 'flipInY 3s';
    backCard.style.display = 'block';
});

frontCard.addEventListener('animationend', function () {
	backCard.style.animation = '';
});