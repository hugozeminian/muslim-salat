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
