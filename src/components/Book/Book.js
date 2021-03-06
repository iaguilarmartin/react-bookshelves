import React from 'react';
import PropTypes from 'prop-types';

const Book = function (props) {
    const {book} = props;
    const title = book.title || '';
    const thumbnail = book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : '';
    const author = book.authors ? book.authors.join(', ') : '';

    return (
        <div className="book">
            <div className="book-top">
                <img className="book-cover" src={thumbnail} alt={title}/>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={e => props.onBookshelfChange(book, e.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{author}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onBookshelfChange: PropTypes.func.isRequired
};

export default Book;

