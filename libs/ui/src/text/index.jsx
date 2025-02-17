import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

const Wrapper = styled.span`
  color: ${(props) => props.$color};
  font-family: ${(props) => props.$typography?.fontFamily};
  font-size: ${(props) => props.$typography?.fontSize};
  font-weight: ${(props) => props.$typography?.fontWeight};
  text-transform: ${(props) => props.$typography?.textTransform};
  letter-spacing: ${(props) => props.$typography?.letterSpacing};
  line-height: ${(props) => props.$typography?.lineHeight};
  margin-top: ${(props) => props.$typography?.topSpace};
  margin-bottom: ${(props) => props.$typography?.bottomSpace};
  display: ${(props) => props.$display};
`;

function Text({
  type = 'paragraph',
  block,
  color: colorProp,
  elementType,
  children,
  ...passthroughProps
}) {
  const theme = useContext(ThemeContext);

  const typography = theme?.typography?.types?.[type];
  const display = block ? 'block' : null;
  const color = theme.colors?.[colorProp] ?? colorProp ?? typography?.color;

  return (
    <Wrapper
      {...passthroughProps}
      as={elementType}
      $typography={typography}
      $display={display}
      $color={color}
    >
      {children}
    </Wrapper>
  );
}

Text.propTypes = {};

export default Text;
