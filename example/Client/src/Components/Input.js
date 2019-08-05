import React from 'react';

export default function Input({type, value, onChange, name, title}) {
  return (
    <label>
      <span>{title}</span>
      <input type={type} name={name} value={value} onChange={onChange}/>
    </label>
  )
}
