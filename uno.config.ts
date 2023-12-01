import { defineConfig, presetAttributify, presetUno } from 'unocss';
export default defineConfig({
  presets: [presetAttributify(), presetUno()],
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  rules: [['ellipsis', { overflow: 'hidden', 'text-overflow': 'ellipsis' }]],
});
