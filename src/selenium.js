const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Load the weather app
    await driver.get('http://localhost:3000/');

    // Wait for the search bar to appear and enter a city
    let searchBox = await driver.findElement(By.className('search-bar'));
    await searchBox.sendKeys('London', Key.RETURN);

    // Wait for the temperature to appear and verify that it's a number
    let temp = await driver.wait(until.elementLocated(By.className('temp')), 5000);
    let tempText = await temp.getText();
    let tempNum = parseFloat(tempText);
    assert.ok(!isNaN(tempNum));

    // Wait for the weather description to appear and verify that it's a string
    let weather = await driver.wait(until.elementLocated(By.className('weather')), 5000);
    let weatherText = await weather.getText();
    assert.ok(typeof weatherText === 'string');

    // Wait for the location to appear and verify that it's a string
    let location = await driver.wait(until.elementLocated(By.className('location')), 5000);
    let locationText = await location.getText();
    assert.ok(typeof locationText === 'string');

    console.log('Test passed!');
  } finally {
    await driver.quit();
  }
})();
