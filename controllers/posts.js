const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", {
        posts: posts.reverse(),
        user: req.session.user,
      });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { user: req.session.user });
  },

  Like: (req, res) => {
    Post.updateOne(
      { _id: req.body.post },
      { $addToSet: { likes: req.session.user._id } },
      (err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
       }
    );
  },
  

  Create: (req, res) => {
    const post = new Post(req.body);
    if (post.message == "") {
      req.flash("error", "Cannot Submit a Blank Post");
      res.redirect("/posts");
    } else {
      post.timestamp = Date.now();
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    }
  },

  addComment: (req, res) => {
    if (req.body.comment == "") {
      req.flash("errorComment", "Cannot Submit a Blank Comment");
      res.redirect("/posts");
    } else {
    Post.updateOne(
      { _id: req.body.post },
      {
        $push: {
          comments: {
            message: req.body.comment,
            user: req.session.user,
          },
        },
      },
      (err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      }
    );
   }
  },

  Delete: (req, res) => {
    Post.deleteOne({ _id: req.body.postId }, (err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
