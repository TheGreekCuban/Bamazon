const mysql = require("mysql")
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "emerson1",
    database: "bamazon"
});

//Need to run the connect method on the mysql connection. Once connected I need to call queryAllItems so it can pull up the menu of items.
connection.connect(error => {
    if(error) throw error

    console.log("Connected as id: " + connection.threadId)
    queryAllItems()
})

//This is the function that will print all item rows to console. I used template literals but could not figure out how to get all items to indent left.
const queryAllItems = () => {
    connection.query("SELECT * FROM products", (error, response) => {
        if (error) throw error

        console.log(`
            --- ALL ITEMS AVAILABLE FOR SALE ---`
        )

        response.forEach(element => {
            console.log(`
            ID: ${element.id}
            Item: ${element.product_name}
            Department: ${element.department_name}
            Price: ${element.price}
            Quantity: ${element.stock_quantity}`
            )
        })
    })
    //Need to run the engage customer at the end of the menu so that the inquirer prompt can run asking the customer what they would like to purchase
    engageCustomer()
}

//This is the engage customer function that contains the inquirer prompt in it. 
const engageCustomer = () => {
    inquirer.prompt ([
        {
            type: "number",
            name: "id",
            message: "What is the ID of the product you are interested in purchasing?"
        },
        {
            type: "number",
            name: "quantity",
            message: "How many units would you like to purchase?"
        }
    ])
    .then(answers => {
        console.log(answers)

        //Need to call the function that checks the quantity in the table of the items and makes sure that the amount requested is available. 
        if(checkQuantity(answers) === false) {
            console.log(`Insufficient Quantity. Please edit your order!`)
        } else {
            updateDB()
        }
    })
}

const checkQuantity = answers => {
    connection.query("SELECT id, stock_quantity FROM products", (error, response) => {
        if (error) throw error
        response.forEach(element => {answers.id === element.id && answers.quantity === element.stock_quantity ? true : false})
    })
}

const updateDB = answers => {
    console.log(`This is running.`)
}