import dotenv from 'dotenv'
dotenv.config()

export const CREDENTIALS = {
    STD_USER:{
        USERNAME: process.env.STDID,
        PASSWORD: process.env.PASSWORD
    },
    LOCKED_USER:{
        USERNAME: process.env.LCKID,
        PASSWORD: process.env.PASSWORD
    },
    PROBLEM_USER:{
        USERNAME: process.env.PRBLMID,
        PASSWORD: process.env.PASSWORD
    },
    INVALID_USER:{
        USERNAME: 'invalid_user',
        PASSWORD: 'invalid_password'
    },
    MAIL_ADDRESS:{
        NAME:"TESTER",
        LASTNAME:"QA",
        ZIP:"12345"
    }
}

export const PRODUCTS = {
    PRODUCTS_LIST: {
        BACKPACK:"Sauce Labs Backpack",
        LIGHT:"Sauce Labs Bike Light",
        TSHIRT:"Sauce Labs Bolt T-Shirt",
        JACKET:"Sauce Labs Fleece Jacket",
        BABYSHIRT:"Sauce Labs Onesie",
        REDSHIRT:"Test.allTheThings() T-Shirt (Red)"
      },
}