import React from 'react';

const FormField = (props) => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        type='text'
        value={props.content}
        onChange={props.handleChange}
        placeholder={props.message}
      />
    </label>
  );
}

export default FormField;
