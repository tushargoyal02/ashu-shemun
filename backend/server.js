// const { log } = require("util");
global.path = require('path');
const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDatabase = require("./config/database");

// Handling Uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

// Connecting to database

connectDatabase();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
})
// resolve: {
//   fallback: {
//     "path": require.resolve("path-browserify")
//   }
// }


// // Add the following line at the top to resolve the 'path' module issue
// global.path = require('path');

// const app = require("./app");
// const dotenv = require("dotenv");
// const cloudinary = require("cloudinary");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const connectDatabase = require("./config/database");

// // Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Uncaught Exception`);
//   process.exit(1);
// });

// // Config
// dotenv.config({ path: "backend/config/config.env" });

// // Connecting to database
// connectDatabase();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const server = app.listen(process.env.PORT, () => {
//   console.log(`Server is working on http://localhost:${process.env.PORT}`);
// });

// // Cloudinary Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Unhandled Promise Rejection`);

//   server.close(() => {
//     process.exit(1);
//   });
// });
