module.exports = [
"[project]/node_modules/jwt-decode/build/esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidTokenError",
    ()=>InvalidTokenError,
    "jwtDecode",
    ()=>jwtDecode
]);
class InvalidTokenError extends Error {
}
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, (m, p)=>{
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = "0" + code;
        }
        return "%" + code;
    }));
}
function base64UrlDecode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch(output.length % 4){
        case 0:
            break;
        case 2:
            output += "==";
            break;
        case 3:
            output += "=";
            break;
        default:
            throw new Error("base64 string is not of the correct length");
    }
    try {
        return b64DecodeUnicode(output);
    } catch (err) {
        return atob(output);
    }
}
function jwtDecode(token, options) {
    if (typeof token !== "string") {
        throw new InvalidTokenError("Invalid token specified: must be a string");
    }
    options || (options = {});
    const pos = options.header === true ? 0 : 1;
    const part = token.split(".")[pos];
    if (typeof part !== "string") {
        throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
    }
    let decoded;
    try {
        decoded = base64UrlDecode(part);
    } catch (e) {
        throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
    }
    try {
        return JSON.parse(decoded);
    } catch (e) {
        throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
    }
}
}),
"[project]/apps/web/node_modules/path-to-regexp/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TokenData = void 0;
exports.parse = parse;
exports.compile = compile;
exports.match = match;
exports.pathToRegexp = pathToRegexp;
const DEFAULT_DELIMITER = "/";
const NOOP_VALUE = (value)=>value;
const ID_CHAR = /^\p{XID_Continue}$/u;
const DEBUG_URL = "https://git.new/pathToRegexpError";
const SIMPLE_TOKENS = {
    "!": "!",
    "@": "@",
    ";": ";",
    ",": ",",
    "*": "*",
    "+": "+",
    "?": "?",
    "{": "{",
    "}": "}"
};
/**
 * Tokenize input string.
 */ function lexer(str) {
    const chars = [
        ...str
    ];
    const tokens = [];
    let i = 0;
    while(i < chars.length){
        const value = chars[i];
        const type = SIMPLE_TOKENS[value];
        if (type) {
            tokens.push({
                type,
                index: i++,
                value
            });
            continue;
        }
        if (value === "\\") {
            tokens.push({
                type: "ESCAPED",
                index: i++,
                value: chars[i++]
            });
            continue;
        }
        if (value === ":") {
            let name = "";
            while(ID_CHAR.test(chars[++i])){
                name += chars[i];
            }
            if (!name) {
                throw new TypeError(`Missing parameter name at ${i}`);
            }
            tokens.push({
                type: "NAME",
                index: i,
                value: name
            });
            continue;
        }
        if (value === "(") {
            const pos = i++;
            let count = 1;
            let pattern = "";
            if (chars[i] === "?") {
                throw new TypeError(`Pattern cannot start with "?" at ${i}`);
            }
            while(i < chars.length){
                if (chars[i] === "\\") {
                    pattern += chars[i++] + chars[i++];
                    continue;
                }
                if (chars[i] === ")") {
                    count--;
                    if (count === 0) {
                        i++;
                        break;
                    }
                } else if (chars[i] === "(") {
                    count++;
                    if (chars[i + 1] !== "?") {
                        throw new TypeError(`Capturing groups are not allowed at ${i}`);
                    }
                }
                pattern += chars[i++];
            }
            if (count) throw new TypeError(`Unbalanced pattern at ${pos}`);
            if (!pattern) throw new TypeError(`Missing pattern at ${pos}`);
            tokens.push({
                type: "PATTERN",
                index: i,
                value: pattern
            });
            continue;
        }
        tokens.push({
            type: "CHAR",
            index: i,
            value: chars[i++]
        });
    }
    tokens.push({
        type: "END",
        index: i,
        value: ""
    });
    return new Iter(tokens);
}
class Iter {
    constructor(tokens){
        this.tokens = tokens;
        this.index = 0;
    }
    peek() {
        return this.tokens[this.index];
    }
    tryConsume(type) {
        const token = this.peek();
        if (token.type !== type) return;
        this.index++;
        return token.value;
    }
    consume(type) {
        const value = this.tryConsume(type);
        if (value !== undefined) return value;
        const { type: nextType, index } = this.peek();
        throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}: ${DEBUG_URL}`);
    }
    text() {
        let result = "";
        let value;
        while(value = this.tryConsume("CHAR") || this.tryConsume("ESCAPED")){
            result += value;
        }
        return result;
    }
    modifier() {
        return this.tryConsume("?") || this.tryConsume("*") || this.tryConsume("+");
    }
}
/**
 * Tokenized path instance. Can we passed around instead of string.
 */ class TokenData {
    constructor(tokens, delimiter){
        this.tokens = tokens;
        this.delimiter = delimiter;
    }
}
exports.TokenData = TokenData;
/**
 * Parse a string for the raw tokens.
 */ function parse(str, options = {}) {
    const { encodePath = NOOP_VALUE, delimiter = encodePath(DEFAULT_DELIMITER) } = options;
    const tokens = [];
    const it = lexer(str);
    let key = 0;
    do {
        const path = it.text();
        if (path) tokens.push(encodePath(path));
        const name = it.tryConsume("NAME");
        const pattern = it.tryConsume("PATTERN");
        if (name || pattern) {
            tokens.push({
                name: name || String(key++),
                pattern
            });
            const next = it.peek();
            if (next.type === "*") {
                throw new TypeError(`Unexpected * at ${next.index}, you probably want \`/*\` or \`{/:foo}*\`: ${DEBUG_URL}`);
            }
            continue;
        }
        const asterisk = it.tryConsume("*");
        if (asterisk) {
            tokens.push({
                name: String(key++),
                pattern: `(?:(?!${escape(delimiter)}).)*`,
                modifier: "*",
                separator: delimiter
            });
            continue;
        }
        const open = it.tryConsume("{");
        if (open) {
            const prefix = it.text();
            const name = it.tryConsume("NAME");
            const pattern = it.tryConsume("PATTERN");
            const suffix = it.text();
            const separator = it.tryConsume(";") && it.text();
            it.consume("}");
            const modifier = it.modifier();
            tokens.push({
                name: name || (pattern ? String(key++) : ""),
                prefix: encodePath(prefix),
                suffix: encodePath(suffix),
                pattern,
                modifier,
                separator
            });
            continue;
        }
        it.consume("END");
        break;
    }while (true)
    return new TokenData(tokens, delimiter);
}
/**
 * Compile a string to a template function for the path.
 */ function compile(path, options = {}) {
    const data = path instanceof TokenData ? path : parse(path, options);
    return compileTokens(data, options);
}
/**
 * Convert a single token into a path building function.
 */ function tokenToFunction(token, encode) {
    if (typeof token === "string") {
        return ()=>token;
    }
    const encodeValue = encode || NOOP_VALUE;
    const repeated = token.modifier === "+" || token.modifier === "*";
    const optional = token.modifier === "?" || token.modifier === "*";
    const { prefix = "", suffix = "", separator = suffix + prefix } = token;
    if (encode && repeated) {
        const stringify = (value, index)=>{
            if (typeof value !== "string") {
                throw new TypeError(`Expected "${token.name}/${index}" to be a string`);
            }
            return encodeValue(value);
        };
        const compile = (value)=>{
            if (!Array.isArray(value)) {
                throw new TypeError(`Expected "${token.name}" to be an array`);
            }
            if (value.length === 0) return "";
            return prefix + value.map(stringify).join(separator) + suffix;
        };
        if (optional) {
            return (data)=>{
                const value = data[token.name];
                if (value == null) return "";
                return value.length ? compile(value) : "";
            };
        }
        return (data)=>{
            const value = data[token.name];
            return compile(value);
        };
    }
    const stringify = (value)=>{
        if (typeof value !== "string") {
            throw new TypeError(`Expected "${token.name}" to be a string`);
        }
        return prefix + encodeValue(value) + suffix;
    };
    if (optional) {
        return (data)=>{
            const value = data[token.name];
            if (value == null) return "";
            return stringify(value);
        };
    }
    return (data)=>{
        const value = data[token.name];
        return stringify(value);
    };
}
/**
 * Transform tokens into a path building function.
 */ function compileTokens(data, options) {
    const { encode = encodeURIComponent, loose = true, validate = true, strict = false } = options;
    const flags = toFlags(options);
    const stringify = toStringify(loose, data.delimiter);
    const sources = toRegExpSource(data, stringify, [], flags, strict);
    // Compile all the tokens into regexps.
    const encoders = data.tokens.map((token, index)=>{
        const fn = tokenToFunction(token, encode);
        if (!validate || typeof token === "string") return fn;
        const validRe = new RegExp(`^${sources[index]}$`, flags);
        return (data)=>{
            const value = fn(data);
            if (!validRe.test(value)) {
                throw new TypeError(`Invalid value for "${token.name}": ${JSON.stringify(value)}`);
            }
            return value;
        };
    });
    return function path(data = {}) {
        let path1 = "";
        for (const encoder of encoders)path1 += encoder(data);
        return path1;
    };
}
/**
 * Create path match function from `path-to-regexp` spec.
 */ function match(path, options = {}) {
    const { decode = decodeURIComponent, loose = true, delimiter = DEFAULT_DELIMITER } = options;
    const re = pathToRegexp(path, options);
    const stringify = toStringify(loose, delimiter);
    const decoders = re.keys.map((key)=>{
        if (decode && (key.modifier === "+" || key.modifier === "*")) {
            const { prefix = "", suffix = "", separator = suffix + prefix } = key;
            const re = new RegExp(stringify(separator), "g");
            return (value)=>value.split(re).map(decode);
        }
        return decode || NOOP_VALUE;
    });
    return function match(input) {
        const m = re.exec(input);
        if (!m) return false;
        const { 0: path, index } = m;
        const params = Object.create(null);
        for(let i = 1; i < m.length; i++){
            if (m[i] === undefined) continue;
            const key = re.keys[i - 1];
            const decoder = decoders[i - 1];
            params[key.name] = decoder(m[i]);
        }
        return {
            path,
            index,
            params
        };
    };
}
/**
 * Escape a regular expression string.
 */ function escape(str) {
    return str.replace(/[.+*?^${}()[\]|/\\]/g, "\\$&");
}
/**
 * Escape and repeat loose characters for regular expressions.
 */ function looseReplacer(value, loose) {
    const escaped = escape(value);
    return loose ? `(?:${escaped})+(?!${escaped})` : escaped;
}
/**
 * Encode all non-delimiter characters using the encode function.
 */ function toStringify(loose, delimiter) {
    if (!loose) return escape;
    const re = new RegExp(`(?:(?!${escape(delimiter)}).)+|(.)`, "g");
    return (value)=>value.replace(re, looseReplacer);
}
/**
 * Get the flags for a regexp from the options.
 */ function toFlags(options) {
    return options.sensitive ? "" : "i";
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */ function pathToSource(path, keys, flags, options) {
    const data = path instanceof TokenData ? path : parse(path, options);
    const { trailing = true, loose = true, start = true, end = true, strict = false } = options;
    const stringify = toStringify(loose, data.delimiter);
    const sources = toRegExpSource(data, stringify, keys, flags, strict);
    let pattern = start ? "^" : "";
    pattern += sources.join("");
    if (trailing) pattern += `(?:${stringify(data.delimiter)}$)?`;
    pattern += end ? "$" : `(?=${escape(data.delimiter)}|$)`;
    return pattern;
}
/**
 * Convert a token into a regexp string (re-used for path validation).
 */ function toRegExpSource(data, stringify, keys, flags, strict) {
    const defaultPattern = `(?:(?!${escape(data.delimiter)}).)+?`;
    let backtrack = "";
    let safe = true;
    return data.tokens.map((token)=>{
        if (typeof token === "string") {
            backtrack = token;
            return stringify(token);
        }
        const { prefix = "", suffix = "", separator = suffix + prefix, modifier = "" } = token;
        const pre = stringify(prefix);
        const post = stringify(suffix);
        if (token.name) {
            const pattern = token.pattern ? `(?:${token.pattern})` : defaultPattern;
            const re = checkPattern(pattern, token.name, flags);
            safe || (safe = safePattern(re, prefix || backtrack));
            if (!safe) {
                throw new TypeError(`Ambiguous pattern for "${token.name}": ${DEBUG_URL}`);
            }
            safe = !strict || safePattern(re, suffix);
            backtrack = "";
            keys.push(token);
            if (modifier === "+" || modifier === "*") {
                const mod = modifier === "*" ? "?" : "";
                const sep = stringify(separator);
                if (!sep) {
                    throw new TypeError(`Missing separator for "${token.name}": ${DEBUG_URL}`);
                }
                safe || (safe = !strict || safePattern(re, separator));
                if (!safe) {
                    throw new TypeError(`Ambiguous pattern for "${token.name}" separator: ${DEBUG_URL}`);
                }
                safe = !strict;
                return `(?:${pre}(${pattern}(?:${sep}${pattern})*)${post})${mod}`;
            }
            return `(?:${pre}(${pattern})${post})${modifier}`;
        }
        return `(?:${pre}${post})${modifier}`;
    });
}
function checkPattern(pattern, name, flags) {
    try {
        return new RegExp(`^${pattern}$`, flags);
    } catch (err) {
        throw new TypeError(`Invalid pattern for "${name}": ${err.message}`);
    }
}
function safePattern(re, value) {
    return value ? !re.test(value) : false;
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */ function pathToRegexp(path, options = {}) {
    const keys = [];
    const flags = toFlags(options);
    if (Array.isArray(path)) {
        const regexps = path.map((p)=>pathToSource(p, keys, flags, options));
        return Object.assign(new RegExp(regexps.join("|")), {
            keys
        });
    }
    const regexp = pathToSource(path, keys, flags, options);
    return Object.assign(new RegExp(regexp), {
        keys
    });
} //# sourceMappingURL=index.js.map
}),
"[project]/apps/web/node_modules/cookie/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 * @public
 */ exports.parse = parse;
exports.serialize = serialize;
/**
 * Module variables.
 * @private
 */ var __toString = Object.prototype.toString;
