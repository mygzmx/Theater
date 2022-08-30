const pad2 = (n: number) => {
  return n < 10 ? '0' + n : n;
};

/**打点归因 */
export const getLogTime = () => {
  const date = new Date();
  return (
    date.getFullYear().toString() +
    pad2(date.getMonth() + 1) +
    pad2(date.getDate()) +
    pad2(date.getHours()) +
    pad2(date.getMinutes()) +
    pad2(date.getSeconds())
  );
};

function rnd(n: number,m: number) {
  return parseInt(String(Math.random() * (m - n + 1)), 10)+n;
}

/**
 * 生成UtdidTmp
 */
export function getUtdidTmp(): string{
  var sChar = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var aChar = sChar.split('');
  aChar.sort(function() {
    return (0.5 - Math.random());
  })
  sChar = aChar.join('');
  var oDate = new Date();
  var r = rnd(0,sChar.length-10);
  var str = sChar.substr(r,10);
  return 'tmp_'+oDate.getTime()+str;
}
