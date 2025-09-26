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
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/checks.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Some code adapted from Auth.js. Original license:
//
// ISC License
//
// Copyright (c) 2022-2024, Balázs Orbán
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
__turbopack_context__.s([
    "nonce",
    ()=>nonce,
    "pkce",
    ()=>pkce,
    "redirectToParamCookie",
    ()=>redirectToParamCookie,
    "state",
    ()=>state,
    "useRedirectToParam",
    ()=>useRedirectToParam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/arctic/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$oauth2$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arctic/node_modules/oslo/dist/oauth2/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/oauth4webapi/build/index.js [app-route] (ecmascript)");
;
;
const SHARED_COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    partitioned: true
};
const state = {
    create (provider) {
        const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arctic$2f$node_modules$2f$oslo$2f$dist$2f$oauth2$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateState"])();
        const cookie = {
            name: oauthStateCookieName("state", provider.id),
            value: state,
            options: {
                ...SHARED_COOKIE_OPTIONS,
                maxAge: STATE_MAX_AGE
            }
        };
        return {
            state,
            cookie
        };
    },
    use (provider, cookies) {
        const cookieName = oauthStateCookieName("state", provider.id);
        const state = cookies[cookieName];
        if (state === undefined) {
            throw new Error("state cookie is missing.");
        }
        // Clear the state cookie after use
        const updatedCookie = {
            name: cookieName,
            value: "",
            options: {
                ...SHARED_COOKIE_OPTIONS,
                maxAge: 0
            }
        };
        return {
            state,
            updatedCookie
        };
    }
};
const PKCE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const pkce = {
    async create (provider) {
        const codeVerifier = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateRandomCodeVerifier"]();
        const codeChallenge = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculatePKCECodeChallenge"](codeVerifier);
        const cookie = {
            name: oauthStateCookieName("pkce", provider.id),
            value: codeVerifier,
            options: {
                ...SHARED_COOKIE_OPTIONS,
                maxAge: PKCE_MAX_AGE
            }
        };
        return {
            codeChallenge,
            codeVerifier,
            cookie
        };
    },
    /**
     * An error is thrown if the code_verifier is missing or invalid.
     * @see https://www.rfc-editor.org/rfc/rfc7636
     * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#pkce
     */ use (provider, cookies) {
        const cookieName = oauthStateCookieName("pkce", provider.id);
        const codeVerifier = cookies[cookieName];
        if (codeVerifier === undefined) {
            throw new Error("pkce cookie is missing.");
        }
        // Clear the state cookie after use
        const updatedCookie = {
            name: cookieName,
            value: "",
            options: {
                ...SHARED_COOKIE_OPTIONS,
                maxAge: 0
            }
        };
        return {
            codeVerifier,
            updatedCookie
        };
    }
};
const STATE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const NONCE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const nonce = {
    async create (provider) {
        const nonce = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateRandomNonce"]();
        const cookie = {
            name: oauthStateCookieName("nonce", provider.id),
            value: nonce,
            options: {
                ...SHARED_COOKIE_OPTIONS,
                maxAge: NONCE_MAX_AGE
            }
        };
        return {
            nonce,
            cookie
        };
    },
    /**
     * An error is thrown if the nonce is missing or invalid.
     * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
     * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
     */ use (provider, cookies) {
        const cookieName = oauthStateCookieName("nonce", provider.id);
        const nonce = cookies[cookieName];
        if (nonce === undefined) {
            throw new Error("state cookie is missing.");
        }
        // Clear the state cookie after use
        const updatedCookie = {
            name: cookieName,
            value: "",
            options: {
                ...SHARED_COOKIE_OPTIONS,
                maxAge: 0
            }
        };
        return {
            nonce,
            updatedCookie
        };
    }
};
const REDIRECT_MAX_AGE = 60 * 15; // 15 minutes in seconds
function redirectToParamCookie(providerId, redirectTo) {
    return {
        name: redirectToParamCookieName(providerId),
        value: redirectTo,
        options: {
            ...SHARED_COOKIE_OPTIONS,
            maxAge: REDIRECT_MAX_AGE
        }
    };
}
function useRedirectToParam(providerId, cookies) {
    const cookieName = redirectToParamCookieName(providerId);
    const redirectTo = cookies[cookieName];
    if (redirectTo === undefined) {
        return null;
    }
    // Clear the cookie
    const updatedCookie = {
        name: cookieName,
        value: "",
        options: {
            ...SHARED_COOKIE_OPTIONS,
            maxAge: 0
        }
    };
    return {
        redirectTo,
        updatedCookie
    };
}
function redirectToParamCookieName(providerId) {
    return "__Host-" + providerId + "RedirectTo";
}
function oauthStateCookieName(type, providerId) {
    return "__Host-" + providerId + "OAuth" + type;
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/provider_utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Some code adapted from Auth.js. Original license:
//
// ISC License
//
// Copyright (c) 2022-2024, Balázs Orbán
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
__turbopack_context__.s([
    "PLACEHOLDER_URL_HOST",
    ()=>PLACEHOLDER_URL_HOST,
    "configDefaults",
    ()=>configDefaults,
    "listAvailableProviders",
    ()=>listAvailableProviders,
    "materializeProvider",
    ()=>materializeProvider,
    "merge",
    ()=>merge,
    "normalizeEndpoint",
    ()=>normalizeEndpoint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@auth/core/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@auth/core/lib/utils/env.js [app-route] (ecmascript)");
;
function configDefaults(config_) {
    const config = materializeAndDefaultProviders(config_);
    // Collect extra providers
    const extraProviders = config.providers.filter((p)=>p.type === "credentials").map((p)=>p.extraProviders).flat().filter((p)=>p !== undefined);
    return {
        ...config,
        extraProviders: materializeProviders(extraProviders),
        theme: config.theme ?? {
            colorScheme: "auto",
            logo: "",
            brandColor: "",
            buttonText: ""
        }
    };
}
function materializeProvider(provider) {
    const config = {
        providers: [
            provider
        ]
    };
    materializeAndDefaultProviders(config);
    return config.providers[0];
}
function materializeProviders(providers) {
    const config = {
        providers
    };
    materializeAndDefaultProviders(config);
    return config.providers;
}
function materializeAndDefaultProviders(config_) {
    // Have to materialize first so that the correct env variables are used
    const providers = config_.providers.map((provider)=>providerDefaults(typeof provider === "function" ? provider() : provider));
    const config = {
        ...config_,
        providers
    };
    // Unfortunately mutates its argument
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setEnvDefaults"])(process.env, config);
    // Manually do this for new provider type
    config.providers.forEach((provider)=>{
        if (provider.type === "phone") {
            const ID = provider.id.toUpperCase().replace(/-/g, "_");
            // Should not require this env var at push time, as the provider's
            // implementation might not use it
            provider.apiKey ??= process.env[`AUTH_${ID}_KEY`];
        }
    });
    return config;
}
function providerDefaults(provider) {
    // TODO: Add `redirectProxyUrl` to oauth providers
    const merged = merge(provider, provider.options);
    return merged.type === "oauth" || merged.type === "oidc" ? normalizeOAuth(merged) : merged;
}
const defaultProfile = (profile)=>{
    return stripUndefined({
        id: profile.sub ?? profile.id ?? crypto.randomUUID(),
        name: profile.name ?? profile.nickname ?? profile.preferred_username,
        email: profile.email ?? undefined,
        image: profile.picture ?? undefined
    });
};
const defaultAccount = (account)=>{
    return stripUndefined({
        access_token: account.access_token,
        id_token: account.id_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at,
        scope: account.scope,
        token_type: account.token_type,
        session_state: account.session_state
    });
};
function stripUndefined(o) {
    const result = {};
    for (const [k, v] of Object.entries(o))v !== undefined && (result[k] = v);
    return result;
}
function normalizeOAuth(c) {
    if (c.issuer) c.wellKnown ??= `${c.issuer}/.well-known/openid-configuration`;
    const checks = c.checks ?? [
        "pkce"
    ];
    if (c.redirectProxyUrl) {
        if (!checks.includes("state")) checks.push("state");
        c.redirectProxyUrl = `${c.redirectProxyUrl}/callback/${c.id}`;
    }
    return {
        ...c,
        checks,
        profile: c.profile ?? defaultProfile,
        account: c.account ?? defaultAccount
    };
}
const PLACEHOLDER_URL_HOST = "convexauth.mumbojumbo";
const PLACEHOLDER_URL = `https://${PLACEHOLDER_URL_HOST}`;
function normalizeEndpoint(e, issuer) {
    if (!e && issuer) return undefined;
    if (typeof e === "string") {
        return {
            url: new URL(e)
        };
    }
    // Placeholder URL is used to pass around the URL object
    // even if the URL hasn't been specified: the `issuer`
    // is used instead.
    const url = new URL(e?.url ?? PLACEHOLDER_URL);
    if (e?.params != null) {
        for (const [key, value] of Object.entries(e.params)){
            url.searchParams.set(key, String(key === "claims" ? JSON.stringify(value) : value));
        }
    }
    return {
        url,
        request: e?.request,
        conform: e?.conform
    };
}
function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for(const key in source){
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {
                    [key]: {}
                });
                merge(target[key], source[key]);
            } else {
                Object.assign(target, {
                    [key]: source[key]
                });
            }
        }
    }
    return merge(target, ...sources);
}
/** Simple object check */ function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
}
function listAvailableProviders(config, allowExtraProviders) {
    const availableProviders = config.providers.concat(allowExtraProviders ? config.extraProviders : []).map((provider)=>`\`${provider.id}\``);
    return availableProviders.length > 0 ? availableProviders.join(", ") : "no providers have been configured";
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "requireEnv",
    ()=>requireEnv
]);
function requireEnv(name) {
    const value = process.env[name];
    if (value === undefined) {
        throw new Error(`Missing environment variable \`${name}\``);
    }
    return value;
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "LOG_LEVELS",
    ()=>LOG_LEVELS,
    "REFRESH_TOKEN_DIVIDER",
    ()=>REFRESH_TOKEN_DIVIDER,
    "TOKEN_SUB_CLAIM_DIVIDER",
    ()=>TOKEN_SUB_CLAIM_DIVIDER,
    "logError",
    ()=>logError,
    "logWithLevel",
    ()=>logWithLevel,
    "maybeRedact",
    ()=>maybeRedact,
    "sha256",
    ()=>sha256,
    "stringToNumber",
    ()=>stringToNumber
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/oslo/crypto [external] (oslo/crypto, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$encoding__$5b$external$5d$__$28$oslo$2f$encoding$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/oslo/encoding [external] (oslo/encoding, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$encoding__$5b$external$5d$__$28$oslo$2f$encoding$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$encoding__$5b$external$5d$__$28$oslo$2f$encoding$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const TOKEN_SUB_CLAIM_DIVIDER = "|";
const REFRESH_TOKEN_DIVIDER = "|";
function stringToNumber(value) {
    return value !== undefined ? Number(value) : undefined;
}
async function sha256(input) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$encoding__$5b$external$5d$__$28$oslo$2f$encoding$2c$__esm_import$29$__["encodeHex"])(await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__["sha256"])(new TextEncoder().encode(input)));
}
function logError(error) {
    logWithLevel(LOG_LEVELS.ERROR, error instanceof Error ? error.message + "\n" + error.stack?.replace("\\n", "\n") : error);
}
const LOG_LEVELS = {
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    DEBUG: "DEBUG"
};
function logWithLevel(level, ...args) {
    const configuredLogLevel = LOG_LEVELS[process.env.AUTH_LOG_LEVEL ?? "INFO"] ?? "INFO";
    switch(level){
        case "ERROR":
            console.error(...args);
            break;
        case "WARN":
            if (configuredLogLevel !== "ERROR") {
                console.warn(...args);
            }
            break;
        case "INFO":
            if (configuredLogLevel === "INFO" || configuredLogLevel === "DEBUG") {
                console.info(...args);
            }
            break;
        case "DEBUG":
            if (configuredLogLevel === "DEBUG") {
                console.debug(...args);
            }
            break;
    }
}
function maybeRedact(value) {
    if (value === "") {
        return "";
    }
    const shouldRedact = process.env.AUTH_LOG_SECRETS !== "true";
    if (shouldRedact) {
        if (value.length < 6) {
            return "<redacted>";
        }
        return value.substring(0, 3) + "<redacted>" + value.substring(value.length - 3);
    } else {
        return value;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/oauth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// Some code adapted from Auth.js. Original license:
//
// ISC License
//
// Copyright (c) 2022-2024, Balázs Orbán
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
__turbopack_context__.s([
    "getAuthorizationURL",
    ()=>getAuthorizationURL,
    "handleOAuthCallback",
    ()=>handleOAuthCallback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/oauth4webapi/build/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/checks.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/provider_utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
async function getAuthorizationURL(provider) {
    const { authorization, server, checks: providerChecks } = await getOAuthConfig(provider);
    const url = authorization.url;
    const authParams = url.searchParams;
    const redirect_uri = callbackUrl(provider.id);
    // let data: object | undefined;
    // TODO(convex auth): Support redirect proxy
    // if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
    //   redirect_uri = provider.redirectProxyUrl;
    //   data = { origin: provider.callbackUrl };
    //   logger.debug("using redirect proxy", { redirect_uri, data });
    // }
    if (provider.clientId === undefined) {
        throw new Error(`Missing \`clientId\`, set \`${clientId(provider.id)}\``);
    }
    if (provider.clientSecret === undefined) {
        throw new Error(`Missing \`clientSecret\`, set \`${clientSecret(provider.id)}\``);
    }
    for (const [key, value] of Object.entries({
        response_type: "code",
        // clientId can technically be undefined, should we check this in assert.ts or rely on the Authorization Server to do it?
        client_id: provider.clientId,
        redirect_uri,
        // (convex-auth) Ugh here we use
        // the original params config from the provider
        // @ts-expect-error TODO:
        ...provider.authorization?.params
    })){
        authParams.set(key, value);
    }
    const cookies = [];
    if (provider.checks?.includes("state")) {
        const { state, cookie } = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["state"].create(provider);
        authParams.set("state", state);
        cookies.push(cookie);
    }
    let codeVerifier;
    if (providerChecks?.includes("pkce")) {
        if (server === null || server.code_challenge_methods_supported?.includes("S256")) {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pkce"].create(provider);
            authParams.set("code_challenge", result.codeChallenge);
            authParams.set("code_challenge_method", "S256");
            cookies.push(result.cookie);
            codeVerifier = result.codeVerifier;
        }
    }
    // @ts-expect-error TS is confused by the combined types
    if (providerChecks?.includes("nonce")) {
        const { nonce, cookie } = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nonce"].create(provider);
        authParams.set("nonce", nonce);
        cookies.push(cookie);
    }
    if (!url.searchParams.has("scope")) {
        authParams.set("scope", "openid profile email");
    }
    // logger.debug("authorization url is ready", { url, cookies, provider });
    return {
        redirect: url.toString(),
        cookies,
        signature: getAuthorizationSignature({
            codeVerifier,
            state: authParams.get("state") ?? undefined,
            nonce: authParams.get("nonce") ?? undefined
        })
    };
}
async function handleOAuthCallback(provider, request, cookies) {
    const { userinfo, server: realServer, fakeServer, checks: providerChecks } = await getOAuthConfig(provider);
    const server = realServer ?? fakeServer;
    const client = {
        client_id: provider.clientId,
        client_secret: provider.clientSecret,
        ...provider.client
    };
    const updatedCookies = [];
    let state;
    if (providerChecks?.includes("state")) {
        const result = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["state"].use(provider, cookies);
        updatedCookies.push(result.updatedCookie);
        state = result.state;
    }
    const params = new URL(request.url).searchParams;
    // Handle OAuth providers that use formData (such as Apple)
    if (request.headers.get("Content-Type") === "application/x-www-form-urlencoded") {
        const formData = await request.formData();
        for (const [key, value] of formData.entries()){
            if (typeof value === "string") {
                params.append(key, value);
            }
        }
    }
    const codeGrantParams = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthResponse"](server, client, params, providerChecks?.includes("state") ? state : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["skipStateCheck"]);
    /** https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1 */ if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOAuth2Error"](codeGrantParams)) {
        const cause = {
            providerId: provider.id,
            ...codeGrantParams
        };
        throw new Error("OAuth Provider returned an error " + JSON.stringify(cause));
    }
    let codeVerifier;
    if (providerChecks?.includes("pkce")) {
        const result = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pkce"].use(provider, cookies);
        updatedCookies.push(result.updatedCookie);
        codeVerifier = result.codeVerifier;
    }
    const redirect_uri = callbackUrl(provider.id);
    // TODO(convex auth): Support redirect proxy
    // if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
    //   redirect_uri = provider.redirectProxyUrl;
    // }
    let codeGrantResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authorizationCodeGrantRequest"](server, client, codeGrantParams, redirect_uri, codeVerifier ?? "auth", {
        // https://github.com/nextauthjs/next-auth/pull/10765
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customFetch"]]: (...args)=>{
            if (!providerChecks.includes("pkce") && args[1]?.body instanceof URLSearchParams) {
                args[1].body.delete("code_verifier");
            }
            return fetch(...args);
        }
    });
    if (provider.token?.conform) {
        codeGrantResponse = await provider.token.conform(codeGrantResponse.clone()) ?? codeGrantResponse;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseWwwAuthenticateChallenges"](codeGrantResponse)) {
        throw new Error("www-authenticate challenges are not supported atm");
    }
    let profile = {};
    let tokens;
    let nonce;
    if (provider.type === "oidc") {
        // @ts-expect-error TS is confused by the combined types
        if (providerChecks?.includes("nonce")) {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nonce"].use(provider, cookies);
            updatedCookies.push(result.updatedCookie);
            nonce = result.nonce;
        }
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processAuthorizationCodeOpenIDResponse"](server, client, codeGrantResponse, nonce ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNoNonce"]);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOAuth2Error"](result)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "OAuth2 error:", result);
            throw new Error("OIDC response body error");
        }
        profile = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getValidatedIdTokenClaims"](result);
        tokens = result;
    } else {
        tokens = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processAuthorizationCodeOAuth2Response"](server, client, codeGrantResponse);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOAuth2Error"](tokens)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "OAuth2 error:", tokens);
            throw new Error("OAuth response body error");
        }
        if (userinfo?.request) {
            const _profile = await userinfo.request({
                tokens,
                provider
            });
            if (_profile instanceof Object) profile = _profile;
        } else if (userinfo?.url) {
            const userinfoResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["userInfoRequest"](server, client, tokens.access_token);
            profile = await userinfoResponse.json();
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].WARN, `No userinfo endpoint configured for ${provider.id}`);
        }
    }
    if (tokens.expires_in) {
        tokens.expires_at = Math.floor(Date.now() / 1000) + Number(tokens.expires_in);
    }
    return {
        profile,
        cookies: updatedCookies,
        tokens,
        signature: getAuthorizationSignature({
            codeVerifier,
            state,
            nonce
        })
    };
}
// TODO(convex auth): We need to support custom callback URLs
function callbackUrl(providerId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireEnv"])("CONVEX_SITE_URL") + "/api/auth/callback/" + providerId;
}
function getAuthorizationSignature({ codeVerifier, state, nonce }) {
    return [
        codeVerifier,
        state,
        nonce
    ].filter((param)=>param !== undefined).join(" ");
}
function clientId(providerId) {
    return `AUTH_${envProviderId(providerId)}_ID`;
}
function clientSecret(providerId) {
    return `AUTH_${envProviderId(providerId)}_SECRET`;
}
function envProviderId(provider) {
    return provider.toUpperCase().replace(/-/g, "_");
}
async function getOAuthConfig(provider) {
    if (!provider.authorization || !provider.token || !provider.userinfo) {
        if (!provider.issuer) {
            throw new Error(`Provider \`${provider.id}\` is missing an \`issuer\` URL configuration. Consult the provider docs.`);
        }
        const discovery = `${provider.issuer.replace(/\/$/, "")}/.well-known/openid-configuration`;
        const response = await fetch(discovery);
        const config = await response.json();
        return {
            ...provider,
            checks: provider.type === "oidc" && provider.checks?.includes("pkce") && !config.code_challenge_methods_supported?.includes("S256") ? [
                "nonce"
            ] : provider.checks,
            server: config,
            fakeServer: null,
            authorization: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeEndpoint"])({
                ...provider.authorization,
                url: new URL(config.authorization_endpoint)
            }),
            token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeEndpoint"])({
                ...provider.token,
                url: new URL(config.token_endpoint)
            }),
            userinfo: config.userinfo_endpoint ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeEndpoint"])({
                ...provider.userinfo,
                url: new URL(config.userinfo_endpoint)
            }) : provider.userinfo
        };
    } else {
        const authorization = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeEndpoint"])(provider.authorization);
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeEndpoint"])(provider.token);
        const userinfo = provider.userinfo ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeEndpoint"])(provider.userinfo) : undefined;
        return {
            ...provider,
            authorization,
            token,
            userinfo,
            fakeServer: {
                issuer: provider.issuer ?? "theremustbeastringhere.dev",
                authorization_endpoint: authorization?.url.toString(),
                token_endpoint: token?.url.toString(),
                userinfo_endpoint: userinfo?.url.toString()
            },
            server: null
        };
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/provider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hash",
    ()=>hash,
    "verify",
    ()=>verify
]);
async function hash(provider, secret) {
    if (provider.type !== "credentials") {
        throw new Error(`Provider ${provider.id} is not a credentials provider`);
    }
    const hashSecretFn = provider.crypto?.hashSecret;
    if (hashSecretFn === undefined) {
        throw new Error(`Provider ${provider.id} does not have a \`crypto.hashSecret\` function`);
    }
    return await hashSecretFn(secret);
}
async function verify(provider, secret, hash) {
    if (provider.type !== "credentials") {
        throw new Error(`Provider ${provider.id} is not a credentials provider`);
    }
    const verifySecretFn = provider.crypto?.verifySecret;
    if (verifySecretFn === undefined) {
        throw new Error(`Provider ${provider.id} does not have a \`crypto.verifySecret\` function`);
    }
    return await verifySecretFn(secret, hash);
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/users.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getAccountOrThrow",
    ()=>getAccountOrThrow,
    "upsertUserAndAccount",
    ()=>upsertUserAndAccount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function upsertUserAndAccount(ctx, sessionId, account, args, config) {
    const userId = await defaultCreateOrUpdateUser(ctx, sessionId, "existingAccount" in account ? account.existingAccount : null, args, config);
    const accountId = await createOrUpdateAccount(ctx, userId, account, args);
    return {
        userId,
        accountId
    };
}
async function defaultCreateOrUpdateUser(ctx, existingSessionId, existingAccount, args, config) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "defaultCreateOrUpdateUser args:", {
        existingAccountId: existingAccount?._id,
        existingSessionId,
        args
    });
    const existingUserId = existingAccount?.userId ?? null;
    if (config.callbacks?.createOrUpdateUser !== undefined) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "Using custom createOrUpdateUser callback");
        return await config.callbacks.createOrUpdateUser(ctx, {
            existingUserId,
            ...args
        });
    }
    const { provider, profile: { emailVerified: profileEmailVerified, phoneVerified: profilePhoneVerified, ...profile } } = args;
    const emailVerified = profileEmailVerified ?? ((provider.type === "oauth" || provider.type === "oidc") && provider.allowDangerousEmailAccountLinking !== false);
    const phoneVerified = profilePhoneVerified ?? false;
    const shouldLinkViaEmail = args.shouldLinkViaEmail || emailVerified || provider.type === "email";
    const shouldLinkViaPhone = args.shouldLinkViaPhone || phoneVerified || provider.type === "phone";
    let userId = existingUserId;
    if (existingUserId === null) {
        const existingUserWithVerifiedEmailId = typeof profile.email === "string" && shouldLinkViaEmail ? (await uniqueUserWithVerifiedEmail(ctx, profile.email))?._id ?? null : null;
        const existingUserWithVerifiedPhoneId = typeof profile.phone === "string" && shouldLinkViaPhone ? (await uniqueUserWithVerifiedPhone(ctx, profile.phone))?._id ?? null : null;
        // If there is both email and phone verified user
        // already we can't link.
        if (existingUserWithVerifiedEmailId !== null && existingUserWithVerifiedPhoneId !== null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, `Found existing email and phone verified users, so not linking: email: ${existingUserWithVerifiedEmailId}, phone: ${existingUserWithVerifiedPhoneId}`);
            userId = null;
        } else if (existingUserWithVerifiedEmailId !== null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, `Found existing email verified user, linking: ${existingUserWithVerifiedEmailId}`);
            userId = existingUserWithVerifiedEmailId;
        } else if (existingUserWithVerifiedPhoneId !== null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, `Found existing phone verified user, linking: ${existingUserWithVerifiedPhoneId}`);
            userId = existingUserWithVerifiedPhoneId;
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "No existing verified users found, creating new user");
            userId = null;
        }
    }
    const userData = {
        ...emailVerified ? {
            emailVerificationTime: Date.now()
        } : null,
        ...phoneVerified ? {
            phoneVerificationTime: Date.now()
        } : null,
        ...profile
    };
    const existingOrLinkedUserId = userId;
    if (userId !== null) {
        try {
            await ctx.db.patch(userId, userData);
        } catch (error) {
            throw new Error(`Could not update user document with ID \`${userId}\`, ` + `either the user has been deleted but their account has not, ` + `or the profile data doesn't match the \`users\` table schema: ` + `${error.message}`);
        }
    } else {
        userId = await ctx.db.insert("users", userData);
    }
    const afterUserCreatedOrUpdated = config.callbacks?.afterUserCreatedOrUpdated;
    if (afterUserCreatedOrUpdated !== undefined) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "Calling custom afterUserCreatedOrUpdated callback");
        await afterUserCreatedOrUpdated(ctx, {
            userId,
            existingUserId: existingOrLinkedUserId,
            ...args
        });
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "No custom afterUserCreatedOrUpdated callback, skipping");
    }
    return userId;
}
async function uniqueUserWithVerifiedEmail(ctx, email) {
    const users = await ctx.db.query("users").withIndex("email", (q)=>q.eq("email", email)).filter((q)=>q.neq(q.field("emailVerificationTime"), undefined)).take(2);
    return users.length === 1 ? users[0] : null;
}
async function uniqueUserWithVerifiedPhone(ctx, phone) {
    const users = await ctx.db.query("users").withIndex("phone", (q)=>q.eq("phone", phone)).filter((q)=>q.neq(q.field("phoneVerificationTime"), undefined)).take(2);
    return users.length === 1 ? users[0] : null;
}
async function createOrUpdateAccount(ctx, userId, account, args) {
    const accountId = "existingAccount" in account ? account.existingAccount._id : await ctx.db.insert("authAccounts", {
        userId,
        provider: args.provider.id,
        providerAccountId: account.providerAccountId,
        secret: account.secret
    });
    // This is never used with the default `createOrUpdateUser` implementation,
    // but it is used for manual linking via custom `createOrUpdateUser`:
    if ("existingAccount" in account && account.existingAccount.userId !== userId) {
        await ctx.db.patch(accountId, {
            userId
        });
    }
    if (args.profile.emailVerified) {
        await ctx.db.patch(accountId, {
            emailVerified: args.profile.email
        });
    }
    if (args.profile.phoneVerified) {
        await ctx.db.patch(accountId, {
            phoneVerified: args.profile.phone
        });
    }
    return accountId;
}
async function getAccountOrThrow(ctx, existingAccountId) {
    const existingAccount = await ctx.db.get(existingAccountId);
    if (existingAccount === null) {
        throw new Error(`Expected an account to exist for ID "${existingAccountId}"`);
    }
    return existingAccount;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/tokens.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "generateToken",
    ()=>generateToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/node/esm/jwt/sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$key$2f$import$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/node/esm/key/import.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const DEFAULT_JWT_DURATION_MS = 1000 * 60 * 60; // 1 hour
async function generateToken(args, config) {
    const privateKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$key$2f$import$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["importPKCS8"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireEnv"])("JWT_PRIVATE_KEY"), "RS256");
    const expirationTime = new Date(Date.now() + (config.jwt?.durationMs ?? DEFAULT_JWT_DURATION_MS));
    return await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignJWT"]({
        sub: args.userId + __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_SUB_CLAIM_DIVIDER"] + args.sessionId
    }).setProtectedHeader({
        alg: "RS256"
    }).setIssuedAt().setIssuer((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireEnv"])("CONVEX_SITE_URL")).setAudience("convex").setExpirationTime(expirationTime).sign(privateKey);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/refreshTokens.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "createRefreshToken",
    ()=>createRefreshToken,
    "deleteRefreshTokens",
    ()=>deleteRefreshTokens,
    "validateRefreshToken",
    ()=>validateRefreshToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const DEFAULT_SESSION_INACTIVE_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
async function createRefreshToken(ctx, sessionId, config) {
    const expirationTime = Date.now() + (config.session?.inactiveDurationMs ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringToNumber"])(process.env.AUTH_SESSION_INACTIVE_DURATION_MS) ?? DEFAULT_SESSION_INACTIVE_DURATION_MS);
    const newRefreshTokenId = await ctx.db.insert("authRefreshTokens", {
        sessionId,
        expirationTime
    });
    return `${newRefreshTokenId}${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["REFRESH_TOKEN_DIVIDER"]}${sessionId}`;
}
async function deleteRefreshTokens(ctx, sessionId) {
    const existingRefreshTokens = await ctx.db.query("authRefreshTokens").withIndex("sessionId", (q)=>q.eq("sessionId", sessionId)).collect();
    for (const refreshTokenDoc of existingRefreshTokens){
        await ctx.db.delete(refreshTokenDoc._id);
    }
}
async function validateRefreshToken(ctx, refreshTokenId, tokenSessionId) {
    const refreshTokenDoc = await ctx.db.get(refreshTokenId);
    if (refreshTokenDoc === null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "Invalid refresh token");
        return null;
    }
    if (refreshTokenDoc.expirationTime < Date.now()) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "Expired refresh token");
        return null;
    }
    if (refreshTokenDoc.sessionId !== tokenSessionId) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "Invalid refresh token session ID");
        return null;
    }
    const session = await ctx.db.get(refreshTokenDoc.sessionId);
    if (session === null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "Invalid refresh token session");
        return null;
    }
    if (session.expirationTime < Date.now()) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "Expired refresh token session");
        return null;
    }
    return {
        session,
        refreshTokenDoc
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/sessions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "createNewAndDeleteExistingSession",
    ()=>createNewAndDeleteExistingSession,
    "deleteSession",
    ()=>deleteSession,
    "generateTokensForSession",
    ()=>generateTokensForSession,
    "getAuthSessionId",
    ()=>getAuthSessionId,
    "maybeGenerateTokensForSession",
    ()=>maybeGenerateTokensForSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$tokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/tokens.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$refreshTokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/refreshTokens.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$tokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$refreshTokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$tokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$refreshTokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const DEFAULT_SESSION_TOTAL_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
async function maybeGenerateTokensForSession(ctx, config, userId, sessionId, generateTokens) {
    return {
        userId,
        sessionId,
        tokens: generateTokens ? await generateTokensForSession(ctx, config, userId, sessionId) : null
    };
}
async function createNewAndDeleteExistingSession(ctx, config, userId) {
    const existingSessionId = await getAuthSessionId(ctx);
    if (existingSessionId !== null) {
        const existingSession = await ctx.db.get(existingSessionId);
        if (existingSession !== null) {
            await deleteSession(ctx, existingSession);
        }
    }
    return await createSession(ctx, userId, config);
}
async function generateTokensForSession(ctx, config, userId, sessionId) {
    const ids = {
        userId,
        sessionId
    };
    const result = {
        token: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$tokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateToken"])(ids, config),
        refreshToken: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$refreshTokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRefreshToken"])(ctx, sessionId, config)
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "Generated tokens for session:", result);
    return result;
}
async function createSession(ctx, userId, config) {
    const expirationTime = Date.now() + (config.session?.totalDurationMs ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringToNumber"])(process.env.AUTH_SESSION_TOTAL_DURATION_MS) ?? DEFAULT_SESSION_TOTAL_DURATION_MS);
    return await ctx.db.insert("authSessions", {
        expirationTime,
        userId
    });
}
async function deleteSession(ctx, session) {
    await ctx.db.delete(session._id);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$refreshTokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteRefreshTokens"])(ctx, session._id);
}
async function getAuthSessionId(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
        return null;
    }
    const [, sessionId] = identity.subject.split(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_SUB_CLAIM_DIVIDER"]);
    return sessionId;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/createAccountFromCredentials.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callCreateAccountFromCredentials",
    ()=>callCreateAccountFromCredentials,
    "createAccountFromCredentialsArgs",
    ()=>createAccountFromCredentialsArgs,
    "createAccountFromCredentialsImpl",
    ()=>createAccountFromCredentialsImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/users.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/sessions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const createAccountFromCredentialsArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
    account: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
        secret: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string())
    }),
    profile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].any(),
    shouldLinkViaEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].boolean()),
    shouldLinkViaPhone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].boolean())
});
async function createAccountFromCredentialsImpl(ctx, args, getProviderOrThrow, config) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "createAccountFromCredentialsImpl args:", {
        provider: args.provider,
        account: {
            id: args.account.id,
            secret: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeRedact"])(args.account.secret ?? "")
        }
    });
    const { provider: providerId, account, profile, shouldLinkViaEmail, shouldLinkViaPhone } = args;
    const provider = getProviderOrThrow(providerId);
    const existingAccount = await ctx.db.query("authAccounts").withIndex("providerAndAccountId", (q)=>q.eq("provider", provider.id).eq("providerAccountId", account.id)).unique();
    if (existingAccount !== null) {
        if (account.secret !== undefined && !await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verify"](provider, account.secret, existingAccount.secret ?? "")) {
            throw new Error(`Account ${account.id} already exists`);
        }
        return {
            account: existingAccount,
            // TODO: Ian removed this,
            user: await ctx.db.get(existingAccount.userId)
        };
    }
    const secret = account.secret !== undefined ? await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hash"](provider, account.secret) : undefined;
    const { userId, accountId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertUserAndAccount"])(ctx, await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthSessionId"])(ctx), {
        providerAccountId: account.id,
        secret
    }, {
        type: "credentials",
        provider,
        profile,
        shouldLinkViaEmail,
        shouldLinkViaPhone
    }, config);
    return {
        account: await ctx.db.get(accountId),
        user: await ctx.db.get(userId)
    };
}
const callCreateAccountFromCredentials = async (ctx, args)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "createAccountFromCredentials",
            ...args
        }
    });
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/invalidateSessions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callInvalidateSessions",
    ()=>callInvalidateSessions,
    "invalidateSessionsArgs",
    ()=>invalidateSessionsArgs,
    "invalidateSessionsImpl",
    ()=>invalidateSessionsImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/sessions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const invalidateSessionsArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].id("users"),
    except: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].id("authSessions")))
});
const callInvalidateSessions = async (ctx, args)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "invalidateSessions",
            ...args
        }
    });
};
const invalidateSessionsImpl = async (ctx, args)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "invalidateSessionsImpl args:", args);
    const { userId, except } = args;
    const exceptSet = new Set(except ?? []);
    const sessions = await ctx.db.query("authSessions").withIndex("userId", (q)=>q.eq("userId", userId)).collect();
    for (const session of sessions){
        if (!exceptSet.has(session._id)) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteSession"])(ctx, session);
        }
    }
    return;
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/modifyAccount.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callModifyAccount",
    ()=>callModifyAccount,
    "modifyAccountArgs",
    ()=>modifyAccountArgs,
    "modifyAccountImpl",
    ()=>modifyAccountImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const modifyAccountArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
    account: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
        secret: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string()
    })
});
async function modifyAccountImpl(ctx, args, getProviderOrThrow) {
    const { provider, account } = args;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "retrieveAccountWithCredentialsImpl args:", {
        provider: provider,
        account: {
            id: account.id,
            secret: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeRedact"])(account.secret ?? "")
        }
    });
    const existingAccount = await ctx.db.query("authAccounts").withIndex("providerAndAccountId", (q)=>q.eq("provider", provider).eq("providerAccountId", account.id)).unique();
    if (existingAccount === null) {
        throw new Error(`Cannot modify account with ID ${account.id} because it does not exist`);
    }
    await ctx.db.patch(existingAccount._id, {
        secret: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hash"])(getProviderOrThrow(provider), account.secret)
    });
    return;
}
const callModifyAccount = async (ctx, args)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "modifyAccount",
            ...args
        }
    });
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/rateLimit.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSignInRateLimited",
    ()=>isSignInRateLimited,
    "recordFailedSignIn",
    ()=>recordFailedSignIn,
    "resetSignInRateLimit",
    ()=>resetSignInRateLimit
]);
const DEFAULT_MAX_SIGN_IN_ATTEMPS_PER_HOUR = 10;
async function isSignInRateLimited(ctx, identifier, config) {
    const state = await getRateLimitState(ctx, identifier, config);
    if (state === null) {
        return false;
    }
    return state.attempsLeft < 1;
}
async function recordFailedSignIn(ctx, identifier, config) {
    const state = await getRateLimitState(ctx, identifier, config);
    if (state !== null) {
        await ctx.db.patch(state.limit._id, {
            attemptsLeft: state.attempsLeft - 1,
            lastAttemptTime: Date.now()
        });
    } else {
        const maxAttempsPerHour = configuredMaxAttempsPerHour(config);
        await ctx.db.insert("authRateLimits", {
            identifier,
            attemptsLeft: maxAttempsPerHour - 1,
            lastAttemptTime: Date.now()
        });
    }
}
async function resetSignInRateLimit(ctx, identifier) {
    const existingState = await ctx.db.query("authRateLimits").withIndex("identifier", (q)=>q.eq("identifier", identifier)).unique();
    if (existingState !== null) {
        await ctx.db.delete(existingState._id);
    }
}
async function getRateLimitState(ctx, identifier, config) {
    const now = Date.now();
    const maxAttempsPerHour = configuredMaxAttempsPerHour(config);
    const limit = await ctx.db.query("authRateLimits").withIndex("identifier", (q)=>q.eq("identifier", identifier)).unique();
    if (limit === null) {
        return null;
    }
    const elapsed = now - limit.lastAttemptTime;
    const maxAttempsPerMs = maxAttempsPerHour / (60 * 60 * 1000);
    const attempsLeft = Math.min(maxAttempsPerHour, limit.attemptsLeft + elapsed * maxAttempsPerMs);
    return {
        limit,
        attempsLeft
    };
}
function configuredMaxAttempsPerHour(config) {
    return config.signIn?.maxFailedAttempsPerHour ?? DEFAULT_MAX_SIGN_IN_ATTEMPS_PER_HOUR;
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/retrieveAccountWithCredentials.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callRetreiveAccountWithCredentials",
    ()=>callRetreiveAccountWithCredentials,
    "retrieveAccountWithCredentialsArgs",
    ()=>retrieveAccountWithCredentialsArgs,
    "retrieveAccountWithCredentialsImpl",
    ()=>retrieveAccountWithCredentialsImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$rateLimit$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/rateLimit.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const retrieveAccountWithCredentialsArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
    account: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
        secret: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string())
    })
});
async function retrieveAccountWithCredentialsImpl(ctx, args, getProviderOrThrow, config) {
    const { provider: providerId, account } = args;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "retrieveAccountWithCredentialsImpl args:", {
        provider: providerId,
        account: {
            id: account.id,
            secret: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeRedact"])(account.secret ?? "")
        }
    });
    const existingAccount = await ctx.db.query("authAccounts").withIndex("providerAndAccountId", (q)=>q.eq("provider", providerId).eq("providerAccountId", account.id)).unique();
    if (existingAccount === null) {
        return "InvalidAccountId";
    }
    if (account.secret !== undefined) {
        if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$rateLimit$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSignInRateLimited"])(ctx, existingAccount._id, config)) {
            return "TooManyFailedAttempts";
        }
        if (!await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verify"](getProviderOrThrow(providerId), account.secret, existingAccount.secret ?? "")) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$rateLimit$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordFailedSignIn"])(ctx, existingAccount._id, config);
            return "InvalidSecret";
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$rateLimit$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resetSignInRateLimit"])(ctx, existingAccount._id);
    }
    return {
        account: existingAccount,
        // TODO: Ian removed this
        user: await ctx.db.get(existingAccount.userId)
    };
}
const callRetreiveAccountWithCredentials = async (ctx, args)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "retrieveAccountWithCredentials",
            ...args
        }
    });
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/signOut.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callSignOut",
    ()=>callSignOut,
    "signOutImpl",
    ()=>signOutImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/sessions.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function signOutImpl(ctx) {
    const sessionId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthSessionId"])(ctx);
    if (sessionId !== null) {
        const session = await ctx.db.get(sessionId);
        if (session !== null) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteSession"])(ctx, session);
            return {
                userId: session.userId,
                sessionId: session._id
            };
        }
    }
    return null;
}
const callSignOut = async (ctx)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "signOut"
        }
    });
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/userOAuth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callUserOAuth",
    ()=>callUserOAuth,
    "userOAuthArgs",
    ()=>userOAuthArgs,
    "userOAuthImpl",
    ()=>userOAuthImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/users.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/oslo/crypto [external] (oslo/crypto, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const OAUTH_SIGN_IN_EXPIRATION_MS = 1000 * 60 * 2; // 2 minutes
const userOAuthArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
    providerAccountId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
    profile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].any(),
    signature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string()
});
async function userOAuthImpl(ctx, args, getProviderOrThrow, config) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])("DEBUG", "userOAuthImpl args:", args);
    const { profile, provider, providerAccountId, signature } = args;
    const providerConfig = getProviderOrThrow(provider);
    const existingAccount = await ctx.db.query("authAccounts").withIndex("providerAndAccountId", (q)=>q.eq("provider", provider).eq("providerAccountId", providerAccountId)).unique();
    const verifier = await ctx.db.query("authVerifiers").withIndex("signature", (q)=>q.eq("signature", signature)).unique();
    if (verifier === null) {
        throw new Error("Invalid state");
    }
    const { accountId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertUserAndAccount"])(ctx, verifier.sessionId ?? null, existingAccount !== null ? {
        existingAccount
    } : {
        providerAccountId
    }, {
        type: "oauth",
        provider: providerConfig,
        profile
    }, config);
    const code = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__["generateRandomString"])(8, (0, __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__["alphabet"])("0-9"));
    await ctx.db.delete(verifier._id);
    const existingVerificationCode = await ctx.db.query("authVerificationCodes").withIndex("accountId", (q)=>q.eq("accountId", accountId)).unique();
    if (existingVerificationCode !== null) {
        await ctx.db.delete(existingVerificationCode._id);
    }
    await ctx.db.insert("authVerificationCodes", {
        code: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"])(code),
        accountId,
        provider,
        expirationTime: Date.now() + OAUTH_SIGN_IN_EXPIRATION_MS,
        // The use of a verifier means we don't need an identifier
        // during verification.
        verifier: verifier._id
    });
    return code;
}
const callUserOAuth = async (ctx, args)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "userOAuth",
            ...args
        }
    });
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifierSignature.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callVerifierSignature",
    ()=>callVerifierSignature,
    "verifierSignatureArgs",
    ()=>verifierSignatureArgs,
    "verifierSignatureImpl",
    ()=>verifierSignatureImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
