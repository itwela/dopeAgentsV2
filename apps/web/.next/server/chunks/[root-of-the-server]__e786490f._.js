module.exports = [
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/node_modules/isexe/mode.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = isexe;
isexe.sync = sync;
var fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
function isexe(path, options, cb) {
    fs.stat(path, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
    });
}
function sync(path, options) {
    return checkStat(fs.statSync(path), options);
}
function checkStat(stat, options) {
    return stat.isFile() && checkMode(stat, options);
}
function checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== undefined ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== undefined ? options.gid : process.getgid && process.getgid();
    var u = parseInt('100', 8);
    var g = parseInt('010', 8);
    var o = parseInt('001', 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
}
}),
"[project]/node_modules/isexe/windows.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = isexe;
isexe.sync = sync;
var fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
function checkPathExt(path, options) {
    var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;
    if (!pathext) {
        return true;
    }
    pathext = pathext.split(';');
    if (pathext.indexOf('') !== -1) {
        return true;
    }
    for(var i = 0; i < pathext.length; i++){
        var p = pathext[i].toLowerCase();
        if (p && path.substr(-p.length).toLowerCase() === p) {
            return true;
        }
    }
    return false;
}
function checkStat(stat, path, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
    }
    return checkPathExt(path, options);
}
function isexe(path, options, cb) {
    fs.stat(path, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path, options));
    });
}
function sync(path, options) {
    return checkStat(fs.statSync(path), path, options);
}
}),
"[project]/node_modules/isexe/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
var core;
if (process.platform === 'win32' || /*TURBOPACK member replacement*/ __turbopack_context__.g.TESTING_WINDOWS) {
    core = __turbopack_context__.r("[project]/node_modules/isexe/windows.js [app-route] (ecmascript)");
} else {
    core = __turbopack_context__.r("[project]/node_modules/isexe/mode.js [app-route] (ecmascript)");
}
module.exports = isexe;
isexe.sync = sync;
function isexe(path, options, cb) {
    if (typeof options === 'function') {
        cb = options;
        options = {};
    }
    if (!cb) {
        if (typeof Promise !== 'function') {
            throw new TypeError('callback not provided');
        }
        return new Promise(function(resolve, reject) {
            isexe(path, options || {}, function(er, is) {
                if (er) {
                    reject(er);
                } else {
                    resolve(is);
                }
            });
        });
    }
    core(path, options || {}, function(er, is) {
        // ignore EACCES because that just means we aren't allowed to run it
        if (er) {
            if (er.code === 'EACCES' || options && options.ignoreErrors) {
                er = null;
                is = false;
            }
        }
        cb(er, is);
    });
}
function sync(path, options) {
    // my kingdom for a filtered catch
    try {
        return core.sync(path, options || {});
    } catch (er) {
        if (options && options.ignoreErrors || er.code === 'EACCES') {
            return false;
        } else {
            throw er;
        }
    }
}
}),
"[project]/node_modules/which/which.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const isWindows = process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys';
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const COLON = isWindows ? ';' : ':';
const isexe = __turbopack_context__.r("[project]/node_modules/isexe/index.js [app-route] (ecmascript)");
const getNotFoundError = (cmd)=>Object.assign(new Error(`not found: ${cmd}`), {
        code: 'ENOENT'
    });
