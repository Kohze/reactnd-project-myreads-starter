import React from 'react';
import './App.css';
import { BrowserRouter as Route, Link, useRouteMatch, Redirect, useParams } from 'react-router-dom';

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

	render() {
		let bookResult =
			this.props.collection &&
			this.props.collection.length &&
			this.props.collection.map((x, i) => (
				<Grid key={'book' + i} item>
					<Book data={x} addFunc={this.props.addFunc} status="search" />
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
							autoFocus={true}
							style={{ color: 'white' }}
							value={this.props.searchTerm}
							onChange={(x, y) => {
								this.props.searchFunc(x.target.value);
							}}
						/>
					</Toolbar>
				</AppBar>
				<Grid container spacing={3}>
					{this.props.collection && this.props.collection.length && bookResult}
				</Grid>
			</div>
		);
	}
}

export default Search;
