import {Selector} from 'testcafe'

class FinishPage {
    constructor(){
        this.pageTitle = Selector('.subheader').withExactText('Finish')
    }
}

export default new FinishPage()