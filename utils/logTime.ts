
const pad2 = (n: number) => { return n < 10 ? '0' + n : n }

/**打点归因 */
export const getLogTime = () => {
  const date = new Date();
  return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
}
