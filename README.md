# My Bamazon Store

## What The Project Does

#### The Bamazon Store is a node.js application that makes queries to a the bamazon.sql database. The bamazon.sql database has various items with their name, quantity, department name and price. After displaying the store catalogue (bamazon.sql database), the bamazonCustomer node.js application prompts the user to input the id of the item they wish to purchase followed by the amount. With that input the application checks if there is enough inventory to fulfill the order. If there is, the application adjusts the stock_quantity and prints the oder total for the user. If there is not, it tells the user to edit their order. 

#### Order Total & Editing Of Inventory (bamazonCustomer.js)
![](bamazonCustomerOne.gif)

#### Insufficient Quantity (bamazonCustomer.js)
![](bamazonCustomerTwo.gif)