const getPathInfo = (cmd, opt)=>{
    const colon = opt.colon || COLON;
    // If it has a slash, then we don't bother searching the pathenv.
    // just check the file itself, and that's it.
    const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [
        ''
    ] : [
        // windows always checks the cwd first
        ...isWindows ? [
            process.cwd()
        ] : [],
        ...(opt.path || process.env.PATH || /* istanbul ignore next: very unusual */ '').split(colon)
    ];
    const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM' : '';
    const pathExt = isWindows ? pathExtExe.split(colon) : [
        ''
    ];
    if (isWindows) {
        if (cmd.indexOf('.') !== -1 && pathExt[0] !== '') pathExt.unshift('');
    }
    return {
        pathEnv,
        pathExt,
        pathExtExe
    };
};
const which = (cmd, opt, cb)=>{
    if (typeof opt === 'function') {
        cb = opt;
        opt = {};
    }
    if (!opt) opt = {};
    const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
    const found = [];
    const step = (i)=>new Promise((resolve, reject)=>{
            if (i === pathEnv.length) return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
            const ppRaw = pathEnv[i];
            const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
            const pCmd = path.join(pathPart, cmd);
            const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
            resolve(subStep(p, i, 0));
        });
    const subStep = (p, i, ii)=>new Promise((resolve, reject)=>{
            if (ii === pathExt.length) return resolve(step(i + 1));
            const ext = pathExt[ii];
            isexe(p + ext, {
                pathExt: pathExtExe
            }, (er, is)=>{
                if (!er && is) {
                    if (opt.all) found.push(p + ext);
                    else return resolve(p + ext);
                }
                return resolve(subStep(p, i, ii + 1));
            });
        });
    return cb ? step(0).then((res)=>cb(null, res), cb) : step(0);
};
const whichSync = (cmd, opt)=>{
    opt = opt || {};
    const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
    const found = [];
    for(let i = 0; i < pathEnv.length; i++){
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for(let j = 0; j < pathExt.length; j++){
            const cur = p + pathExt[j];
            try {
                const is = isexe.sync(cur, {
                    pathExt: pathExtExe
                });
                if (is) {
                    if (opt.all) found.push(cur);
                    else return cur;
                }
            } catch (ex) {}
        }
    }
    if (opt.all && found.length) return found;
    if (opt.nothrow) return null;
    throw getNotFoundError(cmd);
};
module.exports = which;
which.sync = whichSync;
}),
"[project]/node_modules/path-key/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const pathKey = (options = {})=>{
    const environment = options.env || process.env;
    const platform = options.platform || process.platform;
    if (platform !== 'win32') {
        return 'PATH';
    }
    return Object.keys(environment).reverse().find((key)=>key.toUpperCase() === 'PATH') || 'Path';
};
module.exports = pathKey;
// TODO: Remove this for the next major release
module.exports.default = pathKey;
}),
"[project]/node_modules/cross-spawn/lib/util/resolveCommand.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const which = __turbopack_context__.r("[project]/node_modules/which/which.js [app-route] (ecmascript)");
const getPathKey = __turbopack_context__.r("[project]/node_modules/path-key/index.js [app-route] (ecmascript)");
function resolveCommandAttempt(parsed, withoutPathExt) {
    const env = parsed.options.env || process.env;
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    // Worker threads do not have process.chdir()
    const shouldSwitchCwd = hasCustomCwd && process.chdir !== undefined && !process.chdir.disabled;
    // If a custom `cwd` was specified, we need to change the process cwd
    // because `which` will do stat calls but does not support a custom cwd
    if (shouldSwitchCwd) {
        try {
            process.chdir(parsed.options.cwd);
        } catch (err) {
        /* Empty */ }
    }
    let resolved;
    try {
        resolved = which.sync(parsed.command, {
            path: env[getPathKey({
                env
            })],
            pathExt: withoutPathExt ? path.delimiter : undefined
        });
    } catch (e) {
    /* Empty */ } finally{
        if (shouldSwitchCwd) {
            process.chdir(cwd);
        }
    }
    // If we successfully resolved, ensure that an absolute path is returned
    // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
    if (resolved) {
        resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : '', resolved);
    }
    return resolved;
}
function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}
module.exports = resolveCommand;
}),
"[project]/node_modules/cross-spawn/lib/util/escape.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// See http://www.robvanderwoude.com/escapechars.php
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
function escapeCommand(arg) {
    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');
    return arg;
}
function escapeArgument(arg, doubleEscapeMetaChars) {
    // Convert to string
    arg = `${arg}`;
    // Algorithm below is based on https://qntm.org/cmd
    // It's slightly altered to disable JS backtracking to avoid hanging on specially crafted input
    // Please see https://github.com/moxystudio/node-cross-spawn/pull/160 for more information
    // Sequence of backslashes followed by a double quote:
    // double up all the backslashes and escape the double quote
    arg = arg.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"');
    // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes
    arg = arg.replace(/(?=(\\+?)?)\1$/, '$1$1');
    // All other backslashes occur literally
    // Quote the whole thing:
    arg = `"${arg}"`;
    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');
    // Double escape meta chars if necessary
    if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, '^$1');
    }
    return arg;
}
module.exports.command = escapeCommand;
module.exports.argument = escapeArgument;
}),
"[project]/node_modules/shebang-regex/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = /^#!(.*)/;
}),
"[project]/node_modules/shebang-command/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const shebangRegex = __turbopack_context__.r("[project]/node_modules/shebang-regex/index.js [app-route] (ecmascript)");
module.exports = (string = '')=>{
    const match = string.match(shebangRegex);
    if (!match) {
        return null;
    }
    const [path, argument] = match[0].replace(/#! ?/, '').split(' ');
    const binary = path.split('/').pop();
    if (binary === 'env') {
        return argument;
    }
    return argument ? `${binary} ${argument}` : binary;
};
}),
"[project]/node_modules/cross-spawn/lib/util/readShebang.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const shebangCommand = __turbopack_context__.r("[project]/node_modules/shebang-command/index.js [app-route] (ecmascript)");
function readShebang(command) {
    // Read the first 150 bytes from the file
    const size = 150;
    const buffer = Buffer.alloc(size);
    let fd;
    try {
        fd = fs.openSync(command, 'r');
        fs.readSync(fd, buffer, 0, size, 0);
        fs.closeSync(fd);
    } catch (e) {}
    // Attempt to extract shebang (null is returned if not a shebang)
    return shebangCommand(buffer.toString());
}
module.exports = readShebang;
}),
"[project]/node_modules/cross-spawn/lib/parse.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const resolveCommand = __turbopack_context__.r("[project]/node_modules/cross-spawn/lib/util/resolveCommand.js [app-route] (ecmascript)");
const escape = __turbopack_context__.r("[project]/node_modules/cross-spawn/lib/util/escape.js [app-route] (ecmascript)");
const readShebang = __turbopack_context__.r("[project]/node_modules/cross-spawn/lib/util/readShebang.js [app-route] (ecmascript)");
const isWin = process.platform === 'win32';
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function detectShebang(parsed) {
    parsed.file = resolveCommand(parsed);
    const shebang = parsed.file && readShebang(parsed.file);
    if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return resolveCommand(parsed);
    }
    return parsed.file;
}
function parseNonShell(parsed) {
    if ("TURBOPACK compile-time truthy", 1) {
        return parsed;
    }
    //TURBOPACK unreachable
    ;
    // Detect & add support for shebangs
    const commandFile = undefined;
    // We don't need a shell if the command filename is an executable
    const needsShell = undefined;
}
function parse(command, args, options) {
    // Normalize arguments, similar to nodejs
    if (args && !Array.isArray(args)) {
        options = args;
        args = null;
    }
    args = args ? args.slice(0) : []; // Clone array to avoid changing the original
    options = Object.assign({}, options); // Clone object to avoid changing the original
    // Build our parsed object
    const parsed = {
        command,
        args,
        options,
        file: undefined,
        original: {
            command,
            args
        }
    };
    // Delegate further parsing to shell or non-shell
    return options.shell ? parsed : parseNonShell(parsed);
}
module.exports = parse;
}),
"[project]/node_modules/cross-spawn/lib/enoent.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const isWin = process.platform === 'win32';
function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: 'ENOENT',
        errno: 'ENOENT',
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
    });
}
function hookChildProcess(cp, parsed) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
    const originalEmit = undefined;
}
function verifyENOENT(status, parsed) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
}
function verifyENOENTSync(status, parsed) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
}
module.exports = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError
};
}),
"[project]/node_modules/cross-spawn/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const cp = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)");
const parse = __turbopack_context__.r("[project]/node_modules/cross-spawn/lib/parse.js [app-route] (ecmascript)");
const enoent = __turbopack_context__.r("[project]/node_modules/cross-spawn/lib/enoent.js [app-route] (ecmascript)");
function spawn(command, args, options) {
    // Parse the arguments
    const parsed = parse(command, args, options);
    // Spawn the child process
    const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    enoent.hookChildProcess(spawned, parsed);
    return spawned;
}
function spawnSync(command, args, options) {
    // Parse the arguments
    const parsed = parse(command, args, options);
    // Spawn the child process
    const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
    // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
    return result;
}
module.exports = spawn;
module.exports.spawn = spawn;
module.exports.sync = spawnSync;
module.exports._parse = parse;
module.exports._enoent = enoent;
}),
"[project]/node_modules/@modelcontextprotocol/sdk/dist/esm/shared/stdio.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReadBuffer",
    ()=>ReadBuffer,
    "deserializeMessage",
    ()=>deserializeMessage,
    "serializeMessage",
    ()=>serializeMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@modelcontextprotocol/sdk/dist/esm/types.js [app-route] (ecmascript)");
