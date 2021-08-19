import logo from './logo.svg';
import './App.css';
import Article from './article'

import React, { useState, useEffect } from 'react';

const App = () => {
  const [articles, setArticles] = useState([])


  const fetchArticles = () => {
    fetch('http://127.0.0.1:8000/articles/', {method: 'GET', headers: {'Content-Type': 'application/json'}})
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

  useEffect(() => {
    setArticles([])
    fetchArticles()
  }, [])

  const renderArticles = articles.map(article => <Article {...article}/>) 


  return (
    <div className="App">
    {articles ? renderArticles : null}
    </div>
  )
}


export default App;
