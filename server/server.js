require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");

// const bodyParser = require('body-parser');
// const fs = require('fs')

require("../server/config/mongoose.config");

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// // Set EJS as templating engine
// app.set("view engine", "ejs");

app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(
  express.json({ limit: "30mb", extended: true }),
  express.urlencoded({ limit: "30mb", extended: true })
);

const userRoutes = require("../server/routes/user.routes");
userRoutes(app);

const postRoutes = require("../server/routes/post.routes");
postRoutes(app);

const commentRoutes = require("../server/routes/comment.routes");
commentRoutes(app);

const imageRoutes = require("../server/routes/image.routes");
imageRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
