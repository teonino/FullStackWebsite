
const countrySelect = document.getElementById('country-select');
const countryInfoDiv = document.getElementById('country-info');
let capitalLat;
let capitalLnt;
let capitalWeather =[];

let countriesData = [];

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {

        countriesData = data;

        const loadingOption = document.getElementById('loading-option');
        if (loadingOption) loadingOption.remove();

        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca3;
            option.textContent = country.name.common;
            console.log(`Ajout de ${country.name.common} avec code: ${country.cca3}`);
            countrySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching countries:', error);
    });


    countrySelect.addEventListener('change', (e) => {
        const selectedCode = e.target.value;
        console.log('Code sélectionné :', selectedCode);
        const country = countriesData.find(c => c.cca3 === selectedCode);
        console.log('Pays trouvé dans countriesData:', country);

        capitalLat = country.capitalInfo.latlng[0];
        capitalLnt = country.capitalInfo.latlng[1];

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${capitalLat}&longitude=${capitalLnt}`)
            .then(response => response.json)
            .then(data =>{
                capitalWeather = data;
                console.log(capitalWeather);
            })
            .catch(error =>{
                console.error(error);
            })

        if(country) {
            countryInfoDiv.innerHTML = `
                <h2>${country.name.common}</h2>
                <img src="${country.flags.svg}" alt= "Flag of ${country.name.common}" width ='100'>
                <p><strong>Capital: </strong> ${country.capital?.[0] || 'Unknown'}</p>
                <p><strong>Population:</strong>${country.population.toLocaleString()}</p>
            `;
        }
    })

