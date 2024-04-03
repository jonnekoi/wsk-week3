'use strict';

import {baseUrl} from './variables.js';
import {fetchData} from './utils.js';
import {restaurantRow, restaurantModal} from './components.js';

const restaurants = [];
const dialogNode = document.querySelector('dialog');

async function getRestaurants() {
  const data = await fetchData(`${baseUrl}`);
  if (data) {
    data.forEach((item) => {
      item.id = item._id;
      restaurants.push(item);
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await getRestaurants();

  // eslint-disable-next-line max-len
  restaurants.sort((a, b) => a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim()));

  const table = document.querySelector('table');

  restaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    table.appendChild(row);

    row.addEventListener('click', async () => {
      const menu = await fetchData(`${baseUrl}/daily/${restaurant.id}/fi`);
      // eslint-disable-next-line max-len
      document.querySelectorAll('tr.highlight').forEach((highlighted) => highlighted.classList.remove('highlight'));

      dialogNode.innerHTML = restaurantModal(restaurant, menu);
      row.classList.toggle('highlight');
      dialogNode.showModal();
      document.querySelector('#closeDialog').addEventListener('click', () => {
        dialogNode.close();
      });
    });
  });
});
