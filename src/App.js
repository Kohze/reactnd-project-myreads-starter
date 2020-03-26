import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
  useParams
} from "react-router-dom";
import BookShelf from './BookShelf';
import Search from './Search';

export default function BooksApp() {
  return (
    <Router>
      <Switch>
      
        <Route exact path='/' component={BookShelf} />
        <Route path='/search' component={Search} />
 
      </Switch>
    </Router>
  );
}
