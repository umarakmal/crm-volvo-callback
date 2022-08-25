const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const csv = require("csvtojson");
const multer = require("multer");
const Agent = require("./models/agent");
//Loads environment variables from .env file
require("dotenv").config();

const app = express();

// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//Connecting Database

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const inputformRoutes = require("./routes/inputform");

// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
// app.use(cors()); // allows all origins
// if ((process.env.NODE_ENV = "development")) {
//   app.use(cors({ origin: `http://localhost:3000` }));
// }

// middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", inputformRoutes);

//Upload file
app.post("/api/uploadfile", upload.single("csv"), (req, res) => {
  try {
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        //   console.log(jsonObj);
        jsonObj.map(async (element) => {
          var agent = await new Agent({
            mobile: element.Mobile,
            queue: element.Queue,
            abandoned: element.Abandoned_Date,
            disposition: element.Disposition,
            first: element.First_Attempt,
            second: element.Second_Attempt,
            third: element.Third_Attempt,
            fattempt: element.First_Attempt_Employee,
            sattempt: element.Second_Attempt_Employee,
            tattempt: element.Third_Attempt_Employee,
          });
          const result = await agent.save(agent);
          console.log(result);
        });
        res.status(200).send("Successful!");
      });
  } catch (error) {
    console.log(error);
  }
});

//Establishing server port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
