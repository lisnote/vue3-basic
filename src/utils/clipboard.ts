export async function copyText(str: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(str);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
  return;
}
