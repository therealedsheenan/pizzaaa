import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Total = ({ total }) => (
  <div>
    <h1>
      Total:
      {total}
    </h1>
  </div>
);

Total.defaultProps = {
  total: 0
};

Total.propTypes = {
  total: PropTypes.number
};

const mapStateToProps = ({ cart }) => {
  return {
    total: cart
      .map(c => {
        const totalToppingsPrice = c.toppings
          .map(t => (t.selected ? t.topping.price : 0))
          .reduce((acc, curr) => acc + curr);
        return totalToppingsPrice + c.basePrice;
      }, [])
      .reduce((acc, curr) => acc + curr, 0)
  };
};

export default connect(mapStateToProps)(Total);
