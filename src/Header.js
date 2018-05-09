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
							Keep track of all your books. Designate each book to a shelf, and change them as you read
							more of your collection. Add more books to your shelf by selecting the add button. Be sure
							to only search for terms{' '}
							<a
								className="text-warning"
								href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md"
							>
								listed on the selected terms list
							</a>. For more information about the project see the{' '}
							<a
								className="text-warning"
								href="https://github.com/benjaminDanis/MyReads/blob/master/README.md"
							>
								READEME
							</a>.
						</h3>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
