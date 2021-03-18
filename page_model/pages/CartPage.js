import {Selector} from 'testcafe'

class CartPage {
    constructor(){
        this.pageTitle = Selector('.subheader').withExactText('Your Cart')
        this.checkoutButton = Selector('.btn_action.checkout_button')
        this.itemCart = Selector ('.inventory_item_name')
    }

    async ItemsInCart(item) {
        const counter = await this.itemCart.count;
        let coincidence = false;
        for (let i = 0; i < counter; i++) {
            const title = await this.itemCart.nth(i).innerText;
            if (title.match(item)) {
                coincidence = true;
            }
        }
        return coincidence
    }

    async getItems() {
        const counter = await this.itemCart.count;
        let itemsList = [];
        for (let i = 0; i < counter; i++) {
            const title = await this.itemCart.nth(i).innerText;
            itemsList.push(title);
        }
        return itemsList;
    }
}

export default new CartPage()