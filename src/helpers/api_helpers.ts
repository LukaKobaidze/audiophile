export function getLastRoute(path: string) {
  const str = path[path.length - 1] === '/' ? path.slice(0, -1) : path;

  return str.slice(str.lastIndexOf('/') + 1)
}
