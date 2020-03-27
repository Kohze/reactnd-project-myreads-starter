import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './Search';
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			collection: '',
			books: ''
		};

		this.addBook = this.addBook.bind(this);
		this.bookSearch = this.bookSearch.bind(this);
		this.recombineEntries = this.recombineEntries.bind(this);
	}

	componentDidMount() {
		BooksAPI.getAll().then((x) => this.setState({ books: x }));
	}

	addBook(data, purpose) {
		BooksAPI.update(data, purpose);
		BooksAPI.getAll().then((x) => this.setState({ books: x }));
	}

	recombineEntries(x) {
		let xID = x && x.map((y) => y.id);
		let myBooks = this.state.books;
		let myBooksID = myBooks.map((y) => y.id);
		let intersection = myBooks.filter((y) => xID.includes(y.id));
		let newBooks = x.filter((y) => !myBooksID.includes(y.id));
		let searchResults = [ ...newBooks, ...intersection ];
		this.setState({ collection: searchResults });
	}

	bookSearch(term) {
		BooksAPI.search(term)
			.then((x) => {
				this.recombineEntries(x);
			})
			.catch(this.setState({ collection: '' }));
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => <BookShelf books={this.state.books} addFunc={this.addBook} />}
					/>
					<Route
						path="/search"
						render={(props) => (
							<Search
								books={this.state.books}
								collection={this.state.collection}
								searchFunc={this.bookSearch}
								addFunc={this.addBook}
							/>
						)}
					/>
				</Switch>
			</Router>
		);
	}
}

export default BooksApp;
