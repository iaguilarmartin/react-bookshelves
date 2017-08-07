import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from '../BooksGrid/BooksGrid';
import * as BooksAPI from '../../utils/BooksAPI';
import PropTypes from 'prop-types';

class Search extends Component {

    state = {
        books: null,
        searching: false
    };

    handleKeyPress(event) {
        if(event.key === 'Enter') {
            const query = event.target.value;

            if (query.length === 0) {
                this.setState({books: []});
                return;
            }

            event.target.value = '';
            this.setState({searching:true});

            BooksAPI.search(query, 20)
                .then(response => {
                    let books = response.error ? [] : response;

                    books = books.map(book => {
                        const existingBook = this.props.books.find(b => b.id === book.id);
                        book.shelf = existingBook && existingBook.shelf ? existingBook.shelf : 'none';
                        return book;
                    });

                    this.setState({books, searching:false})
                })
                .catch(err => console.error('Error searching books using API service with query: ' + query, err));
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onKeyPress={e => this.handleKeyPress(e)}/>
                        {this.state.searching && (<div className="search-books-input-animation" />)}
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
};

Search.propTypes = {
    books: PropTypes.array.isRequired,
    onBookshelfChange: PropTypes.func.isRequired
};

export default Search;
