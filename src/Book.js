import React from 'react';
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

	render() {
		const actionSwitch = (
			<FormControl>
				<InputLabel id="demo-simple-select-label">
					{this.props.data.shelf ?  this.props.data.shelf : 'Add Book'}
				</InputLabel>
				<Select
					style={{ width: 200 }}
					label={this.props.data.shelf ? this.props.data.shelf : 'Add Book'}
					value= {this.props.status === 'search' ? this.state.inputValue : this.state.inputValue }
					onChange={(x) => {
						this.props.addFunc(this.props.data, x.target.value);
                        this.setState({ inputValue: x.target.value });
                        this.props.status === 'search' && this.setState({ isActive: false });
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
							<h4>
								{this.props.data && this.props.data.title && this.props.data.title}
                            </h4>
							<h6>
								{this.props.data && this.props.data.subtitle && this.props.data.subtitle}
                            </h6>
							<br />
							<br />
							<h6>
								<b>{this.props.data && this.props.data.authors && this.props.data.authors}</b>
                            </h6>
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
