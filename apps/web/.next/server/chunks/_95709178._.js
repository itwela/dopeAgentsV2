module.exports = [
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/invalidateCache.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0072803d9832b581dda5546eaf2c8860da47befa25":"invalidateCache"},"",""] */ __turbopack_context__.s([
    "invalidateCache",
    ()=>invalidateCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function invalidateCache() {
    // Dummy cookie, just to set the header which will invalidate
    // the client Router Cache.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])().delete(`__convexAuthCookieForRouterCacheInvalidation${Date.now()}`);
    return null;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    invalidateCache
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(invalidateCache, "0072803d9832b581dda5546eaf2c8860da47befa25", null);
}),
"[project]/apps/web/.next-internal/server/app/api/auth/route/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/invalidateCache.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$invalidateCache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/invalidateCache.js [app-rsc] (ecmascript)");
;
}),
"[project]/apps/web/.next-internal/server/app/api/auth/route/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/invalidateCache.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0072803d9832b581dda5546eaf2c8860da47befa25",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$invalidateCache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["invalidateCache"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f2e$next$2d$internal$2f$server$2f$app$2f$api$2f$auth$2f$route$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$invalidateCache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/apps/web/.next-internal/server/app/api/auth/route/actions.js { ACTIONS_MODULE0 => "[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/invalidateCache.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$invalidateCache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/invalidateCache.js [app-rsc] (ecmascript)");
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-route] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ConvexAuthNextjsClientProvider",
    ()=>ConvexAuthNextjsClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-route] (ecmascript)");
;
const ConvexAuthNextjsClientProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ConvexAuthNextjsClientProvider() from the server but ConvexAuthNextjsClientProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js <module evaluation>", "ConvexAuthNextjsClientProvider");
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-route] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ConvexAuthNextjsClientProvider",
    ()=>ConvexAuthNextjsClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-route] (ecmascript)");
