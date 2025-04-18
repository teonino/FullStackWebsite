
const countrySelect = document.getElementById('country-select');
const countryInfoDiv = document.getElementById('country-info');

const countriesData = [];

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {

        const loadingOption = document.getElementById('loading-option');
        if (loadingOption) loadingOption.remove();

        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name.common;
            option.textContent = country.name.common;

            countrySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching countries:', error);
    });


    countrySelect.addEventListener('change', (e) => {
        console.log('Pays sélectionné:', e.target.value);
        const selectedCountry = e.target.value;

        const country = countriesData.find(c => c.name.common === selectedCountry);
        console.log('Pays trouvé dans countriesData:', country);
        if(country) {
            console.log('Pays récupérés depuis l’API :', data);
            countryInfoDiv.innerHTML = `
                <h2>${country.name.common}</h2>
                <img src="${country.flags.svg}" alt= "Flag of ${country.name.common}" width ='100'>
                <p><strong>Capital: </strong> ${country.capital?.[0] || 'Unknown'}</p>
                <p><strong>Population:</strong>${country.population.toLocaleString()}</p>
            `;
        }
    })