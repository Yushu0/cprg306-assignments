
export default function Item({ name, quantity, category }) {
  return (
      <div class="mx-auto p-4 bg-stone-400 border-2 border-stone-500 m-4 w-2/3 rounded-lg">
          <p className="text-xl font-bold mb-2">{name}</p>
          <p className="text-gray-800">Buy {quantity} in {category}</p>
      </div>
  );
}
