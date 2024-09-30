const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];

// Function to populate the list
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    })
    .join('');
}

// Function to add an item
function addItem(e) {
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const plate = {
    text,
    done: false,
  };

  items.push(plate);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

// Function to toggle done status
function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

// Event listeners
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

// Populate list from localStorage on page load
populateList(items, itemsList);
