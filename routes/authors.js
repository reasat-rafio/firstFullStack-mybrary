const express = require("express");
const router = express.Router();
const Author = require("../models/authors");

//All Authors Route
router.get("/", async (req, res) => {
  let searchOption = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOption.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOption);
    res.render("authors/index", { authors: authors, searchOption: req.query });
  } catch {
    res.redirect("/");
  }
});

//New Author Route
router.get("/new", (req, res) => {
  res.render("authors/new", {
    author: new Author(),
  });
});

//Creating A New Author
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    //   res.redirect(`/authors/${newAuthor.id}`);
    res.redirect(`authors`);
  } catch {
    let locals = { author: author, errorMessage: `something went wrong` };
    res.render("authors/new", {
      locals,
    });
  }

  //   author.save((err, newAuthor) => {
  //     let locals = { author: author, errorMessage: `something went wrong` };
  //     if (err) {
  //       res.render("authors/new", {
  //         locals,
  //       });
  //     } else {
  //       //   res.redirect(`/authors/${newAuthor.id}`);
  //       res.redirect(`authors`);
  //     }
  //   });
});

module.exports = router;
