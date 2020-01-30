const mongoose = require("mongoose");
const Mockgoose = require("mockgoose").Mockgoose;

const db = process.env.mongoURI;
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
// mongoose.set("debug", process.env.DEBUG != undefined);

function open() {
  return new Promise((resolve, reject) => {
    if (process.env.DEBUG != undefined) {
      let mockgoose = new Mockgoose(mongoose);
      //   mockgoose.helper.setDbVersion("** your mongodb version **");
      mockgoose
        .prepareStorage()
        .then(() => {
          mongoose
            .connect(db, {
              useNewUrlParser: true,
              useCreateIndex: true,
              dbName: "buddyget"
            })
            .then(() => {
              resolve();
              // console.log("Test DB connected..");
            })
            .catch(err => {
              console.log(err);
              return err;
            });
        })
        .catch(err => console.log(err));
    } else {
      mongoose
        .connect(db, {
          useNewUrlParser: true,
          useCreateIndex: true,
          dbName: "buddyget"
        })
        .then(() => console.log("MongoDB connected.."))
        .catch(err => console.log(err));
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { close, open };
