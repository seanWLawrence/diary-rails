import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { EditEntry, Entries, NewEntry } from '../pages/entries';

import '../lib/index.sass';

let client = new ApolloClient({
  uri: '/graphql',
});

let App: FC = () => (
  <ApolloProvider client={client}>
    <Router>
      <Route exact path="/entries" component={Entries} name="Entries" />
      <Route exact path="/entries/new" component={NewEntry} name="NewEntry" />
      <Route path="/entries/:entryId" component={EditEntry} name="EditEntry" />
    </Router>
  </ApolloProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  );
});
