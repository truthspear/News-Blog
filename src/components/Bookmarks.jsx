import React from 'react'
import './Model.css'
import demoImg from '../assets/images/demo.jpg'
import './Bookmarks.css'

const Bookmarks = () => {
    return (
        <div className='model-overlay'>
            <div className="model-content"><span className="close-button">
                <i className="fa-solid fa-xmark"></i>
            </span>
                <h2 className="bookmarks-heading">Bookmarked News</h2>
                <div className="bookmarks-list">
                    <div className="bookmark-item">
                        <img src={demoImg} alt="Bookmark Image" />
                     <h3>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, cum?</h3>
                        <span className='delete-button'>
                            <i className="fa-regular fa-circle-xmark"></i></span>   
                    </div>
                    <div className="bookmark-item">
                        <img src={demoImg} alt="Bookmark Image" />
                     <h3>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, cum?</h3>
                        <span className='delete-button'>
                            <i className="fa-regular fa-circle-xmark"></i></span>   
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Bookmarks