const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

// Create a new article
router.post('/', (req, res,next) => {
    req.article=new Article();
    next();
},saveArticleAndRedirect('new'));

// Display form to create a new article
router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() });
});

// Display form to edit an existing article
router.get('/edit/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.redirect('/');
    }
    res.render('articles/edit', { article: article });
  } catch (err) {
    console.error('Error fetching article:', err);
    res.redirect('/');
  }
});

// Display a specific article
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.redirect('/');
    }
    res.render('articles/show', { article: article });
  } catch (err) {
    console.error('Error fetching article:', err);
    res.redirect('/');
  }
});
// Update an existing article
router.put('/:id', async(req, res,next) => {
  req.article=await Article.findById(req.params.id);
  next();
},saveArticleAndRedirect('edit'));
// Delete an article
router.delete('/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting article:', err);
    res.redirect('/');
  }
});
function saveArticleAndRedirect(path){
  return async(req,res)=>{
    let article=req.article
    article.title=req.body.title
    article.description=req.body.description
    article.markdown=req.body.markdown
    try {
      article=await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render('articles/{$path}',{ article: article});
    } 
  }
}
module.exports = router;
