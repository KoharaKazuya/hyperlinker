/**
 * URL (ハイパーリンク) としてみなせる文字列にマッチする正規表現
 *
 * @see [RFC 3986](https://tools.ietf.org/html/rfc3986) を参考に (厳密ではない)
 *
 * - マークダウンのリンクなどの末尾が `)` で終わる文字列は末尾の部分をマッチさせない
 */
const urlMatcher = /(?:[A-Z][A-Z0-9+.-]+)?:\/\/(?:(?!\)\s)[A-Z0-9._~%!$&'()*+,;=:@/?#-])+/i;

export default urlMatcher;
