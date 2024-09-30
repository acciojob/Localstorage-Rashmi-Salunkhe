// Select elements from the DOM
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || []; // Retrieve items from localStorage or start with an empty array

// Function to add items
function addItem(e) {
  e.preventDefault(); // Prevent form from refreshing the page
  const text = this.querySelector('[name=item]').value; // Get the input value
  const item = {
    text, // shorthand for text: text
    done: false // New item is not done initially
  };
  items.push(item); // Add the item to the array
  populateList(items, itemsList); // Update the DOM with the new item
  localStorage.setItem('items', JSON.stringify(items)); // Store the updated list in localStorage
  this.reset(); // Reset the form input field
}

// Function to populate the list of items
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
    .join(''); // Create list items based on the plates array
}

// Function to toggle the done state
function toggleDone(e) {
  if (!e.target.matches('input')) return; // Skip if not an input checkbox
  const el = e.target;
  const index = el.dataset.index; // Get the index of the item
  items[index].done = !items[index].done; // Toggle the done property
  localStorage.setItem('items', JSON.stringify(items)); // Update localStorage
  populateList(items, itemsList); // Re-render the list
}

// Event listeners
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

// Populate the list with items from localStorage on page load
populateList(items, itemsList);
