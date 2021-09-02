const sqlite = require("sqlite3");

module.exports = class Conector {
  constructor(path) {
      this.db = new sqlite.Database(path);

      this.errorHandler = (err, reject) => {
          if (err) {
              console.error(err.message);
              reject(err.message);
          }
      }
  }

  run(query) {
      return new Promise((resolve, reject) => {
          this.db.run(query, (err, res) => {
              this.errorHandler(err, resolve);
              resolve(true);
          });
      });
  }

  get(query) {
      return new Promise((resolve, reject) => {
          this.db.get(query, (err, res) => {
              this.errorHandler(err, resolve);
              if (!res) resolve(false);
              resolve(res);
          });
      });
  }

  has(query) {
      return new Promise((resolve, reject) => {
          this.db.get(query, (err, res) => {
              this.errorHandler(err, resolve);
              if (!res) resolve(false);
              resolve(true);
          });
      });
  }

  all(query) {
      return new Promise((resolve, reject) => {
          this.db.all(query, (err, res) => {
              this.errorHandler(err, resolve);
              if (!res) resolve(false);
              resolve(res);
          });
      });
  }
}