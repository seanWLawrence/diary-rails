import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React, { FC, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ErrorBoundary from '../components/error-boundary';
import Loader from '../components/loader/';
let Entries = lazy(() => import('../pages/entries'));
let EditEntry = lazy(() => import('../pages/entries/edit'));
let NewEntry = lazy(() => import('../pages/entries/new'));

import '../lib/index.sass';

let client = new ApolloClient({
  uri: '/graphql',
});

let App: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <ApolloProvider client={client}>
          <Router>
            <Route exact path="/entries" component={Entries} name="Entries" />
            <Route
              exact
              path="/entries/new"
              component={NewEntry}
              name="NewEntry"
            />
            <Route
              path="/entries/:id/edit"
              component={EditEntry}
              name="EditEntry"
            />
          </Router>
        </ApolloProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  );
});
