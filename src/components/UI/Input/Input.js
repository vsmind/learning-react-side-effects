import React, { useImperativeHandle, useRef } from "react";

import classes from './Input.module.css';

// React.forwardRef returns a rect component capable of bound to the `ref`
const Input = React.forwardRef((props, ref) => {

    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    }

    // Translation object between internal func and outside
    // focus is externaly available function
    useImperativeHandle(ref, () => {
        return {
            focus: activate
        }
    })

  return (
      <div
          className={`${classes.control} ${
              props.isValid === false ? classes.invalid : ''
          }`}
      >
          <label htmlFor={props.id}>{props.label}</label>
          <input
              ref={inputRef}
              type={props.type}
              id={props.id}
              value={props.value}
              onChange={props.onChange}
              onBlur={props.onBlur}
          />
      </div>
  );
}
);

export default Input;