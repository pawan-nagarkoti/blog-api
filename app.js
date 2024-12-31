require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});