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
		searchTerm: '',
		collection: []
	};

	bookSearch(term) {
		BooksAPI.search(term).then((x) => this.setState({ collection: x }));
  }
  
  addBook(id, title, subtitle, author){
    BooksAPI.update({"id": id, "title": title, "subtitle": subtitle, "author": author}, 'wantToRead')
  }

	render() {
		console.log(this.state.collection);

		let bookResult = this.state.collection.map((x, i) => (
      <Grid key={"book" + i} item >
        <Book
          title={x.title}
          subtitle={x.subtitle}
          imageLink={x.imageLinks.thumbnail}
          authors={x.authors ? x.authors.toString() : x.publisher}
          id={x.industryIdentifiers[1].identifier}
          addFunction={() => this.addBook()}
        />
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
							placeholder="Search…"
							style={{ color: 'white' }}
							value={this.state.searchTerm}
							onChange={(x, y) => {
								this.bookSearch(x.target.value);
								this.setState({ searchTerm: x.target.value });
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
