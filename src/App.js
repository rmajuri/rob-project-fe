import logo from './logo.svg';
import './App.css';
import Article from './article'

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
        if (status === 204) {
          setArticles(articles.filter(article => article.id !== articleId))
        } else {
          throw 'Failure while trying to delete article'
        }
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
      <Typography gutterBottom variant="h4" component="header">
        News Tracker
      </Typography>
      <Typography gutterBottom variant="subtitle1" component="header">
        Curate a collection of news articles from around the web.
      </Typography>
      {articles ? renderArticles : null}
    </div>
  )
}


export default App;
