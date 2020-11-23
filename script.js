$('.ui.accordion').accordion()


$('.ui.dropdown')
	.dropdown();


// Circle Progress
var circle = document.querySelector('.progress-ring__circle')
var radius = circle.r.baseVal.value
var circumference = radius * 2 * Math.PI

circle.style.strokeDasharray = `${circumference} ${circumference}`
circle.style.strokeDashoffset = `${circumference}`

function setProgress(percent) {
	const offset = circumference - (percent / 100) * circumference
	circle.style.strokeDashoffset = offset
}

const input = document.querySelector('input')
setProgress(input.value)


input.addEventListener('change', function (e) {
	if (input.value < 101 && input.value > -1) {
		// setProgress(input.value)
		setProgress(input.value)
	}
})