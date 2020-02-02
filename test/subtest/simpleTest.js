const common = require("../common");
const { expect, chai, app } = common;

const Item = require("../../models/Item");
const Group = require("../../models/Group");
const User = require("../../models/User");

let userObject = {};
let groupObject = {};
let item = {};
const groupName = "bean";

before(async () => {
  const user = {
    name: "Sarah",
    email: "sarah@gmail.com",
    password: "12345",
    group: groupName
  };

  try {
    const res = await chai
      .request(app)
      .post("/api/groups")
      .send({ name: groupName });

    groupObject = res.body;
    const userRes = await chai
      .request(app)
      .post("/api/users")
      .send(user);

    userObject = userRes.body;
    console.log(userObject);
  } catch (err) {
    console.log(err);
  }
});
