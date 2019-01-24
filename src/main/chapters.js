import WishlistExample from "../examples/wishlistExample";
import { AppModelExample } from "../examples/stateTree";

function applyPathPrefix(chapters) {
  return chapters.map(ch => {
    ch.examples.forEach(ex => {
      const exPath = ex.path.replace(/^\/+/, "");
      Object.assign(ex, {
        path: `/ch0${ch.chapter}/${exPath}`,
        chapterIndex: ch.chapter,
        chapterTitle: ch.title
      });
    });

    return ch;
  });
}

export const chapters = applyPathPrefix([
  {
    chapter: 1,
    title: "chapter1",
    examples: [
      {
        title: "Wishlist:classModel",
        path: "/wishlist",
        component: WishlistExample
      }
    ]
  },
  {
    chapter: 2,
    title: "stateTree",
    examples: [
      {
        title: "appModel",
        path: "/stateTree/appModel",
        component: AppModelExample
      }
    ]
  }
]);

export const allExamples = chapters.reduce((list, ch) => {
  return list.concat(ch.examples);
}, []);
