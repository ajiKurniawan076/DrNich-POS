const Button = ({ type, children }) => {
  return (
    <button
      className="absolute bottom-0  h-10 bg-yellow-500 w-full rounded-md shadow-sm  duration-500 "
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
