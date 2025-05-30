import React, { useEffect, useState } from 'react';
import Weather from './Weather';
import Calendar from './Calendar';
import './News.css';
import UserImg from '../assets/images/user.jpg';
import NoImg from '../assets/images/research logo.jpg';
import AppLogo from '../assets/images/TruthSpear LOGO.jpg'; // Imported your logo
import './Logout'; // Assuming this is a component or CSS import
import axios from 'axios';
import NewsModel from './NewsModel';
import Bookmarks from './Bookmarks';
import { Link, useNavigate } from 'react-router-dom';

const categories = ["general", "world", "business", "technology", "entertainment", "sports", "science", "health", "research-papers"];

const News = ({ onShowBlogs }) => {
    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [showNewsModel, setShowNewsModel] = useState(false);
    const [selectedArticleForModel, setSelectedArticleForModel] = useState(null);

    const [bookmarks, setBookmarks] = useState([]);
    const [showBookmarksModel, setShowBookmarksModel] = useState(false);

    const [localBlogs, setLocalBlogs] = useState([]);
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            let fetchedNews = [];
            if (selectedCategory === 'research-papers') {
                try {
                    const response = await axios.get(
                        `https://export.arxiv.org/api/query?search_query=all:${searchQuery || 'ai'}&start=0&max_results=10`
                    );
                    const xml = new DOMParser().parseFromString(response.data, "text/xml");
                    const entries = Array.from(xml.getElementsByTagName("entry"));
                    fetchedNews = entries.map(entry => ({
                        title: entry.getElementsByTagName("title")[0]?.textContent,
                        content: entry.getElementsByTagName("summary")[0]?.textContent,
                        publishedAt: entry.getElementsByTagName("published")[0]?.textContent,
                        url: entry.getElementsByTagName("id")[0]?.textContent,
                        source: { name: "arXiv" },
                        image: NoImg
                    }));
                } catch (error) {
                    console.error("Error fetching arXiv papers:", error);
                    fetchedNews = [];
                }
            } else {
                try {
                    let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=6d49ce918f089b345fe17f82caf0e993`;
                    if (searchQuery) {
                        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=6d49ce918f089b345fe17f82caf0e993`;
                    }
                    const response = await axios.get(url);
                    fetchedNews = response.data.articles || [];
                    fetchedNews.forEach(article => {
                        if (!article.image) article.image = NoImg;
                    });
                } catch (error) {
                    console.error("Error fetching GNews:", error);
                    fetchedNews = [];
                }
            }

            if (fetchedNews.length > 0) {
                setHeadline(fetchedNews[0]);
                setNews(fetchedNews.slice(1, 7));
            } else {
                setHeadline(null);
                setNews([]);
            }
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            setBookmarks(savedBookmarks);
        };

        fetchNews();

        const storedLocalBlogs = JSON.parse(localStorage.getItem('myLocalBlogs')) || [];
        setLocalBlogs(storedLocalBlogs);

    }, [selectedCategory, searchQuery]);

    const handleCategoryClick = (e, category) => {
        e.preventDefault();
        setSelectedCategory(category);
        setSearchQuery('');
        setIsMenuOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        setIsMenuOpen(false);
    };

    const handleArticleOrBlogClick = (item) => {
        setSelectedArticleForModel(item);
        setShowNewsModel(true);
        setIsMenuOpen(false);
    };

    const handleBookmarkClick = (article) => {
        setBookmarks((prevBookmarks) => {
            const isBookmarked = prevBookmarks.some((bookmark) => bookmark.url === article.url);
            const updatedBookmarks = isBookmarked
                ? prevBookmarks.filter((bookmark) => bookmark.url !== article.url)
                : [...prevBookmarks, article];
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            return updatedBookmarks;
        });
    };

    const handleDeleteLocalBlog = (blogIdToDelete, event) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            const updatedLocalBlogs = localBlogs.filter(blog => blog.id !== blogIdToDelete);
            setLocalBlogs(updatedLocalBlogs);
            localStorage.setItem('myLocalBlogs', JSON.stringify(updatedLocalBlogs));
        }
    };

    const handleEditLocalBlog = (blogIdToEdit, event) => {
        event.stopPropagation();
        navigate(`/edit-blog/${blogIdToEdit}`);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="container">
            <div className="TruthSpear">
                <div className='news'>
                    <header className="news-header">
                        <div className="header-left"> {/* Container for logo and title */}
                            <img src={AppLogo} alt="TruthSpear Logo" className="header-app-logo" />
                            <h1 className="logo-title">TruthSpear</h1> {/* Changed class from 'logo' to 'logo-title' */}
                        </div>

                        {/* Hamburger menu button - moved for typical layout before search/auth on small screens */}
                        <div className="hamburger-menu" onClick={toggleMenu}>
                            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                        </div>

                        <div className="header-right"> {/* Container for search and auth links */}
                            <div className="search-bar">
                                <form onSubmit={handleSearch}>
                                    <input type="text" placeholder='Search News....' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                                    <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
                                </form>
                            </div>
                            <nav className="auth-links">
                                <Link to="/logout" className="auth-link">Logout</Link>
                            </nav>
                        </div>
                    </header>

                    <div className="news-content">
                        <div className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
                            <div className="user" onClick={onShowBlogs} title="Create or View My Blogs">
                                <img src={UserImg} alt="User" />
                                <p>Aman's Blog</p>
                            </div>
                            <nav className="categories">
                                <h1 className="nav-heading">Categories</h1>
                                <div className="nav-links">
                                    {categories.map((category) => (
                                        <a href="#" key={category} className={`nav-link ${selectedCategory === category ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, category)}>{category}</a>
                                    ))}
                                    <a href="#" className='nav-link' onClick={() => { setShowBookmarksModel(true); setIsMenuOpen(false); }}>Bookmarks <i className="fa-solid fa-bookmark"></i></a>
                                </div>
                            </nav>
                        </div>

                        <div className="news-section">
                            {headline && (
                                <div className="headline" onClick={() => handleArticleOrBlogClick(headline)}>
                                    <img src={headline.image || NoImg} alt={headline.title} />
                                    <h2 className="headline-title">{headline.title}
                                        <i className={`${bookmarks.some((b) => b.url === headline.url) ? 'fa-solid' : 'fa-regular'} fa-bookmark bookmark`}
                                            onClick={(e) => { e.stopPropagation(); handleBookmarkClick(headline); }}>
                                        </i>
                                    </h2>
                                </div>
                            )}
                            <div className="news-grid">
                                {news.map((article, index) => (
                                    <div key={article.url || index} className="news-grid-item" onClick={() => handleArticleOrBlogClick(article)}>
                                        <img src={article.image || NoImg} alt={article.title} />
                                        <h3>{article.title}
                                            <i className={`${bookmarks.some((b) => b.url === article.url) ? 'fa-solid' : 'fa-regular'} fa-bookmark bookmark`}
                                                onClick={(e) => { e.stopPropagation(); handleBookmarkClick(article); }}>
                                            </i>
                                        </h3>
                                    </div>
                                ))}
                                {news.length === 0 && !headline && <p style={{ color: '#aaa', textAlign: 'center' }}>No articles found.</p>}
                            </div>
                        </div>

                        <NewsModel
                            show={showNewsModel}
                            article={selectedArticleForModel}
                            onClose={() => setShowNewsModel(false)}
                        />

                        <Bookmarks
                            show={showBookmarksModel}
                            bookmarks={bookmarks}
                            onClose={() => setShowBookmarksModel(false)}
                            onSelectArticle={handleArticleOrBlogClick}
                            onDeleteBookmark={handleBookmarkClick}
                        />

                        <div className="my-blogs">
                            <h1 className="my-blogs-heading">My Blogs</h1>
                            <div className="blog-posts">
                                {localBlogs.length > 0 ? localBlogs.map((blog) => (
                                    <div key={blog.id} className="blog-post" onClick={() => handleArticleOrBlogClick(blog)}>
                                        <img src={blog.image || NoImg} alt={blog.title || "Blog post image"} />
                                        <h3>{blog.title}</h3>
                                        <div className="post-button">
                                            <button
                                                className="button-edit-post"
                                                onClick={(e) => handleEditLocalBlog(blog.id, e)}
                                                title="Edit Blog Post"
                                            >
                                                <i className="bx bxs-edit-alt"></i>
                                            </button>
                                            <button
                                                className="button-delete-post"
                                                onClick={(e) => handleDeleteLocalBlog(blog.id, e)}
                                                title="Delete Blog Post"
                                            >
                                                <i className="bx bxs-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                )) : (
                                    <p style={{ color: '#aaa', textAlign: 'center', padding: '1rem' }}>No blogs created yet. Click on "Aman's Blog" to write one!</p>
                                )}
                            </div>
                        </div>

                        <div className="weather-calendar">
                            <Weather />
                            <Calendar />
                        </div>
                    </div>

                    <footer className="news-footer">
                        <div className="footer-section footer-left">
                            <p className="app-name">News & Blogs App</p>
                        </div>
                        <div className="footer-section footer-center">
                            <div className="footer-links">
                                <Link to="/contact" className="footer-link">contact us</Link>
                                <Link to="/about" className="footer-link">about us</Link>
                            </div>
                            <div className="social-links">
                                <a href="#" className="social-icon" title="YouTube"><i className="fab fa-youtube"></i></a>
                                <a href="#" className="social-icon" title="Pinterest"><i className="fab fa-pinterest"></i></a>
                                <a href="#" className="social-icon" title="Instagram"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="social-icon" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#" className="social-icon" title="GitHub"><i className="fab fa-github"></i></a>
                            </div>
                        </div>
                        <div className="footer-section footer-right">
                            <p className="copyright-text">
                                <a href="https://www.copyright.gov.in/Documents/Copyrightrules1957.pdf" target="_blank" rel="noopener noreferrer">
                                    &copy; All rights Reserved. By <span className="truthspear-brand">TruthSpear</span>
                                </a>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default News;