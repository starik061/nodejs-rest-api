// mongodb+srv://starik061:z0ddjByVS3L1nRsz@hw-cluster.lowpwng.mongodb.net/
const app = require("./app");
const mongoose = require("mongoose");

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
const { DB_HOST } = process.env; // don't forget to add database name
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Connection to database is succesfull");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
