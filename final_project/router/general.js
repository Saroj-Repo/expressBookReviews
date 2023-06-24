const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

public_users.post("/register", (req,res) => {
  //Write your code here
  console.log(req.body);
  const userName = req.body.userName;
  const password = req.body.password;
  if(!userName || !password ){
    return res.status(200).json({message: "username &/ password are not provide"});
  }
  const user = users.find((user) => user.userName===userName);
 if(user){
    return res.status(200).json({message: "username already exists"});
 }
 users.push({userName:userName, password:password});
  return res.status(201).json({message: "user registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbnVal = req.params.isbn;
 const book = books[isbnVal];
  return res.status(200).json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const availBooks = Object.values(books);
  const book = availBooks.find(book => book.author===author);
  return res.status(200).json(book);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const availBooks = Object.values(books);
  const book = availBooks.filter(book => book.title===title);
  return res.status(300).json(book);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbnVal = req.params.isbn;
  const book = books[isbnVal];
  const review = book.reviews;
  return res.status(300).json(review);
});
public_users.get('/books',function (req, res){
    return new Promise((resolve, reject) => {
     axios.get('/books')
      .then( data => {
       resolve(data);
      })
      .catch(function (error) {
       resolve(error);
      });
    });
   });
   public_users.get('/isbn',function (req, res){
    return new Promise((resolve, reject) => {
     axios.get('/isbn',{
        params: {
            isbn: req.params.isbn,
        }
      .then( data => {
       resolve(data);
      })
      .catch(function (error) {
       resolve(error);
      })
    });
   });
});
   public_users.get('/author',function (req, res){
    return new Promise((resolve, reject) => {
     axios.get('/author',{
        params: {
            author: req.params.author,
        }
      .then( data => {
       resolve(data);
      })
      .catch(function (error) {
       resolve(error);
      });
    });
   });
});
module.exports.general = public_users;
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
