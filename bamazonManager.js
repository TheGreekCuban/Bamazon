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
    managerMenu();
})

//List a set of menu options: View Products for Sale, View Low Inventory, Add to Inventory, Add New Product
const managerMenu = () => {
    inquirer.prompt ([
        {
            type: "list",
            name: "managerMenu",
            message: "Hello Mr. Vellios, how can I help our company do better today?",
            choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]
        }
    ])
    .then(answers => {
        console.log(answers.managerMenu)
        switch(answers.managerMenu) {
            case "View Products For Sale":
                queryAll();
                break;
            case "View Low Inventory":
                queryLowInventory()
                break;
/*
            case "Add To Inventory":
                addInventory()
                break;
            case "Add New Product":
                addNewPorduct();
                break;
*/
            default: console.log(`Invalid Command!`)
        }
    })
}

const queryAll = () => {
    connection.query("SELECT * FROM products", (error, response) => {
        if (error) throw error

        console.log(`
            === ALL ITEMS IN STORE INVENTORY===`
        )

        response.forEach(element => {
            console.log(`
            ID: ${element.id}
            Item: ${element.product_name}
            Department: ${element.department_name}
            Retail Price: ${element.price}
            Quantity: ${element.stock_quantity}`
            )
        })
    })
}