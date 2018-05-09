import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Book from './Book';
import BookSearch from './BookSearch';
import BookShelf from './BookShelf';
import Header from './Header';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';

class BookApp extends Component {
  state = {
    books: {},
    allBooks: []
  };

  refreshBooks = () => {
    BooksAPI.getAll().then(books => {
      books.map(currentBook => {
        let nestedBook = { ...this.state.books };
        nestedBook[currentBook.id] = currentBook;
        const nestedObj = Object.assign(nestedBook);
        this.setState(prevState => ({
          books: nestedObj,
          allBooks: books
        }));
      });
      console.log(this.state);
    });
  };

  componentDidMount() {
    this.refreshBooks();
  }

  moveShelf = (book, toShelf, fromShelf) => {
    const index = this.state[fromShelf].indexOf(book);

    this.setState(prevState => ({
      [toShelf]: prevState[toShelf].concat(prevState[fromShelf].splice(index, 1))
    }));
  };

  render() {
    return (
      <div className="Book-App fluid-container">
        <Route
          exact
          path="/MyReads"
          render={() => {
            return (
              <div className="app-wrapper">
                <Header />
                <BookShelf refreshBooks={this.refreshBooks} currentShelf={this.state.books} />
              </div>
            );
          }}
        />

        <Route
          exact
          path="/MyReads/search"
          render={({ history }) => {
            return <BookSearch currentShelf={this.state.books} />;
          }}
        />
      </div>
    );
  }
}

export default BookApp;
