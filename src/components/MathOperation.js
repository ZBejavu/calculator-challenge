import React from 'react';

const operations = {
  sqrt: {
    value: '√',
    className: 'button number op',
    id: 'op_sqrt',
  },
  power: {
    value: 'x²',
    className: 'button number op',
    id: 'op_power',
  },
  modulo: { value: '%', className: 'button number op', id: 'op_modulo' },
  plus: { value: '+', className: 'button plus', id: 'op_plus' },
  minus: { value: '-', className: 'button minus', id: 'op_minus' },
  multi: { value: '*', className: 'button multi', id: 'op_multi' },
  divide: { value: '/', className: 'button divide', id: 'op_divide' },
  AC: { value: 'AC', className: 'button AC', id: 'op_AC' },
  equal: { value: '=', className: 'button number', id: 'equal' },
  dot: { value: '.', className: 'button number', id: 'dot' },
};

export const operationTypes = Object.keys(operations);

export function MathOperation(props) {
  const { type, onClick } = props;
  const { value, className, id } = operations[type];

  return (
    <button
      className={className}
      id={id}
      value={value}
      key={value}
      onClick={() => onClick()}
    >
      {' '}
      {value}
    </button>
  );
}
