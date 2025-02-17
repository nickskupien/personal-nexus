import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: ${(props) => props.theme.spacing?.[props.$size]?.normal};
`;

function Spacing({ size = 'small' }) {
  return <Wrapper $size={size}></Wrapper>;
}

Spacing.propTypes = {};

export default Spacing;
