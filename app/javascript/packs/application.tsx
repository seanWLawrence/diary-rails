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

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
