import React, { useState } from 'react';
import { MathOperation, operationTypes } from './MathOperation';
import DigitButton from './DigitButton';

/**
 * A basic switch calcuation function
 * @param {*} operation The name or type of the operation used, for ex. : "sqrt" / "+"
 * @param {*} num1 The first num to use in the calculation
 * @param {*} num2 The second num to use in the calculation
 */
function calculate(operation, num1, num2 = 0) {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    case '%':
      return num1 % num2;
    case 'power':
      return Math.pow(num1, 2);
    case 'sqrt':
      return Math.sqrt(num1);
  }
}

function Calc() {
  /*
   * Add (0-9) to <DigitButton /> with value and onClick function as exlplained in the requirements
   * Add the correct types to MathOperation, if you are having problem make sure its written correctly compared to operationTypes array
   * This is a state machine, you'll need to work wisely with React.js State and Lifecycle functionality
   * You can use calculate function for your aid
   */

  return (
    <div className='calculator'>
      <div className='result'>
        {/*
         * Print the result of the calculation here
         */}
      </div>
      <div className='calculator-digits calculator-buttons'>
        <div className='digits'>
          {/*
           * Add here all of the digits and the modulo, square root and power buttons.
           */}
        </div>
        <div className='operations'>
          {/*
           * Add here all of the other MathOperations
           */}
        </div>
      </div>
    </div>
  );
}

export default Calc;
