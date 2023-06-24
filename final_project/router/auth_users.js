const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
JWT_SECRET_KEY = 'asdfkgkgJGFJF122GJYGJG';
TOKEN_HEADER_KEY = 'Token'
let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const user = users.find(user => req.body.userName===user.userName);
  if(user && user.password === req.body.password){
    let data = {
        userName: req.body.userName,
        pasword: req.body.password,
    }
    const token = jwt.sign(data, JWT_SECRET_KEY);
    return res.status(300).json({message: "Logged in successfully", token: token});
  }
  return res.status(300).json({message: "Error in login!"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbnVal = req.params.isbn;
  let book = books[isbnVal];
  let user = users.find(user => req.body.userName===user.userName);
  if(user){
    book.reviews[user.userName] = req.body.message;
  }
  return res.status(300).json(book);
});
// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbnVal = req.params.isbn;
    let book = books[isbnVal];
    console.log(book);
    const revUsers = Object.keys(book.reviews);
    const name = revUsers.find(val => val===req.body.userName);
    if(name){
       delete book.reviews[req.body.userName];
    }
    console.log(book);
    return res.status(200).json({book: book, message: "reviews deleted successfully"});
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
