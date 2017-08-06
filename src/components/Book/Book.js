import React from 'react';

const Book = function (props) {
    const {book} = props;
    const author = book.authors.join(', ');

    return (
        <div className="book">
            <div className="book-top">
                <img className="book-cover" src={book.imageLinks.smallThumbnail} alt={book.title}/>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={e => props.onBookshelfChange(book.id, e.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{author}</div>
        </div>
    );
};

export default Book;

