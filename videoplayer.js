const videoContainer = document.querySelector('#video-container');
const video = document.querySelector('#video-container video');
const controlsContainer = document.querySelector('#video-container #controls-container');

// Buttons/Slider
const playBtn = document.querySelector('#video-container #controls-container button.play')
const playIcon = document.querySelector('#video-container #controls-container button.play #playIcon')
const volumeBtn = document.querySelector('#video-container #controls-container button.volume')
const volumeIcon = document.querySelector('#video-container #controls-container button.volume #volumeIcon')
const fullscrenBtn = document.querySelector('#video-container #controls-container button.fullscreen')
const fullscreenIcon = document.querySelector('#video-container #controls-container button.fullscreen #fullscreenIcon')
const volumeSlider = document.querySelector('#volume-slider')

// Watched Bar
const watchedBar = document.querySelector('#video-container #timeline-controls .timeline-bar .watched-bar')

// ProgressBar
const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');
const seekTooltip = document.getElementById('seek-tooltip');

//Time remaining
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');

// Playback Rate Btns
const playbackRateCurrent = document.getElementById('playback-rate')
const playbackRateBtn50 = document.getElementById('playback-rate-50-btn')
const playbackRateBtn75 = document.getElementById('playback-rate-75-btn')
const playbackRateBtn1 = document.getElementById('playback-rate-1-btn')
const playbackRateBtn125 = document.getElementById('playback-rate-125-btn')
const playbackRateBtn150 = document.getElementById('playback-rate-150-btn')

function setPlaybackRate(value) {
    video.playbackRate = value;
    playbackRateCurrent.innerHTML = value + 'x'
}

document.querySelectorAll("button").forEach(function (item) {
    item.addEventListener('focus', function () {
        this.blur();
    })
})

function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
};

function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

function updateTimeElapsed() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

function updateProgress() {


    seek.value = Math.floor(video.currentTime);
    progressBar.value = Math.floor(video.currentTime);

    console.log(video.currentTime)
}

// OLD PROGRESS UPDATE
// function progressUpdate() {
//     // watchedBar.style.width = (video.currentTime / video.duration) * 100 + '%';
//     const percent = (video.currentTime / video.duration) * 100;

//     watchedBar.style.width = `${percent}%`;

//     const totalSecondsRemaining = video.duration - video.currentTime;
//     const watchTime = video.currentTime;
//     const time = new Date(null);
//     time.setSeconds(totalSecondsRemaining)

//     let minutes = (time.getMinutes().toString().padStart('2', '0'))
//     let seconds = (time.getSeconds().toString().padStart('2', '0'))

//     timeLeft.textContent = `${minutes}:${seconds}`
// }

function updateSeekTooltip(event) {
    const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
    seek.setAttribute('data-seek', skipTo)
    const t = formatTime(skipTo);
    seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    const rect = video.getBoundingClientRect();
    seekTooltip.style.left = `${event.pageX - rect.left}px`;
}

function skipAhead(event) {
    const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
    video.currentTime = skipTo;
    progressBar.value = skipTo;
    seek.value = skipTo;
}

let controlsTimeout;

controlsContainer.style.opacity = '0';

const displayControls = () => {
    controlsContainer.style.opacity = '1';
    document.body.style.cursor = 'initial'
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
    }
    controlsTimeout = setTimeout(() => {
        controlsContainer.style.opacity = '0';
        document.body.style.cursor = 'none'

    }, 3000)
}

const togglePlay = () => {
    if (video.ended) {
        video.currentTime = 0;
        playIcon.classList.remove('pause')
        playIcon.classList.add('play')
    } else if (video.paused) {
        video.play()
        playIcon.classList.remove('play')
        playIcon.classList.add('pause')
    } else {
        video.pause();
        playIcon.classList.remove('pause')
        playIcon.classList.add('play')
    }
}

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenIcon.classList.remove('compress')
        fullscreenIcon.classList.add('expand')
    } else {
        fullscreenIcon.classList.remove('expand')
        fullscreenIcon.classList.add('compress')
    }
})

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        togglePlay()
    }
    if (event.code === 'KeyM') {
        volumeToggle()
    }
    if (event.code === 'KeyF') {
        toggleFullscreen()
    }
    if (event.code === 'ArrowLeft') {
        video.currentTime -= 10;
    }
    if (event.code === 'ArrowRight') {
        video.currentTime += 10;
    }
    displayControls();
})


document.addEventListener('mousemove', () => {
    displayControls()
})

const volumeToggle = () => {
    video.muted = !video.muted;

    if (video.muted) {
        volumeSlider.value = '0'
        volumeIcon.classList.remove('down', 'up')
        volumeIcon.classList.add('off')

    } else if (video.volume == 0) {
        volumeSlider.value = 0.5
        volumeUpdate(0.5)
    } else {
        volumeSlider.value = video.volume
        volumeUpdate(video.volume)
    }
}

function volumeUpdate(value) {
    let volume = value
    video.volume = volume;

    if (video.volume == 0) {
        volumeIcon.classList.remove('down', 'up')
        volumeIcon.classList.add('off')
    }
    if (video.volume > 0 && video.volume < 0.6) {
        volumeIcon.classList.remove('off', 'up')
        volumeIcon.classList.add('down')
    }
    if (video.volume > 0.6 && video.volume <= 1) {
        volumeIcon.classList.remove('off', 'down')
        volumeIcon.classList.add('up')
    }
}

function toggleVolumeFader(e) {
    if (e.type == 'mouseover') volumeSlider.style.opacity = "1";
    else if (e.type == 'mouseout') volumeSlider.style.opacity = "0";
}

const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen()
    } else {
        document.exitFullscreen();
    }
}

let mousedown = false;

function scrub(e) {
    const scrubTime = (e.offsetX / timelineBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


//Eventlisteners

video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('click', togglePlay)
video.addEventListener('ended', togglePlay)
video.addEventListener('dblclick', toggleFullscreen)
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);

seek.addEventListener('mousemove', updateSeekTooltip);
seek.addEventListener('input', skipAhead);

/// Control Buttons
playBtn.addEventListener('click', togglePlay)

//Volume 
volumeIcon.addEventListener('click', volumeToggle)
volumeBtn.addEventListener('mouseover', (e) => toggleVolumeFader(e))
volumeBtn.addEventListener('mouseout', (e) => toggleVolumeFader(e))

volumeSlider.addEventListener('change', (e) => volumeUpdate(e.target.value))
volumeSlider.addEventListener('mousemove', (e) => mousedown && volumeUpdate(e.target.value))
volumeSlider.addEventListener('mousedown', () => mousedown = true)
volumeSlider.addEventListener('mouseup', () => mousedown = false)

//Playback Rate
playbackRateBtn50.addEventListener('click', () => setPlaybackRate(.50))
playbackRateBtn75.addEventListener('click', () => setPlaybackRate(.75))
playbackRateBtn1.addEventListener('click', () => setPlaybackRate(1))
playbackRateBtn125.addEventListener('click', () => setPlaybackRate(1.25))
playbackRateBtn150.addEventListener('click', () => setPlaybackRate(1.50))

fullscrenBtn.addEventListener('click', toggleFullscreen)