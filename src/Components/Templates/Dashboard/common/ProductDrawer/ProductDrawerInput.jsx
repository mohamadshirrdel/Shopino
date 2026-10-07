const ProductDrawerInput = ({ placeholder, label, type, value, onChange }) => {
  const id = crypto.randomUUID();

  return (
    <div>
      <label htmlFor={`unique-input-${id}`}>{label}</label>

      <input
        id={`unique-input-${id}`}
        className="w-full h-10 text-sm rounded-md outline-none primary-border px-3 mt-2"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ProductDrawerInput;
