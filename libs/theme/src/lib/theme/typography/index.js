import colors from '../colors';

const baseTypography = {
  color: colors.GRAY600,
};

const fonts = {
  primary: {
    fontFamily: '"Poppins",Arial,sans-serif',
  },
  secondary: {
    fontFamily: '"Karla",Arial,sans-serif',
  },
};

export default {
  types: {
    title: {
      ...baseTypography,
      ...fonts.primary,
      fontSize: '48px',
      fontWeight: 600,
      lineHeight: '1.3',
      bottomSpace: '8px',
      topSpace: '8px',
    },
    h1: {
      ...baseTypography,
      ...fonts.primary,
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '',
      bottomSpace: '8px',
      topSpace: '8px',
    },
    h2: {
      fontSize: '24px',
      ...baseTypography,
      ...fonts.primary,
      fontWeight: 600,
      lineHeight: '',
      bottomSpace: '8px',
      topSpace: '8px',
    },
    h3: {
      ...baseTypography,
      ...fonts.primary,
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '3px',
      lineHeight: '',
      bottomSpace: '',
      topSpace: '',
    },
    h4: {
      ...baseTypography,
      ...fonts.primary,
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '',
      bottomSpace: '',
      topSpace: '',
    },
    paragraph: {
      ...baseTypography,
      ...fonts.secondary,
      fontSize: '16px',
      color: colors.GRAY500,
      lineHeight: '1.8',
    },
  },
};
