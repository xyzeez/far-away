import React from 'react';
import { useState } from 'react';
import './index.css';
import initialItems from './utils';

// components
import Header from './components/header';
import Form from './components/form';
import TravelList from './components/travellist';
import Footer from './components/footer';

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

export default App;
