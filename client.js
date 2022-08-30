console.log("client code running.");
const axios = require("axios");

const URI = "http://localhost:3000";

const test = async () => {
  console.time("loading time: ");
  let {
    data: { blogs },
  } = await axios.get(`${URI}/blog/list`);
  // blogs = await Promise.all(
  //   blogs.map(async (blog) => {
  //     const [resUser, resComment] = await Promise.all([
  //       axios.get(`${URI}/user/${blog.user}`),
  //       axios.get(`${URI}/blog/${blog._id}/comment`),
  //     ]);
  //     blog.user = resUser.data.user;
  //     blog.comments = await Promise.all(
  //       resComment.data.comments.map(async (comment) => {
  //         const {
  //           data: { user },
  //         } = await axios.get(`${URI}/user/${comment.user}`);
  //         comment.user = user;
  //         return comment;
  //       })
  //     );

  //     return blog;
  //   })
  // );
  // console.dir(blogs[0], { depth: 10 });
  console.timeEnd("loading time: ");
};

const testGroup = async () => {
  await test();
  await test();
  await test();
  await test();
  await test();
  await test();
  await test();
  await test();
  await test();
};

testGroup();
