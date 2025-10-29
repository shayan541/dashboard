import React, { useState, type ReactNode } from "react";

const OptionBox: React.FC<{
  children: ReactNode;
  options?: { key: string; value: string }[];
  onChange?: (input: string) => void;
  id?: string;
  text?: string | null;
}> = ({ children, options, onChange, id, text }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      tabIndex={0}
      onClick={() => setShowMenu((val) => !val)}
      onBlur={(e) => {
        const nextFocus = e.relatedTarget as HTMLElement | null;
        if (nextFocus?.closest(`.menu-container${id}`)) {
          return;
        }
        setShowMenu(false);
      }}
      className="relative cursor-pointer max-w-[300px]"
    >
      {children}
      {(text || options) && (
        <div
          className={`menu-container${id} min-w-full absolute shadow border bg-white right-0  translate-y-1 rounded max-h-52 overflow-auto z-10  ${
            showMenu ? "block" : "hidden"
          }`}
        >
          {text && <div className="shadow rounded p-2 w-[300px] text-center">{text}</div>}
          {options && (
            <ul>
              {options.map((item, i) => (
                <li
                  key={item.key + i}
                  onClick={() => onChange?.(item.key)}
                  className="p-2 hover:bg-gold-100 cursor-pointer dark:hover:bg-slate-200 capitalize"
                >
                  {item.value}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionBox;
