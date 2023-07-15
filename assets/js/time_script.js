/*
************************************************
### API TIME PRAYERS - https://aladhan.com/prayer-times-api ###
************************************************
*/
//→ ### Get the chose prayer ### */
let n_raka
let prayerName

try {
    document.getElementById('fajr-prayer').addEventListener('click', () => {
        n_raka = 2
        prayerName = "FAJR"
        localStorage.setItem('n_raka', n_raka);
        localStorage.setItem('prayerName', prayerName);
    })

    document.querySelector('#dhuhr-prayer').addEventListener('click', () => {
        n_raka = 4
        prayerName = "DHUHR"
        localStorage.setItem('n_raka', n_raka);
        localStorage.setItem('prayerName', prayerName);
    })

    document.querySelector('#asr-prayer').addEventListener('click', () => {
        n_raka = 4
        prayerName = "ASR"
        localStorage.setItem('n_raka', n_raka);
        localStorage.setItem('prayerName', prayerName);
    })

    document.querySelector('#maghrib-prayer').addEventListener('click', () => {
        n_raka = 3
        prayerName = "MAGHRIB"
        localStorage.setItem('n_raka', n_raka);
        localStorage.setItem('prayerName', prayerName);
    })

    document.querySelector('#isha-prayer').addEventListener('click', () => {
        n_raka = 4
        prayerName = "ISHA"
        localStorage.setItem('n_raka', n_raka);
        localStorage.setItem('prayerName', prayerName);
    })
} catch (error) { }


/*==============================================
→ ### Get Today Date, Geolocation and fetch prayer time ### */

// Get the current date
const currentDate = new Date();

// Extract the year and month separately
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const monthShort = currentDate.toLocaleString('default', { month: 'short' });
const day = currentDate.getDate();
const dayOfWeek = currentDate.getDay();

// Create an array of day names
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get the day name based on the day of the week
const dayName = daysOfWeek[dayOfWeek];

// Format the date in the required format (DD MMM YYYY)
const formattedDate = `${dayName}, ${monthShort} ${day}, ${year}`;

try {
    document.querySelector('.formatted-date').textContent = formattedDate;
} catch (error) { }


const buttonGetPrayerTimeLocation = document.getElementById("button-get-prayer-time-location")

buttonGetPrayerTimeLocation.addEventListener("click", () => {

    // Get the current location
    try {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Construct the API URL
            const apiUrlLocation = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

            // Make the API request - Location
            fetch(apiUrlLocation)
                .then((response) => response.json())
                .then((data) => {
                    const cityName = data.address.city;
                    const countryName = data.address.country;

                    try {
                        document.querySelector('.city-name').textContent = cityName;
                        document.querySelector('.country-name').textContent = countryName;
                    } catch (error) { }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


            // Construct the API URL with the current location
            const apiUrlPrayers = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2https://api.aladhan.com/v1/calendar/${year}?latitude=${latitude}&longitude=${longitude}&method=2`;

            // Make the API request - Prayers
            fetch(apiUrlPrayers)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.data[day - 1]);
                    const { Asr, Dhuhr, Fajr, Firstthird, Imsak, Isha, Lastthird, Maghrib, Midnight, Sunrise, Sunset } = data.data[day - 1].timings

                    try {
                        document.querySelector('.fajr-time').textContent = Fajr.slice(0, -5);
                        document.querySelector('.sunrise-time').textContent = Sunrise.slice(0, -5);
                        document.querySelector('.dhuhr-time').textContent = Dhuhr.slice(0, -5);
                        document.querySelector('.asr-time').textContent = Asr.slice(0, -5);
                        document.querySelector('.maghrib-time').textContent = Maghrib.slice(0, -5);
                        document.querySelector('.isha-time').textContent = Isha.slice(0, -5);
                        document.querySelector('.qiyan-time').textContent = Midnight.slice(0, -5);
                    } catch (error) { }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    } catch (error) { }

}
)