/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */ var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */ function parse(str, options) {
    if (typeof str !== 'string') {
        throw new TypeError('argument str must be a string');
    }
    var obj = {};
    var opt = options || {};
    var dec = opt.decode || decode;
    var index = 0;
    while(index < str.length){
        var eqIdx = str.indexOf('=', index);
        // no more cookie pairs
        if (eqIdx === -1) {
            break;
        }
        var endIdx = str.indexOf(';', index);
        if (endIdx === -1) {
            endIdx = str.length;
        } else if (endIdx < eqIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(';', eqIdx - 1) + 1;
            continue;
        }
        var key = str.slice(index, eqIdx).trim();
        // only assign once
        if (undefined === obj[key]) {
            var val = str.slice(eqIdx + 1, endIdx).trim();
            // quoted values
            if (val.charCodeAt(0) === 0x22) {
                val = val.slice(1, -1);
            }
            obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
    }
    return obj;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */ function serialize(name, val, options) {
    var opt = options || {};
    var enc = opt.encode || encode;
    if (typeof enc !== 'function') {
        throw new TypeError('option encode is invalid');
    }
    if (!fieldContentRegExp.test(name)) {
        throw new TypeError('argument name is invalid');
    }
    var value = enc(val);
    if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError('argument val is invalid');
    }
    var str = name + '=' + value;
    if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
            throw new TypeError('option maxAge is invalid');
        }
        str += '; Max-Age=' + Math.floor(maxAge);
    }
    if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
            throw new TypeError('option domain is invalid');
        }
        str += '; Domain=' + opt.domain;
    }
    if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
            throw new TypeError('option path is invalid');
        }
        str += '; Path=' + opt.path;
    }
    if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
            throw new TypeError('option expires is invalid');
        }
        str += '; Expires=' + expires.toUTCString();
    }
    if (opt.httpOnly) {
        str += '; HttpOnly';
    }
    if (opt.secure) {
        str += '; Secure';
    }
    if (opt.partitioned) {
        str += '; Partitioned';
    }
    if (opt.priority) {
        var priority = typeof opt.priority === 'string' ? opt.priority.toLowerCase() : opt.priority;
        switch(priority){
            case 'low':
                str += '; Priority=Low';
                break;
            case 'medium':
                str += '; Priority=Medium';
                break;
            case 'high':
                str += '; Priority=High';
                break;
            default:
                throw new TypeError('option priority is invalid');
        }
    }
    if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch(sameSite){
            case true:
                str += '; SameSite=Strict';
                break;
            case 'lax':
                str += '; SameSite=Lax';
                break;
            case 'strict':
                str += '; SameSite=Strict';
                break;
            case 'none':
                str += '; SameSite=None';
                break;
            default:
                throw new TypeError('option sameSite is invalid');
        }
    }
    return str;
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 *
 * @param {string} str
 * @returns {string}
 */ function decode(str) {
    return str.indexOf('%') !== -1 ? decodeURIComponent(str) : str;
}
/**
 * URL-encode value.
 *
 * @param {string} val
 * @returns {string}
 */ function encode(val) {
    return encodeURIComponent(val);
}
/**
 * Determine if value is a Date.
 *
 * @param {*} val
 * @private
 */ function isDate(val) {
    return __toString.call(val) === '[object Date]' || val instanceof Date;
}
/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */ function tryDecode(str, decode) {
    try {
        return decode(str);
    } catch (e) {
        return str;
    }
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimeSpan",
    ()=>TimeSpan,
    "createDate",
    ()=>createDate,
    "isWithinExpirationDate",
    ()=>isWithinExpirationDate
]);
class TimeSpan {
    constructor(value, unit){
        this.value = value;
        this.unit = unit;
    }
    value;
    unit;
    milliseconds() {
        if (this.unit === "ms") {
            return this.value;
        }
        if (this.unit === "s") {
            return this.value * 1000;
        }
        if (this.unit === "m") {
            return this.value * 1000 * 60;
        }
        if (this.unit === "h") {
            return this.value * 1000 * 60 * 60;
        }
        if (this.unit === "d") {
            return this.value * 1000 * 60 * 60 * 24;
        }
        return this.value * 1000 * 60 * 60 * 24 * 7;
    }
    seconds() {
        return this.milliseconds() / 1000;
    }
    transform(x) {
        return new TimeSpan(Math.round(this.milliseconds() * x), "ms");
    }
}
function isWithinExpirationDate(date) {
    return Date.now() < date.getTime();
}
function createDate(timeSpan) {
    return new Date(Date.now() + timeSpan.milliseconds());
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/crypto/ecdsa.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ECDSA",
    ()=>ECDSA
]);
class ECDSA {
    hash;
    curve;
    constructor(hash, curve){
        this.hash = hash;
        this.curve = curve;
    }
    async sign(privateKey, data) {
        const cryptoKey = await crypto.subtle.importKey("pkcs8", privateKey, {
            name: "ECDSA",
            namedCurve: this.curve
        }, false, [
            "sign"
        ]);
        const signature = await crypto.subtle.sign({
            name: "ECDSA",
            hash: this.hash
        }, cryptoKey, data);
        return signature;
    }
    async verify(publicKey, signature, data) {
        const cryptoKey = await crypto.subtle.importKey("spki", publicKey, {
            name: "ECDSA",
            namedCurve: this.curve
        }, false, [
            "verify"
        ]);
        return await crypto.subtle.verify({
            name: "ECDSA",
            hash: this.hash
        }, cryptoKey, signature, data);
    }
    async generateKeyPair() {
        const cryptoKeyPair = await crypto.subtle.generateKey({
            name: "ECDSA",
            namedCurve: this.curve
        }, true, [
            "sign"
        ]);
        const privateKey = await crypto.subtle.exportKey("pkcs8", cryptoKeyPair.privateKey);
        const publicKey = await crypto.subtle.exportKey("spki", cryptoKeyPair.publicKey);
        return {
            privateKey,
            publicKey
        };
    }
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/crypto/hmac.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HMAC",
    ()=>HMAC
]);
class HMAC {
    hash;
    constructor(hash){
        this.hash = hash;
    }
    async verify(key, signature, data) {
        const cryptoKey = await crypto.subtle.importKey("raw", key, {
            name: "HMAC",
            hash: this.hash
        }, false, [
            "verify"
        ]);
        return await crypto.subtle.verify("HMAC", cryptoKey, signature, data);
    }
    async sign(key, data) {
        const cryptoKey = await crypto.subtle.importKey("raw", key, {
            name: "HMAC",
            hash: this.hash
        }, false, [
            "sign"
        ]);
        const signature = await crypto.subtle.sign("HMAC", cryptoKey, data);
        return signature;
    }
    async generateKey() {
        const cryptoKey = await crypto.subtle.generateKey({
            name: "HMAC",
            hash: this.hash
        }, true, [
            "sign"
        ]);
        const key = await crypto.subtle.exportKey("raw", cryptoKey);
        return key;
    }
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/crypto/rsa.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RSASSAPKCS1v1_5",
    ()=>RSASSAPKCS1v1_5,
    "RSASSAPSS",
    ()=>RSASSAPSS
]);
class RSASSAPKCS1v1_5 {
    hash;
    constructor(hash){
        this.hash = hash;
    }
    async verify(publicKey, signature, data) {
        const cryptoKey = await crypto.subtle.importKey("spki", publicKey, {
            name: "RSASSA-PKCS1-v1_5",
            hash: this.hash
        }, false, [
            "verify"
        ]);
        return await crypto.subtle.verify("RSASSA-PKCS1-v1_5", cryptoKey, signature, data);
    }
    async sign(privateKey, data) {
        const cryptoKey = await crypto.subtle.importKey("pkcs8", privateKey, {
            name: "RSASSA-PKCS1-v1_5",
            hash: this.hash
        }, false, [
            "sign"
        ]);
        const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, data);
        return signature;
    }
    async generateKeyPair(modulusLength) {
        const cryptoKeyPair = await crypto.subtle.generateKey({
            name: "RSASSA-PKCS1-v1_5",
            hash: this.hash,
            modulusLength: modulusLength ?? 2048,
            publicExponent: new Uint8Array([
                0x01,
                0x00,
                0x01
            ])
        }, true, [
            "sign"
        ]);
        const privateKey = await crypto.subtle.exportKey("pkcs8", cryptoKeyPair.privateKey);
        const publicKey = await crypto.subtle.exportKey("spki", cryptoKeyPair.publicKey);
        return {
            privateKey,
            publicKey
        };
    }
}
class RSASSAPSS {
    hash;
    saltLength;
    constructor(hash){
        this.hash = hash;
        if (hash === "SHA-1") {
            this.saltLength = 20;
        } else if (hash === "SHA-256") {
            this.saltLength = 32;
        } else if (hash === "SHA-384") {
            this.saltLength = 48;
        } else {
            this.saltLength = 64;
        }
    }
    async verify(publicKey, signature, data) {
        const cryptoKey = await crypto.subtle.importKey("spki", publicKey, {
            name: "RSA-PSS",
            hash: this.hash
        }, false, [
            "verify"
        ]);
        return await crypto.subtle.verify({
            name: "RSA-PSS",
            saltLength: this.saltLength
        }, cryptoKey, signature, data);
    }
    async sign(privateKey, data) {
        const cryptoKey = await crypto.subtle.importKey("pkcs8", privateKey, {
            name: "RSA-PSS",
            hash: this.hash
        }, false, [
            "sign"
        ]);
        const signature = await crypto.subtle.sign({
            name: "RSA-PSS",
            saltLength: this.saltLength
        }, cryptoKey, data);
        return signature;
    }
    async generateKeyPair(modulusLength) {
        const cryptoKeyPair = await crypto.subtle.generateKey({
            name: "RSA-PSS",
            hash: this.hash,
            modulusLength: modulusLength ?? 2048,
            publicExponent: new Uint8Array([
                0x01,
                0x00,
                0x01
            ])
        }, true, [
            "sign"
        ]);
        const privateKey = await crypto.subtle.exportKey("pkcs8", cryptoKeyPair.privateKey);
        const publicKey = await crypto.subtle.exportKey("spki", cryptoKeyPair.publicKey);
        return {
            privateKey,
            publicKey
        };
    }
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/crypto/sha.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sha1",
    ()=>sha1,
    "sha256",
    ()=>sha256,
    "sha384",
    ()=>sha384,
    "sha512",
    ()=>sha512
]);
async function sha1(data) {
    return await crypto.subtle.digest("SHA-1", data);
}
async function sha256(data) {
    return await crypto.subtle.digest("SHA-256", data);
}
async function sha384(data) {
    return await crypto.subtle.digest("SHA-384", data);
}
async function sha512(data) {
    return await crypto.subtle.digest("SHA-512", data);
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/bytes.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "binaryToInteger",
    ()=>binaryToInteger,
    "byteToBinary",
    ()=>byteToBinary,
    "bytesToBinary",
    ()=>bytesToBinary,
    "bytesToInteger",
    ()=>bytesToInteger,
    "compareBytes",
    ()=>compareBytes
]);
function byteToBinary(byte) {
    return byte.toString(2).padStart(8, "0");
}
function bytesToBinary(bytes) {
    return [
        ...bytes
    ].map((val)=>byteToBinary(val)).join("");
}
function binaryToInteger(bits) {
    return parseInt(bits, 2);
}
function bytesToInteger(bytes) {
    return parseInt(bytesToBinary(bytes), 2);
}
function compareBytes(buffer1, buffer2) {
    const bytes1 = new Uint8Array(buffer1);
    const bytes2 = new Uint8Array(buffer2);
    if (bytes1.byteLength !== bytes2.byteLength) return false;
    for(let i = 0; i < bytes1.byteLength; i++){
        if (bytes1[i] !== bytes2[i]) return false;
    }
    return true;
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/crypto/random.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alphabet",
    ()=>alphabet,
    "generateRandomInteger",
    ()=>generateRandomInteger,
    "generateRandomString",
    ()=>generateRandomString,
    "random",
    ()=>random
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$bytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/bytes.js [app-route] (ecmascript)");
;
function random() {
    const buffer = new ArrayBuffer(8);
    const bytes = crypto.getRandomValues(new Uint8Array(buffer));
    // sets the exponent value (11 bits) to 01111111111 (1023)
    // since the bias is 1023 (2 * (11 - 1) - 1), 1023 - 1023 = 0
    // 2^0 * (1 + [52 bit number between 0-1]) = number between 1-2
    bytes[0] = 63;
    bytes[1] = bytes[1] | 240;
    return new DataView(buffer).getFloat64(0) - 1;
}
function generateRandomInteger(max) {
    if (max < 0 || !Number.isInteger(max)) {
        throw new Error("Argument 'max' must be an integer greater than or equal to 0");
    }
    const bitLength = (max - 1).toString(2).length;
    const shift = bitLength % 8;
    const bytes = new Uint8Array(Math.ceil(bitLength / 8));
    crypto.getRandomValues(bytes);
    // This zeroes bits that can be ignored to increase the chance `result` < `max`.
    // For example, if `max` can be represented with 10 bits, the leading 6 bits of the random 16 bits (2 bytes) can be ignored.
    if (shift !== 0) {
        bytes[0] &= (1 << shift) - 1;
    }
    let result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$bytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToInteger"])(bytes);
    while(result >= max){
        crypto.getRandomValues(bytes);
        if (shift !== 0) {
            bytes[0] &= (1 << shift) - 1;
        }
        result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$bytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToInteger"])(bytes);
    }
    return result;
}
function generateRandomString(length, alphabet) {
    let result = "";
    for(let i = 0; i < length; i++){
        result += alphabet[generateRandomInteger(alphabet.length)];
    }
    return result;
}
function alphabet(...patterns) {
    const patternSet = new Set(patterns);
    let result = "";
    for (const pattern of patternSet){
        if (pattern === "a-z") {
            result += "abcdefghijklmnopqrstuvwxyz";
        } else if (pattern === "A-Z") {
            result += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        } else if (pattern === "0-9") {
            result += "0123456789";
        } else {
            result += pattern;
        }
    }
    return result;
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/crypto/buffer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "constantTimeEqual",
    ()=>constantTimeEqual
]);
function constantTimeEqual(a, b) {
    const aBuffer = new Uint8Array(a);
    const bBuffer = new Uint8Array(b);
    if (aBuffer.length !== bBuffer.length) {
        return false;
    }
    let c = 0;
    for(let i = 0; i < aBuffer.length; i++){
        c |= aBuffer[i] ^ bBuffer[i]; // ^: XOR operator
    }
    return c === 0;
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/crypto/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$ecdsa$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/ecdsa.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$hmac$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/hmac.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$rsa$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/rsa.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$sha$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/sha.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$random$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/random.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$buffer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/buffer.js [app-route] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/encoding/hex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeHex",
    ()=>decodeHex,
    "encodeHex",
    ()=>encodeHex
]);
const hexAlphabet = "0123456789abcdef";
const hexDecodeMap = new Map([
    [
        "0",
        0
    ],
    [
        "1",
        1
    ],
    [
        "2",
        2
    ],
    [
        "3",
        3
    ],
    [
        "4",
        4
    ],
    [
        "5",
        5
    ],
    [
        "6",
        6
    ],
    [
        "7",
        7
    ],
    [
        "8",
        8
    ],
    [
        "9",
        9
    ],
    [
        "A",
        10
    ],
    [
        "B",
        11
    ],
    [
        "C",
        12
    ],
    [
        "D",
        13
    ],
    [
        "E",
        14
    ],
    [
        "F",
        15
    ],
    [
        "a",
        10
    ],
    [
        "b",
        11
    ],
    [
        "c",
        12
    ],
    [
        "d",
        13
    ],
    [
        "e",
        14
    ],
    [
        "f",
        15
    ]
]);
function encodeHex(data) {
    const bytes = new Uint8Array(data);
    let result = "";
    for(let i = 0; i < bytes.length; i++){
        const key1 = bytes[i] >> 4;
        result += hexAlphabet[key1];
        const key2 = bytes[i] & 0x0f;
        result += hexAlphabet[key2];
    }
    return result;
}
function decodeHex(data) {
    const chunkCount = Math.ceil(data.length / 2);
    const result = new Uint8Array(chunkCount);
    for(let i = 0; i < chunkCount; i++){
        let buffer = 0;
        const encoded1 = data[i * 2];
        const value1 = hexDecodeMap.get(encoded1) ?? null;
        if (value1 === null) {
            throw new Error(`Invalid character: ${encoded1}`);
        }
        buffer += value1 << 4;
        const encoded2 = data[i * 2 + 1];
        if (encoded2 === undefined) {
            throw new Error("Invalid data");
        }
        const value2 = hexDecodeMap.get(encoded2) ?? null;
        if (value2 === null) {
            throw new Error(`Invalid character: ${encoded1}`);
        }
        buffer += value2;
        result[i] = buffer;
    }
    return result;
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/encoding/base32.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Base32Encoding",
    ()=>Base32Encoding,
    "base32",
    ()=>base32,
    "base32hex",
    ()=>base32hex,
    "decodeBase32",
    ()=>decodeBase32,
    "encodeBase32",
    ()=>encodeBase32
]);
class Base32Encoding {
    alphabet;
    padding;
    decodeMap = new Map();
    constructor(alphabet, options){
        if (alphabet.length !== 32) {
            throw new Error("Invalid alphabet");
        }
        this.alphabet = alphabet;
        this.padding = options?.padding ?? "=";
        if (this.alphabet.includes(this.padding) || this.padding.length !== 1) {
            throw new Error("Invalid padding");
        }
        for(let i = 0; i < alphabet.length; i++){
            this.decodeMap.set(alphabet[i], i);
        }
    }
    encode(data, options) {
        let result = "";
        let buffer = 0;
        let shift = 0;
        for(let i = 0; i < data.length; i++){
            buffer = buffer << 8 | data[i];
            shift += 8;
            while(shift >= 5){
                shift -= 5;
                result += this.alphabet[buffer >> shift & 0x1f];
            }
        }
        if (shift > 0) {
            result += this.alphabet[buffer << 5 - shift & 0x1f];
        }
        const includePadding = options?.includePadding ?? true;
        if (includePadding) {
            const padCount = (8 - result.length % 8) % 8;
            for(let i = 0; i < padCount; i++){
                result += "=";
            }
        }
        return result;
    }
    decode(data, options) {
        const strict = options?.strict ?? true;
        const chunkCount = Math.ceil(data.length / 8);
        const result = [];
        for(let i = 0; i < chunkCount; i++){
            let padCount = 0;
            const chunks = [];
            for(let j = 0; j < 8; j++){
                const encoded = data[i * 8 + j];
                if (encoded === "=") {
                    if (i + 1 !== chunkCount) {
                        throw new Error(`Invalid character: ${encoded}`);
                    }
                    padCount += 1;
                    continue;
                }
                if (encoded === undefined) {
                    if (strict) {
                        throw new Error("Invalid data");
                    }
                    padCount += 1;
                    continue;
                }
                const value = this.decodeMap.get(encoded) ?? null;
                if (value === null) {
                    throw new Error(`Invalid character: ${encoded}`);
                }
                chunks.push(value);
            }
            if (padCount === 8 || padCount === 7 || padCount === 5 || padCount === 2) {
                throw new Error("Invalid padding");
            }
            const byte1 = (chunks[0] << 3) + (chunks[1] >> 2);
            result.push(byte1);
            if (padCount < 6) {
                const byte2 = ((chunks[1] & 0x03) << 6) + (chunks[2] << 1) + (chunks[3] >> 4);
                result.push(byte2);
            }
            if (padCount < 4) {
                const byte3 = ((chunks[3] & 0xff) << 4) + (chunks[4] >> 1);
                result.push(byte3);
            }
            if (padCount < 3) {
                const byte4 = ((chunks[4] & 0x01) << 7) + (chunks[5] << 2) + (chunks[6] >> 3);
                result.push(byte4);
            }
            if (padCount < 1) {
                const byte5 = ((chunks[6] & 0x07) << 5) + chunks[7];
                result.push(byte5);
            }
        }
        return Uint8Array.from(result);
    }
}
const base32 = new Base32Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567");
const base32hex = new Base32Encoding("0123456789ABCDEFGHIJKLMNOPQRSTUV");
function encodeBase32(data, options) {
    return base32.encode(new Uint8Array(data), {
        includePadding: options?.padding ?? true
    });
}
function decodeBase32(data) {
    return base32.decode(data, {
        strict: false
    });
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/encoding/base64.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Base64Encoding",
    ()=>Base64Encoding,
    "base64",
    ()=>base64,
    "base64url",
    ()=>base64url,
    "decodeBase64",
    ()=>decodeBase64,
    "decodeBase64url",
    ()=>decodeBase64url,
    "encodeBase64",
    ()=>encodeBase64,
    "encodeBase64url",
    ()=>encodeBase64url
]);
class Base64Encoding {
    alphabet;
    padding;
    decodeMap = new Map();
    constructor(alphabet, options){
        if (alphabet.length !== 64) {
            throw new Error("Invalid alphabet");
        }
        this.alphabet = alphabet;
        this.padding = options?.padding ?? "=";
        if (this.alphabet.includes(this.padding) || this.padding.length !== 1) {
            throw new Error("Invalid padding");
        }
        for(let i = 0; i < alphabet.length; i++){
            this.decodeMap.set(alphabet[i], i);
        }
    }
    encode(data, options) {
        let result = "";
        let buffer = 0;
        let shift = 0;
        for(let i = 0; i < data.length; i++){
            buffer = buffer << 8 | data[i];
            shift += 8;
            while(shift >= 6){
                shift += -6;
                result += this.alphabet[buffer >> shift & 0x3f];
            }
        }
        if (shift > 0) {
            result += this.alphabet[buffer << 6 - shift & 0x3f];
        }
        const includePadding = options?.includePadding ?? true;
        if (includePadding) {
            const padCount = (4 - result.length % 4) % 4;
            for(let i = 0; i < padCount; i++){
                result += "=";
            }
        }
        return result;
    }
    decode(data, options) {
        const strict = options?.strict ?? true;
        const chunkCount = Math.ceil(data.length / 4);
        const result = [];
        for(let i = 0; i < chunkCount; i++){
            let padCount = 0;
            let buffer = 0;
            for(let j = 0; j < 4; j++){
                const encoded = data[i * 4 + j];
                if (encoded === "=") {
                    if (i + 1 !== chunkCount) {
                        throw new Error(`Invalid character: ${encoded}`);
                    }
                    padCount += 1;
                    continue;
                }
                if (encoded === undefined) {
                    if (strict) {
                        throw new Error("Invalid data");
                    }
                    padCount += 1;
                    continue;
                }
                const value = this.decodeMap.get(encoded) ?? null;
                if (value === null) {
                    throw new Error(`Invalid character: ${encoded}`);
                }
                buffer += value << 6 * (3 - j);
            }
            result.push(buffer >> 16 & 0xff);
            if (padCount < 2) {
                result.push(buffer >> 8 & 0xff);
            }
            if (padCount < 1) {
                result.push(buffer & 0xff);
            }
        }
        return Uint8Array.from(result);
    }
}
const base64 = new Base64Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
const base64url = new Base64Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_");
function encodeBase64(data, options) {
    return base64.encode(new Uint8Array(data), {
        includePadding: options?.padding ?? true
    });
}
function decodeBase64(data) {
    return base64.decode(data, {
        strict: false
    });
}
function encodeBase64url(data) {
    return base64.encode(new Uint8Array(data), {
        includePadding: false
    });
}
function decodeBase64url(data) {
    return base64url.decode(data, {
        strict: false
    });
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/encoding/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/encoding/hex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base32$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/encoding/base32.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/encoding/base64.js [app-route] (ecmascript)");
;
;
;
;
;
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/oauth2/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OAuth2Client",
    ()=>OAuth2Client,
    "OAuth2RequestError",
    ()=>OAuth2RequestError,
    "generateCodeVerifier",
    ()=>generateCodeVerifier,
    "generateState",
    ()=>generateState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$sha$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/sha.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/encoding/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/encoding/base64.js [app-route] (ecmascript)");
;
;
class OAuth2Client {
    clientId;
    authorizeEndpoint;
    tokenEndpoint;
    redirectURI;
    constructor(clientId, authorizeEndpoint, tokenEndpoint, options){
        this.clientId = clientId;
        this.authorizeEndpoint = authorizeEndpoint;
        this.tokenEndpoint = tokenEndpoint;
        this.redirectURI = options?.redirectURI ?? null;
    }
    async createAuthorizationURL(options) {
        const scopes = Array.from(new Set(options?.scopes ?? [])); // remove duplicates
        const authorizationUrl = new URL(this.authorizeEndpoint);
        authorizationUrl.searchParams.set("response_type", "code");
        authorizationUrl.searchParams.set("client_id", this.clientId);
        if (options?.state !== undefined) {
            authorizationUrl.searchParams.set("state", options.state);
        }
        if (scopes.length > 0) {
            authorizationUrl.searchParams.set("scope", scopes.join(" "));
        }
        if (this.redirectURI !== null) {
            authorizationUrl.searchParams.set("redirect_uri", this.redirectURI);
        }
        if (options?.codeVerifier !== undefined) {
            const codeChallengeMethod = options?.codeChallengeMethod ?? "S256";
            if (codeChallengeMethod === "S256") {
                const codeChallengeBuffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$sha$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"])(new TextEncoder().encode(options.codeVerifier));
                const codeChallenge = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64url"].encode(new Uint8Array(codeChallengeBuffer), {
                    includePadding: false
                });
                authorizationUrl.searchParams.set("code_challenge", codeChallenge);
                authorizationUrl.searchParams.set("code_challenge_method", "S256");
            } else if (codeChallengeMethod === "plain") {
                authorizationUrl.searchParams.set("code_challenge", options.codeVerifier);
                authorizationUrl.searchParams.set("code_challenge_method", "plain");
            } else {
                throw new TypeError(`Invalid value for 'codeChallengeMethod': ${codeChallengeMethod}`);
            }
        }
        return authorizationUrl;
    }
    async validateAuthorizationCode(authorizationCode, options) {
        const body = new URLSearchParams();
        body.set("code", authorizationCode);
        body.set("client_id", this.clientId);
        body.set("grant_type", "authorization_code");
        if (this.redirectURI !== null) {
            body.set("redirect_uri", this.redirectURI);
        }
        if (options?.codeVerifier !== undefined) {
            body.set("code_verifier", options.codeVerifier);
        }
        return await this.sendTokenRequest(body, options);
    }
    async refreshAccessToken(refreshToken, options) {
        const body = new URLSearchParams();
        body.set("refresh_token", refreshToken);
        body.set("client_id", this.clientId);
        body.set("grant_type", "refresh_token");
        const scopes = Array.from(new Set(options?.scopes ?? [])); // remove duplicates
        if (scopes.length > 0) {
            body.set("scope", scopes.join(" "));
        }
        return await this.sendTokenRequest(body, options);
    }
    async sendTokenRequest(body, options) {
        const headers = new Headers();
        headers.set("Content-Type", "application/x-www-form-urlencoded");
        headers.set("Accept", "application/json");
        headers.set("User-Agent", "oslo");
        if (options?.credentials !== undefined) {
            const authenticateWith = options?.authenticateWith ?? "http_basic_auth";
            if (authenticateWith === "http_basic_auth") {
                const encodedCredentials = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64"].encode(new TextEncoder().encode(`${this.clientId}:${options.credentials}`));
                headers.set("Authorization", `Basic ${encodedCredentials}`);
            } else if (authenticateWith === "request_body") {
                body.set("client_secret", options.credentials);
            } else {
                throw new TypeError(`Invalid value for 'authenticateWith': ${authenticateWith}`);
            }
        }
        const request = new Request(this.tokenEndpoint, {
            method: "POST",
            headers,
            body
        });
        const response = await fetch(request);
        const result = await response.json();
        // providers are allowed to return non-400 status code for errors
        if (!("access_token" in result) && "error" in result) {
            throw new OAuth2RequestError(request, result);
        } else if (!response.ok) {
            throw new OAuth2RequestError(request, {});
        }
        return result;
    }
}
function generateCodeVerifier() {
    const randomValues = new Uint8Array(32);
    crypto.getRandomValues(randomValues);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64url"].encode(randomValues, {
        includePadding: false
    });
}
function generateState() {
    const randomValues = new Uint8Array(32);
    crypto.getRandomValues(randomValues);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64url"].encode(randomValues, {
        includePadding: false
    });
}
class OAuth2RequestError extends Error {
    request;
    description;
    constructor(request, body){
        super(body.error ?? "");
        this.request = request;
        this.description = body.error_description ?? null;
    }
}
}),
"[project]/node_modules/arctic/node_modules/oslo/dist/jwt/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createJWT",
    ()=>createJWT,
    "parseJWT",
    ()=>parseJWT,
    "validateJWT",
    ()=>validateJWT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$ecdsa$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/ecdsa.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$hmac$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/hmac.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$rsa$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/crypto/rsa.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/encoding/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/encoding/base64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/index.js [app-route] (ecmascript)");
