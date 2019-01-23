import _ from "lodash";
const _createBooksData = count => {
  var i, books;
  books = [];
  for (i = 0; i < count; i++) {
    books.push({
      title: `title${i}`,
      author: `author${i}`,
      totalRatings: i * 10,
      createTime: Date.now(),
      image: "1.jpg",
      id: `id${i}`
    });
  }
  return {
    total: books.length,
    items: books
  };
};

export async function searchBooks(term) {
  return new Promise((resolve, reject) => {
    var count = parseInt(Math.random() * 10);
    setTimeout(() => {
      resolve(_createBooksData(count));
    }, 900);
  });
}
