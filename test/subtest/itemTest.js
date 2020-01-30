const common = require("../common");
const { expect, chai, app } = common;

const Item = require("../../models/Item");

let userObject = {};
let groupObject = {};
let item = {};

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

    item = {
      buyer: userObject.user._id,
      location: "Wendy's",
      price: 12,
      buyerGroup: [userObject.user._id],
      groupId: groupObject._id
    };
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
    newItem = new Item(item);
    await newItem.save();

    const res = await chai
      .request(app)
      .get(`/api/items/${newItem._id}`)
      .set("x-auth-token", userObject.token);

    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("buyerGroup");
    expect(res.body).to.have.property("buyer");
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("location");
    expect(res.body).to.have.property("price");
    const { buyerGroup, buyer, _id, location, price } = res.body;
    expect(price).to.equal(newItem.price);
    expect(location).to.equal(newItem.location);
    expect(_id).to.equal(newItem._id.toString());
    expect(res.body.buyerGroup.length).to.equal(1);
    expect(buyer._id).to.equal(userObject.user._id);
    expect(buyerGroup[0].group).to.equal(groupObject.name);
  } catch (err) {
    console.log(err);
  }
});

it("/GET/group/:groupId group items", async () => {
  try {
    newItem = new Item(item);
    await newItem.save();
    const res = await chai
      .request(app)
      .get(`/api/items/group/${groupObject._id}`)
      .set("x-auth-token", userObject.token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("array");
    expect(res.body.length).to.equal(1);
  } catch (err) {
    console.log(err);
  }
});

it("/GET/user/:userId group items", async () => {
  try {
    newItem = new Item(item);
    await newItem.save();
    const res = await chai
      .request(app)
      .get(`/api/items/user/${userObject.user._id}`)
      .set("x-auth-token", userObject.token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("array");
    expect(res.body.length).to.equal(1);
  } catch (err) {
    console.log(err);
  }
});

it("/POST item", async () => {
  try {
    const res = await chai
      .request(app)
      .post(`/api/items`)
      .send(item)
      .set("x-auth-token", userObject.token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("buyerGroup");
    expect(res.body).to.have.property("buyer");
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("location");
    expect(res.body).to.have.property("price");
    const { buyerGroup, buyer, _id, location, price } = res.body;
    expect(price).to.equal(newItem.price);
    expect(location).to.equal(newItem.location);
    expect(_id).to.equal(newItem._id.toString());
    expect(res.body.buyerGroup.length).to.equal(1);
    expect(buyer._id).to.equal(userObject.user._id);
    expect(buyerGroup[0].group).to.equal(groupObject.name);
  } catch (err) {
    console.log(err);
  }
});

it("/PUT item", async () => {
  try {
    const update = item;
    update.price = 30;
    update.location = "Nike";

    newItem = new Item(item);
    await newItem.save();
    const res = await chai
      .request(app)
      .put(`/api/items/${newItem._id}`)
      .send(update)
      .set("x-auth-token", userObject.token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("buyerGroup");
    expect(res.body).to.have.property("buyer");
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("location");
    expect(res.body).to.have.property("price");
    const { buyerGroup, buyer, _id, location, price } = res.body;
    expect(price).to.equal(update.price);
    expect(location).to.equal(update.location);
    expect(res.body.buyerGroup.length).to.equal(1);
    expect(buyer._id).to.equal(userObject.user._id);
    expect(buyerGroup[0].group).to.equal(groupObject.name);
  } catch (err) {
    console.log(err);
  }
});

it("/DELETE item", async () => {
  try {
    newItem = new Item(item);
    await newItem.save();
    const res = await chai
      .request(app)
      .delete(`/api/items/${newItem._id}`)
      .set("x-auth-token", userObject.token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("buyerGroup");
    expect(res.body).to.have.property("buyer");
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("location");
    expect(res.body).to.have.property("price");
    const { buyerGroup, buyer, _id, location, price } = res.body;
    expect(price).to.equal(newItem.price);
    expect(location).to.equal(newItem.location);
    expect(res.body.buyerGroup.length).to.equal(1);
    expect(buyer._id).to.equal(userObject.user._id);
    expect(buyerGroup[0].group).to.equal(groupObject.name);
  } catch (err) {
    console.log(err);
  }
});
