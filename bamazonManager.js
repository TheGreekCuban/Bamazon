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
            choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"]
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

            case "Add To Inventory":
                addInventory()
                break;

            case "Add New Product":
                addNewPorduct();
                break;
            case "Exit":
                connection.end();
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
    managerMenu();
}

const queryLowInventory = () => {
    connection.query("SELECT * FROM products", (error, response) => {
        if (error) throw error

        response.forEach(element => {

            if (element.stock_quantity < 6) {
                console.log(`
                === YOU MAY WANT TO STOCK UP ON THE ITEM BELOW ===`
                )
                console.log(`
                ID: ${element.id}
                Item: ${element.product_name}
                Department: ${element.department_name}
                Retail Price: ${element.price}
                Quantity: ${element.stock_quantity}`
                )   
            } 
        })
    })
    managerMenu();
}

const addInventory = () => {
    inquirer.prompt ([
        {
            type: "number",
            name: "id",
            message: "Please enter the ID number of the item you wish to order!"
        }
    ])
    .then(answers => {
        
    })
}

const addNewPorduct = () => {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is the name of the product being added?"
        },
        {
            type: "input",
            name: "department",
            message: "What department does this product belong to?"
        },
        {
            type: "number",
            name: "price",
            message: "What price would you like to sell this product for?"
        },
        {
            type: "number",
            name: "quantity",
            message: "How many units you order?"
        }
    ])
    .then(answers => {

        let query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?"
        let values = [[answers.name, answers.department, answers.price, answers.quantity]]

        connection.query(query, [values], (error, result) => {
            if (error) throw error

            console.log(`
                === ITEM WAS ADDED ===
                `)
            managerMenu();
        })
    })
}