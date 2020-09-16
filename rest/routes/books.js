const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Book = require("../models/Book");

/**
 * @swagger
 * /books:
 *    get:
 *     description: Get all books
 *     responses:
 *       '200':
 *         description: Success
 */
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ errors: err });
  }
});

/**
 * @swagger
 * /books/{id}:
 *    get:
 *     description: Get a book by ID
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID of the book
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *     responses:
 *       '200':
 *         description: Success
 */
router.get("/:id", async (req, res) => {
  Book.findOne({ id: req.params.id })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(400).json({ errors: err });
    });
});

/**
 * @swagger
 * /books:
 *    post:
 *      description: Create a book
 *      parameters:
 *        - name: id
 *          in: body
 *          description: ID of our book
 *          required: true
 *          schema:
 *            type: integer
 *            format: integer
 *        - name: title
 *          in: body
 *          description: Name of our book
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *        - name: author
 *          in: body
 *          description: Author of our book
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *      responses:
 *        '201':
 *          description: Success
 */
router.post(
  "/",
  [body("id").notEmpty(), body("title").notEmpty(), body("author").notEmpty()],
  async (req, res) => {
    const book = new Book({
      id: req.body.id,
      title: req.body.title,
      author: req.body.author,
    });

    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ errors: err });
    }
  }
);

/**
 * @swagger
 * /books/insert-many:
 *    post:
 *      description: Create a book
 *      parameters:
 *        - name: books
 *          in: body
 *          description: array of books to add
 *          required: true
 *          schema:
 *            type: Book
 *      responses:
 *        '201':
 *          description: Success
 */
router.post("/insert-many", [body("books").notEmpty()], async (req, res) => {
  await Book.insertMany(req.body.books);
  try {
    res.status(201).json(true);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: err });
  }
});

/**
 * @swagger
 * /books/{id}:
 *    delete:
 *     description: Delete a book by ID
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID of the book
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *     responses:
 *       '200':
 *         description: Success
 */
router.delete("/delete/:id", async (req, res) => {
  try {
    await Book.findOneAndDelete({ id: req.params.id });
    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ errors: err });
  }
});

/**
 * @swagger
 * /books/clean-up:
 *    delete:
 *     description: Delete all books (for testing purposes)
 *     responses:
 *       '200':
 *         description: Success
 */
router.delete("/clean-up", async (req, res) => {
  try {
    await Book.deleteMany({});
    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ errors: err });
  }
});

module.exports = router;
