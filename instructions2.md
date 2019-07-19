Challenge #3: Supervisor View (Final Level)

Modify the products table so that there's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

Make sure your app still updates the inventory listed in the products column.

Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:

    -View Product Sales by Department
    -Create New Department

When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.

If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.

    Hint: You may need to look into aliases in MySQL.
    Hint: You may need to look into GROUP BYs.
    Hint: You may need to look into JOINS.
    Hint: There may be an NPM package that can log the table to the console. What's is it? Good question :)