const app = require("./app");

// start the server
app.listen(app.get("port"));
console.log("server on port", app.get("port"));
