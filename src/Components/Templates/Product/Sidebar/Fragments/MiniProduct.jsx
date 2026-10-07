const MiniProduct = ({ name, image }) => {
  return (
    <article className="flex items-center gap-4">
      <div className="size-16.5! min-w-16.5!">
        <img
          src={`https://shopino.iran.liara.run/images/products/${image}`}
          alt="Product"
          className="size-full "
        />
      </div>
      <div>
        <h3 className="text-slate-800 text-sm! line-clamp-2">
          <strong>{name}</strong>
        </h3>
      </div>
    </article>
  );
};

export default MiniProduct;
