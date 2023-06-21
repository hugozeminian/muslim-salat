/*
************************************************
### SALAT ###
************************************************
*/
/*==============================================
→ ### Get number of Raka ### */
const n_raka = parseInt(localStorage.getItem('n_raka'));

let tashahhud3rd = document.querySelector('[class="prayer-div 3rd-tashahhud"]')
let raka3rd = document.querySelector('[class="3rd-raka"]')
let raka4th = document.querySelector('[class="4th-raka"]')

switch (n_raka) {
    case 2:
        raka3rd.style.display = 'none'
        raka4th.style.display = 'none'
        break;

    case 3:
        raka3rd.style.display = 'block'
        raka4th.style.display = 'none'
        break;

    case 4:
        tashahhud3rd.style.display = 'none'
        raka3rd.style.display = 'block'
        raka4th.style.display = 'block'
        break;

    default:
        tashahhud3rd.style.display = 'none'
        raka3rd.style.display = 'block'
        raka4th.style.display = 'block'
        break;
}


/*==============================================
→ ### Choose between sura ### */
let sura_al_kauthar = document.querySelector('.sura-al-kauthar')
let sura_al_kaafiroon = document.querySelector('.sura-al-kaafiroon')


document.getElementById('btn-sura-al-kauthar')
    .addEventListener('click', () => {
        sura_al_kauthar.style.display = 'block'
        sura_al_kaafiroon.style.display = 'none'
    })

document.getElementById('btn-sura-al-kaafiroon')
    .addEventListener('click', () => {
        sura_al_kauthar.style.display = 'none'
        sura_al_kaafiroon.style.display = 'block'
    })


/*==============================================
→ ### Salat audio - Speedy ### */

var audio = new Audio('../audio/salat.mp3');
var playPauseButton = document.getElementById('play-pause-button');
var playPauseIcon = document.getElementById('play-pause-icon');
var isPlaying = false;
var speedIncreaseButton = document.getElementById('speed-increase-button');
var speedDisplay = document.getElementById('speed-display');
var currentSpeed = 1;
var subtitleButton = document.getElementById('subtitle-button');
var currentSubtitle = 0;
var prayerTextEn = document.getElementsByClassName('prayer-text-en');
var prayerTextArabic = document.getElementsByClassName('prayer-text-arabic');

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
});

const playAudio = () => {
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
    isPlaying = true;
    audio.play();
}

const pauseAudio = () => {
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
    isPlaying = false;
    audio.pause();
}

speedIncreaseButton.addEventListener('click', () => {
    currentSpeed += 0.2;
    if (currentSpeed > 2) {
        currentSpeed = 1;
    }
    audio.playbackRate = currentSpeed;
    speedDisplay.textContent = currentSpeed.toFixed(1) + 'x';
});

const displayPrayerText = (enVisible, arabicVisible) => {
    for (let i = 0; i < prayerTextEn.length; i++) {
      prayerTextEn[i].style.display = enVisible ? 'block' : 'none';
    }
    for (let i = 0; i < prayerTextArabic.length; i++) {
      prayerTextArabic[i].style.display = arabicVisible ? 'block' : 'none';
    }
  };
  
  subtitleButton.addEventListener('click', () => {
    currentSubtitle++;
  
    if (currentSubtitle > 3) {
      currentSubtitle = 0;
    }
  
    console.log('currentSubtitle', currentSubtitle);
  
    switch (currentSubtitle) {
      case 0:
        displayPrayerText(false, false);
        break;
      case 1:
        displayPrayerText(true, false);
        break;
      case 2:
        displayPrayerText(false, true);
        break;
      case 3:
        displayPrayerText(true, true);
        break;
      default:
        displayPrayerText(false, false);
        break;
    }
  });