module.exports = {
  betweenCor: (string) => {
    return `[${string}]`;
  },
  makeDocs: (page, id) => {
    const docs = "https://minich-docs.github.io";

    return `${docs}/${page}?id=${id}`;
  }
}