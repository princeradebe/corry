document.addEventListener("DOMContentLoaded", function() {
const numberOfConfirmed = document.getElementById("confirmed");
const numberOfDeaths = document.getElementById("deaths");
const numberOfRecovered = document.getElementById("recovered");
const numberOfCritical = document.getElementById("critical");
const numberOfActive = document.getElementById('active');
const updatedOn = document.getElementById("updated");
const spinner = document.querySelectorAll(".spinner");
const slider = document.querySelector(".count-slider");
const sliderWidth = getComputedStyle(slider);
const width = parseInt(sliderWidth.width);



const getCovidSA = async country => {
    try {
        // const fetchCovid19SA = await fetch(`https://covid19.mathdro.id/api/countries/${country}`) - Old API
        const fetchCovid19SA = await fetch(`https://corona.lmao.ninja/countries/${country}`);
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

        //Time stats were updated
        let time = moment(data.updated).format("DD MMMM YYYY h:mm:ss");
        updatedOn.innerHTML = `Last Updated: ${time}`;

        return data;
    } catch(err) {
        console.log(err);
    }
}

data = getCovidSA("South Africa");

});
