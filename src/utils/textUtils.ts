export function capitalizeName(name: string):string {
  return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
}