;
;
;
async function createJWT(algorithm, key, payloadClaims, options) {
    const header = {
        alg: algorithm,
        typ: "JWT",
        ...options?.headers
    };
    const payload = {
        ...payloadClaims
    };
    if (options?.audiences !== undefined) {
        payload.aud = options.audiences;
    }
    if (options?.subject !== undefined) {
        payload.sub = options.subject;
    }
    if (options?.issuer !== undefined) {
        payload.iss = options.issuer;
    }
    if (options?.jwtId !== undefined) {
        payload.jti = options.jwtId;
    }
    if (options?.expiresIn !== undefined) {
        payload.exp = Math.floor(Date.now() / 1000) + options.expiresIn.seconds();
    }
    if (options?.notBefore !== undefined) {
        payload.nbf = Math.floor(options.notBefore.getTime() / 1000);
    }
    if (options?.includeIssuedTimestamp === true) {
        payload.iat = Math.floor(Date.now() / 1000);
    }
    const textEncoder = new TextEncoder();
    const headerPart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64url"].encode(textEncoder.encode(JSON.stringify(header)), {
        includePadding: false
    });
    const payloadPart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64url"].encode(textEncoder.encode(JSON.stringify(payload)), {
        includePadding: false
    });
    const data = textEncoder.encode([
        headerPart,
        payloadPart
    ].join("."));
    const signature = await getAlgorithm(algorithm).sign(key, data);
    const signaturePart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64url"].encode(new Uint8Array(signature), {
        includePadding: false
    });
    const value = [
        headerPart,
        payloadPart,
        signaturePart
    ].join(".");
    return value;
}
async function validateJWT(algorithm, key, jwt) {
    const parsedJWT = parseJWT(jwt);
    if (!parsedJWT) {
        throw new Error("Invalid JWT");
    }
    if (parsedJWT.algorithm !== algorithm) {
        throw new Error("Invalid algorithm");
    }
    if (parsedJWT.expiresAt && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isWithinExpirationDate"])(parsedJWT.expiresAt)) {
        throw new Error("Expired JWT");
    }
    if (parsedJWT.notBefore && Date.now() < parsedJWT.notBefore.getTime()) {
        throw new Error("Inactive JWT");
    }
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64url"].decode(parsedJWT.parts[2], {
        strict: false
    });
    const data = new TextEncoder().encode(parsedJWT.parts[0] + "." + parsedJWT.parts[1]);
    const validSignature = await getAlgorithm(parsedJWT.algorithm).verify(key, signature, data);
    if (!validSignature) {
        throw new Error("Invalid signature");
    }
    return parsedJWT;
}
function getJWTParts(jwt) {
    const jwtParts = jwt.split(".");
    if (jwtParts.length !== 3) {
        return null;
    }
    return jwtParts;
}
function parseJWT(jwt) {
    const jwtParts = getJWTParts(jwt);
    if (!jwtParts) {
        return null;
    }
    const textDecoder = new TextDecoder();
    const rawHeader = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64url"].decode(jwtParts[0], {
        strict: false
    });
    const rawPayload = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$encoding$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["base64url"].decode(jwtParts[1], {
        strict: false
    });
    const header = JSON.parse(textDecoder.decode(rawHeader));
    if (typeof header !== "object" || header === null) {
        return null;
    }
    if (!("alg" in header) || !isValidAlgorithm(header.alg)) {
        return null;
    }
    if ("typ" in header && header.typ !== "JWT") {
        return null;
    }
    const payload = JSON.parse(textDecoder.decode(rawPayload));
    if (typeof payload !== "object" || payload === null) {
        return null;
    }
    const properties = {
        algorithm: header.alg,
        expiresAt: null,
        subject: null,
        issuedAt: null,
        issuer: null,
        jwtId: null,
        audiences: null,
        notBefore: null
    };
    if ("exp" in payload) {
        if (typeof payload.exp !== "number") {
            return null;
        }
        properties.expiresAt = new Date(payload.exp * 1000);
    }
    if ("iss" in payload) {
        if (typeof payload.iss !== "string") {
            return null;
        }
        properties.issuer = payload.iss;
    }
    if ("sub" in payload) {
        if (typeof payload.sub !== "string") {
            return null;
        }
        properties.subject = payload.sub;
    }
    if ("aud" in payload) {
        if (!Array.isArray(payload.aud)) {
            if (typeof payload.aud !== "string") {
                return null;
            }
            properties.audiences = [
                payload.aud
            ];
        } else {
            for (const item of payload.aud){
                if (typeof item !== "string") {
                    return null;
                }
            }
            properties.audiences = payload.aud;
        }
    }
    if ("nbf" in payload) {
        if (typeof payload.nbf !== "number") {
            return null;
        }
        properties.notBefore = new Date(payload.nbf * 1000);
    }
    if ("iat" in payload) {
        if (typeof payload.iat !== "number") {
            return null;
        }
        properties.issuedAt = new Date(payload.iat * 1000);
    }
    if ("jti" in payload) {
        if (typeof payload.jti !== "string") {
            return null;
        }
        properties.jwtId = payload.jti;
    }
    return {
        value: jwt,
        header: {
            ...header,
            typ: "JWT",
            alg: header.alg
        },
        payload: {
            ...payload
        },
        parts: jwtParts,
        ...properties
    };
}
function getAlgorithm(algorithm) {
    if (algorithm === "ES256" || algorithm === "ES384" || algorithm === "ES512") {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$ecdsa$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ECDSA"](ecdsaDictionary[algorithm].hash, ecdsaDictionary[algorithm].curve);
    }
    if (algorithm === "HS256" || algorithm === "HS384" || algorithm === "HS512") {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$hmac$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HMAC"](hmacDictionary[algorithm]);
    }
    if (algorithm === "RS256" || algorithm === "RS384" || algorithm === "RS512") {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$rsa$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RSASSAPKCS1v1_5"](rsassapkcs1v1_5Dictionary[algorithm]);
    }
    if (algorithm === "PS256" || algorithm === "PS384" || algorithm === "PS512") {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$crypto$2f$rsa$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RSASSAPSS"](rsassapssDictionary[algorithm]);
    }
    throw new TypeError("Invalid algorithm");
}
function isValidAlgorithm(maybeValidAlgorithm) {
    if (typeof maybeValidAlgorithm !== "string") return false;
    return [
        "HS256",
        "HS384",
        "HS512",
        "RS256",
        "RS384",
        "RS512",
        "ES256",
        "ES384",
        "ES512",
        "PS256",
        "PS384",
        "PS512"
    ].includes(maybeValidAlgorithm);
}
const ecdsaDictionary = {
    ES256: {
        hash: "SHA-256",
        curve: "P-256"
    },
    ES384: {
        hash: "SHA-384",
        curve: "P-384"
    },
    ES512: {
        hash: "SHA-512",
        curve: "P-521"
    }
};
const hmacDictionary = {
    HS256: "SHA-256",
    HS384: "SHA-384",
    HS512: "SHA-512"
};
const rsassapkcs1v1_5Dictionary = {
    RS256: "SHA-256",
    RS384: "SHA-384",
    RS512: "SHA-512"
};
const rsassapssDictionary = {
    PS256: "SHA-256",
    PS384: "SHA-384",
    PS512: "SHA-512"
};
}),
"[project]/node_modules/oauth4webapi/build/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OperationProcessingError",
    ()=>OperationProcessingError,
    "UnsupportedOperationError",
    ()=>UnsupportedOperationError,
    "authorizationCodeGrantRequest",
    ()=>authorizationCodeGrantRequest,
    "calculatePKCECodeChallenge",
    ()=>calculatePKCECodeChallenge,
    "clientCredentialsGrantRequest",
    ()=>clientCredentialsGrantRequest,
    "clockSkew",
    ()=>clockSkew,
    "clockTolerance",
    ()=>clockTolerance,
    "customFetch",
    ()=>customFetch,
    "deviceAuthorizationRequest",
    ()=>deviceAuthorizationRequest,
    "deviceCodeGrantRequest",
    ()=>deviceCodeGrantRequest,
    "discoveryRequest",
    ()=>discoveryRequest,
    "expectNoNonce",
    ()=>expectNoNonce,
    "expectNoState",
    ()=>expectNoState,
    "experimentalCustomFetch",
    ()=>experimentalCustomFetch,
    "experimentalUseMtlsAlias",
    ()=>experimentalUseMtlsAlias,
    "experimental_customFetch",
    ()=>experimental_customFetch,
    "experimental_jwksCache",
    ()=>experimental_jwksCache,
    "experimental_useMtlsAlias",
    ()=>experimental_useMtlsAlias,
    "experimental_validateDetachedSignatureResponse",
    ()=>experimental_validateDetachedSignatureResponse,
    "experimental_validateJwtAccessToken",
    ()=>experimental_validateJwtAccessToken,
    "generateKeyPair",
    ()=>generateKeyPair,
    "generateRandomCodeVerifier",
    ()=>generateRandomCodeVerifier,
    "generateRandomNonce",
    ()=>generateRandomNonce,
    "generateRandomState",
    ()=>generateRandomState,
    "genericTokenEndpointRequest",
    ()=>genericTokenEndpointRequest,
    "getValidatedIdTokenClaims",
    ()=>getValidatedIdTokenClaims,
    "introspectionRequest",
    ()=>introspectionRequest,
    "isOAuth2Error",
    ()=>isOAuth2Error,
    "issueRequestObject",
    ()=>issueRequestObject,
    "jweDecrypt",
    ()=>jweDecrypt,
    "jwksCache",
    ()=>jwksCache,
    "modifyAssertion",
    ()=>modifyAssertion,
    "parseWwwAuthenticateChallenges",
    ()=>parseWwwAuthenticateChallenges,
    "processAuthorizationCodeOAuth2Response",
    ()=>processAuthorizationCodeOAuth2Response,
    "processAuthorizationCodeOpenIDResponse",
    ()=>processAuthorizationCodeOpenIDResponse,
    "processClientCredentialsResponse",
    ()=>processClientCredentialsResponse,
    "processDeviceAuthorizationResponse",
    ()=>processDeviceAuthorizationResponse,
    "processDeviceCodeResponse",
    ()=>processDeviceCodeResponse,
    "processDiscoveryResponse",
    ()=>processDiscoveryResponse,
    "processIntrospectionResponse",
    ()=>processIntrospectionResponse,
    "processPushedAuthorizationResponse",
    ()=>processPushedAuthorizationResponse,
    "processRefreshTokenResponse",
    ()=>processRefreshTokenResponse,
    "processRevocationResponse",
    ()=>processRevocationResponse,
    "processUserInfoResponse",
    ()=>processUserInfoResponse,
    "protectedResourceRequest",
    ()=>protectedResourceRequest,
    "pushedAuthorizationRequest",
    ()=>pushedAuthorizationRequest,
    "refreshTokenGrantRequest",
    ()=>refreshTokenGrantRequest,
    "revocationRequest",
    ()=>revocationRequest,
    "skipAuthTimeCheck",
    ()=>skipAuthTimeCheck,
    "skipStateCheck",
    ()=>skipStateCheck,
    "skipSubjectCheck",
    ()=>skipSubjectCheck,
    "useMtlsAlias",
    ()=>useMtlsAlias,
    "userInfoRequest",
    ()=>userInfoRequest,
    "validateAuthResponse",
    ()=>validateAuthResponse,
    "validateDetachedSignatureResponse",
    ()=>validateDetachedSignatureResponse,
    "validateIdTokenSignature",
    ()=>validateIdTokenSignature,
    "validateJwtAccessToken",
    ()=>validateJwtAccessToken,
    "validateJwtAuthResponse",
    ()=>validateJwtAuthResponse,
    "validateJwtIntrospectionSignature",
    ()=>validateJwtIntrospectionSignature,
    "validateJwtUserInfoSignature",
    ()=>validateJwtUserInfoSignature,
    "validateJwtUserinfoSignature",
    ()=>validateJwtUserinfoSignature
]);
let USER_AGENT;
if (typeof navigator === 'undefined' || !navigator.userAgent?.startsWith?.('Mozilla/5.0 ')) {
    const NAME = 'oauth4webapi';
    const VERSION = 'v2.17.0';
    USER_AGENT = `${NAME}/${VERSION}`;
}
function looseInstanceOf(input, expected) {
    if (input == null) {
        return false;
    }
    try {
        return input instanceof expected || Object.getPrototypeOf(input)[Symbol.toStringTag] === expected.prototype[Symbol.toStringTag];
    } catch  {
        return false;
    }
}
const clockSkew = Symbol();
const clockTolerance = Symbol();
const customFetch = Symbol();
const modifyAssertion = Symbol();
const jweDecrypt = Symbol();
const jwksCache = Symbol();
const useMtlsAlias = Symbol();
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function buf(input) {
    if (typeof input === 'string') {
        return encoder.encode(input);
    }
    return decoder.decode(input);
}
const CHUNK_SIZE = 0x8000;
function encodeBase64Url(input) {
    if (input instanceof ArrayBuffer) {
        input = new Uint8Array(input);
    }
    const arr = [];
    for(let i = 0; i < input.byteLength; i += CHUNK_SIZE){
        arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
    }
    return btoa(arr.join('')).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function decodeBase64Url(input) {
    try {
        const binary = atob(input.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, ''));
        const bytes = new Uint8Array(binary.length);
        for(let i = 0; i < binary.length; i++){
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    } catch (cause) {
        throw new OPE('The input to be decoded is not correctly encoded.', {
            cause
        });
    }
}
function b64u(input) {
    if (typeof input === 'string') {
        return decodeBase64Url(input);
    }
    return encodeBase64Url(input);
}
class LRU {
    constructor(maxSize){
        this.cache = new Map();
        this._cache = new Map();
        this.maxSize = maxSize;
    }
    get(key) {
        let v = this.cache.get(key);
        if (v) {
            return v;
        }
        if (v = this._cache.get(key)) {
            this.update(key, v);
            return v;
        }
        return undefined;
    }
    has(key) {
        return this.cache.has(key) || this._cache.has(key);
    }
    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.set(key, value);
        } else {
            this.update(key, value);
        }
        return this;
    }
    delete(key) {
        if (this.cache.has(key)) {
            return this.cache.delete(key);
        }
        if (this._cache.has(key)) {
            return this._cache.delete(key);
        }
        return false;
    }
    update(key, value) {
        this.cache.set(key, value);
        if (this.cache.size >= this.maxSize) {
            this._cache = this.cache;
            this.cache = new Map();
        }
    }
}
class UnsupportedOperationError extends Error {
    constructor(message){
        super(message ?? 'operation not supported');
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class OperationProcessingError extends Error {
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
const OPE = OperationProcessingError;
const dpopNonces = new LRU(100);
function isCryptoKey(key) {
    return key instanceof CryptoKey;
}
function isPrivateKey(key) {
    return isCryptoKey(key) && key.type === 'private';
}
function isPublicKey(key) {
    return isCryptoKey(key) && key.type === 'public';
}
const SUPPORTED_JWS_ALGS = [
    'PS256',
    'ES256',
    'RS256',
    'PS384',
    'ES384',
    'RS384',
    'PS512',
    'ES512',
    'RS512',
    'EdDSA'
];
function processDpopNonce(response) {
    try {
        const nonce = response.headers.get('dpop-nonce');
        if (nonce) {
            dpopNonces.set(new URL(response.url).origin, nonce);
        }
    } catch  {}
    return response;
}
function normalizeTyp(value) {
    return value.toLowerCase().replace(/^application\//, '');
}
function isJsonObject(input) {
    if (input === null || typeof input !== 'object' || Array.isArray(input)) {
        return false;
    }
    return true;
}
function prepareHeaders(input) {
    if (looseInstanceOf(input, Headers)) {
        input = Object.fromEntries(input.entries());
    }
    const headers = new Headers(input);
    if (USER_AGENT && !headers.has('user-agent')) {
        headers.set('user-agent', USER_AGENT);
    }
    if (headers.has('authorization')) {
        throw new TypeError('"options.headers" must not include the "authorization" header name');
    }
    if (headers.has('dpop')) {
        throw new TypeError('"options.headers" must not include the "dpop" header name');
    }
    return headers;
}
function signal(value) {
    if (typeof value === 'function') {
        value = value();
    }
    if (!(value instanceof AbortSignal)) {
        throw new TypeError('"options.signal" must return or be an instance of AbortSignal');
    }
    return value;
}
async function discoveryRequest(issuerIdentifier, options) {
    if (!(issuerIdentifier instanceof URL)) {
        throw new TypeError('"issuerIdentifier" must be an instance of URL');
    }
    if (issuerIdentifier.protocol !== 'https:' && issuerIdentifier.protocol !== 'http:') {
        throw new TypeError('"issuer.protocol" must be "https:" or "http:"');
    }
    const url = new URL(issuerIdentifier.href);
    switch(options?.algorithm){
        case undefined:
        case 'oidc':
            url.pathname = `${url.pathname}/.well-known/openid-configuration`.replace('//', '/');
            break;
        case 'oauth2':
            if (url.pathname === '/') {
                url.pathname = '.well-known/oauth-authorization-server';
            } else {
                url.pathname = `.well-known/oauth-authorization-server/${url.pathname}`.replace('//', '/');
            }
            break;
        default:
            throw new TypeError('"options.algorithm" must be "oidc" (default), or "oauth2"');
    }
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return (options?.[customFetch] || fetch)(url.href, {
        headers: Object.fromEntries(headers.entries()),
        method: 'GET',
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : null
    }).then(processDpopNonce);
}
function validateString(input) {
    return typeof input === 'string' && input.length !== 0;
}
async function processDiscoveryResponse(expectedIssuerIdentifier, response) {
    if (!(expectedIssuerIdentifier instanceof URL)) {
        throw new TypeError('"expectedIssuer" must be an instance of URL');
    }
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 200) {
        throw new OPE('"response" is not a conform Authorization Server Metadata response');
    }
    assertReadableResponse(response);
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        throw new OPE('failed to parse "response" body as JSON', {
            cause
        });
    }
    if (!isJsonObject(json)) {
        throw new OPE('"response" body must be a top level object');
    }
    if (!validateString(json.issuer)) {
        throw new OPE('"response" body "issuer" property must be a non-empty string');
    }
    if (new URL(json.issuer).href !== expectedIssuerIdentifier.href) {
        throw new OPE('"response" body "issuer" does not match "expectedIssuer"');
    }
    return json;
}
function randomBytes() {
    return b64u(crypto.getRandomValues(new Uint8Array(32)));
}
function generateRandomCodeVerifier() {
    return randomBytes();
}
function generateRandomState() {
    return randomBytes();
}
function generateRandomNonce() {
    return randomBytes();
}
async function calculatePKCECodeChallenge(codeVerifier) {
    if (!validateString(codeVerifier)) {
        throw new TypeError('"codeVerifier" must be a non-empty string');
    }
    return b64u(await crypto.subtle.digest('SHA-256', buf(codeVerifier)));
}
function getKeyAndKid(input) {
    if (input instanceof CryptoKey) {
        return {
            key: input
        };
    }
    if (!(input?.key instanceof CryptoKey)) {
        return {};
    }
    if (input.kid !== undefined && !validateString(input.kid)) {
        throw new TypeError('"kid" must be a non-empty string');
    }
    return {
        key: input.key,
        kid: input.kid,
        modifyAssertion: input[modifyAssertion]
    };
}
function formUrlEncode(token) {
    return encodeURIComponent(token).replace(/%20/g, '+');
}
function clientSecretBasic(clientId, clientSecret) {
    const username = formUrlEncode(clientId);
    const password = formUrlEncode(clientSecret);
    const credentials = btoa(`${username}:${password}`);
    return `Basic ${credentials}`;
}
function psAlg(key) {
    switch(key.algorithm.hash.name){
        case 'SHA-256':
            return 'PS256';
        case 'SHA-384':
            return 'PS384';
        case 'SHA-512':
            return 'PS512';
        default:
            throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name');
    }
}
function rsAlg(key) {
    switch(key.algorithm.hash.name){
        case 'SHA-256':
            return 'RS256';
        case 'SHA-384':
            return 'RS384';
        case 'SHA-512':
            return 'RS512';
        default:
            throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name');
    }
}
function esAlg(key) {
    switch(key.algorithm.namedCurve){
        case 'P-256':
            return 'ES256';
        case 'P-384':
            return 'ES384';
        case 'P-521':
            return 'ES512';
        default:
            throw new UnsupportedOperationError('unsupported EcKeyAlgorithm namedCurve');
    }
}
function keyToJws(key) {
    switch(key.algorithm.name){
        case 'RSA-PSS':
            return psAlg(key);
        case 'RSASSA-PKCS1-v1_5':
            return rsAlg(key);
        case 'ECDSA':
            return esAlg(key);
        case 'Ed25519':
        case 'Ed448':
            return 'EdDSA';
        default:
            throw new UnsupportedOperationError('unsupported CryptoKey algorithm name');
    }
}
function getClockSkew(client) {
    const skew = client?.[clockSkew];
    return typeof skew === 'number' && Number.isFinite(skew) ? skew : 0;
}
function getClockTolerance(client) {
    const tolerance = client?.[clockTolerance];
    return typeof tolerance === 'number' && Number.isFinite(tolerance) && Math.sign(tolerance) !== -1 ? tolerance : 30;
}
function epochTime() {
    return Math.floor(Date.now() / 1000);
}
function clientAssertion(as, client) {
    const now = epochTime() + getClockSkew(client);
    return {
        jti: randomBytes(),
        aud: [
            as.issuer,
            as.token_endpoint
        ],
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id,
        sub: client.client_id
    };
}
async function privateKeyJwt(as, client, key, kid, modifyAssertion) {
    const header = {
        alg: keyToJws(key),
        kid
    };
    const payload = clientAssertion(as, client);
    modifyAssertion?.(header, payload);
    return jwt(header, payload, key);
}
function assertAs(as) {
    if (typeof as !== 'object' || as === null) {
        throw new TypeError('"as" must be an object');
    }
    if (!validateString(as.issuer)) {
        throw new TypeError('"as.issuer" property must be a non-empty string');
    }
    return true;
}
function assertClient(client) {
    if (typeof client !== 'object' || client === null) {
        throw new TypeError('"client" must be an object');
    }
    if (!validateString(client.client_id)) {
        throw new TypeError('"client.client_id" property must be a non-empty string');
    }
    return true;
}
function assertClientSecret(clientSecret) {
    if (!validateString(clientSecret)) {
        throw new TypeError('"client.client_secret" property must be a non-empty string');
    }
    return clientSecret;
}
function assertNoClientPrivateKey(clientAuthMethod, clientPrivateKey) {
    if (clientPrivateKey !== undefined) {
        throw new TypeError(`"options.clientPrivateKey" property must not be provided when ${clientAuthMethod} client authentication method is used.`);
    }
}
function assertNoClientSecret(clientAuthMethod, clientSecret) {
    if (clientSecret !== undefined) {
        throw new TypeError(`"client.client_secret" property must not be provided when ${clientAuthMethod} client authentication method is used.`);
    }
}
async function clientAuthentication(as, client, body, headers, clientPrivateKey) {
    body.delete('client_secret');
    body.delete('client_assertion_type');
    body.delete('client_assertion');
    switch(client.token_endpoint_auth_method){
        case undefined:
        case 'client_secret_basic':
            {
                assertNoClientPrivateKey('client_secret_basic', clientPrivateKey);
                headers.set('authorization', clientSecretBasic(client.client_id, assertClientSecret(client.client_secret)));
                break;
            }
        case 'client_secret_post':
            {
                assertNoClientPrivateKey('client_secret_post', clientPrivateKey);
                body.set('client_id', client.client_id);
                body.set('client_secret', assertClientSecret(client.client_secret));
                break;
            }
        case 'private_key_jwt':
            {
                assertNoClientSecret('private_key_jwt', client.client_secret);
                if (clientPrivateKey === undefined) {
                    throw new TypeError('"options.clientPrivateKey" must be provided when "client.token_endpoint_auth_method" is "private_key_jwt"');
                }
                const { key, kid, modifyAssertion } = getKeyAndKid(clientPrivateKey);
                if (!isPrivateKey(key)) {
                    throw new TypeError('"options.clientPrivateKey.key" must be a private CryptoKey');
                }
                body.set('client_id', client.client_id);
                body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
                body.set('client_assertion', await privateKeyJwt(as, client, key, kid, modifyAssertion));
                break;
            }
        case 'tls_client_auth':
        case 'self_signed_tls_client_auth':
        case 'none':
            {
                assertNoClientSecret(client.token_endpoint_auth_method, client.client_secret);
                assertNoClientPrivateKey(client.token_endpoint_auth_method, clientPrivateKey);
                body.set('client_id', client.client_id);
                break;
            }
        default:
            throw new UnsupportedOperationError('unsupported client token_endpoint_auth_method');
    }
}
async function jwt(header, payload, key) {
    if (!key.usages.includes('sign')) {
        throw new TypeError('CryptoKey instances used for signing assertions must include "sign" in their "usages"');
    }
    const input = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(payload)))}`;
    const signature = b64u(await crypto.subtle.sign(keyToSubtle(key), key, buf(input)));
    return `${input}.${signature}`;
}
async function issueRequestObject(as, client, parameters, privateKey) {
    assertAs(as);
    assertClient(client);
    parameters = new URLSearchParams(parameters);
    const { key, kid, modifyAssertion } = getKeyAndKid(privateKey);
    if (!isPrivateKey(key)) {
        throw new TypeError('"privateKey.key" must be a private CryptoKey');
    }
    parameters.set('client_id', client.client_id);
    const now = epochTime() + getClockSkew(client);
    const claims = {
        ...Object.fromEntries(parameters.entries()),
        jti: randomBytes(),
        aud: as.issuer,
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id
    };
    let resource;
    if (parameters.has('resource') && (resource = parameters.getAll('resource')) && resource.length > 1) {
        claims.resource = resource;
    }
    {
        let value = parameters.get('max_age');
        if (value !== null) {
            claims.max_age = parseInt(value, 10);
            if (!Number.isFinite(claims.max_age)) {
                throw new OPE('"max_age" parameter must be a number');
            }
        }
    }
    {
        let value = parameters.get('claims');
        if (value !== null) {
            try {
                claims.claims = JSON.parse(value);
            } catch (cause) {
                throw new OPE('failed to parse the "claims" parameter as JSON', {
                    cause
                });
            }
            if (!isJsonObject(claims.claims)) {
                throw new OPE('"claims" parameter must be a JSON with a top level object');
            }
        }
    }
    {
        let value = parameters.get('authorization_details');
        if (value !== null) {
            try {
                claims.authorization_details = JSON.parse(value);
            } catch (cause) {
                throw new OPE('failed to parse the "authorization_details" parameter as JSON', {
                    cause
                });
            }
            if (!Array.isArray(claims.authorization_details)) {
                throw new OPE('"authorization_details" parameter must be a JSON with a top level array');
            }
        }
    }
    const header = {
        alg: keyToJws(key),
        typ: 'oauth-authz-req+jwt',
        kid
    };
    modifyAssertion?.(header, claims);
    return jwt(header, claims, key);
}
async function dpopProofJwt(headers, options, url, htm, clockSkew, accessToken) {
    const { privateKey, publicKey, nonce = dpopNonces.get(url.origin) } = options;
    if (!isPrivateKey(privateKey)) {
        throw new TypeError('"DPoP.privateKey" must be a private CryptoKey');
    }
    if (!isPublicKey(publicKey)) {
        throw new TypeError('"DPoP.publicKey" must be a public CryptoKey');
    }
    if (nonce !== undefined && !validateString(nonce)) {
        throw new TypeError('"DPoP.nonce" must be a non-empty string or undefined');
    }
    if (!publicKey.extractable) {
        throw new TypeError('"DPoP.publicKey.extractable" must be true');
    }
    const now = epochTime() + clockSkew;
    const header = {
        alg: keyToJws(privateKey),
        typ: 'dpop+jwt',
        jwk: await publicJwk(publicKey)
    };
    const payload = {
        iat: now,
        jti: randomBytes(),
        htm,
        nonce,
        htu: `${url.origin}${url.pathname}`,
        ath: accessToken ? b64u(await crypto.subtle.digest('SHA-256', buf(accessToken))) : undefined
    };
    options[modifyAssertion]?.(header, payload);
    headers.set('dpop', await jwt(header, payload, privateKey));
}
let jwkCache;
async function getSetPublicJwkCache(key) {
    const { kty, e, n, x, y, crv } = await crypto.subtle.exportKey('jwk', key);
    const jwk = {
        kty,
        e,
        n,
        x,
        y,
        crv
    };
    jwkCache.set(key, jwk);
    return jwk;
}
async function publicJwk(key) {
    jwkCache || (jwkCache = new WeakMap());
    return jwkCache.get(key) || getSetPublicJwkCache(key);
}
function validateEndpoint(value, endpoint, useMtlsAlias) {
    if (typeof value !== 'string') {
        if (useMtlsAlias) {
            throw new TypeError(`"as.mtls_endpoint_aliases.${endpoint}" must be a string`);
        }
        throw new TypeError(`"as.${endpoint}" must be a string`);
    }
    return new URL(value);
}
function resolveEndpoint(as, endpoint, useMtlsAlias = false) {
    if (useMtlsAlias && as.mtls_endpoint_aliases && endpoint in as.mtls_endpoint_aliases) {
        return validateEndpoint(as.mtls_endpoint_aliases[endpoint], endpoint, useMtlsAlias);
    }
    return validateEndpoint(as[endpoint], endpoint, useMtlsAlias);
}
function alias(client, options) {
    if (client.use_mtls_endpoint_aliases || options?.[useMtlsAlias]) {
        return true;
    }
    return false;
}
async function pushedAuthorizationRequest(as, client, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'pushed_authorization_request_endpoint', alias(client, options));
    const body = new URLSearchParams(parameters);
    body.set('client_id', client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    if (options?.DPoP !== undefined) {
        await dpopProofJwt(headers, options.DPoP, url, 'POST', getClockSkew(client));
    }
    return authenticatedRequest(as, client, 'POST', url, body, headers, options);
}
function isOAuth2Error(input) {
    const value = input;
    if (typeof value !== 'object' || Array.isArray(value) || value === null) {
        return false;
    }
    return value.error !== undefined;
}
function unquote(value) {
    if (value.length >= 2 && value[0] === '"' && value[value.length - 1] === '"') {
        return value.slice(1, -1);
    }
    return value;
}
const SPLIT_REGEXP = /((?:,|, )?[0-9a-zA-Z!#$%&'*+-.^_`|~]+=)/;
const SCHEMES_REGEXP = /(?:^|, ?)([0-9a-zA-Z!#$%&'*+\-.^_`|~]+)(?=$|[ ,])/g;
function wwwAuth(scheme, params) {
    const arr = params.split(SPLIT_REGEXP).slice(1);
    if (!arr.length) {
        return {
            scheme: scheme.toLowerCase(),
            parameters: {}
        };
    }
    arr[arr.length - 1] = arr[arr.length - 1].replace(/,$/, '');
    const parameters = {};
    for(let i = 1; i < arr.length; i += 2){
        const idx = i;
        if (arr[idx][0] === '"') {
            while(arr[idx].slice(-1) !== '"' && ++i < arr.length){
                arr[idx] += arr[i];
            }
        }
        const key = arr[idx - 1].replace(/^(?:, ?)|=$/g, '').toLowerCase();
        parameters[key] = unquote(arr[idx]);
    }
    return {
        scheme: scheme.toLowerCase(),
        parameters
    };
}
function parseWwwAuthenticateChallenges(response) {
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    const header = response.headers.get('www-authenticate');
    if (header === null) {
        return undefined;
    }
    const result = [];
    for (const { 1: scheme, index } of header.matchAll(SCHEMES_REGEXP)){
        result.push([
            scheme,
            index
        ]);
    }
    if (!result.length) {
        return undefined;
    }
    const challenges = result.map(([scheme, indexOf], i, others)=>{
        const next = others[i + 1];
        let parameters;
        if (next) {
            parameters = header.slice(indexOf, next[1]);
        } else {
            parameters = header.slice(indexOf);
        }
        return wwwAuth(scheme, parameters);
    });
    return challenges;
}
async function processPushedAuthorizationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 201) {
        let err;
        if (err = await handleOAuthBodyError(response)) {
            return err;
        }
        throw new OPE('"response" is not a conform Pushed Authorization Request Endpoint response');
    }
    assertReadableResponse(response);
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        throw new OPE('failed to parse "response" body as JSON', {
            cause
        });
    }
    if (!isJsonObject(json)) {
        throw new OPE('"response" body must be a top level object');
    }
    if (!validateString(json.request_uri)) {
        throw new OPE('"response" body "request_uri" property must be a non-empty string');
    }
    if (typeof json.expires_in !== 'number' || json.expires_in <= 0) {
        throw new OPE('"response" body "expires_in" property must be a positive number');
    }
    return json;
}
async function protectedResourceRequest(accessToken, method, url, headers, body, options) {
    if (!validateString(accessToken)) {
        throw new TypeError('"accessToken" must be a non-empty string');
    }
    if (!(url instanceof URL)) {
        throw new TypeError('"url" must be an instance of URL');
    }
    headers = prepareHeaders(headers);
    if (options?.DPoP === undefined) {
        headers.set('authorization', `Bearer ${accessToken}`);
    } else {
        await dpopProofJwt(headers, options.DPoP, url, method.toUpperCase(), getClockSkew({
            [clockSkew]: options?.[clockSkew]
        }), accessToken);
        headers.set('authorization', `DPoP ${accessToken}`);
    }
    return (options?.[customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : null
    }).then(processDpopNonce);
}
async function userInfoRequest(as, client, accessToken, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'userinfo_endpoint', alias(client, options));
    const headers = prepareHeaders(options?.headers);
    if (client.userinfo_signed_response_alg) {
        headers.set('accept', 'application/jwt');
    } else {
        headers.set('accept', 'application/json');
        headers.append('accept', 'application/jwt');
    }
    return protectedResourceRequest(accessToken, 'GET', url, headers, null, {
        ...options,
        [clockSkew]: getClockSkew(client)
    });
}
let jwksMap;
function setJwksCache(as, jwks, uat, cache) {
    jwksMap || (jwksMap = new WeakMap());
    jwksMap.set(as, {
        jwks,
        uat,
        get age () {
            return epochTime() - this.uat;
        }
    });
    if (cache) {
        Object.assign(cache, {
            jwks: structuredClone(jwks),
            uat
        });
    }
}
function isFreshJwksCache(input) {
    if (typeof input !== 'object' || input === null) {
        return false;
    }
    if (!('uat' in input) || typeof input.uat !== 'number' || epochTime() - input.uat >= 300) {
        return false;
    }
    if (!('jwks' in input) || !isJsonObject(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, isJsonObject)) {
        return false;
    }
    return true;
}
function clearJwksCache(as, cache) {
    jwksMap?.delete(as);
    delete cache?.jwks;
    delete cache?.uat;
}
async function getPublicSigKeyFromIssuerJwksUri(as, options, header) {
    const { alg, kid } = header;
    checkSupportedJwsAlg(alg);
    if (!jwksMap?.has(as) && isFreshJwksCache(options?.[jwksCache])) {
        setJwksCache(as, options?.[jwksCache].jwks, options?.[jwksCache].uat);
    }
    let jwks;
    let age;
    if (jwksMap?.has(as)) {
        ;
        ({ jwks, age } = jwksMap.get(as));
        if (age >= 300) {
            clearJwksCache(as, options?.[jwksCache]);
            return getPublicSigKeyFromIssuerJwksUri(as, options, header);
        }
    } else {
        jwks = await jwksRequest(as, options).then(processJwksResponse);
        age = 0;
        setJwksCache(as, jwks, epochTime(), options?.[jwksCache]);
    }
    let kty;
    switch(alg.slice(0, 2)){
        case 'RS':
        case 'PS':
            kty = 'RSA';
            break;
        case 'ES':
            kty = 'EC';
            break;
        case 'Ed':
            kty = 'OKP';
            break;
        default:
            throw new UnsupportedOperationError();
    }
    const candidates = jwks.keys.filter((jwk)=>{
        if (jwk.kty !== kty) {
            return false;
        }
        if (kid !== undefined && kid !== jwk.kid) {
            return false;
        }
        if (jwk.alg !== undefined && alg !== jwk.alg) {
            return false;
        }
        if (jwk.use !== undefined && jwk.use !== 'sig') {
            return false;
        }
        if (jwk.key_ops?.includes('verify') === false) {
            return false;
        }
        switch(true){
            case alg === 'ES256' && jwk.crv !== 'P-256':
            case alg === 'ES384' && jwk.crv !== 'P-384':
            case alg === 'ES512' && jwk.crv !== 'P-521':
            case alg === 'EdDSA' && !(jwk.crv === 'Ed25519' || jwk.crv === 'Ed448'):
                return false;
        }
        return true;
    });
    const { 0: jwk, length } = candidates;
    if (!length) {
        if (age >= 60) {
            clearJwksCache(as, options?.[jwksCache]);
            return getPublicSigKeyFromIssuerJwksUri(as, options, header);
        }
        throw new OPE('error when selecting a JWT verification key, no applicable keys found');
    }
    if (length !== 1) {
        throw new OPE('error when selecting a JWT verification key, multiple applicable keys found, a "kid" JWT Header Parameter is required');
    }
    const key = await importJwk(alg, jwk);
    if (key.type !== 'public') {
        throw new OPE('jwks_uri must only contain public keys');
    }
    return key;
}
const skipSubjectCheck = Symbol();
function getContentType(response) {
    return response.headers.get('content-type')?.split(';')[0];
}
async function processUserInfoResponse(as, client, expectedSubject, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 200) {
        throw new OPE('"response" is not a conform UserInfo Endpoint response');
    }
    let json;
    if (getContentType(response) === 'application/jwt') {
        assertReadableResponse(response);
        const { claims, jwt } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.userinfo_signed_response_alg, as.userinfo_signing_alg_values_supported), noSignatureCheck, getClockSkew(client), getClockTolerance(client), client[jweDecrypt]).then(validateOptionalAudience.bind(undefined, client.client_id)).then(validateOptionalIssuer.bind(undefined, as.issuer));
        jwtResponseBodies.set(response, jwt);
        json = claims;
    } else {
        if (client.userinfo_signed_response_alg) {
            throw new OPE('JWT UserInfo Response expected');
        }
        assertReadableResponse(response);
        try {
            json = await response.json();
        } catch (cause) {
            throw new OPE('failed to parse "response" body as JSON', {
                cause
            });
        }
    }
    if (!isJsonObject(json)) {
        throw new OPE('"response" body must be a top level object');
    }
    if (!validateString(json.sub)) {
        throw new OPE('"response" body "sub" property must be a non-empty string');
    }
    switch(expectedSubject){
        case skipSubjectCheck:
            break;
        default:
            if (!validateString(expectedSubject)) {
                throw new OPE('"expectedSubject" must be a non-empty string');
            }
            if (json.sub !== expectedSubject) {
                throw new OPE('unexpected "response" body "sub" value');
            }
    }
    return json;
}
async function authenticatedRequest(as, client, method, url, body, headers, options) {
    await clientAuthentication(as, client, body, headers, options?.clientPrivateKey);
    headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    return (options?.[customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : null
    }).then(processDpopNonce);
}
async function tokenEndpointRequest(as, client, grantType, parameters, options) {
    const url = resolveEndpoint(as, 'token_endpoint', alias(client, options));
    parameters.set('grant_type', grantType);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    if (options?.DPoP !== undefined) {
        await dpopProofJwt(headers, options.DPoP, url, 'POST', getClockSkew(client));
    }
    return authenticatedRequest(as, client, 'POST', url, parameters, headers, options);
}
async function refreshTokenGrantRequest(as, client, refreshToken, options) {
    assertAs(as);
    assertClient(client);
    if (!validateString(refreshToken)) {
        throw new TypeError('"refreshToken" must be a non-empty string');
    }
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('refresh_token', refreshToken);
    return tokenEndpointRequest(as, client, 'refresh_token', parameters, options);
}
const idTokenClaims = new WeakMap();
const jwtResponseBodies = new WeakMap();
function getValidatedIdTokenClaims(ref) {
    if (!ref.id_token) {
        return undefined;
    }
    const claims = idTokenClaims.get(ref);
    if (!claims) {
        throw new TypeError('"ref" was already garbage collected or did not resolve from the proper sources');
    }
    return claims[0];
}
async function validateIdTokenSignature(as, ref, options) {
    assertAs(as);
    if (!idTokenClaims.has(ref)) {
        throw new OPE('"ref" does not contain an ID Token to verify the signature of');
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = idTokenClaims.get(ref)[1].split('.');
    const header = JSON.parse(buf(b64u(protectedHeader)));
    if (header.alg.startsWith('HS')) {
        throw new UnsupportedOperationError();
    }
    let key;
    key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, b64u(encodedSignature));
}
async function validateJwtResponseSignature(as, ref, options) {
    assertAs(as);
    if (!jwtResponseBodies.has(ref)) {
        throw new OPE('"ref" does not contain a processed JWT Response to verify the signature of');
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwtResponseBodies.get(ref).split('.');
    const header = JSON.parse(buf(b64u(protectedHeader)));
    if (header.alg.startsWith('HS')) {
        throw new UnsupportedOperationError();
    }
    let key;
    key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, b64u(encodedSignature));
}
function validateJwtUserInfoSignature(as, ref, options) {
    return validateJwtResponseSignature(as, ref, options);
}
function validateJwtIntrospectionSignature(as, ref, options) {
    return validateJwtResponseSignature(as, ref, options);
}
async function processGenericAccessTokenResponse(as, client, response, ignoreIdToken = false, ignoreRefreshToken = false) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 200) {
        let err;
        if (err = await handleOAuthBodyError(response)) {
            return err;
        }
        throw new OPE('"response" is not a conform Token Endpoint response');
    }
    assertReadableResponse(response);
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        throw new OPE('failed to parse "response" body as JSON', {
            cause
        });
    }
    if (!isJsonObject(json)) {
        throw new OPE('"response" body must be a top level object');
    }
    if (!validateString(json.access_token)) {
        throw new OPE('"response" body "access_token" property must be a non-empty string');
    }
    if (!validateString(json.token_type)) {
        throw new OPE('"response" body "token_type" property must be a non-empty string');
    }
    json.token_type = json.token_type.toLowerCase();
    if (json.token_type !== 'dpop' && json.token_type !== 'bearer') {
        throw new UnsupportedOperationError('unsupported `token_type` value');
    }
    if (json.expires_in !== undefined && (typeof json.expires_in !== 'number' || json.expires_in <= 0)) {
        throw new OPE('"response" body "expires_in" property must be a positive number');
    }
    if (!ignoreRefreshToken && json.refresh_token !== undefined && !validateString(json.refresh_token)) {
        throw new OPE('"response" body "refresh_token" property must be a non-empty string');
    }
    if (json.scope !== undefined && typeof json.scope !== 'string') {
        throw new OPE('"response" body "scope" property must be a string');
    }
    if (!ignoreIdToken) {
        if (json.id_token !== undefined && !validateString(json.id_token)) {
            throw new OPE('"response" body "id_token" property must be a non-empty string');
        }
        if (json.id_token) {
            const { claims, jwt } = await validateJwt(json.id_token, checkSigningAlgorithm.bind(undefined, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported), noSignatureCheck, getClockSkew(client), getClockTolerance(client), client[jweDecrypt]).then(validatePresence.bind(undefined, [
                'aud',
                'exp',
                'iat',
                'iss',
                'sub'
            ])).then(validateIssuer.bind(undefined, as.issuer)).then(validateAudience.bind(undefined, client.client_id));
            if (Array.isArray(claims.aud) && claims.aud.length !== 1) {
                if (claims.azp === undefined) {
                    throw new OPE('ID Token "aud" (audience) claim includes additional untrusted audiences');
                }
                if (claims.azp !== client.client_id) {
                    throw new OPE('unexpected ID Token "azp" (authorized party) claim value');
                }
            }
            if (claims.auth_time !== undefined && (!Number.isFinite(claims.auth_time) || Math.sign(claims.auth_time) !== 1)) {
                throw new OPE('ID Token "auth_time" (authentication time) must be a positive number');
            }
            idTokenClaims.set(json, [
                claims,
                jwt
            ]);
        }
    }
    return json;
}
async function processRefreshTokenResponse(as, client, response) {
    return processGenericAccessTokenResponse(as, client, response);
}
function validateOptionalAudience(expected, result) {
    if (result.claims.aud !== undefined) {
        return validateAudience(expected, result);
    }
    return result;
}
function validateAudience(expected, result) {
    if (Array.isArray(result.claims.aud)) {
        if (!result.claims.aud.includes(expected)) {
            throw new OPE('unexpected JWT "aud" (audience) claim value');
        }
    } else if (result.claims.aud !== expected) {
        throw new OPE('unexpected JWT "aud" (audience) claim value');
    }
    return result;
}
function validateOptionalIssuer(expected, result) {
    if (result.claims.iss !== undefined) {
        return validateIssuer(expected, result);
    }
    return result;
}
function validateIssuer(expected, result) {
    if (result.claims.iss !== expected) {
        throw new OPE('unexpected JWT "iss" (issuer) claim value');
    }
    return result;
}
const branded = new WeakSet();
function brand(searchParams) {
    branded.add(searchParams);
    return searchParams;
}
async function authorizationCodeGrantRequest(as, client, callbackParameters, redirectUri, codeVerifier, options) {
    assertAs(as);
    assertClient(client);
    if (!branded.has(callbackParameters)) {
        throw new TypeError('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()');
    }
    if (!validateString(redirectUri)) {
        throw new TypeError('"redirectUri" must be a non-empty string');
    }
    if (!validateString(codeVerifier)) {
        throw new TypeError('"codeVerifier" must be a non-empty string');
    }
    const code = getURLSearchParameter(callbackParameters, 'code');
    if (!code) {
        throw new OPE('no authorization code in "callbackParameters"');
    }
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('redirect_uri', redirectUri);
    parameters.set('code_verifier', codeVerifier);
    parameters.set('code', code);
    return tokenEndpointRequest(as, client, 'authorization_code', parameters, options);
}
const jwtClaimNames = {
    aud: 'audience',
    c_hash: 'code hash',
    client_id: 'client id',
    exp: 'expiration time',
    iat: 'issued at',
    iss: 'issuer',
    jti: 'jwt id',
    nonce: 'nonce',
    s_hash: 'state hash',
    sub: 'subject',
    ath: 'access token hash',
    htm: 'http method',
    htu: 'http uri',
    cnf: 'confirmation'
};
function validatePresence(required, result) {
    for (const claim of required){
        if (result.claims[claim] === undefined) {
            throw new OPE(`JWT "${claim}" (${jwtClaimNames[claim]}) claim missing`);
        }
    }
    return result;
}
const expectNoNonce = Symbol();
const skipAuthTimeCheck = Symbol();
async function processAuthorizationCodeOpenIDResponse(as, client, response, expectedNonce, maxAge) {
    const result = await processGenericAccessTokenResponse(as, client, response);
    if (isOAuth2Error(result)) {
        return result;
    }
    if (!validateString(result.id_token)) {
        throw new OPE('"response" body "id_token" property must be a non-empty string');
    }
    maxAge ?? (maxAge = client.default_max_age ?? skipAuthTimeCheck);
    const claims = getValidatedIdTokenClaims(result);
    if ((client.require_auth_time || maxAge !== skipAuthTimeCheck) && claims.auth_time === undefined) {
        throw new OPE('ID Token "auth_time" (authentication time) claim missing');
    }
    if (maxAge !== skipAuthTimeCheck) {
        if (typeof maxAge !== 'number' || maxAge < 0) {
            throw new TypeError('"maxAge" must be a non-negative number');
        }
        const now = epochTime() + getClockSkew(client);
        const tolerance = getClockTolerance(client);
        if (claims.auth_time + maxAge < now - tolerance) {
            throw new OPE('too much time has elapsed since the last End-User authentication');
        }
    }
    switch(expectedNonce){
        case undefined:
        case expectNoNonce:
            if (claims.nonce !== undefined) {
                throw new OPE('unexpected ID Token "nonce" claim value');
            }
            break;
        default:
            if (!validateString(expectedNonce)) {
                throw new TypeError('"expectedNonce" must be a non-empty string');
            }
            if (claims.nonce === undefined) {
                throw new OPE('ID Token "nonce" claim missing');
            }
            if (claims.nonce !== expectedNonce) {
                throw new OPE('unexpected ID Token "nonce" claim value');
            }
    }
    return result;
}
async function processAuthorizationCodeOAuth2Response(as, client, response) {
    const result = await processGenericAccessTokenResponse(as, client, response, true);
    if (isOAuth2Error(result)) {
        return result;
    }
    if (result.id_token !== undefined) {
        if (typeof result.id_token === 'string' && result.id_token.length) {
            throw new OPE('Unexpected ID Token returned, use processAuthorizationCodeOpenIDResponse() for OpenID Connect callback processing');
        }
        delete result.id_token;
    }
    return result;
}
function checkJwtType(expected, result) {
    if (typeof result.header.typ !== 'string' || normalizeTyp(result.header.typ) !== expected) {
        throw new OPE('unexpected JWT "typ" header parameter value');
    }
    return result;
}
async function clientCredentialsGrantRequest(as, client, parameters, options) {
    assertAs(as);
    assertClient(client);
    return tokenEndpointRequest(as, client, 'client_credentials', new URLSearchParams(parameters), options);
}
async function genericTokenEndpointRequest(as, client, grantType, parameters, options) {
    assertAs(as);
    assertClient(client);
    if (!validateString(grantType)) {
        throw new TypeError('"grantType" must be a non-empty string');
    }
    return tokenEndpointRequest(as, client, grantType, new URLSearchParams(parameters), options);
}
async function processClientCredentialsResponse(as, client, response) {
    const result = await processGenericAccessTokenResponse(as, client, response, true, true);
    if (isOAuth2Error(result)) {
        return result;
    }
    return result;
}
async function revocationRequest(as, client, token, options) {
    assertAs(as);
    assertClient(client);
    if (!validateString(token)) {
        throw new TypeError('"token" must be a non-empty string');
    }
    const url = resolveEndpoint(as, 'revocation_endpoint', alias(client, options));
    const body = new URLSearchParams(options?.additionalParameters);
    body.set('token', token);
    const headers = prepareHeaders(options?.headers);
    headers.delete('accept');
    return authenticatedRequest(as, client, 'POST', url, body, headers, options);
}
async function processRevocationResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 200) {
        let err;
        if (err = await handleOAuthBodyError(response)) {
            return err;
        }
        throw new OPE('"response" is not a conform Revocation Endpoint response');
    }
    return undefined;
}
function assertReadableResponse(response) {
    if (response.bodyUsed) {
        throw new TypeError('"response" body has been used already');
    }
}
async function introspectionRequest(as, client, token, options) {
    assertAs(as);
    assertClient(client);
    if (!validateString(token)) {
        throw new TypeError('"token" must be a non-empty string');
    }
    const url = resolveEndpoint(as, 'introspection_endpoint', alias(client, options));
    const body = new URLSearchParams(options?.additionalParameters);
    body.set('token', token);
    const headers = prepareHeaders(options?.headers);
    if (options?.requestJwtResponse ?? client.introspection_signed_response_alg) {
        headers.set('accept', 'application/token-introspection+jwt');
    } else {
        headers.set('accept', 'application/json');
    }
    return authenticatedRequest(as, client, 'POST', url, body, headers, options);
}
async function processIntrospectionResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 200) {
        let err;
        if (err = await handleOAuthBodyError(response)) {
            return err;
        }
        throw new OPE('"response" is not a conform Introspection Endpoint response');
    }
    let json;
    if (getContentType(response) === 'application/token-introspection+jwt') {
        assertReadableResponse(response);
        const { claims, jwt } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.introspection_signed_response_alg, as.introspection_signing_alg_values_supported), noSignatureCheck, getClockSkew(client), getClockTolerance(client), client[jweDecrypt]).then(checkJwtType.bind(undefined, 'token-introspection+jwt')).then(validatePresence.bind(undefined, [
            'aud',
            'iat',
            'iss'
        ])).then(validateIssuer.bind(undefined, as.issuer)).then(validateAudience.bind(undefined, client.client_id));
        jwtResponseBodies.set(response, jwt);
        json = claims.token_introspection;
        if (!isJsonObject(json)) {
            throw new OPE('JWT "token_introspection" claim must be a JSON object');
        }
    } else {
        assertReadableResponse(response);
        try {
            json = await response.json();
        } catch (cause) {
            throw new OPE('failed to parse "response" body as JSON', {
                cause
            });
        }
        if (!isJsonObject(json)) {
            throw new OPE('"response" body must be a top level object');
        }
    }
    if (typeof json.active !== 'boolean') {
        throw new OPE('"response" body "active" property must be a boolean');
    }
    return json;
}
async function jwksRequest(as, options) {
    assertAs(as);
    const url = resolveEndpoint(as, 'jwks_uri');
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    headers.append('accept', 'application/jwk-set+json');
    return (options?.[customFetch] || fetch)(url.href, {
        headers: Object.fromEntries(headers.entries()),
        method: 'GET',
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : null
    }).then(processDpopNonce);
}
async function processJwksResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 200) {
        throw new OPE('"response" is not a conform JSON Web Key Set response');
    }
    assertReadableResponse(response);
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        throw new OPE('failed to parse "response" body as JSON', {
            cause
        });
    }
    if (!isJsonObject(json)) {
        throw new OPE('"response" body must be a top level object');
    }
    if (!Array.isArray(json.keys)) {
        throw new OPE('"response" body "keys" property must be an array');
    }
    if (!Array.prototype.every.call(json.keys, isJsonObject)) {
        throw new OPE('"response" body "keys" property members must be JWK formatted objects');
    }
    return json;
}
async function handleOAuthBodyError(response) {
    if (response.status > 399 && response.status < 500) {
        assertReadableResponse(response);
        try {
            const json = await response.json();
            if (isJsonObject(json) && typeof json.error === 'string' && json.error.length) {
                if (json.error_description !== undefined && typeof json.error_description !== 'string') {
                    delete json.error_description;
                }
                if (json.error_uri !== undefined && typeof json.error_uri !== 'string') {
                    delete json.error_uri;
                }
                if (json.algs !== undefined && typeof json.algs !== 'string') {
                    delete json.algs;
                }
                if (json.scope !== undefined && typeof json.scope !== 'string') {
                    delete json.scope;
                }
                return json;
            }
        } catch  {}
    }
    return undefined;
}
function checkSupportedJwsAlg(alg) {
    if (!SUPPORTED_JWS_ALGS.includes(alg)) {
        throw new UnsupportedOperationError('unsupported JWS "alg" identifier');
    }
    return alg;
}
function checkRsaKeyAlgorithm(algorithm) {
    if (typeof algorithm.modulusLength !== 'number' || algorithm.modulusLength < 2048) {
        throw new OPE(`${algorithm.name} modulusLength must be at least 2048 bits`);
    }
}
function ecdsaHashName(namedCurve) {
    switch(namedCurve){
        case 'P-256':
            return 'SHA-256';
        case 'P-384':
            return 'SHA-384';
        case 'P-521':
            return 'SHA-512';
        default:
            throw new UnsupportedOperationError();
    }
}
function keyToSubtle(key) {
    switch(key.algorithm.name){
        case 'ECDSA':
            return {
                name: key.algorithm.name,
                hash: ecdsaHashName(key.algorithm.namedCurve)
            };
        case 'RSA-PSS':
            {
                checkRsaKeyAlgorithm(key.algorithm);
                switch(key.algorithm.hash.name){
                    case 'SHA-256':
                    case 'SHA-384':
                    case 'SHA-512':
                        return {
                            name: key.algorithm.name,
                            saltLength: parseInt(key.algorithm.hash.name.slice(-3), 10) >> 3
                        };
                    default:
                        throw new UnsupportedOperationError();
                }
            }
        case 'RSASSA-PKCS1-v1_5':
            checkRsaKeyAlgorithm(key.algorithm);
            return key.algorithm.name;
        case 'Ed448':
        case 'Ed25519':
            return key.algorithm.name;
    }
    throw new UnsupportedOperationError();
}
const noSignatureCheck = Symbol();
async function validateJwsSignature(protectedHeader, payload, key, signature) {
    const input = `${protectedHeader}.${payload}`;
    const verified = await crypto.subtle.verify(keyToSubtle(key), key, signature, buf(input));
    if (!verified) {
        throw new OPE('JWT signature verification failed');
    }
}
async function validateJwt(jws, checkAlg, getKey, clockSkew, clockTolerance, decryptJwt) {
    let { 0: protectedHeader, 1: payload, 2: encodedSignature, length } = jws.split('.');
    if (length === 5) {
        if (decryptJwt !== undefined) {
            jws = await decryptJwt(jws);
            ({ 0: protectedHeader, 1: payload, 2: encodedSignature, length } = jws.split('.'));
        } else {
            throw new UnsupportedOperationError('JWE structure JWTs are not supported');
        }
    }
    if (length !== 3) {
        throw new OPE('Invalid JWT');
    }
    let header;
    try {
        header = JSON.parse(buf(b64u(protectedHeader)));
    } catch (cause) {
        throw new OPE('failed to parse JWT Header body as base64url encoded JSON', {
            cause
        });
    }
    if (!isJsonObject(header)) {
        throw new OPE('JWT Header must be a top level object');
    }
    checkAlg(header);
    if (header.crit !== undefined) {
        throw new OPE('unexpected JWT "crit" header parameter');
    }
    const signature = b64u(encodedSignature);
    let key;
    if (getKey !== noSignatureCheck) {
        key = await getKey(header);
        await validateJwsSignature(protectedHeader, payload, key, signature);
    }
    let claims;
    try {
        claims = JSON.parse(buf(b64u(payload)));
    } catch (cause) {
        throw new OPE('failed to parse JWT Payload body as base64url encoded JSON', {
            cause
        });
    }
    if (!isJsonObject(claims)) {
        throw new OPE('JWT Payload must be a top level object');
    }
    const now = epochTime() + clockSkew;
    if (claims.exp !== undefined) {
        if (typeof claims.exp !== 'number') {
            throw new OPE('unexpected JWT "exp" (expiration time) claim type');
        }
        if (claims.exp <= now - clockTolerance) {
            throw new OPE('unexpected JWT "exp" (expiration time) claim value, timestamp is <= now()');
        }
    }
    if (claims.iat !== undefined) {
        if (typeof claims.iat !== 'number') {
            throw new OPE('unexpected JWT "iat" (issued at) claim type');
        }
    }
    if (claims.iss !== undefined) {
        if (typeof claims.iss !== 'string') {
            throw new OPE('unexpected JWT "iss" (issuer) claim type');
        }
    }
    if (claims.nbf !== undefined) {
        if (typeof claims.nbf !== 'number') {
            throw new OPE('unexpected JWT "nbf" (not before) claim type');
        }
        if (claims.nbf > now + clockTolerance) {
            throw new OPE('unexpected JWT "nbf" (not before) claim value, timestamp is > now()');
        }
    }
    if (claims.aud !== undefined) {
        if (typeof claims.aud !== 'string' && !Array.isArray(claims.aud)) {
            throw new OPE('unexpected JWT "aud" (audience) claim type');
        }
    }
    return {
        header,
        claims,
        signature,
        key,
        jwt: jws
    };
}
async function validateJwtAuthResponse(as, client, parameters, expectedState, options) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw new TypeError('"parameters" must be an instance of URLSearchParams, or URL');
    }
    const response = getURLSearchParameter(parameters, 'response');
    if (!response) {
        throw new OPE('"parameters" does not contain a JARM response');
    }
    const { claims } = await validateJwt(response, checkSigningAlgorithm.bind(undefined, client.authorization_signed_response_alg, as.authorization_signing_alg_values_supported), getPublicSigKeyFromIssuerJwksUri.bind(undefined, as, options), getClockSkew(client), getClockTolerance(client), client[jweDecrypt]).then(validatePresence.bind(undefined, [
        'aud',
        'exp',
        'iss'
    ])).then(validateIssuer.bind(undefined, as.issuer)).then(validateAudience.bind(undefined, client.client_id));
    const result = new URLSearchParams();
    for (const [key, value] of Object.entries(claims)){
        if (typeof value === 'string' && key !== 'aud') {
            result.set(key, value);
        }
    }
    return validateAuthResponse(as, client, result, expectedState);
}
async function idTokenHash(alg, data, key) {
    let algorithm;
    switch(alg){
        case 'RS256':
        case 'PS256':
        case 'ES256':
            algorithm = 'SHA-256';
            break;
        case 'RS384':
        case 'PS384':
        case 'ES384':
            algorithm = 'SHA-384';
            break;
        case 'RS512':
        case 'PS512':
        case 'ES512':
            algorithm = 'SHA-512';
            break;
        case 'EdDSA':
            if (key.algorithm.name === 'Ed25519') {
                algorithm = 'SHA-512';
                break;
            }
            throw new UnsupportedOperationError();
        default:
            throw new UnsupportedOperationError();
    }
    const digest = await crypto.subtle.digest(algorithm, buf(data));
    return b64u(digest.slice(0, digest.byteLength / 2));
}
async function idTokenHashMatches(data, actual, alg, key) {
    const expected = await idTokenHash(alg, data, key);
    return actual === expected;
}
async function validateDetachedSignatureResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        if (!parameters.hash.length) {
            throw new TypeError('"parameters" as an instance of URL must contain a hash (fragment) with the Authorization Response parameters');
        }
        parameters = new URLSearchParams(parameters.hash.slice(1));
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw new TypeError('"parameters" must be an instance of URLSearchParams');
    }
    parameters = new URLSearchParams(parameters);
    const id_token = getURLSearchParameter(parameters, 'id_token');
    parameters.delete('id_token');
    switch(expectedState){
        case undefined:
        case expectNoState:
            break;
        default:
            if (!validateString(expectedState)) {
                throw new TypeError('"expectedState" must be a non-empty string');
            }
    }
    const result = validateAuthResponse({
        ...as,
        authorization_response_iss_parameter_supported: false
    }, client, parameters, expectedState);
    if (isOAuth2Error(result)) {
        return result;
    }
    if (!id_token) {
        throw new OPE('"parameters" does not contain an ID Token');
    }
    const code = getURLSearchParameter(parameters, 'code');
    if (!code) {
        throw new OPE('"parameters" does not contain an Authorization Code');
    }
    const requiredClaims = [
        'aud',
        'exp',
        'iat',
        'iss',
        'sub',
        'nonce',
        'c_hash'
    ];
    if (typeof expectedState === 'string') {
        requiredClaims.push('s_hash');
    }
    const { claims, header, key } = await validateJwt(id_token, checkSigningAlgorithm.bind(undefined, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported), getPublicSigKeyFromIssuerJwksUri.bind(undefined, as, options), getClockSkew(client), getClockTolerance(client), client[jweDecrypt]).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as.issuer)).then(validateAudience.bind(undefined, client.client_id));
    const clockSkew = getClockSkew(client);
    const now = epochTime() + clockSkew;
    if (claims.iat < now - 3600) {
        throw new OPE('unexpected JWT "iat" (issued at) claim value, it is too far in the past');
    }
    if (typeof claims.c_hash !== 'string' || await idTokenHashMatches(code, claims.c_hash, header.alg, key) !== true) {
        throw new OPE('invalid ID Token "c_hash" (code hash) claim value');
    }
    if (claims.s_hash !== undefined && typeof expectedState !== 'string') {
        throw new OPE('could not verify ID Token "s_hash" (state hash) claim value');
    }
    if (typeof expectedState === 'string' && (typeof claims.s_hash !== 'string' || await idTokenHashMatches(expectedState, claims.s_hash, header.alg, key) !== true)) {
        throw new OPE('invalid ID Token "s_hash" (state hash) claim value');
    }
    if (claims.auth_time !== undefined && (!Number.isFinite(claims.auth_time) || Math.sign(claims.auth_time) !== 1)) {
        throw new OPE('ID Token "auth_time" (authentication time) must be a positive number');
    }
    maxAge ?? (maxAge = client.default_max_age ?? skipAuthTimeCheck);
    if ((client.require_auth_time || maxAge !== skipAuthTimeCheck) && claims.auth_time === undefined) {
        throw new OPE('ID Token "auth_time" (authentication time) claim missing');
    }
    if (maxAge !== skipAuthTimeCheck) {
        if (typeof maxAge !== 'number' || maxAge < 0) {
            throw new TypeError('"maxAge" must be a non-negative number');
        }
        const now = epochTime() + getClockSkew(client);
        const tolerance = getClockTolerance(client);
        if (claims.auth_time + maxAge < now - tolerance) {
            throw new OPE('too much time has elapsed since the last End-User authentication');
        }
    }
    if (!validateString(expectedNonce)) {
        throw new TypeError('"expectedNonce" must be a non-empty string');
    }
    if (claims.nonce !== expectedNonce) {
        throw new OPE('unexpected ID Token "nonce" claim value');
    }
    if (Array.isArray(claims.aud) && claims.aud.length !== 1) {
        if (claims.azp === undefined) {
            throw new OPE('ID Token "aud" (audience) claim includes additional untrusted audiences');
        }
        if (claims.azp !== client.client_id) {
            throw new OPE('unexpected ID Token "azp" (authorized party) claim value');
        }
    }
    return result;
}
function checkSigningAlgorithm(client, issuer, header) {
    if (client !== undefined) {
        if (header.alg !== client) {
            throw new OPE('unexpected JWT "alg" header parameter');
        }
        return;
    }
    if (Array.isArray(issuer)) {
        if (!issuer.includes(header.alg)) {
            throw new OPE('unexpected JWT "alg" header parameter');
        }
        return;
    }
    if (header.alg !== 'RS256') {
        throw new OPE('unexpected JWT "alg" header parameter');
    }
}
function getURLSearchParameter(parameters, name) {
    const { 0: value, length } = parameters.getAll(name);
    if (length > 1) {
        throw new OPE(`"${name}" parameter must be provided only once`);
    }
    return value;
}
const skipStateCheck = Symbol();
const expectNoState = Symbol();
function validateAuthResponse(as, client, parameters, expectedState) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw new TypeError('"parameters" must be an instance of URLSearchParams, or URL');
    }
    if (getURLSearchParameter(parameters, 'response')) {
        throw new OPE('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()');
    }
    const iss = getURLSearchParameter(parameters, 'iss');
    const state = getURLSearchParameter(parameters, 'state');
    if (!iss && as.authorization_response_iss_parameter_supported) {
        throw new OPE('response parameter "iss" (issuer) missing');
    }
    if (iss && iss !== as.issuer) {
        throw new OPE('unexpected "iss" (issuer) response parameter value');
    }
    switch(expectedState){
        case undefined:
        case expectNoState:
            if (state !== undefined) {
                throw new OPE('unexpected "state" response parameter encountered');
            }
            break;
        case skipStateCheck:
            break;
        default:
            if (!validateString(expectedState)) {
                throw new OPE('"expectedState" must be a non-empty string');
            }
            if (state === undefined) {
                throw new OPE('response parameter "state" missing');
            }
            if (state !== expectedState) {
                throw new OPE('unexpected "state" response parameter value');
            }
    }
    const error = getURLSearchParameter(parameters, 'error');
    if (error) {
        return {
            error,
            error_description: getURLSearchParameter(parameters, 'error_description'),
            error_uri: getURLSearchParameter(parameters, 'error_uri')
        };
    }
    const id_token = getURLSearchParameter(parameters, 'id_token');
    const token = getURLSearchParameter(parameters, 'token');
    if (id_token !== undefined || token !== undefined) {
        throw new UnsupportedOperationError('implicit and hybrid flows are not supported');
    }
    return brand(new URLSearchParams(parameters));
}
function algToSubtle(alg, crv) {
    switch(alg){
        case 'PS256':
        case 'PS384':
        case 'PS512':
            return {
                name: 'RSA-PSS',
                hash: `SHA-${alg.slice(-3)}`
            };
        case 'RS256':
        case 'RS384':
        case 'RS512':
            return {
                name: 'RSASSA-PKCS1-v1_5',
                hash: `SHA-${alg.slice(-3)}`
            };
        case 'ES256':
        case 'ES384':
            return {
                name: 'ECDSA',
                namedCurve: `P-${alg.slice(-3)}`
            };
        case 'ES512':
            return {
                name: 'ECDSA',
                namedCurve: 'P-521'
            };
        case 'EdDSA':
            {
                switch(crv){
                    case 'Ed25519':
                    case 'Ed448':
                        return crv;
                    default:
                        throw new UnsupportedOperationError();
                }
            }
        default:
            throw new UnsupportedOperationError();
    }
}
async function importJwk(alg, jwk) {
    const { ext, key_ops, use, ...key } = jwk;
    return crypto.subtle.importKey('jwk', key, algToSubtle(alg, jwk.crv), true, [
        'verify'
    ]);
}
async function deviceAuthorizationRequest(as, client, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'device_authorization_endpoint', alias(client, options));
    const body = new URLSearchParams(parameters);
    body.set('client_id', client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return authenticatedRequest(as, client, 'POST', url, body, headers, options);
}
async function processDeviceAuthorizationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw new TypeError('"response" must be an instance of Response');
    }
    if (response.status !== 200) {
        let err;
        if (err = await handleOAuthBodyError(response)) {
            return err;
        }
        throw new OPE('"response" is not a conform Device Authorization Endpoint response');
    }
    assertReadableResponse(response);
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        throw new OPE('failed to parse "response" body as JSON', {
            cause
        });
    }
    if (!isJsonObject(json)) {
        throw new OPE('"response" body must be a top level object');
    }
    if (!validateString(json.device_code)) {
        throw new OPE('"response" body "device_code" property must be a non-empty string');
    }
    if (!validateString(json.user_code)) {
        throw new OPE('"response" body "user_code" property must be a non-empty string');
    }
    if (!validateString(json.verification_uri)) {
        throw new OPE('"response" body "verification_uri" property must be a non-empty string');
    }
    if (typeof json.expires_in !== 'number' || json.expires_in <= 0) {
        throw new OPE('"response" body "expires_in" property must be a positive number');
    }
    if (json.verification_uri_complete !== undefined && !validateString(json.verification_uri_complete)) {
        throw new OPE('"response" body "verification_uri_complete" property must be a non-empty string');
    }
    if (json.interval !== undefined && (typeof json.interval !== 'number' || json.interval <= 0)) {
        throw new OPE('"response" body "interval" property must be a positive number');
    }
    return json;
}
async function deviceCodeGrantRequest(as, client, deviceCode, options) {
    assertAs(as);
    assertClient(client);
    if (!validateString(deviceCode)) {
        throw new TypeError('"deviceCode" must be a non-empty string');
    }
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('device_code', deviceCode);
    return tokenEndpointRequest(as, client, 'urn:ietf:params:oauth:grant-type:device_code', parameters, options);
}
async function processDeviceCodeResponse(as, client, response) {
    return processGenericAccessTokenResponse(as, client, response);
}
async function generateKeyPair(alg, options) {
    if (!validateString(alg)) {
        throw new TypeError('"alg" must be a non-empty string');
    }
    const algorithm = algToSubtle(alg, alg === 'EdDSA' ? options?.crv ?? 'Ed25519' : undefined);
    if (alg.startsWith('PS') || alg.startsWith('RS')) {
        Object.assign(algorithm, {
            modulusLength: options?.modulusLength ?? 2048,
            publicExponent: new Uint8Array([
                0x01,
                0x00,
                0x01
            ])
        });
    }
    return crypto.subtle.generateKey(algorithm, options?.extractable ?? false, [
        'sign',
        'verify'
    ]);
}
function normalizeHtu(htu) {
    const url = new URL(htu);
    url.search = '';
    url.hash = '';
    return url.href;
}
async function validateDPoP(as, request, accessToken, accessTokenClaims, options) {
    const header = request.headers.get('dpop');
    if (header === null) {
        throw new OPE('operation indicated DPoP use but the request has no DPoP HTTP Header');
    }
    if (request.headers.get('authorization')?.toLowerCase().startsWith('dpop ') === false) {
        throw new OPE(`operation indicated DPoP use but the request's Authorization HTTP Header scheme is not DPoP`);
    }
    if (typeof accessTokenClaims.cnf?.jkt !== 'string') {
        throw new OPE('operation indicated DPoP use but the JWT Access Token has no jkt confirmation claim');
    }
    const clockSkew = getClockSkew(options);
    const proof = await validateJwt(header, checkSigningAlgorithm.bind(undefined, undefined, as?.dpop_signing_alg_values_supported || SUPPORTED_JWS_ALGS), async ({ jwk, alg })=>{
        if (!jwk) {
            throw new OPE('DPoP Proof is missing the jwk header parameter');
        }
        const key = await importJwk(alg, jwk);
        if (key.type !== 'public') {
            throw new OPE('DPoP Proof jwk header parameter must contain a public key');
        }
        return key;
    }, clockSkew, getClockTolerance(options), undefined).then(checkJwtType.bind(undefined, 'dpop+jwt')).then(validatePresence.bind(undefined, [
        'iat',
        'jti',
        'ath',
        'htm',
        'htu'
    ]));
    const now = epochTime() + clockSkew;
    const diff = Math.abs(now - proof.claims.iat);
    if (diff > 300) {
        throw new OPE('DPoP Proof iat is not recent enough');
    }
    if (proof.claims.htm !== request.method) {
        throw new OPE('DPoP Proof htm mismatch');
    }
    if (typeof proof.claims.htu !== 'string' || normalizeHtu(proof.claims.htu) !== normalizeHtu(request.url)) {
        throw new OPE('DPoP Proof htu mismatch');
    }
    {
        const expected = b64u(await crypto.subtle.digest('SHA-256', encoder.encode(accessToken)));
        if (proof.claims.ath !== expected) {
            throw new OPE('DPoP Proof ath mismatch');
        }
    }
    {
        let components;
        switch(proof.header.jwk.kty){
            case 'EC':
                components = {
                    crv: proof.header.jwk.crv,
                    kty: proof.header.jwk.kty,
                    x: proof.header.jwk.x,
                    y: proof.header.jwk.y
                };
                break;
            case 'OKP':
                components = {
                    crv: proof.header.jwk.crv,
                    kty: proof.header.jwk.kty,
                    x: proof.header.jwk.x
                };
                break;
            case 'RSA':
                components = {
                    e: proof.header.jwk.e,
                    kty: proof.header.jwk.kty,
                    n: proof.header.jwk.n
                };
                break;
            default:
                throw new UnsupportedOperationError();
        }
        const expected = b64u(await crypto.subtle.digest('SHA-256', encoder.encode(JSON.stringify(components))));
        if (accessTokenClaims.cnf.jkt !== expected) {
            throw new OPE('JWT Access Token confirmation mismatch');
        }
    }
}
async function validateJwtAccessToken(as, request, expectedAudience, options) {
    assertAs(as);
    if (!looseInstanceOf(request, Request)) {
        throw new TypeError('"request" must be an instance of Request');
    }
    if (!validateString(expectedAudience)) {
        throw new OPE('"expectedAudience" must be a non-empty string');
    }
    const authorization = request.headers.get('authorization');
    if (authorization === null) {
        throw new OPE('"request" is missing an Authorization HTTP Header');
    }
    let { 0: scheme, 1: accessToken, length } = authorization.split(' ');
    scheme = scheme.toLowerCase();
    switch(scheme){
        case 'dpop':
        case 'bearer':
            break;
        default:
            throw new UnsupportedOperationError('unsupported Authorization HTTP Header scheme');
    }
    if (length !== 2) {
        throw new OPE('invalid Authorization HTTP Header format');
    }
    const requiredClaims = [
        'iss',
        'exp',
        'aud',
        'sub',
        'iat',
        'jti',
        'client_id'
    ];
    if (options?.requireDPoP || scheme === 'dpop' || request.headers.has('dpop')) {
        requiredClaims.push('cnf');
    }
    const { claims } = await validateJwt(accessToken, checkSigningAlgorithm.bind(undefined, undefined, SUPPORTED_JWS_ALGS), getPublicSigKeyFromIssuerJwksUri.bind(undefined, as, options), getClockSkew(options), getClockTolerance(options), undefined).then(checkJwtType.bind(undefined, 'at+jwt')).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as.issuer)).then(validateAudience.bind(undefined, expectedAudience));
    for (const claim of [
        'client_id',
        'jti',
        'sub'
    ]){
        if (typeof claims[claim] !== 'string') {
            throw new OPE(`unexpected JWT "${claim}" claim type`);
        }
    }
    if ('cnf' in claims) {
        if (!isJsonObject(claims.cnf)) {
            throw new OPE('unexpected JWT "cnf" (confirmation) claim value');
        }
        const { 0: cnf, length } = Object.keys(claims.cnf);
        if (length) {
            if (length !== 1) {
                throw new UnsupportedOperationError('multiple confirmation claims are not supported');
            }
            if (cnf !== 'jkt') {
                throw new UnsupportedOperationError('unsupported JWT Confirmation method');
            }
        }
    }
    if (options?.requireDPoP || scheme === 'dpop' || claims.cnf?.jkt !== undefined || request.headers.has('dpop')) {
        await validateDPoP(as, request, accessToken, claims, options);
    }
    return claims;
}
const experimentalCustomFetch = customFetch;
const experimental_customFetch = customFetch;
const experimentalUseMtlsAlias = useMtlsAlias;
const experimental_useMtlsAlias = useMtlsAlias;
const experimental_validateDetachedSignatureResponse = (...args)=>validateDetachedSignatureResponse(...args);
const experimental_validateJwtAccessToken = (...args)=>validateJwtAccessToken(...args);
const validateJwtUserinfoSignature = (...args)=>validateJwtUserInfoSignature(...args);
const experimental_jwksCache = jwksCache;
}),
"[project]/node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const __TURBOPACK__default__export__ = (digest, ikm, salt, info, keylen)=>{
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    const prk = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])(digest, salt.byteLength ? salt : new Uint8Array(hashlen)).update(ikm).digest();
    const N = Math.ceil(keylen / hashlen);
    const T = new Uint8Array(hashlen * N + info.byteLength + 1);
    let prev = 0;
    let start = 0;
    for(let c = 1; c <= N; c++){
        T.set(info, start);
        T[start + info.byteLength] = c;
        T.set((0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])(digest, prk).update(T.subarray(prev, start + info.byteLength + 1)).digest(), start);
        prev = start;
        start += hashlen;
    }
    return T.slice(0, keylen);
};
}),
"[project]/node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$node$2f$esm$2f$runtime$2f$fallback$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js [app-route] (ecmascript)");
;
;
let hkdf;
if (typeof __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["hkdf"] === 'function' && !process.versions.electron) {
    hkdf = async (...args)=>new Promise((resolve, reject)=>{
            __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["hkdf"](...args, (err, arrayBuffer)=>{
                if (err) reject(err);
                else resolve(new Uint8Array(arrayBuffer));
            });
        });
}
const __TURBOPACK__default__export__ = async (digest, ikm, salt, info, keylen)=>(hkdf || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$node$2f$esm$2f$runtime$2f$fallback$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(digest, ikm, salt, info, keylen);
}),
"[project]/node_modules/@panva/hkdf/dist/node/esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>hkdf,
    "hkdf",
    ()=>hkdf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$node$2f$esm$2f$runtime$2f$hkdf$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js [app-route] (ecmascript)");
