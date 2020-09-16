const { performance } = require("perf_hooks");
const util = require("util");
const call = util.promisify(require("child_process").exec);
const axios = require("axios");
const randomWord = require("random-words");

const BASE_URL = "http://localhost:5000/api";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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
const runService = async (cmd) => {
  await call(cmd);
};

const callFunctions = async (count) => {
  const chooseAFunction = getRandomInt(5);
  let bookId = 0;

  const t1 = performance.now();
  for (let i = 0; i < count; i++) {
    switch (chooseAFunction) {
      case 0:
        await runService("node ../client.js list");
        break;
      case 1: {
        await runService(
          `node ../client.js insert ${bookId} ${randomWord()} ${randomWord()}`
        );
        bookId++;
        break;
      }
      case 2:
        await runService("node ../client.js insertmt");
        break;
      case 3:
        await runService(`node ../client.js get ${bookId}`);
        break;
      case 4: {
        await runService(`node ../client.js delete ${bookId}`);
        bookId--;
        break;
      }
    }
  }
  const t2 = performance.now();
  return t2 - t1;
};

const main = async () => {
  const repetition = 11;
  const output = [];
  for (let i = 1; i <= repetition; i++) {
    const time = await callFunctions(i);
    output.push({
      count: i,
      time,
    });
  }
  await cleanUp();
  console.log(output);
};

main();
