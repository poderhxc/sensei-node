const {admin, db} = require("../utils/admin");
const config = require("../utils/config");

exports.getAllNews = (request, response) => {
  const lang = request.params.lang;

  if (!lang || lang === undefined) {
    db
        .collection("news")
        .orderBy("date", "desc")
        .get()
        .then((data) => {
          // eslint-disable-next-line prefer-const
          let news = [];
          data.forEach((doc) => {
            news.push({
              date: doc.data().date,
              description: doc.data().description,
              link: doc.data().link,
              picture: doc.data().picture,
              source: doc.data().source,
              language: doc.data().language,
              visible: doc.data().visible,
              title: doc.data().title,
              id: doc.id,
            });
          });
          return response.json(news);
        })
        .catch((err) => {
          console.error(err);
          return response.status(500).json({error: err.code});
        });
  } else {
    db
        .collection("news")
        .orderBy("date", "desc")
        .where("language", "==", lang)
        .get()
        .then((data) => {
          // eslint-disable-next-line prefer-const
          let news = [];
          data.forEach((doc) => {
            news.push({
              date: doc.data().date,
              description: doc.data().description,
              link: doc.data().link,
              picture: doc.data().picture,
              source: doc.data().source,
              language: doc.data().language,
              visible: doc.data().visible,
              title: doc.data().title,
              id: doc.id,
            });
          });
          return response.json(news);
        })
        .catch((err) => {
          console.error(err);
          return response.status(500).json({error: err.code});
        });
  }
};

exports.postOneNew = (request, response) => {
  if (request.body.date.trim() === "") {
    return response.status(400).json({body: "Debe ingresar una fecha"});
  }

  if (request.body.description.trim() === "") {
    return response.status(400).json({title: "Debe ingresar una descripcion"});
  }

  if (request.body.link.trim() === "") {
    return response.status(400).json({title: "Debe ingresar un link"});
  }

  if (request.body.source.trim() === "") {
    return response.status(400).json({title: "Debe ingresar unna fuente"});
  }

  if (request.body.title.trim() === "") {
    return response.status(400).json({title: "Debe ingresar un titulo"});
  }

  if (request.body.lang.trim() === "") {
    return response.status(400).json({title: "Debe inngresar un lenguaje"});
  }

  if (request.body.visible.trim() === "") {
    return response.status(400).json({title: "Debe especificar si es visible"});
  }

  const newNew = {
    date: request.body.date,
    description: request.body.description,
    link: request.body.link,
    source: request.body.source,
    title: request.body.title,
    language: request.body.lang,
    username: request.user.username,
    visible: request.body.visible,
  };

  db
      .collection("news")
      .add(newNew)
      .then((doc)=>{
        const responseNew = newNew;
        responseNew.id = doc.id;
        return response.json(responseNew);
      })
      .catch((err) => {
        response.status(500).json({error: "Something went wrong"});
        console.error(err);
      });
};


exports.deleteNew = (request, response) => {
  const document = db.doc(`/news/${request.params.newId}`);
  document
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return response.status(404).json({error: "New not found"});
        }
        return document.delete();
      })
      .then(() => {
        response.json({message: "Delete successfull"});
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

exports.editNew = ( request, response ) => {
  if (request.body.newId || request.body.createdAt) {
    response.status(403).json({message: "Not allowed to edit"});
  }

  const document = db.collection("news").doc(`${request.params.newId}`);
  document.update(request.body)
      .then(()=> {
        response.json({message: "Updated successfully"});
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({
          error: err.code,
        });
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
exports.uploadPhoto = (request, response) => {
  const busboy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const bb = busboy({headers: request.headers});
  let imageFileName;
  let imageToBeUploaded = {};
  let newId;
  bb.on("field", (name, val, info) => {
    if (name === "new_id") {
      newId = val;
    }
  });

  bb.on("file", (name, file, info) => {
    const {filename, encoding, mimeType} = info;

    if (mimeType !== "image/png" && mimeType !== "image/jpeg") {
      return response.status(400).json({error: "Wrong file type submited"});
    }

    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${newId}.${imageExtension}`;

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
          return response.json({message: "Image uploaded successfully"});
        })
        .catch((error) => {
          console.error(error);
          return response.status(500).json({error: error.code});
        });
  });
  bb.end(request.rawBody);
};
