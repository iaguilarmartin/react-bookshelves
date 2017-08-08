import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Search from '../Search/Search';
import * as BooksAPI from '../../utils/BooksAPI';
import BooksList from '../BooksList/BooksList';

class BooksApp extends React.Component {

    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => this.setState({books}))
            .catch(err => console.error("Error getting books from API service", err));
    }

    handleBookshelfChange = (book, shelf) => {
        book.shelf = shelf;

        BooksAPI.update(book, shelf)
            .then(() => console.log("Book shelf updated successfully"))
            .catch(err => console.error("Error updating book shelf using API service", err));

        this.setState(state => {
            let books = state.books.filter(b => book.id !== b.id);

            if (shelf !== 'none') {
                books = books.concat([book]);
            }

           return {books};
        });
    };

    render() {
        return (
            <div className="app">
                <Route path="/search" render={() => (
                   <Search books={this.state.books} onBookshelfChange={this.handleBookshelfChange}/>
                )} />

                <Route exact path="/" render={() => (
                    <BooksList books={this.state.books} onBookshelfChange={this.handleBookshelfChange}/>
                )} />
            </div>
        )
    }
}

export default BooksApp;
