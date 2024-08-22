'use client';

import { createTheme, rem } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Alata, sans-serif',
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  colors: {
    blue: [
      '#e3f5ff',
      '#cde4ff',
      '#9dc7ff',
      '#67a8fb',
      '#3c8ef9',
      '#1f7df8',
      '#0775f8',
      '#0063de',
      '#0058c8',
      '#004cb1',
    ],
  },
});

export default theme;
