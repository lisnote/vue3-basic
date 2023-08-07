export async function installVConsole() {
  if (import.meta.env.DEV && navigator.userAgent.includes('Mobile')) {
    const VConsole = (await import('vconsole')).default;
    new VConsole();
  }
}
