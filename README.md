
# 📘 Book Review Platform — Fullstack Project

A modern fullstack MERN (MongoDB, Express, React, Node.js) application for browsing, reviewing, and managing books with authentication, rating, and modern UI/UX.




## 📦 Features
### 🔐 Authentication
- JWT-based Login & Signup
- Protected routes

### 📚 Book Management
- View paginated list of books
- Add a new book (authorized)
- See detailed view for each book
- Add a new book (authorized)

### 🌟 Reviews
- Add review (rating + comment) per user per book
- Add a new book (authorized)
- Display average rating
- APrevent duplicate reviews from same user

### 🎨 UI/UX
- Responsive layout using MUI
- Gradient background + glassmorphism cards
- Fixed navbar and footer
- Login & Signup forms styled consistently
- Icons for genre, author, rating, etc.



## 🧱 Tech Stack

**✅ Frontend:** React, TypeScript, React Router, MUI, Axios

**✅ Backend:** Node.js, Express.js, JWT – authentication,CORS, dotenv

## Environment Variables

### Bakcend(Server)

To run this project, you will need to add the following environment variables to your .env file

`PORT`= 5000

`Mongo_URI`="your db String"

`JWT_SECRET`=`your jwt secret`

### Frontend(Client)
`VITE_API_BASE_URL`=` http://localhost:5000/api`





## Run Locally

Clone the project

```bash
  git clone https://github.com/ashu2764/book-review-platform-mern.git
```

Go to the project directory

```bash
  cd backend/
  cd frontend/
```

Install dependencies

```bash
  npm install
```

Start the server and UI

```bash
  npm run dev
```


## View In Frontend

- Open the browser and navigate to http://localhost:5000.
## Authors

- [Ashwani Kumar](https://www.github.com/ashu2764)