;
function normalizeDigest(digest) {
    switch(digest){
        case 'sha256':
        case 'sha384':
        case 'sha512':
        case 'sha1':
            return digest;
        default:
            throw new TypeError('unsupported "digest" value');
    }
}
function normalizeUint8Array(input, label) {
    if (typeof input === 'string') return new TextEncoder().encode(input);
    if (!(input instanceof Uint8Array)) throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
    return input;
}
function normalizeIkm(input) {
    const ikm = normalizeUint8Array(input, 'ikm');
    if (!ikm.byteLength) throw new TypeError(`"ikm" must be at least one byte in length`);
    return ikm;
}
function normalizeInfo(input) {
    const info = normalizeUint8Array(input, 'info');
    if (info.byteLength > 1024) {
        throw TypeError('"info" must not contain more than 1024 bytes');
    }
    return info;
}
function normalizeKeylen(input, digest) {
    if (typeof input !== 'number' || !Number.isInteger(input) || input < 1) {
        throw new TypeError('"keylen" must be a positive integer');
    }
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    if (input > 255 * hashlen) {
        throw new TypeError('"keylen" too large');
    }
    return input;
}
async function hkdf(digest, ikm, salt, info, keylen) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$node$2f$esm$2f$runtime$2f$hkdf$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, 'salt'), normalizeInfo(info), normalizeKeylen(keylen, digest));
}
;
}),
"[project]/node_modules/preact/dist/preact.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Component",
    ()=>d,
    "Fragment",
    ()=>p,
    "cloneElement",
    ()=>q,
    "createContext",
    ()=>B,
    "createElement",
    ()=>h,
    "createRef",
    ()=>y,
    "h",
    ()=>h,
    "hydrate",
    ()=>S,
    "isValidElement",
    ()=>i,
    "options",
    ()=>l,
    "render",
    ()=>P,
    "toChildArray",
    ()=>x
]);
var n, l, u, i, t, o, r, f = {}, e = [], c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function s(n, l) {
    for(var u in l)n[u] = l[u];
    return n;
}
function a(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
}
function h(l, u, i) {
    var t, o, r, f = {};
    for(r in u)"key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
    if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for(r in l.defaultProps)void 0 === f[r] && (f[r] = l.defaultProps[r]);
    return v(l, f, t, o, null);
}
function v(n, i, t, o, r) {
    var f = {
        type: n,
        props: i,
        key: t,
        ref: o,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == r ? ++u : r
    };
    return null == r && null != l.vnode && l.vnode(f), f;
}
function y() {
    return {
        current: null
    };
}
function p(n) {
    return n.children;
}
function d(n, l) {
    this.props = n, this.context = l;
}
function _(n, l) {
    if (null == l) return n.__ ? _(n.__, n.__.__k.indexOf(n) + 1) : null;
    for(var u; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return "function" == typeof n.type ? _(n) : null;
}
function k(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
        for(n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
        }
        return k(n);
    }
}
function b(n) {
    (!n.__d && (n.__d = !0) && t.push(n) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
}
function g() {
    for(var n; g.__r = t.length;)n = t.sort(function(n, l) {
        return n.__v.__b - l.__v.__b;
    }), t = [], n.some(function(n) {
        var l, u, i, t, o, r;
        n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = s({}, t)).__v = t.__v + 1, j(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [
            o
        ] : null, u, null == o ? _(t) : o, t.__h), z(u, t), t.__e != o && k(t)));
    });
}
function w(n, l, u, i, t, o, r, c, s, a) {
    var h, y, d, k, b, g, w, x = i && i.__k || e, C = x.length;
    for(u.__k = [], h = 0; h < l.length; h++)if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k || "bigint" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(p, {
        children: k
    }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, k.ref ? k.ref : null, k.__v) : k)) {
        if (k.__ = u, k.__b = u.__b + 1, null === (d = x[h]) || d && k.key == d.key && k.type === d.type) x[h] = void 0;
        else for(y = 0; y < C; y++){
            if ((d = x[y]) && k.key == d.key && k.type === d.type) {
                x[y] = void 0;
                break;
            }
            d = null;
        }
        j(n, k, d = d || f, t, o, r, c, s, a), b = k.__e, (y = k.ref) && d.ref != y && (w || (w = []), d.ref && w.push(d.ref, null, k), w.push(y, k.__c || b, k)), null != b ? (null == g && (g = b), "function" == typeof k.type && k.__k === d.__k ? k.__d = s = m(k, s, n) : s = A(n, k, d, x, b, s), "function" == typeof u.type && (u.__d = s)) : s && d.__e == s && s.parentNode != n && (s = _(d));
    }
    for(u.__e = g, h = C; h--;)null != x[h] && N(x[h], x[h]);
    if (w) for(h = 0; h < w.length; h++)M(w[h], w[++h], w[++h]);
}
function m(n, l, u) {
    for(var i, t = n.__k, o = 0; t && o < t.length; o++)(i = t[o]) && (i.__ = n, l = "function" == typeof i.type ? m(i, l, u) : A(u, i, i, t, i.__e, l));
    return l;
}
function x(n, l) {
    return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function(n) {
        x(n, l);
    }) : l.push(n)), l;
}
function A(n, l, u, i, t, o) {
    var r, f, e;
    if (void 0 !== l.__d) r = l.__d, l.__d = void 0;
    else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;
    else {
        for(f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 1)if (f == t) break n;
        n.insertBefore(t, o), r = o;
    }
    return void 0 !== r ? r : t.nextSibling;
}
function C(n, l, u, i, t) {
    var o;
    for(o in u)"children" === o || "key" === o || o in l || H(n, o, null, u[o], i);
    for(o in l)t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || H(n, o, l[o], u[o], i);
}
function $(n, l, u) {
    "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || c.test(l) ? u : u + "px";
}
function H(n, l, u, i, t) {
    var o;
    n: if ("style" === l) if ("string" == typeof u) n.style.cssText = u;
    else {
        if ("string" == typeof i && (n.style.cssText = i = ""), i) for(l in i)u && l in u || $(n.style, l, "");
        if (u) for(l in u)i && u[l] === i[l] || $(n.style, l, u[l]);
    }
    else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? T : I, o) : n.removeEventListener(l, o ? T : I, o);
    else if ("dangerouslySetInnerHTML" !== l) {
        if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
            n[l] = null == u ? "" : u;
            break n;
        } catch (n) {}
        "function" == typeof u || (null == u || !1 === u && -1 == l.indexOf("-") ? n.removeAttribute(l) : n.setAttribute(l, u));
    }
}
function I(n) {
    this.l[n.type + !1](l.event ? l.event(n) : n);
}
function T(n) {
    this.l[n.type + !0](l.event ? l.event(n) : n);
}
function j(n, u, i, t, o, r, f, e, c) {
    var a, h, v, y, _, k, b, g, m, x, A, C, $, H, I, T = u.type;
    if (void 0 !== u.constructor) return null;
    null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, r = [
        e
    ]), (a = l.__b) && a(u);
    try {
        n: if ("function" == typeof T) {
            if (g = u.props, m = (a = T.contextType) && t[a.__c], x = a ? m ? m.props.value : a.__ : t, i.__c ? b = (h = u.__c = i.__c).__ = h.__E : ("prototype" in T && T.prototype.render ? u.__c = h = new T(g, x) : (u.__c = h = new d(g, x), h.constructor = T, h.render = O), m && m.sub(h), h.props = g, h.state || (h.state = {}), h.context = x, h.__n = t, v = h.__d = !0, h.__h = [], h._sb = []), null == h.__s && (h.__s = h.state), null != T.getDerivedStateFromProps && (h.__s == h.state && (h.__s = s({}, h.__s)), s(h.__s, T.getDerivedStateFromProps(g, h.__s))), y = h.props, _ = h.state, v) null == T.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);
            else {
                if (null == T.getDerivedStateFromProps && g !== y && null != h.componentWillReceiveProps && h.componentWillReceiveProps(g, x), !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(g, h.__s, x) || u.__v === i.__v) {
                    for(h.props = g, h.state = h.__s, u.__v !== i.__v && (h.__d = !1), h.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function(n) {
                        n && (n.__ = u);
                    }), A = 0; A < h._sb.length; A++)h.__h.push(h._sb[A]);
                    h._sb = [], h.__h.length && f.push(h);
                    break n;
                }
                null != h.componentWillUpdate && h.componentWillUpdate(g, h.__s, x), null != h.componentDidUpdate && h.__h.push(function() {
                    h.componentDidUpdate(y, _, k);
                });
            }
            if (h.context = x, h.props = g, h.__v = u, h.__P = n, C = l.__r, $ = 0, "prototype" in T && T.prototype.render) {
                for(h.state = h.__s, h.__d = !1, C && C(u), a = h.render(h.props, h.state, h.context), H = 0; H < h._sb.length; H++)h.__h.push(h._sb[H]);
                h._sb = [];
            } else do {
                h.__d = !1, C && C(u), a = h.render(h.props, h.state, h.context), h.state = h.__s;
            }while (h.__d && ++$ < 25)
            h.state = h.__s, null != h.getChildContext && (t = s(s({}, t), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (k = h.getSnapshotBeforeUpdate(y, _)), I = null != a && a.type === p && null == a.key ? a.props.children : a, w(n, Array.isArray(I) ? I : [
                I
            ], u, i, t, o, r, f, e, c), h.base = u.__e, u.__h = null, h.__h.length && f.push(h), b && (h.__E = h.__ = null), h.__e = !1;
        } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = L(i.__e, u, i, t, o, r, f, c);
        (a = l.diffed) && a(u);
    } catch (n) {
        u.__v = null, (c || null != r) && (u.__e = e, u.__h = !!c, r[r.indexOf(e)] = null), l.__e(n, u, i);
    }
}
function z(n, u) {
    l.__c && l.__c(u, n), n.some(function(u) {
        try {
            n = u.__h, u.__h = [], n.some(function(n) {
                n.call(u);
            });
        } catch (n) {
            l.__e(n, u.__v);
        }
    });
}
function L(l, u, i, t, o, r, e, c) {
    var s, h, v, y = i.props, p = u.props, d = u.type, k = 0;
    if ("svg" === d && (o = !0), null != r) {
        for(; k < r.length; k++)if ((s = r[k]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
            l = s, r[k] = null;
            break;
        }
    }
    if (null == l) {
        if (null === d) return document.createTextNode(p);
        l = o ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), r = null, c = !1;
    }
    if (null === d) y === p || c && l.data === p || (l.data = p);
    else {
        if (r = r && n.call(l.childNodes), h = (y = i.props || f).dangerouslySetInnerHTML, v = p.dangerouslySetInnerHTML, !c) {
            if (null != r) for(y = {}, k = 0; k < l.attributes.length; k++)y[l.attributes[k].name] = l.attributes[k].value;
            (v || h) && (v && (h && v.__html == h.__html || v.__html === l.innerHTML) || (l.innerHTML = v && v.__html || ""));
        }
        if (C(l, p, y, o, c), v) u.__k = [];
        else if (k = u.props.children, w(l, Array.isArray(k) ? k : [
            k
        ], u, i, t, o && "foreignObject" !== d, r, e, r ? r[0] : i.__k && _(i, 0), c), null != r) for(k = r.length; k--;)null != r[k] && a(r[k]);
        c || ("value" in p && void 0 !== (k = p.value) && (k !== l.value || "progress" === d && !k || "option" === d && k !== y.value) && H(l, "value", k, y.value, !1), "checked" in p && void 0 !== (k = p.checked) && k !== l.checked && H(l, "checked", k, y.checked, !1));
    }
    return l;
}
function M(n, u, i) {
    try {
        "function" == typeof n ? n(u) : n.current = u;
    } catch (n) {
        l.__e(n, i);
    }
}
function N(n, u, i) {
    var t, o;
    if (l.unmount && l.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || M(t, null, u)), null != (t = n.__c)) {
        if (t.componentWillUnmount) try {
            t.componentWillUnmount();
        } catch (n) {
            l.__e(n, u);
        }
        t.base = t.__P = null, n.__c = void 0;
    }
    if (t = n.__k) for(o = 0; o < t.length; o++)t[o] && N(t[o], u, i || "function" != typeof n.type);
    i || null == n.__e || a(n.__e), n.__ = n.__e = n.__d = void 0;
}
function O(n, l, u) {
    return this.constructor(n, u);
}
function P(u, i, t) {
    var o, r, e;
    l.__ && l.__(u, i), r = (o = "function" == typeof t) ? null : t && t.__k || i.__k, e = [], j(i, u = (!o && t || i).__k = h(p, null, [
        u
    ]), r || f, f, void 0 !== i.ownerSVGElement, !o && t ? [
        t
    ] : r ? null : i.firstChild ? n.call(i.childNodes) : null, e, !o && t ? t : r ? r.__e : i.firstChild, o), z(e, u);
}
function S(n, l) {
    P(n, l, S);
}
function q(l, u, i) {
    var t, o, r, f = s({}, l.props);
    for(r in u)"key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
    return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), v(l.type, f, t || l.key, o || l.ref, null);
}
function B(n, l) {
    var u = {
        __c: l = "__cC" + r++,
        __: n,
        Consumer: function(n, l) {
            return n.children(l);
        },
        Provider: function(n) {
            var u, i;
            return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function() {
                return i;
            }, this.shouldComponentUpdate = function(n) {
                this.props.value !== n.value && u.some(b);
            }, this.sub = function(n) {
                u.push(n);
                var l = n.componentWillUnmount;
                n.componentWillUnmount = function() {
                    u.splice(u.indexOf(n), 1), l && l.call(n);
                };
            }), n.children;
        }
    };
    return u.Provider.__ = u.Consumer.contextType = u;
}
n = e.slice, l = {
    __e: function(n, l, u, i) {
        for(var t, o, r; l = l.__;)if ((t = l.__c) && !t.__) try {
            if ((o = t.constructor) && null != o.getDerivedStateFromError && (t.setState(o.getDerivedStateFromError(n)), r = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), r = t.__d), r) return t.__E = t;
        } catch (l) {
            n = l;
        }
        throw n;
    }
}, u = 0, i = function(n) {
    return null != n && void 0 === n.constructor;
}, d.prototype.setState = function(n, l) {
    var u;
    u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n && (n = n(s({}, u), this.props)), n && s(u, n), null != n && this.__v && (l && this._sb.push(l), b(this));
}, d.prototype.forceUpdate = function(n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), b(this));
}, d.prototype.render = p, t = [], g.__r = 0, r = 0;
;
 //# sourceMappingURL=preact.module.js.map
}),
"[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "jsx",
    ()=>o,
    "jsxDEV",
    ()=>o,
    "jsxs",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/preact/dist/preact.mjs [app-route] (ecmascript)");
