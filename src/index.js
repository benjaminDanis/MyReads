import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import BookApp from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<BrowserRouter>
		<BookApp />
	</BrowserRouter>,
	document.getElementById('root')
);
registerServiceWorker();
