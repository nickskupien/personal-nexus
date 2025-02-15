import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.span`
  font-size: 14px;
  color: #333;
`;

function index({ children }) {
  return <Text>{children}</Text>;
}

index.propTypes = {};

export default index;
