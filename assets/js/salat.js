/*
************************************************
### SALAT ###
************************************************
*/
/*==============================================
→ ### Get number of Raka ### */
const n_raka = parseInt(localStorage.getItem("n_raka"));
const prayerName = localStorage.getItem("prayerName");

document.getElementById("prayer-name").innerHTML = prayerName

let tashahhud3rd = document.querySelector('[class="prayer-div 3rd-tashahhud"]');
let raka3rd = document.querySelector('[class="3rd-raka"]');
let raka4th = document.querySelector('[class="4th-raka"]');

switch (n_raka) {
  case 2:
    raka3rd.style.display = "none";
    raka4th.style.display = "none";
    break;

  case 3:
    raka3rd.style.display = "block";
    raka4th.style.display = "none";
    break;

  case 4:
    tashahhud3rd.style.display = "none";
    raka3rd.style.display = "block";
    raka4th.style.display = "block";
    break;

  default:
    tashahhud3rd.style.display = "none";
    raka3rd.style.display = "block";
    raka4th.style.display = "block";
    break;
}

/*==============================================
→ ### Choose between sura ### */
let sura_al_kauthar = document.querySelector(".sura-al-kauthar");
let sura_al_kaafiroon = document.querySelector(".sura-al-kaafiroon");
let isSuraKauthar = true;
btn_suraAlKauthar = document.getElementById("btn-sura-al-kauthar");
btn_suraAlKaafirron = document.getElementById("btn-sura-al-kaafiroon");

btn_suraAlKauthar.addEventListener("click", () => {
  sura_al_kauthar.style.display = "block";
  sura_al_kaafiroon.style.display = "none";
  isSuraKauthar = true;
});

btn_suraAlKaafirron.addEventListener("click", () => {
  sura_al_kauthar.style.display = "none";
  sura_al_kaafiroon.style.display = "block";
  isSuraKauthar = false;
});

