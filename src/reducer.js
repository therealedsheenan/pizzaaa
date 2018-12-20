const getRandomNumber = () => Math.floor(Math.random() * 99999999);

const cartReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'ADD_PIZZA':
      return [
        ...state,
        {
          id: getRandomNumber(),
          name: payload.name,
          basePrice: payload.basePrice,
          maxToppings: payload.maxToppings,
          toppings: [
            // adding additional object for default selected
            ...payload.toppings.map(t => {
              if (t.defaultSelected) {
                return {
                  ...t,
                  selected: true,
                  id: getRandomNumber()
                };
              }
              return {
                ...t,
                id: getRandomNumber()
              };
            })
          ]
        }
      ];
    case 'REMOVE_PIZZA':
      return state.filter(pizza => pizza.id !== payload);
    case 'TOGGLE_TOPPING':
      return state.map(pizza => {
        if (pizza.id === payload.pizzaId) {
          return {
            ...pizza,
            toppings: pizza.toppings.map(t => {
              if (t.id === payload.toppingId) {
                return {
                  ...t,
                  selected: !t.selected
                };
              }
              return t;
            })
          };
        }

        return pizza;
      });
    default:
      return state;
  }
};

export default cartReducer;
