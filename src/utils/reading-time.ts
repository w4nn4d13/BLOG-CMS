export function getReadingTime(content: string): { minutes: number; words: number } {
  const words = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~`>|]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 200));
  return { minutes, words };
}
