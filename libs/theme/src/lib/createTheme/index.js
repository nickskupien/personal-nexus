import { merge } from 'lodash';
import theme from '../theme';

const createTheme = (overrides = {}) => {
  return merge({}, theme, overrides);
};

export default createTheme;
