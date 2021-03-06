var mongoose = require("mongoose")

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("has a user ID", () => {
    var post = new Post({ message: "some message",
                         user_id: 5 });
    expect(post.user_id).toEqual("5");
  });

  it("has the time of post creation", () => {
    const mockDateObject = new Date("2022-04-20T13:33:42.767Z")
    const spy = jest
    .spyOn(global, 'Date')
    .mockImplementation(() => mockDateObject)

    var post = new Post({ message: "some message"})
    
    spy.mockRestore()

    expect(post.createdAt).toEqual(new Date("2022-04-20T13:33:42.767Z"))
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can show number of likes", () => {
    var post = new Post({ message: "some message"})

    expect(post.likes.length).toEqual(0)
  })

  it("can save a post", (done) => {
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });
});