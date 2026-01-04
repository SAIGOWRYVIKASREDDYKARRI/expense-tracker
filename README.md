💰 Expense Tracker Web Application

A modern, responsive Expense Tracker built using React that allows users to add, view, delete, and visualize expenses with real-time dashboard updates and charts.
This project is designed and completed at student level with clean architecture and live deployment.

🚀 Live Demo

👉 Live URL:
https://vikas-expenses.netlify.app/

(Deployed using GitHub + Netlify)

📌 Features

✅ Add new expenses (amount, category, date, description)
✅ View all expenses in a table
✅ Delete expenses
✅ Dynamic dashboard summary:

  Total Expenses
  Current Month Expenses
  Number of Categories

✅ Data persistence using LocalStorage
✅ Interactive charts:

  Monthly Expense Bar Chart
  Category-wise Pie Chart

✅ Fully responsive UI
✅ Live deployed application
🛠️ Tech Stack

Frontend
  React (Vite) 
  JavaScript
  Tailwind CSS
  Charts
    Recharts
Storage
  Browser LocalStorage
Deployment
  GitHub
  Netlify

📂 Project Structure
expense-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── DashboardCards.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   ├── AddExpenseModal.jsx
│   │   │   └── ExpenseCharts.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── dist/
└── backend/ (not used in frontend-only version)

⚙️ How It Works

Expenses are stored in React state
Dashboard values are calculated using derived state (reduce)
Charts are generated dynamically from expense data
Data is saved to LocalStorage, so it persists after refresh
UI updates instantly on add/delete actions

🧪 Local Setup (Optional)

If you want to run this project locally:
  git clone https://github.com/SAIGOWRYVIKASREDDYKARRI/expense-tracker.git
  cd expense-tracker/frontend
  npm install
  npm run dev

Open in browser:
  http://localhost:5173

👨‍💻 Author

Sai Gowry Vikas Reddy Karri
(Student | Frontend Developer)

⭐ If you like this project, feel free to star the repository!
