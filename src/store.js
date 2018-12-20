import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { reduxBatch } from '@manaflair/redux-batch';

import cartReducer from './reducer';

export default apolloData => {
  const reducer = {
    pizza: (state = []) => state,
    cart: cartReducer,
    toppings: (state = []) => state
  };

  const middleware = [...getDefaultMiddleware()];

  const preloadedState = {
    pizza: apolloData.pizza,
    toppings: apolloData.pizza[0].toppings
  };

  const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [reduxBatch]
  });

  return store;
};
