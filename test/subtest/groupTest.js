const common = require("../common");
const { expect, chai, app } = common;

it(`/POST Group`, done => {
  const name = "bean";
  chai
    .request(app)
    .post("/api/groups")
    .send({ name })
    .then(res => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
      expect(res.body.name).to.equal(name);
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
});
