$('.ui.accordion').accordion()


$('.ui.dropdown')
	.dropdown();


// Circle Progress



chapterAccordian = document.querySelector('#chapter-accordian')


function setAllProgress() {


	[...circles].forEach(circle => {
		let percent = chapterData.chapterProgress;
		const offset = circumference - (percent / 100) * circumference
		circle.style.strokeDashoffset = offset

	});

	// for (let i = 0; i < circles.length; i++) {

	// 	console.log((chapterData[i].chapterProgress));

	// 	let percent = chapterData[i].chapterProgress;
	// 	const offset = circumference - (percent / 100) * circumference
	// 	circles[i].style.strokeDashoffset = offset

	// 	console.log(circles[i])

	// }


	// for (let i = 0; i < chapterData.length; i++) {

	// 	let percent = chapterData.chapterProgress;
	// 	const offset = circumference - (percent / 100) * circumference
	// 	circles[i].style.strokeDashoffset = offset

	// }


}




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
		setAllProgress(input.value)
	}
})




/////// Hide Chapter Menu


const hideChapterBtn = document.querySelector('#chapter-menu-btn')
const chapterContainer = document.querySelector('#chapters-container')
const courseContainer = document.querySelector('#course-page')

let hideChapterMenu = false;

const toggleChapterMenu = () => {

	if (!hideChapterMenu) {
		hideChapterMenu = true;

		// chapterContainer.style.transfrom = 'translateX(-100%)';
		chapterContainer.style.transform = "translate(-95%)";
		chapterContainer.style.transition = "all 1s ease-in-out";

		courseContainer.style.width = '2000px';
	} else {
		hideChapterMenu = false;
		chapterContainer.style.transform = "translate(0)";

	}


	console.log('clicked')
	console.log(hideChapterMenu)

}


// hideChapterBtn.addEventListener('click', toggleChapterMenu)