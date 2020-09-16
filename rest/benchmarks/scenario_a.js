const axios = require("axios");
const { generateBooks } = require("./mocks/books");
const { performance } = require("perf_hooks");

const BASE_URL = "http://localhost:5000/api";

const insertOneBook = () => {
  const insertOneBookAPI = async () => {
    await axios
      .post(`${BASE_URL}/books`, {
        id: 0,
        title: "Apple",
        author: "Banana",
      })
      .catch((err) => {});
  };
  insertOneBookAPI();
};

const insertMultipleBooks = (books) => {
  const insertMultipleBooksAPI = async () => {
    await axios.post(`${BASE_URL}/books/insert-many`, books).catch((err) => {});
  };
  insertMultipleBooksAPI();
};

// CleanUp
const cleanUp = () => {
  const cleanUpAPI = async () => {
    await axios
      .delete(`${BASE_URL}/books/clean-up`)
      .then((res) => console.log(res.data))
      .catch((err) => {});
  };
  cleanUpAPI();
};

// Main
const mainSingleBookInsert = async () => {
  const COUNT = 100;
  let timeData = [];
  for (let i = 0; i < COUNT; i++) {
    const t1 = performance.now();
    await insertOneBook();
    const t2 = performance.now();
    timeData.push({
      try: i,
      time: t2 - t1,
    });
  }

  console.log(timeData);

  await cleanUp();
  process.exit();
};

const mainMultipleBookInsert = async () => {
  let timeData = [];

  timeData.push(await benchmarkMultipleBookInsert(generateBooks(1), 1));
  timeData.push(await benchmarkMultipleBookInsert(generateBooks(10), 10));
  timeData.push(await benchmarkMultipleBookInsert(generateBooks(50), 50));
  timeData.push(await benchmarkMultipleBookInsert(generateBooks(100), 100));
  timeData.push(await benchmarkMultipleBookInsert(generateBooks(500), 500));
  timeData.push(await benchmarkMultipleBookInsert(generateBooks(1000), 1000));
  timeData.push(await benchmarkMultipleBookInsert(generateBooks(5000), 5000));
  timeData.push(await benchmarkMultipleBookInsert(generateBooks(10000), 10000));
  timeData.push(await benchmarkMultipleBookInsert(generateBooks(50000), 50000));
  timeData.push(
    await benchmarkMultipleBookInsert(generateBooks(100000), 100000)
  );

  console.log(timeData);
  process.exit();
};

const benchmarkMultipleBookInsert = async (books, count) => {
  const t1 = performance.now();
  await insertMultipleBooks(books);
  const t2 = performance.now();
  await cleanUp();
  return {
    count,
    time: t2 - t1,
  };
};

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "multi") {
  mainMultipleBookInsert();
} else if (command == "single") {
  mainSingleBookInsert();
}
