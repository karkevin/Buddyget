const db = require("./db");
const app = require("./app");

const port = process.env.PORT || 5000;

db.open().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
