import {Selector,t} from 'testcafe'

class ProductsPage {
    constructor(){
        this.pageTitle = Selector ('.product_label')
        this.item = Selector ('.inventory_item')
        this.shoppingcart = Selector ('#shopping_cart_container')
        this.menuButton = Selector ('#react-burger-menu-btn')
        this.logoutButton = Selector ('#logout_sidebar_link')
    }

    async logoutFn(){  
        await t.click(this.menuButton)
        await t.click(this.logoutButton)
    }

    async addItem(itemName){
        await t.click(this.item().withText(itemName).child('.pricebar').child('.btn_primary.btn_inventory'))
    }
}

export default new ProductsPage()