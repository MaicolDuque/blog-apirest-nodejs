/**
 * @author Maicol Felipe Duque Urrea <maicolduque01@gmail.com>
 */


'use strict'

const mongoose  = require("mongoose");
const app       = require("./app")
const port      = 3900;


mongoose.set('useFindAndModify', false); //Para desactivar metodos y funciones viejas en mogoose.
mongoose.Promise = global.Promise;   //Para evitar problemas con nodejs
mongoose.connect('mongodb://localhost:27017/apirest-blog', {useNewUrlParser: true}) //useNewUrlParser: true => Permite usar las nuevas funcionalidades de mongoose
  .then( () => {
    console.log("Se conectó a la base de datos");

    //Create a server a listen request http
    app.listen(port, ()=> {
      console.log("Server corroendo en http://localhost:"+port)
    })

  })