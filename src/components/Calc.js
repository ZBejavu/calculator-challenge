import React, { useEffect, useState } from 'react';
import { MathOperation, operationTypes } from './MathOperation';
import DigitButton from './DigitButton';
import {operations} from './MathOperation'

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
  /**
   * Add (0-9) to <DigitButton /> with value and onClick function as exlplained in the requirements
   * Add the correct types to MathOperation, if you are having problem make sure its written correctly compared to operationTypes array
   * This is a state machine, you'll need to work wisely with React.js State and Lifecycle functionality
   * You can use calculate function for your aid
   */
  let arr = Array(10).fill(0);
  let mathArr = ['sqrt', 'power', 'modulo', 'plus', 'minus', 'multi', 'divide', 'AC', 'equal', 'dot'];
  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState();
  const [inMathOpp, setInMathOp] = useState(false);
  const [inDot, setInDot] = useState(false);
  const [error, setError] = useState(false);
  function clearAll(){
    setNumber(0);
    setNumber2(false);
    setInMathOp(false);
    setInDot(false);
  }
  function operationHandle(operation){
    if(operation === 'sqrt'){
      clearAll();
      console.log(calculate(operation , number))
      return setNumber(calculate(operation , number));
    }
    if(operation === 'power'){
      clearAll();
      console.log(calculate(operation , number))
      return setNumber(calculate(operation , number));
    }
    if(operation === 'dot'){
      return setInDot(true);
      // return setInMathOp(operations[operation].value)
    }
    if(operation === 'AC'){
      setError(false);
      return clearAll();
    }
    if(operation === 'equal'){
      if(number2 && number){
        let calculation = calculate(inMathOpp, number, number2);
        console.log(calculation);
        setNumber(calculation);
        setNumber2(false);
        return setInMathOp(false);
      }
    }
    if(!inMathOpp){
      setInMathOp(operations[operation].value)
    }
  }
  useEffect( () => {
    if(error){
      clearAll();
    }
  },[error])
  return (
    <div className='calculator'>
      <div className='result'>
        {/**
         * Print the result of the calculation here
         */}
           {
             error ? 'Error'
             : <>
                {
                  number
                }
                {
                  inMathOpp && inMathOpp
                }
                {
                  number2 && number2
                }
             </>
           }

      </div>
      <div className='calculator-digits'>
         {/**
          * Enter here all of the MathOperation and DigitButton components
          */}
          {
            mathArr.map(operation => {
              return <MathOperation type={operation} onClick={() =>{operationHandle(operation)}} />
            })
          }
      <>
          {
            arr.map((digit, i) => {
              return <DigitButton value={i} onClick ={() => {
                let currentnum = i,newNumber = number, secondNumber = number2;
                if(error){
                  setError(false);
                }
                if(!newNumber){
                  return setNumber(currentnum)
                }
                if(inDot){
                  if(!secondNumber){
                    setInDot(false);
                    return setNumber(number + currentnum/10);
                  }
                  if(secondNumber){
                    setInDot(false);
                    return setNumber2(number2 + currentnum/10);
                  }
                }
                if(inMathOpp){
                  console.log(inMathOpp)
                  if(!secondNumber && currentnum === 0 && inMathOpp === '/'){
                    setError(true);
                  }
                  if(!secondNumber){
                    return setNumber2(currentnum)
                  }
                  secondNumber = secondNumber * 10;
                  secondNumber += currentnum;
                  return setNumber2(secondNumber);
                }
                newNumber = newNumber * 10;
                newNumber+= currentnum;
                setNumber(newNumber);                
              }} />
            })
          }
      </>

      </div>
    </div>
  );
}

export default Calc;
