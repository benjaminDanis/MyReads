import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<div className="header-container">
				<div className="row">
					<div className="col-6">
						<div className="row ml-1">
							<h1 className="display-1 my-reads-header">My Reads</h1>
							<div className="book-logo" />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<h3 className="lead my-reads-subtitle">
							Keep track of all the books you've read, want to read, or are currently reading. To browse
							for new books, click the plus button, and select the shelf you would like to place each book
							in.
						</h3>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
