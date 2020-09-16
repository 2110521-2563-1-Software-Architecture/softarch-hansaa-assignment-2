const { performance } = require("perf_hooks");

var grpc = require("grpc");

var booksProto = grpc.load("books.proto");

var client = new booksProto.books.BookService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

function printResponse(error, response) {
  if (error) console.log("Error: ", error);
  else console.log(response);
}

function listBooks() {
  client.list({}, function (error, books) {
    printResponse(error, books);
  });
}

function insertBook(id, title, author) {
  var book = { id: parseInt(id), title: title, author: author };
  client.insert(book, function (error, empty) {
    printResponse(error, empty);
  });
}

function getBook(id) {
  client.get({ id: parseInt(id) }, function (error, book) {
    printResponse(error, book);
  });
}

function deleteBook(id) {
  client.delete({ id: parseInt(id) }, function (error, empty) {
    printResponse(error, empty);
  });
}

function watchBooks() {
  var call = client.watch({});
  call.on("data", function (book) {
    console.log(book);
  });
}

async function insertmt(count) {
  var bookList = [];
  var book = { id: 1234, title: "title", author: "author" };
  for (i = 0; i < count; i++) {
    bookList.push(book)
  }
  var start = performance.now();
  await client.insertmt(bookList, function (error, empty) {
    printResponse(error, empty);
  });
  var end = performance.now() - start
  console.log('response time: %d ms', end);
}

async function concurrent(){
  var cc = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096];
  var book = { id: 1234, title: "title", author: "author" };
  var arr = [];
  var time = [];
  var start = performance.now();
  for(i=0;i<cc.length;i++){
    for (j = 0; j < cc[i]; j++){
      arr.push(client.insert(book, function (error, empty){}))
    }
    await Promise.all(arr)
    .then(() => {
      var responseTime = performance.now() - start
      time.push(responseTime);
      console.log(responseTime); 
    })
  .catch(err => console.log(err));
  }
  
}

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "list") listBooks();
else if (command == "insert") insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);
else if (command == "watch") watchBooks();
else if (command == "insertmt") insertmt(process.argv[0])
else if (command == "concurrent") concurrent()
