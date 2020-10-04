import React from 'react';

function DigitButton(props) {
  const { value, onClick } = props;

  return (
    <button
      className='button number'
      onClick={() => onClick()}
      value={value}
      id={value === '=' ? 'equal' : value === '.' ? 'dot' : `digit_${value}`}
    >
      {value}
    </button>
  );
}

export default DigitButton;
