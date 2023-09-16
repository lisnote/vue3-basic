import pkg from '@root/package.json';
export function clearStore() {
  const version = localStorage.getItem('version');
  if (pkg.version != version) {
    localStorage.clear();
    localStorage.setItem('version', pkg.version);
  }
}
