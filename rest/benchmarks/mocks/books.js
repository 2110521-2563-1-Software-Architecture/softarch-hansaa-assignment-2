const randomWords = require("random-words");

module.exports = {
  generateBooks: (count) => {
    let id = 0;
    let books = [];

    for (id = 0; id < count; id++) {
      books.push({
        id,
        title: randomWords(),
        author: randomWords(),
      });
    }
    return {
      books,
    };
  },
};
