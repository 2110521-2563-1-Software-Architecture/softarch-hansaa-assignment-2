var grpc = require('grpc');
// for watch function
var events = require('events');
var booksProto = grpc.load('books.proto');
// for watch function
var bookStream = new events.EventEmitter();
var books = [ 
  { id: 123, title: 'A Tale of Two Cities', author: 'Charles Dickens' }
];
var server = new grpc.Server();
server.addService(booksProto.books.BookService.service, {
    list: function(call, callback) {
        callback(null, books);
    },
    insert: function(call, callback) {
        var book = call.request;
        books.push(book);
        // to emit a new_book event when books are inserted -> for watch function 
        bookStream.emit('new_book', book);
        callback(null, {});
    },
    get: function(call, callback) {
        for (var i = 0; i < books.length; i++)
            if (books[i].id == call.request.id)
                return callback(null, books[i]);
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    },
    delete: function(call, callback) {
        for (var i = 0; i < books.length; i++) {
            if (books[i].id == call.request.id) {
                books.splice(i, 1);
                return callback(null, {});
            }
        }
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    },
    watch: function(stream) {
        bookStream.on('new_book', function(book){
            stream.write(book);
        });
    },
    insertmt: function(call, callback) {
        var bookList = call.request.books;
        books = books.concat(bookList);
        callback(null, {});
    }
});
server.bind('0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure());
console.log('Server running at http://0.0.0.0:50051');
server.start();