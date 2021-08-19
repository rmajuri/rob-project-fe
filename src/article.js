import React from 'react'

const Article = ({ name, link, description }) => {

    return (<div>
        <p>{name}</p>
        <p>{description}</p>
        <a href={link}>Go to Article</a>
    </div>)

}

export default Article