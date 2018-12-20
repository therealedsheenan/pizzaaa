import { createAction } from 'redux-starter-kit';

export const addPizza = createAction('ADD_PIZZA');
export const removePizza = createAction('REMOVE_PIZZA');
export const toggleTopping = createAction('TOGGLE_TOPPING');
