const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const {configDotenv} = require("dotenv")
configDotenv();

const app = express()
const marked = require('marked');
const DB = `mongodb+srv://Adnan:${process.env.DB_PASSWORD}@markdown-blogs-cluster.ctjoxbh.mongodb.net/BlogsDB?retryWrites=true&w=majority&appName=Markdown-Blogs-cluster`;
mongoose.connect(DB).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)