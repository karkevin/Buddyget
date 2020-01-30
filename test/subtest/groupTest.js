const common = require("../common");
const { expect, chai, app } = common;

const name = "bean";
it(`/POST create group`, async () => {
  try {
    const res = await chai
      .request(app)
      .post("/api/groups")
      .send({ name });
    expect(res).to.have.status(200);
    expect(res.body).to.be.a("object");
    expect(res.body.name).to.equal(name);
  } catch (err) {
    console.log(err);
  }
});
