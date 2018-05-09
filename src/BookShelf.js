import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

import * as BooksAPI from './BooksAPI';

class BookShelf extends Component {
	state = {
		currentlyReading: [],
		wantToRead: [],
		read: [],
		shelfBooks: {}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		const shelfBooksObj = Object.assign(nextProps.currentShelf);

		const newState = {
			currentlyReading: prevState.currentlyReading,
			wantToRead: prevState.wantToRead,
			read: prevState.read,
			shelfBooks: shelfBooksObj
		};

		return newState;
	}

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			books.map(book => {
				const shelf = book.shelf;
				this.setState(prevState => ({
					[shelf]: prevState[shelf].concat(book)
				}));
			});
		});
	}

	moveShelf = (book, toShelf, fromShelf) => {
		const index = this.state[fromShelf].indexOf(book);
		BooksAPI.update(book, toShelf).then(results => {
			this.setState(prevState => ({
				[toShelf]: prevState[toShelf].concat(prevState[fromShelf].splice(index, 1))
			}));
			this.props.refreshBooks();
		});
	};

	render() {
		return (
			<div className="case">
				<div className="shelf row">
					<div className="col-10 mx-auto">
						<div className="row">
							<div className="col-4 my-auto shelf-title-block">
								<div className="row">
									<div className="my-auto shelf-title-col col">
										<h3 className="my-auto shelf-title">Currently Reading</h3>
										<div className="underline-div" />
									</div>
								</div>
							</div>
							<ol className="col-8 shelf-list">
								{this.state.currentlyReading.map(currentBook => (
									<li key={currentBook.id} className="book-list-item">
										<Book
											key={currentBook.id}
											currentBook={currentBook.title}
											onMoveShelf={this.moveShelf}
											status="currentlyReading"
											bookCover={currentBook.imageLinks.thumbnail}
											bookObj={currentBook}
										/>
									</li>
								))}
							</ol>
						</div>
					</div>
					<hr />
				</div>

				<div className="shelf row">
					<div className="col-10 mx-auto">
						<div className="row">
							<div className="col-4 my-auto shelf-title-block">
								<h3 className="shelf-title">Want to Read</h3>
							</div>
							<ol className="col-8 shelf-list">
								{this.state.wantToRead.map(currentBook => (
									<li key={currentBook.id} className="book-list-item">
										<Book
											currentBook={currentBook.title}
											onMoveShelf={this.moveShelf}
											status="wantToRead"
											bookCover={currentBook.imageLinks.thumbnail}
											bookObj={currentBook}
										/>
									</li>
								))}
							</ol>
						</div>
					</div>
					<hr />
				</div>

				<div className="shelf row">
					<div className="col-10 mx-auto">
						<div className="row">
							<div className="col-4 my-auto shelf-title-block">
								<h3 className="shelf-title">Already Read</h3>
							</div>
							<ol className="col-8 shelf-list">
								{this.state.read.map(currentBook => (
									<li key={currentBook.id} className="book-list-item">
										<Book
											currentBook={currentBook.title}
											onMoveShelf={this.moveShelf}
											status="read"
											bookCover={currentBook.imageLinks.thumbnail}
											bookObj={currentBook}
										/>
									</li>
								))}
							</ol>
						</div>
					</div>
					<hr />
				</div>

				<div>
					<Link to="/MyReads/search" className="search-new-book" />
				</div>
			</div>
		);
	}
}

export default BookShelf;
