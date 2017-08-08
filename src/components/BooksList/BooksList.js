import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../Bookshelf/Bookshelf';
import PropTypes from 'prop-types';

const BooksList = function (props) {
    const currentlyReadingBooks = props.books.filter(book => book.shelf === 'currentlyReading');
    const wantToReadBooks = props.books.filter(book => book.shelf === 'wantToRead');
    const readBooks = props.books.filter(book => book.shelf === 'read');

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Bookshelf name="Currently Reading" books={currentlyReadingBooks} onBookshelfChange={props.onBookshelfChange}/>
                    <Bookshelf name="Want to Read" books={wantToReadBooks} onBookshelfChange={props.onBookshelfChange}/>
                    <Bookshelf name="Read" books={readBooks} onBookshelfChange={props.onBookshelfChange}/>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

BooksList.propTypes = {
    books: PropTypes.array.isRequired,
    onBookshelfChange: PropTypes.func.isRequired
};

export default BooksList;
