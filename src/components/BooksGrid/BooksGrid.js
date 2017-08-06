import React from 'react';
import Book from '../Book/Book';

const BooksGrid = function (props) {
    return (
        <ol className="books-grid">
            {props.books.map(book => (
                <li key={book.id}>
                    <Book book={book}/>
                </li>
            ))}
        </ol>
    );
};

export default BooksGrid;