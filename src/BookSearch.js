import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';

class BookSearch extends Component {
	state = {
		query: '',
		shelfBooks: {},
		books: []
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		var shelfBookObj = Object.assign(nextProps.currentShelf);

		const newState = {
			query: prevState.query,
			shelfBooks: shelfBookObj,
			books: prevState.books
		};

		return newState;
	}

	updateQuery = query => {
		this.setState(
			() => ({
				query: query.replace(/ /g, '%20')
			}),
			() => this.runQuery(this.state.query.toLowerCase())
		);
	};

	runQuery = query => {
		if (this.state.query !== '') {
			BooksAPI.search(query).then(books => {
				if (books) {
					if (books.length > 0) {
						this.setState(() => ({
							books: books
						}));
					} else {
						this.setState(() => ({
							books: []
						}));
					}
				}
			});
		} else {
			this.setState(() => ({
				books: []
			}));
		}
	};

	moveShelf = (book, toShelf, fromShelf) => {
		BooksAPI.update(book, toShelf).then(results => {
			console.log(results);
		});
	};

	render() {
		// console.log('from render', this.state.shelfBooks);
		if (this.state.books.length > 0 && this.state.query !== '') {
			return (
				<div className="book-search-div">
					<div className="row">
						<div className="mx-auto col-10">
							<form>
								<Link to="/" className="book-search-back-arrow" />
								<input
									className="form-control form-control-lg book-search-input"
									onChange={event => {
										this.updateQuery(event.target.value);
									}}
								/>
								<small className="form-text text-muted">
									Showing {this.state.books.length} results for {this.state.query}
								</small>
							</form>
						</div>
					</div>

					<div className="mt-5 row">
						<div className="col-10 mx-auto">
							<div className="row">
								{this.state.books.map(currentBook => {
									return (
										<div className="col-4">
											<Book
												bookObj={currentBook}
												key={currentBook.id}
												onMoveShelf={this.moveShelf}
												status={
													this.state.shelfBooks[currentBook.id]
														? this.state.shelfBooks[currentBook.id].shelf
														: 'none'
												}
												bookCover={currentBook.imageLinks && currentBook.imageLinks.thumbnail}
											/>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="book-search-div">
					<div className="row">
						<div className="mx-auto col-10">
							<form>
								<Link to="/" className="book-search-back-arrow" />
								<input
									placeholder="Search..."
									className="form-control form-control-lg book-search-input"
									onChange={event => {
										this.updateQuery(event.target.value);
									}}
								/>
								<small className="form-text text-muted">
									Showing {this.state.books.length} results for{' '}
									{this.state.query ? this.state.query : ' ...'}
								</small>
							</form>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default BookSearch;
