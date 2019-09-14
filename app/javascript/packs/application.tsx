import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Entries } from '../pages/entries';

import './reset.css';
import './index.css';

let client = new ApolloClient({
  uri: '/graphql',
});

let App: FC<{}> = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/entries" component={Entries} name="Entries" />
      </Router>
    </ApolloProvider>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  );
});
