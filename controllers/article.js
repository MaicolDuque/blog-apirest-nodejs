/**
 * @author Maicol Felipe Duque Urrea <maicolduque01@gmail.com>
 */

'use strict'
const validator = require('validator');
const Article = require('../models/article');
const fs = require('fs');
const path = require('path'); // Sacar path o ruta de un archivo



let test = (req, res) => {
  return res.status(200).send({
    message: "Hello World!"

  })
}


let save = (req, res) => {
  //Get all parameters
  let params = req.body;

  //Validate
  try {
    let validate_title = !validator.isEmpty(params.title);
    let validate_content = !validator.isEmpty(params.content);

    if (validate_title && validate_content) {
      //Create object to save
      const article = new Article();

      //Assign values
      article.title = params.title;
      article.content = params.content;
      article.image = null;

      //Save the article
      article.save((err, articleStored) => {
        if (err || !articleStored) {
          return res.status(404).send({
            message: "El articulo no se ha guardado !!",
            status: "error"
          })
        }
        return res.status(200).send({
          article: articleStored,
          status: "success"
        })

      });

    } else {
      return res.status(200).send({
        message: "Los datos no son válidos!!",
        status: "error"
      })
    }
  } catch (err) {
    return res.status(200).send({
      message: "Faltan datos por enviar!!",
      status: "error",
      error: "" + err
    })
  }


}

let getArticles = (req, res) => {

  let query = Article.find({});
  let last = req.params.last

  if (last || last != undefined) {
    query.limit(5)
  }

  query.sort('-_id').exec((err, articles) => {
    if (err) {
      return res.status(500).send({
        message: "Error al devolver los articulos !!",
        status: "error",
        error: "" + err
      })
    }

    if (!articles) {
      return res.status(404).send({
        message: "No hay articulos para mostrar!!",
        status: "error",
      })
    }

    return res.status(200).send({
      status: "success",
      articles
    })
  })
}


let getArticle = (req, res) => {
  let id = req.params.id

  if (!id || id == undefined) {
    return res.status(200).send({
      message: "Faltan parametros por enviar"
    })
  }

  Article.findById(id, (err, article) => {
    if (err) {
      return res.status(500).send({
        message: "Error al devolver el articulo !!",
        status: "error",
        error: "" + err
      })
    }

    if (!article) {
      return res.status(404).send({
        message: "No existe articulo con el id: " + id,
        status: "error",
      })
    }

    return res.status(200).send({
      status: "success",
      article
    })
  })
}

let updatedArticle = (req, res) => {
  let id = req.params.id
  let params = req.body

  try {
    let validate_title = !validator.isEmpty(params.title)
    let validate_content = !validator.isEmpty(params.content)

    if (!validate_title && !validate_content) {
      return res.status(200).send({
        status: "error",
        message: "La validación no es correcta."
      })
    }
    Article.findOneAndUpdate({ _id: id }, params, { new: true }, (err, article) => { //new: true => Me retorna el objeto ya actualizado
      if (err) {
        return res.status(500).send({
          message: "Error al actualizar el articulo !!",
          status: "error",
          error: "" + err
        })
      }

      if (!article) {
        return res.status(404).send({
          message: "No existe articulo con el id: " + id,
          status: "error",
        })
      }

      return res.status(200).send({
        status: "success",
        article
      })

    })

  } catch (error) {
    return res.status(500).send({
      message: "Error al actualizar el articulo !!",
      status: "error",
      error: "" + error
    })
  }

}


let deleteArticle = (req, res) => {
  let id = req.params.id

  Article.findOneAndDelete({ _id: id }, (err, articleRemoved) => {
    if (err) {
      return res.status(500).send({
        message: "Error al elliminar el articulo !!",
        status: "error",
        error: "" + err
      })
    }

    if (!articleRemoved) {
      return res.status(404).send({
        message: "No se ha borrado el articulo con el id: " + id,
        status: "error",
      })
    }

    return res.status(200).send({
      status: "success",
      article: articleRemoved
    })


  })


}


let upload = (req, res) => {
  //Recoger fichero de la perticion
  let fileName = 'imagen no subida';

  if (!req.files) {
    return res.status(404).send({
      status: "error",
      message: fileName
    })
  }

  //Conseguir el nombre y la extensión del archivo
  let filePath = req.files.file0.path;
  let fileSplit = filePath.split('\\');

  //NombreArchivo
  fileName = fileSplit[2];

  // Extensión del fichero
  let extensionSplit = fileName.split('\.');
  let fileExtension = extensionSplit[1];

  //Comprobar extensión, solo imagenes, si es valido borrar el fichero
  if (fileExtension != 'png' && fileExtension != 'jpg' && fileExtension != 'jpeg' && fileExtension != 'git') {
    fs.unlink(filePath, (err) => {
      return res.status(404).send({
        status: "error",
        message: "La extensión de la imagen no es válida !!"
      })
    })
  } else {
    //Buscar el articulo y asignarle el nombre de la imagen y actualizarlo.
    let id = req.params.id
    Article.findOneAndUpdate({ _id: id }, { image: fileName }, { new: true }, (err, article) => {
      if (err) {
        return res.status(500).send({
          message: "Error al actualizar la imagen !!",
          status: "error",
          error: "" + err
        })
      }
      return res.status(200).send({
        status: "success",
        article
      })
    })
  }
}


let getImage = (req, res) => {
  let image = req.params.image
  let pathFile = './upload/articles/' + image;

  fs.exists(pathFile, (exists) => {
    if (exists) {
      return res.sendFile(path.resolve(pathFile));
    } else {
      return res.status(404).send({
        status: "error",
        message: "La imagen no existe !!"
      })
    }
  })
}


let search = (req, res) => {
  let searchString = req.params.search
  Article.find({
    "$or": [
      { "title": { "$regex": searchString, "$options": "i" } },
      { "content": { "$regex": searchString, "$options": "i" } }
    ]
  })
    .sort([['date', 'descending']])
    .exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          message: "Error buscar articulos !!",
          status: "error",
          error: "" + err
        })
      }

      if (!articles.length) {
        return res.status(404).send({
          message: "No hay articulos para mostrar !!",
          status: "success"
        })
      }

      return res.status(200).send({
        status: "success",
        articles
      })

    })
}

let updatedFavorite = (req, res) => {
  let id = req.params.id
  let params = req.body
  let favorite = 'N'
  if (params.favorite) {
    favorite = params.favorite
  }
  Article.findByIdAndUpdate({ _id: id }, { $set: { favorite: favorite } }, { new: true }, (err, article) => {
    if (err) {
      return res.status(500).send({
        message: "Error buscar articulos !!",
        status: "error",
        error: "" + err
      })

    }

    if (!article) {
      return res.status(404).send({
        message: "No hay articulos con ese ID",
        status: "success"
      })
    }

    return res.status(200).send({
      status: "success",
      article
    })

  })

}


let getArticlesFavorites = (req, res) => {
  
  Article.find({ favorite: "S" }).exec((err, articles) => {
    if (err) {
      return res.status(500).send({
        message: "Error buscar articulos favoritos !!",
        status: "error",
        error: "" + err
      })
    }

    return res.status(200).send({
      status: "success",
      articles
    })

  })
}

module.exports = {
  test,
  save,
  getArticles,
  getArticle,
  updatedArticle,
  deleteArticle,
  upload,
  getImage,
  search,
  updatedFavorite,
  getArticlesFavorites
};