/**
 * @jest-environment node
 */
const puppeteer = require('puppeteer');

let page;
let browser;

const tests = ['plus', 'minus', 'multi', 'divide', 'modulo'];
const operation = ['+', '-', '*', '/', '%'];
const tests_dot = ['plus', 'minus', 'multi', 'divide'];
const results_dots = ['5.2', '2.5999999999999996', '5.07', '3'];

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
      expect(resultsValue).toBe(`${eval(`${num1}${num2}${operation[index]}${num1}`)}`);
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
      expect(resultsValue).toBe(`${eval(`${num1}.${num2}${operation[index]}${num3}.${num1}`)}`);
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
