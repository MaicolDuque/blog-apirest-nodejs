/**
 * @author Maicol Felipe Duque Urrea <maicolduque01@gmail.com>
 */


'use strict'
 
const express           = require('express');
const router            = express.Router();
const ArticleController = require('../controllers/article');
const multiparty        = require('connect-multiparty');
const midd_upload       = multiparty({ uploadDir: './upload/articles' });

router.get('/helloworld', ArticleController.test);

router.get('/articles/favorites', ArticleController.getArticlesFavorites); 
router.post('/articles', ArticleController.save);
router.get('/articles/last/:last?', ArticleController.getArticles); // signo '?' significa que es un parametro opcional
router.get('/articles', ArticleController.getArticles); // signo '?' significa que es un parametro opcional
router.get('/articles/:id', ArticleController.getArticle); 
router.put('/articles/:id', ArticleController.updatedArticle); 
router.put('/articles/favorite/:id', ArticleController.updatedFavorite); 
router.delete('/articles/:id', ArticleController.deleteArticle); 
router.post('/upload-image/:id', midd_upload, ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage); 
router.get('/search/:search', ArticleController.search); 

module.exports = router;

