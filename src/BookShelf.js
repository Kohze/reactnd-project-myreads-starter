import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Book from './Book';


class BookShelf extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount(){
    BooksAPI.getAll().then((x) => this.setState({ books: x }));
  }


  render() {
    console.log(this.state.books);

    const myBooks = this.state.books.map((x, i) => (
      <Grid key={"book" + i} item >
        <Book
          title={x.title}
          subtitle={x.subtitle}
          imageLink={x.imageLinks.thumbnail}
          authors={x.authors ? x.authors.toString() : x.publisher}
          id={x.id}
        />
        </Grid> 
		)); 

    return (
      <div className="app">
      <Grid container spacing={3}>
         {myBooks}
      </Grid>
      </div>
    )
  }
}

export default BookShelf
