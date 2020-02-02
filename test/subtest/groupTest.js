const common = require("../common");
const { expect, chai, app } = common;

const Group = require("../../models/Group");
const User = require("../../models/User");

after(async () => {
  await Group.deleteMany({});
  await User.deleteMany({});
});

const groupName = "bean";
it(`/POST create group`, async () => {
  try {
    const res = await chai
      .request(app)
      .post("/api/groups")
      .send({ name: groupName });
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    expect(res.body.name).to.equal(groupName);
  } catch (err) {
    console.log(err);
  }
});

it(`/POST create group with error`, async () => {
  try {
    const res = await chai.request(app).post("/api/groups");
    expect(res).to.have.status(400);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("msg");
  } catch (err) {
    console.log(err);
  }
});

it(`/GET/:name group by name`, async () => {
  const user = {
    name: "Sarah",
    email: "sarah@gmail.com",
    password: "12345",
    group: groupName
  };

  try {
    const userRes = await chai
      .request(app)
      .post("/api/users")
      .send(user);
    const { _id } = userRes.body.user;
    const token = userRes.body.token;

    const res = await chai
      .request(app)
      .get("/api/groups/" + groupName)
      .set("x-auth-token", token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("users");
    expect(res.body.users)
      .to.be.an("array")
      .that.contains.something.like({ _id });
  } catch (err) {
    console.log(err);
  }
});
