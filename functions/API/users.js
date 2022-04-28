const {admin, db} = require("../utils/admin");
const config = require("../utils/config");

const firebase = require("firebase");

firebase.initializeApp(config);

const {validateLoginData, validateSignUpData} = require("../utils/validators");

// Login
exports.loginUser = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };
  const {valid, errors} = validateLoginData(user);
  if (!valid) return response.status(400).json(errors);

  firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        return response.json({token});
      })
      .catch((error) => {
        console.error(error);
        return response.status(403)
            .json({general: "wrong credentials, please try again"});
      });
};

exports.signUpUser = (request, response) => {
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phoneNumber: request.body.phoneNumber,
    country: request.body.country,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    username: request.body.username,
  };

  const {valid, errors} = validateSignUpData(newUser);

  if (!valid) return response.status(400).json(errors);

  let token; let userId;
  db
      .doc(`/users/${newUser.username}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // eslint-disable-next-line max-len
          return response.status(400).json({username: "this username is already taken"});
        } else {
          return firebase
              .auth()
              .createUserWithEmailAndPassword(
                  newUser.email,
                  newUser.password
              );
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idtoken) => {
        token = idtoken;
        const userCredentials = {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
          phoneNumber: newUser.phoneNumber,
          country: newUser.country,
          email: newUser.email,
          createdAt: new Date().toISOString(),
          userId,
        };
        return db
            .doc(`/users/${newUser.username}`)
            .set(userCredentials);
      })
      .then(()=>{
        return response.status(201).json({token});
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return response.status(400).json({email: "Email already in use"});
        } else {
          // eslint-disable-next-line max-len
          return response.status(500).json({general: "Something went wrong, please try again"});
        }
      });
};


const deleteImage = (imageName) => {
  const bucket = admin.storage().bucket();
  const path = `${imageName}`;
  return bucket.file(path).delete()
      .then(() => void 0)
      .catch((error) => {
        return;
      });
};

// Upload profile picture
exports.uploadProfilePhoto = (request, response) => {
  const busboy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const bb = busboy({headers: request.headers});
  let imageFileName;
  let imageToBeUploaded = {};
  bb.on("file", (name, file, info) => {
    const {filename, encoding, mimeType} = info;

    if (mimeType !== "image/png" && mimeType !== "image/jpeg") {
      return response.status(400).json({error: "Wrong file type submited"});
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${request.user.username}.${imageExtension}`;

    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = {filePath, mimeType};
    file.pipe(fs.createWriteStream(filePath));
  });
  // eslint-disable-next-line no-undef
  deleteImage(imageFileName);

  bb.on("finish", () => {
    admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filePath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
            },
          },
        })
        .then(() => {
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
          return db.doc(`/users/${request.user.username}`).update({
            imageUrl,
          });
        })
        .then(() => {
          return response.json({message: "Image uploaded successfully"});
        })
        .catch((error) => {
          console.error(error);
          return response.status(500).json({error: error.code});
        });
  });
  bb.end(request.rawBody);
};

exports.getUserDetail = (request, response) => {
  const userData = {};
  db
      .doc(`/users/${request.user.username}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          userData.userCredentials = doc.data();
          return response.json(userData);
        }
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({error: error.code});
      });
};

exports.updateUserDetails = (request, response) => {
  const document = db.collection("users").doc(`${request.user.username}`);
  document.update(request.body)
      .then(()=> {
        response.json({message: "Updated successfully"});
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({
          message: "Cannot Update the value",
        });
      });
};
