const functions = require("firebase-functions");
const app = require("express")();
const auth = require("./utils/auth");
const cors = require("cors");

app.use(cors({origin: true}));
const {
  getAllNews,
  postOneNew,
  deleteNew,
  editNew,
} = require("./API/news");

const {
  loginUser,
  signUpUser,
  getUserDetail,
  updateUserDetails,
  uploadProfilePhoto,
} = require("./API/users");

app.get("/news", getAllNews);
app.get("/news/:lang", getAllNews);

app.post("/news", auth, postOneNew);
app.delete("/news/:newId", auth, deleteNew);
app.put("/news/:newId", auth, editNew);

// Users
app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.post("/user/image", auth, uploadProfilePhoto);
app.get("/user", auth, getUserDetail);
app.post("/user", auth, updateUserDetails);

exports.api = functions.https.onRequest(app);
