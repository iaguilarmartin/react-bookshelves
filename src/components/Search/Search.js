import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from '../BooksGrid/BooksGrid';
import * as BooksAPI from '../../utils/BooksAPI';
import PropTypes from 'prop-types';
import {debounce} from 'throttle-debounce';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: null,
            pendingRequests: 0
        };

        this.search = debounce(500, this.search);
    }

    handleOnChange(event) {
        const query = event.target.value;
        this.search(query);
    }

    search(query) {
        if (query.length === 0) {
            this.setState({books: []});
            return;
        }

        this.setState(state => ({pendingRequests: state.pendingRequests + 1}));

        BooksAPI.search(query, 20)
            .then(response => {
                let books = response.error ? [] : response;

                books = books.map(book => {
                    const existingBook = this.props.books.find(b => b.id === book.id);
                    book.shelf = existingBook && existingBook.shelf ? existingBook.shelf : 'none';
                    return book;
                });

                this.setState(state => ({books, pendingRequests: state.pendingRequests - 1}));
            })
            .catch(err => {
                this.setState(state => ({pendingRequests: state.pendingRequests - 1}));
                console.error('Error searching books using API service with query: ' + query, err)
            });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.handleOnChange.bind(this)}/>
                        {this.state.pendingRequests > 0 && (<div className="search-books-input-animation" />)}
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.books !== null && this.state.books.length === 0 && (
                        <div className="search-no-results">The search returned 0 results</div>
                    )}

                    <BooksGrid books={this.state.books} onBookshelfChange={this.props.onBookshelfChange}/>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    books: PropTypes.array.isRequired,
    onBookshelfChange: PropTypes.func.isRequired
};

export default Search;
