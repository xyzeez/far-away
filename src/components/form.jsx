import { useState } from 'react';

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

export default Form;
