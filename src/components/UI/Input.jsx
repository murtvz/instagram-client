import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className="flex flex-col items-start relative">
      <input
        {...props.input}
        ref={ref}
        placeholder={props.label ? props.label : ""}
        className="peer placeholder-transparent bg-gray-50 w-64 p-2 border-[1px] border-gray-300 text-sm focus:ring-0 focus:border-gray-400"
      />
      {props.label && (
        <label
          className="absolute transition-all left-0 -top-[2px] text-gray-500 text-[12px] pl-2 peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 hover:cursor-text"
          htmlFor={props.input.id}
        >
          {props.label}
        </label>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
