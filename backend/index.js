import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import { Book } from "./models/bookModel.js";
// dotenv file
// import dotenv from "dotenv";
// dotenv.config({
//   path: "./.env",
// });

const app = express();

// Middleware for parsing request body
app.use(express.json());

// // Middleware for handling CORS POLICY
// // Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// // Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);

// app.post("/books", async (req, res) => {
//   try {
//     if (!req.body.title || !req.body.author || !req.body.publishYear) {
//       return res.status(400).send({
//         message: "Send all required fields: title, author, publishYear",
//       });
//     }
//     const newBook = {
//       title: req.body.title,
//       author: req.body.author,
//       publishYear: req.body.publishYear,
//     };

//     const book = await Book.create(newBook);
//     return res.status(201).send(book);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: err.message });
//   }
// });

// // Route for Get All Book from database
// app.get("/books", async (req, res) => {
//   try {
//     const books = await Book.find({});
//     return res.status(200).json({
//       count: books.length,
//       data: books,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: err.message });
//   }
// });

// // Route for Get One Book from database by id;
// app.get("/books/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const book = await Book.findById(id);
//     return res.status(200).json(book);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: err.message });
//   }
// });

// // Route for Update a Book
// app.put("/books/:id", async (req, res) => {
//   try {
//     if (!req.body.title || !req.body.author || !req.body.publishYear) {
//       return res.status(400).send({
//         message: "Send All required fields: title, author, publishYear",
//       });
//     }
//     const { id } = req.params;
//     const result = await Book.findByIdAndUpdate(id, req.body);

//     if (!result) {
//       return res.status(404).json({ message: 'Book Not Found' });
//     }

//     return res.status(200).send({ message: 'Book Update SuccessFully !' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: err.message });
//   }
// });

// // Route for Delete a book
// app.delete('/books/:id',async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await Book.findByIdAndDelete(id);
//     if (!result) {
//       return res.status(404).json({ message: 'Book Not Found' });
//     }
//     return res.status(200).send({ message: 'Book deleted Successfully!' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: err.message });
//   }
// })

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Try Own
// app.listen(PORT, () => {
//   console.log(`App is listening to port : ${PORT}`);
// })
