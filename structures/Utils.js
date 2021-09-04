module.exports = {
  betweenCor: (string) => {
    return `[${string}]`;
  },
  makeDocs: (page, id) => {
    const docs = "https://minich.js.org/#";

    return `${docs}/${page}?id=${id}`;
  }
}