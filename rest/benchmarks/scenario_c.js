const { performance } = require("perf_hooks");
const axios = require("axios");
const randomWord = require("random-words");

const BASE_URL = "http://localhost:5000/api";

const insertBook = (id, title, author) => {
  const insertBookAPI = async (id, title, author) => {
    await axios
      .post(`${BASE_URL}/books`, {
        id,
        title,
        author,
      })
      .then((res) => {})
      .catch((err) => {});
  };
  insertBookAPI(id, title, author);
};

const cleanUp = () => {
  const cleanUpAPI = async () => {
    await axios
      .delete(`${BASE_URL}/books/clean-up`)
      .then((res) => {})
      .catch((err) => {});
  };
  cleanUpAPI();
};

// Main
const pushService = (count) => {
  let bookId = 0;
  let output = [];
  for (let i = 0; i < count; i++) {
    output.push(insertBook(bookId, randomWord(), randomWord()));
    bookId++;
  }
  return output;
};

const callFunctions = async (count) => {
  const services = pushService(count);
  let t2 = 0;
  const t1 = performance.now();
  await Promise.all(services).then(() => {
    t2 = performance.now();
  });
  return t2 - t1;
};

const main = async (count) => {
  const time = await callFunctions(count);
  console.log(time);
  Promise.all([cleanUp()]).then(() => {
    process.exit();
  });
};

main(process.argv[2]);
