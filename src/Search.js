import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, Redirect, useParams } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

import Book from './Book';

class Search extends React.Component {
	state = {
		collection: []
	};

	bookSearch(term) {
		BooksAPI.search(term).then((x) => this.setState({ collection: x }));
	}

	render() {
		console.log(this.state.collection);

		let bookResult = this.state.collection.map((x, i) => (
			<Grid key={'book' + i} item>
				<Book data={x} status="search" />
			</Grid>
		));

		return (
			<div style={{ flexGrow: 1 }}>
				<AppBar position="static" style={{ backgroundColor: 'white' }}>
					<Toolbar>
						<Link to="./">
							<Button variant="outlined" style={{ marginRight: 30 }}>
								Back
							</Button>
						</Link>
						<TextField
							label="Search a book"
							autoFocus = {true}
							style={{ color: 'white' }}
							value={this.state.searchTerm}
							onChange={(x, y) => {
								this.bookSearch(x.target.value);
							}}
						/>
					</Toolbar>
				</AppBar>
				<Grid container spacing={3}>
					{bookResult}
				</Grid>
			</div>
		);
	}
}

export default Search;
