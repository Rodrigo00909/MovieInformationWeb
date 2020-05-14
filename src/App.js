import React from 'react';
import {Layout} from 'antd';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MenuTop from './components/MenuTop';

// Pages
import Home from './pages/home.jsx';
import NewMovies from './pages/new-movies.jsx';
import Popular from './pages/popular.jsx';
import Search from './pages/search.jsx';
import Movie from './pages/movie.jsx';
import Error404 from './pages/error404.jsx';

export default function App() {
  const { Header , Content } = Layout;
  return (
    <Layout>
      <Router>
       <Header>
         <MenuTop></MenuTop>
       </Header>

       <Content>
        <Switch>
          <Route path="/" exact={true}>
            <Home/>
          </Route>
          <Route path="/new-movies" exact={true}>
            <NewMovies/>
          </Route>
          <Route path="/popular" exact={true}>
            <Popular/>
          </Route>
          <Route path="/search" exact={true}>
            <Search/>
          </Route>
          <Route path="/movie/:id" exact={true}>
            <Movie/>
          </Route>
          <Route path="*">
            <Error404/>
          </Route>
        </Switch>
       </Content>

      </Router>
    </Layout>
  );
}


