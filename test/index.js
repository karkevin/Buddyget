process.env.NODE_ENV = "test";

const db = require("../db");

const mongoose = require("mongoose");
const Item = require("../models/Item");

const common = require("./common");
const { expect, chai } = common;

const importTest = (name, path) => {
  describe(name, function() {
    require(path);
  });
};

describe("Testing", () => {
  before(done => {
    db.open()
      .then(() => {
        done();
      })
      .catch(done => console.log(done));
  });

  after(done => {
    db.close()
      .then(() => done())
      .catch(done => console.log(done));
  });

  importTest("Group", "./subtest/groupTest");
  importTest("User", "./subtest/userTest");
});
