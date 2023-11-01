type Props = {
  title: string;
  children: React.ReactNode;
};

function ItemsGrid({ title, children }: Props) {
  console.log('Rendering <ItemsGrid />');
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-4xl pb-10">{title}</h1>
      <div className="grid grid-cols-1 gap-y-40 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {children}
      </div>
    </div>
  );
}

export default ItemsGrid;