/*
************************************************
### SALAT - ARRAY AUDIO PATH ###
************************************************
*/
const audioPaths = [
  /*============================================== 0
  → ### ALLAHU AKBAR ### */
  "../audio/allahu-akbar.mp3",

  /*============================================== 1 - 4
  → ### DUA SANA ### */
  "../audio/dua-sana-subhanakallahumma.mp3",
  "../audio/dua-sana-watabarakasmuka.mp3",
  "../audio/dua-sana-wataalajadduka.mp3",
  "../audio/dua-sana-walailaha.mp3",

  /*============================================== 5
  → ### DUA ISTI'ADHA ### */
  "../audio/dua-isti-adha.mp3",

  /*============================================== 6 - 14
  → ### SURAH AL-FATIHA ### */
  "../audio/surah-al-fatiha-bismillahir.mp3",
  "../audio/surah-al-fatiha-alhamdu.mp3",
  "../audio/surah-al-fatiha-arrahmanir.mp3",
  "../audio/surah-al-fatiha-maaliki.mp3",
  "../audio/surah-al-fatiha-iyyaka.mp3",
  "../audio/surah-al-fatiha-ihdinas.mp3",
  "../audio/surah-al-fatiha-siraatal.mp3",
  "../audio/surah-al-fatiha-ghayril.mp3",
  "../audio/aameen_pause.mp3",

  /*============================================== 15 - 17
  → ### SURA AL-KAUTHAR ### */
  "../audio/sura-al-kauthar-innaa-atainaakal.mp3",
  "../audio/sura-al-kauthar-fasalli.mp3",
  "../audio/sura-al-kauthar-inna-shaani.mp3",

  /*============================================== 18 - 22
  → ### SURA AL-KAAFIROON ### */
  "../audio/sura-al-kaafiroon-qul-yaa.mp3",
  "../audio/sura-al-kaafiroon-laa-a-budu.mp3",
  "../audio/sura-al-kaafiroon-wa-laa-antum.mp3",
  "../audio/sura-al-kaafiroon-wa-laa-ana.mp3",
  "../audio/sura-al-kaafiroon-lakum.mp3",

  /*============================================== 23 - 26
  → ### SURA AL-IKHLAS ### */
  "../audio/surah-al-ikhlas-qul.mp3",
  "../audio/surah-al-ikhlas-allahu.mp3",
  "../audio/surah-al-ikhlas-lam.mp3",
  "../audio/surah-al-ikhlas-wa-lam.mp3",

  /*============================================== 27
  → ### BOWING - RUKOO ### */
  "../audio/subhaana-adheem.mp3",

  /*============================================== 28 - 29
  → ### STANDING UP AFTER RUKOO ### */
  "../audio/liman-sami.mp3",
  "../audio/lakal-rabbana.mp3",

  /*============================================== 30
  → ### PROSTATION - SAJDA ### */
  "../audio/subhaana-rabbiyal.mp3",

  /*============================================== 31 - 34
  → ### TASHAHHUD ### */
  "../audio/tashahuud-al-tahiyyatu.mp3",
  "../audio/tashahuud-as-salamu-alayka.mp3",
  "../audio/tashahuud-as-salamu-alayna.mp3",
  "../audio/tashahuud-ashhadu.mp3",

  /*============================================== 35 - 39
  → ### SALAWAT ### */
  "../audio/salawat-allahumma-salli.mp3",
  "../audio/salawat-kama-sallayta.mp3",
  "../audio/salawat-innaka.mp3",
  "../audio/salawat-allahumma-barik.mp3",
  "../audio/salawat-kama-barakta.mp3",

  /*============================================== 40 - 42
  → ### DUA ### */
  "../audio/dua-rabbana.mp3",
  "../audio/dua-wa-fil-akhirati.mp3",
  "../audio/dua-waqina.mp3",

  /*============================================== 43
  → ### SALAM TO THE RIGHT ### */
  "../audio/salam-right.mp3",

  /*============================================== 44
  → ### SALAM TO THE LEFT ### */
  "../audio/salam-left.mp3",

  /*============================================== 45 - 48
  → ### DUA AFTER THE PRAYER ENDS ### */
  "../audio/dua-after-prpayer-astaghfirullah.mp3",
  "../audio/dua-after-prpayer-astaghfirullah_final.mp3",
  "../audio/dua-after-prpayer-allahumma.mp3",
  "../audio/dua-after-prpayer-tabarakta.mp3",
];

/*
************************************************
### SALAT - AUDIO / TEXT CONTROLS ###
************************************************
*/
let isPrayerEnds = false;
let firstPlay = false;
let audioPointer = 1;
let audioPath = audioPaths[0];
let audio = new Audio(audioPath);
let playPauseButton = document.getElementById("play-pause-button");
let playPauseIcon = document.getElementById("play-pause-icon");
let isPlaying = false;
let speedIncreaseButton = document.getElementById("speed-increase-button");
let speedDisplay = document.getElementById("speed-display");
let currentSpeed = 1
let subtitleButton = document.getElementById("subtitle-button");
let currentSubtitle = 0;
let prayerTextEn = document.getElementsByClassName("prayer-text-en");
let prayerTextArabic = document.getElementsByClassName("prayer-text-arabic");
let prayerTextPtBr = document.getElementsByClassName("prayer-text-pt_br");

playPauseButton.addEventListener("click", () => {
  play_pause();
});

const play_pause = () => {
  if (isPlaying) {
    pauseAudio();
  } else {
    if (!firstPlay) {
      smoothScroll(getIdByClass("current-prayer", 0));
      firstPlay = true;
    }
    playAudio();
  }
};

const playAudio = () => {
  playPauseIcon.classList.remove("fa-play");
  playPauseIcon.classList.add("fa-pause");
  isPlaying = true;
  audio.play();
};

const pauseAudio = () => {
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");
  isPlaying = false;
  audio.pause();
};

