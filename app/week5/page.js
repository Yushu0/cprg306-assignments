import ItemList from "./item-list";

function Page() {
  return (
      <main>
          <h1 className="text-3xl md:text-4xl text-center py-3 md:py-5 font-bold text-stone-500">Shopping List</h1>
          <ItemList />
      </main>
  );
}

export default Page;

