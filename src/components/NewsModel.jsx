import React from 'react'
import demoImg from '../assets/images/demo.jpg'
import './NewsModel.css'
import './Model.css'
const NewsModel = ({ show, article, onClose }) => {
    if (!show) {
        return null
    }
    return (
        <div className='model-overlay'>
            <div className="model-content">
                <span className="close-button" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                {article && (
                    <>
                        <img src={article.image} alt={article.title} className='model-image' />
                        <h2 className="model-title">{article.title}</h2>
                        <p className="model-source">Source: {article.source.name}</p>
                        <p className="model-date">{new Date(article.publishedAt).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="model-content">{article.content}</p>
                        <a href={article.url} target='_blank' rel='nooperner nonreferrence' className="read-more-link">Read More</a>
                    </>
                )}

            </div>
        </div>
    )
}

export default NewsModel