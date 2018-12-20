import React from 'react';
import { bindActionCreators } from 'redux';
import { Card, Image, Button, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addPizza, removePizza, toggleTopping } from '../actions';
import pizzaImage from '../pizza.png';

const Cart = ({ cart, actions }) => (
  <Card.Group className="cart-container">
    {cart.map(c => (
      <Card className="cart-item" key={c.id}>
        <Card.Content>
          <Button basic color="red" onClick={() => actions.removePizza(c.id)}>
            Remove
          </Button>
          <Image src={pizzaImage} />
          <Card.Header>{c.name}</Card.Header>
          <Card.Description>
            You can add
            {c.maxToppings ? ` maximum of ${c.maxToppings} ` : 'Unlimited'}
            toppings
          </Card.Description>
        </Card.Content>
        <Card.Content className="toppings">
          <div>
            <h2>Available toppings</h2>
            <div className="toppings-list">
              {c.toppings.map(t => (
                <Checkbox
                  key={t.id}
                  disabled={(() => {
                    if (c.maxToppings && !t.selected) {
                      return (
                        c.toppings.filter(top => top.selected, []).length >=
                        c.maxToppings
                      );
                    }
                    return false;
                  })()}
                  label={t.topping.name}
                  checked={t.selected}
                  type="checkbox"
                  id={`${t.id}-${t.topping.name}`}
                  name={t.topping.name}
                  value={t.topping.name}
                  onChange={() =>
                    actions.toggleTopping({
                      pizzaId: c.id,
                      toppingId: t.id
                    })
                  }
                />
              ))}
            </div>
          </div>
        </Card.Content>
      </Card>
    ))}
  </Card.Group>
);

Cart.defaultProps = {
  cart: [],
  actions: {}
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      basePrice: PropTypes.number,
      maxToppings: PropTypes.number,
      toppings: PropTypes.arrayOf(
        PropTypes.shape({
          defaultSelected: PropTypes.bool,
          __typename: PropTypes.string,
          topping: PropTypes.objectOf({
            name: PropTypes.string,
            price: PropTypes.number
          })
        })
      ),
      __typename: PropTypes.string
    })
  ),
  actions: PropTypes.shape({
    addPizza: PropTypes.func,
    removePizza: PropTypes.func,
    toggleTopping: PropTypes.func
  })
};

const mapStateToProps = ({ cart }) => ({ cart });

const mapDispatchToProps = dispatch => ({
  actions: {
    addPizza: bindActionCreators(addPizza, dispatch),
    removePizza: bindActionCreators(removePizza, dispatch),
    toggleTopping: bindActionCreators(toggleTopping, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