;
;
var _ = 0;
function o(o, e, n, t, f) {
    var l, s, u = {};
    for(s in e)"ref" == s ? l = e[s] : u[s] = e[s];
    var a = {
        type: o,
        props: u,
        key: n,
        ref: l,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: --_,
        __source: f,
        __self: t
    };
    if ("function" == typeof o && (l = o.defaultProps)) for(s in l)void 0 === u[s] && (u[s] = l[s]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].vnode && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].vnode(a), a;
}
;
 //# sourceMappingURL=jsxRuntime.module.js.map
}),
"[project]/node_modules/preact-render-to-string/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "render",
    ()=>k,
    "renderToStaticMarkup",
    ()=>k,
    "renderToString",
    ()=>k,
    "shallowRender",
    ()=>b
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/preact/dist/preact.mjs [app-route] (ecmascript)");
;
var r = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i, n = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, o = /[\s\n\\/='"\0<>]/, i = /^xlink:?./, a = /["&<]/;
function l(e) {
    if (!1 === a.test(e += "")) return e;
    for(var t = 0, r = 0, n = "", o = ""; r < e.length; r++){
        switch(e.charCodeAt(r)){
            case 34:
                o = "&quot;";
                break;
            case 38:
                o = "&amp;";
                break;
            case 60:
                o = "&lt;";
                break;
            default:
                continue;
        }
        r !== t && (n += e.slice(t, r)), n += o, t = r + 1;
    }
    return r !== t && (n += e.slice(t, r)), n;
}
var s = function(e, t) {
    return String(e).replace(/(\n+)/g, "$1" + (t || "\t"));
}, f = function(e, t, r) {
    return String(e).length > (t || 40) || !r && -1 !== String(e).indexOf("\n") || -1 !== String(e).indexOf("<");
}, c = {}, u = /([A-Z])/g;
function p(e) {
    var t = "";
    for(var n in e){
        var o = e[n];
        null != o && "" !== o && (t && (t += " "), t += "-" == n[0] ? n : c[n] || (c[n] = n.replace(u, "-$1").toLowerCase()), t = "number" == typeof o && !1 === r.test(n) ? t + ": " + o + "px;" : t + ": " + o + ";");
    }
    return t || void 0;
}
function _(e, t) {
    return Array.isArray(t) ? t.reduce(_, e) : null != t && !1 !== t && e.push(t), e;
}
function d() {
    this.__d = !0;
}
function v(e, t) {
    return {
        __v: e,
        context: t,
        props: e.props,
        setState: d,
        forceUpdate: d,
        __d: !0,
        __h: []
    };
}
function h(e, t) {
    var r = e.contextType, n = r && t[r.__c];
    return null != r ? n ? n.props.value : r.__ : t;
}
var g = [];
function y(r, a, c, u, d, m) {
    if (null == r || "boolean" == typeof r) return "";
    if ("object" != typeof r) return l(r);
    var b = c.pretty, x = b && "string" == typeof b ? b : "\t";
    if (Array.isArray(r)) {
        for(var k = "", S = 0; S < r.length; S++)b && S > 0 && (k += "\n"), k += y(r[S], a, c, u, d, m);
        return k;
    }
    var w, C = r.type, O = r.props, j = !1;
    if ("function" == typeof C) {
        if (j = !0, !c.shallow || !u && !1 !== c.renderRootComponent) {
            if (C === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Fragment"]) {
                var A = [];
                return _(A, r.props.children), y(A, a, c, !1 !== c.shallowHighOrder, d, m);
            }
            var F, H = r.__c = v(r, a);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__b && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__b(r);
            var M = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__r;
            if (C.prototype && "function" == typeof C.prototype.render) {
                var L = h(C, a);
                (H = r.__c = new C(O, L)).__v = r, H._dirty = H.__d = !0, H.props = O, null == H.state && (H.state = {}), null == H._nextState && null == H.__s && (H._nextState = H.__s = H.state), H.context = L, C.getDerivedStateFromProps ? H.state = Object.assign({}, H.state, C.getDerivedStateFromProps(H.props, H.state)) : H.componentWillMount && (H.componentWillMount(), H.state = H._nextState !== H.state ? H._nextState : H.__s !== H.state ? H.__s : H.state), M && M(r), F = H.render(H.props, H.state, H.context);
            } else for(var T = h(C, a), E = 0; H.__d && E++ < 25;)H.__d = !1, M && M(r), F = C.call(r.__c, O, T);
            return H.getChildContext && (a = Object.assign({}, a, H.getChildContext())), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].diffed && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].diffed(r), y(F, a, c, !1 !== c.shallowHighOrder, d, m);
        }
        C = (w = C).displayName || w !== Function && w.name || function(e) {
            var t = (Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/) || "")[1];
            if (!t) {
                for(var r = -1, n = g.length; n--;)if (g[n] === e) {
                    r = n;
                    break;
                }
                r < 0 && (r = g.push(e) - 1), t = "UnnamedComponent" + r;
            }
            return t;
        }(w);
    }
    var $, D, N = "<" + C;
    if (O) {
        var P = Object.keys(O);
        c && !0 === c.sortAttributes && P.sort();
        for(var W = 0; W < P.length; W++){
            var I = P[W], R = O[I];
            if ("children" !== I) {
                if (!o.test(I) && (c && c.allAttributes || "key" !== I && "ref" !== I && "__self" !== I && "__source" !== I)) {
                    if ("defaultValue" === I) I = "value";
                    else if ("defaultChecked" === I) I = "checked";
                    else if ("defaultSelected" === I) I = "selected";
                    else if ("className" === I) {
                        if (void 0 !== O.class) continue;
                        I = "class";
                    } else d && i.test(I) && (I = I.toLowerCase().replace(/^xlink:?/, "xlink:"));
                    if ("htmlFor" === I) {
                        if (O.for) continue;
                        I = "for";
                    }
                    "style" === I && R && "object" == typeof R && (R = p(R)), "a" === I[0] && "r" === I[1] && "boolean" == typeof R && (R = String(R));
                    var U = c.attributeHook && c.attributeHook(I, R, a, c, j);
                    if (U || "" === U) N += U;
                    else if ("dangerouslySetInnerHTML" === I) D = R && R.__html;
                    else if ("textarea" === C && "value" === I) $ = R;
                    else if ((R || 0 === R || "" === R) && "function" != typeof R) {
                        if (!(!0 !== R && "" !== R || (R = I, c && c.xml))) {
                            N = N + " " + I;
                            continue;
                        }
                        if ("value" === I) {
                            if ("select" === C) {
                                m = R;
                                continue;
                            }
                            "option" === C && m == R && void 0 === O.selected && (N += " selected");
                        }
                        N = N + " " + I + '="' + l(R) + '"';
                    }
                }
            } else $ = R;
        }
    }
    if (b) {
        var V = N.replace(/\n\s*/, " ");
        V === N || ~V.indexOf("\n") ? b && ~N.indexOf("\n") && (N += "\n") : N = V;
    }
    if (N += ">", o.test(C)) throw new Error(C + " is not a valid HTML tag name in " + N);
    var q, z = n.test(C) || c.voidElements && c.voidElements.test(C), Z = [];
    if (D) b && f(D) && (D = "\n" + x + s(D, x)), N += D;
    else if (null != $ && _(q = [], $).length) {
        for(var B = b && ~N.indexOf("\n"), G = !1, J = 0; J < q.length; J++){
            var K = q[J];
            if (null != K && !1 !== K) {
                var Q = y(K, a, c, !0, "svg" === C || "foreignObject" !== C && d, m);
                if (b && !B && f(Q) && (B = !0), Q) if (b) {
                    var X = Q.length > 0 && "<" != Q[0];
                    G && X ? Z[Z.length - 1] += Q : Z.push(Q), G = X;
                } else Z.push(Q);
            }
        }
        if (b && B) for(var Y = Z.length; Y--;)Z[Y] = "\n" + x + s(Z[Y], x);
    }
    if (Z.length || D) N += Z.join("");
    else if (c && c.xml) return N.substring(0, N.length - 1) + " />";
    return !z || q || D ? (b && ~N.indexOf("\n") && (N += "\n"), N = N + "</" + C + ">") : N = N.replace(/>$/, " />"), N;
}
var m = {
    shallow: !0
};
k.render = k;
var b = function(e, t) {
    return k(e, t, m);
}, x = [];
function k(e, r, n) {
    r = r || {};
    var o, i = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__s;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__s = !0, o = n && (n.pretty || n.voidElements || n.sortAttributes || n.shallow || n.allAttributes || n.xml || n.attributeHook) ? y(e, r, n) : j(e, r, !1, void 0), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__c && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__c(e, x), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__s = i, x.length = 0, o;
}
function S(e, t) {
    return "className" === e ? "class" : "htmlFor" === e ? "for" : "defaultValue" === e ? "value" : "defaultChecked" === e ? "checked" : "defaultSelected" === e ? "selected" : t && i.test(e) ? e.toLowerCase().replace(/^xlink:?/, "xlink:") : e;
}
function w(e, t) {
    return "style" === e && null != t && "object" == typeof t ? p(t) : "a" === e[0] && "r" === e[1] && "boolean" == typeof t ? String(t) : t;
}
var C = Array.isArray, O = Object.assign;
function j(r, i, a, s) {
    if (null == r || !0 === r || !1 === r || "" === r) return "";
    if ("object" != typeof r) return l(r);
    if (C(r)) {
        for(var f = "", c = 0; c < r.length; c++)f += j(r[c], i, a, s);
        return f;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__b && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__b(r);
    var u = r.type, p = r.props;
    if ("function" == typeof u) {
        if (u === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Fragment"]) return j(r.props.children, i, a, s);
        var _;
        _ = u.prototype && "function" == typeof u.prototype.render ? function(e, r) {
            var n = e.type, o = h(n, r), i = new n(e.props, o);
            e.__c = i, i.__v = e, i.__d = !0, i.props = e.props, null == i.state && (i.state = {}), null == i.__s && (i.__s = i.state), i.context = o, n.getDerivedStateFromProps ? i.state = O({}, i.state, n.getDerivedStateFromProps(i.props, i.state)) : i.componentWillMount && (i.componentWillMount(), i.state = i.__s !== i.state ? i.__s : i.state);
            var a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__r;
            return a && a(e), i.render(i.props, i.state, i.context);
        }(r, i) : function(e, r) {
            var n, o = v(e, r), i = h(e.type, r);
            e.__c = o;
            for(var a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].__r, l = 0; o.__d && l++ < 25;)o.__d = !1, a && a(e), n = e.type.call(o, e.props, i);
            return n;
        }(r, i);
        var d = r.__c;
        d.getChildContext && (i = O({}, i, d.getChildContext()));
        var g = j(_, i, a, s);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].diffed && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].diffed(r), g;
    }
    var y, m, b = "<";
    if (b += u, p) for(var x in y = p.children, p){
        var k = p[x];
        if (!("key" === x || "ref" === x || "__self" === x || "__source" === x || "children" === x || "className" === x && "class" in p || "htmlFor" === x && "for" in p || o.test(x))) {
            if (k = w(x = S(x, a), k), "dangerouslySetInnerHTML" === x) m = k && k.__html;
            else if ("textarea" === u && "value" === x) y = k;
            else if ((k || 0 === k || "" === k) && "function" != typeof k) {
                if (!0 === k || "" === k) {
                    k = x, b = b + " " + x;
                    continue;
                }
                if ("value" === x) {
                    if ("select" === u) {
                        s = k;
                        continue;
                    }
                    "option" !== u || s != k || "selected" in p || (b += " selected");
                }
                b = b + " " + x + '="' + l(k) + '"';
            }
        }
    }
    var A = b;
    if (b += ">", o.test(u)) throw new Error(u + " is not a valid HTML tag name in " + b);
    var F = "", H = !1;
    if (m) F += m, H = !0;
    else if ("string" == typeof y) F += l(y), H = !0;
    else if (C(y)) for(var M = 0; M < y.length; M++){
        var L = y[M];
        if (null != L && !1 !== L) {
            var T = j(L, i, "svg" === u || "foreignObject" !== u && a, s);
            T && (F += T, H = !0);
        }
    }
    else if (null != y && !1 !== y && !0 !== y) {
        var E = j(y, i, "svg" === u || "foreignObject" !== u && a, s);
        E && (F += E, H = !0);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].diffed && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["options"].diffed(r), H) b += F;
    else if (n.test(u)) return A + " />";
    return b + "</" + u + ">";
}
k.shallowRender = b;
const __TURBOPACK__default__export__ = k;
;
 //# sourceMappingURL=index.module.js.map
}),
"[project]/node_modules/lucia/dist/date.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimeSpan",
    ()=>TimeSpan,
    "createDate",
    ()=>createDate,
    "isWithinExpirationDate",
    ()=>isWithinExpirationDate
]);
class TimeSpan {
    constructor(value, unit){
        this.value = value;
        this.unit = unit;
    }
    value;
    unit;
    milliseconds() {
        if (this.unit === "ms") {
            return this.value;
        }
        if (this.unit === "s") {
            return this.value * 1000;
        }
        if (this.unit === "m") {
            return this.value * 1000 * 60;
        }
        if (this.unit === "h") {
            return this.value * 1000 * 60 * 60;
        }
        if (this.unit === "d") {
            return this.value * 1000 * 60 * 60 * 24;
        }
        return this.value * 1000 * 60 * 60 * 24 * 7;
    }
    seconds() {
        return this.milliseconds() / 1000;
    }
    transform(x) {
        return new TimeSpan(Math.round(this.milliseconds() * x), "ms");
    }
}
function isWithinExpirationDate(date) {
    return Date.now() < date.getTime();
}
function createDate(timeSpan) {
    return new Date(Date.now() + timeSpan.milliseconds());
}
}),
"[project]/node_modules/lucia/dist/cookie.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cookie",
    ()=>Cookie,
    "CookieController",
    ()=>CookieController,
    "parseCookies",
    ()=>parseCookies,
    "serializeCookie",
    ()=>serializeCookie
]);
function serializeCookie(name, value, attributes) {
    const keyValueEntries = [];
    keyValueEntries.push([
        encodeURIComponent(name),
        encodeURIComponent(value)
    ]);
    if (attributes?.domain !== undefined) {
        keyValueEntries.push([
            "Domain",
            attributes.domain
        ]);
    }
    if (attributes?.expires !== undefined) {
        keyValueEntries.push([
            "Expires",
            attributes.expires.toUTCString()
        ]);
    }
    if (attributes?.httpOnly) {
        keyValueEntries.push([
            "HttpOnly"
        ]);
    }
    if (attributes?.maxAge !== undefined) {
        keyValueEntries.push([
            "Max-Age",
            attributes.maxAge.toString()
        ]);
    }
    if (attributes?.path !== undefined) {
        keyValueEntries.push([
            "Path",
            attributes.path
        ]);
    }
    if (attributes?.sameSite === "lax") {
        keyValueEntries.push([
            "SameSite",
            "Lax"
        ]);
    }
    if (attributes?.sameSite === "none") {
        keyValueEntries.push([
            "SameSite",
            "None"
        ]);
    }
    if (attributes?.sameSite === "strict") {
        keyValueEntries.push([
            "SameSite",
            "Strict"
        ]);
    }
    if (attributes?.secure) {
        keyValueEntries.push([
            "Secure"
        ]);
    }
    return keyValueEntries.map((pair)=>pair.join("=")).join("; ");
}
function parseCookies(header) {
    const cookies = new Map();
    const items = header.split("; ");
    for (const item of items){
        const pair = item.split("=");
        const rawKey = pair[0];
        const rawValue = pair[1] ?? "";
        if (!rawKey) continue;
        cookies.set(decodeURIComponent(rawKey), decodeURIComponent(rawValue));
    }
    return cookies;
}
class CookieController {
    constructor(cookieName, baseCookieAttributes, cookieOptions){
        this.cookieName = cookieName;
        this.cookieExpiresIn = cookieOptions?.expiresIn ?? null;
        this.baseCookieAttributes = baseCookieAttributes;
    }
    cookieName;
    cookieExpiresIn;
    baseCookieAttributes;
    createCookie(value) {
        return new Cookie(this.cookieName, value, {
            ...this.baseCookieAttributes,
            maxAge: this.cookieExpiresIn?.seconds()
        });
    }
    createBlankCookie() {
        return new Cookie(this.cookieName, "", {
            ...this.baseCookieAttributes,
            maxAge: 0
        });
    }
    parse(header) {
        const cookies = parseCookies(header);
        return cookies.get(this.cookieName) ?? null;
    }
}
class Cookie {
    constructor(name, value, attributes){
        this.name = name;
        this.value = value;
        this.attributes = attributes;
    }
    name;
    value;
    attributes;
    serialize() {
        return serializeCookie(this.name, this.value, this.attributes);
    }
}
}),
"[project]/node_modules/lucia/dist/scrypt/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
The MIT License (MIT)