speedIncreaseButton.addEventListener("click", () => {
  currentSpeed += 0.2;
  if (currentSpeed > 2) {
    currentSpeed = 1;
  }
  audio.playbackRate = currentSpeed;
  speedDisplay.textContent = currentSpeed.toFixed(1) + "x";
});

const changeAudio = (audioSrc) => {
  audio.src = audioSrc;
  audio.playbackRate = currentSpeed;
};

const displayPrayerText = (enVisible, arabicVisible, ptBrVisible) => {
  for (let i = 0; i < prayerTextEn.length; i++) {
    prayerTextEn[i].style.display = enVisible ? "block" : "none";
  }
  for (let i = 0; i < prayerTextArabic.length; i++) {
    prayerTextArabic[i].style.display = arabicVisible ? "block" : "none";
  }
  for (let i = 0; i < prayerTextPtBr.length; i++) {
    prayerTextPtBr[i].style.display = ptBrVisible ? "block" : "none";
  }
};

subtitleButton.addEventListener("click", () => {
  currentSubtitle++;

  if (currentSubtitle > 3) {
    currentSubtitle = 0;
  }

  switch (currentSubtitle) {
    case 0:
      displayPrayerText(false, false, false);
      break;
    case 1:
      displayPrayerText(true, false, false);
      break;
    case 2:
      displayPrayerText(false, true, false);
      break;
    case 3:
      displayPrayerText(false, false, true);
      break;
    default:
      displayPrayerText(false, false, false);
      break;
  }
});

/*
************************************************
### SALAT - AUDIO TEXT ELEMENT INDEX ###
************************************************
*/
const prayerElements = document.getElementsByClassName("prayer-text");
let currentPrayerIndex = 0;
let newPrayerIndex;
prayerElements[currentPrayerIndex].classList.add("current-prayer");

const updateCurrentPrayer = (newPrayerIndex) => {
  prayerElements[currentPrayerIndex].classList.remove("current-prayer");
  currentPrayerIndex = newPrayerIndex;
  prayerElements[currentPrayerIndex].classList.add("current-prayer");
};

const smoothScroll = (targetId) => {
  const yOffset = -100;
  const targetElement = document.getElementById(targetId);
  const targetPosition =
    targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

  const isTargetVisible =
    targetElement.getBoundingClientRect().top >= 0 &&
    targetElement.getBoundingClientRect().bottom <= window.innerHeight - 300;

  if (!isTargetVisible) {
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  }
};

const getIdByClassIndex = (className, index) => {
  const elements = document.getElementsByClassName(className);

  if (index >= 0 && index < elements.length) {
    return elements[index].id;
  }
  return null;
};

const getIdByClass = (className, index) => {
  const targetId = getIdByClassIndex(className, index);

  if (targetId) {
    return targetId;
  } else {
    console.log("Invalid index or no elements found with the specified class.");
  }
};

// /*
// ************************************************
// ### SALAT - AUDIO FLOW ###
// ************************************************
// */
const classElements = document.getElementsByClassName("prayer-text");
const classArray = Array.from(classElements);

classArray.forEach((element, index) => {
  element.addEventListener("click", () => {
    handleClassClick(index);
  });
});

const handleClassClick = (index) => {
  console.log("Clicked on class with index:", index);
  pauseAudio();

  if (index <= 17) {
    audioPointer = index;
  }
  if (index >= 18 && index <= 23) {
    audioPointer = index + 120;
  }

  if (index >= 24 && index <= 97) {
    audioPointer = index - 6;
  }

  if (n_raka == 2) {
    if (index >= 98) {
      audioPointer = index - 10;
    }
  }

  if (n_raka == 3) {
    if (index >= 98 && index <= 102) {
      audioPointer = index + 20;
    }
  }

  if (n_raka == 4) {
    if (index >= 98) {
      audioPointer = index - 10;
    }
  }

  console.log("audioPointer", audioPointer);
  audioTrigger();
};

