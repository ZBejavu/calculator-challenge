/**
 * @jest-environment node
 */
const puppeteer = require('puppeteer');
function calculate(operation, num1, num2 = 0) {
  switch (operation) {
    case 'plus':
      return num1 + num2;
    case 'minus':
      return num1 - num2;
    case 'multi':
      return num1 * num2;
    case 'divide':
      return num1 / num2;
    case 'modulo':
      return num1 % num2;
    case 'power':
      return Math.pow(num1, 2);
    case 'sqrt':
      return Math.sqrt(num1);
  }
}

let page;
let browser;

const tests = ['plus', 'minus', 'multi', 'divide', 'modulo'];
const tests_dot = ['plus', 'minus', 'multi', 'divide'];
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

jest.setTimeout(30000);
const projectName = 'Calculator Challenge';
describe(`${projectName} - test suite`, () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  digits.forEach((digit) => {
    it(`can display the ${digit} digit on the screen by clicking the ${digit} button`, async () => {
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
      await page.click(`#digit_${digit}`);
      const result = await page.$('.result');
      const resultsValue = await (
        await result.getProperty('innerText')
      ).jsonValue();
      expect(resultsValue).toBe(digit.toString());
    });
  });

  it(`can display a double-digit number by clicking two digit buttons`, async () => {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await page.click(`#digit_6`);
    await page.click(`#digit_6`);
    const result = await page.$('.result');
    const resultsValue = await (
      await result.getProperty('innerText')
    ).jsonValue();
    expect(resultsValue).toBe('66');
  });

  tests.forEach((test, index) => {
    it(`Can use ${test}`, async () => {
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);

      await page.click(`#digit_${num1}`);
      await page.click(`#digit_${num2}`);
      await page.click(`#op_${test}`);
      await page.click(`#digit_${num1}`);
      await page.click('#equal');

      const result = await page.$('.result');
      const resultsValue = await (
        await result.getProperty('innerText')
      ).jsonValue();
      expect(Number(resultsValue)).toBe(
        calculate(test, num1 * 10 + num2, num1)
      );
    });
  });

  tests_dot.forEach((test, index) => {
    it(`Can use ${test} with dot`, async () => {
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      const num3 = Math.floor(Math.random() * 10);

      await page.click(`#digit_${num1}`);
      await page.click('#dot');
      await page.click(`#digit_${num2}`);
      await page.click(`#op_${test}`);
      await page.click(`#digit_${num3}`);
      await page.click('#dot');
      await page.click(`#digit_${num1}`);
      await page.click('#equal');

      const result = await page.$('.result');
      const resultsValue = await (
        await result.getProperty('innerText')
      ).jsonValue();
      expect(Number(resultsValue)).toBe(
        calculate(test, num1 + num2 / 10, num3 + num1 / 10)
      );
    });
  });

  it(`Can change the input value by clicking some number`, async () => {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await page.click('#digit_7');
    const result = await page.$('.result');
    const resultsValue = await (
      await result.getProperty('innerText')
    ).jsonValue();
    expect(resultsValue).toBe('7');
  });

  it(`Can reset the input value by clicking on the AC button`, async () => {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await page.click('#digit_5');
    await page.click('#op_AC');
    const result = await page.$('.result');
    const resultsValue = await (
      await result.getProperty('innerText')
    ).jsonValue();
    expect(resultsValue).toBe('0');
  });

  it('Can delete', async () => {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await page.click('#op_AC');
    await page.click('#digit_1');
    await page.click(`#op_plus`);
    await page.click('#digit_9');
    await page.click('#op_AC');
    await page.click('#digit_1');
    await page.click(`#op_plus`);
    await page.click('#digit_9');
    await page.click('#equal');
    const result = await page.$('.result');
    const resultsValue = await (
      await result.getProperty('innerText')
    ).jsonValue();
    expect(resultsValue).toBe('10');
  });

  it(`Changes the input to an 'Error' string if user tries to devide by 0`, async () => {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await page.click('#digit_5');
    await page.click('#op_divide');
    await page.click('#digit_0');
    await page.click('#equal');
    const result = await page.$('.result');
    const resultsValue = await (
      await result.getProperty('innerText')
    ).jsonValue();
    expect(resultsValue).toBe('Error');
  });

  it(`can square a number`, async () => {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await page.click('#digit_5');
    await page.click('#op_power');
    const result = await page.$('.result');
    const resultsValue = await (
      await result.getProperty('innerText')
    ).jsonValue();
    expect(resultsValue).toBe('25');
  });

  it(`can get the square root of a number`, async () => {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    await page.click('#digit_4');
    await page.click('#digit_9');
    await page.click('#op_sqrt');
    const result = await page.$('.result');
    const resultsValue = await (
      await result.getProperty('innerText')
    ).jsonValue();
    expect(resultsValue).toBe('7');
  });
});
