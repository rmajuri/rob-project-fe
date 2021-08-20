import './App.css';
import Article from './article'
import ArticleForm from './form'

import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

const App = () => {
  const [articles, setArticles] = useState([])


  const fetchArticles = () => {
    fetch('http://127.0.0.1:8000/articles/', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        return res.json()
      })
      .then((articleResults) => {
        console.log(articleResults)
        setArticles(articleResults)

      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleDeleteClick = (articleId) => {
    const url = `http://127.0.0.1:8000/articles/${articleId}/`

    fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        return res.status
      })
      .then((status) => {
        console.log(status)
        setArticles(articles.filter(article => article.id !== articleId))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    setArticles([])
    fetchArticles()
  }, [])

  const renderArticles = articles.map(article => <Article key={article.id} {...article} deleteClickHandler={handleDeleteClick} />)


  return (
    <div className="App">
      <Typography  variant="h4" component="header">
        News Tracker
      </Typography>
      <Typography gutterBottom variant="subtitle1" component="header">
        Curate a collection of news articles from around the web.
      </Typography>
      <div className="grid">
        <div>
          {articles ? renderArticles : null}
        </div>
        <ArticleForm articles={articles} setArticles={setArticles} />
      </div>
    </div>
  )
}


export default App;