;
const verifierSignatureArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    verifier: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
    signature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string()
});
async function verifierSignatureImpl(ctx, args) {
    const { verifier, signature } = args;
    const verifierDoc = await ctx.db.get(verifier);
    if (verifierDoc === null) {
        throw new Error("Invalid verifier");
    }
    return await ctx.db.patch(verifierDoc._id, {
        signature
    });
}
const callVerifierSignature = async (ctx, args)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "verifierSignature",
            ...args
        }
    });
};
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/signIn.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callSignIn",
    ()=>callSignIn,
    "signInArgs",
    ()=>signInArgs,
    "signInImpl",
    ()=>signInImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/sessions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const signInArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].id("users"),
    sessionId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].id("authSessions")),
    generateTokens: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].boolean()
});
async function signInImpl(ctx, args, config) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "signInImpl args:", args);
    const { userId, sessionId: existingSessionId, generateTokens } = args;
    const sessionId = existingSessionId ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createNewAndDeleteExistingSession"])(ctx, config, userId);
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeGenerateTokensForSession"])(ctx, config, userId, sessionId, generateTokens);
}
const callSignIn = async (ctx, args)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "signIn",
            ...args
        }
    });
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/refreshSession.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callRefreshSession",
    ()=>callRefreshSession,
    "refreshSessionArgs",
    ()=>refreshSessionArgs,
    "refreshSessionImpl",
    ()=>refreshSessionImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$refreshTokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/refreshTokens.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/sessions.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$refreshTokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$refreshTokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const refreshSessionArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    refreshToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string()
});
async function refreshSessionImpl(ctx, args, getProviderOrThrow, config) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])("DEBUG", "refreshSessionImpl args:", args);
    const { refreshToken } = args;
    const [refreshTokenId, tokenSessionId] = refreshToken.split(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["REFRESH_TOKEN_DIVIDER"]);
    const validationResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$refreshTokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateRefreshToken"])(ctx, refreshTokenId, tokenSessionId);
    // This invalidates all other refresh tokens for this session,
    // including ones created later, regardless of whether
    // the passed one is valid or not.
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$refreshTokens$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteRefreshTokens"])(ctx, tokenSessionId);
    if (validationResult === null) {
        // Can't call `deleteSession` here because we already deleted
        // refresh tokens above
        const session = await ctx.db.get(tokenSessionId);
        if (session !== null) {
            await ctx.db.delete(session._id);
        }
        return null;
    }
    const { session } = validationResult;
    const sessionId = session._id;
    const userId = session.userId;
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateTokensForSession"])(ctx, config, userId, sessionId);
}
const callRefreshSession = async (ctx, args)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "refreshSession",
            ...args
        }
    });
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifyCodeAndSignIn.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callVerifyCodeAndSignIn",
    ()=>callVerifyCodeAndSignIn,
    "verifyCodeAndSignInArgs",
    ()=>verifyCodeAndSignInArgs,
    "verifyCodeAndSignInImpl",
    ()=>verifyCodeAndSignInImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$rateLimit$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/rateLimit.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/sessions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/users.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const verifyCodeAndSignInArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].any(),
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string()),
    verifier: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string()),
    generateTokens: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].boolean(),
    allowExtraProviders: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].boolean()
});
async function verifyCodeAndSignInImpl(ctx, args, getProviderOrThrow, config) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "verifyCodeAndSignInImpl args:", {
        params: {
            email: args.params.email,
            phone: args.params.phone
        },
        provider: args.provider,
        verifier: args.verifier,
        generateTokens: args.generateTokens,
        allowExtraProviders: args.allowExtraProviders
    });
    const { generateTokens, provider, allowExtraProviders } = args;
    const identifier = args.params.email ?? args.params.phone;
    if (identifier !== undefined) {
        if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$rateLimit$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSignInRateLimited"])(ctx, identifier, config)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "Too many failed attemps to verify code for this email");
            return null;
        }
    }
    const verifyResult = await verifyCodeOnly(ctx, args, provider ?? null, getProviderOrThrow, allowExtraProviders, config, await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthSessionId"])(ctx));
    if (verifyResult === null) {
        if (identifier !== undefined) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$rateLimit$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordFailedSignIn"])(ctx, identifier, config);
        }
        return null;
    }
    if (identifier !== undefined) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$rateLimit$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resetSignInRateLimit"])(ctx, identifier);
    }
    const { userId } = verifyResult;
    const sessionId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createNewAndDeleteExistingSession"])(ctx, config, userId);
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeGenerateTokensForSession"])(ctx, config, userId, sessionId, generateTokens);
}
const callVerifyCodeAndSignIn = async (ctx, args)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "verifyCodeAndSignIn",
            ...args
        }
    });
};
async function verifyCodeOnly(ctx, args, /**
 * There are two providers at play:
 * 1. the provider that generated the code
 * 2. the provider the account is tied to.
 * This is because we allow signing into an account
 * via another provider, see {@link signInViaProvider}.
 * This is the first provider.
 */ methodProviderId, getProviderOrThrow, allowExtraProviders, config, sessionId) {
    const { params, verifier } = args;
    const codeHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"])(params.code);
    const verificationCode = await ctx.db.query("authVerificationCodes").withIndex("code", (q)=>q.eq("code", codeHash)).unique();
    if (verificationCode === null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "Invalid verification code");
        return null;
    }
    await ctx.db.delete(verificationCode._id);
    if (verificationCode.verifier !== verifier) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "Invalid verifier");
        return null;
    }
    if (verificationCode.expirationTime < Date.now()) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "Expired verification code");
        return null;
    }
    const { accountId, emailVerified, phoneVerified } = verificationCode;
    const account = await ctx.db.get(accountId);
    if (account === null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, "Account associated with this email has been deleted");
        return null;
    }
    if (methodProviderId !== null && verificationCode.provider !== methodProviderId) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, `Invalid provider "${methodProviderId}" for given \`code\`, ` + `which was generated by provider "${verificationCode.provider}"`);
        return null;
    }
    // OTP providers perform an additional check against the provided
    // params.
    const methodProvider = getProviderOrThrow(verificationCode.provider, allowExtraProviders);
    if (methodProvider !== null && (methodProvider.type === "email" || methodProvider.type === "phone") && methodProvider.authorize !== undefined) {
        await methodProvider.authorize(args.params, account);
    }
    let userId = account.userId;
    const provider = getProviderOrThrow(account.provider);
    if (!(provider.type === "oauth" || provider.type === "oidc")) {
        ({ userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertUserAndAccount"])(ctx, sessionId, {
            existingAccount: account
        }, {
            type: "verification",
            provider,
            profile: {
                ...emailVerified !== undefined ? {
                    email: emailVerified,
                    emailVerified: true
                } : {},
                ...phoneVerified !== undefined ? {
                    phone: phoneVerified,
                    phoneVerified: true
                } : {}
            }
        }, config));
    }
    return {
        providerAccountId: account.providerAccountId,
        userId
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/createVerificationCode.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callCreateVerificationCode",
    ()=>callCreateVerificationCode,
    "createVerificationCodeArgs",
    ()=>createVerificationCodeArgs,
    "createVerificationCodeImpl",
    ()=>createVerificationCodeImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/users.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/sessions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const createVerificationCodeArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    accountId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].id("authAccounts")),
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string()),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string()),
    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string(),
    expirationTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].number(),
    allowExtraProviders: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].boolean()
});
async function createVerificationCodeImpl(ctx, args, getProviderOrThrow, config) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "createVerificationCodeImpl args:", args);
    const { email, phone, code, expirationTime, provider: providerId, accountId: existingAccountId, allowExtraProviders } = args;
    const existingAccount = existingAccountId !== undefined ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAccountOrThrow"])(ctx, existingAccountId) : await ctx.db.query("authAccounts").withIndex("providerAndAccountId", (q)=>q.eq("provider", providerId).eq("providerAccountId", email ?? phone)).unique();
    const provider = getProviderOrThrow(providerId, allowExtraProviders);
    const { accountId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertUserAndAccount"])(ctx, await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthSessionId"])(ctx), existingAccount !== null ? {
        existingAccount
    } : {
        providerAccountId: email ?? phone
    }, provider.type === "email" ? {
        type: "email",
        provider,
        profile: {
            email: email
        }
    } : {
        type: "phone",
        provider,
        profile: {
            phone: phone
        }
    }, config);
    await generateUniqueVerificationCode(ctx, accountId, providerId, code, expirationTime, {
        email,
        phone
    });
    return email ?? phone;
}
const callCreateVerificationCode = async (ctx, args)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "createVerificationCode",
            ...args
        }
    });
};
async function generateUniqueVerificationCode(ctx, accountId, provider, code, expirationTime, { email, phone }) {
    const existingCode = await ctx.db.query("authVerificationCodes").withIndex("accountId", (q)=>q.eq("accountId", accountId)).unique();
    if (existingCode !== null) {
        await ctx.db.delete(existingCode._id);
    }
    await ctx.db.insert("authVerificationCodes", {
        accountId,
        provider,
        code: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"])(code),
        expirationTime,
        emailVerified: email,
        phoneVerified: phone
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifier.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "callVerifier",
    ()=>callVerifier,
    "verifierImpl",
    ()=>verifierImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/sessions.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function verifierImpl(ctx) {
    return await ctx.db.insert("authVerifiers", {
        sessionId: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$sessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthSessionId"])(ctx) ?? undefined
    });
}
const callVerifier = async (ctx)=>{
    return ctx.runMutation("auth:store", {
        args: {
            type: "verifier"
        }
    });
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "storeArgs",
    ()=>storeArgs,
    "storeImpl",
    ()=>storeImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/signIn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signOut$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/signOut.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$refreshSession$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/refreshSession.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifyCodeAndSignIn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifierSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifierSignature.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$userOAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/userOAuth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createVerificationCode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/createVerificationCode.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createAccountFromCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/createAccountFromCredentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$retrieveAccountWithCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/retrieveAccountWithCredentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$modifyAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/modifyAccount.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$invalidateSessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/invalidateSessions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signOut$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$refreshSession$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$userOAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createVerificationCode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createAccountFromCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$retrieveAccountWithCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$modifyAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$invalidateSessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signOut$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$refreshSession$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$userOAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createVerificationCode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createAccountFromCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$retrieveAccountWithCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$modifyAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$invalidateSessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
const storeArgs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
    args: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].union(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("signIn"),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signInArgs"].fields
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("signOut")
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("refreshSession"),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$refreshSession$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshSessionArgs"].fields
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("verifyCodeAndSignIn"),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyCodeAndSignInArgs"].fields
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("verifier")
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("verifierSignature"),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifierSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifierSignatureArgs"].fields
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("userOAuth"),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$userOAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["userOAuthArgs"].fields
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("createVerificationCode"),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createVerificationCode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createVerificationCodeArgs"].fields
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("createAccountFromCredentials"),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createAccountFromCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAccountFromCredentialsArgs"].fields
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("retrieveAccountWithCredentials"),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$retrieveAccountWithCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["retrieveAccountWithCredentialsArgs"].fields
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("modifyAccount"),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$modifyAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modifyAccountArgs"].fields
    }), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].literal("invalidateSessions"),
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$invalidateSessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["invalidateSessionsArgs"].fields
    }))
});
const storeImpl = async (ctx, fnArgs, getProviderOrThrow, config)=>{
    const args = fnArgs.args;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].INFO, `\`auth:store\` type: ${args.type}`);
    switch(args.type){
        case "signIn":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signInImpl"])(ctx, args, config);
            }
        case "signOut":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signOut$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signOutImpl"])(ctx);
            }
        case "refreshSession":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$refreshSession$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshSessionImpl"])(ctx, args, getProviderOrThrow, config);
            }
        case "verifyCodeAndSignIn":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyCodeAndSignInImpl"])(ctx, args, getProviderOrThrow, config);
            }
        case "verifier":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifierImpl"])(ctx);
            }
        case "verifierSignature":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifierSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifierSignatureImpl"])(ctx, args);
            }
        case "userOAuth":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$userOAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["userOAuthImpl"])(ctx, args, getProviderOrThrow, config);
            }
        case "createVerificationCode":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createVerificationCode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createVerificationCodeImpl"])(ctx, args, getProviderOrThrow, config);
            }
        case "createAccountFromCredentials":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createAccountFromCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAccountFromCredentialsImpl"])(ctx, args, getProviderOrThrow, config);
            }
        case "retrieveAccountWithCredentials":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$retrieveAccountWithCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["retrieveAccountWithCredentialsImpl"])(ctx, args, getProviderOrThrow, config);
            }
        case "modifyAccount":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$modifyAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modifyAccountImpl"])(ctx, args, getProviderOrThrow);
            }
        case "invalidateSessions":
            {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$invalidateSessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["invalidateSessionsImpl"])(ctx, args);
            }
        default:
            args;
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/redirects.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "redirectAbsoluteUrl",
    ()=>redirectAbsoluteUrl,
    "setURLSearchParam",
    ()=>setURLSearchParam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/utils.js [app-route] (ecmascript)");
