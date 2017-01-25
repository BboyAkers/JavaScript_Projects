
const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');


function setDate() {
	const now = new Date();
	const seconds = now.getSeconds();
	const minutes = now.getMinutes();
	const hours = now.getHours();

	const secondsDegrees = ((seconds / 60) * 360) + 90;
	const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;;
	const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;
	
	secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
	minHand.style.transform = `rotate(${minutesDegrees}deg)`;
	hourHand.style.transfrom = `rotate(${hoursDegrees} deg)`;
}

setInterval(setDate, 1000);
setDate();