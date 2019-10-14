require('chromedriver')
const webdriver = require('selenium-webdriver')
const assert = require('chai').assert
const driverManager = require('../common/driver')
const By = webdriver.By
const until = webdriver.until
const Key = webdriver.Key

describe('challenge 1 suite', function () {
  this.timeout(34000)
  let driver

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
      let title = await driver.getTitle()
      await assert.include(title, 'Younique')
    })

    it('should add the item to the cart by clicking on the add to cart button', async () => {
      let addToCartBtn = await driver.findElement(By.css(".addToCartBtn"))
      addToCartBtn.click()

      await driver.wait(until.elementLocated(By.css("#viewCart", 10000)))
      let viewCartBtn = await driver.findElement(By.css("#viewCart"))
      viewCartBtn.click()

      await driver.wait(until.elementsLocated(By.xpath("//h1[.='My Shopping Cart']", 10000)))
      let myCart = driver.findElement(By.xpath("//h1[.='My Shopping Cart']"))
      await assert.exists(myCart)
    })
  })

  describe('Cart Validation', async () => {
    let item_row_quantity
    let item_row_unit_price
    let item_row_discount_amount
    let item_row_discount_total
    let item_row_regular_total

    let cart_summary_regular_total
    let cart_summary_discount_total
    let cart_summary_subtotal
    let cart_summary_total_items

    it('should have the same quantity of items in the cart as in the cart summary', async () => {
      await driver.wait(until.elementLocated(By.css("#cartview", 10000)))
      item_row_quantity = await driver.findElement(By.css("[data-testid='quantityInput']")).getAttribute('value')
      console.log('quantity', item_row_quantity)
      cart_summary_total_items = await driver.findElement(By.xpath("//td[text()='Total Items:']/following-sibling::td")).getText()
      console.log('summary items', cart_summary_total_items)
      assert.equal(item_row_quantity, cart_summary_total_items)
    })

    it('should be able to validate row discounted total', async () => {
      item_row_unit_price = await driver.findElement(By.xpath("//span[text()='Unit Price']/following-sibling::span")).getText()
      item_row_unit_price = parseFloat(item_row_unit_price.replace('$', ''))
      console.log('unit price', item_row_unit_price)

      try {
        item_row_discount_amount = await driver.findElement(By.xpath("//span[text()='Discount']/following-sibling::span")).getText()
        item_row_discount_amount = parseFloat(item_row_discount_amount.replace('-$', ''))
        console.log('Discount amount', item_row_discount_amount)
      }
      catch{
        item_row_discount_amount = 0.00
      }
      try {
        item_row_discount_total = await driver.findElement(By.css("[class*='discountprice']")).getText()
        item_row_discount_total = parseFloat(item_row_discount_total.replace('$', ''))
        console.log('Row Discount Total', item_row_discount_total)
      }
      catch{
        item_row_discount_total = 0.00
      }
      assert.equal(item_row_discount_total, item_row_quantity * (item_row_unit_price - item_row_discount_amount))
    })

    it('should have the discounted total match the summary discounted total', async () => {
      if (item_row_discount_total !== 0) {
        cart_summary_discount_total = await driver.findElement(By.xpath("//td[(text()='Y-CASH credit ineligible amount:')]/following-sibling::td")).getText()
        cart_summary_discount_total = parseFloat(cart_summary_discount_total.replace('$', ''))
        console.log('Cart Discount Total', cart_summary_discount_total)

      }
      else {
        cart_summary_discount_total = 0.00
      }
      assert.equal(item_row_discount_total, cart_summary_discount_total)
    })

    it('should have the same regular row total match the summary regular total', async () => {
      try {
        item_row_regular_total = await driver.findElement(By.css("[class*='receiptLineTotal']")).getText()
        item_row_regular_total = parseFloat(item_row_regular_total.replace('$', ''))
        console.log('Row Regular Total', item_row_regular_total)
      }
      catch{
        item_row_regular_total = 0.00
      }

      if (item_row_regular_total !== 0) {
        cart_summary_regular_total = await driver.findElement(By.xpath("//td[(text()='Y-CASH credit eligible amount:')]/following-sibling::td")).getText()
        cart_summary_regular_total = parseFloat(cart_summary_regular_total.replace('$', ''))
        console.log('Cart Regular Total', cart_summary_regular_total)

      }
      else {
        cart_summary_regular_total = 0.00
      }
      assert.equal(item_row_regular_total, cart_summary_regular_total)
    })

    it('should confirm that the row discount total and regular total equal cart subtotal', async () => {
      cart_summary_subtotal = await driver.findElement(By.xpath("//td[(text()='Subtotal:')]/following-sibling::td")).getText()
      cart_summary_subtotal = parseFloat(cart_summary_subtotal.replace('$', ''))
      console.log('Cart SubTotal', cart_summary_subtotal)
      assert.equal(cart_summary_subtotal, item_row_discount_total + item_row_regular_total)
    })

    it('should confirm estimated total equal subtotal plus shipping total', async () => {
      let shipping_cost = await driver.findElement(By.css("[data-testid='shippingDisplay']")).getText()
      shipping_cost = parseFloat(shipping_cost.replace('$', ''))
      console.log('Shipping cost', shipping_cost)


      let summary_total_balance = await driver.findElement(By.id("carttotal")).getText()
      summary_total_balance = parseFloat(summary_total_balance.split()[0].replace('$', ''))
      console.log('Summary Total', summary_total_balance)

      assert.equal(summary_total_balance, cart_summary_subtotal + shipping_cost)
    })
  })
})