;
class ReadBuffer {
    append(chunk) {
        this._buffer = this._buffer ? Buffer.concat([
            this._buffer,
            chunk
        ]) : chunk;
    }
    readMessage() {
        if (!this._buffer) {
            return null;
        }
        const index = this._buffer.indexOf("\n");
        if (index === -1) {
            return null;
        }
        const line = this._buffer.toString("utf8", 0, index).replace(/\r$/, '');
        this._buffer = this._buffer.subarray(index + 1);
        return deserializeMessage(line);
    }
    clear() {
        this._buffer = undefined;
    }
}
function deserializeMessage(line) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JSONRPCMessageSchema"].parse(JSON.parse(line));
}
function serializeMessage(message) {
    return JSON.stringify(message) + "\n";
} //# sourceMappingURL=stdio.js.map
}),
"[project]/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_INHERITED_ENV_VARS",
    ()=>DEFAULT_INHERITED_ENV_VARS,
    "StdioClientTransport",
    ()=>StdioClientTransport,
    "getDefaultEnvironment",
    ()=>getDefaultEnvironment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cross$2d$spawn$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/cross-spawn/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:process [external] (node:process, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:stream [external] (node:stream, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$shared$2f$stdio$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@modelcontextprotocol/sdk/dist/esm/shared/stdio.js [app-route] (ecmascript)");
;
;
;
;
const DEFAULT_INHERITED_ENV_VARS = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__["default"].platform === "win32" ? [
    "APPDATA",
    "HOMEDRIVE",
    "HOMEPATH",
    "LOCALAPPDATA",
    "PATH",
    "PROCESSOR_ARCHITECTURE",
    "SYSTEMDRIVE",
    "SYSTEMROOT",
    "TEMP",
    "USERNAME",
    "USERPROFILE",
    "PROGRAMFILES"
] : /* list inspired by the default env inheritance of sudo */ [
    "HOME",
    "LOGNAME",
    "PATH",
    "SHELL",
    "TERM",
    "USER"
];
function getDefaultEnvironment() {
    const env = {};
    for (const key of DEFAULT_INHERITED_ENV_VARS){
        const value = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__["default"].env[key];
        if (value === undefined) {
            continue;
        }
        if (value.startsWith("()")) {
            continue;
        }
        env[key] = value;
    }
    return env;
}
class StdioClientTransport {
    constructor(server){
        this._abortController = new AbortController();
        this._readBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$shared$2f$stdio$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReadBuffer"]();
        this._stderrStream = null;
        this._serverParams = server;
        if (server.stderr === "pipe" || server.stderr === "overlapped") {
            this._stderrStream = new __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__["PassThrough"]();
        }
    }
    /**
     * Starts the server process and prepares to communicate with it.
     */ async start() {
        if (this._process) {
            throw new Error("StdioClientTransport already started! If using Client class, note that connect() calls start() automatically.");
        }
        return new Promise((resolve, reject)=>{
            var _a, _b, _c, _d, _e;
            this._process = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cross$2d$spawn$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(this._serverParams.command, (_a = this._serverParams.args) !== null && _a !== void 0 ? _a : [], {
                // merge default env with server env because mcp server needs some env vars
                env: {
                    ...getDefaultEnvironment(),
                    ...this._serverParams.env
                },
                stdio: [
                    "pipe",
                    "pipe",
                    (_b = this._serverParams.stderr) !== null && _b !== void 0 ? _b : "inherit"
                ],
                shell: false,
                signal: this._abortController.signal,
                windowsHide: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__["default"].platform === "win32" && isElectron(),
                cwd: this._serverParams.cwd
            });
            this._process.on("error", (error)=>{
                var _a, _b;
                if (error.name === "AbortError") {
                    // Expected when close() is called.
                    (_a = this.onclose) === null || _a === void 0 ? void 0 : _a.call(this);
                    return;
                }
                reject(error);
                (_b = this.onerror) === null || _b === void 0 ? void 0 : _b.call(this, error);
            });
            this._process.on("spawn", ()=>{
                resolve();
            });
            this._process.on("close", (_code)=>{
                var _a;
                this._process = undefined;
                (_a = this.onclose) === null || _a === void 0 ? void 0 : _a.call(this);
            });
            (_c = this._process.stdin) === null || _c === void 0 ? void 0 : _c.on("error", (error)=>{
                var _a;
                (_a = this.onerror) === null || _a === void 0 ? void 0 : _a.call(this, error);
            });
            (_d = this._process.stdout) === null || _d === void 0 ? void 0 : _d.on("data", (chunk)=>{
                this._readBuffer.append(chunk);
                this.processReadBuffer();
            });
            (_e = this._process.stdout) === null || _e === void 0 ? void 0 : _e.on("error", (error)=>{
                var _a;
                (_a = this.onerror) === null || _a === void 0 ? void 0 : _a.call(this, error);
            });
            if (this._stderrStream && this._process.stderr) {
                this._process.stderr.pipe(this._stderrStream);
            }
        });
    }
    /**
     * The stderr stream of the child process, if `StdioServerParameters.stderr` was set to "pipe" or "overlapped".
     *
     * If stderr piping was requested, a PassThrough stream is returned _immediately_, allowing callers to
     * attach listeners before the start method is invoked. This prevents loss of any early
     * error output emitted by the child process.
     */ get stderr() {
        var _a, _b;
        if (this._stderrStream) {
            return this._stderrStream;
        }
        return (_b = (_a = this._process) === null || _a === void 0 ? void 0 : _a.stderr) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The child process pid spawned by this transport.
     *
     * This is only available after the transport has been started.
     */ get pid() {
        var _a, _b;
        return (_b = (_a = this._process) === null || _a === void 0 ? void 0 : _a.pid) !== null && _b !== void 0 ? _b : null;
    }
    processReadBuffer() {
        var _a, _b;
        while(true){
            try {
                const message = this._readBuffer.readMessage();
                if (message === null) {
                    break;
                }
                (_a = this.onmessage) === null || _a === void 0 ? void 0 : _a.call(this, message);
            } catch (error) {
                (_b = this.onerror) === null || _b === void 0 ? void 0 : _b.call(this, error);
            }
        }
    }
    async close() {
        this._abortController.abort();
        this._process = undefined;
        this._readBuffer.clear();
    }
    send(message) {
        return new Promise((resolve)=>{
            var _a;
            if (!((_a = this._process) === null || _a === void 0 ? void 0 : _a.stdin)) {
                throw new Error("Not connected");
            }
            const json = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$shared$2f$stdio$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeMessage"])(message);
            if (this._process.stdin.write(json)) {
                resolve();
            } else {
                this._process.stdin.once("drain", resolve);
            }
        });
    }
}
function isElectron() {
    return "type" in __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__["default"];
} //# sourceMappingURL=stdio.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e786490f._.js.map