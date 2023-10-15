import React from 'react';

function Item({item}) {
  return (
      <section className="bg-stone-400 p-5 rounded">
          <h3 className="text-xl">Name : {item.name}</h3>
          <p>Quantity : {item.quantity}</p>
          <p>Category : {item.category}</p>
      </section>
  );
}

export default Item;

