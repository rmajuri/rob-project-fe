import './App.css'
import Article from './article'
import ArticleForm from './form'
import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'

const App = () => {
  const [articles, setArticles] = useState([])
  const [isPost, setIsPost] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState(null)

  const handleEditClick = articleId => {
    setIsPost(false)
    setSelectedArticle(articleId)
  }

  const handleDeleteClick = articleId => {
    const url = `http://127.0.0.1:8000/api/articles/${articleId}/`

    fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
      .then(res => res.status)
      .then(() => setArticles(articles.filter(article => article.id !== articleId)))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    const fetchArticles = () => {
      const url = 'http://127.0.0.1:8000/api/articles/'

      fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(articleResults => setArticles(articleResults))
        .catch(err => console.error(err))
    }

    setArticles([])
    fetchArticles()
  }, [])

  // Only return articles if there are any fetched
  const renderArticles = articles.map(article => {
    return <Article
      key={article.id}
      {...article}
      deleteClickHandler={handleDeleteClick}
      setIsPost={setIsPost}
      selectedArticle={selectedArticle}
      setSelectedArticle={setSelectedArticle}
      editClickHandler={handleEditClick}
    />
  })


  return (
    <div className='App'>
      <Typography variant='h4' component='header'>
        News Tracker
      </Typography>
      <Typography gutterBottom variant='subtitle1' component='header'>
        Curate a collection of news articles from around the web.
      </Typography>
      <div className='grid'>
        <div>
          {articles ? renderArticles : null}
        </div>
        <ArticleForm
          isPost={isPost}
          setIsPost={setIsPost}
          articles={articles}
          setArticles={setArticles}
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
        />
      </div>
    </div>
  )
}


export default App

