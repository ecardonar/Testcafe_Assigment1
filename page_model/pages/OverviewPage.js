import {Selector} from 'testcafe'

class OverviewPage {
    constructor(){
        this.pageTitle = Selector('.subheader').withExactText('Checkout: Overview')
        this.FinishButton = Selector('.btn_action.cart_button')
        this.itemsOver = Selector ('.inventory_item_name')
    }

    async getItems() {
        const counter = await this.itemsOver.count;
        let itemList = [];
        for (let i = 0; i < counter; i++) {
            const title = await this.itemsOver.nth(i).innerText;
            itemList.push(title);
        }
        return itemList;
    }

    async compareLists(listItems) {
        let status = true;
        const list1 = await this.getItems();
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i] != list1[i]) {
                throw "Missing items";
                status = false
            }
        }
        return status;
    }
}

export default new OverviewPage()