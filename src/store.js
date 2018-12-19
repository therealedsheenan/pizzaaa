import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { reduxBatch } from '@manaflair/redux-batch'

import todosReducer from './reducers/todos'

const reducer = {
  todos: todosReducer
}

const middleware = [...getDefaultMiddleware()]

const preloadedState = {
  todos: [
    {
      text: 'Eat Pizza',
      completed: true
    }
  ],
  visibilityFilter: 'SHOW_COMPLETED'
}

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [reduxBatch]
})

export default store
