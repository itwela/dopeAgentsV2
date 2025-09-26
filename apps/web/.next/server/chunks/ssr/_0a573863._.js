module.exports = [
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "detectDomainLocale", {
    enumerable: true,
    get: function() {
        return detectDomainLocale;
    }
});
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var _item_domain, _item_locales;
        // remove port if present
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(':', 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parsePath", {
    enumerable: true,
    get: function() {
        return parsePath;
    }
});
function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
} //# sourceMappingURL=parse-path.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addPathPrefix", {
    enumerable: true,
    get: function() {
        return addPathPrefix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)");
function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/add-path-suffix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addPathSuffix", {
    enumerable: true,
    get: function() {
        return addPathSuffix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)");
function addPathSuffix(path, suffix) {
    if (!path.startsWith('/') || !suffix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pathHasPrefix", {
    enumerable: true,
    get: function() {
        return pathHasPrefix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)");
function pathHasPrefix(path, prefix) {
    if (typeof path !== 'string') {
        return false;
    }
    const { pathname } = (0, _parsepath.parsePath)(path);
    return pathname === prefix || pathname.startsWith(prefix + '/');
} //# sourceMappingURL=path-has-prefix.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/add-locale.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addLocale", {
    enumerable: true,
    get: function() {
        return addLocale;
    }
});
const _addpathprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-rsc] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if ((0, _pathhasprefix.pathHasPrefix)(lower, '/api')) return path;
        if ((0, _pathhasprefix.pathHasPrefix)(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return (0, _addpathprefix.addPathPrefix)(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/format-next-pathname-info.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatNextPathnameInfo", {
    enumerable: true,
    get: function() {
        return formatNextPathnameInfo;
    }
});
const _removetrailingslash = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [app-rsc] (ecmascript)");
const _addpathprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-rsc] (ecmascript)");
const _addpathsuffix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/add-path-suffix.js [app-rsc] (ecmascript)");
const _addlocale = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/add-locale.js [app-rsc] (ecmascript)");
function formatNextPathnameInfo(info) {
    let pathname = (0, _addlocale.addLocale)(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = (0, _removetrailingslash.removeTrailingSlash)(pathname);
    }
    if (info.buildId) {
        pathname = (0, _addpathsuffix.addPathSuffix)((0, _addpathprefix.addPathPrefix)(pathname, "/_next/data/" + info.buildId), info.pathname === '/' ? 'index.json' : '.json');
    }
    pathname = (0, _addpathprefix.addPathPrefix)(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith('/') ? (0, _addpathsuffix.addPathSuffix)(pathname, '/') : pathname : (0, _removetrailingslash.removeTrailingSlash)(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map
}),
"[project]/node_modules/next/dist/shared/lib/get-hostname.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getHostname", {
    enumerable: true,
    get: function() {
        return getHostname;
    }
});
function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(':', 1)[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removePathPrefix", {
    enumerable: true,
    get: function() {
        return removePathPrefix;
    }
});
const _pathhasprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!(0, _pathhasprefix.pathHasPrefix)(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith('/')) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getNextPathnameInfo", {
    enumerable: true,
    get: function() {
        return getNextPathnameInfo;
    }
});
const _normalizelocalepath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js [app-rsc] (ecmascript)");
const _removepathprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [app-rsc] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname,
        trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
    };
    if (basePath && (0, _pathhasprefix.pathHasPrefix)(info.pathname, basePath)) {
        info.pathname = (0, _removepathprefix.removePathPrefix)(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
        const paths = info.pathname.replace(/^\/_next\/data\//, '').replace(/\.json$/, '').split('/');
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== 'index' ? "/" + paths.slice(1).join('/') : '/';
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : (0, _normalizelocalepath.normalizeLocalePath)(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : (0, _normalizelocalepath.normalizeLocalePath)(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map
}),
"[project]/node_modules/next/dist/server/web/next-url.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NextURL", {
    enumerable: true,
    get: function() {
        return NextURL;
    }
});
const _detectdomainlocale = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js [app-rsc] (ecmascript)");
const _formatnextpathnameinfo = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/format-next-pathname-info.js [app-rsc] (ecmascript)");
const _gethostname = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/get-hostname.js [app-rsc] (ecmascript)");
const _getnextpathnameinfo = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js [app-rsc] (ecmascript)");
const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'));
}
const Internal = Symbol('NextURLInternal');
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === 'object' && 'pathname' in baseOrOpts || typeof baseOrOpts === 'string') {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ''
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = (0, _getnextpathnameinfo.getNextPathnameInfo)(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !("TURBOPACK compile-time value", void 0),
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = (0, _gethostname.getHostname)(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0, _detectdomainlocale.detectDomainLocale)((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? '';
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return (0, _formatnextpathnameinfo.formatNextPathnameInfo)({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? '';
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw Object.defineProperty(new TypeError(`The NextURL configuration includes no locale "${locale}"`), "__NEXT_ERROR_CODE", {
                value: "E597",
                enumerable: false,
                configurable: true
            });
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith('/') ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map
}),
"[project]/node_modules/next/dist/server/web/error.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    PageSignatureError: null,
    RemovedPageError: null,
    RemovedUAError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PageSignatureError: function() {
        return PageSignatureError;
    },
    RemovedPageError: function() {
        return RemovedPageError;
    },
    RemovedUAError: function() {
        return RemovedUAError;
    }
});
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    RequestCookies: null,
    ResponseCookies: null,
    stringifyCookie: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RequestCookies: function() {
        return _cookies.RequestCookies;
    },
    ResponseCookies: function() {
        return _cookies.ResponseCookies;
    },
    stringifyCookie: function() {
        return _cookies.stringifyCookie;
    }
});
const _cookies = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [app-rsc] (ecmascript)"); //# sourceMappingURL=cookies.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/request.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    INTERNALS: null,
    NextRequest: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    INTERNALS: function() {
        return INTERNALS;
    },
    NextRequest: function() {
        return NextRequest;
    }
});
const _nexturl = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/next-url.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/utils.js [app-rsc] (ecmascript)");
const _error = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/error.js [app-rsc] (ecmascript)");
const _cookies = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)");
const INTERNALS = Symbol('internal request');
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== 'string' && 'url' in input ? input.url : String(input);
        (0, _utils.validateURL)(url);
        // node Request instance requires duplex option when a body
        // is present or it errors, we don't handle this for
        // Request being passed in since it would have already
        // errored if this wasn't configured
        if ("TURBOPACK compile-time truthy", 1) {
            if (init.body && init.duplex !== 'half') {
                init.duplex = 'half';
            }
        }
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new _nexturl.NextURL(url, {
            headers: (0, _utils.toNodeOutgoingHttpHeaders)(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new _cookies.RequestCookies(this.headers),
            nextUrl,
            url: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : nextUrl.toString()
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new _error.RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new _error.RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReflectAdapter", {
    enumerable: true,
    get: function() {
        return ReflectAdapter;
    }
});
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/response.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NextResponse", {
    enumerable: true,
    get: function() {
        return NextResponse;
    }
});
const _cookies = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)");
const _nexturl = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/next-url.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/utils.js [app-rsc] (ecmascript)");
const _reflect = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
const _cookies1 = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)");
const INTERNALS = Symbol('internal response');
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw Object.defineProperty(new Error('request.headers must be an instance of Headers'), "__NEXT_ERROR_CODE", {
                value: "E119",
                enumerable: false,
                configurable: true
            });
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set('x-middleware-request-' + key, value);
            keys.push(key);
        }
        headers.set('x-middleware-override-headers', keys.join(','));
    }
}
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        const headers = this.headers;
        const cookies = new _cookies1.ResponseCookies(headers);
        const cookiesProxy = new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'delete':
                    case 'set':
                        {
                            return (...args)=>{
                                const result = Reflect.apply(target[prop], target, args);
                                const newHeaders = new Headers(headers);
                                if (result instanceof _cookies1.ResponseCookies) {
                                    headers.set('x-middleware-set-cookie', result.getAll().map((cookie)=>(0, _cookies.stringifyCookie)(cookie)).join(','));
                                }
                                handleMiddlewareField(init, newHeaders);
                                return result;
                            };
                        }
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
        this[INTERNALS] = {
            cookies: cookiesProxy,
            url: init.url ? new _nexturl.NextURL(init.url, {
                headers: (0, _utils.toNodeOutgoingHttpHeaders)(headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    static json(body, init) {
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === 'number' ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw Object.defineProperty(new RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", {
                value: "E529",
                enumerable: false,
                configurable: true
            });
        }
        const initObj = typeof init === 'object' ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set('Location', (0, _utils.validateURL)(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set('x-middleware-rewrite', (0, _utils.validateURL)(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set('x-middleware-next', '1');
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
} //# sourceMappingURL=response.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/image-response.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @deprecated ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead.
 * Migration with codemods: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#next-og-import
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageResponse", {
    enumerable: true,
    get: function() {
        return ImageResponse;
    }
});
function ImageResponse() {
    throw Object.defineProperty(new Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead'), "__NEXT_ERROR_CODE", {
        value: "E183",
        enumerable: false,
        configurable: true
    });
} //# sourceMappingURL=image-response.js.map
}),
"[project]/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    var i = {
        226: function(i, e) {
            (function(o, a) {
                "use strict";
                var r = "1.0.35", t = "", n = "?", s = "function", b = "undefined", w = "object", l = "string", d = "major", c = "model", u = "name", p = "type", m = "vendor", f = "version", h = "architecture", v = "console", g = "mobile", k = "tablet", x = "smarttv", _ = "wearable", y = "embedded", q = 350;
                var T = "Amazon", S = "Apple", z = "ASUS", N = "BlackBerry", A = "Browser", C = "Chrome", E = "Edge", O = "Firefox", U = "Google", j = "Huawei", P = "LG", R = "Microsoft", M = "Motorola", B = "Opera", V = "Samsung", D = "Sharp", I = "Sony", W = "Viera", F = "Xiaomi", G = "Zebra", H = "Facebook", L = "Chromium OS", Z = "Mac OS";
                var extend = function(i, e) {
                    var o = {};
                    for(var a in i){
                        if (e[a] && e[a].length % 2 === 0) {
                            o[a] = e[a].concat(i[a]);
                        } else {
                            o[a] = i[a];
                        }
                    }
                    return o;
                }, enumerize = function(i) {
                    var e = {};
                    for(var o = 0; o < i.length; o++){
                        e[i[o].toUpperCase()] = i[o];
                    }
                    return e;
                }, has = function(i, e) {
                    return typeof i === l ? lowerize(e).indexOf(lowerize(i)) !== -1 : false;
                }, lowerize = function(i) {
                    return i.toLowerCase();
                }, majorize = function(i) {
                    return typeof i === l ? i.replace(/[^\d\.]/g, t).split(".")[0] : a;
                }, trim = function(i, e) {
                    if (typeof i === l) {
                        i = i.replace(/^\s\s*/, t);
                        return typeof e === b ? i : i.substring(0, q);
                    }
                };
                var rgxMapper = function(i, e) {
                    var o = 0, r, t, n, b, l, d;
                    while(o < e.length && !l){
                        var c = e[o], u = e[o + 1];
                        r = t = 0;
                        while(r < c.length && !l){
                            if (!c[r]) {
                                break;
                            }
                            l = c[r++].exec(i);
                            if (!!l) {
                                for(n = 0; n < u.length; n++){
                                    d = l[++t];
                                    b = u[n];
                                    if (typeof b === w && b.length > 0) {
                                        if (b.length === 2) {
                                            if (typeof b[1] == s) {
                                                this[b[0]] = b[1].call(this, d);
                                            } else {
                                                this[b[0]] = b[1];
                                            }
                                        } else if (b.length === 3) {
                                            if (typeof b[1] === s && !(b[1].exec && b[1].test)) {
                                                this[b[0]] = d ? b[1].call(this, d, b[2]) : a;
                                            } else {
                                                this[b[0]] = d ? d.replace(b[1], b[2]) : a;
                                            }
                                        } else if (b.length === 4) {
                                            this[b[0]] = d ? b[3].call(this, d.replace(b[1], b[2])) : a;
                                        }
                                    } else {
                                        this[b] = d ? d : a;
                                    }
                                }
                            }
                        }
                        o += 2;
                    }
                }, strMapper = function(i, e) {
                    for(var o in e){
                        if (typeof e[o] === w && e[o].length > 0) {
                            for(var r = 0; r < e[o].length; r++){
                                if (has(e[o][r], i)) {
                                    return o === n ? a : o;
                                }
                            }
                        } else if (has(e[o], i)) {
                            return o === n ? a : o;
                        }
                    }
                    return i;
                };
                var $ = {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }, X = {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: [
                        "NT 5.1",
                        "NT 5.2"
                    ],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: [
                        "NT 6.4",
                        "NT 10.0"
                    ],
                    RT: "ARM"
                };
                var K = {
                    browser: [
                        [
                            /\b(?:crmo|crios)\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Chrome"
                            ]
                        ],
                        [
                            /edg(?:e|ios|a)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Edge"
                            ]
                        ],
                        [
                            /(opera mini)\/([-\w\.]+)/i,
                            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /opios[\/ ]+([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Mini"
                            ]
                        ],
                        [
                            /\bopr\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B
                            ]
                        ],
                        [
                            /(kindle)\/([\w\.]+)/i,
                            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                            /(?:ms|\()(ie) ([\w\.]+)/i,
                            /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                            /(heytap|ovi)browser\/([\d\.]+)/i,
                            /(weibo)__([\d\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "UC" + A
                            ]
                        ],
                        [
                            /microm.+\bqbcore\/([\w\.]+)/i,
                            /\bqbcore\/([\w\.]+).+microm/i
                        ],
                        [
                            f,
                            [
                                u,
                                "WeChat(Win) Desktop"
                            ]
                        ],
                        [
                            /micromessenger\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "WeChat"
                            ]
                        ],
                        [
                            /konqueror\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Konqueror"
                            ]
                        ],
                        [
                            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
                        ],
                        [
                            f,
                            [
                                u,
                                "IE"
                            ]
                        ],
                        [
                            /ya(?:search)?browser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Yandex"
                            ]
                        ],
                        [
                            /(avast|avg)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /(.+)/,
                                "$1 Secure " + A
                            ],
                            f
                        ],
                        [
                            /\bfocus\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " Focus"
                            ]
                        ],
                        [
                            /\bopt\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Touch"
                            ]
                        ],
                        [
                            /coc_coc\w+\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Coc Coc"
                            ]
                        ],
                        [
                            /dolfin\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Dolphin"
                            ]
                        ],
                        [
                            /coast\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Coast"
                            ]
                        ],
                        [
                            /miuibrowser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "MIUI " + A
                            ]
                        ],
                        [
                            /fxios\/([-\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O
                            ]
                        ],
                        [
                            /\bqihu|(qi?ho?o?|360)browser/i
                        ],
                        [
                            [
                                u,
                                "360 " + A
                            ]
                        ],
                        [
                            /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /(.+)/,
                                "$1 " + A
                            ],
                            f
                        ],
                        [
                            /(comodo_dragon)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            f
                        ],
                        [
                            /(electron)\/([\w\.]+) safari/i,
                            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(metasr)[\/ ]?([\w\.]+)/i,
                            /(lbbrowser)/i,
                            /\[(linkedin)app\]/i
                        ],
                        [
                            u
                        ],
                        [
                            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
                        ],
                        [
                            [
                                u,
                                H
                            ],
                            f
                        ],
                        [
                            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                            /safari (line)\/([\w\.]+)/i,
                            /\b(line)\/([\w\.]+)\/iab/i,
                            /(chromium|instagram)[\/ ]([-\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /\bgsa\/([\w\.]+) .*safari\//i
                        ],
                        [
                            f,
                            [
                                u,
                                "GSA"
                            ]
                        ],
                        [
                            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "TikTok"
                            ]
                        ],
                        [
                            /headlesschrome(?:\/([\w\.]+)| )/i
                        ],
                        [
                            f,
                            [
                                u,
                                C + " Headless"
                            ]
                        ],
                        [
                            / wv\).+(chrome)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                C + " WebView"
                            ],
                            f
                        ],
                        [
                            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Android " + A
                            ]
                        ],
                        [
                            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Mobile Safari"
                            ]
                        ],
                        [
                            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
                        ],
                        [
                            f,
                            u
                        ],
                        [
                            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
                        ],
                        [
                            u,
                            [
                                f,
                                strMapper,
                                $
                            ]
                        ],
                        [
                            /(webkit|khtml)\/([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(navigator|netscape\d?)\/([-\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                "Netscape"
                            ],
                            f
                        ],
                        [
                            /mobile vr; rv:([\w\.]+)\).+firefox/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " Reality"
                            ]
                        ],
                        [
                            /ekiohf.+(flow)\/([\w\.]+)/i,
                            /(swiftfox)/i,
                            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                            /(firefox)\/([\w\.]+)/i,
                            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                            /(links) \(([\w\.]+)/i,
                            /panasonic;(viera)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(cobalt)\/([\w\.]+)/i
                        ],
                        [
                            u,
                            [
                                f,
                                /master.|lts./,
                                ""
                            ]
                        ]
                    ],
                    cpu: [
                        [
                            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "amd64"
                            ]
                        ],
                        [
                            /(ia32(?=;))/i
                        ],
                        [
                            [
                                h,
                                lowerize
                            ]
                        ],
                        [
                            /((?:i[346]|x)86)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "ia32"
                            ]
                        ],
                        [
                            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
                        ],
                        [
                            [
                                h,
                                "arm64"
                            ]
                        ],
                        [
                            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
                        ],
                        [
                            [
                                h,
                                "armhf"
                            ]
                        ],
                        [
                            /windows (ce|mobile); ppc;/i
                        ],
                        [
                            [
                                h,
                                "arm"
                            ]
                        ],
                        [
                            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
                        ],
                        [
                            [
                                h,
                                /ower/,
                                t,
                                lowerize
                            ]
                        ],
                        [
                            /(sun4\w)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "sparc"
                            ]
                        ],
                        [
                            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                        ],
                        [
                            [
                                h,
                                lowerize
                            ]
                        ]
                    ],
                    device: [
                        [
                            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
                        ],
                        [
                            c,
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                            /samsung[- ]([-\w]+)/i,
                            /sec-(sgh\w+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\((ipad);[-\w\),; ]+apple/i,
                            /applecoremedia\/[\w\.]+ \((ipad)/i,
                            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(macintosh);/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ]
                        ],
                        [
                            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                D
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
                        ],
                        [
                            c,
                            [
                                m,
                                j
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(?:huawei|honor)([-\w ]+)[;\)]/i,
                            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
                        ],
                        [
                            c,
                            [
                                m,
                                j
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(poco[\w ]+)(?: bui|\))/i,
                            /\b; (\w+) build\/hm\1/i,
                            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /; (\w+) bui.+ oppo/i,
                            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "OPPO"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /vivo (\w+)(?: bui|\))/i,
                            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Vivo"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(rmx[12]\d{3})(?: bui|;|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Realme"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                            /\bmot(?:orola)?[- ](\w*)/i,
                            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
                        ],
                        [
                            c,
                            [
                                m,
                                M
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
                        ],
                        [
                            c,
                            [
                                m,
                                M
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
                        ],
                        [
                            c,
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                            /\blg-?([\d\w]+) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(ideatab[-\w ]+)/i,
                            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Lenovo"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(?:maemo|nokia).*(n900|lumia \d+)/i,
                            /nokia[-_ ]?([-\w\.]*)/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                "Nokia"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(pixel c)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /sony tablet [ps]/i,
                            /\b(?:sony)?sgp\w+(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                "Xperia Tablet"
                            ],
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            / (kb2005|in20[12]5|be20[12][59])\b/i,
                            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "OnePlus"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(alexa)webm/i,
                            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                            /(kf[a-z]+)( bui|\)).+silk\//i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
                        ],
                        [
                            [
                                c,
                                /(.+)/g,
                                "Fire Phone $1"
                            ],
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(playbook);[-\w\),; ]+(rim)/i
                        ],
                        [
                            c,
                            m,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((?:bb[a-f]|st[hv])100-\d)/i,
                            /\(bb10; (\w+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                N
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
                        ],
                        [
                            c,
                            [
                                m,
                                z
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                z
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(nexus 9)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "HTC"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
                        ],
                        [
                            m,
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Acer"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (m[1-5] note) bui/i,
                            /\bmz-([-\w]{2,})/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Meizu"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                            /(hp) ([\w ]+\w)/i,
                            /(asus)-?(\w+)/i,
                            /(microsoft); (lumia[\w ]+)/i,
                            /(lenovo)[-_ ]?([-\w]+)/i,
                            /(jolla)/i,
                            /(oppo) ?([\w ]+) bui/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(kobo)\s(ereader|touch)/i,
                            /(archos) (gamepad2?)/i,
                            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                            /(kindle)\/([\w\.]+)/i,
                            /(nook)[\w ]+build\/(\w+)/i,
                            /(dell) (strea[kpr\d ]*[\dko])/i,
                            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                            /(trinity)[- ]*(t\d{3}) bui/i,
                            /(gigaset)[- ]+(q\w{1,9}) bui/i,
                            /(vodafone) ([\w ]+)(?:\)| bui)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(surface duo)/i
                        ],
                        [
                            c,
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid [\d\.]+; (fp\du?)(?: b|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Fairphone"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(u304aa)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "AT&T"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\bsie-(\w*)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Siemens"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(rct\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "RCA"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(venue[\d ]{2,7}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Dell"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(q(?:mv|ta)\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Verizon"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Barnes & Noble"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(tm\d{3}\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "NuVision"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(k88) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "ZTE"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(nx\d{3}j) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "ZTE"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(gen\d{3}) b.+49h/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Swiss"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(zur\d{3}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Swiss"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((zeki)?tb.*\b) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Zeki"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b([yr]\d{2}) b/i,
                            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
                        ],
                        [
                            [
                                m,
                                "Dragon Touch"
                            ],
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(ns-?\w{0,9}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Insignia"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((nxa|next)-?\w{0,9}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "NextBook"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
                        ],
                        [
                            [
                                m,
                                "Voice"
                            ],
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(lvtel\-)?(v1[12]) b/i
                        ],
                        [
                            [
                                m,
                                "LvTel"
                            ],
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(ph-1) /i
                        ],
                        [
                            c,
                            [
                                m,
                                "Essential"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(v(100md|700na|7011|917g).*\b) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Envizen"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(trio[-\w\. ]+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "MachSpeed"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\btu_(1491) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Rotor"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(shield[\w ]+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Nvidia"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(sprint) (\w+)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(kin\.[onetw]{3})/i
                        ],
                        [
                            [
                                c,
                                /\./g,
                                " "
                            ],
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /smart-tv.+(samsung)/i
                        ],
                        [
                            m,
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /hbbtv.+maple;(\d+)/i
                        ],
                        [
                            [
                                c,
                                /^/,
                                "SmartTV"
                            ],
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
                        ],
                        [
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(apple) ?tv/i
                        ],
                        [
                            m,
                            [
                                c,
                                S + " TV"
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /crkey/i
                        ],
                        [
                            [
                                c,
                                C + "cast"
                            ],
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /droid.+aft(\w)( bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\(dtv[\);].+(aquos)/i,
                            /(aquos-tv[\w ]+)\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                D
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(bravia[\w ]+)( bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(mitv-\w{5}) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /Hbbtv.*(technisat) (.*);/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
                        ],
                        [
                            [
                                m,
                                trim
                            ],
                            [
                                c,
                                trim
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
                        ],
                        [
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(ouya)/i,
                            /(nintendo) ([wids3utch]+)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /droid.+; (shield) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Nvidia"
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /(playstation [345portablevi]+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
                        ],
                        [
                            c,
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /((pebble))app/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /droid.+; (glass) \d/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /droid.+; (wt63?0{2,3})\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(quest( 2| pro)?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                H
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
                        ],
                        [
                            m,
                            [
                                p,
                                y
                            ]
                        ],
                        [
                            /(aeobc)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                y
                            ]
                        ],
                        [
                            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
                        ],
                        [
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
                        ],
                        [
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
                        ],
                        [
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
                        ],
                        [
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(android[-\w\. ]{0,9});.+buil/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Generic"
                            ]
                        ]
                    ],
                    engine: [
                        [
                            /windows.+ edge\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                E + "HTML"
                            ]
                        ],
                        [
                            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Blink"
                            ]
                        ],
                        [
                            /(presto)\/([\w\.]+)/i,
                            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                            /ekioh(flow)\/([\w\.]+)/i,
                            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                            /(icab)[\/ ]([23]\.[\d\.]+)/i,
                            /\b(libweb)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /rv\:([\w\.]{1,9})\b.+(gecko)/i
                        ],
                        [
                            f,
                            u
                        ]
                    ],
                    os: [
                        [
                            /microsoft (windows) (vista|xp)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(windows) nt 6\.2; (arm)/i,
                            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
                        ],
                        [
                            u,
                            [
                                f,
                                strMapper,
                                X
                            ]
                        ],
                        [
                            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
                        ],
                        [
                            [
                                u,
                                "Windows"
                            ],
                            [
                                f,
                                strMapper,
                                X
                            ]
                        ],
                        [
                            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                            /ios;fbsv\/([\d\.]+)/i,
                            /cfnetwork\/.+darwin/i
                        ],
                        [
                            [
                                f,
                                /_/g,
                                "."
                            ],
                            [
                                u,
                                "iOS"
                            ]
                        ],
                        [
                            /(mac os x) ?([\w\. ]*)/i,
                            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
                        ],
                        [
                            [
                                u,
                                Z
                            ],
                            [
                                f,
                                /_/g,
                                "."
                            ]
                        ],
                        [
                            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
                        ],
                        [
                            f,
                            u
                        ],
                        [
                            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                            /(blackberry)\w*\/([\w\.]*)/i,
                            /(tizen|kaios)[\/ ]([\w\.]+)/i,
                            /\((series40);/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /\(bb(10);/i
                        ],
                        [
                            f,
                            [
                                u,
                                N
                            ]
                        ],
                        [
                            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Symbian"
                            ]
                        ],
                        [
                            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " OS"
                            ]
                        ],
                        [
                            /web0s;.+rt(tv)/i,
                            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "webOS"
                            ]
                        ],
                        [
                            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "watchOS"
                            ]
                        ],
                        [
                            /crkey\/([\d\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                C + "cast"
                            ]
                        ],
                        [
                            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
                        ],
                        [
                            [
                                u,
                                L
                            ],
                            f
                        ],
                        [
                            /panasonic;(viera)/i,
                            /(netrange)mmh/i,
                            /(nettv)\/(\d+\.[\w\.]+)/i,
                            /(nintendo|playstation) ([wids345portablevuch]+)/i,
                            /(xbox); +xbox ([^\);]+)/i,
                            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                            /(mint)[\/\(\) ]?(\w*)/i,
                            /(mageia|vectorlinux)[; ]/i,
                            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                            /(hurd|linux) ?([\w\.]*)/i,
                            /(gnu) ?([\w\.]*)/i,
                            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                            /(haiku) (\w+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(sunos) ?([\w\.\d]*)/i
                        ],
                        [
                            [
                                u,
                                "Solaris"
                            ],
                            f
                        ],
                        [
                            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                            /(unix) ?([\w\.]*)/i
                        ],
                        [
                            u,
                            f
                        ]
                    ]
                };
                var UAParser = function(i, e) {
                    if (typeof i === w) {
                        e = i;
                        i = a;
                    }
                    if (!(this instanceof UAParser)) {
                        return new UAParser(i, e).getResult();
                    }
                    var r = typeof o !== b && o.navigator ? o.navigator : a;
                    var n = i || (r && r.userAgent ? r.userAgent : t);
                    var v = r && r.userAgentData ? r.userAgentData : a;
                    var x = e ? extend(K, e) : K;
                    var _ = r && r.userAgent == n;
                    this.getBrowser = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.browser);
                        i[d] = majorize(i[f]);
                        if (_ && r && r.brave && typeof r.brave.isBrave == s) {
                            i[u] = "Brave";
                        }
                        return i;
                    };
                    this.getCPU = function() {
                        var i = {};
                        i[h] = a;
                        rgxMapper.call(i, n, x.cpu);
                        return i;
                    };
                    this.getDevice = function() {
                        var i = {};
                        i[m] = a;
                        i[c] = a;
                        i[p] = a;
                        rgxMapper.call(i, n, x.device);
                        if (_ && !i[p] && v && v.mobile) {
                            i[p] = g;
                        }
                        if (_ && i[c] == "Macintosh" && r && typeof r.standalone !== b && r.maxTouchPoints && r.maxTouchPoints > 2) {
                            i[c] = "iPad";
                            i[p] = k;
                        }
                        return i;
                    };
                    this.getEngine = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.engine);
                        return i;
                    };
                    this.getOS = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.os);
                        if (_ && !i[u] && v && v.platform != "Unknown") {
                            i[u] = v.platform.replace(/chrome os/i, L).replace(/macos/i, Z);
                        }
                        return i;
                    };
                    this.getResult = function() {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS(),
                            device: this.getDevice(),
                            cpu: this.getCPU()
                        };
                    };
                    this.getUA = function() {
                        return n;
                    };
                    this.setUA = function(i) {
                        n = typeof i === l && i.length > q ? trim(i, q) : i;
                        return this;
                    };
                    this.setUA(n);
                    return this;
                };
                UAParser.VERSION = r;
                UAParser.BROWSER = enumerize([
                    u,
                    f,
                    d
                ]);
                UAParser.CPU = enumerize([
                    h
                ]);
                UAParser.DEVICE = enumerize([
                    c,
                    m,
                    p,
                    v,
                    g,
                    x,
                    k,
                    _,
                    y
                ]);
                UAParser.ENGINE = UAParser.OS = enumerize([
                    u,
                    f
                ]);
                if (typeof e !== b) {
                    if ("object" !== b && i.exports) {
                        e = i.exports = UAParser;
                    }
                    e.UAParser = UAParser;
                } else {
                    if (typeof define === s && define.amd) {
                        ((r)=>r !== undefined && __turbopack_context__.v(r))(function() {
                            return UAParser;
                        }(__turbopack_context__.r, exports, module));
                    } else if (typeof o !== b) {
                        o.UAParser = UAParser;
                    }
                }
                var Q = typeof o !== b && (o.jQuery || o.Zepto);
                if (Q && !Q.ua) {
                    var Y = new UAParser;
                    Q.ua = Y.getResult();
                    Q.ua.get = function() {
                        return Y.getUA();
                    };
                    Q.ua.set = function(i) {
                        Y.setUA(i);
                        var e = Y.getResult();
                        for(var o in e){
                            Q.ua[o] = e[o];
                        }
                    };
                }
            })(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : this);
        }
    };
    var e = {};
    function __nccwpck_require__(o) {
        var a = e[o];
        if (a !== undefined) {
            return a.exports;
        }
        var r = e[o] = {
            exports: {}
        };
        var t = true;
        try {
            i[o].call(r.exports, r, r.exports, __nccwpck_require__);
            t = false;
        } finally{
            if (t) delete e[o];
        }
        return r.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/node_modules/next/dist/compiled/ua-parser-js") + "/";
    var o = __nccwpck_require__(226);
    module.exports = o;
})();
}),
"[project]/node_modules/next/dist/server/web/spec-extension/user-agent.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isBot: null,
    userAgent: null,
    userAgentFromString: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isBot: function() {
        return isBot;
    },
    userAgent: function() {
        return userAgent;
    },
    userAgentFromString: function() {
        return userAgentFromString;
    }
});
const _uaparserjs = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js [app-rsc] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function isBot(input) {
    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
}
function userAgentFromString(input) {
    return {
        ...(0, _uaparserjs.default)(input),
        isBot: input === undefined ? false : isBot(input)
    };
}
function userAgent({ headers }) {
    return userAgentFromString(headers.get('user-agent') || undefined);
} //# sourceMappingURL=user-agent.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/url-pattern.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "URLPattern", {
    enumerable: true,
    get: function() {
        return GlobalURLPattern;
    }
});
const GlobalURLPattern = typeof URLPattern === 'undefined' ? undefined : URLPattern; //# sourceMappingURL=url-pattern.js.map
}),
"[project]/node_modules/next/dist/server/after/after.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "after", {
    enumerable: true,
    get: function() {
        return after;
    }
});
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
function after(task) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!workStore) {
        // TODO(after): the linked docs page talks about *dynamic* APIs, which after soon won't be anymore
        throw Object.defineProperty(new Error('`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context'), "__NEXT_ERROR_CODE", {
            value: "E468",
            enumerable: false,
            configurable: true
        });
    }
    const { afterContext } = workStore;
    return afterContext.after(task);
} //# sourceMappingURL=after.js.map
}),
"[project]/node_modules/next/dist/server/after/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && __export(__turbopack_context__.r("[project]/node_modules/next/dist/server/after/after.js [app-rsc] (ecmascript)"));
_export_star(__turbopack_context__.r("[project]/node_modules/next/dist/server/after/after.js [app-rsc] (ecmascript)"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
} //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/next/dist/client/components/hooks-server-context.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DynamicServerError: null,
    isDynamicServerError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DynamicServerError: function() {
        return DynamicServerError;
    },
    isDynamicServerError: function() {
        return isDynamicServerError;
    }
});
const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
class DynamicServerError extends Error {
    constructor(description){
        super("Dynamic server usage: " + description), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hooks-server-context.js.map
}),
"[project]/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    StaticGenBailoutError: null,
    isStaticGenBailoutError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    StaticGenBailoutError: function() {
        return StaticGenBailoutError;
    },
    isStaticGenBailoutError: function() {
        return isStaticGenBailoutError;
    }
});
const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-bailout.js.map
}),
"[project]/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isHangingPromiseRejectionError: null,
    makeDevtoolsIOAwarePromise: null,
    makeHangingPromise: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isHangingPromiseRejectionError: function() {
        return isHangingPromiseRejectionError;
    },
    makeDevtoolsIOAwarePromise: function() {
        return makeDevtoolsIOAwarePromise;
    },
    makeHangingPromise: function() {
        return makeHangingPromise;
    }
});
function isHangingPromiseRejectionError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === HANGING_PROMISE_REJECTION;
}
const HANGING_PROMISE_REJECTION = 'HANGING_PROMISE_REJECTION';
class HangingPromiseRejectionError extends Error {
    constructor(route, expression){
        super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${route}".`), this.route = route, this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
    }
}
const abortListenersBySignal = new WeakMap();
function makeHangingPromise(signal, route, expression) {
    if (signal.aborted) {
        return Promise.reject(new HangingPromiseRejectionError(route, expression));
    } else {
        const hangingPromise = new Promise((_, reject)=>{
            const boundRejection = reject.bind(null, new HangingPromiseRejectionError(route, expression));
            let currentListeners = abortListenersBySignal.get(signal);
            if (currentListeners) {
                currentListeners.push(boundRejection);
            } else {
                const listeners = [
                    boundRejection
                ];
                abortListenersBySignal.set(signal, listeners);
                signal.addEventListener('abort', ()=>{
                    for(let i = 0; i < listeners.length; i++){
                        listeners[i]();
                    }
                }, {
                    once: true
                });
            }
        });
        // We are fine if no one actually awaits this promise. We shouldn't consider this an unhandled rejection so
        // we attach a noop catch handler here to suppress this warning. If you actually await somewhere or construct
        // your own promise out of it you'll need to ensure you handle the error when it rejects.
        hangingPromise.catch(ignoreReject);
        return hangingPromise;
    }
}
function ignoreReject() {}
function makeDevtoolsIOAwarePromise(underlying) {
    // in React DevTools if we resolve in a setTimeout we will observe
    // the promise resolution as something that can suspend a boundary or root.
    return new Promise((resolve)=>{
        // Must use setTimeout to be considered IO React DevTools. setImmediate will not work.
        setTimeout(()=>{
            resolve(underlying);
        }, 0);
    });
} //# sourceMappingURL=dynamic-rendering-utils.js.map
}),
"[project]/node_modules/next/dist/lib/framework/boundary-constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    METADATA_BOUNDARY_NAME: null,
    OUTLET_BOUNDARY_NAME: null,
    ROOT_LAYOUT_BOUNDARY_NAME: null,
    VIEWPORT_BOUNDARY_NAME: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    METADATA_BOUNDARY_NAME: function() {
        return METADATA_BOUNDARY_NAME;
    },
    OUTLET_BOUNDARY_NAME: function() {
        return OUTLET_BOUNDARY_NAME;
    },
    ROOT_LAYOUT_BOUNDARY_NAME: function() {
        return ROOT_LAYOUT_BOUNDARY_NAME;
    },
    VIEWPORT_BOUNDARY_NAME: function() {
        return VIEWPORT_BOUNDARY_NAME;
    }
});
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__';
const ROOT_LAYOUT_BOUNDARY_NAME = '__next_root_layout_boundary__'; //# sourceMappingURL=boundary-constants.js.map
}),
"[project]/node_modules/next/dist/lib/scheduler.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    atLeastOneTask: null,
    scheduleImmediate: null,
    scheduleOnNextTick: null,
    waitAtLeastOneReactRenderTask: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    atLeastOneTask: function() {
        return atLeastOneTask;
    },
    scheduleImmediate: function() {
        return scheduleImmediate;
    },
    scheduleOnNextTick: function() {
        return scheduleOnNextTick;
    },
    waitAtLeastOneReactRenderTask: function() {
        return waitAtLeastOneReactRenderTask;
    }
});
const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            process.nextTick(cb);
        }
    });
};
const scheduleImmediate = (cb)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        setImmediate(cb);
    }
};
function atLeastOneTask() {
    return new Promise((resolve)=>scheduleImmediate(resolve));
}
function waitAtLeastOneReactRenderTask() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return new Promise((r)=>setImmediate(r));
    }
} //# sourceMappingURL=scheduler.js.map
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This has to be a shared module which is shared between client component error boundary and dynamic component
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BailoutToCSRError: null,
    isBailoutToCSRError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super("Bail out to client-side rendering: " + reason), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map
}),
"[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InvariantError", {
    enumerable: true,
    get: function() {
        return InvariantError;
    }
});
class InvariantError extends Error {
    constructor(message, options){
        super("Invariant: " + (message.endsWith('.') ? message : message + '.') + " This is a bug in Next.js.", options);
        this.name = 'InvariantError';
    }
} //# sourceMappingURL=invariant-error.js.map
}),
"[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    Postpone: null,
    PreludeState: null,
    abortAndThrowOnSynchronousRequestDataAccess: null,
    abortOnSynchronousPlatformIOAccess: null,
    accessedDynamicData: null,
    annotateDynamicAccess: null,
    consumeDynamicAccess: null,
    createDynamicTrackingState: null,
    createDynamicValidationState: null,
    createHangingInputAbortSignal: null,
    createRenderInBrowserAbortSignal: null,
    delayUntilRuntimeStage: null,
    formatDynamicAPIAccesses: null,
    getFirstDynamicReason: null,
    isDynamicPostpone: null,
    isPrerenderInterruptedError: null,
    logDisallowedDynamicError: null,
    markCurrentScopeAsDynamic: null,
    postponeWithTracking: null,
    throwIfDisallowedDynamic: null,
    throwToInterruptStaticGeneration: null,
    trackAllowedDynamicAccess: null,
    trackDynamicDataInDynamicRender: null,
    trackSynchronousPlatformIOAccessInDev: null,
    trackSynchronousRequestDataAccessInDev: null,
    useDynamicRouteParams: null,
    warnOnSyncDynamicError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Postpone: function() {
        return Postpone;
    },
    PreludeState: function() {
        return PreludeState;
    },
    abortAndThrowOnSynchronousRequestDataAccess: function() {
        return abortAndThrowOnSynchronousRequestDataAccess;
    },
    abortOnSynchronousPlatformIOAccess: function() {
        return abortOnSynchronousPlatformIOAccess;
    },
    accessedDynamicData: function() {
        return accessedDynamicData;
    },
    annotateDynamicAccess: function() {
        return annotateDynamicAccess;
    },
    consumeDynamicAccess: function() {
        return consumeDynamicAccess;
    },
    createDynamicTrackingState: function() {
        return createDynamicTrackingState;
    },
    createDynamicValidationState: function() {
        return createDynamicValidationState;
    },
    createHangingInputAbortSignal: function() {
        return createHangingInputAbortSignal;
    },
    createRenderInBrowserAbortSignal: function() {
        return createRenderInBrowserAbortSignal;
    },
    delayUntilRuntimeStage: function() {
        return delayUntilRuntimeStage;
    },
    formatDynamicAPIAccesses: function() {
        return formatDynamicAPIAccesses;
    },
    getFirstDynamicReason: function() {
        return getFirstDynamicReason;
    },
    isDynamicPostpone: function() {
        return isDynamicPostpone;
    },
    isPrerenderInterruptedError: function() {
        return isPrerenderInterruptedError;
    },
    logDisallowedDynamicError: function() {
        return logDisallowedDynamicError;
    },
    markCurrentScopeAsDynamic: function() {
        return markCurrentScopeAsDynamic;
    },
    postponeWithTracking: function() {
        return postponeWithTracking;
    },
    throwIfDisallowedDynamic: function() {
        return throwIfDisallowedDynamic;
    },
    throwToInterruptStaticGeneration: function() {
        return throwToInterruptStaticGeneration;
    },
    trackAllowedDynamicAccess: function() {
        return trackAllowedDynamicAccess;
    },
    trackDynamicDataInDynamicRender: function() {
        return trackDynamicDataInDynamicRender;
    },
    trackSynchronousPlatformIOAccessInDev: function() {
        return trackSynchronousPlatformIOAccessInDev;
    },
    trackSynchronousRequestDataAccessInDev: function() {
        return trackSynchronousRequestDataAccessInDev;
    },
    useDynamicRouteParams: function() {
        return useDynamicRouteParams;
    },
    warnOnSyncDynamicError: function() {
        return warnOnSyncDynamicError;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)"));
const _hooksservercontext = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/hooks-server-context.js [app-rsc] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _boundaryconstants = __turbopack_context__.r("[project]/node_modules/next/dist/lib/framework/boundary-constants.js [app-rsc] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/node_modules/next/dist/lib/scheduler.js [app-rsc] (ecmascript)");
const _bailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const hasPostpone = typeof _react.default.unstable_postpone === 'function';
function createDynamicTrackingState(isDebugDynamicAccesses) {
    return {
        isDebugDynamicAccesses,
        dynamicAccesses: [],
        syncDynamicErrorWithStack: null
    };
}
function createDynamicValidationState() {
    return {
        hasSuspenseAboveBody: false,
        hasDynamicMetadata: false,
        hasDynamicViewport: false,
        hasAllowedDynamic: false,
        dynamicErrors: []
    };
}
function getFirstDynamicReason(trackingState) {
    var _trackingState_dynamicAccesses_;
    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
}
function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'cache':
            case 'unstable-cache':
                // Inside cache scopes, marking a scope as dynamic has no effect,
                // because the outer cache scope creates a cache boundary. This is
                // subtly different from reading a dynamic data source, which is
                // forbidden inside a cache scope.
                return;
            case 'private-cache':
                // A private cache scope is already dynamic by definition.
                return;
            case 'prerender-legacy':
            case 'prerender-ppr':
            case 'request':
                break;
            default:
                workUnitStore;
        }
    }
    // If we're forcing dynamic rendering or we're forcing static rendering, we
    // don't need to do anything here because the entire page is already dynamic
    // or it's static and it should not throw or postpone here.
    if (store.forceDynamic || store.forceStatic) return;
    if (store.dynamicShouldError) {
        throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: false,
            configurable: true
        });
    }
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-ppr':
                return postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
            case 'prerender-legacy':
                workUnitStore.revalidate = 0;
                // We aren't prerendering, but we are generating a static page. We need
                // to bail out of static generation.
                const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                    value: "E550",
                    enumerable: false,
                    configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            case 'request':
                if ("TURBOPACK compile-time truthy", 1) {
                    workUnitStore.usedDynamic = true;
                }
                break;
            default:
                workUnitStore;
        }
    }
}
function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
    const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: false,
        configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
}
function trackDynamicDataInDynamicRender(workUnitStore) {
    switch(workUnitStore.type){
        case 'cache':
        case 'unstable-cache':
            // Inside cache scopes, marking a scope as dynamic has no effect,
            // because the outer cache scope creates a cache boundary. This is
            // subtly different from reading a dynamic data source, which is
            // forbidden inside a cache scope.
            return;
        case 'private-cache':
            // A private cache scope is already dynamic by definition.
            return;
        case 'prerender':
        case 'prerender-runtime':
        case 'prerender-legacy':
        case 'prerender-ppr':
        case 'prerender-client':
            break;
        case 'request':
            if ("TURBOPACK compile-time truthy", 1) {
                workUnitStore.usedDynamic = true;
            }
            break;
        default:
            workUnitStore;
    }
}
function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
    const error = createPrerenderInterruptedError(reason);
    prerenderStore.controller.abort(error);
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
    // It is important that we set this tracking value after aborting. Aborts are executed
    // synchronously except for the case where you abort during render itself. By setting this
    // value late we can use it to determine if any of the aborted tasks are the task that
    // called the sync IO expression in the first place.
    if (dynamicTracking) {
        if (dynamicTracking.syncDynamicErrorWithStack === null) {
            dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
        }
    }
}
function trackSynchronousPlatformIOAccessInDev(requestStore) {
    // We don't actually have a controller to abort but we do the semantic equivalent by
    // advancing the request store out of prerender mode
    requestStore.prerenderPhase = false;
}
function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
    const prerenderSignal = prerenderStore.controller.signal;
    if (prerenderSignal.aborted === false) {
        // TODO it would be better to move this aborted check into the callsite so we can avoid making
        // the error object when it isn't relevant to the aborting of the prerender however
        // since we need the throw semantics regardless of whether we abort it is easier to land
        // this way. See how this was handled with `abortOnSynchronousPlatformIOAccess` for a closer
        // to ideal implementation
        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
        // It is important that we set this tracking value after aborting. Aborts are executed
        // synchronously except for the case where you abort during render itself. By setting this
        // value late we can use it to determine if any of the aborted tasks are the task that
        // called the sync IO expression in the first place.
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
            if (dynamicTracking.syncDynamicErrorWithStack === null) {
                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
            }
        }
    }
    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
}
function warnOnSyncDynamicError(dynamicTracking) {
    if (dynamicTracking.syncDynamicErrorWithStack) {
        // the server did something sync dynamic, likely
        // leading to an early termination of the prerender.
        console.error(dynamicTracking.syncDynamicErrorWithStack);
    }
}
const trackSynchronousRequestDataAccessInDev = trackSynchronousPlatformIOAccessInDev;
function Postpone({ reason, route }) {
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    const dynamicTracking = prerenderStore && prerenderStore.type === 'prerender-ppr' ? prerenderStore.dynamicTracking : null;
    postponeWithTracking(route, reason, dynamicTracking);
}
function postponeWithTracking(route, expression, dynamicTracking) {
    assertPostpone();
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
    _react.default.unstable_postpone(createPostponeReason(route, expression));
}
function createPostponeReason(route, expression) {
    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
}
function isDynamicPostpone(err) {
    if (typeof err === 'object' && err !== null && typeof err.message === 'string') {
        return isDynamicPostponeReason(err.message);
    }
    return false;
}
function isDynamicPostponeReason(reason) {
    return reason.includes('needs to bail out of prerendering at this point because it used') && reason.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error');
}
if (isDynamicPostponeReason(createPostponeReason('%%%', '^^^')) === false) {
    throw Object.defineProperty(new Error('Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: false,
        configurable: true
    });
}
const NEXT_PRERENDER_INTERRUPTED = 'NEXT_PRERENDER_INTERRUPTED';
function createPrerenderInterruptedError(message) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = NEXT_PRERENDER_INTERRUPTED;
    return error;
}
function isPrerenderInterruptedError(error) {
    return typeof error === 'object' && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && 'name' in error && 'message' in error && error instanceof Error;
}
function accessedDynamicData(dynamicAccesses) {
    return dynamicAccesses.length > 0;
}
function consumeDynamicAccess(serverDynamic, clientDynamic) {
    // We mutate because we only call this once we are no longer writing
    // to the dynamicTrackingState and it's more efficient than creating a new
    // array.
    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
    return serverDynamic.dynamicAccesses;
}
function formatDynamicAPIAccesses(dynamicAccesses) {
    return dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
        stack = stack.split('\n') // Remove the "Error: " prefix from the first line of the stack trace as
        // well as the first 4 lines of the stack trace which is the distance
        // from the user code and the `new Error().stack` call.
        .slice(4).filter((line)=>{
            // Exclude Next.js internals from the stack trace.
            if (line.includes('node_modules/next/')) {
                return false;
            }
            // Exclude anonymous functions from the stack trace.
            if (line.includes(' (<anonymous>)')) {
                return false;
            }
            // Exclude Node.js internals from the stack trace.
            if (line.includes(' (node:')) {
                return false;
            }
            return true;
        }).join('\n');
        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
    });
}
function assertPostpone() {
    if (!hasPostpone) {
        throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
            value: "E224",
            enumerable: false,
            configurable: true
        });
    }
}
function createRenderInBrowserAbortSignal() {
    const controller = new AbortController();
    controller.abort(Object.defineProperty(new _bailouttocsr.BailoutToCSRError('Render in Browser'), "__NEXT_ERROR_CODE", {
        value: "E721",
        enumerable: false,
        configurable: true
    }));
    return controller.signal;
}
function createHangingInputAbortSignal(workUnitStore) {
    switch(workUnitStore.type){
        case 'prerender':
        case 'prerender-runtime':
            const controller = new AbortController();
            if (workUnitStore.cacheSignal) {
                // If we have a cacheSignal it means we're in a prospective render. If
                // the input we're waiting on is coming from another cache, we do want
                // to wait for it so that we can resolve this cache entry too.
                workUnitStore.cacheSignal.inputReady().then(()=>{
                    controller.abort();
                });
            } else {
                // Otherwise we're in the final render and we should already have all
                // our caches filled.
                // If the prerender uses stages, we have wait until the runtime stage,
                // at which point all runtime inputs will be resolved.
                // (otherwise, a runtime prerender might consider `cookies()` hanging
                //  even though they'd resolve in the next task.)
                //
                // We might still be waiting on some microtasks so we
                // wait one tick before giving up. When we give up, we still want to
                // render the content of this cache as deeply as we can so that we can
                // suspend as deeply as possible in the tree or not at all if we don't
                // end up waiting for the input.
                const runtimeStagePromise = (0, _workunitasyncstorageexternal.getRuntimeStagePromise)(workUnitStore);
                if (runtimeStagePromise) {
                    runtimeStagePromise.then(()=>(0, _scheduler.scheduleOnNextTick)(()=>controller.abort()));
                } else {
                    (0, _scheduler.scheduleOnNextTick)(()=>controller.abort());
                }
            }
            return controller.signal;
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
            return undefined;
        default:
            workUnitStore;
    }
}
function annotateDynamicAccess(expression, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function useDynamicRouteParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore && workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-client':
            case 'prerender':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        // We are in a prerender with cacheComponents semantics. We are going to
                        // hang here and never resolve. This will cause the currently
                        // rendering component to effectively be a dynamic hole.
                        _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
                    }
                    break;
                }
            case 'prerender-ppr':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        return postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
                    }
                    break;
                }
            case 'prerender-runtime':
                throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called during a runtime prerender. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E771",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
                throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E745",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-legacy':
            case 'request':
            case 'unstable-cache':
                break;
            default:
                workUnitStore;
        }
    }
}
const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
// Common implicit body tags that React will treat as body when placed directly in html
const bodyAndImplicitTags = 'body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6';
// Detects when RootLayoutBoundary (our framework marker component) appears
// after Suspense in the component stack, indicating the root layout is wrapped
// within a Suspense boundary. Ensures no body/html/implicit-body components are in between.
//
// Example matches:
//   at Suspense (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
//
// Or with other components in between (but not body/html/implicit-body):
//   at Suspense (<anonymous>)
//   at SomeComponent (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
const hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex = new RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:${bodyAndImplicitTags}) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${_boundaryconstants.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`);
const hasMetadataRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
const hasViewportRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
const hasOutletRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
function trackAllowedDynamicAccess(workStore, componentStack, dynamicValidation, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        dynamicValidation.hasDynamicMetadata = true;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        dynamicValidation.hasDynamicViewport = true;
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
        // This task was the task that called the sync error.
        dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
        return;
    } else {
        const message = `Route "${workStore.route}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`;
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
}
/**
 * In dev mode, we prefer using the owner stack, otherwise the provided
 * component stack is used.
 */ function createErrorWithComponentOrOwnerStack(message, componentStack) {
    const ownerStack = ("TURBOPACK compile-time value", "development") !== 'production' && _react.default.captureOwnerStack ? _react.default.captureOwnerStack() : null;
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.stack = error.name + ': ' + message + (ownerStack ?? componentStack);
    return error;
}
var PreludeState = /*#__PURE__*/ function(PreludeState) {
    PreludeState[PreludeState["Full"] = 0] = "Full";
    PreludeState[PreludeState["Empty"] = 1] = "Empty";
    PreludeState[PreludeState["Errored"] = 2] = "Errored";
    return PreludeState;
}({});
function logDisallowedDynamicError(workStore, error) {
    console.error(error);
    if (!workStore.dev) {
        if (workStore.hasReadableErrorStacks) {
            console.error(`To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.`);
        } else {
            console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`);
        }
    }
}
function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic) {
    if (prelude !== 0) {
        if (dynamicValidation.hasSuspenseAboveBody) {
            // This route has opted into allowing fully dynamic rendering
            // by including a Suspense boundary above the body. In this case
            // a lack of a shell is not considered disallowed so we simply return
            return;
        }
        if (serverDynamic.syncDynamicErrorWithStack) {
            // There is no shell and the server did something sync dynamic likely
            // leading to an early termination of the prerender before the shell
            // could be completed. We terminate the build/validating render.
            logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        // We didn't have any sync bailouts but there may be user code which
        // blocked the root. We would have captured these during the prerender
        // and can log them here and then terminate the build/validating render
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            for(let i = 0; i < dynamicErrors.length; i++){
                logDisallowedDynamicError(workStore, dynamicErrors[i]);
            }
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        // If we got this far then the only other thing that could be blocking
        // the root is dynamic Viewport. If this is dynamic then
        // you need to opt into that by adding a Suspense boundary above the body
        // to indicate your are ok with fully dynamic rendering.
        if (dynamicValidation.hasDynamicViewport) {
            console.error(`Route "${workStore.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        if (prelude === 1) {
            // If we ever get this far then we messed up the tracking of invalid dynamic.
            // We still adhere to the constraint that you must produce a shell but invite the
            // user to report this as a bug in Next.js.
            console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
    } else {
        if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
            console.error(`Route "${workStore.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
    }
}
function delayUntilRuntimeStage(prerenderStore, result) {
    if (prerenderStore.runtimeStagePromise) {
        return prerenderStore.runtimeStagePromise.then(()=>result);
    }
    return result;
} //# sourceMappingURL=dynamic-rendering.js.map
}),
"[project]/node_modules/next/dist/server/request/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isRequestAPICallableInsideAfter: null,
    throwForSearchParamsAccessInUseCache: null,
    throwWithStaticGenerationBailoutError: null,
    throwWithStaticGenerationBailoutErrorWithDynamicError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isRequestAPICallableInsideAfter: function() {
        return isRequestAPICallableInsideAfter;
    },
    throwForSearchParamsAccessInUseCache: function() {
        return throwForSearchParamsAccessInUseCache;
    },
    throwWithStaticGenerationBailoutError: function() {
        return throwWithStaticGenerationBailoutError;
    },
    throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
        return throwWithStaticGenerationBailoutErrorWithDynamicError;
    }
});
const _staticgenerationbailout = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _aftertaskasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)");
function throwWithStaticGenerationBailoutError(route, expression) {
    throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E576",
        enumerable: false,
        configurable: true
    });
}
function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
    throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E543",
        enumerable: false,
        configurable: true
    });
}
function throwForSearchParamsAccessInUseCache(workStore, constructorOpt) {
    const error = Object.defineProperty(new Error(`Route ${workStore.route} used "searchParams" inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await "searchParams" outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
        value: "E779",
        enumerable: false,
        configurable: true
    });
    Error.captureStackTrace(error, constructorOpt);
    workStore.invalidDynamicUsageError ??= error;
    throw error;
}
function isRequestAPICallableInsideAfter() {
    const afterTaskStore = _aftertaskasyncstorageexternal.afterTaskAsyncStorage.getStore();
    return (afterTaskStore == null ? void 0 : afterTaskStore.rootTaskSpawnPhase) === 'action';
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/next/dist/server/request/connection.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "connection", {
    enumerable: true,
    get: function() {
        return connection;
    }
});
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/server/request/utils.js [app-rsc] (ecmascript)");
function connection() {
    const callingExpression = 'connection';
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0, _utils.isRequestAPICallableInsideAfter)()) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "after(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but "after(...)" executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E186",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic, we override all other logic and always just
            // return a resolving promise without tracking.
            return Promise.resolve(undefined);
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E562",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'cache':
                    {
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual request, but caches must be able to be produced before a request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E752",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, connection);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'private-cache':
                    {
                        // It might not be intuitive to throw for private caches as well, but
                        // we don't consider runtime prefetches as "actual requests" (in the
                        // navigation sense), despite allowing them to read cookies.
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "use cache: private". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual navigation request, but caches must be able to be produced before a navigation request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E753",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, connection);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'unstable-cache':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside a function cached with "unstable_cache(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                        value: "E1",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender':
                case 'prerender-client':
                case 'prerender-runtime':
                    // We return a promise that never resolves to allow the prerender to
                    // stall at this point.
                    return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, '`connection()`');
                case 'prerender-ppr':
                    // We use React's postpone API to interrupt rendering here to create a
                    // dynamic hole
                    return (0, _dynamicrendering.postponeWithTracking)(workStore.route, 'connection', workUnitStore.dynamicTracking);
                case 'prerender-legacy':
                    // We throw an error here to interrupt prerendering to mark the route
                    // as dynamic
                    return (0, _dynamicrendering.throwToInterruptStaticGeneration)('connection', workStore, workUnitStore);
                case 'request':
                    (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workUnitStore);
                    if ("TURBOPACK compile-time truthy", 1) {
                        // Semantically we only need the dev tracking when running in `next dev`
                        // but since you would never use next dev with production NODE_ENV we use this
                        // as a proxy so we can statically exclude this code from production builds.
                        return (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(undefined);
                    } else //TURBOPACK unreachable
                    ;
                default:
                    workUnitStore;
            }
        }
    }
    // If we end up here, there was no work store or work unit store present.
    (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(callingExpression);
} //# sourceMappingURL=connection.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This regex will have fast negatives meaning valid identifiers may not pass
// this test. However this is only used during static generation to provide hints
// about why a page bailed out of some or all prerendering and we can use bracket notation
// for example while `ಠ_ಠ` is a valid identifier it's ok to print `searchParams['ಠ_ಠ']`
// even if this would have been fine too `searchParams.ಠ_ಠ`
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    describeHasCheckingStringProperty: null,
    describeStringPropertyAccess: null,
    wellKnownProperties: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    describeHasCheckingStringProperty: function() {
        return describeHasCheckingStringProperty;
    },
    describeStringPropertyAccess: function() {
        return describeStringPropertyAccess;
    },
    wellKnownProperties: function() {
        return wellKnownProperties;
    }
});
const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
function describeStringPropertyAccess(target, prop) {
    if (isDefinitelyAValidIdentifier.test(prop)) {
        return "`" + target + "." + prop + "`";
    }
    return "`" + target + "[" + JSON.stringify(prop) + "]`";
}
function describeHasCheckingStringProperty(target, prop) {
    const stringifiedProp = JSON.stringify(prop);
    return "`Reflect.has(" + target + ", " + stringifiedProp + ")`, `" + stringifiedProp + " in " + target + "`, or similar";
}
const wellKnownProperties = new Set([
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    'toLocaleString',
    // Promise prototype
    // fallthrough
    'then',
    'catch',
    'finally',
    // React Promise extension
    // fallthrough
    'status',
    // React introspection
    'displayName',
    '_debugInfo',
    // Common tested properties
    // fallthrough
    'toJSON',
    '$$typeof',
    '__esModule'
]); //# sourceMappingURL=reflect-utils.js.map
}),
"[project]/node_modules/next/dist/lib/picocolors.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// ISC License
// Copyright (c) 2021 Alexey Raspopov, Kostiantyn Denysov, Anton Verinov
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
// https://github.com/alexeyraspopov/picocolors/blob/b6261487e7b81aaab2440e397a356732cad9e342/picocolors.js#L1
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    bgBlack: null,
    bgBlue: null,
    bgCyan: null,
    bgGreen: null,
    bgMagenta: null,
    bgRed: null,
    bgWhite: null,
    bgYellow: null,
    black: null,
    blue: null,
    bold: null,
    cyan: null,
    dim: null,
    gray: null,
    green: null,
    hidden: null,
    inverse: null,
    italic: null,
    magenta: null,
    purple: null,
    red: null,
    reset: null,
    strikethrough: null,
    underline: null,
    white: null,
    yellow: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    bgBlack: function() {
        return bgBlack;
    },
    bgBlue: function() {
        return bgBlue;
    },
    bgCyan: function() {
        return bgCyan;
    },
    bgGreen: function() {
        return bgGreen;
    },
    bgMagenta: function() {
        return bgMagenta;
    },
    bgRed: function() {
        return bgRed;
    },
    bgWhite: function() {
        return bgWhite;
    },
    bgYellow: function() {
        return bgYellow;
    },
    black: function() {
        return black;
    },
    blue: function() {
        return blue;
    },
    bold: function() {
        return bold;
    },
    cyan: function() {
        return cyan;
    },
    dim: function() {
        return dim;
    },
    gray: function() {
        return gray;
    },
    green: function() {
        return green;
    },
    hidden: function() {
        return hidden;
    },
    inverse: function() {
        return inverse;
    },
    italic: function() {
        return italic;
    },
    magenta: function() {
        return magenta;
    },
    purple: function() {
        return purple;
    },
    red: function() {
        return red;
    },
    reset: function() {
        return reset;
    },
    strikethrough: function() {
        return strikethrough;
    },
    underline: function() {
        return underline;
    },
    white: function() {
        return white;
    },
    yellow: function() {
        return yellow;
    }
});
var _globalThis;
const { env, stdout } = ((_globalThis = globalThis) == null ? void 0 : _globalThis.process) ?? {};
const enabled = env && !env.NO_COLOR && (env.FORCE_COLOR || (stdout == null ? void 0 : stdout.isTTY) && !env.CI && env.TERM !== 'dumb');
const replaceClose = (str, close, replace, index)=>{
    const start = str.substring(0, index) + replace;
    const end = str.substring(index + close.length);
    const nextIndex = end.indexOf(close);
    return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
};
const formatter = (open, close, replace = open)=>{
    if (!enabled) return String;
    return (input)=>{
        const string = '' + input;
        const index = string.indexOf(close, open.length);
        return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
};
const reset = enabled ? (s)=>`\x1b[0m${s}\x1b[0m` : String;
const bold = formatter('\x1b[1m', '\x1b[22m', '\x1b[22m\x1b[1m');
const dim = formatter('\x1b[2m', '\x1b[22m', '\x1b[22m\x1b[2m');
const italic = formatter('\x1b[3m', '\x1b[23m');
const underline = formatter('\x1b[4m', '\x1b[24m');
const inverse = formatter('\x1b[7m', '\x1b[27m');
const hidden = formatter('\x1b[8m', '\x1b[28m');
const strikethrough = formatter('\x1b[9m', '\x1b[29m');
const black = formatter('\x1b[30m', '\x1b[39m');
const red = formatter('\x1b[31m', '\x1b[39m');
const green = formatter('\x1b[32m', '\x1b[39m');
const yellow = formatter('\x1b[33m', '\x1b[39m');
const blue = formatter('\x1b[34m', '\x1b[39m');
const magenta = formatter('\x1b[35m', '\x1b[39m');
const purple = formatter('\x1b[38;2;173;127;168m', '\x1b[39m');
const cyan = formatter('\x1b[36m', '\x1b[39m');
const white = formatter('\x1b[37m', '\x1b[39m');
const gray = formatter('\x1b[90m', '\x1b[39m');
const bgBlack = formatter('\x1b[40m', '\x1b[49m');
const bgRed = formatter('\x1b[41m', '\x1b[49m');
const bgGreen = formatter('\x1b[42m', '\x1b[49m');
const bgYellow = formatter('\x1b[43m', '\x1b[49m');
const bgBlue = formatter('\x1b[44m', '\x1b[49m');
const bgMagenta = formatter('\x1b[45m', '\x1b[49m');
const bgCyan = formatter('\x1b[46m', '\x1b[49m');
const bgWhite = formatter('\x1b[47m', '\x1b[49m'); //# sourceMappingURL=picocolors.js.map
}),
"[project]/node_modules/next/dist/server/lib/lru-cache.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Node in the doubly-linked list used for LRU tracking.
 * Each node represents a cache entry with bidirectional pointers.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LRUCache", {
    enumerable: true,
    get: function() {
        return LRUCache;
    }
});
class LRUNode {
    constructor(key, data, size){
        this.prev = null;
        this.next = null;
        this.key = key;
        this.data = data;
        this.size = size;
    }
}
/**
 * Sentinel node used for head/tail boundaries.
 * These nodes don't contain actual cache data but simplify list operations.
 */ class SentinelNode {
    constructor(){
        this.prev = null;
        this.next = null;
    }
}
class LRUCache {
    constructor(maxSize, calculateSize){
        this.cache = new Map();
        this.totalSize = 0;
        this.maxSize = maxSize;
        this.calculateSize = calculateSize;
        // Create sentinel nodes to simplify doubly-linked list operations
        // HEAD <-> TAIL (empty list)
        this.head = new SentinelNode();
        this.tail = new SentinelNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    /**
   * Adds a node immediately after the head (marks as most recently used).
   * Used when inserting new items or when an item is accessed.
   * PRECONDITION: node must be disconnected (prev/next should be null)
   */ addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        // head.next is always non-null (points to tail or another node)
        this.head.next.prev = node;
        this.head.next = node;
    }
    /**
   * Removes a node from its current position in the doubly-linked list.
   * Updates the prev/next pointers of adjacent nodes to maintain list integrity.
   * PRECONDITION: node must be connected (prev/next are non-null)
   */ removeNode(node) {
        // Connected nodes always have non-null prev/next
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    /**
   * Moves an existing node to the head position (marks as most recently used).
   * This is the core LRU operation - accessed items become most recent.
   */ moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }
    /**
   * Removes and returns the least recently used node (the one before tail).
   * This is called during eviction when the cache exceeds capacity.
   * PRECONDITION: cache is not empty (ensured by caller)
   */ removeTail() {
        const lastNode = this.tail.prev;
        // tail.prev is always non-null and always LRUNode when cache is not empty
        this.removeNode(lastNode);
        return lastNode;
    }
    /**
   * Sets a key-value pair in the cache.
   * If the key exists, updates the value and moves to head.
   * If new, adds at head and evicts from tail if necessary.
   *
   * Time Complexity:
   * - O(1) for uniform item sizes
   * - O(k) where k is the number of items evicted (can be O(N) for variable sizes)
   */ set(key, value) {
        const size = (this.calculateSize == null ? void 0 : this.calculateSize.call(this, value)) ?? 1;
        if (size > this.maxSize) {
            console.warn('Single item size exceeds maxSize');
            return;
        }
        const existing = this.cache.get(key);
        if (existing) {
            // Update existing node: adjust size and move to head (most recent)
            existing.data = value;
            this.totalSize = this.totalSize - existing.size + size;
            existing.size = size;
            this.moveToHead(existing);
        } else {
            // Add new node at head (most recent position)
            const newNode = new LRUNode(key, value, size);
            this.cache.set(key, newNode);
            this.addToHead(newNode);
            this.totalSize += size;
        }
        // Evict least recently used items until under capacity
        while(this.totalSize > this.maxSize && this.cache.size > 0){
            const tail = this.removeTail();
            this.cache.delete(tail.key);
            this.totalSize -= tail.size;
        }
    }
    /**
   * Checks if a key exists in the cache.
   * This is a pure query operation - does NOT update LRU order.
   *
   * Time Complexity: O(1)
   */ has(key) {
        return this.cache.has(key);
    }
    /**
   * Retrieves a value by key and marks it as most recently used.
   * Moving to head maintains the LRU property for future evictions.
   *
   * Time Complexity: O(1)
   */ get(key) {
        const node = this.cache.get(key);
        if (!node) return undefined;
        // Mark as most recently used by moving to head
        this.moveToHead(node);
        return node.data;
    }
    /**
   * Returns an iterator over the cache entries. The order is outputted in the
   * order of most recently used to least recently used.
   */ *[Symbol.iterator]() {
        let current = this.head.next;
        while(current && current !== this.tail){
            // Between head and tail, current is always LRUNode
            const node = current;
            yield [
                node.key,
                node.data
            ];
            current = current.next;
        }
    }
    /**
   * Removes a specific key from the cache.
   * Updates both the hash map and doubly-linked list.
   *
   * Time Complexity: O(1)
   */ remove(key) {
        const node = this.cache.get(key);
        if (!node) return;
        this.removeNode(node);
        this.cache.delete(key);
        this.totalSize -= node.size;
    }
    /**
   * Returns the number of items in the cache.
   */ get size() {
        return this.cache.size;
    }
    /**
   * Returns the current total size of all cached items.
   * This uses the custom size calculation if provided.
   */ get currentSize() {
        return this.totalSize;
    }
} //# sourceMappingURL=lru-cache.js.map
}),
"[project]/node_modules/next/dist/build/output/log.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    bootstrap: null,
    error: null,
    event: null,
    info: null,
    prefixes: null,
    ready: null,
    trace: null,
    wait: null,
    warn: null,
    warnOnce: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    bootstrap: function() {
        return bootstrap;
    },
    error: function() {
        return error;
    },
    event: function() {
        return event;
    },
    info: function() {
        return info;
    },
    prefixes: function() {
        return prefixes;
    },
    ready: function() {
        return ready;
    },
    trace: function() {
        return trace;
    },
    wait: function() {
        return wait;
    },
    warn: function() {
        return warn;
    },
    warnOnce: function() {
        return warnOnce;
    }
});
const _picocolors = __turbopack_context__.r("[project]/node_modules/next/dist/lib/picocolors.js [app-rsc] (ecmascript)");
const _lrucache = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/lru-cache.js [app-rsc] (ecmascript)");
const prefixes = {
    wait: (0, _picocolors.white)((0, _picocolors.bold)('○')),
    error: (0, _picocolors.red)((0, _picocolors.bold)('⨯')),
    warn: (0, _picocolors.yellow)((0, _picocolors.bold)('⚠')),
    ready: '▲',
    info: (0, _picocolors.white)((0, _picocolors.bold)(' ')),
    event: (0, _picocolors.green)((0, _picocolors.bold)('✓')),
    trace: (0, _picocolors.magenta)((0, _picocolors.bold)('»'))
};
const LOGGING_METHOD = {
    log: 'log',
    warn: 'warn',
    error: 'error'
};
function prefixedLog(prefixType, ...message) {
    if ((message[0] === '' || message[0] === undefined) && message.length === 1) {
        message.shift();
    }
    const consoleMethod = prefixType in LOGGING_METHOD ? LOGGING_METHOD[prefixType] : 'log';
    const prefix = prefixes[prefixType];
    // If there's no message, don't print the prefix but a new line
    if (message.length === 0) {
        console[consoleMethod]('');
    } else {
        // Ensure if there's ANSI escape codes it's concatenated into one string.
        // Chrome DevTool can only handle color if it's in one string.
        if (message.length === 1 && typeof message[0] === 'string') {
            console[consoleMethod](' ' + prefix + ' ' + message[0]);
        } else {
            console[consoleMethod](' ' + prefix, ...message);
        }
    }
}
function bootstrap(...message) {
    // logging format: ' <prefix> <message>'
    // e.g. ' ✓ Compiled successfully'
    // Add spaces to align with the indent of other logs
    console.log('   ' + message.join(' '));
}
function wait(...message) {
    prefixedLog('wait', ...message);
}
function error(...message) {
    prefixedLog('error', ...message);
}
function warn(...message) {
    prefixedLog('warn', ...message);
}
function ready(...message) {
    prefixedLog('ready', ...message);
}
function info(...message) {
    prefixedLog('info', ...message);
}
function event(...message) {
    prefixedLog('event', ...message);
}
function trace(...message) {
    prefixedLog('trace', ...message);
}
const warnOnceCache = new _lrucache.LRUCache(10000, (value)=>value.length);
function warnOnce(...message) {
    const key = message.join(' ');
    if (!warnOnceCache.has(key)) {
        warnOnceCache.set(key, key);
        warn(...message);
    }
} //# sourceMappingURL=log.js.map
}),
"[project]/node_modules/next/dist/server/request/root-params.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getRootParam: null,
    unstable_rootParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getRootParam: function() {
        return getRootParam;
    },
    unstable_rootParams: function() {
        return unstable_rootParams;
    }
});
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-rsc] (ecmascript)");
const _actionasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)");
const _log = __turbopack_context__.r("[project]/node_modules/next/dist/build/output/log.js [app-rsc] (ecmascript)");
const CachedParams = new WeakMap();
async function unstable_rootParams() {
    (0, _log.warnOnce)('`unstable_rootParams()` is deprecated and will be removed in an upcoming major release. Import specific root params from `next/root-params` instead.');
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!workStore) {
        throw Object.defineProperty(new _invarianterror.InvariantError('Missing workStore in unstable_rootParams'), "__NEXT_ERROR_CODE", {
            value: "E615",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workUnitStore) {
        throw Object.defineProperty(new Error(`Route ${workStore.route} used \`unstable_rootParams()\` in Pages Router. This API is only available within App Router.`), "__NEXT_ERROR_CODE", {
            value: "E641",
            enumerable: false,
            configurable: true
        });
    }
    switch(workUnitStore.type){
        case 'cache':
        case 'unstable-cache':
            {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used \`unstable_rootParams()\` inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
                    value: "E642",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
            return createPrerenderRootParams(workUnitStore.rootParams, workStore, workUnitStore);
        case 'private-cache':
        case 'prerender-runtime':
        case 'request':
            return Promise.resolve(workUnitStore.rootParams);
        default:
            return workUnitStore;
    }
}
function createPrerenderRootParams(underlyingParams, workStore, prerenderStore) {
    switch(prerenderStore.type){
        case 'prerender-client':
            {
                const exportName = '`unstable_rootParams`';
                throw Object.defineProperty(new _invarianterror.InvariantError(`${exportName} must not be used within a client component. Next.js should be preventing ${exportName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E693",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
            {
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if (fallbackParams) {
                    for(const key in underlyingParams){
                        if (fallbackParams.has(key)) {
                            const cachedParams = CachedParams.get(underlyingParams);
                            if (cachedParams) {
                                return cachedParams;
                            }
                            const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, '`unstable_rootParams`');
                            CachedParams.set(underlyingParams, promise);
                            return promise;
                        }
                    }
                }
                break;
            }
        case 'prerender-ppr':
            {
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if (fallbackParams) {
                    for(const key in underlyingParams){
                        if (fallbackParams.has(key)) {
                            // We have fallback params at this level so we need to make an erroring
                            // params object which will postpone if you access the fallback params
                            return makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore);
                        }
                    }
                }
                break;
            }
        case 'prerender-legacy':
            break;
        default:
            prerenderStore;
    }
    // We don't have any fallback params so we have an entirely static safe params object
    return Promise.resolve(underlyingParams);
}
function makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const augmentedUnderlying = {
        ...underlyingParams
    };
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = Promise.resolve(augmentedUnderlying);
    CachedParams.set(underlyingParams, promise);
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            if (fallbackParams.has(prop)) {
                Object.defineProperty(augmentedUnderlying, prop, {
                    get () {
                        const expression = (0, _reflectutils.describeStringPropertyAccess)('unstable_rootParams', prop);
                        // In most dynamic APIs we also throw if `dynamic = "error"` however
                        // for params is only dynamic when we're generating a fallback shell
                        // and even when `dynamic = "error"` we still support generating dynamic
                        // fallback shells
                        // TODO remove this comment when cacheComponents is the default since there
                        // will be no `dynamic = "error"`
                        if (prerenderStore.type === 'prerender-ppr') {
                            // PPR Prerender (no cacheComponents)
                            (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
                        } else {
                            // Legacy Prerender
                            (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
                        }
                    },
                    enumerable: true
                });
            } else {
                ;
                promise[prop] = underlyingParams[prop];
            }
        }
    });
    return promise;
}
function getRootParam(paramName) {
    const apiName = `\`import('next/root-params').${paramName}()\``;
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!workStore) {
        throw Object.defineProperty(new _invarianterror.InvariantError(`Missing workStore in ${apiName}`), "__NEXT_ERROR_CODE", {
            value: "E764",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workUnitStore) {
        throw Object.defineProperty(new Error(`Route ${workStore.route} used ${apiName} outside of a Server Component. This is not allowed.`), "__NEXT_ERROR_CODE", {
            value: "E774",
            enumerable: false,
            configurable: true
        });
    }
    const actionStore = _actionasyncstorageexternal.actionAsyncStorage.getStore();
    if (actionStore) {
        if (actionStore.isAppRoute) {
            // TODO(root-params): add support for route handlers
            throw Object.defineProperty(new Error(`Route ${workStore.route} used ${apiName} inside a Route Handler. Support for this API in Route Handlers is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
                value: "E765",
                enumerable: false,
                configurable: true
            });
        }
        if (actionStore.isAction && workUnitStore.phase === 'action') {
            // Actions are not fundamentally tied to a route (even if they're always submitted from some page),
            // so root params would be inconsistent if an action is called from multiple roots.
            // Make sure we check if the phase is "action" - we should not error in the rerender
            // after an action revalidates or updates cookies (which will still have `actionStore.isAction === true`)
            throw Object.defineProperty(new Error(`${apiName} was used inside a Server Action. This is not supported. Functions from 'next/root-params' can only be called in the context of a route.`), "__NEXT_ERROR_CODE", {
                value: "E766",
                enumerable: false,
                configurable: true
            });
        }
    }
    switch(workUnitStore.type){
        case 'unstable-cache':
        case 'cache':
            {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used ${apiName} inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
                    value: "E760",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
            {
                return createPrerenderRootParamPromise(paramName, workStore, workUnitStore, apiName);
            }
        case 'private-cache':
        case 'prerender-runtime':
        case 'request':
            {
                break;
            }
        default:
            {
                workUnitStore;
            }
    }
    return Promise.resolve(workUnitStore.rootParams[paramName]);
}
function createPrerenderRootParamPromise(paramName, workStore, prerenderStore, apiName) {
    switch(prerenderStore.type){
        case 'prerender-client':
            {
                throw Object.defineProperty(new _invarianterror.InvariantError(`${apiName} must not be used within a client component. Next.js should be preventing ${apiName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E693",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
        case 'prerender-legacy':
        case 'prerender-ppr':
        default:
    }
    const underlyingParams = prerenderStore.rootParams;
    switch(prerenderStore.type){
        case 'prerender':
            {
                // We are in a dynamicIO prerender.
                // The param is a fallback, so it should be treated as dynamic.
                if (prerenderStore.fallbackRouteParams && prerenderStore.fallbackRouteParams.has(paramName)) {
                    return (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, apiName);
                }
                break;
            }
        case 'prerender-ppr':
            {
                // We aren't in a dynamicIO prerender, but the param is a fallback,
                // so we need to make an erroring params object which will postpone/error if you access it
                if (prerenderStore.fallbackRouteParams && prerenderStore.fallbackRouteParams.has(paramName)) {
                    return makeErroringRootParamPromise(paramName, workStore, prerenderStore, apiName);
                }
                break;
            }
        case 'prerender-legacy':
            {
                break;
            }
        default:
            {
                prerenderStore;
            }
    }
    // If the param is not a fallback param, we just return the statically available value.
    return Promise.resolve(underlyingParams[paramName]);
}
/** Deliberately async -- we want to create a rejected promise, not error synchronously. */ async function makeErroringRootParamPromise(paramName, workStore, prerenderStore, apiName) {
    const expression = (0, _reflectutils.describeStringPropertyAccess)(apiName, paramName);
    // In most dynamic APIs, we also throw if `dynamic = "error"`.
    // However, root params are only dynamic when we're generating a fallback shell,
    // and even with `dynamic = "error"` we still support generating dynamic fallback shells.
    // TODO: remove this comment when dynamicIO is the default since there will be no `dynamic = "error"`
    switch(prerenderStore.type){
        case 'prerender-ppr':
            {
                return (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
            }
        case 'prerender-legacy':
            {
                return (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
            }
        default:
            {
                prerenderStore;
            }
    }
} //# sourceMappingURL=root-params.js.map
}),
"[project]/node_modules/next/server.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const serverExports = {
    NextRequest: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/request.js [app-rsc] (ecmascript)").NextRequest,
    NextResponse: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/response.js [app-rsc] (ecmascript)").NextResponse,
    ImageResponse: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/image-response.js [app-rsc] (ecmascript)").ImageResponse,
    userAgentFromString: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/user-agent.js [app-rsc] (ecmascript)").userAgentFromString,
    userAgent: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/user-agent.js [app-rsc] (ecmascript)").userAgent,
    URLPattern: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/url-pattern.js [app-rsc] (ecmascript)").URLPattern,
    after: __turbopack_context__.r("[project]/node_modules/next/dist/server/after/index.js [app-rsc] (ecmascript)").after,
    connection: __turbopack_context__.r("[project]/node_modules/next/dist/server/request/connection.js [app-rsc] (ecmascript)").connection,
    unstable_rootParams: __turbopack_context__.r("[project]/node_modules/next/dist/server/request/root-params.js [app-rsc] (ecmascript)").unstable_rootParams
};
// https://nodejs.org/api/esm.html#commonjs-namespaces
// When importing CommonJS modules, the module.exports object is provided as the default export
module.exports = serverExports;
// make import { xxx } from 'next/server' work
exports.NextRequest = serverExports.NextRequest;
exports.NextResponse = serverExports.NextResponse;
exports.ImageResponse = serverExports.ImageResponse;
exports.userAgentFromString = serverExports.userAgentFromString;
exports.userAgent = serverExports.userAgent;
exports.URLPattern = serverExports.URLPattern;
exports.after = serverExports.after;
exports.connection = serverExports.connection;
exports.unstable_rootParams = serverExports.unstable_rootParams;
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ConvexAuthNextjsClientProvider",
    ()=>ConvexAuthNextjsClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ConvexAuthNextjsClientProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ConvexAuthNextjsClientProvider() from the server but ConvexAuthNextjsClientProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js <module evaluation>", "ConvexAuthNextjsClientProvider");
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ConvexAuthNextjsClientProvider",
    ()=>ConvexAuthNextjsClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ConvexAuthNextjsClientProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ConvexAuthNextjsClientProvider() from the server but ConvexAuthNextjsClientProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js", "ConvexAuthNextjsClientProvider");
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/node_modules/next/dist/server/web/spec-extension/adapters/request-cookies.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    MutableRequestCookiesAdapter: null,
    ReadonlyRequestCookiesError: null,
    RequestCookiesAdapter: null,
    appendMutableCookies: null,
    areCookiesMutableInCurrentPhase: null,
    createCookiesWithMutableAccessCheck: null,
    getModifiedCookieValues: null,
    responseCookiesToRequestCookies: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    MutableRequestCookiesAdapter: function() {
        return MutableRequestCookiesAdapter;
    },
    ReadonlyRequestCookiesError: function() {
        return ReadonlyRequestCookiesError;
    },
    RequestCookiesAdapter: function() {
        return RequestCookiesAdapter;
    },
    appendMutableCookies: function() {
        return appendMutableCookies;
    },
    areCookiesMutableInCurrentPhase: function() {
        return areCookiesMutableInCurrentPhase;
    },
    createCookiesWithMutableAccessCheck: function() {
        return createCookiesWithMutableAccessCheck;
    },
    getModifiedCookieValues: function() {
        return getModifiedCookieValues;
    },
    responseCookiesToRequestCookies: function() {
        return responseCookiesToRequestCookies;
    }
});
const _cookies = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)");
const _reflect = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super('Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options');
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'clear':
                    case 'delete':
                    case 'set':
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for('next.mutated.cookies');
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new _cookies.ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookies = new _cookies.ResponseCookies(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            // TODO-APP: change method of getting workStore
            const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
            if (workStore) {
                workStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _cookies.ResponseCookies(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        const wrappedCookies = new Proxy(responseCookies, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case 'delete':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case 'set':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.set(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
        return wrappedCookies;
    }
}
function createCookiesWithMutableAccessCheck(requestStore) {
    const wrappedCookies = new Proxy(requestStore.mutableCookies, {
        get (target, prop, receiver) {
            switch(prop){
                case 'delete':
                    return function(...args) {
                        ensureCookiesAreStillMutable(requestStore, 'cookies().delete');
                        target.delete(...args);
                        return wrappedCookies;
                    };
                case 'set':
                    return function(...args) {
                        ensureCookiesAreStillMutable(requestStore, 'cookies().set');
                        target.set(...args);
                        return wrappedCookies;
                    };
                default:
                    return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
        }
    });
    return wrappedCookies;
}
function areCookiesMutableInCurrentPhase(requestStore) {
    return requestStore.phase === 'action';
}
/** Ensure that cookies() starts throwing on mutation
 * if we changed phases and can no longer mutate.
 *
 * This can happen when going:
 *   'render' -> 'after'
 *   'action' -> 'render'
 * */ function ensureCookiesAreStillMutable(requestStore, _callingExpression) {
    if (!areCookiesMutableInCurrentPhase(requestStore)) {
        // TODO: maybe we can give a more precise error message based on callingExpression?
        throw new ReadonlyRequestCookiesError();
    }
}
function responseCookiesToRequestCookies(responseCookies) {
    const requestCookies = new _cookies.RequestCookies(new Headers());
    for (const cookie of responseCookies.getAll()){
        requestCookies.set(cookie);
    }
    return requestCookies;
} //# sourceMappingURL=request-cookies.js.map
}),
"[project]/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDedupedByCallsiteServerErrorLoggerDev", {
    enumerable: true,
    get: function() {
        return createDedupedByCallsiteServerErrorLoggerDev;
    }
});
const _react = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const errorRef = {
    current: null
};
// React.cache is currently only available in canary/experimental React channels.
const cache = typeof _react.cache === 'function' ? _react.cache : (fn)=>fn;
// When Cache Components is enabled, we record these as errors so that they
// are captured by the dev overlay as it's more critical to fix these
// when enabled.
const logErrorOrWarn = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : console.warn;
// We don't want to dedupe across requests.
// The developer might've just attempted to fix the warning so we should warn again if it still happens.
const flushCurrentErrorIfNew = cache((key)=>{
    try {
        logErrorOrWarn(errorRef.current);
    } finally{
        errorRef.current = null;
    }
});
function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
    return function logDedupedError(...args) {
        const message = getMessage(...args);
        if ("TURBOPACK compile-time truthy", 1) {
            var _stack;
            const callStackFrames = (_stack = new Error().stack) == null ? void 0 : _stack.split('\n');
            if (callStackFrames === undefined || callStackFrames.length < 4) {
                logErrorOrWarn(message);
            } else {
                // Error:
                //   logDedupedError
                //   asyncApiBeingAccessedSynchronously
                //   <userland callsite>
                // TODO: This breaks if sourcemaps with ignore lists are enabled.
                const key = callStackFrames[4];
                errorRef.current = message;
                flushCurrentErrorIfNew(key);
            }
        } else //TURBOPACK unreachable
        ;
    };
} //# sourceMappingURL=create-deduped-by-callsite-server-error-logger.js.map
}),
"[project]/node_modules/next/dist/server/request/cookies.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cookies", {
    enumerable: true,
    get: function() {
        return cookies;
    }
});
const _requestcookies = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/request-cookies.js [app-rsc] (ecmascript)");
const _cookies = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _creatededupedbycallsiteservererrorlogger = __turbopack_context__.r("[project]/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/server/request/utils.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _reflect = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
function cookies() {
    const callingExpression = 'cookies';
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0, _utils.isRequestAPICallableInsideAfter)()) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used "cookies" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E88",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // cookies object without tracking
            const underlyingCookies = createEmptyCookies();
            return makeUntrackedExoticCookies(underlyingCookies);
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E549",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'cache':
                    const error = Object.defineProperty(new Error(`Route ${workStore.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                        value: "E398",
                        enumerable: false,
                        configurable: true
                    });
                    Error.captureStackTrace(error, cookies);
                    workStore.invalidDynamicUsageError ??= error;
                    throw error;
                case 'unstable-cache':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                        value: "E157",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender':
                    return makeHangingCookies(workStore, workUnitStore);
                case 'prerender-client':
                    const exportName = '`cookies`';
                    throw Object.defineProperty(new _invarianterror.InvariantError(`${exportName} must not be used within a client component. Next.js should be preventing ${exportName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                        value: "E693",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender-ppr':
                    // We need track dynamic access here eagerly to keep continuity with
                    // how cookies has worked in PPR without cacheComponents.
                    return (0, _dynamicrendering.postponeWithTracking)(workStore.route, callingExpression, workUnitStore.dynamicTracking);
                case 'prerender-legacy':
                    // We track dynamic access here so we don't need to wrap the cookies
                    // in individual property access tracking.
                    return (0, _dynamicrendering.throwToInterruptStaticGeneration)(callingExpression, workStore, workUnitStore);
                case 'prerender-runtime':
                    return (0, _dynamicrendering.delayUntilRuntimeStage)(workUnitStore, makeUntrackedCookies(workUnitStore.cookies));
                case 'private-cache':
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    return makeUntrackedExoticCookies(workUnitStore.cookies);
                case 'request':
                    (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workUnitStore);
                    let underlyingCookies;
                    if ((0, _requestcookies.areCookiesMutableInCurrentPhase)(workUnitStore)) {
                        // We can't conditionally return different types here based on the context.
                        // To avoid confusion, we always return the readonly type here.
                        underlyingCookies = workUnitStore.userspaceMutableCookies;
                    } else {
                        underlyingCookies = workUnitStore.cookies;
                    }
                    if ("TURBOPACK compile-time truthy", 1) {
                        // Semantically we only need the dev tracking when running in `next dev`
                        // but since you would never use next dev with production NODE_ENV we use this
                        // as a proxy so we can statically exclude this code from production builds.
                        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                        ;
                        return makeUntrackedExoticCookiesWithDevWarnings(underlyingCookies, workStore == null ? void 0 : workStore.route);
                    } else //TURBOPACK unreachable
                    ;
                default:
                    workUnitStore;
            }
        }
    }
    // If we end up here, there was no work store or work unit store present.
    (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(callingExpression);
}
function createEmptyCookies() {
    return _requestcookies.RequestCookiesAdapter.seal(new _cookies.RequestCookies(new Headers({})));
}
const CachedCookies = new WeakMap();
function makeHangingCookies(workStore, prerenderStore) {
    const cachedPromise = CachedCookies.get(prerenderStore);
    if (cachedPromise) {
        return cachedPromise;
    }
    const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, '`cookies()`');
    CachedCookies.set(prerenderStore, promise);
    return promise;
}
function makeUntrackedCookies(underlyingCookies) {
    const cachedCookies = CachedCookies.get(underlyingCookies);
    if (cachedCookies) {
        return cachedCookies;
    }
    const promise = Promise.resolve(underlyingCookies);
    CachedCookies.set(underlyingCookies, promise);
    return promise;
}
function makeUntrackedExoticCookies(underlyingCookies) {
    const cachedCookies = CachedCookies.get(underlyingCookies);
    if (cachedCookies) {
        return cachedCookies;
    }
    const promise = Promise.resolve(underlyingCookies);
    CachedCookies.set(underlyingCookies, promise);
    Object.defineProperties(promise, {
        [Symbol.iterator]: {
            value: underlyingCookies[Symbol.iterator] ? underlyingCookies[Symbol.iterator].bind(underlyingCookies) : // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
            // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
            // has extra properties not available on RequestCookie instances.
            polyfilledResponseCookiesIterator.bind(underlyingCookies)
        },
        size: {
            get () {
                return underlyingCookies.size;
            }
        },
        get: {
            value: underlyingCookies.get.bind(underlyingCookies)
        },
        getAll: {
            value: underlyingCookies.getAll.bind(underlyingCookies)
        },
        has: {
            value: underlyingCookies.has.bind(underlyingCookies)
        },
        set: {
            value: underlyingCookies.set.bind(underlyingCookies)
        },
        delete: {
            value: underlyingCookies.delete.bind(underlyingCookies)
        },
        clear: {
            value: typeof underlyingCookies.clear === 'function' ? underlyingCookies.clear.bind(underlyingCookies) : // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
            // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
            // has extra properties not available on RequestCookie instances.
            polyfilledResponseCookiesClear.bind(underlyingCookies, promise)
        },
        toString: {
            value: underlyingCookies.toString.bind(underlyingCookies)
        }
    });
    return promise;
}
function makeUntrackedExoticCookiesWithDevWarnings(underlyingCookies, route) {
    const cachedCookies = CachedCookies.get(underlyingCookies);
    if (cachedCookies) {
        return cachedCookies;
    }
    const promise = (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(underlyingCookies);
    CachedCookies.set(underlyingCookies, promise);
    Object.defineProperties(promise, {
        [Symbol.iterator]: {
            value: function() {
                const expression = '`...cookies()` or similar iteration';
                syncIODev(route, expression);
                return underlyingCookies[Symbol.iterator] ? underlyingCookies[Symbol.iterator].apply(underlyingCookies, arguments) : // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
                // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
                // has extra properties not available on RequestCookie instances.
                polyfilledResponseCookiesIterator.call(underlyingCookies);
            },
            writable: false
        },
        size: {
            get () {
                const expression = '`cookies().size`';
                syncIODev(route, expression);
                return underlyingCookies.size;
            }
        },
        get: {
            value: function get() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().get()`';
                } else {
                    expression = `\`cookies().get(${describeNameArg(arguments[0])})\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.get.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        getAll: {
            value: function getAll() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().getAll()`';
                } else {
                    expression = `\`cookies().getAll(${describeNameArg(arguments[0])})\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.getAll.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        has: {
            value: function get() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().has()`';
                } else {
                    expression = `\`cookies().has(${describeNameArg(arguments[0])})\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.has.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        set: {
            value: function set() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().set()`';
                } else {
                    const arg = arguments[0];
                    if (arg) {
                        expression = `\`cookies().set(${describeNameArg(arg)}, ...)\``;
                    } else {
                        expression = '`cookies().set(...)`';
                    }
                }
                syncIODev(route, expression);
                return underlyingCookies.set.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        delete: {
            value: function() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().delete()`';
                } else if (arguments.length === 1) {
                    expression = `\`cookies().delete(${describeNameArg(arguments[0])})\``;
                } else {
                    expression = `\`cookies().delete(${describeNameArg(arguments[0])}, ...)\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.delete.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        clear: {
            value: function clear() {
                const expression = '`cookies().clear()`';
                syncIODev(route, expression);
                // @ts-ignore clear is defined in RequestCookies implementation but not in the type
                return typeof underlyingCookies.clear === 'function' ? underlyingCookies.clear.apply(underlyingCookies, arguments) : // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
                // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
                // has extra properties not available on RequestCookie instances.
                polyfilledResponseCookiesClear.call(underlyingCookies, promise);
            },
            writable: false
        },
        toString: {
            value: function toString() {
                const expression = '`cookies().toString()` or implicit casting';
                syncIODev(route, expression);
                return underlyingCookies.toString.apply(underlyingCookies, arguments);
            },
            writable: false
        }
    });
    return promise;
}
// Similar to `makeUntrackedExoticCookiesWithDevWarnings`, but just logging the
// sync access without actually defining the cookies properties on the promise.
function makeUntrackedCookiesWithDevWarnings(underlyingCookies, route) {
    const cachedCookies = CachedCookies.get(underlyingCookies);
    if (cachedCookies) {
        return cachedCookies;
    }
    const promise = (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(underlyingCookies);
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            switch(prop){
                case Symbol.iterator:
                    {
                        warnForSyncAccess(route, '`...cookies()` or similar iteration');
                        break;
                    }
                case 'size':
                case 'get':
                case 'getAll':
                case 'has':
                case 'set':
                case 'delete':
                case 'clear':
                case 'toString':
                    {
                        warnForSyncAccess(route, `\`cookies().${prop}\``);
                        break;
                    }
                default:
                    {
                    // We only warn for well-defined properties of the cookies object.
                    }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        }
    });
    CachedCookies.set(underlyingCookies, proxiedPromise);
    return proxiedPromise;
}
function describeNameArg(arg) {
    return typeof arg === 'object' && arg !== null && typeof arg.name === 'string' ? `'${arg.name}'` : typeof arg === 'string' ? `'${arg}'` : '...';
}
function syncIODev(route, expression) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'request':
                if (workUnitStore.prerenderPhase === true) {
                    // When we're rendering dynamically in dev, we need to advance out of
                    // the Prerender environment when we read Request data synchronously.
                    (0, _dynamicrendering.trackSynchronousRequestDataAccessInDev)(workUnitStore);
                }
                break;
            case 'prerender':
            case 'prerender-client':
            case 'prerender-runtime':
            case 'prerender-ppr':
            case 'prerender-legacy':
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                break;
            default:
                workUnitStore;
        }
    }
    // In all cases we warn normally
    warnForSyncAccess(route, expression);
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createCookiesAccessError);
function createCookiesAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`cookies()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E223",
        enumerable: false,
        configurable: true
    });
}
function polyfilledResponseCookiesIterator() {
    return this.getAll().map((c)=>[
            c.name,
            c
        ]).values();
}
function polyfilledResponseCookiesClear(returnable) {
    for (const cookie of this.getAll()){
        this.delete(cookie.name);
    }
    return returnable;
} //# sourceMappingURL=cookies.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/adapters/headers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    HeadersAdapter: null,
    ReadonlyHeadersError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HeadersAdapter: function() {
        return HeadersAdapter;
    },
    ReadonlyHeadersError: function() {
        return ReadonlyHeadersError;
    }
});
const _reflect = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
class ReadonlyHeadersError extends Error {
    constructor(){
        super('Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers');
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === 'symbol') {
                    return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === 'undefined') return;
                // If the original casing exists, return the value.
                return _reflect.ReflectAdapter.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === 'symbol') {
                    return _reflect.ReflectAdapter.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return _reflect.ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === 'symbol') return _reflect.ReflectAdapter.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === 'undefined') return false;
                // If the original casing exists, return true.
                return _reflect.ReflectAdapter.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === 'symbol') return _reflect.ReflectAdapter.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === 'undefined') return true;
                // If the original casing exists, delete the property.
                return _reflect.ReflectAdapter.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'append':
                    case 'delete':
                    case 'set':
                        return ReadonlyHeadersError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(', ');
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === 'string') {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== 'undefined') return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== 'undefined';
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map
}),
"[project]/node_modules/next/dist/server/request/headers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "headers", {
    enumerable: true,
    get: function() {
        return headers;
    }
});
const _headers = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/headers.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _creatededupedbycallsiteservererrorlogger = __turbopack_context__.r("[project]/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/server/request/utils.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _reflect = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
function headers() {
    const callingExpression = 'headers';
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0, _utils.isRequestAPICallableInsideAfter)()) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E367",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // headers object without tracking
            const underlyingHeaders = _headers.HeadersAdapter.seal(new Headers({}));
            return makeUntrackedExoticHeaders(underlyingHeaders);
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'cache':
                    {
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E304",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, headers);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'private-cache':
                    {
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used "headers" inside "use cache: private". Accessing "headers" inside a private cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E742",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, headers);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'unstable-cache':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                        value: "E127",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender':
                case 'prerender-client':
                case 'prerender-runtime':
                case 'prerender-ppr':
                case 'prerender-legacy':
                case 'request':
                    break;
                default:
                    workUnitStore;
            }
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E525",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'prerender':
                case 'prerender-runtime':
                    return makeHangingHeaders(workStore, workUnitStore);
                case 'prerender-client':
                    const exportName = '`headers`';
                    throw Object.defineProperty(new _invarianterror.InvariantError(`${exportName} must not be used within a client component. Next.js should be preventing ${exportName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                        value: "E693",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender-ppr':
                    // PPR Prerender (no cacheComponents)
                    // We are prerendering with PPR. We need track dynamic access here eagerly
                    // to keep continuity with how headers has worked in PPR without cacheComponents.
                    // TODO consider switching the semantic to throw on property access instead
                    return (0, _dynamicrendering.postponeWithTracking)(workStore.route, callingExpression, workUnitStore.dynamicTracking);
                case 'prerender-legacy':
                    // Legacy Prerender
                    // We are in a legacy static generation mode while prerendering
                    // We track dynamic access here so we don't need to wrap the headers in
                    // individual property access tracking.
                    return (0, _dynamicrendering.throwToInterruptStaticGeneration)(callingExpression, workStore, workUnitStore);
                case 'request':
                    (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workUnitStore);
                    if ("TURBOPACK compile-time truthy", 1) {
                        // Semantically we only need the dev tracking when running in `next dev`
                        // but since you would never use next dev with production NODE_ENV we use this
                        // as a proxy so we can statically exclude this code from production builds.
                        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                        ;
                        return makeUntrackedExoticHeadersWithDevWarnings(workUnitStore.headers, workStore == null ? void 0 : workStore.route);
                    } else //TURBOPACK unreachable
                    ;
                    //TURBOPACK unreachable
                    ;
                default:
                    workUnitStore;
            }
        }
    }
    // If we end up here, there was no work store or work unit store present.
    (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(callingExpression);
}
const CachedHeaders = new WeakMap();
function makeHangingHeaders(workStore, prerenderStore) {
    const cachedHeaders = CachedHeaders.get(prerenderStore);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, '`headers()`');
    CachedHeaders.set(prerenderStore, promise);
    return promise;
}
function makeUntrackedHeaders(underlyingHeaders) {
    const cachedHeaders = CachedHeaders.get(underlyingHeaders);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = Promise.resolve(underlyingHeaders);
    CachedHeaders.set(underlyingHeaders, promise);
    return promise;
}
function makeUntrackedExoticHeaders(underlyingHeaders) {
    const cachedHeaders = CachedHeaders.get(underlyingHeaders);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = Promise.resolve(underlyingHeaders);
    CachedHeaders.set(underlyingHeaders, promise);
    Object.defineProperties(promise, {
        append: {
            value: underlyingHeaders.append.bind(underlyingHeaders)
        },
        delete: {
            value: underlyingHeaders.delete.bind(underlyingHeaders)
        },
        get: {
            value: underlyingHeaders.get.bind(underlyingHeaders)
        },
        has: {
            value: underlyingHeaders.has.bind(underlyingHeaders)
        },
        set: {
            value: underlyingHeaders.set.bind(underlyingHeaders)
        },
        getSetCookie: {
            value: underlyingHeaders.getSetCookie.bind(underlyingHeaders)
        },
        forEach: {
            value: underlyingHeaders.forEach.bind(underlyingHeaders)
        },
        keys: {
            value: underlyingHeaders.keys.bind(underlyingHeaders)
        },
        values: {
            value: underlyingHeaders.values.bind(underlyingHeaders)
        },
        entries: {
            value: underlyingHeaders.entries.bind(underlyingHeaders)
        },
        [Symbol.iterator]: {
            value: underlyingHeaders[Symbol.iterator].bind(underlyingHeaders)
        }
    });
    return promise;
}
function makeUntrackedExoticHeadersWithDevWarnings(underlyingHeaders, route) {
    const cachedHeaders = CachedHeaders.get(underlyingHeaders);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(underlyingHeaders);
    CachedHeaders.set(underlyingHeaders, promise);
    Object.defineProperties(promise, {
        append: {
            value: function append() {
                const expression = `\`headers().append(${describeNameArg(arguments[0])}, ...)\``;
                syncIODev(route, expression);
                return underlyingHeaders.append.apply(underlyingHeaders, arguments);
            }
        },
        delete: {
            value: function _delete() {
                const expression = `\`headers().delete(${describeNameArg(arguments[0])})\``;
                syncIODev(route, expression);
                return underlyingHeaders.delete.apply(underlyingHeaders, arguments);
            }
        },
        get: {
            value: function get() {
                const expression = `\`headers().get(${describeNameArg(arguments[0])})\``;
                syncIODev(route, expression);
                return underlyingHeaders.get.apply(underlyingHeaders, arguments);
            }
        },
        has: {
            value: function has() {
                const expression = `\`headers().has(${describeNameArg(arguments[0])})\``;
                syncIODev(route, expression);
                return underlyingHeaders.has.apply(underlyingHeaders, arguments);
            }
        },
        set: {
            value: function set() {
                const expression = `\`headers().set(${describeNameArg(arguments[0])}, ...)\``;
                syncIODev(route, expression);
                return underlyingHeaders.set.apply(underlyingHeaders, arguments);
            }
        },
        getSetCookie: {
            value: function getSetCookie() {
                const expression = '`headers().getSetCookie()`';
                syncIODev(route, expression);
                return underlyingHeaders.getSetCookie.apply(underlyingHeaders, arguments);
            }
        },
        forEach: {
            value: function forEach() {
                const expression = '`headers().forEach(...)`';
                syncIODev(route, expression);
                return underlyingHeaders.forEach.apply(underlyingHeaders, arguments);
            }
        },
        keys: {
            value: function keys() {
                const expression = '`headers().keys()`';
                syncIODev(route, expression);
                return underlyingHeaders.keys.apply(underlyingHeaders, arguments);
            }
        },
        values: {
            value: function values() {
                const expression = '`headers().values()`';
                syncIODev(route, expression);
                return underlyingHeaders.values.apply(underlyingHeaders, arguments);
            }
        },
        entries: {
            value: function entries() {
                const expression = '`headers().entries()`';
                syncIODev(route, expression);
                return underlyingHeaders.entries.apply(underlyingHeaders, arguments);
            }
        },
        [Symbol.iterator]: {
            value: function() {
                const expression = '`...headers()` or similar iteration';
                syncIODev(route, expression);
                return underlyingHeaders[Symbol.iterator].apply(underlyingHeaders, arguments);
            }
        }
    });
    return promise;
}
// Similar to `makeUntrackedExoticHeadersWithDevWarnings`, but just logging the
// sync access without actually defining the headers properties on the promise.
function makeUntrackedHeadersWithDevWarnings(underlyingHeaders, route) {
    const cachedHeaders = CachedHeaders.get(underlyingHeaders);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(underlyingHeaders);
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            switch(prop){
                case Symbol.iterator:
                    {
                        warnForSyncAccess(route, '`...headers()` or similar iteration');
                        break;
                    }
                case 'append':
                case 'delete':
                case 'get':
                case 'has':
                case 'set':
                case 'getSetCookie':
                case 'forEach':
                case 'keys':
                case 'values':
                case 'entries':
                    {
                        warnForSyncAccess(route, `\`headers().${prop}\``);
                        break;
                    }
                default:
                    {
                    // We only warn for well-defined properties of the headers object.
                    }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        }
    });
    CachedHeaders.set(underlyingHeaders, proxiedPromise);
    return proxiedPromise;
}
function describeNameArg(arg) {
    return typeof arg === 'string' ? `'${arg}'` : '...';
}
function syncIODev(route, expression) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'request':
                if (workUnitStore.prerenderPhase === true) {
                    // When we're rendering dynamically in dev, we need to advance out of
                    // the Prerender environment when we read Request data synchronously.
                    (0, _dynamicrendering.trackSynchronousRequestDataAccessInDev)(workUnitStore);
                }
                break;
            case 'prerender':
            case 'prerender-client':
            case 'prerender-runtime':
            case 'prerender-ppr':
            case 'prerender-legacy':
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                break;
            default:
                workUnitStore;
        }
    }
    // In all cases we warn normally
    warnForSyncAccess(route, expression);
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createHeadersAccessError);
function createHeadersAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`headers()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E277",
        enumerable: false,
        configurable: true
    });
} //# sourceMappingURL=headers.js.map
}),
"[project]/node_modules/next/dist/server/request/draft-mode.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "draftMode", {
    enumerable: true,
    get: function() {
        return draftMode;
    }
});
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _creatededupedbycallsiteservererrorlogger = __turbopack_context__.r("[project]/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-rsc] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/static-generation-bailout.js [app-rsc] (ecmascript)");
const _hooksservercontext = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/hooks-server-context.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _reflect = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
function draftMode() {
    const callingExpression = 'draftMode';
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workStore || !workUnitStore) {
        (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(callingExpression);
    }
    switch(workUnitStore.type){
        case 'prerender-runtime':
            // TODO(runtime-ppr): does it make sense to delay this? normally it's always microtasky
            return (0, _dynamicrendering.delayUntilRuntimeStage)(workUnitStore, createOrGetCachedDraftMode(workUnitStore.draftMode, workStore));
        case 'request':
            return createOrGetCachedDraftMode(workUnitStore.draftMode, workStore);
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
            // Inside of `"use cache"` or `unstable_cache`, draft mode is available if
            // the outmost work unit store is a request store (or a runtime prerender),
            // and if draft mode is enabled.
            const draftModeProvider = (0, _workunitasyncstorageexternal.getDraftModeProviderForCacheScope)(workStore, workUnitStore);
            if (draftModeProvider) {
                return createOrGetCachedDraftMode(draftModeProvider, workStore);
            }
        // Otherwise, we fall through to providing an empty draft mode.
        // eslint-disable-next-line no-fallthrough
        case 'prerender':
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
            // Return empty draft mode
            return createOrGetCachedDraftMode(null, workStore);
        default:
            return workUnitStore;
    }
}
function createOrGetCachedDraftMode(draftModeProvider, workStore) {
    const cacheKey = draftModeProvider ?? NullDraftMode;
    const cachedDraftMode = CachedDraftModes.get(cacheKey);
    if (cachedDraftMode) {
        return cachedDraftMode;
    }
    let promise;
    if (("TURBOPACK compile-time value", "development") === 'development' && !(workStore == null ? void 0 : workStore.isPrefetchRequest)) {
        const route = workStore == null ? void 0 : workStore.route;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        promise = createExoticDraftModeWithDevWarnings(draftModeProvider, route);
    } else {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        promise = createExoticDraftMode(draftModeProvider);
    }
    CachedDraftModes.set(cacheKey, promise);
    return promise;
}
const NullDraftMode = {};
const CachedDraftModes = new WeakMap();
function createExoticDraftMode(underlyingProvider) {
    const instance = new DraftMode(underlyingProvider);
    const promise = Promise.resolve(instance);
    Object.defineProperty(promise, 'isEnabled', {
        get () {
            return instance.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    promise.enable = instance.enable.bind(instance);
    promise.disable = instance.disable.bind(instance);
    return promise;
}
function createExoticDraftModeWithDevWarnings(underlyingProvider, route) {
    const instance = new DraftMode(underlyingProvider);
    const promise = Promise.resolve(instance);
    Object.defineProperty(promise, 'isEnabled', {
        get () {
            const expression = '`draftMode().isEnabled`';
            syncIODev(route, expression);
            return instance.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(promise, 'enable', {
        value: function get() {
            const expression = '`draftMode().enable()`';
            syncIODev(route, expression);
            return instance.enable.apply(instance, arguments);
        }
    });
    Object.defineProperty(promise, 'disable', {
        value: function get() {
            const expression = '`draftMode().disable()`';
            syncIODev(route, expression);
            return instance.disable.apply(instance, arguments);
        }
    });
    return promise;
}
// Similar to `createExoticDraftModeWithDevWarnings`, but just logging the sync
// access without actually defining the draftMode properties on the promise.
function createDraftModeWithDevWarnings(underlyingProvider, route) {
    const instance = new DraftMode(underlyingProvider);
    const promise = Promise.resolve(instance);
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            switch(prop){
                case 'isEnabled':
                    warnForSyncAccess(route, `\`draftMode().${prop}\``);
                    break;
                case 'enable':
                case 'disable':
                    {
                        warnForSyncAccess(route, `\`draftMode().${prop}()\``);
                        break;
                    }
                default:
                    {
                    // We only warn for well-defined properties of the draftMode object.
                    }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        }
    });
    return proxiedPromise;
}
class DraftMode {
    constructor(provider){
        this._provider = provider;
    }
    get isEnabled() {
        if (this._provider !== null) {
            return this._provider.isEnabled;
        }
        return false;
    }
    enable() {
        // We have a store we want to track dynamic data access to ensure we
        // don't statically generate routes that manipulate draft mode.
        trackDynamicDraftMode('draftMode().enable()', this.enable);
        if (this._provider !== null) {
            this._provider.enable();
        }
    }
    disable() {
        trackDynamicDraftMode('draftMode().disable()', this.disable);
        if (this._provider !== null) {
            this._provider.disable();
        }
    }
}
function syncIODev(route, expression) {
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'request':
                if (workUnitStore.prerenderPhase === true) {
                    // When we're rendering dynamically in dev, we need to advance out of
                    // the Prerender environment when we read Request data synchronously.
                    (0, _dynamicrendering.trackSynchronousRequestDataAccessInDev)(workUnitStore);
                }
                break;
            case 'prerender':
            case 'prerender-client':
            case 'prerender-runtime':
            case 'prerender-ppr':
            case 'prerender-legacy':
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                break;
            default:
                workUnitStore;
        }
    }
    // In all cases we warn normally
    warnForSyncAccess(route, expression);
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createDraftModeAccessError);
function createDraftModeAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`draftMode()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E377",
        enumerable: false,
        configurable: true
    });
}
function trackDynamicDraftMode(expression, constructorOpt) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore) {
        // We have a store we want to track dynamic data access to ensure we
        // don't statically generate routes that manipulate draft mode.
        if ((workUnitStore == null ? void 0 : workUnitStore.phase) === 'after') {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used "${expression}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E348",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E553",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'cache':
                case 'private-cache':
                    {
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used "${expression}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E246",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, constructorOpt);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'unstable-cache':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used "${expression}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                        value: "E259",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender':
                case 'prerender-runtime':
                    {
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used ${expression} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", {
                            value: "E126",
                            enumerable: false,
                            configurable: true
                        });
                        return (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(workStore.route, expression, error, workUnitStore);
                    }
                case 'prerender-client':
                    const exportName = '`draftMode`';
                    throw Object.defineProperty(new _invarianterror.InvariantError(`${exportName} must not be used within a client component. Next.js should be preventing ${exportName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                        value: "E693",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender-ppr':
                    return (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, workUnitStore.dynamicTracking);
                case 'prerender-legacy':
                    workUnitStore.revalidate = 0;
                    const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${workStore.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                        value: "E558",
                        enumerable: false,
                        configurable: true
                    });
                    workStore.dynamicUsageDescription = expression;
                    workStore.dynamicUsageStack = err.stack;
                    throw err;
                case 'request':
                    (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workUnitStore);
                    break;
                default:
                    workUnitStore;
            }
        }
    }
} //# sourceMappingURL=draft-mode.js.map
}),
"[project]/node_modules/next/headers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports.cookies = __turbopack_context__.r("[project]/node_modules/next/dist/server/request/cookies.js [app-rsc] (ecmascript)").cookies;
module.exports.headers = __turbopack_context__.r("[project]/node_modules/next/dist/server/request/headers.js [app-rsc] (ecmascript)").headers;
module.exports.draftMode = __turbopack_context__.r("[project]/node_modules/next/dist/server/request/draft-mode.js [app-rsc] (ecmascript)").draftMode;
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/cookies.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRequestCookies",
    ()=>getRequestCookies,
    "getRequestCookiesInMiddleware",
    ()=>getRequestCookiesInMiddleware,
    "getResponseCookies",
    ()=>getResponseCookies
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
function getRequestCookies() {
    return getCookieStore((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])());
}
function getRequestCookiesInMiddleware(request) {
    return getCookieStore((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])(), request.cookies);
}
function getResponseCookies(response) {
    return getCookieStore((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])(), response.cookies);
}
function getCookieStore(requestHeaders, responseCookies) {
    const isLocalhost = /localhost:\d+/.test(requestHeaders.get("Host") ?? "");
    const prefix = isLocalhost ? "" : "__Host-";
    const tokenName = prefix + "__convexAuthJWT";
    const refreshTokenName = prefix + "__convexAuthRefreshToken";
    const verifierName = prefix + "__convexAuthOAuthVerifier";
    function getValue(name) {
        return responseCookies.get(name)?.value ?? null;
    }
    const cookieOptions = getCookieOptions(isLocalhost);
    function setValue(name, value1) {
        if (value1 === null) {
            // Only request cookies have a `size` property
            if ("size" in responseCookies) {
                responseCookies.delete(name);
            } else {
                // See https://github.com/vercel/next.js/issues/56632
                // for why .delete({}) doesn't work:
                responseCookies.set(name, "", {
                    ...cookieOptions,
                    expires: 0
                });
            }
        } else {
            responseCookies.set(name, value1, cookieOptions);
        }
    }
    return {
        get token () {
            return getValue(tokenName);
        },
        set token (value){
            setValue(tokenName, value);
        },
        get refreshToken () {
            return getValue(refreshTokenName);
        },
        set refreshToken (value){
            setValue(refreshTokenName, value);
        },
        get verifier () {
            return getValue(verifierName);
        },
        set verifier (value){
            setValue(verifierName, value);
        }
    };
}
function getCookieOptions(isLocalhost) {
    // Safari does not send headers with `secure: true` on http:// domains including localhost,
    // so set `secure: false` (https://codedamn.com/news/web-development/safari-cookie-is-not-being-set)
    return {
        secure: isLocalhost ? false : true,
        httpOnly: true,
        sameSite: "lax",
        path: "/"
    };
}
}),
"[project]/node_modules/convex/dist/esm/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
"use strict";
const version = "1.27.3"; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/convex/dist/esm/values/base64.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "byteLength",
    ()=>byteLength,
    "fromByteArray",
    ()=>fromByteArray,
    "fromByteArrayUrlSafeNoPadding",
    ()=>fromByteArrayUrlSafeNoPadding,
    "toByteArray",
    ()=>toByteArray
]);
"use strict";
var lookup = [];
var revLookup = [];
var Arr = Uint8Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(_b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
        output.push(tripletToBase64(tmp));
    }
    return output.join("");
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength){
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
    }
    return parts.join("");
}
function fromByteArrayUrlSafeNoPadding(uint8) {
    return fromByteArray(uint8).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
} //# sourceMappingURL=base64.js.map
}),
"[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSimpleObject",
    ()=>isSimpleObject,
    "parseArgs",
    ()=>parseArgs,
    "validateDeploymentUrl",
    ()=>validateDeploymentUrl
]);
"use strict";
function parseArgs(args) {
    if (args === void 0) {
        return {};
    }
    if (!isSimpleObject(args)) {
        throw new Error(`The arguments to a Convex function must be an object. Received: ${args}`);
    }
    return args;
}
function validateDeploymentUrl(deploymentUrl) {
    if (typeof deploymentUrl === "undefined") {
        throw new Error(`Client created with undefined deployment address. If you used an environment variable, check that it's set.`);
    }
    if (typeof deploymentUrl !== "string") {
        throw new Error(`Invalid deployment address: found ${deploymentUrl}".`);
    }
    if (!(deploymentUrl.startsWith("http:") || deploymentUrl.startsWith("https:"))) {
        throw new Error(`Invalid deployment address: Must start with "https://" or "http://". Found "${deploymentUrl}".`);
    }
    try {
        new URL(deploymentUrl);
    } catch  {
        throw new Error(`Invalid deployment address: "${deploymentUrl}" is not a valid URL. If you believe this URL is correct, use the \`skipConvexDeploymentUrlCheck\` option to bypass this.`);
    }
    if (deploymentUrl.endsWith(".convex.site")) {
        throw new Error(`Invalid deployment address: "${deploymentUrl}" ends with .convex.site, which is used for HTTP Actions. Convex deployment URLs typically end with .convex.cloud? If you believe this URL is correct, use the \`skipConvexDeploymentUrlCheck\` option to bypass this.`);
    }
}
function isSimpleObject(value) {
    const isObject = typeof value === "object";
    const prototype = Object.getPrototypeOf(value);
    const isSimple = prototype === null || prototype === Object.prototype || // Objects generated from other contexts (e.g. across Node.js `vm` modules) will not satisfy the previous
    // conditions but are still simple objects.
    prototype?.constructor?.name === "Object";
    return isObject && isSimple;
} //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base64ToBigInt",
    ()=>base64ToBigInt,
    "bigIntToBase64",
    ()=>bigIntToBase64,
    "convexOrUndefinedToJson",
    ()=>convexOrUndefinedToJson,
    "convexToJson",
    ()=>convexToJson,
    "jsonToConvex",
    ()=>jsonToConvex,
    "modernBase64ToBigInt",
    ()=>modernBase64ToBigInt,
    "modernBigIntToBase64",
    ()=>modernBigIntToBase64,
    "patchValueToJson",
    ()=>patchValueToJson,
    "slowBase64ToBigInt",
    ()=>slowBase64ToBigInt,
    "slowBigIntToBase64",
    ()=>slowBigIntToBase64,
    "stringifyValueForError",
    ()=>stringifyValueForError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/base64.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)");
"use strict";
;
;
const LITTLE_ENDIAN = true;
const MIN_INT64 = BigInt("-9223372036854775808");
const MAX_INT64 = BigInt("9223372036854775807");
const ZERO = BigInt("0");
const EIGHT = BigInt("8");
const TWOFIFTYSIX = BigInt("256");
function isSpecial(n) {
    return Number.isNaN(n) || !Number.isFinite(n) || Object.is(n, -0);
}
function slowBigIntToBase64(value) {
    if (value < ZERO) {
        value -= MIN_INT64 + MIN_INT64;
    }
    let hex = value.toString(16);
    if (hex.length % 2 === 1) hex = "0" + hex;
    const bytes = new Uint8Array(new ArrayBuffer(8));
    let i = 0;
    for (const hexByte of hex.match(/.{2}/g).reverse()){
        bytes.set([
            parseInt(hexByte, 16)
        ], i++);
        value >>= EIGHT;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fromByteArray"](bytes);
}
function slowBase64ToBigInt(encoded) {
    const integerBytes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toByteArray"](encoded);
    if (integerBytes.byteLength !== 8) {
        throw new Error(`Received ${integerBytes.byteLength} bytes, expected 8 for $integer`);
    }
    let value = ZERO;
    let power = ZERO;
    for (const byte of integerBytes){
        value += BigInt(byte) * TWOFIFTYSIX ** power;
        power++;
    }
    if (value > MAX_INT64) {
        value += MIN_INT64 + MIN_INT64;
    }
    return value;
}
function modernBigIntToBase64(value) {
    if (value < MIN_INT64 || MAX_INT64 < value) {
        throw new Error(`BigInt ${value} does not fit into a 64-bit signed integer.`);
    }
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setBigInt64(0, value, true);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fromByteArray"](new Uint8Array(buffer));
}
function modernBase64ToBigInt(encoded) {
    const integerBytes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toByteArray"](encoded);
    if (integerBytes.byteLength !== 8) {
        throw new Error(`Received ${integerBytes.byteLength} bytes, expected 8 for $integer`);
    }
    const intBytesView = new DataView(integerBytes.buffer);
    return intBytesView.getBigInt64(0, true);
}
const bigIntToBase64 = DataView.prototype.setBigInt64 ? modernBigIntToBase64 : slowBigIntToBase64;
const base64ToBigInt = DataView.prototype.getBigInt64 ? modernBase64ToBigInt : slowBase64ToBigInt;
const MAX_IDENTIFIER_LEN = 1024;
function validateObjectField(k) {
    if (k.length > MAX_IDENTIFIER_LEN) {
        throw new Error(`Field name ${k} exceeds maximum field name length ${MAX_IDENTIFIER_LEN}.`);
    }
    if (k.startsWith("$")) {
        throw new Error(`Field name ${k} starts with a '$', which is reserved.`);
    }
    for(let i = 0; i < k.length; i += 1){
        const charCode = k.charCodeAt(i);
        if (charCode < 32 || charCode >= 127) {
            throw new Error(`Field name ${k} has invalid character '${k[i]}': Field names can only contain non-control ASCII characters`);
        }
    }
}
function jsonToConvex(value) {
    if (value === null) {
        return value;
    }
    if (typeof value === "boolean") {
        return value;
    }
    if (typeof value === "number") {
        return value;
    }
    if (typeof value === "string") {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map((value2)=>jsonToConvex(value2));
    }
    if (typeof value !== "object") {
        throw new Error(`Unexpected type of ${value}`);
    }
    const entries = Object.entries(value);
    if (entries.length === 1) {
        const key = entries[0][0];
        if (key === "$bytes") {
            if (typeof value.$bytes !== "string") {
                throw new Error(`Malformed $bytes field on ${value}`);
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toByteArray"](value.$bytes).buffer;
        }
        if (key === "$integer") {
            if (typeof value.$integer !== "string") {
                throw new Error(`Malformed $integer field on ${value}`);
            }
            return base64ToBigInt(value.$integer);
        }
        if (key === "$float") {
            if (typeof value.$float !== "string") {
                throw new Error(`Malformed $float field on ${value}`);
            }
            const floatBytes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toByteArray"](value.$float);
            if (floatBytes.byteLength !== 8) {
                throw new Error(`Received ${floatBytes.byteLength} bytes, expected 8 for $float`);
            }
            const floatBytesView = new DataView(floatBytes.buffer);
            const float = floatBytesView.getFloat64(0, LITTLE_ENDIAN);
            if (!isSpecial(float)) {
                throw new Error(`Float ${float} should be encoded as a number`);
            }
            return float;
        }
        if (key === "$set") {
            throw new Error(`Received a Set which is no longer supported as a Convex type.`);
        }
        if (key === "$map") {
            throw new Error(`Received a Map which is no longer supported as a Convex type.`);
        }
    }
    const out = {};
    for (const [k, v] of Object.entries(value)){
        validateObjectField(k);
        out[k] = jsonToConvex(v);
    }
    return out;
}
function stringifyValueForError(value) {
    return JSON.stringify(value, (_key, value2)=>{
        if (value2 === void 0) {
            return "undefined";
        }
        if (typeof value2 === "bigint") {
            return `${value2.toString()}n`;
        }
        return value2;
    });
}
function convexToJsonInternal(value, originalValue, context, includeTopLevelUndefined) {
    if (value === void 0) {
        const contextText = context && ` (present at path ${context} in original object ${stringifyValueForError(originalValue)})`;
        throw new Error(`undefined is not a valid Convex value${contextText}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`);
    }
    if (value === null) {
        return value;
    }
    if (typeof value === "bigint") {
        if (value < MIN_INT64 || MAX_INT64 < value) {
            throw new Error(`BigInt ${value} does not fit into a 64-bit signed integer.`);
        }
        return {
            $integer: bigIntToBase64(value)
        };
    }
    if (typeof value === "number") {
        if (isSpecial(value)) {
            const buffer = new ArrayBuffer(8);
            new DataView(buffer).setFloat64(0, value, LITTLE_ENDIAN);
            return {
                $float: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fromByteArray"](new Uint8Array(buffer))
            };
        } else {
            return value;
        }
    }
    if (typeof value === "boolean") {
        return value;
    }
    if (typeof value === "string") {
        return value;
    }
    if (value instanceof ArrayBuffer) {
        return {
            $bytes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fromByteArray"](new Uint8Array(value))
        };
    }
    if (Array.isArray(value)) {
        return value.map((value2, i)=>convexToJsonInternal(value2, originalValue, context + `[${i}]`, false));
    }
    if (value instanceof Set) {
        throw new Error(errorMessageForUnsupportedType(context, "Set", [
            ...value
        ], originalValue));
    }
    if (value instanceof Map) {
        throw new Error(errorMessageForUnsupportedType(context, "Map", [
            ...value
        ], originalValue));
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSimpleObject"])(value)) {
        const theType = value?.constructor?.name;
        const typeName = theType ? `${theType} ` : "";
        throw new Error(errorMessageForUnsupportedType(context, typeName, value, originalValue));
    }
    const out = {};
    const entries = Object.entries(value);
    entries.sort(([k1, _v1], [k2, _v2])=>k1 === k2 ? 0 : k1 < k2 ? -1 : 1);
    for (const [k, v] of entries){
        if (v !== void 0) {
            validateObjectField(k);
            out[k] = convexToJsonInternal(v, originalValue, context + `.${k}`, false);
        } else if (includeTopLevelUndefined) {
            validateObjectField(k);
            out[k] = convexOrUndefinedToJsonInternal(v, originalValue, context + `.${k}`);
        }
    }
    return out;
}
function errorMessageForUnsupportedType(context, typeName, value, originalValue) {
    if (context) {
        return `${typeName}${stringifyValueForError(value)} is not a supported Convex type (present at path ${context} in original object ${stringifyValueForError(originalValue)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`;
    } else {
        return `${typeName}${stringifyValueForError(value)} is not a supported Convex type.`;
    }
}
function convexOrUndefinedToJsonInternal(value, originalValue, context) {
    if (value === void 0) {
        return {
            $undefined: null
        };
    } else {
        if (originalValue === void 0) {
            throw new Error(`Programming error. Current value is ${stringifyValueForError(value)} but original value is undefined`);
        }
        return convexToJsonInternal(value, originalValue, context, false);
    }
}
function convexToJson(value) {
    return convexToJsonInternal(value, value, "", false);
}
function convexOrUndefinedToJson(value) {
    return convexOrUndefinedToJsonInternal(value, value, "");
}
function patchValueToJson(value) {
    return convexToJsonInternal(value, value, "", true);
} //# sourceMappingURL=value.js.map
}),
"[project]/node_modules/convex/dist/esm/values/validators.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VAny",
    ()=>VAny,
    "VArray",
    ()=>VArray,
    "VBoolean",
    ()=>VBoolean,
    "VBytes",
    ()=>VBytes,
    "VFloat64",
    ()=>VFloat64,
    "VId",
    ()=>VId,
    "VInt64",
    ()=>VInt64,
    "VLiteral",
    ()=>VLiteral,
    "VNull",
    ()=>VNull,
    "VObject",
    ()=>VObject,
    "VRecord",
    ()=>VRecord,
    "VString",
    ()=>VString,
    "VUnion",
    ()=>VUnion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
class BaseValidator {
    constructor({ isOptional }){
        /**
     * Only for TypeScript, the TS type of the JS values validated
     * by this validator.
     */ __publicField(this, "type");
        /**
     * Only for TypeScript, if this an Object validator, then
     * this is the TS type of its property names.
     */ __publicField(this, "fieldPaths");
        /**
     * Whether this is an optional Object property value validator.
     */ __publicField(this, "isOptional");
        /**
     * Always `"true"`.
     */ __publicField(this, "isConvexValidator");
        this.isOptional = isOptional;
        this.isConvexValidator = true;
    }
    /** @deprecated - use isOptional instead */ get optional() {
        return this.isOptional === "optional" ? true : false;
    }
}
class VId extends BaseValidator {
    /**
   * Usually you'd use `v.id(tableName)` instead.
   */ constructor({ isOptional, tableName }){
        super({
            isOptional
        });
        /**
     * The name of the table that the validated IDs must belong to.
     */ __publicField(this, "tableName");
        /**
     * The kind of validator, `"id"`.
     */ __publicField(this, "kind", "id");
        if (typeof tableName !== "string") {
            throw new Error("v.id(tableName) requires a string");
        }
        this.tableName = tableName;
    }
    /** @internal */ get json() {
        return {
            type: "id",
            tableName: this.tableName
        };
    }
    /** @internal */ asOptional() {
        return new VId({
            isOptional: "optional",
            tableName: this.tableName
        });
    }
}
class VFloat64 extends BaseValidator {
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"float64"`.
     */ __publicField(this, "kind", "float64");
    }
    /** @internal */ get json() {
        return {
            type: "number"
        };
    }
    /** @internal */ asOptional() {
        return new VFloat64({
            isOptional: "optional"
        });
    }
}
class VInt64 extends BaseValidator {
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"int64"`.
     */ __publicField(this, "kind", "int64");
    }
    /** @internal */ get json() {
        return {
            type: "bigint"
        };
    }
    /** @internal */ asOptional() {
        return new VInt64({
            isOptional: "optional"
        });
    }
}
class VBoolean extends BaseValidator {
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"boolean"`.
     */ __publicField(this, "kind", "boolean");
    }
    /** @internal */ get json() {
        return {
            type: this.kind
        };
    }
    /** @internal */ asOptional() {
        return new VBoolean({
            isOptional: "optional"
        });
    }
}
class VBytes extends BaseValidator {
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"bytes"`.
     */ __publicField(this, "kind", "bytes");
    }
    /** @internal */ get json() {
        return {
            type: this.kind
        };
    }
    /** @internal */ asOptional() {
        return new VBytes({
            isOptional: "optional"
        });
    }
}
class VString extends BaseValidator {
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"string"`.
     */ __publicField(this, "kind", "string");
    }
    /** @internal */ get json() {
        return {
            type: this.kind
        };
    }
    /** @internal */ asOptional() {
        return new VString({
            isOptional: "optional"
        });
    }
}
class VNull extends BaseValidator {
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"null"`.
     */ __publicField(this, "kind", "null");
    }
    /** @internal */ get json() {
        return {
            type: this.kind
        };
    }
    /** @internal */ asOptional() {
        return new VNull({
            isOptional: "optional"
        });
    }
}
class VAny extends BaseValidator {
    constructor(){
        super(...arguments);
        /**
     * The kind of validator, `"any"`.
     */ __publicField(this, "kind", "any");
    }
    /** @internal */ get json() {
        return {
            type: this.kind
        };
    }
    /** @internal */ asOptional() {
        return new VAny({
            isOptional: "optional"
        });
    }
}
class VObject extends BaseValidator {
    /**
   * Usually you'd use `v.object({ ... })` instead.
   */ constructor({ isOptional, fields }){
        super({
            isOptional
        });
        /**
     * An object with the validator for each property.
     */ __publicField(this, "fields");
        /**
     * The kind of validator, `"object"`.
     */ __publicField(this, "kind", "object");
        globalThis.Object.values(fields).forEach((v)=>{
            if (!v.isConvexValidator) {
                throw new Error("v.object() entries must be valiators");
            }
        });
        this.fields = fields;
    }
    /** @internal */ get json() {
        return {
            type: this.kind,
            value: globalThis.Object.fromEntries(globalThis.Object.entries(this.fields).map(([k, v])=>[
                    k,
                    {
                        fieldType: v.json,
                        optional: v.isOptional === "optional" ? true : false
                    }
                ]))
        };
    }
    /** @internal */ asOptional() {
        return new VObject({
            isOptional: "optional",
            fields: this.fields
        });
    }
}
class VLiteral extends BaseValidator {
    /**
   * Usually you'd use `v.literal(value)` instead.
   */ constructor({ isOptional, value }){
        super({
            isOptional
        });
        /**
     * The value that the validated values must be equal to.
     */ __publicField(this, "value");
        /**
     * The kind of validator, `"literal"`.
     */ __publicField(this, "kind", "literal");
        if (typeof value !== "string" && typeof value !== "boolean" && typeof value !== "number" && typeof value !== "bigint") {
            throw new Error("v.literal(value) must be a string, number, or boolean");
        }
        this.value = value;
    }
    /** @internal */ get json() {
        return {
            type: this.kind,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(this.value)
        };
    }
    /** @internal */ asOptional() {
        return new VLiteral({
            isOptional: "optional",
            value: this.value
        });
    }
}
class VArray extends BaseValidator {
    /**
   * Usually you'd use `v.array(element)` instead.
   */ constructor({ isOptional, element }){
        super({
            isOptional
        });
        /**
     * The validator for the elements of the array.
     */ __publicField(this, "element");
        /**
     * The kind of validator, `"array"`.
     */ __publicField(this, "kind", "array");
        this.element = element;
    }
    /** @internal */ get json() {
        return {
            type: this.kind,
            value: this.element.json
        };
    }
    /** @internal */ asOptional() {
        return new VArray({
            isOptional: "optional",
            element: this.element
        });
    }
}
class VRecord extends BaseValidator {
    /**
   * Usually you'd use `v.record(key, value)` instead.
   */ constructor({ isOptional, key, value }){
        super({
            isOptional
        });
        /**
     * The validator for the keys of the record.
     */ __publicField(this, "key");
        /**
     * The validator for the values of the record.
     */ __publicField(this, "value");
        /**
     * The kind of validator, `"record"`.
     */ __publicField(this, "kind", "record");
        if (key.isOptional === "optional") {
            throw new Error("Record validator cannot have optional keys");
        }
        if (value.isOptional === "optional") {
            throw new Error("Record validator cannot have optional values");
        }
        if (!key.isConvexValidator || !value.isConvexValidator) {
            throw new Error("Key and value of v.record() but be validators");
        }
        this.key = key;
        this.value = value;
    }
    /** @internal */ get json() {
        return {
            type: this.kind,
            // This cast is needed because TypeScript thinks the key type is too wide
            keys: this.key.json,
            values: {
                fieldType: this.value.json,
                optional: false
            }
        };
    }
    /** @internal */ asOptional() {
        return new VRecord({
            isOptional: "optional",
            key: this.key,
            value: this.value
        });
    }
}
class VUnion extends BaseValidator {
    /**
   * Usually you'd use `v.union(...members)` instead.
   */ constructor({ isOptional, members }){
        super({
            isOptional
        });
        /**
     * The array of validators, one of which must match the value.
     */ __publicField(this, "members");
        /**
     * The kind of validator, `"union"`.
     */ __publicField(this, "kind", "union");
        members.forEach((member)=>{
            if (!member.isConvexValidator) {
                throw new Error("All members of v.union() must be validators");
            }
        });
        this.members = members;
    }
    /** @internal */ get json() {
        return {
            type: this.kind,
            value: this.members.map((v)=>v.json)
        };
    }
    /** @internal */ asOptional() {
        return new VUnion({
            isOptional: "optional",
            members: this.members
        });
    }
} //# sourceMappingURL=validators.js.map
}),
"[project]/node_modules/convex/dist/esm/values/validator.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "asObjectValidator",
    ()=>asObjectValidator,
    "isValidator",
    ()=>isValidator,
    "v",
    ()=>v
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validators.js [app-rsc] (ecmascript)");
"use strict";
;
function isValidator(v2) {
    return !!v2.isConvexValidator;
}
function asObjectValidator(obj) {
    if (isValidator(obj)) {
        return obj;
    } else {
        return v.object(obj);
    }
}
const v = {
    /**
   * Validates that the value corresponds to an ID of a document in given table.
   * @param tableName The name of the table.
   */ id: (tableName)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VId"]({
            isOptional: "required",
            tableName
        });
    },
    /**
   * Validates that the value is of type Null.
   */ null: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VNull"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of Convex type Float64 (Number in JS).
   *
   * Alias for `v.float64()`
   */ number: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VFloat64"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of Convex type Float64 (Number in JS).
   */ float64: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VFloat64"]({
            isOptional: "required"
        });
    },
    /**
   * @deprecated Use `v.int64()` instead
   */ bigint: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VInt64"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of Convex type Int64 (BigInt in JS).
   */ int64: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VInt64"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of type Boolean.
   */ boolean: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VBoolean"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of type String.
   */ string: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VString"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is of Convex type Bytes (constructed in JS via `ArrayBuffer`).
   */ bytes: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VBytes"]({
            isOptional: "required"
        });
    },
    /**
   * Validates that the value is equal to the given literal value.
   * @param literal The literal value to compare against.
   */ literal: (literal)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VLiteral"]({
            isOptional: "required",
            value: literal
        });
    },
    /**
   * Validates that the value is an Array of the given element type.
   * @param element The validator for the elements of the array.
   */ array: (element)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VArray"]({
            isOptional: "required",
            element
        });
    },
    /**
   * Validates that the value is an Object with the given properties.
   * @param fields An object specifying the validator for each property.
   */ object: (fields)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VObject"]({
            isOptional: "required",
            fields
        });
    },
    /**
   * Validates that the value is a Record with keys and values that match the given types.
   * @param keys The validator for the keys of the record. This cannot contain string literals.
   * @param values The validator for the values of the record.
   */ record: (keys, values)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VRecord"]({
            isOptional: "required",
            key: keys,
            value: values
        });
    },
    /**
   * Validates that the value matches one of the given validators.
   * @param members The validators to match against.
   */ union: (...members)=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VUnion"]({
            isOptional: "required",
            members
        });
    },
    /**
   * Does not validate the value.
   */ any: ()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VAny"]({
            isOptional: "required"
        });
    },
    /**
   * Allows not specifying a value for a property in an Object.
   * @param value The property value validator to make optional.
   *
   * ```typescript
   * const objectWithOptionalFields = v.object({
   *   requiredField: v.string(),
   *   optionalField: v.optional(v.string()),
   * });
   * ```
   */ optional: (value)=>{
        return value.asOptional();
    }
}; //# sourceMappingURL=validator.js.map
}),
"[project]/node_modules/convex/dist/esm/values/errors.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConvexError",
    ()=>ConvexError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
;
const IDENTIFYING_FIELD = Symbol.for("ConvexError");
class ConvexError extends (_b = Error, _a = IDENTIFYING_FIELD, _b) {
    constructor(data){
        super(typeof data === "string" ? data : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringifyValueForError"])(data));
        __publicField(this, "name", "ConvexError");
        __publicField(this, "data");
        __publicField(this, _a, true);
        this.data = data;
    }
} //# sourceMappingURL=errors.js.map
}),
"[project]/node_modules/convex/dist/esm/values/compare_utf8.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compareUTF8",
    ()=>compareUTF8,
    "greaterThan",
    ()=>greaterThan,
    "greaterThanEq",
    ()=>greaterThanEq,
    "lessThan",
    ()=>lessThan,
    "lessThanEq",
    ()=>lessThanEq,
    "utf16LengthForCodePoint",
    ()=>utf16LengthForCodePoint
]);
"use strict";
function compareUTF8(a, b) {
    const aLength = a.length;
    const bLength = b.length;
    const length = Math.min(aLength, bLength);
    for(let i = 0; i < length;){
        const aCodePoint = a.codePointAt(i);
        const bCodePoint = b.codePointAt(i);
        if (aCodePoint !== bCodePoint) {
            if (aCodePoint < 128 && bCodePoint < 128) {
                return aCodePoint - bCodePoint;
            }
            const aLength2 = utf8Bytes(aCodePoint, aBytes);
            const bLength2 = utf8Bytes(bCodePoint, bBytes);
            return compareArrays(aBytes, aLength2, bBytes, bLength2);
        }
        i += utf16LengthForCodePoint(aCodePoint);
    }
    return aLength - bLength;
}
function compareArrays(a, aLength, b, bLength) {
    const length = Math.min(aLength, bLength);
    for(let i = 0; i < length; i++){
        const aValue = a[i];
        const bValue = b[i];
        if (aValue !== bValue) {
            return aValue - bValue;
        }
    }
    return aLength - bLength;
}
function utf16LengthForCodePoint(aCodePoint) {
    return aCodePoint > 65535 ? 2 : 1;
}
const arr = ()=>Array.from({
        length: 4
    }, ()=>0);
const aBytes = arr();
const bBytes = arr();
function utf8Bytes(codePoint, bytes) {
    if (codePoint < 128) {
        bytes[0] = codePoint;
        return 1;
    }
    let count;
    let offset;
    if (codePoint <= 2047) {
        count = 1;
        offset = 192;
    } else if (codePoint <= 65535) {
        count = 2;
        offset = 224;
    } else if (codePoint <= 1114111) {
        count = 3;
        offset = 240;
    } else {
        throw new Error("Invalid code point");
    }
    bytes[0] = (codePoint >> 6 * count) + offset;
    let i = 1;
    for(; count > 0; count--){
        const temp = codePoint >> 6 * (count - 1);
        bytes[i++] = 128 | temp & 63;
    }
    return i;
}
function greaterThan(a, b) {
    return compareUTF8(a, b) > 0;
}
function greaterThanEq(a, b) {
    return compareUTF8(a, b) >= 0;
}
function lessThan(a, b) {
    return compareUTF8(a, b) < 0;
}
function lessThanEq(a, b) {
    return compareUTF8(a, b) <= 0;
} //# sourceMappingURL=compare_utf8.js.map
}),
"[project]/node_modules/convex/dist/esm/values/compare.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compareValues",
    ()=>compareValues
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$compare_utf8$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/compare_utf8.js [app-rsc] (ecmascript)");
"use strict";
;
function compareValues(k1, k2) {
    return compareAsTuples(makeComparable(k1), makeComparable(k2));
}
function compareAsTuples(a, b) {
    if (a[0] === b[0]) {
        return compareSameTypeValues(a[1], b[1]);
    } else if (a[0] < b[0]) {
        return -1;
    }
    return 1;
}
function compareSameTypeValues(v1, v2) {
    if (v1 === void 0 || v1 === null) {
        return 0;
    }
    if (typeof v1 === "number") {
        if (typeof v2 !== "number") {
            throw new Error(`Unexpected type ${v2}`);
        }
        return compareNumbers(v1, v2);
    }
    if (typeof v1 === "string") {
        if (typeof v2 !== "string") {
            throw new Error(`Unexpected type ${v2}`);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$compare_utf8$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["compareUTF8"])(v1, v2);
    }
    if (typeof v1 === "bigint" || typeof v1 === "boolean" || typeof v1 === "string") {
        return v1 < v2 ? -1 : v1 === v2 ? 0 : 1;
    }
    if (!Array.isArray(v1) || !Array.isArray(v2)) {
        throw new Error(`Unexpected type ${v1}`);
    }
    for(let i = 0; i < v1.length && i < v2.length; i++){
        const cmp = compareAsTuples(v1[i], v2[i]);
        if (cmp !== 0) {
            return cmp;
        }
    }
    if (v1.length < v2.length) {
        return -1;
    }
    if (v1.length > v2.length) {
        return 1;
    }
    return 0;
}
function compareNumbers(v1, v2) {
    if (isNaN(v1) || isNaN(v2)) {
        const buffer1 = new ArrayBuffer(8);
        const buffer2 = new ArrayBuffer(8);
        new DataView(buffer1).setFloat64(0, v1, /* little-endian */ true);
        new DataView(buffer2).setFloat64(0, v2, /* little-endian */ true);
        const v1Bits = BigInt(new DataView(buffer1).getBigInt64(0, /* little-endian */ true));
        const v2Bits = BigInt(new DataView(buffer2).getBigInt64(0, /* little-endian */ true));
        const v1Sign = (v1Bits & 0x8000000000000000n) !== 0n;
        const v2Sign = (v2Bits & 0x8000000000000000n) !== 0n;
        if (isNaN(v1) !== isNaN(v2)) {
            if (isNaN(v1)) {
                return v1Sign ? -1 : 1;
            }
            return v2Sign ? 1 : -1;
        }
        if (v1Sign !== v2Sign) {
            return v1Sign ? -1 : 1;
        }
        return v1Bits < v2Bits ? -1 : v1Bits === v2Bits ? 0 : 1;
    }
    if (Object.is(v1, v2)) {
        return 0;
    }
    if (Object.is(v1, -0)) {
        return Object.is(v2, 0) ? -1 : -Math.sign(v2);
    }
    if (Object.is(v2, -0)) {
        return Object.is(v1, 0) ? 1 : Math.sign(v1);
    }
    return v1 < v2 ? -1 : 1;
}
function makeComparable(v) {
    if (v === void 0) {
        return [
            0,
            void 0
        ];
    }
    if (v === null) {
        return [
            1,
            null
        ];
    }
    if (typeof v === "bigint") {
        return [
            2,
            v
        ];
    }
    if (typeof v === "number") {
        return [
            3,
            v
        ];
    }
    if (typeof v === "boolean") {
        return [
            4,
            v
        ];
    }
    if (typeof v === "string") {
        return [
            5,
            v
        ];
    }
    if (v instanceof ArrayBuffer) {
        return [
            6,
            Array.from(new Uint8Array(v)).map(makeComparable)
        ];
    }
    if (Array.isArray(v)) {
        return [
            7,
            v.map(makeComparable)
        ];
    }
    const keys = Object.keys(v).sort();
    const pojo = keys.map((k)=>[
            k,
            v[k]
        ]);
    return [
        8,
        pojo.map(makeComparable)
    ];
} //# sourceMappingURL=compare.js.map
}),
"[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/base64.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/errors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$compare$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/compare.js [app-rsc] (ecmascript)"); //# sourceMappingURL=index.js.map
"use strict";
;
;
;
;
;
;
}),
"[project]/node_modules/convex/dist/esm/browser/logging.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultLogger",
    ()=>DefaultLogger,
    "createHybridErrorStacktrace",
    ()=>createHybridErrorStacktrace,
    "forwardData",
    ()=>forwardData,
    "instantiateDefaultLogger",
    ()=>instantiateDefaultLogger,
    "instantiateNoopLogger",
    ()=>instantiateNoopLogger,
    "logFatalError",
    ()=>logFatalError,
    "logForFunction",
    ()=>logForFunction
]);
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const INFO_COLOR = "color:rgb(0, 145, 255)";
function prefix_for_source(source) {
    switch(source){
        case "query":
            return "Q";
        case "mutation":
            return "M";
        case "action":
            return "A";
        case "any":
            return "?";
    }
}
class DefaultLogger {
    constructor(options){
        __publicField(this, "_onLogLineFuncs");
        __publicField(this, "_verbose");
        this._onLogLineFuncs = {};
        this._verbose = options.verbose;
    }
    addLogLineListener(func) {
        let id = Math.random().toString(36).substring(2, 15);
        for(let i = 0; i < 10; i++){
            if (this._onLogLineFuncs[id] === void 0) {
                break;
            }
            id = Math.random().toString(36).substring(2, 15);
        }
        this._onLogLineFuncs[id] = func;
        return ()=>{
            delete this._onLogLineFuncs[id];
        };
    }
    logVerbose(...args) {
        if (this._verbose) {
            for (const func of Object.values(this._onLogLineFuncs)){
                func("debug", `${/* @__PURE__ */ new Date().toISOString()}`, ...args);
            }
        }
    }
    log(...args) {
        for (const func of Object.values(this._onLogLineFuncs)){
            func("info", ...args);
        }
    }
    warn(...args) {
        for (const func of Object.values(this._onLogLineFuncs)){
            func("warn", ...args);
        }
    }
    error(...args) {
        for (const func of Object.values(this._onLogLineFuncs)){
            func("error", ...args);
        }
    }
}
function instantiateDefaultLogger(options) {
    const logger = new DefaultLogger(options);
    logger.addLogLineListener((level, ...args)=>{
        switch(level){
            case "debug":
                console.debug(...args);
                break;
            case "info":
                console.log(...args);
                break;
            case "warn":
                console.warn(...args);
                break;
            case "error":
                console.error(...args);
                break;
            default:
                {
                    level;
                    console.log(...args);
                }
        }
    });
    return logger;
}
function instantiateNoopLogger(options) {
    return new DefaultLogger(options);
}
function logForFunction(logger, type, source, udfPath, message) {
    const prefix = prefix_for_source(source);
    if (typeof message === "object") {
        message = `ConvexError ${JSON.stringify(message.errorData, null, 2)}`;
    }
    if (type === "info") {
        const match = message.match(/^\[.*?\] /);
        if (match === null) {
            logger.error(`[CONVEX ${prefix}(${udfPath})] Could not parse console.log`);
            return;
        }
        const level = message.slice(1, match[0].length - 2);
        const args = message.slice(match[0].length);
        logger.log(`%c[CONVEX ${prefix}(${udfPath})] [${level}]`, INFO_COLOR, args);
    } else {
        logger.error(`[CONVEX ${prefix}(${udfPath})] ${message}`);
    }
}
function logFatalError(logger, message) {
    const errorMessage = `[CONVEX FATAL ERROR] ${message}`;
    logger.error(errorMessage);
    return new Error(errorMessage);
}
function createHybridErrorStacktrace(source, udfPath, result) {
    const prefix = prefix_for_source(source);
    return `[CONVEX ${prefix}(${udfPath})] ${result.errorMessage}
  Called by client`;
}
function forwardData(result, error) {
    error.data = result.errorData;
    return error;
} //# sourceMappingURL=logging.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/sync/udf_path_utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canonicalizeUdfPath",
    ()=>canonicalizeUdfPath,
    "serializePathAndArgs",
    ()=>serializePathAndArgs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
"use strict";
;
function canonicalizeUdfPath(udfPath) {
    const pieces = udfPath.split(":");
    let moduleName;
    let functionName;
    if (pieces.length === 1) {
        moduleName = pieces[0];
        functionName = "default";
    } else {
        moduleName = pieces.slice(0, pieces.length - 1).join(":");
        functionName = pieces[pieces.length - 1];
    }
    if (moduleName.endsWith(".js")) {
        moduleName = moduleName.slice(0, -3);
    }
    return `${moduleName}:${functionName}`;
}
function serializePathAndArgs(udfPath, args) {
    return JSON.stringify({
        udfPath: canonicalizeUdfPath(udfPath),
        args: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(args)
    });
} //# sourceMappingURL=udf_path_utils.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/sync/local_state.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocalSyncState",
    ()=>LocalSyncState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/udf_path_utils.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
class LocalSyncState {
    constructor(){
        __publicField(this, "nextQueryId");
        __publicField(this, "querySetVersion");
        __publicField(this, "querySet");
        __publicField(this, "queryIdToToken");
        __publicField(this, "identityVersion");
        __publicField(this, "auth");
        __publicField(this, "outstandingQueriesOlderThanRestart");
        __publicField(this, "outstandingAuthOlderThanRestart");
        __publicField(this, "paused");
        __publicField(this, "pendingQuerySetModifications");
        this.nextQueryId = 0;
        this.querySetVersion = 0;
        this.identityVersion = 0;
        this.querySet = /* @__PURE__ */ new Map();
        this.queryIdToToken = /* @__PURE__ */ new Map();
        this.outstandingQueriesOlderThanRestart = /* @__PURE__ */ new Set();
        this.outstandingAuthOlderThanRestart = false;
        this.paused = false;
        this.pendingQuerySetModifications = /* @__PURE__ */ new Map();
    }
    hasSyncedPastLastReconnect() {
        return this.outstandingQueriesOlderThanRestart.size === 0 && !this.outstandingAuthOlderThanRestart;
    }
    markAuthCompletion() {
        this.outstandingAuthOlderThanRestart = false;
    }
    subscribe(udfPath, args, journal, componentPath) {
        const canonicalizedUdfPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["canonicalizeUdfPath"])(udfPath);
        const queryToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializePathAndArgs"])(canonicalizedUdfPath, args);
        const existingEntry = this.querySet.get(queryToken);
        if (existingEntry !== void 0) {
            existingEntry.numSubscribers += 1;
            return {
                queryToken,
                modification: null,
                unsubscribe: ()=>this.removeSubscriber(queryToken)
            };
        } else {
            const queryId = this.nextQueryId++;
            const query = {
                id: queryId,
                canonicalizedUdfPath,
                args,
                numSubscribers: 1,
                journal,
                componentPath
            };
            this.querySet.set(queryToken, query);
            this.queryIdToToken.set(queryId, queryToken);
            const baseVersion = this.querySetVersion;
            const newVersion = this.querySetVersion + 1;
            const add = {
                type: "Add",
                queryId,
                udfPath: canonicalizedUdfPath,
                args: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(args)
                ],
                journal,
                componentPath
            };
            if (this.paused) {
                this.pendingQuerySetModifications.set(queryId, add);
            } else {
                this.querySetVersion = newVersion;
            }
            const modification = {
                type: "ModifyQuerySet",
                baseVersion,
                newVersion,
                modifications: [
                    add
                ]
            };
            return {
                queryToken,
                modification,
                unsubscribe: ()=>this.removeSubscriber(queryToken)
            };
        }
    }
    transition(transition) {
        for (const modification of transition.modifications){
            switch(modification.type){
                case "QueryUpdated":
                case "QueryFailed":
                    {
                        this.outstandingQueriesOlderThanRestart.delete(modification.queryId);
                        const journal = modification.journal;
                        if (journal !== void 0) {
                            const queryToken = this.queryIdToToken.get(modification.queryId);
                            if (queryToken !== void 0) {
                                this.querySet.get(queryToken).journal = journal;
                            }
                        }
                        break;
                    }
                case "QueryRemoved":
                    {
                        this.outstandingQueriesOlderThanRestart.delete(modification.queryId);
                        break;
                    }
                default:
                    {
                        modification;
                        throw new Error(`Invalid modification ${modification.type}`);
                    }
            }
        }
    }
    queryId(udfPath, args) {
        const canonicalizedUdfPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["canonicalizeUdfPath"])(udfPath);
        const queryToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializePathAndArgs"])(canonicalizedUdfPath, args);
        const existingEntry = this.querySet.get(queryToken);
        if (existingEntry !== void 0) {
            return existingEntry.id;
        }
        return null;
    }
    isCurrentOrNewerAuthVersion(version) {
        return version >= this.identityVersion;
    }
    setAuth(value) {
        this.auth = {
            tokenType: "User",
            value
        };
        const baseVersion = this.identityVersion;
        if (!this.paused) {
            this.identityVersion = baseVersion + 1;
        }
        return {
            type: "Authenticate",
            baseVersion,
            ...this.auth
        };
    }
    setAdminAuth(value, actingAs) {
        const auth = {
            tokenType: "Admin",
            value,
            impersonating: actingAs
        };
        this.auth = auth;
        const baseVersion = this.identityVersion;
        if (!this.paused) {
            this.identityVersion = baseVersion + 1;
        }
        return {
            type: "Authenticate",
            baseVersion,
            ...auth
        };
    }
    clearAuth() {
        this.auth = void 0;
        this.markAuthCompletion();
        const baseVersion = this.identityVersion;
        if (!this.paused) {
            this.identityVersion = baseVersion + 1;
        }
        return {
            type: "Authenticate",
            tokenType: "None",
            baseVersion
        };
    }
    hasAuth() {
        return !!this.auth;
    }
    isNewAuth(value) {
        return this.auth?.value !== value;
    }
    queryPath(queryId) {
        const pathAndArgs = this.queryIdToToken.get(queryId);
        if (pathAndArgs) {
            return this.querySet.get(pathAndArgs).canonicalizedUdfPath;
        }
        return null;
    }
    queryArgs(queryId) {
        const pathAndArgs = this.queryIdToToken.get(queryId);
        if (pathAndArgs) {
            return this.querySet.get(pathAndArgs).args;
        }
        return null;
    }
    queryToken(queryId) {
        return this.queryIdToToken.get(queryId) ?? null;
    }
    queryJournal(queryToken) {
        return this.querySet.get(queryToken)?.journal;
    }
    restart(oldRemoteQueryResults) {
        this.unpause();
        this.outstandingQueriesOlderThanRestart.clear();
        const modifications = [];
        for (const localQuery of this.querySet.values()){
            const add = {
                type: "Add",
                queryId: localQuery.id,
                udfPath: localQuery.canonicalizedUdfPath,
                args: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(localQuery.args)
                ],
                journal: localQuery.journal,
                componentPath: localQuery.componentPath
            };
            modifications.push(add);
            if (!oldRemoteQueryResults.has(localQuery.id)) {
                this.outstandingQueriesOlderThanRestart.add(localQuery.id);
            }
        }
        this.querySetVersion = 1;
        const querySet = {
            type: "ModifyQuerySet",
            baseVersion: 0,
            newVersion: 1,
            modifications
        };
        if (!this.auth) {
            this.identityVersion = 0;
            return [
                querySet,
                void 0
            ];
        }
        this.outstandingAuthOlderThanRestart = true;
        const authenticate = {
            type: "Authenticate",
            baseVersion: 0,
            ...this.auth
        };
        this.identityVersion = 1;
        return [
            querySet,
            authenticate
        ];
    }
    pause() {
        this.paused = true;
    }
    resume() {
        const querySet = this.pendingQuerySetModifications.size > 0 ? {
            type: "ModifyQuerySet",
            baseVersion: this.querySetVersion,
            newVersion: ++this.querySetVersion,
            modifications: Array.from(this.pendingQuerySetModifications.values())
        } : void 0;
        const authenticate = this.auth !== void 0 ? {
            type: "Authenticate",
            baseVersion: this.identityVersion++,
            ...this.auth
        } : void 0;
        this.unpause();
        return [
            querySet,
            authenticate
        ];
    }
    unpause() {
        this.paused = false;
        this.pendingQuerySetModifications.clear();
    }
    removeSubscriber(queryToken) {
        const localQuery = this.querySet.get(queryToken);
        if (localQuery.numSubscribers > 1) {
            localQuery.numSubscribers -= 1;
            return null;
        } else {
            this.querySet.delete(queryToken);
            this.queryIdToToken.delete(localQuery.id);
            this.outstandingQueriesOlderThanRestart.delete(localQuery.id);
            const baseVersion = this.querySetVersion;
            const newVersion = this.querySetVersion + 1;
            const remove = {
                type: "Remove",
                queryId: localQuery.id
            };
            if (this.paused) {
                if (this.pendingQuerySetModifications.has(localQuery.id)) {
                    this.pendingQuerySetModifications.delete(localQuery.id);
                } else {
                    this.pendingQuerySetModifications.set(localQuery.id, remove);
                }
            } else {
                this.querySetVersion = newVersion;
            }
            return {
                type: "ModifyQuerySet",
                baseVersion,
                newVersion,
                modifications: [
                    remove
                ]
            };
        }
    }
} //# sourceMappingURL=local_state.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/sync/request_manager.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequestManager",
    ()=>RequestManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/logging.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
class RequestManager {
    constructor(logger, markConnectionStateDirty){
        this.logger = logger;
        this.markConnectionStateDirty = markConnectionStateDirty;
        __publicField(this, "inflightRequests");
        __publicField(this, "requestsOlderThanRestart");
        __publicField(this, "inflightMutationsCount", 0);
        __publicField(this, "inflightActionsCount", 0);
        this.inflightRequests = /* @__PURE__ */ new Map();
        this.requestsOlderThanRestart = /* @__PURE__ */ new Set();
    }
    request(message, sent) {
        const result = new Promise((resolve)=>{
            const status = sent ? "Requested" : "NotSent";
            this.inflightRequests.set(message.requestId, {
                message,
                status: {
                    status,
                    requestedAt: /* @__PURE__ */ new Date(),
                    onResult: resolve
                }
            });
            if (message.type === "Mutation") {
                this.inflightMutationsCount++;
            } else if (message.type === "Action") {
                this.inflightActionsCount++;
            }
        });
        this.markConnectionStateDirty();
        return result;
    }
    /**
   * Update the state after receiving a response.
   *
   * @returns A RequestId if the request is complete and its optimistic update
   * can be dropped, null otherwise.
   */ onResponse(response) {
        const requestInfo = this.inflightRequests.get(response.requestId);
        if (requestInfo === void 0) {
            return null;
        }
        if (requestInfo.status.status === "Completed") {
            return null;
        }
        const udfType = requestInfo.message.type === "Mutation" ? "mutation" : "action";
        const udfPath = requestInfo.message.udfPath;
        for (const line of response.logLines){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logForFunction"])(this.logger, "info", udfType, udfPath, line);
        }
        const status = requestInfo.status;
        let result;
        let onResolve;
        if (response.success) {
            result = {
                success: true,
                logLines: response.logLines,
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(response.result)
            };
            onResolve = ()=>status.onResult(result);
        } else {
            const errorMessage = response.result;
            const { errorData } = response;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logForFunction"])(this.logger, "error", udfType, udfPath, errorMessage);
            result = {
                success: false,
                errorMessage,
                errorData: errorData !== void 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(errorData) : void 0,
                logLines: response.logLines
            };
            onResolve = ()=>status.onResult(result);
        }
        if (response.type === "ActionResponse" || !response.success) {
            onResolve();
            this.inflightRequests.delete(response.requestId);
            this.requestsOlderThanRestart.delete(response.requestId);
            if (requestInfo.message.type === "Action") {
                this.inflightActionsCount--;
            } else if (requestInfo.message.type === "Mutation") {
                this.inflightMutationsCount--;
            }
            this.markConnectionStateDirty();
            return {
                requestId: response.requestId,
                result
            };
        }
        requestInfo.status = {
            status: "Completed",
            result,
            ts: response.ts,
            onResolve
        };
        return null;
    }
    // Remove and returns completed requests.
    removeCompleted(ts) {
        const completeRequests = /* @__PURE__ */ new Map();
        for (const [requestId, requestInfo] of this.inflightRequests.entries()){
            const status = requestInfo.status;
            if (status.status === "Completed" && status.ts.lessThanOrEqual(ts)) {
                status.onResolve();
                completeRequests.set(requestId, status.result);
                if (requestInfo.message.type === "Mutation") {
                    this.inflightMutationsCount--;
                } else if (requestInfo.message.type === "Action") {
                    this.inflightActionsCount--;
                }
                this.inflightRequests.delete(requestId);
                this.requestsOlderThanRestart.delete(requestId);
            }
        }
        if (completeRequests.size > 0) {
            this.markConnectionStateDirty();
        }
        return completeRequests;
    }
    restart() {
        this.requestsOlderThanRestart = new Set(this.inflightRequests.keys());
        const allMessages = [];
        for (const [requestId, value] of this.inflightRequests){
            if (value.status.status === "NotSent") {
                value.status.status = "Requested";
                allMessages.push(value.message);
                continue;
            }
            if (value.message.type === "Mutation") {
                allMessages.push(value.message);
            } else if (value.message.type === "Action") {
                this.inflightRequests.delete(requestId);
                this.requestsOlderThanRestart.delete(requestId);
                this.inflightActionsCount--;
                if (value.status.status === "Completed") {
                    throw new Error("Action should never be in 'Completed' state");
                }
                value.status.onResult({
                    success: false,
                    errorMessage: "Connection lost while action was in flight",
                    logLines: []
                });
            }
        }
        this.markConnectionStateDirty();
        return allMessages;
    }
    resume() {
        const allMessages = [];
        for (const [, value] of this.inflightRequests){
            if (value.status.status === "NotSent") {
                value.status.status = "Requested";
                allMessages.push(value.message);
                continue;
            }
        }
        return allMessages;
    }
    /**
   * @returns true if there are any requests that have been requested but have
   * not be completed yet.
   */ hasIncompleteRequests() {
        for (const requestInfo of this.inflightRequests.values()){
            if (requestInfo.status.status === "Requested") {
                return true;
            }
        }
        return false;
    }
    /**
   * @returns true if there are any inflight requests, including ones that have
   * completed on the server, but have not been applied.
   */ hasInflightRequests() {
        return this.inflightRequests.size > 0;
    }
    /**
   * @returns true if there are any inflight requests, that have been hanging around
   * since prior to the most recent restart.
   */ hasSyncedPastLastReconnect() {
        return this.requestsOlderThanRestart.size === 0;
    }
    timeOfOldestInflightRequest() {
        if (this.inflightRequests.size === 0) {
            return null;
        }
        let oldestInflightRequest = Date.now();
        for (const request of this.inflightRequests.values()){
            if (request.status.status !== "Completed") {
                if (request.status.requestedAt.getTime() < oldestInflightRequest) {
                    oldestInflightRequest = request.status.requestedAt.getTime();
                }
            }
        }
        return new Date(oldestInflightRequest);
    }
    /**
   * @returns The number of mutations currently in flight.
   */ inflightMutations() {
        return this.inflightMutationsCount;
    }
    /**
   * @returns The number of actions currently in flight.
   */ inflightActions() {
        return this.inflightActionsCount;
    }
} //# sourceMappingURL=request_manager.js.map
}),
"[project]/node_modules/convex/dist/esm/server/functionName.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functionName",
    ()=>functionName
]);
"use strict";
const functionName = Symbol.for("functionName"); //# sourceMappingURL=functionName.js.map
}),
"[project]/node_modules/convex/dist/esm/server/components/paths.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractReferencePath",
    ()=>extractReferencePath,
    "getFunctionAddress",
    ()=>getFunctionAddress,
    "isFunctionHandle",
    ()=>isFunctionHandle,
    "setReferencePath",
    ()=>setReferencePath,
    "toReferencePath",
    ()=>toReferencePath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/functionName.js [app-rsc] (ecmascript)");
"use strict";
;
const toReferencePath = Symbol.for("toReferencePath");
function setReferencePath(obj, value) {
    obj[toReferencePath] = value;
}
function extractReferencePath(reference) {
    return reference[toReferencePath] ?? null;
}
function isFunctionHandle(s) {
    return s.startsWith("function://");
}
function getFunctionAddress(functionReference) {
    let functionAddress;
    if (typeof functionReference === "string") {
        if (isFunctionHandle(functionReference)) {
            functionAddress = {
                functionHandle: functionReference
            };
        } else {
            functionAddress = {
                name: functionReference
            };
        }
    } else if (functionReference[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["functionName"]]) {
        functionAddress = {
            name: functionReference[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["functionName"]]
        };
    } else {
        const referencePath = extractReferencePath(functionReference);
        if (!referencePath) {
            throw new Error(`${functionReference} is not a functionReference`);
        }
        functionAddress = {
            reference: referencePath
        };
    }
    return functionAddress;
} //# sourceMappingURL=paths.js.map
}),
"[project]/node_modules/convex/dist/esm/server/api.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "anyApi",
    ()=>anyApi,
    "filterApi",
    ()=>filterApi,
    "getFunctionName",
    ()=>getFunctionName,
    "justActions",
    ()=>justActions,
    "justInternal",
    ()=>justInternal,
    "justMutations",
    ()=>justMutations,
    "justPaginatedQueries",
    ()=>justPaginatedQueries,
    "justPublic",
    ()=>justPublic,
    "justQueries",
    ()=>justQueries,
    "justSchedulable",
    ()=>justSchedulable,
    "makeFunctionReference",
    ()=>makeFunctionReference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/functionName.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/components/paths.js [app-rsc] (ecmascript)");
"use strict";
;
;
function getFunctionName(functionReference) {
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionAddress"])(functionReference);
    if (address.name === void 0) {
        if (address.functionHandle !== void 0) {
            throw new Error(`Expected function reference like "api.file.func" or "internal.file.func", but received function handle ${address.functionHandle}`);
        } else if (address.reference !== void 0) {
            throw new Error(`Expected function reference in the current component like "api.file.func" or "internal.file.func", but received reference ${address.reference}`);
        }
        throw new Error(`Expected function reference like "api.file.func" or "internal.file.func", but received ${JSON.stringify(address)}`);
    }
    if (typeof functionReference === "string") return functionReference;
    const name = functionReference[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["functionName"]];
    if (!name) {
        throw new Error(`${functionReference} is not a functionReference`);
    }
    return name;
}
function makeFunctionReference(name) {
    return {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["functionName"]]: name
    };
}
function createApi(pathParts = []) {
    const handler = {
        get (_, prop) {
            if (typeof prop === "string") {
                const newParts = [
                    ...pathParts,
                    prop
                ];
                return createApi(newParts);
            } else if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$functionName$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["functionName"]) {
                if (pathParts.length < 2) {
                    const found = [
                        "api",
                        ...pathParts
                    ].join(".");
                    throw new Error(`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${found}\``);
                }
                const path = pathParts.slice(0, -1).join("/");
                const exportName = pathParts[pathParts.length - 1];
                if (exportName === "default") {
                    return path;
                } else {
                    return path + ":" + exportName;
                }
            } else if (prop === Symbol.toStringTag) {
                return "FunctionReference";
            } else {
                return void 0;
            }
        }
    };
    return new Proxy({}, handler);
}
function filterApi(api) {
    return api;
}
function justInternal(api) {
    return api;
}
function justPublic(api) {
    return api;
}
function justQueries(api) {
    return api;
}
function justMutations(api) {
    return api;
}
function justActions(api) {
    return api;
}
function justPaginatedQueries(api) {
    return api;
}
function justSchedulable(api) {
    return api;
}
const anyApi = createApi(); //# sourceMappingURL=api.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/sync/optimistic_updates_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OptimisticQueryResults",
    ()=>OptimisticQueryResults
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/logging.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/udf_path_utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/errors.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
;
;
class OptimisticLocalStoreImpl {
    constructor(queryResults){
        // A references of the query results in OptimisticQueryResults
        __publicField(this, "queryResults");
        // All of the queries modified by this class
        __publicField(this, "modifiedQueries");
        this.queryResults = queryResults;
        this.modifiedQueries = [];
    }
    getQuery(query, ...args) {
        const queryArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args[0]);
        const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(query);
        const queryResult = this.queryResults.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializePathAndArgs"])(name, queryArgs));
        if (queryResult === void 0) {
            return void 0;
        }
        return OptimisticLocalStoreImpl.queryValue(queryResult.result);
    }
    getAllQueries(query) {
        const queriesWithName = [];
        const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(query);
        for (const queryResult of this.queryResults.values()){
            if (queryResult.udfPath === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["canonicalizeUdfPath"])(name)) {
                queriesWithName.push({
                    args: queryResult.args,
                    value: OptimisticLocalStoreImpl.queryValue(queryResult.result)
                });
            }
        }
        return queriesWithName;
    }
    setQuery(queryReference, args, value) {
        const queryArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
        const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(queryReference);
        const queryToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializePathAndArgs"])(name, queryArgs);
        let result;
        if (value === void 0) {
            result = void 0;
        } else {
            result = {
                success: true,
                value,
                // It's an optimistic update, so there are no function logs to show.
                logLines: []
            };
        }
        const query = {
            udfPath: name,
            args: queryArgs,
            result
        };
        this.queryResults.set(queryToken, query);
        this.modifiedQueries.push(queryToken);
    }
    static queryValue(result) {
        if (result === void 0) {
            return void 0;
        } else if (result.success) {
            return result.value;
        } else {
            return void 0;
        }
    }
}
class OptimisticQueryResults {
    constructor(){
        __publicField(this, "queryResults");
        __publicField(this, "optimisticUpdates");
        this.queryResults = /* @__PURE__ */ new Map();
        this.optimisticUpdates = [];
    }
    /**
   * Apply all optimistic updates on top of server query results
   */ ingestQueryResultsFromServer(serverQueryResults, optimisticUpdatesToDrop) {
        this.optimisticUpdates = this.optimisticUpdates.filter((updateAndId)=>{
            return !optimisticUpdatesToDrop.has(updateAndId.mutationId);
        });
        const oldQueryResults = this.queryResults;
        this.queryResults = new Map(serverQueryResults);
        const localStore = new OptimisticLocalStoreImpl(this.queryResults);
        for (const updateAndId of this.optimisticUpdates){
            updateAndId.update(localStore);
        }
        const changedQueries = [];
        for (const [queryToken, query] of this.queryResults){
            const oldQuery = oldQueryResults.get(queryToken);
            if (oldQuery === void 0 || oldQuery.result !== query.result) {
                changedQueries.push(queryToken);
            }
        }
        return changedQueries;
    }
    applyOptimisticUpdate(update, mutationId) {
        this.optimisticUpdates.push({
            update,
            mutationId
        });
        const localStore = new OptimisticLocalStoreImpl(this.queryResults);
        update(localStore);
        return localStore.modifiedQueries;
    }
    /**
   * @internal
   */ rawQueryResult(queryToken) {
        return this.queryResults.get(queryToken);
    }
    queryResult(queryToken) {
        const query = this.queryResults.get(queryToken);
        if (query === void 0) {
            return void 0;
        }
        const result = query.result;
        if (result === void 0) {
            return void 0;
        } else if (result.success) {
            return result.value;
        } else {
            if (result.errorData !== void 0) {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardData"])(result, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConvexError"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHybridErrorStacktrace"])("query", query.udfPath, result)));
            }
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHybridErrorStacktrace"])("query", query.udfPath, result));
        }
    }
    hasQueryResult(queryToken) {
        return this.queryResults.get(queryToken) !== void 0;
    }
    /**
   * @internal
   */ queryLogs(queryToken) {
        const query = this.queryResults.get(queryToken);
        return query?.result?.logLines;
    }
} //# sourceMappingURL=optimistic_updates_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/long.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Long",
    ()=>Long
]);
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class Long {
    constructor(low, high){
        __publicField(this, "low");
        __publicField(this, "high");
        __publicField(this, "__isUnsignedLong__");
        this.low = low | 0;
        this.high = high | 0;
        this.__isUnsignedLong__ = true;
    }
    static isLong(obj) {
        return (obj && obj.__isUnsignedLong__) === true;
    }
    // prettier-ignore
    static fromBytesLE(bytes) {
        return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24);
    }
    // prettier-ignore
    toBytesLE() {
        const hi = this.high;
        const lo = this.low;
        return [
            lo & 255,
            lo >>> 8 & 255,
            lo >>> 16 & 255,
            lo >>> 24,
            hi & 255,
            hi >>> 8 & 255,
            hi >>> 16 & 255,
            hi >>> 24
        ];
    }
    static fromNumber(value) {
        if (isNaN(value)) return UZERO;
        if (value < 0) return UZERO;
        if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
        return new Long(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0);
    }
    toString() {
        return (BigInt(this.high) * BigInt(TWO_PWR_32_DBL) + BigInt(this.low)).toString();
    }
    equals(other) {
        if (!Long.isLong(other)) other = Long.fromValue(other);
        if (this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
        return this.high === other.high && this.low === other.low;
    }
    notEquals(other) {
        return !this.equals(other);
    }
    comp(other) {
        if (!Long.isLong(other)) other = Long.fromValue(other);
        if (this.equals(other)) return 0;
        return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
    }
    lessThanOrEqual(other) {
        return this.comp(/* validates */ other) <= 0;
    }
    static fromValue(val) {
        if (typeof val === "number") return Long.fromNumber(val);
        return new Long(val.low, val.high);
    }
}
const UZERO = new Long(0, 0);
const TWO_PWR_16_DBL = 1 << 16;
const TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
const TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
const MAX_UNSIGNED_VALUE = new Long(4294967295 | 0, 4294967295 | 0); //# sourceMappingURL=long.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/sync/remote_query_set.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RemoteQuerySet",
    ()=>RemoteQuerySet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$long$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/long.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/logging.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
class RemoteQuerySet {
    constructor(queryPath, logger){
        __publicField(this, "version");
        __publicField(this, "remoteQuerySet");
        __publicField(this, "queryPath");
        __publicField(this, "logger");
        this.version = {
            querySet: 0,
            ts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$long$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Long"].fromNumber(0),
            identity: 0
        };
        this.remoteQuerySet = /* @__PURE__ */ new Map();
        this.queryPath = queryPath;
        this.logger = logger;
    }
    transition(transition) {
        const start = transition.startVersion;
        if (this.version.querySet !== start.querySet || this.version.ts.notEquals(start.ts) || this.version.identity !== start.identity) {
            throw new Error(`Invalid start version: ${start.ts.toString()}:${start.querySet}`);
        }
        for (const modification of transition.modifications){
            switch(modification.type){
                case "QueryUpdated":
                    {
                        const queryPath = this.queryPath(modification.queryId);
                        if (queryPath) {
                            for (const line of modification.logLines){
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logForFunction"])(this.logger, "info", "query", queryPath, line);
                            }
                        }
                        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(modification.value ?? null);
                        this.remoteQuerySet.set(modification.queryId, {
                            success: true,
                            value,
                            logLines: modification.logLines
                        });
                        break;
                    }
                case "QueryFailed":
                    {
                        const queryPath = this.queryPath(modification.queryId);
                        if (queryPath) {
                            for (const line of modification.logLines){
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logForFunction"])(this.logger, "info", "query", queryPath, line);
                            }
                        }
                        const { errorData } = modification;
                        this.remoteQuerySet.set(modification.queryId, {
                            success: false,
                            errorMessage: modification.errorMessage,
                            errorData: errorData !== void 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(errorData) : void 0,
                            logLines: modification.logLines
                        });
                        break;
                    }
                case "QueryRemoved":
                    {
                        this.remoteQuerySet.delete(modification.queryId);
                        break;
                    }
                default:
                    {
                        modification;
                        throw new Error(`Invalid modification ${modification.type}`);
                    }
            }
        }
        this.version = transition.endVersion;
    }
    remoteQueryResults() {
        return this.remoteQuerySet;
    }
    timestamp() {
        return this.version.ts;
    }
} //# sourceMappingURL=remote_query_set.js.map
}),
"[project]/node_modules/convex/dist/esm/values/base64.js [app-rsc] (ecmascript) <export * as Base64>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Base64",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/base64.js [app-rsc] (ecmascript)");
}),
"[project]/node_modules/convex/dist/esm/browser/sync/protocol.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodeClientMessage",
    ()=>encodeClientMessage,
    "longToU64",
    ()=>longToU64,
    "parseServerMessage",
    ()=>parseServerMessage,
    "u64ToLong",
    ()=>u64ToLong
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Base64$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/base64.js [app-rsc] (ecmascript) <export * as Base64>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$long$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/long.js [app-rsc] (ecmascript)");
"use strict";
;
;
function u64ToLong(encoded) {
    const integerBytes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Base64$3e$__["Base64"].toByteArray(encoded);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$long$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Long"].fromBytesLE(Array.from(integerBytes));
}
function longToU64(raw) {
    const integerBytes = new Uint8Array(raw.toBytesLE());
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$base64$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Base64$3e$__["Base64"].fromByteArray(integerBytes);
}
function parseServerMessage(encoded) {
    switch(encoded.type){
        case "FatalError":
        case "AuthError":
        case "ActionResponse":
        case "Ping":
            {
                return {
                    ...encoded
                };
            }
        case "MutationResponse":
            {
                if (encoded.success) {
                    return {
                        ...encoded,
                        ts: u64ToLong(encoded.ts)
                    };
                } else {
                    return {
                        ...encoded
                    };
                }
            }
        case "Transition":
            {
                return {
                    ...encoded,
                    startVersion: {
                        ...encoded.startVersion,
                        ts: u64ToLong(encoded.startVersion.ts)
                    },
                    endVersion: {
                        ...encoded.endVersion,
                        ts: u64ToLong(encoded.endVersion.ts)
                    }
                };
            }
        default:
            {
                encoded;
            }
    }
    return void 0;
}
function encodeClientMessage(message) {
    switch(message.type){
        case "Authenticate":
        case "ModifyQuerySet":
        case "Mutation":
        case "Action":
        case "Event":
            {
                return {
                    ...message
                };
            }
        case "Connect":
            {
                if (message.maxObservedTimestamp !== void 0) {
                    return {
                        ...message,
                        maxObservedTimestamp: longToU64(message.maxObservedTimestamp)
                    };
                } else {
                    return {
                        ...message,
                        maxObservedTimestamp: void 0
                    };
                }
            }
        default:
            {
                message;
            }
    }
    return void 0;
} //# sourceMappingURL=protocol.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/sync/web_socket_manager.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebSocketManager",
    ()=>WebSocketManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$protocol$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/protocol.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
const CLOSE_NORMAL = 1e3;
const CLOSE_GOING_AWAY = 1001;
const CLOSE_NO_STATUS = 1005;
const CLOSE_NOT_FOUND = 4040;
let firstTime;
function monotonicMillis() {
    if (firstTime === void 0) {
        firstTime = Date.now();
    }
    if (typeof performance === "undefined" || !performance.now) {
        return Date.now();
    }
    return Math.round(firstTime + performance.now());
}
function prettyNow() {
    return `t=${Math.round((monotonicMillis() - firstTime) / 100) / 10}s`;
}
const serverDisconnectErrors = {
    // A known error, e.g. during a restart or push
    InternalServerError: {
        timeout: 1e3
    },
    // ErrorMetadata::overloaded() messages that we realy should back off
    SubscriptionsWorkerFullError: {
        timeout: 3e3
    },
    TooManyConcurrentRequests: {
        timeout: 3e3
    },
    CommitterFullError: {
        timeout: 3e3
    },
    AwsTooManyRequestsException: {
        timeout: 3e3
    },
    ExecuteFullError: {
        timeout: 3e3
    },
    SystemTimeoutError: {
        timeout: 3e3
    },
    ExpiredInQueue: {
        timeout: 3e3
    },
    // ErrorMetadata::feature_temporarily_unavailable() that typically indicate a deploy just happened
    VectorIndexesUnavailable: {
        timeout: 1e3
    },
    SearchIndexesUnavailable: {
        timeout: 1e3
    },
    TableSummariesUnavailable: {
        timeout: 1e3
    },
    // More ErrorMetadata::overloaded()
    VectorIndexTooLarge: {
        timeout: 3e3
    },
    SearchIndexTooLarge: {
        timeout: 3e3
    },
    TooManyWritesInTimePeriod: {
        timeout: 3e3
    }
};
function classifyDisconnectError(s) {
    if (s === void 0) return "Unknown";
    for (const prefix of Object.keys(serverDisconnectErrors)){
        if (s.startsWith(prefix)) {
            return prefix;
        }
    }
    return "Unknown";
}
class WebSocketManager {
    constructor(uri, callbacks, webSocketConstructor, logger, markConnectionStateDirty, debug){
        this.markConnectionStateDirty = markConnectionStateDirty;
        this.debug = debug;
        __publicField(this, "socket");
        __publicField(this, "connectionCount");
        __publicField(this, "_hasEverConnected", false);
        __publicField(this, "lastCloseReason");
        /** Upon HTTPS/WSS failure, the first jittered backoff duration, in ms. */ __publicField(this, "defaultInitialBackoff");
        /** We backoff exponentially, but we need to cap that--this is the jittered max. */ __publicField(this, "maxBackoff");
        /** How many times have we failed consecutively? */ __publicField(this, "retries");
        /** How long before lack of server response causes us to initiate a reconnect,
     * in ms */ __publicField(this, "serverInactivityThreshold");
        __publicField(this, "reconnectDueToServerInactivityTimeout");
        __publicField(this, "uri");
        __publicField(this, "onOpen");
        __publicField(this, "onResume");
        __publicField(this, "onMessage");
        __publicField(this, "webSocketConstructor");
        __publicField(this, "logger");
        __publicField(this, "onServerDisconnectError");
        this.webSocketConstructor = webSocketConstructor;
        this.socket = {
            state: "disconnected"
        };
        this.connectionCount = 0;
        this.lastCloseReason = "InitialConnect";
        this.defaultInitialBackoff = 1e3;
        this.maxBackoff = 16e3;
        this.retries = 0;
        this.serverInactivityThreshold = 6e4;
        this.reconnectDueToServerInactivityTimeout = null;
        this.uri = uri;
        this.onOpen = callbacks.onOpen;
        this.onResume = callbacks.onResume;
        this.onMessage = callbacks.onMessage;
        this.onServerDisconnectError = callbacks.onServerDisconnectError;
        this.logger = logger;
        this.connect();
    }
    setSocketState(state) {
        this.socket = state;
        this._logVerbose(`socket state changed: ${this.socket.state}, paused: ${"paused" in this.socket ? this.socket.paused : void 0}`);
        this.markConnectionStateDirty();
    }
    connect() {
        if (this.socket.state === "terminated") {
            return;
        }
        if (this.socket.state !== "disconnected" && this.socket.state !== "stopped") {
            throw new Error("Didn't start connection from disconnected state: " + this.socket.state);
        }
        const ws = new this.webSocketConstructor(this.uri);
        this._logVerbose("constructed WebSocket");
        this.setSocketState({
            state: "connecting",
            ws,
            paused: "no"
        });
        this.resetServerInactivityTimeout();
        ws.onopen = ()=>{
            this.logger.logVerbose("begin ws.onopen");
            if (this.socket.state !== "connecting") {
                throw new Error("onopen called with socket not in connecting state");
            }
            this.setSocketState({
                state: "ready",
                ws,
                paused: this.socket.paused === "yes" ? "uninitialized" : "no"
            });
            this.resetServerInactivityTimeout();
            if (this.socket.paused === "no") {
                this._hasEverConnected = true;
                this.onOpen({
                    connectionCount: this.connectionCount,
                    lastCloseReason: this.lastCloseReason,
                    clientTs: monotonicMillis()
                });
            }
            if (this.lastCloseReason !== "InitialConnect") {
                if (this.lastCloseReason) {
                    this.logger.log("WebSocket reconnected at", prettyNow(), "after disconnect due to", this.lastCloseReason);
                } else {
                    this.logger.log("WebSocket reconnected at", prettyNow());
                }
            }
            this.connectionCount += 1;
            this.lastCloseReason = null;
        };
        ws.onerror = (error)=>{
            const message = error.message;
            if (message) {
                this.logger.log(`WebSocket error message: ${message}`);
            }
        };
        ws.onmessage = (message)=>{
            this.resetServerInactivityTimeout();
            const messageLength = message.data.length;
            const serverMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$protocol$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseServerMessage"])(JSON.parse(message.data));
            this._logVerbose(`received ws message with type ${serverMessage.type}`);
            if (serverMessage.type === "Transition") {
                this.reportLargeTransition({
                    messageLength,
                    transition: serverMessage
                });
            }
            const response = this.onMessage(serverMessage);
            if (response.hasSyncedPastLastReconnect) {
                this.retries = 0;
                this.markConnectionStateDirty();
            }
        };
        ws.onclose = (event)=>{
            this._logVerbose("begin ws.onclose");
            if (this.lastCloseReason === null) {
                this.lastCloseReason = event.reason || `closed with code ${event.code}`;
            }
            if (event.code !== CLOSE_NORMAL && event.code !== CLOSE_GOING_AWAY && // This commonly gets fired on mobile apps when the app is backgrounded
            event.code !== CLOSE_NO_STATUS && event.code !== CLOSE_NOT_FOUND) {
                let msg = `WebSocket closed with code ${event.code}`;
                if (event.reason) {
                    msg += `: ${event.reason}`;
                }
                this.logger.log(msg);
                if (this.onServerDisconnectError && event.reason) {
                    this.onServerDisconnectError(msg);
                }
            }
            const reason = classifyDisconnectError(event.reason);
            this.scheduleReconnect(reason);
            return;
        };
    }
    /**
   * @returns The state of the {@link Socket}.
   */ socketState() {
        return this.socket.state;
    }
    /**
   * @param message - A ClientMessage to send.
   * @returns Whether the message (might have been) sent.
   */ sendMessage(message) {
        const messageForLog = {
            type: message.type,
            ...message.type === "Authenticate" && message.tokenType === "User" ? {
                value: `...${message.value.slice(-7)}`
            } : {}
        };
        if (this.socket.state === "ready" && this.socket.paused === "no") {
            const encodedMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$protocol$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeClientMessage"])(message);
            const request = JSON.stringify(encodedMessage);
            let sent = false;
            try {
                this.socket.ws.send(request);
                sent = true;
            } catch (error) {
                this.logger.log(`Failed to send message on WebSocket, reconnecting: ${error}`);
                this.closeAndReconnect("FailedToSendMessage");
            }
            this._logVerbose(`${sent ? "sent" : "failed to send"} message with type ${message.type}: ${JSON.stringify(messageForLog)}`);
            return true;
        }
        this._logVerbose(`message not sent (socket state: ${this.socket.state}, paused: ${"paused" in this.socket ? this.socket.paused : void 0}): ${JSON.stringify(messageForLog)}`);
        return false;
    }
    resetServerInactivityTimeout() {
        if (this.socket.state === "terminated") {
            return;
        }
        if (this.reconnectDueToServerInactivityTimeout !== null) {
            clearTimeout(this.reconnectDueToServerInactivityTimeout);
            this.reconnectDueToServerInactivityTimeout = null;
        }
        this.reconnectDueToServerInactivityTimeout = setTimeout(()=>{
            this.closeAndReconnect("InactiveServer");
        }, this.serverInactivityThreshold);
    }
    scheduleReconnect(reason) {
        this.socket = {
            state: "disconnected"
        };
        const backoff = this.nextBackoff(reason);
        this.markConnectionStateDirty();
        this.logger.log(`Attempting reconnect in ${Math.round(backoff)}ms`);
        setTimeout(()=>this.connect(), backoff);
    }
    /**
   * Close the WebSocket and schedule a reconnect.
   *
   * This should be used when we hit an error and would like to restart the session.
   */ closeAndReconnect(closeReason) {
        this._logVerbose(`begin closeAndReconnect with reason ${closeReason}`);
        switch(this.socket.state){
            case "disconnected":
            case "terminated":
            case "stopped":
                return;
            case "connecting":
            case "ready":
                {
                    this.lastCloseReason = closeReason;
                    void this.close();
                    this.scheduleReconnect("client");
                    return;
                }
            default:
                {
                    this.socket;
                }
        }
    }
    /**
   * Close the WebSocket, being careful to clear the onclose handler to avoid re-entrant
   * calls. Use this instead of directly calling `ws.close()`
   *
   * It is the callers responsibility to update the state after this method is called so that the
   * closed socket is not accessible or used again after this method is called
   */ close() {
        switch(this.socket.state){
            case "disconnected":
            case "terminated":
            case "stopped":
                return Promise.resolve();
            case "connecting":
                {
                    const ws = this.socket.ws;
                    return new Promise((r)=>{
                        ws.onclose = ()=>{
                            this._logVerbose("Closed after connecting");
                            r();
                        };
                        ws.onopen = ()=>{
                            this._logVerbose("Opened after connecting");
                            ws.close();
                        };
                    });
                }
            case "ready":
                {
                    this._logVerbose("ws.close called");
                    const ws = this.socket.ws;
                    const result = new Promise((r)=>{
                        ws.onclose = ()=>{
                            r();
                        };
                    });
                    ws.close();
                    return result;
                }
            default:
                {
                    this.socket;
                    return Promise.resolve();
                }
        }
    }
    /**
   * Close the WebSocket and do not reconnect.
   * @returns A Promise that resolves when the WebSocket `onClose` callback is called.
   */ terminate() {
        if (this.reconnectDueToServerInactivityTimeout) {
            clearTimeout(this.reconnectDueToServerInactivityTimeout);
        }
        switch(this.socket.state){
            case "terminated":
            case "stopped":
            case "disconnected":
            case "connecting":
            case "ready":
                {
                    const result = this.close();
                    this.setSocketState({
                        state: "terminated"
                    });
                    return result;
                }
            default:
                {
                    this.socket;
                    throw new Error(`Invalid websocket state: ${this.socket.state}`);
                }
        }
    }
    stop() {
        switch(this.socket.state){
            case "terminated":
                return Promise.resolve();
            case "connecting":
            case "stopped":
            case "disconnected":
            case "ready":
                {
                    const result = this.close();
                    this.socket = {
                        state: "stopped"
                    };
                    return result;
                }
            default:
                {
                    this.socket;
                    return Promise.resolve();
                }
        }
    }
    /**
   * Create a new WebSocket after a previous `stop()`, unless `terminate()` was
   * called before.
   */ tryRestart() {
        switch(this.socket.state){
            case "stopped":
                break;
            case "terminated":
            case "connecting":
            case "ready":
            case "disconnected":
                this.logger.logVerbose("Restart called without stopping first");
                return;
            default:
                {
                    this.socket;
                }
        }
        this.connect();
    }
    pause() {
        switch(this.socket.state){
            case "disconnected":
            case "stopped":
            case "terminated":
                return;
            case "connecting":
            case "ready":
                {
                    this.socket = {
                        ...this.socket,
                        paused: "yes"
                    };
                    return;
                }
            default:
                {
                    this.socket;
                    return;
                }
        }
    }
    /**
   * Resume the state machine if previously paused.
   */ resume() {
        switch(this.socket.state){
            case "connecting":
                this.socket = {
                    ...this.socket,
                    paused: "no"
                };
                return;
            case "ready":
                if (this.socket.paused === "uninitialized") {
                    this.socket = {
                        ...this.socket,
                        paused: "no"
                    };
                    this.onOpen({
                        connectionCount: this.connectionCount,
                        lastCloseReason: this.lastCloseReason,
                        clientTs: monotonicMillis()
                    });
                } else if (this.socket.paused === "yes") {
                    this.socket = {
                        ...this.socket,
                        paused: "no"
                    };
                    this.onResume();
                }
                return;
            case "terminated":
            case "stopped":
            case "disconnected":
                return;
            default:
                {
                    this.socket;
                }
        }
        this.connect();
    }
    connectionState() {
        return {
            isConnected: this.socket.state === "ready",
            hasEverConnected: this._hasEverConnected,
            connectionCount: this.connectionCount,
            connectionRetries: this.retries
        };
    }
    _logVerbose(message) {
        this.logger.logVerbose(message);
    }
    nextBackoff(reason) {
        const initialBackoff = reason === "client" ? 100 : reason === "Unknown" ? this.defaultInitialBackoff : serverDisconnectErrors[reason].timeout;
        const baseBackoff = initialBackoff * Math.pow(2, this.retries);
        this.retries += 1;
        const actualBackoff = Math.min(baseBackoff, this.maxBackoff);
        const jitter = actualBackoff * (Math.random() - 0.5);
        return actualBackoff + jitter;
    }
    reportLargeTransition({ transition, messageLength }) {
        if (transition.clientClockSkew === void 0 || transition.serverTs === void 0) {
            return;
        }
        const transitionTransitTime = monotonicMillis() - // client time now
        // clientClockSkew = (server time + upstream latency) - client time
        // clientClockSkew is "how many milliseconds behind (slow) is the client clock"
        // but the latency of the Connect message inflates this, making it appear further behind
        transition.clientClockSkew - transition.serverTs / 1e6;
        const prettyTransitionTime = `${Math.round(transitionTransitTime)}ms`;
        const prettyMessageMB = `${Math.round(messageLength / 1e4) / 100}MB`;
        const bytesPerSecond = messageLength / (transitionTransitTime / 1e3);
        const prettyBytesPerSecond = `${Math.round(bytesPerSecond / 1e4) / 100}MB per second`;
        this._logVerbose(`received ${prettyMessageMB} transition in ${prettyTransitionTime} at ${prettyBytesPerSecond}`);
        if (messageLength > 2e7) {
            this.logger.log(`received query results totaling more that 20MB (${prettyMessageMB}) which will take a long time to download on slower connections`);
        } else if (transitionTransitTime > 2e4) {
            this.logger.log(`received query results totaling ${prettyMessageMB} which took more than 20s to arrive (${prettyTransitionTime})`);
        }
        if (this.debug) {
            if (transitionTransitTime > 2e3) {
                this.sendMessage({
                    type: "Event",
                    eventType: "ClientReceivedTransition",
                    event: {
                        transitionTransitTime,
                        messageLength
                    }
                });
            }
        }
    }
} //# sourceMappingURL=web_socket_manager.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/sync/session.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "newSessionId",
    ()=>newSessionId
]);
"use strict";
function newSessionId() {
    return uuidv4();
}
function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c)=>{
        const r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
        return v.toString(16);
    });
} //# sourceMappingURL=session.js.map
}),
"[project]/node_modules/jwt-decode/build/esm/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/node_modules/convex/dist/esm/browser/sync/authentication_manager.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthenticationManager",
    ()=>AuthenticationManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jwt-decode/build/esm/index.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
const MAXIMUM_REFRESH_DELAY = 20 * 24 * 60 * 60 * 1e3;
const MAX_TOKEN_CONFIRMATION_ATTEMPTS = 2;
class AuthenticationManager {
    constructor(syncState, callbacks, config){
        __publicField(this, "authState", {
            state: "noAuth"
        });
        // Used to detect races involving `setConfig` calls
        // while a token is being fetched.
        __publicField(this, "configVersion", 0);
        // Shared by the BaseClient so that the auth manager can easily inspect it
        __publicField(this, "syncState");
        // Passed down by BaseClient, sends a message to the server
        __publicField(this, "authenticate");
        __publicField(this, "stopSocket");
        __publicField(this, "tryRestartSocket");
        __publicField(this, "pauseSocket");
        __publicField(this, "resumeSocket");
        // Passed down by BaseClient, sends a message to the server
        __publicField(this, "clearAuth");
        __publicField(this, "logger");
        __publicField(this, "refreshTokenLeewaySeconds");
        // Number of times we have attempted to confirm the latest token. We retry up
        // to `MAX_TOKEN_CONFIRMATION_ATTEMPTS` times.
        __publicField(this, "tokenConfirmationAttempts", 0);
        this.syncState = syncState;
        this.authenticate = callbacks.authenticate;
        this.stopSocket = callbacks.stopSocket;
        this.tryRestartSocket = callbacks.tryRestartSocket;
        this.pauseSocket = callbacks.pauseSocket;
        this.resumeSocket = callbacks.resumeSocket;
        this.clearAuth = callbacks.clearAuth;
        this.logger = config.logger;
        this.refreshTokenLeewaySeconds = config.refreshTokenLeewaySeconds;
    }
    async setConfig(fetchToken, onChange) {
        this.resetAuthState();
        this._logVerbose("pausing WS for auth token fetch");
        this.pauseSocket();
        const token = await this.fetchTokenAndGuardAgainstRace(fetchToken, {
            forceRefreshToken: false
        });
        if (token.isFromOutdatedConfig) {
            return;
        }
        if (token.value) {
            this.setAuthState({
                state: "waitingForServerConfirmationOfCachedToken",
                config: {
                    fetchToken,
                    onAuthChange: onChange
                },
                hasRetried: false
            });
            this.authenticate(token.value);
        } else {
            this.setAuthState({
                state: "initialRefetch",
                config: {
                    fetchToken,
                    onAuthChange: onChange
                }
            });
            await this.refetchToken();
        }
        this._logVerbose("resuming WS after auth token fetch");
        this.resumeSocket();
    }
    onTransition(serverMessage) {
        if (!this.syncState.isCurrentOrNewerAuthVersion(serverMessage.endVersion.identity)) {
            return;
        }
        if (serverMessage.endVersion.identity <= serverMessage.startVersion.identity) {
            return;
        }
        if (this.authState.state === "waitingForServerConfirmationOfCachedToken") {
            this._logVerbose("server confirmed auth token is valid");
            void this.refetchToken();
            this.authState.config.onAuthChange(true);
            return;
        }
        if (this.authState.state === "waitingForServerConfirmationOfFreshToken") {
            this._logVerbose("server confirmed new auth token is valid");
            this.scheduleTokenRefetch(this.authState.token);
            this.tokenConfirmationAttempts = 0;
            if (!this.authState.hadAuth) {
                this.authState.config.onAuthChange(true);
            }
        }
    }
    onAuthError(serverMessage) {
        if (serverMessage.authUpdateAttempted === false && (this.authState.state === "waitingForServerConfirmationOfFreshToken" || this.authState.state === "waitingForServerConfirmationOfCachedToken")) {
            this._logVerbose("ignoring non-auth token expired error");
            return;
        }
        const { baseVersion } = serverMessage;
        if (!this.syncState.isCurrentOrNewerAuthVersion(baseVersion + 1)) {
            this._logVerbose("ignoring auth error for previous auth attempt");
            return;
        }
        void this.tryToReauthenticate(serverMessage);
        return;
    }
    // This is similar to `refetchToken` defined below, in fact we
    // don't represent them as different states, but it is different
    // in that we pause the WebSocket so that mutations
    // don't retry with bad auth.
    async tryToReauthenticate(serverMessage) {
        this._logVerbose(`attempting to reauthenticate: ${serverMessage.error}`);
        if (// No way to fetch another token, kaboom
        this.authState.state === "noAuth" || // We failed on a fresh token. After a small number of retries, we give up
        // and clear the auth state to avoid infinite retries.
        this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= MAX_TOKEN_CONFIRMATION_ATTEMPTS) {
            this.logger.error(`Failed to authenticate: "${serverMessage.error}", check your server auth config`);
            if (this.syncState.hasAuth()) {
                this.syncState.clearAuth();
            }
            if (this.authState.state !== "noAuth") {
                this.setAndReportAuthFailed(this.authState.config.onAuthChange);
            }
            return;
        }
        if (this.authState.state === "waitingForServerConfirmationOfFreshToken") {
            this.tokenConfirmationAttempts++;
            this._logVerbose(`retrying reauthentication, ${MAX_TOKEN_CONFIRMATION_ATTEMPTS - this.tokenConfirmationAttempts} attempts remaining`);
        }
        await this.stopSocket();
        const token = await this.fetchTokenAndGuardAgainstRace(this.authState.config.fetchToken, {
            forceRefreshToken: true
        });
        if (token.isFromOutdatedConfig) {
            return;
        }
        if (token.value && this.syncState.isNewAuth(token.value)) {
            this.authenticate(token.value);
            this.setAuthState({
                state: "waitingForServerConfirmationOfFreshToken",
                config: this.authState.config,
                token: token.value,
                hadAuth: this.authState.state === "notRefetching" || this.authState.state === "waitingForScheduledRefetch"
            });
        } else {
            this._logVerbose("reauthentication failed, could not fetch a new token");
            if (this.syncState.hasAuth()) {
                this.syncState.clearAuth();
            }
            this.setAndReportAuthFailed(this.authState.config.onAuthChange);
        }
        this.tryRestartSocket();
    }
    // Force refetch the token and schedule another refetch
    // before the token expires - an active client should never
    // need to reauthenticate.
    async refetchToken() {
        if (this.authState.state === "noAuth") {
            return;
        }
        this._logVerbose("refetching auth token");
        const token = await this.fetchTokenAndGuardAgainstRace(this.authState.config.fetchToken, {
            forceRefreshToken: true
        });
        if (token.isFromOutdatedConfig) {
            return;
        }
        if (token.value) {
            if (this.syncState.isNewAuth(token.value)) {
                this.setAuthState({
                    state: "waitingForServerConfirmationOfFreshToken",
                    hadAuth: this.syncState.hasAuth(),
                    token: token.value,
                    config: this.authState.config
                });
                this.authenticate(token.value);
            } else {
                this.setAuthState({
                    state: "notRefetching",
                    config: this.authState.config
                });
            }
        } else {
            this._logVerbose("refetching token failed");
            if (this.syncState.hasAuth()) {
                this.clearAuth();
            }
            this.setAndReportAuthFailed(this.authState.config.onAuthChange);
        }
        this._logVerbose("restarting WS after auth token fetch (if currently stopped)");
        this.tryRestartSocket();
    }
    scheduleTokenRefetch(token) {
        if (this.authState.state === "noAuth") {
            return;
        }
        const decodedToken = this.decodeToken(token);
        if (!decodedToken) {
            this.logger.error("Auth token is not a valid JWT, cannot refetch the token");
            return;
        }
        const { iat, exp } = decodedToken;
        if (!iat || !exp) {
            this.logger.error("Auth token does not have required fields, cannot refetch the token");
            return;
        }
        const tokenValiditySeconds = exp - iat;
        if (tokenValiditySeconds <= 2) {
            this.logger.error("Auth token does not live long enough, cannot refetch the token");
            return;
        }
        let delay = Math.min(MAXIMUM_REFRESH_DELAY, (tokenValiditySeconds - this.refreshTokenLeewaySeconds) * 1e3);
        if (delay <= 0) {
            this.logger.warn(`Refetching auth token immediately, configured leeway ${this.refreshTokenLeewaySeconds}s is larger than the token's lifetime ${tokenValiditySeconds}s`);
            delay = 0;
        }
        const refetchTokenTimeoutId = setTimeout(()=>{
            this._logVerbose("running scheduled token refetch");
            void this.refetchToken();
        }, delay);
        this.setAuthState({
            state: "waitingForScheduledRefetch",
            refetchTokenTimeoutId,
            config: this.authState.config
        });
        this._logVerbose(`scheduled preemptive auth token refetching in ${delay}ms`);
    }
    // Protects against simultaneous calls to `setConfig`
    // while we're fetching a token
    async fetchTokenAndGuardAgainstRace(fetchToken, fetchArgs) {
        const originalConfigVersion = ++this.configVersion;
        this._logVerbose(`fetching token with config version ${originalConfigVersion}`);
        const token = await fetchToken(fetchArgs);
        if (this.configVersion !== originalConfigVersion) {
            this._logVerbose(`stale config version, expected ${originalConfigVersion}, got ${this.configVersion}`);
            return {
                isFromOutdatedConfig: true
            };
        }
        return {
            isFromOutdatedConfig: false,
            value: token
        };
    }
    stop() {
        this.resetAuthState();
        this.configVersion++;
        this._logVerbose(`config version bumped to ${this.configVersion}`);
    }
    setAndReportAuthFailed(onAuthChange) {
        onAuthChange(false);
        this.resetAuthState();
    }
    resetAuthState() {
        this.setAuthState({
            state: "noAuth"
        });
    }
    setAuthState(newAuth) {
        const authStateForLog = newAuth.state === "waitingForServerConfirmationOfFreshToken" ? {
            hadAuth: newAuth.hadAuth,
            state: newAuth.state,
            token: `...${newAuth.token.slice(-7)}`
        } : {
            state: newAuth.state
        };
        this._logVerbose(`setting auth state to ${JSON.stringify(authStateForLog)}`);
        switch(newAuth.state){
            case "waitingForScheduledRefetch":
            case "notRefetching":
            case "noAuth":
                this.tokenConfirmationAttempts = 0;
                break;
            case "waitingForServerConfirmationOfFreshToken":
            case "waitingForServerConfirmationOfCachedToken":
            case "initialRefetch":
                break;
            default:
                {
                    newAuth;
                }
        }
        if (this.authState.state === "waitingForScheduledRefetch") {
            clearTimeout(this.authState.refetchTokenTimeoutId);
            this.syncState.markAuthCompletion();
        }
        this.authState = newAuth;
    }
    decodeToken(token) {
        try {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtDecode"])(token);
        } catch (e) {
            this._logVerbose(`Error decoding token: ${e instanceof Error ? e.message : "Unknown error"}`);
            return null;
        }
    }
    _logVerbose(message) {
        this.logger.logVerbose(`${message} [v${this.configVersion}]`);
    }
} //# sourceMappingURL=authentication_manager.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/sync/metrics.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMarksReport",
    ()=>getMarksReport,
    "mark",
    ()=>mark
]);
"use strict";
const markNames = [
    "convexClientConstructed",
    "convexWebSocketOpen",
    "convexFirstMessageReceived"
];
function mark(name, sessionId) {
    const detail = {
        sessionId
    };
    if (typeof performance === "undefined" || !performance.mark) return;
    performance.mark(name, {
        detail
    });
}
function performanceMarkToJson(mark2) {
    let name = mark2.name.slice("convex".length);
    name = name.charAt(0).toLowerCase() + name.slice(1);
    return {
        name,
        startTime: mark2.startTime
    };
}
function getMarksReport(sessionId) {
    if (typeof performance === "undefined" || !performance.getEntriesByName) {
        return [];
    }
    const allMarks = [];
    for (const name of markNames){
        const marks = performance.getEntriesByName(name).filter((entry)=>entry.entryType === "mark").filter((mark2)=>mark2.detail.sessionId === sessionId);
        allMarks.push(...marks);
    }
    return allMarks.map(performanceMarkToJson);
} //# sourceMappingURL=metrics.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/sync/client.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseConvexClient",
    ()=>BaseConvexClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/logging.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$local_state$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/local_state.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$request_manager$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/request_manager.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$optimistic_updates_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/optimistic_updates_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$remote_query_set$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/remote_query_set.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/udf_path_utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$web_socket_manager$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/web_socket_manager.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/session.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$authentication_manager$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/authentication_manager.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$metrics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/metrics.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/errors.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
;
;
;
;
;
;
;
;
;
;
;
class BaseConvexClient {
    /**
   * @param address - The url of your Convex deployment, often provided
   * by an environment variable. E.g. `https://small-mouse-123.convex.cloud`.
   * @param onTransition - A callback receiving an array of query tokens
   * corresponding to query results that have changed -- additional handlers
   * can be added via `addOnTransitionHandler`.
   * @param options - See {@link BaseConvexClientOptions} for a full description.
   */ constructor(address, onTransition, options){
        __publicField(this, "address");
        __publicField(this, "state");
        __publicField(this, "requestManager");
        __publicField(this, "webSocketManager");
        __publicField(this, "authenticationManager");
        __publicField(this, "remoteQuerySet");
        __publicField(this, "optimisticQueryResults");
        __publicField(this, "_transitionHandlerCounter", 0);
        __publicField(this, "_nextRequestId");
        __publicField(this, "_onTransitionFns", /* @__PURE__ */ new Map());
        __publicField(this, "_sessionId");
        __publicField(this, "firstMessageReceived", false);
        __publicField(this, "debug");
        __publicField(this, "logger");
        __publicField(this, "maxObservedTimestamp");
        __publicField(this, "connectionStateSubscribers", /* @__PURE__ */ new Map());
        __publicField(this, "nextConnectionStateSubscriberId", 0);
        __publicField(this, "_lastPublishedConnectionState");
        /**
     * Call this whenever the connection state may have changed in a way that could
     * require publishing it. Schedules a possibly update.
     */ __publicField(this, "markConnectionStateDirty", ()=>{
            void Promise.resolve().then(()=>{
                const curConnectionState = this.connectionState();
                if (JSON.stringify(curConnectionState) !== JSON.stringify(this._lastPublishedConnectionState)) {
                    this._lastPublishedConnectionState = curConnectionState;
                    for (const cb of this.connectionStateSubscribers.values()){
                        cb(curConnectionState);
                    }
                }
            });
        });
        // Instance property so that `mark()` doesn't need to be called as a method.
        __publicField(this, "mark", (name)=>{
            if (this.debug) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$metrics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mark"])(name, this.sessionId);
            }
        });
        if (typeof address === "object") {
            throw new Error("Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.");
        }
        if (options?.skipConvexDeploymentUrlCheck !== true) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateDeploymentUrl"])(address);
        }
        options = {
            ...options
        };
        const authRefreshTokenLeewaySeconds = options.authRefreshTokenLeewaySeconds ?? 2;
        let webSocketConstructor = options.webSocketConstructor;
        if (!webSocketConstructor && typeof WebSocket === "undefined") {
            throw new Error("No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient");
        }
        webSocketConstructor = webSocketConstructor || WebSocket;
        this.debug = options.reportDebugInfoToConvex ?? false;
        this.address = address;
        this.logger = options.logger === false ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["instantiateNoopLogger"])({
            verbose: options.verbose ?? false
        }) : options.logger !== true && options.logger ? options.logger : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["instantiateDefaultLogger"])({
            verbose: options.verbose ?? false
        });
        const i = address.search("://");
        if (i === -1) {
            throw new Error("Provided address was not an absolute URL.");
        }
        const origin = address.substring(i + 3);
        const protocol = address.substring(0, i);
        let wsProtocol;
        if (protocol === "http") {
            wsProtocol = "ws";
        } else if (protocol === "https") {
            wsProtocol = "wss";
        } else {
            throw new Error(`Unknown parent protocol ${protocol}`);
        }
        const wsUri = `${wsProtocol}://${origin}/api/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]}/sync`;
        this.state = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$local_state$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LocalSyncState"]();
        this.remoteQuerySet = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$remote_query_set$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RemoteQuerySet"]((queryId)=>this.state.queryPath(queryId), this.logger);
        this.requestManager = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$request_manager$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RequestManager"](this.logger, this.markConnectionStateDirty);
        const pauseSocket = ()=>{
            this.webSocketManager.pause();
            this.state.pause();
        };
        this.authenticationManager = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$authentication_manager$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AuthenticationManager"](this.state, {
            authenticate: (token)=>{
                const message = this.state.setAuth(token);
                this.webSocketManager.sendMessage(message);
                return message.baseVersion;
            },
            stopSocket: ()=>this.webSocketManager.stop(),
            tryRestartSocket: ()=>this.webSocketManager.tryRestart(),
            pauseSocket,
            resumeSocket: ()=>this.webSocketManager.resume(),
            clearAuth: ()=>{
                this.clearAuth();
            }
        }, {
            logger: this.logger,
            refreshTokenLeewaySeconds: authRefreshTokenLeewaySeconds
        });
        this.optimisticQueryResults = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$optimistic_updates_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OptimisticQueryResults"]();
        this.addOnTransitionHandler((transition)=>{
            onTransition(transition.queries.map((q)=>q.token));
        });
        this._nextRequestId = 0;
        this._sessionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["newSessionId"])();
        const { unsavedChangesWarning } = options;
        if ("TURBOPACK compile-time truthy", 1) {
            if (unsavedChangesWarning === true) {
                throw new Error("unsavedChangesWarning requested, but window.addEventListener not found! Remove {unsavedChangesWarning: true} from Convex client options.");
            }
        } else //TURBOPACK unreachable
        ;
        this.webSocketManager = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$web_socket_manager$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WebSocketManager"](wsUri, {
            onOpen: (reconnectMetadata)=>{
                this.mark("convexWebSocketOpen");
                this.webSocketManager.sendMessage({
                    ...reconnectMetadata,
                    type: "Connect",
                    sessionId: this._sessionId,
                    maxObservedTimestamp: this.maxObservedTimestamp
                });
                const oldRemoteQueryResults = new Set(this.remoteQuerySet.remoteQueryResults().keys());
                this.remoteQuerySet = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$remote_query_set$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RemoteQuerySet"]((queryId)=>this.state.queryPath(queryId), this.logger);
                const [querySetModification, authModification] = this.state.restart(oldRemoteQueryResults);
                if (authModification) {
                    this.webSocketManager.sendMessage(authModification);
                }
                this.webSocketManager.sendMessage(querySetModification);
                for (const message of this.requestManager.restart()){
                    this.webSocketManager.sendMessage(message);
                }
            },
            onResume: ()=>{
                const [querySetModification, authModification] = this.state.resume();
                if (authModification) {
                    this.webSocketManager.sendMessage(authModification);
                }
                if (querySetModification) {
                    this.webSocketManager.sendMessage(querySetModification);
                }
                for (const message of this.requestManager.resume()){
                    this.webSocketManager.sendMessage(message);
                }
            },
            onMessage: (serverMessage)=>{
                if (!this.firstMessageReceived) {
                    this.firstMessageReceived = true;
                    this.mark("convexFirstMessageReceived");
                    this.reportMarks();
                }
                switch(serverMessage.type){
                    case "Transition":
                        {
                            this.observedTimestamp(serverMessage.endVersion.ts);
                            this.authenticationManager.onTransition(serverMessage);
                            this.remoteQuerySet.transition(serverMessage);
                            this.state.transition(serverMessage);
                            const completedRequests = this.requestManager.removeCompleted(this.remoteQuerySet.timestamp());
                            this.notifyOnQueryResultChanges(completedRequests);
                            break;
                        }
                    case "MutationResponse":
                        {
                            if (serverMessage.success) {
                                this.observedTimestamp(serverMessage.ts);
                            }
                            const completedMutationInfo = this.requestManager.onResponse(serverMessage);
                            if (completedMutationInfo !== null) {
                                this.notifyOnQueryResultChanges(/* @__PURE__ */ new Map([
                                    [
                                        completedMutationInfo.requestId,
                                        completedMutationInfo.result
                                    ]
                                ]));
                            }
                            break;
                        }
                    case "ActionResponse":
                        {
                            this.requestManager.onResponse(serverMessage);
                            break;
                        }
                    case "AuthError":
                        {
                            this.authenticationManager.onAuthError(serverMessage);
                            break;
                        }
                    case "FatalError":
                        {
                            const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logFatalError"])(this.logger, serverMessage.error);
                            void this.webSocketManager.terminate();
                            throw error;
                        }
                    case "Ping":
                        break;
                    // do nothing
                    default:
                        {
                            serverMessage;
                        }
                }
                return {
                    hasSyncedPastLastReconnect: this.hasSyncedPastLastReconnect()
                };
            },
            onServerDisconnectError: options.onServerDisconnectError
        }, webSocketConstructor, this.logger, this.markConnectionStateDirty, this.debug);
        this.mark("convexClientConstructed");
        if (options.expectAuth) {
            pauseSocket();
        }
    }
    /**
   * Return true if there is outstanding work from prior to the time of the most recent restart.
   * This indicates that the client has not proven itself to have gotten past the issue that
   * potentially led to the restart. Use this to influence when to reset backoff after a failure.
   */ hasSyncedPastLastReconnect() {
        const hasSyncedPastLastReconnect = this.requestManager.hasSyncedPastLastReconnect() || this.state.hasSyncedPastLastReconnect();
        return hasSyncedPastLastReconnect;
    }
    observedTimestamp(observedTs) {
        if (this.maxObservedTimestamp === void 0 || this.maxObservedTimestamp.lessThanOrEqual(observedTs)) {
            this.maxObservedTimestamp = observedTs;
        }
    }
    getMaxObservedTimestamp() {
        return this.maxObservedTimestamp;
    }
    /**
   * Compute the current query results based on the remoteQuerySet and the
   * current optimistic updates and call `onTransition` for all the changed
   * queries.
   *
   * @param completedMutations - A set of mutation IDs whose optimistic updates
   * are no longer needed.
   */ notifyOnQueryResultChanges(completedRequests) {
        const remoteQueryResults = this.remoteQuerySet.remoteQueryResults();
        const queryTokenToValue = /* @__PURE__ */ new Map();
        for (const [queryId, result] of remoteQueryResults){
            const queryToken = this.state.queryToken(queryId);
            if (queryToken !== null) {
                const query = {
                    result,
                    udfPath: this.state.queryPath(queryId),
                    args: this.state.queryArgs(queryId)
                };
                queryTokenToValue.set(queryToken, query);
            }
        }
        const changedQueryTokens = this.optimisticQueryResults.ingestQueryResultsFromServer(queryTokenToValue, new Set(completedRequests.keys()));
        this.handleTransition({
            queries: changedQueryTokens.map((token)=>{
                const optimisticResult = this.optimisticQueryResults.rawQueryResult(token);
                return {
                    token,
                    modification: {
                        kind: "Updated",
                        result: optimisticResult.result
                    }
                };
            }),
            reflectedMutations: Array.from(completedRequests).map(([requestId, result])=>({
                    requestId,
                    result
                })),
            timestamp: this.remoteQuerySet.timestamp()
        });
    }
    handleTransition(transition) {
        for (const fn of this._onTransitionFns.values()){
            fn(transition);
        }
    }
    /**
   * Add a handler that will be called on a transition.
   *
   * Any external side effects (e.g. setting React state) should be handled here.
   *
   * @param fn
   *
   * @returns
   */ addOnTransitionHandler(fn) {
        const id = this._transitionHandlerCounter++;
        this._onTransitionFns.set(id, fn);
        return ()=>this._onTransitionFns.delete(id);
    }
    /**
   * Set the authentication token to be used for subsequent queries and mutations.
   * `fetchToken` will be called automatically again if a token expires.
   * `fetchToken` should return `null` if the token cannot be retrieved, for example
   * when the user's rights were permanently revoked.
   * @param fetchToken - an async function returning the JWT-encoded OpenID Connect Identity Token
   * @param onChange - a callback that will be called when the authentication status changes
   */ setAuth(fetchToken, onChange) {
        void this.authenticationManager.setConfig(fetchToken, onChange);
    }
    hasAuth() {
        return this.state.hasAuth();
    }
    /** @internal */ setAdminAuth(value, fakeUserIdentity) {
        const message = this.state.setAdminAuth(value, fakeUserIdentity);
        this.webSocketManager.sendMessage(message);
    }
    clearAuth() {
        const message = this.state.clearAuth();
        this.webSocketManager.sendMessage(message);
    }
    /**
     * Subscribe to a query function.
     *
     * Whenever this query's result changes, the `onTransition` callback
     * passed into the constructor will be called.
     *
     * @param name - The name of the query.
     * @param args - An arguments object for the query. If this is omitted, the
     * arguments will be `{}`.
     * @param options - A {@link SubscribeOptions} options object for this query.
  
     * @returns An object containing a {@link QueryToken} corresponding to this
     * query and an `unsubscribe` callback.
     */ subscribe(name, args, options) {
        const argsObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
        const { modification, queryToken, unsubscribe } = this.state.subscribe(name, argsObject, options?.journal, options?.componentPath);
        if (modification !== null) {
            this.webSocketManager.sendMessage(modification);
        }
        return {
            queryToken,
            unsubscribe: ()=>{
                const modification2 = unsubscribe();
                if (modification2) {
                    this.webSocketManager.sendMessage(modification2);
                }
            }
        };
    }
    /**
   * A query result based only on the current, local state.
   *
   * The only way this will return a value is if we're already subscribed to the
   * query or its value has been set optimistically.
   */ localQueryResult(udfPath, args) {
        const argsObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
        const queryToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializePathAndArgs"])(udfPath, argsObject);
        return this.optimisticQueryResults.queryResult(queryToken);
    }
    /**
   * Get query result by query token based on current, local state
   *
   * The only way this will return a value is if we're already subscribed to the
   * query or its value has been set optimistically.
   *
   * @internal
   */ localQueryResultByToken(queryToken) {
        return this.optimisticQueryResults.queryResult(queryToken);
    }
    /**
   * Whether local query result is available for a toke.
   *
   * This method does not throw if the result is an error.
   *
   * @internal
   */ hasLocalQueryResultByToken(queryToken) {
        return this.optimisticQueryResults.hasQueryResult(queryToken);
    }
    /**
   * @internal
   */ localQueryLogs(udfPath, args) {
        const argsObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
        const queryToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializePathAndArgs"])(udfPath, argsObject);
        return this.optimisticQueryResults.queryLogs(queryToken);
    }
    /**
   * Retrieve the current {@link QueryJournal} for this query function.
   *
   * If we have not yet received a result for this query, this will be `undefined`.
   *
   * @param name - The name of the query.
   * @param args - The arguments object for this query.
   * @returns The query's {@link QueryJournal} or `undefined`.
   */ queryJournal(name, args) {
        const argsObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
        const queryToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$udf_path_utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializePathAndArgs"])(name, argsObject);
        return this.state.queryJournal(queryToken);
    }
    /**
   * Get the current {@link ConnectionState} between the client and the Convex
   * backend.
   *
   * @returns The {@link ConnectionState} with the Convex backend.
   */ connectionState() {
        const wsConnectionState = this.webSocketManager.connectionState();
        return {
            hasInflightRequests: this.requestManager.hasInflightRequests(),
            isWebSocketConnected: wsConnectionState.isConnected,
            hasEverConnected: wsConnectionState.hasEverConnected,
            connectionCount: wsConnectionState.connectionCount,
            connectionRetries: wsConnectionState.connectionRetries,
            timeOfOldestInflightRequest: this.requestManager.timeOfOldestInflightRequest(),
            inflightMutations: this.requestManager.inflightMutations(),
            inflightActions: this.requestManager.inflightActions()
        };
    }
    /**
   * Subscribe to the {@link ConnectionState} between the client and the Convex
   * backend, calling a callback each time it changes.
   *
   * Subscribed callbacks will be called when any part of ConnectionState changes.
   * ConnectionState may grow in future versions (e.g. to provide a array of
   * inflight requests) in which case callbacks would be called more frequently.
   *
   * @returns An unsubscribe function to stop listening.
   */ subscribeToConnectionState(cb) {
        const id = this.nextConnectionStateSubscriberId++;
        this.connectionStateSubscribers.set(id, cb);
        return ()=>{
            this.connectionStateSubscribers.delete(id);
        };
    }
    /**
     * Execute a mutation function.
     *
     * @param name - The name of the mutation.
     * @param args - An arguments object for the mutation. If this is omitted,
     * the arguments will be `{}`.
     * @param options - A {@link MutationOptions} options object for this mutation.
  
     * @returns - A promise of the mutation's result.
     */ async mutation(name, args, options) {
        const result = await this.mutationInternal(name, args, options);
        if (!result.success) {
            if (result.errorData !== void 0) {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardData"])(result, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConvexError"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHybridErrorStacktrace"])("mutation", name, result)));
            }
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHybridErrorStacktrace"])("mutation", name, result));
        }
        return result.value;
    }
    /**
   * @internal
   */ async mutationInternal(udfPath, args, options, componentPath) {
        const { mutationPromise } = this.enqueueMutation(udfPath, args, options, componentPath);
        return mutationPromise;
    }
    /**
   * @internal
   */ enqueueMutation(udfPath, args, options, componentPath) {
        const mutationArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
        this.tryReportLongDisconnect();
        const requestId = this.nextRequestId;
        this._nextRequestId++;
        if (options !== void 0) {
            const optimisticUpdate = options.optimisticUpdate;
            if (optimisticUpdate !== void 0) {
                const wrappedUpdate = (localQueryStore)=>{
                    const result = optimisticUpdate(localQueryStore, mutationArgs);
                    if (result instanceof Promise) {
                        this.logger.warn("Optimistic update handler returned a Promise. Optimistic updates should be synchronous.");
                    }
                };
                const changedQueryTokens = this.optimisticQueryResults.applyOptimisticUpdate(wrappedUpdate, requestId);
                const changedQueries = changedQueryTokens.map((token)=>{
                    const localResult = this.localQueryResultByToken(token);
                    return {
                        token,
                        modification: {
                            kind: "Updated",
                            result: localResult === void 0 ? void 0 : {
                                success: true,
                                value: localResult,
                                logLines: []
                            }
                        }
                    };
                });
                this.handleTransition({
                    queries: changedQueries,
                    reflectedMutations: [],
                    timestamp: this.remoteQuerySet.timestamp()
                });
            }
        }
        const message = {
            type: "Mutation",
            requestId,
            udfPath,
            componentPath,
            args: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(mutationArgs)
            ]
        };
        const mightBeSent = this.webSocketManager.sendMessage(message);
        const mutationPromise = this.requestManager.request(message, mightBeSent);
        return {
            requestId,
            mutationPromise
        };
    }
    /**
   * Execute an action function.
   *
   * @param name - The name of the action.
   * @param args - An arguments object for the action. If this is omitted,
   * the arguments will be `{}`.
   * @returns A promise of the action's result.
   */ async action(name, args) {
        const result = await this.actionInternal(name, args);
        if (!result.success) {
            if (result.errorData !== void 0) {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardData"])(result, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConvexError"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHybridErrorStacktrace"])("action", name, result)));
            }
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createHybridErrorStacktrace"])("action", name, result));
        }
        return result.value;
    }
    /**
   * @internal
   */ async actionInternal(udfPath, args, componentPath) {
        const actionArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
        const requestId = this.nextRequestId;
        this._nextRequestId++;
        this.tryReportLongDisconnect();
        const message = {
            type: "Action",
            requestId,
            udfPath,
            componentPath,
            args: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(actionArgs)
            ]
        };
        const mightBeSent = this.webSocketManager.sendMessage(message);
        return this.requestManager.request(message, mightBeSent);
    }
    /**
   * Close any network handles associated with this client and stop all subscriptions.
   *
   * Call this method when you're done with an {@link BaseConvexClient} to
   * dispose of its sockets and resources.
   *
   * @returns A `Promise` fulfilled when the connection has been completely closed.
   */ async close() {
        this.authenticationManager.stop();
        return this.webSocketManager.terminate();
    }
    /**
   * Return the address for this client, useful for creating a new client.
   *
   * Not guaranteed to match the address with which this client was constructed:
   * it may be canonicalized.
   */ get url() {
        return this.address;
    }
    /**
   * @internal
   */ get nextRequestId() {
        return this._nextRequestId;
    }
    /**
   * @internal
   */ get sessionId() {
        return this._sessionId;
    }
    /**
   * Reports performance marks to the server. This should only be called when
   * we have a functional websocket.
   */ reportMarks() {
        if (this.debug) {
            const report = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$metrics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMarksReport"])(this.sessionId);
            this.webSocketManager.sendMessage({
                type: "Event",
                eventType: "ClientConnect",
                event: report
            });
        }
    }
    tryReportLongDisconnect() {
        if (!this.debug) {
            return;
        }
        const timeOfOldestRequest = this.connectionState().timeOfOldestInflightRequest;
        if (timeOfOldestRequest === null || Date.now() - timeOfOldestRequest.getTime() <= 60 * 1e3) {
            return;
        }
        const endpoint = `${this.address}/api/debug_event`;
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Convex-Client": `npm-${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]}`
            },
            body: JSON.stringify({
                event: "LongWebsocketDisconnect"
            })
        }).then((response)=>{
            if (!response.ok) {
                this.logger.warn("Analytics request failed with response:", response.body);
            }
        }).catch((error)=>{
            this.logger.warn("Analytics response failed with error:", error);
        });
    }
} //# sourceMappingURL=client.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/simple_client.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConvexClient",
    ()=>ConvexClient,
    "setDefaultWebSocketConstructor",
    ()=>setDefaultWebSocketConstructor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/client.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/api.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
let defaultWebSocketConstructor;
function setDefaultWebSocketConstructor(ws) {
    defaultWebSocketConstructor = ws;
}
class ConvexClient {
    /**
   * Construct a client and immediately initiate a WebSocket connection to the passed address.
   *
   * @public
   */ constructor(address, options = {}){
        __publicField(this, "listeners");
        __publicField(this, "_client");
        // A synthetic server event to run callbacks the first time
        __publicField(this, "callNewListenersWithCurrentValuesTimer");
        __publicField(this, "_closed");
        __publicField(this, "_disabled");
        if (options.skipConvexDeploymentUrlCheck !== true) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateDeploymentUrl"])(address);
        }
        const { disabled, ...baseOptions } = options;
        this._closed = false;
        this._disabled = !!disabled;
        if (defaultWebSocketConstructor && !("webSocketConstructor" in baseOptions) && typeof WebSocket === "undefined") {
            baseOptions.webSocketConstructor = defaultWebSocketConstructor;
        }
        if ("undefined" === "undefined" && !("unsavedChangesWarning" in baseOptions)) {
            baseOptions.unsavedChangesWarning = false;
        }
        if (!this.disabled) {
            this._client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseConvexClient"](address, (updatedQueries)=>this._transition(updatedQueries), baseOptions);
        }
        this.listeners = /* @__PURE__ */ new Set();
    }
    /**
   * Once closed no registered callbacks will fire again.
   */ get closed() {
        return this._closed;
    }
    get client() {
        if (this._client) return this._client;
        throw new Error("ConvexClient is disabled");
    }
    get disabled() {
        return this._disabled;
    }
    /**
   * Call a callback whenever a new result for a query is received. The callback
   * will run soon after being registered if a result for the query is already
   * in memory.
   *
   * The return value is an {@link Unsubscribe} object which is both a function
   * an an object with properties. Both of the patterns below work with this object:
   *
   *```ts
   * // call the return value as a function
   * const unsubscribe = client.onUpdate(api.messages.list, {}, (messages) => {
   *   console.log(messages);
   * });
   * unsubscribe();
   *
   * // unpack the return value into its properties
   * const {
   *   getCurrentValue,
   *   unsubscribe,
   * } = client.onUpdate(api.messages.list, {}, (messages) => {
   *   console.log(messages);
   * });
   *```
   *
   * @param query - A {@link server.FunctionReference} for the public query to run.
   * @param args - The arguments to run the query with.
   * @param callback - Function to call when the query result updates.
   * @param onError - Function to call when the query result updates with an error.
   * If not provided, errors will be thrown instead of calling the callback.
   *
   * @return an {@link Unsubscribe} function to stop calling the onUpdate function.
   */ onUpdate(query, args, callback, onError) {
        if (this.disabled) {
            const disabledUnsubscribe = ()=>{};
            const unsubscribeProps2 = {
                unsubscribe: disabledUnsubscribe,
                getCurrentValue: ()=>void 0,
                getQueryLogs: ()=>void 0
            };
            Object.assign(disabledUnsubscribe, unsubscribeProps2);
            return disabledUnsubscribe;
        }
        const { queryToken, unsubscribe } = this.client.subscribe((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(query), args);
        const queryInfo = {
            queryToken,
            callback,
            onError,
            unsubscribe,
            hasEverRun: false,
            query,
            args
        };
        this.listeners.add(queryInfo);
        if (this.queryResultReady(queryToken) && this.callNewListenersWithCurrentValuesTimer === void 0) {
            this.callNewListenersWithCurrentValuesTimer = setTimeout(()=>this.callNewListenersWithCurrentValues(), 0);
        }
        const unsubscribeProps = {
            unsubscribe: ()=>{
                if (this.closed) {
                    return;
                }
                this.listeners.delete(queryInfo);
                unsubscribe();
            },
            getCurrentValue: ()=>this.client.localQueryResultByToken(queryToken),
            getQueryLogs: ()=>this.client.localQueryLogs(queryToken)
        };
        const ret = unsubscribeProps.unsubscribe;
        Object.assign(ret, unsubscribeProps);
        return ret;
    }
    // Run all callbacks that have never been run before if they have a query
    // result available now.
    callNewListenersWithCurrentValues() {
        this.callNewListenersWithCurrentValuesTimer = void 0;
        this._transition([], true);
    }
    queryResultReady(queryToken) {
        return this.client.hasLocalQueryResultByToken(queryToken);
    }
    async close() {
        if (this.disabled) return;
        this.listeners.clear();
        this._closed = true;
        return this.client.close();
    }
    /**
   * Set the authentication token to be used for subsequent queries and mutations.
   * `fetchToken` will be called automatically again if a token expires.
   * `fetchToken` should return `null` if the token cannot be retrieved, for example
   * when the user's rights were permanently revoked.
   * @param fetchToken - an async function returning the JWT (typically an OpenID Connect Identity Token)
   * @param onChange - a callback that will be called when the authentication status changes
   */ setAuth(fetchToken, onChange) {
        if (this.disabled) return;
        this.client.setAuth(fetchToken, onChange ?? (()=>{}));
    }
    /**
   * @internal
   */ setAdminAuth(token, identity) {
        if (this.closed) {
            throw new Error("ConvexClient has already been closed.");
        }
        if (this.disabled) return;
        this.client.setAdminAuth(token, identity);
    }
    /**
   * @internal
   */ _transition(updatedQueries, callNewListeners = false) {
        for (const queryInfo of this.listeners){
            const { callback, queryToken, onError, hasEverRun } = queryInfo;
            if (updatedQueries.includes(queryToken) || callNewListeners && !hasEverRun && this.client.hasLocalQueryResultByToken(queryToken)) {
                queryInfo.hasEverRun = true;
                let newValue;
                try {
                    newValue = this.client.localQueryResultByToken(queryToken);
                } catch (error) {
                    if (!(error instanceof Error)) throw error;
                    if (onError) {
                        onError(error, "Second argument to onUpdate onError is reserved for later use");
                    } else {
                        void Promise.reject(error);
                    }
                    continue;
                }
                callback(newValue, "Second argument to onUpdate callback is reserved for later use");
            }
        }
    }
    /**
   * Execute a mutation function.
   *
   * @param mutation - A {@link server.FunctionReference} for the public mutation
   * to run.
   * @param args - An arguments object for the mutation.
   * @param options - A {@link MutationOptions} options object for the mutation.
   * @returns A promise of the mutation's result.
   */ async mutation(mutation, args, options) {
        if (this.disabled) throw new Error("ConvexClient is disabled");
        return await this.client.mutation((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(mutation), args, options);
    }
    /**
   * Execute an action function.
   *
   * @param action - A {@link server.FunctionReference} for the public action
   * to run.
   * @param args - An arguments object for the action.
   * @returns A promise of the action's result.
   */ async action(action, args) {
        if (this.disabled) throw new Error("ConvexClient is disabled");
        return await this.client.action((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(action), args);
    }
    /**
   * Fetch a query result once.
   *
   * @param query - A {@link server.FunctionReference} for the public query
   * to run.
   * @param args - An arguments object for the query.
   * @returns A promise of the query's result.
   */ async query(query, args) {
        if (this.disabled) throw new Error("ConvexClient is disabled");
        const value = this.client.localQueryResult((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(query), args);
        if (value !== void 0) return Promise.resolve(value);
        return new Promise((resolve, reject)=>{
            const { unsubscribe } = this.onUpdate(query, args, (value2)=>{
                unsubscribe();
                resolve(value2);
            }, (e)=>{
                unsubscribe();
                reject(e);
            });
        });
    }
    /**
   * Get the current {@link ConnectionState} between the client and the Convex
   * backend.
   *
   * @returns The {@link ConnectionState} with the Convex backend.
   */ connectionState() {
        if (this.disabled) throw new Error("ConvexClient is disabled");
        return this.client.connectionState();
    }
    /**
   * Subscribe to the {@link ConnectionState} between the client and the Convex
   * backend, calling a callback each time it changes.
   *
   * Subscribed callbacks will be called when any part of ConnectionState changes.
   * ConnectionState may grow in future versions (e.g. to provide a array of
   * inflight requests) in which case callbacks would be called more frequently.
   *
   * @returns An unsubscribe function to stop listening.
   */ subscribeToConnectionState(cb) {
        if (this.disabled) return ()=>{};
        return this.client.subscribeToConnectionState(cb);
    }
} //# sourceMappingURL=simple_client.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/http_client.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConvexHttpClient",
    ()=>ConvexHttpClient,
    "STATUS_CODE_BAD_REQUEST",
    ()=>STATUS_CODE_BAD_REQUEST,
    "STATUS_CODE_OK",
    ()=>STATUS_CODE_OK,
    "STATUS_CODE_UDF_FAILED",
    ()=>STATUS_CODE_UDF_FAILED,
    "setFetch",
    ()=>setFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/errors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/logging.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
;
;
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UDF_FAILED = 560;
let specifiedFetch = void 0;
function setFetch(f) {
    specifiedFetch = f;
}
class ConvexHttpClient {
    /**
   * Create a new {@link ConvexHttpClient}.
   *
   * @param address - The url of your Convex deployment, often provided
   * by an environment variable. E.g. `https://small-mouse-123.convex.cloud`.
   * @param options - An object of options.
   * - `skipConvexDeploymentUrlCheck` - Skip validating that the Convex deployment URL looks like
   * `https://happy-animal-123.convex.cloud` or localhost. This can be useful if running a self-hosted
   * Convex backend that uses a different URL.
   * - `logger` - A logger or a boolean. If not provided, logs to the console.
   * You can construct your own logger to customize logging to log elsewhere
   * or not log at all, or use `false` as a shorthand for a no-op logger.
   * A logger is an object with 4 methods: log(), warn(), error(), and logVerbose().
   * These methods can receive multiple arguments of any types, like console.log().
   * - `auth` - A JWT containing identity claims accessible in Convex functions.
   * This identity may expire so it may be necessary to call `setAuth()` later,
   * but for short-lived clients it's convenient to specify this value here.
   */ constructor(address, options){
        __publicField(this, "address");
        __publicField(this, "auth");
        __publicField(this, "adminAuth");
        __publicField(this, "encodedTsPromise");
        __publicField(this, "debug");
        __publicField(this, "fetchOptions");
        __publicField(this, "logger");
        __publicField(this, "mutationQueue", []);
        __publicField(this, "isProcessingQueue", false);
        if (typeof options === "boolean") {
            throw new Error("skipConvexDeploymentUrlCheck as the second argument is no longer supported. Please pass an options object, `{ skipConvexDeploymentUrlCheck: true }`.");
        }
        const opts = options ?? {};
        if (opts.skipConvexDeploymentUrlCheck !== true) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateDeploymentUrl"])(address);
        }
        this.logger = options?.logger === false ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["instantiateNoopLogger"])({
            verbose: false
        }) : options?.logger !== true && options?.logger ? options.logger : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["instantiateDefaultLogger"])({
            verbose: false
        });
        this.address = address;
        this.debug = true;
        this.auth = void 0;
        this.adminAuth = void 0;
        if (options?.auth) {
            this.setAuth(options.auth);
        }
    }
    /**
   * Obtain the {@link ConvexHttpClient}'s URL to its backend.
   * @deprecated Use url, which returns the url without /api at the end.
   *
   * @returns The URL to the Convex backend, including the client's API version.
   */ backendUrl() {
        return `${this.address}/api`;
    }
    /**
   * Return the address for this client, useful for creating a new client.
   *
   * Not guaranteed to match the address with which this client was constructed:
   * it may be canonicalized.
   */ get url() {
        return this.address;
    }
    /**
   * Set the authentication token to be used for subsequent queries and mutations.
   *
   * Should be called whenever the token changes (i.e. due to expiration and refresh).
   *
   * @param value - JWT-encoded OpenID Connect identity token.
   */ setAuth(value) {
        this.clearAuth();
        this.auth = value;
    }
    /**
   * Set admin auth token to allow calling internal queries, mutations, and actions
   * and acting as an identity.
   *
   * @internal
   */ setAdminAuth(token, actingAsIdentity) {
        this.clearAuth();
        if (actingAsIdentity !== void 0) {
            const bytes = new TextEncoder().encode(JSON.stringify(actingAsIdentity));
            const actingAsIdentityEncoded = btoa(String.fromCodePoint(...bytes));
            this.adminAuth = `${token}:${actingAsIdentityEncoded}`;
        } else {
            this.adminAuth = token;
        }
    }
    /**
   * Clear the current authentication token if set.
   */ clearAuth() {
        this.auth = void 0;
        this.adminAuth = void 0;
    }
    /**
   * Sets whether the result log lines should be printed on the console or not.
   *
   * @internal
   */ setDebug(debug) {
        this.debug = debug;
    }
    /**
   * Used to customize the fetch behavior in some runtimes.
   *
   * @internal
   */ setFetchOptions(fetchOptions) {
        this.fetchOptions = fetchOptions;
    }
    /**
   * This API is experimental: it may change or disappear.
   *
   * Execute a Convex query function at the same timestamp as every other
   * consistent query execution run by this HTTP client.
   *
   * This doesn't make sense for long-lived ConvexHttpClients as Convex
   * backends can read a limited amount into the past: beyond 30 seconds
   * in the past may not be available.
   *
   * Create a new client to use a consistent time.
   *
   * @param name - The name of the query.
   * @param args - The arguments object for the query. If this is omitted,
   * the arguments will be `{}`.
   * @returns A promise of the query's result.
   *
   * @deprecated This API is experimental: it may change or disappear.
   */ async consistentQuery(query, ...args) {
        const queryArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args[0]);
        const timestampPromise = this.getTimestamp();
        return await this.queryInner(query, queryArgs, {
            timestampPromise
        });
    }
    async getTimestamp() {
        if (this.encodedTsPromise) {
            return this.encodedTsPromise;
        }
        return this.encodedTsPromise = this.getTimestampInner();
    }
    async getTimestampInner() {
        const localFetch = specifiedFetch || fetch;
        const headers = {
            "Content-Type": "application/json",
            "Convex-Client": `npm-${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]}`
        };
        const response = await localFetch(`${this.address}/api/query_ts`, {
            ...this.fetchOptions,
            method: "POST",
            headers
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }
        const { ts } = await response.json();
        return ts;
    }
    /**
   * Execute a Convex query function.
   *
   * @param name - The name of the query.
   * @param args - The arguments object for the query. If this is omitted,
   * the arguments will be `{}`.
   * @returns A promise of the query's result.
   */ async query(query, ...args) {
        const queryArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args[0]);
        return await this.queryInner(query, queryArgs, {});
    }
    async queryInner(query, queryArgs, options) {
        const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(query);
        const args = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(queryArgs)
        ];
        const headers = {
            "Content-Type": "application/json",
            "Convex-Client": `npm-${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]}`
        };
        if (this.adminAuth) {
            headers["Authorization"] = `Convex ${this.adminAuth}`;
        } else if (this.auth) {
            headers["Authorization"] = `Bearer ${this.auth}`;
        }
        const localFetch = specifiedFetch || fetch;
        const timestamp = options.timestampPromise ? await options.timestampPromise : void 0;
        const body = JSON.stringify({
            path: name,
            format: "convex_encoded_json",
            args,
            ...timestamp ? {
                ts: timestamp
            } : {}
        });
        const endpoint = timestamp ? `${this.address}/api/query_at_ts` : `${this.address}/api/query`;
        const response = await localFetch(endpoint, {
            ...this.fetchOptions,
            body,
            method: "POST",
            headers
        });
        if (!response.ok && response.status !== STATUS_CODE_UDF_FAILED) {
            throw new Error(await response.text());
        }
        const respJSON = await response.json();
        if (this.debug) {
            for (const line of respJSON.logLines ?? []){
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logForFunction"])(this.logger, "info", "query", name, line);
            }
        }
        switch(respJSON.status){
            case "success":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(respJSON.value);
            case "error":
                if (respJSON.errorData !== void 0) {
                    throw forwardErrorData(respJSON.errorData, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConvexError"](respJSON.errorMessage));
                }
                throw new Error(respJSON.errorMessage);
            default:
                throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
        }
    }
    async mutationInner(mutation, mutationArgs) {
        const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(mutation);
        const body = JSON.stringify({
            path: name,
            format: "convex_encoded_json",
            args: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(mutationArgs)
            ]
        });
        const headers = {
            "Content-Type": "application/json",
            "Convex-Client": `npm-${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]}`
        };
        if (this.adminAuth) {
            headers["Authorization"] = `Convex ${this.adminAuth}`;
        } else if (this.auth) {
            headers["Authorization"] = `Bearer ${this.auth}`;
        }
        const localFetch = specifiedFetch || fetch;
        const response = await localFetch(`${this.address}/api/mutation`, {
            ...this.fetchOptions,
            body,
            method: "POST",
            headers
        });
        if (!response.ok && response.status !== STATUS_CODE_UDF_FAILED) {
            throw new Error(await response.text());
        }
        const respJSON = await response.json();
        if (this.debug) {
            for (const line of respJSON.logLines ?? []){
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logForFunction"])(this.logger, "info", "mutation", name, line);
            }
        }
        switch(respJSON.status){
            case "success":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(respJSON.value);
            case "error":
                if (respJSON.errorData !== void 0) {
                    throw forwardErrorData(respJSON.errorData, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConvexError"](respJSON.errorMessage));
                }
                throw new Error(respJSON.errorMessage);
            default:
                throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
        }
    }
    async processMutationQueue() {
        if (this.isProcessingQueue) {
            return;
        }
        this.isProcessingQueue = true;
        while(this.mutationQueue.length > 0){
            const { mutation, args, resolve, reject } = this.mutationQueue.shift();
            try {
                const result = await this.mutationInner(mutation, args);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }
        this.isProcessingQueue = false;
    }
    enqueueMutation(mutation, args) {
        return new Promise((resolve, reject)=>{
            this.mutationQueue.push({
                mutation,
                args,
                resolve,
                reject
            });
            void this.processMutationQueue();
        });
    }
    /**
   * Execute a Convex mutation function. Mutations are queued by default.
   *
   * @param name - The name of the mutation.
   * @param args - The arguments object for the mutation. If this is omitted,
   * the arguments will be `{}`.
   * @param options - An optional object containing
   * @returns A promise of the mutation's result.
   */ async mutation(mutation, ...args) {
        const [fnArgs, options] = args;
        const mutationArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(fnArgs);
        const queued = !options?.skipQueue;
        if (queued) {
            return await this.enqueueMutation(mutation, mutationArgs);
        } else {
            return await this.mutationInner(mutation, mutationArgs);
        }
    }
    /**
   * Execute a Convex action function. Actions are not queued.
   *
   * @param name - The name of the action.
   * @param args - The arguments object for the action. If this is omitted,
   * the arguments will be `{}`.
   * @returns A promise of the action's result.
   */ async action(action, ...args) {
        const actionArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args[0]);
        const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(action);
        const body = JSON.stringify({
            path: name,
            format: "convex_encoded_json",
            args: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(actionArgs)
            ]
        });
        const headers = {
            "Content-Type": "application/json",
            "Convex-Client": `npm-${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]}`
        };
        if (this.adminAuth) {
            headers["Authorization"] = `Convex ${this.adminAuth}`;
        } else if (this.auth) {
            headers["Authorization"] = `Bearer ${this.auth}`;
        }
        const localFetch = specifiedFetch || fetch;
        const response = await localFetch(`${this.address}/api/action`, {
            ...this.fetchOptions,
            body,
            method: "POST",
            headers
        });
        if (!response.ok && response.status !== STATUS_CODE_UDF_FAILED) {
            throw new Error(await response.text());
        }
        const respJSON = await response.json();
        if (this.debug) {
            for (const line of respJSON.logLines ?? []){
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logForFunction"])(this.logger, "info", "action", name, line);
            }
        }
        switch(respJSON.status){
            case "success":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(respJSON.value);
            case "error":
                if (respJSON.errorData !== void 0) {
                    throw forwardErrorData(respJSON.errorData, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConvexError"](respJSON.errorMessage));
                }
                throw new Error(respJSON.errorMessage);
            default:
                throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
        }
    }
    /**
   * Execute a Convex function of an unknown type. These function calls are not queued.
   *
   * @param name - The name of the function.
   * @param args - The arguments object for the function. If this is omitted,
   * the arguments will be `{}`.
   * @returns A promise of the function's result.
   *
   * @internal
   */ async function(anyFunction, componentPath, ...args) {
        const functionArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args[0]);
        const name = typeof anyFunction === "string" ? anyFunction : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(anyFunction);
        const body = JSON.stringify({
            componentPath,
            path: name,
            format: "convex_encoded_json",
            args: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(functionArgs)
        });
        const headers = {
            "Content-Type": "application/json",
            "Convex-Client": `npm-${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]}`
        };
        if (this.adminAuth) {
            headers["Authorization"] = `Convex ${this.adminAuth}`;
        } else if (this.auth) {
            headers["Authorization"] = `Bearer ${this.auth}`;
        }
        const localFetch = specifiedFetch || fetch;
        const response = await localFetch(`${this.address}/api/function`, {
            ...this.fetchOptions,
            body,
            method: "POST",
            headers
        });
        if (!response.ok && response.status !== STATUS_CODE_UDF_FAILED) {
            throw new Error(await response.text());
        }
        const respJSON = await response.json();
        if (this.debug) {
            for (const line of respJSON.logLines ?? []){
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$logging$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logForFunction"])(this.logger, "info", "any", name, line);
            }
        }
        switch(respJSON.status){
            case "success":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(respJSON.value);
            case "error":
                if (respJSON.errorData !== void 0) {
                    throw forwardErrorData(respJSON.errorData, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConvexError"](respJSON.errorMessage));
                }
                throw new Error(respJSON.errorMessage);
            default:
                throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
        }
    }
}
function forwardErrorData(errorData, error) {
    error.data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(errorData);
    return error;
} //# sourceMappingURL=http_client.js.map
}),
"[project]/node_modules/convex/dist/esm/browser/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$sync$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/sync/client.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$simple_client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/simple_client.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$http_client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/http_client.js [app-rsc] (ecmascript)"); //# sourceMappingURL=index.js.map
"use strict";
;
;
;
}),
"[project]/node_modules/convex/dist/esm/server/database.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use strict"; //# sourceMappingURL=database.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "performAsyncSyscall",
    ()=>performAsyncSyscall,
    "performJsSyscall",
    ()=>performJsSyscall,
    "performSyscall",
    ()=>performSyscall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/errors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
"use strict";
;
;
function performSyscall(op, arg) {
    if (typeof Convex === "undefined" || Convex.syscall === void 0) {
        throw new Error("The Convex database and auth objects are being used outside of a Convex backend. Did you mean to use `useQuery` or `useMutation` to call a Convex function?");
    }
    const resultStr = Convex.syscall(op, JSON.stringify(arg));
    return JSON.parse(resultStr);
}
async function performAsyncSyscall(op, arg) {
    if (typeof Convex === "undefined" || Convex.asyncSyscall === void 0) {
        throw new Error("The Convex database and auth objects are being used outside of a Convex backend. Did you mean to use `useQuery` or `useMutation` to call a Convex function?");
    }
    let resultStr;
    try {
        resultStr = await Convex.asyncSyscall(op, JSON.stringify(arg));
    } catch (e) {
        if (e.data !== void 0) {
            const rethrown = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConvexError"](e.message);
            rethrown.data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(e.data);
            throw rethrown;
        }
        throw new Error(e.message);
    }
    return JSON.parse(resultStr);
}
function performJsSyscall(op, arg) {
    if (typeof Convex === "undefined" || Convex.jsSyscall === void 0) {
        throw new Error("The Convex database and auth objects are being used outside of a Convex backend. Did you mean to use `useQuery` or `useMutation` to call a Convex function?");
    }
    return Convex.jsSyscall(op, arg);
} //# sourceMappingURL=syscall.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/actions_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupActionCalls",
    ()=>setupActionCalls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/components/paths.js [app-rsc] (ecmascript)");
"use strict";
;
;
;
;
;
function syscallArgs(requestId, functionReference, args) {
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionAddress"])(functionReference);
    return {
        ...address,
        args: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args)),
        version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"],
        requestId
    };
}
function setupActionCalls(requestId) {
    return {
        runQuery: async (query, args)=>{
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/query", syscallArgs(requestId, query, args));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(result);
        },
        runMutation: async (mutation, args)=>{
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/mutation", syscallArgs(requestId, mutation, args));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(result);
        },
        runAction: async (action, args)=>{
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/action", syscallArgs(requestId, action, args));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(result);
        }
    };
} //# sourceMappingURL=actions_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/vector_search.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterExpression",
    ()=>FilterExpression
]);
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class FilterExpression {
    /**
   * @internal
   */ constructor(){
        // Property for nominal type support.
        __publicField(this, "_isExpression");
        // Property to distinguish expressions by the type they resolve to.
        __publicField(this, "_value");
    }
} //# sourceMappingURL=vector_search.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/validate.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validateArg",
    ()=>validateArg,
    "validateArgIsInteger",
    ()=>validateArgIsInteger,
    "validateArgIsNonNegativeInteger",
    ()=>validateArgIsNonNegativeInteger
]);
"use strict";
function validateArg(arg, idx, method, argName) {
    if (arg === void 0) {
        throw new TypeError(`Must provide arg ${idx} \`${argName}\` to \`${method}\``);
    }
}
function validateArgIsInteger(arg, idx, method, argName) {
    if (!Number.isInteger(arg)) {
        throw new TypeError(`Arg ${idx} \`${argName}\` to \`${method}\` must be an integer`);
    }
}
function validateArgIsNonNegativeInteger(arg, idx, method, argName) {
    if (!Number.isInteger(arg) || arg < 0) {
        throw new TypeError(`Arg ${idx} \`${argName}\` to \`${method}\` must be a non-negative integer`);
    }
} //# sourceMappingURL=validate.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/vector_search_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExpressionImpl",
    ()=>ExpressionImpl,
    "VectorQueryImpl",
    ()=>VectorQueryImpl,
    "filterBuilderImpl",
    ()=>filterBuilderImpl,
    "serializeExpression",
    ()=>serializeExpression,
    "setupActionVectorSearch",
    ()=>setupActionVectorSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$vector_search$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/vector_search.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/validate.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
;
;
function setupActionVectorSearch(requestId) {
    return async (tableName, indexName, query)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(tableName, 1, "vectorSearch", "tableName");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(indexName, 2, "vectorSearch", "indexName");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(query, 3, "vectorSearch", "query");
        if (!query.vector || !Array.isArray(query.vector) || query.vector.length === 0) {
            throw Error("`vector` must be a non-empty Array in vectorSearch");
        }
        return await new VectorQueryImpl(requestId, tableName + "." + indexName, query).collect();
    };
}
class VectorQueryImpl {
    constructor(requestId, indexName, query){
        __publicField(this, "requestId");
        __publicField(this, "state");
        this.requestId = requestId;
        const filters = query.filter ? serializeExpression(query.filter(filterBuilderImpl)) : null;
        this.state = {
            type: "preparing",
            query: {
                indexName,
                limit: query.limit,
                vector: query.vector,
                expressions: filters
            }
        };
    }
    async collect() {
        if (this.state.type === "consumed") {
            throw new Error("This query is closed and can't emit any more values.");
        }
        const query = this.state.query;
        this.state = {
            type: "consumed"
        };
        const { results } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/vectorSearch", {
            requestId: this.requestId,
            version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"],
            query
        });
        return results;
    }
}
class ExpressionImpl extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$vector_search$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FilterExpression"] {
    constructor(inner){
        super();
        __publicField(this, "inner");
        this.inner = inner;
    }
    serialize() {
        return this.inner;
    }
}
function serializeExpression(expr) {
    if (expr instanceof ExpressionImpl) {
        return expr.serialize();
    } else {
        return {
            $literal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(expr)
        };
    }
}
const filterBuilderImpl = {
    //  Comparisons  /////////////////////////////////////////////////////////////
    eq (fieldName, value) {
        if (typeof fieldName !== "string") {
            throw new Error("The first argument to `q.eq` must be a field name.");
        }
        return new ExpressionImpl({
            $eq: [
                serializeExpression(new ExpressionImpl({
                    $field: fieldName
                })),
                serializeExpression(value)
            ]
        });
    },
    //  Logic  ///////////////////////////////////////////////////////////////////
    or (...exprs) {
        return new ExpressionImpl({
            $or: exprs.map(serializeExpression)
        });
    }
}; //# sourceMappingURL=vector_search_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/authentication_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupAuth",
    ()=>setupAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)");
"use strict";
;
function setupAuth(requestId) {
    return {
        getUserIdentity: async ()=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/getUserIdentity", {
                requestId
            });
        }
    };
} //# sourceMappingURL=authentication_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/filter_builder.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Expression",
    ()=>Expression
]);
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class Expression {
    /**
   * @internal
   */ constructor(){
        // Property for nominal type support.
        __publicField(this, "_isExpression");
        // Property to distinguish expressions by the type they resolve to.
        __publicField(this, "_value");
    }
} //# sourceMappingURL=filter_builder.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/filter_builder_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExpressionImpl",
    ()=>ExpressionImpl,
    "filterBuilderImpl",
    ()=>filterBuilderImpl,
    "serializeExpression",
    ()=>serializeExpression
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$filter_builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/filter_builder.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
class ExpressionImpl extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$filter_builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Expression"] {
    constructor(inner){
        super();
        __publicField(this, "inner");
        this.inner = inner;
    }
    serialize() {
        return this.inner;
    }
}
function serializeExpression(expr) {
    if (expr instanceof ExpressionImpl) {
        return expr.serialize();
    } else {
        return {
            $literal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(expr)
        };
    }
}
const filterBuilderImpl = {
    //  Comparisons  /////////////////////////////////////////////////////////////
    eq (l, r) {
        return new ExpressionImpl({
            $eq: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    neq (l, r) {
        return new ExpressionImpl({
            $neq: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    lt (l, r) {
        return new ExpressionImpl({
            $lt: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    lte (l, r) {
        return new ExpressionImpl({
            $lte: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    gt (l, r) {
        return new ExpressionImpl({
            $gt: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    gte (l, r) {
        return new ExpressionImpl({
            $gte: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    //  Arithmetic  //////////////////////////////////////////////////////////////
    add (l, r) {
        return new ExpressionImpl({
            $add: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    sub (l, r) {
        return new ExpressionImpl({
            $sub: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    mul (l, r) {
        return new ExpressionImpl({
            $mul: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    div (l, r) {
        return new ExpressionImpl({
            $div: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    mod (l, r) {
        return new ExpressionImpl({
            $mod: [
                serializeExpression(l),
                serializeExpression(r)
            ]
        });
    },
    neg (x) {
        return new ExpressionImpl({
            $neg: serializeExpression(x)
        });
    },
    //  Logic  ///////////////////////////////////////////////////////////////////
    and (...exprs) {
        return new ExpressionImpl({
            $and: exprs.map(serializeExpression)
        });
    },
    or (...exprs) {
        return new ExpressionImpl({
            $or: exprs.map(serializeExpression)
        });
    },
    not (x) {
        return new ExpressionImpl({
            $not: serializeExpression(x)
        });
    },
    //  Other  ///////////////////////////////////////////////////////////////////
    field (fieldPath) {
        return new ExpressionImpl({
            $field: fieldPath
        });
    }
}; //# sourceMappingURL=filter_builder_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/index_range_builder.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndexRange",
    ()=>IndexRange
]);
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class IndexRange {
    /**
   * @internal
   */ constructor(){
        // Property for nominal type support.
        __publicField(this, "_isIndexRange");
    }
} //# sourceMappingURL=index_range_builder.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/index_range_builder_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndexRangeBuilderImpl",
    ()=>IndexRangeBuilderImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$index_range_builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/index_range_builder.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
class IndexRangeBuilderImpl extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$index_range_builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IndexRange"] {
    constructor(rangeExpressions){
        super();
        __publicField(this, "rangeExpressions");
        __publicField(this, "isConsumed");
        this.rangeExpressions = rangeExpressions;
        this.isConsumed = false;
    }
    static new() {
        return new IndexRangeBuilderImpl([]);
    }
    consume() {
        if (this.isConsumed) {
            throw new Error("IndexRangeBuilder has already been used! Chain your method calls like `q => q.eq(...).eq(...)`. See https://docs.convex.dev/using/indexes");
        }
        this.isConsumed = true;
    }
    eq(fieldName, value) {
        this.consume();
        return new IndexRangeBuilderImpl(this.rangeExpressions.concat({
            type: "Eq",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    gt(fieldName, value) {
        this.consume();
        return new IndexRangeBuilderImpl(this.rangeExpressions.concat({
            type: "Gt",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    gte(fieldName, value) {
        this.consume();
        return new IndexRangeBuilderImpl(this.rangeExpressions.concat({
            type: "Gte",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    lt(fieldName, value) {
        this.consume();
        return new IndexRangeBuilderImpl(this.rangeExpressions.concat({
            type: "Lt",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    lte(fieldName, value) {
        this.consume();
        return new IndexRangeBuilderImpl(this.rangeExpressions.concat({
            type: "Lte",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    export() {
        this.consume();
        return this.rangeExpressions;
    }
} //# sourceMappingURL=index_range_builder_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/search_filter_builder.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchFilter",
    ()=>SearchFilter
]);
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class SearchFilter {
    /**
   * @internal
   */ constructor(){
        // Property for nominal type support.
        __publicField(this, "_isSearchFilter");
    }
} //# sourceMappingURL=search_filter_builder.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/search_filter_builder_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchFilterBuilderImpl",
    ()=>SearchFilterBuilderImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$search_filter_builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/search_filter_builder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/validate.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
class SearchFilterBuilderImpl extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$search_filter_builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SearchFilter"] {
    constructor(filters){
        super();
        __publicField(this, "filters");
        __publicField(this, "isConsumed");
        this.filters = filters;
        this.isConsumed = false;
    }
    static new() {
        return new SearchFilterBuilderImpl([]);
    }
    consume() {
        if (this.isConsumed) {
            throw new Error("SearchFilterBuilder has already been used! Chain your method calls like `q => q.search(...).eq(...)`.");
        }
        this.isConsumed = true;
    }
    search(fieldName, query) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(fieldName, 1, "search", "fieldName");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(query, 2, "search", "query");
        this.consume();
        return new SearchFilterBuilderImpl(this.filters.concat({
            type: "Search",
            fieldPath: fieldName,
            value: query
        }));
    }
    eq(fieldName, value) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(fieldName, 1, "eq", "fieldName");
        if (arguments.length !== 2) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(value, 2, "search", "value");
        }
        this.consume();
        return new SearchFilterBuilderImpl(this.filters.concat({
            type: "Eq",
            fieldPath: fieldName,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexOrUndefinedToJson"])(value)
        }));
    }
    export() {
        this.consume();
        return this.filters;
    }
} //# sourceMappingURL=search_filter_builder_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/query_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryImpl",
    ()=>QueryImpl,
    "QueryInitializerImpl",
    ()=>QueryInitializerImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$filter_builder_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/filter_builder_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$index_range_builder_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/index_range_builder_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$search_filter_builder_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/search_filter_builder_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/validate.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/index.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
;
;
;
;
const MAX_QUERY_OPERATORS = 256;
class QueryInitializerImpl {
    constructor(tableName){
        __publicField(this, "tableName");
        this.tableName = tableName;
    }
    withIndex(indexName, indexRange) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(indexName, 1, "withIndex", "indexName");
        let rangeBuilder = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$index_range_builder_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IndexRangeBuilderImpl"].new();
        if (indexRange !== void 0) {
            rangeBuilder = indexRange(rangeBuilder);
        }
        return new QueryImpl({
            source: {
                type: "IndexRange",
                indexName: this.tableName + "." + indexName,
                range: rangeBuilder.export(),
                order: null
            },
            operators: []
        });
    }
    withSearchIndex(indexName, searchFilter) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(indexName, 1, "withSearchIndex", "indexName");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(searchFilter, 2, "withSearchIndex", "searchFilter");
        const searchFilterBuilder = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$search_filter_builder_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SearchFilterBuilderImpl"].new();
        return new QueryImpl({
            source: {
                type: "Search",
                indexName: this.tableName + "." + indexName,
                filters: searchFilter(searchFilterBuilder).export()
            },
            operators: []
        });
    }
    fullTableScan() {
        return new QueryImpl({
            source: {
                type: "FullTableScan",
                tableName: this.tableName,
                order: null
            },
            operators: []
        });
    }
    order(order) {
        return this.fullTableScan().order(order);
    }
    // This is internal API and should not be exposed to developers yet.
    async count() {
        const syscallJSON = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/count", {
            table: this.tableName
        });
        const syscallResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(syscallJSON);
        return syscallResult;
    }
    filter(predicate) {
        return this.fullTableScan().filter(predicate);
    }
    limit(n) {
        return this.fullTableScan().limit(n);
    }
    collect() {
        return this.fullTableScan().collect();
    }
    take(n) {
        return this.fullTableScan().take(n);
    }
    paginate(paginationOpts) {
        return this.fullTableScan().paginate(paginationOpts);
    }
    first() {
        return this.fullTableScan().first();
    }
    unique() {
        return this.fullTableScan().unique();
    }
    [Symbol.asyncIterator]() {
        return this.fullTableScan()[Symbol.asyncIterator]();
    }
}
function throwClosedError(type) {
    throw new Error(type === "consumed" ? "This query is closed and can't emit any more values." : "This query has been chained with another operator and can't be reused.");
}
class QueryImpl {
    constructor(query){
        __publicField(this, "state");
        __publicField(this, "tableNameForErrorMessages");
        this.state = {
            type: "preparing",
            query
        };
        if (query.source.type === "FullTableScan") {
            this.tableNameForErrorMessages = query.source.tableName;
        } else {
            this.tableNameForErrorMessages = query.source.indexName.split(".")[0];
        }
    }
    takeQuery() {
        if (this.state.type !== "preparing") {
            throw new Error("A query can only be chained once and can't be chained after iteration begins.");
        }
        const query = this.state.query;
        this.state = {
            type: "closed"
        };
        return query;
    }
    startQuery() {
        if (this.state.type === "executing") {
            throw new Error("Iteration can only begin on a query once.");
        }
        if (this.state.type === "closed" || this.state.type === "consumed") {
            throwClosedError(this.state.type);
        }
        const query = this.state.query;
        const { queryId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performSyscall"])("1.0/queryStream", {
            query,
            version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]
        });
        this.state = {
            type: "executing",
            queryId
        };
        return queryId;
    }
    closeQuery() {
        if (this.state.type === "executing") {
            const queryId = this.state.queryId;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performSyscall"])("1.0/queryCleanup", {
                queryId
            });
        }
        this.state = {
            type: "consumed"
        };
    }
    order(order) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(order, 1, "order", "order");
        const query = this.takeQuery();
        if (query.source.type === "Search") {
            throw new Error("Search queries must always be in relevance order. Can not set order manually.");
        }
        if (query.source.order !== null) {
            throw new Error("Queries may only specify order at most once");
        }
        query.source.order = order;
        return new QueryImpl(query);
    }
    filter(predicate) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(predicate, 1, "filter", "predicate");
        const query = this.takeQuery();
        if (query.operators.length >= MAX_QUERY_OPERATORS) {
            throw new Error(`Can't construct query with more than ${MAX_QUERY_OPERATORS} operators`);
        }
        query.operators.push({
            filter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$filter_builder_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializeExpression"])(predicate(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$filter_builder_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["filterBuilderImpl"]))
        });
        return new QueryImpl(query);
    }
    limit(n) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(n, 1, "limit", "n");
        const query = this.takeQuery();
        query.operators.push({
            limit: n
        });
        return new QueryImpl(query);
    }
    [Symbol.asyncIterator]() {
        this.startQuery();
        return this;
    }
    async next() {
        if (this.state.type === "closed" || this.state.type === "consumed") {
            throwClosedError(this.state.type);
        }
        const queryId = this.state.type === "preparing" ? this.startQuery() : this.state.queryId;
        const { value, done } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/queryStreamNext", {
            queryId
        });
        if (done) {
            this.closeQuery();
        }
        const convexValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(value);
        return {
            value: convexValue,
            done
        };
    }
    return() {
        this.closeQuery();
        return Promise.resolve({
            done: true,
            value: void 0
        });
    }
    async paginate(paginationOpts) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(paginationOpts, 1, "paginate", "options");
        if (typeof paginationOpts?.numItems !== "number" || paginationOpts.numItems < 0) {
            throw new Error(`\`options.numItems\` must be a positive number. Received \`${paginationOpts?.numItems}\`.`);
        }
        const query = this.takeQuery();
        const pageSize = paginationOpts.numItems;
        const cursor = paginationOpts.cursor;
        const endCursor = paginationOpts?.endCursor ?? null;
        const maximumRowsRead = paginationOpts.maximumRowsRead ?? null;
        const { page, isDone, continueCursor, splitCursor, pageStatus } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/queryPage", {
            query,
            cursor,
            endCursor,
            pageSize,
            maximumRowsRead,
            maximumBytesRead: paginationOpts.maximumBytesRead,
            version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]
        });
        return {
            page: page.map((json)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(json)),
            isDone,
            continueCursor,
            splitCursor,
            pageStatus
        };
    }
    async collect() {
        const out = [];
        for await (const item of this){
            out.push(item);
        }
        return out;
    }
    async take(n) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(n, 1, "take", "n");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArgIsNonNegativeInteger"])(n, 1, "take", "n");
        return this.limit(n).collect();
    }
    async first() {
        const first_array = await this.take(1);
        return first_array.length === 0 ? null : first_array[0];
    }
    async unique() {
        const first_two_array = await this.take(2);
        if (first_two_array.length === 0) {
            return null;
        }
        if (first_two_array.length === 2) {
            throw new Error(`unique() query returned more than one result from table ${this.tableNameForErrorMessages}:
 [${first_two_array[0]._id}, ${first_two_array[1]._id}, ...]`);
        }
        return first_two_array[0];
    }
} //# sourceMappingURL=query_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/database_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupReader",
    ()=>setupReader,
    "setupWriter",
    ()=>setupWriter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$query_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/query_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/validate.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/index.js [app-rsc] (ecmascript)");
"use strict";
;
;
;
;
;
;
async function get(table, id, isSystem) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "get", "id");
    if (typeof id !== "string") {
        throw new Error(`Invalid argument \`id\` for \`db.get\`, expected string but got '${typeof id}': ${id}`);
    }
    const args = {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(id),
        isSystem,
        version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"],
        table
    };
    const syscallJSON = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/get", args);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(syscallJSON);
}
function setupReader() {
    const reader = (isSystem = false)=>{
        return {
            get: async (arg0, arg1)=>{
                return arg1 !== void 0 ? await get(arg0, arg1, isSystem) : await get(void 0, arg0, isSystem);
            },
            query: (tableName)=>{
                return new TableReader(tableName, isSystem).query();
            },
            normalizeId: (tableName, id)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(tableName, 1, "normalizeId", "tableName");
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(id, 2, "normalizeId", "id");
                const accessingSystemTable = tableName.startsWith("_");
                if (accessingSystemTable !== isSystem) {
                    throw new Error(`${accessingSystemTable ? "System" : "User"} tables can only be accessed from db.${isSystem ? "" : "system."}normalizeId().`);
                }
                const syscallJSON = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performSyscall"])("1.0/db/normalizeId", {
                    table: tableName,
                    idString: id
                });
                const syscallResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(syscallJSON);
                return syscallResult.id;
            },
            // We set the system reader on the next line
            system: null,
            table: (tableName)=>{
                return new TableReader(tableName, isSystem);
            }
        };
    };
    const { system: _, ...rest } = reader(true);
    const r = reader();
    r.system = rest;
    return r;
}
async function insert(tableName, value) {
    if (tableName.startsWith("_")) {
        throw new Error("System tables (prefixed with `_`) are read-only.");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(tableName, 1, "insert", "table");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(value, 2, "insert", "value");
    const syscallJSON = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/insert", {
        table: tableName,
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(value)
    });
    const syscallResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(syscallJSON);
    return syscallResult._id;
}
async function patch(table, id, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "patch", "id");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(value, 2, "patch", "value");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/shallowMerge", {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(id),
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["patchValueToJson"])(value),
        table
    });
}
async function replace(table, id, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "replace", "id");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(value, 2, "replace", "value");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/replace", {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(id),
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(value),
        table
    });
}
async function delete_(table, id) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "delete", "id");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/remove", {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(id),
        table
    });
}
function setupWriter() {
    const reader = setupReader();
    return {
        get: reader.get,
        query: reader.query,
        normalizeId: reader.normalizeId,
        system: reader.system,
        insert: async (table, value)=>{
            return await insert(table, value);
        },
        patch: async (arg0, arg1, arg2)=>{
            return arg2 !== void 0 ? await patch(arg0, arg1, arg2) : await patch(void 0, arg0, arg1);
        },
        replace: async (arg0, arg1, arg2)=>{
            return arg2 !== void 0 ? await replace(arg0, arg1, arg2) : await replace(void 0, arg0, arg1);
        },
        delete: async (arg0, arg1)=>{
            return arg1 !== void 0 ? await delete_(arg0, arg1) : await delete_(void 0, arg0);
        },
        table: (tableName)=>{
            return new TableWriter(tableName, false);
        }
    };
}
class TableReader {
    constructor(tableName, isSystem){
        this.tableName = tableName;
        this.isSystem = isSystem;
    }
    async get(id) {
        return get(this.tableName, id, this.isSystem);
    }
    query() {
        const accessingSystemTable = this.tableName.startsWith("_");
        if (accessingSystemTable !== this.isSystem) {
            throw new Error(`${accessingSystemTable ? "System" : "User"} tables can only be accessed from db.${this.isSystem ? "" : "system."}query().`);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$query_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryInitializerImpl"](this.tableName);
    }
}
class TableWriter extends TableReader {
    async insert(value) {
        return insert(this.tableName, value);
    }
    async patch(id, value) {
        return patch(this.tableName, id, value);
    }
    async replace(id, value) {
        return replace(this.tableName, id, value);
    }
    async delete(id) {
        return delete_(this.tableName, id);
    }
} //# sourceMappingURL=database_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/scheduler_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupActionScheduler",
    ()=>setupActionScheduler,
    "setupMutationScheduler",
    ()=>setupMutationScheduler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/validate.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/components/paths.js [app-rsc] (ecmascript)");
"use strict";
;
;
;
;
;
;
function setupMutationScheduler() {
    return {
        runAfter: async (delayMs, functionReference, args)=>{
            const syscallArgs = runAfterSyscallArgs(delayMs, functionReference, args);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/schedule", syscallArgs);
        },
        runAt: async (ms_since_epoch_or_date, functionReference, args)=>{
            const syscallArgs = runAtSyscallArgs(ms_since_epoch_or_date, functionReference, args);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/schedule", syscallArgs);
        },
        cancel: async (id)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "cancel", "id");
            const args = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(id)
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/cancel_job", args);
        }
    };
}
function setupActionScheduler(requestId) {
    return {
        runAfter: async (delayMs, functionReference, args)=>{
            const syscallArgs = {
                requestId,
                ...runAfterSyscallArgs(delayMs, functionReference, args)
            };
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/schedule", syscallArgs);
        },
        runAt: async (ms_since_epoch_or_date, functionReference, args)=>{
            const syscallArgs = {
                requestId,
                ...runAtSyscallArgs(ms_since_epoch_or_date, functionReference, args)
            };
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/schedule", syscallArgs);
        },
        cancel: async (id)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(id, 1, "cancel", "id");
            const syscallArgs = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(id)
            };
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/actions/cancel_job", syscallArgs);
        }
    };
}
function runAfterSyscallArgs(delayMs, functionReference, args) {
    if (typeof delayMs !== "number") {
        throw new Error("`delayMs` must be a number");
    }
    if (!isFinite(delayMs)) {
        throw new Error("`delayMs` must be a finite number");
    }
    if (delayMs < 0) {
        throw new Error("`delayMs` must be non-negative");
    }
    const functionArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionAddress"])(functionReference);
    const ts = (Date.now() + delayMs) / 1e3;
    return {
        ...address,
        ts,
        args: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(functionArgs),
        version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]
    };
}
function runAtSyscallArgs(ms_since_epoch_or_date, functionReference, args) {
    let ts;
    if (ms_since_epoch_or_date instanceof Date) {
        ts = ms_since_epoch_or_date.valueOf() / 1e3;
    } else if (typeof ms_since_epoch_or_date === "number") {
        ts = ms_since_epoch_or_date / 1e3;
    } else {
        throw new Error("The invoke time must a Date or a timestamp");
    }
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionAddress"])(functionReference);
    const functionArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
    return {
        ...address,
        ts,
        args: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(functionArgs),
        version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]
    };
} //# sourceMappingURL=scheduler_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/storage_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupStorageActionWriter",
    ()=>setupStorageActionWriter,
    "setupStorageReader",
    ()=>setupStorageReader,
    "setupStorageWriter",
    ()=>setupStorageWriter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/validate.js [app-rsc] (ecmascript)");
"use strict";
;
;
;
function setupStorageReader(requestId) {
    return {
        getUrl: async (storageId)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateArg"])(storageId, 1, "getUrl", "storageId");
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/storageGetUrl", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"],
                storageId
            });
        },
        getMetadata: async (storageId)=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/storageGetMetadata", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"],
                storageId
            });
        }
    };
}
function setupStorageWriter(requestId) {
    const reader = setupStorageReader(requestId);
    return {
        generateUploadUrl: async ()=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/storageGenerateUploadUrl", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]
            });
        },
        delete: async (storageId)=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/storageDelete", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"],
                storageId
            });
        },
        getUrl: reader.getUrl,
        getMetadata: reader.getMetadata
    };
}
function setupStorageActionWriter(requestId) {
    const writer = setupStorageWriter(requestId);
    return {
        ...writer,
        store: async (blob, options)=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performJsSyscall"])("storage/storeBlob", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"],
                blob,
                options
            });
        },
        get: async (storageId)=>{
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performJsSyscall"])("storage/getBlob", {
                requestId,
                version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"],
                storageId
            });
        }
    };
} //# sourceMappingURL=storage_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/impl/registration_impl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "actionGeneric",
    ()=>actionGeneric,
    "httpActionGeneric",
    ()=>httpActionGeneric,
    "internalActionGeneric",
    ()=>internalActionGeneric,
    "internalMutationGeneric",
    ()=>internalMutationGeneric,
    "internalQueryGeneric",
    ()=>internalQueryGeneric,
    "invokeFunction",
    ()=>invokeFunction,
    "mutationGeneric",
    ()=>mutationGeneric,
    "queryGeneric",
    ()=>queryGeneric,
    "validateReturnValue",
    ()=>validateReturnValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$actions_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/actions_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$vector_search_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/vector_search_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$authentication_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/authentication_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$database_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/database_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$query_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/query_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$scheduler_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/scheduler_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$storage_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/storage_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/components/paths.js [app-rsc] (ecmascript)");
"use strict";
;
;
;
;
;
;
;
;
;
;
;
;
async function invokeMutation(func, argsStr) {
    const requestId = "";
    const args = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(JSON.parse(argsStr));
    const mutationCtx = {
        db: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$database_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupWriter"])(),
        auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$authentication_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupAuth"])(requestId),
        storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$storage_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupStorageWriter"])(requestId),
        scheduler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$scheduler_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupMutationScheduler"])(),
        runQuery: (reference, args2)=>runUdf("query", reference, args2),
        runMutation: (reference, args2)=>runUdf("mutation", reference, args2)
    };
    const result = await invokeFunction(func, mutationCtx, args);
    validateReturnValue(result);
    return JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(result === void 0 ? null : result));
}
function validateReturnValue(v2) {
    if (v2 instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$query_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryInitializerImpl"] || v2 instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$query_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryImpl"]) {
        throw new Error("Return value is a Query. Results must be retrieved with `.collect()`, `.take(n), `.unique()`, or `.first()`.");
    }
}
async function invokeFunction(func, ctx, args) {
    let result;
    try {
        result = await Promise.resolve(func(ctx, ...args));
    } catch (thrown) {
        throw serializeConvexErrorData(thrown);
    }
    return result;
}
function dontCallDirectly(funcType, handler) {
    return (ctx, args)=>{
        globalThis.console.warn(`Convex functions should not directly call other Convex functions. Consider calling a helper function instead. e.g. \`export const foo = ${funcType}(...); await foo(ctx);\` is not supported. See https://docs.convex.dev/production/best-practices/#use-helper-functions-to-write-shared-code`);
        return handler(ctx, args);
    };
}
function serializeConvexErrorData(thrown) {
    if (typeof thrown === "object" && thrown !== null && Symbol.for("ConvexError") in thrown) {
        const error = thrown;
        error.data = JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(error.data === void 0 ? null : error.data));
        error.ConvexErrorSymbol = Symbol.for("ConvexError");
        return error;
    } else {
        return thrown;
    }
}
function assertNotBrowser() {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
    const isRealBrowser = undefined;
}
function strictReplacer(key, value) {
    if (value === void 0) {
        throw new Error(`Cannot serialize validator value \`undefined\` for ${key}`);
    }
    return value;
}
function exportArgs(functionDefinition) {
    return ()=>{
        let args = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].any();
        if (typeof functionDefinition === "object" && functionDefinition.args !== void 0) {
            args = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asObjectValidator"])(functionDefinition.args);
        }
        return JSON.stringify(args.json, strictReplacer);
    };
}
function exportReturns(functionDefinition) {
    return ()=>{
        let returns;
        if (typeof functionDefinition === "object" && functionDefinition.returns !== void 0) {
            returns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["asObjectValidator"])(functionDefinition.returns);
        }
        return JSON.stringify(returns ? returns.json : null, strictReplacer);
    };
}
const mutationGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("mutation", handler);
    assertNotBrowser();
    func.isMutation = true;
    func.isPublic = true;
    func.invokeMutation = (argsStr)=>invokeMutation(handler, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
const internalMutationGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("internalMutation", handler);
    assertNotBrowser();
    func.isMutation = true;
    func.isInternal = true;
    func.invokeMutation = (argsStr)=>invokeMutation(handler, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
async function invokeQuery(func, argsStr) {
    const requestId = "";
    const args = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(JSON.parse(argsStr));
    const queryCtx = {
        db: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$database_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupReader"])(),
        auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$authentication_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupAuth"])(requestId),
        storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$storage_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupStorageReader"])(requestId),
        runQuery: (reference, args2)=>runUdf("query", reference, args2)
    };
    const result = await invokeFunction(func, queryCtx, args);
    validateReturnValue(result);
    return JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(result === void 0 ? null : result));
}
const queryGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("query", handler);
    assertNotBrowser();
    func.isQuery = true;
    func.isPublic = true;
    func.invokeQuery = (argsStr)=>invokeQuery(handler, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
const internalQueryGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("internalQuery", handler);
    assertNotBrowser();
    func.isQuery = true;
    func.isInternal = true;
    func.invokeQuery = (argsStr)=>invokeQuery(handler, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
async function invokeAction(func, requestId, argsStr) {
    const args = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(JSON.parse(argsStr));
    const calls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$actions_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupActionCalls"])(requestId);
    const ctx = {
        ...calls,
        auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$authentication_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupAuth"])(requestId),
        scheduler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$scheduler_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupActionScheduler"])(requestId),
        storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$storage_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupStorageActionWriter"])(requestId),
        vectorSearch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$vector_search_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupActionVectorSearch"])(requestId)
    };
    const result = await invokeFunction(func, ctx, args);
    return JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(result === void 0 ? null : result));
}
const actionGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("action", handler);
    assertNotBrowser();
    func.isAction = true;
    func.isPublic = true;
    func.invokeAction = (requestId, argsStr)=>invokeAction(handler, requestId, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
const internalActionGeneric = (functionDefinition)=>{
    const handler = typeof functionDefinition === "function" ? functionDefinition : functionDefinition.handler;
    const func = dontCallDirectly("internalAction", handler);
    assertNotBrowser();
    func.isAction = true;
    func.isInternal = true;
    func.invokeAction = (requestId, argsStr)=>invokeAction(handler, requestId, argsStr);
    func.exportArgs = exportArgs(functionDefinition);
    func.exportReturns = exportReturns(functionDefinition);
    func._handler = handler;
    return func;
};
async function invokeHttpAction(func, request) {
    const requestId = "";
    const calls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$actions_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupActionCalls"])(requestId);
    const ctx = {
        ...calls,
        auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$authentication_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupAuth"])(requestId),
        storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$storage_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupStorageActionWriter"])(requestId),
        scheduler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$scheduler_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupActionScheduler"])(requestId),
        vectorSearch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$vector_search_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setupActionVectorSearch"])(requestId)
    };
    return await invokeFunction(func, ctx, [
        request
    ]);
}
const httpActionGeneric = (func)=>{
    const q = dontCallDirectly("httpAction", func);
    assertNotBrowser();
    q.isHttp = true;
    q.invokeHttpAction = (request)=>invokeHttpAction(func, request);
    q._handler = func;
    return q;
};
async function runUdf(udfType, f, args) {
    const queryArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
    const syscallArgs = {
        udfType,
        args: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(queryArgs),
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionAddress"])(f)
    };
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/runUdf", syscallArgs);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(result);
} //# sourceMappingURL=registration_impl.js.map
}),
"[project]/node_modules/convex/dist/esm/server/pagination.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginationOptsValidator",
    ()=>paginationOptsValidator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-rsc] (ecmascript)");
"use strict";
;
const paginationOptsValidator = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].object({
    numItems: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].number(),
    cursor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].union(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].null()),
    endCursor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].union(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].null())),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].number()),
    maximumRowsRead: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].number()),
    maximumBytesRead: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].number())
}); //# sourceMappingURL=pagination.js.map
}),
"[project]/node_modules/convex/dist/esm/server/storage.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use strict"; //# sourceMappingURL=storage.js.map
}),
"[project]/node_modules/convex/dist/esm/server/cron.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Crons",
    ()=>Crons,
    "cronJobs",
    ()=>cronJobs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
const DAYS_OF_WEEK = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
];
const cronJobs = ()=>new Crons();
function validateIntervalNumber(n) {
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error("Interval must be an integer greater than 0");
    }
}
function validatedDayOfMonth(n) {
    if (!Number.isInteger(n) || n < 1 || n > 31) {
        throw new Error("Day of month must be an integer from 1 to 31");
    }
    return n;
}
function validatedDayOfWeek(s) {
    if (!DAYS_OF_WEEK.includes(s)) {
        throw new Error('Day of week must be a string like "monday".');
    }
    return s;
}
function validatedHourOfDay(n) {
    if (!Number.isInteger(n) || n < 0 || n > 23) {
        throw new Error("Hour of day must be an integer from 0 to 23");
    }
    return n;
}
function validatedMinuteOfHour(n) {
    if (!Number.isInteger(n) || n < 0 || n > 59) {
        throw new Error("Minute of hour must be an integer from 0 to 59");
    }
    return n;
}
function validatedCronString(s) {
    return s;
}
function validatedCronIdentifier(s) {
    if (!s.match(/^[ -~]*$/)) {
        throw new Error(`Invalid cron identifier ${s}: use ASCII letters that are not control characters`);
    }
    return s;
}
class Crons {
    constructor(){
        __publicField(this, "crons");
        __publicField(this, "isCrons");
        this.isCrons = true;
        this.crons = {};
    }
    /** @internal */ schedule(cronIdentifier, schedule, functionReference, args) {
        const cronArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseArgs"])(args);
        validatedCronIdentifier(cronIdentifier);
        if (cronIdentifier in this.crons) {
            throw new Error(`Cron identifier registered twice: ${cronIdentifier}`);
        }
        this.crons[cronIdentifier] = {
            name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(functionReference),
            args: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(cronArgs)
            ],
            schedule
        };
    }
    /**
   * Schedule a mutation or action to run at some interval.
   *
   * ```js
   * crons.interval("Clear presence data", {seconds: 30}, api.presence.clear);
   * ```
   *
   * @param identifier - A unique name for this scheduled job.
   * @param schedule - The time between runs for this scheduled job.
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   * @param args - The arguments to the function.
   */ interval(cronIdentifier, schedule, functionReference, ...args) {
        const s = schedule;
        const hasSeconds = +("seconds" in s && s.seconds !== void 0);
        const hasMinutes = +("minutes" in s && s.minutes !== void 0);
        const hasHours = +("hours" in s && s.hours !== void 0);
        const total = hasSeconds + hasMinutes + hasHours;
        if (total !== 1) {
            throw new Error("Must specify one of seconds, minutes, or hours");
        }
        if (hasSeconds) {
            validateIntervalNumber(schedule.seconds);
        } else if (hasMinutes) {
            validateIntervalNumber(schedule.minutes);
        } else if (hasHours) {
            validateIntervalNumber(schedule.hours);
        }
        this.schedule(cronIdentifier, {
            ...schedule,
            type: "interval"
        }, functionReference, ...args);
    }
    /**
   * Schedule a mutation or action to run on an hourly basis.
   *
   * ```js
   * crons.hourly(
   *   "Reset high scores",
   *   {
   *     minuteUTC: 30,
   *   },
   *   api.scores.reset
   * )
   * ```
   *
   * @param cronIdentifier - A unique name for this scheduled job.
   * @param schedule - What time (UTC) each day to run this function.
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   * @param args - The arguments to the function.
   */ hourly(cronIdentifier, schedule, functionReference, ...args) {
        const minuteUTC = validatedMinuteOfHour(schedule.minuteUTC);
        this.schedule(cronIdentifier, {
            minuteUTC,
            type: "hourly"
        }, functionReference, ...args);
    }
    /**
   * Schedule a mutation or action to run on a daily basis.
   *
   * ```js
   * crons.daily(
   *   "Reset high scores",
   *   {
   *     hourUTC: 17, // (9:30am Pacific/10:30am Daylight Savings Pacific)
   *     minuteUTC: 30,
   *   },
   *   api.scores.reset
   * )
   * ```
   *
   * @param cronIdentifier - A unique name for this scheduled job.
   * @param schedule - What time (UTC) each day to run this function.
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   * @param args - The arguments to the function.
   */ daily(cronIdentifier, schedule, functionReference, ...args) {
        const hourUTC = validatedHourOfDay(schedule.hourUTC);
        const minuteUTC = validatedMinuteOfHour(schedule.minuteUTC);
        this.schedule(cronIdentifier, {
            hourUTC,
            minuteUTC,
            type: "daily"
        }, functionReference, ...args);
    }
    /**
   * Schedule a mutation or action to run on a weekly basis.
   *
   * ```js
   * crons.weekly(
   *   "Weekly re-engagement email",
   *   {
   *     dayOfWeek: "Tuesday",
   *     hourUTC: 17, // (9:30am Pacific/10:30am Daylight Savings Pacific)
   *     minuteUTC: 30,
   *   },
   *   api.emails.send
   * )
   * ```
   *
   * @param cronIdentifier - A unique name for this scheduled job.
   * @param schedule - What day and time (UTC) each week to run this function.
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   */ weekly(cronIdentifier, schedule, functionReference, ...args) {
        const dayOfWeek = validatedDayOfWeek(schedule.dayOfWeek);
        const hourUTC = validatedHourOfDay(schedule.hourUTC);
        const minuteUTC = validatedMinuteOfHour(schedule.minuteUTC);
        this.schedule(cronIdentifier, {
            dayOfWeek,
            hourUTC,
            minuteUTC,
            type: "weekly"
        }, functionReference, ...args);
    }
    /**
   * Schedule a mutation or action to run on a monthly basis.
   *
   * Note that some months have fewer days than others, so e.g. a function
   * scheduled to run on the 30th will not run in February.
   *
   * ```js
   * crons.monthly(
   *   "Bill customers at ",
   *   {
   *     hourUTC: 17, // (9:30am Pacific/10:30am Daylight Savings Pacific)
   *     minuteUTC: 30,
   *     day: 1,
   *   },
   *   api.billing.billCustomers
   * )
   * ```
   *
   * @param cronIdentifier - A unique name for this scheduled job.
   * @param schedule - What day and time (UTC) each month to run this function.
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   * @param args - The arguments to the function.
   */ monthly(cronIdentifier, schedule, functionReference, ...args) {
        const day = validatedDayOfMonth(schedule.day);
        const hourUTC = validatedHourOfDay(schedule.hourUTC);
        const minuteUTC = validatedMinuteOfHour(schedule.minuteUTC);
        this.schedule(cronIdentifier, {
            day,
            hourUTC,
            minuteUTC,
            type: "monthly"
        }, functionReference, ...args);
    }
    /**
   * Schedule a mutation or action to run on a recurring basis.
   *
   * Like the unix command `cron`, Sunday is 0, Monday is 1, etc.
   *
   * ```
   *  ┌─ minute (0 - 59)
   *  │ ┌─ hour (0 - 23)
   *  │ │ ┌─ day of the month (1 - 31)
   *  │ │ │ ┌─ month (1 - 12)
   *  │ │ │ │ ┌─ day of the week (0 - 6) (Sunday to Saturday)
   * "* * * * *"
   * ```
   *
   * @param cronIdentifier - A unique name for this scheduled job.
   * @param cron - Cron string like `"15 7 * * *"` (Every day at 7:15 UTC)
   * @param functionReference - A {@link FunctionReference} for the function
   * to schedule.
   * @param args - The arguments to the function.
   */ cron(cronIdentifier, cron, functionReference, ...args) {
        const c = validatedCronString(cron);
        this.schedule(cronIdentifier, {
            cron: c,
            type: "cron"
        }, functionReference, ...args);
    }
    /** @internal */ export() {
        return JSON.stringify(this.crons);
    }
} //# sourceMappingURL=cron.js.map
}),
"[project]/node_modules/convex/dist/esm/server/router.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpRouter",
    ()=>HttpRouter,
    "ROUTABLE_HTTP_METHODS",
    ()=>ROUTABLE_HTTP_METHODS,
    "httpRouter",
    ()=>httpRouter,
    "normalizeMethod",
    ()=>normalizeMethod
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
const ROUTABLE_HTTP_METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
    "PATCH"
];
function normalizeMethod(method) {
    if (method === "HEAD") return "GET";
    return method;
}
const httpRouter = ()=>new HttpRouter();
class HttpRouter {
    constructor(){
        __publicField(this, "exactRoutes", /* @__PURE__ */ new Map());
        __publicField(this, "prefixRoutes", /* @__PURE__ */ new Map());
        __publicField(this, "isRouter", true);
        /**
     * Specify an HttpAction to be used to respond to requests
     * for an HTTP method (e.g. "GET") and a path or pathPrefix.
     *
     * Paths must begin with a slash. Path prefixes must also end in a slash.
     *
     * ```js
     * // matches `/profile` (but not `/profile/`)
     * http.route({ path: "/profile", method: "GET", handler: getProfile})
     *
     * // matches `/profiles/`, `/profiles/abc`, and `/profiles/a/c/b` (but not `/profile`)
     * http.route({ pathPrefix: "/profile/", method: "GET", handler: getProfile})
     * ```
     */ __publicField(this, "route", (spec)=>{
            if (!spec.handler) throw new Error(`route requires handler`);
            if (!spec.method) throw new Error(`route requires method`);
            const { method, handler } = spec;
            if (!ROUTABLE_HTTP_METHODS.includes(method)) {
                throw new Error(`'${method}' is not an allowed HTTP method (like GET, POST, PUT etc.)`);
            }
            if ("path" in spec) {
                if ("pathPrefix" in spec) {
                    throw new Error(`Invalid httpRouter route: cannot contain both 'path' and 'pathPrefix'`);
                }
                if (!spec.path.startsWith("/")) {
                    throw new Error(`path '${spec.path}' does not start with a /`);
                }
                if (spec.path.startsWith("/.files/") || spec.path === "/.files") {
                    throw new Error(`path '${spec.path}' is reserved`);
                }
                const methods = this.exactRoutes.has(spec.path) ? this.exactRoutes.get(spec.path) : /* @__PURE__ */ new Map();
                if (methods.has(method)) {
                    throw new Error(`Path '${spec.path}' for method ${method} already in use`);
                }
                methods.set(method, handler);
                this.exactRoutes.set(spec.path, methods);
            } else if ("pathPrefix" in spec) {
                if (!spec.pathPrefix.startsWith("/")) {
                    throw new Error(`pathPrefix '${spec.pathPrefix}' does not start with a /`);
                }
                if (!spec.pathPrefix.endsWith("/")) {
                    throw new Error(`pathPrefix ${spec.pathPrefix} must end with a /`);
                }
                if (spec.pathPrefix.startsWith("/.files/")) {
                    throw new Error(`pathPrefix '${spec.pathPrefix}' is reserved`);
                }
                const prefixes = this.prefixRoutes.get(method) || /* @__PURE__ */ new Map();
                if (prefixes.has(spec.pathPrefix)) {
                    throw new Error(`${spec.method} pathPrefix ${spec.pathPrefix} is already defined`);
                }
                prefixes.set(spec.pathPrefix, handler);
                this.prefixRoutes.set(method, prefixes);
            } else {
                throw new Error(`Invalid httpRouter route entry: must contain either field 'path' or 'pathPrefix'`);
            }
        });
        /**
     * Returns a list of routed HTTP actions.
     *
     * These are used to populate the list of routes shown in the Functions page of the Convex dashboard.
     *
     * @returns - an array of [path, method, endpoint] tuples.
     */ __publicField(this, "getRoutes", ()=>{
            const exactPaths = [
                ...this.exactRoutes.keys()
            ].sort();
            const exact = exactPaths.flatMap((path)=>[
                    ...this.exactRoutes.get(path).keys()
                ].sort().map((method)=>[
                        path,
                        method,
                        this.exactRoutes.get(path).get(method)
                    ]));
            const prefixPathMethods = [
                ...this.prefixRoutes.keys()
            ].sort();
            const prefixes = prefixPathMethods.flatMap((method)=>[
                    ...this.prefixRoutes.get(method).keys()
                ].sort().map((pathPrefix)=>[
                        `${pathPrefix}*`,
                        method,
                        this.prefixRoutes.get(method).get(pathPrefix)
                    ]));
            return [
                ...exact,
                ...prefixes
            ];
        });
        /**
     * Returns the appropriate HTTP action and its routed request path and method.
     *
     * The path and method returned are used for logging and metrics, and should
     * match up with one of the routes returned by `getRoutes`.
     *
     * For example,
     *
     * ```js
     * http.route({ pathPrefix: "/profile/", method: "GET", handler: getProfile});
     *
     * http.lookup("/profile/abc", "GET") // returns [getProfile, "GET", "/profile/*"]
     *```
     *
     * @returns - a tuple [{@link PublicHttpAction}, method, path] or null.
     */ __publicField(this, "lookup", (path, method)=>{
            method = normalizeMethod(method);
            const exactMatch = this.exactRoutes.get(path)?.get(method);
            if (exactMatch) return [
                exactMatch,
                method,
                path
            ];
            const prefixes = this.prefixRoutes.get(method) || /* @__PURE__ */ new Map();
            const prefixesSorted = [
                ...prefixes.entries()
            ].sort(([prefixA, _a], [prefixB, _b])=>prefixB.length - prefixA.length);
            for (const [pathPrefix, endpoint] of prefixesSorted){
                if (path.startsWith(pathPrefix)) {
                    return [
                        endpoint,
                        method,
                        `${pathPrefix}*`
                    ];
                }
            }
            return null;
        });
        /**
     * Given a JSON string representation of a Request object, return a Response
     * by routing the request and running the appropriate endpoint or returning
     * a 404 Response.
     *
     * @param argsStr - a JSON string representing a Request object.
     *
     * @returns - a Response object.
     */ __publicField(this, "runRequest", async (argsStr, requestRoute)=>{
            const request = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performJsSyscall"])("requestFromConvexJson", {
                convexJson: JSON.parse(argsStr)
            });
            let pathname = requestRoute;
            if (!pathname || typeof pathname !== "string") {
                pathname = new URL(request.url).pathname;
            }
            const method = request.method;
            const match = this.lookup(pathname, method);
            if (!match) {
                const response2 = new Response(`No HttpAction routed for ${pathname}`, {
                    status: 404
                });
                return JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performJsSyscall"])("convexJsonFromResponse", {
                    response: response2
                }));
            }
            const [endpoint, _method, _path] = match;
            const response = await endpoint.invokeHttpAction(request);
            return JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performJsSyscall"])("convexJsonFromResponse", {
                response
            }));
        });
    }
} //# sourceMappingURL=router.js.map
}),
"[project]/node_modules/convex/dist/esm/server/components/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "componentsGeneric",
    ()=>componentsGeneric,
    "createFunctionHandle",
    ()=>createFunctionHandle,
    "currentSystemUdfInComponent",
    ()=>currentSystemUdfInComponent,
    "defineApp",
    ()=>defineApp,
    "defineComponent",
    ()=>defineComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/syscall.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/components/paths.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
;
;
;
;
async function createFunctionHandle(functionReference) {
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionAddress"])(functionReference);
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$syscall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["performAsyncSyscall"])("1.0/createFunctionHandle", {
        ...address,
        version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]
    });
}
class InstalledComponent {
    constructor(definition, name){
        /**
     * @internal
     */ __publicField(this, "_definition");
        /**
     * @internal
     */ __publicField(this, "_name");
        this._definition = definition;
        this._name = name;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setReferencePath"])(this, `_reference/childComponent/${name}`);
    }
    get exports() {
        return createExports(this._name, []);
    }
}
function createExports(name, pathParts) {
    const handler = {
        get (_, prop) {
            if (typeof prop === "string") {
                const newParts = [
                    ...pathParts,
                    prop
                ];
                return createExports(name, newParts);
            } else if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toReferencePath"]) {
                let reference = `_reference/childComponent/${name}`;
                for (const part of pathParts){
                    reference += `/${part}`;
                }
                return reference;
            } else {
                return void 0;
            }
        }
    };
    return new Proxy({}, handler);
}
function use(definition, options) {
    const importedComponentDefinition = definition;
    if (typeof importedComponentDefinition.componentDefinitionPath !== "string") {
        throw new Error("Component definition does not have the required componentDefinitionPath property. This code only works in Convex runtime.");
    }
    const name = options?.name || // added recently
    importedComponentDefinition.defaultName || // can be removed once backend is out
    importedComponentDefinition.componentDefinitionPath.split("/").pop();
    this._childComponents.push([
        name,
        importedComponentDefinition,
        {}
    ]);
    return new InstalledComponent(definition, name);
}
function exportAppForAnalysis() {
    const definitionType = {
        type: "app"
    };
    const childComponents = serializeChildComponents(this._childComponents);
    return {
        definitionType,
        childComponents,
        httpMounts: {},
        exports: serializeExportTree(this._exportTree)
    };
}
function serializeExportTree(tree) {
    const branch = [];
    for (const [key, child] of Object.entries(tree)){
        let node;
        if (typeof child === "string") {
            node = {
                type: "leaf",
                leaf: child
            };
        } else {
            node = serializeExportTree(child);
        }
        branch.push([
            key,
            node
        ]);
    }
    return {
        type: "branch",
        branch
    };
}
function serializeChildComponents(childComponents) {
    return childComponents.map(([name, definition, p])=>{
        let args = null;
        if (p !== null) {
            args = [];
            for (const [name2, value] of Object.entries(p)){
                if (value !== void 0) {
                    args.push([
                        name2,
                        {
                            type: "value",
                            value: JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(value))
                        }
                    ]);
                }
            }
        }
        const path = definition.componentDefinitionPath;
        if (!path) throw new Error("no .componentPath for component definition " + JSON.stringify(definition, null, 2));
        return {
            name,
            path,
            args
        };
    });
}
function exportComponentForAnalysis() {
    const args = Object.entries(this._args).map(([name, validator])=>[
            name,
            {
                type: "value",
                value: JSON.stringify(validator.json)
            }
        ]);
    const definitionType = {
        type: "childComponent",
        name: this._name,
        args
    };
    const childComponents = serializeChildComponents(this._childComponents);
    return {
        name: this._name,
        definitionType,
        childComponents,
        httpMounts: {},
        exports: serializeExportTree(this._exportTree)
    };
}
function defineComponent(name) {
    const ret = {
        _isRoot: false,
        _name: name,
        _args: {},
        _childComponents: [],
        _exportTree: {},
        _onInitCallbacks: {},
        export: exportComponentForAnalysis,
        use,
        // pretend to conform to ComponentDefinition, which temporarily expects __args
        ...{}
    };
    return ret;
}
function defineApp() {
    const ret = {
        _isRoot: true,
        _childComponents: [],
        _exportTree: {},
        export: exportAppForAnalysis,
        use
    };
    return ret;
}
function currentSystemUdfInComponent(componentId) {
    return {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toReferencePath"]]: `_reference/currentSystemUdfInComponent/${componentId}`
    };
}
function createChildComponents(root, pathParts) {
    const handler = {
        get (_, prop) {
            if (typeof prop === "string") {
                const newParts = [
                    ...pathParts,
                    prop
                ];
                return createChildComponents(root, newParts);
            } else if (prop === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toReferencePath"]) {
                if (pathParts.length < 1) {
                    const found = [
                        root,
                        ...pathParts
                    ].join(".");
                    throw new Error(`API path is expected to be of the form \`${root}.childComponent.functionName\`. Found: \`${found}\``);
                }
                return `_reference/childComponent/` + pathParts.join("/");
            } else {
                return void 0;
            }
        }
    };
    return new Proxy({}, handler);
}
const componentsGeneric = ()=>createChildComponents("components", []); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/convex/dist/esm/server/schema.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SchemaDefinition",
    ()=>SchemaDefinition,
    "TableDefinition",
    ()=>TableDefinition,
    "defineSchema",
    ()=>defineSchema,
    "defineTable",
    ()=>defineTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-rsc] (ecmascript)");
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
class TableDefinition {
    /**
   * @internal
   */ constructor(documentType){
        __publicField(this, "indexes");
        __publicField(this, "stagedDbIndexes");
        __publicField(this, "searchIndexes");
        __publicField(this, "stagedSearchIndexes");
        __publicField(this, "vectorIndexes");
        __publicField(this, "stagedVectorIndexes");
        // The type of documents stored in this table.
        __publicField(this, "validator");
        this.indexes = [];
        this.stagedDbIndexes = [];
        this.searchIndexes = [];
        this.stagedSearchIndexes = [];
        this.vectorIndexes = [];
        this.stagedVectorIndexes = [];
        this.validator = documentType;
    }
    /**
   * This API is experimental: it may change or disappear.
   *
   * Returns indexes defined on this table.
   * Intended for the advanced use cases of dynamically deciding which index to use for a query.
   * If you think you need this, please chime in on ths issue in the Convex JS GitHub repo.
   * https://github.com/get-convex/convex-js/issues/49
   */ " indexes"() {
        return this.indexes;
    }
    index(name, indexConfig) {
        if (Array.isArray(indexConfig)) {
            this.indexes.push({
                indexDescriptor: name,
                fields: indexConfig
            });
        } else if (indexConfig.staged) {
            this.stagedDbIndexes.push({
                indexDescriptor: name,
                fields: indexConfig.fields
            });
        } else {
            this.indexes.push({
                indexDescriptor: name,
                fields: indexConfig.fields
            });
        }
        return this;
    }
    searchIndex(name, indexConfig) {
        if (indexConfig.staged) {
            this.stagedSearchIndexes.push({
                indexDescriptor: name,
                searchField: indexConfig.searchField,
                filterFields: indexConfig.filterFields || []
            });
        } else {
            this.searchIndexes.push({
                indexDescriptor: name,
                searchField: indexConfig.searchField,
                filterFields: indexConfig.filterFields || []
            });
        }
        return this;
    }
    vectorIndex(name, indexConfig) {
        if (indexConfig.staged) {
            this.stagedVectorIndexes.push({
                indexDescriptor: name,
                vectorField: indexConfig.vectorField,
                dimensions: indexConfig.dimensions,
                filterFields: indexConfig.filterFields || []
            });
        } else {
            this.vectorIndexes.push({
                indexDescriptor: name,
                vectorField: indexConfig.vectorField,
                dimensions: indexConfig.dimensions,
                filterFields: indexConfig.filterFields || []
            });
        }
        return this;
    }
    /**
   * Work around for https://github.com/microsoft/TypeScript/issues/57035
   */ self() {
        return this;
    }
    /**
   * Export the contents of this definition.
   *
   * This is called internally by the Convex framework.
   * @internal
   */ export() {
        const documentType = this.validator.json;
        if (typeof documentType !== "object") {
            throw new Error("Invalid validator: please make sure that the parameter of `defineTable` is valid (see https://docs.convex.dev/database/schemas)");
        }
        return {
            indexes: this.indexes,
            stagedDbIndexes: this.stagedDbIndexes,
            searchIndexes: this.searchIndexes,
            stagedSearchIndexes: this.stagedSearchIndexes,
            vectorIndexes: this.vectorIndexes,
            stagedVectorIndexes: this.stagedVectorIndexes,
            documentType
        };
    }
}
function defineTable(documentSchema) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidator"])(documentSchema)) {
        return new TableDefinition(documentSchema);
    } else {
        return new TableDefinition(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].object(documentSchema));
    }
}
class SchemaDefinition {
    /**
   * @internal
   */ constructor(tables, options){
        __publicField(this, "tables");
        __publicField(this, "strictTableNameTypes");
        __publicField(this, "schemaValidation");
        this.tables = tables;
        this.schemaValidation = options?.schemaValidation === void 0 ? true : options.schemaValidation;
    }
    /**
   * Export the contents of this definition.
   *
   * This is called internally by the Convex framework.
   * @internal
   */ export() {
        return JSON.stringify({
            tables: Object.entries(this.tables).map(([tableName, definition])=>{
                const { indexes, stagedDbIndexes, searchIndexes, stagedSearchIndexes, vectorIndexes, stagedVectorIndexes, documentType } = definition.export();
                return {
                    tableName,
                    indexes,
                    stagedDbIndexes,
                    searchIndexes,
                    stagedSearchIndexes,
                    vectorIndexes,
                    stagedVectorIndexes,
                    documentType
                };
            }),
            schemaValidation: this.schemaValidation
        });
    }
}
function defineSchema(schema, options) {
    return new SchemaDefinition(schema, options);
}
const _systemSchema = defineSchema({
    _scheduled_functions: defineTable({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].string(),
        args: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].any()),
        scheduledTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].float64(),
        completedTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].float64()),
        state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].union(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].object({
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].literal("pending")
        }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].object({
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].literal("inProgress")
        }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].object({
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].literal("success")
        }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].object({
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].literal("failed"),
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].string()
        }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].object({
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].literal("canceled")
        }))
    }),
    _storage: defineTable({
        sha256: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].string(),
        size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].float64(),
        contentType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["v"].string())
    })
}); //# sourceMappingURL=schema.js.map
}),
"[project]/node_modules/convex/dist/esm/server/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$database$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/database.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$registration_impl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/registration_impl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$pagination$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/pagination.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$search_filter_builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/search_filter_builder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$storage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/storage.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$cron$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/cron.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$router$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/router.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/components/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$schema$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/schema.js [app-rsc] (ecmascript)"); //# sourceMappingURL=index.js.map
"use strict";
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/convex/dist/esm/nextjs/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchAction",
    ()=>fetchAction,
    "fetchMutation",
    ()=>fetchMutation,
    "fetchQuery",
    ()=>fetchQuery,
    "preloadQuery",
    ()=>preloadQuery,
    "preloadedQueryResult",
    ()=>preloadedQueryResult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$http_client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/http_client.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/common/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/value.js [app-rsc] (ecmascript)");
"use strict";
;
;
;
;
async function preloadQuery(query, ...args) {
    const value = await fetchQuery(query, ...args);
    const preloaded = {
        _name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFunctionName"])(query),
        _argsJSON: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(args[0] ?? {}),
        _valueJSON: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convexToJson"])(value)
    };
    return preloaded;
}
function preloadedQueryResult(preloaded) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$value$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonToConvex"])(preloaded._valueJSON);
}
async function fetchQuery(query, ...args) {
    const [fnArgs, options] = args;
    const client = setupClient(options ?? {});
    return client.query(query, fnArgs || {});
}
async function fetchMutation(mutation, ...args) {
    const [fnArgs, options] = args;
    const client = setupClient(options ?? {});
    return client.mutation(mutation, fnArgs || {});
}
async function fetchAction(action, ...args) {
    const [fnArgs, options] = args;
    const client = setupClient(options ?? {});
    return client.action(action, fnArgs || {});
}
function setupClient(options) {
    if ("url" in options && options.url === void 0) {
        console.error("deploymentUrl is undefined, are your environment variables set? In the future explicitly passing undefined will cause an error. To explicitly use the default, pass `process.env.NEXT_PUBLIC_CONVEX_URL`.");
    }
    const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$http_client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConvexHttpClient"](getConvexUrl(options.url, options.skipConvexDeploymentUrlCheck ?? false));
    if (options.token !== void 0) {
        client.setAuth(options.token);
    }
    if (options.adminToken !== void 0) {
        client.setAdminAuth(options.adminToken);
    }
    client.setFetchOptions({
        cache: "no-store"
    });
    return client;
}
function getConvexUrl(deploymentUrl, skipConvexDeploymentUrlCheck) {
    const url = deploymentUrl ?? ("TURBOPACK compile-time value", "https://original-turtle-96.convex.cloud");
    const isFromEnv = deploymentUrl === void 0;
    if (typeof url !== "string") {
        throw new Error(isFromEnv ? `Environment variable NEXT_PUBLIC_CONVEX_URL is not set.` : `Convex function called with invalid deployment address.`);
    }
    if (!skipConvexDeploymentUrlCheck) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$common$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateDeploymentUrl"])(url);
    }
    return url;
} //# sourceMappingURL=index.js.map
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isCorsRequest",
    ()=>isCorsRequest,
    "jsonResponse",
    ()=>jsonResponse,
    "logVerbose",
    ()=>logVerbose,
    "setAuthCookies",
    ()=>setAuthCookies,
    "setAuthCookiesInMiddleware",
    ()=>setAuthCookiesInMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/cookies.js [app-rsc] (ecmascript)");
;
;
function jsonResponse(body) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify(body), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}
function setAuthCookies(response, tokens) {
    const responseCookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getResponseCookies"])(response);
    if (tokens === null) {
        responseCookies.token = null;
        responseCookies.refreshToken = null;
    } else {
        responseCookies.token = tokens.token;
        responseCookies.refreshToken = tokens.refreshToken;
    }
    responseCookies.verifier = null;
}
function setAuthCookiesInMiddleware(request, tokens) {
    const requestCookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestCookiesInMiddleware"])(request);
    if (tokens === null) {
        requestCookies.token = null;
        requestCookies.refreshToken = null;
    } else {
        requestCookies.token = tokens.token;
        requestCookies.refreshToken = tokens.refreshToken;
    }
}
function isCorsRequest(request) {
    const origin = request.headers.get("Origin");
    const originURL = origin ? new URL(origin) : null;
    return originURL !== null && (originURL.host !== request.headers.get("Host") || originURL.protocol !== new URL(request.url).protocol);
}
function logVerbose(message, verbose) {
    if (verbose) {
        console.debug(`[verbose] ${new Date().toISOString()} [ConvexAuthNextjs] ${message}`);
    }
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/proxy.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "proxyAuthActionToConvex",
    ()=>proxyAuthActionToConvex,
    "shouldProxyAuthAction",
    ()=>shouldProxyAuthAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$nextjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/nextjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/cookies.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/utils.js [app-rsc] (ecmascript)");
;
;
;
;
async function proxyAuthActionToConvex(request, options) {
    const verbose = options?.verbose ?? false;
    if (request.method !== "POST") {
        return new Response("Invalid method", {
            status: 405
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isCorsRequest"])(request)) {
        return new Response("Invalid origin", {
            status: 403
        });
    }
    const { action, args } = await request.json();
    if (action !== "auth:signIn" && action !== "auth:signOut") {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Invalid action ${action}, returning 400`, verbose);
        return new Response("Invalid action", {
            status: 400
        });
    }
    let token;
    if (action === "auth:signIn" && args.refreshToken !== undefined) {
        // The client has a dummy refreshToken, the real one is only
        // stored in cookies.
        const refreshToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestCookies"])().refreshToken;
        if (refreshToken === null) {
            console.error("Convex Auth: Unexpected missing refreshToken cookie during client refresh");
            return new Response(JSON.stringify({
                tokens: null
            }));
        }
        args.refreshToken = refreshToken;
    } else {
        // Make sure the proxy is authenticated if the client is,
        // important for signOut and any other logic working
        // with existing sessions.
        token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestCookies"])().token ?? undefined;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Fetching action ${action} with args ${JSON.stringify(args)}`, verbose);
    const untypedResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$nextjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAction"])(action, args, {
        url: options?.convexUrl,
        token
    });
    if (action === "auth:signIn") {
        const result = untypedResult;
        if (result.redirect !== undefined) {
            const { redirect } = result;
            const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonResponse"])({
                redirect
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getResponseCookies"])(response).verifier = result.verifier;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Redirecting to ${redirect}`, verbose);
            return response;
        } else if (result.tokens !== undefined) {
            // The server doesn't share the refresh token with the client
            // for added security - the client has to use the server
            // to refresh the access token via cookies.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(result.tokens === null ? `No tokens returned, clearing auth cookies` : `Setting auth cookies with returned tokens`, verbose);
            const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonResponse"])({
                tokens: result.tokens !== null ? {
                    token: result.tokens.token,
                    refreshToken: "dummy"
                } : null
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAuthCookies"])(response, result.tokens);
            return response;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonResponse"])(result);
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Clearing auth cookies`, verbose);
        const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsonResponse"])(null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAuthCookies"])(response, null);
        return response;
    }
}
function shouldProxyAuthAction(request, apiRoute) {
    // Handle both with and without trailing slash since this could be configured either way.
    // https://nextjs.org/docs/app/api-reference/next-config-js/trailingSlash
    const requestUrl = new URL(request.url);
    if (apiRoute.endsWith("/")) {
        return requestUrl.pathname === apiRoute || requestUrl.pathname === apiRoute.slice(0, -1);
    } else {
        return requestUrl.pathname === apiRoute || requestUrl.pathname === apiRoute + "/";
    }
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/request.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleAuthenticationInRequest",
    ()=>handleAuthenticationInRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$nextjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/nextjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jwt-decode/build/esm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/cookies.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/utils.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function handleAuthenticationInRequest(request, verbose) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Begin handleAuthenticationInRequest`, verbose);
    const requestUrl = new URL(request.url);
    // Validate CORS
    validateCors(request);
    // Refresh tokens if necessary
    const refreshTokens = await getRefreshedTokens(verbose);
    // Handle code exchange for OAuth and magic links via server-side redirect
    const code = requestUrl.searchParams.get("code");
    if (code && request.method === "GET" && request.headers.get("accept")?.includes("text/html")) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Handling code exchange for OAuth or magic link`, verbose);
        const verifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestCookies"])().verifier ?? undefined;
        const redirectUrl = new URL(requestUrl);
        redirectUrl.searchParams.delete("code");
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$nextjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAction"])("auth:signIn", {
                params: {
                    code
                },
                verifier
            });
            if (result.tokens === undefined) {
                throw new Error("Invalid `signIn` action result for code exchange");
            }
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAuthCookies"])(response, result.tokens);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Successfully validated code, redirecting to ${redirectUrl.toString()} with auth cookies`, verbose);
            return {
                kind: "redirect",
                response
            };
        } catch (error) {
            console.error(error);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Error validating code, redirecting to ${redirectUrl.toString()} and clearing auth cookies`, verbose);
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAuthCookies"])(response, null);
            return {
                kind: "redirect",
                response
            };
        }
    }
    return {
        kind: "refreshTokens",
        refreshTokens
    };
}
// If this is a cross-origin request with `Origin` header set
// do not allow the app to read auth cookies.
function validateCors(request) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isCorsRequest"])(request)) {
        const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestCookiesInMiddleware"])(request);
        cookies.token = null;
        cookies.refreshToken = null;
        cookies.verifier = null;
    }
}
const REQUIRED_TOKEN_LIFETIME_MS = 60_000; // 1 minute
const MINIMUM_REQUIRED_TOKEN_LIFETIME_MS = 10_000; // 10 seconds
async function getRefreshedTokens(verbose) {
    const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestCookies"])();
    const { token, refreshToken } = cookies;
    if (refreshToken === null && token === null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`No tokens to refresh, returning undefined`, verbose);
        return undefined;
    }
    if (refreshToken === null || token === null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Refresh token null? ${refreshToken === null}, token null? ${token === null}, returning null`, verbose);
        return null;
    }
    const decodedToken = decodeToken(token);
    if (decodedToken === null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Failed to decode token, returning null`, verbose);
        return null;
    }
    const totalTokenLifetimeMs = decodedToken.exp * 1000 - decodedToken.iat * 1000;
    // Check that the token is valid for the next 1 minute
    // or at least 10% of its valid duration or 10 seconds
    const minimumExpiration = Date.now() + Math.min(REQUIRED_TOKEN_LIFETIME_MS, Math.max(MINIMUM_REQUIRED_TOKEN_LIFETIME_MS, totalTokenLifetimeMs / 10));
    if (decodedToken.exp * 1000 > minimumExpiration) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Token expires far enough in the future, no need to refresh, returning undefined`, verbose);
        return undefined;
    }
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$nextjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAction"])("auth:signIn", {
            refreshToken
        });
        if (result.tokens === undefined) {
            throw new Error("Invalid `signIn` action result for token refresh");
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Successfully refreshed tokens`, verbose);
        return result.tokens;
    } catch (error) {
        console.error(error);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Failed to refresh tokens, returning null`, verbose);
        return null;
    }
}
function decodeToken(token) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtDecode"])(token);
    } catch (e) {
        return null;
    }
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConvexAuthNextjsServerProvider",
    ()=>ConvexAuthNextjsServerProvider,
    "convexAuthNextjsMiddleware",
    ()=>convexAuthNextjsMiddleware,
    "convexAuthNextjsToken",
    ()=>convexAuthNextjsToken,
    "isAuthenticatedNextjs",
    ()=>isAuthenticatedNextjs,
    "nextjsMiddlewareRedirect",
    ()=>nextjsMiddlewareRedirect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/cookies.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/proxy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$request$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/request.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/utils.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
function ConvexAuthNextjsServerProvider(props) {
    const { apiRoute, storage, storageNamespace, verbose, children } = props;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$client$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConvexAuthNextjsClientProvider"], {
        serverState: convexAuthNextjsServerState(),
        apiRoute: apiRoute,
        storage: storage,
        storageNamespace: storageNamespace,
        verbose: verbose,
        children: children
    });
}
function convexAuthNextjsToken() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestCookies"])().token ?? undefined;
}
function isAuthenticatedNextjs() {
    return convexAuthNextjsToken() !== undefined;
}
function convexAuthNextjsMiddleware(/**
 * A custom handler, which you can use to decide
 * which routes should be accessible based on the client's authentication.
 */ handler, options = {}) {
    return async (request, event)=>{
        const verbose = options.verbose ?? false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Begin middleware for request with URL ${request.url}`, verbose);
        const requestUrl = new URL(request.url);
        // Proxy signIn and signOut actions to Convex backend
        const apiRoute = options?.apiRoute ?? "/api/auth";
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["shouldProxyAuthAction"])(request, apiRoute)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Proxying auth action to Convex, path matches ${apiRoute} with or without trailing slash`, verbose);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["proxyAuthActionToConvex"])(request, options);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Not proxying auth action to Convex, path ${requestUrl.pathname} does not match ${apiRoute}`, verbose);
        // Refresh tokens, handle code query param
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$request$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleAuthenticationInRequest"])(request, verbose);
        // If redirecting, proceed, the middleware will run again on next request
        if (authResult.kind === "redirect") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Redirecting to ${authResult.response.headers.get("Location")}`, verbose);
            return authResult.response;
        }
        let response = null;
        // Forward cookies to request for custom handler
        if (authResult.kind === "refreshTokens" && authResult.refreshTokens !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Forwarding cookies to request`, verbose);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAuthCookiesInMiddleware"])(request, authResult.refreshTokens);
        }
        if (handler === undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`No custom handler`, verbose);
            response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].next();
        } else {
            // Call the custom handler
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logVerbose"])(`Calling custom handler`, verbose);
            response = await handler(request, event) ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].next();
        }
        // Port the cookies from the auth middleware to the response
        if (authResult.kind === "refreshTokens" && authResult.refreshTokens !== undefined) {
            response.headers.getSetCookie();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAuthCookies"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].next(response), authResult.refreshTokens);
        }
        return response;
    };
}
;
function nextjsMiddlewareRedirect(/**
 * The incoming request handled by the middleware.
 */ request, /**
 * The route path to redirect to.
 */ pathname) {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
}
function convexAuthNextjsServerState() {
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestCookies"])();
    return {
        // The server doesn't share the refresh token with the client
        // for added security - the client has to use the server
        // to refresh the access token via cookies.
        _state: {
            token,
            refreshToken: "dummy"
        },
        _timeFetched: Date.now()
    };
}
}),
];

//# sourceMappingURL=_0a573863._.js.map