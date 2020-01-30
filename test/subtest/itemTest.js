const common = require("../common");
const { expect, chai, app } = common;

const Item = require("../../models/Item");
// const mongoose = require("mongoose");

let userObject = {};
let groupObject = {};

before(async () => {
  const auth = {
    email: "sarah@gmail.com",
    password: "12345"
  };
  try {
    let res = await chai
      .request(app)
      .post("/api/auth")
      .send(auth);

    userObject = res.body;

    const res2 = await chai
      .request(app)
      .get(`/api/groups/${userObject.user.group}`)
      .set("x-auth-token", userObject.token);
    groupObject = res2.body;
  } catch (err) {
    console.log(err);
  }
});

beforeEach(async () => {
  await Item.deleteMany({});
});

it(`/GET all items`, async () => {
  try {
    const res = await chai
      .request(app)
      .get("/api/items")
      .set("x-auth-token", userObject.token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("array");
    expect(res.body.length).to.equal(0);
  } catch (err) {
    console.log(err);
  }
});

it("/GET/:id item by id", async () => {
  try {
    const res = await chai
      .request(app)
      .get("/api/items")
      .set("x-auth-token", userObject.token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("array");
    expect(res.body.length).to.equal(0);
  } catch (err) {
    console.log(err);
  }
});

it("/GET/group/:groupId group items", async () => {
  try {
    const res = await chai
      .request(app)
      .get("/api/items")
      .set("x-auth-token", userObject.token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("array");
    expect(res.body.length).to.equal(0);
  } catch (err) {
    console.log(err);
  }
});

it("/GET/user/:userId group items", async () => {
  try {
    const res = await chai
      .request(app)
      .get("/api/items")
      .set("x-auth-token", userObject.token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("array");
    expect(res.body.length).to.equal(0);
  } catch (err) {
    console.log(err);
  }
});
