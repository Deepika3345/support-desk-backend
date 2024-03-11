const express = require("express");
const connectDB = require("./config/db_config");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

// CONNECT DB
connectDB();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect user  Routes
app.use("/api/user", require("./routes/userRoutes"));

// connect ticket  Routes
app.use("/api/ticket", require("./routes/ticketRoutes"));


// connect admin  Routes
app.use("/api/admin", require("./routes/adminRoutes"));
// connect note  Routes
app.use("/api/note", require("./routes/noteRoutes"));



// Error Handller
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(PORT, () => {
  console.log(`Server is Running at:${PORT}`);
});
