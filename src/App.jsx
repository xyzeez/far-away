import React, { useState } from 'react';
import './index.css';

const initialItems = [
  { id: 1, description: 'Passport', quantity: 1, packed: true },
  { id: 2, description: 'Travel wallet', quantity: 1, packed: false },
  { id: 3, description: 'Tickets', quantity: 1, packed: true },
  { id: 4, description: 'Money', quantity: 1, packed: false },
  { id: 5, description: 'Phone charger', quantity: 1, packed: true },
  { id: 6, description: 'Toothbrush', quantity: 1, packed: false },
  { id: 7, description: 'Toothpaste', quantity: 1, packed: true },
  { id: 8, description: 'Shampoo', quantity: 1, packed: true },
];

const App = () => {
  const [items, setItems] = useState(initialItems);

  const handleSetItems = (newItem) => {
    setItems((items) => [...items, newItem]);
  };

  const handleItemPacked = (itemID) => {
    setItems((items) =>
      items.map((item) =>
        item.id === itemID ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleItemDeleted = (itemID) => {
    setItems((items) => items.filter((item) => item.id !== itemID));
  };

  const handleClearList = () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete all items in your travel list⁉️'
    );

    if (confirmation) setItems([]);
  };

  return (
    <main className="app">
      <Header />
      <Form handleNewItem={handleSetItems} />
      <TravelList
        listItems={items}
        packedHandler={handleItemPacked}
        deletedHandler={handleItemDeleted}
        clearListHandler={handleClearList}
      />
      <Footer items={items} />
    </main>
  );
};

const Header = () => <h1>🏝️ Far Away🧳</h1>;

const Form = ({ handleNewItem }) => {
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const clearState = () => {
    setDescription('');
    setQuantity('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newItem = { description, quantity, packed: false, id: Date.now() };

    handleNewItem(newItem);

    clearState();
  };

  const handleQuantity = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <form className="add-form" onSubmit={handleFormSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <input
        type="number"
        list="travel-items"
        pattern="\d+"
        step="1"
        placeholder="1"
        required
        value={quantity}
        onChange={handleQuantity}
      />
      <datalist id="travel-items">
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="4" />
        <option value="5" />
      </datalist>
      <input
        type="text"
        placeholder="Jacket"
        required
        value={description}
        onChange={handleDescription}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const TravelList = ({
  listItems,
  packedHandler,
  deletedHandler,
  clearListHandler,
}) => {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  const handleSortItems = (sortBy) => {
    if (sortBy === 'description')
      return listItems
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === 'packed')
      return initialItems
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));

    return listItems.slice();
  };

  sortedItems = handleSortItems(sortBy);

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  return (
    <div className="list">
      {listItems.length ? (
        <React.Fragment>
          <ul>
            {sortedItems.map((item) => (
              <ListItem
                item={item}
                packedHandler={packedHandler}
                deletedHandler={deletedHandler}
                key={item.id}
              />
            ))}
          </ul>

          <div className="actions">
            <select
              value={sortBy}
              onChange={(e) => handleSortBy(e.target.value)}>
              <option value="input">Sort by input order</option>
              <option value="description">Sort by description</option>
              <option value="packed">Sort by packed status</option>
            </select>
            <button onClick={() => clearListHandler()}>Clear List</button>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

const ListItem = ({ item, packedHandler, deletedHandler }) => (
  <li>
    <input
      type="checkbox"
      checked={item.packed}
      onChange={() => packedHandler(item.id)}
    />
    <span className={item.packed ? 'packed' : ''}>
      {item.quantity} {item.description}
    </span>
    <button onClick={() => deletedHandler(item.id)}>❌</button>
  </li>
);

const Footer = ({ items }) => {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const packedPercent = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      {!numPacked
        ? `Start adding items to your packing list 🧳`
        : packedPercent === 100
        ? `You've got everything ready to go! 🎫`
        : `🧳 You have ${numItems} items on your list, and you've already packed ${numPacked} (${packedPercent}%)`}
    </footer>
  );
};

export default App;
