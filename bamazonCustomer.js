require("dotenv").config()
const mysql = require("mysql")
const inquirer = require("inquirer")
const password = process.env.SQL_PASSOWORD

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
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
            === ALL ITEMS AVAILABLE FOR SALE ===`
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
       //Need to run the engage customer at the end of the menu so that the inquirer prompt can run asking the customer what they would like to purchase 
       engageCustomer(response)
    })

}

//This is the engage customer function that contains the inquirer prompt in it. 
const engageCustomer = (response) => {
    inquirer.prompt ([
        {
            type: "number",
            name: "id",
            message: "What is the ID of the product you are interested in purchasing?",
            validate: value => isNaN(value) === false ? true && value <= response.length : false
        },
        {
            type: "number",
            name: "quantity",
            message: "How many units would you like to purchase?"           
        }
    ])
    .then(answers => {
        //Need to call the function that checks the quantity in the table of the items and makes sure that the amount requested is available. 
        updateDB(answers, response)
    })
}

const checkQuantity = answers => {
    connection.query("SELECT id, stock_quantity FROM products", (error, response) => {
        if (error) throw error
        response.forEach(element => answers.id === element.id && answers.quantity < element.stock_quantity ? true : false)
    })
}

const updateDB = (answers, response) => {

    //Need to create a variable tha will house the new stock quantity, we grab the correct object by setting its index equal to the index of the answers.id
    if(response[answers.id-1].stock_quantity - answers.quantity >= 0) {
    
        let newQuantity = response[answers.id-1].stock_quantity - answers.quantity

        //Once we have that value we run an update query on the table.
        connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [newQuantity, answers.id], (error, response) => {
            if (error) throw error
        
            //Then we run the order total function to add up their final price.
            orderTotal(answers, response)
        })
    } else {
        console.log(`=== Insufficient Quantity. Please edit your order! ===`)
        engageCustomer(response)
    }
}

//This function compiles the order total by selecting the appropriate columns, matching them with the answers values and then multiplying the price by the desired quantity. 
const orderTotal = (answers, response) => {
    
    connection.query("SELECT id, price FROM products", (error, response) => {
        if (error) throw error
 
        if(response[answers.id-1].id === answers.id) {
            let orderTotal = (response[answers.id-1].price * answers.quantity).toFixed(2)

            console.log("\n=== YOUR ORDER TOTAL IS: $" + orderTotal + " ====")
   
            queryAllItems()  
        }
    })
}