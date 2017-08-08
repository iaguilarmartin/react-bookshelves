import React from 'react';
import Book from '../Book/Book';
import PropTypes from 'prop-types';

const BooksGrid = function (props) {
    return (
        <ol className="books-grid">
            {props.books && props.books.map((book, index) => (
                <li key={book.id + index}>
                    <Book onBookshelfChange={props.onBookshelfChange} book={book}/>
                </li>
            ))}
        </ol>
    );
};

BooksGrid.propTypes = {
    books: PropTypes.array,
    onBookshelfChange: PropTypes.func.isRequired
};

export default BooksGrid;