Copyright (c) 2022 Paul Miller (https://paulmillr.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/ __turbopack_context__.s([
    "scrypt",
    ()=>scrypt
]);
async function scrypt(password, salt, options) {
    const { N, r, p } = options;
    const dkLen = options.dkLen ?? 32;
    const maxmem = 1024 ** 3 + 1024;
    const blockSize = 128 * r;
    const blockSize32 = blockSize / 4;
    if (N <= 1 || (N & N - 1) !== 0 || N >= 2 ** (blockSize / 8) || N > 2 ** 32) {
        throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
    }
    if (p < 0 || p > (2 ** 32 - 1) * 32 / blockSize) {
        throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
    }
    if (dkLen < 0 || dkLen > (2 ** 32 - 1) * 32) {
        throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
    }
    const memUsed = blockSize * (N + p);
    if (memUsed > maxmem) {
        throw new Error(`Scrypt: parameters too large, ${memUsed} (128 * r * (N + p)) > ${maxmem} (maxmem)`);
    }
    const B = await pbkdf2(password, salt, {
        c: 1,
        dkLen: blockSize * p
    });
    const B32 = u32(B);
    const V = u32(new Uint8Array(blockSize * N));
    const tmp = u32(new Uint8Array(blockSize));
    for(let pi = 0; pi < p; pi++){
        const Pi = blockSize32 * pi;
        for(let i = 0; i < blockSize32; i++)V[i] = B32[Pi + i]; // V[0] = B[i]
        for(let i = 0, pos = 0; i < N - 1; i++){
            BlockMix(V, pos, V, pos += blockSize32, r); // V[i] = BlockMix(V[i-1]);
            await new Promise((r)=>r()); // await next tick
        }
        BlockMix(V, (N - 1) * blockSize32, B32, Pi, r); // Process last element
        for(let i = 0; i < N; i++){
            // First u32 of the last 64-byte block (u32 is LE)
            const j = B32[Pi + blockSize32 - 16] % N; // j = Integrify(X) % iterations
            for(let k = 0; k < blockSize32; k++){
                tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k]; // tmp = B ^ V[j]
            }
            BlockMix(tmp, 0, B32, Pi, r); // B = BlockMix(B ^ V[j])
            await new Promise((r)=>r()); // await next tick
        }
    }
    const res = await pbkdf2(password, B, {
        c: 1,
        dkLen
    });
    B.fill(0);
    V.fill(0);
    tmp.fill(0);
    return res;
}
function rotl(a, b) {
    return a << b | a >>> 32 - b;
}
function XorAndSalsa(prev, pi, input, ii, out, oi) {
    const y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
    const y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
    const y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
    const y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
    const y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
    const y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
    const y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
    const y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    for(let i = 0; i < 8; i += 2){
        x04 ^= rotl(x00 + x12 | 0, 7);
        x08 ^= rotl(x04 + x00 | 0, 9);
        x12 ^= rotl(x08 + x04 | 0, 13);
        x00 ^= rotl(x12 + x08 | 0, 18);
        x09 ^= rotl(x05 + x01 | 0, 7);
        x13 ^= rotl(x09 + x05 | 0, 9);
        x01 ^= rotl(x13 + x09 | 0, 13);
        x05 ^= rotl(x01 + x13 | 0, 18);
        x14 ^= rotl(x10 + x06 | 0, 7);
        x02 ^= rotl(x14 + x10 | 0, 9);
        x06 ^= rotl(x02 + x14 | 0, 13);
        x10 ^= rotl(x06 + x02 | 0, 18);
        x03 ^= rotl(x15 + x11 | 0, 7);
        x07 ^= rotl(x03 + x15 | 0, 9);
        x11 ^= rotl(x07 + x03 | 0, 13);
        x15 ^= rotl(x11 + x07 | 0, 18);
        x01 ^= rotl(x00 + x03 | 0, 7);
        x02 ^= rotl(x01 + x00 | 0, 9);
        x03 ^= rotl(x02 + x01 | 0, 13);
        x00 ^= rotl(x03 + x02 | 0, 18);
        x06 ^= rotl(x05 + x04 | 0, 7);
        x07 ^= rotl(x06 + x05 | 0, 9);
        x04 ^= rotl(x07 + x06 | 0, 13);
        x05 ^= rotl(x04 + x07 | 0, 18);
        x11 ^= rotl(x10 + x09 | 0, 7);
        x08 ^= rotl(x11 + x10 | 0, 9);
        x09 ^= rotl(x08 + x11 | 0, 13);
        x10 ^= rotl(x09 + x08 | 0, 18);
        x12 ^= rotl(x15 + x14 | 0, 7);
        x13 ^= rotl(x12 + x15 | 0, 9);
        x14 ^= rotl(x13 + x12 | 0, 13);
        x15 ^= rotl(x14 + x13 | 0, 18);
    }
    out[oi++] = y00 + x00 | 0;
    out[oi++] = y01 + x01 | 0;
    out[oi++] = y02 + x02 | 0;
    out[oi++] = y03 + x03 | 0;
    out[oi++] = y04 + x04 | 0;
    out[oi++] = y05 + x05 | 0;
    out[oi++] = y06 + x06 | 0;
    out[oi++] = y07 + x07 | 0;
    out[oi++] = y08 + x08 | 0;
    out[oi++] = y09 + x09 | 0;
    out[oi++] = y10 + x10 | 0;
    out[oi++] = y11 + x11 | 0;
    out[oi++] = y12 + x12 | 0;
    out[oi++] = y13 + x13 | 0;
    out[oi++] = y14 + x14 | 0;
    out[oi++] = y15 + x15 | 0;
}
async function pbkdf2(password, salt, options) {
    const pwKey = await crypto.subtle.importKey("raw", password, "PBKDF2", false, [
        "deriveBits"
    ]);
    const keyBuffer = await crypto.subtle.deriveBits({
        name: "PBKDF2",
        hash: "SHA-256",
        salt,
        iterations: options.c
    }, pwKey, options.dkLen * 8);
    return new Uint8Array(keyBuffer);
}
function BlockMix(input, ii, out, oi, r) {
    let head = oi + 0;
    let tail = oi + 16 * r;
    for(let i = 0; i < 16; i++)out[tail + i] = input[ii + (2 * r - 1) * 16 + i];
    for(let i = 0; i < r; i++, head += 16, ii += 16){
        XorAndSalsa(out, tail, input, ii, out, head);
        if (i > 0) tail += 16;
        XorAndSalsa(out, head, input, ii += 16, out, tail);
    }
}
function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
}),
"[project]/node_modules/lucia/dist/crypto.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LegacyScrypt",
    ()=>LegacyScrypt,
    "Scrypt",
    ()=>Scrypt,
    "generateId",
    ()=>generateId,
    "generateIdFromEntropySize",
    ()=>generateIdFromEntropySize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/encoding/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/encoding/dist/hex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$base32$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/encoding/dist/base32.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$crypto$2f$dist$2f$random$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/crypto/dist/random/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$crypto$2f$dist$2f$subtle$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/crypto/dist/subtle/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$scrypt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/scrypt/index.js [app-route] (ecmascript)");
