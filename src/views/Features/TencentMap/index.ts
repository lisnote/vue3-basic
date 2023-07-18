import TencentMap from './TencentMap.vue';

await new Promise((resolve) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src =
    'https://map.qq.com/api/gljs?v=1.exp&libraries=tools&key=QWIBZ-DQXE2-SB4UD-CHVBZ-IUSTF-GCFP6';
  document.body.appendChild(script);
  script.addEventListener('load', () => {
    resolve(window.TMap);
  });
});
const TMap = window.TMap;
export { TencentMap as default, TMap };
