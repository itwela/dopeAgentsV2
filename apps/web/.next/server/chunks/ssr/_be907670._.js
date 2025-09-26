module.exports = [
"[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>J,
    "useTheme",
    ()=>z
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
var M = (e, i, s, u, m, a, l, h)=>{
    let d = document.documentElement, w = [
        "light",
        "dark"
    ];
    function p(n) {
        (Array.isArray(e) ? e : [
            e
        ]).forEach((y)=>{
            let k = y === "class", S = k && a ? m.map((f)=>a[f] || f) : m;
            k ? (d.classList.remove(...S), d.classList.add(a && a[n] ? a[n] : n)) : d.setAttribute(y, n);
        }), R(n);
    }
    function R(n) {
        h && w.includes(n) && (d.style.colorScheme = n);
    }
    function c() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (u) p(u);
    else try {
        let n = localStorage.getItem(i) || s, y = l && n === "system" ? c() : n;
        p(y);
    } catch (n) {}
};
var b = [
    "light",
    "dark"
], I = "(prefers-color-scheme: dark)", O = "undefined" == "undefined", x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](void 0), U = {
    setTheme: (e)=>{},
    themes: []
}, z = ()=>{
    var e;
    return (e = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](x)) != null ? e : U;
}, J = (e)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](x) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], null, e.children) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](V, {
        ...e
    }), N = [
    "light",
    "dark"
], V = ({ forcedTheme: e, disableTransitionOnChange: i = !1, enableSystem: s = !0, enableColorScheme: u = !0, storageKey: m = "theme", themes: a = N, defaultTheme: l = s ? "system" : "light", attribute: h = "data-theme", value: d, children: w, nonce: p, scriptProps: R })=>{
    let [c, n] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>H(m, l)), [T, y] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>c === "system" ? E() : c), k = d ? Object.values(d) : a, S = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((o)=>{
        let r = o;
        if (!r) return;
        o === "system" && s && (r = E());
        let v = d ? d[r] : r, C = i ? W(p) : null, P = document.documentElement, L = (g)=>{
            g === "class" ? (P.classList.remove(...k), v && P.classList.add(v)) : g.startsWith("data-") && (v ? P.setAttribute(g, v) : P.removeAttribute(g));
        };
        if (Array.isArray(h) ? h.forEach(L) : L(h), u) {
            let g = b.includes(l) ? l : null, D = b.includes(r) ? r : g;
            P.style.colorScheme = D;
        }
        C == null || C();
    }, [
        p
    ]), f = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((o)=>{
        let r = typeof o == "function" ? o(c) : o;
        n(r);
        try {
            localStorage.setItem(m, r);
        } catch (v) {}
    }, [
        c
    ]), A = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((o)=>{
        let r = E(o);
        y(r), c === "system" && s && !e && S("system");
    }, [
        c,
        e
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        let o = window.matchMedia(I);
        return o.addListener(A), A(o), ()=>o.removeListener(A);
    }, [
        A
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        let o = (r)=>{
            r.key === m && (r.newValue ? n(r.newValue) : f(l));
        };
        return window.addEventListener("storage", o), ()=>window.removeEventListener("storage", o);
    }, [
        f
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        S(e != null ? e : c);
    }, [
        e,
        c
    ]);
    let Q = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            theme: c,
            setTheme: f,
            forcedTheme: e,
            resolvedTheme: c === "system" ? T : c,
            themes: s ? [
                ...a,
                "system"
            ] : a,
            systemTheme: s ? T : void 0
        }), [
        c,
        f,
        e,
        T,
        s,
        a
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](x.Provider, {
        value: Q
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](_, {
        forcedTheme: e,
        storageKey: m,
        attribute: h,
        enableSystem: s,
        enableColorScheme: u,
        defaultTheme: l,
        value: d,
        themes: a,
        nonce: p,
        scriptProps: R
    }), w);
}, _ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"](({ forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w })=>{
    let p = JSON.stringify([
        s,
        i,
        a,
        e,
        h,
        l,
        u,
        m
    ]).slice(1, -1);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("script", {
        ...w,
        suppressHydrationWarning: !0,
        nonce: ("TURBOPACK compile-time truthy", 1) ? d : "TURBOPACK unreachable",
        dangerouslySetInnerHTML: {
            __html: `(${M.toString()})(${p})`
        }
    });
}), H = (e, i)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    let s;
}, W = (e)=>{
    let i = document.createElement("style");
    return e && i.setAttribute("nonce", e), i.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(i), ()=>{
        window.getComputedStyle(document.body), setTimeout(()=>{
            document.head.removeChild(i);
        }, 1);
    };
}, E = (e)=>(e || (e = window.matchMedia(I)), e.matches ? "dark" : "light");
;
}),
"[project]/node_modules/jwt-decode/build/esm/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/apps/web/node_modules/@convex-dev/auth/dist/react/client.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "ConvexAuthActionsContext",
    ()=>ConvexAuthActionsContext,
    "ConvexAuthTokenContext",
    ()=>ConvexAuthTokenContext,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const ConvexAuthActionsContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const ConvexAuthInternalContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useAuth() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ConvexAuthInternalContext);
}
const ConvexAuthTokenContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const VERIFIER_STORAGE_KEY = "__convexAuthOAuthVerifier";
const JWT_STORAGE_KEY = "__convexAuthJWT";
const REFRESH_TOKEN_STORAGE_KEY = "__convexAuthRefreshToken";
const SERVER_STATE_FETCH_TIME_STORAGE_KEY = "__convexAuthServerStateFetchTime";
function AuthProvider({ client, serverState, onChange, storage, storageNamespace, replaceURL, children }) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(serverState?._state.token ?? null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(token.current === null);
    const [tokenState, setTokenState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(token.current);
    const verbose = client.verbose ?? false;
    const logVerbose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message)=>{
        if (verbose) {
            console.debug(`${new Date().toISOString()} ${message}`);
        }
    }, [
        verbose
    ]);
    const { storageSet, storageGet, storageRemove, storageKey } = useNamespacedStorage(storage, storageNamespace);
    const [isRefreshingToken, setIsRefreshingToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const setToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (args)=>{
        const wasAuthenticated = token.current !== null;
        let newToken;
        if (args.tokens === null) {
            token.current = null;
            if (args.shouldStore) {
                await storageRemove(JWT_STORAGE_KEY);
                await storageRemove(REFRESH_TOKEN_STORAGE_KEY);
            }
            newToken = null;
        } else {
            const { token: value } = args.tokens;
            token.current = value;
            if (args.shouldStore) {
                const { refreshToken } = args.tokens;
                await storageSet(JWT_STORAGE_KEY, value);
                await storageSet(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
            }
            newToken = value;
        }
        if (wasAuthenticated !== (newToken !== null)) {
            await onChange?.();
        }
        setTokenState(newToken);
        setIsLoading(false);
    }, [
        storageSet,
        storageRemove
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const listener = async (e)=>{
            if (isRefreshingToken) {
                // There are 3 different ways to trigger this pop up so just try all of
                // them.
                e.preventDefault();
                // This confirmation message doesn't actually appear in most modern
                // browsers but we tried.
                const confirmationMessage = "Are you sure you want to leave? Your changes may not be saved.";
                e.returnValue = true;
                return confirmationMessage;
            }
        };
        browserAddEventListener("beforeunload", listener);
        return ()=>{
            browserRemoveEventListener("beforeunload", listener);
        };
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // We're listening for:
        // 1. sibling tabs in case of localStorage
        // 2. other frames in case of sessionStorage
        const listener = (event)=>{
            void (async ()=>{
                // TODO: Test this if statement works in iframes correctly
                if (event.storageArea !== storage) {
                    return;
                }
                // Another tab/frame set the access token, use it
                if (event.key === storageKey(JWT_STORAGE_KEY)) {
                    const value = event.newValue;
                    logVerbose(`synced access token, is null: ${value === null}`);
                    // We don't write into storage since the event came from there and
                    // we'd trigger a loop, plus we get each key as a separate event so
                    // we don't have the refresh key here.
                    await setToken({
                        shouldStore: false,
                        tokens: value === null ? null : {
                            token: value
                        }
                    });
                }
            })();
        };
        browserAddEventListener("storage", listener);
        return ()=>browserRemoveEventListener("storage", listener);
    }, [
        setToken
    ]);
    const verifyCodeAndSetToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (args)=>{
        const { tokens } = await client.unauthenticatedCall("auth:signIn", "code" in args ? {
            params: {
                code: args.code
            },
            verifier: args.verifier
        } : args);
        logVerbose(`retrieved tokens, is null: ${tokens === null}`);
        await setToken({
            shouldStore: true,
            tokens: tokens ?? null
        });
        return tokens !== null;
    }, [
        client,
        setToken
    ]);
    const signIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (provider, args)=>{
        const params = args instanceof FormData ? Array.from(args.entries()).reduce((acc, [key, value])=>{
            acc[key] = value;
            return acc;
        }, {}) : args ?? {};
        const verifier = await storageGet(VERIFIER_STORAGE_KEY) ?? undefined;
        await storageRemove(VERIFIER_STORAGE_KEY);
        const result = await client.authenticatedCall("auth:signIn", {
            provider,
            params,
            verifier
        });
        if (result.redirect !== undefined) {
            const url = new URL(result.redirect);
            await storageSet(VERIFIER_STORAGE_KEY, result.verifier);
            // Do not redirect in React Native
            if (window.location !== undefined) {
                window.location.href = url.toString();
            }
            return {
                signingIn: false,
                redirect: url
            };
        } else if (result.tokens !== undefined) {
            const { tokens } = result;
            logVerbose(`signed in and got tokens, is null: ${tokens === null}`);
            await setToken({
                shouldStore: true,
                tokens
            });
            return {
                signingIn: result.tokens !== null
            };
        }
        return {
            signingIn: false
        };
    }, [
        client,
        setToken,
        storageGet
    ]);
    const signOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            await client.authenticatedCall("auth:signOut");
        } catch (error) {
        // Ignore any errors, they are usually caused by being
        // already signed out, which is ok.
        }
        logVerbose(`signed out, erasing tokens`);
        await setToken({
            shouldStore: true,
            tokens: null
        });
    }, [
        setToken,
        client
    ]);
    const fetchAccessToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ({ forceRefreshToken })=>{
        if (forceRefreshToken) {
            const tokenBeforeLockAquisition = token.current;
            return await browserMutex(REFRESH_TOKEN_STORAGE_KEY, async ()=>{
                const tokenAfterLockAquisition = token.current;
                // Another tab or frame just refreshed the token, we can use it
                // and skip another refresh.
                if (tokenAfterLockAquisition !== tokenBeforeLockAquisition) {
                    logVerbose(`returning synced token, is null: ${tokenAfterLockAquisition === null}`);
                    return tokenAfterLockAquisition;
                }
                const refreshToken = await storageGet(REFRESH_TOKEN_STORAGE_KEY) ?? null;
                if (refreshToken !== null) {
                    setIsRefreshingToken(true);
                    await storageRemove(REFRESH_TOKEN_STORAGE_KEY);
                    await verifyCodeAndSetToken({
                        refreshToken
                    }).finally(()=>{
                        setIsRefreshingToken(false);
                    });
                    logVerbose(`returning retrieved token, is null: ${tokenAfterLockAquisition === null}`);
                    return token.current;
                } else {
                    setIsRefreshingToken(false);
                    logVerbose(`returning null, there is no refresh token`);
                    return null;
                }
            });
        }
        return token.current;
    }, [
        verifyCodeAndSetToken,
        signOut,
        storageGet
    ]);
    const signingInWithCodeFromURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Has to happen in useEffect to avoid SSR.
        if (storage === undefined) {
            throw new Error("`localStorage` is not available in this environment, " + "set the `storage` prop on `ConvexAuthProvider`!");
        }
        const readStateFromStorage = async ()=>{
            const token = await storageGet(JWT_STORAGE_KEY) ?? null;
            logVerbose(`retrieved token from storage, is null: ${token === null}`);
            await setToken({
                shouldStore: false,
                tokens: token === null ? null : {
                    token
                }
            });
        };
        if (serverState !== undefined) {
            // First check that this isn't a subsequent render
            // with stale serverState.
            const timeFetched = storageGet(SERVER_STATE_FETCH_TIME_STORAGE_KEY);
            const setTokensFromServerState = (timeFetched)=>{
                if (!timeFetched || serverState._timeFetched > +timeFetched) {
                    const { token, refreshToken } = serverState._state;
                    const tokens = token === null || refreshToken === null ? null : {
                        token,
                        refreshToken
                    };
                    void storageSet(SERVER_STATE_FETCH_TIME_STORAGE_KEY, serverState._timeFetched.toString());
                    void setToken({
                        tokens,
                        shouldStore: true
                    });
                } else {
                    void readStateFromStorage();
                }
            };
            // We want to avoid async if possible.
            if (timeFetched instanceof Promise) {
                void timeFetched.then(setTokensFromServerState);
            } else {
                setTokensFromServerState(timeFetched);
            }
            return;
        }
        const code = typeof window?.location !== "undefined" ? new URLSearchParams(window.location.search).get("code") : null;
        // code from URL is only consumed initially,
        // ref avoids racing in Strict mode
        if (signingInWithCodeFromURL.current || code) {
            if (code && !signingInWithCodeFromURL.current) {
                signingInWithCodeFromURL.current = true;
                const url = new URL(window.location.href);
                url.searchParams.delete("code");
                void (async ()=>{
                    await replaceURL(url.pathname + url.search + url.hash);
                    await signIn(undefined, {
                        code
                    });
                    signingInWithCodeFromURL.current = false;
                })();
            }
        } else {
            void readStateFromStorage();
        }
    }, // Explicitly chosen dependencies.
    // This effect should mostly only run once
    // on mount.
    [
        client,
        storageGet
    ]);
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            signIn,
            signOut
        }), [
        signIn,
        signOut
    ]);
    const isAuthenticated = tokenState !== null;
    const authState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            isLoading,
            isAuthenticated,
            fetchAccessToken
        }), [
        fetchAccessToken,
        isLoading,
        isAuthenticated
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ConvexAuthInternalContext.Provider, {
        value: authState,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ConvexAuthActionsContext.Provider, {
            value: actions,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ConvexAuthTokenContext.Provider, {
                value: tokenState,
                children: children
            })
        })
    });
}
function useNamespacedStorage(peristentStorage, namespace) {
    const inMemoryStorage = useInMemoryStorage();
    const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>peristentStorage ?? inMemoryStorage(), [
        peristentStorage
    ]);
    const escapedNamespace = namespace.replace(/[^a-zA-Z0-9]/g, "");
    const storageKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((key)=>`${key}_${escapedNamespace}`, [
        namespace
    ]);
    const storageSet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((key, value)=>storage.setItem(storageKey(key), value), [
        storage,
        storageKey
    ]);
    const storageGet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((key)=>storage.getItem(storageKey(key)), [
        storage,
        storageKey
    ]);
    const storageRemove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((key)=>storage.removeItem(storageKey(key)), [
        storage,
        storageKey
    ]);
    return {
        storageSet,
        storageGet,
        storageRemove,
        storageKey
    };
}
function useInMemoryStorage() {
    const [inMemoryStorage, setInMemoryStorage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    return ()=>({
            getItem: (key)=>inMemoryStorage[key],
            setItem: (key, value)=>{
                setInMemoryStorage((prev)=>({
                        ...prev,
                        [key]: value
                    }));
            },
            removeItem: (key)=>{
                setInMemoryStorage((prev)=>{
                    const { [key]: _, ...rest } = prev;
                    return rest;
                });
            }
        });
}
// In the browser, executes the callback as the only tab / frame at a time.
async function browserMutex(key, callback) {
    const lockManager = window?.navigator?.locks;
    return lockManager !== undefined ? await lockManager.request(key, callback) : await manualMutex(key, callback);
}
function getMutexValue(key) {
    if (globalThis.__convexAuthMutexes === undefined) {
        globalThis.__convexAuthMutexes = {};
    }
    let mutex = globalThis.__convexAuthMutexes[key];
    if (mutex === undefined) {
        globalThis.__convexAuthMutexes[key] = {
            currentlyRunning: null,
            waiting: []
        };
    }
    mutex = globalThis.__convexAuthMutexes[key];
    return mutex;
}
function setMutexValue(key, value) {
    globalThis.__convexAuthMutexes[key] = value;
}
async function enqueueCallbackForMutex(key, callback) {
    const mutex = getMutexValue(key);
    if (mutex.currentlyRunning === null) {
        setMutexValue(key, {
            currentlyRunning: callback().finally(()=>{
                const nextCb = getMutexValue(key).waiting.shift();
                setMutexValue(key, {
                    ...getMutexValue(key),
                    currentlyRunning: nextCb === undefined ? null : enqueueCallbackForMutex(key, nextCb)
                });
            }),
            waiting: []
        });
    } else {
        setMutexValue(key, {
            ...mutex,
            waiting: [
                ...mutex.waiting,
                callback
            ]
        });
    }
}
async function manualMutex(key, callback) {
    const outerPromise = new Promise((resolve, reject)=>{
        const wrappedCallback = ()=>{
            return callback().then((v)=>resolve(v)).catch((e)=>reject(e));
        };
        void enqueueCallbackForMutex(key, wrappedCallback);
    });
    return outerPromise;
}
function browserAddEventListener(type, listener, options) {
    window.addEventListener?.(type, listener, options);
}
function browserRemoveEventListener(type, listener, options) {
    window.removeEventListener?.(type, listener, options);
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/data:e81ced [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0072803d9832b581dda5546eaf2c8860da47befa25":"invalidateCache"},"apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/invalidateCache.js",""] */ __turbopack_context__.s([
    "invalidateCache",
    ()=>invalidateCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var invalidateCache = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("0072803d9832b581dda5546eaf2c8860da47befa25", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "invalidateCache"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vaW52YWxpZGF0ZUNhY2hlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnZhbGlkYXRlQ2FjaGUoKSB7XG4gICAgLy8gRHVtbXkgY29va2llLCBqdXN0IHRvIHNldCB0aGUgaGVhZGVyIHdoaWNoIHdpbGwgaW52YWxpZGF0ZVxuICAgIC8vIHRoZSBjbGllbnQgUm91dGVyIENhY2hlLlxuICAgIGNvb2tpZXMoKS5kZWxldGUoYF9fY29udmV4QXV0aENvb2tpZUZvclJvdXRlckNhY2hlSW52YWxpZGF0aW9uJHtEYXRlLm5vdygpfWApO1xuICAgIHJldHVybiBudWxsO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJxVkFFc0IifQ==
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConvexAuthNextjsClientProvider",
    ()=>ConvexAuthNextjsClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/react/client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$data$3a$e81ced__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/data:e81ced [app-ssr] (ecmascript) <text/javascript>");
"use client";
;
;
;
;
function ConvexAuthNextjsClientProvider({ apiRoute, serverState, storage, storageNamespace, verbose, children }) {
    const call = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (action, args)=>{
        const params = {
            action,
            args
        };
        const response = await fetch(apiRoute ?? "/api/auth", {
            body: JSON.stringify(params),
            method: "POST"
        });
        return await response.json();
    }, [
        apiRoute
    ]);
    const authClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            authenticatedCall: call,
            unauthenticatedCall: call,
            verbose
        }), [
        call,
        verbose
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
        client: authClient,
        serverState: serverState,
        onChange: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$data$3a$e81ced__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["invalidateCache"],
        storage: ("TURBOPACK compile-time truthy", 1) ? undefined : "TURBOPACK unreachable",
        storageNamespace: storageNamespace ?? requireEnv(("TURBOPACK compile-time value", "https://original-turtle-96.convex.cloud"), "NEXT_PUBLIC_CONVEX_URL"),
        replaceURL: // Not used, since the redirect is handled by the Next.js server.
        (url)=>{
            window.history.replaceState({}, "", url);
        },
        children: children
    });
}
function requireEnv(value, name) {
    if (value === undefined) {
        throw new Error(`Missing environment variable \`${name}\``);
    }
    return value;
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConvexAuthNextjsProvider",
    ()=>ConvexAuthNextjsProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/react/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$ConvexAuthState$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/react/ConvexAuthState.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/react/client.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function ConvexAuthNextjsProvider(props) {
    const { client, children } = props;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$ConvexAuthState$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConvexProviderWithAuth"], {
        client: client,
        useAuth: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"],
        children: children
    });
}
}),
"[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
];

//# sourceMappingURL=_be907670._.js.map