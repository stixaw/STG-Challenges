// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('honda', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('honda', async function() {
    await driver.get("https://www.copart.com/")
    await driver.setRect(1365, 824)
    await driver.executeScript("window.scrollTo(0,1)")
    await driver.findElement(By.id("input-search")).click()
    await driver.findElement(By.id("input-search")).sendKeys("honda")
    await driver.findElement(By.id("input-search")).sendKeys(Key.ENTER)
  })
})
