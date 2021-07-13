import { becauseTheInternet } from './data/songs.js'
import { songInfo } from './data/songInfo.js'

const musicProgressNotch = document.querySelector('.music-progress-notch')

const previousTrackButton = document.querySelector('.previous-track-button')
const rewindButton = document.querySelector('.rewind-button')
const playButton = document.querySelector('.play-button')
const pauseButton = document.querySelector('.pause-button')
const fastForwardButton = document.querySelector('.fast-forward-button')
const nextTrackButton = document.querySelector('.next-track-button')

const musicTitle = document.querySelector('.music-title')

const trackNumberStorage = 'trackNumber'


localStorage.setItem(trackNumberStorage, 0)

console.log(becauseTheInternet[0])

const notchAnimation = () => {
    musicProgressNotch.style.width = '0%'

    let trackNumber = localStorage.getItem(trackNumberStorage)
    trackNumber = +trackNumber

    let duration = becauseTheInternet[trackNumber].duration
    let currentTime = becauseTheInternet[trackNumber].currentTime

    let progress = (currentTime / duration) * 100

    musicProgressNotch.style.width = `${progress}%`
}

const autoplay = () => {
    let trackNumber = localStorage.getItem(trackNumberStorage)
    trackNumber = +trackNumber

    becauseTheInternet[trackNumber].addEventListener('ended', () => {
        trackNumber = trackNumber + 1

        if(becauseTheInternet[trackNumber] === undefined) {
            return
        }

        becauseTheInternet[trackNumber].play()

        
        musicTitle.textContent = songInfo[trackNumber].number + ' ' + songInfo[trackNumber].title

        becauseTheInternet[trackNumber].addEventListener('timeupdate', notchAnimation)
        
        autoplay()
        

        localStorage.setItem(trackNumberStorage, trackNumber)
    })
}

// ----------- Prev Track Button -----------

previousTrackButton.addEventListener('click', () => {
    let trackNumber = localStorage.getItem(trackNumberStorage)
    trackNumber = +trackNumber

    playButton.classList.add('hide')
    pauseButton.classList.remove('hide')

    becauseTheInternet[trackNumber].pause()
    becauseTheInternet[trackNumber].currentTime = 0
    becauseTheInternet[trackNumber].play()

    autoplay()
})

previousTrackButton.addEventListener('dblclick', () => {
    let trackNumber = localStorage.getItem(trackNumberStorage)
    trackNumber = +trackNumber

    if(trackNumber == 0) {
        return
    }

    becauseTheInternet[trackNumber].pause()
    becauseTheInternet[trackNumber].currentTime = 0

    trackNumber = trackNumber - 1

    musicTitle.textContent = songInfo[trackNumber].number + ' ' + songInfo[trackNumber].title

    becauseTheInternet[trackNumber].play()
    becauseTheInternet[trackNumber].addEventListener('timeUpdate', notchAnimation)

    autoplay()

    localStorage.setItem(trackNumberStorage, trackNumber)
})

// ----------- Rewind Button -----------

rewindButton.addEventListener('click', () => {
    let trackNumber = localStorage.getItem(trackNumberStorage)
    trackNumber = +trackNumber

    becauseTheInternet[trackNumber].currentTime = becauseTheInternet[trackNumber].currentTime - 10
    becauseTheInternet[trackNumber].play()

    autoplay()
})

// ----------- Play Button -----------

playButton.addEventListener('click', () => {
    let trackNumber = localStorage.getItem(trackNumberStorage)
    trackNumber = +trackNumber

    playButton.classList.add('hide')
    pauseButton.classList.remove('hide')
    becauseTheInternet[trackNumber].play()
    becauseTheInternet[trackNumber].addEventListener('timeupdate', notchAnimation)

    musicTitle.textContent = songInfo[trackNumber].number + ' ' + songInfo[trackNumber].title
    
    autoplay()
})

// ----------- Pause Button -----------

pauseButton.addEventListener('click', () => {
    let trackNumber = localStorage.getItem(trackNumberStorage)
    trackNumber = +trackNumber

    playButton.classList.remove('hide')
    pauseButton.classList.add('hide')
    becauseTheInternet[trackNumber].pause()

    notchAnimationPause()

    console.log('Current Time ' + +becauseTheInternet[trackNumber].currentTime)
    console.log('Duration ' + +becauseTheInternet[trackNumber].duration)
})

// ----------- Fast Forward Button -----------

fastForwardButton.addEventListener('click', () => {
    let trackNumber = localStorage.getItem(trackNumberStorage)
    trackNumber = +trackNumber

    becauseTheInternet[trackNumber].currentTime = becauseTheInternet[trackNumber].currentTime + 10
    becauseTheInternet[trackNumber].play()

    autoplay()
})

// ----------- Next Track Button -----------

nextTrackButton.addEventListener('click', () => {
    let trackNumber = localStorage.getItem(trackNumberStorage)
    trackNumber = +trackNumber + 1

    if(becauseTheInternet[trackNumber] === undefined) {
        return
    }

    becauseTheInternet[trackNumber - 1].pause()
    becauseTheInternet[trackNumber - 1].currentTime = 0
    becauseTheInternet[trackNumber].play()
    becauseTheInternet[trackNumber].addEventListener('timeupdate', notchAnimation)

    musicTitle.textContent = songInfo[trackNumber].number + ' ' + songInfo[trackNumber].title
    
    autoplay()

    localStorage.setItem(trackNumberStorage, trackNumber)
})

// ----------- ----------------- -----------