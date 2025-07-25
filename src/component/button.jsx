const Button = ({ text, cls = "", type = "black", onclick }) => {
    let bg;
  
    switch (type) {
      case "black":
        bg = "bg-black text-white hover:bg-white hover:text-black";
        break;
      case "white":
        bg = "bg-white text-black hover:bg-black hover:text-white";
        break;
      default:
        bg = "bg-black text-white hover:bg-white hover:text-black";
    }
  
    return (
      <button
        type="button"
        className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${bg} ${cls}`}
        onClick={onclick}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  