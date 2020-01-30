const common = require("../common");
const { expect, chai, app } = common;

const user = {
  name: "Sarah",
  email: "sarah@gmail.com",
  password: "12345",
  group: "bean"
};

it(`/POST new user`, async () => {
  try {
    let res = await chai
      .request(app)
      .post("/api/users")
      .send(user);

    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    const { name, email, group, id } = res.body.user;
    token = res.body.token;
    expect(name).to.equal(user.name);
    expect(email).to.equal(user.email);
    expect(group).to.equal(user.group);

    res = await chai
      .request(app)
      .get("/api/groups/" + group)
      .set("x-auth-token", token);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("users");
    expect(res.body.users)
      .to.be.an("array")
      .that.contains.something.like({ _id: id });
  } catch (err) {
    console.log(err);
  }
});

it("/POST authenticate user", async () => {
  const auth = {
    email: "sarah@gmail.com",
    password: "12345"
  };
  try {
    let res = await chai
      .request(app)
      .post("/api/auth")
      .send(auth);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");

    const { email } = res.body.user;
    expect(email).to.equal(auth.email);
  } catch (err) {
    console.log(err);
  }
});

it("/GET/user get user data", async () => {
  const auth = {
    email: "sarah@gmail.com",
    password: "12345"
  };
  try {
    let res = await chai
      .request(app)
      .post("/api/auth")
      .send(auth);
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");

    const token = res.body.token;
    expect(res.body.user.email).to.equal(auth.email);

    let res2 = await chai
      .request(app)
      .get("/api/auth/user")
      .send(res.body.user)
      .set("x-auth-token", token);
    expect(res2.body).to.be.a("object");
    const { name, email, group } = res2.body;
    expect(name).to.equal(user.name);
    expect(email).to.equal(user.email);
    expect(group).to.equal(user.group);
  } catch (err) {
    console.log(err);
  }
});
