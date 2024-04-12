import './index.css';

const initialItems = [
  { id: 1, description: 'Passport', quantity: 1, packed: true },
  { id: 2, description: 'Travel wallet', quantity: 1, packed: false },
  { id: 3, description: 'Tickets', quantity: 1, packed: true },
  { id: 4, description: 'Money', quantity: 1, packed: false },
  { id: 5, description: 'Phone charger', quantity: 1, packed: true },
  { id: 6, description: 'Toothbrush', quantity: 1, packed: false },
  { id: 7, description: 'Toothpaste', quantity: 1, packed: true },
  { id: 8, description: 'Shampoo', quantity: 1, packed: false },
];

const App = () => {
  return (
    <main className="app">
      <Header />
      <Form />
      <TravelList />
      <Footer />
    </main>
  );
};

const Header = () => <h1>🏝️ Far Away🧳</h1>;

const Form = () => {
  return (
    <form className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
      <input
        type="number"
        list="travel-items"
        pattern="\d+"
        step="1"
        placeholder="1"
        required
      />
      <datalist id="travel-items">
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="4" />
        <option value="5" />
      </datalist>
      <input type="text" placeholder="Jacket" required />
      <button type="submit">Add</button>
    </form>
  );
};

const TravelList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <ListItem item={item} />
        ))}
      </ul>
    </div>
  );
};

const ListItem = ({ item }) => (
  <li>
    <span className={item.packed ? 'packed' : ''}>
      {item.quantity} {item.description}
    </span>
    <button>❌</button>
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
