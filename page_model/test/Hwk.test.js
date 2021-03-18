import { CREDENTIALS } from '../data/Constants'
import { PRODUCTS } from '../data/Constants'
import LoginPage from '../pages/LoginPage'
import CartPage from '../pages/CartPage'
import ProductsPage from '../pages/ProductsPage'
import CheckoutPage from '../pages/CheckoutPage'
import OverviewPage from '../pages/OverviewPage'
import FinishPage from '../pages/FinishPage'

fixture('Shopping site testing')
    .page `https://www.saucedemo.com/`

test('1- Login with a valid user', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.STD_USER.USERNAME, CREDENTIALS.STD_USER.PASSWORD)
    await t.expect(ProductsPage.pageTitle.exists).ok()
})

test('2- Login with an invalid user', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.INVALID_USER.USERNAME, CREDENTIALS.INVALID_USER.PASSWORD)
    await t.expect(LoginPage.errorMessage.exists).ok()
})

test('3- Logout from products page', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.STD_USER.USERNAME, CREDENTIALS.STD_USER.PASSWORD)
    await t.expect(ProductsPage.pageTitle.exists).ok()
    await ProductsPage.logoutFn()
    await t.expect(LoginPage.loginLogo.exists).ok()
})

test('4- Navigate to the shopping cart', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.STD_USER.USERNAME, CREDENTIALS.STD_USER.PASSWORD)
    await t.expect(ProductsPage.pageTitle.exists).ok()
    await t.click(ProductsPage.shoppingcart)
    await t.expect(CartPage.pageTitle.exists).ok()
})

test('5- Add a single item to the shopping cart', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.STD_USER.USERNAME, CREDENTIALS.STD_USER.PASSWORD)
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.LIGHT);
    await t.click(ProductsPage.shoppingcart)
    await t.expect(await CartPage.ItemsInCart(PRODUCTS.PRODUCTS_LIST.LIGHT)).eql(true);
})

test('6- Add multiple items to the shopping cart', async t=> {
    await LoginPage.submitLoginForm(CREDENTIALS.STD_USER.USERNAME, CREDENTIALS.STD_USER.PASSWORD)
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.LIGHT);
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.BACKPACK);
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.TSHIRT);
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.JACKET);
    await t.click(ProductsPage.shoppingcart)
    await t.expect(await CartPage.ItemsInCart(PRODUCTS.PRODUCTS_LIST.LIGHT)).eql(true);
    await t.expect(await CartPage.ItemsInCart(PRODUCTS.PRODUCTS_LIST.BACKPACK)).eql(true);
    await t.expect(await CartPage.ItemsInCart(PRODUCTS.PRODUCTS_LIST.TSHIRT)).eql(true);
    await t.expect(await CartPage.ItemsInCart(PRODUCTS.PRODUCTS_LIST.JACKET)).eql(true);
})

test('7- Continue with missing mail information', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.STD_USER.USERNAME, CREDENTIALS.STD_USER.PASSWORD)
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.LIGHT);
    await t.click(ProductsPage.shoppingcart)
    await t.expect(await CartPage.ItemsInCart(PRODUCTS.PRODUCTS_LIST.LIGHT)).eql(true);
    await t.click(CartPage.checkoutButton)
    await CheckoutPage.missingZip(CREDENTIALS.MAIL_ADDRESS.NAME, CREDENTIALS.MAIL_ADDRESS.LASTNAME)
    await t.expect(CheckoutPage.errorMessage.exists).ok()
})

test('8- Fill users information', async t=> {
    await LoginPage.submitLoginForm(CREDENTIALS.STD_USER.USERNAME, CREDENTIALS.STD_USER.PASSWORD)
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.JACKET);
    await t.click(ProductsPage.shoppingcart)
    await t.expect(await CartPage.ItemsInCart(PRODUCTS.PRODUCTS_LIST.JACKET)).eql(true);
    await t.click(CartPage.checkoutButton)
    await CheckoutPage.fillData(CREDENTIALS.MAIL_ADDRESS.NAME, CREDENTIALS.MAIL_ADDRESS.LASTNAME, CREDENTIALS.MAIL_ADDRESS.ZIP)
    await t.expect(OverviewPage.pageTitle.exists).ok()
})

test('9- Final order items', async t=> {
    let itemsList =[]
    await LoginPage.submitLoginForm(CREDENTIALS.STD_USER.USERNAME, CREDENTIALS.STD_USER.PASSWORD)
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.LIGHT);
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.BACKPACK);
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.TSHIRT);
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.JACKET);
    await t.click(ProductsPage.shoppingcart)
    itemsList = await CartPage.getItems();
    await t.click(CartPage.checkoutButton)
    await CheckoutPage.fillData(CREDENTIALS.MAIL_ADDRESS.NAME, CREDENTIALS.MAIL_ADDRESS.LASTNAME, CREDENTIALS.MAIL_ADDRESS.ZIP)
    await t.expect(await OverviewPage.compareLists(itemsList)).eql(true);
})

test('10- Complete a purchase', async t=> {
    await LoginPage.submitLoginForm(CREDENTIALS.STD_USER.USERNAME, CREDENTIALS.STD_USER.PASSWORD)
    await ProductsPage.addItem(PRODUCTS.PRODUCTS_LIST.JACKET);
    await t.click(ProductsPage.shoppingcart)
    await t.expect(await CartPage.ItemsInCart(PRODUCTS.PRODUCTS_LIST.JACKET)).eql(true);
    await t.click(CartPage.checkoutButton)
    await CheckoutPage.fillData(CREDENTIALS.MAIL_ADDRESS.NAME, CREDENTIALS.MAIL_ADDRESS.LASTNAME, CREDENTIALS.MAIL_ADDRESS.ZIP)
    await t.expect(OverviewPage.pageTitle.exists).ok()
    await t.click(OverviewPage.FinishButton)
    await t.expect(FinishPage.pageTitle.exists).ok()
})