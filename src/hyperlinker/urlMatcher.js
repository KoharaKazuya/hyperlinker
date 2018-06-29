/**
 * URL (ハイパーリンク) としてみなせる文字列にマッチする正規表現
 */
const urlMatcher = /https?:\/\/((?![ "#<>`{}])[\u0020-\u007e])+/;

export default urlMatcher;
