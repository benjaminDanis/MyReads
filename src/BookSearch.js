import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

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
				query: query.trim()
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
								<Link to="/MyReads" className="book-search-back-arrow" />
								<div className="input-group">
									<input
										className="pl-5 form-control form-control-lg book-search-input"
										onChange={event => {
											this.updateQuery(event.target.value);
										}}
									/>
								</div>
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
								<Link to="/MyReads" className="book-search-back-arrow" />
								<div className="input-group">
									<input
										placeholder="Search..."
										className="pl-5 form-control form-control-lg book-search-input"
										onChange={event => {
											this.updateQuery(event.target.value);
										}}
									/>
								</div>
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
