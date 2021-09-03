module.exports = {
  betweenCor: (string) => {
    return `[${string}]`;
  },
  makeDocs: (page, id) => {
    const docs = "https://anventech.github.io/minich-docs";

    return `${docs}/${page}?id=${id}`;
  }
}