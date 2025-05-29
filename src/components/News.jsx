import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'
import UserImg from '../assets/images/user.jpg'
import NoImg from '../assets/images/research logo.jpg'
import axios from 'axios'
import NewsModel from './NewsModel'
import Bookmarks from './Bookmarks'
import { Link } from 'react-router-dom';

const categories = ["general", "world", "business", "technology", "entertainment", "sports", "science", "health", "research-papers"]

const News = ({onShowBlogs}) => {
    const [headline, setHeadline] = useState(null)
    const [news, setNews] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('general')
    const [searchInput, setSearchInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [showModel, setShowModel] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [bookmarks, setBookmarks] = useState([])
    const [showBookmarksModel, setShowBookmarksModel] = useState(false)

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

            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
            setBookmarks(savedBookmarks)
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
    }

    const handleBookmarkClick = (article) => {
        setBookmarks((prevBookmarks) => {
            const updatedBookmarks = prevBookmarks.find((bookmark) => bookmark.title === article.title)
                ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
                : [...prevBookmarks, article]
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
            return updatedBookmarks
        })
    }

    return (
        <div className="container">
            <div className="TruthSpear">
                <div className='news'>
                    <header className="news-header">
                        <h1 className="logo">TruthSpear</h1>
                        <div className="search-bar">
                            <form onSubmit={handleSearch}>
                                <input type="text" placeholder='Search News....' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                                <button type='submit'>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </form>
                        </div>
                        <nav className="auth-links">
                            <Link to="/login" className="auth-link">login</Link>
                            <Link to="/register" className="auth-link">register</Link>
                            <Link to="/contact" className="auth-link">contact us</Link>
                            <Link to="/about" className="auth-link">about us</Link>
                        </nav>
                    </header>

                    <div className="news-content">
                        <div className="navbar">
                            <div className="user" onClick={onShowBlogs}>
                                <img src={UserImg} alt="User Image" />
                                <p>Aman's Blog</p>
                            </div>
                            <nav className="categories">
                                <h1 className="nav-heading">Categories</h1>
                                <div className="nav-links">
                                    {categories.map((category) => (
                                        <a href="#" key={category} className='nav-link' onClick={(e) => handleCategoryClick(e, category)}>{category}</a>
                                    ))}
                                    <a href="#" className='nav-link' onClick={() => setShowBookmarksModel(true)}>Bookmarks <i className="fa-solid fa-bookmark"></i></a>
                                </div>
                            </nav>
                        </div>

                        <div className="news-section">
                            {headline && (
                                <div className="headline" onClick={() => handleArticleClick(headline)}>
                                    <img src={headline.image || NoImg} alt={headline.title} />
                                    <h2 className="headline-title">{headline.title}
                                        <i className={`${bookmarks.some((bookmark) => bookmark.title === headline.title) ? 'fa-solid' : 'fa-regular'} fa-bookmark bookmark`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleBookmarkClick(headline)
                                            }}></i>
                                    </h2>
                                </div>
                            )}

                            <div className="news-grid">
                                {news.map((article, index) => {
                                    const isBookmarked = bookmarks.some((bookmark) => bookmark.url === article.url)
                                    return (
                                        <div key={article.url || index} className="news-grid-item" onClick={() => handleArticleClick(article)}>
                                            <img src={article.image || NoImg} alt={article.title} />
                                            <h3>{article.title}
                                                <i className={`${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark bookmark`}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleBookmarkClick(article)
                                                    }}></i>
                                            </h3>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <NewsModel show={showModel} article={selectedArticle} onClose={() => setShowModel(false)} />
                        <Bookmarks
                            show={showBookmarksModel}
                            bookmarks={bookmarks}
                            onClose={() => setShowBookmarksModel(false)}
                            onSelectArticle={handleArticleClick}
                            onDeleteBookmark={handleBookmarkClick}
                        />

                        <div className="my-blogs">My Notes</div>
                        <div className="weather-calendar">
                            <Weather />
                            <Calendar />
                        </div>
                    </div>

                    <footer className="news-footer">
                        <p><span>News & Blogs App</span></p>
                        <p>
                            <a href="https://www.copyright.gov.in/Documents/Copyrightrules1957.pdf" target="_blank" rel="noopener noreferrer">
                                &copy; All rights Reserved. By TruthSpear
                            </a>
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default News
