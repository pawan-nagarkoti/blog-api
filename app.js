require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const blogRoutes = require("./routes/blog-routes");
const categoryRoutes = require("./routes/category-routes");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// database
connectToDB();

// Routes
app.use("/blog", blogRoutes);
app.use("/category", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
