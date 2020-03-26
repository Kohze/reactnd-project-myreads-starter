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


class Book extends React.Component {
	state = {
        isActive: true,
	};


	render() {
        console.log(this.props.imageLink);

		return (
            
			<div style={{ flexGrow: 1 }}>
				<Card style={{maxWidth: 256, margin: 10}}>
                <CardActionArea>
                    <CardMedia
                    image={this.props.imageLink}
                    title="Contemplative Reptile"
                    />
                    <div className="book-cover" style={{ width: 256, height: 384, backgroundImage: `url(${this.props.imageLink})`, backgroundSize: '100%'}}></div>
                    <CardContent>
                    <Typography gutterBottom variant="p" component="h4">
                        {this.props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.subtitle}
                    </Typography>
                    <br/><br/>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b>
                         {this.props.authors}
                        </b>
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={() => {this.props.addFunction(this.props.title, this.props.subtitle, this.props.author)}} size="small" color="primary">
                     Add Book
                    </Button>
                </CardActions>
                </Card>
			</div>
		);
	}
}

export default Book;
