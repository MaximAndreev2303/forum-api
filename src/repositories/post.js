const posts = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    content: "JavaScript is a programming language.",
    author: "Maxim",
    category: "programming"
  },
  {
    id: 2,
    title: "Learning Node.js",
    content: "Node.js allows you to run JavaScript outside the browser.",
    author: "Alex",
    category: "programming"
  },
  {
    id: 3,
    title: "My first post",
    content: "This is my first forum post.",
    author: "John",
    category: "general"
  }
];

export const getAll = (category, take) => {
  let result = posts;

  if (category) {
    result = result.filter(post => post.category === category);
  }

  if (take) {
    result = result.slice(0, take);
  }

  return result;
};

export const getById = (id) => {
  return posts.find(post => post.id === id);
};

export const addPost = (post) => {
  return new Promise((resolve) => {
    const newPost = {
      id: posts.length + 1,
      ...post
    };

    posts.push(newPost);

    resolve(newPost);
  });
};