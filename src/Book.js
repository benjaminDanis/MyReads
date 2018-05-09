import React, { Component } from 'react';

class Book extends Component {
	state = {
		status: ''
	};

	handleShelfChange = (book, toShelf, fromShelf) => {
		this.props.onMoveShelf(book, toShelf, fromShelf);
		this.setState(() => ({
			status: toShelf
		}));
	};

	componentDidMount() {
		this.setState(() => ({
			status: this.props.status
		}));
	}

	render() {
		return (
			<div className="book-list-item-div mx-4">
				<div className="row mt-2">
					<div className="col mx-auto">
						<h5 className="book-title">{this.props.bookObj.title}</h5>
						<img
							className="mx-auto"
							src={this.props.bookCover ? this.props.bookCover : 'http://via.placeholder.com/120x200'}
							alt="book cover"
						/>
						<div className="input-group ">
							<select
								id="select-input"
								onChange={event => {
									this.handleShelfChange(this.props.bookObj, event.target.value, this.props.status);
								}}
								className="custom-select col-3 book-state-select"
								value={this.state.status}
							>
								<option>Select an Option</option>
								<option value="currentlyReading">Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Book;
