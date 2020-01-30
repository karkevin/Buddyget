const db = require("../db");

const importTest = (name, path) => {
  describe(name, function() {
    require(path);
  });
};

describe("Testing", () => {
  before(async () => {
    try {
      await db.open();
    } catch (err) {
      err => console.log(err);
    }
  });

  after(async () => {
    try {
      await db.close();
    } catch (err) {
      err => console.log(err);
    }
  });

  importTest("Group", "./subtest/groupTest");
  importTest("User", "./subtest/userTest");
  importTest("Item", "./subtest/itemTest");
  importTest("Transaction", "./subtest/transactionTest");
});
