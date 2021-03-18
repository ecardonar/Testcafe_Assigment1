import {Selector, t} from 'testcafe'

class CheckoutPage {
    constructor(){
        this.pageTitle = Selector('.subheader').withExactText('Checkout: Your Information')
        this.nameField = Selector('input[id="first-name"]')
        this.lastnameField = Selector('input[id="last-name"]')
        this.postalField = Selector('input[id="postal-code"]')
        this.continueButton = Selector('.btn_primary.cart_button')
        this.errorMessage = Selector('#checkout_info_container h3')
        //this.errorMessage = Selector('h3[data-test="error"]')
    }

    async missingZip(firstname,lastname){  
        await t.typeText(this.nameField, firstname, {paste:true})
        await t.typeText(this.lastnameField, lastname, {paste:true})
        await t.click(this.continueButton)
    }

    async fillData(firstname,lastname,zipCode){  
        await t.typeText(this.nameField, firstname, {paste:true})
        await t.typeText(this.lastnameField, lastname, {paste:true})
        await t.typeText(this.postalField, zipCode, {paste:true})
        await t.click(this.continueButton)
    }
}

export default new CheckoutPage()