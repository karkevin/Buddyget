const Group = require("../models/Group");

// capitalizes a string.
module.exports = {
  capitalize: function(name) {
    return name.charAt(0).toUpperCase() + name.substring(1);
  },
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
