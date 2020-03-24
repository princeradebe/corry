let confirmed = "loading...";
let deaths = "loading...";
let recovered = "loading...";
let critical = "loading...";

let numberOfConfirmed = document.getElementById("confirmed");
let numberOfDeaths = document.getElementById("deaths");
let numberOfRecovered = document.getElementById("recovered");
let numberOfCritical = document.getElementById("critical");

numberOfConfirmed.innerHTML = `Confirmed: ${confirmed}`;
numberOfRecovered.innerHTML = `Recovered: ${recovered}`;
numberOfDeaths.innerHTML = `Deaths: ${deaths}`;
numberOfCritical.innerHTML = `Critical: ${critical}`;

const getCovidSA = async country => {
    try {
        // const fetchCovid19SA = await fetch(`https://covid19.mathdro.id/api/countries/${country}`)
        const fetchCovid19SA = await fetch(`https://corona.lmao.ninja/countries/${country}`);
        const data = await fetchCovid19SA.json();
        numberOfConfirmed.innerHTML = `Confirmed: ${data.cases}`;
        numberOfCritical.innerHTML = `Critical: ${data.critical}`;
        numberOfRecovered.innerHTML = `Recovered: ${data.recovered}`;
        numberOfDeaths.innerHTML = `Deaths: ${data.deaths}`;
        return data;
    } catch(err) {
        console.log(err);
    }
}

getCovidSA("South Africa");
