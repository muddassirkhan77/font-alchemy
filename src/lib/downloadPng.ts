export interface DownloadPngOptions {
  fontSize?: number;
  color?: string;
  minWidth?: number;
}

export const downloadPng = async (
  text: string,
  filename: string,
  options: DownloadPngOptions = {}
): Promise<void> => {
  const { fontSize = 80, color = '#FFFFFF', minWidth = 1200 } = options;

  if (document.fonts) {
    await document.fonts.ready;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const padding = 80;

  const fontFamily = "'Segoe UI', 'Apple Color Emoji', 'Noto Color Emoji', Arial, sans-serif";

  ctx.font = `${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;

  canvas.width = Math.max(minWidth, Math.ceil(textWidth + padding * 2));
  canvas.height = Math.ceil(fontSize * 1.8 + padding * 2);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
