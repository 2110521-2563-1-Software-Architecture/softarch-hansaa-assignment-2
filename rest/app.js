const dotenv = require("dotenv");

const envFile = process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : ".env";
dotenv.config({ path: envFile });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const mongoose = require("mongoose");

// connect db
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const router = require("./routes/index");
app.use("/api", router);

const server = app.listen(5000, () => console.log("server started"));

// swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Software Arch (Assignment 1)",
      version: "1.0.0",
      description: "Assignment 1: Book System.",
    },
    servers: [
      {
        url: "http://localhost:5000/api/",
      },
    ],
  },
  apis: ["./models/book.js", "./routes/books.js"],
};
const specs = swaggerJsdoc(options);
router.use("/docs", swaggerUi.serve);
router.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

// require("make-runnable");

module.exports = server;
