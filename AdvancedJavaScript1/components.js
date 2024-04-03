export const restaurantRow = ({name, address, id}) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${name}</td><td>${address}</td>`;
  tr.dataset.id = id; // Store id for later use
  return tr;
};

// eslint-disable-next-line max-len
export const restaurantModal = ({name, address, postalCode, city, company, phone}, {courses}) => {
  const menuItems = courses.map((course) => `<p>${course.name}</p>`).join('');
  return `
        <h1>${name}</h1>
        <p>${address}, ${postalCode}, ${city}</p>
        <p>${company} ${phone !== '-' ? phone : ''}</p>
        <form method="dialog">
            <button type="button" id="closeDialog">Close</button>
        </form>
        <h2>Menu</h2>
        ${menuItems}
      `;
};

