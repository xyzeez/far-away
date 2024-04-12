import { useState } from 'react';
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

  return (
    <main className="app">
      <Header />
      <Form handleNewItem={handleSetItems} />
      <TravelList
        listItems={items}
        packedHandler={handleItemPacked}
        deletedHandler={handleItemDeleted}
      />
      <Footer />
    </main>
  );
};

const Header = () => <h1>🏝️ Far Away🧳</h1>;

const Form = ({ handleNewItem }) => {
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const clearState = () => {
    setDescription((des) => '');
    setQuantity((quantity) => '');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newItem = { description, quantity, packed: false, id: Date.now() };

    handleNewItem(newItem);

    clearState();
  };

  const handleQuantity = (e) => {
    setQuantity((quantity) => Number(e.target.value));
  };

  const handleDescription = (e) => {
    setDescription((des) => e.target.value);
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

const TravelList = ({ listItems, packedHandler, deletedHandler }) => {
  return (
    <div className="list">
      <ul>
        {listItems.map((item) => (
          <ListItem
            item={item}
            packedHandler={packedHandler}
            deletedHandler={deletedHandler}
            key={item.id}
          />
        ))}
      </ul>
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

const Footer = () => {
  return (
    <footer className="stats">
      🧳 You have x items on your list, and you've already packed x (x%)
    </footer>
  );
};

export default App;