;
;
;
;
async function generateScryptKey(data, salt, blockSize = 16) {
    const encodedData = new TextEncoder().encode(data);
    const encodedSalt = new TextEncoder().encode(salt);
    const keyUint8Array = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$scrypt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scrypt"])(encodedData, encodedSalt, {
        N: 16384,
        r: blockSize,
        p: 1,
        dkLen: 64
    });
    return new Uint8Array(keyUint8Array);
}
const random = {
    read (bytes) {
        crypto.getRandomValues(bytes);
    }
};
function generateId(length) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$crypto$2f$dist$2f$random$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateRandomString"])(random, alphabet, length);
}
function generateIdFromEntropySize(size) {
    const buffer = crypto.getRandomValues(new Uint8Array(size));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$base32$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeBase32LowerCaseNoPadding"])(buffer);
}
class Scrypt {
    async hash(password) {
        const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeHexLowerCase"])(crypto.getRandomValues(new Uint8Array(16)));
        const key = await generateScryptKey(password.normalize("NFKC"), salt);
        return `${salt}:${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeHexLowerCase"])(key)}`;
    }
    async verify(hash, password) {
        const parts = hash.split(":");
        if (parts.length !== 2) return false;
        const [salt, key] = parts;
        const targetKey = await generateScryptKey(password.normalize("NFKC"), salt);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$crypto$2f$dist$2f$subtle$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["constantTimeEqual"])(targetKey, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeHex"])(key));
    }
}
class LegacyScrypt {
    async hash(password) {
        const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeHexLowerCase"])(crypto.getRandomValues(new Uint8Array(16)));
        const key = await generateScryptKey(password.normalize("NFKC"), salt);
        return `s2:${salt}:${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeHexLowerCase"])(key)}`;
    }
    async verify(hash, password) {
        const parts = hash.split(":");
        if (parts.length === 2) {
            const [salt, key] = parts;
            const targetKey = await generateScryptKey(password.normalize("NFKC"), salt, 8);
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$crypto$2f$dist$2f$subtle$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["constantTimeEqual"])(targetKey, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeHex"])(key));
            return result;
        }
        if (parts.length !== 3) return false;
        const [version, salt, key] = parts;
        if (version === "s2") {
            const targetKey = await generateScryptKey(password.normalize("NFKC"), salt);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$crypto$2f$dist$2f$subtle$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["constantTimeEqual"])(targetKey, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeHex"])(key));
        }
        return false;
    }
}
}),
"[project]/node_modules/lucia/dist/core.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lucia",
    ()=>Lucia
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/date.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$cookie$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/cookie.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$crypto$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/crypto.js [app-route] (ecmascript)");
;
;
;
class Lucia {
    adapter;
    sessionExpiresIn;
    sessionCookieController;
    getSessionAttributes;
    getUserAttributes;
    sessionCookieName;
    constructor(adapter, options){
        this.adapter = adapter;
        // we have to use `any` here since TS can't do conditional return types
        this.getUserAttributes = (databaseUserAttributes)=>{
            if (options && options.getUserAttributes) {
                return options.getUserAttributes(databaseUserAttributes);
            }
            return {};
        };
        this.getSessionAttributes = (databaseSessionAttributes)=>{
            if (options && options.getSessionAttributes) {
                return options.getSessionAttributes(databaseSessionAttributes);
            }
            return {};
        };
        this.sessionExpiresIn = options?.sessionExpiresIn ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TimeSpan"](30, "d");
        this.sessionCookieName = options?.sessionCookie?.name ?? "auth_session";
        let sessionCookieExpiresIn = this.sessionExpiresIn;
        if (options?.sessionCookie?.expires === false) {
            sessionCookieExpiresIn = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TimeSpan"](400, "d");
        }
        const baseSessionCookieAttributes = {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            ...options?.sessionCookie?.attributes
        };
        this.sessionCookieController = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$cookie$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CookieController"](this.sessionCookieName, baseSessionCookieAttributes, {
            expiresIn: sessionCookieExpiresIn
        });
    }
    async getUserSessions(userId) {
        const databaseSessions = await this.adapter.getUserSessions(userId);
        const sessions = [];
        for (const databaseSession of databaseSessions){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isWithinExpirationDate"])(databaseSession.expiresAt)) {
                continue;
            }
            sessions.push({
                id: databaseSession.id,
                expiresAt: databaseSession.expiresAt,
                userId: databaseSession.userId,
                fresh: false,
                ...this.getSessionAttributes(databaseSession.attributes)
            });
        }
        return sessions;
    }
    async validateSession(sessionId) {
        const [databaseSession, databaseUser] = await this.adapter.getSessionAndUser(sessionId);
        if (!databaseSession) {
            return {
                session: null,
                user: null
            };
        }
        if (!databaseUser) {
            await this.adapter.deleteSession(databaseSession.id);
            return {
                session: null,
                user: null
            };
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isWithinExpirationDate"])(databaseSession.expiresAt)) {
            await this.adapter.deleteSession(databaseSession.id);
            return {
                session: null,
                user: null
            };
        }
        const activePeriodExpirationDate = new Date(databaseSession.expiresAt.getTime() - this.sessionExpiresIn.milliseconds() / 2);
        const session = {
            ...this.getSessionAttributes(databaseSession.attributes),
            id: databaseSession.id,
            userId: databaseSession.userId,
            fresh: false,
            expiresAt: databaseSession.expiresAt
        };
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isWithinExpirationDate"])(activePeriodExpirationDate)) {
            session.fresh = true;
            session.expiresAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDate"])(this.sessionExpiresIn);
            await this.adapter.updateSessionExpiration(databaseSession.id, session.expiresAt);
        }
        const user = {
            ...this.getUserAttributes(databaseUser.attributes),
            id: databaseUser.id
        };
        return {
            user,
            session
        };
    }
    async createSession(userId, attributes, options) {
        const sessionId = options?.sessionId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$crypto$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateIdFromEntropySize"])(25);
        const sessionExpiresAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDate"])(this.sessionExpiresIn);
        await this.adapter.setSession({
            id: sessionId,
            userId,
            expiresAt: sessionExpiresAt,
            attributes
        });
        const session = {
            id: sessionId,
            userId,
            fresh: true,
            expiresAt: sessionExpiresAt,
            ...this.getSessionAttributes(attributes)
        };
        return session;
    }
    async invalidateSession(sessionId) {
        await this.adapter.deleteSession(sessionId);
    }
    async invalidateUserSessions(userId) {
        await this.adapter.deleteUserSessions(userId);
    }
    async deleteExpiredSessions() {
        await this.adapter.deleteExpiredSessions();
    }
    readSessionCookie(cookieHeader) {
        const sessionId = this.sessionCookieController.parse(cookieHeader);
        return sessionId;
    }
    readBearerToken(authorizationHeader) {
        const [authScheme, token] = authorizationHeader.split(" ");
        if (authScheme !== "Bearer") {
            return null;
        }
        return token ?? null;
    }
    createSessionCookie(sessionId) {
        return this.sessionCookieController.createCookie(sessionId);
    }
    createBlankSessionCookie() {
        return this.sessionCookieController.createBlankCookie();
    }
}
}),
"[project]/node_modules/lucia/dist/request.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "verifyRequestOrigin",
    ()=>verifyRequestOrigin
]);
function verifyRequestOrigin(origin, allowedDomains) {
    if (!origin || allowedDomains.length === 0) {
        return false;
    }
    const originHost = safeURL(origin)?.host ?? null;
    if (!originHost) {
        return false;
    }
    for (const domain of allowedDomains){
        let host;
        if (domain.startsWith("http://") || domain.startsWith("https://")) {
            host = safeURL(domain)?.host ?? null;
        } else {
            host = safeURL("https://" + domain)?.host ?? null;
        }
        if (originHost === host) {
            return true;
        }
    }
    return false;
}
function safeURL(url) {
    try {
        return new URL(url);
    } catch  {
        return null;
    }
}
}),
"[project]/node_modules/lucia/dist/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$core$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/core.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$crypto$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/crypto.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/date.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$cookie$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/cookie.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/request.js [app-route] (ecmascript)");
;
;
;
;
;
}),
"[project]/node_modules/@oslojs/encoding/dist/hex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeHex",
    ()=>decodeHex,
    "encodeHexLowerCase",
    ()=>encodeHexLowerCase,
    "encodeHexUpperCase",
    ()=>encodeHexUpperCase
]);
function encodeHexUpperCase(data) {
    let result = "";
    for(let i = 0; i < data.length; i++){
        result += alphabetUpperCase[data[i] >> 4];
        result += alphabetUpperCase[data[i] & 0x0f];
    }
    return result;
}
function encodeHexLowerCase(data) {
    let result = "";
    for(let i = 0; i < data.length; i++){
        result += alphabetLowerCase[data[i] >> 4];
        result += alphabetLowerCase[data[i] & 0x0f];
    }
    return result;
}
function decodeHex(data) {
    if (data.length % 2 !== 0) {
        throw new Error("Invalid hex string");
    }
    const result = new Uint8Array(data.length / 2);
    for(let i = 0; i < data.length; i += 2){
        if (!(data[i] in decodeMap)) {
            throw new Error("Invalid character");
        }
        if (!(data[i + 1] in decodeMap)) {
            throw new Error("Invalid character");
        }
        result[i / 2] |= decodeMap[data[i]] << 4;
        result[i / 2] |= decodeMap[data[i + 1]];
    }
    return result;
}
const alphabetUpperCase = "0123456789ABCDEF";
const alphabetLowerCase = "0123456789abcdef";
const decodeMap = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
};
}),
"[project]/node_modules/@oslojs/encoding/dist/base32.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeBase32",
    ()=>decodeBase32,
    "decodeBase32IgnorePadding",
    ()=>decodeBase32IgnorePadding,
    "encodeBase32",
    ()=>encodeBase32,
    "encodeBase32LowerCase",
    ()=>encodeBase32LowerCase,
    "encodeBase32LowerCaseNoPadding",
    ()=>encodeBase32LowerCaseNoPadding,
    "encodeBase32NoPadding",
    ()=>encodeBase32NoPadding,
    "encodeBase32UpperCase",
    ()=>encodeBase32UpperCase,
    "encodeBase32UpperCaseNoPadding",
    ()=>encodeBase32UpperCaseNoPadding
]);
function encodeBase32UpperCase(bytes) {
    return encodeBase32_internal(bytes, base32UpperCaseAlphabet, EncodingPadding.Include);
}
function encodeBase32UpperCaseNoPadding(bytes) {
    return encodeBase32_internal(bytes, base32UpperCaseAlphabet, EncodingPadding.None);
}
function encodeBase32LowerCase(bytes) {
    return encodeBase32_internal(bytes, base32LowerCaseAlphabet, EncodingPadding.Include);
}
function encodeBase32LowerCaseNoPadding(bytes) {
    return encodeBase32_internal(bytes, base32LowerCaseAlphabet, EncodingPadding.None);
}
function encodeBase32(bytes) {
    return encodeBase32UpperCase(bytes);
}
function encodeBase32NoPadding(bytes) {
    return encodeBase32UpperCaseNoPadding(bytes);
}
function encodeBase32_internal(bytes, alphabet, padding) {
    let result = "";
    for(let i = 0; i < bytes.byteLength; i += 5){
        let buffer = 0n;
        let bufferBitSize = 0;
        for(let j = 0; j < 5 && i + j < bytes.byteLength; j++){
            buffer = buffer << 8n | BigInt(bytes[i + j]);
            bufferBitSize += 8;
        }
        if (bufferBitSize % 5 !== 0) {
            buffer = buffer << BigInt(5 - bufferBitSize % 5);
            bufferBitSize += 5 - bufferBitSize % 5;
        }
        for(let j = 0; j < 8; j++){
            if (bufferBitSize >= 5) {
                result += alphabet[Number(buffer >> BigInt(bufferBitSize - 5) & 0x1fn)];
                bufferBitSize -= 5;
            } else if (bufferBitSize > 0) {
                result += alphabet[Number(buffer << BigInt(6 - bufferBitSize) & 0x3fn)];
                bufferBitSize = 0;
            } else if (padding === EncodingPadding.Include) {
                result += "=";
            }
        }
    }
    return result;
}
function decodeBase32(encoded) {
    return decodeBase32_internal(encoded, base32DecodeMap, DecodingPadding.Required);
}
function decodeBase32IgnorePadding(encoded) {
    return decodeBase32_internal(encoded, base32DecodeMap, DecodingPadding.Ignore);
}
function decodeBase32_internal(encoded, decodeMap, padding) {
    const result = new Uint8Array(Math.ceil(encoded.length / 8) * 5);
    let totalBytes = 0;
    for(let i = 0; i < encoded.length; i += 8){
        let chunk = 0n;
        let bitsRead = 0;
        for(let j = 0; j < 8; j++){
            if (padding === DecodingPadding.Required) {
                if (encoded[i + j] === "=") {
                    continue;
                }
                if (i + j >= encoded.length) {
                    throw new Error("Invalid padding");
                }
            }
            if (padding === DecodingPadding.Ignore) {
                if (i + j >= encoded.length || encoded[i + j] === "=") {
                    continue;
                }
            }
            if (j > 0 && encoded[i + j - 1] === "=") {
                throw new Error("Invalid padding");
            }
            if (!(encoded[i + j] in decodeMap)) {
                throw new Error("Invalid character");
            }
            chunk |= BigInt(decodeMap[encoded[i + j]]) << BigInt((7 - j) * 5);
            bitsRead += 5;
        }
        if (bitsRead < 40) {
            let unused;
            if (bitsRead === 10) {
                unused = chunk & 0xffffffffn;
            } else if (bitsRead === 20) {
                unused = chunk & 0xffffffn;
            } else if (bitsRead === 25) {
                unused = chunk & 0xffffn;
            } else if (bitsRead === 35) {
                unused = chunk & 0xffn;
            } else {
                throw new Error("Invalid padding");
            }
            if (unused !== 0n) {
                throw new Error("Invalid padding");
            }
        }
        const byteLength = Math.floor(bitsRead / 8);
        for(let i = 0; i < byteLength; i++){
            result[totalBytes] = Number(chunk >> BigInt(32 - i * 8) & 0xffn);
            totalBytes++;
        }
    }
    return result.slice(0, totalBytes);
}
const base32UpperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const base32LowerCaseAlphabet = "abcdefghijklmnopqrstuvwxyz234567";
const base32DecodeMap = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
    k: 10,
    l: 11,
    m: 12,
    n: 13,
    o: 14,
    p: 15,
    q: 16,
    r: 17,
    s: 18,
    t: 19,
    u: 20,
    v: 21,
    w: 22,
    x: 23,
    y: 24,
    z: 25,
    "2": 26,
    "3": 27,
    "4": 28,
    "5": 29,
    "6": 30,
    "7": 31
};
var EncodingPadding;
(function(EncodingPadding) {
    EncodingPadding[EncodingPadding["Include"] = 0] = "Include";
    EncodingPadding[EncodingPadding["None"] = 1] = "None";
})(EncodingPadding || (EncodingPadding = {}));
var DecodingPadding;
(function(DecodingPadding) {
    DecodingPadding[DecodingPadding["Required"] = 0] = "Required";
    DecodingPadding[DecodingPadding["Ignore"] = 1] = "Ignore";
})(DecodingPadding || (DecodingPadding = {}));
}),
"[project]/node_modules/@oslojs/encoding/dist/base64.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeBase64",
    ()=>decodeBase64,
    "decodeBase64IgnorePadding",
    ()=>decodeBase64IgnorePadding,
    "decodeBase64url",
    ()=>decodeBase64url,
    "decodeBase64urlIgnorePadding",
    ()=>decodeBase64urlIgnorePadding,
    "encodeBase64",
    ()=>encodeBase64,
    "encodeBase64NoPadding",
    ()=>encodeBase64NoPadding,
    "encodeBase64url",
    ()=>encodeBase64url,
    "encodeBase64urlNoPadding",
    ()=>encodeBase64urlNoPadding
]);
function encodeBase64(bytes) {
    return encodeBase64_internal(bytes, base64Alphabet, EncodingPadding.Include);
}
function encodeBase64NoPadding(bytes) {
    return encodeBase64_internal(bytes, base64Alphabet, EncodingPadding.None);
}
function encodeBase64url(bytes) {
    return encodeBase64_internal(bytes, base64urlAlphabet, EncodingPadding.Include);
}
function encodeBase64urlNoPadding(bytes) {
    return encodeBase64_internal(bytes, base64urlAlphabet, EncodingPadding.None);
}
function encodeBase64_internal(bytes, alphabet, padding) {
    let result = "";
    for(let i = 0; i < bytes.byteLength; i += 3){
        let buffer = 0;
        let bufferBitSize = 0;
        for(let j = 0; j < 3 && i + j < bytes.byteLength; j++){
            buffer = buffer << 8 | bytes[i + j];
            bufferBitSize += 8;
        }
        for(let j = 0; j < 4; j++){
            if (bufferBitSize >= 6) {
                result += alphabet[buffer >> bufferBitSize - 6 & 0x3f];
                bufferBitSize -= 6;
            } else if (bufferBitSize > 0) {
                result += alphabet[buffer << 6 - bufferBitSize & 0x3f];
                bufferBitSize = 0;
            } else if (padding === EncodingPadding.Include) {
                result += "=";
            }
        }
    }
    return result;
}
const base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64urlAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
function decodeBase64(encoded) {
    return decodeBase64_internal(encoded, base64DecodeMap, DecodingPadding.Required);
}
function decodeBase64IgnorePadding(encoded) {
    return decodeBase64_internal(encoded, base64DecodeMap, DecodingPadding.Ignore);
}
function decodeBase64url(encoded) {
    return decodeBase64_internal(encoded, base64urlDecodeMap, DecodingPadding.Required);
}
function decodeBase64urlIgnorePadding(encoded) {
    return decodeBase64_internal(encoded, base64urlDecodeMap, DecodingPadding.Ignore);
}
function decodeBase64_internal(encoded, decodeMap, padding) {
    const result = new Uint8Array(Math.ceil(encoded.length / 4) * 3);
    let totalBytes = 0;
    for(let i = 0; i < encoded.length; i += 4){
        let chunk = 0;
        let bitsRead = 0;
        for(let j = 0; j < 4; j++){
            if (padding === DecodingPadding.Required && encoded[i + j] === "=") {
                continue;
            }
            if (padding === DecodingPadding.Ignore && (i + j >= encoded.length || encoded[i + j] === "=")) {
                continue;
            }
            if (j > 0 && encoded[i + j - 1] === "=") {
                throw new Error("Invalid padding");
            }
            if (!(encoded[i + j] in decodeMap)) {
                throw new Error("Invalid character");
            }
            chunk |= decodeMap[encoded[i + j]] << (3 - j) * 6;
            bitsRead += 6;
        }
        if (bitsRead < 24) {
            let unused;
            if (bitsRead === 12) {
                unused = chunk & 0xffff;
            } else if (bitsRead === 18) {
                unused = chunk & 0xff;
            } else {
                throw new Error("Invalid padding");
            }
            if (unused !== 0) {
                throw new Error("Invalid padding");
            }
        }
        const byteLength = Math.floor(bitsRead / 8);
        for(let i = 0; i < byteLength; i++){
            result[totalBytes] = chunk >> 16 - i * 8 & 0xff;
            totalBytes++;
        }
    }
    return result.slice(0, totalBytes);
}
var EncodingPadding;
(function(EncodingPadding) {
    EncodingPadding[EncodingPadding["Include"] = 0] = "Include";
    EncodingPadding[EncodingPadding["None"] = 1] = "None";
})(EncodingPadding || (EncodingPadding = {}));
var DecodingPadding;
(function(DecodingPadding) {
    DecodingPadding[DecodingPadding["Required"] = 0] = "Required";
    DecodingPadding[DecodingPadding["Ignore"] = 1] = "Ignore";
})(DecodingPadding || (DecodingPadding = {}));
const base64DecodeMap = {
    "0": 52,
    "1": 53,
    "2": 54,
    "3": 55,
    "4": 56,
    "5": 57,
    "6": 58,
    "7": 59,
    "8": 60,
    "9": 61,
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
    a: 26,
    b: 27,
    c: 28,
    d: 29,
    e: 30,
    f: 31,
    g: 32,
    h: 33,
    i: 34,
    j: 35,
    k: 36,
    l: 37,
    m: 38,
    n: 39,
    o: 40,
    p: 41,
    q: 42,
    r: 43,
    s: 44,
    t: 45,
    u: 46,
    v: 47,
    w: 48,
    x: 49,
    y: 50,
    z: 51,
    "+": 62,
    "/": 63
};
const base64urlDecodeMap = {
    "0": 52,
    "1": 53,
    "2": 54,
    "3": 55,
    "4": 56,
    "5": 57,
    "6": 58,
    "7": 59,
    "8": 60,
    "9": 61,
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
    a: 26,
    b: 27,
    c: 28,
    d: 29,
    e: 30,
    f: 31,
    g: 32,
    h: 33,
    i: 34,
    j: 35,
    k: 36,
    l: 37,
    m: 38,
    n: 39,
    o: 40,
    p: 41,
    q: 42,
    r: 43,
    s: 44,
    t: 45,
    u: 46,
    v: 47,
    w: 48,
    x: 49,
    y: 50,
    z: 51,
    "-": 62,
    _: 63
};
}),
"[project]/node_modules/@oslojs/encoding/dist/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$hex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/encoding/dist/hex.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$base32$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/encoding/dist/base32.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$encoding$2f$dist$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/encoding/dist/base64.js [app-route] (ecmascript)");
;
;
;
}),
"[project]/node_modules/@oslojs/binary/dist/uint.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bigEndian",
    ()=>bigEndian,
    "littleEndian",
    ()=>littleEndian
]);
class BigEndian {
    uint8(data, offset) {
        if (data.byteLength < offset + 1) {
            throw new TypeError("Insufficient bytes");
        }
        return data[offset];
    }
    uint16(data, offset) {
        if (data.byteLength < offset + 2) {
            throw new TypeError("Insufficient bytes");
        }
        return data[offset] << 8 | data[offset + 1];
    }
    uint32(data, offset) {
        if (data.byteLength < offset + 4) {
            throw new TypeError("Insufficient bytes");
        }
        let result = 0;
        for(let i = 0; i < 4; i++){
            result |= data[offset + i] << 24 - i * 8;
        }
        return result;
    }
    uint64(data, offset) {
        if (data.byteLength < offset + 8) {
            throw new TypeError("Insufficient bytes");
        }
        let result = 0n;
        for(let i = 0; i < 8; i++){
            result |= BigInt(data[offset + i]) << BigInt(56 - i * 8);
        }
        return result;
    }
    putUint8(target, value, offset) {
        if (target.length < offset + 1) {
            throw new TypeError("Not enough space");
        }
        if (value < 0 || value > 255) {
            throw new TypeError("Invalid uint8 value");
        }
        target[offset] = value;
    }
    putUint16(target, value, offset) {
        if (target.length < offset + 2) {
            throw new TypeError("Not enough space");
        }
        if (value < 0 || value > 65535) {
            throw new TypeError("Invalid uint16 value");
        }
        target[offset] = value >> 8;
        target[offset + 1] = value & 0xff;
    }
    putUint32(target, value, offset) {
        if (target.length < offset + 4) {
            throw new TypeError("Not enough space");
        }
        if (value < 0 || value > 4294967295) {
            throw new TypeError("Invalid uint32 value");
        }
        for(let i = 0; i < 4; i++){
            target[offset + i] = value >> (3 - i) * 8 & 0xff;
        }
    }
    putUint64(target, value, offset) {
        if (target.length < offset + 8) {
            throw new TypeError("Not enough space");
        }
        if (value < 0 || value > 18446744073709551615n) {
            throw new TypeError("Invalid uint64 value");
        }
        for(let i = 0; i < 8; i++){
            target[offset + i] = Number(value >> BigInt((7 - i) * 8) & 0xffn);
        }
    }
}
class LittleEndian {
    uint8(data, offset) {
        if (data.byteLength < offset + 1) {
            throw new TypeError("Insufficient bytes");
        }
        return data[offset];
    }
    uint16(data, offset) {
        if (data.byteLength < offset + 2) {
            throw new TypeError("Insufficient bytes");
        }
        return data[offset] | data[offset + 1] << 8;
    }
    uint32(data, offset) {
        if (data.byteLength < offset + 4) {
            throw new TypeError("Insufficient bytes");
        }
        let result = 0;
        for(let i = 0; i < 4; i++){
            result |= data[offset + i] << i * 8;
        }
        return result;
    }
    uint64(data, offset) {
        if (data.byteLength < offset + 8) {
            throw new TypeError("Insufficient bytes");
        }
        let result = 0n;
        for(let i = 0; i < 8; i++){
            result |= BigInt(data[offset + i]) << BigInt(i * 8);
        }
        return result;
    }
    putUint8(target, value, offset) {
        if (target.length < 1 + offset) {
            throw new TypeError("Insufficient space");
        }
        if (value < 0 || value > 255) {
            throw new TypeError("Invalid uint8 value");
        }
        target[offset] = value;
    }
    putUint16(target, value, offset) {
        if (target.length < 2 + offset) {
            throw new TypeError("Insufficient space");
        }
        if (value < 0 || value > 65535) {
            throw new TypeError("Invalid uint16 value");
        }
        target[offset + 1] = value >> 8;
        target[offset] = value & 0xff;
    }
    putUint32(target, value, offset) {
        if (target.length < 4 + offset) {
            throw new TypeError("Insufficient space");
        }
        if (value < 0 || value > 4294967295) {
            throw new TypeError("Invalid uint32 value");
        }
        for(let i = 0; i < 4; i++){
            target[offset + i] = value >> i * 8 & 0xff;
        }
    }
    putUint64(target, value, offset) {
        if (target.length < 8 + offset) {
            throw new TypeError("Insufficient space");
        }
        if (value < 0 || value > 18446744073709551615n) {
            throw new TypeError("Invalid uint64 value");
        }
        for(let i = 0; i < 8; i++){
            target[offset + i] = Number(value >> BigInt(i * 8) & 0xffn);
        }
    }
}
const bigEndian = new BigEndian();
const littleEndian = new LittleEndian();
}),
"[project]/node_modules/@oslojs/binary/dist/bytes.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DynamicBuffer",
    ()=>DynamicBuffer,
    "compareBytes",
    ()=>compareBytes,
    "concatenateBytes",
    ()=>concatenateBytes
]);
function compareBytes(a, b) {
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    for(let i = 0; i < b.byteLength; i++){
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
function concatenateBytes(a, b) {
    const result = new Uint8Array(a.byteLength + b.byteLength);
    result.set(a);
    result.set(b, a.byteLength);
    return result;
}
class DynamicBuffer {
    value;
    capacity;
    length = 0;
    constructor(capacity){
        this.value = new Uint8Array(capacity);
        this.capacity = capacity = capacity;
    }
    write(bytes) {
        if (this.length + bytes.byteLength <= this.capacity) {
            this.value.set(bytes, this.length);
            this.length += bytes.byteLength;
            return;
        }
        while(this.length + bytes.byteLength > this.capacity){
            if (this.capacity === 0) {
                this.capacity = 1;
            } else {
                this.capacity = this.capacity * 2;
            }
        }
        const newValue = new Uint8Array(this.capacity);
        newValue.set(this.value.subarray(0, this.length));
        newValue.set(bytes, this.length);
        this.value = newValue;
        this.length += bytes.byteLength;
    }
    writeByte(byte) {
        if (this.length + 1 <= this.capacity) {
            this.value[this.length] = byte;
            this.length += 1;
            return;
        }
        if (this.capacity === 0) {
            this.capacity = 1;
        } else {
            this.capacity = this.capacity * 2;
        }
        const newValue = new Uint8Array(this.capacity);
        newValue.set(this.value.subarray(0, this.length));
        newValue[this.length] = byte;
        this.value = newValue;
        this.length += 1;
    }
    readInto(target) {
        if (target.byteLength < this.length) {
            throw new TypeError("Not enough space");
        }
        target.set(this.value.subarray(0, this.length));
    }
    bytes() {
        return this.value.slice(0, this.length);
    }
    clear() {
        this.length = 0;
    }
}
}),
"[project]/node_modules/@oslojs/binary/dist/bits.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rotl32",
    ()=>rotl32,
    "rotl64",
    ()=>rotl64,
    "rotr32",
    ()=>rotr32,
    "rotr64",
    ()=>rotr64
]);
function rotl32(x, n) {
    return (x << n | x >>> 32 - n) >>> 0;
}
function rotr32(x, n) {
    return (x << 32 - n | x >>> n) >>> 0;
}
function rotr64(x, n) {
    return (x << BigInt(64 - n) | x >> BigInt(n)) & 0xffffffffffffffffn;
}
function rotl64(x, n) {
    return (x << BigInt(n) | x >> BigInt(64 - n)) & 0xffffffffffffffffn;
}
}),
"[project]/node_modules/@oslojs/binary/dist/big.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bigIntBytes",
    ()=>bigIntBytes,
    "bigIntFromBytes",
    ()=>bigIntFromBytes
]);
function bigIntBytes(value) {
    if (value < 0n) {
        value = value * -1n;
    }
    let byteLength = 1;
    while(value > 2n ** BigInt(byteLength * 8) - 1n){
        byteLength++;
    }
    const encoded = new Uint8Array(byteLength);
    for(let i = 0; i < encoded.byteLength; i++){
        encoded[i] = Number(value >> BigInt((encoded.byteLength - i - 1) * 8) & 0xffn);
    }
    return encoded;
}
function bigIntFromBytes(bytes) {
    if (bytes.byteLength < 1) {
        throw new TypeError("Empty Uint8Array");
    }
    let decoded = 0n;
    for(let i = 0; i < bytes.byteLength; i++){
        decoded += BigInt(bytes[i]) << BigInt((bytes.byteLength - 1 - i) * 8);
    }
    return decoded;
}
}),
"[project]/node_modules/@oslojs/binary/dist/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$binary$2f$dist$2f$uint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/binary/dist/uint.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$binary$2f$dist$2f$bytes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/binary/dist/bytes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$binary$2f$dist$2f$bits$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/binary/dist/bits.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$binary$2f$dist$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/binary/dist/big.js [app-route] (ecmascript)");
;
;
;
;
}),
"[project]/node_modules/@oslojs/crypto/dist/random/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateRandomInteger",
    ()=>generateRandomInteger,
    "generateRandomIntegerNumber",
    ()=>generateRandomIntegerNumber,
    "generateRandomString",
    ()=>generateRandomString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$binary$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/binary/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$binary$2f$dist$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@oslojs/binary/dist/big.js [app-route] (ecmascript)");
