import WishlistExample from "../examples/wishlistExample";

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
    title: "Crafting the Observable tree",
    examples: [
      {
        title: "Wishlist:classModel",
        path: "/wishlist",
        component: WishlistExample
      }
      // {
      //   title: "Computed Decorator",
      //   path: "/computed-decorator",
      //   component: ComputedDecoratorExample
      // },
      // {
      //   title: "Computed Equality",
      //   path: "/computed-equality",
      //   component: ComputedEqualityExample
      // },
      // {
      //   title: "Decorate",
      //   path: "/decorate",
      //   component: DecorateExample
      // },
      // {
      //   title: "Extend Observable",
      //   path: "/extend-observable",
      //   component: ExtendObservableExample
      // },
      // {
      //   title: "Observable Decorators",
      //   path: "/observable-decorators",
      //   component: ObservableDecorateExample
      // },
      // {
      //   title: "Observable Ref",
      //   path: "/observable-ref",
      //   component: ObservableRefExample
      // },
      // {
      //   title: "Observable Struct",
      //   path: "/observable-struct",
      //   component: ObservableStructExample
      // }
    ]
  }
]);

export const allExamples = chapters.reduce((list, ch) => {
  return list.concat(ch.examples);
}, []);
