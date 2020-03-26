import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import Book from './Book';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

class BookShelf extends React.Component {
	state = {
		books: '',
		showSearchPage: false
	};

	componentDidMount() {
		BooksAPI.getAll().then((x) => this.setState({ books: x }));
  }
  
  componentWillUpdate() {
    BooksAPI.getAll().then((x) => this.setState({ books: x }));
  }

	render() {
		console.log(this.state.books);

		const myBooks =
			this.state.books &&
			this.state.books.map((x, i) => (
				<Grid key={'book' + i} item>
					<Book data={x} status="bookView" />
				</Grid>
			));

		const currentlyReadingShelf =
		this.state.books && this.state.books.filter((x) => x.shelf === 'currentlyReading');
		const wantToReadShelf = this.state.books && this.state.books.filter((x) => x.shelf === 'wantToRead');
		const readShelf = this.state.books && this.state.books.filter((x) => x.shelf === 'read');

		return (
			<div className="app">
				<AppBar position="static" style={{ backgroundColor: 'white' }}>
					<Toolbar>
						<Link to="./search">
							<Button variant="outlined" style={{ marginRight: 30 }}>
								Add New Book
							</Button>
						</Link>
					</Toolbar>
				</AppBar>
				<Card style={{ width: '100%', height: 50, textAlign: 'centered' }}>
					
					<h2> Currently Reading </h2>
				</Card>
				<Grid container spacing={3}>
					{currentlyReadingShelf &&
						currentlyReadingShelf.map((x, i) => (
							<Grid key={'book' + i} item>
								<Book data={x} status="bookView" />
							</Grid>
						))}
				</Grid>
				<Card style={{ width: '100%', height: 50, textAlign: 'centered' }}>
					
					<h2> Want To Read </h2>
				</Card>
				<Grid container spacing={3}>
					{wantToReadShelf &&
						wantToReadShelf.map((x, i) => (
							<Grid key={'book' + i} item>
								<Book data={x} status="bookView" />
							</Grid>
						))}
				</Grid>
				<Card style={{ width: '100%', height: 50, textAlign: 'centered' }}>
					
					<h2> Read </h2>
				</Card>
				<Grid container spacing={3}>
					{readShelf &&
						readShelf.map((x, i) => (
							<Grid key={'book' + i} item>
								<Book data={x} status="bookView" />
							</Grid>
						))}
				</Grid>
			</div>
		);
	}
}

export default BookShelf;
