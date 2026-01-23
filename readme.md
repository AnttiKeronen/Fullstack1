Antti Keronen 001855050 Full-Stack

Link to program running video:
https://youtu.be/4suPQvGnZV8

This is the BudgetThing! Its a simple budgeting tool to track your monthly expenses. You can make an account and login, and your budget is stored.

How to use: After logging in, in the month part you can change which month's expenses do you want to track. Under month is your total spent euros during the month you chose. Next to spent is remaining euros left in your budget. In the monthly budget bos you can set your monthly budget.

You can add expenses. When adding expenses remember to fill every field so you can remember what did you spent your monney on. Fill out amount, category, date and description. In the category part there is a drop down meu where you can pick the correct category for filtering expenses later on. After clicking add expense, the app will cut it from your budget and add it to your spent euros. You can always delete added expenses.

How to run:

create a .env file into the root and fill out the needed info, for example

NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb+srv://YOURMONGOURI
JWT_SECRET = abc123

If the examiner doesnt have mongodb atlas and wants to see if it works, then I can provide my username and password for it.

Go to the root

cd backend npm install npm run dev

Go to the root

cd frontend npm install npm run dev

make sure both are running
