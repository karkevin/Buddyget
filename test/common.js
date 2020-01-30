const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.use(require("chai-like"));
chai.use(require("chai-things")); // Don't swap these two

exports.chai = chai;
exports.expect = expect;
exports.app = require("../app");
