'use strict';

import {baseUrl} from './variables.js';
import {fetchData} from './utils.js';
import {restaurantRow, restaurantModal} from './components.js';

const restaurants = [];
const dialogNode = document.querySelector('dialog');
// eslint-disable-next-line max-len
document.getElementById('companyFilter').addEventListener('change', filterAndDisplayRestaurants);

async function getRestaurants() {
  const data = await fetchData(`${baseUrl}`);
  console.log(data);
  if (data) {
    data.forEach((item) => {
      item.id = item._id;
      restaurants.push(item);
    });
    displayRestaurants(restaurants);
  }
}

function displayRestaurants(displayedRestaurants) {
  const table = document.querySelector('table');
  table.innerHTML = '';
  displayedRestaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    table.appendChild(row);

    row.addEventListener('click', async () => {
      const menu = await fetchData(`${baseUrl}/daily/${restaurant.id}/fi`);
      dialogNode.innerHTML = restaurantModal(restaurant, menu);
      dialogNode.showModal();
      // eslint-disable-next-line max-len
      document.querySelector('#closeDialog').addEventListener('click', () => dialogNode.close());
    });
  });
}

async function filterAndDisplayRestaurants() {
  const selectedCompany = document.getElementById('companyFilter').value;
  // eslint-disable-next-line max-len
  const filteredRestaurants = selectedCompany === 'all' ? restaurants : restaurants.filter((restaurant) => restaurant.company === selectedCompany);
  displayRestaurants(filteredRestaurants);
}

document.addEventListener('DOMContentLoaded', getRestaurants);
