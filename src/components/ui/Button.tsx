import React, { type ReactNode } from "react";

const Button: React.FC<{
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
}> = ({ className, onClick, children }) => {
  return (
    <button
      className={`${className} border p-2 rounded shadow bg-gold-200 text-white hover:text-gold-100 hover:bg-white dark:bg-darkbtn`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
