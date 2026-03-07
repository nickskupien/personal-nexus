import React from 'react';
import PropTypes from 'prop-types';
import UnstyledText from '../text';
import styled, { css } from 'styled-components';

const Text = styled(UnstyledText)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.BLUE500};
  transition: color 0.2s ease-in-out;

  ${(props) =>
    !props.$disabled &&
    css`
      &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.BLUE600};
      }
    `}

  ${(props) =>
    props.$disabled &&
    css`
      cursor: default;
      color: ${props.theme.colors.GRAY300};
    `}
`;

function Link({ href, disabled, type, children, ...passthroughProps }) {
  if (disabled) {
    href = null;
  }

  return (
    <Text
      {...passthroughProps}
      elementType="a"
      type={type}
      href={href}
      $disabled={disabled}
    >
      {children}
    </Text>
  );
}

Link.propTypes = {};

export default Link;