;
async function redirectAbsoluteUrl(config, params) {
    if (params.redirectTo !== undefined) {
        if (typeof params.redirectTo !== "string") {
            throw new Error(`Expected \`redirectTo\` to be a string, got ${params.redirectTo}`);
        }
        const redirectCallback = config.callbacks?.redirect ?? defaultRedirectCallback;
        return await redirectCallback(params);
    }
    return siteUrl();
}
async function defaultRedirectCallback({ redirectTo }) {
    const baseUrl = siteUrl();
    if (redirectTo.startsWith("?") || redirectTo.startsWith("/")) {
        return `${baseUrl}${redirectTo}`;
    }
    if (redirectTo.startsWith(baseUrl)) {
        const after = redirectTo[baseUrl.length];
        if (after === undefined || after === "?" || after === "/") {
            return redirectTo;
        }
    }
    throw new Error(`Invalid \`redirectTo\` ${redirectTo} for configured SITE_URL: ${baseUrl.toString()}`);
}
function setURLSearchParam(absoluteUrl, param, value) {
    const pattern = /([^:]+):(.*)/;
    const [, scheme, rest] = absoluteUrl.match(pattern);
    const hasNoDomain = /^\/\/(?:\/|$|\?)/.test(rest);
    const startsWithPath = hasNoDomain && rest.startsWith("///");
    const url = new URL(`http:${hasNoDomain ? "//googblibok" + rest.slice(2) : rest}`);
    url.searchParams.set(param, value);
    const [, , withParam] = url.toString().match(pattern);
    return `${scheme}:${hasNoDomain ? (startsWithPath ? "/" : "") + "//" + withParam.slice(13) : withParam}`;
}
function siteUrl() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireEnv"])("SITE_URL").replace(/\/$/, "");
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/signIn.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "signInImpl",
    ()=>signInImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createVerificationCode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/createVerificationCode.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$refreshSession$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/refreshSession.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/signIn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifier.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifyCodeAndSignIn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/oslo/crypto [external] (oslo/crypto, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$redirects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/redirects.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/utils.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createVerificationCode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$refreshSession$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createVerificationCode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$refreshSession$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const DEFAULT_EMAIL_VERIFICATION_CODE_DURATION_S = 60 * 60 * 24; // 24 hours
async function signInImpl(ctx, provider, args, options) {
    if (provider === null && args.refreshToken) {
        const tokens = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$refreshSession$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callRefreshSession"])(ctx, {
            refreshToken: args.refreshToken
        });
        return {
            kind: "refreshTokens",
            signedIn: {
                tokens
            }
        };
    }
    if (provider === null && args.params?.code !== undefined) {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callVerifyCodeAndSignIn"])(ctx, {
            params: args.params,
            verifier: args.verifier,
            generateTokens: true,
            allowExtraProviders: options.allowExtraProviders
        });
        return {
            kind: "signedIn",
            signedIn: result
        };
    }
    if (provider === null) {
        throw new Error("Cannot sign in: Missing `provider`, `params.code` or `refreshToken`");
    }
    if (provider.type === "email" || provider.type === "phone") {
        return handleEmailAndPhoneProvider(ctx, provider, args, options);
    }
    if (provider.type === "credentials") {
        return handleCredentials(ctx, provider, args, options);
    }
    if (provider.type === "oauth" || provider.type === "oidc") {
        return handleOAuthProvider(ctx, provider, args, options);
    }
    const _typecheck = provider;
    throw new Error(`Provider type ${provider.type} is not supported yet`);
}
async function handleEmailAndPhoneProvider(ctx, provider, args, options) {
    if (args.params?.code !== undefined) {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callVerifyCodeAndSignIn"])(ctx, {
            params: args.params,
            provider: provider.id,
            generateTokens: options.generateTokens,
            allowExtraProviders: options.allowExtraProviders
        });
        if (result === null) {
            throw new Error("Could not verify code");
        }
        return {
            kind: "signedIn",
            signedIn: result
        };
    }
    const code = provider.generateVerificationToken ? await provider.generateVerificationToken() : (0, __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__["generateRandomString"])(32, (0, __TURBOPACK__imported__module__$5b$externals$5d2f$oslo$2f$crypto__$5b$external$5d$__$28$oslo$2f$crypto$2c$__esm_import$29$__["alphabet"])("0-9", "A-Z", "a-z"));
    const expirationTime = Date.now() + (provider.maxAge ?? DEFAULT_EMAIL_VERIFICATION_CODE_DURATION_S) * 1000;
    const identifier = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createVerificationCode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callCreateVerificationCode"])(ctx, {
        provider: provider.id,
        accountId: args.accountId,
        email: args.params?.email,
        phone: args.params?.phone,
        code,
        expirationTime,
        allowExtraProviders: options.allowExtraProviders
    });
    const destination = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$redirects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redirectAbsoluteUrl"])(ctx.auth.config, args.params ?? {});
    const verificationArgs = {
        identifier,
        url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$redirects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setURLSearchParam"])(destination, "code", code),
        token: code,
        expires: new Date(expirationTime)
    };
    if (provider.type === "email") {
        await provider.sendVerificationRequest({
            ...verificationArgs,
            provider: {
                ...provider,
                from: // Simplifies demo configuration of Resend
                provider.from === "Auth.js <no-reply@authjs.dev>" && provider.id === "resend" ? "My App <onboarding@resend.dev>" : provider.from
            },
            request: new Request("http://localhost"),
            theme: ctx.auth.config.theme
        }, // @ts-expect-error Figure out typing for email providers so they can
        // access ctx.
        ctx);
    } else if (provider.type === "phone") {
        await provider.sendVerificationRequest({
            ...verificationArgs,
            provider
        }, ctx);
    }
    return {
        kind: "started",
        started: true
    };
}
async function handleCredentials(ctx, provider, args, options) {
    const result = await provider.authorize(args.params ?? {}, ctx);
    if (result === null) {
        return {
            kind: "signedIn",
            signedIn: null
        };
    }
    const idsAndTokens = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callSignIn"])(ctx, {
        userId: result.userId,
        sessionId: result.sessionId,
        generateTokens: options.generateTokens
    });
    return {
        kind: "signedIn",
        signedIn: idsAndTokens
    };
}
async function handleOAuthProvider(ctx, provider, args, options) {
    // We have this action because:
    // 1. We remember the current sessionId if any, so we can link accounts
    // 2. The client doesn't need to know the HTTP Actions URL
    //    of the backend (this simplifies using local backend)
    // 3. The client doesn't need to know which provider is of which type,
    //    and hence which provider requires client-side redirect
    // 4. On mobile the client can complete the flow manually
    if (args.params?.code !== undefined) {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifyCodeAndSignIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callVerifyCodeAndSignIn"])(ctx, {
            params: args.params,
            verifier: args.verifier,
            generateTokens: true,
            allowExtraProviders: options.allowExtraProviders
        });
        return {
            kind: "signedIn",
            signedIn: result
        };
    }
    const redirect = new URL((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireEnv"])("CONVEX_SITE_URL") + `/api/auth/signin/${provider.id}`);
    const verifier = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifier$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callVerifier"])(ctx);
    redirect.searchParams.set("code", verifier);
    if (args.params?.redirectTo !== undefined) {
        if (typeof args.params.redirectTo !== "string") {
            throw new Error(`Expected \`redirectTo\` to be a string, got ${args.params.redirectTo}`);
        }
        redirect.searchParams.set("redirectTo", args.params.redirectTo);
    }
    return {
        kind: "redirect",
        redirect: redirect.toString(),
        verifier
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "convexAuth",
    ()=>convexAuth,
    "createAccount",
    ()=>createAccount,
    "getAuthUserId",
    ()=>getAuthUserId,
    "invalidateSessions",
    ()=>invalidateSessions,
    "modifyAccountCredentials",
    ()=>modifyAccountCredentials,
    "retrieveAccount",
    ()=>retrieveAccount,
    "signInViaProvider",
    ()=>signInViaProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$registration_impl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/impl/registration_impl.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/values/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/cookie/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/checks.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$oauth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/oauth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/provider_utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createAccountFromCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/createAccountFromCredentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$invalidateSessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/invalidateSessions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$modifyAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/modifyAccount.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$retrieveAccountWithCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/retrieveAccountWithCredentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signOut$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/signOut.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$userOAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/userOAuth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifierSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifierSignature.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/mutations/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/signIn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$redirects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/redirects.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$oauth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createAccountFromCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$invalidateSessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$modifyAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$retrieveAccountWithCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signOut$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$userOAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$oauth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createAccountFromCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$invalidateSessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$modifyAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$retrieveAccountWithCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signOut$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$userOAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
function convexAuth(config_) {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configDefaults"])(config_);
    const hasOAuth = config.providers.some((provider)=>provider.type === "oauth" || provider.type === "oidc");
    const getProvider = (id, allowExtraProviders = false)=>{
        return config.providers.find((provider)=>provider.id === id) ?? (allowExtraProviders ? config.extraProviders.find((provider)=>provider.id === id) : undefined);
    };
    const getProviderOrThrow = (id, allowExtraProviders = false)=>{
        const provider = getProvider(id, allowExtraProviders);
        if (provider === undefined) {
            const message = `Provider \`${id}\` is not configured, ` + `available providers are ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listAvailableProviders"])(config, allowExtraProviders)}.`;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].ERROR, message);
            throw new Error(message);
        }
        return provider;
    };
    const enrichCtx = (ctx)=>({
            ...ctx,
            auth: {
                ...ctx.auth,
                config
            }
        });
    const auth = {
        /**
         * @deprecated - Use `getAuthUserId` from "@convex-dev/auth/server":
         *
         * ```ts
         * import { getAuthUserId } from "@convex-dev/auth/server";
         * ```
         *
         * @hidden
         */ getUserId: async (ctx)=>{
            const identity = await ctx.auth.getUserIdentity();
            if (identity === null) {
                return null;
            }
            const [userId] = identity.subject.split(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_SUB_CLAIM_DIVIDER"]);
            return userId;
        },
        /**
         * @deprecated - Use `getAuthSessionId` from "@convex-dev/auth/server":
         *
         * ```
         * import { getAuthSessionId } from "@convex-dev/auth/server";
         * ```
         *
         * @hidden
         */ getSessionId: async (ctx)=>{
            const identity = await ctx.auth.getUserIdentity();
            if (identity === null) {
                return null;
            }
            const [, sessionId] = identity.subject.split(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_SUB_CLAIM_DIVIDER"]);
            return sessionId;
        },
        /**
         * Add HTTP actions for JWT verification and OAuth sign-in.
         *
         * ```ts
         * import { httpRouter } from "convex/server";
         * import { auth } from "./auth.js";
         *
         * const http = httpRouter();
         *
         * auth.addHttpRoutes(http);
         *
         * export default http;
         * ```
         *
         * The following routes are handled always:
         *
         * - `/.well-known/openid-configuration`
         * - `/.well-known/jwks.json`
         *
         * The following routes are handled if OAuth is configured:
         *
         * - `/api/auth/signin/*`
         * - `/api/auth/callback/*`
         *
         * @param http your HTTP router
         */ addHttpRoutes: (http)=>{
            http.route({
                path: "/.well-known/openid-configuration",
                method: "GET",
                handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$registration_impl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["httpActionGeneric"])(async ()=>{
                    return new Response(JSON.stringify({
                        issuer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireEnv"])("CONVEX_SITE_URL"),
                        jwks_uri: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireEnv"])("CONVEX_SITE_URL") + "/.well-known/jwks.json",
                        authorization_endpoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireEnv"])("CONVEX_SITE_URL") + "/oauth/authorize"
                    }), {
                        status: 200,
                        headers: {
                            "Content-Type": "application/json",
                            "Cache-Control": "public, max-age=15, stale-while-revalidate=15, stale-if-error=86400"
                        }
                    });
                })
            });
            http.route({
                path: "/.well-known/jwks.json",
                method: "GET",
                handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$registration_impl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["httpActionGeneric"])(async ()=>{
                    return new Response((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireEnv"])("JWKS"), {
                        status: 200,
                        headers: {
                            "Content-Type": "application/json",
                            "Cache-Control": "public, max-age=15, stale-while-revalidate=15, stale-if-error=86400"
                        }
                    });
                })
            });
            if (hasOAuth) {
                http.route({
                    pathPrefix: "/api/auth/signin/",
                    method: "GET",
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$registration_impl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["httpActionGeneric"])(convertErrorsToResponse(400, async (ctx, request)=>{
                        const url = new URL(request.url);
                        const pathParts = url.pathname.split("/");
                        const providerId = pathParts.at(-1);
                        if (providerId === null) {
                            throw new Error("Missing provider id");
                        }
                        const verifier = url.searchParams.get("code");
                        if (verifier === null) {
                            throw new Error("Missing sign-in verifier");
                        }
                        const provider = getProviderOrThrow(providerId);
                        const { redirect, cookies, signature } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$oauth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthorizationURL"])(provider);
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$verifierSignature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callVerifierSignature"])(ctx, {
                            verifier,
                            signature
                        });
                        const redirectTo = url.searchParams.get("redirectTo");
                        if (redirectTo !== null) {
                            cookies.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redirectToParamCookie"])(providerId, redirectTo));
                        }
                        const headers = new Headers({
                            Location: redirect
                        });
                        for (const { name, value, options } of cookies){
                            headers.append("Set-Cookie", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serialize"])(name, value, options));
                        }
                        return new Response(null, {
                            status: 302,
                            headers
                        });
                    }))
                });
                const callbackAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$registration_impl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["httpActionGeneric"])(async (genericCtx, request)=>{
                    const ctx = genericCtx;
                    const url = new URL(request.url);
                    const pathParts = url.pathname.split("/");
                    const providerId = pathParts.at(-1);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logWithLevel"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOG_LEVELS"].DEBUG, "Handling OAuth callback for provider:", providerId);
                    const provider = getProviderOrThrow(providerId);
                    const cookies = getCookies(request);
                    const maybeRedirectTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["useRedirectToParam"])(provider.id, cookies);
                    const destinationUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$redirects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redirectAbsoluteUrl"])(config, {
                        redirectTo: maybeRedirectTo?.redirectTo
                    });
                    try {
                        const { profile, tokens, signature } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$oauth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleOAuthCallback"])(provider, request, cookies);
                        const { id, ...profileFromCallback } = await provider.profile(profile, tokens);
                        if (typeof id !== "string") {
                            throw new Error(`The profile method of the ${providerId} config must return a string ID`);
                        }
                        const verificationCode = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$userOAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callUserOAuth"])(ctx, {
                            provider: providerId,
                            providerAccountId: id,
                            profile: profileFromCallback,
                            signature
                        });
                        return new Response(null, {
                            status: 302,
                            headers: {
                                Location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$redirects$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setURLSearchParam"])(destinationUrl, "code", verificationCode),
                                "Cache-Control": "must-revalidate"
                            }
                        });
                    } catch (error) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])(error);
                        return Response.redirect(destinationUrl);
                    }
                });
                http.route({
                    pathPrefix: "/api/auth/callback/",
                    method: "GET",
                    handler: callbackAction
                });
                http.route({
                    pathPrefix: "/api/auth/callback/",
                    method: "POST",
                    handler: callbackAction
                });
            }
        }
    };
    return {
        /**
         * Helper for configuring HTTP actions.
         */ auth,
        /**
         * Action called by the client to sign the user in.
         *
         * Also used for refreshing the session.
         */ signIn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$registration_impl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["actionGeneric"])({
            args: {
                provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string()),
                params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].any()),
                verifier: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string()),
                refreshToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v"].string())
            },
            handler: async (ctx, args)=>{
                const provider = args.provider !== undefined ? getProviderOrThrow(args.provider) : null;
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signInImpl"])(enrichCtx(ctx), provider, args, {
                    generateTokens: true,
                    allowExtraProviders: false
                });
                switch(result.kind){
                    case "redirect":
                        return {
                            redirect: result.redirect,
                            verifier: result.verifier
                        };
                    case "signedIn":
                    case "refreshTokens":
                        return {
                            tokens: result.signedIn?.tokens ?? null
                        };
                    case "started":
                        return {
                            started: true
                        };
                    default:
                        {
                            const _typecheck = result;
                            throw new Error(`Unexpected result from signIn, ${result}`);
                        }
                }
            }
        }),
        /**
         * Action called by the client to invalidate the current session.
         */ signOut: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$registration_impl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["actionGeneric"])({
            args: {},
            handler: async (ctx)=>{
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$signOut$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callSignOut"])(ctx);
            }
        }),
        /**
         * Internal mutation used by the library to read and write
         * to the database during signin and signout.
         */ store: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$impl$2f$registration_impl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["internalMutationGeneric"])({
            args: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["storeArgs"],
            handler: async (ctx, args)=>{
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["storeImpl"])(ctx, args, getProviderOrThrow, config);
            }
        })
    };
}
async function getAuthUserId(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
        return null;
    }
    const [userId] = identity.subject.split(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_SUB_CLAIM_DIVIDER"]);
    return userId;
}
async function createAccount(ctx, args) {
    const actionCtx = ctx;
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$createAccountFromCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callCreateAccountFromCredentials"])(actionCtx, args);
}
async function retrieveAccount(ctx, args) {
    const actionCtx = ctx;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$retrieveAccountWithCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callRetreiveAccountWithCredentials"])(actionCtx, args);
    if (typeof result === "string") {
        throw new Error(result);
    }
    return result;
}
async function modifyAccountCredentials(ctx, args) {
    const actionCtx = ctx;
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$modifyAccount$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callModifyAccount"])(actionCtx, args);
}
async function invalidateSessions(ctx, args) {
    const actionCtx = ctx;
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$mutations$2f$invalidateSessions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callInvalidateSessions"])(actionCtx, args);
}
async function signInViaProvider(ctx, provider, args) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$signIn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signInImpl"])(ctx, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$provider_utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["materializeProvider"])(provider), args, {
        generateTokens: false,
        allowExtraProviders: true
    });
    return result.kind === "signedIn" ? result.signedIn !== null ? {
        userId: result.signedIn.userId,
        sessionId: result.signedIn.sessionId
    } : null : null;
}
function convertErrorsToResponse(errorStatusCode, action) {
    return async (ctx, request)=>{
        try {
            return await action(ctx, request);
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$values$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConvexError"]) {
                return new Response(null, {
                    status: errorStatusCode,
                    statusText: error.data
                });
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])(error);
                return new Response(null, {
                    status: 500,
                    statusText: "Internal Server Error"
                });
            }
        }
    };
}
function getCookies(request) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$cookie$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parse"])(request.headers.get("Cookie") ?? "");
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/providers/ConvexCredentials.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Configure {@link ConvexCredentials} provider given a {@link ConvexCredentialsUserConfig}.
 *
 * This is for a very custom authentication implementation, often you can
 * use the [`Password`](https://labs.convex.dev/auth/api_reference/providers/Password) provider instead.
 *
 * ```ts
 * import ConvexCredentials from "@convex-dev/auth/providers/ConvexCredentials";
 * import { convexAuth } from "@convex-dev/auth/server";
 *
 * export const { auth, signIn, signOut, store } = convexAuth({
 *   providers: [
 *     ConvexCredentials({
 *       authorize: async (credentials, ctx) => {
 *         // Your custom logic here...
 *       },
 *     }),
 *   ],
 * });
 * ```
 *
 * @module
 */ /**
 * The Credentials provider allows you to handle signing in with arbitrary credentials,
 * such as a username and password, domain, or two factor authentication or hardware device (e.g. YubiKey U2F / FIDO).
 */ __turbopack_context__.s([
    "ConvexCredentials",
    ()=>ConvexCredentials
]);
function ConvexCredentials(config) {
    return {
        id: "credentials",
        type: "credentials",
        authorize: async ()=>null,
        // @ts-expect-error Internal
        options: config
    };
}
}),
"[project]/apps/web/node_modules/@convex-dev/auth/dist/providers/Password.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * Configure {@link Password} provider given a {@link PasswordConfig}.
 *
 * The `Password` provider supports the following flows, determined
 * by the `flow` parameter:
 *
 * - `"signUp"`: Create a new account with a password.
 * - `"signIn"`: Sign in with an existing account and password.
 * - `"reset"`: Request a password reset.
 * - `"reset-verification"`: Verify a password reset code and change password.
 * - `"email-verification"`: If email verification is enabled and `code` is
 *    included in params, verify an OTP.
 *
 * ```ts
 * import Password from "@convex-dev/auth/providers/Password";
 * import { convexAuth } from "@convex-dev/auth/server";
 *
 * export const { auth, signIn, signOut, store } = convexAuth({
 *   providers: [Password],
 * });
 * ```
 *
 * @module
 */ __turbopack_context__.s([
    "Password",
    ()=>Password
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$providers$2f$ConvexCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/providers/ConvexCredentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/node_modules/@convex-dev/auth/dist/server/implementation/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$crypto$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucia/dist/crypto.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function Password(config = {}) {
    const provider = config.id ?? "password";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$providers$2f$ConvexCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConvexCredentials"])({
        id: "password",
        authorize: async (params, ctx)=>{
            const profile = config.profile?.(params, ctx) ?? defaultProfile(params);
            const { email } = profile;
            const flow = params.flow;
            const secret = params.password;
            let account;
            let user;
            if (flow === "signUp") {
                if (secret === undefined) {
                    throw new Error("Missing `password` param for `signUp` flow");
                }
                const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAccount"])(ctx, {
                    provider,
                    account: {
                        id: email,
                        secret
                    },
                    profile: profile,
                    shouldLinkViaEmail: config.verify !== undefined,
                    shouldLinkViaPhone: false
                });
                ({ account, user } = created);
            } else if (flow === "signIn") {
                if (secret === undefined) {
                    throw new Error("Missing `password` param for `signIn` flow");
                }
                const retrieved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["retrieveAccount"])(ctx, {
                    provider,
                    account: {
                        id: email,
                        secret
                    }
                });
                if (retrieved === null) {
                    throw new Error("Invalid credentials");
                }
                ({ account, user } = retrieved);
            // START: Optional, support password reset
            } else if (flow === "reset") {
                if (!config.reset) {
                    throw new Error(`Password reset is not enabled for ${provider}`);
                }
                const { account } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["retrieveAccount"])(ctx, {
                    provider,
                    account: {
                        id: email
                    }
                });
                return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["signInViaProvider"])(ctx, config.reset, {
                    accountId: account._id,
                    params
                });
            } else if (flow === "reset-verification") {
                if (!config.reset) {
                    throw new Error(`Password reset is not enabled for ${provider}`);
                }
                if (params.newPassword === undefined) {
                    throw new Error("Missing `newPassword` param for `reset-verification` flow");
                }
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["signInViaProvider"])(ctx, config.reset, {
                    params
                });
                if (result === null) {
                    throw new Error("Invalid code");
                }
                const { userId, sessionId } = result;
                const secret = params.newPassword;
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["modifyAccountCredentials"])(ctx, {
                    provider,
                    account: {
                        id: email,
                        secret
                    }
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["invalidateSessions"])(ctx, {
                    userId,
                    except: [
                        sessionId
                    ]
                });
                return {
                    userId,
                    sessionId
                };
            // END
            // START: Optional, email verification during sign in
            } else if (flow === "email-verification") {
                if (!config.verify) {
                    throw new Error(`Email verification is not enabled for ${provider}`);
                }
                const { account } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["retrieveAccount"])(ctx, {
                    provider,
                    account: {
                        id: email
                    }
                });
                return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["signInViaProvider"])(ctx, config.verify, {
                    accountId: account._id,
                    params
                });
            // END
            } else {
                throw new Error("Missing `flow` param, it must be one of " + '"signUp", "signIn", "reset", "reset-verification" or ' + '"email-verification"!');
            }
            // START: Optional, email verification during sign in
            if (config.verify && !account.emailVerified) {
                return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f40$convex$2d$dev$2f$auth$2f$dist$2f$server$2f$implementation$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["signInViaProvider"])(ctx, config.verify, {
                    accountId: account._id,
                    params
                });
            }
            // END
            return {
                userId: user._id
            };
        },
        crypto: {
            async hashSecret (password) {
                return await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$crypto$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Scrypt"]().hash(password);
            },
            async verifySecret (password, hash) {
                return await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucia$2f$dist$2f$crypto$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Scrypt"]().verify(hash, password);
            }
        },
        extraProviders: [
            config.reset,
            config.verify
        ],
        ...config
    });
}
function defaultProfile(params) {
    const flow = params.flow;
    if (flow === "signUp" || flow === "reset-verification") {
        const password = flow === "signUp" ? params.password : params.newPassword;
        if (!password || password.length < 8) {
            throw new Error("Invalid password");
        }
    }
    return {
        email: params.email
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=apps_web_b3a3c9e5._.js.map