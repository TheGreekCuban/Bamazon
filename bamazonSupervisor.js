require("dotenv").config()
const mysql = require("mysql")
const inquirer = require("inquirer")
const consoleTable = require('console.table');
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
    supervisorMenu();
})

//Must use inquirer function to ask the supervisor what information they would like displayed
const supervisorMenu = () => {
    inquirer.prompt ([
        {
            type: "list",
            name: "supervisorMenu",
            message: "Hello Mr. Vellios, how can I help our company do better today?",
            choices: ["View Product Sales By Department", "Create New Department", "Exit"]
        }
    ])
    .then(answers => {
        console.log(answers.supervisorMenu)
        switch(answers.supervisorMenu) {
            case "View Product Sales By Department":
                departmentJoin();
                break;
            case "Create New Department":
                createDepartment()
                break;
            case "Exit":
                connection.end();
        }
    })
}

/*
When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.
*/

//This function will join the tables where necessary to prepare it to be logged
const departmentJoin = () => {
    let queryOne = `SELECT d.department_id, d.department_name, d.over_head_costs, p.product_sales, p.product_name `
    let queryTwo = `FROM departments d LEFT OUTER JOIN products p `
    let queryThree = `ON d.department_name = p.department_name `
    let finalQuery = queryOne + queryTwo + queryThree

    connection.query(finalQuery, (error, response) => {
        if (error) throw error

        //Now that the table is joined, we will run the calculate profits function.
        calculateProfits(response)
    })   
}

//This function simply takes the response (newly joined table) as an object. It then updates the object with the dynamic calculation
//of total profits. After that, we will call the console.table function on the array of objects.
const calculateProfits = response => {
    
    response.forEach(element => {element.total_profit = element.product_sales - element.over_head_costs})

    printTable(response)
}

//This will print the new array of objects reseponse into a table for the users.
const printTable = response => {

    response.forEach(element => {
        console.table([{ 
                'DEPARTMENT ID': element.department_id, 
                'DEPARTMENT NAME': element.department_name, 
                'OVER HEAD COSTS': element.over_head_costs , 
                'PRODUCT SALES': element.product_sales, 
                'TOTAL PROFITS': element.total_profit
            }]);  
    })
}

/*
The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
*/

const createDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the name of the department you would like to create?"
        },
        {
            type: "number",
            name: "overhead_costs",
            message: "What are the estimated overhead costs of this new department?"
        },
    ])
    .then(answers => {
        let name = answers.department_name
        let overheadCosts = answers.overhead_costs
        let values = [[name, overheadCosts]]
        let query = "INSERT INTO departments (department_name, over_head_costs) VALUES ?"

        connection.query(query, [values], error => {
            if (error) throw error
            console.log(`
                === DEPARTMENT WAS ADDED ===
            `)
        }) 
        supervisorMenu();       
    })
}