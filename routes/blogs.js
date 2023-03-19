const express = require("express");
const router = express.Router();

const { db } = require("../mongo");
const { validateBlogData } = require("../validation/blogs");

/* GET all blogs. */
router.get("/all", async function (req, res, next) {
  const blogs = await db()
    .collection("sample_blogs")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("error fetching blogs");
      } else {
        res.json(result);
      }
    });
  res.json({
    sucess: true,
    blogs: blogs,
  });
});

/* GET the first blog post. */
router.get("/get-one", async function (req, res, next) {
  const blogs = await db()
    .collection("sample_blogs")
    .find({})
    .limit(1)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("error fetching blogs");
      } else {
        res.json(result);
      }
    });
  res.json({
    sucess: true,
    blogs: blogs,
  });
});

//retrieve or delete a single blog by title - note the get and delete commands are chained together using a single route
router
  .route("/get-one/:id")
  .get(async (req, res, next) => {
    const blogRequested = await db()
      .collection("sample_blogs")
      .findOne({ id: req.params.id }, {});
    res.json({
      sucess: true,
      blog: blogRequested,
    });
  })
  .delete(async (req, res, next) => {
    const blogToDelete = await db()
      .collection("sample_blogs")
      .deleteOne({ id: req.params.id }, {});
    res.json({
      success: true,
      blog: blogToDelete,
    });
  });

// create a new blog
router.post("/create-one", async function (req, res, next) {
  try {
    const newBlogPost = {};
    newBlogPost.title = req.body.title;
    newBlogPost.author = req.body.author;
    newBlogPost.text = req.body.text;
    newBlogPost.categories = req.body.categories;
    newBlogPost.createdAt = new Date();
    newBlogPost.lastModified = new Date();

    const blogToAdd = await db()
      .collection("sample_blogs")
      .insertOne(newBlogPost);
    res.json({
      success: true,
      blog: blogToAdd,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      error: String(e),
    });
  }
});

//Retreive multiple blog posts by author
router.route("/get-many/:author").get(async (req, res, next) => {
  const blogsRequested = await db()
    .collection("sample_blogs")
    .find({ author: req.params.author })
    .sort({ lastModified: 1 })
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("error fetching blogs");
      } else {
        res.json(result);
      }
    });
  res.json({
    sucess: true,
    blog: blogsRequested,
  });
});

//Delete multiple blog posts by author
router.route("/delete-many/:author").delete(async (req, res, next) => {
    const blogsDeleted = await db()
      .collection("sample_blogs")
      .deleteMany({ author: req.params.author });
    res.json({
      sucess: true,
      blog: blogsDeleted,
    });
  });

module.exports = router;
