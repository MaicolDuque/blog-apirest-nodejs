/**
 * @author Maicol Felipe Duque Urrea <maicolduque01@gmail.com>
 */

'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  image: String
});

module.exports = mongoose.model('Article', ArticleSchema); 
//articles --> Save documents of this type and this structure insise of the collection