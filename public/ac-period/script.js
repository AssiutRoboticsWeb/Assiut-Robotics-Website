function Fd(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const i in r)
                if (i !== "default" && !(i in e)) {
                    const l = Object.getOwnPropertyDescriptor(r, i);
                    l &&
                        Object.defineProperty(
                            e,
                            i,
                            l.get ? l : { enumerable: !0, get: () => r[i] },
                        );
                }
        }
    }
    return Object.freeze(
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
    );
}
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
    new MutationObserver((i) => {
        for (const l of i)
            if (l.type === "childList")
                for (const o of l.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(i) {
        const l = {};
        return (
            i.integrity && (l.integrity = i.integrity),
            i.referrerPolicy && (l.referrerPolicy = i.referrerPolicy),
            i.crossOrigin === "use-credentials"
                ? (l.credentials = "include")
                : i.crossOrigin === "anonymous"
                    ? (l.credentials = "omit")
                    : (l.credentials = "same-origin"),
            l
        );
    }
    function r(i) {
        if (i.ep) return;
        i.ep = !0;
        const l = n(i);
        fetch(i.href, l);
    }
})();
var Ad =
    typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
            ? window
            : typeof global < "u"
                ? global
                : typeof self < "u"
                    ? self
                    : {};
function du(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
        ? e.default
        : e;
}
var fu = { exports: {} },
    Xi = {},
    pu = { exports: {} },
    W = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Fr = Symbol.for("react.element"),
    Ud = Symbol.for("react.portal"),
    $d = Symbol.for("react.fragment"),
    bd = Symbol.for("react.strict_mode"),
    Bd = Symbol.for("react.profiler"),
    Wd = Symbol.for("react.provider"),
    Hd = Symbol.for("react.context"),
    Vd = Symbol.for("react.forward_ref"),
    Qd = Symbol.for("react.suspense"),
    Kd = Symbol.for("react.memo"),
    Xd = Symbol.for("react.lazy"),
    Vs = Symbol.iterator;
function Yd(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (Vs && e[Vs]) || e["@@iterator"]),
            typeof e == "function" ? e : null);
}
var hu = {
    isMounted: function () {
        return !1;
    },
    enqueueForceUpdate: function () { },
    enqueueReplaceState: function () { },
    enqueueSetState: function () { },
},
    mu = Object.assign,
    vu = {};
function Vn(e, t, n) {
    ((this.props = e),
        (this.context = t),
        (this.refs = vu),
        (this.updater = n || hu));
}
Vn.prototype.isReactComponent = {};
Vn.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
            "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
    this.updater.enqueueSetState(this, e, t, "setState");
};
Vn.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function gu() { }
gu.prototype = Vn.prototype;
function Io(e, t, n) {
    ((this.props = e),
        (this.context = t),
        (this.refs = vu),
        (this.updater = n || hu));
}
var Fo = (Io.prototype = new gu());
Fo.constructor = Io;
mu(Fo, Vn.prototype);
Fo.isPureReactComponent = !0;
var Qs = Array.isArray,
    yu = Object.prototype.hasOwnProperty,
    Ao = { current: null },
    xu = { key: !0, ref: !0, __self: !0, __source: !0 };
function wu(e, t, n) {
    var r,
        i = {},
        l = null,
        o = null;
    if (t != null)
        for (r in (t.ref !== void 0 && (o = t.ref),
            t.key !== void 0 && (l = "" + t.key),
            t))
            yu.call(t, r) && !xu.hasOwnProperty(r) && (i[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1) i.children = n;
    else if (1 < a) {
        for (var s = Array(a), f = 0; f < a; f++) s[f] = arguments[f + 2];
        i.children = s;
    }
    if (e && e.defaultProps)
        for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
    return {
        $$typeof: Fr,
        type: e,
        key: l,
        ref: o,
        props: i,
        _owner: Ao.current,
    };
}
function Gd(e, t) {
    return {
        $$typeof: Fr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
    };
}
function Uo(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Fr;
}
function Zd(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
        "$" +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var Ks = /\/+/g;
function pl(e, t) {
    return typeof e == "object" && e !== null && e.key != null
        ? Zd("" + e.key)
        : t.toString(36);
}
function ui(e, t, n, r, i) {
    var l = typeof e;
    (l === "undefined" || l === "boolean") && (e = null);
    var o = !1;
    if (e === null) o = !0;
    else
        switch (l) {
            case "string":
            case "number":
                o = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case Fr:
                    case Ud:
                        o = !0;
                }
        }
    if (o)
        return (
            (o = e),
            (i = i(o)),
            (e = r === "" ? "." + pl(o, 0) : r),
            Qs(i)
                ? ((n = ""),
                    e != null && (n = e.replace(Ks, "$&/") + "/"),
                    ui(i, t, n, "", function (f) {
                        return f;
                    }))
                : i != null &&
                (Uo(i) &&
                    (i = Gd(
                        i,
                        n +
                        (!i.key || (o && o.key === i.key)
                            ? ""
                            : ("" + i.key).replace(Ks, "$&/") + "/") +
                        e,
                    )),
                    t.push(i)),
            1
        );
    if (((o = 0), (r = r === "" ? "." : r + ":"), Qs(e)))
        for (var a = 0; a < e.length; a++) {
            l = e[a];
            var s = r + pl(l, a);
            o += ui(l, t, n, s, i);
        }
    else if (((s = Yd(e)), typeof s == "function"))
        for (e = s.call(e), a = 0; !(l = e.next()).done;)
            ((l = l.value), (s = r + pl(l, a++)), (o += ui(l, t, n, s, i)));
    else if (l === "object")
        throw (
            (t = String(e)),
            Error(
                "Objects are not valid as a React child (found: " +
                (t === "[object Object]"
                    ? "object with keys {" + Object.keys(e).join(", ") + "}"
                    : t) +
                "). If you meant to render a collection of children, use an array instead.",
            )
        );
    return o;
}
function Vr(e, t, n) {
    if (e == null) return e;
    var r = [],
        i = 0;
    return (
        ui(e, r, "", "", function (l) {
            return t.call(n, l, i++);
        }),
        r
    );
}
function qd(e) {
    if (e._status === -1) {
        var t = e._result;
        ((t = t()),
            t.then(
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 1), (e._result = n));
                },
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 2), (e._result = n));
                },
            ),
            e._status === -1 && ((e._status = 0), (e._result = t)));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
}
var Me = { current: null },
    ci = { transition: null },
    Jd = {
        ReactCurrentDispatcher: Me,
        ReactCurrentBatchConfig: ci,
        ReactCurrentOwner: Ao,
    };
function ku() {
    throw Error("act(...) is not supported in production builds of React.");
}
W.Children = {
    map: Vr,
    forEach: function (e, t, n) {
        Vr(
            e,
            function () {
                t.apply(this, arguments);
            },
            n,
        );
    },
    count: function (e) {
        var t = 0;
        return (
            Vr(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            Vr(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!Uo(e))
            throw Error(
                "React.Children.only expected to receive a single React element child.",
            );
        return e;
    },
};
W.Component = Vn;
W.Fragment = $d;
W.Profiler = Bd;
W.PureComponent = Io;
W.StrictMode = bd;
W.Suspense = Qd;
W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Jd;
W.act = ku;
W.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error(
            "React.cloneElement(...): The argument must be a React element, but you passed " +
            e +
            ".",
        );
    var r = mu({}, e.props),
        i = e.key,
        l = e.ref,
        o = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((l = t.ref), (o = Ao.current)),
                t.key !== void 0 && (i = "" + t.key),
                e.type && e.type.defaultProps)
        )
            var a = e.type.defaultProps;
        for (s in t)
            yu.call(t, s) &&
                !xu.hasOwnProperty(s) &&
                (r[s] = t[s] === void 0 && a !== void 0 ? a[s] : t[s]);
    }
    var s = arguments.length - 2;
    if (s === 1) r.children = n;
    else if (1 < s) {
        a = Array(s);
        for (var f = 0; f < s; f++) a[f] = arguments[f + 2];
        r.children = a;
    }
    return { $$typeof: Fr, type: e.type, key: i, ref: l, props: r, _owner: o };
};
W.createContext = function (e) {
    return (
        (e = {
            $$typeof: Hd,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
        }),
        (e.Provider = { $$typeof: Wd, _context: e }),
        (e.Consumer = e)
    );
};
W.createElement = wu;
W.createFactory = function (e) {
    var t = wu.bind(null, e);
    return ((t.type = e), t);
};
W.createRef = function () {
    return { current: null };
};
W.forwardRef = function (e) {
    return { $$typeof: Vd, render: e };
};
W.isValidElement = Uo;
W.lazy = function (e) {
    return { $$typeof: Xd, _payload: { _status: -1, _result: e }, _init: qd };
};
W.memo = function (e, t) {
    return { $$typeof: Kd, type: e, compare: t === void 0 ? null : t };
};
W.startTransition = function (e) {
    var t = ci.transition;
    ci.transition = {};
    try {
        e();
    } finally {
        ci.transition = t;
    }
};
W.unstable_act = ku;
W.useCallback = function (e, t) {
    return Me.current.useCallback(e, t);
};
W.useContext = function (e) {
    return Me.current.useContext(e);
};
W.useDebugValue = function () { };
W.useDeferredValue = function (e) {
    return Me.current.useDeferredValue(e);
};
W.useEffect = function (e, t) {
    return Me.current.useEffect(e, t);
};
W.useId = function () {
    return Me.current.useId();
};
W.useImperativeHandle = function (e, t, n) {
    return Me.current.useImperativeHandle(e, t, n);
};
W.useInsertionEffect = function (e, t) {
    return Me.current.useInsertionEffect(e, t);
};
W.useLayoutEffect = function (e, t) {
    return Me.current.useLayoutEffect(e, t);
};
W.useMemo = function (e, t) {
    return Me.current.useMemo(e, t);
};
W.useReducer = function (e, t, n) {
    return Me.current.useReducer(e, t, n);
};
W.useRef = function (e) {
    return Me.current.useRef(e);
};
W.useState = function (e) {
    return Me.current.useState(e);
};
W.useSyncExternalStore = function (e, t, n) {
    return Me.current.useSyncExternalStore(e, t, n);
};
W.useTransition = function () {
    return Me.current.useTransition();
};
W.version = "18.3.1";
pu.exports = W;
var E = pu.exports;
const ef = du(E),
    tf = Fd({ __proto__: null, default: ef }, [E]);
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var nf = E,
    rf = Symbol.for("react.element"),
    lf = Symbol.for("react.fragment"),
    of = Object.prototype.hasOwnProperty,
    sf = nf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    af = { key: !0, ref: !0, __self: !0, __source: !0 };
function Su(e, t, n) {
    var r,
        i = {},
        l = null,
        o = null;
    (n !== void 0 && (l = "" + n),
        t.key !== void 0 && (l = "" + t.key),
        t.ref !== void 0 && (o = t.ref));
    for (r in t) of.call(t, r) && !af.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: rf,
        type: e,
        key: l,
        ref: o,
        props: i,
        _owner: sf.current,
    };
}
Xi.Fragment = lf;
Xi.jsx = Su;
Xi.jsxs = Su;
fu.exports = Xi;
var d = fu.exports,
    Eu = { exports: {} },
    Qe = {},
    _u = { exports: {} },
    Cu = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ (function (e) {
    function t(S, I) {
        var T = S.length;
        S.push(I);
        e: for (; 0 < T;) {
            var B = (T - 1) >>> 1,
                O = S[B];
            if (0 < i(O, I)) ((S[B] = I), (S[T] = O), (T = B));
            else break e;
        }
    }
    function n(S) {
        return S.length === 0 ? null : S[0];
    }
    function r(S) {
        if (S.length === 0) return null;
        var I = S[0],
            T = S.pop();
        if (T !== I) {
            S[0] = T;
            e: for (var B = 0, O = S.length, G = O >>> 1; B < G;) {
                var oe = 2 * (B + 1) - 1,
                    Z = S[oe],
                    se = oe + 1,
                    Se = S[se];
                if (0 > i(Z, T))
                    se < O && 0 > i(Se, Z)
                        ? ((S[B] = Se), (S[se] = T), (B = se))
                        : ((S[B] = Z), (S[oe] = T), (B = oe));
                else if (se < O && 0 > i(Se, T)) ((S[B] = Se), (S[se] = T), (B = se));
                else break e;
            }
        }
        return I;
    }
    function i(S, I) {
        var T = S.sortIndex - I.sortIndex;
        return T !== 0 ? T : S.id - I.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var l = performance;
        e.unstable_now = function () {
            return l.now();
        };
    } else {
        var o = Date,
            a = o.now();
        e.unstable_now = function () {
            return o.now() - a;
        };
    }
    var s = [],
        f = [],
        g = 1,
        v = null,
        x = 3,
        w = !1,
        _ = !1,
        C = !1,
        j = typeof setTimeout == "function" ? setTimeout : null,
        h = typeof clearTimeout == "function" ? clearTimeout : null,
        p = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function m(S) {
        for (var I = n(f); I !== null;) {
            if (I.callback === null) r(f);
            else if (I.startTime <= S)
                (r(f), (I.sortIndex = I.expirationTime), t(s, I));
            else break;
            I = n(f);
        }
    }
    function k(S) {
        if (((C = !1), m(S), !_))
            if (n(s) !== null) ((_ = !0), U(P));
            else {
                var I = n(f);
                I !== null && H(k, I.startTime - S);
            }
    }
    function P(S, I) {
        ((_ = !1), C && ((C = !1), h(u), (u = -1)), (w = !0));
        var T = x;
        try {
            for (
                m(I), v = n(s);
                v !== null && (!(v.expirationTime > I) || (S && !z()));
            ) {
                var B = v.callback;
                if (typeof B == "function") {
                    ((v.callback = null), (x = v.priorityLevel));
                    var O = B(v.expirationTime <= I);
                    ((I = e.unstable_now()),
                        typeof O == "function" ? (v.callback = O) : v === n(s) && r(s),
                        m(I));
                } else r(s);
                v = n(s);
            }
            if (v !== null) var G = !0;
            else {
                var oe = n(f);
                (oe !== null && H(k, oe.startTime - I), (G = !1));
            }
            return G;
        } finally {
            ((v = null), (x = T), (w = !1));
        }
    }
    var R = !1,
        N = null,
        u = -1,
        c = 5,
        y = -1;
    function z() {
        return !(e.unstable_now() - y < c);
    }
    function M() {
        if (N !== null) {
            var S = e.unstable_now();
            y = S;
            var I = !0;
            try {
                I = N(!0, S);
            } finally {
                I ? $() : ((R = !1), (N = null));
            }
        } else R = !1;
    }
    var $;
    if (typeof p == "function")
        $ = function () {
            p(M);
        };
    else if (typeof MessageChannel < "u") {
        var b = new MessageChannel(),
            he = b.port2;
        ((b.port1.onmessage = M),
            ($ = function () {
                he.postMessage(null);
            }));
    } else
        $ = function () {
            j(M, 0);
        };
    function U(S) {
        ((N = S), R || ((R = !0), $()));
    }
    function H(S, I) {
        u = j(function () {
            S(e.unstable_now());
        }, I);
    }
    ((e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (S) {
            S.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            _ || w || ((_ = !0), U(P));
        }),
        (e.unstable_forceFrameRate = function (S) {
            0 > S || 125 < S
                ? console.error(
                    "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
                : (c = 0 < S ? Math.floor(1e3 / S) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return x;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(s);
        }),
        (e.unstable_next = function (S) {
            switch (x) {
                case 1:
                case 2:
                case 3:
                    var I = 3;
                    break;
                default:
                    I = x;
            }
            var T = x;
            x = I;
            try {
                return S();
            } finally {
                x = T;
            }
        }),
        (e.unstable_pauseExecution = function () { }),
        (e.unstable_requestPaint = function () { }),
        (e.unstable_runWithPriority = function (S, I) {
            switch (S) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    S = 3;
            }
            var T = x;
            x = S;
            try {
                return I();
            } finally {
                x = T;
            }
        }),
        (e.unstable_scheduleCallback = function (S, I, T) {
            var B = e.unstable_now();
            switch (
            (typeof T == "object" && T !== null
                ? ((T = T.delay), (T = typeof T == "number" && 0 < T ? B + T : B))
                : (T = B),
                S)
            ) {
                case 1:
                    var O = -1;
                    break;
                case 2:
                    O = 250;
                    break;
                case 5:
                    O = 1073741823;
                    break;
                case 4:
                    O = 1e4;
                    break;
                default:
                    O = 5e3;
            }
            return (
                (O = T + O),
                (S = {
                    id: g++,
                    callback: I,
                    priorityLevel: S,
                    startTime: T,
                    expirationTime: O,
                    sortIndex: -1,
                }),
                T > B
                    ? ((S.sortIndex = T),
                        t(f, S),
                        n(s) === null &&
                        S === n(f) &&
                        (C ? (h(u), (u = -1)) : (C = !0), H(k, T - B)))
                    : ((S.sortIndex = O), t(s, S), _ || w || ((_ = !0), U(P))),
                S
            );
        }),
        (e.unstable_shouldYield = z),
        (e.unstable_wrapCallback = function (S) {
            var I = x;
            return function () {
                var T = x;
                x = I;
                try {
                    return S.apply(this, arguments);
                } finally {
                    x = T;
                }
            };
        }));
})(Cu);
_u.exports = Cu;
var uf = _u.exports;
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var cf = E,
    Ve = uf;
function L(e) {
    for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
        n < arguments.length;
        n++
    )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
}
var ju = new Set(),
    yr = {};
function pn(e, t) {
    (An(e, t), An(e + "Capture", t));
}
function An(e, t) {
    for (yr[e] = t, e = 0; e < t.length; e++) ju.add(t[e]);
}
var Et = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
),
    $l = Object.prototype.hasOwnProperty,
    df =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Xs = {},
    Ys = {};
function ff(e) {
    return $l.call(Ys, e)
        ? !0
        : $l.call(Xs, e)
            ? !1
            : df.test(e)
                ? (Ys[e] = !0)
                : ((Xs[e] = !0), !1);
}
function pf(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r
                ? !1
                : n !== null
                    ? !n.acceptsBooleans
                    : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
        default:
            return !1;
    }
}
function hf(e, t, n, r) {
    if (t === null || typeof t > "u" || pf(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t;
        }
    return !1;
}
function De(e, t, n, r, i, l, o) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = l),
        (this.removeEmptyString = o));
}
var Ce = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
        Ce[e] = new De(e, 0, !1, e, null, !1, !1);
    });
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
].forEach(function (e) {
    var t = e[0];
    Ce[t] = new De(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    Ce[e] = new De(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
].forEach(function (e) {
    Ce[e] = new De(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
        Ce[e] = new De(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
    Ce[e] = new De(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
    Ce[e] = new De(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
    Ce[e] = new De(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
    Ce[e] = new De(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var $o = /[\-:]([a-z])/g;
function bo(e) {
    return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace($o, bo);
        Ce[t] = new De(t, 1, !1, e, null, !1, !1);
    });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace($o, bo);
        Ce[t] = new De(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace($o, bo);
    Ce[t] = new De(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
    Ce[e] = new De(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ce.xlinkHref = new De(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
    Ce[e] = new De(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Bo(e, t, n, r) {
    var i = Ce.hasOwnProperty(t) ? Ce[t] : null;
    (i !== null
        ? i.type !== 0
        : r ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
        (hf(t, n, i, r) && (n = null),
            r || i === null
                ? ff(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
                : i.mustUseProperty
                    ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
                    : ((t = i.attributeName),
                        (r = i.attributeNamespace),
                        n === null
                            ? e.removeAttribute(t)
                            : ((i = i.type),
                                (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
                                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Nt = cf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Qr = Symbol.for("react.element"),
    wn = Symbol.for("react.portal"),
    kn = Symbol.for("react.fragment"),
    Wo = Symbol.for("react.strict_mode"),
    bl = Symbol.for("react.profiler"),
    Nu = Symbol.for("react.provider"),
    Lu = Symbol.for("react.context"),
    Ho = Symbol.for("react.forward_ref"),
    Bl = Symbol.for("react.suspense"),
    Wl = Symbol.for("react.suspense_list"),
    Vo = Symbol.for("react.memo"),
    zt = Symbol.for("react.lazy"),
    Ru = Symbol.for("react.offscreen"),
    Gs = Symbol.iterator;
function Gn(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (Gs && e[Gs]) || e["@@iterator"]),
            typeof e == "function" ? e : null);
}
var de = Object.assign,
    hl;
function lr(e) {
    if (hl === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            hl = (t && t[1]) || "";
        }
    return (
        `
  ` +
        hl +
        e
    );
}
var ml = !1;
function vl(e, t) {
    if (!e || ml) return "";
    ml = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (
                ((t = function () {
                    throw Error();
                }),
                    Object.defineProperty(t.prototype, "props", {
                        set: function () {
                            throw Error();
                        },
                    }),
                    typeof Reflect == "object" && Reflect.construct)
            ) {
                try {
                    Reflect.construct(t, []);
                } catch (f) {
                    var r = f;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (f) {
                    r = f;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (f) {
                r = f;
            }
            e();
        }
    } catch (f) {
        if (f && r && typeof f.stack == "string") {
            for (
                var i = f.stack.split(`
  `),
                l = r.stack.split(`
  `),
                o = i.length - 1,
                a = l.length - 1;
                1 <= o && 0 <= a && i[o] !== l[a];
            )
                a--;
            for (; 1 <= o && 0 <= a; o--, a--)
                if (i[o] !== l[a]) {
                    if (o !== 1 || a !== 1)
                        do
                            if ((o--, a--, 0 > a || i[o] !== l[a])) {
                                var s =
                                    `
  ` + i[o].replace(" at new ", " at ");
                                return (
                                    e.displayName &&
                                    s.includes("<anonymous>") &&
                                    (s = s.replace("<anonymous>", e.displayName)),
                                    s
                                );
                            }
                        while (1 <= o && 0 <= a);
                    break;
                }
        }
    } finally {
        ((ml = !1), (Error.prepareStackTrace = n));
    }
    return (e = e ? e.displayName || e.name : "") ? lr(e) : "";
}
function mf(e) {
    switch (e.tag) {
        case 5:
            return lr(e.type);
        case 16:
            return lr("Lazy");
        case 13:
            return lr("Suspense");
        case 19:
            return lr("SuspenseList");
        case 0:
        case 2:
        case 15:
            return ((e = vl(e.type, !1)), e);
        case 11:
            return ((e = vl(e.type.render, !1)), e);
        case 1:
            return ((e = vl(e.type, !0)), e);
        default:
            return "";
    }
}
function Hl(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case kn:
            return "Fragment";
        case wn:
            return "Portal";
        case bl:
            return "Profiler";
        case Wo:
            return "StrictMode";
        case Bl:
            return "Suspense";
        case Wl:
            return "SuspenseList";
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
            case Lu:
                return (e.displayName || "Context") + ".Consumer";
            case Nu:
                return (e._context.displayName || "Context") + ".Provider";
            case Ho:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e ||
                    ((e = t.displayName || t.name || ""),
                        (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
                    e
                );
            case Vo:
                return (
                    (t = e.displayName || null),
                    t !== null ? t : Hl(e.type) || "Memo"
                );
            case zt:
                ((t = e._payload), (e = e._init));
                try {
                    return Hl(e(t));
                } catch { }
        }
    return null;
}
function vf(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return (
                (e = t.render),
                (e = e.displayName || e.name || ""),
                t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
            );
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return Hl(t);
        case 8:
            return t === Wo ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t;
    }
    return null;
}
function Kt(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return "";
    }
}
function Pu(e) {
    var t = e.type;
    return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
    );
}
function gf(e) {
    var t = Pu(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (
        !e.hasOwnProperty(t) &&
        typeof n < "u" &&
        typeof n.get == "function" &&
        typeof n.set == "function"
    ) {
        var i = n.get,
            l = n.set;
        return (
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return i.call(this);
                },
                set: function (o) {
                    ((r = "" + o), l.call(this, o));
                },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
                getValue: function () {
                    return r;
                },
                setValue: function (o) {
                    r = "" + o;
                },
                stopTracking: function () {
                    ((e._valueTracker = null), delete e[t]);
                },
            }
        );
    }
}
function Kr(e) {
    e._valueTracker || (e._valueTracker = gf(e));
}
function zu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return (
        e && (r = Pu(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
    );
}
function ki(e) {
    if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
        return null;
    try {
        return e.activeElement || e.body;
    } catch {
        return e.body;
    }
}
function Vl(e, t) {
    var n = t.checked;
    return de({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
    });
}
function Zs(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    ((n = Kt(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
                t.type === "checkbox" || t.type === "radio"
                    ? t.checked != null
                    : t.value != null,
        }));
}
function Tu(e, t) {
    ((t = t.checked), t != null && Bo(e, "checked", t, !1));
}
function Ql(e, t) {
    Tu(e, t);
    var n = Kt(t.value),
        r = t.type;
    if (n != null)
        r === "number"
            ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
            : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return;
    }
    (t.hasOwnProperty("value")
        ? Kl(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && Kl(e, t.type, Kt(t.defaultValue)),
        t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked));
}
function qs(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
            !(
                (r !== "submit" && r !== "reset") ||
                (t.value !== void 0 && t.value !== null)
            )
        )
            return;
        ((t = "" + e._wrapperState.initialValue),
            n || t === e.value || (e.value = t),
            (e.defaultValue = t));
    }
    ((n = e.name),
        n !== "" && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== "" && (e.name = n));
}
function Kl(e, t, n) {
    (t !== "number" || ki(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = "" + e._wrapperState.initialValue)
            : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var or = Array.isArray;
function Tn(e, t, n, r) {
    if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
            ((i = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== i && (e[n].selected = i),
                i && r && (e[n].defaultSelected = !0));
    } else {
        for (n = "" + Kt(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
                return;
            }
            t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
    }
}
function Xl(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(L(91));
    return de({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
    });
}
function Js(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(L(92));
            if (or(n)) {
                if (1 < n.length) throw Error(L(93));
                n = n[0];
            }
            t = n;
        }
        (t == null && (t = ""), (n = t));
    }
    e._wrapperState = { initialValue: Kt(n) };
}
function Ou(e, t) {
    var n = Kt(t.value),
        r = Kt(t.defaultValue);
    (n != null &&
        ((n = "" + n),
            n !== e.value && (e.value = n),
            t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = "" + r));
}
function ea(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Mu(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml";
    }
}
function Yl(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
        ? Mu(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
            ? "http://www.w3.org/1999/xhtml"
            : e;
}
var Xr,
    Du = (function (e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
            ? function (t, n, r, i) {
                MSApp.execUnsafeLocalFunction(function () {
                    return e(t, n, r, i);
                });
            }
            : e;
    })(function (e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
            e.innerHTML = t;
        else {
            for (
                Xr = Xr || document.createElement("div"),
                Xr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
                t = Xr.firstChild;
                e.firstChild;
            )
                e.removeChild(e.firstChild);
            for (; t.firstChild;) e.appendChild(t.firstChild);
        }
    });
function xr(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var ur = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
},
    yf = ["Webkit", "ms", "Moz", "O"];
Object.keys(ur).forEach(function (e) {
    yf.forEach(function (t) {
        ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ur[t] = ur[e]));
    });
});
function Iu(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
        ? ""
        : n || typeof t != "number" || t === 0 || (ur.hasOwnProperty(e) && ur[e])
            ? ("" + t).trim()
            : t + "px";
}
function Fu(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                i = Iu(n, t[n], r);
            (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i));
        }
}
var xf = de(
    { menuitem: !0 },
    {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
    },
);
function Gl(e, t) {
    if (t) {
        if (xf[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(L(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(L(60));
            if (
                typeof t.dangerouslySetInnerHTML != "object" ||
                !("__html" in t.dangerouslySetInnerHTML)
            )
                throw Error(L(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(L(62));
    }
}
function Zl(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0;
    }
}
var ql = null;
function Qo(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var Jl = null,
    On = null,
    Mn = null;
function ta(e) {
    if ((e = $r(e))) {
        if (typeof Jl != "function") throw Error(L(280));
        var t = e.stateNode;
        t && ((t = Ji(t)), Jl(e.stateNode, e.type, t));
    }
}
function Au(e) {
    On ? (Mn ? Mn.push(e) : (Mn = [e])) : (On = e);
}
function Uu() {
    if (On) {
        var e = On,
            t = Mn;
        if (((Mn = On = null), ta(e), t)) for (e = 0; e < t.length; e++) ta(t[e]);
    }
}
function $u(e, t) {
    return e(t);
}
function bu() { }
var gl = !1;
function Bu(e, t, n) {
    if (gl) return e(t, n);
    gl = !0;
    try {
        return $u(e, t, n);
    } finally {
        ((gl = !1), (On !== null || Mn !== null) && (bu(), Uu()));
    }
}
function wr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Ji(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            ((r = !r.disabled) ||
                ((e = e.type),
                    (r = !(
                        e === "button" ||
                        e === "input" ||
                        e === "select" ||
                        e === "textarea"
                    ))),
                (e = !r));
            break e;
        default:
            e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(L(231, t, typeof n));
    return n;
}
var eo = !1;
if (Et)
    try {
        var Zn = {};
        (Object.defineProperty(Zn, "passive", {
            get: function () {
                eo = !0;
            },
        }),
            window.addEventListener("test", Zn, Zn),
            window.removeEventListener("test", Zn, Zn));
    } catch {
        eo = !1;
    }
function wf(e, t, n, r, i, l, o, a, s) {
    var f = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, f);
    } catch (g) {
        this.onError(g);
    }
}
var cr = !1,
    Si = null,
    Ei = !1,
    to = null,
    kf = {
        onError: function (e) {
            ((cr = !0), (Si = e));
        },
    };
function Sf(e, t, n, r, i, l, o, a, s) {
    ((cr = !1), (Si = null), wf.apply(kf, arguments));
}
function Ef(e, t, n, r, i, l, o, a, s) {
    if ((Sf.apply(this, arguments), cr)) {
        if (cr) {
            var f = Si;
            ((cr = !1), (Si = null));
        } else throw Error(L(198));
        Ei || ((Ei = !0), (to = f));
    }
}
function hn(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return;) t = t.return;
    else {
        e = t;
        do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
        while (e);
    }
    return t.tag === 3 ? n : null;
}
function Wu(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (
            (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
                t !== null)
        )
            return t.dehydrated;
    }
    return null;
}
function na(e) {
    if (hn(e) !== e) throw Error(L(188));
}
function _f(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = hn(e)), t === null)) throw Error(L(188));
        return t !== e ? null : e;
    }
    for (var n = e, r = t; ;) {
        var i = n.return;
        if (i === null) break;
        var l = i.alternate;
        if (l === null) {
            if (((r = i.return), r !== null)) {
                n = r;
                continue;
            }
            break;
        }
        if (i.child === l.child) {
            for (l = i.child; l;) {
                if (l === n) return (na(i), e);
                if (l === r) return (na(i), t);
                l = l.sibling;
            }
            throw Error(L(188));
        }
        if (n.return !== r.return) ((n = i), (r = l));
        else {
            for (var o = !1, a = i.child; a;) {
                if (a === n) {
                    ((o = !0), (n = i), (r = l));
                    break;
                }
                if (a === r) {
                    ((o = !0), (r = i), (n = l));
                    break;
                }
                a = a.sibling;
            }
            if (!o) {
                for (a = l.child; a;) {
                    if (a === n) {
                        ((o = !0), (n = l), (r = i));
                        break;
                    }
                    if (a === r) {
                        ((o = !0), (r = l), (n = i));
                        break;
                    }
                    a = a.sibling;
                }
                if (!o) throw Error(L(189));
            }
        }
        if (n.alternate !== r) throw Error(L(190));
    }
    if (n.tag !== 3) throw Error(L(188));
    return n.stateNode.current === n ? e : t;
}
function Hu(e) {
    return ((e = _f(e)), e !== null ? Vu(e) : null);
}
function Vu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null;) {
        var t = Vu(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var Qu = Ve.unstable_scheduleCallback,
    ra = Ve.unstable_cancelCallback,
    Cf = Ve.unstable_shouldYield,
    jf = Ve.unstable_requestPaint,
    pe = Ve.unstable_now,
    Nf = Ve.unstable_getCurrentPriorityLevel,
    Ko = Ve.unstable_ImmediatePriority,
    Ku = Ve.unstable_UserBlockingPriority,
    _i = Ve.unstable_NormalPriority,
    Lf = Ve.unstable_LowPriority,
    Xu = Ve.unstable_IdlePriority,
    Yi = null,
    ht = null;
function Rf(e) {
    if (ht && typeof ht.onCommitFiberRoot == "function")
        try {
            ht.onCommitFiberRoot(Yi, e, void 0, (e.current.flags & 128) === 128);
        } catch { }
}
var ot = Math.clz32 ? Math.clz32 : Tf,
    Pf = Math.log,
    zf = Math.LN2;
function Tf(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Pf(e) / zf) | 0)) | 0);
}
var Yr = 64,
    Gr = 4194304;
function sr(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e;
    }
}
function Ci(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        i = e.suspendedLanes,
        l = e.pingedLanes,
        o = n & 268435455;
    if (o !== 0) {
        var a = o & ~i;
        a !== 0 ? (r = sr(a)) : ((l &= o), l !== 0 && (r = sr(l)));
    } else ((o = n & ~i), o !== 0 ? (r = sr(o)) : l !== 0 && (r = sr(l)));
    if (r === 0) return 0;
    if (
        t !== 0 &&
        t !== r &&
        !(t & i) &&
        ((i = r & -r), (l = t & -t), i >= l || (i === 16 && (l & 4194240) !== 0))
    )
        return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t;)
            ((n = 31 - ot(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
    return r;
}
function Of(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1;
    }
}
function Mf(e, t) {
    for (
        var n = e.suspendedLanes,
        r = e.pingedLanes,
        i = e.expirationTimes,
        l = e.pendingLanes;
        0 < l;
    ) {
        var o = 31 - ot(l),
            a = 1 << o,
            s = i[o];
        (s === -1
            ? (!(a & n) || a & r) && (i[o] = Of(a, t))
            : s <= t && (e.expiredLanes |= a),
            (l &= ~a));
    }
}
function no(e) {
    return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
}
function Yu() {
    var e = Yr;
    return ((Yr <<= 1), !(Yr & 4194240) && (Yr = 64), e);
}
function yl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function Ar(e, t, n) {
    ((e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - ot(t)),
        (e[t] = n));
}
function Df(e, t) {
    var n = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements));
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n;) {
        var i = 31 - ot(n),
            l = 1 << i;
        ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~l));
    }
}
function Xo(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n;) {
        var r = 31 - ot(n),
            i = 1 << r;
        ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
    }
}
var Y = 0;
function Gu(e) {
    return (
        (e &= -e),
        1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
}
var Zu,
    Yo,
    qu,
    Ju,
    ec,
    ro = !1,
    Zr = [],
    At = null,
    Ut = null,
    $t = null,
    kr = new Map(),
    Sr = new Map(),
    Ot = [],
    If =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
            " ",
        );
function ia(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            At = null;
            break;
        case "dragenter":
        case "dragleave":
            Ut = null;
            break;
        case "mouseover":
        case "mouseout":
            $t = null;
            break;
        case "pointerover":
        case "pointerout":
            kr.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Sr.delete(t.pointerId);
    }
}
function qn(e, t, n, r, i, l) {
    return e === null || e.nativeEvent !== l
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: l,
            targetContainers: [i],
        }),
            t !== null && ((t = $r(t)), t !== null && Yo(t)),
            e)
        : ((e.eventSystemFlags |= r),
            (t = e.targetContainers),
            i !== null && t.indexOf(i) === -1 && t.push(i),
            e);
}
function Ff(e, t, n, r, i) {
    switch (t) {
        case "focusin":
            return ((At = qn(At, e, t, n, r, i)), !0);
        case "dragenter":
            return ((Ut = qn(Ut, e, t, n, r, i)), !0);
        case "mouseover":
            return (($t = qn($t, e, t, n, r, i)), !0);
        case "pointerover":
            var l = i.pointerId;
            return (kr.set(l, qn(kr.get(l) || null, e, t, n, r, i)), !0);
        case "gotpointercapture":
            return (
                (l = i.pointerId),
                Sr.set(l, qn(Sr.get(l) || null, e, t, n, r, i)),
                !0
            );
    }
    return !1;
}
function tc(e) {
    var t = nn(e.target);
    if (t !== null) {
        var n = hn(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = Wu(n)), t !== null)) {
                    ((e.blockedOn = t),
                        ec(e.priority, function () {
                            qu(n);
                        }));
                    return;
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
            }
        }
    }
    e.blockedOn = null;
}
function di(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
        var n = io(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            ((ql = r), n.target.dispatchEvent(r), (ql = null));
        } else return ((t = $r(n)), t !== null && Yo(t), (e.blockedOn = n), !1);
        t.shift();
    }
    return !0;
}
function la(e, t, n) {
    di(e) && n.delete(t);
}
function Af() {
    ((ro = !1),
        At !== null && di(At) && (At = null),
        Ut !== null && di(Ut) && (Ut = null),
        $t !== null && di($t) && ($t = null),
        kr.forEach(la),
        Sr.forEach(la));
}
function Jn(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null),
            ro ||
            ((ro = !0),
                Ve.unstable_scheduleCallback(Ve.unstable_NormalPriority, Af)));
}
function Er(e) {
    function t(i) {
        return Jn(i, e);
    }
    if (0 < Zr.length) {
        Jn(Zr[0], e);
        for (var n = 1; n < Zr.length; n++) {
            var r = Zr[n];
            r.blockedOn === e && (r.blockedOn = null);
        }
    }
    for (
        At !== null && Jn(At, e),
        Ut !== null && Jn(Ut, e),
        $t !== null && Jn($t, e),
        kr.forEach(t),
        Sr.forEach(t),
        n = 0;
        n < Ot.length;
        n++
    )
        ((r = Ot[n]), r.blockedOn === e && (r.blockedOn = null));
    for (; 0 < Ot.length && ((n = Ot[0]), n.blockedOn === null);)
        (tc(n), n.blockedOn === null && Ot.shift());
}
var Dn = Nt.ReactCurrentBatchConfig,
    ji = !0;
function Uf(e, t, n, r) {
    var i = Y,
        l = Dn.transition;
    Dn.transition = null;
    try {
        ((Y = 1), Go(e, t, n, r));
    } finally {
        ((Y = i), (Dn.transition = l));
    }
}
function $f(e, t, n, r) {
    var i = Y,
        l = Dn.transition;
    Dn.transition = null;
    try {
        ((Y = 4), Go(e, t, n, r));
    } finally {
        ((Y = i), (Dn.transition = l));
    }
}
function Go(e, t, n, r) {
    if (ji) {
        var i = io(e, t, n, r);
        if (i === null) (Ll(e, t, r, Ni, n), ia(e, r));
        else if (Ff(i, e, t, n, r)) r.stopPropagation();
        else if ((ia(e, r), t & 4 && -1 < If.indexOf(e))) {
            for (; i !== null;) {
                var l = $r(i);
                if (
                    (l !== null && Zu(l),
                        (l = io(e, t, n, r)),
                        l === null && Ll(e, t, r, Ni, n),
                        l === i)
                )
                    break;
                i = l;
            }
            i !== null && r.stopPropagation();
        } else Ll(e, t, r, null, n);
    }
}
var Ni = null;
function io(e, t, n, r) {
    if (((Ni = null), (e = Qo(r)), (e = nn(e)), e !== null))
        if (((t = hn(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = Wu(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return ((Ni = e), null);
}
function nc(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (Nf()) {
                case Ko:
                    return 1;
                case Ku:
                    return 4;
                case _i:
                case Lf:
                    return 16;
                case Xu:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var Dt = null,
    Zo = null,
    fi = null;
function rc() {
    if (fi) return fi;
    var e,
        t = Zo,
        n = t.length,
        r,
        i = "value" in Dt ? Dt.value : Dt.textContent,
        l = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === i[l - r]; r++);
    return (fi = i.slice(e, 1 < r ? 1 - r : void 0));
}
function pi(e) {
    var t = e.keyCode;
    return (
        "charCode" in e
            ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
            : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function qr() {
    return !0;
}
function oa() {
    return !1;
}
function Ke(e) {
    function t(n, r, i, l, o) {
        ((this._reactName = n),
            (this._targetInst = i),
            (this.type = r),
            (this.nativeEvent = l),
            (this.target = o),
            (this.currentTarget = null));
        for (var a in e)
            e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(l) : l[a]));
        return (
            (this.isDefaultPrevented = (
                l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
            )
                ? qr
                : oa),
            (this.isPropagationStopped = oa),
            this
        );
    }
    return (
        de(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault
                        ? n.preventDefault()
                        : typeof n.returnValue != "unknown" && (n.returnValue = !1),
                        (this.isDefaultPrevented = qr));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
                        (this.isPropagationStopped = qr));
            },
            persist: function () { },
            isPersistent: qr,
        }),
        t
    );
}
var Qn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
        return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
},
    qo = Ke(Qn),
    Ur = de({}, Qn, { view: 0, detail: 0 }),
    bf = Ke(Ur),
    xl,
    wl,
    er,
    Gi = de({}, Ur, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Jo,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0
                ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                : e.relatedTarget;
        },
        movementX: function (e) {
            return "movementX" in e
                ? e.movementX
                : (e !== er &&
                    (er && e.type === "mousemove"
                        ? ((xl = e.screenX - er.screenX), (wl = e.screenY - er.screenY))
                        : (wl = xl = 0),
                        (er = e)),
                    xl);
        },
        movementY: function (e) {
            return "movementY" in e ? e.movementY : wl;
        },
    }),
    sa = Ke(Gi),
    Bf = de({}, Gi, { dataTransfer: 0 }),
    Wf = Ke(Bf),
    Hf = de({}, Ur, { relatedTarget: 0 }),
    kl = Ke(Hf),
    Vf = de({}, Qn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Qf = Ke(Vf),
    Kf = de({}, Qn, {
        clipboardData: function (e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
    }),
    Xf = Ke(Kf),
    Yf = de({}, Qn, { data: 0 }),
    aa = Ke(Yf),
    Gf = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
    },
    Zf = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
    },
    qf = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
    };
function Jf(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = qf[e]) ? !!t[e] : !1;
}
function Jo() {
    return Jf;
}
var ep = de({}, Ur, {
    key: function (e) {
        if (e.key) {
            var t = Gf[e.key] || e.key;
            if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
            ? ((e = pi(e)), e === 13 ? "Enter" : String.fromCharCode(e))
            : e.type === "keydown" || e.type === "keyup"
                ? Zf[e.keyCode] || "Unidentified"
                : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Jo,
    charCode: function (e) {
        return e.type === "keypress" ? pi(e) : 0;
    },
    keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
        return e.type === "keypress"
            ? pi(e)
            : e.type === "keydown" || e.type === "keyup"
                ? e.keyCode
                : 0;
    },
}),
    tp = Ke(ep),
    np = de({}, Gi, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
    }),
    ua = Ke(np),
    rp = de({}, Ur, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Jo,
    }),
    ip = Ke(rp),
    lp = de({}, Qn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    op = Ke(lp),
    sp = de({}, Gi, {
        deltaX: function (e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
        },
        deltaY: function (e) {
            return "deltaY" in e
                ? e.deltaY
                : "wheelDeltaY" in e
                    ? -e.wheelDeltaY
                    : "wheelDelta" in e
                        ? -e.wheelDelta
                        : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
    }),
    ap = Ke(sp),
    up = [9, 13, 27, 32],
    es = Et && "CompositionEvent" in window,
    dr = null;
Et && "documentMode" in document && (dr = document.documentMode);
var cp = Et && "TextEvent" in window && !dr,
    ic = Et && (!es || (dr && 8 < dr && 11 >= dr)),
    ca = " ",
    da = !1;
function lc(e, t) {
    switch (e) {
        case "keyup":
            return up.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1;
    }
}
function oc(e) {
    return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Sn = !1;
function dp(e, t) {
    switch (e) {
        case "compositionend":
            return oc(t);
        case "keypress":
            return t.which !== 32 ? null : ((da = !0), ca);
        case "textInput":
            return ((e = t.data), e === ca && da ? null : e);
        default:
            return null;
    }
}
function fp(e, t) {
    if (Sn)
        return e === "compositionend" || (!es && lc(e, t))
            ? ((e = rc()), (fi = Zo = Dt = null), (Sn = !1), e)
            : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
            }
            return null;
        case "compositionend":
            return ic && t.locale !== "ko" ? null : t.data;
        default:
            return null;
    }
}
var pp = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
};
function fa(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!pp[e.type] : t === "textarea";
}
function sc(e, t, n, r) {
    (Au(r),
        (t = Li(t, "onChange")),
        0 < t.length &&
        ((n = new qo("onChange", "change", null, n, r)),
            e.push({ event: n, listeners: t })));
}
var fr = null,
    _r = null;
function hp(e) {
    yc(e, 0);
}
function Zi(e) {
    var t = Cn(e);
    if (zu(t)) return e;
}
function mp(e, t) {
    if (e === "change") return t;
}
var ac = !1;
if (Et) {
    var Sl;
    if (Et) {
        var El = "oninput" in document;
        if (!El) {
            var pa = document.createElement("div");
            (pa.setAttribute("oninput", "return;"),
                (El = typeof pa.oninput == "function"));
        }
        Sl = El;
    } else Sl = !1;
    ac = Sl && (!document.documentMode || 9 < document.documentMode);
}
function ha() {
    fr && (fr.detachEvent("onpropertychange", uc), (_r = fr = null));
}
function uc(e) {
    if (e.propertyName === "value" && Zi(_r)) {
        var t = [];
        (sc(t, _r, e, Qo(e)), Bu(hp, t));
    }
}
function vp(e, t, n) {
    e === "focusin"
        ? (ha(), (fr = t), (_r = n), fr.attachEvent("onpropertychange", uc))
        : e === "focusout" && ha();
}
function gp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Zi(_r);
}
function yp(e, t) {
    if (e === "click") return Zi(t);
}
function xp(e, t) {
    if (e === "input" || e === "change") return Zi(t);
}
function wp(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var at = typeof Object.is == "function" ? Object.is : wp;
function Cr(e, t) {
    if (at(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!$l.call(t, i) || !at(e[i], t[i])) return !1;
    }
    return !0;
}
function ma(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e;
}
function va(e, t) {
    var n = ma(e);
    e = 0;
    for (var r; n;) {
        if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t))
                return { node: n, offset: t - e };
            e = r;
        }
        e: {
            for (; n;) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e;
                }
                n = n.parentNode;
            }
            n = void 0;
        }
        n = ma(n);
    }
}
function cc(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
                ? !1
                : t && t.nodeType === 3
                    ? cc(e, t.parentNode)
                    : "contains" in e
                        ? e.contains(t)
                        : e.compareDocumentPosition
                            ? !!(e.compareDocumentPosition(t) & 16)
                            : !1
        : !1;
}
function dc() {
    for (var e = window, t = ki(); t instanceof e.HTMLIFrameElement;) {
        try {
            var n = typeof t.contentWindow.location.href == "string";
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = ki(e.document);
    }
    return t;
}
function ts(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
        t &&
        ((t === "input" &&
            (e.type === "text" ||
                e.type === "search" ||
                e.type === "tel" ||
                e.type === "url" ||
                e.type === "password")) ||
            t === "textarea" ||
            e.contentEditable === "true")
    );
}
function kp(e) {
    var t = dc(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (
        t !== n &&
        n &&
        n.ownerDocument &&
        cc(n.ownerDocument.documentElement, n)
    ) {
        if (r !== null && ts(n)) {
            if (
                ((t = r.start),
                    (e = r.end),
                    e === void 0 && (e = t),
                    "selectionStart" in n)
            )
                ((n.selectionStart = t),
                    (n.selectionEnd = Math.min(e, n.value.length)));
            else if (
                ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
                    e.getSelection)
            ) {
                e = e.getSelection();
                var i = n.textContent.length,
                    l = Math.min(r.start, i);
                ((r = r.end === void 0 ? l : Math.min(r.end, i)),
                    !e.extend && l > r && ((i = r), (r = l), (l = i)),
                    (i = va(n, l)));
                var o = va(n, r);
                i &&
                    o &&
                    (e.rangeCount !== 1 ||
                        e.anchorNode !== i.node ||
                        e.anchorOffset !== i.offset ||
                        e.focusNode !== o.node ||
                        e.focusOffset !== o.offset) &&
                    ((t = t.createRange()),
                        t.setStart(i.node, i.offset),
                        e.removeAllRanges(),
                        l > r
                            ? (e.addRange(t), e.extend(o.node, o.offset))
                            : (t.setEnd(o.node, o.offset), e.addRange(t)));
            }
        }
        for (t = [], e = n; (e = e.parentNode);)
            e.nodeType === 1 &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
            ((e = t[n]),
                (e.element.scrollLeft = e.left),
                (e.element.scrollTop = e.top));
    }
}
var Sp = Et && "documentMode" in document && 11 >= document.documentMode,
    En = null,
    lo = null,
    pr = null,
    oo = !1;
function ga(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    oo ||
        En == null ||
        En !== ki(r) ||
        ((r = En),
            "selectionStart" in r && ts(r)
                ? (r = { start: r.selectionStart, end: r.selectionEnd })
                : ((r = (
                    (r.ownerDocument && r.ownerDocument.defaultView) ||
                    window
                ).getSelection()),
                    (r = {
                        anchorNode: r.anchorNode,
                        anchorOffset: r.anchorOffset,
                        focusNode: r.focusNode,
                        focusOffset: r.focusOffset,
                    })),
            (pr && Cr(pr, r)) ||
            ((pr = r),
                (r = Li(lo, "onSelect")),
                0 < r.length &&
                ((t = new qo("onSelect", "select", null, t, n)),
                    e.push({ event: t, listeners: r }),
                    (t.target = En))));
}
function Jr(e, t) {
    var n = {};
    return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
    );
}
var _n = {
    animationend: Jr("Animation", "AnimationEnd"),
    animationiteration: Jr("Animation", "AnimationIteration"),
    animationstart: Jr("Animation", "AnimationStart"),
    transitionend: Jr("Transition", "TransitionEnd"),
},
    _l = {},
    fc = {};
Et &&
    ((fc = document.createElement("div").style),
        "AnimationEvent" in window ||
        (delete _n.animationend.animation,
            delete _n.animationiteration.animation,
            delete _n.animationstart.animation),
        "TransitionEvent" in window || delete _n.transitionend.transition);
function qi(e) {
    if (_l[e]) return _l[e];
    if (!_n[e]) return e;
    var t = _n[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in fc) return (_l[e] = t[n]);
    return e;
}
var pc = qi("animationend"),
    hc = qi("animationiteration"),
    mc = qi("animationstart"),
    vc = qi("transitionend"),
    gc = new Map(),
    ya =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
            " ",
        );
function Yt(e, t) {
    (gc.set(e, t), pn(t, [e]));
}
for (var Cl = 0; Cl < ya.length; Cl++) {
    var jl = ya[Cl],
        Ep = jl.toLowerCase(),
        _p = jl[0].toUpperCase() + jl.slice(1);
    Yt(Ep, "on" + _p);
}
Yt(pc, "onAnimationEnd");
Yt(hc, "onAnimationIteration");
Yt(mc, "onAnimationStart");
Yt("dblclick", "onDoubleClick");
Yt("focusin", "onFocus");
Yt("focusout", "onBlur");
Yt(vc, "onTransitionEnd");
An("onMouseEnter", ["mouseout", "mouseover"]);
An("onMouseLeave", ["mouseout", "mouseover"]);
An("onPointerEnter", ["pointerout", "pointerover"]);
An("onPointerLeave", ["pointerout", "pointerover"]);
pn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
    ),
);
pn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
    ),
);
pn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
pn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
pn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
pn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var ar =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
    ),
    Cp = new Set("cancel close invalid load scroll toggle".split(" ").concat(ar));
function xa(e, t, n) {
    var r = e.type || "unknown-event";
    ((e.currentTarget = n), Ef(r, t, void 0, e), (e.currentTarget = null));
}
function yc(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            i = r.event;
        r = r.listeners;
        e: {
            var l = void 0;
            if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                    var a = r[o],
                        s = a.instance,
                        f = a.currentTarget;
                    if (((a = a.listener), s !== l && i.isPropagationStopped())) break e;
                    (xa(i, a, f), (l = s));
                }
            else
                for (o = 0; o < r.length; o++) {
                    if (
                        ((a = r[o]),
                            (s = a.instance),
                            (f = a.currentTarget),
                            (a = a.listener),
                            s !== l && i.isPropagationStopped())
                    )
                        break e;
                    (xa(i, a, f), (l = s));
                }
        }
    }
    if (Ei) throw ((e = to), (Ei = !1), (to = null), e);
}
function re(e, t) {
    var n = t[fo];
    n === void 0 && (n = t[fo] = new Set());
    var r = e + "__bubble";
    n.has(r) || (xc(t, e, 2, !1), n.add(r));
}
function Nl(e, t, n) {
    var r = 0;
    (t && (r |= 4), xc(n, e, r, t));
}
var ei = "_reactListening" + Math.random().toString(36).slice(2);
function jr(e) {
    if (!e[ei]) {
        ((e[ei] = !0),
            ju.forEach(function (n) {
                n !== "selectionchange" && (Cp.has(n) || Nl(n, !1, e), Nl(n, !0, e));
            }));
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[ei] || ((t[ei] = !0), Nl("selectionchange", !1, t));
    }
}
function xc(e, t, n, r) {
    switch (nc(t)) {
        case 1:
            var i = Uf;
            break;
        case 4:
            i = $f;
            break;
        default:
            i = Go;
    }
    ((n = i.bind(null, t, n, e)),
        (i = void 0),
        !eo ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (i = !0),
        r
            ? i !== void 0
                ? e.addEventListener(t, n, { capture: !0, passive: i })
                : e.addEventListener(t, n, !0)
            : i !== void 0
                ? e.addEventListener(t, n, { passive: i })
                : e.addEventListener(t, n, !1));
}
function Ll(e, t, n, r, i) {
    var l = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (; ;) {
            if (r === null) return;
            var o = r.tag;
            if (o === 3 || o === 4) {
                var a = r.stateNode.containerInfo;
                if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
                if (o === 4)
                    for (o = r.return; o !== null;) {
                        var s = o.tag;
                        if (
                            (s === 3 || s === 4) &&
                            ((s = o.stateNode.containerInfo),
                                s === i || (s.nodeType === 8 && s.parentNode === i))
                        )
                            return;
                        o = o.return;
                    }
                for (; a !== null;) {
                    if (((o = nn(a)), o === null)) return;
                    if (((s = o.tag), s === 5 || s === 6)) {
                        r = l = o;
                        continue e;
                    }
                    a = a.parentNode;
                }
            }
            r = r.return;
        }
    Bu(function () {
        var f = l,
            g = Qo(n),
            v = [];
        e: {
            var x = gc.get(e);
            if (x !== void 0) {
                var w = qo,
                    _ = e;
                switch (e) {
                    case "keypress":
                        if (pi(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        w = tp;
                        break;
                    case "focusin":
                        ((_ = "focus"), (w = kl));
                        break;
                    case "focusout":
                        ((_ = "blur"), (w = kl));
                        break;
                    case "beforeblur":
                    case "afterblur":
                        w = kl;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        w = sa;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        w = Wf;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        w = ip;
                        break;
                    case pc:
                    case hc:
                    case mc:
                        w = Qf;
                        break;
                    case vc:
                        w = op;
                        break;
                    case "scroll":
                        w = bf;
                        break;
                    case "wheel":
                        w = ap;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        w = Xf;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        w = ua;
                }
                var C = (t & 4) !== 0,
                    j = !C && e === "scroll",
                    h = C ? (x !== null ? x + "Capture" : null) : x;
                C = [];
                for (var p = f, m; p !== null;) {
                    m = p;
                    var k = m.stateNode;
                    if (
                        (m.tag === 5 &&
                            k !== null &&
                            ((m = k),
                                h !== null && ((k = wr(p, h)), k != null && C.push(Nr(p, k, m)))),
                            j)
                    )
                        break;
                    p = p.return;
                }
                0 < C.length &&
                    ((x = new w(x, _, null, n, g)), v.push({ event: x, listeners: C }));
            }
        }
        if (!(t & 7)) {
            e: {
                if (
                    ((x = e === "mouseover" || e === "pointerover"),
                        (w = e === "mouseout" || e === "pointerout"),
                        x &&
                        n !== ql &&
                        (_ = n.relatedTarget || n.fromElement) &&
                        (nn(_) || _[_t]))
                )
                    break e;
                if (
                    (w || x) &&
                    ((x =
                        g.window === g
                            ? g
                            : (x = g.ownerDocument)
                                ? x.defaultView || x.parentWindow
                                : window),
                        w
                            ? ((_ = n.relatedTarget || n.toElement),
                                (w = f),
                                (_ = _ ? nn(_) : null),
                                _ !== null &&
                                ((j = hn(_)), _ !== j || (_.tag !== 5 && _.tag !== 6)) &&
                                (_ = null))
                            : ((w = null), (_ = f)),
                        w !== _)
                ) {
                    if (
                        ((C = sa),
                            (k = "onMouseLeave"),
                            (h = "onMouseEnter"),
                            (p = "mouse"),
                            (e === "pointerout" || e === "pointerover") &&
                            ((C = ua),
                                (k = "onPointerLeave"),
                                (h = "onPointerEnter"),
                                (p = "pointer")),
                            (j = w == null ? x : Cn(w)),
                            (m = _ == null ? x : Cn(_)),
                            (x = new C(k, p + "leave", w, n, g)),
                            (x.target = j),
                            (x.relatedTarget = m),
                            (k = null),
                            nn(g) === f &&
                            ((C = new C(h, p + "enter", _, n, g)),
                                (C.target = m),
                                (C.relatedTarget = j),
                                (k = C)),
                            (j = k),
                            w && _)
                    )
                        t: {
                            for (C = w, h = _, p = 0, m = C; m; m = xn(m)) p++;
                            for (m = 0, k = h; k; k = xn(k)) m++;
                            for (; 0 < p - m;) ((C = xn(C)), p--);
                            for (; 0 < m - p;) ((h = xn(h)), m--);
                            for (; p--;) {
                                if (C === h || (h !== null && C === h.alternate)) break t;
                                ((C = xn(C)), (h = xn(h)));
                            }
                            C = null;
                        }
                    else C = null;
                    (w !== null && wa(v, x, w, C, !1),
                        _ !== null && j !== null && wa(v, j, _, C, !0));
                }
            }
            e: {
                if (
                    ((x = f ? Cn(f) : window),
                        (w = x.nodeName && x.nodeName.toLowerCase()),
                        w === "select" || (w === "input" && x.type === "file"))
                )
                    var P = mp;
                else if (fa(x))
                    if (ac) P = xp;
                    else {
                        P = gp;
                        var R = vp;
                    }
                else
                    (w = x.nodeName) &&
                        w.toLowerCase() === "input" &&
                        (x.type === "checkbox" || x.type === "radio") &&
                        (P = yp);
                if (P && (P = P(e, f))) {
                    sc(v, P, n, g);
                    break e;
                }
                (R && R(e, x, f),
                    e === "focusout" &&
                    (R = x._wrapperState) &&
                    R.controlled &&
                    x.type === "number" &&
                    Kl(x, "number", x.value));
            }
            switch (((R = f ? Cn(f) : window), e)) {
                case "focusin":
                    (fa(R) || R.contentEditable === "true") &&
                        ((En = R), (lo = f), (pr = null));
                    break;
                case "focusout":
                    pr = lo = En = null;
                    break;
                case "mousedown":
                    oo = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    ((oo = !1), ga(v, n, g));
                    break;
                case "selectionchange":
                    if (Sp) break;
                case "keydown":
                case "keyup":
                    ga(v, n, g);
            }
            var N;
            if (es)
                e: {
                    switch (e) {
                        case "compositionstart":
                            var u = "onCompositionStart";
                            break e;
                        case "compositionend":
                            u = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            u = "onCompositionUpdate";
                            break e;
                    }
                    u = void 0;
                }
            else
                Sn
                    ? lc(e, n) && (u = "onCompositionEnd")
                    : e === "keydown" && n.keyCode === 229 && (u = "onCompositionStart");
            (u &&
                (ic &&
                    n.locale !== "ko" &&
                    (Sn || u !== "onCompositionStart"
                        ? u === "onCompositionEnd" && Sn && (N = rc())
                        : ((Dt = g),
                            (Zo = "value" in Dt ? Dt.value : Dt.textContent),
                            (Sn = !0))),
                    (R = Li(f, u)),
                    0 < R.length &&
                    ((u = new aa(u, e, null, n, g)),
                        v.push({ event: u, listeners: R }),
                        N ? (u.data = N) : ((N = oc(n)), N !== null && (u.data = N)))),
                (N = cp ? dp(e, n) : fp(e, n)) &&
                ((f = Li(f, "onBeforeInput")),
                    0 < f.length &&
                    ((g = new aa("onBeforeInput", "beforeinput", null, n, g)),
                        v.push({ event: g, listeners: f }),
                        (g.data = N))));
        }
        yc(v, t);
    });
}
function Nr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function Li(e, t) {
    for (var n = t + "Capture", r = []; e !== null;) {
        var i = e,
            l = i.stateNode;
        (i.tag === 5 &&
            l !== null &&
            ((i = l),
                (l = wr(e, n)),
                l != null && r.unshift(Nr(e, l, i)),
                (l = wr(e, t)),
                l != null && r.push(Nr(e, l, i))),
            (e = e.return));
    }
    return r;
}
function xn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function wa(e, t, n, r, i) {
    for (var l = t._reactName, o = []; n !== null && n !== r;) {
        var a = n,
            s = a.alternate,
            f = a.stateNode;
        if (s !== null && s === r) break;
        (a.tag === 5 &&
            f !== null &&
            ((a = f),
                i
                    ? ((s = wr(n, l)), s != null && o.unshift(Nr(n, s, a)))
                    : i || ((s = wr(n, l)), s != null && o.push(Nr(n, s, a)))),
            (n = n.return));
    }
    o.length !== 0 && e.push({ event: t, listeners: o });
}
var jp = /\r\n?/g,
    Np = /\u0000|\uFFFD/g;
function ka(e) {
    return (typeof e == "string" ? e : "" + e)
        .replace(
            jp,
            `
  `,
        )
        .replace(Np, "");
}
function ti(e, t, n) {
    if (((t = ka(t)), ka(e) !== t && n)) throw Error(L(425));
}
function Ri() { }
var so = null,
    ao = null;
function uo(e, t) {
    return (
        e === "textarea" ||
        e === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
    );
}
var co = typeof setTimeout == "function" ? setTimeout : void 0,
    Lp = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Sa = typeof Promise == "function" ? Promise : void 0,
    Rp =
        typeof queueMicrotask == "function"
            ? queueMicrotask
            : typeof Sa < "u"
                ? function (e) {
                    return Sa.resolve(null).then(e).catch(Pp);
                }
                : co;
function Pp(e) {
    setTimeout(function () {
        throw e;
    });
}
function Rl(e, t) {
    var n = t,
        r = 0;
    do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8))
            if (((n = i.data), n === "/$")) {
                if (r === 0) {
                    (e.removeChild(i), Er(t));
                    return;
                }
                r--;
            } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
        n = i;
    } while (n);
    Er(t);
}
function bt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
            if (t === "/$") return null;
        }
    }
    return e;
}
function Ea(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--;
            } else n === "/$" && t++;
        }
        e = e.previousSibling;
    }
    return null;
}
var Kn = Math.random().toString(36).slice(2),
    pt = "__reactFiber$" + Kn,
    Lr = "__reactProps$" + Kn,
    _t = "__reactContainer$" + Kn,
    fo = "__reactEvents$" + Kn,
    zp = "__reactListeners$" + Kn,
    Tp = "__reactHandles$" + Kn;
function nn(e) {
    var t = e[pt];
    if (t) return t;
    for (var n = e.parentNode; n;) {
        if ((t = n[_t] || n[pt])) {
            if (
                ((n = t.alternate),
                    t.child !== null || (n !== null && n.child !== null))
            )
                for (e = Ea(e); e !== null;) {
                    if ((n = e[pt])) return n;
                    e = Ea(e);
                }
            return t;
        }
        ((e = n), (n = e.parentNode));
    }
    return null;
}
function $r(e) {
    return (
        (e = e[pt] || e[_t]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
    );
}
function Cn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(L(33));
}
function Ji(e) {
    return e[Lr] || null;
}
var po = [],
    jn = -1;
function Gt(e) {
    return { current: e };
}
function ie(e) {
    0 > jn || ((e.current = po[jn]), (po[jn] = null), jn--);
}
function ee(e, t) {
    (jn++, (po[jn] = e.current), (e.current = t));
}
var Xt = {},
    ze = Gt(Xt),
    Ue = Gt(!1),
    an = Xt;
function Un(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Xt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var i = {},
        l;
    for (l in n) i[l] = t[l];
    return (
        r &&
        ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = i)),
        i
    );
}
function $e(e) {
    return ((e = e.childContextTypes), e != null);
}
function Pi() {
    (ie(Ue), ie(ze));
}
function _a(e, t, n) {
    if (ze.current !== Xt) throw Error(L(168));
    (ee(ze, t), ee(Ue, n));
}
function wc(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
        return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(L(108, vf(e) || "Unknown", i));
    return de({}, n, r);
}
function zi(e) {
    return (
        (e =
            ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Xt),
        (an = ze.current),
        ee(ze, e),
        ee(Ue, Ue.current),
        !0
    );
}
function Ca(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(L(169));
    (n
        ? ((e = wc(e, t, an)),
            (r.__reactInternalMemoizedMergedChildContext = e),
            ie(Ue),
            ie(ze),
            ee(ze, e))
        : ie(Ue),
        ee(Ue, n));
}
var xt = null,
    el = !1,
    Pl = !1;
function kc(e) {
    xt === null ? (xt = [e]) : xt.push(e);
}
function Op(e) {
    ((el = !0), kc(e));
}
function Zt() {
    if (!Pl && xt !== null) {
        Pl = !0;
        var e = 0,
            t = Y;
        try {
            var n = xt;
            for (Y = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null);
            }
            ((xt = null), (el = !1));
        } catch (i) {
            throw (xt !== null && (xt = xt.slice(e + 1)), Qu(Ko, Zt), i);
        } finally {
            ((Y = t), (Pl = !1));
        }
    }
    return null;
}
var Nn = [],
    Ln = 0,
    Ti = null,
    Oi = 0,
    Ye = [],
    Ge = 0,
    un = null,
    wt = 1,
    kt = "";
function en(e, t) {
    ((Nn[Ln++] = Oi), (Nn[Ln++] = Ti), (Ti = e), (Oi = t));
}
function Sc(e, t, n) {
    ((Ye[Ge++] = wt), (Ye[Ge++] = kt), (Ye[Ge++] = un), (un = e));
    var r = wt;
    e = kt;
    var i = 32 - ot(r) - 1;
    ((r &= ~(1 << i)), (n += 1));
    var l = 32 - ot(t) + i;
    if (30 < l) {
        var o = i - (i % 5);
        ((l = (r & ((1 << o) - 1)).toString(32)),
            (r >>= o),
            (i -= o),
            (wt = (1 << (32 - ot(t) + i)) | (n << i) | r),
            (kt = l + e));
    } else ((wt = (1 << l) | (n << i) | r), (kt = e));
}
function ns(e) {
    e.return !== null && (en(e, 1), Sc(e, 1, 0));
}
function rs(e) {
    for (; e === Ti;)
        ((Ti = Nn[--Ln]), (Nn[Ln] = null), (Oi = Nn[--Ln]), (Nn[Ln] = null));
    for (; e === un;)
        ((un = Ye[--Ge]),
            (Ye[Ge] = null),
            (kt = Ye[--Ge]),
            (Ye[Ge] = null),
            (wt = Ye[--Ge]),
            (Ye[Ge] = null));
}
var He = null,
    We = null,
    le = !1,
    lt = null;
function Ec(e, t) {
    var n = Ze(5, null, null, 0);
    ((n.elementType = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function ja(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return (
                (t =
                    t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
                        ? null
                        : t),
                t !== null
                    ? ((e.stateNode = t), (He = e), (We = bt(t.firstChild)), !0)
                    : !1
            );
        case 6:
            return (
                (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (He = e), (We = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = un !== null ? { id: wt, overflow: kt } : null),
                        (e.memoizedState = {
                            dehydrated: t,
                            treeContext: n,
                            retryLane: 1073741824,
                        }),
                        (n = Ze(18, null, null, 0)),
                        (n.stateNode = t),
                        (n.return = e),
                        (e.child = n),
                        (He = e),
                        (We = null),
                        !0)
                    : !1
            );
        default:
            return !1;
    }
}
function ho(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function mo(e) {
    if (le) {
        var t = We;
        if (t) {
            var n = t;
            if (!ja(e, t)) {
                if (ho(e)) throw Error(L(418));
                t = bt(n.nextSibling);
                var r = He;
                t && ja(e, t)
                    ? Ec(r, n)
                    : ((e.flags = (e.flags & -4097) | 2), (le = !1), (He = e));
            }
        } else {
            if (ho(e)) throw Error(L(418));
            ((e.flags = (e.flags & -4097) | 2), (le = !1), (He = e));
        }
    }
}
function Na(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)
        e = e.return;
    He = e;
}
function ni(e) {
    if (e !== He) return !1;
    if (!le) return (Na(e), (le = !0), !1);
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type),
                (t = t !== "head" && t !== "body" && !uo(e.type, e.memoizedProps))),
            t && (t = We))
    ) {
        if (ho(e)) throw (_c(), Error(L(418)));
        for (; t;) (Ec(e, t), (t = bt(t.nextSibling)));
    }
    if ((Na(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
            throw Error(L(317));
        e: {
            for (e = e.nextSibling, t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            We = bt(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
                }
                e = e.nextSibling;
            }
            We = null;
        }
    } else We = He ? bt(e.stateNode.nextSibling) : null;
    return !0;
}
function _c() {
    for (var e = We; e;) e = bt(e.nextSibling);
}
function $n() {
    ((We = He = null), (le = !1));
}
function is(e) {
    lt === null ? (lt = [e]) : lt.push(e);
}
var Mp = Nt.ReactCurrentBatchConfig;
function tr(e, t, n) {
    if (
        ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
    ) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(L(309));
                var r = n.stateNode;
            }
            if (!r) throw Error(L(147, e));
            var i = r,
                l = "" + e;
            return t !== null &&
                t.ref !== null &&
                typeof t.ref == "function" &&
                t.ref._stringRef === l
                ? t.ref
                : ((t = function (o) {
                    var a = i.refs;
                    o === null ? delete a[l] : (a[l] = o);
                }),
                    (t._stringRef = l),
                    t);
        }
        if (typeof e != "string") throw Error(L(284));
        if (!n._owner) throw Error(L(290, e));
    }
    return e;
}
function ri(e, t) {
    throw (
        (e = Object.prototype.toString.call(t)),
        Error(
            L(
                31,
                e === "[object Object]"
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : e,
            ),
        )
    );
}
function La(e) {
    var t = e._init;
    return t(e._payload);
}
function Cc(e) {
    function t(h, p) {
        if (e) {
            var m = h.deletions;
            m === null ? ((h.deletions = [p]), (h.flags |= 16)) : m.push(p);
        }
    }
    function n(h, p) {
        if (!e) return null;
        for (; p !== null;) (t(h, p), (p = p.sibling));
        return null;
    }
    function r(h, p) {
        for (h = new Map(); p !== null;)
            (p.key !== null ? h.set(p.key, p) : h.set(p.index, p), (p = p.sibling));
        return h;
    }
    function i(h, p) {
        return ((h = Vt(h, p)), (h.index = 0), (h.sibling = null), h);
    }
    function l(h, p, m) {
        return (
            (h.index = m),
            e
                ? ((m = h.alternate),
                    m !== null
                        ? ((m = m.index), m < p ? ((h.flags |= 2), p) : m)
                        : ((h.flags |= 2), p))
                : ((h.flags |= 1048576), p)
        );
    }
    function o(h) {
        return (e && h.alternate === null && (h.flags |= 2), h);
    }
    function a(h, p, m, k) {
        return p === null || p.tag !== 6
            ? ((p = Fl(m, h.mode, k)), (p.return = h), p)
            : ((p = i(p, m)), (p.return = h), p);
    }
    function s(h, p, m, k) {
        var P = m.type;
        return P === kn
            ? g(h, p, m.props.children, k, m.key)
            : p !== null &&
                (p.elementType === P ||
                    (typeof P == "object" &&
                        P !== null &&
                        P.$$typeof === zt &&
                        La(P) === p.type))
                ? ((k = i(p, m.props)), (k.ref = tr(h, p, m)), (k.return = h), k)
                : ((k = wi(m.type, m.key, m.props, null, h.mode, k)),
                    (k.ref = tr(h, p, m)),
                    (k.return = h),
                    k);
    }
    function f(h, p, m, k) {
        return p === null ||
            p.tag !== 4 ||
            p.stateNode.containerInfo !== m.containerInfo ||
            p.stateNode.implementation !== m.implementation
            ? ((p = Al(m, h.mode, k)), (p.return = h), p)
            : ((p = i(p, m.children || [])), (p.return = h), p);
    }
    function g(h, p, m, k, P) {
        return p === null || p.tag !== 7
            ? ((p = sn(m, h.mode, k, P)), (p.return = h), p)
            : ((p = i(p, m)), (p.return = h), p);
    }
    function v(h, p, m) {
        if ((typeof p == "string" && p !== "") || typeof p == "number")
            return ((p = Fl("" + p, h.mode, m)), (p.return = h), p);
        if (typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
                case Qr:
                    return (
                        (m = wi(p.type, p.key, p.props, null, h.mode, m)),
                        (m.ref = tr(h, null, p)),
                        (m.return = h),
                        m
                    );
                case wn:
                    return ((p = Al(p, h.mode, m)), (p.return = h), p);
                case zt:
                    var k = p._init;
                    return v(h, k(p._payload), m);
            }
            if (or(p) || Gn(p))
                return ((p = sn(p, h.mode, m, null)), (p.return = h), p);
            ri(h, p);
        }
        return null;
    }
    function x(h, p, m, k) {
        var P = p !== null ? p.key : null;
        if ((typeof m == "string" && m !== "") || typeof m == "number")
            return P !== null ? null : a(h, p, "" + m, k);
        if (typeof m == "object" && m !== null) {
            switch (m.$$typeof) {
                case Qr:
                    return m.key === P ? s(h, p, m, k) : null;
                case wn:
                    return m.key === P ? f(h, p, m, k) : null;
                case zt:
                    return ((P = m._init), x(h, p, P(m._payload), k));
            }
            if (or(m) || Gn(m)) return P !== null ? null : g(h, p, m, k, null);
            ri(h, m);
        }
        return null;
    }
    function w(h, p, m, k, P) {
        if ((typeof k == "string" && k !== "") || typeof k == "number")
            return ((h = h.get(m) || null), a(p, h, "" + k, P));
        if (typeof k == "object" && k !== null) {
            switch (k.$$typeof) {
                case Qr:
                    return (
                        (h = h.get(k.key === null ? m : k.key) || null),
                        s(p, h, k, P)
                    );
                case wn:
                    return (
                        (h = h.get(k.key === null ? m : k.key) || null),
                        f(p, h, k, P)
                    );
                case zt:
                    var R = k._init;
                    return w(h, p, m, R(k._payload), P);
            }
            if (or(k) || Gn(k)) return ((h = h.get(m) || null), g(p, h, k, P, null));
            ri(p, k);
        }
        return null;
    }
    function _(h, p, m, k) {
        for (
            var P = null, R = null, N = p, u = (p = 0), c = null;
            N !== null && u < m.length;
            u++
        ) {
            N.index > u ? ((c = N), (N = null)) : (c = N.sibling);
            var y = x(h, N, m[u], k);
            if (y === null) {
                N === null && (N = c);
                break;
            }
            (e && N && y.alternate === null && t(h, N),
                (p = l(y, p, u)),
                R === null ? (P = y) : (R.sibling = y),
                (R = y),
                (N = c));
        }
        if (u === m.length) return (n(h, N), le && en(h, u), P);
        if (N === null) {
            for (; u < m.length; u++)
                ((N = v(h, m[u], k)),
                    N !== null &&
                    ((p = l(N, p, u)),
                        R === null ? (P = N) : (R.sibling = N),
                        (R = N)));
            return (le && en(h, u), P);
        }
        for (N = r(h, N); u < m.length; u++)
            ((c = w(N, h, u, m[u], k)),
                c !== null &&
                (e && c.alternate !== null && N.delete(c.key === null ? u : c.key),
                    (p = l(c, p, u)),
                    R === null ? (P = c) : (R.sibling = c),
                    (R = c)));
        return (
            e &&
            N.forEach(function (z) {
                return t(h, z);
            }),
            le && en(h, u),
            P
        );
    }
    function C(h, p, m, k) {
        var P = Gn(m);
        if (typeof P != "function") throw Error(L(150));
        if (((m = P.call(m)), m == null)) throw Error(L(151));
        for (
            var R = (P = null), N = p, u = (p = 0), c = null, y = m.next();
            N !== null && !y.done;
            u++, y = m.next()
        ) {
            N.index > u ? ((c = N), (N = null)) : (c = N.sibling);
            var z = x(h, N, y.value, k);
            if (z === null) {
                N === null && (N = c);
                break;
            }
            (e && N && z.alternate === null && t(h, N),
                (p = l(z, p, u)),
                R === null ? (P = z) : (R.sibling = z),
                (R = z),
                (N = c));
        }
        if (y.done) return (n(h, N), le && en(h, u), P);
        if (N === null) {
            for (; !y.done; u++, y = m.next())
                ((y = v(h, y.value, k)),
                    y !== null &&
                    ((p = l(y, p, u)),
                        R === null ? (P = y) : (R.sibling = y),
                        (R = y)));
            return (le && en(h, u), P);
        }
        for (N = r(h, N); !y.done; u++, y = m.next())
            ((y = w(N, h, u, y.value, k)),
                y !== null &&
                (e && y.alternate !== null && N.delete(y.key === null ? u : y.key),
                    (p = l(y, p, u)),
                    R === null ? (P = y) : (R.sibling = y),
                    (R = y)));
        return (
            e &&
            N.forEach(function (M) {
                return t(h, M);
            }),
            le && en(h, u),
            P
        );
    }
    function j(h, p, m, k) {
        if (
            (typeof m == "object" &&
                m !== null &&
                m.type === kn &&
                m.key === null &&
                (m = m.props.children),
                typeof m == "object" && m !== null)
        ) {
            switch (m.$$typeof) {
                case Qr:
                    e: {
                        for (var P = m.key, R = p; R !== null;) {
                            if (R.key === P) {
                                if (((P = m.type), P === kn)) {
                                    if (R.tag === 7) {
                                        (n(h, R.sibling),
                                            (p = i(R, m.props.children)),
                                            (p.return = h),
                                            (h = p));
                                        break e;
                                    }
                                } else if (
                                    R.elementType === P ||
                                    (typeof P == "object" &&
                                        P !== null &&
                                        P.$$typeof === zt &&
                                        La(P) === R.type)
                                ) {
                                    (n(h, R.sibling),
                                        (p = i(R, m.props)),
                                        (p.ref = tr(h, R, m)),
                                        (p.return = h),
                                        (h = p));
                                    break e;
                                }
                                n(h, R);
                                break;
                            } else t(h, R);
                            R = R.sibling;
                        }
                        m.type === kn
                            ? ((p = sn(m.props.children, h.mode, k, m.key)),
                                (p.return = h),
                                (h = p))
                            : ((k = wi(m.type, m.key, m.props, null, h.mode, k)),
                                (k.ref = tr(h, p, m)),
                                (k.return = h),
                                (h = k));
                    }
                    return o(h);
                case wn:
                    e: {
                        for (R = m.key; p !== null;) {
                            if (p.key === R)
                                if (
                                    p.tag === 4 &&
                                    p.stateNode.containerInfo === m.containerInfo &&
                                    p.stateNode.implementation === m.implementation
                                ) {
                                    (n(h, p.sibling),
                                        (p = i(p, m.children || [])),
                                        (p.return = h),
                                        (h = p));
                                    break e;
                                } else {
                                    n(h, p);
                                    break;
                                }
                            else t(h, p);
                            p = p.sibling;
                        }
                        ((p = Al(m, h.mode, k)), (p.return = h), (h = p));
                    }
                    return o(h);
                case zt:
                    return ((R = m._init), j(h, p, R(m._payload), k));
            }
            if (or(m)) return _(h, p, m, k);
            if (Gn(m)) return C(h, p, m, k);
            ri(h, m);
        }
        return (typeof m == "string" && m !== "") || typeof m == "number"
            ? ((m = "" + m),
                p !== null && p.tag === 6
                    ? (n(h, p.sibling), (p = i(p, m)), (p.return = h), (h = p))
                    : (n(h, p), (p = Fl(m, h.mode, k)), (p.return = h), (h = p)),
                o(h))
            : n(h, p);
    }
    return j;
}
var bn = Cc(!0),
    jc = Cc(!1),
    Mi = Gt(null),
    Di = null,
    Rn = null,
    ls = null;
function os() {
    ls = Rn = Di = null;
}
function ss(e) {
    var t = Mi.current;
    (ie(Mi), (e._currentValue = t));
}
function vo(e, t, n) {
    for (; e !== null;) {
        var r = e.alternate;
        if (
            ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
                : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
                e === n)
        )
            break;
        e = e.return;
    }
}
function In(e, t) {
    ((Di = e),
        (ls = Rn = null),
        (e = e.dependencies),
        e !== null &&
        e.firstContext !== null &&
        (e.lanes & t && (Ae = !0), (e.firstContext = null)));
}
function Je(e) {
    var t = e._currentValue;
    if (ls !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), Rn === null)) {
            if (Di === null) throw Error(L(308));
            ((Rn = e), (Di.dependencies = { lanes: 0, firstContext: e }));
        } else Rn = Rn.next = e;
    return t;
}
var rn = null;
function as(e) {
    rn === null ? (rn = [e]) : rn.push(e);
}
function Nc(e, t, n, r) {
    var i = t.interleaved;
    return (
        i === null ? ((n.next = n), as(t)) : ((n.next = i.next), (i.next = n)),
        (t.interleaved = n),
        Ct(e, r)
    );
}
function Ct(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;)
        ((e.childLanes |= t),
            (n = e.alternate),
            n !== null && (n.childLanes |= t),
            (n = e),
            (e = e.return));
    return n.tag === 3 ? n.stateNode : null;
}
var Tt = !1;
function us(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
    };
}
function Lc(e, t) {
    ((e = e.updateQueue),
        t.updateQueue === e &&
        (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects,
        }));
}
function St(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
    };
}
function Bt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), V & 2)) {
        var i = r.pending;
        return (
            i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
            (r.pending = t),
            Ct(e, n)
        );
    }
    return (
        (i = r.interleaved),
        i === null ? ((t.next = t), as(r)) : ((t.next = i.next), (i.next = t)),
        (r.interleaved = t),
        Ct(e, n)
    );
}
function hi(e, t, n) {
    if (
        ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Xo(e, n));
    }
}
function Ra(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
            l = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
            do {
                var o = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null,
                };
                (l === null ? (i = l = o) : (l = l.next = o), (n = n.next));
            } while (n !== null);
            l === null ? (i = l = t) : (l = l.next = t);
        } else i = l = t;
        ((n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: l,
            shared: r.shared,
            effects: r.effects,
        }),
            (e.updateQueue = n));
        return;
    }
    ((e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t));
}
function Ii(e, t, n, r) {
    var i = e.updateQueue;
    Tt = !1;
    var l = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        a = i.shared.pending;
    if (a !== null) {
        i.shared.pending = null;
        var s = a,
            f = s.next;
        ((s.next = null), o === null ? (l = f) : (o.next = f), (o = s));
        var g = e.alternate;
        g !== null &&
            ((g = g.updateQueue),
                (a = g.lastBaseUpdate),
                a !== o &&
                (a === null ? (g.firstBaseUpdate = f) : (a.next = f),
                    (g.lastBaseUpdate = s)));
    }
    if (l !== null) {
        var v = i.baseState;
        ((o = 0), (g = f = s = null), (a = l));
        do {
            var x = a.lane,
                w = a.eventTime;
            if ((r & x) === x) {
                g !== null &&
                    (g = g.next =
                    {
                        eventTime: w,
                        lane: 0,
                        tag: a.tag,
                        payload: a.payload,
                        callback: a.callback,
                        next: null,
                    });
                e: {
                    var _ = e,
                        C = a;
                    switch (((x = t), (w = n), C.tag)) {
                        case 1:
                            if (((_ = C.payload), typeof _ == "function")) {
                                v = _.call(w, v, x);
                                break e;
                            }
                            v = _;
                            break e;
                        case 3:
                            _.flags = (_.flags & -65537) | 128;
                        case 0:
                            if (
                                ((_ = C.payload),
                                    (x = typeof _ == "function" ? _.call(w, v, x) : _),
                                    x == null)
                            )
                                break e;
                            v = de({}, v, x);
                            break e;
                        case 2:
                            Tt = !0;
                    }
                }
                a.callback !== null &&
                    a.lane !== 0 &&
                    ((e.flags |= 64),
                        (x = i.effects),
                        x === null ? (i.effects = [a]) : x.push(a));
            } else
                ((w = {
                    eventTime: w,
                    lane: x,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null,
                }),
                    g === null ? ((f = g = w), (s = v)) : (g = g.next = w),
                    (o |= x));
            if (((a = a.next), a === null)) {
                if (((a = i.shared.pending), a === null)) break;
                ((x = a),
                    (a = x.next),
                    (x.next = null),
                    (i.lastBaseUpdate = x),
                    (i.shared.pending = null));
            }
        } while (!0);
        if (
            (g === null && (s = v),
                (i.baseState = s),
                (i.firstBaseUpdate = f),
                (i.lastBaseUpdate = g),
                (t = i.shared.interleaved),
                t !== null)
        ) {
            i = t;
            do ((o |= i.lane), (i = i.next));
            while (i !== t);
        } else l === null && (i.shared.lanes = 0);
        ((dn |= o), (e.lanes = o), (e.memoizedState = v));
    }
}
function Pa(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                i = r.callback;
            if (i !== null) {
                if (((r.callback = null), (r = n), typeof i != "function"))
                    throw Error(L(191, i));
                i.call(r);
            }
        }
}
var br = {},
    mt = Gt(br),
    Rr = Gt(br),
    Pr = Gt(br);
function ln(e) {
    if (e === br) throw Error(L(174));
    return e;
}
function cs(e, t) {
    switch ((ee(Pr, t), ee(Rr, e), ee(mt, br), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Yl(null, "");
            break;
        default:
            ((e = e === 8 ? t.parentNode : t),
                (t = e.namespaceURI || null),
                (e = e.tagName),
                (t = Yl(t, e)));
    }
    (ie(mt), ee(mt, t));
}
function Bn() {
    (ie(mt), ie(Rr), ie(Pr));
}
function Rc(e) {
    ln(Pr.current);
    var t = ln(mt.current),
        n = Yl(t, e.type);
    t !== n && (ee(Rr, e), ee(mt, n));
}
function ds(e) {
    Rr.current === e && (ie(mt), ie(Rr));
}
var ue = Gt(0);
function Fi(e) {
    for (var t = e; t !== null;) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (
                n !== null &&
                ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
            )
                return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t;
        } else if (t.child !== null) {
            ((t.child.return = t), (t = t.child));
            continue;
        }
        if (t === e) break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
}
var zl = [];
function fs() {
    for (var e = 0; e < zl.length; e++)
        zl[e]._workInProgressVersionPrimary = null;
    zl.length = 0;
}
var mi = Nt.ReactCurrentDispatcher,
    Tl = Nt.ReactCurrentBatchConfig,
    cn = 0,
    ce = null,
    ge = null,
    we = null,
    Ai = !1,
    hr = !1,
    zr = 0,
    Dp = 0;
function Le() {
    throw Error(L(321));
}
function ps(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!at(e[n], t[n])) return !1;
    return !0;
}
function hs(e, t, n, r, i, l) {
    if (
        ((cn = l),
            (ce = t),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.lanes = 0),
            (mi.current = e === null || e.memoizedState === null ? Up : $p),
            (e = n(r, i)),
            hr)
    ) {
        l = 0;
        do {
            if (((hr = !1), (zr = 0), 25 <= l)) throw Error(L(301));
            ((l += 1),
                (we = ge = null),
                (t.updateQueue = null),
                (mi.current = bp),
                (e = n(r, i)));
        } while (hr);
    }
    if (
        ((mi.current = Ui),
            (t = ge !== null && ge.next !== null),
            (cn = 0),
            (we = ge = ce = null),
            (Ai = !1),
            t)
    )
        throw Error(L(300));
    return e;
}
function ms() {
    var e = zr !== 0;
    return ((zr = 0), e);
}
function ft() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
    };
    return (we === null ? (ce.memoizedState = we = e) : (we = we.next = e), we);
}
function et() {
    if (ge === null) {
        var e = ce.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = ge.next;
    var t = we === null ? ce.memoizedState : we.next;
    if (t !== null) ((we = t), (ge = e));
    else {
        if (e === null) throw Error(L(310));
        ((ge = e),
            (e = {
                memoizedState: ge.memoizedState,
                baseState: ge.baseState,
                baseQueue: ge.baseQueue,
                queue: ge.queue,
                next: null,
            }),
            we === null ? (ce.memoizedState = we = e) : (we = we.next = e));
    }
    return we;
}
function Tr(e, t) {
    return typeof t == "function" ? t(e) : t;
}
function Ol(e) {
    var t = et(),
        n = t.queue;
    if (n === null) throw Error(L(311));
    n.lastRenderedReducer = e;
    var r = ge,
        i = r.baseQueue,
        l = n.pending;
    if (l !== null) {
        if (i !== null) {
            var o = i.next;
            ((i.next = l.next), (l.next = o));
        }
        ((r.baseQueue = i = l), (n.pending = null));
    }
    if (i !== null) {
        ((l = i.next), (r = r.baseState));
        var a = (o = null),
            s = null,
            f = l;
        do {
            var g = f.lane;
            if ((cn & g) === g)
                (s !== null &&
                    (s = s.next =
                    {
                        lane: 0,
                        action: f.action,
                        hasEagerState: f.hasEagerState,
                        eagerState: f.eagerState,
                        next: null,
                    }),
                    (r = f.hasEagerState ? f.eagerState : e(r, f.action)));
            else {
                var v = {
                    lane: g,
                    action: f.action,
                    hasEagerState: f.hasEagerState,
                    eagerState: f.eagerState,
                    next: null,
                };
                (s === null ? ((a = s = v), (o = r)) : (s = s.next = v),
                    (ce.lanes |= g),
                    (dn |= g));
            }
            f = f.next;
        } while (f !== null && f !== l);
        (s === null ? (o = r) : (s.next = a),
            at(r, t.memoizedState) || (Ae = !0),
            (t.memoizedState = r),
            (t.baseState = o),
            (t.baseQueue = s),
            (n.lastRenderedState = r));
    }
    if (((e = n.interleaved), e !== null)) {
        i = e;
        do ((l = i.lane), (ce.lanes |= l), (dn |= l), (i = i.next));
        while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function Ml(e) {
    var t = et(),
        n = t.queue;
    if (n === null) throw Error(L(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        i = n.pending,
        l = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var o = (i = i.next);
        do ((l = e(l, o.action)), (o = o.next));
        while (o !== i);
        (at(l, t.memoizedState) || (Ae = !0),
            (t.memoizedState = l),
            t.baseQueue === null && (t.baseState = l),
            (n.lastRenderedState = l));
    }
    return [l, r];
}
function Pc() { }
function zc(e, t) {
    var n = ce,
        r = et(),
        i = t(),
        l = !at(r.memoizedState, i);
    if (
        (l && ((r.memoizedState = i), (Ae = !0)),
            (r = r.queue),
            vs(Mc.bind(null, n, r, e), [e]),
            r.getSnapshot !== t || l || (we !== null && we.memoizedState.tag & 1))
    ) {
        if (
            ((n.flags |= 2048),
                Or(9, Oc.bind(null, n, r, i, t), void 0, null),
                ke === null)
        )
            throw Error(L(349));
        cn & 30 || Tc(n, t, i);
    }
    return i;
}
function Tc(e, t, n) {
    ((e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = ce.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
                (ce.updateQueue = t),
                (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Oc(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), Dc(t) && Ic(e));
}
function Mc(e, t, n) {
    return n(function () {
        Dc(t) && Ic(e);
    });
}
function Dc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !at(e, n);
    } catch {
        return !0;
    }
}
function Ic(e) {
    var t = Ct(e, 1);
    t !== null && st(t, e, 1, -1);
}
function za(e) {
    var t = ft();
    return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Tr,
            lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = Ap.bind(null, ce, e)),
        [t.memoizedState, e]
    );
}
function Or(e, t, n, r) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = ce.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
                (ce.updateQueue = t),
                (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
                n === null
                    ? (t.lastEffect = e.next = e)
                    : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
        e
    );
}
function Fc() {
    return et().memoizedState;
}
function vi(e, t, n, r) {
    var i = ft();
    ((ce.flags |= e),
        (i.memoizedState = Or(1 | t, n, void 0, r === void 0 ? null : r)));
}
function tl(e, t, n, r) {
    var i = et();
    r = r === void 0 ? null : r;
    var l = void 0;
    if (ge !== null) {
        var o = ge.memoizedState;
        if (((l = o.destroy), r !== null && ps(r, o.deps))) {
            i.memoizedState = Or(t, n, l, r);
            return;
        }
    }
    ((ce.flags |= e), (i.memoizedState = Or(1 | t, n, l, r)));
}
function Ta(e, t) {
    return vi(8390656, 8, e, t);
}
function vs(e, t) {
    return tl(2048, 8, e, t);
}
function Ac(e, t) {
    return tl(4, 2, e, t);
}
function Uc(e, t) {
    return tl(4, 4, e, t);
}
function $c(e, t) {
    if (typeof t == "function")
        return (
            (e = e()),
            t(e),
            function () {
                t(null);
            }
        );
    if (t != null)
        return (
            (e = e()),
            (t.current = e),
            function () {
                t.current = null;
            }
        );
}
function bc(e, t, n) {
    return (
        (n = n != null ? n.concat([e]) : null),
        tl(4, 4, $c.bind(null, t, e), n)
    );
}
function gs() { }
function Bc(e, t) {
    var n = et();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ps(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
}
function Wc(e, t) {
    var n = et();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ps(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Hc(e, t, n) {
    return cn & 21
        ? (at(n, t) || ((n = Yu()), (ce.lanes |= n), (dn |= n), (e.baseState = !0)),
            t)
        : (e.baseState && ((e.baseState = !1), (Ae = !0)), (e.memoizedState = n));
}
function Ip(e, t) {
    var n = Y;
    ((Y = n !== 0 && 4 > n ? n : 4), e(!0));
    var r = Tl.transition;
    Tl.transition = {};
    try {
        (e(!1), t());
    } finally {
        ((Y = n), (Tl.transition = r));
    }
}
function Vc() {
    return et().memoizedState;
}
function Fp(e, t, n) {
    var r = Ht(e);
    if (
        ((n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        }),
            Qc(e))
    )
        Kc(t, n);
    else if (((n = Nc(e, t, n, r)), n !== null)) {
        var i = Oe();
        (st(n, e, r, i), Xc(n, t, r));
    }
}
function Ap(e, t, n) {
    var r = Ht(e),
        i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Qc(e)) Kc(t, i);
    else {
        var l = e.alternate;
        if (
            e.lanes === 0 &&
            (l === null || l.lanes === 0) &&
            ((l = t.lastRenderedReducer), l !== null)
        )
            try {
                var o = t.lastRenderedState,
                    a = l(o, n);
                if (((i.hasEagerState = !0), (i.eagerState = a), at(a, o))) {
                    var s = t.interleaved;
                    (s === null
                        ? ((i.next = i), as(t))
                        : ((i.next = s.next), (s.next = i)),
                        (t.interleaved = i));
                    return;
                }
            } catch {
            } finally {
            }
        ((n = Nc(e, t, i, r)),
            n !== null && ((i = Oe()), st(n, e, r, i), Xc(n, t, r)));
    }
}
function Qc(e) {
    var t = e.alternate;
    return e === ce || (t !== null && t === ce);
}
function Kc(e, t) {
    hr = Ai = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t));
}
function Xc(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Xo(e, n));
    }
}
var Ui = {
    readContext: Je,
    useCallback: Le,
    useContext: Le,
    useEffect: Le,
    useImperativeHandle: Le,
    useInsertionEffect: Le,
    useLayoutEffect: Le,
    useMemo: Le,
    useReducer: Le,
    useRef: Le,
    useState: Le,
    useDebugValue: Le,
    useDeferredValue: Le,
    useTransition: Le,
    useMutableSource: Le,
    useSyncExternalStore: Le,
    useId: Le,
    unstable_isNewReconciler: !1,
},
    Up = {
        readContext: Je,
        useCallback: function (e, t) {
            return ((ft().memoizedState = [e, t === void 0 ? null : t]), e);
        },
        useContext: Je,
        useEffect: Ta,
        useImperativeHandle: function (e, t, n) {
            return (
                (n = n != null ? n.concat([e]) : null),
                vi(4194308, 4, $c.bind(null, t, e), n)
            );
        },
        useLayoutEffect: function (e, t) {
            return vi(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return vi(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = ft();
            return (
                (t = t === void 0 ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
            );
        },
        useReducer: function (e, t, n) {
            var r = ft();
            return (
                (t = n !== void 0 ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = Fp.bind(null, ce, e)),
                [r.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = ft();
            return ((e = { current: e }), (t.memoizedState = e));
        },
        useState: za,
        useDebugValue: gs,
        useDeferredValue: function (e) {
            return (ft().memoizedState = e);
        },
        useTransition: function () {
            var e = za(!1),
                t = e[0];
            return ((e = Ip.bind(null, e[1])), (ft().memoizedState = e), [t, e]);
        },
        useMutableSource: function () { },
        useSyncExternalStore: function (e, t, n) {
            var r = ce,
                i = ft();
            if (le) {
                if (n === void 0) throw Error(L(407));
                n = n();
            } else {
                if (((n = t()), ke === null)) throw Error(L(349));
                cn & 30 || Tc(r, t, n);
            }
            i.memoizedState = n;
            var l = { value: n, getSnapshot: t };
            return (
                (i.queue = l),
                Ta(Mc.bind(null, r, l, e), [e]),
                (r.flags |= 2048),
                Or(9, Oc.bind(null, r, l, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = ft(),
                t = ke.identifierPrefix;
            if (le) {
                var n = kt,
                    r = wt;
                ((n = (r & ~(1 << (32 - ot(r) - 1))).toString(32) + n),
                    (t = ":" + t + "R" + n),
                    (n = zr++),
                    0 < n && (t += "H" + n.toString(32)),
                    (t += ":"));
            } else ((n = Dp++), (t = ":" + t + "r" + n.toString(32) + ":"));
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
    },
    $p = {
        readContext: Je,
        useCallback: Bc,
        useContext: Je,
        useEffect: vs,
        useImperativeHandle: bc,
        useInsertionEffect: Ac,
        useLayoutEffect: Uc,
        useMemo: Wc,
        useReducer: Ol,
        useRef: Fc,
        useState: function () {
            return Ol(Tr);
        },
        useDebugValue: gs,
        useDeferredValue: function (e) {
            var t = et();
            return Hc(t, ge.memoizedState, e);
        },
        useTransition: function () {
            var e = Ol(Tr)[0],
                t = et().memoizedState;
            return [e, t];
        },
        useMutableSource: Pc,
        useSyncExternalStore: zc,
        useId: Vc,
        unstable_isNewReconciler: !1,
    },
    bp = {
        readContext: Je,
        useCallback: Bc,
        useContext: Je,
        useEffect: vs,
        useImperativeHandle: bc,
        useInsertionEffect: Ac,
        useLayoutEffect: Uc,
        useMemo: Wc,
        useReducer: Ml,
        useRef: Fc,
        useState: function () {
            return Ml(Tr);
        },
        useDebugValue: gs,
        useDeferredValue: function (e) {
            var t = et();
            return ge === null ? (t.memoizedState = e) : Hc(t, ge.memoizedState, e);
        },
        useTransition: function () {
            var e = Ml(Tr)[0],
                t = et().memoizedState;
            return [e, t];
        },
        useMutableSource: Pc,
        useSyncExternalStore: zc,
        useId: Vc,
        unstable_isNewReconciler: !1,
    };
function rt(e, t) {
    if (e && e.defaultProps) {
        ((t = de({}, t)), (e = e.defaultProps));
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
function go(e, t, n, r) {
    ((t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : de({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n));
}
var nl = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? hn(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = Oe(),
            i = Ht(e),
            l = St(r, i);
        ((l.payload = t),
            n != null && (l.callback = n),
            (t = Bt(e, l, i)),
            t !== null && (st(t, e, i, r), hi(t, e, i)));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = Oe(),
            i = Ht(e),
            l = St(r, i);
        ((l.tag = 1),
            (l.payload = t),
            n != null && (l.callback = n),
            (t = Bt(e, l, i)),
            t !== null && (st(t, e, i, r), hi(t, e, i)));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = Oe(),
            r = Ht(e),
            i = St(n, r);
        ((i.tag = 2),
            t != null && (i.callback = t),
            (t = Bt(e, i, r)),
            t !== null && (st(t, e, r, n), hi(t, e, r)));
    },
};
function Oa(e, t, n, r, i, l, o) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
            ? e.shouldComponentUpdate(r, l, o)
            : t.prototype && t.prototype.isPureReactComponent
                ? !Cr(n, r) || !Cr(i, l)
                : !0
    );
}
function Yc(e, t, n) {
    var r = !1,
        i = Xt,
        l = t.contextType;
    return (
        typeof l == "object" && l !== null
            ? (l = Je(l))
            : ((i = $e(t) ? an : ze.current),
                (r = t.contextTypes),
                (l = (r = r != null) ? Un(e, i) : Xt)),
        (t = new t(n, l)),
        (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = nl),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
        ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = i),
            (e.__reactInternalMemoizedMaskedChildContext = l)),
        t
    );
}
function Ma(e, t, n, r) {
    ((e = t.state),
        typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && nl.enqueueReplaceState(t, t.state, null));
}
function yo(e, t, n, r) {
    var i = e.stateNode;
    ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), us(e));
    var l = t.contextType;
    (typeof l == "object" && l !== null
        ? (i.context = Je(l))
        : ((l = $e(t) ? an : ze.current), (i.context = Un(e, l))),
        (i.state = e.memoizedState),
        (l = t.getDerivedStateFromProps),
        typeof l == "function" && (go(e, t, l, n), (i.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function" ||
        (typeof i.UNSAFE_componentWillMount != "function" &&
            typeof i.componentWillMount != "function") ||
        ((t = i.state),
            typeof i.componentWillMount == "function" && i.componentWillMount(),
            typeof i.UNSAFE_componentWillMount == "function" &&
            i.UNSAFE_componentWillMount(),
            t !== i.state && nl.enqueueReplaceState(i, i.state, null),
            Ii(e, n, i, r),
            (i.state = e.memoizedState)),
        typeof i.componentDidMount == "function" && (e.flags |= 4194308));
}
function Wn(e, t) {
    try {
        var n = "",
            r = t;
        do ((n += mf(r)), (r = r.return));
        while (r);
        var i = n;
    } catch (l) {
        i =
            `
  Error generating stack: ` +
            l.message +
            `
  ` +
            l.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
}
function Dl(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function xo(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var Bp = typeof WeakMap == "function" ? WeakMap : Map;
function Gc(e, t, n) {
    ((n = St(-1, n)), (n.tag = 3), (n.payload = { element: null }));
    var r = t.value;
    return (
        (n.callback = function () {
            (bi || ((bi = !0), (Ro = r)), xo(e, t));
        }),
        n
    );
}
function Zc(e, t, n) {
    ((n = St(-1, n)), (n.tag = 3));
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var i = t.value;
        ((n.payload = function () {
            return r(i);
        }),
            (n.callback = function () {
                xo(e, t);
            }));
    }
    var l = e.stateNode;
    return (
        l !== null &&
        typeof l.componentDidCatch == "function" &&
        (n.callback = function () {
            (xo(e, t),
                typeof r != "function" &&
                (Wt === null ? (Wt = new Set([this])) : Wt.add(this)));
            var o = t.stack;
            this.componentDidCatch(t.value, {
                componentStack: o !== null ? o : "",
            });
        }),
        n
    );
}
function Da(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new Bp();
        var i = new Set();
        r.set(t, i);
    } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
    i.has(n) || (i.add(n), (e = nh.bind(null, e, t, n)), t.then(e, e));
}
function Ia(e) {
    do {
        var t;
        if (
            ((t = e.tag === 13) &&
                ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
                t)
        )
            return e;
        e = e.return;
    } while (e !== null);
    return null;
}
function Fa(e, t, n, r, i) {
    return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = i), e)
        : (e === t
            ? (e.flags |= 65536)
            : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 &&
                (n.alternate === null
                    ? (n.tag = 17)
                    : ((t = St(-1, 1)), (t.tag = 2), Bt(n, t, 1))),
                (n.lanes |= 1)),
            e);
}
var Wp = Nt.ReactCurrentOwner,
    Ae = !1;
function Te(e, t, n, r) {
    t.child = e === null ? jc(t, null, n, r) : bn(t, e.child, n, r);
}
function Aa(e, t, n, r, i) {
    n = n.render;
    var l = t.ref;
    return (
        In(t, i),
        (r = hs(e, t, n, r, l, i)),
        (n = ms()),
        e !== null && !Ae
            ? ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~i),
                jt(e, t, i))
            : (le && n && ns(t), (t.flags |= 1), Te(e, t, r, i), t.child)
    );
}
function Ua(e, t, n, r, i) {
    if (e === null) {
        var l = n.type;
        return typeof l == "function" &&
            !Cs(l) &&
            l.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = l), qc(e, t, l, r, i))
            : ((e = wi(n.type, null, r, t, t.mode, i)),
                (e.ref = t.ref),
                (e.return = t),
                (t.child = e));
    }
    if (((l = e.child), !(e.lanes & i))) {
        var o = l.memoizedProps;
        if (
            ((n = n.compare), (n = n !== null ? n : Cr), n(o, r) && e.ref === t.ref)
        )
            return jt(e, t, i);
    }
    return (
        (t.flags |= 1),
        (e = Vt(l, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
    );
}
function qc(e, t, n, r, i) {
    if (e !== null) {
        var l = e.memoizedProps;
        if (Cr(l, r) && e.ref === t.ref)
            if (((Ae = !1), (t.pendingProps = r = l), (e.lanes & i) !== 0))
                e.flags & 131072 && (Ae = !0);
            else return ((t.lanes = e.lanes), jt(e, t, i));
    }
    return wo(e, t, n, r, i);
}
function Jc(e, t, n) {
    var r = t.pendingProps,
        i = r.children,
        l = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
                ee(zn, Be),
                (Be |= n));
        else {
            if (!(n & 1073741824))
                return (
                    (e = l !== null ? l.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null,
                    }),
                    (t.updateQueue = null),
                    ee(zn, Be),
                    (Be |= e),
                    null
                );
            ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
                (r = l !== null ? l.baseLanes : n),
                ee(zn, Be),
                (Be |= r));
        }
    else
        (l !== null ? ((r = l.baseLanes | n), (t.memoizedState = null)) : (r = n),
            ee(zn, Be),
            (Be |= r));
    return (Te(e, t, i, n), t.child);
}
function ed(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
}
function wo(e, t, n, r, i) {
    var l = $e(n) ? an : ze.current;
    return (
        (l = Un(t, l)),
        In(t, i),
        (n = hs(e, t, n, r, l, i)),
        (r = ms()),
        e !== null && !Ae
            ? ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~i),
                jt(e, t, i))
            : (le && r && ns(t), (t.flags |= 1), Te(e, t, n, i), t.child)
    );
}
function $a(e, t, n, r, i) {
    if ($e(n)) {
        var l = !0;
        zi(t);
    } else l = !1;
    if ((In(t, i), t.stateNode === null))
        (gi(e, t), Yc(t, n, r), yo(t, n, r, i), (r = !0));
    else if (e === null) {
        var o = t.stateNode,
            a = t.memoizedProps;
        o.props = a;
        var s = o.context,
            f = n.contextType;
        typeof f == "object" && f !== null
            ? (f = Je(f))
            : ((f = $e(n) ? an : ze.current), (f = Un(t, f)));
        var g = n.getDerivedStateFromProps,
            v =
                typeof g == "function" ||
                typeof o.getSnapshotBeforeUpdate == "function";
        (v ||
            (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
                typeof o.componentWillReceiveProps != "function") ||
            ((a !== r || s !== f) && Ma(t, o, r, f)),
            (Tt = !1));
        var x = t.memoizedState;
        ((o.state = x),
            Ii(t, r, o, i),
            (s = t.memoizedState),
            a !== r || x !== s || Ue.current || Tt
                ? (typeof g == "function" && (go(t, n, g, r), (s = t.memoizedState)),
                    (a = Tt || Oa(t, n, a, r, x, s, f))
                        ? (v ||
                            (typeof o.UNSAFE_componentWillMount != "function" &&
                                typeof o.componentWillMount != "function") ||
                            (typeof o.componentWillMount == "function" &&
                                o.componentWillMount(),
                                typeof o.UNSAFE_componentWillMount == "function" &&
                                o.UNSAFE_componentWillMount()),
                            typeof o.componentDidMount == "function" && (t.flags |= 4194308))
                        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
                            (t.memoizedProps = r),
                            (t.memoizedState = s)),
                    (o.props = r),
                    (o.state = s),
                    (o.context = f),
                    (r = a))
                : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
                    (r = !1)));
    } else {
        ((o = t.stateNode),
            Lc(e, t),
            (a = t.memoizedProps),
            (f = t.type === t.elementType ? a : rt(t.type, a)),
            (o.props = f),
            (v = t.pendingProps),
            (x = o.context),
            (s = n.contextType),
            typeof s == "object" && s !== null
                ? (s = Je(s))
                : ((s = $e(n) ? an : ze.current), (s = Un(t, s))));
        var w = n.getDerivedStateFromProps;
        ((g =
            typeof w == "function" ||
            typeof o.getSnapshotBeforeUpdate == "function") ||
            (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
                typeof o.componentWillReceiveProps != "function") ||
            ((a !== v || x !== s) && Ma(t, o, r, s)),
            (Tt = !1),
            (x = t.memoizedState),
            (o.state = x),
            Ii(t, r, o, i));
        var _ = t.memoizedState;
        a !== v || x !== _ || Ue.current || Tt
            ? (typeof w == "function" && (go(t, n, w, r), (_ = t.memoizedState)),
                (f = Tt || Oa(t, n, f, r, x, _, s) || !1)
                    ? (g ||
                        (typeof o.UNSAFE_componentWillUpdate != "function" &&
                            typeof o.componentWillUpdate != "function") ||
                        (typeof o.componentWillUpdate == "function" &&
                            o.componentWillUpdate(r, _, s),
                            typeof o.UNSAFE_componentWillUpdate == "function" &&
                            o.UNSAFE_componentWillUpdate(r, _, s)),
                        typeof o.componentDidUpdate == "function" && (t.flags |= 4),
                        typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
                    : (typeof o.componentDidUpdate != "function" ||
                        (a === e.memoizedProps && x === e.memoizedState) ||
                        (t.flags |= 4),
                        typeof o.getSnapshotBeforeUpdate != "function" ||
                        (a === e.memoizedProps && x === e.memoizedState) ||
                        (t.flags |= 1024),
                        (t.memoizedProps = r),
                        (t.memoizedState = _)),
                (o.props = r),
                (o.state = _),
                (o.context = s),
                (r = f))
            : (typeof o.componentDidUpdate != "function" ||
                (a === e.memoizedProps && x === e.memoizedState) ||
                (t.flags |= 4),
                typeof o.getSnapshotBeforeUpdate != "function" ||
                (a === e.memoizedProps && x === e.memoizedState) ||
                (t.flags |= 1024),
                (r = !1));
    }
    return ko(e, t, n, r, l, i);
}
function ko(e, t, n, r, i, l) {
    ed(e, t);
    var o = (t.flags & 128) !== 0;
    if (!r && !o) return (i && Ca(t, n, !1), jt(e, t, l));
    ((r = t.stateNode), (Wp.current = t));
    var a =
        o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return (
        (t.flags |= 1),
        e !== null && o
            ? ((t.child = bn(t, e.child, null, l)), (t.child = bn(t, null, a, l)))
            : Te(e, t, a, l),
        (t.memoizedState = r.state),
        i && Ca(t, n, !0),
        t.child
    );
}
function td(e) {
    var t = e.stateNode;
    (t.pendingContext
        ? _a(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && _a(e, t.context, !1),
        cs(e, t.containerInfo));
}
function ba(e, t, n, r, i) {
    return ($n(), is(i), (t.flags |= 256), Te(e, t, n, r), t.child);
}
var So = { dehydrated: null, treeContext: null, retryLane: 0 };
function Eo(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function nd(e, t, n) {
    var r = t.pendingProps,
        i = ue.current,
        l = !1,
        o = (t.flags & 128) !== 0,
        a;
    if (
        ((a = o) ||
            (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
            a
                ? ((l = !0), (t.flags &= -129))
                : (e === null || e.memoizedState !== null) && (i |= 1),
            ee(ue, i & 1),
            e === null)
    )
        return (
            mo(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
                ? (t.mode & 1
                    ? e.data === "$!"
                        ? (t.lanes = 8)
                        : (t.lanes = 1073741824)
                    : (t.lanes = 1),
                    null)
                : ((o = r.children),
                    (e = r.fallback),
                    l
                        ? ((r = t.mode),
                            (l = t.child),
                            (o = { mode: "hidden", children: o }),
                            !(r & 1) && l !== null
                                ? ((l.childLanes = 0), (l.pendingProps = o))
                                : (l = ll(o, r, 0, null)),
                            (e = sn(e, r, n, null)),
                            (l.return = t),
                            (e.return = t),
                            (l.sibling = e),
                            (t.child = l),
                            (t.child.memoizedState = Eo(n)),
                            (t.memoizedState = So),
                            e)
                        : ys(t, o))
        );
    if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
        return Hp(e, t, o, r, a, i, n);
    if (l) {
        ((l = r.fallback), (o = t.mode), (i = e.child), (a = i.sibling));
        var s = { mode: "hidden", children: r.children };
        return (
            !(o & 1) && t.child !== i
                ? ((r = t.child),
                    (r.childLanes = 0),
                    (r.pendingProps = s),
                    (t.deletions = null))
                : ((r = Vt(i, s)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
            a !== null ? (l = Vt(a, l)) : ((l = sn(l, o, n, null)), (l.flags |= 2)),
            (l.return = t),
            (r.return = t),
            (r.sibling = l),
            (t.child = r),
            (r = l),
            (l = t.child),
            (o = e.child.memoizedState),
            (o =
                o === null
                    ? Eo(n)
                    : {
                        baseLanes: o.baseLanes | n,
                        cachePool: null,
                        transitions: o.transitions,
                    }),
            (l.memoizedState = o),
            (l.childLanes = e.childLanes & ~n),
            (t.memoizedState = So),
            r
        );
    }
    return (
        (l = e.child),
        (e = l.sibling),
        (r = Vt(l, { mode: "visible", children: r.children })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
        ((n = t.deletions),
            n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
    );
}
function ys(e, t) {
    return (
        (t = ll({ mode: "visible", children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
    );
}
function ii(e, t, n, r) {
    return (
        r !== null && is(r),
        bn(t, e.child, null, n),
        (e = ys(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function Hp(e, t, n, r, i, l, o) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (r = Dl(Error(L(422)))), ii(e, t, o, r))
            : t.memoizedState !== null
                ? ((t.child = e.child), (t.flags |= 128), null)
                : ((l = r.fallback),
                    (i = t.mode),
                    (r = ll({ mode: "visible", children: r.children }, i, 0, null)),
                    (l = sn(l, i, o, null)),
                    (l.flags |= 2),
                    (r.return = t),
                    (l.return = t),
                    (r.sibling = l),
                    (t.child = r),
                    t.mode & 1 && bn(t, e.child, null, o),
                    (t.child.memoizedState = Eo(o)),
                    (t.memoizedState = So),
                    l);
    if (!(t.mode & 1)) return ii(e, t, o, null);
    if (i.data === "$!") {
        if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
        return (
            (r = a),
            (l = Error(L(419))),
            (r = Dl(l, r, void 0)),
            ii(e, t, o, r)
        );
    }
    if (((a = (o & e.childLanes) !== 0), Ae || a)) {
        if (((r = ke), r !== null)) {
            switch (o & -o) {
                case 4:
                    i = 2;
                    break;
                case 16:
                    i = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    i = 32;
                    break;
                case 536870912:
                    i = 268435456;
                    break;
                default:
                    i = 0;
            }
            ((i = i & (r.suspendedLanes | o) ? 0 : i),
                i !== 0 &&
                i !== l.retryLane &&
                ((l.retryLane = i), Ct(e, i), st(r, e, i, -1)));
        }
        return (_s(), (r = Dl(Error(L(421)))), ii(e, t, o, r));
    }
    return i.data === "$?"
        ? ((t.flags |= 128),
            (t.child = e.child),
            (t = rh.bind(null, e)),
            (i._reactRetry = t),
            null)
        : ((e = l.treeContext),
            (We = bt(i.nextSibling)),
            (He = t),
            (le = !0),
            (lt = null),
            e !== null &&
            ((Ye[Ge++] = wt),
                (Ye[Ge++] = kt),
                (Ye[Ge++] = un),
                (wt = e.id),
                (kt = e.overflow),
                (un = t)),
            (t = ys(t, r.children)),
            (t.flags |= 4096),
            t);
}
function Ba(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), vo(e.return, t, n));
}
function Il(e, t, n, r, i) {
    var l = e.memoizedState;
    l === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: i,
        })
        : ((l.isBackwards = t),
            (l.rendering = null),
            (l.renderingStartTime = 0),
            (l.last = r),
            (l.tail = n),
            (l.tailMode = i));
}
function rd(e, t, n) {
    var r = t.pendingProps,
        i = r.revealOrder,
        l = r.tail;
    if ((Te(e, t, r.children, n), (r = ue.current), r & 2))
        ((r = (r & 1) | 2), (t.flags |= 128));
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null;) {
                if (e.tag === 13) e.memoizedState !== null && Ba(e, n, t);
                else if (e.tag === 19) Ba(e, n, t);
                else if (e.child !== null) {
                    ((e.child.return = e), (e = e.child));
                    continue;
                }
                if (e === t) break e;
                for (; e.sibling === null;) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                ((e.sibling.return = e.return), (e = e.sibling));
            }
        r &= 1;
    }
    if ((ee(ue, r), !(t.mode & 1))) t.memoizedState = null;
    else
        switch (i) {
            case "forwards":
                for (n = t.child, i = null; n !== null;)
                    ((e = n.alternate),
                        e !== null && Fi(e) === null && (i = n),
                        (n = n.sibling));
                ((n = i),
                    n === null
                        ? ((i = t.child), (t.child = null))
                        : ((i = n.sibling), (n.sibling = null)),
                    Il(t, !1, i, n, l));
                break;
            case "backwards":
                for (n = null, i = t.child, t.child = null; i !== null;) {
                    if (((e = i.alternate), e !== null && Fi(e) === null)) {
                        t.child = i;
                        break;
                    }
                    ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
                }
                Il(t, !0, n, null, l);
                break;
            case "together":
                Il(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function gi(e, t) {
    !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function jt(e, t, n) {
    if (
        (e !== null && (t.dependencies = e.dependencies),
            (dn |= t.lanes),
            !(n & t.childLanes))
    )
        return null;
    if (e !== null && t.child !== e.child) throw Error(L(153));
    if (t.child !== null) {
        for (
            e = t.child, n = Vt(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;
        )
            ((e = e.sibling),
                (n = n.sibling = Vt(e, e.pendingProps)),
                (n.return = t));
        n.sibling = null;
    }
    return t.child;
}
function Vp(e, t, n) {
    switch (t.tag) {
        case 3:
            (td(t), $n());
            break;
        case 5:
            Rc(t);
            break;
        case 1:
            $e(t.type) && zi(t);
            break;
        case 4:
            cs(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                i = t.memoizedProps.value;
            (ee(Mi, r._currentValue), (r._currentValue = i));
            break;
        case 13:
            if (((r = t.memoizedState), r !== null))
                return r.dehydrated !== null
                    ? (ee(ue, ue.current & 1), (t.flags |= 128), null)
                    : n & t.child.childLanes
                        ? nd(e, t, n)
                        : (ee(ue, ue.current & 1),
                            (e = jt(e, t, n)),
                            e !== null ? e.sibling : null);
            ee(ue, ue.current & 1);
            break;
        case 19:
            if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
                if (r) return rd(e, t, n);
                t.flags |= 128;
            }
            if (
                ((i = t.memoizedState),
                    i !== null &&
                    ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
                    ee(ue, ue.current),
                    r)
            )
                break;
            return null;
        case 22:
        case 23:
            return ((t.lanes = 0), Jc(e, t, n));
    }
    return jt(e, t, n);
}
var id, _o, ld, od;
id = function (e, t) {
    for (var n = t.child; n !== null;) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            ((n.child.return = n), (n = n.child));
            continue;
        }
        if (n === t) break;
        for (; n.sibling === null;) {
            if (n.return === null || n.return === t) return;
            n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
    }
};
_o = function () { };
ld = function (e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        ((e = t.stateNode), ln(mt.current));
        var l = null;
        switch (n) {
            case "input":
                ((i = Vl(e, i)), (r = Vl(e, r)), (l = []));
                break;
            case "select":
                ((i = de({}, i, { value: void 0 })),
                    (r = de({}, r, { value: void 0 })),
                    (l = []));
                break;
            case "textarea":
                ((i = Xl(e, i)), (r = Xl(e, r)), (l = []));
                break;
            default:
                typeof i.onClick != "function" &&
                    typeof r.onClick == "function" &&
                    (e.onclick = Ri);
        }
        Gl(n, r);
        var o;
        n = null;
        for (f in i)
            if (!r.hasOwnProperty(f) && i.hasOwnProperty(f) && i[f] != null)
                if (f === "style") {
                    var a = i[f];
                    for (o in a) a.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
                } else
                    f !== "dangerouslySetInnerHTML" &&
                        f !== "children" &&
                        f !== "suppressContentEditableWarning" &&
                        f !== "suppressHydrationWarning" &&
                        f !== "autoFocus" &&
                        (yr.hasOwnProperty(f)
                            ? l || (l = [])
                            : (l = l || []).push(f, null));
        for (f in r) {
            var s = r[f];
            if (
                ((a = i != null ? i[f] : void 0),
                    r.hasOwnProperty(f) && s !== a && (s != null || a != null))
            )
                if (f === "style")
                    if (a) {
                        for (o in a)
                            !a.hasOwnProperty(o) ||
                                (s && s.hasOwnProperty(o)) ||
                                (n || (n = {}), (n[o] = ""));
                        for (o in s)
                            s.hasOwnProperty(o) &&
                                a[o] !== s[o] &&
                                (n || (n = {}), (n[o] = s[o]));
                    } else (n || (l || (l = []), l.push(f, n)), (n = s));
                else
                    f === "dangerouslySetInnerHTML"
                        ? ((s = s ? s.__html : void 0),
                            (a = a ? a.__html : void 0),
                            s != null && a !== s && (l = l || []).push(f, s))
                        : f === "children"
                            ? (typeof s != "string" && typeof s != "number") ||
                            (l = l || []).push(f, "" + s)
                            : f !== "suppressContentEditableWarning" &&
                            f !== "suppressHydrationWarning" &&
                            (yr.hasOwnProperty(f)
                                ? (s != null && f === "onScroll" && re("scroll", e),
                                    l || a === s || (l = []))
                                : (l = l || []).push(f, s));
        }
        n && (l = l || []).push("style", n);
        var f = l;
        (t.updateQueue = f) && (t.flags |= 4);
    }
};
od = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
};
function nr(e, t) {
    if (!le)
        switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null;)
                    (t.alternate !== null && (n = t), (t = t.sibling));
                n === null ? (e.tail = null) : (n.sibling = null);
                break;
            case "collapsed":
                n = e.tail;
                for (var r = null; n !== null;)
                    (n.alternate !== null && (r = n), (n = n.sibling));
                r === null
                    ? t || e.tail === null
                        ? (e.tail = null)
                        : (e.tail.sibling = null)
                    : (r.sibling = null);
        }
}
function Re(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var i = e.child; i !== null;)
            ((n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags & 14680064),
                (r |= i.flags & 14680064),
                (i.return = e),
                (i = i.sibling));
    else
        for (i = e.child; i !== null;)
            ((n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags),
                (r |= i.flags),
                (i.return = e),
                (i = i.sibling));
    return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function Qp(e, t, n) {
    var r = t.pendingProps;
    switch ((rs(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return (Re(t), null);
        case 1:
            return ($e(t.type) && Pi(), Re(t), null);
        case 3:
            return (
                (r = t.stateNode),
                Bn(),
                ie(Ue),
                ie(ze),
                fs(),
                r.pendingContext &&
                ((r.context = r.pendingContext), (r.pendingContext = null)),
                (e === null || e.child === null) &&
                (ni(t)
                    ? (t.flags |= 4)
                    : e === null ||
                    (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                    ((t.flags |= 1024), lt !== null && (To(lt), (lt = null)))),
                _o(e, t),
                Re(t),
                null
            );
        case 5:
            ds(t);
            var i = ln(Pr.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                (ld(e, t, n, r, i),
                    e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(L(166));
                    return (Re(t), null);
                }
                if (((e = ln(mt.current)), ni(t))) {
                    ((r = t.stateNode), (n = t.type));
                    var l = t.memoizedProps;
                    switch (((r[pt] = t), (r[Lr] = l), (e = (t.mode & 1) !== 0), n)) {
                        case "dialog":
                            (re("cancel", r), re("close", r));
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            re("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (i = 0; i < ar.length; i++) re(ar[i], r);
                            break;
                        case "source":
                            re("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            (re("error", r), re("load", r));
                            break;
                        case "details":
                            re("toggle", r);
                            break;
                        case "input":
                            (Zs(r, l), re("invalid", r));
                            break;
                        case "select":
                            ((r._wrapperState = { wasMultiple: !!l.multiple }),
                                re("invalid", r));
                            break;
                        case "textarea":
                            (Js(r, l), re("invalid", r));
                    }
                    (Gl(n, l), (i = null));
                    for (var o in l)
                        if (l.hasOwnProperty(o)) {
                            var a = l[o];
                            o === "children"
                                ? typeof a == "string"
                                    ? r.textContent !== a &&
                                    (l.suppressHydrationWarning !== !0 &&
                                        ti(r.textContent, a, e),
                                        (i = ["children", a]))
                                    : typeof a == "number" &&
                                    r.textContent !== "" + a &&
                                    (l.suppressHydrationWarning !== !0 &&
                                        ti(r.textContent, a, e),
                                        (i = ["children", "" + a]))
                                : yr.hasOwnProperty(o) &&
                                a != null &&
                                o === "onScroll" &&
                                re("scroll", r);
                        }
                    switch (n) {
                        case "input":
                            (Kr(r), qs(r, l, !0));
                            break;
                        case "textarea":
                            (Kr(r), ea(r));
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof l.onClick == "function" && (r.onclick = Ri);
                    }
                    ((r = i), (t.updateQueue = r), r !== null && (t.flags |= 4));
                } else {
                    ((o = i.nodeType === 9 ? i : i.ownerDocument),
                        e === "http://www.w3.org/1999/xhtml" && (e = Mu(n)),
                        e === "http://www.w3.org/1999/xhtml"
                            ? n === "script"
                                ? ((e = o.createElement("div")),
                                    (e.innerHTML = "<script><\/script>"),
                                    (e = e.removeChild(e.firstChild)))
                                : typeof r.is == "string"
                                    ? (e = o.createElement(n, { is: r.is }))
                                    : ((e = o.createElement(n)),
                                        n === "select" &&
                                        ((o = e),
                                            r.multiple
                                                ? (o.multiple = !0)
                                                : r.size && (o.size = r.size)))
                            : (e = o.createElementNS(e, n)),
                        (e[pt] = t),
                        (e[Lr] = r),
                        id(e, t, !1, !1),
                        (t.stateNode = e));
                    e: {
                        switch (((o = Zl(n, r)), n)) {
                            case "dialog":
                                (re("cancel", e), re("close", e), (i = r));
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                (re("load", e), (i = r));
                                break;
                            case "video":
                            case "audio":
                                for (i = 0; i < ar.length; i++) re(ar[i], e);
                                i = r;
                                break;
                            case "source":
                                (re("error", e), (i = r));
                                break;
                            case "img":
                            case "image":
                            case "link":
                                (re("error", e), re("load", e), (i = r));
                                break;
                            case "details":
                                (re("toggle", e), (i = r));
                                break;
                            case "input":
                                (Zs(e, r), (i = Vl(e, r)), re("invalid", e));
                                break;
                            case "option":
                                i = r;
                                break;
                            case "select":
                                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                                    (i = de({}, r, { value: void 0 })),
                                    re("invalid", e));
                                break;
                            case "textarea":
                                (Js(e, r), (i = Xl(e, r)), re("invalid", e));
                                break;
                            default:
                                i = r;
                        }
                        (Gl(n, i), (a = i));
                        for (l in a)
                            if (a.hasOwnProperty(l)) {
                                var s = a[l];
                                l === "style"
                                    ? Fu(e, s)
                                    : l === "dangerouslySetInnerHTML"
                                        ? ((s = s ? s.__html : void 0), s != null && Du(e, s))
                                        : l === "children"
                                            ? typeof s == "string"
                                                ? (n !== "textarea" || s !== "") && xr(e, s)
                                                : typeof s == "number" && xr(e, "" + s)
                                            : l !== "suppressContentEditableWarning" &&
                                            l !== "suppressHydrationWarning" &&
                                            l !== "autoFocus" &&
                                            (yr.hasOwnProperty(l)
                                                ? s != null && l === "onScroll" && re("scroll", e)
                                                : s != null && Bo(e, l, s, o));
                            }
                        switch (n) {
                            case "input":
                                (Kr(e), qs(e, r, !1));
                                break;
                            case "textarea":
                                (Kr(e), ea(e));
                                break;
                            case "option":
                                r.value != null && e.setAttribute("value", "" + Kt(r.value));
                                break;
                            case "select":
                                ((e.multiple = !!r.multiple),
                                    (l = r.value),
                                    l != null
                                        ? Tn(e, !!r.multiple, l, !1)
                                        : r.defaultValue != null &&
                                        Tn(e, !!r.multiple, r.defaultValue, !0));
                                break;
                            default:
                                typeof i.onClick == "function" && (e.onclick = Ri);
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1;
                        }
                    }
                    r && (t.flags |= 4);
                }
                t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return (Re(t), null);
        case 6:
            if (e && t.stateNode != null) od(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null) throw Error(L(166));
                if (((n = ln(Pr.current)), ln(mt.current), ni(t))) {
                    if (
                        ((r = t.stateNode),
                            (n = t.memoizedProps),
                            (r[pt] = t),
                            (l = r.nodeValue !== n) && ((e = He), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                ti(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !== !0 &&
                                    ti(r.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    l && (t.flags |= 4);
                } else
                    ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
                        (r[pt] = t),
                        (t.stateNode = r));
            }
            return (Re(t), null);
        case 13:
            if (
                (ie(ue),
                    (r = t.memoizedState),
                    e === null ||
                    (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
            ) {
                if (le && We !== null && t.mode & 1 && !(t.flags & 128))
                    (_c(), $n(), (t.flags |= 98560), (l = !1));
                else if (((l = ni(t)), r !== null && r.dehydrated !== null)) {
                    if (e === null) {
                        if (!l) throw Error(L(318));
                        if (
                            ((l = t.memoizedState),
                                (l = l !== null ? l.dehydrated : null),
                                !l)
                        )
                            throw Error(L(317));
                        l[pt] = t;
                    } else
                        ($n(),
                            !(t.flags & 128) && (t.memoizedState = null),
                            (t.flags |= 4));
                    (Re(t), (l = !1));
                } else (lt !== null && (To(lt), (lt = null)), (l = !0));
                if (!l) return t.flags & 65536 ? t : null;
            }
            return t.flags & 128
                ? ((t.lanes = n), t)
                : ((r = r !== null),
                    r !== (e !== null && e.memoizedState !== null) &&
                    r &&
                    ((t.child.flags |= 8192),
                        t.mode & 1 &&
                        (e === null || ue.current & 1 ? ye === 0 && (ye = 3) : _s())),
                    t.updateQueue !== null && (t.flags |= 4),
                    Re(t),
                    null);
        case 4:
            return (
                Bn(),
                _o(e, t),
                e === null && jr(t.stateNode.containerInfo),
                Re(t),
                null
            );
        case 10:
            return (ss(t.type._context), Re(t), null);
        case 17:
            return ($e(t.type) && Pi(), Re(t), null);
        case 19:
            if ((ie(ue), (l = t.memoizedState), l === null)) return (Re(t), null);
            if (((r = (t.flags & 128) !== 0), (o = l.rendering), o === null))
                if (r) nr(l, !1);
                else {
                    if (ye !== 0 || (e !== null && e.flags & 128))
                        for (e = t.child; e !== null;) {
                            if (((o = Fi(e)), o !== null)) {
                                for (
                                    t.flags |= 128,
                                    nr(l, !1),
                                    r = o.updateQueue,
                                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                                    t.subtreeFlags = 0,
                                    r = n,
                                    n = t.child;
                                    n !== null;
                                )
                                    ((l = n),
                                        (e = r),
                                        (l.flags &= 14680066),
                                        (o = l.alternate),
                                        o === null
                                            ? ((l.childLanes = 0),
                                                (l.lanes = e),
                                                (l.child = null),
                                                (l.subtreeFlags = 0),
                                                (l.memoizedProps = null),
                                                (l.memoizedState = null),
                                                (l.updateQueue = null),
                                                (l.dependencies = null),
                                                (l.stateNode = null))
                                            : ((l.childLanes = o.childLanes),
                                                (l.lanes = o.lanes),
                                                (l.child = o.child),
                                                (l.subtreeFlags = 0),
                                                (l.deletions = null),
                                                (l.memoizedProps = o.memoizedProps),
                                                (l.memoizedState = o.memoizedState),
                                                (l.updateQueue = o.updateQueue),
                                                (l.type = o.type),
                                                (e = o.dependencies),
                                                (l.dependencies =
                                                    e === null
                                                        ? null
                                                        : {
                                                            lanes: e.lanes,
                                                            firstContext: e.firstContext,
                                                        })),
                                        (n = n.sibling));
                                return (ee(ue, (ue.current & 1) | 2), t.child);
                            }
                            e = e.sibling;
                        }
                    l.tail !== null &&
                        pe() > Hn &&
                        ((t.flags |= 128), (r = !0), nr(l, !1), (t.lanes = 4194304));
                }
            else {
                if (!r)
                    if (((e = Fi(o)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                                (r = !0),
                                (n = e.updateQueue),
                                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                                nr(l, !0),
                                l.tail === null && l.tailMode === "hidden" && !o.alternate && !le)
                        )
                            return (Re(t), null);
                    } else
                        2 * pe() - l.renderingStartTime > Hn &&
                            n !== 1073741824 &&
                            ((t.flags |= 128), (r = !0), nr(l, !1), (t.lanes = 4194304));
                l.isBackwards
                    ? ((o.sibling = t.child), (t.child = o))
                    : ((n = l.last),
                        n !== null ? (n.sibling = o) : (t.child = o),
                        (l.last = o));
            }
            return l.tail !== null
                ? ((t = l.tail),
                    (l.rendering = t),
                    (l.tail = t.sibling),
                    (l.renderingStartTime = pe()),
                    (t.sibling = null),
                    (n = ue.current),
                    ee(ue, r ? (n & 1) | 2 : n & 1),
                    t)
                : (Re(t), null);
        case 22:
        case 23:
            return (
                Es(),
                (r = t.memoizedState !== null),
                e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
                r && t.mode & 1
                    ? Be & 1073741824 && (Re(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                    : Re(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(L(156, t.tag));
}
function Kp(e, t) {
    switch ((rs(t), t.tag)) {
        case 1:
            return (
                $e(t.type) && Pi(),
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 3:
            return (
                Bn(),
                ie(Ue),
                ie(ze),
                fs(),
                (e = t.flags),
                e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 5:
            return (ds(t), null);
        case 13:
            if (
                (ie(ue), (e = t.memoizedState), e !== null && e.dehydrated !== null)
            ) {
                if (t.alternate === null) throw Error(L(340));
                $n();
            }
            return (
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 19:
            return (ie(ue), null);
        case 4:
            return (Bn(), null);
        case 10:
            return (ss(t.type._context), null);
        case 22:
        case 23:
            return (Es(), null);
        case 24:
            return null;
        default:
            return null;
    }
}
var li = !1,
    Pe = !1,
    Xp = typeof WeakSet == "function" ? WeakSet : Set,
    D = null;
function Pn(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null);
            } catch (r) {
                fe(e, t, r);
            }
        else n.current = null;
}
function Co(e, t, n) {
    try {
        n();
    } catch (r) {
        fe(e, t, r);
    }
}
var Wa = !1;
function Yp(e, t) {
    if (((so = ji), (e = dc()), ts(e))) {
        if ("selectionStart" in e)
            var n = { start: e.selectionStart, end: e.selectionEnd };
        else
            e: {
                n = ((n = e.ownerDocument) && n.defaultView) || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var i = r.anchorOffset,
                        l = r.focusNode;
                    r = r.focusOffset;
                    try {
                        (n.nodeType, l.nodeType);
                    } catch {
                        n = null;
                        break e;
                    }
                    var o = 0,
                        a = -1,
                        s = -1,
                        f = 0,
                        g = 0,
                        v = e,
                        x = null;
                    t: for (; ;) {
                        for (
                            var w;
                            v !== n || (i !== 0 && v.nodeType !== 3) || (a = o + i),
                            v !== l || (r !== 0 && v.nodeType !== 3) || (s = o + r),
                            v.nodeType === 3 && (o += v.nodeValue.length),
                            (w = v.firstChild) !== null;
                        )
                            ((x = v), (v = w));
                        for (; ;) {
                            if (v === e) break t;
                            if (
                                (x === n && ++f === i && (a = o),
                                    x === l && ++g === r && (s = o),
                                    (w = v.nextSibling) !== null)
                            )
                                break;
                            ((v = x), (x = v.parentNode));
                        }
                        v = w;
                    }
                    n = a === -1 || s === -1 ? null : { start: a, end: s };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (ao = { focusedElem: e, selectionRange: n }, ji = !1, D = t; D !== null;)
        if (((t = D), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
            ((e.return = t), (D = e));
        else
            for (; D !== null;) {
                t = D;
                try {
                    var _ = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (_ !== null) {
                                    var C = _.memoizedProps,
                                        j = _.memoizedState,
                                        h = t.stateNode,
                                        p = h.getSnapshotBeforeUpdate(
                                            t.elementType === t.type ? C : rt(t.type, C),
                                            j,
                                        );
                                    h.__reactInternalSnapshotBeforeUpdate = p;
                                }
                                break;
                            case 3:
                                var m = t.stateNode.containerInfo;
                                m.nodeType === 1
                                    ? (m.textContent = "")
                                    : m.nodeType === 9 &&
                                    m.documentElement &&
                                    m.removeChild(m.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(L(163));
                        }
                } catch (k) {
                    fe(t, t.return, k);
                }
                if (((e = t.sibling), e !== null)) {
                    ((e.return = t.return), (D = e));
                    break;
                }
                D = t.return;
            }
    return ((_ = Wa), (Wa = !1), _);
}
function mr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var i = (r = r.next);
        do {
            if ((i.tag & e) === e) {
                var l = i.destroy;
                ((i.destroy = void 0), l !== void 0 && Co(t, n, l));
            }
            i = i.next;
        } while (i !== r);
    }
}
function rl(e, t) {
    if (
        ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
        var n = (t = t.next);
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
            }
            n = n.next;
        } while (n !== t);
    }
}
function jo(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n;
        }
        typeof t == "function" ? t(e) : (t.current = e);
    }
}
function sd(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), sd(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
        ((t = e.stateNode),
            t !== null &&
            (delete t[pt], delete t[Lr], delete t[fo], delete t[zp], delete t[Tp])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
}
function ad(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ha(e) {
    e: for (; ;) {
        for (; e.sibling === null;) {
            if (e.return === null || ad(e.return)) return null;
            e = e.return;
        }
        for (
            e.sibling.return = e.return, e = e.sibling;
            e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
        ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            ((e.child.return = e), (e = e.child));
        }
        if (!(e.flags & 2)) return e.stateNode;
    }
}
function No(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        ((e = e.stateNode),
            t
                ? n.nodeType === 8
                    ? n.parentNode.insertBefore(e, t)
                    : n.insertBefore(e, t)
                : (n.nodeType === 8
                    ? ((t = n.parentNode), t.insertBefore(e, n))
                    : ((t = n), t.appendChild(e)),
                    (n = n._reactRootContainer),
                    n != null || t.onclick !== null || (t.onclick = Ri)));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (No(e, t, n), e = e.sibling; e !== null;)
            (No(e, t, n), (e = e.sibling));
}
function Lo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (Lo(e, t, n), e = e.sibling; e !== null;)
            (Lo(e, t, n), (e = e.sibling));
}
var Ee = null,
    it = !1;
function Pt(e, t, n) {
    for (n = n.child; n !== null;) (ud(e, t, n), (n = n.sibling));
}
function ud(e, t, n) {
    if (ht && typeof ht.onCommitFiberUnmount == "function")
        try {
            ht.onCommitFiberUnmount(Yi, n);
        } catch { }
    switch (n.tag) {
        case 5:
            Pe || Pn(n, t);
        case 6:
            var r = Ee,
                i = it;
            ((Ee = null),
                Pt(e, t, n),
                (Ee = r),
                (it = i),
                Ee !== null &&
                (it
                    ? ((e = Ee),
                        (n = n.stateNode),
                        e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
                    : Ee.removeChild(n.stateNode)));
            break;
        case 18:
            Ee !== null &&
                (it
                    ? ((e = Ee),
                        (n = n.stateNode),
                        e.nodeType === 8
                            ? Rl(e.parentNode, n)
                            : e.nodeType === 1 && Rl(e, n),
                        Er(e))
                    : Rl(Ee, n.stateNode));
            break;
        case 4:
            ((r = Ee),
                (i = it),
                (Ee = n.stateNode.containerInfo),
                (it = !0),
                Pt(e, t, n),
                (Ee = r),
                (it = i));
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (
                !Pe &&
                ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
            ) {
                i = r = r.next;
                do {
                    var l = i,
                        o = l.destroy;
                    ((l = l.tag),
                        o !== void 0 && (l & 2 || l & 4) && Co(n, t, o),
                        (i = i.next));
                } while (i !== r);
            }
            Pt(e, t, n);
            break;
        case 1:
            if (
                !Pe &&
                (Pn(n, t),
                    (r = n.stateNode),
                    typeof r.componentWillUnmount == "function")
            )
                try {
                    ((r.props = n.memoizedProps),
                        (r.state = n.memoizedState),
                        r.componentWillUnmount());
                } catch (a) {
                    fe(n, t, a);
                }
            Pt(e, t, n);
            break;
        case 21:
            Pt(e, t, n);
            break;
        case 22:
            n.mode & 1
                ? ((Pe = (r = Pe) || n.memoizedState !== null), Pt(e, t, n), (Pe = r))
                : Pt(e, t, n);
            break;
        default:
            Pt(e, t, n);
    }
}
function Va(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        (n === null && (n = e.stateNode = new Xp()),
            t.forEach(function (r) {
                var i = ih.bind(null, e, r);
                n.has(r) || (n.add(r), r.then(i, i));
            }));
    }
}
function nt(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var l = e,
                    o = t,
                    a = o;
                e: for (; a !== null;) {
                    switch (a.tag) {
                        case 5:
                            ((Ee = a.stateNode), (it = !1));
                            break e;
                        case 3:
                            ((Ee = a.stateNode.containerInfo), (it = !0));
                            break e;
                        case 4:
                            ((Ee = a.stateNode.containerInfo), (it = !0));
                            break e;
                    }
                    a = a.return;
                }
                if (Ee === null) throw Error(L(160));
                (ud(l, o, i), (Ee = null), (it = !1));
                var s = i.alternate;
                (s !== null && (s.return = null), (i.return = null));
            } catch (f) {
                fe(i, t, f);
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null;) (cd(t, e), (t = t.sibling));
}
function cd(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if ((nt(t, e), ct(e), r & 4)) {
                try {
                    (mr(3, e, e.return), rl(3, e));
                } catch (C) {
                    fe(e, e.return, C);
                }
                try {
                    mr(5, e, e.return);
                } catch (C) {
                    fe(e, e.return, C);
                }
            }
            break;
        case 1:
            (nt(t, e), ct(e), r & 512 && n !== null && Pn(n, n.return));
            break;
        case 5:
            if (
                (nt(t, e),
                    ct(e),
                    r & 512 && n !== null && Pn(n, n.return),
                    e.flags & 32)
            ) {
                var i = e.stateNode;
                try {
                    xr(i, "");
                } catch (C) {
                    fe(e, e.return, C);
                }
            }
            if (r & 4 && ((i = e.stateNode), i != null)) {
                var l = e.memoizedProps,
                    o = n !== null ? n.memoizedProps : l,
                    a = e.type,
                    s = e.updateQueue;
                if (((e.updateQueue = null), s !== null))
                    try {
                        (a === "input" && l.type === "radio" && l.name != null && Tu(i, l),
                            Zl(a, o));
                        var f = Zl(a, l);
                        for (o = 0; o < s.length; o += 2) {
                            var g = s[o],
                                v = s[o + 1];
                            g === "style"
                                ? Fu(i, v)
                                : g === "dangerouslySetInnerHTML"
                                    ? Du(i, v)
                                    : g === "children"
                                        ? xr(i, v)
                                        : Bo(i, g, v, f);
                        }
                        switch (a) {
                            case "input":
                                Ql(i, l);
                                break;
                            case "textarea":
                                Ou(i, l);
                                break;
                            case "select":
                                var x = i._wrapperState.wasMultiple;
                                i._wrapperState.wasMultiple = !!l.multiple;
                                var w = l.value;
                                w != null
                                    ? Tn(i, !!l.multiple, w, !1)
                                    : x !== !!l.multiple &&
                                    (l.defaultValue != null
                                        ? Tn(i, !!l.multiple, l.defaultValue, !0)
                                        : Tn(i, !!l.multiple, l.multiple ? [] : "", !1));
                        }
                        i[Lr] = l;
                    } catch (C) {
                        fe(e, e.return, C);
                    }
            }
            break;
        case 6:
            if ((nt(t, e), ct(e), r & 4)) {
                if (e.stateNode === null) throw Error(L(162));
                ((i = e.stateNode), (l = e.memoizedProps));
                try {
                    i.nodeValue = l;
                } catch (C) {
                    fe(e, e.return, C);
                }
            }
            break;
        case 3:
            if (
                (nt(t, e), ct(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
            )
                try {
                    Er(t.containerInfo);
                } catch (C) {
                    fe(e, e.return, C);
                }
            break;
        case 4:
            (nt(t, e), ct(e));
            break;
        case 13:
            (nt(t, e),
                ct(e),
                (i = e.child),
                i.flags & 8192 &&
                ((l = i.memoizedState !== null),
                    (i.stateNode.isHidden = l),
                    !l ||
                    (i.alternate !== null && i.alternate.memoizedState !== null) ||
                    (ks = pe())),
                r & 4 && Va(e));
            break;
        case 22:
            if (
                ((g = n !== null && n.memoizedState !== null),
                    e.mode & 1 ? ((Pe = (f = Pe) || g), nt(t, e), (Pe = f)) : nt(t, e),
                    ct(e),
                    r & 8192)
            ) {
                if (
                    ((f = e.memoizedState !== null),
                        (e.stateNode.isHidden = f) && !g && e.mode & 1)
                )
                    for (D = e, g = e.child; g !== null;) {
                        for (v = D = g; D !== null;) {
                            switch (((x = D), (w = x.child), x.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    mr(4, x, x.return);
                                    break;
                                case 1:
                                    Pn(x, x.return);
                                    var _ = x.stateNode;
                                    if (typeof _.componentWillUnmount == "function") {
                                        ((r = x), (n = x.return));
                                        try {
                                            ((t = r),
                                                (_.props = t.memoizedProps),
                                                (_.state = t.memoizedState),
                                                _.componentWillUnmount());
                                        } catch (C) {
                                            fe(r, n, C);
                                        }
                                    }
                                    break;
                                case 5:
                                    Pn(x, x.return);
                                    break;
                                case 22:
                                    if (x.memoizedState !== null) {
                                        Ka(v);
                                        continue;
                                    }
                            }
                            w !== null ? ((w.return = x), (D = w)) : Ka(v);
                        }
                        g = g.sibling;
                    }
                e: for (g = null, v = e; ;) {
                    if (v.tag === 5) {
                        if (g === null) {
                            g = v;
                            try {
                                ((i = v.stateNode),
                                    f
                                        ? ((l = i.style),
                                            typeof l.setProperty == "function"
                                                ? l.setProperty("display", "none", "important")
                                                : (l.display = "none"))
                                        : ((a = v.stateNode),
                                            (s = v.memoizedProps.style),
                                            (o =
                                                s != null && s.hasOwnProperty("display")
                                                    ? s.display
                                                    : null),
                                            (a.style.display = Iu("display", o))));
                            } catch (C) {
                                fe(e, e.return, C);
                            }
                        }
                    } else if (v.tag === 6) {
                        if (g === null)
                            try {
                                v.stateNode.nodeValue = f ? "" : v.memoizedProps;
                            } catch (C) {
                                fe(e, e.return, C);
                            }
                    } else if (
                        ((v.tag !== 22 && v.tag !== 23) ||
                            v.memoizedState === null ||
                            v === e) &&
                        v.child !== null
                    ) {
                        ((v.child.return = v), (v = v.child));
                        continue;
                    }
                    if (v === e) break e;
                    for (; v.sibling === null;) {
                        if (v.return === null || v.return === e) break e;
                        (g === v && (g = null), (v = v.return));
                    }
                    (g === v && (g = null),
                        (v.sibling.return = v.return),
                        (v = v.sibling));
                }
            }
            break;
        case 19:
            (nt(t, e), ct(e), r & 4 && Va(e));
            break;
        case 21:
            break;
        default:
            (nt(t, e), ct(e));
    }
}
function ct(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null;) {
                    if (ad(n)) {
                        var r = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(L(160));
            }
            switch (r.tag) {
                case 5:
                    var i = r.stateNode;
                    r.flags & 32 && (xr(i, ""), (r.flags &= -33));
                    var l = Ha(e);
                    Lo(e, l, i);
                    break;
                case 3:
                case 4:
                    var o = r.stateNode.containerInfo,
                        a = Ha(e);
                    No(e, a, o);
                    break;
                default:
                    throw Error(L(161));
            }
        } catch (s) {
            fe(e, e.return, s);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function Gp(e, t, n) {
    ((D = e), dd(e));
}
function dd(e, t, n) {
    for (var r = (e.mode & 1) !== 0; D !== null;) {
        var i = D,
            l = i.child;
        if (i.tag === 22 && r) {
            var o = i.memoizedState !== null || li;
            if (!o) {
                var a = i.alternate,
                    s = (a !== null && a.memoizedState !== null) || Pe;
                a = li;
                var f = Pe;
                if (((li = o), (Pe = s) && !f))
                    for (D = i; D !== null;)
                        ((o = D),
                            (s = o.child),
                            o.tag === 22 && o.memoizedState !== null
                                ? Xa(i)
                                : s !== null
                                    ? ((s.return = o), (D = s))
                                    : Xa(i));
                for (; l !== null;) ((D = l), dd(l), (l = l.sibling));
                ((D = i), (li = a), (Pe = f));
            }
            Qa(e);
        } else
            i.subtreeFlags & 8772 && l !== null ? ((l.return = i), (D = l)) : Qa(e);
    }
}
function Qa(e) {
    for (; D !== null;) {
        var t = D;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            Pe || rl(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !Pe)
                                if (n === null) r.componentDidMount();
                                else {
                                    var i =
                                        t.elementType === t.type
                                            ? n.memoizedProps
                                            : rt(t.type, n.memoizedProps);
                                    r.componentDidUpdate(
                                        i,
                                        n.memoizedState,
                                        r.__reactInternalSnapshotBeforeUpdate,
                                    );
                                }
                            var l = t.updateQueue;
                            l !== null && Pa(t, l, r);
                            break;
                        case 3:
                            var o = t.updateQueue;
                            if (o !== null) {
                                if (((n = null), t.child !== null))
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode;
                                    }
                                Pa(t, o, n);
                            }
                            break;
                        case 5:
                            var a = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = a;
                                var s = t.memoizedProps;
                                switch (t.type) {
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        s.autoFocus && n.focus();
                                        break;
                                    case "img":
                                        s.src && (n.src = s.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var f = t.alternate;
                                if (f !== null) {
                                    var g = f.memoizedState;
                                    if (g !== null) {
                                        var v = g.dehydrated;
                                        v !== null && Er(v);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(L(163));
                    }
                Pe || (t.flags & 512 && jo(t));
            } catch (x) {
                fe(t, t.return, x);
            }
        }
        if (t === e) {
            D = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            ((n.return = t.return), (D = n));
            break;
        }
        D = t.return;
    }
}
function Ka(e) {
    for (; D !== null;) {
        var t = D;
        if (t === e) {
            D = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            ((n.return = t.return), (D = n));
            break;
        }
        D = t.return;
    }
}
function Xa(e) {
    for (; D !== null;) {
        var t = D;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        rl(4, t);
                    } catch (s) {
                        fe(t, n, s);
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var i = t.return;
                        try {
                            r.componentDidMount();
                        } catch (s) {
                            fe(t, i, s);
                        }
                    }
                    var l = t.return;
                    try {
                        jo(t);
                    } catch (s) {
                        fe(t, l, s);
                    }
                    break;
                case 5:
                    var o = t.return;
                    try {
                        jo(t);
                    } catch (s) {
                        fe(t, o, s);
                    }
            }
        } catch (s) {
            fe(t, t.return, s);
        }
        if (t === e) {
            D = null;
            break;
        }
        var a = t.sibling;
        if (a !== null) {
            ((a.return = t.return), (D = a));
            break;
        }
        D = t.return;
    }
}
var Zp = Math.ceil,
    $i = Nt.ReactCurrentDispatcher,
    xs = Nt.ReactCurrentOwner,
    qe = Nt.ReactCurrentBatchConfig,
    V = 0,
    ke = null,
    me = null,
    _e = 0,
    Be = 0,
    zn = Gt(0),
    ye = 0,
    Mr = null,
    dn = 0,
    il = 0,
    ws = 0,
    vr = null,
    Fe = null,
    ks = 0,
    Hn = 1 / 0,
    yt = null,
    bi = !1,
    Ro = null,
    Wt = null,
    oi = !1,
    It = null,
    Bi = 0,
    gr = 0,
    Po = null,
    yi = -1,
    xi = 0;
function Oe() {
    return V & 6 ? pe() : yi !== -1 ? yi : (yi = pe());
}
function Ht(e) {
    return e.mode & 1
        ? V & 2 && _e !== 0
            ? _e & -_e
            : Mp.transition !== null
                ? (xi === 0 && (xi = Yu()), xi)
                : ((e = Y),
                    e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : nc(e.type))),
                    e)
        : 1;
}
function st(e, t, n, r) {
    if (50 < gr) throw ((gr = 0), (Po = null), Error(L(185)));
    (Ar(e, n, r),
        (!(V & 2) || e !== ke) &&
        (e === ke && (!(V & 2) && (il |= n), ye === 4 && Mt(e, _e)),
            be(e, r),
            n === 1 && V === 0 && !(t.mode & 1) && ((Hn = pe() + 500), el && Zt())));
}
function be(e, t) {
    var n = e.callbackNode;
    Mf(e, t);
    var r = Ci(e, e === ke ? _e : 0);
    if (r === 0)
        (n !== null && ra(n), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && ra(n), t === 1))
            (e.tag === 0 ? Op(Ya.bind(null, e)) : kc(Ya.bind(null, e)),
                Rp(function () {
                    !(V & 6) && Zt();
                }),
                (n = null));
        else {
            switch (Gu(r)) {
                case 1:
                    n = Ko;
                    break;
                case 4:
                    n = Ku;
                    break;
                case 16:
                    n = _i;
                    break;
                case 536870912:
                    n = Xu;
                    break;
                default:
                    n = _i;
            }
            n = xd(n, fd.bind(null, e));
        }
        ((e.callbackPriority = t), (e.callbackNode = n));
    }
}
function fd(e, t) {
    if (((yi = -1), (xi = 0), V & 6)) throw Error(L(327));
    var n = e.callbackNode;
    if (Fn() && e.callbackNode !== n) return null;
    var r = Ci(e, e === ke ? _e : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = Wi(e, r);
    else {
        t = r;
        var i = V;
        V |= 2;
        var l = hd();
        (ke !== e || _e !== t) && ((yt = null), (Hn = pe() + 500), on(e, t));
        do
            try {
                eh();
                break;
            } catch (a) {
                pd(e, a);
            }
        while (!0);
        (os(),
            ($i.current = l),
            (V = i),
            me !== null ? (t = 0) : ((ke = null), (_e = 0), (t = ye)));
    }
    if (t !== 0) {
        if (
            (t === 2 && ((i = no(e)), i !== 0 && ((r = i), (t = zo(e, i)))), t === 1)
        )
            throw ((n = Mr), on(e, 0), Mt(e, r), be(e, pe()), n);
        if (t === 6) Mt(e, r);
        else {
            if (
                ((i = e.current.alternate),
                    !(r & 30) &&
                    !qp(i) &&
                    ((t = Wi(e, r)),
                        t === 2 && ((l = no(e)), l !== 0 && ((r = l), (t = zo(e, l)))),
                        t === 1))
            )
                throw ((n = Mr), on(e, 0), Mt(e, r), be(e, pe()), n);
            switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                    throw Error(L(345));
                case 2:
                    tn(e, Fe, yt);
                    break;
                case 3:
                    if (
                        (Mt(e, r), (r & 130023424) === r && ((t = ks + 500 - pe()), 10 < t))
                    ) {
                        if (Ci(e, 0) !== 0) break;
                        if (((i = e.suspendedLanes), (i & r) !== r)) {
                            (Oe(), (e.pingedLanes |= e.suspendedLanes & i));
                            break;
                        }
                        e.timeoutHandle = co(tn.bind(null, e, Fe, yt), t);
                        break;
                    }
                    tn(e, Fe, yt);
                    break;
                case 4:
                    if ((Mt(e, r), (r & 4194240) === r)) break;
                    for (t = e.eventTimes, i = -1; 0 < r;) {
                        var o = 31 - ot(r);
                        ((l = 1 << o), (o = t[o]), o > i && (i = o), (r &= ~l));
                    }
                    if (
                        ((r = i),
                            (r = pe() - r),
                            (r =
                                (120 > r
                                    ? 120
                                    : 480 > r
                                        ? 480
                                        : 1080 > r
                                            ? 1080
                                            : 1920 > r
                                                ? 1920
                                                : 3e3 > r
                                                    ? 3e3
                                                    : 4320 > r
                                                        ? 4320
                                                        : 1960 * Zp(r / 1960)) - r),
                            10 < r)
                    ) {
                        e.timeoutHandle = co(tn.bind(null, e, Fe, yt), r);
                        break;
                    }
                    tn(e, Fe, yt);
                    break;
                case 5:
                    tn(e, Fe, yt);
                    break;
                default:
                    throw Error(L(329));
            }
        }
    }
    return (be(e, pe()), e.callbackNode === n ? fd.bind(null, e) : null);
}
function zo(e, t) {
    var n = vr;
    return (
        e.current.memoizedState.isDehydrated && (on(e, t).flags |= 256),
        (e = Wi(e, t)),
        e !== 2 && ((t = Fe), (Fe = n), t !== null && To(t)),
        e
    );
}
function To(e) {
    Fe === null ? (Fe = e) : Fe.push.apply(Fe, e);
}
function qp(e) {
    for (var t = e; ;) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        l = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!at(l(), i)) return !1;
                    } catch {
                        return !1;
                    }
                }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
            ((n.return = t), (t = n));
        else {
            if (t === e) break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e) return !0;
                t = t.return;
            }
            ((t.sibling.return = t.return), (t = t.sibling));
        }
    }
    return !0;
}
function Mt(e, t) {
    for (
        t &= ~ws,
        t &= ~il,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
        0 < t;
    ) {
        var n = 31 - ot(t),
            r = 1 << n;
        ((e[n] = -1), (t &= ~r));
    }
}
function Ya(e) {
    if (V & 6) throw Error(L(327));
    Fn();
    var t = Ci(e, 0);
    if (!(t & 1)) return (be(e, pe()), null);
    var n = Wi(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = no(e);
        r !== 0 && ((t = r), (n = zo(e, r)));
    }
    if (n === 1) throw ((n = Mr), on(e, 0), Mt(e, t), be(e, pe()), n);
    if (n === 6) throw Error(L(345));
    return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        tn(e, Fe, yt),
        be(e, pe()),
        null
    );
}
function Ss(e, t) {
    var n = V;
    V |= 1;
    try {
        return e(t);
    } finally {
        ((V = n), V === 0 && ((Hn = pe() + 500), el && Zt()));
    }
}
function fn(e) {
    It !== null && It.tag === 0 && !(V & 6) && Fn();
    var t = V;
    V |= 1;
    var n = qe.transition,
        r = Y;
    try {
        if (((qe.transition = null), (Y = 1), e)) return e();
    } finally {
        ((Y = r), (qe.transition = n), (V = t), !(V & 6) && Zt());
    }
}
function Es() {
    ((Be = zn.current), ie(zn));
}
function on(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), Lp(n)), me !== null))
        for (n = me.return; n !== null;) {
            var r = n;
            switch ((rs(r), r.tag)) {
                case 1:
                    ((r = r.type.childContextTypes), r != null && Pi());
                    break;
                case 3:
                    (Bn(), ie(Ue), ie(ze), fs());
                    break;
                case 5:
                    ds(r);
                    break;
                case 4:
                    Bn();
                    break;
                case 13:
                    ie(ue);
                    break;
                case 19:
                    ie(ue);
                    break;
                case 10:
                    ss(r.type._context);
                    break;
                case 22:
                case 23:
                    Es();
            }
            n = n.return;
        }
    if (
        ((ke = e),
            (me = e = Vt(e.current, null)),
            (_e = Be = t),
            (ye = 0),
            (Mr = null),
            (ws = il = dn = 0),
            (Fe = vr = null),
            rn !== null)
    ) {
        for (t = 0; t < rn.length; t++)
            if (((n = rn[t]), (r = n.interleaved), r !== null)) {
                n.interleaved = null;
                var i = r.next,
                    l = n.pending;
                if (l !== null) {
                    var o = l.next;
                    ((l.next = i), (r.next = o));
                }
                n.pending = r;
            }
        rn = null;
    }
    return e;
}
function pd(e, t) {
    do {
        var n = me;
        try {
            if ((os(), (mi.current = Ui), Ai)) {
                for (var r = ce.memoizedState; r !== null;) {
                    var i = r.queue;
                    (i !== null && (i.pending = null), (r = r.next));
                }
                Ai = !1;
            }
            if (
                ((cn = 0),
                    (we = ge = ce = null),
                    (hr = !1),
                    (zr = 0),
                    (xs.current = null),
                    n === null || n.return === null)
            ) {
                ((ye = 1), (Mr = t), (me = null));
                break;
            }
            e: {
                var l = e,
                    o = n.return,
                    a = n,
                    s = t;
                if (
                    ((t = _e),
                        (a.flags |= 32768),
                        s !== null && typeof s == "object" && typeof s.then == "function")
                ) {
                    var f = s,
                        g = a,
                        v = g.tag;
                    if (!(g.mode & 1) && (v === 0 || v === 11 || v === 15)) {
                        var x = g.alternate;
                        x
                            ? ((g.updateQueue = x.updateQueue),
                                (g.memoizedState = x.memoizedState),
                                (g.lanes = x.lanes))
                            : ((g.updateQueue = null), (g.memoizedState = null));
                    }
                    var w = Ia(o);
                    if (w !== null) {
                        ((w.flags &= -257),
                            Fa(w, o, a, l, t),
                            w.mode & 1 && Da(l, f, t),
                            (t = w),
                            (s = f));
                        var _ = t.updateQueue;
                        if (_ === null) {
                            var C = new Set();
                            (C.add(s), (t.updateQueue = C));
                        } else _.add(s);
                        break e;
                    } else {
                        if (!(t & 1)) {
                            (Da(l, f, t), _s());
                            break e;
                        }
                        s = Error(L(426));
                    }
                } else if (le && a.mode & 1) {
                    var j = Ia(o);
                    if (j !== null) {
                        (!(j.flags & 65536) && (j.flags |= 256),
                            Fa(j, o, a, l, t),
                            is(Wn(s, a)));
                        break e;
                    }
                }
                ((l = s = Wn(s, a)),
                    ye !== 4 && (ye = 2),
                    vr === null ? (vr = [l]) : vr.push(l),
                    (l = o));
                do {
                    switch (l.tag) {
                        case 3:
                            ((l.flags |= 65536), (t &= -t), (l.lanes |= t));
                            var h = Gc(l, s, t);
                            Ra(l, h);
                            break e;
                        case 1:
                            a = s;
                            var p = l.type,
                                m = l.stateNode;
                            if (
                                !(l.flags & 128) &&
                                (typeof p.getDerivedStateFromError == "function" ||
                                    (m !== null &&
                                        typeof m.componentDidCatch == "function" &&
                                        (Wt === null || !Wt.has(m))))
                            ) {
                                ((l.flags |= 65536), (t &= -t), (l.lanes |= t));
                                var k = Zc(l, a, t);
                                Ra(l, k);
                                break e;
                            }
                    }
                    l = l.return;
                } while (l !== null);
            }
            vd(n);
        } catch (P) {
            ((t = P), me === n && n !== null && (me = n = n.return));
            continue;
        }
        break;
    } while (!0);
}
function hd() {
    var e = $i.current;
    return (($i.current = Ui), e === null ? Ui : e);
}
function _s() {
    ((ye === 0 || ye === 3 || ye === 2) && (ye = 4),
        ke === null || (!(dn & 268435455) && !(il & 268435455)) || Mt(ke, _e));
}
function Wi(e, t) {
    var n = V;
    V |= 2;
    var r = hd();
    (ke !== e || _e !== t) && ((yt = null), on(e, t));
    do
        try {
            Jp();
            break;
        } catch (i) {
            pd(e, i);
        }
    while (!0);
    if ((os(), (V = n), ($i.current = r), me !== null)) throw Error(L(261));
    return ((ke = null), (_e = 0), ye);
}
function Jp() {
    for (; me !== null;) md(me);
}
function eh() {
    for (; me !== null && !Cf();) md(me);
}
function md(e) {
    var t = yd(e.alternate, e, Be);
    ((e.memoizedProps = e.pendingProps),
        t === null ? vd(e) : (me = t),
        (xs.current = null));
}
function vd(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
            if (((n = Kp(n, t)), n !== null)) {
                ((n.flags &= 32767), (me = n));
                return;
            }
            if (e !== null)
                ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
            else {
                ((ye = 6), (me = null));
                return;
            }
        } else if (((n = Qp(n, t, Be)), n !== null)) {
            me = n;
            return;
        }
        if (((t = t.sibling), t !== null)) {
            me = t;
            return;
        }
        me = t = e;
    } while (t !== null);
    ye === 0 && (ye = 5);
}
function tn(e, t, n) {
    var r = Y,
        i = qe.transition;
    try {
        ((qe.transition = null), (Y = 1), th(e, t, n, r));
    } finally {
        ((qe.transition = i), (Y = r));
    }
    return null;
}
function th(e, t, n, r) {
    do Fn();
    while (It !== null);
    if (V & 6) throw Error(L(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(L(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var l = n.lanes | n.childLanes;
    if (
        (Df(e, l),
            e === ke && ((me = ke = null), (_e = 0)),
            (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
            oi ||
            ((oi = !0),
                xd(_i, function () {
                    return (Fn(), null);
                })),
            (l = (n.flags & 15990) !== 0),
            n.subtreeFlags & 15990 || l)
    ) {
        ((l = qe.transition), (qe.transition = null));
        var o = Y;
        Y = 1;
        var a = V;
        ((V |= 4),
            (xs.current = null),
            Yp(e, n),
            cd(n, e),
            kp(ao),
            (ji = !!so),
            (ao = so = null),
            (e.current = n),
            Gp(n),
            jf(),
            (V = a),
            (Y = o),
            (qe.transition = l));
    } else e.current = n;
    if (
        (oi && ((oi = !1), (It = e), (Bi = i)),
            (l = e.pendingLanes),
            l === 0 && (Wt = null),
            Rf(n.stateNode),
            be(e, pe()),
            t !== null)
    )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            ((i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest }));
    if (bi) throw ((bi = !1), (e = Ro), (Ro = null), e);
    return (
        Bi & 1 && e.tag !== 0 && Fn(),
        (l = e.pendingLanes),
        l & 1 ? (e === Po ? gr++ : ((gr = 0), (Po = e))) : (gr = 0),
        Zt(),
        null
    );
}
function Fn() {
    if (It !== null) {
        var e = Gu(Bi),
            t = qe.transition,
            n = Y;
        try {
            if (((qe.transition = null), (Y = 16 > e ? 16 : e), It === null))
                var r = !1;
            else {
                if (((e = It), (It = null), (Bi = 0), V & 6)) throw Error(L(331));
                var i = V;
                for (V |= 4, D = e.current; D !== null;) {
                    var l = D,
                        o = l.child;
                    if (D.flags & 16) {
                        var a = l.deletions;
                        if (a !== null) {
                            for (var s = 0; s < a.length; s++) {
                                var f = a[s];
                                for (D = f; D !== null;) {
                                    var g = D;
                                    switch (g.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            mr(8, g, l);
                                    }
                                    var v = g.child;
                                    if (v !== null) ((v.return = g), (D = v));
                                    else
                                        for (; D !== null;) {
                                            g = D;
                                            var x = g.sibling,
                                                w = g.return;
                                            if ((sd(g), g === f)) {
                                                D = null;
                                                break;
                                            }
                                            if (x !== null) {
                                                ((x.return = w), (D = x));
                                                break;
                                            }
                                            D = w;
                                        }
                                }
                            }
                            var _ = l.alternate;
                            if (_ !== null) {
                                var C = _.child;
                                if (C !== null) {
                                    _.child = null;
                                    do {
                                        var j = C.sibling;
                                        ((C.sibling = null), (C = j));
                                    } while (C !== null);
                                }
                            }
                            D = l;
                        }
                    }
                    if (l.subtreeFlags & 2064 && o !== null) ((o.return = l), (D = o));
                    else
                        e: for (; D !== null;) {
                            if (((l = D), l.flags & 2048))
                                switch (l.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        mr(9, l, l.return);
                                }
                            var h = l.sibling;
                            if (h !== null) {
                                ((h.return = l.return), (D = h));
                                break e;
                            }
                            D = l.return;
                        }
                }
                var p = e.current;
                for (D = p; D !== null;) {
                    o = D;
                    var m = o.child;
                    if (o.subtreeFlags & 2064 && m !== null) ((m.return = o), (D = m));
                    else
                        e: for (o = p; D !== null;) {
                            if (((a = D), a.flags & 2048))
                                try {
                                    switch (a.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            rl(9, a);
                                    }
                                } catch (P) {
                                    fe(a, a.return, P);
                                }
                            if (a === o) {
                                D = null;
                                break e;
                            }
                            var k = a.sibling;
                            if (k !== null) {
                                ((k.return = a.return), (D = k));
                                break e;
                            }
                            D = a.return;
                        }
                }
                if (
                    ((V = i), Zt(), ht && typeof ht.onPostCommitFiberRoot == "function")
                )
                    try {
                        ht.onPostCommitFiberRoot(Yi, e);
                    } catch { }
                r = !0;
            }
            return r;
        } finally {
            ((Y = n), (qe.transition = t));
        }
    }
    return !1;
}
function Ga(e, t, n) {
    ((t = Wn(n, t)),
        (t = Gc(e, t, 1)),
        (e = Bt(e, t, 1)),
        (t = Oe()),
        e !== null && (Ar(e, 1, t), be(e, t)));
}
function fe(e, t, n) {
    if (e.tag === 3) Ga(e, e, n);
    else
        for (; t !== null;) {
            if (t.tag === 3) {
                Ga(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == "function" ||
                    (typeof r.componentDidCatch == "function" &&
                        (Wt === null || !Wt.has(r)))
                ) {
                    ((e = Wn(n, e)),
                        (e = Zc(t, e, 1)),
                        (t = Bt(t, e, 1)),
                        (e = Oe()),
                        t !== null && (Ar(t, 1, e), be(t, e)));
                    break;
                }
            }
            t = t.return;
        }
}
function nh(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
        (t = Oe()),
        (e.pingedLanes |= e.suspendedLanes & n),
        ke === e &&
        (_e & n) === n &&
        (ye === 4 || (ye === 3 && (_e & 130023424) === _e && 500 > pe() - ks)
            ? on(e, 0)
            : (ws |= n)),
        be(e, t));
}
function gd(e, t) {
    t === 0 &&
        (e.mode & 1
            ? ((t = Gr), (Gr <<= 1), !(Gr & 130023424) && (Gr = 4194304))
            : (t = 1));
    var n = Oe();
    ((e = Ct(e, t)), e !== null && (Ar(e, t, n), be(e, n)));
}
function rh(e) {
    var t = e.memoizedState,
        n = 0;
    (t !== null && (n = t.retryLane), gd(e, n));
}
function ih(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                i = e.memoizedState;
            i !== null && (n = i.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(L(314));
    }
    (r !== null && r.delete(t), gd(e, n));
}
var yd;
yd = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Ue.current) Ae = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128)) return ((Ae = !1), Vp(e, t, n));
            Ae = !!(e.flags & 131072);
        }
    else ((Ae = !1), le && t.flags & 1048576 && Sc(t, Oi, t.index));
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var r = t.type;
            (gi(e, t), (e = t.pendingProps));
            var i = Un(t, ze.current);
            (In(t, n), (i = hs(null, t, r, e, i, n)));
            var l = ms();
            return (
                (t.flags |= 1),
                typeof i == "object" &&
                    i !== null &&
                    typeof i.render == "function" &&
                    i.$$typeof === void 0
                    ? ((t.tag = 1),
                        (t.memoizedState = null),
                        (t.updateQueue = null),
                        $e(r) ? ((l = !0), zi(t)) : (l = !1),
                        (t.memoizedState =
                            i.state !== null && i.state !== void 0 ? i.state : null),
                        us(t),
                        (i.updater = nl),
                        (t.stateNode = i),
                        (i._reactInternals = t),
                        yo(t, r, e, n),
                        (t = ko(null, t, r, !0, l, n)))
                    : ((t.tag = 0), le && l && ns(t), Te(null, t, i, n), (t = t.child)),
                t
            );
        case 16:
            r = t.elementType;
            e: {
                switch (
                (gi(e, t),
                    (e = t.pendingProps),
                    (i = r._init),
                    (r = i(r._payload)),
                    (t.type = r),
                    (i = t.tag = oh(r)),
                    (e = rt(r, e)),
                    i)
                ) {
                    case 0:
                        t = wo(null, t, r, e, n);
                        break e;
                    case 1:
                        t = $a(null, t, r, e, n);
                        break e;
                    case 11:
                        t = Aa(null, t, r, e, n);
                        break e;
                    case 14:
                        t = Ua(null, t, r, rt(r.type, e), n);
                        break e;
                }
                throw Error(L(306, r, ""));
            }
            return t;
        case 0:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : rt(r, i)),
                wo(e, t, r, i, n)
            );
        case 1:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : rt(r, i)),
                $a(e, t, r, i, n)
            );
        case 3:
            e: {
                if ((td(t), e === null)) throw Error(L(387));
                ((r = t.pendingProps),
                    (l = t.memoizedState),
                    (i = l.element),
                    Lc(e, t),
                    Ii(t, r, null, n));
                var o = t.memoizedState;
                if (((r = o.element), l.isDehydrated))
                    if (
                        ((l = {
                            element: r,
                            isDehydrated: !1,
                            cache: o.cache,
                            pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                            transitions: o.transitions,
                        }),
                            (t.updateQueue.baseState = l),
                            (t.memoizedState = l),
                            t.flags & 256)
                    ) {
                        ((i = Wn(Error(L(423)), t)), (t = ba(e, t, r, n, i)));
                        break e;
                    } else if (r !== i) {
                        ((i = Wn(Error(L(424)), t)), (t = ba(e, t, r, n, i)));
                        break e;
                    } else
                        for (
                            We = bt(t.stateNode.containerInfo.firstChild),
                            He = t,
                            le = !0,
                            lt = null,
                            n = jc(t, null, r, n),
                            t.child = n;
                            n;
                        )
                            ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
                else {
                    if (($n(), r === i)) {
                        t = jt(e, t, n);
                        break e;
                    }
                    Te(e, t, r, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                Rc(t),
                e === null && mo(t),
                (r = t.type),
                (i = t.pendingProps),
                (l = e !== null ? e.memoizedProps : null),
                (o = i.children),
                uo(r, i) ? (o = null) : l !== null && uo(r, l) && (t.flags |= 32),
                ed(e, t),
                Te(e, t, o, n),
                t.child
            );
        case 6:
            return (e === null && mo(t), null);
        case 13:
            return nd(e, t, n);
        case 4:
            return (
                cs(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                e === null ? (t.child = bn(t, null, r, n)) : Te(e, t, r, n),
                t.child
            );
        case 11:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : rt(r, i)),
                Aa(e, t, r, i, n)
            );
        case 7:
            return (Te(e, t, t.pendingProps, n), t.child);
        case 8:
            return (Te(e, t, t.pendingProps.children, n), t.child);
        case 12:
            return (Te(e, t, t.pendingProps.children, n), t.child);
        case 10:
            e: {
                if (
                    ((r = t.type._context),
                        (i = t.pendingProps),
                        (l = t.memoizedProps),
                        (o = i.value),
                        ee(Mi, r._currentValue),
                        (r._currentValue = o),
                        l !== null)
                )
                    if (at(l.value, o)) {
                        if (l.children === i.children && !Ue.current) {
                            t = jt(e, t, n);
                            break e;
                        }
                    } else
                        for (l = t.child, l !== null && (l.return = t); l !== null;) {
                            var a = l.dependencies;
                            if (a !== null) {
                                o = l.child;
                                for (var s = a.firstContext; s !== null;) {
                                    if (s.context === r) {
                                        if (l.tag === 1) {
                                            ((s = St(-1, n & -n)), (s.tag = 2));
                                            var f = l.updateQueue;
                                            if (f !== null) {
                                                f = f.shared;
                                                var g = f.pending;
                                                (g === null
                                                    ? (s.next = s)
                                                    : ((s.next = g.next), (g.next = s)),
                                                    (f.pending = s));
                                            }
                                        }
                                        ((l.lanes |= n),
                                            (s = l.alternate),
                                            s !== null && (s.lanes |= n),
                                            vo(l.return, n, t),
                                            (a.lanes |= n));
                                        break;
                                    }
                                    s = s.next;
                                }
                            } else if (l.tag === 10) o = l.type === t.type ? null : l.child;
                            else if (l.tag === 18) {
                                if (((o = l.return), o === null)) throw Error(L(341));
                                ((o.lanes |= n),
                                    (a = o.alternate),
                                    a !== null && (a.lanes |= n),
                                    vo(o, n, t),
                                    (o = l.sibling));
                            } else o = l.child;
                            if (o !== null) o.return = l;
                            else
                                for (o = l; o !== null;) {
                                    if (o === t) {
                                        o = null;
                                        break;
                                    }
                                    if (((l = o.sibling), l !== null)) {
                                        ((l.return = o.return), (o = l));
                                        break;
                                    }
                                    o = o.return;
                                }
                            l = o;
                        }
                (Te(e, t, i.children, n), (t = t.child));
            }
            return t;
        case 9:
            return (
                (i = t.type),
                (r = t.pendingProps.children),
                In(t, n),
                (i = Je(i)),
                (r = r(i)),
                (t.flags |= 1),
                Te(e, t, r, n),
                t.child
            );
        case 14:
            return (
                (r = t.type),
                (i = rt(r, t.pendingProps)),
                (i = rt(r.type, i)),
                Ua(e, t, r, i, n)
            );
        case 15:
            return qc(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : rt(r, i)),
                gi(e, t),
                (t.tag = 1),
                $e(r) ? ((e = !0), zi(t)) : (e = !1),
                In(t, n),
                Yc(t, r, i),
                yo(t, r, i, n),
                ko(null, t, r, !0, e, n)
            );
        case 19:
            return rd(e, t, n);
        case 22:
            return Jc(e, t, n);
    }
    throw Error(L(156, t.tag));
};
function xd(e, t) {
    return Qu(e, t);
}
function lh(e, t, n, r) {
    ((this.tag = e),
        (this.key = n),
        (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
            null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
            this.memoizedState =
            this.updateQueue =
            this.memoizedProps =
            null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
}
function Ze(e, t, n, r) {
    return new lh(e, t, n, r);
}
function Cs(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function oh(e) {
    if (typeof e == "function") return Cs(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === Ho)) return 11;
        if (e === Vo) return 14;
    }
    return 2;
}
function Vt(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = Ze(e.tag, t, e.key, e.mode)),
                (n.elementType = e.elementType),
                (n.type = e.type),
                (n.stateNode = e.stateNode),
                (n.alternate = e),
                (e.alternate = n))
            : ((n.pendingProps = t),
                (n.type = e.type),
                (n.flags = 0),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
            t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
    );
}
function wi(e, t, n, r, i, l) {
    var o = 2;
    if (((r = e), typeof e == "function")) Cs(e) && (o = 1);
    else if (typeof e == "string") o = 5;
    else
        e: switch (e) {
            case kn:
                return sn(n.children, i, l, t);
            case Wo:
                ((o = 8), (i |= 8));
                break;
            case bl:
                return (
                    (e = Ze(12, n, t, i | 2)),
                    (e.elementType = bl),
                    (e.lanes = l),
                    e
                );
            case Bl:
                return ((e = Ze(13, n, t, i)), (e.elementType = Bl), (e.lanes = l), e);
            case Wl:
                return ((e = Ze(19, n, t, i)), (e.elementType = Wl), (e.lanes = l), e);
            case Ru:
                return ll(n, i, l, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                        case Nu:
                            o = 10;
                            break e;
                        case Lu:
                            o = 9;
                            break e;
                        case Ho:
                            o = 11;
                            break e;
                        case Vo:
                            o = 14;
                            break e;
                        case zt:
                            ((o = 16), (r = null));
                            break e;
                    }
                throw Error(L(130, e == null ? e : typeof e, ""));
        }
    return (
        (t = Ze(o, n, t, i)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = l),
        t
    );
}
function sn(e, t, n, r) {
    return ((e = Ze(7, e, r, t)), (e.lanes = n), e);
}
function ll(e, t, n, r) {
    return (
        (e = Ze(22, e, r, t)),
        (e.elementType = Ru),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
    );
}
function Fl(e, t, n) {
    return ((e = Ze(6, e, null, t)), (e.lanes = n), e);
}
function Al(e, t, n) {
    return (
        (t = Ze(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
        }),
        t
    );
}
function sh(e, t, n, r, i) {
    ((this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
            this.pingCache =
            this.current =
            this.pendingChildren =
            null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = yl(0)),
        (this.expirationTimes = yl(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
            0),
        (this.entanglements = yl(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = i),
        (this.mutableSourceEagerHydrationData = null));
}
function js(e, t, n, r, i, l, o, a, s) {
    return (
        (e = new sh(e, t, n, a, s)),
        t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
        (l = Ze(3, null, null, t)),
        (e.current = l),
        (l.stateNode = e),
        (l.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
        }),
        us(l),
        e
    );
}
function ah(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: wn,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n,
    };
}
function wd(e) {
    if (!e) return Xt;
    e = e._reactInternals;
    e: {
        if (hn(e) !== e || e.tag !== 1) throw Error(L(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if ($e(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(L(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if ($e(n)) return wc(e, n, t);
    }
    return t;
}
function kd(e, t, n, r, i, l, o, a, s) {
    return (
        (e = js(n, r, !0, e, i, l, o, a, s)),
        (e.context = wd(null)),
        (n = e.current),
        (r = Oe()),
        (i = Ht(n)),
        (l = St(r, i)),
        (l.callback = t ?? null),
        Bt(n, l, i),
        (e.current.lanes = i),
        Ar(e, i, r),
        be(e, r),
        e
    );
}
function ol(e, t, n, r) {
    var i = t.current,
        l = Oe(),
        o = Ht(i);
    return (
        (n = wd(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = St(l, o)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = Bt(i, t, o)),
        e !== null && (st(e, i, o, l), hi(e, i, o)),
        o
    );
}
function Hi(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function Za(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function Ns(e, t) {
    (Za(e, t), (e = e.alternate) && Za(e, t));
}
function uh() {
    return null;
}
var Sd =
    typeof reportError == "function"
        ? reportError
        : function (e) {
            console.error(e);
        };
function Ls(e) {
    this._internalRoot = e;
}
sl.prototype.render = Ls.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(L(409));
    ol(e, t, null, null);
};
sl.prototype.unmount = Ls.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (fn(function () {
            ol(null, e, null, null);
        }),
            (t[_t] = null));
    }
};
function sl(e) {
    this._internalRoot = e;
}
sl.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = Ju();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < Ot.length && t !== 0 && t < Ot[n].priority; n++);
        (Ot.splice(n, 0, e), n === 0 && tc(e));
    }
};
function Rs(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function al(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
}
function qa() { }
function ch(e, t, n, r, i) {
    if (i) {
        if (typeof r == "function") {
            var l = r;
            r = function () {
                var f = Hi(o);
                l.call(f);
            };
        }
        var o = kd(t, r, e, 0, null, !1, !1, "", qa);
        return (
            (e._reactRootContainer = o),
            (e[_t] = o.current),
            jr(e.nodeType === 8 ? e.parentNode : e),
            fn(),
            o
        );
    }
    for (; (i = e.lastChild);) e.removeChild(i);
    if (typeof r == "function") {
        var a = r;
        r = function () {
            var f = Hi(s);
            a.call(f);
        };
    }
    var s = js(e, 0, !1, null, null, !1, !1, "", qa);
    return (
        (e._reactRootContainer = s),
        (e[_t] = s.current),
        jr(e.nodeType === 8 ? e.parentNode : e),
        fn(function () {
            ol(t, s, n, r);
        }),
        s
    );
}
function ul(e, t, n, r, i) {
    var l = n._reactRootContainer;
    if (l) {
        var o = l;
        if (typeof i == "function") {
            var a = i;
            i = function () {
                var s = Hi(o);
                a.call(s);
            };
        }
        ol(t, o, e, i);
    } else o = ch(n, t, e, i, r);
    return Hi(o);
}
Zu = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = sr(t.pendingLanes);
                n !== 0 &&
                    (Xo(t, n | 1), be(t, pe()), !(V & 6) && ((Hn = pe() + 500), Zt()));
            }
            break;
        case 13:
            (fn(function () {
                var r = Ct(e, 1);
                if (r !== null) {
                    var i = Oe();
                    st(r, e, 1, i);
                }
            }),
                Ns(e, 1));
    }
};
Yo = function (e) {
    if (e.tag === 13) {
        var t = Ct(e, 134217728);
        if (t !== null) {
            var n = Oe();
            st(t, e, 134217728, n);
        }
        Ns(e, 134217728);
    }
};
qu = function (e) {
    if (e.tag === 13) {
        var t = Ht(e),
            n = Ct(e, t);
        if (n !== null) {
            var r = Oe();
            st(n, e, t, r);
        }
        Ns(e, t);
    }
};
Ju = function () {
    return Y;
};
ec = function (e, t) {
    var n = Y;
    try {
        return ((Y = e), t());
    } finally {
        Y = n;
    }
};
Jl = function (e, t, n) {
    switch (t) {
        case "input":
            if ((Ql(e, n), (t = n.name), n.type === "radio" && t != null)) {
                for (n = e; n.parentNode;) n = n.parentNode;
                for (
                    n = n.querySelectorAll(
                        "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
                    ),
                    t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var i = Ji(r);
                        if (!i) throw Error(L(90));
                        (zu(r), Ql(r, i));
                    }
                }
            }
            break;
        case "textarea":
            Ou(e, n);
            break;
        case "select":
            ((t = n.value), t != null && Tn(e, !!n.multiple, t, !1));
    }
};
$u = Ss;
bu = fn;
var dh = { usingClientEntryPoint: !1, Events: [$r, Cn, Ji, Au, Uu, Ss] },
    rr = {
        findFiberByHostInstance: nn,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom",
    },
    fh = {
        bundleType: rr.bundleType,
        version: rr.version,
        rendererPackageName: rr.rendererPackageName,
        rendererConfig: rr.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Nt.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return ((e = Hu(e)), e === null ? null : e.stateNode);
        },
        findFiberByHostInstance: rr.findFiberByHostInstance || uh,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var si = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!si.isDisabled && si.supportsFiber)
        try {
            ((Yi = si.inject(fh)), (ht = si));
        } catch { }
}
Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = dh;
Qe.createPortal = function (e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Rs(t)) throw Error(L(200));
    return ah(e, t, null, n);
};
Qe.createRoot = function (e, t) {
    if (!Rs(e)) throw Error(L(299));
    var n = !1,
        r = "",
        i = Sd;
    return (
        t != null &&
        (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = js(e, 1, !1, null, null, n, !1, r, i)),
        (e[_t] = t.current),
        jr(e.nodeType === 8 ? e.parentNode : e),
        new Ls(t)
    );
};
Qe.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function"
            ? Error(L(188))
            : ((e = Object.keys(e).join(",")), Error(L(268, e)));
    return ((e = Hu(t)), (e = e === null ? null : e.stateNode), e);
};
Qe.flushSync = function (e) {
    return fn(e);
};
Qe.hydrate = function (e, t, n) {
    if (!al(t)) throw Error(L(200));
    return ul(null, e, t, !0, n);
};
Qe.hydrateRoot = function (e, t, n) {
    if (!Rs(e)) throw Error(L(405));
    var r = (n != null && n.hydratedSources) || null,
        i = !1,
        l = "",
        o = Sd;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (i = !0),
                n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
                n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
            (t = kd(t, null, e, 1, n ?? null, i, !1, l, o)),
            (e[_t] = t.current),
            jr(e),
            r)
    )
        for (e = 0; e < r.length; e++)
            ((n = r[e]),
                (i = n._getVersion),
                (i = i(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, i])
                    : t.mutableSourceEagerHydrationData.push(n, i));
    return new sl(t);
};
Qe.render = function (e, t, n) {
    if (!al(t)) throw Error(L(200));
    return ul(null, e, t, !1, n);
};
Qe.unmountComponentAtNode = function (e) {
    if (!al(e)) throw Error(L(40));
    return e._reactRootContainer
        ? (fn(function () {
            ul(null, null, e, !1, function () {
                ((e._reactRootContainer = null), (e[_t] = null));
            });
        }),
            !0)
        : !1;
};
Qe.unstable_batchedUpdates = Ss;
Qe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!al(n)) throw Error(L(200));
    if (e == null || e._reactInternals === void 0) throw Error(L(38));
    return ul(e, t, n, !1, r);
};
Qe.version = "18.3.1-next-f1338f8080-20240426";
function Ed() {
    if (
        !(
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
    )
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ed);
        } catch (e) {
            console.error(e);
        }
}
(Ed(), (Eu.exports = Qe));
var ph = Eu.exports,
    _d,
    Ja = ph;
((_d = Ja.createRoot), Ja.hydrateRoot);
  /**
   * @remix-run/router v1.21.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */ function Dr() {
    return (
        (Dr = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
            }),
        Dr.apply(this, arguments)
    );
}
var Ft;
(function (e) {
    ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"));
})(Ft || (Ft = {}));
const eu = "popstate";
function hh(e) {
    e === void 0 && (e = {});
    function t(r, i) {
        let { pathname: l, search: o, hash: a } = r.location;
        return Oo(
            "",
            { pathname: l, search: o, hash: a },
            (i.state && i.state.usr) || null,
            (i.state && i.state.key) || "default",
        );
    }
    function n(r, i) {
        return typeof i == "string" ? i : Vi(i);
    }
    return vh(t, n, null, e);
}
function ve(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Cd(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t);
        } catch { }
    }
}
function mh() {
    return Math.random().toString(36).substr(2, 8);
}
function tu(e, t) {
    return { usr: e.state, key: e.key, idx: t };
}
function Oo(e, t, n, r) {
    return (
        n === void 0 && (n = null),
        Dr(
            { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
            typeof t == "string" ? Xn(t) : t,
            { state: n, key: (t && t.key) || r || mh() },
        )
    );
}
function Vi(e) {
    let { pathname: t = "/", search: n = "", hash: r = "" } = e;
    return (
        n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
        r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
        t
    );
}
function Xn(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
        let r = e.indexOf("?");
        (r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
            e && (t.pathname = e));
    }
    return t;
}
function vh(e, t, n, r) {
    r === void 0 && (r = {});
    let { window: i = document.defaultView, v5Compat: l = !1 } = r,
        o = i.history,
        a = Ft.Pop,
        s = null,
        f = g();
    f == null && ((f = 0), o.replaceState(Dr({}, o.state, { idx: f }), ""));
    function g() {
        return (o.state || { idx: null }).idx;
    }
    function v() {
        a = Ft.Pop;
        let j = g(),
            h = j == null ? null : j - f;
        ((f = j), s && s({ action: a, location: C.location, delta: h }));
    }
    function x(j, h) {
        a = Ft.Push;
        let p = Oo(C.location, j, h);
        f = g() + 1;
        let m = tu(p, f),
            k = C.createHref(p);
        try {
            o.pushState(m, "", k);
        } catch (P) {
            if (P instanceof DOMException && P.name === "DataCloneError") throw P;
            i.location.assign(k);
        }
        l && s && s({ action: a, location: C.location, delta: 1 });
    }
    function w(j, h) {
        a = Ft.Replace;
        let p = Oo(C.location, j, h);
        f = g();
        let m = tu(p, f),
            k = C.createHref(p);
        (o.replaceState(m, "", k),
            l && s && s({ action: a, location: C.location, delta: 0 }));
    }
    function _(j) {
        let h = i.location.origin !== "null" ? i.location.origin : i.location.href,
            p = typeof j == "string" ? j : Vi(j);
        return (
            (p = p.replace(/ $/, "%20")),
            ve(
                h,
                "No window.location.(origin|href) available to create URL for href: " +
                p,
            ),
            new URL(p, h)
        );
    }
    let C = {
        get action() {
            return a;
        },
        get location() {
            return e(i, o);
        },
        listen(j) {
            if (s) throw new Error("A history only accepts one active listener");
            return (
                i.addEventListener(eu, v),
                (s = j),
                () => {
                    (i.removeEventListener(eu, v), (s = null));
                }
            );
        },
        createHref(j) {
            return t(i, j);
        },
        createURL: _,
        encodeLocation(j) {
            let h = _(j);
            return { pathname: h.pathname, search: h.search, hash: h.hash };
        },
        push: x,
        replace: w,
        go(j) {
            return o.go(j);
        },
    };
    return C;
}
var nu;
(function (e) {
    ((e.data = "data"),
        (e.deferred = "deferred"),
        (e.redirect = "redirect"),
        (e.error = "error"));
})(nu || (nu = {}));
function gh(e, t, n) {
    return (n === void 0 && (n = "/"), yh(e, t, n, !1));
}
function yh(e, t, n, r) {
    let i = typeof t == "string" ? Xn(t) : t,
        l = Ps(i.pathname || "/", n);
    if (l == null) return null;
    let o = jd(e);
    xh(o);
    let a = null;
    for (let s = 0; a == null && s < o.length; ++s) {
        let f = Ph(l);
        a = Lh(o[s], f, r);
    }
    return a;
}
function jd(e, t, n, r) {
    (t === void 0 && (t = []),
        n === void 0 && (n = []),
        r === void 0 && (r = ""));
    let i = (l, o, a) => {
        let s = {
            relativePath: a === void 0 ? l.path || "" : a,
            caseSensitive: l.caseSensitive === !0,
            childrenIndex: o,
            route: l,
        };
        s.relativePath.startsWith("/") &&
            (ve(
                s.relativePath.startsWith(r),
                'Absolute route path "' +
                s.relativePath +
                '" nested under path ' +
                ('"' + r + '" is not valid. An absolute child route path ') +
                "must start with the combined path of all its parent routes.",
            ),
                (s.relativePath = s.relativePath.slice(r.length)));
        let f = Qt([r, s.relativePath]),
            g = n.concat(s);
        (l.children &&
            l.children.length > 0 &&
            (ve(
                l.index !== !0,
                "Index routes must not have child routes. Please remove " +
                ('all child routes from route path "' + f + '".'),
            ),
                jd(l.children, t, g, f)),
            !(l.path == null && !l.index) &&
            t.push({ path: f, score: jh(f, l.index), routesMeta: g }));
    };
    return (
        e.forEach((l, o) => {
            var a;
            if (l.path === "" || !((a = l.path) != null && a.includes("?"))) i(l, o);
            else for (let s of Nd(l.path)) i(l, o, s);
        }),
        t
    );
}
function Nd(e) {
    let t = e.split("/");
    if (t.length === 0) return [];
    let [n, ...r] = t,
        i = n.endsWith("?"),
        l = n.replace(/\?$/, "");
    if (r.length === 0) return i ? [l, ""] : [l];
    let o = Nd(r.join("/")),
        a = [];
    return (
        a.push(...o.map((s) => (s === "" ? l : [l, s].join("/")))),
        i && a.push(...o),
        a.map((s) => (e.startsWith("/") && s === "" ? "/" : s))
    );
}
function xh(e) {
    e.sort((t, n) =>
        t.score !== n.score
            ? n.score - t.score
            : Nh(
                t.routesMeta.map((r) => r.childrenIndex),
                n.routesMeta.map((r) => r.childrenIndex),
            ),
    );
}
const wh = /^:[\w-]+$/,
    kh = 3,
    Sh = 2,
    Eh = 1,
    _h = 10,
    Ch = -2,
    ru = (e) => e === "*";
function jh(e, t) {
    let n = e.split("/"),
        r = n.length;
    return (
        n.some(ru) && (r += Ch),
        t && (r += Sh),
        n
            .filter((i) => !ru(i))
            .reduce((i, l) => i + (wh.test(l) ? kh : l === "" ? Eh : _h), r)
    );
}
function Nh(e, t) {
    return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
        ? e[e.length - 1] - t[t.length - 1]
        : 0;
}
function Lh(e, t, n) {
    let { routesMeta: r } = e,
        i = {},
        l = "/",
        o = [];
    for (let a = 0; a < r.length; ++a) {
        let s = r[a],
            f = a === r.length - 1,
            g = l === "/" ? t : t.slice(l.length) || "/",
            v = iu(
                { path: s.relativePath, caseSensitive: s.caseSensitive, end: f },
                g,
            ),
            x = s.route;
        if (
            (!v &&
                f &&
                n &&
                !r[r.length - 1].route.index &&
                (v = iu(
                    { path: s.relativePath, caseSensitive: s.caseSensitive, end: !1 },
                    g,
                )),
                !v)
        )
            return null;
        (Object.assign(i, v.params),
            o.push({
                params: i,
                pathname: Qt([l, v.pathname]),
                pathnameBase: Mh(Qt([l, v.pathnameBase])),
                route: x,
            }),
            v.pathnameBase !== "/" && (l = Qt([l, v.pathnameBase])));
    }
    return o;
}
function iu(e, t) {
    typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
    let [n, r] = Rh(e.path, e.caseSensitive, e.end),
        i = t.match(n);
    if (!i) return null;
    let l = i[0],
        o = l.replace(/(.)\/+$/, "$1"),
        a = i.slice(1);
    return {
        params: r.reduce((f, g, v) => {
            let { paramName: x, isOptional: w } = g;
            if (x === "*") {
                let C = a[v] || "";
                o = l.slice(0, l.length - C.length).replace(/(.)\/+$/, "$1");
            }
            const _ = a[v];
            return (
                w && !_ ? (f[x] = void 0) : (f[x] = (_ || "").replace(/%2F/g, "/")),
                f
            );
        }, {}),
        pathname: l,
        pathnameBase: o,
        pattern: e,
    };
}
function Rh(e, t, n) {
    (t === void 0 && (t = !1),
        n === void 0 && (n = !0),
        Cd(
            e === "*" || !e.endsWith("*") || e.endsWith("/*"),
            'Route path "' +
            e +
            '" will be treated as if it were ' +
            ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
            "always follow a `/` in the pattern. To get rid of this warning, " +
            ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
        ));
    let r = [],
        i =
            "^" +
            e
                .replace(/\/*\*?$/, "")
                .replace(/^\/*/, "/")
                .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
                .replace(
                    /\/:([\w-]+)(\?)?/g,
                    (o, a, s) => (
                        r.push({ paramName: a, isOptional: s != null }),
                        s ? "/?([^\\/]+)?" : "/([^\\/]+)"
                    ),
                );
    return (
        e.endsWith("*")
            ? (r.push({ paramName: "*" }),
                (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
            : n
                ? (i += "\\/*$")
                : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
        [new RegExp(i, t ? void 0 : "i"), r]
    );
}
function Ph(e) {
    try {
        return e
            .split("/")
            .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
            .join("/");
    } catch (t) {
        return (
            Cd(
                !1,
                'The URL path "' +
                e +
                '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
                ("encoding (" + t + ")."),
            ),
            e
        );
    }
}
function Ps(e, t) {
    if (t === "/") return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
        r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/";
}
function zh(e, t) {
    t === void 0 && (t = "/");
    let {
        pathname: n,
        search: r = "",
        hash: i = "",
    } = typeof e == "string" ? Xn(e) : e;
    return {
        pathname: n ? (n.startsWith("/") ? n : Th(n, t)) : t,
        search: Dh(r),
        hash: Ih(i),
    };
}
function Th(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return (
        e.split("/").forEach((i) => {
            i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
        }),
        n.length > 1 ? n.join("/") : "/"
    );
}
function Ul(e, t, n, r) {
    return (
        "Cannot include a '" +
        e +
        "' character in a manually specified " +
        ("`to." +
            t +
            "` field [" +
            JSON.stringify(r) +
            "].  Please separate it out to the ") +
        ("`to." + n + "` field. Alternatively you may provide the full path as ") +
        'a string in <Link to="..."> and the router will parse it for you.'
    );
}
function Oh(e) {
    return e.filter(
        (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
    );
}
function Ld(e, t) {
    let n = Oh(e);
    return t
        ? n.map((r, i) => (i === n.length - 1 ? r.pathname : r.pathnameBase))
        : n.map((r) => r.pathnameBase);
}
function Rd(e, t, n, r) {
    r === void 0 && (r = !1);
    let i;
    typeof e == "string"
        ? (i = Xn(e))
        : ((i = Dr({}, e)),
            ve(
                !i.pathname || !i.pathname.includes("?"),
                Ul("?", "pathname", "search", i),
            ),
            ve(
                !i.pathname || !i.pathname.includes("#"),
                Ul("#", "pathname", "hash", i),
            ),
            ve(!i.search || !i.search.includes("#"), Ul("#", "search", "hash", i)));
    let l = e === "" || i.pathname === "",
        o = l ? "/" : i.pathname,
        a;
    if (o == null) a = n;
    else {
        let v = t.length - 1;
        if (!r && o.startsWith("..")) {
            let x = o.split("/");
            for (; x[0] === "..";) (x.shift(), (v -= 1));
            i.pathname = x.join("/");
        }
        a = v >= 0 ? t[v] : "/";
    }
    let s = zh(i, a),
        f = o && o !== "/" && o.endsWith("/"),
        g = (l || o === ".") && n.endsWith("/");
    return (!s.pathname.endsWith("/") && (f || g) && (s.pathname += "/"), s);
}
const Qt = (e) => e.join("/").replace(/\/\/+/g, "/"),
    Mh = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    Dh = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
    Ih = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Fh(e) {
    return (
        e != null &&
        typeof e.status == "number" &&
        typeof e.statusText == "string" &&
        typeof e.internal == "boolean" &&
        "data" in e
    );
}
const Pd = ["post", "put", "patch", "delete"];
new Set(Pd);
const Ah = ["get", ...Pd];
new Set(Ah);
  /**
   * React Router v6.28.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */ function Ir() {
    return (
        (Ir = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
            }),
        Ir.apply(this, arguments)
    );
}
const zs = E.createContext(null),
    Uh = E.createContext(null),
    mn = E.createContext(null),
    cl = E.createContext(null),
    vn = E.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
    zd = E.createContext(null);
function $h(e, t) {
    let { relative: n } = t === void 0 ? {} : t;
    Br() || ve(!1);
    let { basename: r, navigator: i } = E.useContext(mn),
        { hash: l, pathname: o, search: a } = Od(e, { relative: n }),
        s = o;
    return (
        r !== "/" && (s = o === "/" ? r : Qt([r, o])),
        i.createHref({ pathname: s, search: a, hash: l })
    );
}
function Br() {
    return E.useContext(cl) != null;
}
function Wr() {
    return (Br() || ve(!1), E.useContext(cl).location);
}
function Td(e) {
    E.useContext(mn).static || E.useLayoutEffect(e);
}
function Ts() {
    let { isDataRoute: e } = E.useContext(vn);
    return e ? Jh() : bh();
}
function bh() {
    Br() || ve(!1);
    let e = E.useContext(zs),
        { basename: t, future: n, navigator: r } = E.useContext(mn),
        { matches: i } = E.useContext(vn),
        { pathname: l } = Wr(),
        o = JSON.stringify(Ld(i, n.v7_relativeSplatPath)),
        a = E.useRef(!1);
    return (
        Td(() => {
            a.current = !0;
        }),
        E.useCallback(
            function (f, g) {
                if ((g === void 0 && (g = {}), !a.current)) return;
                if (typeof f == "number") {
                    r.go(f);
                    return;
                }
                let v = Rd(f, JSON.parse(o), l, g.relative === "path");
                (e == null &&
                    t !== "/" &&
                    (v.pathname = v.pathname === "/" ? t : Qt([t, v.pathname])),
                    (g.replace ? r.replace : r.push)(v, g.state, g));
            },
            [t, r, o, l, e],
        )
    );
}
function Od(e, t) {
    let { relative: n } = t === void 0 ? {} : t,
        { future: r } = E.useContext(mn),
        { matches: i } = E.useContext(vn),
        { pathname: l } = Wr(),
        o = JSON.stringify(Ld(i, r.v7_relativeSplatPath));
    return E.useMemo(() => Rd(e, JSON.parse(o), l, n === "path"), [e, o, l, n]);
}
function Bh(e, t) {
    return Wh(e, t);
}
function Wh(e, t, n, r) {
    Br() || ve(!1);
    let { navigator: i } = E.useContext(mn),
        { matches: l } = E.useContext(vn),
        o = l[l.length - 1],
        a = o ? o.params : {};
    o && o.pathname;
    let s = o ? o.pathnameBase : "/";
    o && o.route;
    let f = Wr(),
        g;
    if (t) {
        var v;
        let j = typeof t == "string" ? Xn(t) : t;
        (s === "/" || ((v = j.pathname) != null && v.startsWith(s)) || ve(!1),
            (g = j));
    } else g = f;
    let x = g.pathname || "/",
        w = x;
    if (s !== "/") {
        let j = s.replace(/^\//, "").split("/");
        w = "/" + x.replace(/^\//, "").split("/").slice(j.length).join("/");
    }
    let _ = gh(e, { pathname: w }),
        C = Xh(
            _ &&
            _.map((j) =>
                Object.assign({}, j, {
                    params: Object.assign({}, a, j.params),
                    pathname: Qt([
                        s,
                        i.encodeLocation
                            ? i.encodeLocation(j.pathname).pathname
                            : j.pathname,
                    ]),
                    pathnameBase:
                        j.pathnameBase === "/"
                            ? s
                            : Qt([
                                s,
                                i.encodeLocation
                                    ? i.encodeLocation(j.pathnameBase).pathname
                                    : j.pathnameBase,
                            ]),
                }),
            ),
            l,
            n,
            r,
        );
    return t && C
        ? E.createElement(
            cl.Provider,
            {
                value: {
                    location: Ir(
                        {
                            pathname: "/",
                            search: "",
                            hash: "",
                            state: null,
                            key: "default",
                        },
                        g,
                    ),
                    navigationType: Ft.Pop,
                },
            },
            C,
        )
        : C;
}
function Hh() {
    let e = qh(),
        t = Fh(e)
            ? e.status + " " + e.statusText
            : e instanceof Error
                ? e.message
                : JSON.stringify(e),
        n = e instanceof Error ? e.stack : null,
        i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
    return E.createElement(
        E.Fragment,
        null,
        E.createElement("h2", null, "Unexpected Application Error!"),
        E.createElement("h3", { style: { fontStyle: "italic" } }, t),
        n ? E.createElement("pre", { style: i }, n) : null,
        null,
    );
}
const Vh = E.createElement(Hh, null);
class Qh extends E.Component {
    constructor(t) {
        (super(t),
            (this.state = {
                location: t.location,
                revalidation: t.revalidation,
                error: t.error,
            }));
    }
    static getDerivedStateFromError(t) {
        return { error: t };
    }
    static getDerivedStateFromProps(t, n) {
        return n.location !== t.location ||
            (n.revalidation !== "idle" && t.revalidation === "idle")
            ? { error: t.error, location: t.location, revalidation: t.revalidation }
            : {
                error: t.error !== void 0 ? t.error : n.error,
                location: n.location,
                revalidation: t.revalidation || n.revalidation,
            };
    }
    componentDidCatch(t, n) {
        console.error(
            "React Router caught the following error during render",
            t,
            n,
        );
    }
    render() {
        return this.state.error !== void 0
            ? E.createElement(
                vn.Provider,
                { value: this.props.routeContext },
                E.createElement(zd.Provider, {
                    value: this.state.error,
                    children: this.props.component,
                }),
            )
            : this.props.children;
    }
}
function Kh(e) {
    let { routeContext: t, match: n, children: r } = e,
        i = E.useContext(zs);
    return (
        i &&
        i.static &&
        i.staticContext &&
        (n.route.errorElement || n.route.ErrorBoundary) &&
        (i.staticContext._deepestRenderedBoundaryId = n.route.id),
        E.createElement(vn.Provider, { value: t }, r)
    );
}
function Xh(e, t, n, r) {
    var i;
    if (
        (t === void 0 && (t = []),
            n === void 0 && (n = null),
            r === void 0 && (r = null),
            e == null)
    ) {
        var l;
        if (!n) return null;
        if (n.errors) e = n.matches;
        else if (
            (l = r) != null &&
            l.v7_partialHydration &&
            t.length === 0 &&
            !n.initialized &&
            n.matches.length > 0
        )
            e = n.matches;
        else return null;
    }
    let o = e,
        a = (i = n) == null ? void 0 : i.errors;
    if (a != null) {
        let g = o.findIndex(
            (v) => v.route.id && (a == null ? void 0 : a[v.route.id]) !== void 0,
        );
        (g >= 0 || ve(!1), (o = o.slice(0, Math.min(o.length, g + 1))));
    }
    let s = !1,
        f = -1;
    if (n && r && r.v7_partialHydration)
        for (let g = 0; g < o.length; g++) {
            let v = o[g];
            if (
                ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (f = g),
                    v.route.id)
            ) {
                let { loaderData: x, errors: w } = n,
                    _ =
                        v.route.loader &&
                        x[v.route.id] === void 0 &&
                        (!w || w[v.route.id] === void 0);
                if (v.route.lazy || _) {
                    ((s = !0), f >= 0 ? (o = o.slice(0, f + 1)) : (o = [o[0]]));
                    break;
                }
            }
        }
    return o.reduceRight((g, v, x) => {
        let w,
            _ = !1,
            C = null,
            j = null;
        n &&
            ((w = a && v.route.id ? a[v.route.id] : void 0),
                (C = v.route.errorElement || Vh),
                s &&
                (f < 0 && x === 0
                    ? ((_ = !0), (j = null))
                    : f === x &&
                    ((_ = !0), (j = v.route.hydrateFallbackElement || null))));
        let h = t.concat(o.slice(0, x + 1)),
            p = () => {
                let m;
                return (
                    w
                        ? (m = C)
                        : _
                            ? (m = j)
                            : v.route.Component
                                ? (m = E.createElement(v.route.Component, null))
                                : v.route.element
                                    ? (m = v.route.element)
                                    : (m = g),
                    E.createElement(Kh, {
                        match: v,
                        routeContext: { outlet: g, matches: h, isDataRoute: n != null },
                        children: m,
                    })
                );
            };
        return n && (v.route.ErrorBoundary || v.route.errorElement || x === 0)
            ? E.createElement(Qh, {
                location: n.location,
                revalidation: n.revalidation,
                component: C,
                error: w,
                children: p(),
                routeContext: { outlet: null, matches: h, isDataRoute: !0 },
            })
            : p();
    }, null);
}
var Md = (function (e) {
    return (
        (e.UseBlocker = "useBlocker"),
        (e.UseRevalidator = "useRevalidator"),
        (e.UseNavigateStable = "useNavigate"),
        e
    );
})(Md || {}),
    Qi = (function (e) {
        return (
            (e.UseBlocker = "useBlocker"),
            (e.UseLoaderData = "useLoaderData"),
            (e.UseActionData = "useActionData"),
            (e.UseRouteError = "useRouteError"),
            (e.UseNavigation = "useNavigation"),
            (e.UseRouteLoaderData = "useRouteLoaderData"),
            (e.UseMatches = "useMatches"),
            (e.UseRevalidator = "useRevalidator"),
            (e.UseNavigateStable = "useNavigate"),
            (e.UseRouteId = "useRouteId"),
            e
        );
    })(Qi || {});
function Yh(e) {
    let t = E.useContext(zs);
    return (t || ve(!1), t);
}
function Gh(e) {
    let t = E.useContext(Uh);
    return (t || ve(!1), t);
}
function Zh(e) {
    let t = E.useContext(vn);
    return (t || ve(!1), t);
}
function Dd(e) {
    let t = Zh(),
        n = t.matches[t.matches.length - 1];
    return (n.route.id || ve(!1), n.route.id);
}
function qh() {
    var e;
    let t = E.useContext(zd),
        n = Gh(Qi.UseRouteError),
        r = Dd(Qi.UseRouteError);
    return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Jh() {
    let { router: e } = Yh(Md.UseNavigateStable),
        t = Dd(Qi.UseNavigateStable),
        n = E.useRef(!1);
    return (
        Td(() => {
            n.current = !0;
        }),
        E.useCallback(
            function (i, l) {
                (l === void 0 && (l = {}),
                    n.current &&
                    (typeof i == "number"
                        ? e.navigate(i)
                        : e.navigate(i, Ir({ fromRouteId: t }, l))));
            },
            [e, t],
        )
    );
}
const lu = {};
function em(e, t) {
    lu[t] || ((lu[t] = !0), console.warn(t));
}
const ou = (e, t, n) =>
    em(
        e,
        "⚠️ React Router Future Flag Warning: " +
        t +
        ". " +
        ("You can use the `" + e + "` future flag to opt-in early. ") +
        ("For more information, see " + n + "."),
    );
function tm(e, t) {
    ((e == null ? void 0 : e.v7_startTransition) === void 0 &&
        ou(
            "v7_startTransition",
            "React Router will begin wrapping state updates in `React.startTransition` in v7",
            "https://reactrouter.com/v6/upgrading/future#v7_starttransition",
        ),
        (e == null ? void 0 : e.v7_relativeSplatPath) === void 0 &&
        !t &&
        ou(
            "v7_relativeSplatPath",
            "Relative route resolution within Splat routes is changing in v7",
            "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath",
        ));
}
function dt(e) {
    ve(!1);
}
function nm(e) {
    let {
        basename: t = "/",
        children: n = null,
        location: r,
        navigationType: i = Ft.Pop,
        navigator: l,
        static: o = !1,
        future: a,
    } = e;
    Br() && ve(!1);
    let s = t.replace(/^\/*/, "/"),
        f = E.useMemo(
            () => ({
                basename: s,
                navigator: l,
                static: o,
                future: Ir({ v7_relativeSplatPath: !1 }, a),
            }),
            [s, a, l, o],
        );
    typeof r == "string" && (r = Xn(r));
    let {
        pathname: g = "/",
        search: v = "",
        hash: x = "",
        state: w = null,
        key: _ = "default",
    } = r,
        C = E.useMemo(() => {
            let j = Ps(g, s);
            return j == null
                ? null
                : {
                    location: { pathname: j, search: v, hash: x, state: w, key: _ },
                    navigationType: i,
                };
        }, [s, g, v, x, w, _, i]);
    return C == null
        ? null
        : E.createElement(
            mn.Provider,
            { value: f },
            E.createElement(cl.Provider, { children: n, value: C }),
        );
}
function rm(e) {
    let { children: t, location: n } = e;
    return Bh(Mo(t), n);
}
new Promise(() => { });
function Mo(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return (
        E.Children.forEach(e, (r, i) => {
            if (!E.isValidElement(r)) return;
            let l = [...t, i];
            if (r.type === E.Fragment) {
                n.push.apply(n, Mo(r.props.children, l));
                return;
            }
            (r.type !== dt && ve(!1), !r.props.index || !r.props.children || ve(!1));
            let o = {
                id: r.props.id || l.join("-"),
                caseSensitive: r.props.caseSensitive,
                element: r.props.element,
                Component: r.props.Component,
                index: r.props.index,
                path: r.props.path,
                loader: r.props.loader,
                action: r.props.action,
                errorElement: r.props.errorElement,
                ErrorBoundary: r.props.ErrorBoundary,
                hasErrorBoundary:
                    r.props.ErrorBoundary != null || r.props.errorElement != null,
                shouldRevalidate: r.props.shouldRevalidate,
                handle: r.props.handle,
                lazy: r.props.lazy,
            };
            (r.props.children && (o.children = Mo(r.props.children, l)), n.push(o));
        }),
        n
    );
}
  /**
   * React Router DOM v6.28.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */ function Do() {
    return (
        (Do = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
            }),
        Do.apply(this, arguments)
    );
}
function im(e, t) {
    if (e == null) return {};
    var n = {},
        r = Object.keys(e),
        i,
        l;
    for (l = 0; l < r.length; l++)
        ((i = r[l]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
    return n;
}
function lm(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function om(e, t) {
    return e.button === 0 && (!t || t === "_self") && !lm(e);
}
const sm = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
],
    am = "6";
try {
    window.__reactRouterVersion = am;
} catch { }
const um = "startTransition",
    su = tf[um];
function cm(e) {
    let { basename: t, children: n, future: r, window: i } = e,
        l = E.useRef();
    l.current == null && (l.current = hh({ window: i, v5Compat: !0 }));
    let o = l.current,
        [a, s] = E.useState({ action: o.action, location: o.location }),
        { v7_startTransition: f } = r || {},
        g = E.useCallback(
            (v) => {
                f && su ? su(() => s(v)) : s(v);
            },
            [s, f],
        );
    return (
        E.useLayoutEffect(() => o.listen(g), [o, g]),
        E.useEffect(() => tm(r), [r]),
        E.createElement(nm, {
            basename: t,
            children: n,
            location: a.location,
            navigationType: a.action,
            navigator: o,
            future: r,
        })
    );
}
const dm =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
    fm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    Os = E.forwardRef(function (t, n) {
        let {
            onClick: r,
            relative: i,
            reloadDocument: l,
            replace: o,
            state: a,
            target: s,
            to: f,
            preventScrollReset: g,
            viewTransition: v,
        } = t,
            x = im(t, sm),
            { basename: w } = E.useContext(mn),
            _,
            C = !1;
        if (typeof f == "string" && fm.test(f) && ((_ = f), dm))
            try {
                let m = new URL(window.location.href),
                    k = f.startsWith("//") ? new URL(m.protocol + f) : new URL(f),
                    P = Ps(k.pathname, w);
                k.origin === m.origin && P != null
                    ? (f = P + k.search + k.hash)
                    : (C = !0);
            } catch { }
        let j = $h(f, { relative: i }),
            h = pm(f, {
                replace: o,
                state: a,
                target: s,
                preventScrollReset: g,
                relative: i,
                viewTransition: v,
            });
        function p(m) {
            (r && r(m), m.defaultPrevented || h(m));
        }
        return E.createElement(
            "a",
            Do({}, x, { href: _ || j, onClick: C || l ? r : p, ref: n, target: s }),
        );
    });
var au;
(function (e) {
    ((e.UseScrollRestoration = "useScrollRestoration"),
        (e.UseSubmit = "useSubmit"),
        (e.UseSubmitFetcher = "useSubmitFetcher"),
        (e.UseFetcher = "useFetcher"),
        (e.useViewTransitionState = "useViewTransitionState"));
})(au || (au = {}));
var uu;
(function (e) {
    ((e.UseFetcher = "useFetcher"),
        (e.UseFetchers = "useFetchers"),
        (e.UseScrollRestoration = "useScrollRestoration"));
})(uu || (uu = {}));
function pm(e, t) {
    let {
        target: n,
        replace: r,
        state: i,
        preventScrollReset: l,
        relative: o,
        viewTransition: a,
    } = t === void 0 ? {} : t,
        s = Ts(),
        f = Wr(),
        g = Od(e, { relative: o });
    return E.useCallback(
        (v) => {
            if (om(v, n)) {
                v.preventDefault();
                let x = r !== void 0 ? r : Vi(f) === Vi(g);
                s(e, {
                    replace: x,
                    state: i,
                    preventScrollReset: l,
                    relative: o,
                    viewTransition: a,
                });
            }
        },
        [f, s, g, r, i, n, e, l, o, a],
    );
}
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ var hm = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const mm = (e) =>
    e
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .toLowerCase()
        .trim(),
    xe = (e, t) => {
        const n = E.forwardRef(
            (
                {
                    color: r = "currentColor",
                    size: i = 24,
                    strokeWidth: l = 2,
                    absoluteStrokeWidth: o,
                    className: a = "",
                    children: s,
                    ...f
                },
                g,
            ) =>
                E.createElement(
                    "svg",
                    {
                        ref: g,
                        ...hm,
                        width: i,
                        height: i,
                        stroke: r,
                        strokeWidth: o ? (Number(l) * 24) / Number(i) : l,
                        className: ["lucide", `lucide-${mm(e)}`, a].join(" "),
                        ...f,
                    },
                    [
                        ...t.map(([v, x]) => E.createElement(v, x)),
                        ...(Array.isArray(s) ? s : [s]),
                    ],
                ),
        );
        return ((n.displayName = `${e}`), n);
    };
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const vm = xe("ArrowLeft", [
        ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
        ["path", { d: "M19 12H5", key: "x3x0zl" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const gm = xe("Award", [
        ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }],
        ["path", { d: "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11", key: "em7aur" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Ki = xe("Bot", [
        ["path", { d: "M12 8V4H8", key: "hb8ula" }],
        [
            "rect",
            { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" },
        ],
        ["path", { d: "M2 14h2", key: "vft8re" }],
        ["path", { d: "M20 14h2", key: "4cs60a" }],
        ["path", { d: "M15 13v2", key: "1xurst" }],
        ["path", { d: "M9 13v2", key: "rq6x2g" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Ms = xe("ChevronLeft", [
        ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const dl = xe("ChevronRight", [
        ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Ds = xe("CircuitBoard", [
        [
            "rect",
            { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" },
        ],
        ["path", { d: "M11 9h4a2 2 0 0 0 2-2V3", key: "1ve2rv" }],
        ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
        ["path", { d: "M7 21v-4a2 2 0 0 1 2-2h4", key: "1fwkro" }],
        ["circle", { cx: "15", cy: "15", r: "2", key: "3i40o0" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const ym = xe("Clock", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Is = xe("Eye", [
        [
            "path",
            { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" },
        ],
        ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Fs = xe("Github", [
        [
            "path",
            {
                d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
                key: "tonef",
            },
        ],
        ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const As = xe("Globe", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        [
            "path",
            { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" },
        ],
        ["path", { d: "M2 12h20", key: "9i4pu4" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const xm = xe("Home", [
        [
            "path",
            { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "y5dka4" },
        ],
        ["polyline", { points: "9 22 9 12 15 12 15 22", key: "e2us08" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Us = xe("Laptop", [
        [
            "path",
            {
                d: "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16",
                key: "tarvll",
            },
        ],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const $s = xe("Linkedin", [
        [
            "path",
            {
                d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
                key: "c2jq9f",
            },
        ],
        ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
        ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const bs = xe("Mail", [
        [
            "rect",
            { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" },
        ],
        ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const wm = xe("Medal", [
        [
            "path",
            {
                d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
                key: "143lza",
            },
        ],
        ["path", { d: "M11 12 5.12 2.2", key: "qhuxz6" }],
        ["path", { d: "m13 12 5.88-9.8", key: "hbye0f" }],
        ["path", { d: "M8 7h8", key: "i86dvs" }],
        ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }],
        ["path", { d: "M12 18v-2h-.5", key: "fawc4q" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Bs = xe("MessageCircle", [
        ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const km = xe("Send", [
        ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
        ["path", { d: "M22 2 11 13", key: "nzbqef" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Sm = xe("Trophy", [
        ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
        ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
        ["path", { d: "M4 22h16", key: "57wxv0" }],
        [
            "path",
            {
                d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
                key: "1nw9bq",
            },
        ],
        [
            "path",
            {
                d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
                key: "1np0yb",
            },
        ],
        ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }],
    ]);
  /**
   * @license lucide-react v0.344.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const cu = xe("Zap", [
        [
            "polygon",
            { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2", key: "45s27k" },
        ],
    ]),
    Em = () =>
        d.jsx("nav", {
            className:
                "bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg",
            children: d.jsx("div", {
                className: "max-w-7xl mx-auto px-4",
                children: d.jsxs("div", {
                    className: "flex justify-between items-center h-20",
                    children: [
                        d.jsxs(Os, {
                            to: "/",
                            className: "flex items-center space-x-3 group",
                            children: [
                                d.jsx("div", {
                                    className:
                                        "w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300",
                                    children: d.jsx(Ki, {
                                        size: 32,
                                        className:
                                            "text-blue-400 group-hover:text-blue-300 transition-colors duration-300 animate-pulse-slow",
                                    }),
                                }),
                                d.jsx("span", {
                                    className: "font-bold text-2xl",
                                    children: "Assiut Robotics",
                                }),
                            ],
                        }),
                        d.jsxs("div", {
                            className: "hidden md:flex space-x-6",
                            children: [
                                d.jsx(ir, {
                                    to: "/",
                                    icon: d.jsx(xm, { size: 20 }),
                                    text: "Home",
                                }),
                                d.jsx(ir, {
                                    to: "/hardware",
                                    icon: d.jsx(Us, { size: 20 }),
                                    text: "Hardware",
                                }),
                                d.jsx(ir, {
                                    to: "/embedded",
                                    icon: d.jsx(Ds, { size: 20 }),
                                    text: "Embedded",
                                }),
                                d.jsx(ir, {
                                    to: "/ros",
                                    icon: d.jsx(Ki, { size: 20 }),
                                    text: "ROS & Raspberry",
                                }),
                                d.jsx(ir, {
                                    to: "/computer-vision",
                                    icon: d.jsx(Is, { size: 20 }),
                                    text: "Computer Vision",
                                }),
                            ],
                        }),
                        d.jsx("div", {
                            className: "w-14 h-14 rounded-full overflow-hidden",
                            children: d.jsx("img", {
                                src: "https://res.cloudinary.com/dhjyfpw6f/image/upload/v1737757792/Rob_bpibmx.png",
                                alt: "Assiut Robotics Logo",
                                className: "w-full h-full object-cover",
                            }),
                        }),
                    ],
                }),
            }),
        }),
    ir = ({ to: e, icon: t, text: n }) =>
        d.jsxs(Os, {
            to: e,
            className:
                "flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors",
            children: [t, d.jsx("span", { className: "font-medium", children: n })],
        });
var Id = { exports: {} };
  /* @license
  Papa Parse
  v5.5.0
  https://github.com/mholt/PapaParse
  License: MIT
  */ (function (e, t) {
    (function (n, r) {
        e.exports = r();
    })(Ad, function n() {
        var r =
            typeof self < "u"
                ? self
                : typeof window < "u"
                    ? window
                    : r !== void 0
                        ? r
                        : {},
            i = !r.document && !!r.postMessage,
            l = r.IS_PAPA_WORKER || !1,
            o = {},
            a = 0,
            s = {
                parse: function (u, c) {
                    var y = (c = c || {}).dynamicTyping || !1;
                    if (
                        (N(y) && ((c.dynamicTypingFunction = y), (y = {})),
                            (c.dynamicTyping = y),
                            (c.transform = !!N(c.transform) && c.transform),
                            c.worker && s.WORKERS_SUPPORTED)
                    ) {
                        var z = (function () {
                            if (!s.WORKERS_SUPPORTED) return !1;
                            var $ =
                                ((he = r.URL || r.webkitURL || null),
                                    (U = n.toString()),
                                    s.BLOB_URL ||
                                    (s.BLOB_URL = he.createObjectURL(
                                        new Blob(
                                            [
                                                "var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ",
                                                "(",
                                                U,
                                                ")();",
                                            ],
                                            { type: "text/javascript" },
                                        ),
                                    ))),
                                b = new r.Worker($),
                                he,
                                U;
                            return ((b.onmessage = p), (b.id = a++), (o[b.id] = b));
                        })();
                        return (
                            (z.userStep = c.step),
                            (z.userChunk = c.chunk),
                            (z.userComplete = c.complete),
                            (z.userError = c.error),
                            (c.step = N(c.step)),
                            (c.chunk = N(c.chunk)),
                            (c.complete = N(c.complete)),
                            (c.error = N(c.error)),
                            delete c.worker,
                            void z.postMessage({ input: u, config: c, workerId: z.id })
                        );
                    }
                    var M = null;
                    return (
                        s.NODE_STREAM_INPUT,
                        typeof u == "string"
                            ? ((u = (function ($) {
                                return $.charCodeAt(0) === 65279 ? $.slice(1) : $;
                            })(u)),
                                (M = c.download ? new v(c) : new w(c)))
                            : u.readable === !0 && N(u.read) && N(u.on)
                                ? (M = new _(c))
                                : ((r.File && u instanceof File) || u instanceof Object) &&
                                (M = new x(c)),
                        M.stream(u)
                    );
                },
                unparse: function (u, c) {
                    var y = !1,
                        z = !0,
                        M = ",",
                        $ = `\r
  `,
                        b = '"',
                        he = b + b,
                        U = !1,
                        H = null,
                        S = !1;
                    (function () {
                        if (typeof c == "object") {
                            if (
                                (typeof c.delimiter != "string" ||
                                    s.BAD_DELIMITERS.filter(function (O) {
                                        return c.delimiter.indexOf(O) !== -1;
                                    }).length ||
                                    (M = c.delimiter),
                                    (typeof c.quotes == "boolean" ||
                                        typeof c.quotes == "function" ||
                                        Array.isArray(c.quotes)) &&
                                    (y = c.quotes),
                                    (typeof c.skipEmptyLines != "boolean" &&
                                        typeof c.skipEmptyLines != "string") ||
                                    (U = c.skipEmptyLines),
                                    typeof c.newline == "string" && ($ = c.newline),
                                    typeof c.quoteChar == "string" && (b = c.quoteChar),
                                    typeof c.header == "boolean" && (z = c.header),
                                    Array.isArray(c.columns))
                            ) {
                                if (c.columns.length === 0)
                                    throw new Error("Option columns is empty");
                                H = c.columns;
                            }
                            (c.escapeChar !== void 0 && (he = c.escapeChar + b),
                                c.escapeFormulae instanceof RegExp
                                    ? (S = c.escapeFormulae)
                                    : typeof c.escapeFormulae == "boolean" &&
                                    c.escapeFormulae &&
                                    (S = /^[=+\-@\t\r].*$/));
                        }
                    })();
                    var I = new RegExp(j(b), "g");
                    if ((typeof u == "string" && (u = JSON.parse(u)), Array.isArray(u))) {
                        if (!u.length || Array.isArray(u[0])) return T(null, u, U);
                        if (typeof u[0] == "object") return T(H || Object.keys(u[0]), u, U);
                    } else if (typeof u == "object")
                        return (
                            typeof u.data == "string" && (u.data = JSON.parse(u.data)),
                            Array.isArray(u.data) &&
                            (u.fields || (u.fields = (u.meta && u.meta.fields) || H),
                                u.fields ||
                                (u.fields = Array.isArray(u.data[0])
                                    ? u.fields
                                    : typeof u.data[0] == "object"
                                        ? Object.keys(u.data[0])
                                        : []),
                                Array.isArray(u.data[0]) ||
                                typeof u.data[0] == "object" ||
                                (u.data = [u.data])),
                            T(u.fields || [], u.data || [], U)
                        );
                    throw new Error("Unable to serialize unrecognized input");
                    function T(O, G, oe) {
                        var Z = "";
                        (typeof O == "string" && (O = JSON.parse(O)),
                            typeof G == "string" && (G = JSON.parse(G)));
                        var se = Array.isArray(O) && 0 < O.length,
                            Se = !Array.isArray(G[0]);
                        if (se && z) {
                            for (var J = 0; J < O.length; J++)
                                (0 < J && (Z += M), (Z += B(O[J], J)));
                            0 < G.length && (Z += $);
                        }
                        for (var F = 0; F < G.length; F++) {
                            var A = se ? O.length : G[F].length,
                                te = !1,
                                ne = se ? Object.keys(G[F]).length === 0 : G[F].length === 0;
                            if (
                                (oe &&
                                    !se &&
                                    (te =
                                        oe === "greedy"
                                            ? G[F].join("").trim() === ""
                                            : G[F].length === 1 && G[F][0].length === 0),
                                    oe === "greedy" && se)
                            ) {
                                for (var Q = [], X = 0; X < A; X++) {
                                    var K = Se ? O[X] : X;
                                    Q.push(G[F][K]);
                                }
                                te = Q.join("").trim() === "";
                            }
                            if (!te) {
                                for (var ae = 0; ae < A; ae++) {
                                    0 < ae && !ne && (Z += M);
                                    var q = se && Se ? O[ae] : ae;
                                    Z += B(G[F][q], ae);
                                }
                                F < G.length - 1 && (!oe || (0 < A && !ne)) && (Z += $);
                            }
                        }
                        return Z;
                    }
                    function B(O, G) {
                        if (O == null) return "";
                        if (O.constructor === Date) return JSON.stringify(O).slice(1, 25);
                        var oe = !1;
                        S &&
                            typeof O == "string" &&
                            S.test(O) &&
                            ((O = "'" + O), (oe = !0));
                        var Z = O.toString().replace(I, he);
                        return (oe =
                            oe ||
                            y === !0 ||
                            (typeof y == "function" && y(O, G)) ||
                            (Array.isArray(y) && y[G]) ||
                            (function (se, Se) {
                                for (var J = 0; J < Se.length; J++)
                                    if (-1 < se.indexOf(Se[J])) return !0;
                                return !1;
                            })(Z, s.BAD_DELIMITERS) ||
                            -1 < Z.indexOf(M) ||
                            Z.charAt(0) === " " ||
                            Z.charAt(Z.length - 1) === " ")
                            ? b + Z + b
                            : Z;
                    }
                },
            };
        if (
            ((s.RECORD_SEP = ""),
                (s.UNIT_SEP = ""),
                (s.BYTE_ORDER_MARK = "\uFEFF"),
                (s.BAD_DELIMITERS = [
                    "\r",
                    `
  `,
                    '"',
                    s.BYTE_ORDER_MARK,
                ]),
                (s.WORKERS_SUPPORTED = !i && !!r.Worker),
                (s.NODE_STREAM_INPUT = 1),
                (s.LocalChunkSize = 10485760),
                (s.RemoteChunkSize = 5242880),
                (s.DefaultDelimiter = ","),
                (s.Parser = h),
                (s.ParserHandle = C),
                (s.NetworkStreamer = v),
                (s.FileStreamer = x),
                (s.StringStreamer = w),
                (s.ReadableStreamStreamer = _),
                r.jQuery)
        ) {
            var f = r.jQuery;
            f.fn.parse = function (u) {
                var c = u.config || {},
                    y = [];
                return (
                    this.each(function ($) {
                        if (
                            !(
                                f(this).prop("tagName").toUpperCase() === "INPUT" &&
                                f(this).attr("type").toLowerCase() === "file" &&
                                r.FileReader
                            ) ||
                            !this.files ||
                            this.files.length === 0
                        )
                            return !0;
                        for (var b = 0; b < this.files.length; b++)
                            y.push({
                                file: this.files[b],
                                inputElem: this,
                                instanceConfig: f.extend({}, c),
                            });
                    }),
                    z(),
                    this
                );
                function z() {
                    if (y.length !== 0) {
                        var $,
                            b,
                            he,
                            U,
                            H = y[0];
                        if (N(u.before)) {
                            var S = u.before(H.file, H.inputElem);
                            if (typeof S == "object") {
                                if (S.action === "abort")
                                    return (
                                        ($ = "AbortError"),
                                        (b = H.file),
                                        (he = H.inputElem),
                                        (U = S.reason),
                                        void (N(u.error) && u.error({ name: $ }, b, he, U))
                                    );
                                if (S.action === "skip") return void M();
                                typeof S.config == "object" &&
                                    (H.instanceConfig = f.extend(H.instanceConfig, S.config));
                            } else if (S === "skip") return void M();
                        }
                        var I = H.instanceConfig.complete;
                        ((H.instanceConfig.complete = function (T) {
                            (N(I) && I(T, H.file, H.inputElem), M());
                        }),
                            s.parse(H.file, H.instanceConfig));
                    } else N(u.complete) && u.complete();
                }
                function M() {
                    (y.splice(0, 1), z());
                }
            };
        }
        function g(u) {
            ((this._handle = null),
                (this._finished = !1),
                (this._completed = !1),
                (this._halted = !1),
                (this._input = null),
                (this._baseIndex = 0),
                (this._partialLine = ""),
                (this._rowCount = 0),
                (this._start = 0),
                (this._nextChunk = null),
                (this.isFirstChunk = !0),
                (this._completeResults = { data: [], errors: [], meta: {} }),
                function (c) {
                    var y = P(c);
                    ((y.chunkSize = parseInt(y.chunkSize)),
                        c.step || c.chunk || (y.chunkSize = null),
                        (this._handle = new C(y)),
                        ((this._handle.streamer = this)._config = y));
                }.call(this, u),
                (this.parseChunk = function (c, y) {
                    var z = parseInt(this._config.skipFirstNLines) || 0;
                    if (this.isFirstChunk && 0 < z) {
                        var M = this._config.newline;
                        if (!M) {
                            var $ = this._config.quoteChar || '"';
                            M = this._handle.guessLineEndings(c, $);
                        }
                        c = c.split(M).slice(z).join(M);
                    }
                    if (this.isFirstChunk && N(this._config.beforeFirstChunk)) {
                        var b = this._config.beforeFirstChunk(c);
                        b !== void 0 && (c = b);
                    }
                    ((this.isFirstChunk = !1), (this._halted = !1));
                    var he = this._partialLine + c;
                    this._partialLine = "";
                    var U = this._handle.parse(he, this._baseIndex, !this._finished);
                    if (!this._handle.paused() && !this._handle.aborted()) {
                        var H = U.meta.cursor;
                        (this._finished ||
                            ((this._partialLine = he.substring(H - this._baseIndex)),
                                (this._baseIndex = H)),
                            U && U.data && (this._rowCount += U.data.length));
                        var S =
                            this._finished ||
                            (this._config.preview && this._rowCount >= this._config.preview);
                        if (l)
                            r.postMessage({ results: U, workerId: s.WORKER_ID, finished: S });
                        else if (N(this._config.chunk) && !y) {
                            if (
                                (this._config.chunk(U, this._handle),
                                    this._handle.paused() || this._handle.aborted())
                            )
                                return void (this._halted = !0);
                            ((U = void 0), (this._completeResults = void 0));
                        }
                        return (
                            this._config.step ||
                            this._config.chunk ||
                            ((this._completeResults.data =
                                this._completeResults.data.concat(U.data)),
                                (this._completeResults.errors =
                                    this._completeResults.errors.concat(U.errors)),
                                (this._completeResults.meta = U.meta)),
                            this._completed ||
                            !S ||
                            !N(this._config.complete) ||
                            (U && U.meta.aborted) ||
                            (this._config.complete(this._completeResults, this._input),
                                (this._completed = !0)),
                            S || (U && U.meta.paused) || this._nextChunk(),
                            U
                        );
                    }
                    this._halted = !0;
                }),
                (this._sendError = function (c) {
                    N(this._config.error)
                        ? this._config.error(c)
                        : l &&
                        this._config.error &&
                        r.postMessage({ workerId: s.WORKER_ID, error: c, finished: !1 });
                }));
        }
        function v(u) {
            var c;
            ((u = u || {}).chunkSize || (u.chunkSize = s.RemoteChunkSize),
                g.call(this, u),
                (this._nextChunk = i
                    ? function () {
                        (this._readChunk(), this._chunkLoaded());
                    }
                    : function () {
                        this._readChunk();
                    }),
                (this.stream = function (y) {
                    ((this._input = y), this._nextChunk());
                }),
                (this._readChunk = function () {
                    if (this._finished) this._chunkLoaded();
                    else {
                        if (
                            ((c = new XMLHttpRequest()),
                                this._config.withCredentials &&
                                (c.withCredentials = this._config.withCredentials),
                                i ||
                                ((c.onload = R(this._chunkLoaded, this)),
                                    (c.onerror = R(this._chunkError, this))),
                                c.open(
                                    this._config.downloadRequestBody ? "POST" : "GET",
                                    this._input,
                                    !i,
                                ),
                                this._config.downloadRequestHeaders)
                        ) {
                            var y = this._config.downloadRequestHeaders;
                            for (var z in y) c.setRequestHeader(z, y[z]);
                        }
                        if (this._config.chunkSize) {
                            var M = this._start + this._config.chunkSize - 1;
                            c.setRequestHeader("Range", "bytes=" + this._start + "-" + M);
                        }
                        try {
                            c.send(this._config.downloadRequestBody);
                        } catch ($) {
                            this._chunkError($.message);
                        }
                        i && c.status === 0 && this._chunkError();
                    }
                }),
                (this._chunkLoaded = function () {
                    c.readyState === 4 &&
                        (c.status < 200 || 400 <= c.status
                            ? this._chunkError()
                            : ((this._start += this._config.chunkSize
                                ? this._config.chunkSize
                                : c.responseText.length),
                                (this._finished =
                                    !this._config.chunkSize ||
                                    this._start >=
                                    (function (y) {
                                        var z = y.getResponseHeader("Content-Range");
                                        return z === null
                                            ? -1
                                            : parseInt(z.substring(z.lastIndexOf("/") + 1));
                                    })(c)),
                                this.parseChunk(c.responseText)));
                }),
                (this._chunkError = function (y) {
                    var z = c.statusText || y;
                    this._sendError(new Error(z));
                }));
        }
        function x(u) {
            var c, y;
            ((u = u || {}).chunkSize || (u.chunkSize = s.LocalChunkSize),
                g.call(this, u));
            var z = typeof FileReader < "u";
            ((this.stream = function (M) {
                ((this._input = M),
                    (y = M.slice || M.webkitSlice || M.mozSlice),
                    z
                        ? (((c = new FileReader()).onload = R(this._chunkLoaded, this)),
                            (c.onerror = R(this._chunkError, this)))
                        : (c = new FileReaderSync()),
                    this._nextChunk());
            }),
                (this._nextChunk = function () {
                    this._finished ||
                        (this._config.preview &&
                            !(this._rowCount < this._config.preview)) ||
                        this._readChunk();
                }),
                (this._readChunk = function () {
                    var M = this._input;
                    if (this._config.chunkSize) {
                        var $ = Math.min(
                            this._start + this._config.chunkSize,
                            this._input.size,
                        );
                        M = y.call(M, this._start, $);
                    }
                    var b = c.readAsText(M, this._config.encoding);
                    z || this._chunkLoaded({ target: { result: b } });
                }),
                (this._chunkLoaded = function (M) {
                    ((this._start += this._config.chunkSize),
                        (this._finished =
                            !this._config.chunkSize || this._start >= this._input.size),
                        this.parseChunk(M.target.result));
                }),
                (this._chunkError = function () {
                    this._sendError(c.error);
                }));
        }
        function w(u) {
            var c;
            (g.call(this, (u = u || {})),
                (this.stream = function (y) {
                    return ((c = y), this._nextChunk());
                }),
                (this._nextChunk = function () {
                    if (!this._finished) {
                        var y,
                            z = this._config.chunkSize;
                        return (
                            z
                                ? ((y = c.substring(0, z)), (c = c.substring(z)))
                                : ((y = c), (c = "")),
                            (this._finished = !c),
                            this.parseChunk(y)
                        );
                    }
                }));
        }
        function _(u) {
            g.call(this, (u = u || {}));
            var c = [],
                y = !0,
                z = !1;
            ((this.pause = function () {
                (g.prototype.pause.apply(this, arguments), this._input.pause());
            }),
                (this.resume = function () {
                    (g.prototype.resume.apply(this, arguments), this._input.resume());
                }),
                (this.stream = function (M) {
                    ((this._input = M),
                        this._input.on("data", this._streamData),
                        this._input.on("end", this._streamEnd),
                        this._input.on("error", this._streamError));
                }),
                (this._checkIsFinished = function () {
                    z && c.length === 1 && (this._finished = !0);
                }),
                (this._nextChunk = function () {
                    (this._checkIsFinished(),
                        c.length ? this.parseChunk(c.shift()) : (y = !0));
                }),
                (this._streamData = R(function (M) {
                    try {
                        (c.push(
                            typeof M == "string" ? M : M.toString(this._config.encoding),
                        ),
                            y &&
                            ((y = !1),
                                this._checkIsFinished(),
                                this.parseChunk(c.shift())));
                    } catch ($) {
                        this._streamError($);
                    }
                }, this)),
                (this._streamError = R(function (M) {
                    (this._streamCleanUp(), this._sendError(M));
                }, this)),
                (this._streamEnd = R(function () {
                    (this._streamCleanUp(), (z = !0), this._streamData(""));
                }, this)),
                (this._streamCleanUp = R(function () {
                    (this._input.removeListener("data", this._streamData),
                        this._input.removeListener("end", this._streamEnd),
                        this._input.removeListener("error", this._streamError));
                }, this)));
        }
        function C(u) {
            var c,
                y,
                z,
                M = Math.pow(2, 53),
                $ = -M,
                b = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,
                he =
                    /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,
                U = this,
                H = 0,
                S = 0,
                I = !1,
                T = !1,
                B = [],
                O = { data: [], errors: [], meta: {} };
            if (N(u.step)) {
                var G = u.step;
                u.step = function (F) {
                    if (((O = F), se())) Z();
                    else {
                        if ((Z(), O.data.length === 0)) return;
                        ((H += F.data.length),
                            u.preview && H > u.preview
                                ? y.abort()
                                : ((O.data = O.data[0]), G(O, U)));
                    }
                };
            }
            function oe(F) {
                return u.skipEmptyLines === "greedy"
                    ? F.join("").trim() === ""
                    : F.length === 1 && F[0].length === 0;
            }
            function Z() {
                return (
                    O &&
                    z &&
                    (J(
                        "Delimiter",
                        "UndetectableDelimiter",
                        "Unable to auto-detect delimiting character; defaulted to '" +
                        s.DefaultDelimiter +
                        "'",
                    ),
                        (z = !1)),
                    u.skipEmptyLines &&
                    (O.data = O.data.filter(function (F) {
                        return !oe(F);
                    })),
                    se() &&
                    (function () {
                        if (!O) return;
                        function F(te, ne) {
                            (N(u.transformHeader) && (te = u.transformHeader(te, ne)),
                                B.push(te));
                        }
                        if (Array.isArray(O.data[0])) {
                            for (var A = 0; se() && A < O.data.length; A++)
                                O.data[A].forEach(F);
                            O.data.splice(0, 1);
                        } else O.data.forEach(F);
                    })(),
                    (function () {
                        if (!O || (!u.header && !u.dynamicTyping && !u.transform)) return O;
                        function F(te, ne) {
                            var Q,
                                X = u.header ? {} : [];
                            for (Q = 0; Q < te.length; Q++) {
                                var K = Q,
                                    ae = te[Q];
                                (u.header && (K = Q >= B.length ? "__parsed_extra" : B[Q]),
                                    u.transform && (ae = u.transform(ae, K)),
                                    (ae = Se(K, ae)),
                                    K === "__parsed_extra"
                                        ? ((X[K] = X[K] || []), X[K].push(ae))
                                        : (X[K] = ae));
                            }
                            return (
                                u.header &&
                                (Q > B.length
                                    ? J(
                                        "FieldMismatch",
                                        "TooManyFields",
                                        "Too many fields: expected " +
                                        B.length +
                                        " fields but parsed " +
                                        Q,
                                        S + ne,
                                    )
                                    : Q < B.length &&
                                    J(
                                        "FieldMismatch",
                                        "TooFewFields",
                                        "Too few fields: expected " +
                                        B.length +
                                        " fields but parsed " +
                                        Q,
                                        S + ne,
                                    )),
                                X
                            );
                        }
                        var A = 1;
                        return (
                            !O.data.length || Array.isArray(O.data[0])
                                ? ((O.data = O.data.map(F)), (A = O.data.length))
                                : (O.data = F(O.data, 0)),
                            u.header && O.meta && (O.meta.fields = B),
                            (S += A),
                            O
                        );
                    })()
                );
            }
            function se() {
                return u.header && B.length === 0;
            }
            function Se(F, A) {
                return (
                    (te = F),
                    u.dynamicTypingFunction &&
                    u.dynamicTyping[te] === void 0 &&
                    (u.dynamicTyping[te] = u.dynamicTypingFunction(te)),
                    (u.dynamicTyping[te] || u.dynamicTyping) === !0
                        ? A === "true" ||
                        A === "TRUE" ||
                        (A !== "false" &&
                            A !== "FALSE" &&
                            ((function (ne) {
                                if (b.test(ne)) {
                                    var Q = parseFloat(ne);
                                    if ($ < Q && Q < M) return !0;
                                }
                                return !1;
                            })(A)
                                ? parseFloat(A)
                                : he.test(A)
                                    ? new Date(A)
                                    : A === ""
                                        ? null
                                        : A))
                        : A
                );
                var te;
            }
            function J(F, A, te, ne) {
                var Q = { type: F, code: A, message: te };
                (ne !== void 0 && (Q.row = ne), O.errors.push(Q));
            }
            ((this.parse = function (F, A, te) {
                var ne = u.quoteChar || '"';
                if (
                    (u.newline || (u.newline = this.guessLineEndings(F, ne)),
                        (z = !1),
                        u.delimiter)
                )
                    N(u.delimiter) &&
                        ((u.delimiter = u.delimiter(F)), (O.meta.delimiter = u.delimiter));
                else {
                    var Q = (function (K, ae, q, Hr, Lt) {
                        var Rt, gn, vt, yn;
                        Lt = Lt || [",", "	", "|", ";", s.RECORD_SEP, s.UNIT_SEP];
                        for (var je = 0; je < Lt.length; je++) {
                            var qt = Lt[je],
                                Ne = 0,
                                Ie = 0,
                                tt = 0;
                            vt = void 0;
                            for (
                                var gt = new h({
                                    comments: Hr,
                                    delimiter: qt,
                                    newline: ae,
                                    preview: 10,
                                }).parse(K),
                                Jt = 0;
                                Jt < gt.data.length;
                                Jt++
                            )
                                if (q && oe(gt.data[Jt])) tt++;
                                else {
                                    var Xe = gt.data[Jt].length;
                                    ((Ie += Xe),
                                        vt !== void 0
                                            ? 0 < Xe && ((Ne += Math.abs(Xe - vt)), (vt = Xe))
                                            : (vt = Xe));
                                }
                            (0 < gt.data.length && (Ie /= gt.data.length - tt),
                                (gn === void 0 || Ne <= gn) &&
                                (yn === void 0 || yn < Ie) &&
                                1.99 < Ie &&
                                ((gn = Ne), (Rt = qt), (yn = Ie)));
                        }
                        return { successful: !!(u.delimiter = Rt), bestDelimiter: Rt };
                    })(F, u.newline, u.skipEmptyLines, u.comments, u.delimitersToGuess);
                    (Q.successful
                        ? (u.delimiter = Q.bestDelimiter)
                        : ((z = !0), (u.delimiter = s.DefaultDelimiter)),
                        (O.meta.delimiter = u.delimiter));
                }
                var X = P(u);
                return (
                    u.preview && u.header && X.preview++,
                    (c = F),
                    (y = new h(X)),
                    (O = y.parse(c, A, te)),
                    Z(),
                    I ? { meta: { paused: !0 } } : O || { meta: { paused: !1 } }
                );
            }),
                (this.paused = function () {
                    return I;
                }),
                (this.pause = function () {
                    ((I = !0),
                        y.abort(),
                        (c = N(u.chunk) ? "" : c.substring(y.getCharIndex())));
                }),
                (this.resume = function () {
                    U.streamer._halted
                        ? ((I = !1), U.streamer.parseChunk(c, !0))
                        : setTimeout(U.resume, 3);
                }),
                (this.aborted = function () {
                    return T;
                }),
                (this.abort = function () {
                    ((T = !0),
                        y.abort(),
                        (O.meta.aborted = !0),
                        N(u.complete) && u.complete(O),
                        (c = ""));
                }),
                (this.guessLineEndings = function (F, A) {
                    F = F.substring(0, 1048576);
                    var te = new RegExp(j(A) + "([^]*?)" + j(A), "gm"),
                        ne = (F = F.replace(te, "")).split("\r"),
                        Q = F.split(`
  `),
                        X = 1 < Q.length && Q[0].length < ne[0].length;
                    if (ne.length === 1 || X)
                        return `
  `;
                    for (var K = 0, ae = 0; ae < ne.length; ae++)
                        ne[ae][0] ===
                            `
  ` && K++;
                    return K >= ne.length / 2
                        ? `\r
  `
                        : "\r";
                }));
        }
        function j(u) {
            return u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        function h(u) {
            var c,
                y = (u = u || {}).delimiter,
                z = u.newline,
                M = u.comments,
                $ = u.step,
                b = u.preview,
                he = u.fastMode,
                U = null,
                H = (c =
                    u.quoteChar === void 0 || u.quoteChar === null ? '"' : u.quoteChar);
            if (
                (u.escapeChar !== void 0 && (H = u.escapeChar),
                    (typeof y != "string" || -1 < s.BAD_DELIMITERS.indexOf(y)) && (y = ","),
                    M === y)
            )
                throw new Error("Comment character same as delimiter");
            (M === !0
                ? (M = "#")
                : (typeof M != "string" || -1 < s.BAD_DELIMITERS.indexOf(M)) &&
                (M = !1),
                z !==
                `
  ` &&
                z !== "\r" &&
                z !==
                `\r
  ` &&
                (z = `
  `));
            var S = 0,
                I = !1;
            ((this.parse = function (T, B, O) {
                if (typeof T != "string") throw new Error("Input must be a string");
                var G = T.length,
                    oe = y.length,
                    Z = z.length,
                    se = M.length,
                    Se = N($),
                    J = [],
                    F = [],
                    A = [],
                    te = (S = 0);
                if (!T) return je();
                if (he || (he !== !1 && T.indexOf(c) === -1)) {
                    for (var ne = T.split(z), Q = 0; Q < ne.length; Q++) {
                        if (((A = ne[Q]), (S += A.length), Q !== ne.length - 1))
                            S += z.length;
                        else if (O) return je();
                        if (!M || A.substring(0, se) !== M) {
                            if (Se) {
                                if (((J = []), Rt(A.split(y)), qt(), I)) return je();
                            } else Rt(A.split(y));
                            if (b && b <= Q) return ((J = J.slice(0, b)), je(!0));
                        }
                    }
                    return je();
                }
                for (
                    var X = T.indexOf(y, S),
                    K = T.indexOf(z, S),
                    ae = new RegExp(j(H) + j(c), "g"),
                    q = T.indexOf(c, S);
                    ;
                )
                    if (T[S] !== c)
                        if (M && A.length === 0 && T.substring(S, S + se) === M) {
                            if (K === -1) return je();
                            ((S = K + Z), (K = T.indexOf(z, S)), (X = T.indexOf(y, S)));
                        } else if (X !== -1 && (X < K || K === -1))
                            (A.push(T.substring(S, X)), (S = X + oe), (X = T.indexOf(y, S)));
                        else {
                            if (K === -1) break;
                            if ((A.push(T.substring(S, K)), yn(K + Z), Se && (qt(), I)))
                                return je();
                            if (b && J.length >= b) return je(!0);
                        }
                    else
                        for (q = S, S++; ;) {
                            if ((q = T.indexOf(c, q + 1)) === -1)
                                return (
                                    O ||
                                    F.push({
                                        type: "Quotes",
                                        code: "MissingQuotes",
                                        message: "Quoted field unterminated",
                                        row: J.length,
                                        index: S,
                                    }),
                                    vt()
                                );
                            if (q === G - 1) return vt(T.substring(S, q).replace(ae, c));
                            if (c !== H || T[q + 1] !== H) {
                                if (c === H || q === 0 || T[q - 1] !== H) {
                                    (X !== -1 && X < q + 1 && (X = T.indexOf(y, q + 1)),
                                        K !== -1 && K < q + 1 && (K = T.indexOf(z, q + 1)));
                                    var Hr = gn(K === -1 ? X : Math.min(X, K));
                                    if (T.substr(q + 1 + Hr, oe) === y) {
                                        (A.push(T.substring(S, q).replace(ae, c)),
                                            T[(S = q + 1 + Hr + oe)] !== c && (q = T.indexOf(c, S)),
                                            (X = T.indexOf(y, S)),
                                            (K = T.indexOf(z, S)));
                                        break;
                                    }
                                    var Lt = gn(K);
                                    if (T.substring(q + 1 + Lt, q + 1 + Lt + Z) === z) {
                                        if (
                                            (A.push(T.substring(S, q).replace(ae, c)),
                                                yn(q + 1 + Lt + Z),
                                                (X = T.indexOf(y, S)),
                                                (q = T.indexOf(c, S)),
                                                Se && (qt(), I))
                                        )
                                            return je();
                                        if (b && J.length >= b) return je(!0);
                                        break;
                                    }
                                    (F.push({
                                        type: "Quotes",
                                        code: "InvalidQuotes",
                                        message: "Trailing quote on quoted field is malformed",
                                        row: J.length,
                                        index: S,
                                    }),
                                        q++);
                                }
                            } else q++;
                        }
                return vt();
                function Rt(Ne) {
                    (J.push(Ne), (te = S));
                }
                function gn(Ne) {
                    var Ie = 0;
                    if (Ne !== -1) {
                        var tt = T.substring(q + 1, Ne);
                        tt && tt.trim() === "" && (Ie = tt.length);
                    }
                    return Ie;
                }
                function vt(Ne) {
                    return (
                        O ||
                        (Ne === void 0 && (Ne = T.substring(S)),
                            A.push(Ne),
                            (S = G),
                            Rt(A),
                            Se && qt()),
                        je()
                    );
                }
                function yn(Ne) {
                    ((S = Ne), Rt(A), (A = []), (K = T.indexOf(z, S)));
                }
                function je(Ne) {
                    if (u.header && !B && J.length) {
                        for (
                            var Ie = J[0], tt = {}, gt = new Set(Ie), Jt = !1, Xe = 0;
                            Xe < Ie.length;
                            Xe++
                        ) {
                            var ut = Ie[Xe];
                            if (
                                (N(u.transformHeader) && (ut = u.transformHeader(ut, Xe)),
                                    tt[ut])
                            ) {
                                for (
                                    var Yn, Hs = tt[ut];
                                    (Yn = ut + "_" + Hs), Hs++, gt.has(Yn);
                                );
                                (gt.add(Yn),
                                    (Ie[Xe] = Yn),
                                    tt[ut]++,
                                    (Jt = !0),
                                    U === null && (U = {}),
                                    (U[Yn] = ut));
                            } else ((tt[ut] = 1), (Ie[Xe] = ut));
                            gt.add(ut);
                        }
                        Jt && console.warn("Duplicate headers found and renamed.");
                    }
                    return {
                        data: J,
                        errors: F,
                        meta: {
                            delimiter: y,
                            linebreak: z,
                            aborted: I,
                            truncated: !!Ne,
                            cursor: te + (B || 0),
                            renamedHeaders: U,
                        },
                    };
                }
                function qt() {
                    ($(je()), (J = []), (F = []));
                }
            }),
                (this.abort = function () {
                    I = !0;
                }),
                (this.getCharIndex = function () {
                    return S;
                }));
        }
        function p(u) {
            var c = u.data,
                y = o[c.workerId],
                z = !1;
            if (c.error) y.userError(c.error, c.file);
            else if (c.results && c.results.data) {
                var M = {
                    abort: function () {
                        ((z = !0),
                            m(c.workerId, { data: [], errors: [], meta: { aborted: !0 } }));
                    },
                    pause: k,
                    resume: k,
                };
                if (N(y.userStep)) {
                    for (
                        var $ = 0;
                        $ < c.results.data.length &&
                        (y.userStep(
                            {
                                data: c.results.data[$],
                                errors: c.results.errors,
                                meta: c.results.meta,
                            },
                            M,
                        ),
                            !z);
                        $++
                    );
                    delete c.results;
                } else
                    N(y.userChunk) &&
                        (y.userChunk(c.results, M, c.file), delete c.results);
            }
            c.finished && !z && m(c.workerId, c.results);
        }
        function m(u, c) {
            var y = o[u];
            (N(y.userComplete) && y.userComplete(c), y.terminate(), delete o[u]);
        }
        function k() {
            throw new Error("Not implemented.");
        }
        function P(u) {
            if (typeof u != "object" || u === null) return u;
            var c = Array.isArray(u) ? [] : {};
            for (var y in u) c[y] = P(u[y]);
            return c;
        }
        function R(u, c) {
            return function () {
                u.apply(c, arguments);
            };
        }
        function N(u) {
            return typeof u == "function";
        }
        return (
            l &&
            (r.onmessage = function (u) {
                var c = u.data;
                if (
                    (s.WORKER_ID === void 0 && c && (s.WORKER_ID = c.workerId),
                        typeof c.input == "string")
                )
                    r.postMessage({
                        workerId: s.WORKER_ID,
                        results: s.parse(c.input, c.config),
                        finished: !0,
                    });
                else if (
                    (r.File && c.input instanceof File) ||
                    c.input instanceof Object
                ) {
                    var y = s.parse(c.input, c.config);
                    y &&
                        r.postMessage({
                            workerId: s.WORKER_ID,
                            results: y,
                            finished: !0,
                        });
                }
            }),
            ((v.prototype = Object.create(g.prototype)).constructor = v),
            ((x.prototype = Object.create(g.prototype)).constructor = x),
            ((w.prototype = Object.create(w.prototype)).constructor = w),
            ((_.prototype = Object.create(g.prototype)).constructor = _),
            s
        );
    });
})(Id);
var _m = Id.exports;
const Cm = du(_m),
    Ws = async () => {
        try {
            const t = await (
                await fetch(
                    `https://docs.google.com/spreadsheets/d/1cBiANz0vm_66zcg5Xd9BLiOCrmYAvB8IeZ1Jeqn6dAc/gviz/tq?tqx=out:csv&timestamp=${Date.now()}`,
                )
            ).text();
            return new Promise((n) => {
                Cm.parse(t, {
                    header: !0,
                    skipEmptyLines: !0,
                    complete: (r) => {
                        const i = r.data.map((l) => ({
                            name: l.Name,
                            role: l.Role,
                            about: l.About,
                            as: l.As,
                            imageLink: l["Image Link"],
                            linkedinLink: l["Linkedin Link"],
                            email: l.Email,
                            github: l.github,
                            portfolio: l.Portfolio,
                            whatsappLink: l["Whatsapp Link"],
                            isHead: l.As === "Head",
                        }));
                        n(i);
                    },
                });
            });
        } catch (e) {
            return (console.error("Error fetching team data:", e), []);
        }
    },
    jm = () => {
        const e = E.useRef(null),
            [t, n] = E.useState(!1),
            [r, i] = E.useState(0),
            [l, o] = E.useState(0),
            [a, s] = E.useState(0),
            [f, g] = E.useState(!1),
            [v, x] = E.useState(0),
            [w, _] = E.useState([]),
            [C, j] = E.useState(!0),
            [h, p] = E.useState(null);
        (E.useEffect(() => {
            (async () => {
                try {
                    const y = (await Ws()).filter(
                        (z) => z.as === "Member" || z.as === "Head",
                    );
                    (_(y), j(!1));
                } catch {
                    (p("Failed to load team members"), j(!1));
                }
            })();
        }, []),
            E.useEffect(() => {
                const u = new IntersectionObserver(
                    ([c]) => {
                        g(c.isIntersecting);
                    },
                    { threshold: 0.1 },
                );
                if (e.current) {
                    u.observe(e.current);
                    const c = () => {
                        const y = e.current.offsetWidth;
                        x(Math.ceil(w.length / (y >= 768 ? 3 : 1)));
                    };
                    return (
                        c(),
                        window.addEventListener("resize", c),
                        () => {
                            (u.disconnect(), window.removeEventListener("resize", c));
                        }
                    );
                }
            }, [w.length]));
        const m = (u) => {
            (n(!0), i(u.pageX - e.current.offsetLeft), o(e.current.scrollLeft));
        },
            k = () => {
                n(!1);
            },
            P = (u) => {
                if (!t) return;
                u.preventDefault();
                const y = (u.pageX - e.current.offsetLeft - r) * 2;
                e.current.scrollLeft = l - y;
            },
            R = (u) => {
                const c = e.current,
                    y = c.offsetWidth;
                ((c.scrollLeft = y * u), s(u));
            },
            N = () => {
                const u = e.current,
                    c = Math.round(u.scrollLeft / u.offsetWidth);
                s(c);
            };
        return C
            ? d.jsx("div", {
                className:
                    "min-h-[300px] flex items-center justify-center bg-gradient-to-b from-blue-900 to-indigo-900",
                children: d.jsx("div", {
                    className:
                        "animate-spin rounded-full h-12 w-12 border-b-2 border-white",
                }),
            })
            : h
                ? d.jsx("div", {
                    className:
                        "min-h-[300px] flex items-center justify-center bg-gradient-to-b from-blue-900 to-indigo-900 text-red-400",
                    children: h,
                })
                : d.jsxs("section", {
                    className:
                        "py-12 bg-gradient-to-b from-blue-900 to-indigo-900 overflow-hidden relative",
                    children: [
                        d.jsx("div", {
                            className: "absolute inset-0 geometric-pattern opacity-20",
                        }),
                        d.jsx("div", {
                            className:
                                "absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50",
                        }),
                        d.jsxs("div", {
                            className: "max-w-7xl mx-auto px-4 relative",
                            children: [
                                d.jsxs("div", {
                                    className: "text-center mb-8",
                                    children: [
                                        d.jsx("h2", {
                                            className: `text-4xl font-bold text-white mb-3 ${f ? "animate-fade-in" : "opacity-0"}`,
                                            children: "Meet Our Team",
                                        }),
                                        d.jsx("div", {
                                            className: `w-24 h-1 bg-blue-500 mx-auto rounded-full animate-glow ${f ? "animate-fade-in" : "opacity-0"}`,
                                            style: { animationDelay: "0.3s" },
                                        }),
                                    ],
                                }),
                                d.jsxs("div", {
                                    className: "relative group",
                                    children: [
                                        d.jsx("button", {
                                            onClick: () => R(Math.max(0, a - 1)),
                                            className:
                                                "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                            children: d.jsx(Ms, { size: 24 }),
                                        }),
                                        d.jsx("button", {
                                            onClick: () => R(Math.min(v - 1, a + 1)),
                                            className:
                                                "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                            children: d.jsx(dl, { size: 24 }),
                                        }),
                                        d.jsx("div", {
                                            ref: e,
                                            className:
                                                "flex overflow-x-auto snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing",
                                            onMouseDown: m,
                                            onMouseUp: k,
                                            onMouseLeave: k,
                                            onMouseMove: P,
                                            onScroll: N,
                                            style: {
                                                scrollBehavior: "smooth",
                                                WebkitOverflowScrolling: "touch",
                                            },
                                            children: w.map((u, c) =>
                                                d.jsx(
                                                    "div",
                                                    {
                                                        className:
                                                            "flex-none w-full md:w-1/3 px-2 md:px-3 snap-center",
                                                        children: d.jsxs("div", {
                                                            className: `relative flex flex-col min-h-[450px] ${u.isHead ? "transform scale-[1.02]" : ""} ${u.isHead ? "bg-gradient-to-br from-blue-900/90 to-indigo-900/90 border-2 border-yellow-400" : "bg-white/10"} backdrop-blur-sm rounded-xl p-4 text-center hover:border-blue-400/50 transition-all duration-500 ${f ? "animate-fade-in" : "opacity-0"}`,
                                                            style: { animationDelay: `${c * 0.2}s` },
                                                            children: [
                                                                u.isHead &&
                                                                d.jsx("div", {
                                                                    className:
                                                                        "absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl pointer-events-none",
                                                                    children: d.jsx("div", {
                                                                        className:
                                                                            "absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent animate-shine",
                                                                    }),
                                                                }),
                                                                d.jsxs("div", {
                                                                    className: "relative mt-4 mb-3",
                                                                    children: [
                                                                        d.jsx("div", {
                                                                            className: `absolute inset-0 rounded-full animate-pulse-slow opacity-20 ${u.isHead ? "bg-yellow-400" : "bg-blue-500"}`,
                                                                        }),
                                                                        d.jsx("img", {
                                                                            src: u.imageLink,
                                                                            alt: u.name,
                                                                            className: `w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto relative z-10 animate-float border-4 ${u.isHead ? "border-yellow-400 ring-4 ring-yellow-400/30" : "border-white/20"} hover:border-blue-400 transition-colors duration-300 object-cover`,
                                                                        }),
                                                                    ],
                                                                }),
                                                                d.jsxs("div", {
                                                                    className: "flex-grow",
                                                                    children: [
                                                                        d.jsx("h3", {
                                                                            className: `text-lg md:text-xl font-semibold text-white mb-1 ${u.isHead ? "text-yellow-400" : ""}`,
                                                                            children: u.name,
                                                                        }),
                                                                        d.jsx("p", {
                                                                            className: `text-sm md:text-base mb-2 shimmer ${u.isHead ? "text-yellow-200" : "text-blue-200"}`,
                                                                            children: u.role,
                                                                        }),
                                                                        d.jsx("p", {
                                                                            className:
                                                                                "text-gray-300 mb-4 text-sm md:text-base line-clamp-3",
                                                                            children: u.about,
                                                                        }),
                                                                    ],
                                                                }),
                                                                d.jsx("div", {
                                                                    className:
                                                                        "flex justify-center space-x-3 mt-auto pt-3",
                                                                    children: [
                                                                        {
                                                                            icon: d.jsx(Fs, { size: 18 }),
                                                                            href: u.github,
                                                                            label: "GitHub",
                                                                        },
                                                                        {
                                                                            icon: d.jsx($s, { size: 18 }),
                                                                            href: u.linkedinLink,
                                                                            label: "LinkedIn",
                                                                        },
                                                                        {
                                                                            icon: d.jsx(bs, { size: 18 }),
                                                                            href: u.email,
                                                                            label: "Email",
                                                                        },
                                                                        {
                                                                            icon: d.jsx(Bs, { size: 18 }),
                                                                            href: u.whatsappLink,
                                                                            label: "WhatsApp",
                                                                        },
                                                                        {
                                                                            icon: d.jsx(As, { size: 18 }),
                                                                            href: u.portfolio,
                                                                            label: "Portfolio",
                                                                        },
                                                                    ].map(
                                                                        (y, z) =>
                                                                            y.href &&
                                                                            d.jsx(
                                                                                "a",
                                                                                {
                                                                                    href: y.href,
                                                                                    target: "_blank",
                                                                                    rel: "noopener noreferrer",
                                                                                    className: `text-gray-300 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full ${u.isHead ? "hover:text-yellow-400 hover:bg-yellow-400/10" : ""}`,
                                                                                    title: y.label,
                                                                                    children: y.icon,
                                                                                },
                                                                                z,
                                                                            ),
                                                                    ),
                                                                }),
                                                            ],
                                                        }),
                                                    },
                                                    u.name,
                                                ),
                                            ),
                                        }),
                                        d.jsx("div", {
                                            className: "flex justify-center mt-6 space-x-2",
                                            children: [...Array(v)].map((u, c) =>
                                                d.jsx(
                                                    "button",
                                                    {
                                                        className: `w-2 h-2 rounded-full transition-all duration-300 ${a === c ? "bg-blue-500 w-4" : "bg-white/50 hover:bg-white/80"}`,
                                                        onClick: () => R(c),
                                                    },
                                                    c,
                                                ),
                                            ),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
    },
    Nm = () => {
        const [e, t] = E.useState([]),
            [n, r] = E.useState("all"),
            [i, l] = E.useState(!0),
            [o, a] = E.useState(null),
            s = [
                { id: "all", name: "All Tracks", icon: d.jsx(cu, {}) },
                { id: "Hardware", name: "Hardware", icon: d.jsx(Us, {}) },
                { id: "Vision", name: "Computer Vision", icon: d.jsx(Is, {}) },
                { id: "ROS & Raspberry", name: "ROS & Raspberry", icon: d.jsx(Ki, {}) },
                { id: "Embedded", name: "Embedded", icon: d.jsx(Ds, {}) },
            ],
            f = async () => {
                try {
                    const j = [
                        ...(
                            await (
                                await fetch(
                                    `https://docs.google.com/spreadsheets/d/1TB8vtdLAdZnwQVKNDhWueD0GG6znEPkVpa2N5VwXjeY/gviz/tq?tqx=out:csv&timestamp=${Date.now()}`,
                                )
                            ).text()
                        )
                            .split(
                                `
  `,
                            )
                            .slice(1)
                            .map((m) => {
                                const [k, P, R] = m
                                    .split(",")
                                    .map((u) => u.replace(/"/g, "").trim()),
                                    N =
                                        R === "ROS" || R === "Raspberry Pi"
                                            ? "ROS & Raspberry"
                                            : R;
                                return { name: k, score: Number(P), track: N };
                            })
                            .filter((m) => m.name && !isNaN(m.score)),
                    ].sort((m, k) => k.score - m.score),
                        p = j
                            .map((m, k) => ({ ...m, rank: k + 1 }))
                            .map((m) => {
                                const P =
                                    j
                                        .filter((R) => R.track === m.track)
                                        .findIndex((R) => R.name === m.name) + 1;
                                return { ...m, trackRank: P };
                            });
                    (t(p), l(!1), a(null));
                } catch {
                    (a("Failed to fetch data"), l(!1));
                }
            };
        E.useEffect(() => {
            f();
            const w = setInterval(f, 6e4);
            return () => clearInterval(w);
        }, []);
        const g = e.filter((w) => n === "all" || w.track === n),
            v = (w) => {
                switch (w) {
                    case 1:
                        return d.jsx(Sm, {
                            className: "w-6 h-6 text-yellow-400 animate-pulse-slow",
                        });
                    case 2:
                        return d.jsx(wm, {
                            className: "w-6 h-6 text-gray-400 animate-pulse-slow",
                        });
                    case 3:
                        return d.jsx(gm, {
                            className: "w-6 h-6 text-amber-600 animate-pulse-slow",
                        });
                    default:
                        return d.jsx("span", {
                            className: "w-6 h-6 text-white/50",
                            children: w,
                        });
                }
            },
            x = (w) => {
                switch (w) {
                    case 1:
                        return "bg-gradient-to-r from-yellow-500/20 to-transparent border-l-4 border-yellow-400";
                    case 2:
                        return "bg-gradient-to-r from-gray-500/20 to-transparent border-l-4 border-gray-400";
                    case 3:
                        return "bg-gradient-to-r from-amber-800/20 to-transparent border-l-4 border-amber-600";
                    default:
                        return "bg-white/5 hover:bg-white/10";
                }
            };
        return i
            ? d.jsx("div", {
                className: "min-h-[400px] flex items-center justify-center",
                children: d.jsx("div", {
                    className:
                        "animate-spin rounded-full h-12 w-12 border-b-2 border-white",
                }),
            })
            : o
                ? d.jsx("div", {
                    className:
                        "min-h-[400px] flex items-center justify-center text-red-400",
                    children: o,
                })
                : d.jsxs("section", {
                    className:
                        "py-20 bg-gradient-to-b from-indigo-900 to-blue-900 relative overflow-hidden",
                    children: [
                        d.jsx("div", {
                            className: "absolute inset-0 geometric-pattern opacity-20",
                        }),
                        d.jsx("div", {
                            className:
                                "absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/50",
                        }),
                        d.jsxs("div", {
                            className: "max-w-7xl mx-auto px-4 relative",
                            children: [
                                d.jsxs("div", {
                                    className: "text-center mb-12",
                                    children: [
                                        d.jsx("h2", {
                                            className:
                                                "text-4xl font-bold text-white mb-4 animate-fade-in",
                                            children: "Track Leaderboards",
                                        }),
                                        d.jsx("div", {
                                            className:
                                                "w-24 h-1 bg-blue-500 mx-auto rounded-full animate-glow",
                                        }),
                                    ],
                                }),
                                d.jsx("div", {
                                    className: "flex flex-wrap justify-center gap-4 mb-8",
                                    children: s.map((w) =>
                                        d.jsxs(
                                            "button",
                                            {
                                                onClick: () => r(w.id),
                                                className: `flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${n === w.id ? "bg-blue-500 text-white scale-105" : "bg-white/10 text-white/70 hover:bg-white/20"}`,
                                                children: [
                                                    d.jsx("span", {
                                                        className: "w-5 h-5",
                                                        children: w.icon,
                                                    }),
                                                    d.jsx("span", { children: w.name }),
                                                ],
                                            },
                                            w.id,
                                        ),
                                    ),
                                }),
                                d.jsx("div", {
                                    className:
                                        "bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl animate-fade-in",
                                    children: g.map((w, _) =>
                                        d.jsxs(
                                            "div",
                                            {
                                                className: `flex items-center justify-between p-4 border-b border-white/10 transition-all duration-300 ${x(n === "all" ? w.rank : w.trackRank)}`,
                                                children: [
                                                    d.jsxs("div", {
                                                        className: "flex items-center space-x-4",
                                                        children: [
                                                            d.jsx("div", {
                                                                className: "w-8 flex justify-center",
                                                                children: v(
                                                                    n === "all" ? w.rank : w.trackRank,
                                                                ),
                                                            }),
                                                            d.jsxs("div", {
                                                                children: [
                                                                    d.jsx("span", {
                                                                        className: "text-white font-medium block",
                                                                        children: w.name,
                                                                    }),
                                                                    d.jsx("span", {
                                                                        className: "text-blue-300 text-sm",
                                                                        children: w.track,
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                    d.jsxs("div", {
                                                        className: "flex items-center space-x-3",
                                                        children: [
                                                            d.jsx("div", {
                                                                className:
                                                                    "text-2xl font-bold text-blue-400 power-pulse",
                                                                children: w.score.toLocaleString(),
                                                            }),
                                                            d.jsx(cu, {
                                                                className:
                                                                    "w-5 h-5 text-yellow-400 animate-pulse",
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            },
                                            `${w.name}-${w.track}-${_}`,
                                        ),
                                    ),
                                }),
                            ],
                        }),
                    ],
                });
    },
    Lm = () => {
        const e = E.useRef(null),
            [t, n] = E.useState(!1),
            [r, i] = E.useState(0),
            [l, o] = E.useState(0),
            [a, s] = E.useState(0),
            [f, g] = E.useState(!1),
            [v, x] = E.useState(0),
            [w, _] = E.useState([]),
            [C, j] = E.useState(!0),
            [h, p] = E.useState(null);
        (E.useEffect(() => {
            (async () => {
                try {
                    const y = (await Ws()).filter((z) => z.as === "Assistant");
                    (_(y), j(!1));
                } catch {
                    (p("Failed to load assistant members"), j(!1));
                }
            })();
        }, []),
            E.useEffect(() => {
                const u = new IntersectionObserver(
                    ([c]) => {
                        g(c.isIntersecting);
                    },
                    { threshold: 0.1 },
                );
                if (e.current) {
                    u.observe(e.current);
                    const c = () => {
                        const y = e.current.offsetWidth;
                        x(Math.ceil(w.length / (y >= 768 ? 3 : 1)));
                    };
                    return (
                        c(),
                        window.addEventListener("resize", c),
                        () => {
                            (u.disconnect(), window.removeEventListener("resize", c));
                        }
                    );
                }
            }, [w.length]));
        const m = (u) => {
            (n(!0), i(u.pageX - e.current.offsetLeft), o(e.current.scrollLeft));
        },
            k = () => {
                n(!1);
            },
            P = (u) => {
                if (!t) return;
                u.preventDefault();
                const y = (u.pageX - e.current.offsetLeft - r) * 2;
                e.current.scrollLeft = l - y;
            },
            R = (u) => {
                const c = e.current,
                    y = c.offsetWidth;
                ((c.scrollLeft = y * u), s(u));
            },
            N = () => {
                const u = e.current,
                    c = Math.round(u.scrollLeft / u.offsetWidth);
                s(c);
            };
        return C
            ? d.jsx("div", {
                className:
                    "min-h-[400px] flex items-center justify-center bg-gradient-to-b from-indigo-900 to-blue-900",
                children: d.jsx("div", {
                    className:
                        "animate-spin rounded-full h-12 w-12 border-b-2 border-white",
                }),
            })
            : h
                ? d.jsx("div", {
                    className:
                        "min-h-[400px] flex items-center justify-center bg-gradient-to-b from-indigo-900 to-blue-900 text-red-400",
                    children: h,
                })
                : d.jsxs("section", {
                    className:
                        "py-20 bg-gradient-to-b from-indigo-900 to-blue-900 overflow-hidden relative",
                    children: [
                        d.jsx("div", {
                            className: "absolute inset-0 geometric-pattern opacity-20",
                        }),
                        d.jsx("div", {
                            className:
                                "absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/50",
                        }),
                        d.jsxs("div", {
                            className: "max-w-7xl mx-auto px-4 relative",
                            children: [
                                d.jsxs("div", {
                                    className: "text-center mb-12",
                                    children: [
                                        d.jsx("h2", {
                                            className: `text-5xl font-bold text-white mb-4 ${f ? "animate-fade-in" : "opacity-0"}`,
                                            children: "Our Assistant Team",
                                        }),
                                        d.jsx("div", {
                                            className: `w-24 h-1 bg-blue-500 mx-auto rounded-full animate-glow ${f ? "animate-fade-in" : "opacity-0"}`,
                                            style: { animationDelay: "0.3s" },
                                        }),
                                    ],
                                }),
                                d.jsxs("div", {
                                    className: "relative group",
                                    children: [
                                        d.jsx("button", {
                                            onClick: () => R(Math.max(0, a - 1)),
                                            className:
                                                "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                            children: d.jsx(Ms, { size: 24 }),
                                        }),
                                        d.jsx("button", {
                                            onClick: () => R(Math.min(v - 1, a + 1)),
                                            className:
                                                "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                            children: d.jsx(dl, { size: 24 }),
                                        }),
                                        d.jsx("div", {
                                            ref: e,
                                            className:
                                                "flex overflow-x-auto snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing",
                                            onMouseDown: m,
                                            onMouseUp: k,
                                            onMouseLeave: k,
                                            onMouseMove: P,
                                            onScroll: N,
                                            style: {
                                                scrollBehavior: "smooth",
                                                WebkitOverflowScrolling: "touch",
                                            },
                                            children: w.map((u, c) =>
                                                d.jsx(
                                                    "div",
                                                    {
                                                        className:
                                                            "flex-none w-full md:w-[calc(100%/3)] snap-center px-4",
                                                        children: d.jsxs("div", {
                                                            className: `bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center h-full border border-white/10 hover:border-indigo-400/50 transition-all duration-500 ${f ? "animate-fade-in" : "opacity-0"}`,
                                                            style: { animationDelay: `${c * 0.2}s` },
                                                            children: [
                                                                d.jsxs("div", {
                                                                    className: "relative inline-block mb-6",
                                                                    children: [
                                                                        d.jsx("div", {
                                                                            className:
                                                                                "absolute inset-0 bg-indigo-500 rounded-full animate-pulse-slow opacity-20",
                                                                        }),
                                                                        d.jsx("img", {
                                                                            src: u.imageLink,
                                                                            alt: u.name,
                                                                            className:
                                                                                "w-32 h-32 rounded-full relative z-10 animate-float border-4 border-white/20 hover:border-indigo-400 transition-colors duration-300 object-cover",
                                                                        }),
                                                                        d.jsx("div", {
                                                                            className:
                                                                                "absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-rotate opacity-20",
                                                                        }),
                                                                    ],
                                                                }),
                                                                d.jsx("h3", {
                                                                    className:
                                                                        "text-xl font-semibold text-white mb-2",
                                                                    children: u.name,
                                                                }),
                                                                d.jsx("p", {
                                                                    className: "text-indigo-200 mb-3 shimmer",
                                                                    children: u.role,
                                                                }),
                                                                d.jsx("p", {
                                                                    className: "text-gray-300 mb-6",
                                                                    children: u.about,
                                                                }),
                                                                d.jsx("div", {
                                                                    className: "flex justify-center space-x-4",
                                                                    children: [
                                                                        {
                                                                            icon: d.jsx(Fs, { size: 20 }),
                                                                            href: u.github,
                                                                            label: "GitHub",
                                                                        },
                                                                        {
                                                                            icon: d.jsx($s, { size: 20 }),
                                                                            href: u.linkedinLink,
                                                                            label: "LinkedIn",
                                                                        },
                                                                        {
                                                                            icon: d.jsx(bs, { size: 20 }),
                                                                            href: u.email,
                                                                            label: "Email",
                                                                        },
                                                                        {
                                                                            icon: d.jsx(Bs, { size: 20 }),
                                                                            href: u.whatsappLink,
                                                                            label: "WhatsApp",
                                                                        },
                                                                        {
                                                                            icon: d.jsx(As, { size: 20 }),
                                                                            href: u.portfolio,
                                                                            label: "Portfolio",
                                                                        },
                                                                    ].map(
                                                                        (y, z) =>
                                                                            y.href &&
                                                                            d.jsx(
                                                                                "a",
                                                                                {
                                                                                    href: y.href,
                                                                                    target: "_blank",
                                                                                    rel: "noopener noreferrer",
                                                                                    className:
                                                                                        "text-gray-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full",
                                                                                    title: y.label,
                                                                                    children: y.icon,
                                                                                },
                                                                                z,
                                                                            ),
                                                                    ),
                                                                }),
                                                            ],
                                                        }),
                                                    },
                                                    u.name,
                                                ),
                                            ),
                                        }),
                                        d.jsx("div", {
                                            className: "flex justify-center mt-8 space-x-2",
                                            children: [...Array(v)].map((u, c) =>
                                                d.jsx(
                                                    "button",
                                                    {
                                                        className: `w-3 h-3 rounded-full transition-all duration-300 ${a === c ? "bg-indigo-500 w-6" : "bg-white/50 hover:bg-white/80"}`,
                                                        onClick: () => R(c),
                                                    },
                                                    c,
                                                ),
                                            ),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
    },
    Rm = () => {
        const e = E.useRef(null),
            [t, n] = E.useState(!1),
            [r, i] = E.useState(0),
            [l, o] = E.useState(0),
            [a, s] = E.useState(0),
            [f, g] = E.useState(!1),
            [v, x] = E.useState([]),
            [w, _] = E.useState(!0),
            [C, j] = E.useState(null),
            [h, p] = E.useState(0);
        (E.useEffect(() => {
            (async () => {
                try {
                    const y = (await Ws()).filter((z) => z.as === "HR");
                    (x(y), _(!1));
                } catch {
                    (j("Failed to load HR members"), _(!1));
                }
            })();
        }, []),
            E.useEffect(() => {
                const u = new IntersectionObserver(
                    ([c]) => {
                        g(c.isIntersecting);
                    },
                    { threshold: 0.1 },
                );
                if (e.current) {
                    u.observe(e.current);
                    const c = () => {
                        const y = e.current.offsetWidth;
                        p(Math.ceil(v.length / (y >= 768 ? 3 : 1)));
                    };
                    return (
                        c(),
                        window.addEventListener("resize", c),
                        () => {
                            (u.disconnect(), window.removeEventListener("resize", c));
                        }
                    );
                }
            }, [v.length]));
        const m = (u) => {
            (n(!0), i(u.pageX - e.current.offsetLeft), o(e.current.scrollLeft));
        },
            k = () => {
                n(!1);
            },
            P = (u) => {
                if (!t) return;
                u.preventDefault();
                const y = (u.pageX - e.current.offsetLeft - r) * 2;
                e.current.scrollLeft = l - y;
            },
            R = (u) => {
                const c = e.current,
                    y = c.offsetWidth;
                ((c.scrollLeft = y * u), s(u));
            },
            N = () => {
                const u = e.current,
                    c = Math.round(u.scrollLeft / u.offsetWidth);
                s(c);
            };
        return w
            ? d.jsx("div", {
                className:
                    "min-h-[400px] flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900",
                children: d.jsx("div", {
                    className:
                        "animate-spin rounded-full h-12 w-12 border-b-2 border-white",
                }),
            })
            : C
                ? d.jsx("div", {
                    className:
                        "min-h-[400px] flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900 text-red-400",
                    children: C,
                })
                : d.jsxs("section", {
                    className:
                        "py-20 bg-gradient-to-b from-blue-900 to-purple-900 overflow-hidden relative",
                    children: [
                        d.jsx("div", {
                            className: "absolute inset-0 geometric-pattern opacity-20",
                        }),
                        d.jsx("div", {
                            className:
                                "absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/50",
                        }),
                        d.jsxs("div", {
                            className: "max-w-7xl mx-auto px-4 relative",
                            children: [
                                d.jsxs("div", {
                                    className: "text-center mb-12",
                                    children: [
                                        d.jsx("h2", {
                                            className: `text-5xl font-bold text-white mb-4 ${f ? "animate-fade-in" : "opacity-0"}`,
                                            children: "Our HR Team",
                                        }),
                                        d.jsx("div", {
                                            className: `w-24 h-1 bg-purple-500 mx-auto rounded-full animate-glow ${f ? "animate-fade-in" : "opacity-0"}`,
                                            style: { animationDelay: "0.3s" },
                                        }),
                                    ],
                                }),
                                d.jsxs("div", {
                                    className: "relative group",
                                    children: [
                                        d.jsx("button", {
                                            onClick: () => R(Math.max(0, a - 1)),
                                            className:
                                                "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                            children: d.jsx(Ms, { size: 24 }),
                                        }),
                                        d.jsx("button", {
                                            onClick: () => R(Math.min(h - 1, a + 1)),
                                            className:
                                                "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                            children: d.jsx(dl, { size: 24 }),
                                        }),
                                        d.jsx("div", {
                                            ref: e,
                                            className:
                                                "flex overflow-x-auto snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing",
                                            onMouseDown: m,
                                            onMouseUp: k,
                                            onMouseLeave: k,
                                            onMouseMove: P,
                                            onScroll: N,
                                            style: {
                                                scrollBehavior: "smooth",
                                                WebkitOverflowScrolling: "touch",
                                            },
                                            children: v.map((u, c) =>
                                                d.jsx(
                                                    "div",
                                                    {
                                                        className:
                                                            "flex-none w-full md:w-[calc(100%/3)] snap-center px-4",
                                                        children: d.jsxs("div", {
                                                            className: `bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center h-full border border-white/10 hover:border-purple-400/50 transition-all duration-500 ${f ? "animate-fade-in" : "opacity-0"}`,
                                                            style: { animationDelay: `${c * 0.2}s` },
                                                            children: [
                                                                d.jsxs("div", {
                                                                    className: "relative inline-block mb-6",
                                                                    children: [
                                                                        d.jsx("div", {
                                                                            className:
                                                                                "absolute inset-0 bg-purple-500 rounded-full animate-pulse-slow opacity-20",
                                                                        }),
                                                                        d.jsx("img", {
                                                                            src: u.imageLink,
                                                                            alt: u.name,
                                                                            className:
                                                                                "w-32 h-32 rounded-full relative z-10 animate-float border-4 border-white/20 hover:border-purple-400 transition-colors duration-300 object-cover",
                                                                        }),
                                                                        d.jsx("div", {
                                                                            className:
                                                                                "absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-rotate opacity-20",
                                                                        }),
                                                                    ],
                                                                }),
                                                                d.jsx("h3", {
                                                                    className:
                                                                        "text-xl font-semibold text-white mb-2",
                                                                    children: u.name,
                                                                }),
                                                                d.jsx("p", {
                                                                    className: "text-purple-200 mb-3 shimmer",
                                                                    children: u.role,
                                                                }),
                                                                d.jsx("p", {
                                                                    className: "text-gray-300 mb-6",
                                                                    children: u.about,
                                                                }),
                                                                d.jsx("div", {
                                                                    className: "flex justify-center space-x-4",
                                                                    children: [
                                                                        {
                                                                            icon: d.jsx(Fs, { size: 20 }),
                                                                            href: u.github,
                                                                            label: "GitHub",
                                                                        },
                                                                        {
                                                                            icon: d.jsx($s, { size: 20 }),
                                                                            href: u.linkedinLink,
                                                                            label: "LinkedIn",
                                                                        },
                                                                        {
                                                                            icon: d.jsx(bs, { size: 20 }),
                                                                            href: u.email,
                                                                            label: "Email",
                                                                        },
                                                                        {
                                                                            icon: d.jsx(Bs, { size: 20 }),
                                                                            href: u.whatsappLink,
                                                                            label: "WhatsApp",
                                                                        },
                                                                        {
                                                                            icon: d.jsx(As, { size: 20 }),
                                                                            href: u.portfolio,
                                                                            label: "Portfolio",
                                                                        },
                                                                    ].map(
                                                                        (y, z) =>
                                                                            y.href &&
                                                                            d.jsx(
                                                                                "a",
                                                                                {
                                                                                    href: y.href,
                                                                                    target: "_blank",
                                                                                    rel: "noopener noreferrer",
                                                                                    className:
                                                                                        "text-gray-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full",
                                                                                    title: y.label,
                                                                                    children: y.icon,
                                                                                },
                                                                                `${u.name}-${y.label}-${z}`,
                                                                            ),
                                                                    ),
                                                                }),
                                                            ],
                                                        }),
                                                    },
                                                    `${u.name}-${c}`,
                                                ),
                                            ),
                                        }),
                                        d.jsx("div", {
                                            className: "flex justify-center mt-8 space-x-2",
                                            children: [...Array(h)].map((u, c) =>
                                                d.jsx(
                                                    "button",
                                                    {
                                                        className: `w-3 h-3 rounded-full transition-all duration-300 ${a === c ? "bg-purple-500 w-6" : "bg-white/50 hover:bg-white/80"}`,
                                                        onClick: () => R(c),
                                                    },
                                                    `slide-dot-${c}`,
                                                ),
                                            ),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
    },
    Pm = () =>
        d.jsxs("div", {
            className: "min-h-screen",
            children: [
                d.jsx("div", {
                    className: "hero-pattern",
                    children: d.jsxs("div", {
                        className: "relative max-w-7xl mx-auto px-4 py-20",
                        children: [
                            d.jsxs("div", {
                                className: "text-center mb-16",
                                children: [
                                    d.jsx("h1", {
                                        className:
                                            "text-6xl font-bold text-white mb-6 animate-fade-in",
                                        children: "Welcome to Assiut Robotics",
                                    }),
                                    d.jsx("p", {
                                        className:
                                            "text-3xl text-blue-200 font-light animate-fade-in",
                                        style: { animationDelay: "0.3s" },
                                        children: "Learn How To Learn",
                                    }),
                                ],
                            }),
                            d.jsx("div", {
                                className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16",
                                children: [
                                    {
                                        title: "Hardware",
                                        description:
                                            "Learn about electronic components and circuit design",
                                        link: "/hardware",
                                        icon: d.jsx(Us, { className: "w-8 h-8 mb-4 text-red-600" }),
                                        borderColor: "border-red-200",
                                    },
                                    {
                                        title: "Embedded Systems",
                                        description:
                                            "Master microcontroller programming and interfacing",
                                        link: "/embedded",
                                        icon: d.jsx(Ds, {
                                            className: "w-8 h-8 mb-4 text-blue-600",
                                        }),
                                        borderColor: "border-blue-200",
                                    },
                                    {
                                        title: "ROS & Raspberry",
                                        description:
                                            "Explore Robot Operating System and Raspberry Pi development",
                                        link: "/ros",
                                        icon: d.jsx(Ki, {
                                            className: "w-8 h-8 mb-4 text-green-600",
                                        }),
                                        borderColor: "border-green-200",
                                    },
                                    {
                                        title: "Computer Vision",
                                        description: "Learn image processing and object detection",
                                        link: "/computer-vision",
                                        icon: d.jsx(Is, {
                                            className: "w-8 h-8 mb-4 text-yellow-600",
                                        }),
                                        borderColor: "border-yellow-200",
                                    },
                                ].map((e, t) =>
                                    d.jsx(
                                        zm,
                                        { ...e, style: { animationDelay: `${t * 0.2}s` } },
                                        e.title,
                                    ),
                                ),
                            }),
                        ],
                    }),
                }),
                d.jsx(Nm, {}),
                d.jsx(jm, {}),
                d.jsx(Lm, {}),
                d.jsx(Rm, {}),
            ],
        }),
    zm = ({
        title: e,
        description: t,
        link: n,
        icon: r,
        borderColor: i,
        style: l,
    }) =>
        d.jsx(Os, {
            to: n,
            className: `bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${i} track-card animate-fade-in`,
            style: l,
            children: d.jsxs("div", {
                className: "text-center",
                children: [
                    r,
                    d.jsx("h3", {
                        className: "text-xl font-semibold text-gray-800 mb-3",
                        children: e,
                    }),
                    d.jsx("p", { className: "text-gray-600", children: t }),
                ],
            }),
        }),
    fl = ({ title: e, description: t, tasks: n }) => {
        const r = Ts(),
            i = () => {
                const o = e.toLowerCase();
                return o.includes("hardware")
                    ? "hardware-bg"
                    : o.includes("embedded")
                        ? "embedded-bg"
                        : o.includes("ros")
                            ? "ros-bg"
                            : o.includes("raspberry")
                                ? "raspberry-bg"
                                : o.includes("computer vision")
                                    ? "cv-bg"
                                    : "";
            },
            l = (o) => {
                const a = window.location.pathname;
                r(`${a}/${o.title.toLowerCase().replace(/\s+/g, "-")}`, {
                    state: { subject: o },
                });
            };
        return d.jsxs("div", {
            className: `min-h-screen ${i()} relative circuit-pattern`,
            children: [
                d.jsx("div", { className: "absolute inset-0 bg-black/50" }),
                d.jsxs("div", {
                    className: "absolute inset-0 pointer-events-none overflow-hidden",
                    children: [
                        d.jsx("div", {
                            className: "voltage-line absolute left-1/4 h-full",
                        }),
                        d.jsx("div", {
                            className: "voltage-line absolute left-2/4 h-full",
                            style: { animationDelay: "0.5s" },
                        }),
                        d.jsx("div", {
                            className: "voltage-line absolute left-3/4 h-full",
                            style: { animationDelay: "1s" },
                        }),
                    ],
                }),
                d.jsxs("div", {
                    className: "relative max-w-7xl mx-auto px-4 py-16",
                    children: [
                        d.jsx("div", {
                            className: "text-center mb-16 animate-fade-in",
                            children: d.jsxs("div", {
                                className:
                                    "electric-border inline-block p-8 rounded-2xl bg-black/30 backdrop-blur-sm",
                                children: [
                                    d.jsx("h1", {
                                        className: "text-5xl font-bold text-white mb-6 power-pulse",
                                        children: e,
                                    }),
                                    d.jsx("p", {
                                        className: "text-xl text-blue-200 max-w-2xl mx-auto",
                                        children: t,
                                    }),
                                ],
                            }),
                        }),
                        d.jsx("div", {
                            className: "grid md:grid-cols-2 lg:grid-cols-3 gap-10",
                            children:
                                Array.isArray(n) &&
                                n.map((o, a) =>
                                    d.jsx(
                                        "div",
                                        {
                                            onClick: () => l(o),
                                            className:
                                                "electric-border content-overlay p-8 rounded-xl shadow-lg transition-all duration-500 animate-slide-in cursor-pointer card-hover backdrop-blur-sm",
                                            style: { animationDelay: `${a * 0.2}s` },
                                            children: d.jsxs("div", {
                                                className: "relative z-10",
                                                children: [
                                                    d.jsxs("h3", {
                                                        className:
                                                            "text-2xl font-semibold text-white mb-4 flex items-center justify-between",
                                                        children: [
                                                            o.title,
                                                            d.jsx(dl, { className: "w-6 h-6 text-blue-400" }),
                                                        ],
                                                    }),
                                                    d.jsx("p", {
                                                        className: "text-blue-200 mb-6 text-lg",
                                                        children: o.description,
                                                    }),
                                                    d.jsx("div", {
                                                        className: "absolute bottom-4 right-4",
                                                        children: d.jsx("div", {
                                                            className:
                                                                "text-blue-300 text-sm font-medium power-pulse",
                                                            children: "Click to view tasks",
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        },
                                        o.id || a,
                                    ),
                                ),
                        }),
                    ],
                }),
            ],
        });
    },
    Tm = () => {
        const e = [
            {
                id: 1,
                title: "Circuits",
                description:
                    "Learn circuit analysis, components, and design principles",
                link: "https://forms.gle/hardware-circuits",
            },
            {
                id: 2,
                title: "PCB Design",
                description:
                    "Learn PCB design principles, schematic capture, and board layout techniques",
                link: "https://forms.gle/hardware-pcb",
            },
            {
                id: 3,
                title: "Electronics",
                description:
                    "Master electronic components, circuit analysis, and troubleshooting",
                link: "https://forms.gle/hardware-electronics",
            },
            {
                id: 4,
                title: "Devices",
                description:
                    "Work with various electronic devices, sensors, and integration techniques",
                link: "https://forms.gle/hardware-devices",
            },
            {
                id: 5,
                title: "Digital Electronics",
                description:
                    "Study digital logic design, sequential circuits, and digital systems",
                link: "https://forms.gle/hardware-digital-electronics",
            },
            {
                id: 6,
                title: "Final Project",
                description:
                    "Design and build a complete hardware project incorporating all learned concepts",
                link: "https://forms.gle/hardware-final",
            },
        ];
        return d.jsx(fl, {
            title: "Hardware Track",
            description:
                "Master hardware design through comprehensive training in PCB design, electronics, and digital systems",
            tasks: e,
        });
    },
    Om = () => {
        const e = [
            {
                id: 1,
                title: "Circuits",
                description:
                    "Learn circuit analysis, components, and design principles",
                link: "https://forms.gle/embedded-circuits",
            },
            {
                id: 2,
                title: "C Programming",
                description:
                    "Learn C programming fundamentals, pointers, memory management, and embedded concepts",
                link: "https://forms.gle/embedded-c",
            },
            {
                id: 3,
                title: "Electronics",
                description:
                    "Study electronic components, circuit analysis, and basic electronics principles",
                link: "https://forms.gle/embedded-electronics",
            },
            {
                id: 4,
                title: "Arduino",
                description:
                    "Master Arduino programming, sensors, actuators, and real-time applications",
                link: "https://forms.gle/embedded-arduino",
            },
            {
                id: 5,
                title: "Embedded System (AVR)",
                description:
                    "Learn AVR microcontroller programming, peripherals, and bare-metal development",
                link: "https://forms.gle/embedded-avr",
            },
            {
                id: 6,
                title: "Devices",
                description:
                    "Work with various electronic devices, sensors, and communication protocols",
                link: "https://forms.gle/embedded-devices",
            },
            {
                id: 7,
                title: "Digital Electronics",
                description:
                    "Learn digital logic, combinational and sequential circuits",
                link: "https://forms.gle/embedded-digital-electronics",
            },
            {
                id: 8,
                title: "Final Project",
                description:
                    "Develop a complete embedded system project integrating all learned concepts",
                link: "https://forms.gle/embedded-final",
            },
        ];
        return d.jsx(fl, {
            title: "Embedded Systems Track",
            description:
                "Master embedded systems development through comprehensive training in C programming, electronics, and microcontroller applications",
            tasks: e,
        });
    },
    Mm = () => {
        const e = [
            {
                id: "python",
                title: "Python Programming",
                description:
                    "Learn Python programming for robotics and ROS applications",
            },
            {
                id: "ros2",
                title: "ROS2",
                description:
                    "Learn ROS2 fundamentals, nodes, topics, services, and navigation",
            },
            {
                id: "raspberry",
                title: "Raspberry",
                description:
                    "Master Raspberry Pi setup, GPIO programming, and robotics integration",
            },
            {
                id: "final",
                title: "Final Project",
                description:
                    "Build a complete robotics project using ROS2 and Raspberry Pi",
            },
        ];
        return d.jsx(fl, {
            title: "ROS & Raspberry Track",
            description:
                "Master robotics development through ROS2, Raspberry Pi, and Python programming",
            tasks: e,
        });
    },
    Dm = () => {
        const e = [
            {
                id: 1,
                title: "Linux Commands",
                description:
                    "Learn essential Linux commands, file system navigation, and basic shell scripting",
                link: "https://forms.google.com/cv-linux",
            },
            {
                id: 2,
                title: "Python Programming",
                description:
                    "Master Python fundamentals, data structures, and libraries for computer vision",
                link: "https://forms.google.com/cv-python",
            },
            {
                id: 3,
                title: "Electronics",
                description:
                    "Study electronic components, circuit analysis, and hardware fundamentals for vision systems",
                link: "https://forms.google.com/cv-electronics",
            },
            {
                id: 4,
                title: "Devices",
                description:
                    "Work with cameras, sensors, and various electronic devices for computer vision applications",
                link: "https://forms.google.com/cv-devices",
            },
            {
                id: 5,
                title: "Raspberry",
                description:
                    "Master Raspberry Pi setup, camera integration, and edge computing for computer vision",
                link: "https://forms.google.com/cv-raspberry",
            },
            {
                id: 6,
                title: "Computer Vision",
                description:
                    "Learn image processing, feature detection, object recognition, and deep learning for computer vision",
                link: "https://forms.google.com/cv-vision",
            },
            {
                id: 7,
                title: "Final Project",
                description:
                    "Build a complete computer vision application integrating all learned concepts",
                link: "https://forms.google.com/cv-final",
            },
        ];
        return d.jsx(fl, {
            title: "Computer Vision Track",
            description:
                "Master Linux, Python programming, electronics, and computer vision techniques through hands-on projects",
            tasks: e,
        });
    },
    ai = () => {
        const e = Wr(),
            t = Ts(),
            { subject: n } = e.state || {},
            [r, i] = E.useState({}),
            [l, o] = E.useState(!0),
            [a, s] = E.useState(null),
            [f, g] = E.useState(""),
            v =
                "https://docs.google.com/forms/d/e/1FAIpQLSczLC-jlXYHihR6eJEBAf-I3T5DD6clXWo9SaCYbmbxxppavQ/viewform?usp=header";
        E.useEffect(() => {
            (async () => {
                try {
                    const m = (
                        await (
                            await fetch(
                                `https://docs.google.com/spreadsheets/d/1vdrkNXx97kJ8FOeXobKEty2P5iRlStifb00Y4qMsWCs/gviz/tq?tqx=out:csv&timestamp=${Date.now()}`,
                            )
                        ).text()
                    )
                        .split(
                            `
  `,
                        )
                        .slice(1)
                        .map((u) => {
                            const [c, y, z, M] = u
                                .split(",")
                                .map((he) => he.replace(/"/g, "").trim()),
                                $ = M ? new Date(M) : null,
                                b = $ ? $ < new Date() : !1;
                            return {
                                subject: c,
                                taskNumber: Number(y),
                                link: z,
                                ...(M ? { deadline: M, isOverdue: b } : {}),
                            };
                        }),
                        k = {
                            "python programming": [
                                "python programming",
                                "python",
                                "python lang",
                                "python language",
                            ],
                            "c programming": ["c programming", "c lang", "c language"],
                            electronics: ["electronics", "electronic"],
                            "digital electronics": ["digital electronics", "digital"],
                            "pcb design": ["pcb design", "pcb"],
                            arduino: ["arduino", "arduino programming"],
                            "embedded system (avr)": [
                                "embedded system (avr)",
                                "avr",
                                "embedded avr",
                            ],
                            devices: ["devices", "hardware devices"],
                            "computer vision": ["computer vision", "vision", "cv"],
                            ros2: ["ros2", "ros", "robot operating system"],
                            raspberry: ["raspberry", "raspberry pi", "raspi"],
                            hardware: ["hardware", "electronics hardware"],
                            "linux commands": ["linux commands", "linux", "bash"],
                            circuits: ["circuits", "circuit"],
                        },
                        P = (u) => {
                            const c = u.toLowerCase().trim();
                            for (const [y, z] of Object.entries(k))
                                if (z.includes(c)) return y;
                            return c;
                        },
                        R = m.reduce((u, c) => {
                            const y = P(c.subject);
                            return (
                                u[y] || (u[y] = []),
                                u[y].find((M) => M.taskNumber === c.taskNumber) ||
                                u[y].push({
                                    taskNumber: c.taskNumber,
                                    link: c.link,
                                    ...(c.deadline
                                        ? { deadline: c.deadline, isOverdue: c.isOverdue }
                                        : {}),
                                }),
                                u
                            );
                        }, {});
                    Object.keys(R).forEach((u) => {
                        R[u].sort((c, y) => c.taskNumber - y.taskNumber);
                    });
                    const N = `Available subjects: ${Object.keys(R).join(", ")}`;
                    (g(N), i(R), o(!1));
                } catch (h) {
                    (console.error("Error fetching tasks:", h),
                        s("Failed to fetch tasks"),
                        o(!1));
                }
            })();
        }, []);
        const x = (j) => {
            const h = new Date(j);
            return new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }).format(h);
        },
            w = (j) => {
                const h = new Date(),
                    m = new Date(j).getTime() - h.getTime();
                if (m < 0) return "Overdue";
                const k = Math.floor(m / (1e3 * 60 * 60 * 24)),
                    P = Math.floor((m % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60));
                return k > 0
                    ? `${k} days left`
                    : P > 0
                        ? `${P} hours left`
                        : "Less than an hour left";
            };
        if (!n) return null;
        if (l)
            return d.jsx("div", {
                className:
                    "min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 flex items-center justify-center",
                children: d.jsx("div", {
                    className:
                        "animate-spin rounded-full h-12 w-12 border-b-2 border-white",
                }),
            });
        if (a)
            return d.jsx("div", {
                className:
                    "min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 flex items-center justify-center text-red-400",
                children: a,
            });
        const _ = n.title.toLowerCase().trim(),
            C = r[_] || [];
        return d.jsx("div", {
            className:
                "min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 py-16 px-4 animate-fade-in",
            children: d.jsxs("div", {
                className: "max-w-4xl mx-auto",
                children: [
                    d.jsxs("button", {
                        onClick: () => t(-1),
                        className:
                            "flex items-center space-x-2 text-white mb-8 hover:text-blue-300 transition-colors",
                        children: [
                            d.jsx(vm, { className: "w-5 h-5" }),
                            d.jsx("span", { children: "Back to Track" }),
                        ],
                    }),
                    d.jsxs("div", {
                        className:
                            "bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 animate-slide-in",
                        style: { animationDelay: "0.2s" },
                        children: [
                            d.jsx("h1", {
                                className: "text-4xl font-bold text-white mb-4",
                                children: n.title,
                            }),
                            d.jsx("p", {
                                className: "text-blue-200 text-lg",
                                children: n.description,
                            }),
                            d.jsx("p", {
                                className: "text-xs text-gray-400 mt-4",
                                children: f,
                            }),
                        ],
                    }),
                    d.jsx("div", {
                        className: "space-y-6",
                        children:
                            C.length > 0
                                ? C.map((j, h) =>
                                    d.jsxs(
                                        "div",
                                        {
                                            onClick: () => window.open(j.link, "_blank"),
                                            className: `bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 animate-slide-in cursor-pointer group ${j.deadline && j.isOverdue ? "border-red-400/50 hover:border-red-400" : "border-white/10 hover:border-blue-400/50"}`,
                                            style: { animationDelay: `${(h + 2) * 0.2}s` },
                                            children: [
                                                d.jsxs("div", {
                                                    className: "flex justify-between items-start mb-4",
                                                    children: [
                                                        d.jsxs("div", {
                                                            children: [
                                                                d.jsxs("h3", {
                                                                    className:
                                                                        "text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors",
                                                                    children: ["Task ", j.taskNumber],
                                                                }),
                                                                d.jsx("p", {
                                                                    className: "text-blue-200",
                                                                    children:
                                                                        "Complete the task requirements and submit your solution",
                                                                }),
                                                                j.deadline &&
                                                                d.jsxs("div", {
                                                                    className:
                                                                        "flex items-center mt-3 space-x-2",
                                                                    children: [
                                                                        d.jsx(ym, {
                                                                            size: 16,
                                                                            className: j.isOverdue
                                                                                ? "text-red-400"
                                                                                : "text-blue-400",
                                                                        }),
                                                                        d.jsx("span", {
                                                                            className: `text-sm ${j.isOverdue ? "text-red-400" : "text-blue-400"}`,
                                                                            children: x(j.deadline),
                                                                        }),
                                                                        d.jsx("span", {
                                                                            className: `text-sm px-2 py-0.5 rounded-full ${j.isOverdue ? "bg-red-500/20 text-red-300" : "bg-blue-500/20 text-blue-300"}`,
                                                                            children: w(j.deadline),
                                                                        }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                        d.jsxs("span", {
                                                            className:
                                                                "px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300",
                                                            children: ["Task ", j.taskNumber],
                                                        }),
                                                    ],
                                                }),
                                                d.jsxs("div", {
                                                    className: "flex justify-between items-center mt-6",
                                                    children: [
                                                        d.jsx("div", {
                                                            className: "text-sm text-blue-200",
                                                            children: "Click to view task details",
                                                        }),
                                                        d.jsxs("a", {
                                                            href: v,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className:
                                                                "inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300",
                                                            onClick: (p) => p.stopPropagation(),
                                                            children: [
                                                                d.jsx(km, {
                                                                    size: 18,
                                                                    className: "animate-pulse-slow",
                                                                }),
                                                                d.jsx("span", {
                                                                    children: "Submit Solution",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        },
                                        j.taskNumber,
                                    ),
                                )
                                : d.jsx("div", {
                                    className: "text-center text-white py-8",
                                    children: "No tasks available for this subject yet.",
                                }),
                    }),
                ],
            }),
        });
    },
    Im = () =>
        d.jsx("footer", {
            className:
                "bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12",
            children: d.jsx("div", {
                className: "max-w-7xl mx-auto px-4",
                children: d.jsxs("div", {
                    className: "text-center",
                    children: [
                        d.jsxs("p", {
                            className: "text-lg mb-2",
                            children: [
                                "Made by",
                                " ",
                                d.jsx("span", {
                                    className: "font-semibold",
                                    children: "Eng. Ramadan Mohamed",
                                }),
                            ],
                        }),
                        d.jsxs("p", {
                            className: "text-blue-200",
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Assiut Robotics - AC Electrical Committee",
                            ],
                        }),
                    ],
                }),
            }),
        });
function Fm() {
    return d.jsx(cm, {
        children: d.jsxs("div", {
            className: "min-h-screen bg-gray-50 page-enter",
            children: [
                d.jsx(Em, {}),
                d.jsxs(rm, {
                    children: [
                        d.jsx(dt, { path: "/", element: d.jsx(Pm, {}) }),
                        d.jsx(dt, { path: "/hardware", element: d.jsx(Tm, {}) }),
                        d.jsx(dt, { path: "/hardware/:subject", element: d.jsx(ai, {}) }),
                        d.jsx(dt, { path: "/embedded", element: d.jsx(Om, {}) }),
                        d.jsx(dt, { path: "/embedded/:subject", element: d.jsx(ai, {}) }),
                        d.jsx(dt, { path: "/ros", element: d.jsx(Mm, {}) }),
                        d.jsx(dt, { path: "/ros/:subject", element: d.jsx(ai, {}) }),
                        d.jsx(dt, { path: "/computer-vision", element: d.jsx(Dm, {}) }),
                        d.jsx(dt, {
                            path: "/computer-vision/:subject",
                            element: d.jsx(ai, {}),
                        }),
                    ],
                }),
                d.jsx(Im, {}),
            ],
        }),
    });
}
_d(document.getElementById("root")).render(
    d.jsx(E.StrictMode, { children: d.jsx(Fm, {}) }),
);
  