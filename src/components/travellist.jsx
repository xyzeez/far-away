import React from 'react';
import { useState } from 'react';

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
      return listItems
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

export default TravelList;
