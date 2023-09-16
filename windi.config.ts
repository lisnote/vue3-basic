import { defineConfig } from 'windicss/helpers';
export default defineConfig({
  shortcuts: {
    icon: 'w-6',
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
});
