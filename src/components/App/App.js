import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Search from '../Search/Search';
import * as BooksAPI from '../../utils/BooksAPI';
import Bookshelf from '../Bookshelf/Bookshelf';

class BooksApp extends React.Component {

    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.setState({
                    books
                })
            })
            .catch(err => {
                console.error("Error getting books from API service", err);
            });
    }

    render() {
        const currentlyReadingBooks = this.state.books.filter(book => book.shelf === 'currentlyReading');
        const wantToReadBooks = this.state.books.filter(book => book.shelf === 'wantToRead');
        const readBooks = this.state.books.filter(book => book.shelf === 'read');

        return (
            <div className="app">
                <Route path="/search" render={() => (
                   <Search books={this.state.books}/>
                )} />

                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Bookshelf name="Currently Reading" books={currentlyReadingBooks}/>
                                <Bookshelf name="Want to Read" books={wantToReadBooks}/>
                                <Bookshelf name="Read" books={readBooks}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )} />
            </div>
        )
    }
}

export default BooksApp
