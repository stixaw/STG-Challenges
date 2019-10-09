require('chromedriver')
var webdriver = require('selenium-webdriver')
var assert = require('chai').assert
const driverManager = require('../common/driver')
var By = webdriver.By
var until = webdriver.until
var Key = webdriver.Key

describe('challenge 1 suite', function () {
  this.timeout(34000)
  var driver

  before(() => {
    driver = driverManager.getDriver('chrome')
    return driver
  })

  after(() => {
    return driver.quit()
  })

  describe('Go to youniqueproducts.com', () => {
    it('It should open the younique cart', async () => {
      return driver.get('https://www.youniqueproducts.com/products/view/US-51081-01')
    })

    it('should assert we are on younqiue', async () => {
      var title = await driver.getTitle()
      await assert.include(title, 'Younique')
    })

    it('should add the item to the cart by clicking on the add to cart button', async () => {
      var addToCartBtn = await driver.findElement(By.css(".addToCartBtn"))
      addToCartBtn.click()

      await driver.wait(until.elementLocated(By.css("#viewCart", 10000)))
      var viewCartBtn = await driver.findElement(By.css("#viewCart"))
      viewCartBtn.click()

      await driver.wait(until.elementsLocated(By.xpath("//h1[.='My Shopping Cart']", 10000)))
      var myCart = driver.findElement(By.xpath("//h1[.='My Shopping Cart']"))
      await assert.exists(myCart)
    })

    it('should validate the cart overview', async () => {
      await driver.wait(until.elementLocated(By.css("#cartview", 10000)))
      // Get Cart Items per row:
      var item_row = await driver.findElement(By.xpath("//tr[@class='itemRow cartContents ']"))
      var item_row_unit_price = await driver.findElement(By.css("td.clr-fix")).getAttribute('innerText')
      item_row_unit_price = item_row_unit_price.replace().replace('$', '')
      var item_row_quantity = await driver.findElement(By.xpath("//input[@data-testid='quantityInput']")).getAttribute('value')
      var item_row_total = await driver.findElement(By.css(".receiptLineTotal")).getText()
      item_row_total = item_row_total.replace('$', '')

      console.log('unit price', item_row_unit_price)
      console.log('quantity', item_row_quantity)
      console.log('row total', item_row_total)

      // Summary of cart
      var cart_summary = await driver.findElements(By.xpath('//*[@id="cartview"]//td[contains(@class,"total")]'))
      var cart_summary_dict = {}

      for (var i = 2; i < cart_summary.length - 2; i += 2) {
        var key = await cart_summary[i].getText()
        // key = key.replace(':', '')
        console.log(key)
        var value = await cart_summary[i + 1].getText()
        value = value.replace('$', '').replace(' USD', '')
        console.log(value)
        cart_summary_dict[key] = value
      }

      console.log(cart_summary_dict)

      assert.equal(item_row_quantity, cart_summary_dict['Total Items:'])
      assert.equal(item_row_quantity * item_row_unit_price, cart_summary_dict['Subtotal:'])
      assert.equal(parseFloat(item_row_total) + parseFloat(cart_summary_dict['Shipping:']), cart_summary_dict['Total Balance Due:'])



    })
  })
})