audio.addEventListener("ended", () => {
  audioTrigger();
});

const audioTrigger = () => {
  switch (audioPointer) {
    /*==============================================
    → ### TAKBEER STARTING THE PRAYER ### */
    case 0:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 0));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### DUA SANA (1ST RAK'A) ### */
    case 1:
      changeAudio(audioPaths[1]);
      updateCurrentPrayer((newPrayerIndex = 1));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 2:
      changeAudio(audioPaths[2]);
      updateCurrentPrayer((newPrayerIndex = 2));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 3:
      changeAudio(audioPaths[3]);
      updateCurrentPrayer((newPrayerIndex = 3));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 4:
      changeAudio(audioPaths[4]);
      updateCurrentPrayer((newPrayerIndex = 4));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### DUA ISTI'ADHA ### */
    case 5:
      changeAudio(audioPaths[5]);
      updateCurrentPrayer((newPrayerIndex = 5));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SURAH AL-FATIHA ### */
    case 6:
      changeAudio(audioPaths[6]);
      updateCurrentPrayer((newPrayerIndex = 6));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 7:
      changeAudio(audioPaths[7]);
      updateCurrentPrayer((newPrayerIndex = 7));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 8:
      changeAudio(audioPaths[8]);
      updateCurrentPrayer((newPrayerIndex = 8));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 9:
      changeAudio(audioPaths[9]);
      updateCurrentPrayer((newPrayerIndex = 9));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 10:
      changeAudio(audioPaths[10]);
      updateCurrentPrayer((newPrayerIndex = 10));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 11:
      changeAudio(audioPaths[11]);
      updateCurrentPrayer((newPrayerIndex = 11));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 12:
      changeAudio(audioPaths[12]);
      updateCurrentPrayer((newPrayerIndex = 12));

      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 13:
      changeAudio(audioPaths[13]);
      updateCurrentPrayer((newPrayerIndex = 13));

      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 14:
      changeAudio(audioPaths[14]);
      updateCurrentPrayer((newPrayerIndex = 14));

      smoothScroll(getIdByClass("current-prayer", 0));
      if (isSuraKauthar) {
        audioPointer++;
      } else {
        audioPointer = 138;
      }
      break;

    /*==============================================
    → ### SURA AL-KAUTHAR ### */
    case 15:
      changeAudio(audioPaths[15]);
      updateCurrentPrayer((newPrayerIndex = 15));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 16:
      changeAudio(audioPaths[16]);
      updateCurrentPrayer((newPrayerIndex = 16));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 17:
      changeAudio(audioPaths[17]);
      updateCurrentPrayer((newPrayerIndex = 17));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### BOWING - RUKOO ### */
    case 18:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 24));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 19:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 25));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 20:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 26));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 21:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 27));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### STANDING UP AFTER RUKOO ### */
    case 22:
      changeAudio(audioPaths[28]);
      updateCurrentPrayer((newPrayerIndex = 28));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 23:
      changeAudio(audioPaths[29]);
      updateCurrentPrayer((newPrayerIndex = 29));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### FIRST PROSTATION - SAJDA ### */
    case 24:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 30));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 25:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 31));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 26:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 32));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 27:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 33));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SITTING UP BETWEEN SAJDAS ### */
    case 28:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 34));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SECOND PROSTRATION - SAJDA ### */
    case 29:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 35));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 30:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 36));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 31:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 37));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 32:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 38));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### 2ND RAK'A ### */
    case 33:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 39));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SURAH AL-FATIHA ### */
    case 34:
      changeAudio(audioPaths[6]);
      updateCurrentPrayer((newPrayerIndex = 40));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 35:
      changeAudio(audioPaths[7]);
      updateCurrentPrayer((newPrayerIndex = 41));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 36:
      changeAudio(audioPaths[8]);
      updateCurrentPrayer((newPrayerIndex = 42));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 37:
      changeAudio(audioPaths[9]);
      updateCurrentPrayer((newPrayerIndex = 43));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 38:
      changeAudio(audioPaths[10]);
      updateCurrentPrayer((newPrayerIndex = 44));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 39:
      changeAudio(audioPaths[11]);
      updateCurrentPrayer((newPrayerIndex = 45));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 40:
      changeAudio(audioPaths[12]);
      updateCurrentPrayer((newPrayerIndex = 46));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 41:
      changeAudio(audioPaths[13]);
      updateCurrentPrayer((newPrayerIndex = 47));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 42:
      changeAudio(audioPaths[14]);
      updateCurrentPrayer((newPrayerIndex = 48));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SURA AL-IKHLAS ### */
    case 43:
      changeAudio(audioPaths[23]);
      updateCurrentPrayer((newPrayerIndex = 49));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 44:
      changeAudio(audioPaths[24]);
      updateCurrentPrayer((newPrayerIndex = 50));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 45:
      changeAudio(audioPaths[25]);
      updateCurrentPrayer((newPrayerIndex = 51));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 46:
      changeAudio(audioPaths[26]);
      updateCurrentPrayer((newPrayerIndex = 52));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### BOWING - RUKOO ### */
    case 47:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 53));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 48:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 54));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 49:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 55));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 50:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 56));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### STANDING UP AFTER RUKOO ### */
    case 51:
      changeAudio(audioPaths[28]);
      updateCurrentPrayer((newPrayerIndex = 57));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 52:
      changeAudio(audioPaths[29]);
      updateCurrentPrayer((newPrayerIndex = 58));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### FIRST PROSTATION - SAJDA ### */
    case 53:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 59));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 54:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 60));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 55:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 61));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 56:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 62));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SITTING UP BETWEEN SAJDAS ### */
    case 57:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 63));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SECOND PROSTRATION - SAJDA ### */
    case 58:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 64));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 59:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 65));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 60:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 66));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 61:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 67));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SITTING UP FOR TASHAHHUD ### */
    case 62:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 68));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### TASHAHHUD ### */
    case 63:
      changeAudio(audioPaths[31]);
      updateCurrentPrayer((newPrayerIndex = 69));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 64:
      changeAudio(audioPaths[32]);
      updateCurrentPrayer((newPrayerIndex = 70));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 65:
      changeAudio(audioPaths[33]);
      updateCurrentPrayer((newPrayerIndex = 71));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 66:
      changeAudio(audioPaths[34]);
      updateCurrentPrayer((newPrayerIndex = 72));
      smoothScroll(getIdByClass("current-prayer", 0));

      if (n_raka == 2) {
        audioPointer = 122;
      } else {
        audioPointer++;
      }
      break;

    /*==============================================
    → ### 3RD RAK'A ### */
    case 67:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 73));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SURAH AL-FATIHA ### */
    case 68:
      changeAudio(audioPaths[6]);
      updateCurrentPrayer((newPrayerIndex = 74));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 69:
      changeAudio(audioPaths[7]);
      updateCurrentPrayer((newPrayerIndex = 75));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 70:
      changeAudio(audioPaths[8]);
      updateCurrentPrayer((newPrayerIndex = 76));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 71:
      changeAudio(audioPaths[9]);
      updateCurrentPrayer((newPrayerIndex = 77));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 72:
      changeAudio(audioPaths[10]);
      updateCurrentPrayer((newPrayerIndex = 78));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 73:
      changeAudio(audioPaths[11]);
      updateCurrentPrayer((newPrayerIndex = 79));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 74:
      changeAudio(audioPaths[12]);
      updateCurrentPrayer((newPrayerIndex = 80));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 75:
      changeAudio(audioPaths[13]);
      updateCurrentPrayer((newPrayerIndex = 81));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 76:
      changeAudio(audioPaths[14]);
      updateCurrentPrayer((newPrayerIndex = 82));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### BOWING - RUKOO ### */
    case 77:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 83));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 78:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 84));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 79:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 85));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 80:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 86));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### STANDING UP AFTER RUKOO ### */
    case 81:
      changeAudio(audioPaths[28]);
      updateCurrentPrayer((newPrayerIndex = 87));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 82:
      changeAudio(audioPaths[29]);
      updateCurrentPrayer((newPrayerIndex = 88));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### FIRST PROSTATION - SAJDA ### */
    case 83:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 89));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 84:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 90));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 85:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 91));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 86:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 92));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SITTING UP BETWEEN SAJDAS ### */
    case 87:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 93));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SECOND PROSTRATION - SAJDA ### */
    case 88:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 94));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 89:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 95));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 90:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 96));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 91:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 97));
      smoothScroll(getIdByClass("current-prayer", 0));

      if (n_raka == 3) {
        audioPointer = 118;
      } else {
        audioPointer++;
      }

      break;

    /*==============================================
    → ### 4TH RAK'A ### */
    case 92:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 102));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SURAH AL-FATIHA ### */
    case 93:
      changeAudio(audioPaths[6]);
      updateCurrentPrayer((newPrayerIndex = 103));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 94:
      changeAudio(audioPaths[7]);
      updateCurrentPrayer((newPrayerIndex = 104));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 95:
      changeAudio(audioPaths[8]);
      updateCurrentPrayer((newPrayerIndex = 105));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 96:
      changeAudio(audioPaths[9]);
      updateCurrentPrayer((newPrayerIndex = 106));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 97:
      changeAudio(audioPaths[10]);
      updateCurrentPrayer((newPrayerIndex = 107));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 98:
      changeAudio(audioPaths[11]);
      updateCurrentPrayer((newPrayerIndex = 108));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 99:
      changeAudio(audioPaths[12]);
      updateCurrentPrayer((newPrayerIndex = 109));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 100:
      changeAudio(audioPaths[13]);
      updateCurrentPrayer((newPrayerIndex = 110));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 101:
      changeAudio(audioPaths[14]);
      updateCurrentPrayer((newPrayerIndex = 111));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### BOWING - RUKOO ### */
    case 102:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 112));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 103:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 113));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 104:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 114));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 105:
      changeAudio(audioPaths[27]);
      updateCurrentPrayer((newPrayerIndex = 115));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### STANDING UP AFTER RUKOO ### */
    case 106:
      changeAudio(audioPaths[28]);
      updateCurrentPrayer((newPrayerIndex = 116));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 107:
      changeAudio(audioPaths[29]);
      updateCurrentPrayer((newPrayerIndex = 117));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### FIRST PROSTATION - SAJDA ### */
    case 108:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 118));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 109:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 119));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 110:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 120));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 111:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 121));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SITTING UP BETWEEN SAJDAS ### */
    case 112:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 122));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SECOND PROSTRATION - SAJDA ### */
    case 113:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 123));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 114:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 124));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 115:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 125));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 116:
      changeAudio(audioPaths[30]);
      updateCurrentPrayer((newPrayerIndex = 126));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SITTING UP FOR TASHAHHUD ### */
    case 117:
      changeAudio(audioPaths[0]);
      updateCurrentPrayer((newPrayerIndex = 127));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### TASHAHHUD ### */
    case 118:
      changeAudio(audioPaths[31]);
      n_raka == 3
        ? updateCurrentPrayer((newPrayerIndex = 98))
        : updateCurrentPrayer((newPrayerIndex = 128));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 119:
      changeAudio(audioPaths[32]);
      n_raka == 3
        ? updateCurrentPrayer((newPrayerIndex = 99))
        : updateCurrentPrayer((newPrayerIndex = 129));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 120:
      changeAudio(audioPaths[33]);
      n_raka == 3
        ? updateCurrentPrayer((newPrayerIndex = 100))
        : updateCurrentPrayer((newPrayerIndex = 130));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 121:
      changeAudio(audioPaths[34]);
      n_raka == 3
        ? updateCurrentPrayer((newPrayerIndex = 101))
        : updateCurrentPrayer((newPrayerIndex = 131));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SALAWAT ### */
    case 122:
      changeAudio(audioPaths[35]);
      updateCurrentPrayer((newPrayerIndex = 132));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 123:
      changeAudio(audioPaths[36]);
      updateCurrentPrayer((newPrayerIndex = 133));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 124:
      changeAudio(audioPaths[37]);
      updateCurrentPrayer((newPrayerIndex = 134));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 125:
      changeAudio(audioPaths[38]);
      updateCurrentPrayer((newPrayerIndex = 135));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 126:
      changeAudio(audioPaths[39]);
      updateCurrentPrayer((newPrayerIndex = 136));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 127:
      changeAudio(audioPaths[37]);
      updateCurrentPrayer((newPrayerIndex = 137));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### DUA ### */
    case 128:
      changeAudio(audioPaths[40]);
      updateCurrentPrayer((newPrayerIndex = 138));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 129:
      changeAudio(audioPaths[41]);
      updateCurrentPrayer((newPrayerIndex = 139));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 130:
      changeAudio(audioPaths[42]);
      updateCurrentPrayer((newPrayerIndex = 140));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SALAM TO THE RIGHT ### */
    case 131:
      changeAudio(audioPaths[43]);
      updateCurrentPrayer((newPrayerIndex = 141));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### SALAM TO THE LEFT ### */
    case 132:
      changeAudio(audioPaths[44]);
      updateCurrentPrayer((newPrayerIndex = 142));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;

    /*==============================================
    → ### DUA AFTER THE PRAYER ENDS ### */
    case 133:
      changeAudio(audioPaths[45]);
      updateCurrentPrayer((newPrayerIndex = 143));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 134:
      changeAudio(audioPaths[45]);
      updateCurrentPrayer((newPrayerIndex = 144));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 135:
      changeAudio(audioPaths[46]);
      updateCurrentPrayer((newPrayerIndex = 145));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 136:
      changeAudio(audioPaths[47]);
      updateCurrentPrayer((newPrayerIndex = 146));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 137:
      changeAudio(audioPaths[48]);
      updateCurrentPrayer((newPrayerIndex = 147));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer = 999;
      break;

    /*==============================================
    → ### SURA AL-KAAFIROON ### */
    case 138:
      changeAudio(audioPaths[18]);
      updateCurrentPrayer((newPrayerIndex = 18));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 139:
      changeAudio(audioPaths[19]);
      updateCurrentPrayer((newPrayerIndex = 19));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 140:
      changeAudio(audioPaths[20]);
      updateCurrentPrayer((newPrayerIndex = 20));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 141:
      changeAudio(audioPaths[21]);
      updateCurrentPrayer((newPrayerIndex = 21));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 142:
      changeAudio(audioPaths[20]);
      updateCurrentPrayer((newPrayerIndex = 22));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer++;
      break;
    case 143:
      changeAudio(audioPaths[22]);
      updateCurrentPrayer((newPrayerIndex = 23));
      smoothScroll(getIdByClass("current-prayer", 0));
      audioPointer = 18;
      break;
    default:
      isPrayerEnds = true;
      break;
  }

  if (!isPrayerEnds) {
    playAudio();
  } else {
    pauseAudio();
    changeAudio(audioPaths[0]);
    updateCurrentPrayer((newPrayerIndex = 0));
    audioPointer = 1;
    firstPlay = false;
    isPrayerEnds = false;
  }

  if (audioPointer >= 15 && audioPointer <= 18 || audioPointer >= 138 && audioPointer <= 143) {
    btn_suraAlKauthar.disabled = true;
    btn_suraAlKaafirron.disabled = true;
  } else {
    btn_suraAlKauthar.disabled = false;
    btn_suraAlKaafirron.disabled = false;
  }
};
