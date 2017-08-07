import React from 'react';
import BooksGrid from '../BooksGrid/BooksGrid';
import PropTypes from 'prop-types';

const Bookshelf = function (props) {
    const { name, books } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <BooksGrid books={books} onBookshelfChange={props.onBookshelfChange}/>
            </div>
        </div>
    );
};

Bookshelf.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onBookshelfChange: PropTypes.func.isRequired
};

export default Bookshelf;
