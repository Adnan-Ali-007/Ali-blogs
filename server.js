const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;
const marked = require('marked');

// MongoDB connection with better error handling and timeout configuration
const DB = `mongodb+srv://Adnan:${process.env.DB_PASSWORD}@markdown-blogs-cluster.ctjoxbh.mongodb.net/BlogsDB?retryWrites=true&w=majority&appName=Markdown-Blogs-cluster`;

mongoose.connect(DB, {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000, // Socket timeout
  bufferMaxEntries: 0 // Disable mongoose buffering
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Exit if database connection fails
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`)
});