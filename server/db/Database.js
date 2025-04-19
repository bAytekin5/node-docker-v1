const mongoose = require("mongoose");
let instance = null;

class Database {
  constructor() {
    if (!instance) {
      this.mongoConnection = null;
      instance = this;
    }
    return instance;
  }

  async connect(options) {
    try {
      console.log("Database Connecting...");
      let db = await mongoose.connect(options.DATABASE_CONNECTION);
      this.mongoConnection = db;

      console.log("Database Connected.");
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}

module.exports = Database;