;
const ConvexAuthNextjsClientProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ConvexAuthNextjsClientProvider() from the server but ConvexAuthNextjsClientProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js", "ConvexAuthNextjsClientProvider");
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$client$2e$js__$5b$app$2d$route$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-route] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$client$2e$js__$5b$app$2d$route$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-route] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$client$2e$js__$5b$app$2d$route$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/cookies.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRequestCookies",
    ()=>getRequestCookies,
    "getRequestCookiesInMiddleware",
    ()=>getRequestCookiesInMiddleware,
    "getResponseCookies",
    ()=>getResponseCookies
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
function getRequestCookies() {
    return getCookieStore((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])());
}
function getRequestCookiesInMiddleware(request) {
    return getCookieStore((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])(), request.cookies);
}
function getResponseCookies(response) {
    return getCookieStore((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])(), response.cookies);
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
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/cookies.js [app-route] (ecmascript)");
;
;
function jsonResponse(body) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify(body), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}
function setAuthCookies(response, tokens) {
    const responseCookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getResponseCookies"])(response);
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
    const requestCookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequestCookiesInMiddleware"])(request);
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
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/proxy.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "proxyAuthActionToConvex",
    ()=>proxyAuthActionToConvex,
    "shouldProxyAuthAction",
    ()=>shouldProxyAuthAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$nextjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/nextjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/cookies.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/utils.js [app-route] (ecmascript)");
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
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCorsRequest"])(request)) {
        return new Response("Invalid origin", {
            status: 403
        });
    }
    const { action, args } = await request.json();
    if (action !== "auth:signIn" && action !== "auth:signOut") {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Invalid action ${action}, returning 400`, verbose);
        return new Response("Invalid action", {
            status: 400
        });
    }
    let token;
    if (action === "auth:signIn" && args.refreshToken !== undefined) {
        // The client has a dummy refreshToken, the real one is only
        // stored in cookies.
        const refreshToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequestCookies"])().refreshToken;
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
        token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequestCookies"])().token ?? undefined;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Fetching action ${action} with args ${JSON.stringify(args)}`, verbose);
    const untypedResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$nextjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAction"])(action, args, {
        url: options?.convexUrl,
        token
    });
    if (action === "auth:signIn") {
        const result = untypedResult;
        if (result.redirect !== undefined) {
            const { redirect } = result;
            const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonResponse"])({
                redirect
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getResponseCookies"])(response).verifier = result.verifier;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Redirecting to ${redirect}`, verbose);
            return response;
        } else if (result.tokens !== undefined) {
            // The server doesn't share the refresh token with the client
            // for added security - the client has to use the server
            // to refresh the access token via cookies.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(result.tokens === null ? `No tokens returned, clearing auth cookies` : `Setting auth cookies with returned tokens`, verbose);
            const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonResponse"])({
                tokens: result.tokens !== null ? {
                    token: result.tokens.token,
                    refreshToken: "dummy"
                } : null
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setAuthCookies"])(response, result.tokens);
            return response;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonResponse"])(result);
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Clearing auth cookies`, verbose);
        const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonResponse"])(null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setAuthCookies"])(response, null);
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
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/request.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleAuthenticationInRequest",
    ()=>handleAuthenticationInRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$nextjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/nextjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jwt-decode/build/esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/cookies.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/utils.js [app-route] (ecmascript)");
;
;
;
;
;
async function handleAuthenticationInRequest(request, verbose) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Begin handleAuthenticationInRequest`, verbose);
    const requestUrl = new URL(request.url);
    // Validate CORS
    validateCors(request);
    // Refresh tokens if necessary
    const refreshTokens = await getRefreshedTokens(verbose);
    // Handle code exchange for OAuth and magic links via server-side redirect
    const code = requestUrl.searchParams.get("code");
    if (code && request.method === "GET" && request.headers.get("accept")?.includes("text/html")) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Handling code exchange for OAuth or magic link`, verbose);
        const verifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequestCookies"])().verifier ?? undefined;
        const redirectUrl = new URL(requestUrl);
        redirectUrl.searchParams.delete("code");
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$nextjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAction"])("auth:signIn", {
                params: {
                    code
                },
                verifier
            });
            if (result.tokens === undefined) {
                throw new Error("Invalid `signIn` action result for code exchange");
            }
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setAuthCookies"])(response, result.tokens);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Successfully validated code, redirecting to ${redirectUrl.toString()} with auth cookies`, verbose);
            return {
                kind: "redirect",
                response
            };
        } catch (error) {
            console.error(error);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Error validating code, redirecting to ${redirectUrl.toString()} and clearing auth cookies`, verbose);
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setAuthCookies"])(response, null);
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
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCorsRequest"])(request)) {
        const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequestCookiesInMiddleware"])(request);
        cookies.token = null;
        cookies.refreshToken = null;
        cookies.verifier = null;
    }
}
const REQUIRED_TOKEN_LIFETIME_MS = 60_000; // 1 minute
const MINIMUM_REQUIRED_TOKEN_LIFETIME_MS = 10_000; // 10 seconds
async function getRefreshedTokens(verbose) {
    const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequestCookies"])();
    const { token, refreshToken } = cookies;
    if (refreshToken === null && token === null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`No tokens to refresh, returning undefined`, verbose);
        return undefined;
    }
    if (refreshToken === null || token === null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Refresh token null? ${refreshToken === null}, token null? ${token === null}, returning null`, verbose);
        return null;
    }
    const decodedToken = decodeToken(token);
    if (decodedToken === null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Failed to decode token, returning null`, verbose);
        return null;
    }
    const totalTokenLifetimeMs = decodedToken.exp * 1000 - decodedToken.iat * 1000;
    // Check that the token is valid for the next 1 minute
    // or at least 10% of its valid duration or 10 seconds
    const minimumExpiration = Date.now() + Math.min(REQUIRED_TOKEN_LIFETIME_MS, Math.max(MINIMUM_REQUIRED_TOKEN_LIFETIME_MS, totalTokenLifetimeMs / 10));
    if (decodedToken.exp * 1000 > minimumExpiration) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Token expires far enough in the future, no need to refresh, returning undefined`, verbose);
        return undefined;
    }
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$nextjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAction"])("auth:signIn", {
            refreshToken
        });
        if (result.tokens === undefined) {
            throw new Error("Invalid `signIn` action result for token refresh");
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Successfully refreshed tokens`, verbose);
        return result.tokens;
    } catch (error) {
        console.error(error);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Failed to refresh tokens, returning null`, verbose);
        return null;
    }
}
function decodeToken(token) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtDecode"])(token);
    } catch (e) {
        return null;
    }
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/cookies.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$proxy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/proxy.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/request.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/utils.js [app-route] (ecmascript)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConvexAuthNextjsClientProvider"], {
        serverState: convexAuthNextjsServerState(),
        apiRoute: apiRoute,
        storage: storage,
        storageNamespace: storageNamespace,
        verbose: verbose,
        children: children
    });
}
function convexAuthNextjsToken() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequestCookies"])().token ?? undefined;
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Begin middleware for request with URL ${request.url}`, verbose);
        const requestUrl = new URL(request.url);
        // Proxy signIn and signOut actions to Convex backend
        const apiRoute = options?.apiRoute ?? "/api/auth";
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$proxy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["shouldProxyAuthAction"])(request, apiRoute)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Proxying auth action to Convex, path matches ${apiRoute} with or without trailing slash`, verbose);
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$proxy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["proxyAuthActionToConvex"])(request, options);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Not proxying auth action to Convex, path ${requestUrl.pathname} does not match ${apiRoute}`, verbose);
        // Refresh tokens, handle code query param
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$request$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleAuthenticationInRequest"])(request, verbose);
        // If redirecting, proceed, the middleware will run again on next request
        if (authResult.kind === "redirect") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Redirecting to ${authResult.response.headers.get("Location")}`, verbose);
            return authResult.response;
        }
        let response = null;
        // Forward cookies to request for custom handler
        if (authResult.kind === "refreshTokens" && authResult.refreshTokens !== undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Forwarding cookies to request`, verbose);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setAuthCookiesInMiddleware"])(request, authResult.refreshTokens);
        }
        if (handler === undefined) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`No custom handler`, verbose);
            response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].next();
        } else {
            // Call the custom handler
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logVerbose"])(`Calling custom handler`, verbose);
            response = await handler(request, event) ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].next();
        }
        // Port the cookies from the auth middleware to the response
        if (authResult.kind === "refreshTokens" && authResult.refreshTokens !== undefined) {
            response.headers.getSetCookie();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setAuthCookies"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].next(response), authResult.refreshTokens);
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
}
function convexAuthNextjsServerState() {
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRequestCookies"])();
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
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/routeMatcher.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Adapted from Clerk
//
// MIT License
//
// Copyright (c) 2022 Clerk, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
__turbopack_context__.s([
    "createRouteMatcher",
    ()=>createRouteMatcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$path$2d$to$2d$regexp$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/path-to-regexp/dist/index.js [app-route] (ecmascript)");
;
const createRouteMatcher = (routes)=>{
    if (typeof routes === "function") {
        return (req)=>routes(req);
    }
    const routePatterns = [
        routes || ""
    ].flat().filter(Boolean);
    const matchers = precomputePathRegex(routePatterns);
    return (req)=>matchers.some((matcher)=>matcher.test(req.nextUrl.pathname));
};
const precomputePathRegex = (patterns)=>{
    return patterns.map((pattern)=>pattern instanceof RegExp ? pattern : pathStringToRegExp(pattern));
};
function pathStringToRegExp(path) {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$path$2d$to$2d$regexp$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pathToRegexp"])(path);
    } catch (e) {
        throw new Error(`Invalid path: ${path}.\nConsult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp\n${e.message}`);
    }
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConvexAuthNextjsServerProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ConvexAuthNextjsServerProvider"],
    "convexAuthNextjsMiddleware",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["convexAuthNextjsMiddleware"],
    "convexAuthNextjsToken",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["convexAuthNextjsToken"],
    "createRouteMatcher",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$routeMatcher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteMatcher"],
    "isAuthenticatedNextjs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isAuthenticatedNextjs"],
    "nextjsMiddlewareRedirect",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nextjsMiddlewareRedirect"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$nextjs$2f$server$2f$routeMatcher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/nextjs/server/routeMatcher.js [app-route] (ecmascript)");
}),
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
];

//# sourceMappingURL=_95709178._.js.map