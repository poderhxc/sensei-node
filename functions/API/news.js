const {db} = require("../utils/admin");

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
    return response.status(400).json({body: "Date must not be empty"});
  }

  if (request.body.description.trim() === "") {
    return response.status(400).json({title: "Description Must not be empty"});
  }

  if (request.body.link.trim() === "") {
    return response.status(400).json({title: "Link must not be empty"});
  }

  if (request.body.picture.trim() === "") {
    return response.status(400).json({title: "picture must not be empty"});
  }

  if (request.body.source.trim() === "") {
    return response.status(400).json({title: "source must not be empty"});
  }

  if (request.body.title.trim() === "") {
    return response.status(400).json({title: "title must not be empty"});
  }

  if (request.body.lang.trim() === "") {
    return response.status(400).json({title: "language must not be empty"});
  }

  const newNew = {
    date: request.body.date,
    description: request.body.description,
    link: request.body.link,
    picture: request.body.picture,
    source: request.body.source,
    title: request.body.title,
    language: request.body.lang,
    username: request.user.username,
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
