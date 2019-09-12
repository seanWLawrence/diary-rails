import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';

let Entries = () => <h1>Entries</h1>;

const client = new ApolloClient({
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
