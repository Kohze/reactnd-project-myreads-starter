import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Book extends React.Component {
	state = {
		isActive: true,
		inputValue: ''
	};

	addBook(data, purpose, deleteAfter = false) {
        BooksAPI.update(data, purpose);
        
		deleteAfter && this.setState({ isActive: false });
	}

	render() {
		console.log(this.props.data);

		const actionSwitch =
			this.props.status === 'search' ? (
				<Button onClick={() => this.addBook(this.props.data, 'wantToRead', true)} size="small" color="primary">
					Add Book
				</Button>
			) : (
				<FormControl>
					<InputLabel id="demo-simple-select-label">move</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						style={{ width: 150 }}
						id="demo-simple-select"
						label="move"
						value={this.state.inputValue}
						onChange={(x) => {
							this.addBook(this.props.data, x.target.value);
							this.setState({ inputValue: x.target.value });
						}}
					>
						<MenuItem value={'currentlyReading'}>Currently Reading</MenuItem>
						<MenuItem value={'wantToRead'}>Want To Read</MenuItem>
						<MenuItem value={'read'}>Read</MenuItem>
						<MenuItem value={'none'}>None</MenuItem>
					</Select>
				</FormControl>
			);

		const bookDisplay = (
			<div style={{ flexGrow: 1 }}>
				<Card style={{ mninHeight: 550, maxWidth: 256, margin: 10 }}>
					<CardActionArea>
						<div
							className="book-cover"
							style={{
								width: 256,
								height: 384,
								backgroundImage: `url(${this.props.data &&
									this.props.data.imageLinks &&
									this.props.data.imageLinks.thumbnail})`,
								backgroundSize: '100%'
							}}
						/>
						<CardContent>
							<Typography gutterBottom variant="p" component="h4">
								{this.props.data && this.props.data.title && this.props.data.title}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="body1">
								{this.props.data && this.props.data.subtitle && this.props.data.subtitle}
							</Typography>
							<br />
							<br />
							<Typography variant="body2" color="textSecondary" component="body1">
								<b>{this.props.data && this.props.data.authors && this.props.data.authors}</b>
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>{actionSwitch}</CardActions>
				</Card>
			</div>
		);

		return <div>{this.state.isActive && bookDisplay}</div>;
	}
}

export default Book;
