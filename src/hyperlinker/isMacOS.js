/**
 * macOS かどうか判定する
 * @return {boolean}
 */
const isMacOS = () => window.navigator.userAgent.includes("Mac OS");

export default isMacOS;
