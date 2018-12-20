import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, Query } from 'react-apollo';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { Loader } from 'semantic-ui-react';

import './index.css';
import store from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: 'http://core-graphql.dev.waldo.photos/pizza'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          pizza: pizzaSizes {
            name
            basePrice
            maxToppings
            toppings {
              pizzaSize {
                maxToppings
              }
              defaultSelected
              topping {
                name
                price
              }
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loader active inline="centered" />;
        if (error) return <p>Error :(</p>;
        return (
          <Provider store={store(data)}>
            <App />
          </Provider>
        );
      }}
    </Query>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
