document.addEventListener("DOMContentLoaded", function() {

const countryElement = document.getElementById("country-select");
const numberOfConfirmed = document.getElementById("confirmed");
const numberOfDeaths = document.getElementById("deaths");
const numberOfRecovered = document.getElementById("recovered");
const numberOfCritical = document.getElementById("critical");
const numberOfActive = document.getElementById('active');
const updatedOn = document.getElementById("updated");
const casesToday = document.getElementById("confirmed-today");
const deathsToday = document.getElementById("deaths-today");
const tests = document.getElementById("tests");
const spinner = document.querySelectorAll(".spinner");
const slider = document.querySelector(".count-slider");
const sliderWidth = getComputedStyle(slider);
const width = parseInt(sliderWidth.width);

let countryTitle = document.getElementById("where");
let countryFlag = document.getElementById("country-flag");
let countryName = "South Africa";

const getCovidSA = async country => {
    try {
        // const fetchCovid19SA = await fetch(`https://covid19.mathdro.id/api/countries/${country}`) - Old API
        //const fetchCovid19SA = await fetch(`https://corona.lmao.ninja/v3/covid-19/countries/${country}`) - Old API;
        const fetchCovid19SA = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
        const data = await fetchCovid19SA.json();

        spinner.forEach(el => {
            el.classList.remove("spinner");
            console.log(el);
        });

        numberOfConfirmed.innerHTML = `${data.cases}`;

        numberOfCritical.innerHTML = `${data.critical}`;
        let fillCritical = (parseInt(data.critical)/parseInt(data.cases)) * width;
        document.getElementById("fill-critical").style.width = (fillCritical / 10).toFixed(1) + "rem";

        numberOfRecovered.innerHTML = `${data.recovered}`;
        let fillRecovered = (parseInt(data.recovered)/parseInt(data.cases)) * width;
        document.getElementById("fill-recovered").style.width = (fillRecovered / 10).toFixed(1) + "rem";

        numberOfDeaths.innerHTML = `${data.deaths}`;
        let fillDeaths = (parseInt(data.deaths)/parseInt(data.cases)) * width;
        document.getElementById("fill-deaths").style.width = (fillDeaths / 10).toFixed(1) + "rem";

        numberOfActive.innerHTML =`${data.active}`;
        let fillActive = (parseInt(data.active)/parseInt(data.cases)) * width;
        document.getElementById("fill-active").style.width = (fillActive / 10).toFixed(1) + "rem";

        time = moment(data.updated).format("DD-MMMM-YYYY h:mm:ss a");
        updatedOn.innerHTML = `<strong>Last Updated:</strong> ${time}`;


        casesToday.innerHTML = `${data.todayCases}`;
        deathsToday.innerHTML = `${data.todayDeaths}`;
        tests.innerHTML = `<strong>Number of tests conducted: </strong>${data.tests}`;

        setCountryInto(data.country, data.countryInfo.flag);

        return data;

    } catch(err) {
        console.log(err);
    }
}

//Default Call
getCovidSA(countryName);


countryElement.onchange=function() {
let countryElementValue = countryElement.options[countryElement.selectedIndex].value;
// countryName = countryElement.options[countryElement.selectedIndex].text;
// console.log(countryElementValue);
getCovidSA(countryElementValue);
} 

function setCountryInto(country, flag) {
    countryTitle.innerHTML = country;
    countryFlag.src = flag;
}
});


