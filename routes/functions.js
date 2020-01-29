const Group = require("../models/Group");

// adds a log after action.
module.exports = {
  addlog: function(description, groupId) {
    Group.findByIdAndUpdate(groupId, {
      $push: {
        logs: {
          $each: [{ description }],
          $slice: -25
        }
      }
    }).catch(err => console.log(err));
  }
};
