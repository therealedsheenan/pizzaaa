import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { addPizza } from '../actions';

const Pizza = ({ pizza, actions }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Pizza size</Table.HeaderCell>
        <Table.HeaderCell>Base Price</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {pizza.map(pza => (
        <Table.Row key={pza.name}>
          <Table.Cell>{pza.name}</Table.Cell>
          <Table.Cell>{pza.basePrice}</Table.Cell>
          <Table.Cell>
            <Button onClick={() => actions.addPizza(pza)}>
              <Icon name="shop" />
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

Pizza.defaultProps = {
  pizza: [],
  actions: {}
};

Pizza.propTypes = {
  pizza: PropTypes.arrayOf(
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
    addPizza: PropTypes.func.isRequired
  })
};

const mapStateToProps = ({ pizza }) => ({ pizza });

const mapDispatchToProps = dispatch => ({
  actions: {
    addPizza: bindActionCreators(addPizza, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pizza);