;
function generateRandomInteger(random, max) {
    if (max < 2) {
        throw new Error("Argument 'max' must be a positive integer larger than 1");
    }
    const inclusiveMaxBitLength = (max - 1n).toString(2).length;
    const shift = inclusiveMaxBitLength % 8;
    const bytes = new Uint8Array(Math.ceil(inclusiveMaxBitLength / 8));
    try {
        random.read(bytes);
    } catch (e) {
        throw new Error("Failed to retrieve random bytes", {
            cause: e
        });
    }
    // This zeroes bits that can be ignored to increase the chance `result` < `max`.
    // For example, if `max` can be represented with 10 bits, the leading 6 bits of the random 16 bits (2 bytes) can be ignored.
    if (shift !== 0) {
        bytes[0] &= (1 << shift) - 1;
    }
    let result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$binary$2f$dist$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bigIntFromBytes"])(bytes);
    while(result >= max){
        try {
            random.read(bytes);
        } catch (e) {
            throw new Error("Failed to retrieve random bytes", {
                cause: e
            });
        }
        if (shift !== 0) {
            bytes[0] &= (1 << shift) - 1;
        }
        result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$oslojs$2f$binary$2f$dist$2f$big$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bigIntFromBytes"])(bytes);
    }
    return result;
}
function generateRandomIntegerNumber(random, max) {
    if (max < 2 || max > Number.MAX_SAFE_INTEGER) {
        throw new Error("Argument 'max' must be a positive integer larger than 1");
    }
    return Number(generateRandomInteger(random, BigInt(max)));
}
function generateRandomString(random, alphabet, length) {
    let result = "";
    for(let i = 0; i < length; i++){
        result += alphabet[generateRandomIntegerNumber(random, alphabet.length)];
    }
    return result;
}
}),
"[project]/node_modules/@oslojs/crypto/dist/subtle/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "constantTimeEqual",
    ()=>constantTimeEqual
]);
function constantTimeEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    let c = 0;
    for(let i = 0; i < a.length; i++){
        c |= a[i] ^ b[i];
    }
    return c === 0;
}
}),
];

//# sourceMappingURL=_6f538835._.js.map