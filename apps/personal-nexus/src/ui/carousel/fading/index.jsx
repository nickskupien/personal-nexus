import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
`;

const Item = styled.div`
  grid-area: 1 / 1;
  transition: opacity 1s ease-in-out;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
`;

function FadingCarousel({
  items,
  children,
  duration = 5000,
  ...passthroughProps
}) {
  const [itemIndex, setItemIndex] = useState(0);
  const [prevItemIndex, setPrevItemIndex] = useState(null);
  const [isItemVisible, setIsItemVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsItemVisible(false);
      setPrevItemIndex(itemIndex);
      setItemIndex((itemIndex) => (itemIndex + 1) % items.length);
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [duration, items.length, itemIndex]);

  // animate in the first item
  useEffect(() => {
    if (isItemVisible) {
      return;
    }

    setIsItemVisible(true);
  }, [isItemVisible]);

  const currentItem = items?.[itemIndex];
  const prevItem = items?.[prevItemIndex];

  return (
    <Wrapper {...passthroughProps}>
      {prevItem !== undefined && (
        <Item key={prevItemIndex} $visible={false}>
          {prevItem}
        </Item>
      )}
      {currentItem !== undefined && (
        <Item key={itemIndex} $visible={isItemVisible}>
          {currentItem}
        </Item>
      )}
      {children}
    </Wrapper>
  );
}

FadingCarousel.propTypes = {};

export default FadingCarousel;
