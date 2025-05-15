import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'
import UserImg from '../assets/images/user.jpg'
import NoImg from '../assets/images/no-img.png'
import axios from 'axios'
import NewsModel from './NewsModel'
import Bookmarks from './Bookmarks'

const categories = ["general", "world", "business", "technology", "entertainment", "sports", "science", "health", "research-papers"]


const News = () => {
    const [headline, setHeadline] = useState(null)
    const [news, setNews] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('general')
    const [searchInput, setSearchInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [showModel, setShowModel] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState(null)

    useEffect(() => {
        const fetchNews = async () => {
            let fetchedNews = []

            if (selectedCategory === 'research-papers') {
                const response = await axios.get(
                    `https://export.arxiv.org/api/query?search_query=all:${searchQuery || 'ai'}&start=0&max_results=10`
                )

                const xml = new DOMParser().parseFromString(response.data, "text/xml")
                const entries = Array.from(xml.getElementsByTagName("entry"))

                fetchedNews = entries.map(entry => ({
                    title: entry.getElementsByTagName("title")[0]?.textContent,
                    content: entry.getElementsByTagName("summary")[0]?.textContent,
                    publishedAt: entry.getElementsByTagName("published")[0]?.textContent,
                    url: entry.getElementsByTagName("id")[0]?.textContent,
                    source: { name: "arXiv" },
                    image: NoImg // since arXiv doesn’t provide images
                }))
            } else {
                let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=6d49ce918f089b345fe17f82caf0e993`

                if (searchQuery) {
                    url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=6d49ce918f089b345fe17f82caf0e993`
                }

                const response = await axios.get(url)
                fetchedNews = response.data.articles

                fetchedNews.forEach(article => {
                    if (!article.image) article.image = NoImg
                })
            }

            setHeadline(fetchedNews[0])
            setNews(fetchedNews.slice(1, 7))
        }

        fetchNews()
    }, [selectedCategory, searchQuery])


    const handleCategoryClick = (e, category) => {
        e.preventDefault()
        setSelectedCategory(category)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchQuery(searchInput)
        setSearchInput('')

    }

    const handleArticleClick = (article) => {
        setSelectedArticle(article)
        setShowModel(true)

        console.log(article)
    }


    return (
        <div className='news'>
            <header className="news-header">
                <h1 className="logo">TruthSpear</h1>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder='Search News....' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <button type='sumbit'>
                            <i className="fa-solid fa-magnifying-glass"></i></button></form></div>
            </header>
            <div className="news-content">
                <div className="navbar">
                    <div className="user"><img src={UserImg} alt="User Image" /><p>Mary's Blog</p></div>
                    <nav className="categories"><h1 className="nav-heading">Categories</h1>
                        <div className="nav-links">
                            {categories.map((category) => (<a href="#" key={category} className='nav-link' onClick={(e) => handleCategoryClick(e, category)}>{category}</a>
                            ))}


                            <a href="#" className='nav-link'>Bookmarks <i className="fa-regular fa-bookmark"></i></a>
                        </div>
                    </nav>

                </div>
                <div className="news-section">
                    {headline && (<div className="headline" onClick={() => handleArticleClick(headline)}>
                        <img src={headline.image || NoImg} alt={headline.title} />
                        <h2 className="headline-title">{headline.title}
                            <i className="fa-regular fa-bookmark bookmark"></i>
                        </h2>
                    </div>)}


                    <div className="news-grid">
                        {news.map((article, index) => (
                            <div key={index} className="news-grid-item" onClick={() => handleArticleClick(article)}>
                                <img src={article.image || NoImg} alt={article.title} />
                                <h3>{article.title}
                                    <i className="fa-regular fa-bookmark bookmark"></i>
                                </h3>
                            </div>
                        ))}
                    </div>

                </div>
                <NewsModel show={showModel} article={selectedArticle} onClose={() => setShowModel(false)} />
                <Bookmarks />
                <div className="my-blogs">My Blogs</div>
                <div className="weather-calendar">
                    <Weather />
                    <Calendar />
                </div>
            </div>
            <footer className="news-footer">Footer</footer>
        </div>
    )
}

export default News