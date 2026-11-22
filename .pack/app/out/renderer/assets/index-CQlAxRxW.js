function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
var react = { exports: {} };
var react_production = {};
var hasRequiredReact_production;
function requireReact_production() {
  if (hasRequiredReact_production) return react_production;
  hasRequiredReact_production = 1;
  var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = /* @__PURE__ */ Symbol.for("react.view_transition"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var ReactNoopUpdateQueue = {
    isMounted: function() {
      return false;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, assign = Object.assign, emptyObject = {};
  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  Component.prototype.isReactComponent = {};
  Component.prototype.setState = function(partialState, callback) {
    if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, partialState, callback, "setState");
  };
  Component.prototype.forceUpdate = function(callback) {
    this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
  };
  function ComponentDummy() {
  }
  ComponentDummy.prototype = Component.prototype;
  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent;
  assign(pureComponentPrototype, Component.prototype);
  pureComponentPrototype.isPureReactComponent = true;
  var isArrayImpl = Array.isArray;
  function noop() {
  }
  var ReactSharedInternals = { H: null, A: null, T: null, S: null }, hasOwnProperty = Object.prototype.hasOwnProperty;
  function ReactElement(type, key, props) {
    var refProp = props.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== refProp ? refProp : null,
      props
    };
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    return ReactElement(oldElement.type, newKey, oldElement.props);
  }
  function isValidElement(object) {
    return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function escape(key) {
    var escaperLookup = { "=": "=0", ":": "=2" };
    return "$" + key.replace(/[=:]/g, function(match) {
      return escaperLookup[match];
    });
  }
  var userProvidedKeyEscapeRegex = /\/+/g;
  function getElementKey(element, index) {
    return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
  }
  function resolveThenable(thenable) {
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenable.reason;
      default:
        switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
          function(fulfilledValue) {
            "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          },
          function(error) {
            "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
          }
        )), thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
        }
    }
    throw thenable;
  }
  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children;
    if ("undefined" === type || "boolean" === type) children = null;
    var invokeCallback = false;
    if (null === children) invokeCallback = true;
    else
      switch (type) {
        case "bigint":
        case "string":
        case "number":
          invokeCallback = true;
          break;
        case "object":
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
              break;
            case REACT_LAZY_TYPE:
              return invokeCallback = children._init, mapIntoArray(
                invokeCallback(children._payload),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
          }
      }
    if (invokeCallback)
      return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
        return c;
      })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
        callback,
        escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
          userProvidedKeyEscapeRegex,
          "$&/"
        ) + "/") + invokeCallback
      )), array.push(callback)), 1;
    invokeCallback = 0;
    var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
    if (isArrayImpl(children))
      for (var i = 0; i < children.length; i++)
        nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        );
    else if (i = getIteratorFn(children), "function" === typeof i)
      for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
        nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        );
    else if ("object" === type) {
      if ("function" === typeof children.then)
        return mapIntoArray(
          resolveThenable(children),
          array,
          escapedPrefix,
          nameSoFar,
          callback
        );
      array = String(children);
      throw Error(
        "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return invokeCallback;
  }
  function mapChildren(children, func, context) {
    if (null == children) return children;
    var result = [], count = 0;
    mapIntoArray(children, result, "", "", function(child) {
      return func.call(context, child, count++);
    });
    return result;
  }
  function lazyInitializer(payload) {
    if (-1 === payload._status) {
      var ctor = payload._result, thenable = ctor();
      thenable.then(
        function(moduleObject) {
          if (0 === payload._status || -1 === payload._status)
            payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
        },
        function(error) {
          if (0 === payload._status || -1 === payload._status)
            payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
        }
      );
      -1 === payload._status && (payload._status = 0, payload._result = thenable);
    }
    if (1 === payload._status) return payload._result.default;
    throw payload._result;
  }
  var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
    if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
      var event = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
        error
      });
      if (!window.dispatchEvent(event)) return;
    } else if ("object" === typeof process && "function" === typeof process.emit) {
      process.emit("uncaughtException", error);
      return;
    }
    console.error(error);
  };
  function startTransition(scope) {
    var prevTransition = ReactSharedInternals.T, currentTransition = {};
    currentTransition.types = null !== prevTransition ? prevTransition.types : null;
    ReactSharedInternals.T = currentTransition;
    try {
      var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
    } catch (error) {
      reportGlobalError(error);
    } finally {
      null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  }
  function addTransitionType(type) {
    var transition = ReactSharedInternals.T;
    if (null !== transition) {
      var transitionTypes = transition.types;
      null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
    } else startTransition(addTransitionType.bind(null, type));
  }
  var Children = {
    map: mapChildren,
    forEach: function(children, forEachFunc, forEachContext) {
      mapChildren(
        children,
        function() {
          forEachFunc.apply(this, arguments);
        },
        forEachContext
      );
    },
    count: function(children) {
      var n = 0;
      mapChildren(children, function() {
        n++;
      });
      return n;
    },
    toArray: function(children) {
      return mapChildren(children, function(child) {
        return child;
      }) || [];
    },
    only: function(children) {
      if (!isValidElement(children))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return children;
    }
  };
  react_production.Activity = REACT_ACTIVITY_TYPE;
  react_production.Children = Children;
  react_production.Component = Component;
  react_production.Fragment = REACT_FRAGMENT_TYPE;
  react_production.Profiler = REACT_PROFILER_TYPE;
  react_production.PureComponent = PureComponent;
  react_production.StrictMode = REACT_STRICT_MODE_TYPE;
  react_production.Suspense = REACT_SUSPENSE_TYPE;
  react_production.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
  react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
  react_production.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(size) {
      return ReactSharedInternals.H.useMemoCache(size);
    }
  };
  react_production.addTransitionType = addTransitionType;
  react_production.cache = function(fn) {
    return function() {
      return fn.apply(null, arguments);
    };
  };
  react_production.cacheSignal = function() {
    return null;
  };
  react_production.cloneElement = function(element, config, children) {
    if (null === element || void 0 === element)
      throw Error(
        "The argument must be a React element, but you passed " + element + "."
      );
    var props = assign({}, element.props), key = element.key;
    if (null != config)
      for (propName in void 0 !== config.key && (key = "" + config.key), config)
        !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
    var propName = arguments.length - 2;
    if (1 === propName) props.children = children;
    else if (1 < propName) {
      for (var childArray = Array(propName), i = 0; i < propName; i++)
        childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    return ReactElement(element.type, key, props);
  };
  react_production.createContext = function(defaultValue) {
    defaultValue = {
      $$typeof: REACT_CONTEXT_TYPE,
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    defaultValue.Provider = defaultValue;
    defaultValue.Consumer = {
      $$typeof: REACT_CONSUMER_TYPE,
      _context: defaultValue
    };
    return defaultValue;
  };
  react_production.createElement = function(type, config, children) {
    var propName, props = {}, key = null;
    if (null != config)
      for (propName in void 0 !== config.key && (key = "" + config.key), config)
        hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
    var childrenLength = arguments.length - 2;
    if (1 === childrenLength) props.children = children;
    else if (1 < childrenLength) {
      for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
        childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    if (type && type.defaultProps)
      for (propName in childrenLength = type.defaultProps, childrenLength)
        void 0 === props[propName] && (props[propName] = childrenLength[propName]);
    return ReactElement(type, key, props);
  };
  react_production.createRef = function() {
    return { current: null };
  };
  react_production.forwardRef = function(render) {
    return { $$typeof: REACT_FORWARD_REF_TYPE, render };
  };
  react_production.isValidElement = isValidElement;
  react_production.lazy = function(ctor) {
    return {
      $$typeof: REACT_LAZY_TYPE,
      _payload: { _status: -1, _result: ctor },
      _init: lazyInitializer
    };
  };
  react_production.memo = function(type, compare) {
    return {
      $$typeof: REACT_MEMO_TYPE,
      type,
      compare: void 0 === compare ? null : compare
    };
  };
  react_production.startTransition = startTransition;
  react_production.unstable_useCacheRefresh = function() {
    return ReactSharedInternals.H.useCacheRefresh();
  };
  react_production.use = function(usable) {
    return ReactSharedInternals.H.use(usable);
  };
  react_production.useActionState = function(action, initialState, permalink) {
    return ReactSharedInternals.H.useActionState(action, initialState, permalink);
  };
  react_production.useCallback = function(callback, deps) {
    return ReactSharedInternals.H.useCallback(callback, deps);
  };
  react_production.useContext = function(Context) {
    return ReactSharedInternals.H.useContext(Context);
  };
  react_production.useDebugValue = function() {
  };
  react_production.useDeferredValue = function(value, initialValue) {
    return ReactSharedInternals.H.useDeferredValue(value, initialValue);
  };
  react_production.useEffect = function(create2, deps) {
    return ReactSharedInternals.H.useEffect(create2, deps);
  };
  react_production.useEffectEvent = function(callback) {
    return ReactSharedInternals.H.useEffectEvent(callback);
  };
  react_production.useId = function() {
    return ReactSharedInternals.H.useId();
  };
  react_production.useImperativeHandle = function(ref, create2, deps) {
    return ReactSharedInternals.H.useImperativeHandle(ref, create2, deps);
  };
  react_production.useInsertionEffect = function(create2, deps) {
    return ReactSharedInternals.H.useInsertionEffect(create2, deps);
  };
  react_production.useLayoutEffect = function(create2, deps) {
    return ReactSharedInternals.H.useLayoutEffect(create2, deps);
  };
  react_production.useMemo = function(create2, deps) {
    return ReactSharedInternals.H.useMemo(create2, deps);
  };
  react_production.useOptimistic = function(passthrough, reducer) {
    return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
  };
  react_production.useReducer = function(reducer, initialArg, init) {
    return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
  };
  react_production.useRef = function(initialValue) {
    return ReactSharedInternals.H.useRef(initialValue);
  };
  react_production.useState = function(initialState) {
    return ReactSharedInternals.H.useState(initialState);
  };
  react_production.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
    return ReactSharedInternals.H.useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    );
  };
  react_production.useTransition = function() {
    return ReactSharedInternals.H.useTransition();
  };
  react_production.version = "19.3.1";
  return react_production;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production();
  }
  return react.exports;
}
var reactExports = requireReact();
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
var client = { exports: {} };
var reactDomClient_production = {};
var scheduler = { exports: {} };
var scheduler_production = {};
var hasRequiredScheduler_production;
function requireScheduler_production() {
  if (hasRequiredScheduler_production) return scheduler_production;
  hasRequiredScheduler_production = 1;
  (function(exports) {
    function push(heap, node) {
      var index = heap.length;
      heap.push(node);
      a: for (; 0 < index; ) {
        var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
        if (0 < compare(parent, node))
          heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
        else break a;
      }
    }
    function peek(heap) {
      return 0 === heap.length ? null : heap[0];
    }
    function pop(heap) {
      if (0 === heap.length) return null;
      var first = heap[0], last = heap.pop();
      if (last !== first) {
        heap[0] = last;
        a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
          var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
          if (0 > compare(left, last))
            rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
          else if (rightIndex < length && 0 > compare(right, last))
            heap[index] = right, heap[rightIndex] = last, index = rightIndex;
          else break a;
        }
      }
      return first;
    }
    function compare(a, b) {
      var diff = a.sortIndex - b.sortIndex;
      return 0 !== diff ? diff : a.id - b.id;
    }
    exports.unstable_now = void 0;
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var localPerformance = performance;
      exports.unstable_now = function() {
        return localPerformance.now();
      };
    } else {
      var localDate = Date, initialTime = localDate.now();
      exports.unstable_now = function() {
        return localDate.now() - initialTime;
      };
    }
    var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = false, isHostCallbackScheduled = false, isHostTimeoutScheduled = false, needsPaint = false, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
    function advanceTimers(currentTime) {
      for (var timer = peek(timerQueue); null !== timer; ) {
        if (null === timer.callback) pop(timerQueue);
        else if (timer.startTime <= currentTime)
          pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
        else break;
        timer = peek(timerQueue);
      }
    }
    function handleTimeout(currentTime) {
      isHostTimeoutScheduled = false;
      advanceTimers(currentTime);
      if (!isHostCallbackScheduled)
        if (null !== peek(taskQueue))
          isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
        else {
          var firstTimer = peek(timerQueue);
          null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
    }
    var isMessageLoopRunning = false, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
    function shouldYieldToHost() {
      return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
    }
    function performWorkUntilDeadline() {
      needsPaint = false;
      if (isMessageLoopRunning) {
        var currentTime = exports.unstable_now();
        startTime = currentTime;
        var hasMoreWork = true;
        try {
          a: {
            isHostCallbackScheduled = false;
            isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
              b: {
                advanceTimers(currentTime);
                for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                  var callback = currentTask.callback;
                  if ("function" === typeof callback) {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var continuationCallback = callback(
                      currentTask.expirationTime <= currentTime
                    );
                    currentTime = exports.unstable_now();
                    if ("function" === typeof continuationCallback) {
                      currentTask.callback = continuationCallback;
                      advanceTimers(currentTime);
                      hasMoreWork = true;
                      break b;
                    }
                    currentTask === peek(taskQueue) && pop(taskQueue);
                    advanceTimers(currentTime);
                  } else pop(taskQueue);
                  currentTask = peek(taskQueue);
                }
                if (null !== currentTask) hasMoreWork = true;
                else {
                  var firstTimer = peek(timerQueue);
                  null !== firstTimer && requestHostTimeout(
                    handleTimeout,
                    firstTimer.startTime - currentTime
                  );
                  hasMoreWork = false;
                }
              }
              break a;
            } finally {
              currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
            }
            hasMoreWork = void 0;
          }
        } finally {
          hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
        }
      }
    }
    var schedulePerformWorkUntilDeadline;
    if ("function" === typeof localSetImmediate)
      schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
      };
    else if ("undefined" !== typeof MessageChannel) {
      var channel = new MessageChannel(), port = channel.port2;
      channel.port1.onmessage = performWorkUntilDeadline;
      schedulePerformWorkUntilDeadline = function() {
        port.postMessage(null);
      };
    } else
      schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
      };
    function requestHostTimeout(callback, ms) {
      taskTimeoutID = localSetTimeout(function() {
        callback(exports.unstable_now());
      }, ms);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(task) {
      task.callback = null;
    };
    exports.unstable_forceFrameRate = function(fps) {
      0 > fps || 125 < fps ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return currentPriorityLevel;
    };
    exports.unstable_next = function(eventHandler) {
      switch (currentPriorityLevel) {
        case 1:
        case 2:
        case 3:
          var priorityLevel = 3;
          break;
        default:
          priorityLevel = currentPriorityLevel;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_requestPaint = function() {
      needsPaint = true;
    };
    exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
      switch (priorityLevel) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          priorityLevel = 3;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
      var currentTime = exports.unstable_now();
      "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
      switch (priorityLevel) {
        case 1:
          var timeout = -1;
          break;
        case 2:
          timeout = 250;
          break;
        case 5:
          timeout = 1073741823;
          break;
        case 4:
          timeout = 1e4;
          break;
        default:
          timeout = 5e3;
      }
      timeout = options + timeout;
      priorityLevel = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime: options,
        expirationTime: timeout,
        sortIndex: -1
      };
      options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
      return priorityLevel;
    };
    exports.unstable_shouldYield = shouldYieldToHost;
    exports.unstable_wrapCallback = function(callback) {
      var parentPriorityLevel = currentPriorityLevel;
      return function() {
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = parentPriorityLevel;
        try {
          return callback.apply(this, arguments);
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
    };
  })(scheduler_production);
  return scheduler_production;
}
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler.exports;
  hasRequiredScheduler = 1;
  {
    scheduler.exports = requireScheduler_production();
  }
  return scheduler.exports;
}
var reactDom = { exports: {} };
var reactDom_production = {};
var hasRequiredReactDom_production;
function requireReactDom_production() {
  if (hasRequiredReactDom_production) return reactDom_production;
  hasRequiredReactDom_production = 1;
  var React2 = requireReact();
  function formatProdErrorMessage(code) {
    var url = "https://react.dev/errors/" + code;
    if (1 < arguments.length) {
      url += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        url += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function noop() {
  }
  var Internals = {
    d: {
      f: noop,
      r: function() {
        throw Error(formatProdErrorMessage(522));
      },
      D: noop,
      C: noop,
      L: noop,
      m: noop,
      X: noop,
      S: noop,
      M: noop
    },
    p: 0,
    findDOMNode: null
  }, REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_RECOVERABLE_TYPE = /* @__PURE__ */ Symbol.for("react.recoverable"), REACT_OPTIMISTIC_KEY = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function createPortal$1(children, containerInfo, implementation) {
    var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: REACT_PORTAL_TYPE,
      key: null == key ? null : key === REACT_OPTIMISTIC_KEY ? REACT_OPTIMISTIC_KEY : "" + key,
      children,
      containerInfo,
      implementation
    };
  }
  var ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function getCrossOriginStringAs(as, input) {
    if ("font" === as) return "";
    if ("string" === typeof input)
      return "use-credentials" === input ? input : "";
  }
  reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
  reactDom_production.browser = function(reason) {
    return { $$typeof: REACT_RECOVERABLE_TYPE, _reason: reason };
  };
  reactDom_production.createPortal = function(children, container) {
    var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
      throw Error(formatProdErrorMessage(299));
    return createPortal$1(children, container, null, key);
  };
  reactDom_production.flushSync = function(fn) {
    var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
    try {
      if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
    } finally {
      ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
    }
  };
  reactDom_production.preconnect = function(href, options) {
    "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
  };
  reactDom_production.prefetchDNS = function(href) {
    "string" === typeof href && Internals.d.D(href);
  };
  reactDom_production.preinit = function(href, options) {
    if ("string" === typeof href && options && "string" === typeof options.as) {
      var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
      "style" === as ? Internals.d.S(
        href,
        "string" === typeof options.precedence ? options.precedence : void 0,
        {
          crossOrigin,
          integrity,
          fetchPriority
        }
      ) : "script" === as && Internals.d.X(href, {
        crossOrigin,
        integrity,
        fetchPriority,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0
      });
    }
  };
  reactDom_production.preinitModule = function(href, options) {
    if ("string" === typeof href)
      if ("object" === typeof options && null !== options) {
        if (null == options.as || "script" === options.as) {
          var crossOrigin = getCrossOriginStringAs(
            options.as,
            options.crossOrigin
          );
          Internals.d.M(href, {
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0,
            fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
          });
        }
      } else null == options && Internals.d.M(href);
  };
  reactDom_production.preload = function(href, options) {
    if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
      var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
      Internals.d.L(href, as, {
        crossOrigin,
        integrity: "string" === typeof options.integrity ? options.integrity : void 0,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0,
        type: "string" === typeof options.type ? options.type : void 0,
        fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
        referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
        imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
        imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
        media: "string" === typeof options.media ? options.media : void 0
      });
    }
  };
  reactDom_production.preloadModule = function(href, options) {
    if ("string" === typeof href)
      if (options) {
        var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
        Internals.d.m(href, {
          as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
          fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
        });
      } else Internals.d.m(href);
  };
  reactDom_production.requestFormReset = function(form) {
    Internals.d.r(form);
  };
  reactDom_production.unstable_batchedUpdates = function(fn, a) {
    return fn(a);
  };
  reactDom_production.useFormState = function(action, initialState, permalink) {
    return ReactSharedInternals.H.useFormState(action, initialState, permalink);
  };
  reactDom_production.useFormStatus = function() {
    return ReactSharedInternals.H.useHostTransitionStatus();
  };
  reactDom_production.version = "19.3.1";
  return reactDom_production;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = requireReactDom_production();
  }
  return reactDom.exports;
}
var hasRequiredReactDomClient_production;
function requireReactDomClient_production() {
  if (hasRequiredReactDomClient_production) return reactDomClient_production;
  hasRequiredReactDomClient_production = 1;
  var Scheduler = requireScheduler(), React2 = requireReact(), ReactDOM2 = requireReactDom();
  function formatProdErrorMessage(code) {
    var url = "https://react.dev/errors/" + code;
    if (1 < arguments.length) {
      url += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        url += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function isValidContainer(node) {
    return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
  }
  function getNearestMountedFiber(fiber) {
    for (var node = fiber, nextNode = node; nextNode && !nextNode.alternate; )
      node = nextNode, 0 !== (node.flags & 4098) && (fiber = node.return), nextNode = node.return;
    for (; node.return; ) node = node.return;
    return 3 === node.tag ? fiber : null;
  }
  function getSuspenseInstanceFromFiber(fiber) {
    if (13 === fiber.tag) {
      var suspenseState = fiber.memoizedState;
      null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
      if (null !== suspenseState) return suspenseState.dehydrated;
    }
    return null;
  }
  function getActivityInstanceFromFiber(fiber) {
    if (31 === fiber.tag) {
      var activityState = fiber.memoizedState;
      null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
      if (null !== activityState) return activityState.dehydrated;
    }
    return null;
  }
  function assertIsMounted(fiber) {
    if (getNearestMountedFiber(fiber) !== fiber)
      throw Error(formatProdErrorMessage(188));
  }
  function findCurrentFiberUsingSlowPath(fiber) {
    var alternate = fiber.alternate;
    if (!alternate) {
      alternate = getNearestMountedFiber(fiber);
      if (null === alternate) throw Error(formatProdErrorMessage(188));
      return alternate !== fiber ? null : fiber;
    }
    for (var a = fiber, b = alternate; ; ) {
      var parentA = a.return;
      if (null === parentA) break;
      var parentB = parentA.alternate;
      if (null === parentB) {
        b = parentA.return;
        if (null !== b) {
          a = b;
          continue;
        }
        break;
      }
      if (parentA.child === parentB.child) {
        for (parentB = parentA.child; parentB; ) {
          if (parentB === a) return assertIsMounted(parentA), fiber;
          if (parentB === b) return assertIsMounted(parentA), alternate;
          parentB = parentB.sibling;
        }
        throw Error(formatProdErrorMessage(188));
      }
      if (a.return !== b.return) a = parentA, b = parentB;
      else {
        for (var didFindChild = false, child$0 = parentA.child; child$0; ) {
          if (child$0 === a) {
            didFindChild = true;
            a = parentA;
            b = parentB;
            break;
          }
          if (child$0 === b) {
            didFindChild = true;
            b = parentA;
            a = parentB;
            break;
          }
          child$0 = child$0.sibling;
        }
        if (!didFindChild) {
          for (child$0 = parentB.child; child$0; ) {
            if (child$0 === a) {
              didFindChild = true;
              a = parentB;
              b = parentA;
              break;
            }
            if (child$0 === b) {
              didFindChild = true;
              b = parentB;
              a = parentA;
              break;
            }
            child$0 = child$0.sibling;
          }
          if (!didFindChild) throw Error(formatProdErrorMessage(189));
        }
      }
      if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
    }
    if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
    return a.stateNode.current === a ? fiber : alternate;
  }
  function findCurrentHostFiberImpl(node) {
    var tag = node.tag;
    if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
    for (node = node.child; null !== node; ) {
      tag = findCurrentHostFiberImpl(node);
      if (null !== tag) return tag;
      node = node.sibling;
    }
    return null;
  }
  function traverseVisibleInstancesAndTextInstances(child, searchWithinHosts, fn, a, b, c) {
    for (; null !== child; ) {
      if ((5 === child.tag || 27 === child.tag || 6 === child.tag) && fn(child, a, b, c) || (22 !== child.tag || null === child.memoizedState) && (searchWithinHosts || 5 !== child.tag && 27 !== child.tag) && traverseVisibleInstancesAndTextInstances(
        child.child,
        searchWithinHosts,
        fn,
        a,
        b,
        c
      ))
        return true;
      child = child.sibling;
    }
    return false;
  }
  function getFragmentParentInstanceOrContainerFiber(fiber) {
    for (fiber = fiber.return; null !== fiber; ) {
      if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) return fiber;
      fiber = fiber.return;
    }
    return null;
  }
  function fiberIsPortaledIntoHost(fiber) {
    var foundPortalParent = false;
    for (fiber = fiber.return; null !== fiber; ) {
      4 === fiber.tag && (foundPortalParent = true);
      if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) break;
      fiber = fiber.return;
    }
    return foundPortalParent;
  }
  function getFragmentInstanceOrTextInstanceSiblings(fiber) {
    var result = [null, null], parentHostFiber = getFragmentParentInstanceOrContainerFiber(fiber);
    if (null === parentHostFiber) return result;
    findFragmentInstanceOrTextInstanceSiblings(
      result,
      fiber,
      parentHostFiber.child,
      { foundSelf: false }
    );
    return result;
  }
  function findFragmentInstanceOrTextInstanceSiblings(result, self, child, state) {
    for (; null !== child; ) {
      if (child === self) state.foundSelf = true;
      else if (5 === child.tag || 27 === child.tag || 6 === child.tag) {
        if (state.foundSelf) return result[1] = child, true;
        result[0] = child;
      } else if ((22 !== child.tag || null === child.memoizedState) && findFragmentInstanceOrTextInstanceSiblings(
        result,
        self,
        child.child,
        state
      ))
        return true;
      child = child.sibling;
    }
    return false;
  }
  function getInstanceFromHostFiber(fiber) {
    switch (fiber.tag) {
      case 5:
      case 27:
      case 6:
        return fiber.stateNode;
      case 3:
        return fiber.stateNode.containerInfo;
      default:
        throw Error(formatProdErrorMessage(559));
    }
  }
  var searchTarget = null, searchBoundary = null;
  function isFiberPrecedingCheck(child, target, boundary) {
    return child === boundary ? true : child === target ? (searchTarget = child, true) : false;
  }
  function isFiberFollowingCheck(child, target, boundary) {
    return child === boundary ? (searchBoundary = child, false) : child === target ? (null !== searchBoundary && (searchTarget = child), true) : false;
  }
  function getParentForFragmentAncestors(inst) {
    if (null === inst) return null;
    do
      inst = null === inst ? null : inst.return;
    while (inst && 5 !== inst.tag && 27 !== inst.tag && 3 !== inst.tag);
    return inst ? inst : null;
  }
  function getLowestCommonAncestor(instA, instB, getParent2) {
    for (var depthA = 0, tempA = instA; tempA; tempA = getParent2(tempA)) depthA++;
    tempA = 0;
    for (var tempB = instB; tempB; tempB = getParent2(tempB)) tempA++;
    for (; 0 < depthA - tempA; ) instA = getParent2(instA), depthA--;
    for (; 0 < tempA - depthA; ) instB = getParent2(instB), tempA--;
    for (; depthA--; ) {
      if (instA === instB || null !== instB && instA === instB.alternate)
        return instA;
      instA = getParent2(instA);
      instB = getParent2(instB);
    }
    return null;
  }
  var assign = Object.assign, REACT_LEGACY_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element"), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
  var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_LEGACY_HIDDEN_TYPE = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
  var REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), REACT_VIEW_TRANSITION_TYPE = /* @__PURE__ */ Symbol.for("react.view_transition"), REACT_RECOVERABLE_TYPE = /* @__PURE__ */ Symbol.for("react.recoverable"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference");
  function getComponentNameFromType(type) {
    if (null == type) return null;
    if ("function" === typeof type)
      return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
    if ("string" === typeof type) return type;
    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return "Fragment";
      case REACT_PROFILER_TYPE:
        return "Profiler";
      case REACT_STRICT_MODE_TYPE:
        return "StrictMode";
      case REACT_SUSPENSE_TYPE:
        return "Suspense";
      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
      case REACT_ACTIVITY_TYPE:
        return "Activity";
      case REACT_VIEW_TRANSITION_TYPE:
        return "ViewTransition";
    }
    if ("object" === typeof type)
      switch (type.$$typeof) {
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_CONTEXT_TYPE:
          return type.displayName || "Context";
        case REACT_CONSUMER_TYPE:
          return (type._context.displayName || "Context") + ".Consumer";
        case REACT_FORWARD_REF_TYPE:
          var innerType = type.render;
          type = type.displayName;
          type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
          return type;
        case REACT_MEMO_TYPE:
          return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
        case REACT_LAZY_TYPE:
          innerType = type._payload;
          type = type._init;
          try {
            return getComponentNameFromType(type(innerType));
          } catch (x) {
          }
      }
    return null;
  }
  var isArrayImpl = Array.isArray, ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals = ReactDOM2.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject = {
    pending: false,
    data: null,
    method: null,
    action: null
  }, valueStack = [], index = -1;
  function createCursor(defaultValue) {
    return { current: defaultValue };
  }
  function pop(cursor) {
    0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
  }
  function push(cursor, value) {
    index++;
    valueStack[index] = cursor.current;
    cursor.current = value;
  }
  var contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null);
  function pushHostContainer(fiber, nextRootInstance) {
    push(rootInstanceStackCursor, nextRootInstance);
    push(contextFiberStackCursor, fiber);
    push(contextStackCursor, null);
    switch (nextRootInstance.nodeType) {
      case 9:
      case 11:
        fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
        break;
      default:
        if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
          nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
        else
          switch (fiber) {
            case "svg":
              fiber = 1;
              break;
            case "math":
              fiber = 2;
              break;
            default:
              fiber = 0;
          }
    }
    pop(contextStackCursor);
    push(contextStackCursor, fiber);
  }
  function popHostContainer() {
    pop(contextStackCursor);
    pop(contextFiberStackCursor);
    pop(rootInstanceStackCursor);
  }
  function pushHostContext(fiber) {
    var stateHook = fiber.memoizedState;
    null !== stateHook && (HostTransitionContext._currentValue = stateHook.memoizedState, push(hostTransitionProviderCursor, fiber));
    stateHook = contextStackCursor.current;
    var JSCompiler_inline_result = getChildHostContextProd(stateHook, fiber.type);
    stateHook !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
  }
  function popHostContext(fiber) {
    contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
    hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
  }
  var prefix, suffix;
  function describeBuiltInComponentFrame(name) {
    if (void 0 === prefix)
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || "";
        suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return "\n" + prefix + name + suffix;
  }
  var reentry = false;
  function describeNativeComponentFrame(fn, construct) {
    if (!fn || reentry) return "";
    reentry = true;
    var previousPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var RunInRootFrame = {
        DetermineComponentFrameRoot: function() {
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if ("object" === typeof Reflect && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  var control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x$1) {
                  control = x$1;
                }
                Fake = false;
                try {
                  var prevProps = Object.getOwnPropertyDescriptor(
                    fn.prototype,
                    "props"
                  );
                  Object.defineProperty(fn.prototype, "props", {
                    configurable: true,
                    set: function() {
                      throw Error();
                    }
                  });
                  Fake = true;
                  new fn();
                } finally {
                  Fake && (void 0 !== prevProps ? Object.defineProperty(fn.prototype, "props", prevProps) : delete fn.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (x$2) {
                control = x$2;
              }
              (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
              });
            }
          } catch (sample) {
            if (sample && control && "string" === typeof sample.stack)
              return [sample.stack, control.stack];
          }
          return [null, null];
        }
      };
      RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var namePropDescriptor = Object.getOwnPropertyDescriptor(
        RunInRootFrame.DetermineComponentFrameRoot,
        "name"
      );
      namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
        RunInRootFrame.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
      if (sampleStack && controlStack) {
        var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
        for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
          RunInRootFrame++;
        for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
          "DetermineComponentFrameRoot"
        ); )
          namePropDescriptor++;
        if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
          for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
            namePropDescriptor--;
        for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
          if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
            if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
              do
                if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                  var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                  fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                  return frame;
                }
              while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
            }
            break;
          }
      }
    } finally {
      reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
    }
    return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
  }
  function describeFiber(fiber, childFiber) {
    switch (fiber.tag) {
      case 26:
      case 27:
      case 5:
        return describeBuiltInComponentFrame(fiber.type);
      case 16:
        return describeBuiltInComponentFrame("Lazy");
      case 13:
        return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
      case 19:
        return describeBuiltInComponentFrame("SuspenseList");
      case 0:
      case 15:
        return describeNativeComponentFrame(fiber.type, false);
      case 11:
        return describeNativeComponentFrame(fiber.type.render, false);
      case 1:
        return describeNativeComponentFrame(fiber.type, true);
      case 31:
        return describeBuiltInComponentFrame("Activity");
      case 30:
        return describeBuiltInComponentFrame("ViewTransition");
      default:
        return "";
    }
  }
  function getStackByFiberInDevAndProd(workInProgress2) {
    try {
      var info = "", previous = null;
      do
        info += describeFiber(workInProgress2, previous), previous = workInProgress2, workInProgress2 = workInProgress2.return;
      while (workInProgress2);
      return info;
    } catch (x) {
      return "\nError generating stack: " + x.message + "\n" + x.stack;
    }
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now2 = Scheduler.unstable_now, getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, LowPriority = Scheduler.unstable_LowPriority, IdlePriority = Scheduler.unstable_IdlePriority, log$1 = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null;
  function setIsStrictModeForDevtools(newIsStrictMode) {
    "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
    if (injectedHook && "function" === typeof injectedHook.setStrictMode)
      try {
        injectedHook.setStrictMode(rendererID, newIsStrictMode);
      } catch (err) {
      }
  }
  var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
  function clz32Fallback(x) {
    x >>>= 0;
    return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
  }
  var nextTransitionUpdateLane = 256, nextTransitionDeferredLane = 262144, nextRetryLane = 4194304;
  function getHighestPriorityLanes(lanes) {
    var pendingSyncLanes = lanes & 42;
    if (0 !== pendingSyncLanes) return pendingSyncLanes;
    switch (lanes & -lanes) {
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
        return 64;
      case 128:
        return 128;
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
        return lanes & -lanes;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return lanes & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return lanes & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return lanes;
    }
  }
  function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
    var pendingLanes = root2.pendingLanes;
    if (0 === pendingLanes) return 0;
    var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
    root2 = root2.warmLanes;
    var nonIdlePendingLanes = pendingLanes & 134217727;
    0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
    return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
  }
  function checkIfRootIsPrerendering(root2, renderLanes2) {
    return 0 === (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2);
  }
  function getEntangledLanes(root2, renderLanes2) {
    0 !== (renderLanes2 & 8) && (renderLanes2 |= renderLanes2 & 32);
    var allEntangledLanes = root2.entangledLanes;
    if (0 !== allEntangledLanes)
      for (root2 = root2.entanglements, allEntangledLanes &= renderLanes2; 0 < allEntangledLanes; ) {
        var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
        renderLanes2 |= root2[index$4];
        allEntangledLanes &= ~lane;
      }
    return renderLanes2;
  }
  function computeExpirationTime(lane, currentTime) {
    switch (lane) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return currentTime + 250;
      case 16:
      case 32:
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
        return currentTime + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function claimNextRetryLane() {
    var lane = nextRetryLane;
    nextRetryLane <<= 1;
    0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
    return lane;
  }
  function createLaneMap(initial) {
    for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
    return laneMap;
  }
  function markRootUpdated$1(root2, updateLane) {
    root2.pendingLanes |= updateLane;
    268435456 !== updateLane && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
  }
  function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
    var previouslyPendingLanes = root2.pendingLanes;
    root2.pendingLanes = remainingLanes;
    root2.suspendedLanes = 0;
    root2.pingedLanes = 0;
    root2.warmLanes = 0;
    root2.expiredLanes &= remainingLanes;
    root2.entangledLanes &= remainingLanes;
    root2.errorRecoveryDisabledLanes &= remainingLanes;
    root2.shellSuspendCounter = 0;
    var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
    for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
      var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
      entanglements[index$7] = 0;
      expirationTimes[index$7] = -1;
      var hiddenUpdatesForLane = hiddenUpdates[index$7];
      if (null !== hiddenUpdatesForLane)
        for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
          var update = hiddenUpdatesForLane[index$7];
          null !== update && (update.lane &= -536870913);
        }
      remainingLanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, 0);
    0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root2.tag && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
  }
  function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
    root2.pendingLanes |= spawnedLane;
    root2.suspendedLanes &= ~spawnedLane;
    var spawnedLaneIndex = 31 - clz32(spawnedLane);
    root2.entangledLanes |= spawnedLane;
    root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
  }
  function markRootEntangled(root2, entangledLanes) {
    var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
    for (root2 = root2.entanglements; rootEntangledLanes; ) {
      var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
      lane & entangledLanes | root2[index$8] & entangledLanes && (root2[index$8] |= entangledLanes);
      rootEntangledLanes &= ~lane;
    }
  }
  function getBumpedLaneForHydration(root2, renderLanes2) {
    var renderLane = renderLanes2 & -renderLanes2;
    renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
    return 0 !== (renderLane & (root2.suspendedLanes | renderLanes2)) ? 0 : renderLane;
  }
  function getBumpedLaneForHydrationByLane(lane) {
    switch (lane) {
      case 2:
        lane = 1;
        break;
      case 8:
        lane = 4;
        break;
      case 32:
        lane = 16;
        break;
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
        lane = 128;
        break;
      case 268435456:
        lane = 134217728;
        break;
      default:
        lane = 0;
    }
    return lane;
  }
  function lanesToEventPriority(lanes) {
    lanes &= -lanes;
    return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
  }
  function resolveUpdatePriority() {
    var updatePriority = ReactDOMSharedInternals.p;
    if (0 !== updatePriority) return updatePriority;
    updatePriority = window.event;
    return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
  }
  function runWithPriority(priority, fn) {
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      return ReactDOMSharedInternals.p = priority, fn();
    } finally {
      ReactDOMSharedInternals.p = previousPriority;
    }
  }
  var randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactFiber$" + randomKey, internalPropsKey = "__reactProps$" + randomKey, internalContainerInstanceKey = "__reactContainer$" + randomKey, internalEventHandlersKey = "__reactEvents$" + randomKey, internalEventHandlerListenersKey = "__reactListeners$" + randomKey, internalEventHandlesSetKey = "__reactHandles$" + randomKey, internalRootNodeResourcesKey = "__reactResources$" + randomKey, internalHoistableMarker = "__reactMarker$" + randomKey, internalLoadPendingKey = "__reactLoad$" + randomKey;
  function detachDeletedInstance(node) {
    delete node[internalInstanceKey];
    delete node[internalPropsKey];
    delete node[internalEventHandlerListenersKey];
    delete node[internalEventHandlesSetKey];
  }
  function getClosestInstanceFromNode(targetNode) {
    var targetInst;
    if (targetInst = targetNode[internalInstanceKey]) return targetInst;
    for (var parentNode = targetNode.parentNode; parentNode; ) {
      if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
        parentNode = targetInst.alternate;
        if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
          for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode; ) {
            if (parentNode = targetNode[internalInstanceKey]) return parentNode;
            targetNode = getParentHydrationBoundary(targetNode);
          }
        return targetInst;
      }
      targetNode = parentNode;
      parentNode = targetNode.parentNode;
    }
    return null;
  }
  function getInstanceFromNode(node) {
    if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
      var tag = node.tag;
      if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag)
        return node;
    }
    return null;
  }
  function getNodeFromInstance(inst) {
    var tag = inst.tag;
    if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
    throw Error(formatProdErrorMessage(33));
  }
  function getResourcesFromRoot(root2) {
    var resources = root2[internalRootNodeResourcesKey];
    resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
    return resources;
  }
  function markNodeAsHoistable(node) {
    node[internalHoistableMarker] = true;
  }
  function clearPendingLoadOnNode(node) {
    node[internalLoadPendingKey] = void 0;
  }
  var allNativeEvents = /* @__PURE__ */ new Set(), registrationNameDependencies = {};
  function registerTwoPhaseEvent(registrationName, dependencies) {
    registerDirectEvent(registrationName, dependencies);
    registerDirectEvent(registrationName + "Capture", dependencies);
  }
  function registerDirectEvent(registrationName, dependencies) {
    registrationNameDependencies[registrationName] = dependencies;
    for (registrationName = 0; registrationName < dependencies.length; registrationName++)
      allNativeEvents.add(dependencies[registrationName]);
  }
  var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
  function isAttributeNameSafe(attributeName) {
    if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
      return true;
    if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
    if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
      return validatedAttributeNameCache[attributeName] = true;
    illegalAttributeNameCache[attributeName] = true;
    return false;
  }
  var viewTransitionMutationContext = false;
  function pushMutationContext() {
    var prev = viewTransitionMutationContext;
    viewTransitionMutationContext = false;
    return prev;
  }
  function setValueForAttribute(node, name, value) {
    if (isAttributeNameSafe(name))
      if (null === value) node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
            node.removeAttribute(name);
            return;
          case "boolean":
            var prefix$10 = name.toLowerCase().slice(0, 5);
            if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
              node.removeAttribute(name);
              return;
            }
        }
        node.setAttribute(name, value);
      }
  }
  function setValueForKnownAttribute(node, name, value) {
    if (null === value) node.removeAttribute(name);
    else {
      switch (typeof value) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          node.removeAttribute(name);
          return;
      }
      node.setAttribute(name, value);
    }
  }
  function setValueForNamespacedAttribute(node, namespace, name, value) {
    if (null === value) node.removeAttribute(name);
    else {
      switch (typeof value) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          node.removeAttribute(name);
          return;
      }
      node.setAttributeNS(namespace, name, value);
    }
  }
  function getToStringValue(value) {
    switch (typeof value) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return value;
      case "object":
        return value;
      default:
        return "";
    }
  }
  function isCheckable(elem) {
    var type = elem.type;
    return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
  }
  function trackValueOnNode(node, valueField, currentValue) {
    var descriptor = Object.getOwnPropertyDescriptor(
      node.constructor.prototype,
      valueField
    );
    if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
      var get = descriptor.get, set = descriptor.set;
      Object.defineProperty(node, valueField, {
        configurable: true,
        get: function() {
          return get.call(this);
        },
        set: function(value) {
          currentValue = "" + value;
          set.call(this, value);
        }
      });
      Object.defineProperty(node, valueField, {
        enumerable: descriptor.enumerable
      });
      return {
        getValue: function() {
          return currentValue;
        },
        setValue: function(value) {
          currentValue = "" + value;
        },
        stopTracking: function() {
          node._valueTracker = null;
          delete node[valueField];
        }
      };
    }
  }
  function track(node) {
    if (!node._valueTracker) {
      var valueField = isCheckable(node) ? "checked" : "value";
      node._valueTracker = trackValueOnNode(
        node,
        valueField,
        "" + node[valueField]
      );
    }
  }
  function updateValueIfChanged(node) {
    if (!node) return false;
    var tracker = node._valueTracker;
    if (!tracker) return true;
    var lastValue = tracker.getValue();
    var value = "";
    node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
    node = value;
    return node !== lastValue ? (tracker.setValue(node), true) : false;
  }
  var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
  function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
    return value.replace(
      escapeSelectorAttributeValueInsideDoubleQuotesRegex,
      function(ch) {
        return "\\" + ch.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
    element.name = "";
    null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
    if (null != value)
      if ("number" === type) {
        if (0 === value && "" === element.value || element.value != value)
          element.value = "" + getToStringValue(value);
      } else
        element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
    else
      "submit" !== type && "reset" !== type || element.removeAttribute("value");
    null != value ? "number" === type && element.value == value ? setDefaultValue(element, getToStringValue(element.value)) : setDefaultValue(element, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
    null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
    null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
    null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
  }
  function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
    null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
    if (null != value || null != defaultValue) {
      if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
        track(element);
        return;
      }
      defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
      value = null != value ? "" + getToStringValue(value) : defaultValue;
      isHydrating2 || value === element.value || (element.value = value);
      element.defaultValue = value;
    }
    checked = null != checked ? checked : defaultChecked;
    checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
    element.checked = isHydrating2 ? element.checked : !!checked;
    element.defaultChecked = !!checked;
    null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
    track(element);
  }
  function setDefaultValue(node, value) {
    node.defaultValue !== "" + value && (node.defaultValue = "" + value);
  }
  function updateOptions(node, multiple, propValue, setDefaultSelected) {
    node = node.options;
    if (multiple) {
      multiple = {};
      for (var i = 0; i < propValue.length; i++)
        multiple["$" + propValue[i]] = true;
      for (propValue = 0; propValue < node.length; propValue++)
        i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
    } else {
      propValue = "" + getToStringValue(propValue);
      multiple = null;
      for (i = 0; i < node.length; i++) {
        if (node[i].value === propValue) {
          node[i].selected = true;
          setDefaultSelected && (node[i].defaultSelected = true);
          return;
        }
        null !== multiple || node[i].disabled || (multiple = node[i]);
      }
      null !== multiple && (multiple.selected = true);
    }
  }
  function updateTextarea(element, value, defaultValue) {
    if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
      element.defaultValue !== value && (element.defaultValue = value);
      return;
    }
    element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
  }
  function initTextarea(element, value, defaultValue, children) {
    if (null == value) {
      if (null != children) {
        if (null != defaultValue) throw Error(formatProdErrorMessage(92));
        if (isArrayImpl(children)) {
          if (1 < children.length) throw Error(formatProdErrorMessage(93));
          children = children[0];
        }
        defaultValue = children;
      }
      null == defaultValue && (defaultValue = "");
      value = defaultValue;
    }
    defaultValue = getToStringValue(value);
    element.defaultValue = defaultValue;
    children = element.textContent;
    children === defaultValue && "" !== children && null !== children && (element.value = children);
    track(element);
  }
  function setTextContent(node, text) {
    if (text) {
      var firstChild = node.firstChild;
      if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
        firstChild.nodeValue = text;
        return;
      }
    }
    node.textContent = text;
  }
  var unitlessNumbers = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function setValueForStyle(style2, styleName, value) {
    var isCustomProperty = 0 === styleName.indexOf("--");
    null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
  }
  function setValueForStyles(node, styles, prevStyles) {
    if (null != styles && "object" !== typeof styles)
      throw Error(formatProdErrorMessage(62));
    node = node.style;
    if (null != prevStyles) {
      for (var styleName in prevStyles)
        !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "", viewTransitionMutationContext = true);
      for (var styleName$16 in styles)
        styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && (setValueForStyle(node, styleName$16, styleName), viewTransitionMutationContext = true);
    } else
      for (var styleName$17 in styles)
        styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
  }
  function isCustomElement(tagName) {
    if (-1 === tagName.indexOf("-")) return false;
    switch (tagName) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var aliases = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function sanitizeURL(url) {
    return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
  }
  function noop$1() {
  }
  var currentReplayingEvent = null;
  function getEventTarget(nativeEvent) {
    nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
    nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
    return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
  }
  var restoreTarget = null, restoreQueue = null;
  function restoreStateOfTarget(target) {
    var internalInstance = getInstanceFromNode(target);
    if (internalInstance && (target = internalInstance.stateNode)) {
      var props = target[internalPropsKey] || null;
      a: switch (target = internalInstance.stateNode, internalInstance.type) {
        case "input":
          updateInput(
            target,
            props.value,
            props.defaultValue,
            props.defaultValue,
            props.checked,
            props.defaultChecked,
            props.type,
            props.name
          );
          internalInstance = props.name;
          if ("radio" === props.type && null != internalInstance) {
            for (props = target; props.parentNode; ) props = props.parentNode;
            props = props.querySelectorAll(
              'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
                "" + internalInstance
              ) + '"][type="radio"]'
            );
            for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
              var otherNode = props[internalInstance];
              if (otherNode !== target && otherNode.form === target.form) {
                var otherProps = otherNode[internalPropsKey] || null;
                if (!otherProps) throw Error(formatProdErrorMessage(90));
                updateInput(
                  otherNode,
                  otherProps.value,
                  otherProps.defaultValue,
                  otherProps.defaultValue,
                  otherProps.checked,
                  otherProps.defaultChecked,
                  otherProps.type,
                  otherProps.name
                );
              }
            }
            for (internalInstance = 0; internalInstance < props.length; internalInstance++)
              otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
          }
          break a;
        case "textarea":
          updateTextarea(target, props.value, props.defaultValue);
          break a;
        case "select":
          internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
      }
    }
  }
  var isInsideEventHandler = false;
  function batchedUpdates$1(fn, a, b) {
    if (isInsideEventHandler) return fn(a, b);
    isInsideEventHandler = true;
    try {
      var JSCompiler_inline_result = fn(a);
      return JSCompiler_inline_result;
    } finally {
      if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
        if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
          for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
      }
    }
  }
  function getListener(inst, registrationName) {
    var stateNode = inst.stateNode;
    if (null === stateNode) return null;
    var props = stateNode[internalPropsKey] || null;
    if (null === props) return null;
    stateNode = props[registrationName];
    a: switch (registrationName) {
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
        (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
        inst = !props;
        break a;
      default:
        inst = false;
    }
    if (inst) return null;
    if (stateNode && "function" !== typeof stateNode)
      throw Error(
        formatProdErrorMessage(231, registrationName, typeof stateNode)
      );
    return stateNode;
  }
  var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), passiveBrowserEventsSupported = false;
  if (canUseDOM)
    try {
      var options = {};
      Object.defineProperty(options, "passive", {
        get: function() {
          passiveBrowserEventsSupported = true;
        }
      });
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (e) {
      passiveBrowserEventsSupported = false;
    }
  var root = null, startText = null, fallbackText = null;
  function getData() {
    if (fallbackText) return fallbackText;
    var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
    for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
    var minEnd = startLength - start;
    for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
    return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
  }
  function getEventCharCode(nativeEvent) {
    var keyCode = nativeEvent.keyCode;
    "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
    10 === nativeEvent && (nativeEvent = 13);
    return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
  }
  function functionThatReturnsTrue() {
    return true;
  }
  function functionThatReturnsFalse() {
    return false;
  }
  function createSyntheticEvent(Interface) {
    function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
      this._reactName = reactName;
      this._targetInst = targetInst;
      this.type = reactEventType;
      this.nativeEvent = nativeEvent;
      this.target = nativeEventTarget;
      this.currentTarget = null;
      for (var propName in Interface)
        Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
      this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
      this.isPropagationStopped = functionThatReturnsFalse;
      return this;
    }
    assign(SyntheticBaseEvent.prototype, {
      preventDefault: function() {
        this.defaultPrevented = true;
        var event = this.nativeEvent;
        event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
      },
      stopPropagation: function() {
        var event = this.nativeEvent;
        event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
      },
      persist: function() {
      },
      isPersistent: functionThatReturnsTrue
    });
    return SyntheticBaseEvent;
  }
  var EventInterface = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, SyntheticEvent = createSyntheticEvent(EventInterface), UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 }), SyntheticUIEvent = createSyntheticEvent(UIEventInterface), lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = assign({}, UIEventInterface, {
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
    getModifierState: getEventModifierState,
    button: 0,
    buttons: 0,
    relatedTarget: function(event) {
      return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
    },
    movementX: function(event) {
      if ("movementX" in event) return event.movementX;
      event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
      return lastMovementX;
    },
    movementY: function(event) {
      return "movementY" in event ? event.movementY : lastMovementY;
    }
  }), SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface), DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 }), SyntheticDragEvent = createSyntheticEvent(DragEventInterface), FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 }), SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface), AnimationEventInterface = assign({}, EventInterface, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface), ClipboardEventInterface = assign({}, EventInterface, {
    clipboardData: function(event) {
      return "clipboardData" in event ? event.clipboardData : window.clipboardData;
    }
  }), SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface), CompositionEventInterface = assign({}, EventInterface, { data: 0 }), SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface), normalizeKey = {
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
    MozPrintableKey: "Unidentified"
  }, translateToKey = {
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
    224: "Meta"
  }, modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function modifierStateGetter(keyArg) {
    var nativeEvent = this.nativeEvent;
    return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
  }
  function getEventModifierState() {
    return modifierStateGetter;
  }
  var KeyboardEventInterface = assign({}, UIEventInterface, {
    key: function(nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0;
    },
    keyCode: function(event) {
      return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
    },
    which: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
    }
  }), SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface), PointerEventInterface = assign({}, MouseEventInterface, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface), SubmitEventInterface = assign({}, EventInterface, { submitter: 0 }), SyntheticSubmitEvent = createSyntheticEvent(SubmitEventInterface), TouchEventInterface = assign({}, UIEventInterface, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: getEventModifierState
  }), SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface), TransitionEventInterface = assign({}, EventInterface, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface), WheelEventInterface = assign({}, MouseEventInterface, {
    deltaX: function(event) {
      return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
    },
    deltaY: function(event) {
      return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface), ToggleEventInterface = assign({}, EventInterface, {
    newState: 0,
    oldState: 0,
    source: 0
  }), SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface), END_KEYCODES = [9, 13, 27, 32], canUseCompositionEvent = canUseDOM && "CompositionEvent" in window, documentMode = null;
  canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
  var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode, useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode), SPACEBAR_CHAR = String.fromCharCode(32), hasSpaceKeypress = false;
  function isFallbackCompositionEnd(domEventName, nativeEvent) {
    switch (domEventName) {
      case "keyup":
        return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
      case "keydown":
        return 229 !== nativeEvent.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function getDataFromCustomEvent(nativeEvent) {
    nativeEvent = nativeEvent.detail;
    return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
  }
  var isComposing = false;
  function getNativeBeforeInputChars(domEventName, nativeEvent) {
    switch (domEventName) {
      case "compositionend":
        return getDataFromCustomEvent(nativeEvent);
      case "keypress":
        if (32 !== nativeEvent.which) return null;
        hasSpaceKeypress = true;
        return SPACEBAR_CHAR;
      case "textInput":
        return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
      default:
        return null;
    }
  }
  function getFallbackBeforeInputChars(domEventName, nativeEvent) {
    if (isComposing)
      return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
    switch (domEventName) {
      case "paste":
        return null;
      case "keypress":
        if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
          if (nativeEvent.char && 1 < nativeEvent.char.length)
            return nativeEvent.char;
          if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
        }
        return null;
      case "compositionend":
        return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
      default:
        return null;
    }
  }
  var supportedInputTypes = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true
  };
  function isTextInputElement(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
  }
  function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
    restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
    inst = accumulateTwoPhaseListeners(inst, "onChange");
    0 < inst.length && (nativeEvent = new SyntheticEvent(
      "onChange",
      "change",
      null,
      nativeEvent,
      target
    ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
  }
  var activeElement$1 = null, activeElementInst$1 = null;
  function runEventInBatch(dispatchQueue) {
    processDispatchQueue(dispatchQueue, 0);
  }
  function getInstIfValueChanged(targetInst) {
    var targetNode = getNodeFromInstance(targetInst);
    if (updateValueIfChanged(targetNode)) return targetInst;
  }
  function getTargetInstForChangeEvent(domEventName, targetInst) {
    if ("change" === domEventName) return targetInst;
  }
  var isInputEventSupported = false;
  if (canUseDOM) {
    var JSCompiler_inline_result$jscomp$318;
    if (canUseDOM) {
      var isSupported$jscomp$inline_474 = "oninput" in document;
      if (!isSupported$jscomp$inline_474) {
        var element$jscomp$inline_475 = document.createElement("div");
        element$jscomp$inline_475.setAttribute("oninput", "return;");
        isSupported$jscomp$inline_474 = "function" === typeof element$jscomp$inline_475.oninput;
      }
      JSCompiler_inline_result$jscomp$318 = isSupported$jscomp$inline_474;
    } else JSCompiler_inline_result$jscomp$318 = false;
    isInputEventSupported = JSCompiler_inline_result$jscomp$318 && (!document.documentMode || 9 < document.documentMode);
  }
  function stopWatchingForValueChange() {
    activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
  }
  function handlePropertyChange(nativeEvent) {
    if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
      var dispatchQueue = [];
      createAndAccumulateChangeEvent(
        dispatchQueue,
        activeElementInst$1,
        nativeEvent,
        getEventTarget(nativeEvent)
      );
      batchedUpdates$1(runEventInBatch, dispatchQueue);
    }
  }
  function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
    "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
  }
  function getTargetInstForInputEventPolyfill(domEventName) {
    if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
      return getInstIfValueChanged(activeElementInst$1);
  }
  function getTargetInstForClickEvent(domEventName, targetInst) {
    if ("click" === domEventName) return getInstIfValueChanged(targetInst);
  }
  function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
    if ("input" === domEventName || "change" === domEventName)
      return getInstIfValueChanged(targetInst);
  }
  function is(x, y) {
    return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
  }
  var objectIs = "function" === typeof Object.is ? Object.is : is;
  function shallowEqual(objA, objB) {
    if (objectIs(objA, objB)) return true;
    if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
      return false;
    var keysA = Object.keys(objA), keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (keysB = 0; keysB < keysA.length; keysB++) {
      var currentKey = keysA[keysB];
      if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
        return false;
    }
    return true;
  }
  function getActiveElement(doc) {
    doc = doc || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof doc) return null;
    try {
      return doc.activeElement || doc.body;
    } catch (e$20) {
      return doc.body;
    }
  }
  function getLeafNode(node) {
    for (; node && node.firstChild; ) node = node.firstChild;
    return node;
  }
  function getNodeForCharacterOffset(root2, offset) {
    var node = getLeafNode(root2);
    root2 = 0;
    for (var nodeEnd; node; ) {
      if (3 === node.nodeType) {
        nodeEnd = root2 + node.textContent.length;
        if (root2 <= offset && nodeEnd >= offset)
          return { node, offset: offset - root2 };
        root2 = nodeEnd;
      }
      a: {
        for (; node; ) {
          if (node.nextSibling) {
            node = node.nextSibling;
            break a;
          }
          node = node.parentNode;
        }
        node = void 0;
      }
      node = getLeafNode(node);
    }
  }
  function containsNode(outerNode, innerNode) {
    return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
  }
  function getActiveElementDeep(containerInfo) {
    containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
    for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
      try {
        var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
      } catch (err) {
        JSCompiler_inline_result = false;
      }
      if (JSCompiler_inline_result) containerInfo = element.contentWindow;
      else break;
      element = getActiveElement(containerInfo.document);
    }
    return element;
  }
  function hasSelectionCapabilities(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
  }
  var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode, activeElement = null, activeElementInst = null, lastSelection = null, mouseDown = false;
  function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
    var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
    mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
      anchorNode: doc.anchorNode,
      anchorOffset: doc.anchorOffset,
      focusNode: doc.focusNode,
      focusOffset: doc.focusOffset
    }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
      "onSelect",
      "select",
      null,
      nativeEvent,
      nativeEventTarget
    ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
  }
  function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes["Webkit" + styleProp] = "webkit" + eventName;
    prefixes["Moz" + styleProp] = "moz" + eventName;
    return prefixes;
  }
  var vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionrun: makePrefixMap("Transition", "TransitionRun"),
    transitionstart: makePrefixMap("Transition", "TransitionStart"),
    transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  }, prefixedEventNames = {}, style = {};
  canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
  function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
    if (!vendorPrefixes[eventName]) return eventName;
    var prefixMap = vendorPrefixes[eventName], styleProp;
    for (styleProp in prefixMap)
      if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
        return prefixedEventNames[eventName] = prefixMap[styleProp];
    return eventName;
  }
  var ANIMATION_END = getVendorPrefixedEventName("animationend"), ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), ANIMATION_START = getVendorPrefixedEventName("animationstart"), TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"), TRANSITION_START = getVendorPrefixedEventName("transitionstart"), TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"), TRANSITION_END = getVendorPrefixedEventName("transitionend"), topLevelEventsToReactNames = /* @__PURE__ */ new Map(), simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  simpleEventPluginEvents.push("scrollEnd");
  function registerSimpleEvent(domEventName, reactName) {
    topLevelEventsToReactNames.set(domEventName, reactName);
    registerTwoPhaseEvent(reactName, [domEventName]);
  }
  var globalClientIdCounter$1 = 0;
  function getViewTransitionName(props, instance) {
    if (null != props.name && "auto" !== props.name) return props.name;
    if (null !== instance.autoName) return instance.autoName;
    props = pendingEffectsRoot.identifierPrefix;
    var globalClientId = globalClientIdCounter$1++;
    props = "_" + props + "t_" + globalClientId.toString(32) + "_";
    return instance.autoName = props;
  }
  function getClassNameByType(classByType) {
    if (null == classByType || "string" === typeof classByType)
      return classByType;
    var className = null, activeTypes = pendingTransitionTypes;
    if (null !== activeTypes)
      for (var i = 0; i < activeTypes.length; i++) {
        var match = classByType[activeTypes[i]];
        if (null != match) {
          if ("none" === match) return "none";
          className = null == className ? match : className + (" " + match);
        }
      }
    return null == className ? classByType.default : className;
  }
  function getViewTransitionClassName(defaultClass, eventClass) {
    defaultClass = getClassNameByType(defaultClass);
    eventClass = getClassNameByType(eventClass);
    return null == eventClass ? "auto" === defaultClass ? null : defaultClass : "auto" === eventClass ? null : eventClass;
  }
  var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
    if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
      var event = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
        error
      });
      if (!window.dispatchEvent(event)) return;
    } else if ("object" === typeof process && "function" === typeof process.emit) {
      process.emit("uncaughtException", error);
      return;
    }
    console.error(error);
  }, concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0;
  function finishQueueingConcurrentUpdates() {
    for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
      var fiber = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var queue = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var update = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var lane = concurrentQueues[i];
      concurrentQueues[i++] = null;
      if (null !== queue && null !== update) {
        var pending = queue.pending;
        null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
        queue.pending = update;
      }
      0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
    }
  }
  function enqueueUpdate$1(fiber, queue, update, lane) {
    concurrentQueues[concurrentQueuesIndex++] = fiber;
    concurrentQueues[concurrentQueuesIndex++] = queue;
    concurrentQueues[concurrentQueuesIndex++] = update;
    concurrentQueues[concurrentQueuesIndex++] = lane;
    concurrentlyUpdatedLanes |= lane;
    fiber.lanes |= lane;
    fiber = fiber.alternate;
    null !== fiber && (fiber.lanes |= lane);
  }
  function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
    enqueueUpdate$1(fiber, queue, update, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function enqueueConcurrentRenderForLane(fiber, lane) {
    enqueueUpdate$1(fiber, null, null, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
    sourceFiber.lanes |= lane;
    var alternate = sourceFiber.alternate;
    null !== alternate && (alternate.lanes |= lane);
    for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
      parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
    return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
  }
  function getRootForUpdatedFiber(sourceFiber) {
    if (50 < nestedUpdateCount)
      throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
    for (var parent = sourceFiber.return; null !== parent; )
      sourceFiber = parent, parent = sourceFiber.return;
    return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
  }
  var emptyContextObject = {};
  function FiberNode(tag, pendingProps, key, mode) {
    this.tag = tag;
    this.key = key;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.refCleanup = this.ref = null;
    this.pendingProps = pendingProps;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = mode;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function createFiberImplClass(tag, pendingProps, key, mode) {
    return new FiberNode(tag, pendingProps, key, mode);
  }
  function shouldConstruct(Component) {
    Component = Component.prototype;
    return !(!Component || !Component.isReactComponent);
  }
  function createWorkInProgress(current, pendingProps) {
    var workInProgress2 = current.alternate;
    null === workInProgress2 ? (workInProgress2 = createFiberImplClass(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
    workInProgress2.flags = current.flags & 1206910976;
    workInProgress2.childLanes = current.childLanes;
    workInProgress2.lanes = current.lanes;
    workInProgress2.child = current.child;
    workInProgress2.memoizedProps = current.memoizedProps;
    workInProgress2.memoizedState = current.memoizedState;
    workInProgress2.updateQueue = current.updateQueue;
    pendingProps = current.dependencies;
    workInProgress2.dependencies = null === pendingProps ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
    workInProgress2.sibling = current.sibling;
    workInProgress2.index = current.index;
    workInProgress2.ref = current.ref;
    workInProgress2.refCleanup = current.refCleanup;
    return workInProgress2;
  }
  function resetWorkInProgress(workInProgress2, renderLanes2) {
    workInProgress2.flags &= 1206910978;
    var current = workInProgress2.alternate;
    null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
      lanes: renderLanes2.lanes,
      firstContext: renderLanes2.firstContext
    });
    return workInProgress2;
  }
  function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
    var fiberTag = 0;
    owner = type;
    if ("function" === typeof owner) shouldConstruct(owner) && (fiberTag = 1);
    else if ("string" === typeof owner)
      fiberTag = isHostHoistableType(
        type,
        pendingProps,
        contextStackCursor.current
      ) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
    else
      a: switch (owner) {
        case REACT_ACTIVITY_TYPE:
          return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
        case REACT_FRAGMENT_TYPE:
          return createFiberFromFragment(pendingProps.children, mode, lanes, key);
        case REACT_STRICT_MODE_TYPE:
          fiberTag = 8;
          mode |= 24;
          break;
        case REACT_PROFILER_TYPE:
          return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
        case REACT_SUSPENSE_TYPE:
          return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
        case REACT_SUSPENSE_LIST_TYPE:
          return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
        case REACT_LEGACY_HIDDEN_TYPE:
        case REACT_VIEW_TRANSITION_TYPE:
          return type = mode | 32, type = createFiberImplClass(30, pendingProps, key, type), type.elementType = REACT_VIEW_TRANSITION_TYPE, type.lanes = lanes, type.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, type;
        default:
          if ("object" === typeof owner && null !== owner)
            switch (owner.$$typeof) {
              case REACT_CONTEXT_TYPE:
                fiberTag = 10;
                break a;
              case REACT_CONSUMER_TYPE:
                fiberTag = 9;
                break a;
              case REACT_FORWARD_REF_TYPE:
                fiberTag = 11;
                break a;
              case REACT_MEMO_TYPE:
                fiberTag = 14;
                break a;
              case REACT_LAZY_TYPE:
                fiberTag = 16;
                owner = null;
                break a;
            }
          fiberTag = 29;
          pendingProps = Error(
            formatProdErrorMessage(130, null === type ? "null" : typeof type, "")
          );
          owner = null;
      }
    key = createFiberImplClass(fiberTag, pendingProps, key, mode);
    key.elementType = type;
    key.type = owner;
    key.lanes = lanes;
    return key;
  }
  function createFiberFromFragment(elements, mode, lanes, key) {
    elements = createFiberImplClass(7, elements, key, mode);
    elements.lanes = lanes;
    return elements;
  }
  function createFiberFromText(content, mode, lanes) {
    content = createFiberImplClass(6, content, null, mode);
    content.lanes = lanes;
    return content;
  }
  function createFiberFromDehydratedFragment(dehydratedNode) {
    var fiber = createFiberImplClass(18, null, null, 0);
    fiber.stateNode = dehydratedNode;
    return fiber;
  }
  function createFiberFromPortal(portal, mode, lanes) {
    mode = createFiberImplClass(
      4,
      null !== portal.children ? portal.children : [],
      portal.key,
      mode
    );
    mode.lanes = lanes;
    mode.stateNode = {
      containerInfo: portal.containerInfo,
      pendingChildren: null,
      implementation: portal.implementation
    };
    return mode;
  }
  var CapturedStacks = /* @__PURE__ */ new WeakMap();
  function createCapturedValueAtFiber(value, source) {
    if ("object" === typeof value && null !== value) {
      var existing = CapturedStacks.get(value);
      if (void 0 !== existing) return existing;
      source = {
        value,
        source,
        stack: getStackByFiberInDevAndProd(source)
      };
      CapturedStacks.set(value, source);
      return source;
    }
    return {
      value,
      source,
      stack: getStackByFiberInDevAndProd(source)
    };
  }
  var forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "";
  function pushTreeFork(workInProgress2, totalChildren) {
    forkStack[forkStackIndex++] = treeForkCount;
    forkStack[forkStackIndex++] = treeForkProvider;
    treeForkProvider = workInProgress2;
    treeForkCount = totalChildren;
  }
  function pushTreeId(workInProgress2, totalChildren, index2) {
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextProvider = workInProgress2;
    var baseIdWithLeadingBit = treeContextId;
    workInProgress2 = treeContextOverflow;
    var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
    baseIdWithLeadingBit &= ~(1 << baseLength);
    index2 += 1;
    var length = 32 - clz32(totalChildren) + baseLength;
    if (30 < length) {
      var numberOfOverflowBits = baseLength - baseLength % 5;
      length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
      baseIdWithLeadingBit >>= numberOfOverflowBits;
      baseLength -= numberOfOverflowBits;
      treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
      treeContextOverflow = length + workInProgress2;
    } else
      treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
  }
  function pushMaterializedTreeId(workInProgress2) {
    null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
  }
  function popTreeContext(workInProgress2) {
    for (; workInProgress2 === treeForkProvider; )
      treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
    for (; workInProgress2 === treeContextProvider; )
      treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
  }
  function restoreSuspendedTreeContext(workInProgress2, suspendedContext) {
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextId = suspendedContext.id;
    treeContextOverflow = suspendedContext.overflow;
    treeContextProvider = workInProgress2;
  }
  var hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = false, hydrationErrors = null, rootOrSingletonContext = false, HydrationMismatchException = Error(formatProdErrorMessage(519));
  function throwOnHydrationMismatch(fiber) {
    var error = Error(
      formatProdErrorMessage(
        418,
        1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    queueHydrationError(createCapturedValueAtFiber(error, fiber));
    throw HydrationMismatchException;
  }
  function prepareToHydrateHostInstance(fiber) {
    var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
    instance[internalInstanceKey] = fiber;
    instance[internalPropsKey] = props;
    switch (type) {
      case "dialog":
        listenToNonDelegatedEvent("cancel", instance);
        listenToNonDelegatedEvent("close", instance);
        break;
      case "iframe":
      case "object":
      case "embed":
        listenToNonDelegatedEvent("load", instance);
        break;
      case "video":
      case "audio":
        for (type = 0; type < mediaEventTypes.length; type++)
          listenToNonDelegatedEvent(mediaEventTypes[type], instance);
        break;
      case "source":
        listenToNonDelegatedEvent("error", instance);
        break;
      case "img":
      case "image":
      case "link":
        listenToNonDelegatedEvent("error", instance);
        listenToNonDelegatedEvent("load", instance);
        break;
      case "details":
        listenToNonDelegatedEvent("toggle", instance);
        break;
      case "input":
        listenToNonDelegatedEvent("invalid", instance);
        initInput(
          instance,
          props.value,
          props.defaultValue,
          props.checked,
          props.defaultChecked,
          props.type,
          props.name,
          true
        );
        break;
      case "select":
        listenToNonDelegatedEvent("invalid", instance);
        break;
      case "textarea":
        listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
    }
    type = props.children;
    "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = true) : instance = false;
    instance || throwOnHydrationMismatch(fiber, true);
  }
  function popToNextHostParent(fiber) {
    for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
      switch (hydrationParentFiber.tag) {
        case 5:
        case 31:
        case 13:
          rootOrSingletonContext = false;
          return;
        case 27:
        case 3:
          rootOrSingletonContext = true;
          return;
        default:
          hydrationParentFiber = hydrationParentFiber.return;
      }
  }
  function popHydrationState(fiber) {
    if (fiber !== hydrationParentFiber) return false;
    if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
    var tag = fiber.tag, JSCompiler_temp;
    if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
      if (JSCompiler_temp = 5 === tag)
        JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
      JSCompiler_temp = !JSCompiler_temp;
    }
    JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
    popToNextHostParent(fiber);
    if (13 === tag) {
      fiber = fiber.memoizedState;
      fiber = null !== fiber ? fiber.dehydrated : null;
      if (!fiber) throw Error(formatProdErrorMessage(317));
      nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
    } else if (31 === tag) {
      fiber = fiber.memoizedState;
      fiber = null !== fiber ? fiber.dehydrated : null;
      if (!fiber) throw Error(formatProdErrorMessage(317));
      nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
    } else
      27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
    return true;
  }
  function resetHydrationState() {
    nextHydratableInstance = hydrationParentFiber = null;
    isHydrating = false;
  }
  function upgradeHydrationErrorsToRecoverable() {
    var queuedErrors = hydrationErrors;
    null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
      workInProgressRootRecoverableErrors,
      queuedErrors
    ), hydrationErrors = null);
    return queuedErrors;
  }
  function queueHydrationError(error) {
    null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
  }
  var valueCursor = createCursor(null), currentlyRenderingFiber$1 = null, lastContextDependency = null;
  function pushProvider(providerFiber, context, nextValue) {
    push(valueCursor, context._currentValue);
    context._currentValue = nextValue;
  }
  function popProvider(context) {
    context._currentValue = valueCursor.current;
    pop(valueCursor);
  }
  function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
    for (; null !== parent; ) {
      var alternate = parent.alternate;
      (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
      if (parent === propagationRoot) break;
      parent = parent.return;
    }
  }
  function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
    var fiber = workInProgress2.child;
    null !== fiber && (fiber.return = workInProgress2);
    for (; null !== fiber; ) {
      var list = fiber.dependencies;
      if (null !== list) {
        var nextFiber = fiber.child;
        list = list.firstContext;
        a: for (; null !== list; ) {
          var dependency = list;
          list = fiber;
          for (var i = 0; i < contexts.length; i++)
            if (dependency.context === contexts[i]) {
              list.lanes |= renderLanes2;
              dependency = list.alternate;
              null !== dependency && (dependency.lanes |= renderLanes2);
              scheduleContextWorkOnParentPath(
                list.return,
                renderLanes2,
                workInProgress2
              );
              forcePropagateEntireTree || (nextFiber = null);
              break a;
            }
          list = dependency.next;
        }
      } else if (18 === fiber.tag) {
        nextFiber = fiber.return;
        if (null === nextFiber) throw Error(formatProdErrorMessage(341));
        nextFiber.lanes |= renderLanes2;
        list = nextFiber.alternate;
        null !== list && (list.lanes |= renderLanes2);
        scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
        nextFiber = null;
      } else
        13 === fiber.tag && null !== fiber.memoizedState && null === fiber.memoizedState.dehydrated ? (fiber.lanes |= renderLanes2, nextFiber = fiber.alternate, null !== nextFiber && (nextFiber.lanes |= renderLanes2), scheduleContextWorkOnParentPath(
          fiber.return,
          renderLanes2,
          workInProgress2
        ), nextFiber = fiber.child, nextFiber = null !== nextFiber ? nextFiber.sibling : null) : nextFiber = fiber.child;
      if (null !== nextFiber) nextFiber.return = fiber;
      else
        for (nextFiber = fiber; null !== nextFiber; ) {
          if (nextFiber === workInProgress2) {
            nextFiber = null;
            break;
          }
          fiber = nextFiber.sibling;
          if (null !== fiber) {
            fiber.return = nextFiber.return;
            nextFiber = fiber;
            break;
          }
          nextFiber = nextFiber.return;
        }
      fiber = nextFiber;
    }
  }
  function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
    current = null;
    for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
      if (!isInsidePropagationBailout) {
        if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
        else if (0 !== (parent.flags & 262144)) break;
      }
      if (10 === parent.tag) {
        var currentParent = parent.alternate;
        if (null === currentParent) throw Error(formatProdErrorMessage(387));
        currentParent = currentParent.memoizedProps;
        if (null !== currentParent) {
          var context = parent.type;
          objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
        }
      } else if (parent === hostTransitionProviderCursor.current) {
        currentParent = parent.alternate;
        if (null === currentParent) throw Error(formatProdErrorMessage(387));
        currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
      }
      parent = parent.return;
    }
    null !== current && propagateContextChanges(
      workInProgress2,
      current,
      renderLanes2,
      forcePropagateEntireTree
    );
    workInProgress2.flags |= 262144;
    return null !== current;
  }
  function checkIfContextChanged(currentDependencies) {
    for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
      if (!objectIs(
        currentDependencies.context._currentValue,
        currentDependencies.memoizedValue
      ))
        return true;
      currentDependencies = currentDependencies.next;
    }
    return false;
  }
  function prepareToReadContext(workInProgress2) {
    currentlyRenderingFiber$1 = workInProgress2;
    lastContextDependency = null;
    workInProgress2 = workInProgress2.dependencies;
    null !== workInProgress2 && (workInProgress2.firstContext = null);
  }
  function readContext(context) {
    return readContextForConsumer(currentlyRenderingFiber$1, context);
  }
  function readContextDuringReconciliation(consumer, context) {
    null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
    return readContextForConsumer(consumer, context);
  }
  function readContextForConsumer(consumer, context) {
    var value = context._currentValue;
    context = { context, memoizedValue: value, next: null };
    if (null === lastContextDependency) {
      if (null === consumer) throw Error(formatProdErrorMessage(308));
      lastContextDependency = context;
      consumer.dependencies = { lanes: 0, firstContext: context };
      consumer.flags |= 524288;
    } else lastContextDependency = lastContextDependency.next = context;
    return value;
  }
  var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
    var listeners = [], signal = this.signal = {
      aborted: false,
      addEventListener: function(type, listener) {
        listeners.push(listener);
      }
    };
    this.abort = function() {
      signal.aborted = true;
      listeners.forEach(function(listener) {
        return listener();
      });
    };
  }, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
    $$typeof: REACT_CONTEXT_TYPE,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function createCache() {
    return {
      controller: new AbortControllerLocal(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function releaseCache(cache) {
    cache.refCount--;
    0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
      cache.controller.abort();
    });
  }
  function queueTransitionTypes(root2, transitionTypes) {
    if (0 !== (root2.pendingLanes & 4194048)) {
      var queued = root2.transitionTypes;
      null === queued && (queued = root2.transitionTypes = []);
      for (root2 = 0; root2 < transitionTypes.length; root2++) {
        var transitionType = transitionTypes[root2];
        -1 === queued.indexOf(transitionType) && queued.push(transitionType);
      }
    }
  }
  var entangledTransitionTypes = null;
  function claimQueuedTransitionTypes(root2) {
    var claimed = root2.transitionTypes;
    root2.transitionTypes = null;
    return claimed;
  }
  var currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null;
  function entangleAsyncAction(transition, thenable) {
    if (null === currentEntangledListeners) {
      var entangledListeners = currentEntangledListeners = [];
      currentEntangledPendingCount = 0;
      currentEntangledLane = requestTransitionLane();
      currentEntangledActionThenable = {
        status: "pending",
        value: void 0,
        then: function(resolve) {
          entangledListeners.push(resolve);
        }
      };
    }
    currentEntangledPendingCount++;
    thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
    return thenable;
  }
  function pingEngtangledActionScope() {
    if (0 === --currentEntangledPendingCount && (entangledTransitionTypes = null, null !== currentEntangledListeners)) {
      null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
      var listeners = currentEntangledListeners;
      currentEntangledListeners = null;
      currentEntangledLane = 0;
      currentEntangledActionThenable = null;
      for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
    }
  }
  function chainThenableValue(thenable, result) {
    var listeners = [], thenableWithOverride = {
      status: "pending",
      value: null,
      reason: null,
      then: function(resolve) {
        listeners.push(resolve);
      }
    };
    thenable.then(
      function() {
        thenableWithOverride.status = "fulfilled";
        thenableWithOverride.value = result;
        for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
      },
      function(error) {
        thenableWithOverride.status = "rejected";
        thenableWithOverride.reason = error;
        for (error = 0; error < listeners.length; error++)
          (0, listeners[error])(void 0);
      }
    );
    return thenableWithOverride;
  }
  var prevOnStartTransitionFinish = ReactSharedInternals.S;
  ReactSharedInternals.S = function(transition, returnValue) {
    globalMostRecentTransitionTime = now2();
    "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
    if (null !== entangledTransitionTypes)
      for (var root$28 = firstScheduledRoot; null !== root$28; )
        queueTransitionTypes(root$28, entangledTransitionTypes), root$28 = root$28.next;
    root$28 = transition.types;
    if (null !== root$28) {
      for (var root$29 = firstScheduledRoot; null !== root$29; )
        queueTransitionTypes(root$29, root$28), root$29 = root$29.next;
      if (0 !== currentEntangledLane) {
        root$29 = entangledTransitionTypes;
        null === root$29 && (root$29 = entangledTransitionTypes = []);
        for (var i = 0; i < root$28.length; i++) {
          var transitionType = root$28[i];
          -1 === root$29.indexOf(transitionType) && root$29.push(transitionType);
        }
      }
    }
    null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
  };
  var resumedCache = createCursor(null);
  function peekCacheFromPool() {
    var cacheResumedFromPreviousRender = resumedCache.current;
    return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
  }
  function pushTransition(offscreenWorkInProgress, prevCachePool) {
    null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
  }
  function getSuspendedCache() {
    var cacheFromPool = peekCacheFromPool();
    return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
  }
  var SuspenseException = Error(formatProdErrorMessage(460)), SuspenseyCommitException = Error(formatProdErrorMessage(474)), SuspenseActionException = Error(formatProdErrorMessage(542)), noopSuspenseyCommitThenable = { then: function() {
  } };
  function isThenableResolved(thenable) {
    thenable = thenable.status;
    return "fulfilled" === thenable || "rejected" === thenable;
  }
  function trackUsedThenable(thenableState2, thenable, index2) {
    index2 = thenableState2[index2];
    void 0 === index2 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$1, noop$1), thenable = index2);
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        thenableState2 = thenable.reason;
        checkIfUseWrappedInAsyncCatch(thenableState2);
        if (void 0 === thenableState2 && !("reason" in thenable))
          throw Error(formatProdErrorMessage(600));
        throw thenableState2;
      default:
        if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
        else {
          thenableState2 = workInProgressRoot;
          if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
            throw Error(formatProdErrorMessage(482));
          thenableState2 = thenable;
          thenableState2.status = "pending";
          thenableState2.then(
            function(fulfilledValue) {
              if ("pending" === thenable.status) {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            },
            function(error) {
              if ("pending" === thenable.status) {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            }
          );
        }
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
        }
        suspendedThenable = thenable;
        throw SuspenseException;
    }
  }
  function resolveLazy(lazyType) {
    try {
      var init = lazyType._init;
      return init(lazyType._payload);
    } catch (x) {
      if (null !== x && "object" === typeof x && "function" === typeof x.then)
        throw suspendedThenable = x, SuspenseException;
      throw x;
    }
  }
  var suspendedThenable = null;
  function getSuspendedThenable() {
    if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
    var thenable = suspendedThenable;
    suspendedThenable = null;
    return thenable;
  }
  function checkIfUseWrappedInAsyncCatch(rejectedReason) {
    if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
      throw Error(formatProdErrorMessage(483));
  }
  var thenableState$1 = null, thenableIndexCounter$1 = 0;
  function unwrapThenable(thenable) {
    var index2 = thenableIndexCounter$1;
    thenableIndexCounter$1 += 1;
    null === thenableState$1 && (thenableState$1 = []);
    return trackUsedThenable(thenableState$1, thenable, index2);
  }
  function coerceRef(workInProgress2, element) {
    element = element.props.ref;
    workInProgress2.ref = void 0 !== element ? element : null;
  }
  function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
    if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
      throw Error(formatProdErrorMessage(525));
    returnFiber = Object.prototype.toString.call(newChild);
    throw Error(
      formatProdErrorMessage(
        31,
        "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
      )
    );
  }
  function createChildReconciler(shouldTrackSideEffects) {
    function deleteChild(returnFiber, childToDelete) {
      if (shouldTrackSideEffects) {
        var deletions = returnFiber.deletions;
        null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
      }
    }
    function deleteRemainingChildren(returnFiber, currentFirstChild) {
      if (!shouldTrackSideEffects) return null;
      for (; null !== currentFirstChild; )
        deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      return null;
    }
    function mapRemainingChildren(currentFirstChild) {
      for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
        null === currentFirstChild.key ? existingChildren.set(currentFirstChild.index, currentFirstChild) : existingChildren.set(currentFirstChild.key, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      return existingChildren;
    }
    function useFiber(fiber, pendingProps) {
      fiber = createWorkInProgress(fiber, pendingProps);
      fiber.index = 0;
      fiber.sibling = null;
      return fiber;
    }
    function placeChild(newFiber, lastPlacedIndex, newIndex) {
      newFiber.index = newIndex;
      if (!shouldTrackSideEffects)
        return newFiber.flags |= 1048576, lastPlacedIndex;
      newIndex = newFiber.alternate;
      if (null !== newIndex)
        return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 2, lastPlacedIndex) : newIndex;
      newFiber.flags |= 134217730;
      return lastPlacedIndex;
    }
    function placeSingleChild(newFiber) {
      shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 134217730);
      return newFiber;
    }
    function updateTextNode(returnFiber, current, textContent, lanes) {
      if (null === current || 6 !== current.tag)
        return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
      current = useFiber(current, textContent);
      current.return = returnFiber;
      return current;
    }
    function updateElement(returnFiber, current, element, lanes) {
      var elementType = element.type;
      if (elementType === REACT_FRAGMENT_TYPE)
        return returnFiber = updateFragment(
          returnFiber,
          current,
          element.props.children,
          lanes,
          element.key
        ), coerceRef(returnFiber, element), returnFiber;
      if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
        return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
      current = createFiberFromTypeAndProps(
        element.type,
        element.key,
        element.props,
        null,
        returnFiber.mode,
        lanes
      );
      coerceRef(current, element);
      current.return = returnFiber;
      return current;
    }
    function updatePortal(returnFiber, current, portal, lanes) {
      if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
        return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
      current = useFiber(current, portal.children || []);
      current.return = returnFiber;
      return current;
    }
    function updateFragment(returnFiber, current, fragment, lanes, key) {
      if (null === current || 7 !== current.tag)
        return current = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          lanes,
          key
        ), current.return = returnFiber, current;
      current = useFiber(current, fragment);
      current.return = returnFiber;
      return current;
    }
    function createChild(returnFiber, newChild, lanes) {
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          lanes
        ), newChild.return = returnFiber, newChild;
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return lanes = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              lanes
            ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
          case REACT_PORTAL_TYPE:
            return newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              lanes
            ), newChild.return = returnFiber, newChild;
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            lanes,
            null
          ), newChild.return = returnFiber, newChild;
        if ("function" === typeof newChild.then)
          return createChild(returnFiber, unwrapThenable(newChild), lanes);
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return createChild(
            returnFiber,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function updateSlot(returnFiber, oldFiber, newChild, lanes) {
      var key = null !== oldFiber ? oldFiber.key : null;
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
          case REACT_PORTAL_TYPE:
            return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
        if ("function" === typeof newChild.then)
          return updateSlot(
            returnFiber,
            oldFiber,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return updateSlot(
            returnFiber,
            oldFiber,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return existingChildren = existingChildren.get(
              null === newChild.key ? newIdx : newChild.key
            ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
          case REACT_PORTAL_TYPE:
            return existingChildren = existingChildren.get(
              null === newChild.key ? newIdx : newChild.key
            ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), updateFromMap(
              existingChildren,
              returnFiber,
              newIdx,
              newChild,
              lanes
            );
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
        if ("function" === typeof newChild.then)
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
      for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(
          returnFiber,
          oldFiber,
          newChildren[newIdx],
          lanes
        );
        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (newIdx === newChildren.length)
        return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (null === oldFiber) {
        for (; newIdx < newChildren.length; newIdx++)
          oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
            oldFiber,
            currentFirstChild,
            newIdx
          ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
        nextOldFiber = updateFromMap(
          oldFiber,
          returnFiber,
          newIdx,
          newChildren[newIdx],
          lanes
        ), null !== nextOldFiber && (shouldTrackSideEffects && (newFiber = nextOldFiber.alternate, null !== newFiber && oldFiber.delete(null === newFiber.key ? newIdx : newFiber.key)), currentFirstChild = placeChild(
          nextOldFiber,
          currentFirstChild,
          newIdx
        ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
      shouldTrackSideEffects && oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
      if (null == newChildren) throw Error(formatProdErrorMessage(151));
      for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (step.done)
        return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (null === oldFiber) {
        for (; !step.done; newIdx++, step = newChildren.next())
          step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
        step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && (nextOldFiber = step.alternate, null !== nextOldFiber && oldFiber.delete(
          null === nextOldFiber.key ? newIdx : nextOldFiber.key
        )), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
      shouldTrackSideEffects && oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
      "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && void 0 === newChild.props.ref && (newChild = newChild.props.children);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            a: {
              for (var key = newChild.key; null !== currentFirstChild; ) {
                if (currentFirstChild.key === key) {
                  key = newChild.type;
                  if (key === REACT_FRAGMENT_TYPE) {
                    if (7 === currentFirstChild.tag) {
                      deleteRemainingChildren(
                        returnFiber,
                        currentFirstChild.sibling
                      );
                      lanes = useFiber(
                        currentFirstChild,
                        newChild.props.children
                      );
                      coerceRef(lanes, newChild);
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    }
                  } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                    deleteRemainingChildren(
                      returnFiber,
                      currentFirstChild.sibling
                    );
                    lanes = useFiber(currentFirstChild, newChild.props);
                    coerceRef(lanes, newChild);
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                    break a;
                  }
                  deleteRemainingChildren(returnFiber, currentFirstChild);
                  break;
                } else deleteChild(returnFiber, currentFirstChild);
                currentFirstChild = currentFirstChild.sibling;
              }
              newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                newChild.props.children,
                returnFiber.mode,
                lanes,
                newChild.key
              ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
                newChild.type,
                newChild.key,
                newChild.props,
                null,
                returnFiber.mode,
                lanes
              ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
            }
            return placeSingleChild(returnFiber);
          case REACT_PORTAL_TYPE:
            a: {
              for (key = newChild.key; null !== currentFirstChild; ) {
                if (currentFirstChild.key === key)
                  if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                    deleteRemainingChildren(
                      returnFiber,
                      currentFirstChild.sibling
                    );
                    lanes = useFiber(currentFirstChild, newChild.children || []);
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                    break a;
                  } else {
                    deleteRemainingChildren(returnFiber, currentFirstChild);
                    break;
                  }
                else deleteChild(returnFiber, currentFirstChild);
                currentFirstChild = currentFirstChild.sibling;
              }
              lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
              lanes.return = returnFiber;
              returnFiber = lanes;
            }
            return placeSingleChild(returnFiber);
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
        }
        if (isArrayImpl(newChild))
          return reconcileChildrenArray(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
        if (getIteratorFn(newChild)) {
          key = getIteratorFn(newChild);
          if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
          newChild = key.call(newChild);
          return reconcileChildrenIterator(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
        }
        if ("function" === typeof newChild.then)
          return reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
    }
    return function(returnFiber, currentFirstChild, newChild, lanes) {
      try {
        thenableIndexCounter$1 = 0;
        var firstChildFiber = reconcileChildFibersImpl(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes
        );
        thenableState$1 = null;
        return firstChildFiber;
      } catch (x) {
        if (x === SuspenseException || x === SuspenseActionException) throw x;
        var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
        fiber.lanes = lanes;
        fiber.return = returnFiber;
        return fiber;
      } finally {
      }
    };
  }
  var reconcileChildFibers = createChildReconciler(true), mountChildFibers = createChildReconciler(false), hasForceUpdate = false;
  function initializeUpdateQueue(fiber) {
    fiber.updateQueue = {
      baseState: fiber.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function cloneUpdateQueue(current, workInProgress2) {
    current = current.updateQueue;
    workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
      baseState: current.baseState,
      firstBaseUpdate: current.firstBaseUpdate,
      lastBaseUpdate: current.lastBaseUpdate,
      shared: current.shared,
      callbacks: null
    });
  }
  function createUpdate(lane) {
    return { lane, tag: 0, payload: null, callback: null, next: null };
  }
  function enqueueUpdate(fiber, update, lane) {
    var updateQueue = fiber.updateQueue;
    if (null === updateQueue) return null;
    updateQueue = updateQueue.shared;
    if (0 !== (executionContext & 2)) {
      var pending = updateQueue.pending;
      null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
      updateQueue.pending = update;
      update = getRootForUpdatedFiber(fiber);
      markUpdateLaneFromFiberToRoot(fiber, null, lane);
      return update;
    }
    enqueueUpdate$1(fiber, updateQueue, update, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function entangleTransitions(root2, fiber, lane) {
    fiber = fiber.updateQueue;
    if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
      var queueLanes = fiber.lanes;
      queueLanes &= root2.pendingLanes;
      lane |= queueLanes;
      fiber.lanes = lane;
      markRootEntangled(root2, lane);
    }
  }
  function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
    var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
    if (null !== current && (current = current.updateQueue, queue === current)) {
      var newFirst = null, newLast = null;
      queue = queue.firstBaseUpdate;
      if (null !== queue) {
        do {
          var clone = {
            lane: queue.lane,
            tag: queue.tag,
            payload: queue.payload,
            callback: null,
            next: null
          };
          null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
          queue = queue.next;
        } while (null !== queue);
        null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
      } else newFirst = newLast = capturedUpdate;
      queue = {
        baseState: current.baseState,
        firstBaseUpdate: newFirst,
        lastBaseUpdate: newLast,
        shared: current.shared,
        callbacks: current.callbacks
      };
      workInProgress2.updateQueue = queue;
      return;
    }
    workInProgress2 = queue.lastBaseUpdate;
    null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
    queue.lastBaseUpdate = capturedUpdate;
  }
  var didReadFromEntangledAsyncAction = false;
  function suspendIfUpdateReadFromEntangledAsyncAction() {
    if (didReadFromEntangledAsyncAction) {
      var entangledActionThenable = currentEntangledActionThenable;
      if (null !== entangledActionThenable) throw entangledActionThenable;
    }
  }
  function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
    didReadFromEntangledAsyncAction = false;
    var queue = workInProgress$jscomp$0.updateQueue;
    hasForceUpdate = false;
    var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
    if (null !== pendingQueue) {
      queue.shared.pending = null;
      var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
      lastPendingUpdate.next = null;
      null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
      lastBaseUpdate = lastPendingUpdate;
      var current = workInProgress$jscomp$0.alternate;
      null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
    }
    if (null !== firstBaseUpdate) {
      var newState = queue.baseState;
      lastBaseUpdate = 0;
      current = firstPendingUpdate = lastPendingUpdate = null;
      pendingQueue = firstBaseUpdate;
      do {
        var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
        if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
          0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
          null !== current && (current = current.next = {
            lane: 0,
            tag: pendingQueue.tag,
            payload: pendingQueue.payload,
            callback: null,
            next: null
          });
          a: {
            var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
            updateLane = props;
            var instance = instance$jscomp$0;
            switch (update.tag) {
              case 1:
                workInProgress2 = update.payload;
                if ("function" === typeof workInProgress2) {
                  newState = workInProgress2.call(instance, newState, updateLane);
                  break a;
                }
                newState = workInProgress2;
                break a;
              case 3:
                workInProgress2.flags = workInProgress2.flags & -65537 | 128;
              case 0:
                workInProgress2 = update.payload;
                updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
                if (null === updateLane || void 0 === updateLane) break a;
                newState = assign({}, newState, updateLane);
                break a;
              case 2:
                hasForceUpdate = true;
            }
          }
          updateLane = pendingQueue.callback;
          null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
        } else
          isHiddenUpdate = {
            lane: updateLane,
            tag: pendingQueue.tag,
            payload: pendingQueue.payload,
            callback: pendingQueue.callback,
            next: null
          }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
        pendingQueue = pendingQueue.next;
        if (null === pendingQueue)
          if (pendingQueue = queue.shared.pending, null === pendingQueue)
            break;
          else
            isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
      } while (1);
      null === current && (lastPendingUpdate = newState);
      queue.baseState = lastPendingUpdate;
      queue.firstBaseUpdate = firstPendingUpdate;
      queue.lastBaseUpdate = current;
      null === firstBaseUpdate && (queue.shared.lanes = 0);
      workInProgressRootSkippedLanes |= lastBaseUpdate;
      workInProgress$jscomp$0.lanes = lastBaseUpdate;
      workInProgress$jscomp$0.memoizedState = newState;
    }
  }
  function callCallback(callback, context) {
    if ("function" !== typeof callback)
      throw Error(formatProdErrorMessage(191, callback));
    callback.call(context);
  }
  function commitCallbacks(updateQueue, context) {
    var callbacks = updateQueue.callbacks;
    if (null !== callbacks)
      for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
        callCallback(callbacks[updateQueue], context);
  }
  var currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0);
  function pushHiddenContext(fiber, context) {
    fiber = entangledRenderLanes;
    push(prevEntangledRenderLanesCursor, fiber);
    push(currentTreeHiddenStackCursor, context);
    entangledRenderLanes = fiber | context.baseLanes;
  }
  function reuseHiddenContextOnStack() {
    push(prevEntangledRenderLanesCursor, entangledRenderLanes);
    push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
  }
  function popHiddenContext() {
    entangledRenderLanes = prevEntangledRenderLanesCursor.current;
    pop(currentTreeHiddenStackCursor);
    pop(prevEntangledRenderLanesCursor);
  }
  var suspenseHandlerStackCursor = createCursor(null), shellBoundary = null;
  function pushPrimaryTreeSuspenseHandler(handler) {
    var current = handler.alternate;
    push(suspenseStackCursor, suspenseStackCursor.current & 1);
    push(suspenseHandlerStackCursor, handler);
    null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
  }
  function pushDehydratedActivitySuspenseHandler(fiber) {
    push(suspenseStackCursor, suspenseStackCursor.current);
    push(suspenseHandlerStackCursor, fiber);
    null === shellBoundary && (shellBoundary = fiber);
  }
  function pushOffscreenSuspenseHandler(fiber) {
    22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
  }
  function reuseSuspenseHandlerOnStack() {
    push(suspenseStackCursor, suspenseStackCursor.current);
    push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
  }
  function popSuspenseHandler(fiber) {
    pop(suspenseHandlerStackCursor);
    shellBoundary === fiber && (shellBoundary = null);
    pop(suspenseStackCursor);
  }
  var suspenseStackCursor = createCursor(0);
  function pushSuspenseListContext(fiber, newContext) {
    push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
    push(suspenseStackCursor, newContext);
  }
  function popSuspenseListContext(fiber) {
    pop(suspenseStackCursor);
    pop(suspenseHandlerStackCursor);
    shellBoundary === fiber && (shellBoundary = null);
  }
  function findFirstSuspended(row) {
    for (var node = row; null !== node; ) {
      if (13 === node.tag) {
        var state = node.memoizedState;
        if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
          return node;
      } else if (19 === node.tag && "independent" !== node.memoizedProps.revealOrder) {
        if (0 !== (node.flags & 128)) return node;
      } else if (null !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === row) break;
      for (; null === node.sibling; ) {
        if (null === node.return || node.return === row) return null;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
    return null;
  }
  var renderLanes = 0, currentlyRenderingFiber = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = false, didScheduleRenderPhaseUpdateDuringThisPass = false, shouldDoubleInvokeUserFnsInHooksDEV = false, localIdCounter = 0, thenableIndexCounter = 0, thenableState = null, globalClientIdCounter = 0;
  function throwInvalidHookError() {
    throw Error(formatProdErrorMessage(321));
  }
  function areHookInputsEqual(nextDeps, prevDeps) {
    if (null === prevDeps) return false;
    for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
      if (!objectIs(nextDeps[i], prevDeps[i])) return false;
    return true;
  }
  function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
    renderLanes = nextRenderLanes;
    currentlyRenderingFiber = workInProgress2;
    workInProgress2.memoizedState = null;
    workInProgress2.updateQueue = null;
    workInProgress2.lanes = 0;
    ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
    shouldDoubleInvokeUserFnsInHooksDEV = false;
    nextRenderLanes = Component(props, secondArg);
    shouldDoubleInvokeUserFnsInHooksDEV = false;
    didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
      workInProgress2,
      Component,
      props,
      secondArg
    ));
    finishRenderingHooks(current);
    return nextRenderLanes;
  }
  function finishRenderingHooks(current) {
    ReactSharedInternals.H = ContextOnlyDispatcher;
    var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
    renderLanes = 0;
    workInProgressHook = currentHook = currentlyRenderingFiber = null;
    didScheduleRenderPhaseUpdate = false;
    thenableIndexCounter = 0;
    thenableState = null;
    if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
    null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
  }
  function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
    currentlyRenderingFiber = workInProgress2;
    var numberOfReRenders = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
      thenableIndexCounter = 0;
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
      numberOfReRenders += 1;
      workInProgressHook = currentHook = null;
      if (null != workInProgress2.updateQueue) {
        var children = workInProgress2.updateQueue;
        children.lastEffect = null;
        children.events = null;
        children.stores = null;
        null != children.memoCache && (children.memoCache.index = 0);
      }
      ReactSharedInternals.H = HooksDispatcherOnRerender;
      children = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
    return children;
  }
  function TransitionAwareHostComponent() {
    var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
    maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
    dispatcher = dispatcher.useState()[0];
    (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
    return maybeThenable;
  }
  function checkDidRenderIdHook() {
    var didRenderIdHook = 0 !== localIdCounter;
    localIdCounter = 0;
    return didRenderIdHook;
  }
  function bailoutHooks(current, workInProgress2, lanes) {
    workInProgress2.updateQueue = current.updateQueue;
    workInProgress2.flags &= -2053;
    current.lanes &= ~lanes;
  }
  function resetHooksOnUnwind(workInProgress2) {
    if (didScheduleRenderPhaseUpdate) {
      for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
        var queue = workInProgress2.queue;
        null !== queue && (queue.pending = null);
        workInProgress2 = workInProgress2.next;
      }
      didScheduleRenderPhaseUpdate = false;
    }
    renderLanes = 0;
    workInProgressHook = currentHook = currentlyRenderingFiber = null;
    didScheduleRenderPhaseUpdateDuringThisPass = false;
    thenableIndexCounter = localIdCounter = 0;
    thenableState = null;
  }
  function mountWorkInProgressHook() {
    var hook = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
    return workInProgressHook;
  }
  function updateWorkInProgressHook() {
    if (null === currentHook) {
      var nextCurrentHook = currentlyRenderingFiber.alternate;
      nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
    } else nextCurrentHook = currentHook.next;
    var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
    if (null !== nextWorkInProgressHook)
      workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
    else {
      if (null === nextCurrentHook) {
        if (null === currentlyRenderingFiber.alternate)
          throw Error(formatProdErrorMessage(467));
        throw Error(formatProdErrorMessage(310));
      }
      currentHook = nextCurrentHook;
      nextCurrentHook = {
        memoizedState: currentHook.memoizedState,
        baseState: currentHook.baseState,
        baseQueue: currentHook.baseQueue,
        queue: currentHook.queue,
        next: null
      };
      null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
    }
    return workInProgressHook;
  }
  function createFunctionComponentUpdateQueue() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function useThenable(thenable) {
    var index2 = thenableIndexCounter;
    thenableIndexCounter += 1;
    null === thenableState && (thenableState = []);
    thenable = trackUsedThenable(thenableState, thenable, index2);
    index2 = currentlyRenderingFiber;
    null === (null === workInProgressHook ? index2.memoizedState : workInProgressHook.next) && (index2 = index2.alternate, ReactSharedInternals.H = null === index2 || null === index2.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
    return thenable;
  }
  function use(usable) {
    if (null !== usable && "object" === typeof usable) {
      if ("function" === typeof usable.then) return useThenable(usable);
      if (usable.$$typeof === REACT_RECOVERABLE_TYPE) return;
      if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
    }
    throw Error(formatProdErrorMessage(438, String(usable)));
  }
  function useMemoCache(size) {
    var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
    null !== updateQueue && (memoCache = updateQueue.memoCache);
    if (null == memoCache) {
      var current = currentlyRenderingFiber.alternate;
      null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
        data: current.data.map(function(array) {
          return array.slice();
        }),
        index: 0
      })));
    }
    null == memoCache && (memoCache = { data: [], index: 0 });
    null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
    updateQueue.memoCache = memoCache;
    updateQueue = memoCache.data[memoCache.index];
    if (void 0 === updateQueue)
      for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
        updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
    memoCache.index++;
    return updateQueue;
  }
  function basicStateReducer(state, action) {
    return "function" === typeof action ? action(state) : action;
  }
  function updateReducer(reducer) {
    var hook = updateWorkInProgressHook();
    return updateReducerImpl(hook, currentHook, reducer);
  }
  function updateReducerImpl(hook, current, reducer) {
    var queue = hook.queue;
    if (null === queue) throw Error(formatProdErrorMessage(311));
    queue.lastRenderedReducer = reducer;
    var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
    if (null !== pendingQueue) {
      if (null !== baseQueue) {
        var baseFirst = baseQueue.next;
        baseQueue.next = pendingQueue.next;
        pendingQueue.next = baseFirst;
      }
      current.baseQueue = baseQueue = pendingQueue;
      queue.pending = null;
    }
    pendingQueue = hook.baseState;
    if (null === baseQueue) hook.memoizedState = pendingQueue;
    else {
      current = baseQueue.next;
      var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$64 = false;
      do {
        var updateLane = update.lane & -536870913;
        if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
          var revertLane = update.revertLane;
          if (0 === revertLane)
            null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
          else if ((renderLanes & revertLane) === revertLane) {
            update = update.next;
            revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
            continue;
          } else
            updateLane = {
              lane: 0,
              revertLane: update.revertLane,
              gesture: null,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
          updateLane = update.action;
          shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
          pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
        } else
          revertLane = {
            lane: updateLane,
            revertLane: update.revertLane,
            gesture: update.gesture,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null
          }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
        update = update.next;
      } while (null !== update && update !== current);
      null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
      if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$64 && (reducer = currentEntangledActionThenable, null !== reducer)))
        throw reducer;
      hook.memoizedState = pendingQueue;
      hook.baseState = baseFirst;
      hook.baseQueue = newBaseQueueLast;
      queue.lastRenderedState = pendingQueue;
    }
    null === baseQueue && (queue.lanes = 0);
    return [hook.memoizedState, queue.dispatch];
  }
  function rerenderReducer(reducer) {
    var hook = updateWorkInProgressHook(), queue = hook.queue;
    if (null === queue) throw Error(formatProdErrorMessage(311));
    queue.lastRenderedReducer = reducer;
    var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
    if (null !== lastRenderPhaseUpdate) {
      queue.pending = null;
      var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      do
        newState = reducer(newState, update.action), update = update.next;
      while (update !== lastRenderPhaseUpdate);
      objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
      hook.memoizedState = newState;
      null === hook.baseQueue && (hook.baseState = newState);
      queue.lastRenderedState = newState;
    }
    return [newState, dispatch];
  }
  function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
    var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
    if (isHydrating$jscomp$0) {
      if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
      getServerSnapshot = getServerSnapshot();
    } else getServerSnapshot = getSnapshot();
    var snapshotChanged = !objectIs(
      (currentHook || hook).memoizedState,
      getServerSnapshot
    );
    snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
    hook = hook.queue;
    updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
      subscribe
    ]);
    subscribe = hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && 0 !== (workInProgressHook.memoizedState.tag & 1);
    pushSimpleEffect(
      subscribe ? 9 : 8,
      { destroy: void 0 },
      updateStoreInstance.bind(null, fiber, hook, getServerSnapshot, getSnapshot),
      null
    );
    if (subscribe) {
      fiber.flags |= 2048;
      if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
      isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
    }
    return getServerSnapshot;
  }
  function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
    fiber.flags |= 16384;
    fiber = { getSnapshot, value: renderedSnapshot };
    getSnapshot = currentlyRenderingFiber.updateQueue;
    null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
  }
  function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
    inst.value = nextSnapshot;
    inst.getSnapshot = getSnapshot;
    checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
  }
  function subscribeToStore(fiber, inst, subscribe) {
    return subscribe(function() {
      checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
    });
  }
  function checkIfSnapshotChanged(inst) {
    var latestGetSnapshot = inst.getSnapshot;
    inst = inst.value;
    try {
      var nextValue = latestGetSnapshot();
      return !objectIs(inst, nextValue);
    } catch (error) {
      return true;
    }
  }
  function forceStoreRerender(fiber) {
    var root2 = enqueueConcurrentRenderForLane(fiber, 2);
    null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
  }
  function mountStateImpl(initialState) {
    var hook = mountWorkInProgressHook();
    if ("function" === typeof initialState) {
      var initialStateInitializer = initialState;
      initialState = initialStateInitializer();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          initialStateInitializer();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
    }
    hook.memoizedState = hook.baseState = initialState;
    hook.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: initialState
    };
    return hook;
  }
  function updateOptimisticImpl(hook, current, passthrough, reducer) {
    hook.baseState = passthrough;
    return updateReducerImpl(
      hook,
      currentHook,
      "function" === typeof reducer ? reducer : basicStateReducer
    );
  }
  function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
    if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
    fiber = actionQueue.action;
    if (null !== fiber) {
      var actionNode = {
        payload,
        action: fiber,
        next: null,
        isTransition: true,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(listener) {
          actionNode.listeners.push(listener);
        }
      };
      null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
      setState(actionNode);
      setPendingState = actionQueue.pending;
      null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
    }
  }
  function runActionStateAction(actionQueue, node) {
    var action = node.action, payload = node.payload, prevState = actionQueue.state;
    if (node.isTransition) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      currentTransition.types = null !== prevTransition ? prevTransition.types : null;
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        handleActionReturnValue(actionQueue, node, returnValue);
      } catch (error) {
        onActionError(actionQueue, node, error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    } else
      try {
        prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
      } catch (error$70) {
        onActionError(actionQueue, node, error$70);
      }
  }
  function handleActionReturnValue(actionQueue, node, returnValue) {
    null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
      function(nextState) {
        onActionSuccess(actionQueue, node, nextState);
      },
      function(error) {
        return onActionError(actionQueue, node, error);
      }
    ) : onActionSuccess(actionQueue, node, returnValue);
  }
  function onActionSuccess(actionQueue, actionNode, nextState) {
    actionNode.status = "fulfilled";
    actionNode.value = nextState;
    notifyActionListeners(actionNode);
    actionQueue.state = nextState;
    actionNode = actionQueue.pending;
    null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
  }
  function onActionError(actionQueue, actionNode, error) {
    var last = actionQueue.pending;
    actionQueue.pending = null;
    if (null !== last) {
      last = last.next;
      do
        actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
      while (actionNode !== last);
    }
    actionQueue.action = null;
  }
  function notifyActionListeners(actionNode) {
    actionNode = actionNode.listeners;
    for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
  }
  function actionStateReducer(oldState, newState) {
    return newState;
  }
  function mountActionState(action, initialStateProp) {
    if (isHydrating) {
      var ssrFormState = workInProgressRoot.formState;
      if (null !== ssrFormState) {
        a: {
          var JSCompiler_inline_result = currentlyRenderingFiber;
          if (isHydrating) {
            if (nextHydratableInstance) {
              b: {
                var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
                for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType; ) {
                  if (!inRootOrSingleton) {
                    JSCompiler_inline_result$jscomp$0 = null;
                    break b;
                  }
                  JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                    JSCompiler_inline_result$jscomp$0.nextSibling
                  );
                  if (null === JSCompiler_inline_result$jscomp$0) {
                    JSCompiler_inline_result$jscomp$0 = null;
                    break b;
                  }
                }
                inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
                JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
              }
              if (JSCompiler_inline_result$jscomp$0) {
                nextHydratableInstance = getNextHydratable(
                  JSCompiler_inline_result$jscomp$0.nextSibling
                );
                JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
                break a;
              }
            }
            throwOnHydrationMismatch(JSCompiler_inline_result);
          }
          JSCompiler_inline_result = false;
        }
        JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
      }
    }
    ssrFormState = mountWorkInProgressHook();
    ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
    JSCompiler_inline_result = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: actionStateReducer,
      lastRenderedState: initialStateProp
    };
    ssrFormState.queue = JSCompiler_inline_result;
    ssrFormState = dispatchSetState.bind(
      null,
      currentlyRenderingFiber,
      JSCompiler_inline_result
    );
    JSCompiler_inline_result.dispatch = ssrFormState;
    JSCompiler_inline_result = mountStateImpl(false);
    inRootOrSingleton = dispatchOptimisticSetState.bind(
      null,
      currentlyRenderingFiber,
      false,
      JSCompiler_inline_result.queue
    );
    JSCompiler_inline_result = mountWorkInProgressHook();
    JSCompiler_inline_result$jscomp$0 = {
      state: initialStateProp,
      dispatch: null,
      action,
      pending: null
    };
    JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
    ssrFormState = dispatchActionState.bind(
      null,
      currentlyRenderingFiber,
      JSCompiler_inline_result$jscomp$0,
      inRootOrSingleton,
      ssrFormState
    );
    JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
    JSCompiler_inline_result.memoizedState = action;
    return [initialStateProp, ssrFormState, false];
  }
  function updateActionState(action) {
    var stateHook = updateWorkInProgressHook();
    return updateActionStateImpl(stateHook, currentHook, action);
  }
  function updateActionStateImpl(stateHook, currentStateHook, action) {
    currentStateHook = updateReducerImpl(
      stateHook,
      currentStateHook,
      actionStateReducer
    )[0];
    stateHook = updateReducer(basicStateReducer)[0];
    if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
      try {
        var state = useThenable(currentStateHook);
      } catch (x) {
        if (x === SuspenseException) throw SuspenseActionException;
        throw x;
      }
    else state = currentStateHook;
    currentStateHook = updateWorkInProgressHook();
    var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
    action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
      9,
      { destroy: void 0 },
      actionStateActionEffect.bind(null, actionQueue, action),
      null
    ));
    return [state, dispatch, stateHook];
  }
  function actionStateActionEffect(actionQueue, action) {
    actionQueue.action = action;
  }
  function rerenderActionState(action) {
    var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
    if (null !== currentStateHook)
      return updateActionStateImpl(stateHook, currentStateHook, action);
    updateWorkInProgressHook();
    stateHook = stateHook.memoizedState;
    currentStateHook = updateWorkInProgressHook();
    var dispatch = currentStateHook.queue.dispatch;
    currentStateHook.memoizedState = action;
    return [stateHook, dispatch, false];
  }
  function pushSimpleEffect(tag, inst, create2, deps) {
    tag = { tag, create: create2, deps, inst, next: null };
    inst = currentlyRenderingFiber.updateQueue;
    null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
    create2 = inst.lastEffect;
    null === create2 ? inst.lastEffect = tag.next = tag : (deps = create2.next, create2.next = tag, tag.next = deps, inst.lastEffect = tag);
    return tag;
  }
  function updateRef() {
    return updateWorkInProgressHook().memoizedState;
  }
  function mountEffectImpl(fiberFlags, hookFlags, create2, deps) {
    var hook = mountWorkInProgressHook();
    currentlyRenderingFiber.flags |= fiberFlags;
    hook.memoizedState = pushSimpleEffect(
      1 | hookFlags,
      { destroy: void 0 },
      create2,
      void 0 === deps ? null : deps
    );
  }
  function updateEffectImpl(fiberFlags, hookFlags, create2, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var inst = hook.memoizedState.inst;
    null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create2, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
      1 | hookFlags,
      inst,
      create2,
      deps
    ));
  }
  function mountEffect(create2, deps) {
    mountEffectImpl(8390656, 8, create2, deps);
  }
  function updateEffect(create2, deps) {
    updateEffectImpl(2048, 8, create2, deps);
  }
  function useEffectEventImpl(payload) {
    currentlyRenderingFiber.flags |= 4;
    var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
    if (null === componentUpdateQueue)
      componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
    else {
      var events = componentUpdateQueue.events;
      null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
    }
  }
  function updateEvent(callback) {
    var ref = updateWorkInProgressHook().memoizedState;
    useEffectEventImpl({ ref, nextImpl: callback });
    return function() {
      if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
      return ref.impl.apply(void 0, arguments);
    };
  }
  function updateInsertionEffect(create2, deps) {
    return updateEffectImpl(4, 2, create2, deps);
  }
  function updateLayoutEffect(create2, deps) {
    return updateEffectImpl(4, 4, create2, deps);
  }
  function imperativeHandleEffect(create2, ref) {
    if ("function" === typeof ref) {
      create2 = create2();
      var refCleanup = ref(create2);
      return function() {
        "function" === typeof refCleanup ? refCleanup() : ref(null);
      };
    }
    if (null !== ref && void 0 !== ref)
      return create2 = create2(), ref.current = create2, function() {
        ref.current = null;
      };
  }
  function updateImperativeHandle(ref, create2, deps) {
    deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
    updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create2, ref), deps);
  }
  function mountDebugValue() {
  }
  function updateCallback(callback, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var prevState = hook.memoizedState;
    if (null !== deps && areHookInputsEqual(deps, prevState[1]))
      return prevState[0];
    hook.memoizedState = [callback, deps];
    return callback;
  }
  function updateMemo(nextCreate, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var prevState = hook.memoizedState;
    if (null !== deps && areHookInputsEqual(deps, prevState[1]))
      return prevState[0];
    prevState = nextCreate();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(true);
      try {
        nextCreate();
      } finally {
        setIsStrictModeForDevtools(false);
      }
    }
    hook.memoizedState = [prevState, deps];
    return prevState;
  }
  function mountDeferredValueImpl(hook, value, initialValue) {
    if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
      return hook.memoizedState = value;
    hook.memoizedState = initialValue;
    hook = requestDeferredLane();
    currentlyRenderingFiber.lanes |= hook;
    workInProgressRootSkippedLanes |= hook;
    return initialValue;
  }
  function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
    if (objectIs(value, prevValue)) return value;
    if (null !== currentTreeHiddenStackCursor.current)
      return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
    if (0 === (renderLanes & 106) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
      return didReceiveUpdate = true, hook.memoizedState = value;
    hook = requestDeferredLane();
    currentlyRenderingFiber.lanes |= hook;
    workInProgressRootSkippedLanes |= hook;
    return prevValue;
  }
  function startTransition(fiber, queue, pendingState, finishedState, callback) {
    var previousPriority = ReactDOMSharedInternals.p;
    ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
    var prevTransition = ReactSharedInternals.T, currentTransition = {};
    currentTransition.types = null !== prevTransition ? prevTransition.types : null;
    ReactSharedInternals.T = currentTransition;
    dispatchOptimisticSetState(fiber, false, queue, pendingState);
    try {
      var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
        var thenableForFinishedState = chainThenableValue(
          returnValue,
          finishedState
        );
        dispatchSetStateInternal(
          fiber,
          queue,
          thenableForFinishedState,
          requestUpdateLane(fiber)
        );
      } else
        dispatchSetStateInternal(
          fiber,
          queue,
          finishedState,
          requestUpdateLane(fiber)
        );
    } catch (error) {
      dispatchSetStateInternal(
        fiber,
        queue,
        { then: function() {
        }, status: "rejected", reason: error },
        requestUpdateLane()
      );
    } finally {
      ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  }
  function noop() {
  }
  function startHostTransition(formFiber, pendingState, action, formData) {
    if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
    var queue = ensureFormComponentIsStateful(formFiber).queue;
    startTransition(
      formFiber,
      queue,
      pendingState,
      sharedNotPendingObject,
      null === action ? noop : function() {
        requestFormReset$1(formFiber);
        return action(formData);
      }
    );
  }
  function ensureFormComponentIsStateful(formFiber) {
    var existingStateHook = formFiber.memoizedState;
    if (null !== existingStateHook) return existingStateHook;
    existingStateHook = {
      memoizedState: sharedNotPendingObject,
      baseState: sharedNotPendingObject,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: sharedNotPendingObject
      },
      next: null
    };
    var initialResetState = {};
    existingStateHook.next = {
      memoizedState: initialResetState,
      baseState: initialResetState,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialResetState
      },
      next: null
    };
    formFiber.memoizedState = existingStateHook;
    formFiber = formFiber.alternate;
    null !== formFiber && (formFiber.memoizedState = existingStateHook);
    return existingStateHook;
  }
  function requestFormReset$1(formFiber) {
    var stateHook = ensureFormComponentIsStateful(formFiber);
    null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
    dispatchSetStateInternal(
      formFiber,
      stateHook.next.queue,
      {},
      requestUpdateLane()
    );
  }
  function useHostTransitionStatus() {
    return readContext(HostTransitionContext);
  }
  function updateId() {
    return updateWorkInProgressHook().memoizedState;
  }
  function updateRefresh() {
    return updateWorkInProgressHook().memoizedState;
  }
  function refreshCache(fiber) {
    for (var provider = fiber.return; null !== provider; ) {
      switch (provider.tag) {
        case 24:
        case 3:
          var lane = requestUpdateLane();
          fiber = createUpdate(lane);
          var root$73 = enqueueUpdate(provider, fiber, lane);
          null !== root$73 && (scheduleUpdateOnFiber(root$73, provider, lane), entangleTransitions(root$73, provider, lane));
          provider = { cache: createCache() };
          fiber.payload = provider;
          return;
      }
      provider = provider.return;
    }
  }
  function dispatchReducerAction(fiber, queue, action) {
    var lane = requestUpdateLane();
    action = {
      lane,
      revertLane: 0,
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
  }
  function dispatchSetState(fiber, queue, action) {
    var lane = requestUpdateLane();
    dispatchSetStateInternal(fiber, queue, action, lane);
  }
  function dispatchSetStateInternal(fiber, queue, action, lane) {
    var update = {
      lane,
      revertLane: 0,
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
    else {
      var alternate = fiber.alternate;
      if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate))
        try {
          var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
          update.hasEagerState = true;
          update.eagerState = eagerState;
          if (objectIs(eagerState, currentState))
            return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
        } catch (error) {
        } finally {
        }
      action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
      if (null !== action)
        return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
    }
    return false;
  }
  function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
    action = {
      lane: 2,
      revertLane: requestTransitionLane(),
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (isRenderPhaseUpdate(fiber)) {
      if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
    } else
      throwIfDuringRender = enqueueConcurrentHookUpdate(
        fiber,
        queue,
        action,
        2
      ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
  }
  function isRenderPhaseUpdate(fiber) {
    var alternate = fiber.alternate;
    return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
  }
  function enqueueRenderPhaseUpdate(queue, update) {
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
    var pending = queue.pending;
    null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
    queue.pending = update;
  }
  function entangleTransitionUpdate(root2, queue, lane) {
    if (0 !== (lane & 4194048)) {
      var queueLanes = queue.lanes;
      queueLanes &= root2.pendingLanes;
      lane |= queueLanes;
      queue.lanes = lane;
      markRootEntangled(root2, lane);
    }
  }
  var ContextOnlyDispatcher = {
    readContext,
    use,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useInsertionEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useDeferredValue: throwInvalidHookError,
    useTransition: throwInvalidHookError,
    useSyncExternalStore: throwInvalidHookError,
    useId: throwInvalidHookError,
    useHostTransitionStatus: throwInvalidHookError,
    useFormState: throwInvalidHookError,
    useActionState: throwInvalidHookError,
    useOptimistic: throwInvalidHookError,
    useMemoCache: throwInvalidHookError,
    useCacheRefresh: throwInvalidHookError,
    useEffectEvent: throwInvalidHookError
  }, HooksDispatcherOnMount = {
    readContext,
    use,
    useCallback: function(callback, deps) {
      mountWorkInProgressHook().memoizedState = [
        callback,
        void 0 === deps ? null : deps
      ];
      return callback;
    },
    useContext: readContext,
    useEffect: mountEffect,
    useImperativeHandle: function(ref, create2, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      mountEffectImpl(
        4194308,
        4,
        imperativeHandleEffect.bind(null, create2, ref),
        deps
      );
    },
    useLayoutEffect: function(create2, deps) {
      return mountEffectImpl(4194308, 4, create2, deps);
    },
    useInsertionEffect: function(create2, deps) {
      mountEffectImpl(4, 2, create2, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var nextValue = nextCreate();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          nextCreate();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
      hook.memoizedState = [nextValue, deps];
      return nextValue;
    },
    useReducer: function(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      if (void 0 !== init) {
        var initialState = init(initialArg);
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            init(initialArg);
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
      } else initialState = initialArg;
      hook.memoizedState = hook.baseState = initialState;
      reducer = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialState
      };
      hook.queue = reducer;
      reducer = reducer.dispatch = dispatchReducerAction.bind(
        null,
        currentlyRenderingFiber,
        reducer
      );
      return [hook.memoizedState, reducer];
    },
    useRef: function(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = { current: initialValue };
      return hook.memoizedState = initialValue;
    },
    useState: function(initialState) {
      initialState = mountStateImpl(initialState);
      var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
      queue.dispatch = dispatch;
      return [initialState.memoizedState, dispatch];
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = mountWorkInProgressHook();
      return mountDeferredValueImpl(hook, value, initialValue);
    },
    useTransition: function() {
      var stateHook = mountStateImpl(false);
      stateHook = startTransition.bind(
        null,
        currentlyRenderingFiber,
        stateHook.queue,
        true,
        false
      );
      mountWorkInProgressHook().memoizedState = stateHook;
      return [false, stateHook];
    },
    useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
      var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
      if (isHydrating) {
        if (void 0 === getServerSnapshot)
          throw Error(formatProdErrorMessage(407));
        getServerSnapshot = getServerSnapshot();
      } else {
        getServerSnapshot = getSnapshot();
        if (null === workInProgressRoot)
          throw Error(formatProdErrorMessage(349));
        0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
      }
      hook.memoizedState = getServerSnapshot;
      var inst = { value: getServerSnapshot, getSnapshot };
      hook.queue = inst;
      mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
        subscribe
      ]);
      fiber.flags |= 2048;
      pushSimpleEffect(
        9,
        { destroy: void 0 },
        updateStoreInstance.bind(
          null,
          fiber,
          inst,
          getServerSnapshot,
          getSnapshot
        ),
        null
      );
      return getServerSnapshot;
    },
    useId: function() {
      var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
      if (isHydrating) {
        var JSCompiler_inline_result = treeContextOverflow;
        var idWithLeadingBit = treeContextId;
        JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
        identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
        JSCompiler_inline_result = localIdCounter++;
        0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
        identifierPrefix += "_";
      } else
        JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
      return hook.memoizedState = identifierPrefix;
    },
    useHostTransitionStatus,
    useFormState: mountActionState,
    useActionState: mountActionState,
    useOptimistic: function(passthrough) {
      var hook = mountWorkInProgressHook();
      hook.memoizedState = hook.baseState = passthrough;
      var queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      hook.queue = queue;
      hook = dispatchOptimisticSetState.bind(
        null,
        currentlyRenderingFiber,
        true,
        queue
      );
      queue.dispatch = hook;
      return [passthrough, hook];
    },
    useMemoCache,
    useCacheRefresh: function() {
      return mountWorkInProgressHook().memoizedState = refreshCache.bind(
        null,
        currentlyRenderingFiber
      );
    },
    useEffectEvent: function(callback) {
      var hook = mountWorkInProgressHook(), ref = { impl: callback };
      hook.memoizedState = ref;
      return function() {
        if (0 !== (executionContext & 2))
          throw Error(formatProdErrorMessage(440));
        return ref.impl.apply(void 0, arguments);
      };
    }
  }, HooksDispatcherOnUpdate = {
    readContext,
    use,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useInsertionEffect: updateInsertionEffect,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: updateReducer,
    useRef: updateRef,
    useState: function() {
      return updateReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = updateWorkInProgressHook();
      return updateDeferredValueImpl(
        hook,
        currentHook.memoizedState,
        value,
        initialValue
      );
    },
    useTransition: function() {
      var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
      return [
        "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
        start
      ];
    },
    useSyncExternalStore: updateSyncExternalStore,
    useId: updateId,
    useHostTransitionStatus,
    useFormState: updateActionState,
    useActionState: updateActionState,
    useOptimistic: function(passthrough, reducer) {
      var hook = updateWorkInProgressHook();
      return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
    },
    useMemoCache,
    useCacheRefresh: updateRefresh,
    useEffectEvent: updateEvent
  }, HooksDispatcherOnRerender = {
    readContext,
    use,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useInsertionEffect: updateInsertionEffect,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: rerenderReducer,
    useRef: updateRef,
    useState: function() {
      return rerenderReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = updateWorkInProgressHook();
      return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
        hook,
        currentHook.memoizedState,
        value,
        initialValue
      );
    },
    useTransition: function() {
      var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
      return [
        "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
        start
      ];
    },
    useSyncExternalStore: updateSyncExternalStore,
    useId: updateId,
    useHostTransitionStatus,
    useFormState: rerenderActionState,
    useActionState: rerenderActionState,
    useOptimistic: function(passthrough, reducer) {
      var hook = updateWorkInProgressHook();
      if (null !== currentHook)
        return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
      hook.baseState = passthrough;
      return [passthrough, hook.queue.dispatch];
    },
    useMemoCache,
    useCacheRefresh: updateRefresh,
    useEffectEvent: updateEvent
  };
  function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
    ctor = workInProgress2.memoizedState;
    getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
    getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
    workInProgress2.memoizedState = getDerivedStateFromProps;
    0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
  }
  var classComponentUpdater = {
    enqueueSetState: function(inst, payload, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.payload = payload;
      void 0 !== callback && null !== callback && (update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueReplaceState: function(inst, payload, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.tag = 1;
      update.payload = payload;
      void 0 !== callback && null !== callback && (update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueForceUpdate: function(inst, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.tag = 2;
      void 0 !== callback && null !== callback && (update.callback = callback);
      callback = enqueueUpdate(inst, update, lane);
      null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
    }
  };
  function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
    workInProgress2 = workInProgress2.stateNode;
    return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
  }
  function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
    workInProgress2 = instance.state;
    "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
    "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
    instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
  function resolveClassComponentProps(Component, baseProps) {
    var newProps = baseProps;
    if ("ref" in baseProps) {
      newProps = {};
      for (var propName in baseProps)
        "ref" !== propName && (newProps[propName] = baseProps[propName]);
    }
    if (Component = Component.defaultProps) {
      newProps === baseProps && (newProps = assign({}, newProps));
      for (var propName$77 in Component)
        void 0 === newProps[propName$77] && (newProps[propName$77] = Component[propName$77]);
    }
    return newProps;
  }
  function defaultOnUncaughtError(error) {
    reportGlobalError(error);
  }
  function defaultOnCaughtError(error) {
    console.error(error);
  }
  function defaultOnRecoverableError(error) {
    reportGlobalError(error);
  }
  function logUncaughtError(root2, errorInfo) {
    try {
      var onUncaughtError = root2.onUncaughtError;
      onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
    } catch (e$78) {
      setTimeout(function() {
        throw e$78;
      });
    }
  }
  function logCaughtError(root2, boundary, errorInfo) {
    try {
      var onCaughtError = root2.onCaughtError;
      onCaughtError(errorInfo.value, {
        componentStack: errorInfo.stack,
        errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
      });
    } catch (e$79) {
      setTimeout(function() {
        throw e$79;
      });
    }
  }
  function createRootErrorUpdate(root2, errorInfo, lane) {
    lane = createUpdate(lane);
    lane.tag = 3;
    lane.payload = { element: null };
    lane.callback = function() {
      logUncaughtError(root2, errorInfo);
    };
    return lane;
  }
  function createClassErrorUpdate(lane) {
    lane = createUpdate(lane);
    lane.tag = 3;
    return lane;
  }
  function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
    var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
    if ("function" === typeof getDerivedStateFromError) {
      var error = errorInfo.value;
      update.payload = function() {
        return getDerivedStateFromError(error);
      };
      update.callback = function() {
        logCaughtError(root2, fiber, errorInfo);
      };
    }
    var inst = fiber.stateNode;
    null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
      logCaughtError(root2, fiber, errorInfo);
      "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
  }
  function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
    sourceFiber.flags |= 32768;
    if (null !== value && "object" === typeof value && "function" === typeof value.then) {
      returnFiber = sourceFiber.alternate;
      null !== returnFiber && propagateParentContextChanges(
        returnFiber,
        sourceFiber,
        rootRenderLanes,
        true
      );
      sourceFiber = suspenseHandlerStackCursor.current;
      if (null !== sourceFiber) {
        switch (sourceFiber.tag) {
          case 31:
          case 13:
          case 19:
            return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
          case 22:
            return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([value])
            }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
        }
        throw Error(formatProdErrorMessage(435, sourceFiber.tag));
      }
      attachPingListener(root2, value, rootRenderLanes);
      renderDidSuspendDelayIfPossible();
      return false;
    }
    if (isHydrating)
      return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
        cause: value
      }), queueHydrationError(
        createCapturedValueAtFiber(returnFiber, sourceFiber)
      )), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
        root2.stateNode,
        value,
        rootRenderLanes
      ), enqueueCapturedUpdate(root2, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
    var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
    wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
    null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
    4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
    if (null === returnFiber) return true;
    value = createCapturedValueAtFiber(value, sourceFiber);
    sourceFiber = returnFiber;
    do {
      switch (sourceFiber.tag) {
        case 3:
          return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), false;
        case 1:
          returnFiber = sourceFiber.type;
          wrapperError = sourceFiber.stateNode;
          if (0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
            return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
              rootRenderLanes,
              root2,
              sourceFiber,
              value
            ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
          break;
        case 22:
          if (null !== sourceFiber.memoizedState)
            return sourceFiber.flags |= 65536, false;
      }
      sourceFiber = sourceFiber.return;
    } while (null !== sourceFiber);
    return false;
  }
  var SelectiveHydrationException = Error(formatProdErrorMessage(461)), didReceiveUpdate = false;
  function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
    workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
      workInProgress2,
      current.child,
      nextChildren,
      renderLanes2
    );
  }
  function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
    Component = Component.render;
    var ref = workInProgress2.ref;
    if ("ref" in nextProps) {
      var propsWithoutRef = {};
      for (var key in nextProps)
        "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
    } else propsWithoutRef = nextProps;
    prepareToReadContext(workInProgress2);
    nextProps = renderWithHooks(
      current,
      workInProgress2,
      Component,
      propsWithoutRef,
      ref,
      renderLanes2
    );
    key = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && key && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    return workInProgress2.child;
  }
  function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    if (null === current) {
      var type = Component.type;
      if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
        return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
          current,
          workInProgress2,
          type,
          nextProps,
          renderLanes2
        );
      current = createFiberFromTypeAndProps(
        Component.type,
        null,
        nextProps,
        workInProgress2,
        workInProgress2.mode,
        renderLanes2
      );
      current.ref = workInProgress2.ref;
      current.return = workInProgress2;
      return workInProgress2.child = current;
    }
    type = current.child;
    if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
      var prevProps = type.memoizedProps;
      Component = Component.compare;
      Component = null !== Component ? Component : shallowEqual;
      if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
        return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    }
    workInProgress2.flags |= 1;
    current = createWorkInProgress(type, nextProps);
    current.ref = workInProgress2.ref;
    current.return = workInProgress2;
    return workInProgress2.child = current;
  }
  function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    if (null !== current) {
      var prevProps = current.memoizedProps;
      if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
        if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
          0 !== (current.flags & 131072) && (didReceiveUpdate = true);
        else
          return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    }
    return updateFunctionComponent(
      current,
      workInProgress2,
      Component,
      nextProps,
      renderLanes2
    );
  }
  function updateOffscreenComponent(current, workInProgress2, renderLanes2, nextProps) {
    var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
    null === current && null === workInProgress2.stateNode && (workInProgress2.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    });
    if ("hidden" === nextProps.mode) {
      if (0 !== (workInProgress2.flags & 128)) {
        prevState = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
        if (null !== current) {
          nextProps = workInProgress2.child = current.child;
          for (nextChildren = 0; null !== nextProps; )
            nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
          nextProps = nextChildren & ~prevState;
        } else nextProps = 0, workInProgress2.child = null;
        return deferHiddenOffscreenComponent(
          current,
          workInProgress2,
          prevState,
          renderLanes2,
          nextProps
        );
      }
      if (0 !== (renderLanes2 & 536870912))
        workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
          workInProgress2,
          null !== prevState ? prevState.cachePool : null
        ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
      else
        return nextProps = workInProgress2.lanes = 536870912, deferHiddenOffscreenComponent(
          current,
          workInProgress2,
          null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
          renderLanes2,
          nextProps
        );
    } else
      null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
    reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
    return workInProgress2.child;
  }
  function bailoutOffscreenComponent(current, workInProgress2) {
    null !== current && 22 === current.tag || null !== workInProgress2.stateNode || (workInProgress2.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    });
    return workInProgress2.sibling;
  }
  function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2, remainingChildLanes) {
    var JSCompiler_inline_result = peekCacheFromPool();
    JSCompiler_inline_result = null === JSCompiler_inline_result ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
    workInProgress2.memoizedState = {
      baseLanes: nextBaseLanes,
      cachePool: JSCompiler_inline_result
    };
    null !== current && pushTransition(workInProgress2, null);
    reuseHiddenContextOnStack();
    pushOffscreenSuspenseHandler(workInProgress2);
    null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
    workInProgress2.childLanes = remainingChildLanes;
    return null;
  }
  function mountActivityChildren(workInProgress2, nextProps) {
    nextProps = mountWorkInProgressOffscreenFiber(
      { mode: nextProps.mode, children: nextProps.children },
      workInProgress2.mode
    );
    nextProps.ref = workInProgress2.ref;
    workInProgress2.child = nextProps;
    nextProps.return = workInProgress2;
    return nextProps;
  }
  function retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
    reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
    current = mountActivityChildren(workInProgress2, workInProgress2.pendingProps);
    current.flags |= 2;
    popSuspenseHandler(workInProgress2);
    workInProgress2.memoizedState = null;
    return current;
  }
  function updateActivityComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, didSuspend = 0 !== (workInProgress2.flags & 128);
    workInProgress2.flags &= -129;
    if (null === current) {
      if (isHydrating) {
        if ("hidden" === nextProps.mode)
          return current = mountActivityChildren(workInProgress2, nextProps), workInProgress2.lanes = 536870912, current.memoizedState = { baseLanes: 0, cachePool: null }, bailoutOffscreenComponent(null, current);
        pushDehydratedActivitySuspenseHandler(workInProgress2);
        (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
          current,
          rootOrSingletonContext
        ), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
          dehydrated: current,
          treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
        if (null === current) throw throwOnHydrationMismatch(workInProgress2);
        workInProgress2.lanes = 536870912;
        return null;
      }
      return mountActivityChildren(workInProgress2, nextProps);
    }
    var prevState = current.memoizedState;
    if (null !== prevState) {
      var dehydrated = prevState.dehydrated;
      pushDehydratedActivitySuspenseHandler(workInProgress2);
      if (didSuspend)
        if (workInProgress2.flags & 256)
          workInProgress2.flags &= -257, workInProgress2 = retryActivityComponentWithoutHydrating(
            current,
            workInProgress2,
            renderLanes2
          );
        else if (null !== workInProgress2.memoizedState)
          workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null;
        else throw Error(formatProdErrorMessage(558));
      else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), didSuspend = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || didSuspend) {
        if (null === currentTreeHiddenStackCursor.current) {
          nextProps = workInProgressRoot;
          if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes2), 0 !== dehydrated && dehydrated !== prevState.retryLane))
            throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
          renderDidSuspendDelayIfPossible();
        }
        workInProgress2 = retryActivityComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      } else
        current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountActivityChildren(workInProgress2, nextProps), workInProgress2.flags |= 134221824;
      return workInProgress2;
    }
    current = createWorkInProgress(current.child, {
      mode: nextProps.mode,
      children: nextProps.children
    });
    current.ref = workInProgress2.ref;
    workInProgress2.child = current;
    current.return = workInProgress2;
    return current;
  }
  function markRef(current, workInProgress2) {
    var ref = workInProgress2.ref;
    if (null === ref)
      null !== current && null !== current.ref && (workInProgress2.flags |= 4194816);
    else {
      if ("function" !== typeof ref && "object" !== typeof ref)
        throw Error(formatProdErrorMessage(284));
      if (null === current || current.ref !== ref)
        workInProgress2.flags |= 4194816;
    }
  }
  function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    prepareToReadContext(workInProgress2);
    Component = renderWithHooks(
      current,
      workInProgress2,
      Component,
      nextProps,
      void 0,
      renderLanes2
    );
    nextProps = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, Component, renderLanes2);
    return workInProgress2.child;
  }
  function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
    prepareToReadContext(workInProgress2);
    workInProgress2.updateQueue = null;
    nextProps = renderWithHooksAgain(
      workInProgress2,
      Component,
      nextProps,
      secondArg
    );
    finishRenderingHooks(current);
    Component = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && Component && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    return workInProgress2.child;
  }
  function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    prepareToReadContext(workInProgress2);
    if (null === workInProgress2.stateNode) {
      var context = emptyContextObject, contextType = Component.contextType;
      "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
      context = new Component(nextProps, context);
      workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
      context.updater = classComponentUpdater;
      workInProgress2.stateNode = context;
      context._reactInternals = workInProgress2;
      context = workInProgress2.stateNode;
      context.props = nextProps;
      context.state = workInProgress2.memoizedState;
      context.refs = {};
      initializeUpdateQueue(workInProgress2);
      contextType = Component.contextType;
      context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
      context.state = workInProgress2.memoizedState;
      contextType = Component.getDerivedStateFromProps;
      "function" === typeof contextType && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        contextType,
        nextProps
      ), context.state = workInProgress2.memoizedState);
      "function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
      "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
      nextProps = true;
    } else if (null === current) {
      context = workInProgress2.stateNode;
      var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
      context.props = oldProps;
      var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
      contextType = emptyContextObject;
      "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
      var getDerivedStateFromProps = Component.getDerivedStateFromProps;
      contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
      unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
      contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
        workInProgress2,
        context,
        nextProps,
        contextType
      );
      hasForceUpdate = false;
      var oldState = workInProgress2.memoizedState;
      context.state = oldState;
      processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
      suspendIfUpdateReadFromEntangledAsyncAction();
      oldContext = workInProgress2.memoizedState;
      unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        getDerivedStateFromProps,
        nextProps
      ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
        workInProgress2,
        Component,
        oldProps,
        nextProps,
        oldState,
        oldContext,
        contextType
      )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
    } else {
      context = workInProgress2.stateNode;
      cloneUpdateQueue(current, workInProgress2);
      contextType = workInProgress2.memoizedProps;
      contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
      context.props = contextType$jscomp$0;
      getDerivedStateFromProps = workInProgress2.pendingProps;
      oldState = context.context;
      oldContext = Component.contextType;
      oldProps = emptyContextObject;
      "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
      unresolvedOldProps = Component.getDerivedStateFromProps;
      (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
        workInProgress2,
        context,
        nextProps,
        oldProps
      );
      hasForceUpdate = false;
      oldState = workInProgress2.memoizedState;
      context.state = oldState;
      processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
      suspendIfUpdateReadFromEntangledAsyncAction();
      var newState = workInProgress2.memoizedState;
      contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        unresolvedOldProps,
        nextProps
      ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
        workInProgress2,
        Component,
        contextType$jscomp$0,
        nextProps,
        oldState,
        newState,
        oldProps
      ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
        nextProps,
        newState,
        oldProps
      )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
    }
    context = nextProps;
    markRef(current, workInProgress2);
    nextProps = 0 !== (workInProgress2.flags & 128);
    context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
      workInProgress2,
      current.child,
      null,
      renderLanes2
    ), workInProgress2.child = reconcileChildFibers(
      workInProgress2,
      null,
      Component,
      renderLanes2
    )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
      current,
      workInProgress2,
      renderLanes2
    );
    return current;
  }
  function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
    resetHydrationState();
    workInProgress2.flags |= 256;
    reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
    return workInProgress2.child;
  }
  var SUSPENDED_MARKER = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mountSuspenseOffscreenState(renderLanes2) {
    return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
  }
  function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
    current = null !== current ? current.childLanes & ~renderLanes2 : 0;
    primaryTreeDidDefer && (current |= workInProgressDeferredLane);
    return current;
  }
  function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
    (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
    JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
    JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
    workInProgress2.flags &= -33;
    if (null === current) {
      if (isHydrating) {
        showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack();
        (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
          current,
          rootOrSingletonContext
        ), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
          dehydrated: current,
          treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
        if (null === current) throw throwOnHydrationMismatch(workInProgress2);
        isSuspenseInstanceFallback(current) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912;
        return null;
      }
      didSuspend = nextProps.children;
      nextProps = nextProps.fallback;
      if (showFallback)
        return reuseSuspenseHandlerOnStack(), showFallback = workInProgress2.mode, didSuspend = mountWorkInProgressOffscreenFiber(
          { mode: "hidden", children: didSuspend },
          showFallback
        ), nextProps = createFiberFromFragment(
          nextProps,
          showFallback,
          renderLanes2,
          null
        ), didSuspend.return = workInProgress2, nextProps.return = workInProgress2, didSuspend.sibling = nextProps, workInProgress2.child = didSuspend, nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
          current,
          JSCompiler_temp,
          renderLanes2
        ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
      pushPrimaryTreeSuspenseHandler(workInProgress2);
      return mountSuspensePrimaryChildren(workInProgress2, didSuspend);
    }
    var prevState = current.memoizedState;
    if (null !== prevState) {
      var dehydrated$96 = prevState.dehydrated;
      if (null !== dehydrated$96)
        return updateDehydratedSuspenseComponent(
          current,
          workInProgress2,
          didSuspend,
          JSCompiler_temp,
          nextProps,
          dehydrated$96,
          prevState,
          renderLanes2
        );
    }
    if (showFallback)
      return reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, didSuspend = workInProgress2.mode, prevState = current.child, dehydrated$96 = prevState.sibling, nextProps = createWorkInProgress(prevState, {
        mode: "hidden",
        children: nextProps.children
      }), nextProps.subtreeFlags = prevState.subtreeFlags & 1206910976, null !== dehydrated$96 ? showFallback = createWorkInProgress(dehydrated$96, showFallback) : (showFallback = createFiberFromFragment(
        showFallback,
        didSuspend,
        renderLanes2,
        null
      ), showFallback.flags |= 2), showFallback.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress2.child, showFallback = current.child.memoizedState, null === showFallback ? showFallback = mountSuspenseOffscreenState(renderLanes2) : (didSuspend = showFallback.cachePool, null !== didSuspend ? (prevState = CacheContext._currentValue, didSuspend = didSuspend.parent !== prevState ? { parent: prevState, pool: prevState } : didSuspend) : didSuspend = getSuspendedCache(), showFallback = {
        baseLanes: showFallback.baseLanes | renderLanes2,
        cachePool: didSuspend
      }), nextProps.memoizedState = showFallback, nextProps.childLanes = getRemainingWorkInPrimaryTree(
        current,
        JSCompiler_temp,
        renderLanes2
      ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
    pushPrimaryTreeSuspenseHandler(workInProgress2);
    renderLanes2 = current.child;
    current = renderLanes2.sibling;
    renderLanes2 = createWorkInProgress(renderLanes2, {
      mode: "visible",
      children: nextProps.children
    });
    renderLanes2.return = workInProgress2;
    renderLanes2.sibling = null;
    null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
    workInProgress2.child = renderLanes2;
    workInProgress2.memoizedState = null;
    return renderLanes2;
  }
  function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
    primaryChildren = mountWorkInProgressOffscreenFiber(
      { mode: "visible", children: primaryChildren },
      workInProgress2.mode
    );
    primaryChildren.return = workInProgress2;
    return workInProgress2.child = primaryChildren;
  }
  function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
    offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
    offscreenProps.lanes = 0;
    return offscreenProps;
  }
  function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
    reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
    current = mountSuspensePrimaryChildren(
      workInProgress2,
      workInProgress2.pendingProps.children
    );
    current.flags |= 2;
    workInProgress2.memoizedState = null;
    return current;
  }
  function updateDehydratedSuspenseComponent(current, workInProgress2, didSuspend, didPrimaryChildrenDefer, nextProps, suspenseInstance, suspenseState, renderLanes2) {
    if (didSuspend) {
      if (workInProgress2.flags & 256)
        return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      if (null !== workInProgress2.memoizedState)
        return reuseSuspenseHandlerOnStack(), workInProgress2.child = current.child, workInProgress2.flags |= 128, null;
      reuseSuspenseHandlerOnStack();
      suspenseInstance = nextProps.fallback;
      suspenseState = workInProgress2.mode;
      nextProps = mountWorkInProgressOffscreenFiber(
        { mode: "visible", children: nextProps.children },
        suspenseState
      );
      suspenseInstance = createFiberFromFragment(
        suspenseInstance,
        suspenseState,
        renderLanes2,
        null
      );
      suspenseInstance.flags |= 2;
      nextProps.return = workInProgress2;
      suspenseInstance.return = workInProgress2;
      nextProps.sibling = suspenseInstance;
      workInProgress2.child = nextProps;
      reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
      nextProps = workInProgress2.child;
      nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2);
      nextProps.childLanes = getRemainingWorkInPrimaryTree(
        current,
        didPrimaryChildrenDefer,
        renderLanes2
      );
      workInProgress2.memoizedState = SUSPENDED_MARKER;
      return bailoutOffscreenComponent(null, nextProps);
    }
    pushPrimaryTreeSuspenseHandler(workInProgress2);
    if (isSuspenseInstanceFallback(suspenseInstance)) {
      didPrimaryChildrenDefer = suspenseInstance.nextSibling && suspenseInstance.nextSibling.dataset;
      if (didPrimaryChildrenDefer) var digest = didPrimaryChildrenDefer.dgst;
      didPrimaryChildrenDefer = digest;
      "" !== didPrimaryChildrenDefer && (nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = didPrimaryChildrenDefer, queueHydrationError({ value: nextProps, source: null, stack: null }));
      return retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    }
    didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false);
    didPrimaryChildrenDefer = 0 !== (renderLanes2 & current.childLanes);
    if (didReceiveUpdate || didPrimaryChildrenDefer) {
      if (null !== currentTreeHiddenStackCursor.current)
        return retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      didPrimaryChildrenDefer = workInProgressRoot;
      if (null !== didPrimaryChildrenDefer && (nextProps = getBumpedLaneForHydration(
        didPrimaryChildrenDefer,
        renderLanes2
      ), 0 !== nextProps && nextProps !== suspenseState.retryLane))
        throw suspenseState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(didPrimaryChildrenDefer, current, nextProps), SelectiveHydrationException;
      isSuspenseInstancePending(suspenseInstance) || renderDidSuspendDelayIfPossible();
      return retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    }
    if (isSuspenseInstancePending(suspenseInstance))
      return workInProgress2.flags |= 192, workInProgress2.child = current.child, null;
    current = suspenseState.treeContext;
    nextHydratableInstance = getNextHydratable(suspenseInstance.nextSibling);
    hydrationParentFiber = workInProgress2;
    isHydrating = true;
    hydrationErrors = null;
    rootOrSingletonContext = false;
    null !== current && restoreSuspendedTreeContext(workInProgress2, current);
    workInProgress2 = mountSuspensePrimaryChildren(
      workInProgress2,
      nextProps.children
    );
    workInProgress2.flags |= 134221824;
    return workInProgress2;
  }
  function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
    fiber.lanes |= renderLanes2;
    var alternate = fiber.alternate;
    null !== alternate && (alternate.lanes |= renderLanes2);
    scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
  }
  function findLastContentRow(firstChild) {
    for (var lastContentRow = null; null !== firstChild; ) {
      var currentRow = firstChild.alternate;
      null !== currentRow && null === findFirstSuspended(currentRow) && (lastContentRow = firstChild);
      firstChild = firstChild.sibling;
    }
    return lastContentRow;
  }
  function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, treeForkCount2) {
    var renderState = workInProgress2.memoizedState;
    null === renderState ? workInProgress2.memoizedState = {
      isBackwards,
      rendering: null,
      renderingStartTime: 0,
      last: lastContentRow,
      tail,
      tailMode,
      treeForkCount: treeForkCount2
    } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount2);
  }
  function reverseChildren(fiber) {
    var row = fiber.child;
    for (fiber.child = null; null !== row; ) {
      var nextRow = row.sibling;
      row.sibling = fiber.child;
      fiber.child = row;
      row = nextRow;
    }
  }
  function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
    nextProps = nextProps.children;
    var suspenseContext = suspenseStackCursor.current;
    if (workInProgress2.flags & 128)
      return pushSuspenseListContext(workInProgress2, suspenseContext), null;
    var shouldForceFallback = 0 !== (suspenseContext & 2);
    shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress2.flags |= 128) : suspenseContext &= 1;
    pushSuspenseListContext(workInProgress2, suspenseContext);
    "backwards" === revealOrder && null !== current ? (reverseChildren(current), reconcileChildren(current, workInProgress2, nextProps, renderLanes2), reverseChildren(current)) : reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    nextProps = isHydrating ? treeForkCount : 0;
    if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128))
      a: for (current = workInProgress2.child; null !== current; ) {
        if (13 === current.tag)
          null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
        else if (19 === current.tag)
          scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
        else if (null !== current.child) {
          current.child.return = current;
          current = current.child;
          continue;
        }
        if (current === workInProgress2) break a;
        for (; null === current.sibling; ) {
          if (null === current.return || current.return === workInProgress2)
            break a;
          current = current.return;
        }
        current.sibling.return = current.return;
        current = current.sibling;
      }
    switch (revealOrder) {
      case "backwards":
        renderLanes2 = findLastContentRow(workInProgress2.child);
        null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null, reverseChildren(workInProgress2));
        initSuspenseListRenderState(
          workInProgress2,
          true,
          revealOrder,
          null,
          tailMode,
          nextProps
        );
        break;
      case "unstable_legacy-backwards":
        renderLanes2 = null;
        revealOrder = workInProgress2.child;
        for (workInProgress2.child = null; null !== revealOrder; ) {
          current = revealOrder.alternate;
          if (null !== current && null === findFirstSuspended(current)) {
            workInProgress2.child = revealOrder;
            break;
          }
          current = revealOrder.sibling;
          revealOrder.sibling = renderLanes2;
          renderLanes2 = revealOrder;
          revealOrder = current;
        }
        initSuspenseListRenderState(
          workInProgress2,
          true,
          renderLanes2,
          null,
          tailMode,
          nextProps
        );
        break;
      case "together":
        initSuspenseListRenderState(
          workInProgress2,
          false,
          null,
          null,
          void 0,
          nextProps
        );
        break;
      case "independent":
        workInProgress2.memoizedState = null;
        break;
      default:
        renderLanes2 = findLastContentRow(workInProgress2.child), null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null), initSuspenseListRenderState(
          workInProgress2,
          false,
          revealOrder,
          renderLanes2,
          tailMode,
          nextProps
        );
    }
    return workInProgress2.child;
  }
  function updateContextProvider(current, workInProgress2, renderLanes2) {
    var newProps = workInProgress2.pendingProps;
    pushProvider(workInProgress2, workInProgress2.type, newProps.value);
    reconcileChildren(current, workInProgress2, newProps.children, renderLanes2);
    return workInProgress2.child;
  }
  function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
    null !== current && (workInProgress2.dependencies = current.dependencies);
    workInProgressRootSkippedLanes |= workInProgress2.lanes;
    if (0 === (renderLanes2 & workInProgress2.childLanes))
      if (null !== current) {
        if (propagateParentContextChanges(
          current,
          workInProgress2,
          renderLanes2,
          false
        ), 0 === (renderLanes2 & workInProgress2.childLanes))
          return null;
      } else return null;
    if (null !== current && workInProgress2.child !== current.child)
      throw Error(formatProdErrorMessage(153));
    if (null !== workInProgress2.child) {
      current = workInProgress2.child;
      renderLanes2 = createWorkInProgress(current, current.pendingProps);
      workInProgress2.child = renderLanes2;
      for (renderLanes2.return = workInProgress2; null !== current.sibling; )
        current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
      renderLanes2.sibling = null;
    }
    return workInProgress2.child;
  }
  function checkScheduledUpdateOrContext(current, renderLanes2) {
    if (0 !== (current.lanes & renderLanes2)) return true;
    current = current.dependencies;
    return null !== current && checkIfContextChanged(current) ? true : false;
  }
  function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
    switch (workInProgress2.tag) {
      case 3:
        pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
        pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
        resetHydrationState();
        break;
      case 27:
      case 5:
        pushHostContext(workInProgress2);
        break;
      case 4:
        pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
        break;
      case 10:
        pushProvider(
          workInProgress2,
          workInProgress2.type,
          workInProgress2.memoizedProps.value
        );
        break;
      case 31:
        if (null !== workInProgress2.memoizedState)
          return workInProgress2.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress2), null;
        break;
      case 13:
        var state$108 = workInProgress2.memoizedState;
        if (null !== state$108) {
          if (null !== state$108.dehydrated)
            return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
          state$108 = propagateParentContextChanges(
            current,
            workInProgress2,
            renderLanes2,
            false
          );
          var primaryChildLanes = workInProgress2.child.childLanes;
          if (state$108 || 0 !== (renderLanes2 & primaryChildLanes))
            return updateSuspenseComponent(current, workInProgress2, renderLanes2);
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          current = bailoutOnAlreadyFinishedWork(
            current,
            workInProgress2,
            renderLanes2
          );
          return null !== current ? current.sibling : null;
        }
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        break;
      case 19:
        if (workInProgress2.flags & 128)
          return updateSuspenseListComponent(
            current,
            workInProgress2,
            renderLanes2
          );
        primaryChildLanes = 0 !== (current.flags & 128);
        state$108 = 0 !== (renderLanes2 & workInProgress2.childLanes);
        state$108 || (propagateParentContextChanges(
          current,
          workInProgress2,
          renderLanes2,
          false
        ), state$108 = 0 !== (renderLanes2 & workInProgress2.childLanes));
        if (primaryChildLanes) {
          if (state$108)
            return updateSuspenseListComponent(
              current,
              workInProgress2,
              renderLanes2
            );
          workInProgress2.flags |= 128;
        }
        primaryChildLanes = workInProgress2.memoizedState;
        null !== primaryChildLanes && (primaryChildLanes.rendering = null, primaryChildLanes.tail = null, primaryChildLanes.lastEffect = null);
        pushSuspenseListContext(workInProgress2, suspenseStackCursor.current);
        if (state$108) break;
        else return null;
      case 22:
        return workInProgress2.lanes = 0, updateOffscreenComponent(
          current,
          workInProgress2,
          renderLanes2,
          workInProgress2.pendingProps
        );
      case 24:
        pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
    }
    return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  }
  function beginWork(current, workInProgress2, renderLanes2) {
    if (null !== current)
      if (current.memoizedProps !== workInProgress2.pendingProps)
        didReceiveUpdate = true;
      else {
        if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
          return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
            current,
            workInProgress2,
            renderLanes2
          );
        didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
      }
    else
      didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
    workInProgress2.lanes = 0;
    switch (workInProgress2.tag) {
      case 16:
        a: {
          var props = workInProgress2.pendingProps;
          current = resolveLazy(workInProgress2.elementType);
          workInProgress2.type = current;
          if ("function" === typeof current)
            shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
              null,
              workInProgress2,
              current,
              props,
              renderLanes2
            )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
              null,
              workInProgress2,
              current,
              props,
              renderLanes2
            ));
          else {
            if (void 0 !== current && null !== current) {
              var $$typeof = current.$$typeof;
              if ($$typeof === REACT_FORWARD_REF_TYPE) {
                workInProgress2.tag = 11;
                workInProgress2 = updateForwardRef(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                );
                break a;
              } else if ($$typeof === REACT_MEMO_TYPE) {
                workInProgress2.tag = 14;
                workInProgress2 = updateMemoComponent(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                );
                break a;
              } else if ($$typeof === REACT_CONTEXT_TYPE) {
                workInProgress2.tag = 10;
                workInProgress2.type = current;
                workInProgress2 = updateContextProvider(
                  null,
                  workInProgress2,
                  renderLanes2
                );
                break a;
              }
            }
            workInProgress2 = getComponentNameFromType(current) || current;
            throw Error(formatProdErrorMessage(306, workInProgress2, ""));
          }
        }
        return workInProgress2;
      case 0:
        return updateFunctionComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 1:
        return props = workInProgress2.type, $$typeof = resolveClassComponentProps(
          props,
          workInProgress2.pendingProps
        ), updateClassComponent(
          current,
          workInProgress2,
          props,
          $$typeof,
          renderLanes2
        );
      case 3:
        a: {
          pushHostContainer(
            workInProgress2,
            workInProgress2.stateNode.containerInfo
          );
          if (null === current) throw Error(formatProdErrorMessage(387));
          props = workInProgress2.pendingProps;
          var prevState = workInProgress2.memoizedState;
          $$typeof = prevState.element;
          cloneUpdateQueue(current, workInProgress2);
          processUpdateQueue(workInProgress2, props, null, renderLanes2);
          var nextState = workInProgress2.memoizedState;
          props = nextState.cache;
          pushProvider(workInProgress2, CacheContext, props);
          props !== prevState.cache && propagateContextChanges(
            workInProgress2,
            [CacheContext],
            renderLanes2,
            true
          );
          suspendIfUpdateReadFromEntangledAsyncAction();
          props = nextState.element;
          if (prevState.isDehydrated)
            if (prevState = {
              element: props,
              isDehydrated: false,
              cache: nextState.cache
            }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
              workInProgress2 = mountHostRootWithoutHydrating(
                current,
                workInProgress2,
                props,
                renderLanes2
              );
              break a;
            } else if (props !== $$typeof) {
              $$typeof = createCapturedValueAtFiber(
                Error(formatProdErrorMessage(424)),
                workInProgress2
              );
              queueHydrationError($$typeof);
              workInProgress2 = mountHostRootWithoutHydrating(
                current,
                workInProgress2,
                props,
                renderLanes2
              );
              break a;
            } else {
              current = workInProgress2.stateNode.containerInfo;
              switch (current.nodeType) {
                case 9:
                  current = current.body;
                  break;
                default:
                  current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
              }
              nextHydratableInstance = getNextHydratable(current.firstChild);
              hydrationParentFiber = workInProgress2;
              isHydrating = true;
              hydrationErrors = null;
              rootOrSingletonContext = true;
              renderLanes2 = mountChildFibers(
                workInProgress2,
                null,
                props,
                renderLanes2
              );
              for (workInProgress2.child = renderLanes2; renderLanes2; )
                renderLanes2.flags = renderLanes2.flags & -3 | 134221824, renderLanes2 = renderLanes2.sibling;
            }
          else {
            resetHydrationState();
            if (props === $$typeof) {
              workInProgress2 = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress2,
                renderLanes2
              );
              break a;
            }
            reconcileChildren(current, workInProgress2, props, renderLanes2);
          }
          workInProgress2 = workInProgress2.child;
        }
        return workInProgress2;
      case 26:
        return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
          workInProgress2.type,
          null,
          workInProgress2.pendingProps,
          null
        )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (workInProgress2.stateNode = createHoistableInstance(
          workInProgress2.type,
          workInProgress2.pendingProps,
          rootInstanceStackCursor.current,
          workInProgress2
        )) : workInProgress2.memoizedState = getResource(
          workInProgress2.type,
          current.memoizedProps,
          workInProgress2.pendingProps,
          current.memoizedState
        ), null;
      case 27:
        return pushHostContext(workInProgress2), null === current && isHydrating && (props = workInProgress2.stateNode = resolveSingletonInstance(
          workInProgress2.type,
          workInProgress2.pendingProps,
          rootInstanceStackCursor.current
        ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), markRef(current, workInProgress2), null === current && (workInProgress2.flags |= 4194304), workInProgress2.child;
      case 5:
        if (null === current && isHydrating) {
          if ($$typeof = props = nextHydratableInstance)
            props = canHydrateInstance(
              props,
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), null !== props ? (workInProgress2.stateNode = props, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = false, $$typeof = true) : $$typeof = false;
          $$typeof || throwOnHydrationMismatch(workInProgress2);
        }
        pushHostContext(workInProgress2);
        $$typeof = workInProgress2.type;
        prevState = workInProgress2.pendingProps;
        nextState = null !== current ? current.memoizedProps : null;
        props = prevState.children;
        shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress2.flags |= 32);
        null !== workInProgress2.memoizedState && ($$typeof = renderWithHooks(
          current,
          workInProgress2,
          TransitionAwareHostComponent,
          null,
          null,
          renderLanes2
        ), HostTransitionContext._currentValue = $$typeof);
        markRef(current, workInProgress2);
        reconcileChildren(current, workInProgress2, props, renderLanes2);
        return workInProgress2.child;
      case 6:
        if (null === current && isHydrating) {
          if (current = renderLanes2 = nextHydratableInstance)
            renderLanes2 = canHydrateTextInstance(
              renderLanes2,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
          current || throwOnHydrationMismatch(workInProgress2);
        }
        return null;
      case 13:
        return updateSuspenseComponent(current, workInProgress2, renderLanes2);
      case 4:
        return pushHostContainer(
          workInProgress2,
          workInProgress2.stateNode.containerInfo
        ), props = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          null,
          props,
          renderLanes2
        ) : reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 11:
        return updateForwardRef(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 7:
        return props = workInProgress2.pendingProps, markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 8:
        return reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 12:
        return reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 10:
        return updateContextProvider(current, workInProgress2, renderLanes2);
      case 9:
        return $$typeof = workInProgress2.type._context, props = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 14:
        return updateMemoComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 15:
        return updateSimpleMemoComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 19:
        return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
      case 31:
        return updateActivityComponent(current, workInProgress2, renderLanes2);
      case 22:
        return updateOffscreenComponent(
          current,
          workInProgress2,
          renderLanes2,
          workInProgress2.pendingProps
        );
      case 24:
        return prepareToReadContext(workInProgress2), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes2), $$typeof = prevState), workInProgress2.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress2.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress2.memoizedState = $$typeof, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = $$typeof), pushProvider(workInProgress2, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress2, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(
          workInProgress2,
          [CacheContext],
          renderLanes2,
          true
        ))), reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 30:
        return null === workInProgress2.stateNode && (workInProgress2.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), props = workInProgress2.pendingProps, null != props.name && "auto" !== props.name ? workInProgress2.flags |= null === current ? 18882560 : 18874368 : isHydrating && pushMaterializedTreeId(workInProgress2), null !== current && current.memoizedProps.name !== props.name ? workInProgress2.flags |= 4194816 : markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props.children, renderLanes2), workInProgress2.child;
      case 29:
        throw workInProgress2.pendingProps;
    }
    throw Error(formatProdErrorMessage(156, workInProgress2.tag));
  }
  function markUpdate(workInProgress2) {
    workInProgress2.flags |= 4;
  }
  function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, oldProps, newProps, renderLanes2) {
    var JSCompiler_temp;
    if (JSCompiler_temp = 0 !== (workInProgress2.mode & 32))
      JSCompiler_temp = null === oldProps ? maySuspendCommit(type, newProps) : maySuspendCommit(type, newProps) && (newProps.src !== oldProps.src || newProps.srcSet !== oldProps.srcSet);
    if (JSCompiler_temp) {
      if (workInProgress2.flags |= 16777216, (renderLanes2 & 335544128) === renderLanes2)
        if (workInProgress2.stateNode.complete) workInProgress2.flags |= 8192;
        else if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
        else
          throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
    } else workInProgress2.flags &= -16777217;
  }
  function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
    if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4))
      workInProgress2.flags &= -16777217;
    else if (workInProgress2.flags |= 16777216, !preloadResource(resource))
      if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
      else
        throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
  }
  function scheduleRetryEffect(workInProgress2, retryQueue) {
    null !== retryQueue && (workInProgress2.flags |= 4);
    workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
  }
  function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
    if (!isHydrating)
      switch (renderState.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var tailNode = renderState.tail, lastTailNode = null; null !== tailNode; )
            null !== tailNode.alternate && (lastTailNode = tailNode), tailNode = tailNode.sibling;
          null === lastTailNode ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode.sibling = null;
          break;
        default:
          hasRenderedATailFallback = renderState.tail;
          for (tailNode = null; null !== hasRenderedATailFallback; )
            null !== hasRenderedATailFallback.alternate && (tailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
          null === tailNode ? renderState.tail = null : tailNode.sibling = null;
      }
  }
  function bubbleProperties(completedWork) {
    var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
    if (didBailout)
      for (var child$113 = completedWork.child; null !== child$113; )
        newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags & 1206910976, subtreeFlags |= child$113.flags & 1206910976, child$113.return = completedWork, child$113 = child$113.sibling;
    else
      for (child$113 = completedWork.child; null !== child$113; )
        newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags, subtreeFlags |= child$113.flags, child$113.return = completedWork, child$113 = child$113.sibling;
    completedWork.subtreeFlags |= subtreeFlags;
    completedWork.childLanes = newChildLanes;
    return didBailout;
  }
  function completeWork(current, workInProgress2, renderLanes2) {
    var newProps = workInProgress2.pendingProps;
    popTreeContext(workInProgress2);
    switch (workInProgress2.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return bubbleProperties(workInProgress2), null;
      case 1:
        return bubbleProperties(workInProgress2), null;
      case 3:
        renderLanes2 = workInProgress2.stateNode;
        newProps = null;
        null !== current && (newProps = current.memoizedState.cache);
        workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
        popProvider(CacheContext);
        popHostContainer();
        renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
        if (null === current || null === current.child)
          popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
        bubbleProperties(workInProgress2);
        return null;
      case 26:
        var type = workInProgress2.type, nextResource = workInProgress2.memoizedState;
        null === current ? (markUpdate(workInProgress2), null !== nextResource ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          type,
          null,
          newProps,
          renderLanes2
        ))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          type,
          current,
          newProps,
          renderLanes2
        ));
        return null;
      case 27:
        popHostContext(workInProgress2);
        renderLanes2 = rootInstanceStackCursor.current;
        type = workInProgress2.type;
        if (null !== current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if (!newProps) {
            if (null === workInProgress2.stateNode)
              throw Error(formatProdErrorMessage(166));
            bubbleProperties(workInProgress2);
            workInProgress2.subtreeFlags &= -33554433;
            return null;
          }
          current = contextStackCursor.current;
          popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
        }
        bubbleProperties(workInProgress2);
        workInProgress2.subtreeFlags &= -33554433;
        return null;
      case 5:
        popHostContext(workInProgress2);
        type = workInProgress2.type;
        if (null !== current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if (!newProps) {
            if (null === workInProgress2.stateNode)
              throw Error(formatProdErrorMessage(166));
            bubbleProperties(workInProgress2);
            workInProgress2.subtreeFlags &= -33554433;
            return null;
          }
          nextResource = contextStackCursor.current;
          if (popHydrationState(workInProgress2))
            prepareToHydrateHostInstance(workInProgress2);
          else {
            var ownerDocument = getOwnerDocumentFromRootContainer(
              rootInstanceStackCursor.current
            );
            switch (nextResource) {
              case 1:
                nextResource = ownerDocument.createElementNS(
                  "http://www.w3.org/2000/svg",
                  type
                );
                break;
              case 2:
                nextResource = ownerDocument.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  type
                );
                break;
              default:
                switch (type) {
                  case "svg":
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/2000/svg",
                      type
                    );
                    break;
                  case "math":
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      type
                    );
                    break;
                  case "script":
                    nextResource = ownerDocument.createElement("div");
                    nextResource.innerHTML = "<script><\/script>";
                    nextResource = nextResource.removeChild(
                      nextResource.firstChild
                    );
                    break;
                  case "select":
                    nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", {
                      is: newProps.is
                    }) : ownerDocument.createElement("select");
                    newProps.multiple ? nextResource.multiple = true : newProps.size && (nextResource.size = newProps.size);
                    break;
                  default:
                    nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
                }
            }
            nextResource[internalInstanceKey] = workInProgress2;
            nextResource[internalPropsKey] = newProps;
            a: for (ownerDocument = workInProgress2.child; null !== ownerDocument; ) {
              if (5 === ownerDocument.tag || 6 === ownerDocument.tag)
                nextResource.appendChild(ownerDocument.stateNode);
              else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
                ownerDocument.child.return = ownerDocument;
                ownerDocument = ownerDocument.child;
                continue;
              }
              if (ownerDocument === workInProgress2) break a;
              for (; null === ownerDocument.sibling; ) {
                if (null === ownerDocument.return || ownerDocument.return === workInProgress2)
                  break a;
                ownerDocument = ownerDocument.return;
              }
              ownerDocument.sibling.return = ownerDocument.return;
              ownerDocument = ownerDocument.sibling;
            }
            workInProgress2.stateNode = nextResource;
            a: switch (setInitialProperties(nextResource, type, newProps), type) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                newProps = !!newProps.autoFocus;
                break a;
              case "img":
                newProps = true;
                break a;
              default:
                newProps = false;
            }
            newProps && markUpdate(workInProgress2);
          }
        }
        bubbleProperties(workInProgress2);
        workInProgress2.subtreeFlags &= -33554433;
        preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          workInProgress2.type,
          null === current ? null : current.memoizedProps,
          workInProgress2.pendingProps,
          renderLanes2
        );
        return null;
      case 6:
        if (current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if ("string" !== typeof newProps && null === workInProgress2.stateNode)
            throw Error(formatProdErrorMessage(166));
          current = rootInstanceStackCursor.current;
          if (popHydrationState(workInProgress2)) {
            current = workInProgress2.stateNode;
            renderLanes2 = workInProgress2.memoizedProps;
            newProps = null;
            type = hydrationParentFiber;
            if (null !== type)
              switch (type.tag) {
                case 27:
                case 5:
                  newProps = type.memoizedProps;
              }
            current[internalInstanceKey] = workInProgress2;
            current = current.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
            current || throwOnHydrationMismatch(workInProgress2, true);
          } else
            current = getOwnerDocumentFromRootContainer(current).createTextNode(
              newProps
            ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
        }
        bubbleProperties(workInProgress2);
        return null;
      case 31:
        renderLanes2 = workInProgress2.memoizedState;
        if (null === current || null !== current.memoizedState) {
          newProps = popHydrationState(workInProgress2);
          if (null !== renderLanes2) {
            if (null === current) {
              if (!newProps) throw Error(formatProdErrorMessage(318));
              current = workInProgress2.memoizedState;
              current = null !== current ? current.dehydrated : null;
              if (!current) throw Error(formatProdErrorMessage(557));
              current[internalInstanceKey] = workInProgress2;
            } else
              resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
            bubbleProperties(workInProgress2);
            current = false;
          } else
            renderLanes2 = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes2), current = true;
          if (!current) {
            if (workInProgress2.flags & 256)
              return popSuspenseHandler(workInProgress2), workInProgress2;
            popSuspenseHandler(workInProgress2);
            return null;
          }
          if (0 !== (workInProgress2.flags & 128))
            throw Error(formatProdErrorMessage(558));
        }
        bubbleProperties(workInProgress2);
        return null;
      case 13:
        newProps = workInProgress2.memoizedState;
        if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
          type = popHydrationState(workInProgress2);
          if (null !== newProps && null !== newProps.dehydrated) {
            if (null === current) {
              if (!type) throw Error(formatProdErrorMessage(318));
              type = workInProgress2.memoizedState;
              type = null !== type ? type.dehydrated : null;
              if (!type) throw Error(formatProdErrorMessage(317));
              type[internalInstanceKey] = workInProgress2;
            } else
              resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
            bubbleProperties(workInProgress2);
            type = false;
          } else
            type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = true;
          if (!type) {
            if (workInProgress2.flags & 256)
              return popSuspenseHandler(workInProgress2), workInProgress2;
            popSuspenseHandler(workInProgress2);
            return null;
          }
        }
        popSuspenseHandler(workInProgress2);
        if (0 !== (workInProgress2.flags & 128))
          return workInProgress2.lanes = renderLanes2, workInProgress2;
        renderLanes2 = null !== newProps;
        current = null !== current && null !== current.memoizedState;
        renderLanes2 && (newProps = workInProgress2.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
        renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
        scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
        bubbleProperties(workInProgress2);
        return null;
      case 4:
        return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), workInProgress2.flags |= 67108864, bubbleProperties(workInProgress2), null;
      case 10:
        return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
      case 19:
        popSuspenseListContext(workInProgress2);
        newProps = workInProgress2.memoizedState;
        if (null === newProps) return bubbleProperties(workInProgress2), null;
        type = 0 !== (workInProgress2.flags & 128);
        nextResource = newProps.rendering;
        if (null === nextResource)
          if (type) cutOffTailIfNeeded(newProps, false);
          else {
            if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
              for (current = workInProgress2.child; null !== current; ) {
                nextResource = findFirstSuspended(current);
                if (null !== nextResource) {
                  workInProgress2.flags |= 128;
                  cutOffTailIfNeeded(newProps, false);
                  current = nextResource.updateQueue;
                  workInProgress2.updateQueue = current;
                  scheduleRetryEffect(workInProgress2, current);
                  workInProgress2.subtreeFlags = 0;
                  current = renderLanes2;
                  for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                    resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                  pushSuspenseListContext(
                    workInProgress2,
                    suspenseStackCursor.current & 1 | 2
                  );
                  isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
                  return workInProgress2.child;
                }
                current = current.sibling;
              }
            null !== newProps.tail && now2() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
          }
        else {
          if (!type)
            if (current = findFirstSuspended(nextResource), null !== current) {
              if (workInProgress2.flags |= 128, type = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(newProps, true), null === newProps.tail && "collapsed" !== newProps.tailMode && "visible" !== newProps.tailMode && !nextResource.alternate && !isHydrating)
                return bubbleProperties(workInProgress2), null;
            } else
              2 * now2() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
          newProps.isBackwards ? (nextResource.sibling = workInProgress2.child, workInProgress2.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress2.child = nextResource, newProps.last = nextResource);
        }
        if (null !== newProps.tail) {
          current = newProps.tail;
          a: {
            for (renderLanes2 = current; null !== renderLanes2; ) {
              if (null !== renderLanes2.alternate) {
                renderLanes2 = false;
                break a;
              }
              renderLanes2 = renderLanes2.sibling;
            }
            renderLanes2 = true;
          }
          newProps.rendering = current;
          newProps.tail = current.sibling;
          newProps.renderingStartTime = now2();
          current.sibling = null;
          nextResource = suspenseStackCursor.current;
          nextResource = type ? nextResource & 1 | 2 : nextResource & 1;
          "visible" === newProps.tailMode || "collapsed" === newProps.tailMode || !renderLanes2 || isHydrating ? pushSuspenseListContext(workInProgress2, nextResource) : (renderLanes2 = nextResource, push(suspenseHandlerStackCursor, workInProgress2), push(suspenseStackCursor, renderLanes2), null === shellBoundary && (shellBoundary = workInProgress2));
          isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
          return current;
        }
        bubbleProperties(workInProgress2);
        return null;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
      case 24:
        return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
      case 25:
        return null;
      case 30:
        return workInProgress2.flags |= 33554432, bubbleProperties(workInProgress2), null;
    }
    throw Error(formatProdErrorMessage(156, workInProgress2.tag));
  }
  function unwindWork(current, workInProgress2) {
    popTreeContext(workInProgress2);
    switch (workInProgress2.tag) {
      case 1:
        return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 3:
        return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 26:
      case 27:
      case 5:
        return popHostContext(workInProgress2), null;
      case 31:
        if (null !== workInProgress2.memoizedState) {
          popSuspenseHandler(workInProgress2);
          if (null === workInProgress2.alternate)
            throw Error(formatProdErrorMessage(340));
          resetHydrationState();
        }
        current = workInProgress2.flags;
        return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 13:
        popSuspenseHandler(workInProgress2);
        current = workInProgress2.memoizedState;
        if (null !== current && null !== current.dehydrated) {
          if (null === workInProgress2.alternate)
            throw Error(formatProdErrorMessage(340));
          resetHydrationState();
        }
        current = workInProgress2.flags;
        return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 19:
        return popSuspenseListContext(workInProgress2), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, current = workInProgress2.memoizedState, null !== current && (current.rendering = null, current.tail = null), workInProgress2.flags |= 4, workInProgress2) : null;
      case 4:
        return popHostContainer(), null;
      case 10:
        return popProvider(workInProgress2.type), null;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 24:
        return popProvider(CacheContext), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function unwindInterruptedWork(current, interruptedWork) {
    popTreeContext(interruptedWork);
    switch (interruptedWork.tag) {
      case 3:
        popProvider(CacheContext);
        popHostContainer();
        break;
      case 26:
      case 27:
      case 5:
        popHostContext(interruptedWork);
        break;
      case 4:
        popHostContainer();
        break;
      case 31:
        null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
        break;
      case 13:
        popSuspenseHandler(interruptedWork);
        break;
      case 19:
        popSuspenseListContext(interruptedWork);
        break;
      case 10:
        popProvider(interruptedWork.type);
        break;
      case 22:
      case 23:
        popSuspenseHandler(interruptedWork);
        popHiddenContext();
        null !== current && pop(resumedCache);
        break;
      case 24:
        popProvider(CacheContext);
    }
  }
  function commitHookEffectListMount(flags, finishedWork) {
    try {
      var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
      if (null !== lastEffect) {
        var firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags) {
            lastEffect = void 0;
            var create2 = updateQueue.create, inst = updateQueue.inst;
            lastEffect = create2();
            inst.destroy = lastEffect;
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
    try {
      var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
      if (null !== lastEffect) {
        var firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags) {
            var inst = updateQueue.inst, destroy = inst.destroy;
            if (void 0 !== destroy) {
              inst.destroy = void 0;
              lastEffect = finishedWork;
              var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
              try {
                destroy_();
              } catch (error) {
                captureCommitPhaseError(
                  lastEffect,
                  nearestMountedAncestor,
                  error
                );
              }
            }
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitClassCallbacks(finishedWork) {
    var updateQueue = finishedWork.updateQueue;
    if (null !== updateQueue) {
      var instance = finishedWork.stateNode;
      try {
        commitCallbacks(updateQueue, instance);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
  }
  function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
    instance.props = resolveClassComponentProps(
      current.type,
      current.memoizedProps
    );
    instance.state = current.memoizedState;
    try {
      instance.componentWillUnmount();
    } catch (error) {
      captureCommitPhaseError(current, nearestMountedAncestor, error);
    }
  }
  function safelyAttachRef(current, nearestMountedAncestor) {
    try {
      var ref = current.ref;
      if (null !== ref) {
        switch (current.tag) {
          case 26:
          case 27:
          case 5:
            var instanceToUse = current.stateNode;
            break;
          case 30:
            var instance = current.stateNode, name = getViewTransitionName(current.memoizedProps, instance);
            if (null === instance.ref || instance.ref.name !== name)
              instance.ref = createViewTransitionInstance(name);
            instanceToUse = instance.ref;
            break;
          case 7:
            if (null === current.stateNode) {
              var fragmentInstance = new FragmentInstance(current);
              traverseVisibleInstancesAndTextInstances(
                current.child,
                false,
                addFragmentHandleToFiber,
                fragmentInstance,
                void 0,
                void 0
              );
              current.stateNode = fragmentInstance;
            }
            instanceToUse = current.stateNode;
            break;
          default:
            instanceToUse = current.stateNode;
        }
        "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
      }
    } catch (error) {
      captureCommitPhaseError(current, nearestMountedAncestor, error);
    }
  }
  function safelyDetachRef(current, nearestMountedAncestor) {
    var ref = current.ref, refCleanup = current.refCleanup;
    if (null !== ref)
      if ("function" === typeof refCleanup)
        try {
          refCleanup();
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        } finally {
          current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
        }
      else if ("function" === typeof ref)
        try {
          ref(null);
        } catch (error$148) {
          captureCommitPhaseError(current, nearestMountedAncestor, error$148);
        }
      else ref.current = null;
  }
  function commitNewChildToFragmentInstances(fiber, parentFragmentInstances) {
    if ((5 === fiber.tag || 27 === fiber.tag || 6 === fiber.tag) && null === fiber.alternate && null !== parentFragmentInstances)
      for (var i = 0; i < parentFragmentInstances.length; i++)
        commitNewChildToFragmentInstance(
          fiber.stateNode,
          parentFragmentInstances[i]
        );
  }
  function commitFragmentInstanceInsertionEffects(fiber) {
    for (var parent = fiber.return; null !== parent; ) {
      isFragmentInstanceParent(parent) && commitNewChildToFragmentInstance(fiber.stateNode, parent.stateNode);
      if (isFragmentInstanceHostBoundary(parent)) break;
      parent = parent.return;
    }
  }
  function commitFragmentInstanceDeletionEffects(fiber) {
    for (var parent = fiber.return; null !== parent; ) {
      isFragmentInstanceParent(parent) && deleteChildFromFragmentInstance(fiber.stateNode, parent.stateNode);
      if (isFragmentInstanceHostBoundary(parent)) break;
      parent = parent.return;
    }
  }
  function isFragmentInstanceHostBoundary(fiber) {
    return 5 === fiber.tag || 3 === fiber.tag || 27 === fiber.tag;
  }
  function isFragmentInstanceParent(fiber) {
    return fiber && 7 === fiber.tag && null !== fiber.stateNode;
  }
  function commitHostMount(finishedWork) {
    var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
    try {
      a: switch (type) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          props.autoFocus && instance.focus();
          break a;
        case "img":
          props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitHostUpdate(finishedWork, newProps, oldProps) {
    try {
      var domElement = finishedWork.stateNode;
      updateProperties(domElement, finishedWork.type, oldProps, newProps);
      domElement[internalPropsKey] = newProps;
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function isHostParent(fiber) {
    return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
  }
  function getHostSibling(fiber) {
    a: for (; ; ) {
      for (; null === fiber.sibling; ) {
        if (null === fiber.return || isHostParent(fiber.return)) return null;
        fiber = fiber.return;
      }
      fiber.sibling.return = fiber.return;
      for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
        if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
        if (fiber.flags & 2) continue a;
        if (null === fiber.child || 4 === fiber.tag) continue a;
        else fiber.child.return = fiber, fiber = fiber.child;
      }
      if (!(fiber.flags & 2)) return fiber.stateNode;
    }
  }
  function insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances) {
    var tag = node.tag;
    if (5 === tag || 6 === tag)
      tag = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(tag, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(tag), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1)), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
    else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode, before = null)), node = node.child, null !== node))
      for (insertOrAppendPlacementNodeIntoContainer(
        node,
        before,
        parent,
        parentFragmentInstances
      ), node = node.sibling; null !== node; )
        insertOrAppendPlacementNodeIntoContainer(
          node,
          before,
          parent,
          parentFragmentInstances
        ), node = node.sibling;
  }
  function insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances) {
    var tag = node.tag;
    if (5 === tag || 6 === tag)
      tag = node.stateNode, before ? parent.insertBefore(tag, before) : parent.appendChild(tag), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
    else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode)), node = node.child, null !== node))
      for (insertOrAppendPlacementNode(
        node,
        before,
        parent,
        parentFragmentInstances
      ), node = node.sibling; null !== node; )
        insertOrAppendPlacementNode(
          node,
          before,
          parent,
          parentFragmentInstances
        ), node = node.sibling;
  }
  function commitHostSingletonAcquisition(finishedWork) {
    var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
    try {
      for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length; )
        singleton.removeAttributeNode(attributes[0]);
      setInitialProperties(singleton, type, props);
      singleton[internalInstanceKey] = finishedWork;
      singleton[internalPropsKey] = props;
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  var shouldStartViewTransition = false, appearingViewTransitions = null;
  function trackEnterViewTransitions(placement) {
    if (30 === placement.tag || 0 !== (placement.subtreeFlags & 33554432))
      shouldStartViewTransition = true;
  }
  var viewTransitionCancelableChildren = null;
  function pushViewTransitionCancelableScope() {
    var prevChildren = viewTransitionCancelableChildren;
    viewTransitionCancelableChildren = null;
    return prevChildren;
  }
  var viewTransitionHostInstanceIdx = 0;
  function applyViewTransitionToHostInstances(fiber, name, className, collectMeasurements, stopAtNestedViewTransitions) {
    viewTransitionHostInstanceIdx = 0;
    return applyViewTransitionToHostInstancesRecursive(
      fiber.child,
      name,
      className,
      collectMeasurements,
      stopAtNestedViewTransitions
    );
  }
  function applyViewTransitionToHostInstancesRecursive(child, name, className, collectMeasurements, stopAtNestedViewTransitions) {
    for (var inViewport = false; null !== child; ) {
      if (5 === child.tag) {
        var instance = child.stateNode;
        if (null !== collectMeasurements) {
          var measurement = measureInstance(instance);
          collectMeasurements.push(measurement);
          measurement.view && (inViewport = true);
        } else
          inViewport || measureInstance(instance).view && (inViewport = true);
        shouldStartViewTransition = true;
        applyViewTransitionName(
          instance,
          0 === viewTransitionHostInstanceIdx ? name : name + "_" + viewTransitionHostInstanceIdx,
          className
        );
        viewTransitionHostInstanceIdx++;
      } else if (22 !== child.tag || null === child.memoizedState)
        30 === child.tag && stopAtNestedViewTransitions || applyViewTransitionToHostInstancesRecursive(
          child.child,
          name,
          className,
          collectMeasurements,
          stopAtNestedViewTransitions
        ) && (inViewport = true);
      child = child.sibling;
    }
    return inViewport;
  }
  function restoreViewTransitionOnHostInstances(child, stopAtNestedViewTransitions) {
    for (; null !== child; ) {
      if (5 === child.tag)
        restoreViewTransitionName(child.stateNode, child.memoizedProps);
      else if (22 !== child.tag || null === child.memoizedState)
        30 === child.tag && stopAtNestedViewTransitions || restoreViewTransitionOnHostInstances(
          child.child,
          stopAtNestedViewTransitions
        );
      child = child.sibling;
    }
  }
  function commitAppearingPairViewTransitions(placement) {
    if (0 !== (placement.subtreeFlags & 18874368))
      for (placement = placement.child; null !== placement; ) {
        if (22 !== placement.tag || null === placement.memoizedState) {
          if (commitAppearingPairViewTransitions(placement), 30 === placement.tag && 0 !== (placement.flags & 18874368) && placement.stateNode.paired) {
            var props = placement.memoizedProps;
            if (null == props.name || "auto" === props.name)
              throw Error(formatProdErrorMessage(544));
            var name = props.name;
            props = getViewTransitionClassName(props.default, props.share);
            "none" !== props && (applyViewTransitionToHostInstances(
              placement,
              name,
              props,
              null,
              false
            ) || restoreViewTransitionOnHostInstances(placement.child, false));
          }
        }
        placement = placement.sibling;
      }
  }
  function commitEnterViewTransitions(placement, gesture) {
    if (30 === placement.tag) {
      var state = placement.stateNode, props = placement.memoizedProps, name = getViewTransitionName(props, state), className = getViewTransitionClassName(
        props.default,
        state.paired ? props.share : props.enter
      );
      "none" !== className ? applyViewTransitionToHostInstances(placement, name, className, null, false) ? (commitAppearingPairViewTransitions(placement), state.paired || gesture || scheduleViewTransitionEvent(placement, props.onEnter)) : restoreViewTransitionOnHostInstances(placement.child, false) : commitAppearingPairViewTransitions(placement);
    } else if (0 !== (placement.subtreeFlags & 33554432))
      for (placement = placement.child; null !== placement; )
        commitEnterViewTransitions(placement, gesture), placement = placement.sibling;
    else commitAppearingPairViewTransitions(placement);
  }
  function commitDeletedPairViewTransitions(deletion) {
    if (null !== appearingViewTransitions && 0 !== appearingViewTransitions.size) {
      var pairs = appearingViewTransitions;
      if (0 !== (deletion.subtreeFlags & 18874368))
        for (deletion = deletion.child; null !== deletion; ) {
          if (22 !== deletion.tag || null === deletion.memoizedState) {
            if (30 === deletion.tag && 0 !== (deletion.flags & 18874368)) {
              var props = deletion.memoizedProps, name = props.name;
              if (null != name && "auto" !== name) {
                var pair = pairs.get(name);
                if (void 0 !== pair) {
                  var className = getViewTransitionClassName(
                    props.default,
                    props.share
                  );
                  "none" !== className && (applyViewTransitionToHostInstances(
                    deletion,
                    name,
                    className,
                    null,
                    false
                  ) ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, scheduleViewTransitionEvent(deletion, props.onShare)) : restoreViewTransitionOnHostInstances(deletion.child, false));
                  pairs.delete(name);
                  if (0 === pairs.size) break;
                }
              }
            }
            commitDeletedPairViewTransitions(deletion);
          }
          deletion = deletion.sibling;
        }
    }
  }
  function commitExitViewTransitions(deletion) {
    if (30 === deletion.tag) {
      var props = deletion.memoizedProps, name = getViewTransitionName(props, deletion.stateNode), pair = null !== appearingViewTransitions ? appearingViewTransitions.get(name) : void 0, className = getViewTransitionClassName(
        props.default,
        void 0 !== pair ? props.share : props.exit
      );
      "none" !== className && (applyViewTransitionToHostInstances(deletion, name, className, null, false) ? void 0 !== pair ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, appearingViewTransitions.delete(name), scheduleViewTransitionEvent(deletion, props.onShare)) : scheduleViewTransitionEvent(deletion, props.onExit) : restoreViewTransitionOnHostInstances(deletion.child, false));
      null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
    } else if (0 !== (deletion.subtreeFlags & 33554432))
      for (deletion = deletion.child; null !== deletion; )
        commitExitViewTransitions(deletion), deletion = deletion.sibling;
    else
      null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
  }
  function commitNestedViewTransitions(changedParent) {
    for (changedParent = changedParent.child; null !== changedParent; ) {
      if (30 === changedParent.tag) {
        var props = changedParent.memoizedProps, name = getViewTransitionName(props, changedParent.stateNode);
        props = getViewTransitionClassName(props.default, props.update);
        changedParent.flags &= -5;
        "none" !== props && applyViewTransitionToHostInstances(
          changedParent,
          name,
          props,
          changedParent.memoizedState = [],
          false
        );
      } else
        0 !== (changedParent.subtreeFlags & 33554432) && commitNestedViewTransitions(changedParent);
      changedParent = changedParent.sibling;
    }
  }
  function restorePairedViewTransitions(parent) {
    if (0 !== (parent.subtreeFlags & 18874368))
      for (parent = parent.child; null !== parent; ) {
        if (22 !== parent.tag || null === parent.memoizedState) {
          if (30 === parent.tag && 0 !== (parent.flags & 18874368)) {
            var instance = parent.stateNode;
            null !== instance.paired && (instance.paired = null, restoreViewTransitionOnHostInstances(parent.child, false));
          }
          restorePairedViewTransitions(parent);
        }
        parent = parent.sibling;
      }
  }
  function restoreEnterOrExitViewTransitions(fiber) {
    if (30 === fiber.tag)
      fiber.stateNode.paired = null, restoreViewTransitionOnHostInstances(fiber.child, false), restorePairedViewTransitions(fiber);
    else if (0 !== (fiber.subtreeFlags & 33554432))
      for (fiber = fiber.child; null !== fiber; )
        restoreEnterOrExitViewTransitions(fiber), fiber = fiber.sibling;
    else restorePairedViewTransitions(fiber);
  }
  function restoreNestedViewTransitions(changedParent) {
    for (changedParent = changedParent.child; null !== changedParent; )
      30 === changedParent.tag ? restoreViewTransitionOnHostInstances(changedParent.child, false) : 0 !== (changedParent.subtreeFlags & 33554432) && restoreNestedViewTransitions(changedParent), changedParent = changedParent.sibling;
  }
  function measureViewTransitionHostInstancesRecursive(parentViewTransition, child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) {
    for (var inViewport = false; null !== child; ) {
      if (5 === child.tag) {
        var instance = child.stateNode;
        if (null !== previousMeasurements && viewTransitionHostInstanceIdx < previousMeasurements.length) {
          var previousMeasurement = previousMeasurements[viewTransitionHostInstanceIdx], nextMeasurement = measureInstance(instance);
          if (previousMeasurement.view || nextMeasurement.view) inViewport = true;
          var JSCompiler_temp;
          if (JSCompiler_temp = 0 === (parentViewTransition.flags & 4))
            if (nextMeasurement.clip) JSCompiler_temp = true;
            else {
              JSCompiler_temp = previousMeasurement.rect;
              var newRect = nextMeasurement.rect;
              JSCompiler_temp = JSCompiler_temp.y !== newRect.y || JSCompiler_temp.x !== newRect.x || JSCompiler_temp.height !== newRect.height || JSCompiler_temp.width !== newRect.width;
            }
          JSCompiler_temp && (parentViewTransition.flags |= 4);
          nextMeasurement.abs ? nextMeasurement = !previousMeasurement.abs : (previousMeasurement = previousMeasurement.rect, nextMeasurement = nextMeasurement.rect, nextMeasurement = previousMeasurement.height !== nextMeasurement.height || previousMeasurement.width !== nextMeasurement.width);
          nextMeasurement && (parentViewTransition.flags |= 32);
        } else parentViewTransition.flags |= 32;
        0 !== (parentViewTransition.flags & 4) && applyViewTransitionName(
          instance,
          0 === viewTransitionHostInstanceIdx ? newName : newName + "_" + viewTransitionHostInstanceIdx,
          className
        );
        inViewport && 0 !== (parentViewTransition.flags & 4) || (null === viewTransitionCancelableChildren && (viewTransitionCancelableChildren = []), viewTransitionCancelableChildren.push(
          instance,
          0 === viewTransitionHostInstanceIdx ? oldName : oldName + "_" + viewTransitionHostInstanceIdx,
          child.memoizedProps
        ));
        viewTransitionHostInstanceIdx++;
      } else if (22 !== child.tag || null === child.memoizedState)
        30 === child.tag && stopAtNestedViewTransitions ? parentViewTransition.flags |= child.flags & 32 : measureViewTransitionHostInstancesRecursive(
          parentViewTransition,
          child.child,
          newName,
          oldName,
          className,
          previousMeasurements,
          stopAtNestedViewTransitions
        ) && (inViewport = true);
      child = child.sibling;
    }
    return inViewport;
  }
  function measureNestedViewTransitions(changedParent, gesture) {
    for (changedParent = changedParent.child; null !== changedParent; ) {
      if (30 === changedParent.tag) {
        var props = changedParent.memoizedProps, state = changedParent.stateNode, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, props.update);
        var previousMeasurements;
        previousMeasurements = changedParent.memoizedState, changedParent.memoizedState = null;
        state = changedParent;
        var child = changedParent.child;
        viewTransitionHostInstanceIdx = 0;
        name = measureViewTransitionHostInstancesRecursive(
          state,
          child,
          name,
          name,
          className,
          previousMeasurements,
          false
        );
        0 !== (changedParent.flags & 4) && name && scheduleViewTransitionEvent(changedParent, props.onUpdate);
      } else
        0 !== (changedParent.subtreeFlags & 33554432) && measureNestedViewTransitions(changedParent);
      changedParent = changedParent.sibling;
    }
  }
  var offscreenSubtreeIsHidden = false, offscreenSubtreeWasHidden = false, offscreenDirectParentIsHidden = false, needsFormReset = false, PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set, nextEffect = null, viewTransitionContextChanged = false, inUpdateViewTransition = false, rootViewTransitionAffected = false, rootViewTransitionNameCanceled = false;
  function commitBeforeMutationEffects(root2, firstChild, committedLanes) {
    root2 = root2.containerInfo;
    eventsEnabled = _enabled;
    root2 = getActiveElementDeep(root2);
    if (hasSelectionCapabilities(root2)) {
      if ("selectionStart" in root2)
        var JSCompiler_temp = {
          start: root2.selectionStart,
          end: root2.selectionEnd
        };
      else
        a: {
          JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
          var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
          if (selection && 0 !== selection.rangeCount) {
            JSCompiler_temp = selection.anchorNode;
            var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
            selection = selection.focusOffset;
            try {
              JSCompiler_temp.nodeType, focusNode.nodeType;
            } catch (e$21) {
              JSCompiler_temp = null;
              break a;
            }
            var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
            b: for (; ; ) {
              for (var next; ; ) {
                node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
                node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
                3 === node.nodeType && (length += node.nodeValue.length);
                if (null === (next = node.firstChild)) break;
                parentNode = node;
                node = next;
              }
              for (; ; ) {
                if (node === root2) break b;
                parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                if (null !== (next = node.nextSibling)) break;
                node = parentNode;
                parentNode = node.parentNode;
              }
              node = next;
            }
            JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
          } else JSCompiler_temp = null;
        }
      JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
    } else JSCompiler_temp = null;
    selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp };
    _enabled = false;
    committedLanes = (committedLanes & 335544064) === committedLanes;
    nextEffect = firstChild;
    for (firstChild = committedLanes ? 9270 : 1024; null !== nextEffect; ) {
      root2 = nextEffect;
      if (committedLanes && (JSCompiler_temp = root2.deletions, null !== JSCompiler_temp))
        for (anchorOffset = 0; anchorOffset < JSCompiler_temp.length; anchorOffset++)
          committedLanes && commitExitViewTransitions(JSCompiler_temp[anchorOffset]);
      if (null === root2.alternate && 0 !== (root2.flags & 2))
        committedLanes && trackEnterViewTransitions(root2), commitBeforeMutationEffects_complete(committedLanes);
      else {
        if (22 === root2.tag) {
          if (JSCompiler_temp = root2.alternate, null !== root2.memoizedState) {
            null !== JSCompiler_temp && null === JSCompiler_temp.memoizedState && committedLanes && commitExitViewTransitions(JSCompiler_temp);
            commitBeforeMutationEffects_complete(committedLanes);
            continue;
          } else if (null !== JSCompiler_temp && null !== JSCompiler_temp.memoizedState) {
            committedLanes && trackEnterViewTransitions(root2);
            commitBeforeMutationEffects_complete(committedLanes);
            continue;
          }
        }
        JSCompiler_temp = root2.child;
        0 !== (root2.subtreeFlags & firstChild) && null !== JSCompiler_temp ? (JSCompiler_temp.return = root2, nextEffect = JSCompiler_temp) : (committedLanes && commitNestedViewTransitions(root2), commitBeforeMutationEffects_complete(committedLanes));
      }
    }
    appearingViewTransitions = null;
  }
  function commitBeforeMutationEffects_complete(isViewTransitionEligible$jscomp$0) {
    for (; null !== nextEffect; ) {
      var fiber = nextEffect, isViewTransitionEligible = isViewTransitionEligible$jscomp$0, current = fiber.alternate, flags = fiber.flags;
      switch (fiber.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (0 !== (flags & 1024) && null !== current) {
            isViewTransitionEligible = void 0;
            flags = current.memoizedProps;
            current = current.memoizedState;
            var instance = fiber.stateNode;
            try {
              var resolvedPrevProps = resolveClassComponentProps(
                fiber.type,
                flags
              );
              isViewTransitionEligible = instance.getSnapshotBeforeUpdate(
                resolvedPrevProps,
                current
              );
              instance.__reactInternalSnapshotBeforeUpdate = isViewTransitionEligible;
            } catch (error) {
              captureCommitPhaseError(fiber, fiber.return, error);
            }
          }
          break;
        case 3:
          if (0 !== (flags & 1024)) {
            if (current = fiber.stateNode.containerInfo, isViewTransitionEligible = current.nodeType, 9 === isViewTransitionEligible)
              clearContainerSparingly(current);
            else if (1 === isViewTransitionEligible)
              switch (current.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  clearContainerSparingly(current);
                  break;
                default:
                  current.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          isViewTransitionEligible && null !== current && (isViewTransitionEligible = getViewTransitionName(
            current.memoizedProps,
            current.stateNode
          ), flags = fiber.memoizedProps, flags = getViewTransitionClassName(flags.default, flags.update), "none" !== flags && applyViewTransitionToHostInstances(
            current,
            isViewTransitionEligible,
            flags,
            current.memoizedState = [],
            true
          ));
          break;
        default:
          if (0 !== (flags & 1024)) throw Error(formatProdErrorMessage(163));
      }
      current = fiber.sibling;
      if (null !== current) {
        current.return = fiber.return;
        nextEffect = current;
        break;
      }
      nextEffect = fiber.return;
    }
  }
  function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
    var flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitHookEffectListMount(5, finishedWork);
        break;
      case 1:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 4)
          if (finishedRoot = finishedWork.stateNode, null === current)
            try {
              finishedRoot.componentDidMount();
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          else {
            var prevProps = resolveClassComponentProps(
              finishedWork.type,
              current.memoizedProps
            );
            current = current.memoizedState;
            try {
              finishedRoot.componentDidUpdate(
                prevProps,
                current,
                finishedRoot.__reactInternalSnapshotBeforeUpdate
              );
            } catch (error$146) {
              captureCommitPhaseError(
                finishedWork,
                finishedWork.return,
                error$146
              );
            }
          }
        flags & 64 && commitClassCallbacks(finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 3:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
          current = null;
          if (null !== finishedWork.child)
            switch (finishedWork.child.tag) {
              case 27:
              case 5:
                current = finishedWork.child.stateNode;
                break;
              case 1:
                current = finishedWork.child.stateNode;
            }
          try {
            commitCallbacks(finishedRoot, current);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        break;
      case 27:
        null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
      case 26:
      case 5:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        null === current && flags & 4 && commitHostMount(finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 12:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        break;
      case 31:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 13:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
          null,
          finishedWork
        ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
        break;
      case 22:
        flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
        if (!flags) {
          var newOffscreenSubtreeWasHidden = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
          current = offscreenSubtreeIsHidden;
          prevProps = offscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = flags;
          (offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden) && !prevProps ? (flags = 2, 0 !== (finishedWork.subtreeFlags & 8772) && (flags |= 1), recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            flags
          )) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          offscreenSubtreeIsHidden = current;
          offscreenSubtreeWasHidden = prevProps;
        }
        break;
      case 30:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 7:
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
      default:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
    }
  }
  function hideOrUnhideAllChildren(parentFiber, isHidden) {
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      hideOrUnhideAllChildrenOnFiber(parentFiber, isHidden), parentFiber = parentFiber.sibling;
  }
  function hideOrUnhideAllChildrenOnFiber(fiber, isHidden) {
    switch (fiber.tag) {
      case 5:
      case 26:
        try {
          var instance = fiber.stateNode;
          if (isHidden) {
            var style2 = instance.style;
            "function" === typeof style2.setProperty ? style2.setProperty("display", "none", "important") : style2.display = "none";
          } else {
            var instance$jscomp$0 = fiber.stateNode, styleProp = fiber.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
            instance$jscomp$0.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
          }
        } catch (error) {
          captureCommitPhaseError(fiber, fiber.return, error);
        }
        hideOrUnhideNearestPortals(fiber, isHidden);
        break;
      case 6:
        try {
          fiber.stateNode.nodeValue = isHidden ? "" : fiber.memoizedProps, viewTransitionMutationContext = true;
        } catch (error) {
          captureCommitPhaseError(fiber, fiber.return, error);
        }
        break;
      case 18:
        try {
          var instance$jscomp$1 = fiber.stateNode;
          isHidden ? hideOrUnhideDehydratedBoundary(instance$jscomp$1, true) : hideOrUnhideDehydratedBoundary(fiber.stateNode, false);
        } catch (error) {
          captureCommitPhaseError(fiber, fiber.return, error);
        }
        break;
      case 22:
      case 23:
        null === fiber.memoizedState && hideOrUnhideAllChildren(fiber, isHidden);
        break;
      default:
        hideOrUnhideAllChildren(fiber, isHidden);
    }
  }
  function hideOrUnhideNearestPortals(parentFiber, isHidden$jscomp$0) {
    if (parentFiber.subtreeFlags & 67108864)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        a: {
          var fiber = parentFiber, isHidden = isHidden$jscomp$0;
          switch (fiber.tag) {
            case 4:
              hideOrUnhideAllChildrenOnFiber(fiber, isHidden);
              break a;
            case 22:
              null === fiber.memoizedState && hideOrUnhideNearestPortals(fiber, isHidden);
              break a;
            default:
              hideOrUnhideNearestPortals(fiber, isHidden);
          }
        }
        parentFiber = parentFiber.sibling;
      }
  }
  function detachFiberAfterEffects(fiber) {
    var alternate = fiber.alternate;
    null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
    fiber.child = null;
    fiber.deletions = null;
    fiber.sibling = null;
    5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
    fiber.stateNode = null;
    fiber.return = null;
    fiber.dependencies = null;
    fiber.memoizedProps = null;
    fiber.memoizedState = null;
    fiber.pendingProps = null;
    fiber.stateNode = null;
    fiber.updateQueue = null;
  }
  var hostParent = null, hostParentIsContainer = false;
  function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
    for (parent = parent.child; null !== parent; )
      commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
  }
  function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
    if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
      try {
        injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
      } catch (err) {
      }
    switch (deletedFiber.tag) {
      case 26:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && !offscreenSubtreeWasHidden && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
        break;
      case 27:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        commitFragmentInstanceDeletionEffects(deletedFiber);
        var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
        isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        releaseSingletonInstance(
          deletedFiber.stateNode,
          deletedFiber.type,
          deletedFiber.memoizedProps
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        break;
      case 5:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor), commitFragmentInstanceDeletionEffects(deletedFiber);
      case 6:
        6 === deletedFiber.tag && commitFragmentInstanceDeletionEffects(deletedFiber);
        prevHostParent = hostParent;
        prevHostParentIsContainer = hostParentIsContainer;
        hostParent = null;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        if (null !== hostParent)
          if (hostParentIsContainer)
            try {
              (9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(
                deletedFiber,
                nearestMountedAncestor,
                error
              );
            }
          else
            try {
              hostParent.removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(
                deletedFiber,
                nearestMountedAncestor,
                error
              );
            }
        break;
      case 18:
        null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(
          9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot,
          deletedFiber.stateNode
        ), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
        break;
      case 4:
        prevHostParent = hostParent;
        prevHostParentIsContainer = hostParentIsContainer;
        hostParent = deletedFiber.stateNode.containerInfo;
        hostParentIsContainer = true;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
        offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 1:
        offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
          deletedFiber,
          nearestMountedAncestor,
          prevHostParent
        ));
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 21:
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 22:
        offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        offscreenSubtreeWasHidden = prevHostParent;
        break;
      case 30:
        safelyDetachRef(deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 7:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      default:
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
    }
  }
  function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
    if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
      finishedRoot = finishedRoot.dehydrated;
      try {
        retryIfBlockedOn(finishedRoot);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
  }
  function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
    if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
      try {
        retryIfBlockedOn(finishedRoot);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
  }
  function getRetryCache(finishedWork) {
    switch (finishedWork.tag) {
      case 31:
      case 13:
      case 19:
        var retryCache = finishedWork.stateNode;
        null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
        return retryCache;
      case 22:
        return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
      default:
        throw Error(formatProdErrorMessage(435, finishedWork.tag));
    }
  }
  function attachSuspenseRetryListeners(finishedWork, wakeables) {
    var retryCache = getRetryCache(finishedWork);
    wakeables.forEach(function(wakeable) {
      if (!retryCache.has(wakeable)) {
        retryCache.add(wakeable);
        var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
        wakeable.then(retry, retry);
      }
    });
  }
  function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber, lanes) {
    var deletions = parentFiber.deletions;
    if (null !== deletions)
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
        a: for (; null !== parent; ) {
          switch (parent.tag) {
            case 27:
              if (isSingletonScope(parent.type)) {
                hostParent = parent.stateNode;
                hostParentIsContainer = false;
                break a;
              }
              break;
            case 5:
              hostParent = parent.stateNode;
              hostParentIsContainer = false;
              break a;
            case 3:
            case 4:
              hostParent = parent.stateNode.containerInfo;
              hostParentIsContainer = true;
              break a;
          }
          parent = parent.return;
        }
        if (null === hostParent) throw Error(formatProdErrorMessage(160));
        commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete);
        hostParent = null;
        hostParentIsContainer = false;
        root2 = childToDelete.alternate;
        null !== root2 && (root2.return = null);
        childToDelete.return = null;
      }
    if (parentFiber.subtreeFlags & 13886)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitMutationEffectsOnFiber(parentFiber, root$jscomp$0, lanes), parentFiber = parentFiber.sibling;
  }
  var currentHoistableRoot = null;
  function commitMutationEffectsOnFiber(finishedWork, root2, lanes) {
    var current = finishedWork.alternate, flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (flags & 4 && (current = finishedWork.updateQueue, current = null !== current ? current.events : null, null !== current))
          for (var ii = 0; ii < current.length; ii++) {
            var _eventPayloads$ii2 = current[ii];
            _eventPayloads$ii2.ref.impl = _eventPayloads$ii2.nextImpl;
          }
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
        break;
      case 1:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (root2 = finishedWork.callbacks, null !== root2 && (lanes = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === lanes ? root2 : lanes.concat(root2))));
        break;
      case 26:
        ii = currentHoistableRoot;
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        if (flags & 4)
          if (flags = null !== current ? current.memoizedState : null, lanes = finishedWork.memoizedState, null === current)
            if (null === lanes)
              if (null === finishedWork.stateNode)
                if (offscreenSubtreeIsHidden)
                  finishedWork.stateNode = createHoistableInstance(
                    finishedWork.type,
                    finishedWork.memoizedProps,
                    root2.containerInfo,
                    finishedWork
                  );
                else {
                  a: {
                    root2 = finishedWork.type;
                    lanes = finishedWork.memoizedProps;
                    flags = ii.ownerDocument || ii;
                    b: switch (root2) {
                      case "title":
                        current = flags.getElementsByTagName("title")[0];
                        if (!current || current[internalHoistableMarker] || current[internalInstanceKey] || "http://www.w3.org/2000/svg" === current.namespaceURI || current.hasAttribute("itemprop"))
                          current = flags.createElement(root2), flags.head.insertBefore(
                            current,
                            flags.querySelector("head > title")
                          );
                        setInitialProperties(current, root2, lanes);
                        current[internalInstanceKey] = finishedWork;
                        markNodeAsHoistable(current);
                        root2 = current;
                        break a;
                      case "link":
                        if (ii = getHydratableHoistableCache(
                          "link",
                          "href",
                          flags
                        ).get(root2 + (lanes.href || ""))) {
                          for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                            if (current = ii[_eventPayloads$ii2], current.getAttribute("href") === (null == lanes.href || "" === lanes.href ? null : lanes.href) && current.getAttribute("rel") === (null == lanes.rel ? null : lanes.rel) && current.getAttribute("title") === (null == lanes.title ? null : lanes.title) && current.getAttribute("crossorigin") === (null == lanes.crossOrigin ? null : lanes.crossOrigin)) {
                              ii.splice(_eventPayloads$ii2, 1);
                              break b;
                            }
                        }
                        current = flags.createElement(root2);
                        setInitialProperties(current, root2, lanes);
                        flags.head.appendChild(current);
                        break;
                      case "meta":
                        if (ii = getHydratableHoistableCache(
                          "meta",
                          "content",
                          flags
                        ).get(root2 + (lanes.content || ""))) {
                          for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                            if (current = ii[_eventPayloads$ii2], current.getAttribute("content") === (null == lanes.content ? null : "" + lanes.content) && current.getAttribute("name") === (null == lanes.name ? null : lanes.name) && current.getAttribute("property") === (null == lanes.property ? null : lanes.property) && current.getAttribute("http-equiv") === (null == lanes.httpEquiv ? null : lanes.httpEquiv) && current.getAttribute("charset") === (null == lanes.charSet ? null : lanes.charSet)) {
                              ii.splice(_eventPayloads$ii2, 1);
                              break b;
                            }
                        }
                        current = flags.createElement(root2);
                        setInitialProperties(current, root2, lanes);
                        flags.head.appendChild(current);
                        break;
                      default:
                        throw Error(formatProdErrorMessage(468, root2));
                    }
                    current[internalInstanceKey] = finishedWork;
                    markNodeAsHoistable(current);
                    root2 = current;
                  }
                  finishedWork.stateNode = root2;
                }
              else
                offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode);
            else
              finishedWork.stateNode = acquireResource(
                ii,
                lanes,
                finishedWork.memoizedProps
              );
          else
            flags !== lanes ? (null === flags ? (root2 = current.stateNode, null === root2 || offscreenSubtreeWasHidden || root2.parentNode.removeChild(root2)) : flags.count--, null === lanes ? offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode) : acquireResource(ii, lanes, finishedWork.memoizedProps)) : null === lanes && null !== finishedWork.stateNode && commitHostUpdate(
              finishedWork,
              finishedWork.memoizedProps,
              current.memoizedProps
            );
        break;
      case 27:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        null !== current && flags & 4 && commitHostUpdate(
          finishedWork,
          finishedWork.memoizedProps,
          current.memoizedProps
        );
        break;
      case 5:
        ii = offscreenDirectParentIsHidden;
        offscreenDirectParentIsHidden = false;
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        offscreenDirectParentIsHidden = ii;
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        if (finishedWork.flags & 32) {
          root2 = finishedWork.stateNode;
          try {
            setTextContent(root2, ""), viewTransitionMutationContext = true;
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        flags & 4 && null != finishedWork.stateNode && (root2 = finishedWork.memoizedProps, commitHostUpdate(
          finishedWork,
          root2,
          null !== current ? current.memoizedProps : root2
        ));
        flags & 1024 && (needsFormReset = true);
        break;
      case 6:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        if (flags & 4) {
          if (null === finishedWork.stateNode)
            throw Error(formatProdErrorMessage(162));
          root2 = finishedWork.memoizedProps;
          lanes = finishedWork.stateNode;
          try {
            lanes.nodeValue = root2, viewTransitionMutationContext = true;
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        break;
      case 3:
        viewTransitionMutationContext = false;
        tagCaches = null;
        ii = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(root2.containerInfo);
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        currentHoistableRoot = ii;
        commitReconciliationEffects(finishedWork);
        if (flags & 4 && null !== current && current.memoizedState.isDehydrated)
          try {
            retryIfBlockedOn(root2.containerInfo);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
        viewTransitionMutationContext = false;
        break;
      case 4:
        flags = offscreenDirectParentIsHidden;
        offscreenDirectParentIsHidden = offscreenSubtreeIsHidden;
        current = pushMutationContext();
        ii = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(
          finishedWork.stateNode.containerInfo
        );
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        currentHoistableRoot = ii;
        viewTransitionMutationContext && inUpdateViewTransition && (rootViewTransitionAffected = true);
        viewTransitionMutationContext = current;
        offscreenDirectParentIsHidden = flags;
        break;
      case 12:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        break;
      case 31:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
        break;
      case 13:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now2());
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
        break;
      case 22:
        ii = null !== finishedWork.memoizedState;
        _eventPayloads$ii2 = null !== current && null !== current.memoizedState;
        var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden, prevOffscreenDirectParentIsHidden$166 = offscreenDirectParentIsHidden;
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || ii;
        offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166 || ii;
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || _eventPayloads$ii2;
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
        offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166;
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
        commitReconciliationEffects(finishedWork);
        flags & 8192 && (root2 = finishedWork.stateNode, root2._visibility = ii ? root2._visibility & -2 : root2._visibility | 1, !ii || null === current || _eventPayloads$ii2 || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || (root2 = _eventPayloads$ii2 || offscreenSubtreeWasHidden, lanes = offscreenSubtreeIsHidden, current = offscreenSubtreeWasHidden, offscreenSubtreeIsHidden = ii || offscreenSubtreeIsHidden, offscreenSubtreeWasHidden = root2, recursivelyTraverseDisappearLayoutEffects(finishedWork, 2), offscreenSubtreeIsHidden = lanes, offscreenSubtreeWasHidden = current), !ii && offscreenDirectParentIsHidden || hideOrUnhideAllChildren(finishedWork, ii));
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (lanes = root2.retryQueue, null !== lanes && (root2.retryQueue = null, attachSuspenseRetryListeners(finishedWork, lanes))));
        break;
      case 19:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
        break;
      case 30:
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        flags = pushMutationContext();
        ii = inUpdateViewTransition;
        _eventPayloads$ii2 = (lanes & 335544064) === lanes;
        prevOffscreenSubtreeIsHidden = finishedWork.memoizedProps;
        inUpdateViewTransition = _eventPayloads$ii2 && "none" !== getViewTransitionClassName(
          prevOffscreenSubtreeIsHidden.default,
          prevOffscreenSubtreeIsHidden.update
        );
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        _eventPayloads$ii2 && null !== current && viewTransitionMutationContext && (finishedWork.flags |= 4);
        inUpdateViewTransition = ii;
        viewTransitionMutationContext = flags;
        break;
      case 21:
        break;
      case 7:
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return)), current && null !== current.stateNode && (current.stateNode._fragmentFiber = finishedWork);
      default:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes), commitReconciliationEffects(finishedWork);
    }
  }
  function commitReconciliationEffects(finishedWork) {
    var flags = finishedWork.flags;
    if (flags & 2) {
      try {
        for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
          if (isHostParent(parentFiber)) {
            hostParentFiber = parentFiber;
            break;
          }
          parentFiber = parentFiber.return;
        }
        parentFiber = null;
        for (var parent = finishedWork.return; null !== parent; ) {
          if (isFragmentInstanceParent(parent)) {
            var fragmentInstance = parent.stateNode;
            null === parentFiber ? parentFiber = [fragmentInstance] : parentFiber.push(fragmentInstance);
          }
          if (isFragmentInstanceHostBoundary(parent)) break;
          parent = parent.return;
        }
        var JSCompiler_inline_result = parentFiber;
        if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
        switch (hostParentFiber.tag) {
          case 27:
            var parent$jscomp$0 = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(
              finishedWork,
              before,
              parent$jscomp$0,
              JSCompiler_inline_result
            );
            break;
          case 5:
            var parent$149 = hostParentFiber.stateNode;
            hostParentFiber.flags & 32 && (setTextContent(parent$149, ""), hostParentFiber.flags &= -33);
            var before$150 = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(
              finishedWork,
              before$150,
              parent$149,
              JSCompiler_inline_result
            );
            break;
          case 3:
          case 4:
            var parent$151 = hostParentFiber.stateNode.containerInfo, before$152 = getHostSibling(finishedWork);
            insertOrAppendPlacementNodeIntoContainer(
              finishedWork,
              before$152,
              parent$151,
              JSCompiler_inline_result
            );
            break;
          default:
            throw Error(formatProdErrorMessage(161));
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
      finishedWork.flags &= -3;
    }
    flags & 4096 && (finishedWork.flags &= -4097);
  }
  function recursivelyResetForms(parentFiber) {
    if (parentFiber.subtreeFlags & 1024)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var fiber = parentFiber;
        recursivelyResetForms(fiber);
        5 === fiber.tag && fiber.flags & 1024 && (fiber = fiber.stateNode, _enabled = true, fiber.reset(), _enabled = false);
        parentFiber = parentFiber.sibling;
      }
  }
  function recursivelyTraverseAfterMutationEffects(root2, parentFiber) {
    if (parentFiber.subtreeFlags & 9270)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitAfterMutationEffectsOnFiber(parentFiber, root2), parentFiber = parentFiber.sibling;
    else measureNestedViewTransitions(parentFiber);
  }
  function commitAfterMutationEffectsOnFiber(finishedWork, root2) {
    var current = finishedWork.alternate;
    if (null === current) commitEnterViewTransitions(finishedWork, false);
    else
      switch (finishedWork.tag) {
        case 3:
          rootViewTransitionNameCanceled = viewTransitionContextChanged = false;
          pushViewTransitionCancelableScope();
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          if (!viewTransitionContextChanged && !rootViewTransitionAffected) {
            finishedWork = viewTransitionCancelableChildren;
            if (null !== finishedWork)
              for (var i = 0; i < finishedWork.length; i += 3) {
                current = finishedWork[i];
                var oldName = finishedWork[i + 1];
                restoreViewTransitionName(current, finishedWork[i + 2]);
                current = current.ownerDocument.documentElement;
                null !== current && current.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + oldName + ")"
                  }
                );
              }
            finishedWork = root2.containerInfo;
            finishedWork = 9 === finishedWork.nodeType ? finishedWork.documentElement : finishedWork.ownerDocument.documentElement;
            null !== finishedWork && "" === finishedWork.style.viewTransitionName && (finishedWork.style.viewTransitionName = "none", finishedWork.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), finishedWork.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            ));
            rootViewTransitionNameCanceled = true;
          }
          viewTransitionCancelableChildren = null;
          break;
        case 5:
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          break;
        case 4:
          i = viewTransitionContextChanged;
          viewTransitionContextChanged = false;
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          viewTransitionContextChanged && (rootViewTransitionAffected = true);
          viewTransitionContextChanged = i;
          break;
        case 22:
          null === finishedWork.memoizedState && (null !== current.memoizedState ? commitEnterViewTransitions(finishedWork, false) : recursivelyTraverseAfterMutationEffects(root2, finishedWork));
          break;
        case 30:
          i = viewTransitionContextChanged;
          oldName = pushViewTransitionCancelableScope();
          viewTransitionContextChanged = false;
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          viewTransitionContextChanged && (finishedWork.flags |= 4);
          var props = finishedWork.memoizedProps, state = finishedWork.stateNode;
          root2 = getViewTransitionName(props, state);
          state = getViewTransitionName(current.memoizedProps, state);
          var className = getViewTransitionClassName(props.default, props.update);
          "none" === className ? root2 = false : (props = current.memoizedState, current.memoizedState = null, current = finishedWork.child, viewTransitionHostInstanceIdx = 0, root2 = measureViewTransitionHostInstancesRecursive(
            finishedWork,
            current,
            root2,
            state,
            className,
            props,
            true
          ), viewTransitionHostInstanceIdx !== (null === props ? 0 : props.length) && (finishedWork.flags |= 32));
          0 !== (finishedWork.flags & 4) && root2 ? (scheduleViewTransitionEvent(
            finishedWork,
            finishedWork.memoizedProps.onUpdate
          ), viewTransitionCancelableChildren = oldName) : null !== oldName && (oldName.push.apply(oldName, viewTransitionCancelableChildren), viewTransitionCancelableChildren = oldName);
          viewTransitionContextChanged = 0 !== (finishedWork.flags & 32) ? true : i;
          break;
        default:
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
      }
  }
  function recursivelyTraverseLayoutEffects(root2, parentFiber) {
    if (parentFiber.subtreeFlags & 8772)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
  }
  function recursivelyTraverseDisappearLayoutEffects(parentFiber, layoutEffectTraversalFlags$jscomp$0) {
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var finishedWork = parentFiber, layoutEffectTraversalFlags = layoutEffectTraversalFlags$jscomp$0;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 1:
          safelyDetachRef(finishedWork, finishedWork.return);
          var instance = finishedWork.stateNode;
          "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
            finishedWork,
            finishedWork.return,
            instance
          );
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 27:
          0 !== (layoutEffectTraversalFlags & 2) && releaseSingletonInstance(
            finishedWork.stateNode,
            finishedWork.type,
            finishedWork.memoizedProps
          );
        case 5:
          safelyDetachRef(finishedWork, finishedWork.return);
          5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceDeletionEffects(finishedWork);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 6:
          commitFragmentInstanceDeletionEffects(finishedWork);
          break;
        case 26:
          safelyDetachRef(finishedWork, finishedWork.return);
          instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState || null === instance || offscreenSubtreeWasHidden || instance.parentNode.removeChild(instance);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 22:
          null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 30:
          safelyDetachRef(finishedWork, finishedWork.return);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 7:
          safelyDetachRef(finishedWork, finishedWork.return);
        default:
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, layoutEffectTraversalFlags) {
    layoutEffectTraversalFlags = 0 !== (parentFiber.subtreeFlags & 8772) ? layoutEffectTraversalFlags : layoutEffectTraversalFlags & -2;
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags, includeWorkInProgressEffects = 0 !== (layoutEffectTraversalFlags & 1);
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          commitHookEffectListMount(4, finishedWork);
          break;
        case 1:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          current = finishedWork;
          finishedRoot = current.stateNode;
          if ("function" === typeof finishedRoot.componentDidMount)
            try {
              finishedRoot.componentDidMount();
            } catch (error) {
              captureCommitPhaseError(current, current.return, error);
            }
          current = finishedWork;
          finishedRoot = current.updateQueue;
          if (null !== finishedRoot) {
            var instance = current.stateNode;
            try {
              var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
              if (null !== hiddenCallbacks)
                for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                  callCallback(hiddenCallbacks[finishedRoot], instance);
            } catch (error) {
              captureCommitPhaseError(current, current.return, error);
            }
          }
          includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 27:
          0 !== (layoutEffectTraversalFlags & 2) && commitHostSingletonAcquisition(finishedWork);
        case 5:
          5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceInsertionEffects(finishedWork);
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 6:
          commitFragmentInstanceInsertionEffects(finishedWork);
          break;
        case 26:
          instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState || null === instance || offscreenSubtreeIsHidden || mountHoistable(
            getHoistableRoot(instance.ownerDocument),
            finishedWork.type,
            instance
          );
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 31:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 13:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 22:
          null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 30:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 7:
          safelyAttachRef(finishedWork, finishedWork.return);
        default:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function commitOffscreenPassiveMountEffects(current, finishedWork) {
    var previousCache = null;
    null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
    current = null;
    null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
    current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
  }
  function commitCachePassiveMountEffect(current, finishedWork) {
    current = null;
    null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
    finishedWork = finishedWork.memoizedState.cache;
    finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
  }
  function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
    var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
    if (parentFiber.subtreeFlags & (isViewTransitionEligible ? 10262 : 10256))
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitPassiveMountOnFiber(
          root2,
          parentFiber,
          committedLanes,
          committedTransitions
        ), parentFiber = parentFiber.sibling;
    else isViewTransitionEligible && restoreNestedViewTransitions(parentFiber);
  }
  function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
    var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
    isViewTransitionEligible && null === finishedWork.alternate && null !== finishedWork.return && null !== finishedWork.return.alternate && restoreEnterOrExitViewTransitions(finishedWork);
    var flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        flags & 2048 && commitHookEffectListMount(9, finishedWork);
        break;
      case 1:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 3:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        isViewTransitionEligible && rootViewTransitionNameCanceled && (finishedRoot = finishedRoot.containerInfo, finishedRoot = 9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot, "root" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""), finishedRoot = finishedRoot.ownerDocument.documentElement, null !== finishedRoot && "none" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""));
        flags & 2048 && (flags = null, null !== finishedWork.alternate && (flags = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== flags && (finishedWork.refCount++, null != flags && releaseCache(flags)));
        break;
      case 12:
        if (flags & 2048) {
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          flags = finishedWork.stateNode;
          try {
            var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
            "function" === typeof onPostCommit && onPostCommit(
              id,
              null === finishedWork.alternate ? "mount" : "update",
              flags.passiveEffectDuration,
              -0
            );
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        } else
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
        break;
      case 31:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 13:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 23:
        break;
      case 22:
        _finishedWork$memoize2 = finishedWork.stateNode;
        id = finishedWork.alternate;
        null !== finishedWork.memoizedState ? (isViewTransitionEligible && null !== id && null === id.memoizedState && restoreEnterOrExitViewTransitions(id), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        ) : recursivelyTraverseAtomicPassiveEffects(
          finishedRoot,
          finishedWork
        )) : (isViewTransitionEligible && null !== id && null !== id.memoizedState && restoreEnterOrExitViewTransitions(finishedWork), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          0 !== (finishedWork.subtreeFlags & 10256) || false
        )));
        flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
        break;
      case 24:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
        break;
      case 30:
        isViewTransitionEligible && (flags = finishedWork.alternate, null !== flags && (restoreViewTransitionOnHostInstances(flags.child, true), restoreViewTransitionOnHostInstances(finishedWork.child, true)));
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      default:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
    }
  }
  function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
    includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || false);
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
          commitHookEffectListMount(8, finishedWork);
          break;
        case 23:
          break;
        case 22:
          var instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          ) : recursivelyTraverseAtomicPassiveEffects(
            finishedRoot,
            finishedWork
          ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          ));
          includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
            finishedWork.alternate,
            finishedWork
          );
          break;
        case 24:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
          includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
    if (parentFiber.subtreeFlags & 10256)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 22:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            flags & 2048 && commitOffscreenPassiveMountEffects(
              finishedWork.alternate,
              finishedWork
            );
            break;
          case 24:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
        }
        parentFiber = parentFiber.sibling;
      }
  }
  var suspenseyCommitFlag = 8192;
  function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
    if (parentFiber.subtreeFlags & suspenseyCommitFlag)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        accumulateSuspenseyCommitOnFiber(
          parentFiber,
          committedLanes,
          suspendedState
        ), parentFiber = parentFiber.sibling;
  }
  function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
    switch (fiber.tag) {
      case 26:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        fiber.flags & suspenseyCommitFlag && (null !== fiber.memoizedState ? suspendResource(
          suspendedState,
          currentHoistableRoot,
          fiber.memoizedState,
          fiber.memoizedProps
        ) : (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber)));
        break;
      case 5:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        fiber.flags & suspenseyCommitFlag && (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber));
        break;
      case 3:
      case 4:
        var previousHoistableRoot = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        currentHoistableRoot = previousHoistableRoot;
        break;
      case 22:
        null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        ), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        ));
        break;
      case 30:
        if (0 !== (fiber.flags & suspenseyCommitFlag) && (previousHoistableRoot = fiber.memoizedProps.name, null != previousHoistableRoot && "auto" !== previousHoistableRoot)) {
          var state = fiber.stateNode;
          state.paired = null;
          null === appearingViewTransitions && (appearingViewTransitions = /* @__PURE__ */ new Map());
          appearingViewTransitions.set(previousHoistableRoot, state);
        }
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        break;
      default:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
    }
  }
  function detachAlternateSiblings(parentFiber) {
    var previousFiber = parentFiber.alternate;
    if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
      previousFiber.child = null;
      do
        previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
      while (null !== parentFiber);
    }
  }
  function recursivelyTraversePassiveUnmountEffects(parentFiber) {
    var deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (null !== deletions)
        for (var i = 0; i < deletions.length; i++) {
          var childToDelete = deletions[i];
          nextEffect = childToDelete;
          commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
            childToDelete,
            parentFiber
          );
        }
      detachAlternateSiblings(parentFiber);
    }
    if (parentFiber.subtreeFlags & 10256)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
  }
  function commitPassiveUnmountOnFiber(finishedWork) {
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
        break;
      case 3:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      case 12:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      case 22:
        var instance = finishedWork.stateNode;
        null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      default:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
    }
  }
  function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
    var deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (null !== deletions)
        for (var i = 0; i < deletions.length; i++) {
          var childToDelete = deletions[i];
          nextEffect = childToDelete;
          commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
            childToDelete,
            parentFiber
          );
        }
      detachAlternateSiblings(parentFiber);
    }
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      deletions = parentFiber;
      switch (deletions.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectListUnmount(8, deletions, deletions.return);
          recursivelyTraverseDisconnectPassiveEffects(deletions);
          break;
        case 22:
          i = deletions.stateNode;
          i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
          break;
        default:
          recursivelyTraverseDisconnectPassiveEffects(deletions);
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
    for (; null !== nextEffect; ) {
      var fiber = nextEffect;
      switch (fiber.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
          break;
        case 23:
        case 22:
          if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
            var cache = fiber.memoizedState.cachePool.pool;
            null != cache && cache.refCount++;
          }
          break;
        case 24:
          releaseCache(fiber.memoizedState.cache);
      }
      cache = fiber.child;
      if (null !== cache) cache.return = fiber, nextEffect = cache;
      else
        a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
          cache = nextEffect;
          var sibling = cache.sibling, returnFiber = cache.return;
          detachFiberAfterEffects(cache);
          if (cache === fiber) {
            nextEffect = null;
            break a;
          }
          if (null !== sibling) {
            sibling.return = returnFiber;
            nextEffect = sibling;
            break a;
          }
          nextEffect = returnFiber;
        }
    }
  }
  var DefaultAsyncDispatcher = {
    getCacheForType: function(resourceType) {
      var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
      void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
      return cacheForType;
    },
    cacheSignal: function() {
      return readContext(CacheContext).controller.signal;
    }
  }, PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map, executionContext = 0, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = false, workInProgressRootIsPrerendering = false, workInProgressRootDidAttachPingListener = false, entangledRenderLanes = 0, workInProgressRootExitStatus = 0, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = false, globalMostRecentFallbackTime = 0, globalMostRecentTransitionTime = 0, workInProgressRootRenderTargetTime = Infinity, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, pendingEffectsStatus = 0, pendingEffectsRoot = null, pendingFinishedWork = null, pendingEffectsLanes = 0, pendingEffectsRemainingLanes = 0, pendingPassiveTransitions = null, pendingRecoverableErrors = null, pendingViewTransition = null, pendingViewTransitionEvents = null, pendingTransitionTypes = null, nestedUpdateCount = 0, rootWithNestedUpdates = null;
  function requestUpdateLane() {
    return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
  }
  function requestDeferredLane() {
    if (0 === workInProgressDeferredLane)
      if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
        var lane = nextTransitionDeferredLane;
        nextTransitionDeferredLane <<= 1;
        0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
        workInProgressDeferredLane = lane;
      } else workInProgressDeferredLane = 536870912;
    lane = suspenseHandlerStackCursor.current;
    null !== lane && (lane.flags |= 32);
    return workInProgressDeferredLane;
  }
  function scheduleViewTransitionEvent(fiber, callback) {
    if (null != callback) {
      var state = fiber.stateNode, instance = state.ref;
      null === instance && (instance = state.ref = createViewTransitionInstance(
        getViewTransitionName(fiber.memoizedProps, state)
      ));
      null === pendingViewTransitionEvents && (pendingViewTransitionEvents = []);
      pendingViewTransitionEvents.push(callback.bind(null, instance));
    }
  }
  function scheduleUpdateOnFiber(root2, fiber, lane) {
    if (root2 === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
      prepareFreshStack(root2, 0), markRootSuspended(
        root2,
        workInProgressRootRenderLanes,
        workInProgressDeferredLane,
        false
      );
    markRootUpdated$1(root2, lane);
    if (0 === (executionContext & 2) || root2 !== workInProgressRoot)
      root2 === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
        root2,
        workInProgressRootRenderLanes,
        workInProgressDeferredLane,
        false
      )), ensureRootIsScheduled(root2);
  }
  function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
    var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
    do {
      if (0 === exitStatus) {
        workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
        break;
      } else {
        forceSync = root$jscomp$0.current.alternate;
        if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
          exitStatus = renderRootSync(root$jscomp$0, lanes, false);
          renderWasConcurrent = false;
          continue;
        }
        if (2 === exitStatus) {
          renderWasConcurrent = lanes;
          if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
            var JSCompiler_inline_result = 0;
          else
            JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
          if (0 !== JSCompiler_inline_result) {
            lanes = JSCompiler_inline_result;
            a: {
              var root2 = root$jscomp$0;
              exitStatus = workInProgressRootConcurrentErrors;
              var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
              wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256);
              JSCompiler_inline_result = renderRootSync(
                root2,
                JSCompiler_inline_result,
                false
              );
              if (2 !== JSCompiler_inline_result && 6 !== JSCompiler_inline_result) {
                if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                  root2.errorRecoveryDisabledLanes |= renderWasConcurrent;
                  workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                  exitStatus = 4;
                  break a;
                }
                renderWasConcurrent = workInProgressRootRecoverableErrors;
                workInProgressRootRecoverableErrors = exitStatus;
                null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                  workInProgressRootRecoverableErrors,
                  renderWasConcurrent
                ));
              }
              exitStatus = JSCompiler_inline_result;
            }
            renderWasConcurrent = false;
            if (2 !== exitStatus) continue;
          }
        }
        if (1 === exitStatus) {
          prepareFreshStack(root$jscomp$0, 0);
          markRootSuspended(root$jscomp$0, lanes, 0, true);
          break;
        }
        a: {
          shouldTimeSlice = root$jscomp$0;
          renderWasConcurrent = exitStatus;
          switch (renderWasConcurrent) {
            case 0:
            case 1:
              throw Error(formatProdErrorMessage(345));
            case 4:
              if ((lanes & 4194048) !== lanes && (lanes & 62914560) !== lanes)
                break;
            case 6:
              markRootSuspended(
                shouldTimeSlice,
                lanes,
                workInProgressDeferredLane,
                !workInProgressRootDidSkipSuspendedSiblings
              );
              break a;
            case 2:
              workInProgressRootRecoverableErrors = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(formatProdErrorMessage(329));
          }
          if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now2(), 10 < exitStatus)) {
            markRootSuspended(
              shouldTimeSlice,
              lanes,
              workInProgressDeferredLane,
              !workInProgressRootDidSkipSuspendedSiblings
            );
            if (0 !== getNextLanes(shouldTimeSlice, 0, true)) break a;
            pendingEffectsLanes = lanes;
            shouldTimeSlice.timeoutHandle = scheduleTimeout(
              completeRootWhenReady.bind(
                null,
                shouldTimeSlice,
                forceSync,
                workInProgressRootRecoverableErrors,
                workInProgressTransitions,
                workInProgressRootDidIncludeRecursiveRenderUpdate,
                lanes,
                workInProgressDeferredLane,
                workInProgressRootInterleavedUpdatedLanes,
                workInProgressSuspendedRetryLanes,
                workInProgressRootDidSkipSuspendedSiblings,
                renderWasConcurrent,
                "Throttled",
                -0,
                0
              ),
              exitStatus
            );
            break a;
          }
          completeRootWhenReady(
            shouldTimeSlice,
            forceSync,
            workInProgressRootRecoverableErrors,
            workInProgressTransitions,
            workInProgressRootDidIncludeRecursiveRenderUpdate,
            lanes,
            workInProgressDeferredLane,
            workInProgressRootInterleavedUpdatedLanes,
            workInProgressSuspendedRetryLanes,
            workInProgressRootDidSkipSuspendedSiblings,
            renderWasConcurrent,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (1);
    ensureRootIsScheduled(root$jscomp$0);
  }
  function completeRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
    root2.timeoutHandle = -1;
    var subtreeFlags = finishedWork.subtreeFlags, isViewTransitionEligible = (lanes & 335544064) === lanes;
    suspendedCommitReason = null;
    if (isViewTransitionEligible || subtreeFlags & 8192 || 16785408 === (subtreeFlags & 16785408)) {
      if (suspendedCommitReason = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: true,
        waitingForViewTransition: false,
        unsuspend: noop$1
      }, appearingViewTransitions = null, accumulateSuspenseyCommitOnFiber(
        finishedWork,
        lanes,
        suspendedCommitReason
      ), isViewTransitionEligible && (subtreeFlags = suspendedCommitReason, isViewTransitionEligible = root2.containerInfo, isViewTransitionEligible = (9 === isViewTransitionEligible.nodeType ? isViewTransitionEligible : isViewTransitionEligible.ownerDocument).__reactViewTransition, null != isViewTransitionEligible && (subtreeFlags.count++, subtreeFlags.waitingForViewTransition = true, subtreeFlags = onUnsuspend.bind(subtreeFlags), isViewTransitionEligible.finished.then(subtreeFlags, subtreeFlags))), subtreeFlags = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now2() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now2() : 0, subtreeFlags = waitForCommitToBeReady(
        suspendedCommitReason,
        subtreeFlags
      ), null !== subtreeFlags) {
        pendingEffectsLanes = lanes;
        root2.cancelPendingCommit = subtreeFlags(
          completeRoot.bind(
            null,
            root2,
            finishedWork,
            lanes,
            recoverableErrors,
            transitions,
            didIncludeRenderPhaseUpdate,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes,
            didSkipSuspendedSiblings,
            exitStatus,
            suspendedCommitReason,
            null,
            completedRenderStartTime,
            completedRenderEndTime
          )
        );
        markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
        return;
      }
    }
    completeRoot(
      root2,
      finishedWork,
      lanes,
      recoverableErrors,
      transitions,
      didIncludeRenderPhaseUpdate,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes,
      didSkipSuspendedSiblings,
      exitStatus,
      suspendedCommitReason
    );
  }
  function isRenderConsistentWithExternalStores(finishedWork) {
    for (var node = finishedWork; ; ) {
      var tag = node.tag;
      if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
        for (var i = 0; i < tag.length; i++) {
          var check = tag[i], getSnapshot = check.getSnapshot;
          check = check.value;
          try {
            if (!objectIs(getSnapshot(), check)) return false;
          } catch (error) {
            return false;
          }
        }
      tag = node.child;
      if (node.subtreeFlags & 16384 && null !== tag)
        tag.return = node, node = tag;
      else {
        if (node === finishedWork) break;
        for (; null === node.sibling; ) {
          if (null === node.return || node.return === finishedWork) return true;
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }
    return true;
  }
  function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
    suspendedLanes = getEntangledLanes(root2, suspendedLanes);
    suspendedLanes &= ~workInProgressRootPingedLanes;
    suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
    root2.suspendedLanes |= suspendedLanes;
    root2.pingedLanes &= ~suspendedLanes;
    didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
    didAttemptEntireTree = root2.expirationTimes;
    for (var lanes = suspendedLanes; 0 < lanes; ) {
      var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
      didAttemptEntireTree[index$6] = -1;
      lanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
  }
  function flushSyncWork$1() {
    return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0), false) : true;
  }
  function resetWorkInProgressStack() {
    if (null !== workInProgress) {
      if (0 === workInProgressSuspendedReason)
        var interruptedWork = workInProgress.return;
      else
        interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
      for (; null !== interruptedWork; )
        unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
      workInProgress = null;
    }
  }
  function prepareFreshStack(root2, lanes) {
    var timeoutHandle = root2.timeoutHandle;
    -1 !== timeoutHandle && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle));
    timeoutHandle = root2.cancelPendingCommit;
    null !== timeoutHandle && (root2.cancelPendingCommit = null, timeoutHandle());
    pendingEffectsLanes = 0;
    resetWorkInProgressStack();
    workInProgressRoot = root2;
    workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
    workInProgressRootRenderLanes = lanes;
    workInProgressSuspendedReason = 0;
    workInProgressThrownValue = null;
    workInProgressRootDidSkipSuspendedSiblings = false;
    workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
    workInProgressRootDidAttachPingListener = false;
    workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
    workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
    workInProgressRootDidIncludeRecursiveRenderUpdate = false;
    entangledRenderLanes = getEntangledLanes(root2, lanes);
    finishQueueingConcurrentUpdates();
    return timeoutHandle;
  }
  function handleThrow(root2, thrownValue) {
    currentlyRenderingFiber = null;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
    workInProgressThrownValue = thrownValue;
    null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
      root2,
      createCapturedValueAtFiber(thrownValue, root2.current)
    ));
  }
  function shouldRemainOnPreviousScreen() {
    var handler = suspenseHandlerStackCursor.current;
    return null === handler ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : false;
  }
  function pushDispatcher() {
    var prevDispatcher = ReactSharedInternals.H;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
  }
  function pushAsyncDispatcher() {
    var prevAsyncDispatcher = ReactSharedInternals.A;
    ReactSharedInternals.A = DefaultAsyncDispatcher;
    return prevAsyncDispatcher;
  }
  function renderDidSuspendDelayIfPossible() {
    workInProgressRootExitStatus = 4;
    workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
    0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
      workInProgressRoot,
      workInProgressRootRenderLanes,
      workInProgressDeferredLane,
      false
    );
  }
  function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
    var prevExecutionContext = executionContext;
    executionContext |= 2;
    var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
    if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes)
      workInProgressTransitions = null, prepareFreshStack(root2, lanes);
    lanes = false;
    var exitStatus = workInProgressRootExitStatus;
    a: do
      try {
        if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
          var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
          switch (workInProgressSuspendedReason) {
            case 8:
              resetWorkInProgressStack();
              exitStatus = 6;
              break a;
            case 3:
            case 2:
            case 9:
            case 6:
              null === suspenseHandlerStackCursor.current && (lanes = true);
              var reason = workInProgressSuspendedReason;
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
              if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                exitStatus = 0;
                break a;
              }
              break;
            default:
              reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
          }
        }
        workLoopSync();
        exitStatus = workInProgressRootExitStatus;
        break;
      } catch (thrownValue$184) {
        handleThrow(root2, thrownValue$184);
      }
    while (1);
    lanes && root2.shellSuspendCounter++;
    lastContextDependency = currentlyRenderingFiber$1 = null;
    executionContext = prevExecutionContext;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
    return exitStatus;
  }
  function workLoopSync() {
    for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
  }
  function renderRootConcurrent(root2, lanes) {
    var prevExecutionContext = executionContext;
    executionContext |= 2;
    var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
    workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now2() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
      root2,
      lanes
    );
    a: do
      try {
        if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
          lanes = workInProgress;
          var thrownValue = workInProgressThrownValue;
          b: switch (workInProgressSuspendedReason) {
            case 1:
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
              break;
            case 2:
            case 9:
              if (isThenableResolved(thrownValue)) {
                workInProgressSuspendedReason = 0;
                workInProgressThrownValue = null;
                replaySuspendedUnitOfWork(lanes);
                break;
              }
              lanes = function() {
                2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root2 || (workInProgressSuspendedReason = 7);
                ensureRootIsScheduled(root2);
              };
              thrownValue.then(lanes, lanes);
              break a;
            case 3:
              workInProgressSuspendedReason = 7;
              break a;
            case 4:
              workInProgressSuspendedReason = 5;
              break a;
            case 7:
              isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
              break;
            case 5:
              var resource = null;
              switch (workInProgress.tag) {
                case 26:
                  resource = workInProgress.memoizedState;
                case 5:
                case 27:
                  var hostFiber = workInProgress;
                  if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    var sibling = hostFiber.sibling;
                    if (null !== sibling) workInProgress = sibling;
                    else {
                      var returnFiber = hostFiber.return;
                      null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                    }
                    break b;
                  }
              }
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
              break;
            case 6:
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
              break;
            case 8:
              resetWorkInProgressStack();
              workInProgressRootExitStatus = 6;
              break a;
            default:
              throw Error(formatProdErrorMessage(462));
          }
        }
        workLoopConcurrentByScheduler();
        break;
      } catch (thrownValue$186) {
        handleThrow(root2, thrownValue$186);
      }
    while (1);
    lastContextDependency = currentlyRenderingFiber$1 = null;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    executionContext = prevExecutionContext;
    if (null !== workInProgress) return 0;
    workInProgressRoot = null;
    workInProgressRootRenderLanes = 0;
    finishQueueingConcurrentUpdates();
    return workInProgressRootExitStatus;
  }
  function workLoopConcurrentByScheduler() {
    for (; null !== workInProgress && !shouldYield(); )
      performUnitOfWork(workInProgress);
  }
  function performUnitOfWork(unitOfWork) {
    var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
  }
  function replaySuspendedUnitOfWork(unitOfWork) {
    var next = unitOfWork;
    var current = next.alternate;
    switch (next.tag) {
      case 15:
      case 0:
        next = replayFunctionComponent(
          current,
          next,
          next.pendingProps,
          next.type,
          void 0,
          workInProgressRootRenderLanes
        );
        break;
      case 11:
        next = replayFunctionComponent(
          current,
          next,
          next.pendingProps,
          next.type.render,
          next.ref,
          workInProgressRootRenderLanes
        );
        break;
      case 5:
        resetHooksOnUnwind(next);
        var fiber = next;
        fiber === hydrationParentFiber && (isHydrating ? (popToNextHostParent(fiber), 5 === fiber.tag && null != fiber.stateNode && (nextHydratableInstance = fiber.stateNode)) : (popToNextHostParent(fiber), isHydrating = true));
      default:
        unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
    }
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
  }
  function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
    lastContextDependency = currentlyRenderingFiber$1 = null;
    resetHooksOnUnwind(unitOfWork);
    thenableState$1 = null;
    thenableIndexCounter$1 = 0;
    var returnFiber = unitOfWork.return;
    try {
      if (throwException(
        root2,
        returnFiber,
        unitOfWork,
        thrownValue,
        workInProgressRootRenderLanes
      )) {
        workInProgressRootExitStatus = 1;
        logUncaughtError(
          root2,
          createCapturedValueAtFiber(thrownValue, root2.current)
        );
        workInProgress = null;
        return;
      }
    } catch (error) {
      if (null !== returnFiber) throw workInProgress = returnFiber, error;
      workInProgressRootExitStatus = 1;
      logUncaughtError(
        root2,
        createCapturedValueAtFiber(thrownValue, root2.current)
      );
      workInProgress = null;
      return;
    }
    if (unitOfWork.flags & 32768) {
      if (isHydrating || 1 === suspendedReason) root2 = true;
      else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
        root2 = false;
      else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
        suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
      unwindUnitOfWork(unitOfWork, root2);
    } else completeUnitOfWork(unitOfWork);
  }
  function completeUnitOfWork(unitOfWork) {
    var completedWork = unitOfWork;
    do {
      if (0 !== (completedWork.flags & 32768)) {
        unwindUnitOfWork(
          completedWork,
          workInProgressRootDidSkipSuspendedSiblings
        );
        return;
      }
      unitOfWork = completedWork.return;
      var next = completeWork(
        completedWork.alternate,
        completedWork,
        entangledRenderLanes
      );
      if (null !== next) {
        workInProgress = next;
        return;
      }
      completedWork = completedWork.sibling;
      if (null !== completedWork) {
        workInProgress = completedWork;
        return;
      }
      workInProgress = completedWork = unitOfWork;
    } while (null !== completedWork);
    0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
  }
  function unwindUnitOfWork(unitOfWork, skipSiblings) {
    do {
      var next = unwindWork(unitOfWork.alternate, unitOfWork);
      if (null !== next) {
        next.flags &= 32767;
        workInProgress = next;
        return;
      }
      next = unitOfWork.return;
      null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
      if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
        workInProgress = unitOfWork;
        return;
      }
      workInProgress = unitOfWork = next;
    } while (null !== unitOfWork);
    workInProgressRootExitStatus = 6;
    workInProgress = null;
  }
  function completeRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedState) {
    root2.cancelPendingCommit = null;
    do
      flushPendingEffects();
    while (0 !== pendingEffectsStatus);
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
    if (null !== finishedWork) {
      if (finishedWork === root2.current) throw Error(formatProdErrorMessage(177));
      root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
      pendingFinishedWork = finishedWork;
      pendingEffectsRoot = root2;
      pendingEffectsLanes = lanes;
      pendingPassiveTransitions = transitions;
      pendingRecoverableErrors = recoverableErrors;
      commitRoot(
        root2,
        finishedWork,
        lanes,
        spawnedLane,
        updatedLanes,
        suspendedRetryLanes,
        suspendedState
      );
    }
  }
  function commitRoot(root2, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState) {
    var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
    pendingEffectsRemainingLanes = remainingLanes;
    remainingLanes |= concurrentlyUpdatedLanes;
    markRootFinished(
      root2,
      lanes,
      remainingLanes,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes
    );
    pendingViewTransitionEvents = null;
    (lanes & 335544064) === lanes ? (pendingTransitionTypes = claimQueuedTransitionTypes(root2), spawnedLane = 10262) : (pendingTransitionTypes = null, spawnedLane = 10256);
    0 !== (finishedWork.subtreeFlags & spawnedLane) || 0 !== (finishedWork.flags & spawnedLane) ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
      flushPassiveEffects();
      return null;
    })) : (root2.callbackNode = null, root2.callbackPriority = 0);
    shouldStartViewTransition = false;
    spawnedLane = 0 !== (finishedWork.flags & 13878);
    if (0 !== (finishedWork.subtreeFlags & 13878) || spawnedLane) {
      spawnedLane = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      updatedLanes = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p = 2;
      suspendedRetryLanes = executionContext;
      executionContext |= 4;
      try {
        commitBeforeMutationEffects(root2, finishedWork, lanes);
      } finally {
        executionContext = suspendedRetryLanes, ReactDOMSharedInternals.p = updatedLanes, ReactSharedInternals.T = spawnedLane;
      }
    }
    pendingEffectsStatus = 1;
    shouldStartViewTransition ? pendingViewTransition = startViewTransition(
      suspendedState,
      root2.containerInfo,
      pendingTransitionTypes,
      flushMutationEffects,
      flushLayoutEffects,
      flushAfterMutationEffects,
      flushSpawnedWork,
      flushPassiveEffects,
      reportViewTransitionError
    ) : (flushMutationEffects(), flushLayoutEffects(), flushSpawnedWork());
  }
  function reportViewTransitionError(error) {
    if (0 !== pendingEffectsStatus) {
      var onRecoverableError = pendingEffectsRoot.onRecoverableError;
      onRecoverableError(error, { componentStack: null });
    }
  }
  function flushAfterMutationEffects() {
    3 === pendingEffectsStatus && (pendingEffectsStatus = 0, commitAfterMutationEffectsOnFiber(pendingFinishedWork, pendingEffectsRoot), pendingEffectsStatus = 4);
  }
  function flushMutationEffects() {
    if (1 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
      if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
        rootMutationHasEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        try {
          inUpdateViewTransition = rootViewTransitionAffected = false;
          commitMutationEffectsOnFiber(finishedWork, root2, lanes);
          lanes = selectionInformation;
          var curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = lanes.focusedElem, priorSelectionRange = lanes.selectionRange;
          if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
            priorFocusedElem.ownerDocument.documentElement,
            priorFocusedElem
          )) {
            if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
              var start = priorSelectionRange.start, end = priorSelectionRange.end;
              void 0 === end && (end = start);
              if ("selectionStart" in priorFocusedElem)
                priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                  end,
                  priorFocusedElem.value.length
                );
              else {
                var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                if (win.getSelection) {
                  var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                  !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                  var startMarker = getNodeForCharacterOffset(
                    priorFocusedElem,
                    start$jscomp$0
                  ), endMarker = getNodeForCharacterOffset(
                    priorFocusedElem,
                    end$jscomp$0
                  );
                  if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                    var range = doc.createRange();
                    range.setStart(startMarker.node, startMarker.offset);
                    selection.removeAllRanges();
                    start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                  }
                }
              }
            }
            doc = [];
            for (selection = priorFocusedElem; selection = selection.parentNode; )
              1 === selection.nodeType && doc.push({
                element: selection,
                left: selection.scrollLeft,
                top: selection.scrollTop
              });
            "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
            for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
              var info = doc[priorFocusedElem];
              info.element.scrollLeft = info.left;
              info.element.scrollTop = info.top;
            }
          }
          _enabled = !!eventsEnabled;
          selectionInformation = eventsEnabled = null;
        } finally {
          executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
        }
      }
      root2.current = finishedWork;
      pendingEffectsStatus = 2;
    }
  }
  function flushLayoutEffects() {
    if (2 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
      if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
        rootHasLayoutEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        try {
          commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork);
        } finally {
          executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
        }
      }
      pendingEffectsStatus = 3;
    }
  }
  function flushSpawnedWork() {
    if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var committedViewTransition = pendingViewTransition;
      pendingViewTransition = null;
      requestPaint();
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors, passiveSubtreeMask = (lanes & 335544064) === lanes ? 10262 : 10256;
      0 !== (finishedWork.subtreeFlags & passiveSubtreeMask) || 0 !== (finishedWork.flags & passiveSubtreeMask) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes));
      passiveSubtreeMask = root2.pendingLanes;
      0 === passiveSubtreeMask && (legacyErrorBoundariesThatAlreadyFailed = null);
      lanesToEventPriority(lanes);
      finishedWork = finishedWork.stateNode;
      if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
        try {
          injectedHook.onCommitFiberRoot(
            rendererID,
            finishedWork,
            void 0,
            128 === (finishedWork.current.flags & 128)
          );
        } catch (err) {
        }
      if (null !== recoverableErrors) {
        finishedWork = ReactSharedInternals.T;
        passiveSubtreeMask = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        ReactSharedInternals.T = null;
        try {
          for (var onRecoverableError = root2.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
            var recoverableError = recoverableErrors[i];
            onRecoverableError(recoverableError.value, {
              componentStack: recoverableError.stack
            });
          }
        } finally {
          ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = passiveSubtreeMask;
        }
      }
      recoverableErrors = pendingViewTransitionEvents;
      onRecoverableError = pendingTransitionTypes;
      pendingTransitionTypes = null;
      if (null !== recoverableErrors && (pendingViewTransitionEvents = null, null === onRecoverableError && (onRecoverableError = []), null !== committedViewTransition))
        for (recoverableError = 0; recoverableError < recoverableErrors.length; recoverableError++)
          finishedWork = (0, recoverableErrors[recoverableError])(
            onRecoverableError
          ), void 0 !== finishedWork && committedViewTransition.finished.finally(finishedWork);
      0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
      ensureRootIsScheduled(root2);
      passiveSubtreeMask = root2.pendingLanes;
      0 !== (lanes & 261930) && 0 !== (passiveSubtreeMask & 42) ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : (nestedUpdateCount = 0, rootWithNestedUpdates = null);
      flushSyncWorkAcrossRoots_impl(0);
    }
  }
  function releaseRootPooledCache(root2, remainingLanes) {
    0 === (root2.pooledCacheLanes &= remainingLanes) && (remainingLanes = root2.pooledCache, null != remainingLanes && (root2.pooledCache = null, releaseCache(remainingLanes)));
  }
  function flushPendingEffects() {
    null !== pendingViewTransition && (pendingViewTransition.skipTransition(), pendingViewTransition = null);
    flushMutationEffects();
    flushLayoutEffects();
    flushSpawnedWork();
    return flushPassiveEffects();
  }
  function flushPassiveEffects() {
    if (5 !== pendingEffectsStatus) return false;
    var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
    pendingEffectsRemainingLanes = 0;
    var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
      ReactSharedInternals.T = null;
      renderPriority = pendingPassiveTransitions;
      pendingPassiveTransitions = null;
      var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
      pendingEffectsStatus = 0;
      pendingFinishedWork = pendingEffectsRoot = null;
      pendingEffectsLanes = 0;
      if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
      var prevExecutionContext = executionContext;
      executionContext |= 4;
      commitPassiveUnmountOnFiber(root$jscomp$0.current);
      commitPassiveMountOnFiber(
        root$jscomp$0,
        root$jscomp$0.current,
        lanes,
        renderPriority
      );
      executionContext = prevExecutionContext;
      flushSyncWorkAcrossRoots_impl(0, false);
      if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
        try {
          injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
        } catch (err) {
        }
      return true;
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root2, remainingLanes);
    }
  }
  function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
    sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
    sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
    rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
    null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
  }
  function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
    if (3 === sourceFiber.tag)
      captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
    else
      for (; null !== nearestMountedAncestor; ) {
        if (3 === nearestMountedAncestor.tag) {
          captureCommitPhaseErrorOnRoot(
            nearestMountedAncestor,
            sourceFiber,
            error
          );
          break;
        } else if (1 === nearestMountedAncestor.tag) {
          var instance = nearestMountedAncestor.stateNode;
          if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
            sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
            error = createClassErrorUpdate(2);
            instance = enqueueUpdate(nearestMountedAncestor, error, 2);
            null !== instance && (initializeClassErrorUpdate(
              error,
              instance,
              nearestMountedAncestor,
              sourceFiber
            ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
            break;
          }
        }
        nearestMountedAncestor = nearestMountedAncestor.return;
      }
  }
  function attachPingListener(root2, wakeable, lanes) {
    var pingCache = root2.pingCache;
    if (null === pingCache) {
      pingCache = root2.pingCache = new PossiblyWeakMap();
      var threadIDs = /* @__PURE__ */ new Set();
      pingCache.set(wakeable, threadIDs);
    } else
      threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
    threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
  }
  function pingSuspendedRoot(root2, wakeable, pingedLanes) {
    var pingCache = root2.pingCache;
    null !== pingCache && pingCache.delete(wakeable);
    root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
    root2.warmLanes &= ~pingedLanes;
    workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now2() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) ? prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
    ensureRootIsScheduled(root2);
  }
  function retryTimedOutBoundary(boundaryFiber, retryLane) {
    0 === retryLane && (retryLane = claimNextRetryLane());
    boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
    null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
  }
  function retryDehydratedSuspenseBoundary(boundaryFiber) {
    var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
    null !== suspenseState && (retryLane = suspenseState.retryLane);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function resolveRetryWakeable(boundaryFiber, wakeable) {
    var retryLane = 0;
    switch (boundaryFiber.tag) {
      case 31:
      case 13:
        var retryCache = boundaryFiber.stateNode;
        var suspenseState = boundaryFiber.memoizedState;
        null !== suspenseState && (retryLane = suspenseState.retryLane);
        break;
      case 19:
        retryCache = boundaryFiber.stateNode;
        break;
      case 22:
        retryCache = boundaryFiber.stateNode._retryCache;
        break;
      default:
        throw Error(formatProdErrorMessage(314));
    }
    null !== retryCache && retryCache.delete(wakeable);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function scheduleCallback$1(priorityLevel, callback) {
    return scheduleCallback$3(priorityLevel, callback);
  }
  var firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = false, mightHavePendingSyncWork = false, isFlushingWork = false, currentEventTransitionLane = 0;
  function ensureRootIsScheduled(root2) {
    root2 !== lastScheduledRoot && null === root2.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
    mightHavePendingSyncWork = true;
    didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
  }
  function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
    if (!isFlushingWork && mightHavePendingSyncWork) {
      isFlushingWork = true;
      do {
        var didPerformSomeWork = false;
        for (var root$190 = firstScheduledRoot; null !== root$190; ) {
          if (0 !== syncTransitionLanes) {
            var pendingLanes = root$190.pendingLanes;
            if (0 === pendingLanes) var JSCompiler_inline_result = 0;
            else {
              var suspendedLanes = root$190.suspendedLanes, pingedLanes = root$190.pingedLanes;
              JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
              JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
              JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
            }
            0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
          } else
            JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
              root$190,
              root$190 === workInProgressRoot ? JSCompiler_inline_result : 0,
              null !== root$190.cancelPendingCommit || -1 !== root$190.timeoutHandle
            ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$190, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
          root$190 = root$190.next;
        }
      } while (didPerformSomeWork);
      isFlushingWork = false;
    }
  }
  function processRootScheduleInImmediateTask() {
    processRootScheduleInMicrotask();
  }
  function processRootScheduleInMicrotask() {
    mightHavePendingSyncWork = didScheduleMicrotask = false;
    var syncTransitionLanes = 0;
    0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
    for (var currentTime = now2(), prev = null, root2 = firstScheduledRoot; null !== root2; ) {
      var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
      if (0 === nextLanes)
        root2.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
      else if (prev = root2, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
        mightHavePendingSyncWork = true;
      root2 = next;
    }
    0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes);
    0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
  }
  function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
    for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
      var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
      if (-1 === expirationTime) {
        if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
          expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
      } else expirationTime <= currentTime && (root2.expiredLanes |= lane);
      lanes &= ~lane;
    }
    currentTime = workInProgressRoot;
    suspendedLanes = workInProgressRootRenderLanes;
    suspendedLanes = getNextLanes(
      root2,
      root2 === currentTime ? suspendedLanes : 0,
      null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
    );
    pingedLanes = root2.callbackNode;
    if (0 === suspendedLanes || root2 === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
      return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
    if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root2, suspendedLanes)) {
      currentTime = suspendedLanes & -suspendedLanes;
      if (currentTime === root2.callbackPriority) return currentTime;
      null !== pingedLanes && cancelCallback$1(pingedLanes);
      switch (lanesToEventPriority(suspendedLanes)) {
        case 2:
        case 8:
          suspendedLanes = UserBlockingPriority;
          break;
        case 32:
          suspendedLanes = NormalPriority$1;
          break;
        case 268435456:
          suspendedLanes = IdlePriority;
          break;
        default:
          suspendedLanes = NormalPriority$1;
      }
      pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
      suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
      root2.callbackPriority = currentTime;
      root2.callbackNode = suspendedLanes;
      return currentTime;
    }
    null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
    root2.callbackPriority = 2;
    root2.callbackNode = null;
    return 2;
  }
  function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
    if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus)
      return root2.callbackNode = null, root2.callbackPriority = 0, null;
    var originalCallbackNode = root2.callbackNode;
    if (flushPendingEffects() && root2.callbackNode !== originalCallbackNode)
      return null;
    var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
    workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
      root2,
      root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
      null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
    );
    if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
    performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout);
    scheduleTaskForRootDuringMicrotask(root2, now2());
    return null != root2.callbackNode && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
  }
  function performSyncWorkOnRoot(root2, lanes) {
    if (flushPendingEffects()) return null;
    performWorkOnRoot(root2, lanes, true);
  }
  function scheduleImmediateRootScheduleTask() {
    scheduleMicrotask(function() {
      0 !== (executionContext & 6) ? scheduleCallback$3(
        ImmediatePriority,
        processRootScheduleInImmediateTask
      ) : processRootScheduleInMicrotask();
    });
  }
  function requestTransitionLane() {
    if (0 === currentEventTransitionLane) {
      var actionScopeLane = currentEntangledLane;
      0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
      currentEventTransitionLane = actionScopeLane;
    }
    return currentEventTransitionLane;
  }
  function coerceFormActionProp(actionProp) {
    return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL(actionProp);
  }
  function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
    if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
      var action = coerceFormActionProp(
        (nativeEventTarget[internalPropsKey] || null).action
      ), submitter = nativeEvent.submitter;
      submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
      var event = new SyntheticEvent(
        "action",
        "action",
        null,
        nativeEvent,
        nativeEventTarget
      );
      dispatchQueue.push({
        event,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (nativeEvent.defaultPrevented) {
                if (0 !== currentEventTransitionLane) {
                  var formData = new FormData(nativeEventTarget, submitter);
                  startHostTransition(
                    maybeTargetInst,
                    {
                      pending: true,
                      data: formData,
                      method: nativeEventTarget.method,
                      action
                    },
                    null,
                    formData
                  );
                }
              } else
                "function" === typeof action && (event.preventDefault(), formData = new FormData(nativeEventTarget, submitter), startHostTransition(
                  maybeTargetInst,
                  {
                    pending: true,
                    data: formData,
                    method: nativeEventTarget.method,
                    action
                  },
                  action,
                  formData
                ));
            },
            currentTarget: nativeEventTarget
          }
        ]
      });
    }
  }
  for (var i$jscomp$inline_1667 = 0; i$jscomp$inline_1667 < simpleEventPluginEvents.length; i$jscomp$inline_1667++) {
    var eventName$jscomp$inline_1668 = simpleEventPluginEvents[i$jscomp$inline_1667], domEventName$jscomp$inline_1669 = eventName$jscomp$inline_1668.toLowerCase(), capitalizedEvent$jscomp$inline_1670 = eventName$jscomp$inline_1668[0].toUpperCase() + eventName$jscomp$inline_1668.slice(1);
    registerSimpleEvent(
      domEventName$jscomp$inline_1669,
      "on" + capitalizedEvent$jscomp$inline_1670
    );
  }
  registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
  registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
  registerSimpleEvent(ANIMATION_START, "onAnimationStart");
  registerSimpleEvent("dblclick", "onDoubleClick");
  registerSimpleEvent("focusin", "onFocus");
  registerSimpleEvent("focusout", "onBlur");
  registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
  registerSimpleEvent(TRANSITION_START, "onTransitionStart");
  registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
  registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
  registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
  registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
  registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
  registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
  registerTwoPhaseEvent(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  );
  registerTwoPhaseEvent(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  );
  registerTwoPhaseEvent("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]);
  registerTwoPhaseEvent(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  );
  registerTwoPhaseEvent(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  );
  registerTwoPhaseEvent(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), nonDelegatedEvents = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
  );
  function processDispatchQueue(dispatchQueue, eventSystemFlags) {
    eventSystemFlags = 0 !== (eventSystemFlags & 4);
    for (var i = 0; i < dispatchQueue.length; i++) {
      var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
      _dispatchQueue$i = _dispatchQueue$i.listeners;
      a: {
        var previousInstance = void 0;
        if (eventSystemFlags)
          for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
            var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
            _dispatchListeners$i = _dispatchListeners$i.listener;
            if (instance !== previousInstance && event.isPropagationStopped())
              break a;
            previousInstance = _dispatchListeners$i;
            event.currentTarget = currentTarget;
            try {
              previousInstance(event);
            } catch (error) {
              reportGlobalError(error);
            }
            event.currentTarget = null;
            previousInstance = instance;
          }
        else
          for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
            _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
            instance = _dispatchListeners$i.instance;
            currentTarget = _dispatchListeners$i.currentTarget;
            _dispatchListeners$i = _dispatchListeners$i.listener;
            if (instance !== previousInstance && event.isPropagationStopped())
              break a;
            previousInstance = _dispatchListeners$i;
            event.currentTarget = currentTarget;
            try {
              previousInstance(event);
            } catch (error) {
              reportGlobalError(error);
            }
            event.currentTarget = null;
            previousInstance = instance;
          }
      }
    }
  }
  function listenToNonDelegatedEvent(domEventName, targetElement) {
    var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
    void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
    var listenerSetKey = domEventName + "__bubble";
    JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
  }
  function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
    var eventSystemFlags = 0;
    isCapturePhaseListener && (eventSystemFlags |= 4);
    addTrappedEventListener(
      target,
      domEventName,
      eventSystemFlags,
      isCapturePhaseListener
    );
  }
  var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
  function listenToAllSupportedEvents(rootContainerElement) {
    if (!rootContainerElement[listeningMarker]) {
      rootContainerElement[listeningMarker] = true;
      allNativeEvents.forEach(function(domEventName) {
        "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
      });
      var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
      null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
    }
  }
  function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
    switch (getEventPriority(domEventName)) {
      case 2:
        var listenerWrapper = dispatchDiscreteEvent;
        break;
      case 8:
        listenerWrapper = dispatchContinuousEvent;
        break;
      default:
        listenerWrapper = dispatchEvent;
    }
    eventSystemFlags = listenerWrapper.bind(
      null,
      domEventName,
      eventSystemFlags,
      targetContainer
    );
    listenerWrapper = void 0;
    !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
    isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
      capture: true,
      passive: listenerWrapper
    }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
      passive: listenerWrapper
    }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
  }
  function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
    var ancestorInst = targetInst$jscomp$0;
    if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
      a: for (; ; ) {
        if (null === targetInst$jscomp$0) return;
        var nodeTag = targetInst$jscomp$0.tag;
        if (3 === nodeTag || 4 === nodeTag) {
          var container = targetInst$jscomp$0.stateNode.containerInfo;
          if (container === targetContainer) break;
          if (4 === nodeTag)
            for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
              var grandTag = nodeTag.tag;
              if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer)
                return;
              nodeTag = nodeTag.return;
            }
          for (; null !== container; ) {
            nodeTag = getClosestInstanceFromNode(container);
            if (null === nodeTag) return;
            grandTag = nodeTag.tag;
            if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
              targetInst$jscomp$0 = ancestorInst = nodeTag;
              continue a;
            }
            container = container.parentNode;
          }
        }
        targetInst$jscomp$0 = targetInst$jscomp$0.return;
      }
    batchedUpdates$1(function() {
      var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
      a: {
        var reactName = topLevelEventsToReactNames.get(domEventName);
        if (void 0 !== reactName) {
          var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
          switch (domEventName) {
            case "keypress":
              if (0 === getEventCharCode(nativeEvent)) break a;
            case "keydown":
            case "keyup":
              SyntheticEventCtor = SyntheticKeyboardEvent;
              break;
            case "focusin":
              reactEventType = "focus";
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "focusout":
              reactEventType = "blur";
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "beforeblur":
            case "afterblur":
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "click":
              if (2 === nativeEvent.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              SyntheticEventCtor = SyntheticMouseEvent;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              SyntheticEventCtor = SyntheticDragEvent;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              SyntheticEventCtor = SyntheticTouchEvent;
              break;
            case ANIMATION_END:
            case ANIMATION_ITERATION:
            case ANIMATION_START:
              SyntheticEventCtor = SyntheticAnimationEvent;
              break;
            case TRANSITION_END:
              SyntheticEventCtor = SyntheticTransitionEvent;
              break;
            case "scroll":
            case "scrollend":
              SyntheticEventCtor = SyntheticUIEvent;
              break;
            case "wheel":
              SyntheticEventCtor = SyntheticWheelEvent;
              break;
            case "copy":
            case "cut":
            case "paste":
              SyntheticEventCtor = SyntheticClipboardEvent;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              SyntheticEventCtor = SyntheticPointerEvent;
              break;
            case "submit":
              SyntheticEventCtor = SyntheticSubmitEvent;
              break;
            case "toggle":
            case "beforetoggle":
              SyntheticEventCtor = SyntheticToggleEvent;
          }
          var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
          inCapturePhase = [];
          for (var instance = targetInst, lastHostComponent; null !== instance; ) {
            var _instance = instance;
            lastHostComponent = _instance.stateNode;
            _instance = _instance.tag;
            5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(
              createDispatchListener(instance, _instance, lastHostComponent)
            ));
            if (accumulateTargetOnly) break;
            instance = instance.return;
          }
          0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
            reactName,
            reactEventType,
            null,
            nativeEvent,
            nativeEventTarget
          ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
        }
      }
      if (0 === (eventSystemFlags & 7)) {
        a: {
          SyntheticEventCtor = "mouseover" === domEventName || "pointerover" === domEventName;
          reactName = "mouseout" === domEventName || "pointerout" === domEventName;
          if (SyntheticEventCtor && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
            break a;
          if (reactName || SyntheticEventCtor) {
            reactEventType = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (SyntheticEventCtor = nativeEventTarget.ownerDocument) ? SyntheticEventCtor.defaultView || SyntheticEventCtor.parentWindow : window;
            if (reactName) {
              if (SyntheticEventCtor = nativeEvent.relatedTarget || nativeEvent.toElement, reactName = targetInst, SyntheticEventCtor = SyntheticEventCtor ? getClosestInstanceFromNode(SyntheticEventCtor) : null, null !== SyntheticEventCtor && (accumulateTargetOnly = getNearestMountedFiber(SyntheticEventCtor), inCapturePhase = SyntheticEventCtor.tag, SyntheticEventCtor !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
                SyntheticEventCtor = null;
            } else reactName = null, SyntheticEventCtor = targetInst;
            if (reactName !== SyntheticEventCtor) {
              inCapturePhase = SyntheticMouseEvent;
              _instance = "onMouseLeave";
              reactEventName = "onMouseEnter";
              instance = "mouse";
              if ("pointerout" === domEventName || "pointerover" === domEventName)
                inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
              accumulateTargetOnly = null == reactName ? reactEventType : getNodeFromInstance(reactName);
              lastHostComponent = null == SyntheticEventCtor ? reactEventType : getNodeFromInstance(SyntheticEventCtor);
              reactEventType = new inCapturePhase(
                _instance,
                instance + "leave",
                reactName,
                nativeEvent,
                nativeEventTarget
              );
              reactEventType.target = accumulateTargetOnly;
              reactEventType.relatedTarget = lastHostComponent;
              _instance = null;
              getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
                reactEventName,
                instance + "enter",
                SyntheticEventCtor,
                nativeEvent,
                nativeEventTarget
              ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
              accumulateTargetOnly = _instance;
              inCapturePhase = reactName && SyntheticEventCtor ? getLowestCommonAncestor(
                reactName,
                SyntheticEventCtor,
                getParent
              ) : null;
              null !== reactName && accumulateEnterLeaveListenersForEvent(
                dispatchQueue,
                reactEventType,
                reactName,
                inCapturePhase,
                false
              );
              null !== SyntheticEventCtor && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
                dispatchQueue,
                accumulateTargetOnly,
                SyntheticEventCtor,
                inCapturePhase,
                true
              );
            }
          }
        }
        a: {
          reactName = targetInst ? getNodeFromInstance(targetInst) : window;
          SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
          if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
            var getTargetInstFunc = getTargetInstForChangeEvent;
          else if (isTextInputElement(reactName))
            if (isInputEventSupported)
              getTargetInstFunc = getTargetInstForInputOrChangeEvent;
            else {
              getTargetInstFunc = getTargetInstForInputEventPolyfill;
              var handleEventFunc = handleEventsForInputEventPolyfill;
            }
          else
            SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
          if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
            createAndAccumulateChangeEvent(
              dispatchQueue,
              getTargetInstFunc,
              nativeEvent,
              nativeEventTarget
            );
            break a;
          }
          handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
        }
        handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
        switch (domEventName) {
          case "focusin":
            if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
              activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
            break;
          case "focusout":
            lastSelection = activeElementInst = activeElement = null;
            break;
          case "mousedown":
            mouseDown = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mouseDown = false;
            constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
            break;
          case "selectionchange":
            if (skipSelectionChangeEvent) break;
          case "keydown":
          case "keyup":
            constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
        }
        var fallbackData;
        if (canUseCompositionEvent)
          b: {
            switch (domEventName) {
              case "compositionstart":
                var eventType = "onCompositionStart";
                break b;
              case "compositionend":
                eventType = "onCompositionEnd";
                break b;
              case "compositionupdate":
                eventType = "onCompositionUpdate";
                break b;
            }
            eventType = void 0;
          }
        else
          isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
        eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
          eventType,
          domEventName,
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
        if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
          eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
            "onBeforeInput",
            "beforeinput",
            null,
            nativeEvent,
            nativeEventTarget
          ), dispatchQueue.push({
            event: handleEventFunc,
            listeners: eventType
          }), handleEventFunc.data = fallbackData);
        extractEvents$1(
          dispatchQueue,
          domEventName,
          targetInst,
          nativeEvent,
          nativeEventTarget
        );
      }
      processDispatchQueue(dispatchQueue, eventSystemFlags);
    });
  }
  function createDispatchListener(instance, listener, currentTarget) {
    return {
      instance,
      listener,
      currentTarget
    };
  }
  function accumulateTwoPhaseListeners(targetFiber, reactName) {
    for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
      var _instance2 = targetFiber, stateNode = _instance2.stateNode;
      _instance2 = _instance2.tag;
      5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(
        createDispatchListener(targetFiber, _instance2, stateNode)
      ), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(
        createDispatchListener(targetFiber, _instance2, stateNode)
      ));
      if (3 === targetFiber.tag) return listeners;
      targetFiber = targetFiber.return;
    }
    return [];
  }
  function getParent(inst) {
    if (null === inst) return null;
    do
      inst = inst.return;
    while (inst && 5 !== inst.tag && 27 !== inst.tag);
    return inst ? inst : null;
  }
  function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
    for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
      var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
      _instance3 = _instance3.tag;
      if (null !== alternate && alternate === common) break;
      5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
        createDispatchListener(target, stateNode, alternate)
      )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
        createDispatchListener(target, stateNode, alternate)
      )));
      target = target.return;
    }
    0 !== listeners.length && dispatchQueue.push({ event, listeners });
  }
  var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
  function normalizeMarkupForTextOrAttribute(markup) {
    return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
  }
  function checkForUnmatchedText(serverText, clientText) {
    clientText = normalizeMarkupForTextOrAttribute(clientText);
    return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
  }
  function setProp(domElement, tag, key, value, props, prevValue) {
    switch (key) {
      case "children":
        if ("string" === typeof value)
          "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value);
        else if ("number" === typeof value || "bigint" === typeof value)
          "body" !== tag && setTextContent(domElement, "" + value);
        else return;
        break;
      case "className":
        setValueForKnownAttribute(domElement, "class", value);
        break;
      case "tabIndex":
        setValueForKnownAttribute(domElement, "tabindex", value);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        setValueForKnownAttribute(domElement, key, value);
        break;
      case "style":
        setValueForStyles(domElement, value, prevValue);
        return;
      case "data":
        if ("object" !== tag) {
          setValueForKnownAttribute(domElement, "data", value);
          break;
        }
      case "src":
      case "href":
        if ("" === value && ("a" !== tag || "href" !== key)) {
          domElement.removeAttribute(key);
          break;
        }
        if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
          domElement.removeAttribute(key);
          break;
        }
        value = sanitizeURL(value);
        domElement.setAttribute(key, value);
        break;
      case "action":
      case "formAction":
        if ("function" === typeof value) {
          domElement.setAttribute(
            key,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
            domElement,
            tag,
            "formEncType",
            props.formEncType,
            props,
            null
          ), setProp(
            domElement,
            tag,
            "formMethod",
            props.formMethod,
            props,
            null
          ), setProp(
            domElement,
            tag,
            "formTarget",
            props.formTarget,
            props,
            null
          )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
        if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
          domElement.removeAttribute(key);
          break;
        }
        value = sanitizeURL(value);
        domElement.setAttribute(key, value);
        break;
      case "onClick":
        null != value && (domElement.onclick = noop$1);
        return;
      case "onScroll":
        null != value && listenToNonDelegatedEvent("scroll", domElement);
        return;
      case "onScrollEnd":
        null != value && listenToNonDelegatedEvent("scrollend", domElement);
        return;
      case "dangerouslySetInnerHTML":
        if (null != value) {
          if ("object" !== typeof value || !("__html" in value))
            throw Error(formatProdErrorMessage(61));
          key = value.__html;
          if (null != key) {
            if (null != props.children) throw Error(formatProdErrorMessage(60));
            (null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
          }
        }
        break;
      case "multiple":
        domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
        break;
      case "muted":
        domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
          domElement.removeAttribute("xlink:href");
          break;
        }
        key = sanitizeURL(value);
        domElement.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          key
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
        break;
      case "capture":
      case "download":
        true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "rowSpan":
      case "start":
        null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
        break;
      case "popover":
        listenToNonDelegatedEvent("beforetoggle", domElement);
        listenToNonDelegatedEvent("toggle", domElement);
        setValueForAttribute(domElement, "popover", value);
        break;
      case "xlinkActuate":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          value
        );
        break;
      case "xlinkArcrole":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          value
        );
        break;
      case "xlinkRole":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          value
        );
        break;
      case "xlinkShow":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          value
        );
        break;
      case "xlinkTitle":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          value
        );
        break;
      case "xlinkType":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          value
        );
        break;
      case "xmlBase":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          value
        );
        break;
      case "xmlLang":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          value
        );
        break;
      case "xmlSpace":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          value
        );
        break;
      case "is":
        setValueForAttribute(domElement, "is", value);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1])
          key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
        else return;
    }
    viewTransitionMutationContext = true;
  }
  function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
    switch (key) {
      case "style":
        setValueForStyles(domElement, value, prevValue);
        return;
      case "dangerouslySetInnerHTML":
        if (null != value) {
          if ("object" !== typeof value || !("__html" in value))
            throw Error(formatProdErrorMessage(61));
          key = value.__html;
          if (null != key) {
            if (null != props.children) throw Error(formatProdErrorMessage(60));
            (null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
          }
        }
        break;
      case "children":
        if ("string" === typeof value) setTextContent(domElement, value);
        else if ("number" === typeof value || "bigint" === typeof value)
          setTextContent(domElement, "" + value);
        else return;
        break;
      case "onScroll":
        null != value && listenToNonDelegatedEvent("scroll", domElement);
        return;
      case "onScrollEnd":
        null != value && listenToNonDelegatedEvent("scrollend", domElement);
        return;
      case "onClick":
        null != value && (domElement.onclick = noop$1);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!registrationNameDependencies.hasOwnProperty(key))
          a: {
            if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), prevValue = key.slice(2, props ? key.length - 7 : void 0), tag = domElement[internalPropsKey] || null, tag = null != tag ? tag[key] : null, "function" === typeof tag && domElement.removeEventListener(prevValue, tag, props), "function" === typeof value)) {
              "function" !== typeof tag && null !== tag && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
              domElement.addEventListener(prevValue, value, props);
              break a;
            }
            viewTransitionMutationContext = true;
            key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
          }
        return;
    }
    viewTransitionMutationContext = true;
  }
  function setInitialProperties(domElement, tag, props) {
    switch (tag) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        listenToNonDelegatedEvent("error", domElement);
        listenToNonDelegatedEvent("load", domElement);
        var hasSrc = false, hasSrcSet = false, propKey;
        for (propKey in props)
          if (props.hasOwnProperty(propKey)) {
            var propValue = props[propKey];
            if (null != propValue)
              switch (propKey) {
                case "src":
                  hasSrc = true;
                  break;
                case "srcSet":
                  hasSrcSet = true;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(formatProdErrorMessage(137, tag));
                default:
                  setProp(domElement, tag, propKey, propValue, props, null);
              }
          }
        hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
        hasSrc && setProp(domElement, tag, "src", props.src, props, null);
        return;
      case "input":
        listenToNonDelegatedEvent("invalid", domElement);
        var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
        for (hasSrc in props)
          if (props.hasOwnProperty(hasSrc)) {
            var propValue$204 = props[hasSrc];
            if (null != propValue$204)
              switch (hasSrc) {
                case "name":
                  hasSrcSet = propValue$204;
                  break;
                case "type":
                  propValue = propValue$204;
                  break;
                case "checked":
                  checked = propValue$204;
                  break;
                case "defaultChecked":
                  defaultChecked = propValue$204;
                  break;
                case "value":
                  propKey = propValue$204;
                  break;
                case "defaultValue":
                  defaultValue = propValue$204;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != propValue$204)
                    throw Error(formatProdErrorMessage(137, tag));
                  break;
                default:
                  setProp(domElement, tag, hasSrc, propValue$204, props, null);
              }
          }
        initInput(
          domElement,
          propKey,
          defaultValue,
          checked,
          defaultChecked,
          propValue,
          hasSrcSet,
          false
        );
        return;
      case "select":
        listenToNonDelegatedEvent("invalid", domElement);
        hasSrc = propValue = propKey = null;
        for (hasSrcSet in props)
          if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
            switch (hasSrcSet) {
              case "value":
                propKey = defaultValue;
                break;
              case "defaultValue":
                propValue = defaultValue;
                break;
              case "multiple":
                hasSrc = defaultValue;
              default:
                setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
            }
        tag = propKey;
        props = propValue;
        domElement.multiple = !!hasSrc;
        null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
        return;
      case "textarea":
        listenToNonDelegatedEvent("invalid", domElement);
        propKey = hasSrcSet = hasSrc = null;
        for (propValue in props)
          if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
            switch (propValue) {
              case "value":
                hasSrc = defaultValue;
                break;
              case "defaultValue":
                hasSrcSet = defaultValue;
                break;
              case "children":
                propKey = defaultValue;
                break;
              case "dangerouslySetInnerHTML":
                if (null != defaultValue) throw Error(formatProdErrorMessage(91));
                break;
              default:
                setProp(domElement, tag, propValue, defaultValue, props, null);
            }
        initTextarea(domElement, hasSrc, hasSrcSet, propKey);
        return;
      case "option":
        for (checked in props)
          if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
            switch (checked) {
              case "selected":
                domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
                break;
              default:
                setProp(domElement, tag, checked, hasSrc, props, null);
            }
        return;
      case "dialog":
        listenToNonDelegatedEvent("beforetoggle", domElement);
        listenToNonDelegatedEvent("toggle", domElement);
        listenToNonDelegatedEvent("cancel", domElement);
        listenToNonDelegatedEvent("close", domElement);
        break;
      case "iframe":
      case "object":
        listenToNonDelegatedEvent("load", domElement);
        break;
      case "video":
      case "audio":
        for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
          listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
        break;
      case "image":
        listenToNonDelegatedEvent("error", domElement);
        listenToNonDelegatedEvent("load", domElement);
        break;
      case "details":
        listenToNonDelegatedEvent("toggle", domElement);
        break;
      case "embed":
      case "source":
      case "link":
        listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (defaultChecked in props)
          if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
            switch (defaultChecked) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(formatProdErrorMessage(137, tag));
              default:
                setProp(domElement, tag, defaultChecked, hasSrc, props, null);
            }
        return;
      default:
        if (isCustomElement(tag)) {
          for (propValue$204 in props)
            props.hasOwnProperty(propValue$204) && (hasSrc = props[propValue$204], void 0 !== hasSrc && setPropOnCustomElement(
              domElement,
              tag,
              propValue$204,
              hasSrc,
              props,
              void 0
            ));
          return;
        }
    }
    for (defaultValue in props)
      props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
  }
  var emptyProps = {};
  function updateProperties(domElement, tag, lastProps, nextProps) {
    switch (tag) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
        for (propKey in lastProps) {
          var lastProp = lastProps[propKey];
          if (lastProps.hasOwnProperty(propKey) && null != lastProp)
            switch (propKey) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                lastDefaultValue = lastProp;
              default:
                nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
            }
        }
        for (var propKey$221 in nextProps) {
          var propKey = nextProps[propKey$221];
          lastProp = lastProps[propKey$221];
          if (nextProps.hasOwnProperty(propKey$221) && (null != propKey || null != lastProp))
            switch (propKey$221) {
              case "type":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                type = propKey;
                break;
              case "name":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                name = propKey;
                break;
              case "checked":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                checked = propKey;
                break;
              case "defaultChecked":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                defaultChecked = propKey;
                break;
              case "value":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                value = propKey;
                break;
              case "defaultValue":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                defaultValue = propKey;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != propKey)
                  throw Error(formatProdErrorMessage(137, tag));
                break;
              default:
                propKey !== lastProp && setProp(
                  domElement,
                  tag,
                  propKey$221,
                  propKey,
                  nextProps,
                  lastProp
                );
            }
        }
        updateInput(
          domElement,
          value,
          defaultValue,
          lastDefaultValue,
          checked,
          defaultChecked,
          type,
          name
        );
        return;
      case "select":
        propKey = value = defaultValue = propKey$221 = null;
        for (type in lastProps)
          if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
            switch (type) {
              case "value":
                break;
              case "multiple":
                propKey = lastDefaultValue;
              default:
                nextProps.hasOwnProperty(type) || setProp(
                  domElement,
                  tag,
                  type,
                  null,
                  nextProps,
                  lastDefaultValue
                );
            }
        for (name in nextProps)
          if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
            switch (name) {
              case "value":
                type !== lastDefaultValue && (viewTransitionMutationContext = true);
                propKey$221 = type;
                break;
              case "defaultValue":
                type !== lastDefaultValue && (viewTransitionMutationContext = true);
                defaultValue = type;
                break;
              case "multiple":
                type !== lastDefaultValue && (viewTransitionMutationContext = true), value = type;
              default:
                type !== lastDefaultValue && setProp(
                  domElement,
                  tag,
                  name,
                  type,
                  nextProps,
                  lastDefaultValue
                );
            }
        tag = defaultValue;
        lastProps = value;
        nextProps = propKey;
        null != propKey$221 ? updateOptions(domElement, !!lastProps, propKey$221, false) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
        return;
      case "textarea":
        propKey = propKey$221 = null;
        for (defaultValue in lastProps)
          if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
            switch (defaultValue) {
              case "value":
                break;
              case "children":
                break;
              default:
                setProp(domElement, tag, defaultValue, null, nextProps, name);
            }
        for (value in nextProps)
          if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
            switch (value) {
              case "value":
                name !== type && (viewTransitionMutationContext = true);
                propKey$221 = name;
                break;
              case "defaultValue":
                name !== type && (viewTransitionMutationContext = true);
                propKey = name;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (null != name) throw Error(formatProdErrorMessage(91));
                break;
              default:
                name !== type && setProp(domElement, tag, value, name, nextProps, type);
            }
        updateTextarea(domElement, propKey$221, propKey);
        return;
      case "option":
        for (var propKey$237 in lastProps)
          if (propKey$221 = lastProps[propKey$237], lastProps.hasOwnProperty(propKey$237) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$237))
            switch (propKey$237) {
              case "selected":
                domElement.selected = false;
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  propKey$237,
                  null,
                  nextProps,
                  propKey$221
                );
            }
        for (lastDefaultValue in nextProps)
          if (propKey$221 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$221 !== propKey && (null != propKey$221 || null != propKey))
            switch (lastDefaultValue) {
              case "selected":
                propKey$221 !== propKey && (viewTransitionMutationContext = true);
                domElement.selected = propKey$221 && "function" !== typeof propKey$221 && "symbol" !== typeof propKey$221;
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  lastDefaultValue,
                  propKey$221,
                  nextProps,
                  propKey
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var propKey$242 in lastProps)
          propKey$221 = lastProps[propKey$242], lastProps.hasOwnProperty(propKey$242) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$242) && setProp(domElement, tag, propKey$242, null, nextProps, propKey$221);
        for (checked in nextProps)
          if (propKey$221 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$221 !== propKey && (null != propKey$221 || null != propKey))
            switch (checked) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != propKey$221)
                  throw Error(formatProdErrorMessage(137, tag));
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  checked,
                  propKey$221,
                  nextProps,
                  propKey
                );
            }
        return;
      default:
        if (isCustomElement(tag)) {
          for (var propKey$247 in lastProps)
            propKey$221 = lastProps[propKey$247], lastProps.hasOwnProperty(propKey$247) && void 0 !== propKey$221 && !nextProps.hasOwnProperty(propKey$247) && setPropOnCustomElement(
              domElement,
              tag,
              propKey$247,
              void 0,
              nextProps,
              propKey$221
            );
          for (defaultChecked in nextProps)
            propKey$221 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$221 === propKey || void 0 === propKey$221 && void 0 === propKey || setPropOnCustomElement(
              domElement,
              tag,
              defaultChecked,
              propKey$221,
              nextProps,
              propKey
            );
          return;
        }
    }
    for (var propKey$252 in lastProps)
      propKey$221 = lastProps[propKey$252], lastProps.hasOwnProperty(propKey$252) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$252) && setProp(domElement, tag, propKey$252, null, nextProps, propKey$221);
    for (lastProp in nextProps)
      propKey$221 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$221 === propKey || null == propKey$221 && null == propKey || setProp(domElement, tag, lastProp, propKey$221, nextProps, propKey);
  }
  function isLikelyStaticResource(initiatorType) {
    switch (initiatorType) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  function estimateBandwidth() {
    if ("function" === typeof performance.getEntriesByType) {
      for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
        var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
        if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
          initiatorType = 0;
          duration = entry.responseEnd;
          for (i += 1; i < resourceEntries.length; i++) {
            var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
            if (overlapStartTime > duration) break;
            var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
            overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
          }
          --i;
          bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
          count++;
          if (10 < count) break;
        }
      }
      if (0 < count) return bits / count / 1e6;
    }
    return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
  }
  var eventsEnabled = null, selectionInformation = null;
  function getOwnerDocumentFromRootContainer(rootContainerElement) {
    return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
  }
  function getOwnHostContext(namespaceURI) {
    switch (namespaceURI) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function getChildHostContextProd(parentNamespace, type) {
    if (0 === parentNamespace)
      switch (type) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
  }
  function createHoistableInstance(type, props, rootContainerInstance, internalInstanceHandle) {
    rootContainerInstance = getOwnerDocumentFromRootContainer(
      rootContainerInstance
    ).createElement(type);
    rootContainerInstance[internalInstanceKey] = internalInstanceHandle;
    rootContainerInstance[internalPropsKey] = props;
    setInitialProperties(rootContainerInstance, type, props);
    markNodeAsHoistable(rootContainerInstance);
    return rootContainerInstance;
  }
  function shouldSetTextContent(type, props) {
    return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
  }
  var currentPopstateTransitionEvent = null;
  function shouldAttemptEagerTransition() {
    var event = window.event;
    if (event && "popstate" === event.type) {
      if (event === currentPopstateTransitionEvent) return false;
      currentPopstateTransitionEvent = event;
      return true;
    }
    currentPopstateTransitionEvent = null;
    return false;
  }
  var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0, cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0, localPromise = "function" === typeof Promise ? Promise : void 0, localRequestAnimationFrame = "function" === typeof requestAnimationFrame ? requestAnimationFrame : scheduleTimeout, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
    return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
  } : scheduleTimeout;
  function handleErrorInNextTick(error) {
    setTimeout(function() {
      throw error;
    });
  }
  function isSingletonScope(type) {
    return "head" === type;
  }
  function clearHydrationBoundary(parentInstance, hydrationInstance) {
    var node = hydrationInstance, depth = 0;
    do {
      var nextNode = node.nextSibling;
      parentInstance.removeChild(node);
      if (nextNode && 8 === nextNode.nodeType)
        if (node = nextNode.data, "/$" === node || "/&" === node) {
          if (0 === depth) {
            parentInstance.removeChild(nextNode);
            retryIfBlockedOn(hydrationInstance);
            return;
          }
          depth--;
        } else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node)
          depth++;
        else if ("html" === node)
          clearSingletonPreambleContribution(
            parentInstance.ownerDocument.documentElement
          );
        else if ("head" === node) {
          node = parentInstance.ownerDocument.head;
          clearSingletonPreambleContribution(node);
          for (var node$jscomp$0 = node.firstChild; node$jscomp$0; ) {
            var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
            node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
            node$jscomp$0 = nextNode$jscomp$0;
          }
        } else
          "body" === node && clearSingletonPreambleContribution(parentInstance.ownerDocument.body);
      node = nextNode;
    } while (node);
    retryIfBlockedOn(hydrationInstance);
  }
  function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
    var node = suspenseInstance;
    suspenseInstance = 0;
    do {
      var nextNode = node.nextSibling;
      1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
      if (nextNode && 8 === nextNode.nodeType)
        if (node = nextNode.data, "/$" === node)
          if (0 === suspenseInstance) break;
          else suspenseInstance--;
        else
          "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
      node = nextNode;
    } while (node);
  }
  function applyViewTransitionName(instance, name, className) {
    name = CSS.escape(name) !== name ? "r-" + btoa(name).replace(/=/g, "") : name;
    instance.style.viewTransitionName = name;
    null != className && (instance.style.viewTransitionClass = className);
    className = getComputedStyle(instance);
    if ("inline" === className.display) {
      name = instance.getClientRects();
      if (1 === name.length) var JSCompiler_inline_result = 1;
      else
        for (var i = JSCompiler_inline_result = 0; i < name.length; i++) {
          var rect = name[i];
          0 < rect.width && 0 < rect.height && JSCompiler_inline_result++;
        }
      1 === JSCompiler_inline_result && (instance = instance.style, instance.display = 1 === name.length ? "inline-block" : "block", instance.marginTop = "-" + className.paddingTop, instance.marginBottom = "-" + className.paddingBottom);
    }
  }
  function restoreViewTransitionName(instance, props) {
    instance = instance.style;
    props = props.style;
    var viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionName") ? props.viewTransitionName : props.hasOwnProperty("view-transition-name") ? props["view-transition-name"] : null : null;
    instance.viewTransitionName = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
    viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionClass") ? props.viewTransitionClass : props.hasOwnProperty("view-transition-class") ? props["view-transition-class"] : null : null;
    instance.viewTransitionClass = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
    "inline-block" === instance.display && (null == props ? instance.display = instance.margin = "" : (viewTransitionName = props.display, instance.display = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, viewTransitionName = props.margin, null != viewTransitionName ? instance.margin = viewTransitionName : (viewTransitionName = props.hasOwnProperty("marginTop") ? props.marginTop : props["margin-top"], instance.marginTop = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, props = props.hasOwnProperty("marginBottom") ? props.marginBottom : props["margin-bottom"], instance.marginBottom = null == props || "boolean" === typeof props ? "" : props)));
  }
  function createMeasurement(rect, computedStyle, element) {
    element = element.ownerDocument.defaultView;
    return {
      rect,
      abs: "absolute" === computedStyle.position || "fixed" === computedStyle.position,
      clip: "none" !== computedStyle.clipPath || "visible" !== computedStyle.overflow || "none" !== computedStyle.filter || "none" !== computedStyle.mask || "none" !== computedStyle.mask || "0px" !== computedStyle.borderRadius,
      view: 0 <= rect.bottom && 0 <= rect.right && rect.top <= element.innerHeight && rect.left <= element.innerWidth
    };
  }
  function measureInstance(instance) {
    var rect = instance.getBoundingClientRect(), computedStyle = getComputedStyle(instance);
    return createMeasurement(rect, computedStyle, instance);
  }
  function forceLayout(ownerDocument) {
    return ownerDocument.documentElement.clientHeight;
  }
  function waitForImageToLoad(resolve) {
    this.addEventListener("load", resolve);
    this.addEventListener("error", resolve);
  }
  function startViewTransition(suspendedState, rootContainer, transitionTypes, mutationCallback, layoutCallback, afterMutationCallback, spawnedWorkCallback, passiveCallback, errorCallback) {
    var ownerDocument = 9 === rootContainer.nodeType ? rootContainer : rootContainer.ownerDocument;
    try {
      var transition = ownerDocument.startViewTransition({
        update: function() {
          var ownerWindow = ownerDocument.defaultView, pendingNavigation = ownerWindow.navigation && ownerWindow.navigation.transition, previousFontLoadingStatus = ownerDocument.fonts.status;
          mutationCallback();
          var blockingPromises = [];
          "loaded" === previousFontLoadingStatus && (forceLayout(ownerDocument), "loading" === ownerDocument.fonts.status && blockingPromises.push(ownerDocument.fonts.ready));
          previousFontLoadingStatus = blockingPromises.length;
          if (null !== suspendedState)
            for (var suspenseyImages = suspendedState.suspenseyImages, imgBytes = 0, i = 0; i < suspenseyImages.length; i++) {
              var suspenseyImage = suspenseyImages[i];
              if (!suspenseyImage.complete) {
                var rect = suspenseyImage.getBoundingClientRect();
                if (0 < rect.bottom && 0 < rect.right && rect.top < ownerWindow.innerHeight && rect.left < ownerWindow.innerWidth) {
                  imgBytes += estimateImageBytes(suspenseyImage);
                  if (imgBytes > estimatedBytesWithinLimit) {
                    blockingPromises.length = previousFontLoadingStatus;
                    break;
                  }
                  suspenseyImage = new Promise(
                    waitForImageToLoad.bind(suspenseyImage)
                  );
                  blockingPromises.push(suspenseyImage);
                }
              }
            }
          if (0 < blockingPromises.length)
            return ownerWindow = Promise.race([
              Promise.all(blockingPromises),
              new Promise(function(resolve) {
                return setTimeout(resolve, 500);
              })
            ]).then(layoutCallback, layoutCallback), (pendingNavigation ? Promise.allSettled([pendingNavigation.finished, ownerWindow]) : ownerWindow).then(afterMutationCallback, afterMutationCallback);
          layoutCallback();
          if (pendingNavigation)
            return pendingNavigation.finished.then(
              afterMutationCallback,
              afterMutationCallback
            );
          afterMutationCallback();
        },
        types: transitionTypes
      });
      ownerDocument.__reactViewTransition = transition;
      var viewTransitionAnimations = [];
      transition.ready.then(
        function() {
          for (var animations = ownerDocument.documentElement.getAnimations({
            subtree: true
          }), i = 0; i < animations.length; i++) {
            var animation = animations[i], effect = animation.effect, pseudoElement = effect.pseudoElement;
            if (null != pseudoElement && pseudoElement.startsWith("::view-transition")) {
              viewTransitionAnimations.push(animation);
              animation = effect.getKeyframes();
              for (var height = pseudoElement = void 0, unchangedDimensions = true, j = 0; j < animation.length; j++) {
                var keyframe = animation[j], w = keyframe.width;
                if (void 0 === pseudoElement) pseudoElement = w;
                else if (pseudoElement !== w) {
                  unchangedDimensions = false;
                  break;
                }
                w = keyframe.height;
                if (void 0 === height) height = w;
                else if (height !== w) {
                  unchangedDimensions = false;
                  break;
                }
                delete keyframe.width;
                delete keyframe.height;
                "none" === keyframe.transform && delete keyframe.transform;
              }
              unchangedDimensions && void 0 !== pseudoElement && void 0 !== height && (effect.setKeyframes(animation), unchangedDimensions = getComputedStyle(
                effect.target,
                effect.pseudoElement
              ), unchangedDimensions.width !== pseudoElement || unchangedDimensions.height !== height) && (unchangedDimensions = animation[0], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, unchangedDimensions = animation[animation.length - 1], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, effect.setKeyframes(animation));
            }
          }
          spawnedWorkCallback();
        },
        function(error) {
          ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
          try {
            if ("object" === typeof error && null !== error)
              switch (error.name) {
                case "InvalidStateError":
                  if ("View transition was skipped because document visibility state is hidden." === error.message || "Skipping view transition because document visibility state has become hidden." === error.message || "Skipping view transition because viewport size changed." === error.message || "Transition was aborted because of invalid state" === error.message)
                    error = null;
              }
            null !== error && errorCallback(error);
          } finally {
            mutationCallback(), layoutCallback(), spawnedWorkCallback();
          }
        }
      );
      transition.finished.finally(function() {
        for (var i = 0; i < viewTransitionAnimations.length; i++)
          viewTransitionAnimations[i].cancel();
        ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
        passiveCallback();
      });
      return transition;
    } catch (x) {
      return mutationCallback(), layoutCallback(), spawnedWorkCallback(), null;
    }
  }
  function ViewTransitionPseudoElement(pseudo, name) {
    this._scope = document.documentElement;
    this._selector = "::view-transition-" + pseudo + "(" + name + ")";
  }
  ViewTransitionPseudoElement.prototype.animate = function(keyframes, options2) {
    options2 = "number" === typeof options2 ? { duration: options2 } : assign({}, options2);
    options2.pseudoElement = this._selector;
    return this._scope.animate(keyframes, options2);
  };
  ViewTransitionPseudoElement.prototype.getAnimations = function() {
    for (var scope = this._scope, selector = this._selector, animations = scope.getAnimations({ subtree: true }), result = [], i = 0; i < animations.length; i++) {
      var effect = animations[i].effect;
      null !== effect && effect.target === scope && effect.pseudoElement === selector && result.push(animations[i]);
    }
    return result;
  };
  ViewTransitionPseudoElement.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function createViewTransitionInstance(name) {
    return {
      name,
      group: new ViewTransitionPseudoElement("group", name),
      imagePair: new ViewTransitionPseudoElement("image-pair", name),
      old: new ViewTransitionPseudoElement("old", name),
      new: new ViewTransitionPseudoElement("new", name)
    };
  }
  function FragmentInstance(fragmentFiber) {
    this._fragmentFiber = fragmentFiber;
    this._observers = this._eventListeners = null;
  }
  FragmentInstance.prototype.addEventListener = function(type, listener, optionsOrUseCapture) {
    var signal = null, cleanup = null;
    if (null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && (signal = optionsOrUseCapture.signal || null, null !== signal && signal.aborted))
      return;
    null === this._eventListeners && (this._eventListeners = []);
    var listeners = this._eventListeners;
    if (-1 === indexOfEventListener(listeners, type, listener, optionsOrUseCapture)) {
      var fragmentInstance = this, attachedListener = listener;
      null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && true === optionsOrUseCapture.once && (attachedListener = function(event) {
        fragmentInstance.removeEventListener(
          type,
          listener,
          optionsOrUseCapture
        );
        "function" === typeof listener ? listener.call(this, event) : listener.handleEvent(event);
      });
      null !== signal && (cleanup = fragmentInstance.removeEventListener.bind(
        fragmentInstance,
        type,
        listener,
        optionsOrUseCapture
      ), signal.addEventListener("abort", cleanup, { once: true }), cleanup = signal.removeEventListener.bind(signal, "abort", cleanup));
      signal = getAttachOptions(optionsOrUseCapture);
      listeners.push({
        type,
        listener,
        optionsOrUseCapture,
        attachedListener,
        cleanup
      });
      traverseVisibleInstancesAndTextInstances(
        this._fragmentFiber.child,
        false,
        addEventListenerToChild,
        type,
        attachedListener,
        signal
      );
    }
    this._eventListeners = listeners;
  };
  function addEventListenerToChild(child, type, listener, optionsOrUseCapture) {
    getInstanceFromHostFiber(child).addEventListener(
      type,
      listener,
      optionsOrUseCapture
    );
    return false;
  }
  FragmentInstance.prototype.removeEventListener = function(type, listener, optionsOrUseCapture) {
    var listeners = this._eventListeners;
    if (null !== listeners && (listener = indexOfEventListener(
      listeners,
      type,
      listener,
      optionsOrUseCapture
    ), -1 !== listener)) {
      var _listeners$index = listeners[listener];
      optionsOrUseCapture = _listeners$index.attachedListener;
      var cleanup = _listeners$index.cleanup;
      _listeners$index = getAttachOptions(_listeners$index.optionsOrUseCapture);
      traverseVisibleInstancesAndTextInstances(
        this._fragmentFiber.child,
        false,
        removeEventListenerFromChild,
        type,
        optionsOrUseCapture,
        _listeners$index
      );
      listeners.splice(listener, 1);
      null !== cleanup && cleanup();
    }
  };
  function removeEventListenerFromChild(child, type, listener, optionsOrUseCapture) {
    getInstanceFromHostFiber(child).removeEventListener(
      type,
      listener,
      optionsOrUseCapture
    );
    return false;
  }
  function getAttachOptions(opts) {
    return null != opts && "boolean" !== typeof opts && (true === opts.once || opts.signal instanceof AbortSignal) ? { capture: opts.capture, passive: opts.passive } : opts;
  }
  function normalizeListenerOptions(opts) {
    return null == opts ? "c=0" : "boolean" === typeof opts ? "c=" + (opts ? "1" : "0") : "c=" + (opts.capture ? "1" : "0");
  }
  function indexOfEventListener(eventListeners, type, listener, optionsOrUseCapture) {
    if (0 === eventListeners.length) return -1;
    optionsOrUseCapture = normalizeListenerOptions(optionsOrUseCapture);
    for (var i = 0; i < eventListeners.length; i++) {
      var item = eventListeners[i];
      if (item.type === type && item.listener === listener && normalizeListenerOptions(item.optionsOrUseCapture) === optionsOrUseCapture)
        return i;
    }
    return -1;
  }
  FragmentInstance.prototype.dispatchEvent = function(event) {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    if (null === parentHostFiber) return true;
    parentHostFiber = getInstanceFromHostFiber(parentHostFiber);
    var eventListeners = this._eventListeners;
    if (null !== eventListeners && 0 < eventListeners.length || !event.bubbles) {
      var temp = 9 === parentHostFiber.nodeType ? parentHostFiber.createComment("") : document.createTextNode("");
      if (eventListeners)
        for (var i = 0; i < eventListeners.length; i++) {
          var _eventListeners$i = eventListeners[i];
          temp.addEventListener(
            _eventListeners$i.type,
            _eventListeners$i.attachedListener,
            getAttachOptions(_eventListeners$i.optionsOrUseCapture)
          );
        }
      parentHostFiber.appendChild(temp);
      event = temp.dispatchEvent(event);
      if (eventListeners)
        for (i = 0; i < eventListeners.length; i++)
          _eventListeners$i = eventListeners[i], temp.removeEventListener(
            _eventListeners$i.type,
            _eventListeners$i.attachedListener,
            getAttachOptions(_eventListeners$i.optionsOrUseCapture)
          );
      parentHostFiber.removeChild(temp);
      return event;
    }
    return parentHostFiber.dispatchEvent(event);
  };
  FragmentInstance.prototype.focus = function(focusOptions) {
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      true,
      setFocusOnFiberIfFocusable,
      focusOptions,
      void 0,
      void 0
    );
  };
  function setFocusOnFiberIfFocusable(fiber, focusOptions) {
    if (6 === fiber.tag) return false;
    fiber = getInstanceFromHostFiber(fiber);
    return setFocusIfFocusable(fiber, focusOptions);
  }
  FragmentInstance.prototype.focusLast = function(focusOptions) {
    var children = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      true,
      collectChildren,
      children,
      void 0,
      void 0
    );
    for (var i = children.length - 1; 0 <= i && !setFocusOnFiberIfFocusable(children[i], focusOptions); i--) ;
  };
  function collectChildren(child, collection) {
    collection.push(child);
    return false;
  }
  FragmentInstance.prototype.blur = function() {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    null !== parentHostFiber && (parentHostFiber = getInstanceFromHostFiber(parentHostFiber), parentHostFiber = getOwnerDocumentFromRootContainer(parentHostFiber).activeElement, null !== parentHostFiber && traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      blurActiveElementWithinFragment,
      parentHostFiber,
      void 0,
      void 0
    ));
  };
  function blurActiveElementWithinFragment(child, activeElement2) {
    if (6 === child.tag) return false;
    child = getInstanceFromHostFiber(child);
    return child === activeElement2 || child.contains(activeElement2) ? (activeElement2.blur(), true) : false;
  }
  FragmentInstance.prototype.observeUsing = function(observer) {
    null === this._observers && (this._observers = /* @__PURE__ */ new Set());
    this._observers.add(observer);
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      observeChild,
      observer,
      void 0,
      void 0
    );
  };
  function observeChild(child, observer) {
    if (6 === child.tag) return false;
    child = getInstanceFromHostFiber(child);
    observer.observe(child);
    return false;
  }
  FragmentInstance.prototype.unobserveUsing = function(observer) {
    var observers = this._observers;
    if (null !== observers && observers.has(observer)) {
      observers.delete(observer);
      traverseVisibleInstancesAndTextInstances(
        this._fragmentFiber.child,
        false,
        unobserveChild,
        observer,
        void 0,
        void 0
      );
      for (var i = observers = 0; i < pendingIntersectionUnobserves.length; i++) {
        var pending = pendingIntersectionUnobserves[i];
        pending.fragmentInstance === this && pending.observer === observer ? observer.unobserve(pending.instance) : pendingIntersectionUnobserves[observers++] = pending;
      }
      pendingIntersectionUnobserves.length = observers;
    }
  };
  function unobserveChild(child, observer) {
    if (6 === child.tag) return false;
    child = getInstanceFromHostFiber(child);
    observer.unobserve(child);
    return false;
  }
  var pendingIntersectionUnobserves = [], intersectionUnobserveScheduled = false;
  function schedulePendingIntersectionUnobserve(fragmentInstance, observer, instance) {
    pendingIntersectionUnobserves.push({
      fragmentInstance,
      observer,
      instance
    });
    intersectionUnobserveScheduled || (intersectionUnobserveScheduled = true, requestPostPaintCallback(function() {
      intersectionUnobserveScheduled = false;
      var pending = pendingIntersectionUnobserves;
      pendingIntersectionUnobserves = [];
      for (var i = 0; i < pending.length; i++) {
        var item = pending[i];
        item.observer.unobserve(item.instance);
      }
    }));
  }
  FragmentInstance.prototype.getClientRects = function() {
    var rects = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      collectClientRects,
      rects,
      void 0,
      void 0
    );
    return rects;
  };
  function collectClientRects(child, rects) {
    if (6 === child.tag) {
      child = child.stateNode;
      var range = child.ownerDocument.createRange();
      range.selectNodeContents(child);
      rects.push.apply(rects, range.getClientRects());
    } else
      child = getInstanceFromHostFiber(child), rects.push.apply(rects, child.getClientRects());
    return false;
  }
  FragmentInstance.prototype.getRootNode = function(getRootNodeOptions) {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    return null === parentHostFiber ? this : getInstanceFromHostFiber(parentHostFiber).getRootNode(getRootNodeOptions);
  };
  FragmentInstance.prototype.compareDocumentPosition = function(otherNode) {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    if (null === parentHostFiber) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var children = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      collectChildren,
      children,
      void 0,
      void 0
    );
    var parentHostInstance = getInstanceFromHostFiber(parentHostFiber);
    if (0 === children.length) {
      children = parentHostInstance;
      if (fiberIsPortaledIntoHost(this._fragmentFiber)) {
        a: {
          for (parentHostFiber = this._fragmentFiber.return; null !== parentHostFiber; ) {
            if (4 === parentHostFiber.tag) {
              parentHostFiber = parentHostFiber.stateNode.containerInfo;
              break a;
            }
            if (3 === parentHostFiber.tag || 5 === parentHostFiber.tag || 27 === parentHostFiber.tag)
              break;
            parentHostFiber = parentHostFiber.return;
          }
          parentHostFiber = null;
        }
        null != parentHostFiber && (children = parentHostFiber);
      }
      parentHostFiber = this._fragmentFiber;
      var result = parentHostInstance = children.compareDocumentPosition(otherNode);
      children === otherNode ? result = Node.DOCUMENT_POSITION_CONTAINS : parentHostInstance & Node.DOCUMENT_POSITION_CONTAINED_BY && (children = getFragmentInstanceOrTextInstanceSiblings(parentHostFiber)[1], null === children ? result = Node.DOCUMENT_POSITION_PRECEDING : (otherNode = getInstanceFromHostFiber(children).compareDocumentPosition(
        otherNode
      ), result = 0 === otherNode || otherNode & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING));
      return result |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    parentHostFiber = getInstanceFromHostFiber(children[0]);
    result = getInstanceFromHostFiber(children[children.length - 1]);
    var parentHostInstanceFromDOM = fiberIsPortaledIntoHost(this._fragmentFiber) ? parentHostFiber.parentElement : parentHostInstance;
    if (null == parentHostInstanceFromDOM)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    parentHostInstance = parentHostInstanceFromDOM.compareDocumentPosition(parentHostFiber) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    parentHostInstanceFromDOM = parentHostInstanceFromDOM.compareDocumentPosition(result) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var firstResult = parentHostFiber.compareDocumentPosition(otherNode), lastResult = result.compareDocumentPosition(otherNode), otherNodeIsWithinFirstOrLastChild = firstResult & Node.DOCUMENT_POSITION_CONTAINED_BY || lastResult & Node.DOCUMENT_POSITION_CONTAINED_BY;
    lastResult = parentHostInstance && parentHostInstanceFromDOM && firstResult & Node.DOCUMENT_POSITION_FOLLOWING && lastResult & Node.DOCUMENT_POSITION_PRECEDING;
    parentHostFiber = parentHostInstance && parentHostFiber === otherNode || parentHostInstanceFromDOM && result === otherNode || otherNodeIsWithinFirstOrLastChild || lastResult ? Node.DOCUMENT_POSITION_CONTAINED_BY : !parentHostInstance && parentHostFiber === otherNode || !parentHostInstanceFromDOM && result === otherNode ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : firstResult;
    return parentHostFiber & Node.DOCUMENT_POSITION_DISCONNECTED || parentHostFiber & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || validateDocumentPositionWithFiberTree(
      parentHostFiber,
      this._fragmentFiber,
      children[0],
      children[children.length - 1],
      otherNode
    ) ? parentHostFiber : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function validateDocumentPositionWithFiberTree(documentPosition, fragmentFiber, precedingBoundaryFiber, followingBoundaryFiber, otherNode) {
    var otherFiber = getClosestInstanceFromNode(otherNode);
    if (documentPosition & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (precedingBoundaryFiber = !!otherFiber)
        a: {
          for (; null !== otherFiber; ) {
            if (7 === otherFiber.tag && (otherFiber === fragmentFiber || otherFiber.alternate === fragmentFiber)) {
              precedingBoundaryFiber = true;
              break a;
            }
            otherFiber = otherFiber.return;
          }
          precedingBoundaryFiber = false;
        }
      return precedingBoundaryFiber;
    }
    if (documentPosition & Node.DOCUMENT_POSITION_CONTAINS) {
      if (null === otherFiber)
        return otherFiber = otherNode.ownerDocument, otherNode === otherFiber || otherNode === otherFiber.documentElement || otherNode === otherFiber.body;
      a: {
        otherFiber = fragmentFiber;
        for (fragmentFiber = getFragmentParentInstanceOrContainerFiber(fragmentFiber); null !== otherFiber; ) {
          if (!(5 !== otherFiber.tag && 3 !== otherFiber.tag && 27 !== otherFiber.tag || otherFiber !== fragmentFiber && otherFiber.alternate !== fragmentFiber)) {
            otherFiber = true;
            break a;
          }
          otherFiber = otherFiber.return;
        }
        otherFiber = false;
      }
      return otherFiber;
    }
    return documentPosition & Node.DOCUMENT_POSITION_PRECEDING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === precedingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(
      precedingBoundaryFiber,
      otherFiber,
      getParentForFragmentAncestors
    ), null === fragmentFiber ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(
      fragmentFiber,
      true,
      isFiberPrecedingCheck,
      otherFiber,
      precedingBoundaryFiber
    ), otherFiber = searchTarget, searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === followingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(
      followingBoundaryFiber,
      otherFiber,
      getParentForFragmentAncestors
    ), null === fragmentFiber ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(
      fragmentFiber,
      true,
      isFiberFollowingCheck,
      otherFiber,
      followingBoundaryFiber
    ), otherFiber = searchTarget, searchBoundary = searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : false;
  }
  function scrollTextNodeIntoView(textNode, resolvedAlignToTop) {
    var range = textNode.ownerDocument.createRange();
    range.selectNodeContents(textNode);
    textNode = range.getBoundingClientRect();
    window.scrollTo(
      window.scrollX + textNode.left,
      resolvedAlignToTop ? window.scrollY + textNode.top : window.scrollY + textNode.bottom - window.innerHeight
    );
  }
  FragmentInstance.prototype.scrollIntoView = function(alignToTop) {
    if ("object" === typeof alignToTop) throw Error(formatProdErrorMessage(566));
    var children = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      collectChildren,
      children,
      void 0,
      void 0
    );
    var resolvedAlignToTop = false !== alignToTop;
    if (0 === children.length) {
      var hostSiblings = getFragmentInstanceOrTextInstanceSiblings(
        this._fragmentFiber
      );
      hostSiblings = resolvedAlignToTop ? hostSiblings[1] || hostSiblings[0] || getFragmentParentInstanceOrContainerFiber(this._fragmentFiber) : hostSiblings[0] || hostSiblings[1];
      if (null === hostSiblings) return;
      if (6 === hostSiblings.tag) {
        alignToTop = getInstanceFromHostFiber(hostSiblings);
        scrollTextNodeIntoView(alignToTop, resolvedAlignToTop);
        return;
      }
      hostSiblings = getInstanceFromHostFiber(hostSiblings);
      if (9 !== hostSiblings.nodeType) {
        if (11 === hostSiblings.nodeType) {
          resolvedAlignToTop = "host" in hostSiblings ? hostSiblings.host : null;
          null !== resolvedAlignToTop && resolvedAlignToTop.scrollIntoView(alignToTop);
          return;
        }
        hostSiblings.scrollIntoView(alignToTop);
      }
    }
    for (hostSiblings = resolvedAlignToTop ? children.length - 1 : 0; hostSiblings !== (resolvedAlignToTop ? -1 : children.length); ) {
      var child = children[hostSiblings];
      6 === child.tag ? (child = getInstanceFromHostFiber(child), scrollTextNodeIntoView(child, resolvedAlignToTop)) : getInstanceFromHostFiber(child).scrollIntoView(alignToTop);
      hostSiblings += resolvedAlignToTop ? -1 : 1;
    }
  };
  function addFragmentHandleToFiber(child, fragmentInstance) {
    child = getInstanceFromHostFiber(child);
    addFragmentHandleToInstance(child, fragmentInstance);
    return false;
  }
  function addFragmentHandleToInstance(instance, fragmentInstance) {
    null == instance.reactFragments && (instance.reactFragments = /* @__PURE__ */ new Set());
    instance.reactFragments.add(fragmentInstance);
  }
  function commitNewChildToFragmentInstance(childInstance, fragmentInstance) {
    var eventListeners = fragmentInstance._eventListeners;
    if (null !== eventListeners)
      for (var i$jscomp$0 = 0; i$jscomp$0 < eventListeners.length; i$jscomp$0++) {
        var _eventListeners$i3 = eventListeners[i$jscomp$0];
        childInstance.addEventListener(
          _eventListeners$i3.type,
          _eventListeners$i3.attachedListener,
          getAttachOptions(_eventListeners$i3.optionsOrUseCapture)
        );
      }
    3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
      for (var writeIdx = 0, i = 0; i < pendingIntersectionUnobserves.length; i++) {
        var pending = pendingIntersectionUnobserves[i];
        if (pending.fragmentInstance !== fragmentInstance || pending.observer !== observer || pending.instance !== childInstance)
          pendingIntersectionUnobserves[writeIdx++] = pending;
      }
      pendingIntersectionUnobserves.length = writeIdx;
      observer.observe(childInstance);
    }), addFragmentHandleToInstance(childInstance, fragmentInstance));
  }
  function deleteChildFromFragmentInstance(childInstance, fragmentInstance) {
    var eventListeners = fragmentInstance._eventListeners;
    if (null !== eventListeners)
      for (var i = 0; i < eventListeners.length; i++) {
        var _eventListeners$i4 = eventListeners[i];
        childInstance.removeEventListener(
          _eventListeners$i4.type,
          _eventListeners$i4.attachedListener,
          getAttachOptions(_eventListeners$i4.optionsOrUseCapture)
        );
      }
    3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
      "string" === typeof observer.rootMargin ? schedulePendingIntersectionUnobserve(
        fragmentInstance,
        observer,
        childInstance
      ) : observer.unobserve(childInstance);
    }), null != childInstance.reactFragments && childInstance.reactFragments.delete(fragmentInstance));
  }
  function clearContainerSparingly(container) {
    var nextNode = container.firstChild;
    nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
    for (; nextNode; ) {
      var node = nextNode;
      nextNode = nextNode.nextSibling;
      switch (node.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          clearContainerSparingly(node);
          detachDeletedInstance(node);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if ("stylesheet" === node.rel.toLowerCase()) continue;
      }
      container.removeChild(node);
    }
  }
  function canHydrateInstance(instance, type, props, inRootOrSingleton) {
    for (; 1 === instance.nodeType; ) {
      var anyProps = props;
      if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
        if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
          break;
      } else if (!inRootOrSingleton)
        if ("input" === type && "hidden" === instance.type) {
          var name = null == anyProps.name ? null : "" + anyProps.name;
          if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
            return instance;
        } else return instance;
      else if (!instance[internalHoistableMarker])
        switch (type) {
          case "meta":
            if (!instance.hasAttribute("itemprop")) break;
            return instance;
          case "link":
            name = instance.getAttribute("rel");
            if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
              break;
            else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
              break;
            return instance;
          case "style":
            if (instance.hasAttribute("data-precedence")) break;
            return instance;
          case "script":
            name = instance.getAttribute("src");
            if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
              break;
            return instance;
          default:
            return instance;
        }
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) break;
    }
    return null;
  }
  function canHydrateTextInstance(instance, text, inRootOrSingleton) {
    if ("" === text) return null;
    for (; 3 !== instance.nodeType; ) {
      if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
        return null;
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) return null;
    }
    return instance;
  }
  function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
    for (; 8 !== instance.nodeType; ) {
      if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
        return null;
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) return null;
    }
    return instance;
  }
  function isSuspenseInstancePending(instance) {
    return "$?" === instance.data || "$~" === instance.data;
  }
  function isSuspenseInstanceFallback(instance) {
    return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
  }
  function registerSuspenseInstanceRetry(instance, callback) {
    var ownerDocument = instance.ownerDocument;
    if ("$~" === instance.data) instance._reactRetry = callback;
    else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState)
      callback();
    else {
      var listener = function() {
        callback();
        ownerDocument.removeEventListener("DOMContentLoaded", listener);
      };
      ownerDocument.addEventListener("DOMContentLoaded", listener);
      instance._reactRetry = listener;
    }
  }
  function getNextHydratable(node) {
    for (; null != node; node = node.nextSibling) {
      var nodeType = node.nodeType;
      if (1 === nodeType || 3 === nodeType) break;
      if (8 === nodeType) {
        nodeType = node.data;
        if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType)
          break;
        if ("/$" === nodeType || "/&" === nodeType) return null;
      }
    }
    return node;
  }
  var previousHydratableOnEnteringScopedSingleton = null;
  function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
    hydrationInstance = hydrationInstance.nextSibling;
    for (var depth = 0; hydrationInstance; ) {
      if (8 === hydrationInstance.nodeType) {
        var data = hydrationInstance.data;
        if ("/$" === data || "/&" === data) {
          if (0 === depth)
            return getNextHydratable(hydrationInstance.nextSibling);
          depth--;
        } else
          "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
      }
      hydrationInstance = hydrationInstance.nextSibling;
    }
    return null;
  }
  function getParentHydrationBoundary(targetInstance) {
    targetInstance = targetInstance.previousSibling;
    for (var depth = 0; targetInstance; ) {
      if (8 === targetInstance.nodeType) {
        var data = targetInstance.data;
        if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
          if (0 === depth) return targetInstance;
          depth--;
        } else "/$" !== data && "/&" !== data || depth++;
      }
      targetInstance = targetInstance.previousSibling;
    }
    return null;
  }
  function setFocusIfFocusable(node, focusOptions) {
    function handleFocus() {
      didFocus = true;
    }
    if (node.ownerDocument.activeElement === node) return true;
    var didFocus = false;
    try {
      node.ownerDocument.addEventListener("focus", handleFocus, true), (node.focus || HTMLElement.prototype.focus).call(node, focusOptions);
    } finally {
      node.ownerDocument.removeEventListener("focus", handleFocus, true);
    }
    return didFocus;
  }
  function requestPostPaintCallback(callback) {
    localRequestAnimationFrame(function() {
      localRequestAnimationFrame(function(time) {
        return callback(time);
      });
    });
  }
  function resolveSingletonInstance(type, props, rootContainerInstance) {
    props = getOwnerDocumentFromRootContainer(rootContainerInstance);
    switch (type) {
      case "html":
        type = props.documentElement;
        if (!type) throw Error(formatProdErrorMessage(452));
        return type;
      case "head":
        type = props.head;
        if (!type) throw Error(formatProdErrorMessage(453));
        return type;
      case "body":
        type = props.body;
        if (!type) throw Error(formatProdErrorMessage(454));
        return type;
      default:
        throw Error(formatProdErrorMessage(451));
    }
  }
  function releaseSingletonInstance(instance, type, props) {
    for (var propKey in props) {
      var propValue = props[propKey];
      props.hasOwnProperty(propKey) && null != propValue && setProp(instance, type, propKey, null, emptyProps, propValue);
    }
    null != props.dangerouslySetInnerHTML && (instance.textContent = "");
    instance.onclick === noop$1 && (instance.onclick = null);
    detachDeletedInstance(instance);
  }
  function clearSingletonPreambleContribution(instance) {
    for (var attributes = instance.attributes; attributes.length; )
      instance.removeAttributeNode(attributes[0]);
    detachDeletedInstance(instance);
  }
  var preloadPropsMap = /* @__PURE__ */ new Map(), preconnectsSet = /* @__PURE__ */ new Set();
  function getHoistableRoot(container) {
    if ("function" === typeof container.getRootNode) {
      var rootNode = container.getRootNode();
      if (9 === rootNode.nodeType || 11 === rootNode.nodeType) return rootNode;
    }
    return 9 === container.nodeType ? container : container.ownerDocument;
  }
  var previousDispatcher = ReactDOMSharedInternals.d;
  ReactDOMSharedInternals.d = {
    f: flushSyncWork,
    r: requestFormReset,
    D: prefetchDNS,
    C: preconnect,
    L: preload,
    m: preloadModule,
    X: preinitScript,
    S: preinitStyle,
    M: preinitModuleScript
  };
  function flushSyncWork() {
    var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
    return previousWasRendering || wasRendering;
  }
  function requestFormReset(form) {
    var formInst = getInstanceFromNode(form);
    null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
  }
  var globalDocument = "undefined" === typeof document ? null : document;
  function preconnectAs(rel, href, crossOrigin) {
    var ownerDocument = globalDocument;
    if (ownerDocument && "string" === typeof href && href) {
      var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
      limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
      "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
      preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
    }
  }
  function prefetchDNS(href) {
    previousDispatcher.D(href);
    preconnectAs("dns-prefetch", href, null);
  }
  function preconnect(href, crossOrigin) {
    previousDispatcher.C(href, crossOrigin);
    preconnectAs("preconnect", href, crossOrigin);
  }
  function preload(href, as, options2) {
    previousDispatcher.L(href, as, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href && as) {
      var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
      "image" === as ? options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
        options2.imageSrcSet
      ) + '"]', "string" === typeof options2.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
        options2.imageSizes
      ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
      var key = preloadSelector;
      switch (as) {
        case "style":
          key = getStyleKey(href);
          break;
        case "script":
          key = getScriptKey(href);
      }
      if (!(preloadPropsMap.has(key) || (href = assign(
        {
          rel: "preload",
          href: "image" === as && options2 && options2.imageSrcSet ? void 0 : href,
          as
        },
        options2
      ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key))))) {
        var instance = ownerDocument.createElement("link");
        setInitialProperties(instance, "link", href);
        "style" === as && (instance[internalLoadPendingKey] = true, instance.onload = instance.onerror = function() {
          clearPendingLoadOnNode(instance);
        });
        markNodeAsHoistable(instance);
        ownerDocument.head.appendChild(instance);
      }
    }
  }
  function preloadModule(href, options2) {
    previousDispatcher.m(href, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href) {
      var as = options2 && "string" === typeof options2.as ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
      switch (as) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          key = getScriptKey(href);
      }
      if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
        switch (as) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
              return;
        }
        as = ownerDocument.createElement("link");
        setInitialProperties(as, "link", href);
        markNodeAsHoistable(as);
        ownerDocument.head.appendChild(as);
      }
    }
  }
  function preinitStyle(href, precedence, options2) {
    previousDispatcher.S(href, precedence, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href) {
      var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
      precedence = precedence || "default";
      var resource = styles.get(key);
      if (!resource) {
        var state = { loading: 0, preload: null };
        if (resource = ownerDocument.querySelector(
          getStylesheetSelectorFromKey(key)
        ))
          state.loading = 5;
        else {
          href = assign(
            { rel: "stylesheet", href, "data-precedence": precedence },
            options2
          );
          (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
          var link = resource = ownerDocument.createElement("link");
          markNodeAsHoistable(link);
          setInitialProperties(link, "link", href);
          link._p = new Promise(function(resolve, reject) {
            link.onload = resolve;
            link.onerror = reject;
          });
          link.addEventListener("load", function() {
            state.loading |= 1;
          });
          link.addEventListener("error", function() {
            state.loading |= 2;
          });
          state.loading |= 4;
          insertStylesheet(resource, precedence, ownerDocument);
        }
        resource = {
          type: "stylesheet",
          instance: resource,
          count: 1,
          state
        };
        styles.set(key, resource);
      }
    }
  }
  function preinitScript(src, options2) {
    previousDispatcher.X(src, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && src) {
      var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
      resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
        type: "script",
        instance: resource,
        count: 1,
        state: null
      }, scripts.set(key, resource));
    }
  }
  function preinitModuleScript(src, options2) {
    previousDispatcher.M(src, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && src) {
      var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
      resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
        type: "script",
        instance: resource,
        count: 1,
        state: null
      }, scripts.set(key, resource));
    }
  }
  function getResource(type, currentProps, pendingProps, currentResource) {
    var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
    if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
    switch (type) {
      case "meta":
      case "title":
        return null;
      case "style":
        return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (pendingProps = getStyleKey(pendingProps.href), currentProps = getResourcesFromRoot(
          JSCompiler_inline_result
        ).hoistableStyles, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
          type = getStyleKey(pendingProps.href);
          var styles$268 = getResourcesFromRoot(
            JSCompiler_inline_result
          ).hoistableStyles, resource$269 = styles$268.get(type);
          resource$269 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$269 = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, styles$268.set(type, resource$269), (styles$268 = JSCompiler_inline_result.querySelector(
            getStylesheetSelectorFromKey(type)
          )) ? styles$268._p || (resource$269.instance = styles$268, resource$269.state.loading = 5) : (styles$268 = preloadPropsMap.get(type), styles$268 || (styles$268 = {
            rel: "preload",
            as: "style",
            href: pendingProps.href,
            crossOrigin: pendingProps.crossOrigin,
            integrity: pendingProps.integrity,
            media: pendingProps.media,
            hrefLang: pendingProps.hrefLang,
            referrerPolicy: pendingProps.referrerPolicy
          }, preloadPropsMap.set(type, styles$268)), preloadStylesheet(
            JSCompiler_inline_result,
            type,
            styles$268,
            resource$269.state
          )));
          if (currentProps && null === currentResource)
            throw Error(formatProdErrorMessage(528, ""));
          return resource$269;
        }
        if (currentProps && null !== currentResource)
          throw Error(formatProdErrorMessage(529, ""));
        return null;
      case "script":
        return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (pendingProps = getScriptKey(pendingProps), currentProps = getResourcesFromRoot(
          JSCompiler_inline_result
        ).hoistableScripts, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(formatProdErrorMessage(444, type));
    }
  }
  function getStyleKey(href) {
    return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
  }
  function getStylesheetSelectorFromKey(key) {
    return 'link[rel="stylesheet"][' + key + "]";
  }
  function stylesheetPropsFromRawProps(rawProps) {
    return assign({}, rawProps, {
      "data-precedence": rawProps.precedence,
      precedence: null
    });
  }
  function preloadStylesheet(ownerDocument, key, preloadProps, state) {
    if (key = ownerDocument.querySelector(
      'link[rel="preload"][as="style"][' + key + "]"
    )) {
      if (true !== key[internalLoadPendingKey]) {
        state.loading = 1;
        return;
      }
    } else
      key = ownerDocument.createElement("link"), key[internalLoadPendingKey] = true, key.onload = key.onerror = clearPendingLoadOnNode.bind(null, key), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key);
    state.preload = key;
    key.addEventListener("load", function() {
      return state.loading |= 1;
    });
    key.addEventListener("error", function() {
      return state.loading |= 2;
    });
  }
  function getScriptKey(src) {
    return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
  }
  function getScriptSelectorFromKey(key) {
    return "script[async]" + key;
  }
  function acquireResource(hoistableRoot, resource, props) {
    resource.count++;
    if (null === resource.instance)
      switch (resource.type) {
        case "style":
          var instance = hoistableRoot.querySelector(
            'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
          );
          if (instance)
            return resource.instance = instance, markNodeAsHoistable(instance), instance;
          var styleProps = assign({}, props, {
            "data-href": props.href,
            "data-precedence": props.precedence,
            href: null,
            precedence: null
          });
          instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
            "style"
          );
          markNodeAsHoistable(instance);
          setInitialProperties(instance, "style", styleProps);
          insertStylesheet(instance, props.precedence, hoistableRoot);
          return resource.instance = instance;
        case "stylesheet":
          styleProps = getStyleKey(props.href);
          var instance$274 = hoistableRoot.querySelector(
            getStylesheetSelectorFromKey(styleProps)
          );
          if (instance$274)
            return resource.state.loading |= 4, resource.instance = instance$274, markNodeAsHoistable(instance$274), instance$274;
          instance = stylesheetPropsFromRawProps(props);
          (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
          instance$274 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
          markNodeAsHoistable(instance$274);
          var linkInstance = instance$274;
          linkInstance._p = new Promise(function(resolve, reject) {
            linkInstance.onload = resolve;
            linkInstance.onerror = reject;
          });
          setInitialProperties(instance$274, "link", instance);
          resource.state.loading |= 4;
          insertStylesheet(instance$274, props.precedence, hoistableRoot);
          return resource.instance = instance$274;
        case "script":
          instance$274 = getScriptKey(props.src);
          if (styleProps = hoistableRoot.querySelector(
            getScriptSelectorFromKey(instance$274)
          ))
            return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
          instance = props;
          if (styleProps = preloadPropsMap.get(instance$274))
            instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
          hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
          styleProps = hoistableRoot.createElement("script");
          markNodeAsHoistable(styleProps);
          setInitialProperties(styleProps, "link", instance);
          hoistableRoot.head.appendChild(styleProps);
          return resource.instance = styleProps;
        case "void":
          return null;
        default:
          throw Error(formatProdErrorMessage(443, resource.type));
      }
    else
      "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
    return resource.instance;
  }
  function insertStylesheet(instance, precedence, root2) {
    for (var nodes = root2.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.dataset.precedence === precedence) prior = node;
      else if (prior !== last) break;
    }
    prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root2.nodeType ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
  }
  function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
    null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
    null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
    null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
  }
  function adoptPreloadPropsForScript(scriptProps, preloadProps) {
    null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
    null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
    null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
  }
  var tagCaches = null;
  function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
    if (null === tagCaches) {
      var cache = /* @__PURE__ */ new Map();
      var caches = tagCaches = /* @__PURE__ */ new Map();
      caches.set(ownerDocument, cache);
    } else
      caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
    if (cache.has(type)) return cache;
    cache.set(type, null);
    ownerDocument = ownerDocument.getElementsByTagName(type);
    for (caches = 0; caches < ownerDocument.length; caches++) {
      var node = ownerDocument[caches];
      if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
        var nodeKey = node.getAttribute(keyAttribute) || "";
        nodeKey = type + nodeKey;
        var existing = cache.get(nodeKey);
        existing ? existing.push(node) : cache.set(nodeKey, [node]);
      }
    }
    return cache;
  }
  function mountHoistable(hoistableRoot, type, instance) {
    hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
    hoistableRoot.head.insertBefore(
      instance,
      "title" === type ? hoistableRoot.querySelector("head > title") : null
    );
  }
  function isHostHoistableType(type, props, hostContext) {
    if (1 === hostContext || null != props.itemProp) return false;
    switch (type) {
      case "meta":
      case "title":
        return true;
      case "style":
        if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href)
          break;
        return true;
      case "link":
        if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError)
          break;
        switch (props.rel) {
          case "stylesheet":
            return type = props.disabled, "string" === typeof props.precedence && null == type;
          default:
            return true;
        }
      case "script":
        if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src)
          return true;
    }
    return false;
  }
  function maySuspendCommit(type, props) {
    return "img" === type && null != props.src && "" !== props.src && null == props.onLoad && "lazy" !== props.loading;
  }
  function preloadResource(resource) {
    return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? false : true;
  }
  function estimateImageBytes(instance) {
    return (instance.width || 100) * (instance.height || 100) * ("number" === typeof devicePixelRatio ? devicePixelRatio : 1) * 0.25;
  }
  function suspendInstance(state, instance) {
    "function" === typeof instance.decode && (state.imgCount++, instance.complete || (state.imgBytes += estimateImageBytes(instance), state.suspenseyImages.push(instance)), state = onUnsuspendImg.bind(state), instance.decode().then(state, state));
  }
  function suspendResource(state, hoistableRoot, resource, props) {
    if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
      if (null === resource.instance) {
        var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
          getStylesheetSelectorFromKey(key)
        );
        if (instance) {
          hoistableRoot = instance._p;
          null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
          resource.state.loading |= 4;
          resource.instance = instance;
          markNodeAsHoistable(instance);
          return;
        }
        instance = hoistableRoot.ownerDocument || hoistableRoot;
        props = stylesheetPropsFromRawProps(props);
        (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
        instance = instance.createElement("link");
        markNodeAsHoistable(instance);
        var linkInstance = instance;
        linkInstance._p = new Promise(function(resolve, reject) {
          linkInstance.onload = resolve;
          linkInstance.onerror = reject;
        });
        setInitialProperties(instance, "link", props);
        resource.instance = instance;
      }
      null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
      state.stylesheets.set(resource, hoistableRoot);
      (hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
    }
  }
  var estimatedBytesWithinLimit = 0;
  function waitForCommitToBeReady(state, timeoutOffset) {
    state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
    return 0 < state.count || 0 < state.imgCount ? function(commit) {
      var stylesheetTimer = setTimeout(function() {
        state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
        if (state.unsuspend) {
          var unsuspend = state.unsuspend;
          state.unsuspend = null;
          unsuspend();
        }
      }, 6e4 + timeoutOffset);
      0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
      var imgTimer = setTimeout(
        function() {
          state.waitingForImages = false;
          if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
            var unsuspend = state.unsuspend;
            state.unsuspend = null;
            unsuspend();
          }
        },
        (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset
      );
      state.unsuspend = commit;
      return function() {
        state.unsuspend = null;
        clearTimeout(stylesheetTimer);
        clearTimeout(imgTimer);
      };
    } : null;
  }
  function checkIfFullyUnsuspended(state) {
    if (0 === state.count && (0 === state.imgCount || !state.waitingForImages)) {
      if (state.stylesheets) insertSuspendedStylesheets(state, state.stylesheets);
      else if (state.unsuspend) {
        var unsuspend = state.unsuspend;
        state.unsuspend = null;
        unsuspend();
      }
    }
  }
  function onUnsuspend() {
    this.count--;
    checkIfFullyUnsuspended(this);
  }
  function onUnsuspendImg() {
    this.imgCount--;
    checkIfFullyUnsuspended(this);
  }
  var precedencesByRoot = null;
  function insertSuspendedStylesheets(state, resources) {
    state.stylesheets = null;
    null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
  }
  function insertStylesheetIntoRoot(root2, resource) {
    if (!(resource.state.loading & 4)) {
      var precedences = precedencesByRoot.get(root2);
      if (precedences) var last = precedences.get(null);
      else {
        precedences = /* @__PURE__ */ new Map();
        precedencesByRoot.set(root2, precedences);
        for (var nodes = root2.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
            precedences.set(node.dataset.precedence, node), last = node;
        }
        last && precedences.set(null, last);
      }
      nodes = resource.instance;
      node = nodes.getAttribute("data-precedence");
      i = precedences.get(node) || last;
      i === last && precedences.set(null, nodes);
      precedences.set(node, nodes);
      this.count++;
      last = onUnsuspend.bind(this);
      nodes.addEventListener("load", last);
      nodes.addEventListener("error", last);
      i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = 9 === root2.nodeType ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
      resource.state.loading |= 4;
    }
  }
  var HostTransitionContext = {
    $$typeof: REACT_CONTEXT_TYPE,
    Provider: null,
    Consumer: null,
    _currentValue: sharedNotPendingObject,
    _currentValue2: sharedNotPendingObject,
    _threadCount: 0
  };
  function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
    this.tag = 1;
    this.containerInfo = containerInfo;
    this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
    this.callbackPriority = 0;
    this.expirationTimes = createLaneMap(-1);
    this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = createLaneMap(0);
    this.hiddenUpdates = createLaneMap(null);
    this.identifierPrefix = identifierPrefix;
    this.onUncaughtError = onUncaughtError;
    this.onCaughtError = onCaughtError;
    this.onRecoverableError = onRecoverableError;
    this.pooledCache = null;
    this.pooledCacheLanes = 0;
    this.formState = formState;
    this.transitionTypes = null;
    this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
    containerInfo = new FiberRootNode(
      containerInfo,
      tag,
      hydrate,
      identifierPrefix,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      onDefaultTransitionIndicator,
      formState
    );
    tag = 1;
    true === isStrictMode && (tag |= 24);
    isStrictMode = createFiberImplClass(3, null, null, tag);
    containerInfo.current = isStrictMode;
    isStrictMode.stateNode = containerInfo;
    tag = createCache();
    tag.refCount++;
    containerInfo.pooledCache = tag;
    tag.refCount++;
    isStrictMode.memoizedState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: tag
    };
    initializeUpdateQueue(isStrictMode);
    return containerInfo;
  }
  function getContextForSubtree(parentComponent) {
    if (!parentComponent) return emptyContextObject;
    parentComponent = emptyContextObject;
    return parentComponent;
  }
  function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
    parentComponent = getContextForSubtree(parentComponent);
    null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
    container = createUpdate(lane);
    container.payload = { element };
    callback = void 0 === callback ? null : callback;
    null !== callback && (container.callback = callback);
    element = enqueueUpdate(rootFiber, container, lane);
    null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
  }
  function markRetryLaneImpl(fiber, retryLane) {
    fiber = fiber.memoizedState;
    if (null !== fiber && null !== fiber.dehydrated) {
      var a = fiber.retryLane;
      fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
    }
  }
  function markRetryLaneIfNotHydrated(fiber, retryLane) {
    markRetryLaneImpl(fiber, retryLane);
    (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
  }
  function attemptContinuousHydration(fiber) {
    if (13 === fiber.tag || 31 === fiber.tag) {
      var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
      null !== root2 && scheduleUpdateOnFiber(root2, fiber, 67108864);
      markRetryLaneIfNotHydrated(fiber, 67108864);
    }
  }
  function attemptHydrationAtCurrentPriority(fiber) {
    if (13 === fiber.tag || 31 === fiber.tag) {
      var lane = requestUpdateLane();
      lane = getBumpedLaneForHydrationByLane(lane);
      var root2 = enqueueConcurrentRenderForLane(fiber, lane);
      null !== root2 && scheduleUpdateOnFiber(root2, fiber, lane);
      markRetryLaneIfNotHydrated(fiber, lane);
    }
  }
  var _enabled = true;
  function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
    var prevTransition = ReactSharedInternals.T;
    ReactSharedInternals.T = null;
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
    }
  }
  function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
    var prevTransition = ReactSharedInternals.T;
    ReactSharedInternals.T = null;
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
    }
  }
  function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    if (_enabled) {
      var blockedOn = findInstanceBlockingEvent(nativeEvent);
      if (null === blockedOn)
        dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          return_targetInst,
          targetContainer
        ), clearIfContinuousEvent(domEventName, nativeEvent);
      else if (queueIfContinuousEvent(
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      ))
        nativeEvent.stopPropagation();
      else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
        for (; null !== blockedOn; ) {
          var fiber = getInstanceFromNode(blockedOn);
          if (null !== fiber)
            switch (fiber.tag) {
              case 3:
                fiber = fiber.stateNode;
                if (fiber.current.memoizedState.isDehydrated) {
                  var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                  if (0 !== lanes) {
                    var root2 = fiber;
                    root2.pendingLanes |= 2;
                    for (root2.entangledLanes |= 2; lanes; ) {
                      var lane = 1 << 31 - clz32(lanes);
                      root2.entanglements[1] |= lane;
                      lanes &= ~lane;
                    }
                    ensureRootIsScheduled(fiber);
                    0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now2() + 500, flushSyncWorkAcrossRoots_impl(0));
                  }
                }
                break;
              case 31:
              case 13:
                root2 = enqueueConcurrentRenderForLane(fiber, 2), null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
            }
          fiber = findInstanceBlockingEvent(nativeEvent);
          null === fiber && dispatchEventForPluginEventSystem(
            domEventName,
            eventSystemFlags,
            nativeEvent,
            return_targetInst,
            targetContainer
          );
          if (fiber === blockedOn) break;
          blockedOn = fiber;
        }
        null !== blockedOn && nativeEvent.stopPropagation();
      } else
        dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          null,
          targetContainer
        );
    }
  }
  function findInstanceBlockingEvent(nativeEvent) {
    nativeEvent = getEventTarget(nativeEvent);
    return findInstanceBlockingTarget(nativeEvent);
  }
  var return_targetInst = null;
  function findInstanceBlockingTarget(targetNode) {
    return_targetInst = null;
    targetNode = getClosestInstanceFromNode(targetNode);
    if (null !== targetNode) {
      var nearestMounted = getNearestMountedFiber(targetNode);
      if (null === nearestMounted) targetNode = null;
      else {
        var tag = nearestMounted.tag;
        if (13 === tag) {
          targetNode = getSuspenseInstanceFromFiber(nearestMounted);
          if (null !== targetNode) return targetNode;
          targetNode = null;
        } else if (31 === tag) {
          targetNode = getActivityInstanceFromFiber(nearestMounted);
          if (null !== targetNode) return targetNode;
          targetNode = null;
        } else if (3 === tag) {
          if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
            return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
          targetNode = null;
        } else nearestMounted !== targetNode && (targetNode = null);
      }
    }
    return_targetInst = targetNode;
    return null;
  }
  function getEventPriority(domEventName) {
    switch (domEventName) {
      case "beforetoggle":
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
      case "seeked":
      case "submit":
      case "toggle":
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
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
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
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (getCurrentPriorityLevel()) {
          case ImmediatePriority:
            return 2;
          case UserBlockingPriority:
            return 8;
          case NormalPriority$1:
          case LowPriority:
            return 32;
          case IdlePriority:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hasScheduledReplayAttempt = false, queuedFocus = null, queuedDrag = null, queuedMouse = null, queuedPointers = /* @__PURE__ */ new Map(), queuedPointerCaptures = /* @__PURE__ */ new Map(), queuedExplicitHydrationTargets = [], discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function clearIfContinuousEvent(domEventName, nativeEvent) {
    switch (domEventName) {
      case "focusin":
      case "focusout":
        queuedFocus = null;
        break;
      case "dragenter":
      case "dragleave":
        queuedDrag = null;
        break;
      case "mouseover":
      case "mouseout":
        queuedMouse = null;
        break;
      case "pointerover":
      case "pointerout":
        queuedPointers.delete(nativeEvent.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        queuedPointerCaptures.delete(nativeEvent.pointerId);
    }
  }
  function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
      return existingQueuedEvent = {
        blockedOn,
        domEventName,
        eventSystemFlags,
        nativeEvent,
        targetContainers: [targetContainer]
      }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
    existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
    blockedOn = existingQueuedEvent.targetContainers;
    null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
    return existingQueuedEvent;
  }
  function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    switch (domEventName) {
      case "focusin":
        return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedFocus,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "dragenter":
        return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedDrag,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "mouseover":
        return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedMouse,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "pointerover":
        var pointerId = nativeEvent.pointerId;
        queuedPointers.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointers.get(pointerId) || null,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          )
        );
        return true;
      case "gotpointercapture":
        return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointerCaptures.get(pointerId) || null,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          )
        ), true;
    }
    return false;
  }
  function attemptExplicitHydrationTarget(queuedTarget) {
    var targetInst = getClosestInstanceFromNode(queuedTarget.target);
    if (null !== targetInst) {
      var nearestMounted = getNearestMountedFiber(targetInst);
      if (null !== nearestMounted) {
        if (targetInst = nearestMounted.tag, 13 === targetInst) {
          if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
            queuedTarget.blockedOn = targetInst;
            runWithPriority(queuedTarget.priority, function() {
              attemptHydrationAtCurrentPriority(nearestMounted);
            });
            return;
          }
        } else if (31 === targetInst) {
          if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
            queuedTarget.blockedOn = targetInst;
            runWithPriority(queuedTarget.priority, function() {
              attemptHydrationAtCurrentPriority(nearestMounted);
            });
            return;
          }
        } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
          queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
          return;
        }
      }
    }
    queuedTarget.blockedOn = null;
  }
  function attemptReplayContinuousQueuedEvent(queuedEvent) {
    if (null !== queuedEvent.blockedOn) return false;
    for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
      var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
      if (null === nextBlockedOn) {
        nextBlockedOn = queuedEvent.nativeEvent;
        var nativeEventClone = new nextBlockedOn.constructor(
          nextBlockedOn.type,
          nextBlockedOn
        );
        currentReplayingEvent = nativeEventClone;
        nextBlockedOn.target.dispatchEvent(nativeEventClone);
        currentReplayingEvent = null;
      } else
        return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
      targetContainers.shift();
    }
    return true;
  }
  function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
    attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
  }
  function replayUnblockedEvents() {
    hasScheduledReplayAttempt = false;
    null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
    null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
    null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
    queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
    queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
  }
  function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
    queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
      Scheduler.unstable_NormalPriority,
      replayUnblockedEvents
    )));
  }
  var lastScheduledReplayQueue = null;
  function scheduleReplayQueueIfNeeded(formReplayingQueue) {
    lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
      Scheduler.unstable_NormalPriority,
      function() {
        lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
        for (var i = 0; i < formReplayingQueue.length; i += 3) {
          var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
          if ("function" !== typeof submitterOrAction)
            if (null === findInstanceBlockingTarget(submitterOrAction || form))
              continue;
            else break;
          var formInst = getInstanceFromNode(form);
          null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(
            formInst,
            {
              pending: true,
              data: formData,
              method: form.method,
              action: submitterOrAction
            },
            submitterOrAction,
            formData
          ));
        }
      }
    ));
  }
  function retryIfBlockedOn(unblocked) {
    function unblock(queuedEvent) {
      return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
    }
    null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
    null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
    null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
    queuedPointers.forEach(unblock);
    queuedPointerCaptures.forEach(unblock);
    for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
      var queuedTarget = queuedExplicitHydrationTargets[i];
      queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
    }
    for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn); )
      attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
    i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
    if (null != i)
      for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
        var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
        if ("function" === typeof submitterOrAction)
          formProps || scheduleReplayQueueIfNeeded(i);
        else if (formProps) {
          var action = null;
          if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
            if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
              action = formProps.formAction;
            else {
              if (null !== findInstanceBlockingTarget(form)) continue;
            }
          else action = formProps.action;
          "function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
          scheduleReplayQueueIfNeeded(i);
        }
      }
  }
  function defaultOnDefaultTransitionIndicator() {
    function handleNavigate(event) {
      event.canIntercept && "react-transition" === event.info && event.intercept({
        handler: function() {
          return new Promise(function(resolve) {
            return pendingResolve = resolve;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function handleNavigateComplete() {
      null !== pendingResolve && (pendingResolve(), pendingResolve = null);
      isCancelled || setTimeout(startFakeNavigation, 20);
    }
    function startFakeNavigation() {
      if (!isCancelled && !navigation.transition) {
        var currentEntry = navigation.currentEntry;
        currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
          state: currentEntry.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if ("object" === typeof navigation) {
      var isCancelled = false, pendingResolve = null;
      navigation.addEventListener("navigate", handleNavigate);
      navigation.addEventListener("navigatesuccess", handleNavigateComplete);
      navigation.addEventListener("navigateerror", handleNavigateComplete);
      setTimeout(startFakeNavigation, 100);
      return function() {
        isCancelled = true;
        navigation.removeEventListener("navigate", handleNavigate);
        navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
        navigation.removeEventListener("navigateerror", handleNavigateComplete);
        null !== pendingResolve && (pendingResolve(), pendingResolve = null);
      };
    }
  }
  function ReactDOMRoot(internalRoot) {
    this._internalRoot = internalRoot;
  }
  ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
    var root2 = this._internalRoot;
    if (null === root2) throw Error(formatProdErrorMessage(409));
    var current = root2.current, lane = requestUpdateLane();
    updateContainerImpl(current, lane, children, root2, null, null);
  };
  ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
    var root2 = this._internalRoot;
    if (null !== root2) {
      this._internalRoot = null;
      var container = root2.containerInfo;
      updateContainerImpl(root2.current, 2, null, root2, null, null);
      flushSyncWork$1();
      container[internalContainerInstanceKey] = null;
    }
  };
  function ReactDOMHydrationRoot(internalRoot) {
    this._internalRoot = internalRoot;
  }
  ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
    if (target) {
      var updatePriority = resolveUpdatePriority();
      target = { blockedOn: null, target, priority: updatePriority };
      for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++) ;
      queuedExplicitHydrationTargets.splice(i, 0, target);
      0 === i && attemptExplicitHydrationTarget(target);
    }
  };
  var isomorphicReactPackageVersion$jscomp$inline_2043 = React2.version;
  if ("19.3.1" !== isomorphicReactPackageVersion$jscomp$inline_2043)
    throw Error(
      formatProdErrorMessage(
        527,
        isomorphicReactPackageVersion$jscomp$inline_2043,
        "19.3.1"
      )
    );
  ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
    var fiber = componentOrElement._reactInternals;
    if (void 0 === fiber) {
      if ("function" === typeof componentOrElement.render)
        throw Error(formatProdErrorMessage(188));
      componentOrElement = Object.keys(componentOrElement).join(",");
      throw Error(formatProdErrorMessage(268, componentOrElement));
    }
    componentOrElement = findCurrentFiberUsingSlowPath(fiber);
    componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
    componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
    return componentOrElement;
  };
  var internals$jscomp$inline_2586 = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: ReactSharedInternals,
    reconcilerVersion: "19.3.1"
  };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var hook$jscomp$inline_2587 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hook$jscomp$inline_2587.isDisabled && hook$jscomp$inline_2587.supportsFiber)
      try {
        rendererID = hook$jscomp$inline_2587.inject(
          internals$jscomp$inline_2586
        ), injectedHook = hook$jscomp$inline_2587;
      } catch (err) {
      }
  }
  reactDomClient_production.createRoot = function(container, options2) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
    var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
    null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError));
    options2 = createFiberRoot(
      container,
      1,
      false,
      null,
      null,
      isStrictMode,
      identifierPrefix,
      null,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      defaultOnDefaultTransitionIndicator
    );
    container[internalContainerInstanceKey] = options2.current;
    listenToAllSupportedEvents(container);
    return new ReactDOMRoot(options2);
  };
  reactDomClient_production.hydrateRoot = function(container, initialChildren, options2) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
    var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
    null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.formState && (formState = options2.formState));
    initialChildren = createFiberRoot(
      container,
      1,
      true,
      initialChildren,
      null != options2 ? options2 : null,
      isStrictMode,
      identifierPrefix,
      formState,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      defaultOnDefaultTransitionIndicator
    );
    initialChildren.context = getContextForSubtree(null);
    options2 = initialChildren.current;
    isStrictMode = requestUpdateLane();
    isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
    identifierPrefix = createUpdate(isStrictMode);
    identifierPrefix.callback = null;
    enqueueUpdate(options2, identifierPrefix, isStrictMode);
    options2 = isStrictMode;
    initialChildren.current.lanes = options2;
    markRootUpdated$1(initialChildren, options2);
    ensureRootIsScheduled(initialChildren);
    container[internalContainerInstanceKey] = initialChildren.current;
    listenToAllSupportedEvents(container);
    return new ReactDOMHydrationRoot(initialChildren);
  };
  reactDomClient_production.version = "19.3.1";
  return reactDomClient_production;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client.exports;
  hasRequiredClient = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    client.exports = requireReactDomClient_production();
  }
  return client.exports;
}
var clientExports = requireClient();
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(clientExports);
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};
const ArrowRight = createLucideIcon("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
const ArrowUpRight = createLucideIcon("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
const Boxes = createLucideIcon("Boxes", [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
]);
const CalendarDays = createLucideIcon("CalendarDays", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
]);
const Cat = createLucideIcon("Cat", [
  [
    "path",
    {
      d: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",
      key: "x6xyqk"
    }
  ],
  ["path", { d: "M8 14v.5", key: "1nzgdb" }],
  ["path", { d: "M16 14v.5", key: "1lajdz" }],
  ["path", { d: "M11.25 16.25h1.5L12 17l-.75-.75Z", key: "12kq1m" }]
]);
const ChartColumn = createLucideIcon("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
const Check = createLucideIcon("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
const ChevronDown = createLucideIcon("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const ChevronRight = createLucideIcon("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
const ChevronsUpDown = createLucideIcon("ChevronsUpDown", [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
]);
const CircleCheck = createLucideIcon("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
const CircleX = createLucideIcon("CircleX", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
const Clock3 = createLucideIcon("Clock3", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }]
]);
const CloudDownload = createLucideIcon("CloudDownload", [
  ["path", { d: "M12 13v8l-4-4", key: "1f5nwf" }],
  ["path", { d: "m12 21 4-4", key: "1lfcce" }],
  ["path", { d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284", key: "ui1hmy" }]
]);
const CloudUpload = createLucideIcon("CloudUpload", [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
]);
const Cloud = createLucideIcon("Cloud", [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
]);
const Coffee = createLucideIcon("Coffee", [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
]);
const Compass = createLucideIcon("Compass", [
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
const Copy = createLucideIcon("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
const Cpu = createLucideIcon("Cpu", [
  ["rect", { width: "16", height: "16", x: "4", y: "4", rx: "2", key: "14l7u7" }],
  ["rect", { width: "6", height: "6", x: "9", y: "9", rx: "1", key: "5aljv4" }],
  ["path", { d: "M15 2v2", key: "13l42r" }],
  ["path", { d: "M15 20v2", key: "15mkzm" }],
  ["path", { d: "M2 15h2", key: "1gxd5l" }],
  ["path", { d: "M2 9h2", key: "1bbxkp" }],
  ["path", { d: "M20 15h2", key: "19e6y8" }],
  ["path", { d: "M20 9h2", key: "19tzq7" }],
  ["path", { d: "M9 2v2", key: "165o2o" }],
  ["path", { d: "M9 20v2", key: "i2bqo8" }]
]);
const Database = createLucideIcon("Database", [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
]);
const Download = createLucideIcon("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
const Earth = createLucideIcon("Earth", [
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54", key: "1djwo0" }],
  [
    "path",
    {
      d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
      key: "1tzkfa"
    }
  ],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05", key: "14pb5j" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
const ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
const EyeOff = createLucideIcon("EyeOff", [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
]);
const Eye = createLucideIcon("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
const FileArchive = createLucideIcon("FileArchive", [
  ["path", { d: "M10 12v-1", key: "v7bkov" }],
  ["path", { d: "M10 18v-2", key: "1cjy8d" }],
  ["path", { d: "M10 7V6", key: "dljcrl" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    { d: "M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01", key: "gkbcor" }
  ],
  ["circle", { cx: "10", cy: "20", r: "2", key: "1xzdoj" }]
]);
const FileWarning = createLucideIcon("FileWarning", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
const Flame = createLucideIcon("Flame", [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
]);
const Flower2 = createLucideIcon("Flower2", [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
      key: "3pnvol"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  ["path", { d: "M12 10v12", key: "6ubwww" }],
  ["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z", key: "9hd38g" }],
  ["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z", key: "ufn41s" }]
]);
const FolderOpen = createLucideIcon("FolderOpen", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
]);
const Gauge = createLucideIcon("Gauge", [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
]);
const Github = createLucideIcon("Github", [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "tonef"
    }
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }]
]);
const HardDriveDownload = createLucideIcon("HardDriveDownload", [
  ["path", { d: "M12 2v8", key: "1q4o3n" }],
  ["path", { d: "m16 6-4 4-4-4", key: "6wukr" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 18h.01", key: "h775k" }]
]);
const HardDrive = createLucideIcon("HardDrive", [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
]);
const HeartPulse = createLucideIcon("HeartPulse", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ],
  ["path", { d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "1uw2ng" }]
]);
const House = createLucideIcon("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
]);
const ImagePlus = createLucideIcon("ImagePlus", [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
]);
const Info = createLucideIcon("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
const KeyRound = createLucideIcon("KeyRound", [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
]);
const Layers = createLucideIcon("Layers", [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
]);
const Leaf = createLucideIcon("Leaf", [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
]);
const ListChecks = createLucideIcon("ListChecks", [
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
]);
const LoaderCircle = createLucideIcon("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
const LogIn = createLucideIcon("LogIn", [
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
  ["polyline", { points: "10 17 15 12 10 7", key: "1ail0h" }],
  ["line", { x1: "15", x2: "3", y1: "12", y2: "12", key: "v6grx8" }]
]);
const Mail = createLucideIcon("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
const MapPin = createLucideIcon("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);
const Minus = createLucideIcon("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
const MonitorCog = createLucideIcon("MonitorCog", [
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "m15.2 4.9-.9-.4", key: "12wd2u" }],
  ["path", { d: "m15.2 7.1-.9.4", key: "1r2vl7" }],
  ["path", { d: "m16.9 3.2-.4-.9", key: "3zbo91" }],
  ["path", { d: "m16.9 8.8-.4.9", key: "1qr2dn" }],
  ["path", { d: "m19.5 2.3-.4.9", key: "1rjrkq" }],
  ["path", { d: "m19.5 9.7-.4-.9", key: "heryx5" }],
  ["path", { d: "m21.7 4.5-.9.4", key: "17fqt1" }],
  ["path", { d: "m21.7 7.5-.9-.4", key: "14zyni" }],
  ["path", { d: "M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7", key: "1tnzv8" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }]
]);
const Network = createLucideIcon("Network", [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
]);
const PackageCheck = createLucideIcon("PackageCheck", [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
]);
const PackageOpen = createLucideIcon("PackageOpen", [
  ["path", { d: "M12 22v-9", key: "x3hkom" }],
  [
    "path",
    {
      d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
      key: "2ntwy6"
    }
  ],
  [
    "path",
    {
      d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
      key: "1pmm1c"
    }
  ],
  [
    "path",
    {
      d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
      key: "12ttoo"
    }
  ]
]);
const PackageSearch = createLucideIcon("PackageSearch", [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
  ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }]
]);
const Palette = createLucideIcon("Palette", [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
]);
const PanelLeftClose = createLucideIcon("PanelLeftClose", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]
]);
const Play = createLucideIcon("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
const Plus = createLucideIcon("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
const Puzzle = createLucideIcon("Puzzle", [
  [
    "path",
    {
      d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
      key: "w46dr5"
    }
  ]
]);
const RadioTower = createLucideIcon("RadioTower", [
  ["path", { d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9", key: "s0qx1y" }],
  ["path", { d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5", key: "1idnkw" }],
  ["circle", { cx: "12", cy: "9", r: "2", key: "1092wv" }],
  ["path", { d: "M16.2 4.8c2 2 2.26 5.11.8 7.47", key: "ojru2q" }],
  ["path", { d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1", key: "rhi7fg" }],
  ["path", { d: "M9.5 18h5", key: "mfy3pd" }],
  ["path", { d: "m8 22 4-11 4 11", key: "25yftu" }]
]);
const RefreshCw = createLucideIcon("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
const Router = createLucideIcon("Router", [
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6.01 18H6", key: "19vcac" }],
  ["path", { d: "M10.01 18H10", key: "uamcmx" }],
  ["path", { d: "M15 10v4", key: "qjz1xs" }],
  ["path", { d: "M17.84 7.17a4 4 0 0 0-5.66 0", key: "1rif40" }],
  ["path", { d: "M20.66 4.34a8 8 0 0 0-11.31 0", key: "6a5xfq" }]
]);
const Save = createLucideIcon("Save", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
]);
const ScanLine = createLucideIcon("ScanLine", [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
]);
const Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const Server = createLucideIcon("Server", [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
]);
const Settings2 = createLucideIcon("Settings2", [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
]);
const ShieldCheck = createLucideIcon("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
const Shirt = createLucideIcon("Shirt", [
  [
    "path",
    {
      d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
      key: "1wgbhj"
    }
  ]
]);
const SlidersHorizontal = createLucideIcon("SlidersHorizontal", [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
]);
const Sparkles = createLucideIcon("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);
const Sprout = createLucideIcon("Sprout", [
  ["path", { d: "M7 20h10", key: "e6iznv" }],
  ["path", { d: "M10 20c5.5-2.5.8-6.4 3-10", key: "161w41" }],
  [
    "path",
    {
      d: "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",
      key: "9gtqwd"
    }
  ],
  [
    "path",
    {
      d: "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",
      key: "bkxnd2"
    }
  ]
]);
const Square = createLucideIcon("Square", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
]);
const Terminal = createLucideIcon("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]);
const Timer = createLucideIcon("Timer", [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
]);
const Trash2 = createLucideIcon("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
const TreePine = createLucideIcon("TreePine", [
  [
    "path",
    {
      d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
      key: "cpyugq"
    }
  ],
  ["path", { d: "M12 22v-3", key: "kmzjlo" }]
]);
const TrendingUp = createLucideIcon("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
const TriangleAlert = createLucideIcon("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
const Upload = createLucideIcon("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
]);
const UserRound = createLucideIcon("UserRound", [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
]);
const User = createLucideIcon("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
const Users = createLucideIcon("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
const Wifi = createLucideIcon("Wifi", [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
]);
const Wrench = createLucideIcon("Wrench", [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
]);
const X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    () => selector(api.getInitialState())
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = ((createState) => createState ? createImpl(createState) : createImpl);
const PAGE_KEY = "bamboo:page";
const ALLOWED_PAGES = [
  "home",
  "instances",
  "downloads",
  "mods",
  "modpacks",
  "multiplayer",
  "skins",
  "stats",
  "java",
  "crash",
  "settings"
];
function initialPage() {
  try {
    const saved = localStorage.getItem(PAGE_KEY);
    if (saved && ALLOWED_PAGES.includes(saved)) return saved;
  } catch {
  }
  return "home";
}
let toastCounter = 0;
let refreshTimer = null;
const useBamboo = create((set, get) => ({
  bootstrap: null,
  booting: true,
  bootError: null,
  page: initialPage(),
  jobs: {},
  jobOrder: [],
  toasts: [],
  launches: {},
  lanWorlds: [],
  accountModalOpen: false,
  commandOpen: false,
  updateInfo: null,
  updateChecking: false,
  updateNotified: false,
  checkForUpdates: async (force = false) => {
    if (get().updateChecking) return get().updateInfo;
    set({ updateChecking: true });
    try {
      const info = await window.bamboo.checkForUpdates(force);
      set({ updateInfo: info, updateChecking: false });
      if (info.available && !get().updateNotified) {
        set({ updateNotified: true });
        get().addToast({
          kind: "info",
          title: `发现新版本 v${info.latestVersion}`,
          message: info.notes?.split("\n")[0].slice(0, 90) || "前往设置检查并下载更新。",
          actionPage: "settings"
        });
      } else if (force) {
        get().addToast({
          kind: info.available ? "info" : "success",
          title: info.available ? `可更新至 v${info.latestVersion}` : "已是最新版本",
          message: info.available ? "设置页可以下载更新。" : `当前版本 v${info.currentVersion}。`,
          actionPage: "settings"
        });
      }
      return info;
    } catch (error) {
      set({ updateChecking: false });
      if (force) {
        get().addToast({ kind: "error", title: "检查更新失败", message: messageOf(error) });
      }
      return null;
    }
  },
  downloadUpdate: async () => {
    try {
      const job = await window.bamboo.downloadUpdate();
      return job;
    } catch (error) {
      get().addToast({ kind: "error", title: "无法下载更新", message: messageOf(error) });
      return null;
    }
  },
  boot: async () => {
    set({ booting: true, bootError: null });
    try {
      const bootstrap = await window.bamboo.bootstrap();
      const launches = {};
      for (const launch of bootstrap.running) launches[launch.instanceId] = launch;
      set({ bootstrap, booting: false, launches });
      const current = get().page;
      if (!isPageVisible(bootstrap, current)) set({ page: "home" });
      if (bootstrap.settings.autoCheckUpdate) {
        setTimeout(() => void get().checkForUpdates(false), 1200);
      }
    } catch (error) {
      set({
        booting: false,
        bootError: error instanceof Error ? error.message : String(error)
      });
    }
  },
  refresh: async () => {
    try {
      const bootstrap = await window.bamboo.bootstrap();
      const launches = { ...get().launches };
      for (const launch of bootstrap.running) launches[launch.instanceId] = launch;
      set({ bootstrap, launches });
      if (!isPageVisible(bootstrap, get().page)) set({ page: "home" });
    } catch (error) {
      get().addToast({
        kind: "error",
        title: "刷新失败",
        message: error instanceof Error ? error.message : String(error)
      });
    }
  },
  setPage: (page) => {
    const bootstrap = get().bootstrap;
    if (bootstrap && !isPageVisible(bootstrap, page)) return;
    try {
      localStorage.setItem(PAGE_KEY, page);
    } catch {
    }
    set({ page });
  },
  setActiveInstance: async (id) => {
    try {
      await window.bamboo.setActiveInstance(id);
      set(
        (state) => state.bootstrap ? { bootstrap: { ...state.bootstrap, activeInstanceId: id } } : {}
      );
    } catch (error) {
      get().addToast({ kind: "error", title: "切换实例失败", message: messageOf(error) });
    }
  },
  setActiveAccount: async (id) => {
    try {
      await window.bamboo.setActiveAccount(id);
      await get().refresh();
    } catch (error) {
      get().addToast({ kind: "error", title: "切换账户失败", message: messageOf(error) });
    }
  },
  updateSettings: async (patch) => {
    try {
      const settings = await window.bamboo.updateSettings(patch);
      set(
        (state) => state.bootstrap ? { bootstrap: { ...state.bootstrap, settings } } : {}
      );
      return settings;
    } catch (error) {
      get().addToast({ kind: "error", title: "保存设置失败", message: messageOf(error) });
      return null;
    }
  },
  addToast: (toast) => {
    const id = `toast_${Date.now().toString(36)}_${toastCounter++}`;
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id, createdAt: Date.now() }].slice(-5)
    }));
    setTimeout(() => get().dismissToast(id), toast.kind === "error" ? 7600 : 4800);
  },
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  setAccountModalOpen: (open) => set({ accountModalOpen: open }),
  setCommandOpen: (open) => set({ commandOpen: open }),
  handleEvent: (event) => {
    if (event.type === "job") {
      const job = event.payload;
      set((state) => {
        const jobs = { ...state.jobs, [job.id]: job };
        const jobOrder = state.jobOrder.includes(job.id) ? state.jobOrder : [job.id, ...state.jobOrder].slice(0, 12);
        return { jobs, jobOrder };
      });
      if (job.status === "success") {
        if (["game", "loader", "modpack"].includes(job.kind)) {
          if (refreshTimer) clearTimeout(refreshTimer);
          refreshTimer = setTimeout(() => void get().refresh(), 350);
        }
      }
      return;
    }
    if (event.type === "launch") {
      set((state) => ({ launches: { ...state.launches, [event.payload.instanceId]: event.payload } }));
      if (["running", "exited", "crashed", "error"].includes(event.payload.phase)) {
        if (refreshTimer) clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => void get().refresh(), 400);
      }
      return;
    }
    if (event.type === "toast") {
      get().addToast(event.payload);
      return;
    }
    if (event.type === "crash") {
      get().addCrash(event.payload);
      return;
    }
    if (event.type === "instances-changed" || event.type === "accounts-changed") {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => void get().refresh(), 300);
      return;
    }
    if (event.type === "lan-world") {
      const world = event.payload;
      set((state) => {
        const others = state.lanWorlds.filter(
          (w) => !(w.address === world.address && w.port === world.port)
        );
        return { lanWorlds: [world, ...others].slice(0, 8) };
      });
    }
  },
  isFeatureVisible: (key) => {
    const features = get().bootstrap?.settings.features;
    if (!features) return true;
    return features[key] !== false;
  },
  selectInstance: (id) => get().bootstrap?.instances.find((instance) => instance.id === id),
  selectedAccount: () => {
    const bootstrap = get().bootstrap;
    if (!bootstrap) return void 0;
    return bootstrap.accounts.find((account) => account.id === bootstrap.activeAccountId) ?? bootstrap.accounts[0];
  },
  runningFor: (instanceId) => {
    const launch = get().launches[instanceId];
    if (!launch) return void 0;
    return ["starting", "preparing", "downloading", "running"].includes(launch.phase) ? launch : void 0;
  },
  addCrash: (analysis) => {
    set((state) => {
      if (!state.bootstrap) return {};
      const recentCrashes = [
        analysis,
        ...state.bootstrap.recentCrashes.filter((c) => c.id !== analysis.id)
      ].slice(0, 20);
      return { bootstrap: { ...state.bootstrap, recentCrashes } };
    });
  },
  setLanWorlds: (worlds) => set({ lanWorlds: worlds })
}));
function isPageVisible(bootstrap, page) {
  if (!bootstrap) return true;
  if (page in bootstrap.settings.features) {
    return bootstrap.settings.features[page] !== false;
  }
  return true;
}
function messageOf(error) {
  if (error instanceof Error) return error.message.replace(/^Error invoking remote method '[^']+': (Error: )?/, "");
  return String(error);
}
function useActiveInstance() {
  return useBamboo((state) => {
    const bootstrap = state.bootstrap;
    if (!bootstrap) return void 0;
    return bootstrap.instances.find((instance) => instance.id === bootstrap.activeInstanceId) ?? bootstrap.instances[0];
  });
}
function useCurrentAccount() {
  return useBamboo((state) => {
    const bootstrap = state.bootstrap;
    if (!bootstrap) return void 0;
    return bootstrap.accounts.find((account) => account.id === bootstrap.activeAccountId) ?? bootstrap.accounts[0];
  });
}
function formatDuration(ms, style = "long") {
  if (!ms || ms < 0) return style === "short" ? "0m" : "0 分钟";
  const totalMinutes = Math.floor(ms / 6e4);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (style === "short") {
    if (hours >= 100) return `${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
  if (hours > 0) return `${hours} 小时 ${minutes} 分钟`;
  if (minutes > 0) return `${minutes} 分钟`;
  return "不到 1 分钟";
}
function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  if (value >= 1e8) return `${(value / 1e8).toFixed(1)} 亿`;
  if (value >= 1e4) return `${(value / 1e4).toFixed(1)} 万`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}k`;
  return String(value);
}
function formatDate(timestamp) {
  if (!timestamp) return "从未";
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
function formatDay(timestamp) {
  return new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric" }).format(
    new Date(timestamp)
  );
}
function timeAgo(timestamp) {
  if (!timestamp) return "从未启动";
  const diff = Date.now() - timestamp;
  if (diff < 6e4) return "刚刚";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)} 分钟前`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)} 小时前`;
  if (diff < 7 * 864e5) return `${Math.floor(diff / 864e5)} 天前`;
  return formatDate(timestamp);
}
function greeting() {
  const hour = (/* @__PURE__ */ new Date()).getHours();
  if (hour < 5) return "夜深了，竹影正静";
  if (hour < 11) return "早上好，听一阵竹风";
  if (hour < 14) return "午间好，去林间走走";
  if (hour < 18) return "下午好，光落在竹叶上";
  return "晚上好，星星落在竹林里";
}
function loaderLabel(loader) {
  if (!loader || loader.type === "vanilla") return "原版";
  const labels = {
    vanilla: "原版",
    forge: "Forge",
    fabric: "Fabric",
    quilt: "Quilt",
    neoforge: "NeoForge",
    liteloader: "LiteLoader"
  };
  return labels[loader.type] ?? loader.type;
}
function loaderTone(loader) {
  switch (loader?.type) {
    case "fabric":
      return "tone-fabric";
    case "forge":
      return "tone-forge";
    case "quilt":
      return "tone-quilt";
    case "neoforge":
      return "tone-neoforge";
    case "liteloader":
      return "tone-lite";
    default:
      return "tone-vanilla";
  }
}
function parseJvmArgs(input) {
  const args = [];
  const regex = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let match;
  while (match = regex.exec(input)) {
    args.push(match[1] ?? match[2] ?? match[3]);
  }
  return args;
}
function joinJvmArgs(args) {
  return args.map((arg) => arg.includes(" ") ? `"${arg.replace(/"/g, '\\"')}"` : arg).join(" ");
}
function SkinFace({ dataUrl, name, size = 40, round, className = "" }) {
  const [is64, setIs64] = reactExports.useState(false);
  if (!dataUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `skin-face fallback ${round ? "round" : ""} ${className}`,
        style: { width: size, height: size, fontSize: Math.max(10, size * 0.32) },
        title: name,
        children: name.slice(0, 2).toUpperCase()
      }
    );
  }
  const style = {
    width: size,
    height: size,
    borderRadius: round ? "36%" : 10
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `skin-face ${round ? "round" : ""} ${className}`, style, title: name, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: dataUrl,
        alt: "",
        draggable: false,
        onLoad: (event) => {
          const img = event.currentTarget;
          setIs64(img.naturalHeight >= 64);
        },
        style: {
          width: size * 8,
          height: "auto",
          left: -size,
          top: -size,
          imageRendering: "pixelated"
        }
      }
    ),
    is64 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: dataUrl,
        alt: "",
        draggable: false,
        className: "skin-face-hat",
        style: {
          width: size * 8,
          height: "auto",
          left: -size * 5,
          top: -size,
          imageRendering: "pixelated"
        }
      }
    )
  ] });
}
function SkinPreview({
  dataUrl,
  model = "classic",
  name,
  width = 192,
  height = 288
}) {
  const canvasRef = reactExports.useRef(null);
  const [loaded, setLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!dataUrl || !canvasRef.current) return;
    const image = new Image();
    image.onload = () => {
      setLoaded(true);
      drawSkin(canvasRef.current, image, model);
    };
    image.onerror = () => setLoaded(false);
    image.src = dataUrl;
  }, [dataUrl, model]);
  if (!dataUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-preview-empty", style: { width, height }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skin-preview-silhouette", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { size: 38, strokeWidth: 1.2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "还没有上传皮肤" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-preview", style: { width, height }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, width, height, "aria-label": `${name} 的皮肤预览` }),
    !loaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skin-preview-loading" })
  ] });
}
function drawSkin(canvas, image, model) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const glow = ctx.createRadialGradient(width / 2, height - 32, 2, width / 2, height - 40, width * 0.42);
  glow.addColorStop(0, "rgba(165, 218, 149, 0.22)");
  glow.addColorStop(1, "rgba(165, 218, 149, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, height - 120, width, 120);
  ctx.save();
  ctx.translate(width / 2, height - 22);
  ctx.scale(1, 0.25);
  const shadow = ctx.createRadialGradient(0, 0, 1, 0, 0, 44);
  shadow.addColorStop(0, "rgba(0, 0, 0, 0.45)");
  shadow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.arc(0, 0, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  const scale = Math.min(width * 0.64 / 16, height * 0.82 / 34);
  const armWidth = model === "slim" ? 3 : 4;
  const charWidth = 8 + armWidth * 2;
  const charHeight = 32;
  const originX = (width - charWidth * scale) / 2;
  const originY = height - 34 - charHeight * scale + 12;
  const hasOverlay = image.naturalHeight >= 64;
  ctx.imageSmoothingEnabled = false;
  const draw = (sx, sy, sw, sh, dx, dy, flip = false) => {
    ctx.save();
    if (flip) {
      ctx.translate(dx + sw * scale, dy);
      ctx.scale(-1, 1);
      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw * scale, sh * scale);
    } else {
      ctx.drawImage(image, sx, sy, sw, sh, dx, dy, sw * scale, sh * scale);
    }
    ctx.restore();
  };
  const bodyX = originX + armWidth * scale;
  const headX = bodyX;
  const rightArmX = originX;
  const leftArmX = bodyX + 8 * scale;
  let y = originY;
  const headY = y - 2;
  const bodyY = y + 8 * scale;
  const legsY = bodyY + 12 * scale;
  draw(4, 20, 4, 12, bodyX, legsY);
  if (hasOverlay) draw(4, 36, 4, 12, bodyX, legsY);
  if (hasOverlay) draw(20, 52, 4, 12, bodyX + 4 * scale, legsY);
  else draw(4, 20, 4, 12, bodyX + 4 * scale, legsY, true);
  if (hasOverlay) draw(4, 52, 4, 12, bodyX + 4 * scale, legsY);
  draw(20, 20, 8, 12, bodyX, bodyY);
  if (hasOverlay) draw(20, 36, 8, 12, bodyX, bodyY);
  draw(44, 20, armWidth, 12, rightArmX, bodyY);
  if (hasOverlay) draw(44, 36, armWidth, 12, rightArmX, bodyY);
  if (hasOverlay) draw(36, 52, armWidth, 12, leftArmX, bodyY);
  else draw(44, 20, armWidth, 12, leftArmX, bodyY, true);
  if (hasOverlay) draw(52, 52, armWidth, 12, leftArmX, bodyY);
  draw(8, 8, 8, 8, headX, headY);
  const shade = ctx.createLinearGradient(headX, headY, headX + 8 * scale, headY);
  shade.addColorStop(0, "rgba(0,0,0,0.16)");
  shade.addColorStop(0.45, "rgba(0,0,0,0)");
  shade.addColorStop(1, "rgba(0,0,0,0.1)");
  ctx.fillStyle = shade;
  ctx.fillRect(headX, headY, 8 * scale, 8 * scale);
  if (hasOverlay) draw(40, 8, 8, 8, headX, headY);
  const topLight = ctx.createLinearGradient(headX, headY, headX, headY + 8 * scale);
  topLight.addColorStop(0, "rgba(255,255,255,0.12)");
  topLight.addColorStop(0.45, "rgba(255,255,255,0)");
  ctx.fillStyle = topLight;
  ctx.fillRect(headX, headY, 8 * scale, 8 * scale);
}
const PAGE_LABELS = {
  home: "首页",
  instances: "实例",
  downloads: "下载",
  mods: "模组",
  modpacks: "整合包",
  multiplayer: "联机",
  skins: "皮肤",
  stats: "统计",
  java: "Java",
  crash: "诊断",
  settings: "设置"
};
function TitleBar() {
  const page = useBamboo((s) => s.page);
  const setPage = useBamboo((s) => s.setPage);
  const setCommandOpen = useBamboo((s) => s.setCommandOpen);
  const bootstrap = useBamboo((s) => s.bootstrap);
  const launches = useBamboo((s) => s.launches);
  const setAccountModalOpen = useBamboo((s) => s.setAccountModalOpen);
  const [maximized, setMaximized] = reactExports.useState(false);
  const [now2, setNow] = reactExports.useState(Date.now());
  const running = Object.values(launches).find(
    (launch) => ["running", "starting", "preparing", "downloading"].includes(launch.phase)
  );
  const account = bootstrap?.accounts.find((a) => a.id === bootstrap.activeAccountId) ?? bootstrap?.accounts[0];
  reactExports.useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(timer);
  }, []);
  reactExports.useEffect(() => {
    const unsubscribe = window.bamboo.onEvent((event) => {
      if (event.type === "window-state") setMaximized(event.payload.maximized);
    });
    return unsubscribe;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "titlebar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "titlebar-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "titlebar-brandmark", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", width: "17", height: "17", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M6 21c0-7 1-12 5-17M11 21c0-5 2-9 6-11M7.5 12.5C4.8 11 3 8.8 2.6 6c2.8.1 5.2 1.6 6.7 4.2M11.5 9.2C12.6 5.5 15.2 3 18.8 2.5c-.1 3.4-2 6.1-5.4 7.5",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.6",
          strokeLinecap: "round"
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "titlebar-wordmark", children: "BAMBOO" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "titlebar-divider" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "titlebar-page", children: PAGE_LABELS[page] ?? "首页" }),
      running && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "running-pill", onClick: () => setPage("instances"), type: "button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "running-dot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 11, fill: "currentColor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: running.instanceName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "running-time", children: formatDuration(now2 - (running.windowReadyAt ?? running.startedAt ?? now2), "short") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "titlebar-right no-drag", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "command-hint",
          type: "button",
          title: "快速前往 (Ctrl+K)",
          "aria-label": "快速前往",
          onClick: () => setCommandOpen(true),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15, strokeWidth: 2 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "Ctrl K" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "titlebar-account",
          type: "button",
          onClick: () => setAccountModalOpen(true),
          title: "账户",
          children: account ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SkinFace, { dataUrl: account.skin?.dataUrl, name: account.name, size: 24, round: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: account.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { size: 13 })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "account-empty-dot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "登录账户" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 13 })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "window-controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "window-button",
            type: "button",
            title: "最小化",
            "aria-label": "最小化",
            onClick: () => void window.bamboo.minimizeWindow(),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 18, strokeWidth: 2.5 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "window-button",
            type: "button",
            title: maximized ? "还原" : "最大化",
            "aria-label": maximized ? "还原" : "最大化",
            onClick: async () => setMaximized(await window.bamboo.toggleMaximizeWindow()),
            children: maximized ? /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14, strokeWidth: 2.4 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size: 15, strokeWidth: 2.2 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "window-button close",
            type: "button",
            title: "关闭",
            "aria-label": "关闭",
            onClick: () => void window.bamboo.closeWindow(),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 19, strokeWidth: 2.5 })
          }
        )
      ] })
    ] })
  ] });
}
const NAV_GROUPS = [
  [
    { key: "home", label: "首页", icon: House },
    { key: "instances", label: "实例", icon: Layers },
    { key: "downloads", label: "下载", icon: CloudDownload }
  ],
  [
    { key: "mods", label: "模组", icon: Puzzle, feature: "mods" },
    { key: "modpacks", label: "整合包", icon: PackageOpen, feature: "modpacks" },
    { key: "multiplayer", label: "联机", icon: RadioTower, feature: "multiplayer" }
  ],
  [
    { key: "skins", label: "皮肤", icon: Sparkles, feature: "skins" },
    { key: "stats", label: "统计", icon: ChartColumn, feature: "stats" },
    { key: "java", label: "Java", icon: Coffee, feature: "java" },
    { key: "crash", label: "诊断", icon: HeartPulse, feature: "crash" }
  ]
];
function Sidebar() {
  const page = useBamboo((s) => s.page);
  const setPage = useBamboo((s) => s.setPage);
  const features = useBamboo((s) => s.bootstrap?.settings.features);
  const compactSetting = useBamboo((s) => s.bootstrap?.settings.compactSidebar ?? false);
  const updateSettings = useBamboo((s) => s.updateSettings);
  const openAccount = useBamboo((s) => s.setAccountModalOpen);
  const account = useCurrentAccount();
  const appVersion = useBamboo((s) => s.bootstrap?.appVersion ?? "1.0.1");
  const [compact, setCompact] = reactExports.useState(compactSetting);
  reactExports.useEffect(() => {
    setCompact(compactSetting);
  }, [compactSetting]);
  function toggleCompact() {
    const next = !compact;
    setCompact(next);
    void updateSettings({ compactSidebar: next });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `sidebar ${compact ? "compact" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-brand", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "brand-mark", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 48 48", fill: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M13 42c0-14 2-25 10-35M25 42c0-11 4-19 12-24M17 26c-6-3-9-7-10-13 6 .2 10 3 13 8M25 16c2-8 7-12 14-13 0 7-4 12-10 15",
            stroke: "currentColor",
            strokeWidth: "2.2",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M11 42h7M23 42h7",
            stroke: "currentColor",
            strokeWidth: "1.4",
            strokeLinecap: "round",
            opacity: ".5"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "brand-type", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "brand-cn", children: "竹" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "brand-en", children: "BAMBOO" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-collapse",
          type: "button",
          title: compact ? "展开侧栏" : "收起侧栏",
          "aria-label": compact ? "展开侧栏" : "收起侧栏",
          onClick: toggleCompact,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `collapse-icon ${compact ? "flipped" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeftClose, { size: 17, strokeWidth: 2 }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sidebar-nav", children: NAV_GROUPS.map((items, groupIndex) => {
      const visible = items.filter((item) => !item.feature || features?.[item.feature] !== false);
      if (!visible.length) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nav-group", children: visible.map((item) => {
        const Icon2 = item.icon;
        const active = page === item.key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: `nav-item ${active ? "active" : ""}`,
            onClick: () => setPage(item.key),
            title: compact ? item.label : void 0,
            "aria-current": active ? "page" : void 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { size: 18, strokeWidth: active ? 2.15 : 1.8 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-text", children: item.label }),
              active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-active-leaf", "aria-hidden": "true" })
            ]
          },
          item.key
        );
      }) }, groupIndex);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-bottom", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "sidebar-settings nav-item", type: "button", onClick: () => setPage("settings"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 18, strokeWidth: page === "settings" ? 2.1 : 1.7 }) }),
        !compact && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-text", children: "设置" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "sidebar-account", type: "button", onClick: () => openAccount(true), children: [
        account ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkinFace, { dataUrl: account.skin?.dataUrl, name: account.name, size: 38, round: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sidebar-account-empty", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sidebar-account-copy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: account?.name ?? "未登录" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `account-type-dot ${account?.type ?? "none"}` }),
            account ? account.type === "microsoft" ? "Microsoft 账户" : "离线账户" : "点击添加账户"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-footer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "footer-sprout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { size: 12 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "v",
          appVersion
        ] })
      ] })
    ] })
  ] });
}
function Toasts() {
  const toasts = useBamboo((s) => s.toasts);
  const dismiss = useBamboo((s) => s.dismissToast);
  const setPage = useBamboo((s) => s.setPage);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toast-stack", "aria-live": "polite", children: toasts.map((toast) => {
    const Icon2 = toast.kind === "success" ? CircleCheck : toast.kind === "error" ? CircleX : toast.kind === "warning" ? TriangleAlert : Info;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `toast toast-${toast.kind}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toast-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { size: 18 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast-copy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: toast.title }),
        toast.message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: toast.message }),
        toast.actionPage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "toast-action",
            onClick: () => {
              setPage(toast.actionPage);
              dismiss(toast.id);
            },
            children: "去看看"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "toast-close",
          "aria-label": "关闭通知",
          onClick: () => dismiss(toast.id),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
        }
      )
    ] }, toast.id);
  }) });
}
var reactDomExports = requireReactDom();
function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 640,
  className = "",
  closable = true
}) {
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape" && closable) onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose, closable]);
  if (!open) return null;
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "modal-layer",
        role: "presentation",
        onMouseDown: (event) => {
          if (event.target === event.currentTarget && closable) onClose();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `modal glass-card ${className}`, style: { width }, role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-top-glow" }),
          (title || closable) && /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "modal-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              title && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: title }),
              subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: subtitle })
            ] }),
            closable && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "icon-button", onClick: onClose, "aria-label": "关闭", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-body", children }),
          footer && /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "modal-footer", children: footer })
        ] })
      }
    ),
    document.body
  );
}
function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
  actions
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header-copy", children: [
      eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "eyebrow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow-line" }),
        eyebrow
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: subtitle })
    ] }),
    (actions || children) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-actions", children: actions ?? children })
  ] });
}
function Toggle({
  checked,
  onChange,
  disabled,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      "aria-label": label,
      disabled,
      className: `toggle ${checked ? "on" : ""}`,
      onClick: () => onChange(!checked),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
    }
  );
}
function Segmented({
  value,
  options,
  onChange,
  size = "normal"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `segmented ${size}`, children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: `${value === option.value ? "active" : ""}`,
      disabled: option.disabled,
      onClick: () => onChange(option.value),
      children: [
        option.icon,
        option.label
      ]
    },
    option.value
  )) });
}
function Spinner({ size = 18 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spinner", style: { width: size, height: size } });
}
function EmptyState({
  icon,
  title,
  description,
  action,
  compact
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `empty-state ${compact ? "compact" : ""}`, children: [
    icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-icon", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: description }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-action", children: action })
  ] });
}
function ProgressBar({
  value,
  indeterminate,
  tone = "bamboo"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `progress-track ${indeterminate ? "indeterminate" : ""} tone-${tone}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "progress-fill",
      style: indeterminate ? void 0 : { width: `${Math.max(0, Math.min(100, value))}%` }
    }
  ) });
}
function InlineNotice({
  tone = "info",
  icon,
  title,
  children,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `inline-notice tone-${tone}`, children: [
    icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-notice-icon", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-notice-copy", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: title }),
      children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children })
    ] }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-notice-action", children: action })
  ] });
}
function Badge({
  children,
  tone = "neutral",
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge tone-${tone} ${className}`, children });
}
function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
const JOB_ICONS = {
  game: Sprout,
  loader: Boxes,
  mod: Puzzle,
  modpack: PackageOpen,
  java: Coffee,
  skin: Sparkles,
  microsoft: Sparkles,
  other: CloudDownload
};
function JobShelf() {
  const jobs = useBamboo((s) => s.jobs);
  const jobOrder = useBamboo((s) => s.jobOrder);
  const running = jobOrder.map((id) => jobs[id]).filter(
    (job) => job && job.status === "running" && !(job.kind === "game" && job.title.startsWith("启动"))
  );
  if (!running.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "job-shelf", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "job-shelf-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "job-shelf-title", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "job-pulse" }),
        "任务"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "job-shelf-count", children: [
        running.length,
        " 项"
      ] })
    ] }),
    running.slice(0, 3).map((job) => {
      const Icon2 = JOB_ICONS[job.kind] ?? CloudDownload;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "job-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "job-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { size: 16 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "job-main", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "job-line", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "job-title", children: job.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "job-percent", children: job.indeterminate ? "···" : `${Math.round(job.progress)}%` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "job-detail", children: job.detail }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: job.progress, indeterminate: job.indeterminate })
        ] })
      ] }, job.id);
    }),
    running.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "job-more", children: [
      "还有 ",
      running.length - 3,
      " 个任务在队列中"
    ] })
  ] });
}
function DropOverlay() {
  const [active, setActive] = reactExports.useState(false);
  const [processing, setProcessing] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  const dragDepth = reactExports.useRef(0);
  const addToast = useBamboo((s) => s.addToast);
  const refresh = useBamboo((s) => s.refresh);
  reactExports.useEffect(() => {
    const hasFiles = (event) => Array.from(event.dataTransfer?.types ?? []).includes("Files");
    const onDragEnter = (event) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      dragDepth.current++;
      setActive(true);
    };
    const onDragOver = (event) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
    };
    const onDragLeave = (event) => {
      if (!hasFiles(event)) return;
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setActive(false);
    };
    const onDrop = async (event) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      dragDepth.current = 0;
      const files = Array.from(event.dataTransfer?.files ?? []);
      if (!files.length) {
        setActive(false);
        return;
      }
      setProcessing(true);
      setMessage("");
      try {
        const filePath = window.bamboo.getPathForFile(files[0]);
        if (!filePath) throw new Error("无法获取文件路径，请改用页面内按钮选择文件。");
        const result = await window.bamboo.handleDrop(filePath);
        setMessage(result.message);
        addToast({
          kind: "success",
          title: result.kind === "modpack" ? "整合包已接管" : result.kind === "skin" ? "皮肤已接管" : "文件已接管",
          message: result.message
        });
        if (files.length > 1) {
          addToast({
            kind: "info",
            title: "一次一个就好",
            message: "其余文件未处理，稍后可以再拖入。"
          });
        }
        setTimeout(() => {
          setActive(false);
          setProcessing(false);
          void refresh();
        }, 900);
      } catch (error) {
        addToast({ kind: "error", title: "这个文件没有被种下", message: messageOf(error) });
        setActive(false);
        setProcessing(false);
      }
    };
    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, [addToast, refresh]);
  if (!active) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drop-overlay", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "drop-glow" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `drop-card ${processing ? "processing" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "drop-leaf leaf-a", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 40, strokeWidth: 1.2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "drop-leaf leaf-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 26, strokeWidth: 1.2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "drop-icon", children: processing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 30, className: "spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { size: 30 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: processing ? "正在辨认这枚种子…" : "松手，把它种进竹林" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: processing ? message || "检查文件格式、游戏版本与加载器…" : "整合包会自动安装；模组会放进当前实例；PNG 会设置为离线皮肤。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drop-formats", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ".mrpack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ".zip" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ".jar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ".png" })
      ] })
    ] })
  ] });
}
function CommandPalette() {
  const open = useBamboo((s) => s.commandOpen);
  const setOpen = useBamboo((s) => s.setCommandOpen);
  const setPage = useBamboo((s) => s.setPage);
  const setAccountModalOpen = useBamboo((s) => s.setAccountModalOpen);
  const features = useBamboo((s) => s.bootstrap?.settings.features);
  const [query, setQuery] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(0);
  const inputRef = reactExports.useRef(null);
  const items = reactExports.useMemo(() => {
    const nav = [
      { page: "home", label: "首页", hint: "回到竹林", icon: House },
      { page: "instances", label: "实例", hint: "管理游戏目录", icon: Layers },
      { page: "downloads", label: "下载", hint: "安装游戏与加载器", icon: CloudDownload },
      { page: "mods", label: "模组", hint: "搜索与安装 Mod", icon: Puzzle, feature: "mods" },
      { page: "modpacks", label: "整合包", hint: "拖入或浏览整合包", icon: PackageOpen, feature: "modpacks" },
      { page: "multiplayer", label: "联机", hint: "局域网世界", icon: RadioTower, feature: "multiplayer" },
      { page: "skins", label: "皮肤", hint: "离线皮肤管理", icon: Sparkles, feature: "skins" },
      { page: "stats", label: "统计", hint: "游戏时长", icon: ChartColumn, feature: "stats" },
      { page: "java", label: "Java", hint: "运行时管理", icon: Coffee, feature: "java" },
      { page: "crash", label: "诊断", hint: "崩溃分析", icon: HeartPulse, feature: "crash" },
      { page: "settings", label: "设置", hint: "外观与功能入口", icon: Settings2 }
    ];
    const result = nav.filter((item) => !item.feature || features?.[item.feature] !== false).map((item) => ({
      id: item.page,
      label: item.label,
      hint: item.hint,
      icon: item.icon,
      keywords: `${item.label} ${item.hint} ${item.page}`,
      run: () => setPage(item.page)
    }));
    result.push(
      {
        id: "account",
        label: "切换或添加账户",
        hint: "离线 / Microsoft",
        icon: UserRound,
        keywords: "账户 登录 离线 microsoft account login",
        run: () => setAccountModalOpen(true)
      },
      {
        id: "data-folder",
        label: "打开数据目录",
        hint: "查看实例与日志",
        icon: FolderOpen,
        keywords: "文件夹 数据 目录 存储 folder data",
        run: () => void window.bamboo.openDataFolder()
      },
      {
        id: "install",
        label: "安装新的游戏版本",
        hint: "前往下载页",
        icon: CloudDownload,
        keywords: "下载 安装 新版本 minecraft download install",
        run: () => setPage("downloads")
      }
    );
    return result;
  }, [features, setAccountModalOpen, setPage]);
  const filtered = reactExports.useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => item.keywords.toLowerCase().includes(normalized));
  }, [items, query]);
  reactExports.useEffect(() => {
    if (!open) return;
    setQuery("");
    setSelected(0);
    setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);
  reactExports.useEffect(() => setSelected(0), [query]);
  reactExports.useEffect(() => {
    const keydown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!open);
        return;
      }
      if (!open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelected((index) => Math.min(filtered.length - 1, index + 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelected((index) => Math.max(0, index - 1));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const item = filtered[selected];
        if (item) {
          setOpen(false);
          item.run();
        }
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [open, filtered, selected, setOpen]);
  if (!open) return null;
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "command-layer", onMouseDown: (event) => event.target === event.currentTarget && setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-search", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            value: query,
            placeholder: "去哪儿？输入页面、功能或动作…",
            onChange: (event) => setQuery(event.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "Esc" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-results", children: [
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "command-empty", children: "没有找到，换个词试试。" }),
        filtered.map((item, index) => {
          const Icon2 = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `command-item ${index === selected ? "selected" : ""}`,
              onMouseEnter: () => setSelected(index),
              onClick: () => {
                setOpen(false);
                item.run();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "command-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { size: 17 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "command-copy", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: item.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: item.hint })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, className: "command-arrow" })
              ]
            },
            item.id
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-footer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "↑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "↓" }),
          " 选择"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "Enter" }),
          " 前往"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bamboo 快速通道" })
      ] })
    ] }) }),
    document.body
  );
}
function AccountModal() {
  const open = useBamboo((s) => s.accountModalOpen);
  const setOpen = useBamboo((s) => s.setAccountModalOpen);
  const bootstrap = useBamboo((s) => s.bootstrap);
  const active = useCurrentAccount();
  const refresh = useBamboo((s) => s.refresh);
  const setActiveAccount = useBamboo((s) => s.setActiveAccount);
  const addToast = useBamboo((s) => s.addToast);
  const setPage = useBamboo((s) => s.setPage);
  const [mode, setMode] = reactExports.useState("offline");
  const [name, setName] = reactExports.useState("");
  const [skinPath, setSkinPath] = reactExports.useState("");
  const [model, setModel] = reactExports.useState("classic");
  const [creating, setCreating] = reactExports.useState(false);
  const [flow, setFlow] = reactExports.useState(null);
  const [msStatus, setMsStatus] = reactExports.useState("");
  const [msStarting, setMsStarting] = reactExports.useState(false);
  const [workingAccount, setWorkingAccount] = reactExports.useState(null);
  const accounts = bootstrap?.accounts ?? [];
  reactExports.useEffect(() => {
    if (!open) {
      setFlow(null);
      setMsStatus("");
      setName("");
      setSkinPath("");
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (!flow) return;
    let cancelled = false;
    let timer;
    const poll = async () => {
      try {
        const result = await window.bamboo.pollMicrosoftLogin(flow.flowId);
        if (cancelled) return;
        if (result) {
          setMsStatus("登录成功，正在同步档案…");
          await refresh();
          await setActiveAccount(result.account.id);
          addToast({ kind: "success", title: "欢迎回来", message: `${result.account.name} 已登录 Microsoft 账户。` });
          setOpen(false);
          setFlow(null);
          return;
        }
        timer = setTimeout(poll, Math.max(5e3, flow.interval * 1e3));
      } catch (error) {
        if (cancelled) return;
        setMsStatus(messageOf(error));
      }
    };
    timer = setTimeout(poll, Math.max(5e3, flow.interval * 1e3));
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [flow?.flowId]);
  async function startMicrosoft() {
    setMsStarting(true);
    setMsStatus("正在向 Microsoft 请求设备代码…");
    try {
      const started = await window.bamboo.startMicrosoftLogin();
      setFlow(started);
      setMsStatus("等待你在浏览器中完成授权…");
    } catch (error) {
      const message = messageOf(error);
      setMsStatus(message);
      if (message.includes("MICROSOFT_CLIENT_ID_REQUIRED")) {
        addToast({ kind: "warning", title: "需要先配置 Azure 应用 ID", message: "已打开设置页，填入客户端 ID 后再回来登录。" });
        setOpen(false);
        setPage("settings");
      }
    } finally {
      setMsStarting(false);
    }
  }
  async function chooseSkin() {
    try {
      const file = await window.bamboo.chooseFile([{ name: "PNG 皮肤", extensions: ["png"] }]);
      if (file) setSkinPath(file);
    } catch (error) {
      addToast({ kind: "error", title: "无法选择文件", message: messageOf(error) });
    }
  }
  async function createOffline() {
    if (!name.trim()) return;
    setCreating(true);
    try {
      const account = await window.bamboo.addOfflineAccount({ name, skinPath: skinPath || void 0, model });
      await refresh();
      await setActiveAccount(account.id);
      addToast({ kind: "success", title: "离线旅行者已创建", message: `${account.name} 可以出发了。` });
      setOpen(false);
    } catch (error) {
      addToast({ kind: "error", title: "创建失败", message: messageOf(error) });
    } finally {
      setCreating(false);
    }
  }
  async function switchAccount(account) {
    setWorkingAccount(account.id);
    try {
      await setActiveAccount(account.id);
      addToast({ kind: "success", title: "已切换账户", message: `当前旅行者：${account.name}` });
    } finally {
      setWorkingAccount(null);
    }
  }
  async function logout(account) {
    setWorkingAccount(account.id);
    try {
      await window.bamboo.logoutAccount(account.id);
      await refresh();
      addToast({ kind: "info", title: "账户已移除", message: `${account.name} 的本地登录信息已清除。` });
    } catch (error) {
      addToast({ kind: "error", title: "移除失败", message: messageOf(error) });
    } finally {
      setWorkingAccount(null);
    }
  }
  async function refreshAccount(account) {
    setWorkingAccount(account.id);
    try {
      await window.bamboo.refreshMicrosoftAccount(account.id);
      await refresh();
      addToast({ kind: "success", title: "登录状态已刷新" });
    } catch (error) {
      addToast({ kind: "error", title: "刷新失败", message: messageOf(error) });
    } finally {
      setWorkingAccount(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose: () => setOpen(false),
      width: 860,
      className: "account-modal",
      title: "旅行者档案",
      subtitle: "选择身份，或让新的旅行者加入竹林。",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-layout", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "account-list-panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-list-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "本机账户" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "neutral", children: accounts.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-list", children: [
            accounts.map((account) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `account-item ${active?.id === account.id ? "active" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "account-item-main", onClick: () => void switchAccount(account), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SkinFace, { dataUrl: account.skin?.dataUrl, name: account.name, size: 38, round: true }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: account.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: account.type === "microsoft" ? "Microsoft 正版" : "离线账户" })
                ] }),
                active?.id === account.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-item-actions", children: [
                account.type === "microsoft" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "刷新登录", onClick: () => void refreshAccount(account), disabled: workingAccount === account.id, children: workingAccount === account.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "移除账户", onClick: () => void logout(account), disabled: workingAccount === account.id, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 }) })
              ] })
            ] }, account.id)),
            !accounts.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-list-empty", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 22 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "还没有旅行者" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "离线或 Microsoft 都可以。" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-list-tip", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 14 }),
            "登录凭据使用系统密钥环加密，仅保存在本机。"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-form-panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Segmented,
            {
              value: mode,
              onChange: (value) => {
                setMode(value);
                setFlow(null);
                setMsStatus("");
              },
              options: [
                { value: "offline", label: "离线账户", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { size: 14 }) },
                { value: "microsoft", label: "Microsoft", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 14 }) }
              ]
            }
          ),
          mode === "offline" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-form-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-form-intro", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "account-form-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { size: 22 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "创建一个离线身份" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "无需密码，适合单人游戏与离线服务器。3–16 位英文、数字或下划线。" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "游戏内名称" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "input",
                  value: name,
                  maxLength: 16,
                  placeholder: "例如 BambooLeaf",
                  onChange: (event) => setName(event.target.value),
                  onKeyDown: (event) => event.key === "Enter" && void createOffline()
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "offline-skin-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "offline-skin-picker", onClick: () => void chooseSkin(), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "offline-skin-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { size: 18 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: skinPath ? skinPath.split(/[\\/]/).pop() : "可选：选择皮肤 PNG" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "64×64 或 64×32，创建后也可以在皮肤页更换。" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Segmented,
                {
                  size: "small",
                  value: model,
                  onChange: setModel,
                  options: [
                    { value: "classic", label: "经典" },
                    { value: "slim", label: "细手臂" }
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary account-submit", type: "button", disabled: !name.trim() || creating, onClick: () => void createOffline(), children: creating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "spin" }),
              " 正在创建"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15 }),
              " 创建并选中"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { size: 15 }), children: "离线账户只能加入离线验证服务器；正版服务器会拒绝登录。皮肤通过本地桥接生效。" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-form-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account-form-intro", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "account-form-icon microsoft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 22 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "登录 Microsoft 账户" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "拉取你的正版档案与皮肤，访问正版服务器。Bamboo 不会看到你的密码。" })
              ] })
            ] }),
            flow ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "device-flow", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "device-code-label", children: "在浏览器中输入这段代码" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  className: "device-code",
                  type: "button",
                  onClick: () => {
                    void window.bamboo.copyText(flow.userCode);
                    addToast({ kind: "success", title: "代码已复制", message: flow.userCode });
                  },
                  children: [
                    flow.userCode,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 16 })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary", type: "button", onClick: () => void window.bamboo.openExternal(flow.verificationUri), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 15 }),
                " 打开 Microsoft 登录页"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "device-flow-status", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 14 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: msStatus || "等待你在浏览器中完成授权…" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "device-flow-foot", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { size: 12 }),
                " 代码将在约 ",
                Math.round(flow.expiresIn / 60),
                " 分钟后过期",
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                  setFlow(null);
                  setMsStatus("");
                }, children: "取消" })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              !bootstrap?.microsoftClientIdConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                InlineNotice,
                {
                  tone: "warning",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 17 }),
                  title: "需要先配置 Azure 应用 ID",
                  action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-soft small", type: "button", onClick: () => {
                    setOpen(false);
                    setPage("settings");
                  }, children: "去设置" }),
                  children: "这是 Microsoft 的开发者要求。配置一次后，所有微软账户都可使用。"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "success", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16 }), title: "OAuth 设备代码流", children: "点击下方按钮后，在 Microsoft 页面输入一次性代码即可，密码不会经过 Bamboo。" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary account-submit", type: "button", disabled: msStarting || !bootstrap?.microsoftClientIdConfigured, onClick: () => void startMicrosoft(), children: msStarting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "spin" }),
                " 正在连接"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 15 }),
                " 使用 Microsoft 登录"
              ] }) }),
              msStatus && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ms-status", children: msStatus }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "microsoft-feature-list", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                  " 自动同步正版皮肤"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                  " 支持正版服务器"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                  " 令牌本机加密"
                ] })
              ] })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function BambooArt({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      className: `bamboo-art ${className}`,
      viewBox: "0 0 560 460",
      fill: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "stalkA", x1: "360", y1: "20", x2: "360", y2: "460", gradientUnits: "userSpaceOnUse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#b6dea1", stopOpacity: ".9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: ".45", stopColor: "#72a971", stopOpacity: ".55" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#355b3f", stopOpacity: ".1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "stalkB", x1: "460", y1: "0", x2: "460", y2: "460", gradientUnits: "userSpaceOnUse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#d7efb0", stopOpacity: ".75" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: ".5", stopColor: "#8fbd7f", stopOpacity: ".36" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#476d4d", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "leafA", x1: "300", y1: "80", x2: "410", y2: "120", gradientUnits: "userSpaceOnUse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#d5f0a9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#5c9468", stopOpacity: ".3" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "leafB", x1: "430", y1: "130", x2: "530", y2: "150", gradientUnits: "userSpaceOnUse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#b8dfa5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#4c7a57", stopOpacity: ".15" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "softGlow", x: "-40%", y: "-40%", width: "180%", height: "180%", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "18" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "430", cy: "170", r: "150", fill: "#76a877", opacity: ".12", filter: "url(#softGlow)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "stalk stalk-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "344", y: "-20", width: "15", height: "500", rx: "7.5", fill: "url(#stalkA)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M344 74h15M344 166h15M344 258h15M344 350h15", stroke: "#d4ecc1", strokeOpacity: ".22", strokeWidth: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "leaves leaves-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M352 92c34-26 70-32 104-17-24 28-58 37-104 17Z", fill: "url(#leafA)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M350 160C308 142 281 116 270 81c35 4 61 25 80 79Z", fill: "url(#leafA)", opacity: ".65" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M352 245c37-23 71-25 102-7-24 23-55 29-102 7Z", fill: "url(#leafB)", opacity: ".5" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "stalk stalk-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "449", y: "20", width: "10", height: "440", rx: "5", fill: "url(#stalkB)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M449 100h10M449 190h10M449 280h10M449 370h10", stroke: "#d4ecc1", strokeOpacity: ".15", strokeWidth: "1.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "leaves leaves-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M452 121c30-20 61-24 91-11-20 22-50 29-91 11Z", fill: "url(#leafB)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M452 205c-31-12-50-34-57-64 28 3 46 20 57 64Z", fill: "url(#leafB)", opacity: ".55" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "stalk stalk-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "286", y: "110", width: "7", height: "350", rx: "3.5", fill: "url(#stalkA)", opacity: ".38" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M286 186h7M286 262h7M286 338h7", stroke: "#d4ecc1", strokeOpacity: ".14", strokeWidth: "1.4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("g", { className: "leaves leaves-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M290 200c-26-8-44-24-53-48 26 0 43 13 53 48Z", fill: "url(#leafB)", opacity: ".32" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { opacity: ".8", className: "floating-leaves", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "float-leaf f1", d: "M230 80c12-13 28-16 43-9-8 14-23 19-43 9Z", fill: "#a8d49b", opacity: ".55" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "float-leaf f2", d: "M489 250c10-11 23-14 36-8-8 12-20 16-36 8Z", fill: "#c4e4a8", opacity: ".35" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { className: "float-leaf f3", d: "M260 340c9-9 20-11 31-6-6 10-16 13-31 6Z", fill: "#8fbd7f", opacity: ".4" })
        ] })
      ]
    }
  );
}
const ICONS = { sprout: Sprout, bamboo: TreePine, panda: Cat, leaf: Leaf, flower: Flower2 };
function InstanceGlyph({
  icon,
  size = 44,
  className = ""
}) {
  if (icon?.startsWith("data:image")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `instance-glyph image ${className}`, style: { width: size, height: size }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: icon, alt: "", draggable: false }) });
  }
  const Icon2 = ICONS[icon ?? "sprout"] ?? Sprout;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `instance-glyph ${className}`, style: { width: size, height: size }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { size: size * 0.46, strokeWidth: 1.6 }) });
}
function HomePage() {
  const bootstrap = useBamboo((s) => s.bootstrap);
  const setPage = useBamboo((s) => s.setPage);
  const setActiveInstance = useBamboo((s) => s.setActiveInstance);
  const setAccountModalOpen = useBamboo((s) => s.setAccountModalOpen);
  const launches = useBamboo((s) => s.launches);
  const jobs = useBamboo((s) => s.jobs);
  const addToast = useBamboo((s) => s.addToast);
  const activeInstance = useActiveInstance();
  const account = useCurrentAccount();
  const [modCount, setModCount] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [showAllInstances, setShowAllInstances] = reactExports.useState(false);
  const activeLaunch = activeInstance ? launches[activeInstance.id] : void 0;
  const gameRunning = activeLaunch?.phase === "running";
  const launchingPhase = activeLaunch && ["starting", "preparing", "downloading"].includes(activeLaunch.phase);
  const launchJob = Object.values(jobs).filter(
    (job) => job.kind === "game" && job.status === "running" && job.title.startsWith("启动") && activeInstance && job.title.includes(activeInstance.name)
  ).sort((a, b) => b.startedAt - a.startedAt)[0];
  const launching = Boolean(busy || launchingPhase);
  const features = bootstrap?.settings.features;
  reactExports.useEffect(() => {
    let cancelled = false;
    if (!activeInstance) {
      setModCount(null);
      return;
    }
    window.bamboo.getInstalledMods(activeInstance.id).then((mods) => !cancelled && setModCount(mods.filter((m) => m.enabled).length)).catch(() => !cancelled && setModCount(null));
    return () => {
      cancelled = true;
    };
  }, [activeInstance?.id, activeInstance?.updatedAt]);
  const stats = reactExports.useMemo(() => {
    const sessions = bootstrap?.sessions ?? [];
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const days = Array.from({ length: 7 }, (_, index) => {
      const start2 = today.getTime() - (6 - index) * 864e5;
      const end = start2 + 864e5;
      return {
        label: formatDay(start2).replace("/", "/"),
        value: sessions.filter((s) => s.startedAt >= start2 && s.startedAt < end).reduce((sum, s) => sum + s.durationMs, 0)
      };
    });
    const week = days.reduce((sum, day) => sum + day.value, 0);
    return { days, week };
  }, [bootstrap?.sessions]);
  const recent = [...bootstrap?.instances ?? []].sort((a, b) => {
    if (bootstrap?.activeInstanceId === a.id) return -1;
    if (bootstrap?.activeInstanceId === b.id) return 1;
    return (b.lastPlayedAt ?? b.createdAt) - (a.lastPlayedAt ?? a.createdAt);
  });
  const visibleRecent = showAllInstances ? recent : recent.slice(0, 3);
  async function start(instance) {
    if (!account) {
      setAccountModalOpen(true);
      addToast({ kind: "info", title: "先选一个身份", message: "登录或创建一个离线账户，就可以出发了。" });
      return;
    }
    setBusy(true);
    try {
      await setActiveInstance(instance.id);
      await window.bamboo.launch(instance.id);
    } catch (error) {
      addToast({ kind: "error", title: "没有启动成功", message: messageOf(error) });
    } finally {
      setBusy(false);
    }
  }
  async function stop(instance) {
    try {
      await window.bamboo.killGame(instance.id);
    } catch (error) {
      addToast({ kind: "error", title: "结束游戏失败", message: messageOf(error) });
    }
  }
  const maxDay = Math.max(1, ...stats.days.map((d) => d.value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page home-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "home-topline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "home-greeting", children: greeting() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "home-date", children: new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
      }).format(/* @__PURE__ */ new Date()).replace("星期", " · 星期") })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `home-hero glass-card ${!activeInstance ? "empty-hero" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-haze" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BambooArt, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-copy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
          "把世界，",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "种成一片",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "竹林" }),
          "。"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hero-sub", children: activeInstance ? "风穿过竹叶，新的旅程已经准备好。" : "先种下第一个世界，再去更远的地方。" }),
        activeInstance ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-current", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "hero-current-main",
              type: "button",
              onClick: () => setPage("instances"),
              title: "管理实例",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(InstanceGlyph, { icon: activeInstance.icon, size: 40 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: activeInstance.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                    "Minecraft ",
                    activeInstance.mcVersion ?? "未知版本",
                    " · ",
                    loaderLabel(activeInstance.loader),
                    activeInstance.loader.version ? ` ${activeInstance.loader.version}` : ""
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `loader-badge ${loaderTone(activeInstance.loader)}`, children: loaderLabel(activeInstance.loader) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-current ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hero-current-empty", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { size: 18 }),
          "还没有世界"
        ] }) }),
        launching && activeInstance ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          LaunchProgress,
          {
            instance: activeInstance,
            state: activeLaunch,
            job: launchJob
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-actions", children: activeInstance ? gameRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "launch-button running", type: "button", onClick: () => stop(activeInstance), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "launch-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size: 15, fill: "currentColor" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "正在运行" }),
              "结束游戏"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "hero-secondary", type: "button", onClick: () => setPage("instances"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { size: 16 }),
            "查看实例"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "launch-button", type: "button", onClick: () => void start(activeInstance), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "launch-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 17, fill: "currentColor" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: account ? `以 ${account.name} 身份` : "需要先添加账户" }),
              "启动游戏"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18, className: "launch-arrow" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "hero-secondary", type: "button", onClick: () => setPage("instances"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 16 }),
            "实例设置"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "launch-button", type: "button", onClick: () => setPage("downloads"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "launch-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "从零开始" }),
            "安装第一个世界"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18, className: "launch-arrow" })
        ] }) }),
        activeInstance && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-status", children: [
          "Java ",
          bootstrap?.javaCache[0]?.majorVersion ?? "待配置",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          modCount === null ? "读取模组" : `${modCount} 个模组`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-account-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-account-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mini-link", type: "button", onClick: () => setAccountModalOpen(true), children: "切换账户" }) }),
        account ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-account-preview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SkinPreview,
            {
              dataUrl: account.skin?.dataUrl,
              model: account.skin?.model,
              name: account.name,
              width: 150,
              height: 190
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-account-name", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: account.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: account.type === "microsoft" ? "Microsoft" : "离线账户" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-account-empty", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-account-empty-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 26 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "还没有旅行者" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "登录 Microsoft 账户，或创建一个离线身份。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-soft", type: "button", onClick: () => setAccountModalOpen(true), children: "添加账户" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "quick-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuickCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { size: 20 }),
          label: "种下新世界",
          hint: "下载游戏核心与加载器",
          onClick: () => setPage("downloads"),
          tone: "green"
        }
      ),
      features?.mods !== false && /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuickCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 20 }),
          label: "收集模组",
          hint: "Modrinth 与 CurseForge",
          onClick: () => setPage("mods"),
          tone: "warm"
        }
      ),
      features?.modpacks !== false && /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuickCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { size: 20 }),
          label: "打开整合包",
          hint: "拖入即自动安装",
          onClick: () => setPage("modpacks"),
          tone: "blue"
        }
      ),
      features?.multiplayer !== false && /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuickCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RadioTower, { size: 20 }),
          label: "联机",
          hint: "局域网与端口映射",
          onClick: () => setPage("multiplayer"),
          tone: "violet"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-lower", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "home-section recent-instances", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-heading", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "最近" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-button", type: "button", onClick: () => setPage("instances"), children: [
            "全部 ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
          ] })
        ] }),
        recent.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `instance-mini-grid ${showAllInstances ? "show-all" : ""}`, children: [
          visibleRecent.map((instance) => {
            const launch = launches[instance.id];
            const isRunning = launch && ["running", "starting", "preparing", "downloading"].includes(launch.phase);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: `instance-mini-card ${bootstrap?.activeInstanceId === instance.id ? "active" : ""}`,
                onClick: () => {
                  void setActiveInstance(instance.id);
                  setPage("instances");
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-mini-head", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(InstanceGlyph, { icon: instance.icon, size: 42 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `loader-badge ${loaderTone(instance.loader)}`, children: loaderLabel(instance.loader) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: instance.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "instance-mini-version", children: [
                    "Minecraft ",
                    instance.mcVersion
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-mini-foot", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { size: 12 }),
                      timeAgo(instance.lastPlayedAt)
                    ] }),
                    isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mini-running", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "running-dot" }),
                      " 运行中"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mini-play", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 12, fill: "currentColor" }) })
                  ] })
                ]
              },
              instance.id
            );
          }),
          recent.length > 3 && !showAllInstances && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "instance-more-card", type: "button", onClick: () => setShowAllInstances(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "还有 ",
              recent.length - 3,
              " 个世界"
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            compact: true,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { size: 24 }),
            title: "还没有实例",
            description: "去下载一个 Minecraft 版本。",
            action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", onClick: () => setPage("downloads"), children: "去下载" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "home-section playtime-card glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-heading compact", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "本周" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "week-total", children: formatDuration(stats.week, "short") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mini-chart", children: stats.days.map((day, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mini-bar-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mini-bar-value", children: day.value > 0 ? formatDuration(day.value, "short") : "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mini-bar-track", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `mini-bar ${index === stats.days.length - 1 ? "today" : ""}`,
              style: { height: `${Math.max(3, day.value / maxDay * 100)}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mini-bar-label", children: day.label })
        ] }, day.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "playtime-foot", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { size: 13 }),
            " 累计 ",
            formatDuration(bootstrap?.totalPlayTimeMs ?? 0, "short")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-button small", type: "button", onClick: () => setPage("stats"), children: [
            "全部统计 ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function LaunchProgress({
  instance,
  state,
  job
}) {
  const phase = state?.phase;
  const fallback = phase === "starting" ? 82 : phase === "downloading" ? 46 : 12;
  const progress = Math.max(fallback, job?.progress ?? 0);
  const stage = progress >= 76 ? 2 : progress >= 36 ? 1 : 0;
  const stages = ["检查", "准备", "启动"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launch-progress", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launch-progress-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "launch-progress-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 16 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: instance.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: job?.detail || state?.message || "正在准备游戏…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
        Math.round(progress),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launch-growth", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launch-growth-track", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "launch-growth-fill", style: { width: `${Math.min(100, progress)}%` } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "launch-growth-leaf", style: { left: `${Math.min(97, progress)}%` } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "launch-stages", children: stages.map((label, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: index <= stage ? "active" : "", children: label }, label)) })
    ] })
  ] });
}
function QuickCard({
  icon,
  label,
  hint,
  onClick,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: `quick-card tone-${tone}`, onClick, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "quick-icon", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "quick-copy", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: hint })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15, className: "quick-arrow" })
  ] });
}
function InstancesPage() {
  const bootstrap = useBamboo((s) => s.bootstrap);
  const setPage = useBamboo((s) => s.setPage);
  const setActiveInstance = useBamboo((s) => s.setActiveInstance);
  const setAccountModalOpen = useBamboo((s) => s.setAccountModalOpen);
  const refresh = useBamboo((s) => s.refresh);
  const addToast = useBamboo((s) => s.addToast);
  const launches = useBamboo((s) => s.launches);
  const account = useCurrentAccount();
  const instances2 = bootstrap?.instances ?? [];
  const selected = instances2.find((i) => i.id === bootstrap?.activeInstanceId) ?? instances2[0];
  const [settingsOpen, setSettingsOpen] = reactExports.useState(false);
  const [loaderOpen, setLoaderOpen] = reactExports.useState(false);
  const [deleteOpen, setDeleteOpen] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  const [mods, setMods] = reactExports.useState([]);
  const [modsLoading, setModsLoading] = reactExports.useState(false);
  const [recentSessions, setRecentSessions] = reactExports.useState(
    (bootstrap?.sessions ?? []).filter((s) => s.instanceId === selected?.id).slice(0, 4)
  );
  const launchState = selected ? launches[selected.id] : void 0;
  const running = launchState && ["running", "starting", "preparing", "downloading"].includes(launchState.phase);
  reactExports.useEffect(() => {
    if (!selected) return;
    setRecentSessions(
      (bootstrap?.sessions ?? []).filter((s) => s.instanceId === selected.id).slice(0, 4)
    );
  }, [bootstrap?.sessions, selected?.id, selected?.playTimeMs]);
  reactExports.useEffect(() => {
    if (!selected) {
      setMods([]);
      return;
    }
    let cancelled = false;
    setModsLoading(true);
    window.bamboo.getInstalledMods(selected.id).then((list) => !cancelled && setMods(list)).catch(() => !cancelled && setMods([])).finally(() => !cancelled && setModsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [selected?.id, selected?.updatedAt, bootstrap?.instances.length]);
  async function choose(instance) {
    await setActiveInstance(instance.id);
  }
  async function launch() {
    if (!selected) return;
    if (!account) {
      setAccountModalOpen(true);
      return;
    }
    setBusy(true);
    try {
      await window.bamboo.launch(selected.id);
    } catch (error) {
      addToast({ kind: "error", title: "启动失败", message: messageOf(error) });
    } finally {
      setBusy(false);
    }
  }
  async function stop() {
    if (!selected) return;
    try {
      await window.bamboo.killGame(selected.id);
    } catch (error) {
      addToast({ kind: "error", title: "结束游戏失败", message: messageOf(error) });
    }
  }
  async function remove() {
    if (!selected) return;
    try {
      await window.bamboo.deleteInstance(selected.id);
      setDeleteOpen(false);
      await refresh();
      addToast({ kind: "success", title: "实例已移除", message: "游戏文件夹已移入回收站。" });
    } catch (error) {
      addToast({ kind: "error", title: "删除实例失败", message: messageOf(error) });
    }
  }
  if (!instances2.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          eyebrow: "YOUR GROVES",
          title: "实例",
          subtitle: "每个实例，都是一片可以独立生长的小世界。",
          actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary", type: "button", onClick: () => setPage("downloads"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " 新建实例"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card empty-page-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 34 }),
          title: "还没有任何实例",
          description: "去下载页安装一个 Minecraft 版本，Bamboo 会自动为它创建实例。",
          action: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary", type: "button", onClick: () => setPage("downloads"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SproutIcon, {}),
            " 安装第一个世界"
          ] })
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page instances-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "YOUR GROVES",
        title: "实例",
        subtitle: `${instances2.length} 个独立实例 · 配置、模组与存档互不打扰`,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn btn-ghost",
              type: "button",
              onClick: () => void window.bamboo.openDataFolder(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 16 }),
                " 数据目录"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary", type: "button", onClick: () => setPage("downloads"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " 新建实例"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instances-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "instances-list", children: [
        instances2.map((instance) => {
          const state = launches[instance.id];
          const isRunning = state && ["running", "starting", "preparing", "downloading"].includes(state.phase);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `instance-row ${selected?.id === instance.id ? "selected" : ""}`,
              onClick: () => void choose(instance),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(InstanceGlyph, { icon: instance.icon, size: 46 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "instance-row-copy", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: instance.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                    instance.mcVersion,
                    " · ",
                    loaderLabel(instance.loader),
                    instance.loader.version ? ` ${instance.loader.version}` : ""
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "instance-row-meta", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { size: 11 }),
                    " ",
                    formatDuration(instance.playTimeMs, "short"),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dot-sep" }),
                    timeAgo(instance.lastPlayedAt)
                  ] })
                ] }),
                isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "instance-live", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "running-dot" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "instance-chevron" })
              ]
            },
            instance.id
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "instance-add-row", onClick: () => setPage("downloads"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "instance-add-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "种下新的世界" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "安装版本或整合包" })
          ] })
        ] })
      ] }),
      selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "instance-detail glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "instance-detail-glow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "instance-detail-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-detail-identity", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InstanceGlyph, { icon: selected.icon, size: 68 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-detail-kicker", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `loader-badge ${loaderTone(selected.loader)}`, children: loaderLabel(selected.loader) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "instance-version", children: [
                  "Minecraft ",
                  selected.mcVersion
                ] }),
                selected.loader.version && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "instance-version muted", children: selected.loader.version })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: selected.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "创建于 ",
                formatDate(selected.createdAt),
                " · 上次游玩 ",
                timeAgo(selected.lastPlayedAt)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-detail-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "btn btn-ghost",
                type: "button",
                onClick: () => void window.bamboo.openInstanceFolder(selected.id),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 15 }),
                  " 文件夹"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost", type: "button", onClick: () => setSettingsOpen(true), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 15 }),
              " 设置"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost danger-text", type: "button", onClick: () => setDeleteOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-stats-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "instance-stat-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { size: 17 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "累计游玩" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatDuration(selected.playTimeMs) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "instance-stat-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 17 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "启用模组" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: modsLoading ? "…" : `${mods.filter((m) => m.enabled).length} 个` })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "instance-stat-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { size: 17 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "Java 运行时" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selected.javaPath ? `手动 · ${selected.javaPath.split(/[\\/]/).slice(-3, -1).join("/") || "Java"}` : "自动匹配" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-detail-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-panel-head", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "LAUNCH PAD" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "出发准备" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "status-soft", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `account-type-dot ${account?.type ?? "none"}` }),
                account?.name ?? "未登录"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "launch-specs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "内存" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                  selected.memoryMb,
                  " MB"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "窗口" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selected.fullscreen ? "全屏" : `${selected.width} × ${selected.height}` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "JVM" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: profileLabel(selected.jvmProfile) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "离线皮肤" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selected.offlineSkin ? "已启用" : "关闭" })
              ] })
            ] }),
            running ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "launch-button compact running", type: "button", onClick: () => void stop(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "launch-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size: 14, fill: "currentColor" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: launchState?.message ?? "游戏运行中" }),
                "结束游戏"
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "launch-button compact", type: "button", disabled: busy, onClick: () => void launch(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "launch-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 15, fill: "currentColor" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: busy ? "正在准备…" : account ? `以 ${account.name} 的身份` : "需要先添加账户" }),
                busy ? "启动中" : "启动游戏"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 17, className: "launch-arrow" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-sub-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setPage("mods"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 14 }),
                " 管理模组"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setLoaderOpen(true), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { size: 14 }),
                " 安装加载器"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setPage("crash"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14 }),
                " 崩溃诊断"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-panel-head", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "RECENT MODS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "这片林子的模组" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-button small", type: "button", onClick: () => setPage("mods"), children: [
                "查看全部 ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mini-mod-list", children: modsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mini-mod-loading", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
              " 正在读取模组…"
            ] }) : mods.length ? mods.slice(0, 4).map((mod) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mini-mod-row", children: [
              mod.iconDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: mod.iconDataUrl, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mini-mod-placeholder", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 15 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: mod.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: mod.version || "未知版本" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: mod.enabled ? "green" : "neutral", children: mod.enabled ? "启用" : "禁用" })
            ] }, mod.fileName)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mini-mod-empty", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 20 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "还没有模组，去竹林集市看看。" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-button small", type: "button", onClick: () => setPage("mods"), children: "浏览模组" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-session-strip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "MEMORIES" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "最近游玩" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "session-chips", children: recentSessions.length ? recentSessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-chip", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(session.startedAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatDuration(session.durationMs, "short") }),
            session.crashed && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "red", children: "崩溃" })
          ] }, session.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: "还没有出发记录。" }) })
        ] })
      ] })
    ] }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
      InstanceSettingsModal,
      {
        open: settingsOpen,
        instance: selected,
        accounts: bootstrap?.accounts ?? [],
        onClose: () => setSettingsOpen(false),
        onSaved: async () => {
          setSettingsOpen(false);
          await refresh();
          addToast({ kind: "success", title: "设置已保存", message: "下一次启动时生效。" });
        }
      }
    ),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoaderInstallModal,
      {
        open: loaderOpen,
        instance: selected,
        onClose: () => setLoaderOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: deleteOpen,
        onClose: () => setDeleteOpen(false),
        title: "把这片竹林移走？",
        subtitle: "实例文件夹会被移到回收站，存档与配置不会立即永久删除。",
        width: 500,
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", type: "button", onClick: () => setDeleteOpen(false), children: "再想想" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-danger", type: "button", onClick: () => void remove(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15 }),
            " 移到回收站"
          ] })
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "warning", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18 }), title: selected?.name, children: "如果游戏正在运行，需要先结束游戏。这个操作不会自动取消对历史游玩时长的记录。" })
      }
    )
  ] });
}
function SproutIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 21V9M12 13c-5 0-7-3-7-7 4 0 7 2 7 7ZM12 10c4 0 6-2 6-6-4 0-6 2-6 6Z", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) });
}
function profileLabel(profile) {
  return { balanced: "均衡", performance: "性能", compatibility: "兼容", custom: "自定义" }[profile];
}
function InstanceSettingsModal({
  open,
  instance,
  accounts,
  onClose,
  onSaved
}) {
  const bootstrap = useBamboo((s) => s.bootstrap);
  const addToast = useBamboo((s) => s.addToast);
  const [name, setName] = reactExports.useState(instance.name);
  const [memory, setMemory] = reactExports.useState(instance.memoryMb);
  const [accountId, setAccountId] = reactExports.useState(instance.accountId ?? "");
  const [javaPath, setJavaPath] = reactExports.useState(instance.javaPath ?? "");
  const [profile, setProfile] = reactExports.useState(instance.jvmProfile);
  const [jvmText, setJvmText] = reactExports.useState(joinJvmArgs(instance.jvmArgs));
  const [width, setWidth] = reactExports.useState(instance.width);
  const [height, setHeight] = reactExports.useState(instance.height);
  const [fullscreen, setFullscreen] = reactExports.useState(instance.fullscreen);
  const [offlineSkin, setOfflineSkin] = reactExports.useState(instance.offlineSkin);
  const [autoJava, setAutoJava] = reactExports.useState(instance.autoInstallJava);
  const [notes, setNotes] = reactExports.useState(instance.notes);
  const [javaList, setJavaList] = reactExports.useState(bootstrap?.javaCache ?? []);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open) return;
    setName(instance.name);
    setMemory(instance.memoryMb);
    setAccountId(instance.accountId ?? "");
    setJavaPath(instance.javaPath ?? "");
    setProfile(instance.jvmProfile);
    setJvmText(joinJvmArgs(instance.jvmArgs));
    setWidth(instance.width);
    setHeight(instance.height);
    setFullscreen(instance.fullscreen);
    setOfflineSkin(instance.offlineSkin);
    setAutoJava(instance.autoInstallJava);
    setNotes(instance.notes);
    window.bamboo.listJava().then(setJavaList).catch(() => void 0);
  }, [open, instance]);
  async function save() {
    setSaving(true);
    try {
      await window.bamboo.updateInstance(instance.id, {
        name,
        memoryMb: memory,
        accountId,
        javaPath: javaPath || void 0,
        jvmProfile: profile,
        jvmArgs: profile === "custom" ? parseJvmArgs(jvmText) : instance.jvmArgs,
        width,
        height,
        fullscreen,
        offlineSkin,
        autoInstallJava: autoJava,
        notes
      });
      await onSaved();
    } catch (error) {
      addToast({ kind: "error", title: "保存失败", message: messageOf(error) });
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open,
      onClose,
      title: "实例设置",
      subtitle: `${instance.mcVersion} · ${loaderLabel(instance.loader)}`,
      width: 720,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", type: "button", onClick: onClose, children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", disabled: saving, onClick: () => void save(), children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "spin" }),
          " 保存中"
        ] }) : "保存设置" })
      ] }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-section-title", children: "基本" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-grid two", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "实例名称" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: name, onChange: (e) => setName(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "使用账户" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "select", value: accountId, onChange: (e) => setAccountId(e.target.value), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "跟随全局账户" }),
                accounts.map((account) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: account.id, children: account.name }, account.id))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "备注" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: notes, placeholder: "例如：光影测试、和朋友联机…", onChange: (e) => setNotes(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-section-title", children: "性能与 Java" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "memory-row", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field grow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "最大内存 ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                memory,
                " MB"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: 1024,
                max: 16384,
                step: 512,
                value: memory,
                onChange: (e) => setMemory(Number(e.target.value))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "range-labels", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1 GB" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "8 GB" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "16 GB" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Java 运行时" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "select", value: javaPath, onChange: (e) => setJavaPath(e.target.value), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "自动选择（推荐）" }),
              javaList.map((java) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: java.path, children: [
                "Java ",
                java.majorVersion,
                " · ",
                java.vendor,
                " · ",
                java.path
              ] }, java.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "JVM 预设" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Segmented,
              {
                value: profile,
                onChange: setProfile,
                options: [
                  { value: "balanced", label: "均衡" },
                  { value: "performance", label: "性能" },
                  { value: "compatibility", label: "兼容" },
                  { value: "custom", label: "自定义" }
                ]
              }
            )
          ] }),
          profile === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "自定义 JVM 参数" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                className: "input code-input",
                rows: 3,
                value: jvmText,
                onChange: (e) => setJvmText(e.target.value),
                placeholder: "-XX:+UseG1GC -XX:MaxGCPauseMillis=200"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "switch-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "自动下载缺失的 Java" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "没有匹配运行时，将从 Mojang 获取对应版本。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { checked: autoJava, onChange: setAutoJava })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-section-title", children: "画面" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-grid three", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "宽度" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", type: "number", min: 640, value: width, onChange: (e) => setWidth(Number(e.target.value)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "高度" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", type: "number", min: 480, value: height, onChange: (e) => setHeight(Number(e.target.value)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "启动方式" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Segmented,
                {
                  value: fullscreen ? "fullscreen" : "window",
                  onChange: (value) => setFullscreen(value === "fullscreen"),
                  options: [
                    { value: "window", label: "窗口" },
                    { value: "fullscreen", label: "全屏" }
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "switch-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "离线皮肤桥接" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "使用离线账户时，通过本地 authlib-injector 应用你的自定义皮肤。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { checked: offlineSkin, onChange: setOfflineSkin })
          ] })
        ] })
      ]
    }
  );
}
function LoaderInstallModal({
  open,
  instance,
  onClose
}) {
  const addToast = useBamboo((s) => s.addToast);
  const [loader, setLoader] = reactExports.useState("fabric");
  const [versions, setVersions] = reactExports.useState([]);
  const [version, setVersion] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [installing, setInstalling] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!open || !instance.mcVersion) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setVersions([]);
    setVersion("");
    window.bamboo.listLoaderVersions(instance.mcVersion, loader).then((list) => {
      if (cancelled) return;
      setVersions(list);
      setVersion(list[0]?.version ?? "");
    }).catch((err) => !cancelled && setError(messageOf(err))).finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [open, instance.mcVersion, loader]);
  async function install() {
    if (!version) return;
    setInstalling(true);
    try {
      await window.bamboo.installLoader({ instanceId: instance.id, loader, version });
      addToast({ kind: "info", title: "开始安装加载器", message: "任务进度显示在右下角，完成后实例会自动更新。" });
      onClose();
    } catch (error2) {
      addToast({ kind: "error", title: "安装加载器失败", message: messageOf(error2) });
    } finally {
      setInstalling(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open,
      onClose,
      title: "安装模组加载器",
      subtitle: `为 ${instance.name} 换上一层新的土壤`,
      width: 560,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", type: "button", onClick: onClose, children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", disabled: !version || installing || loading, onClick: () => void install(), children: installing ? "正在安装…" : "开始安装" })
      ] }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "加载器" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader-choice-grid", children: ["fabric", "forge", "quilt", "neoforge", "liteloader"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `loader-choice ${loader === item ? "active" : ""} ${loaderTone({ type: item })}`,
              onClick: () => setLoader(item),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: loaderLabel({ type: item }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: loaderHint(item) })
              ]
            },
            item
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "版本" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "select", value: version, onChange: (e) => setVersion(e.target.value), disabled: loading, children: [
            loading && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "正在读取版本…" }),
            !loading && versions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "没有可用版本" }),
            versions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: item.version, children: item.label }, item.version))
          ] })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "danger", title: "无法读取版本", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "warning", title: "备份一下更安心", children: "安装加载器会更新实例绑定的游戏版本，建议先备份存档。安装完成后原版本文件仍会保留。" })
      ]
    }
  );
}
function loaderHint(loader) {
  return {
    vanilla: "不安装加载器",
    fabric: "轻量 · 更新快",
    forge: "模组生态广",
    quilt: "Fabric 分支",
    neoforge: "Forge 新分支",
    liteloader: "旧版轻量"
  }[loader];
}
const LOADERS = [
  { type: "vanilla", short: "V", hint: "纯净原版" },
  { type: "fabric", short: "F", hint: "轻量模组" },
  { type: "forge", short: "FG", hint: "经典生态" },
  { type: "quilt", short: "Q", hint: "Fabric 分支" },
  { type: "neoforge", short: "NF", hint: "新一代 Forge" },
  { type: "liteloader", short: "LL", hint: "旧版轻量" }
];
function DownloadsPage() {
  const bootstrap = useBamboo((s) => s.bootstrap);
  const addToast = useBamboo((s) => s.addToast);
  const updateSettings = useBamboo((s) => s.updateSettings);
  const setPage = useBamboo((s) => s.setPage);
  const jobs = useBamboo((s) => s.jobs);
  const [versions, setVersions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [filter, setFilter] = reactExports.useState("release");
  const [search, setSearch] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const [loader, setLoader] = reactExports.useState("vanilla");
  const [loaderVersions, setLoaderVersions] = reactExports.useState([]);
  const [loaderVersion, setLoaderVersion] = reactExports.useState("");
  const [loaderLoading, setLoaderLoading] = reactExports.useState(false);
  const [loaderError, setLoaderError] = reactExports.useState(null);
  const [instanceName, setInstanceName] = reactExports.useState("");
  const [createInstance, setCreateInstance] = reactExports.useState(true);
  const [job, setJob] = reactExports.useState(null);
  const [showAll, setShowAll] = reactExports.useState(false);
  const source = bootstrap?.settings.downloadSource ?? "official";
  const activeJob = job && jobs[job.id] ? jobs[job.id] : job;
  reactExports.useEffect(() => {
    void loadVersions();
  }, []);
  reactExports.useEffect(() => {
    if (!selected || loader === "vanilla") {
      setLoaderVersions([]);
      setLoaderVersion("");
      setLoaderError(null);
      return;
    }
    let cancelled = false;
    setLoaderLoading(true);
    setLoaderError(null);
    setLoaderVersions([]);
    setLoaderVersion("");
    window.bamboo.listLoaderVersions(selected.id, loader).then((list) => {
      if (cancelled) return;
      setLoaderVersions(list);
      setLoaderVersion(list[0]?.version ?? "");
    }).catch((err) => !cancelled && setLoaderError(messageOf(err))).finally(() => !cancelled && setLoaderLoading(false));
    return () => {
      cancelled = true;
    };
  }, [selected?.id, loader]);
  async function loadVersions(force = false) {
    if (force) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const list = await window.bamboo.listVersions(force);
      setVersions(list);
      const latest = list.find((item) => item.type === "release" && item.installed) ?? list.find((item) => item.type === "release");
      setSelected((current) => {
        if (current && list.some((item) => item.id === current.id)) return current;
        return latest ?? null;
      });
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }
  reactExports.useEffect(() => {
    if (!selected) return;
    setInstanceName(
      (current) => !current || /^Minecraft\s/.test(current) ? `Minecraft ${selected.id}` : current
    );
  }, [selected?.id]);
  const filtered = reactExports.useMemo(() => {
    const query = search.trim().toLowerCase();
    return versions.filter((version) => {
      if (filter === "release" && version.type !== "release") return false;
      if (filter === "snapshot" && version.type !== "snapshot" && version.type !== "old_beta" && version.type !== "old_alpha") return false;
      if (query && !version.id.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [versions, filter, search]);
  const shown = showAll ? filtered : filtered.slice(0, 80);
  const latestRelease = versions.find((v) => v.type === "release");
  const canInstall = Boolean(selected) && (loader === "vanilla" || Boolean(loaderVersion)) && (!activeJob || activeJob.status !== "running");
  async function install() {
    if (!selected) return;
    const options = {
      mcVersion: selected.id,
      loader,
      loaderVersion: loader === "vanilla" ? void 0 : loaderVersion,
      instanceName: createInstance ? instanceName || `Minecraft ${selected.id}` : void 0,
      createInstance
    };
    try {
      const created = await window.bamboo.installGame(options);
      setJob(created);
      addToast({
        kind: "info",
        title: "开始种下新世界",
        message: `${selected.id}${loader !== "vanilla" ? ` · ${loaderLabel({ type: loader })}` : ""} 正在安装，进度可在右下角查看。`
      });
    } catch (err) {
      addToast({ kind: "error", title: "无法开始安装", message: messageOf(err) });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page downloads-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "PLANT A NEW WORLD",
        title: "下载",
        subtitle: "从原版核心到模组加载器，一次种好，直接出发。",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "download-source-switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "source-label", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { size: 14 }),
              " 下载源"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Segmented,
              {
                size: "small",
                value: source,
                onChange: (value) => void updateSettings({ downloadSource: value }),
                options: [
                  { value: "official", label: "官方" },
                  { value: "bmclapi", label: "BMCLAPI" }
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost", type: "button", onClick: () => void loadVersions(true), disabled: refreshing, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15, className: refreshing ? "spin" : "" }),
            " 刷新"
          ] })
        ] })
      }
    ),
    source === "bmclapi" && /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 17 }), title: "已切换到 BMCLAPI 镜像", children: "中国大陆网络通常会更快；如果镜像缺少文件，会自动回退到官方源。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "download-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "version-browser glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "version-browser-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "VERSION LIBRARY" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "游戏版本" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "green", children: [
            versions.filter((v) => v.installed).length,
            " 个已安装"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "version-toolbar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                placeholder: "搜索版本号，例如 1.20.1",
                value: search,
                onChange: (event) => setSearch(event.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Segmented,
            {
              size: "small",
              value: filter,
              onChange: (value) => {
                setFilter(value);
                setShowAll(false);
              },
              options: [
                { value: "release", label: "正式版" },
                { value: "snapshot", label: "快照" },
                { value: "all", label: "全部" }
              ]
            }
          )
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "version-loading", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 24 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "正在读取 Mojang 版本清单…" })
        ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          InlineNotice,
          {
            tone: "danger",
            title: "版本清单获取失败",
            action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost small", type: "button", onClick: () => void loadVersions(), children: "重试" }),
            children: error
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "version-list", children: shown.map((version) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `version-row ${selected?.id === version.id ? "selected" : ""}`,
              onClick: () => setSelected(version),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `version-type-mark ${version.type}`, children: version.type === "release" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 15 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "version-row-main", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                    version.id,
                    version.id === latestRelease?.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "green", children: "最新" }),
                    version.installed && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "blue", children: "已安装" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                    formatDate(Date.parse(version.releaseTime)),
                    " 发布"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "version-type-label", children: version.type === "release" ? "正式版" : version.type === "snapshot" ? "快照" : "远古版本" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "version-radio", children: selected?.id === version.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13 }) })
              ]
            },
            version.id
          )) }),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "version-empty", children: "没有匹配的版本，换个关键词试试。" }),
          filtered.length > 80 && !showAll && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "version-show-more", type: "button", onClick: () => setShowAll(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 15 }),
            " 显示全部 ",
            filtered.length,
            " 个版本"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "install-panel glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "install-panel-glow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "install-panel-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "INSTALLATION" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "安装配置" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "选择加载器后，Bamboo 会自动处理依赖、Java 和实例目录。" })
        ] }),
        selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chosen-version", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `version-type-mark large ${selected.type}`, children: selected.type === "release" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "准备安装" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                "Minecraft ",
                selected.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                selected.type === "release" ? "正式版" : "快照",
                " · ",
                formatDate(Date.parse(selected.releaseTime))
              ] })
            ] }),
            selected.installed && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "blue", children: "已有文件" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "实例名称" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input",
                value: instanceName,
                placeholder: `Minecraft ${selected.id}`,
                disabled: !createInstance,
                onChange: (event) => setInstanceName(event.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "模组加载器" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader-grid", children: LOADERS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: `loader-option ${loader === item.type ? "active" : ""}`,
                onClick: () => setLoader(item.type),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `loader-sigil ${loaderTone({ type: item.type })}`, children: item.short }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: item.type === "vanilla" ? "原版" : loaderLabel({ type: item.type }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: item.hint })
                  ] })
                ]
              },
              item.type
            )) })
          ] }),
          loader !== "vanilla" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field loader-version-field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              loaderLabel({ type: loader }),
              " 版本",
              loaderLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 12 })
            ] }),
            loaderError ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "warning", title: "无法读取加载器版本", children: loaderError }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "select",
                value: loaderVersion,
                disabled: loaderLoading,
                onChange: (event) => setLoaderVersion(event.target.value),
                children: [
                  loaderLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "正在获取版本…" }),
                  !loaderLoading && !loaderVersions.length && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "没有可用版本" }),
                  loaderVersions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: item.version, children: item.label }, item.version))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `switch-row install-create-switch ${createInstance ? "on" : ""}`,
              onClick: () => setCreateInstance(!createInstance),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "自动创建实例" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "安装完成后直接出现在「实例」里。" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `fake-checkbox ${createInstance ? "checked" : ""}`, children: createInstance && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13 }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "install-checks", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
              " Java 自动匹配"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
              " 共享资源库"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
              " 失败自动重试"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary install-button", type: "button", disabled: !canInstall, onClick: () => void install(), children: activeJob?.status === "running" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 17, className: "spin" }),
            " 正在安装…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HardDriveDownload, { size: 17 }),
            " 安装",
            loader !== "vanilla" ? ` · ${loaderLabel({ type: loader })}` : "",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
          ] }) }),
          activeJob && activeJob.status === "running" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "install-progress-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "install-progress-head", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activeJob.detail }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: activeJob.indeterminate ? "···" : `${Math.round(activeJob.progress)}%` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: activeJob.progress, indeterminate: activeJob.indeterminate }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "安装过程可以离开本页，进度会一直保留在右下角。" })
          ] }),
          activeJob?.status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "install-success", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "install-success-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "新世界已经种好" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "实例已创建，可以直接启动。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-soft small", type: "button", onClick: () => setPage("instances"), children: "去实例" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "install-location", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 13 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { title: bootstrap?.dataRoot, children: [
              "数据目录 · ",
              bootstrap?.dataRoot
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => void window.bamboo.openDataFolder(), children: "打开" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "install-placeholder", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { size: 30 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "从左侧选择一个版本" })
        ] })
      ] })
    ] })
  ] });
}
function ModsPage() {
  const bootstrap = useBamboo((s) => s.bootstrap);
  const setPage = useBamboo((s) => s.setPage);
  const setActiveInstance = useBamboo((s) => s.setActiveInstance);
  const addToast = useBamboo((s) => s.addToast);
  const jobs = useBamboo((s) => s.jobs);
  const instance = useActiveInstance();
  const [tab, setTab] = reactExports.useState("discover");
  const [platform, setPlatform] = reactExports.useState("modrinth");
  const [query, setQuery] = reactExports.useState("");
  const debouncedQuery = useDebouncedValue(query, 500);
  const [projects, setProjects] = reactExports.useState([]);
  const [total, setTotal] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(false);
  const [loadingMore, setLoadingMore] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [needsApiKey, setNeedsApiKey] = reactExports.useState(false);
  const [offset, setOffset] = reactExports.useState(0);
  const [selectedProject, setSelectedProject] = reactExports.useState(null);
  const [installed, setInstalled] = reactExports.useState([]);
  const [installedLoading, setInstalledLoading] = reactExports.useState(false);
  const [installedQuery, setInstalledQuery] = reactExports.useState("");
  const [toggling, setToggling] = reactExports.useState(null);
  const requestId = reactExports.useRef(0);
  const lastModJob = reactExports.useRef(0);
  const hasKey = bootstrap?.hasCurseForgeKey;
  instance?.loader.type ?? "vanilla";
  reactExports.useEffect(() => {
    if (!instance) return;
    void loadInstalled();
  }, [instance?.id]);
  reactExports.useEffect(() => {
    if (!instance) return;
    void runSearch(true);
  }, [instance?.id, instance?.mcVersion, platform, debouncedQuery]);
  reactExports.useEffect(() => {
    const recent = Object.values(jobs).filter((job) => job.kind === "mod" && job.status === "success").sort((a, b) => (b.finishedAt ?? 0) - (a.finishedAt ?? 0))[0];
    if (recent?.finishedAt && recent.finishedAt > lastModJob.current) {
      lastModJob.current = recent.finishedAt;
      if (instance) void loadInstalled();
    }
  }, [jobs, instance?.id]);
  async function loadInstalled() {
    if (!instance) return;
    setInstalledLoading(true);
    try {
      setInstalled(await window.bamboo.getInstalledMods(instance.id));
    } catch (error2) {
      addToast({ kind: "error", title: "读取模组失败", message: messageOf(error2) });
    } finally {
      setInstalledLoading(false);
    }
  }
  async function runSearch(reset) {
    if (!instance) return;
    const id = ++requestId.current;
    if (reset) {
      setLoading(true);
      setError(null);
      setNeedsApiKey(false);
    } else {
      setLoadingMore(true);
    }
    const currentOffset = reset ? 0 : offset;
    try {
      const result = await window.bamboo.searchProjects({
        query: debouncedQuery,
        platform,
        projectType: "mod",
        loader: instance.loader.type,
        gameVersion: instance.mcVersion ?? void 0,
        offset: currentOffset,
        limit: 20
      });
      if (id !== requestId.current) return;
      applyResult(result, reset);
    } catch (err) {
      if (id !== requestId.current) return;
      setError(messageOf(err));
    } finally {
      if (id === requestId.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }
  function applyResult(result, reset) {
    setProjects((current) => reset ? result.projects : [...current, ...result.projects]);
    setTotal(result.total);
    setOffset((reset ? 0 : offset) + result.projects.length);
    setError(result.error ?? null);
    setNeedsApiKey(Boolean(result.needsApiKey));
  }
  async function toggleMod(mod) {
    if (!instance) return;
    setToggling(mod.fileName);
    try {
      setInstalled(await window.bamboo.setModEnabled(instance.id, mod.fileName, !mod.enabled));
    } catch (error2) {
      addToast({ kind: "error", title: "切换模组失败", message: messageOf(error2) });
    } finally {
      setToggling(null);
    }
  }
  async function removeMod(mod) {
    if (!instance) return;
    try {
      setInstalled(await window.bamboo.deleteMod(instance.id, mod.fileName));
      addToast({ kind: "success", title: "模组已移除", message: `${mod.name} 已从实例中删除。` });
    } catch (error2) {
      addToast({ kind: "error", title: "删除失败", message: messageOf(error2) });
    }
  }
  const filteredInstalled = reactExports.useMemo(() => {
    const normalized = installedQuery.toLowerCase().trim();
    if (!normalized) return installed;
    return installed.filter(
      (mod) => mod.name.toLowerCase().includes(normalized) || mod.fileName.toLowerCase().includes(normalized) || mod.modId.toLowerCase().includes(normalized)
    );
  }, [installed, installedQuery]);
  if (!instance) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "模组", subtitle: "先有一片属于自己的竹林，再种下模组。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card empty-page-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 32 }),
          title: "还没有可以种模组的实例",
          description: "安装一个带 Forge、Fabric 或其他加载器的实例，然后再回来。",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", onClick: () => setPage("downloads"), children: "去创建实例" })
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page mods-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "MOD GARDEN",
        title: "模组",
        subtitle: `为「${instance.name}」寻找新的枝叶 · ${instance.mcVersion} · ${loaderLabel(instance.loader)}`,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost", type: "button", onClick: () => void window.bamboo.openInstanceFolder(instance.id, "mods"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 15 }),
            " 打开 mods"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost", type: "button", onClick: () => void loadInstalled(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15 }),
            " 刷新"
          ] })
        ] })
      }
    ),
    instance.loader.type === "vanilla" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      InlineNotice,
      {
        tone: "warning",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 17 }),
        title: "当前实例是原版，无法加载模组",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-soft small", type: "button", onClick: () => setPage("instances"), children: "去安装加载器" }),
        children: "原版只能安装资源包与光影。要使用 Mod，请先在「实例 → 安装加载器」中选择 Fabric、Forge 等加载器。"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mods-toolbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "instance-scope", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `scope-dot ${loaderTone(instance.loader)}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "正在装饰" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: instance.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            className: "scope-select",
            value: instance.id,
            onChange: (event) => void setActiveInstance(event.target.value),
            "aria-label": "切换实例",
            children: (bootstrap?.instances ?? []).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: item.id, children: item.name }, item.id))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Segmented,
        {
          value: tab,
          onChange: setTab,
          options: [
            { value: "discover", label: "发现模组", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14 }) },
            { value: "installed", label: `已安装 ${installed.length}`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { size: 14 }) }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mod-filters", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "green", children: [
          "MC ",
          instance.mcVersion
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "blue", children: loaderLabel(instance.loader) })
      ] })
    ] }),
    tab === "discover" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "discover-toolbar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-field mod-search", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: query,
              onChange: (event) => {
                setQuery(event.target.value);
                setOffset(0);
              },
              placeholder: "搜索模组、作者或功能，例如 sodium、地图…"
            }
          ),
          query && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setQuery(""), children: "清除" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Segmented,
          {
            value: platform,
            onChange: (value) => {
              setPlatform(value);
              setOffset(0);
            },
            options: [
              { value: "modrinth", label: "Modrinth" },
              { value: "curseforge", label: "CurseForge" }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-button soft", type: "button", onClick: () => void runSearch(true), title: "刷新搜索", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16, className: loading ? "spin" : "" }) })
      ] }),
      platform === "curseforge" && !hasKey && /* @__PURE__ */ jsxRuntimeExports.jsx(
        InlineNotice,
        {
          tone: "warning",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 18 }),
          title: "CurseForge 需要 API Key",
          action: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-soft small", type: "button", onClick: () => setPage("settings"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 14 }),
            " 去接入"
          ] }),
          children: "CurseForge 不提供匿名公开 API。Bamboo 已准备好接入逻辑，只需在设置里填入你自己的 CurseForge API Key。现在仍可使用无需密钥的 Modrinth。"
        }
      ),
      needsApiKey && platform === "curseforge" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        InlineNotice,
        {
          tone: "warning",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 18 }),
          title: "还没有配置密钥",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-soft small", type: "button", onClick: () => setPage("settings"), children: "前往设置" }),
          children: "配置后即可搜索、下载和安装 CurseForge 的 Mod。"
        }
      ),
      error && !needsApiKey && /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "danger", title: "搜索没有完成", action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost small", type: "button", onClick: () => void runSearch(true), children: "重试" }), children: error }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "project-grid", children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project-card skeleton", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "skeleton-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skeleton-lines", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
        ] })
      ] }, index)) }) : projects.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "project-grid", children: projects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "project-card",
            onClick: () => setSelectedProject(project),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project-card-top", children: [
                project.iconUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "project-icon", src: project.iconUrl, alt: "", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "project-icon placeholder", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 20 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project-title", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: project.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 11 }),
                    " ",
                    project.author || "未知作者"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "project-arrow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15 }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "project-summary", children: project.summary || "这个模组还没有写下简介。" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project-card-foot", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 12 }),
                  " ",
                  formatNumber(project.downloads)
                ] }),
                project.categories.slice(0, 2).map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "project-tag", children: category }, category)),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `platform-chip ${project.platform}`, children: project.platform === "modrinth" ? "Modrinth" : "CurseForge" })
              ] })
            ]
          },
          `${project.platform}:${project.id}`
        )) }),
        projects.length < total && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "load-more-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", type: "button", disabled: loadingMore, onClick: () => void runSearch(false), children: loadingMore ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 15 }),
            " 正在生长…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "加载更多 ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            projects.length,
            " / ",
            total
          ] })
        ] })
      ] }) : !error && !needsApiKey && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card empty-page-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { size: 30 }),
          title: query ? "没有找到这枚种子" : "试试搜索一个模组",
          description: query ? "换一个关键词，或确认实例的游戏版本/加载器。" : "例如 Sodium、JEI、Create、Iris，都会在这里找到。"
        }
      ) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "installed-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "installed-toolbar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: installedQuery, onChange: (e) => setInstalledQuery(e.target.value), placeholder: "在已安装模组里查找…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "installed-count", children: [
          installed.filter((m) => m.enabled).length,
          " 启用 · ",
          installed.filter((m) => !m.enabled).length,
          " 禁用"
        ] })
      ] }),
      installedLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mods-loading", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
        " 正在读取模组…"
      ] }) : filteredInstalled.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "installed-list glass-card", children: filteredInstalled.map((mod) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "installed-row", children: [
        mod.iconDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: mod.iconDataUrl, alt: "", className: "installed-icon" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "installed-icon placeholder", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 19 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "installed-copy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "installed-name", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: mod.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "installed-version", children: mod.version || "未知版本" }),
            mod.loaderHint !== "unknown" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "neutral", children: mod.loaderHint })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: mod.description || mod.fileName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "installed-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Toggle,
            {
              checked: mod.enabled,
              disabled: toggling === mod.fileName,
              onChange: () => void toggleMod(mod),
              label: mod.enabled ? "禁用模组" : "启用模组"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-button danger-hover", type: "button", onClick: () => void removeMod(mod), title: "删除模组", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15 }) })
        ] })
      ] }, mod.fileName)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card empty-page-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 30 }),
          title: installedQuery ? "没有匹配的已安装模组" : "这片林子还没有模组",
          description: "去发现页挑选，或把 .jar 文件直接拖进 Bamboo。",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", onClick: () => setTab("discover"), children: "去发现" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectDetailModal,
      {
        project: selectedProject,
        instance,
        hasCurseForgeKey: Boolean(hasKey),
        onClose: () => setSelectedProject(null),
        onOpenSettings: () => {
          setSelectedProject(null);
          setPage("settings");
        },
        onInstalled: () => void loadInstalled()
      }
    )
  ] });
}
function ProjectDetailModal({
  project,
  instance,
  hasCurseForgeKey,
  onClose,
  onOpenSettings,
  onInstalled
}) {
  const addToast = useBamboo((s) => s.addToast);
  const [versions, setVersions] = reactExports.useState([]);
  const [versionId, setVersionId] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [installDependencies, setInstallDependencies] = reactExports.useState(true);
  const [installing, setInstalling] = reactExports.useState(false);
  const [job, setJob] = reactExports.useState(null);
  const jobs = useBamboo((s) => s.jobs);
  const activeJob = job ? jobs[job.id] ?? job : null;
  reactExports.useEffect(() => {
    if (!project) return;
    if (project.platform === "curseforge" && !hasCurseForgeKey) {
      setVersions([]);
      setError("CURSEFORGE_API_KEY_REQUIRED");
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    setVersions([]);
    setVersionId("");
    setJob(null);
    setInstalling(false);
    window.bamboo.getProjectVersions(project.platform, project.id, instance.mcVersion ?? "", instance.loader.type).then((list) => {
      if (cancelled) return;
      setVersions(list);
      setVersionId(list[0]?.id ?? "");
    }).catch((err) => !cancelled && setError(messageOf(err))).finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [project?.id, project?.platform, hasCurseForgeKey, instance.mcVersion, instance.loader.type]);
  reactExports.useEffect(() => {
    if (activeJob?.status === "success") {
      onInstalled();
    }
  }, [activeJob?.status]);
  async function install() {
    if (!project || !versionId) return;
    setInstalling(true);
    try {
      const created = await window.bamboo.installProject({
        instanceId: instance.id,
        platform: project.platform,
        projectId: project.id,
        projectName: project.name,
        versionId,
        installDependencies
      });
      setJob(created);
    } catch (err) {
      addToast({ kind: "error", title: "安装失败", message: messageOf(err) });
    } finally {
      setInstalling(false);
    }
  }
  const version = versions.find((v) => v.id === versionId);
  const needsLoader = instance.loader.type === "vanilla";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open: Boolean(project),
      onClose,
      width: 720,
      title: project ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mod-modal-title", children: [
        project.iconUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: project.iconUrl, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mod-modal-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 20 }) }),
        project.name
      ] }) : "",
      subtitle: project ? `${project.platform === "modrinth" ? "Modrinth" : "CurseForge"} · ${project.author}` : "",
      footer: project ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", type: "button", onClick: onClose, children: "关闭" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-primary",
            type: "button",
            disabled: !versionId || installing || activeJob?.status === "running" || needsLoader,
            onClick: () => void install(),
            title: needsLoader ? "请先为实例安装模组加载器" : void 0,
            children: needsLoader ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 15 }),
              " 需要加载器"
            ] }) : activeJob?.status === "running" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "spin" }),
              " ",
              activeJob.detail
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 15 }),
              " 安装到当前实例"
            ] })
          }
        )
      ] }) : void 0,
      children: project && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mod-detail", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mod-detail-summary", children: project.summary || "这个项目还没有简介。" }),
        needsLoader && /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "warning", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 15 }), title: "当前实例为原版", children: "安装加载器后才能启用 Mod。你可以先关闭此窗口，在实例页一键安装 Fabric、Forge 等加载器。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mod-detail-meta", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
            " ",
            formatNumber(project.downloads),
            " 次下载"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13 }),
            " ",
            formatNumber(project.follows),
            " 收藏"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "green", children: [
            "MC ",
            instance.mcVersion
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "blue", children: loaderLabel(instance.loader) })
        ] }),
        project.categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mod-categories", children: project.categories.slice(0, 8).map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: category }, category)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mod-install-box", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mod-install-box-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "CHOOSE A VERSION" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-button small", type: "button", onClick: () => project.websiteUrl && void window.bamboo.openExternal(project.websiteUrl), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 13 }),
              " 项目主页"
            ] })
          ] }),
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mods-loading", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
            " 正在寻找适配的版本…"
          ] }) : error === "CURSEFORGE_API_KEY_REQUIRED" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            InlineNotice,
            {
              tone: "warning",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 17 }),
              title: "需要 CurseForge API Key",
              action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-soft small", type: "button", onClick: onOpenSettings, children: "去设置" }),
              children: "这个项目来自 CurseForge，配置密钥后才能读取文件。"
            }
          ) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "danger", title: "读取版本失败", children: error }) : versions.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "文件版本" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "select", value: versionId, onChange: (event) => setVersionId(event.target.value), children: versions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: item.id, children: [
                item.versionNumber,
                " · ",
                item.fileName
              ] }, item.id)) })
            ] }),
            version?.changelog && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "changelog", children: version.changelog.slice(0, 500) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "switch-row file-deps-row", onClick: () => setInstallDependencies(!installDependencies), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "自动安装必需前置" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bamboo 会递归解析并安装必需依赖，降低手动找 Mod 的负担。" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `fake-checkbox ${installDependencies ? "checked" : ""}`, children: installDependencies && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13 }) })
            ] }),
            version?.dependencies.filter((d) => d.dependencyType === "required").length ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dependency-hint", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 13 }),
              "此版本声明了 ",
              version.dependencies.filter((d) => d.dependencyType === "required").length,
              " 个必需依赖"
            ] }) : null
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { compact: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { size: 22 }), title: "没有适配版本", description: "这个模组可能不支持当前游戏版本或加载器。" }),
          activeJob?.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "danger", title: "安装没有完成", children: activeJob.error }),
          activeJob?.status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "success", title: "已经种进实例", children: activeJob.meta?.fileName ? String(activeJob.meta.fileName) : "模组文件已安装。" })
        ] })
      ] })
    }
  );
}
function ModpacksPage() {
  const bootstrap = useBamboo((s) => s.bootstrap);
  const addToast = useBamboo((s) => s.addToast);
  const jobs = useBamboo((s) => s.jobs);
  const setPage = useBamboo((s) => s.setPage);
  const refresh = useBamboo((s) => s.refresh);
  const [inspecting, setInspecting] = reactExports.useState(false);
  const [info, setInfo] = reactExports.useState(null);
  const [name, setName] = reactExports.useState("");
  const [installing, setInstalling] = reactExports.useState(false);
  const [job, setJob] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const activeJob = job ? jobs[job.id] ?? job : null;
  const packs = (bootstrap?.instances ?? []).filter(
    (instance) => instance.notes?.includes("整合包") || instance.icon?.startsWith("data:")
  );
  reactExports.useEffect(() => {
    if (activeJob?.status === "success") void refresh();
  }, [activeJob?.status]);
  async function choosePack() {
    setError(null);
    setInspecting(true);
    try {
      const file = await window.bamboo.chooseFile([
        { name: "Minecraft 整合包", extensions: ["mrpack", "zip"] }
      ]);
      if (!file) return;
      const result = await window.bamboo.inspectModpack(file);
      setInfo(result);
      setName(result.name);
    } catch (err) {
      setError(messageOf(err));
      addToast({ kind: "error", title: "无法识别整合包", message: messageOf(err) });
    } finally {
      setInspecting(false);
    }
  }
  async function install() {
    if (!info) return;
    setInstalling(true);
    setError(null);
    try {
      const created = await window.bamboo.installModpack(info.path, name);
      setJob(created);
      setInfo(null);
      addToast({
        kind: "info",
        title: "整合包开始生长",
        message: "Bamboo 会自动安装游戏核心、加载器、模组与配置。"
      });
    } catch (err) {
      setError(messageOf(err));
      addToast({ kind: "error", title: "安装没有开始", message: messageOf(err) });
    } finally {
      setInstalling(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page modpacks-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "A WHOLE FOREST",
        title: "整合包",
        subtitle: "把别人的整片森林搬回家。拖入文件，剩下的交给竹林。",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", onClick: () => void choosePack(), disabled: inspecting, children: inspecting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 15 }),
          " 正在识别"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
          " 选择整合包"
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "modpack-drop-hero glass-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modpack-drop-art", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { size: 64, strokeWidth: 1.1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "modpack-art-leaf l1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 21 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "modpack-art-leaf l2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 15 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "modpack-art-leaf l3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 17 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modpack-drop-copy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-kicker", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { size: 13 }),
          " DROP A FOREST"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "拖入整合包" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "支持 Modrinth、CurseForge、MultiMC / Prism，自动创建独立实例。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modpack-format-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "format-dot modrinth" }),
            " Modrinth"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "format-dot curseforge" }),
            " CurseForge"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "format-dot multimc" }),
            " MultiMC / Prism"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modpack-drop-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-soft", type: "button", onClick: () => void choosePack(), disabled: inspecting, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 15 }),
            " 从文件选择"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "或把 .zip / .mrpack 拖进窗口" })
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "danger", title: "这次没有种成功", children: error }),
    job && activeJob && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "modpack-install-progress glass-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-leaf", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-copy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: activeJob.status === "error" ? "安装中断" : activeJob.status === "success" ? "安装完成" : "正在安装" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activeJob.detail }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: activeJob.progress, indeterminate: activeJob.indeterminate, tone: activeJob.status === "error" ? "danger" : "bamboo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "progress-number", children: activeJob.indeterminate ? "···" : `${Math.round(activeJob.progress)}%` }),
      activeJob.status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-soft small", type: "button", onClick: () => setPage("instances"), children: [
        "查看实例 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modpack-info-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-tile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-tile-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileArchive, { size: 19 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "一键还原配置" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "整合包内的 config、资源包、光影与默认设置会一并放入新实例。" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-tile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-tile-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { size: 19 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "独立实例" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "每个整合包拥有自己的存档与 mods，不会污染其他世界。" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-tile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-tile-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 19 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "自动补齐" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "自动安装声明的加载器与核心；缺失文件会列出，不静默失败。" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "packed-worlds", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "PACKED GROVES" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "从整合包长出的世界" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-button", type: "button", onClick: () => setPage("instances"), children: [
          "管理实例 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
        ] })
      ] }),
      packs.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pack-grid", children: packs.map((pack) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "pack-card glass-card", onClick: () => setPage("instances"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InstanceGlyph, { icon: pack.icon, size: 48 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "pack-copy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: pack.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
            "Minecraft ",
            pack.mcVersion,
            " · ",
            loaderLabel(pack.loader)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "pack-foot", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `loader-badge ${loaderTone(pack.loader)}`, children: loaderLabel(pack.loader) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: timeAgo(pack.lastPlayedAt) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15, className: "pack-arrow" })
      ] }, pack.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card empty-page-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { size: 30 }),
          title: "还没有从整合包长出的实例",
          description: "拖一个整合包进来，Bamboo 会替你把土翻好。"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: Boolean(info),
        onClose: () => setInfo(null),
        title: "整合包已识别",
        subtitle: "确认一下，再把它种进竹林。",
        width: 620,
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", type: "button", onClick: () => setInfo(null), children: "取消" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", disabled: installing || activeJob?.status === "running", onClick: () => void install(), children: installing ? "正在开始…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { size: 15 }),
            " 安装整合包"
          ] }) })
        ] }),
        children: info && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pack-review", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pack-review-head", children: [
            info.iconDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: info.iconDataUrl, alt: "", className: "pack-review-icon" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pack-review-icon placeholder", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { size: 26 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: info.format === "modrinth" ? "green" : info.format === "curseforge" ? "amber" : "blue", children: info.format === "modrinth" ? "Modrinth" : info.format === "curseforge" ? "CurseForge" : "MultiMC / Prism" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: info.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: info.summary || "整合包" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-grid two", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "新实例名称" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input", value: name, onChange: (event) => setName(event.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "将自动准备" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pack-facts", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                  " MC ",
                  info.mcVersion ?? "未知"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                  " ",
                  loaderLabel(info.loader)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                  " ",
                  info.modCount,
                  " 个文件"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: info.format === "curseforge" && !bootstrap?.hasCurseForgeKey ? "warning" : "info", children: info.format === "curseforge" && !bootstrap?.hasCurseForgeKey ? "这个 CurseForge 整合包需要 API Key 才能自动下载模组。你仍可以先安装核心与 overrides，缺失的模组可在稍后补齐。" : "安装会创建新的独立实例。现有存档与实例不会被修改。" })
        ] })
      }
    )
  ] });
}
function MultiplayerPage() {
  useBamboo((s) => s.bootstrap);
  const storeWorlds = useBamboo((s) => s.lanWorlds);
  const setLanWorlds = useBamboo((s) => s.setLanWorlds);
  const addToast = useBamboo((s) => s.addToast);
  useBamboo((s) => s.bootstrap?.accounts.find((a) => a.id === s.bootstrap?.activeAccountId));
  const instance = useActiveInstance();
  const [info, setInfo] = reactExports.useState(null);
  const [port, setPort] = reactExports.useState("25565");
  const [loading, setLoading] = reactExports.useState(true);
  const [scanning, setScanning] = reactExports.useState(false);
  const [mapping, setMapping] = reactExports.useState(false);
  const [mapped, setMapped] = reactExports.useState(false);
  const [mapMessage, setMapMessage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void refresh();
  }, []);
  reactExports.useEffect(() => {
    if (storeWorlds.length) {
      setPort(String(storeWorlds[0].port));
      setInfo(
        (current) => current ? {
          ...current,
          port: storeWorlds[0].port,
          worlds: mergeWorlds(storeWorlds, current.worlds)
        } : current
      );
    }
  }, [storeWorlds]);
  async function refresh() {
    setLoading(true);
    try {
      const network = await window.bamboo.getNetworkInfo(Number(port) || null);
      setInfo(network);
      if (network.worlds?.length) {
        setLanWorlds(network.worlds);
        setPort(String(network.worlds[0].port));
      }
    } catch (error) {
      addToast({ kind: "error", title: "读取网络信息失败", message: messageOf(error) });
    } finally {
      setLoading(false);
    }
  }
  async function scan() {
    setScanning(true);
    try {
      const worlds2 = await window.bamboo.discoverLanWorlds();
      setLanWorlds(worlds2);
      if (worlds2.length) {
        setPort(String(worlds2[0].port));
        addToast({ kind: "success", title: "发现局域网世界", message: `共找到 ${worlds2.length} 个，端口 ${worlds2[0].port}。` });
      } else {
        addToast({ kind: "info", title: "暂时没有发现", message: "请先在游戏的暂停菜单选择「对局域网开放」，再扫描一次。" });
      }
      setInfo(await window.bamboo.getNetworkInfo(worlds2[0]?.port ?? (Number(port) || null)));
    } catch (error) {
      addToast({ kind: "error", title: "扫描失败", message: messageOf(error) });
    } finally {
      setScanning(false);
    }
  }
  async function mapPort() {
    if (!port) return;
    setMapping(true);
    setMapMessage(null);
    try {
      const next = await window.bamboo.mapPort(Number(port));
      setInfo(next);
      setMapped(true);
      setMapMessage(next.upnpMessage ?? "端口映射成功。");
      addToast({ kind: "success", title: "端口已映射", message: next.upnpMessage });
    } catch (error) {
      const message = messageOf(error);
      setMapMessage(message);
      addToast({ kind: "warning", title: "路由器没有回应", message });
    } finally {
      setMapping(false);
    }
  }
  async function unmap() {
    try {
      await window.bamboo.unmapPort(Number(port));
      setMapped(false);
      setMapMessage("已移除 UPnP 映射。");
    } catch (error) {
      addToast({ kind: "error", title: "移除映射失败", message: messageOf(error) });
    }
  }
  function copy(text, label) {
    void window.bamboo.copyText(text);
    addToast({ kind: "success", title: "已复制", message: label });
  }
  const worlds = mergeWorlds(storeWorlds, info?.worlds ?? []);
  const primary = info?.primaryIp;
  const external = info?.externalIp;
  const address = primary ? `${primary}:${port}` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page multiplayer-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "LAN & FRIENDS",
        title: "联机",
        subtitle: "同一个屋檐下，或隔着一条网线，一起回到那片森林。",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost", type: "button", onClick: () => void refresh(), disabled: loading, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15, className: loading ? "spin" : "" }),
            " 刷新"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary", type: "button", onClick: () => void scan(), disabled: scanning, children: [
            scanning ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 16 }),
            "扫描局域网"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lan-hero glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-radar", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "radar-ring r1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "radar-ring r2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "radar-ring r3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "radar-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RadioTower, { size: 26 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-hero-copy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hero-kicker", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LeafIcon, {}),
            " SAME FOREST, SAME WORLD"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "世界已经打开" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "在游戏内选择「对局域网开放」，Bamboo 会自动识别端口。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-steps", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1" }),
              "打开游戏世界"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2" }),
              "对局域网开放"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3" }),
              "分享地址"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-hero-actions", children: [
            instance ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-soft", type: "button", onClick: () => void window.bamboo.launch(instance.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 15, fill: "currentColor" }),
              " 启动 ",
              instance.name
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: "还没有可以启动的实例。" }),
            instance && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "lan-target", children: [
              "目标实例 · ",
              loaderLabel(instance.loader),
              " · ",
              instance.mcVersion
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lan-address-card glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-card-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "YOUR ADDRESS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: worlds.length ? "green" : "neutral", children: worlds.length ? "局域网已发现" : "等待世界开放" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "address-display", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "内网地址" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: address || "尚未检测到端口" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
            info?.hostname ?? "本机",
            " · ",
            info?.localIps.length ?? 0,
            " 个网络接口"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-field-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field grow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "局域网端口" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "input mono", value: port, onChange: (event) => setPort(event.target.value.replace(/\D/g, "").slice(0, 5)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-button soft address-copy", type: "button", disabled: !address, onClick: () => copy(address, "内网地址已复制"), title: "复制地址", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 16 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-ip-list", children: [
          info?.localIps.map((ip) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => copy(`${ip}:${port}`, `${ip}:${port} 已复制`), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { size: 12 }),
            " ",
            ip,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 11 })
          ] }, ip)),
          !info?.localIps.length && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "没有检测到可用的 IPv4 地址。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-map-block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-map-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Router, { size: 14 }),
              " 路由器端口映射"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: mapped ? "green" : "amber", children: mapped ? "已开启" : "未开启" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "开启 UPnP 后，Bamboo 会尝试把 TCP 端口映射到公网，让外网朋友也能加入。需要路由器支持并启用 UPnP。" }),
          mapped && external && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "public-address", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              external,
              ":",
              port
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => copy(`${external}:${port}`, "公网地址已复制"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 }) })
          ] }),
          mapMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `map-message ${mapped ? "success" : "warning"}`, children: [
            mapped ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 13 }),
            " ",
            mapMessage
          ] }),
          mapped ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost small", type: "button", onClick: () => void unmap(), children: "移除映射" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-soft small", type: "button", disabled: mapping || !port, onClick: () => void mapPort(), children: [
            mapping ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { size: 14 }),
            "尝试开启 UPnP"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "neutral", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 15 }), children: "公网可达性取决于路由器与运营商网络。Bamboo 不会把你的世界上传到第三方中继。" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lan-worlds", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "NEARBY WORLDS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "附近的竹林" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted tiny", children: "Minecraft LAN 广播 · 224.0.2.60" })
      ] }),
      worlds.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lan-world-grid", children: worlds.map((world) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-world-card glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lan-world-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 19 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-world-copy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: world.motd }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            world.address,
            ":",
            world.port
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: world.source === "broadcast" ? "由局域网广播发现" : "从游戏日志自动识别" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "btn btn-soft small",
            type: "button",
            onClick: () => copy(`${world.address}:${world.port}`, "世界地址已复制"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 13 }),
              " 复制"
            ]
          }
        )
      ] }, `${world.address}:${world.port}`)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card empty-page-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { size: 30 }),
          title: "附近还没有发现世界",
          description: "让朋友在游戏里对局域网开放世界，然后点击右上角「扫描局域网」。也可以手动分享你的 IP 和端口。",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-soft", type: "button", onClick: () => void scan(), disabled: scanning, children: "再扫描一次" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lan-notes-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-tile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-tile-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "同 Wi-Fi 最稳" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "优先尝试内网地址；它不需要经过路由器映射，延迟最低。" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-tile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-tile-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Router, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "不同网络？" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "开启 UPnP 映射后再分享公网地址；若运营商使用 CGNAT，可能需要其他穿透方式。" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-tile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-tile-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "原版就能联机" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "双方游戏版本与加载器尽量一致；模组世界还需要朋友安装相同模组。" })
        ] })
      ] })
    ] })
  ] });
}
function mergeWorlds(a, b) {
  const map = /* @__PURE__ */ new Map();
  for (const world of [...a, ...b]) map.set(`${world.address}:${world.port}`, world);
  return Array.from(map.values()).sort((x, y) => y.lastSeen - x.lastSeen);
}
function LeafIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", width: "13", height: "13", fill: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 4C10 4 4 9 4 17c0 1 .2 2 .5 3C14 20 20 14 20 4Z", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 21c2-6 6-9 11-11", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function SkinsPage() {
  const bootstrap = useBamboo((s) => s.bootstrap);
  const setAccountModalOpen = useBamboo((s) => s.setAccountModalOpen);
  const setActiveAccount = useBamboo((s) => s.setActiveAccount);
  const setPage = useBamboo((s) => s.setPage);
  const addToast = useBamboo((s) => s.addToast);
  const active = useCurrentAccount();
  const [selectedId, setSelectedId] = reactExports.useState(active?.id ?? "");
  const [model, setModel] = reactExports.useState(active?.skin?.model ?? "classic");
  const [busy, setBusy] = reactExports.useState(false);
  const [skinVersion, setSkinVersion] = reactExports.useState(0);
  const accounts = bootstrap?.accounts ?? [];
  const selected = accounts.find((a) => a.id === selectedId) ?? active;
  reactExports.useEffect(() => {
    if (!selectedId && active?.id) setSelectedId(active.id);
  }, [active?.id, selectedId]);
  reactExports.useEffect(() => {
    if (selected) setModel(selected.skin?.model ?? "classic");
  }, [selected?.id, selected?.skin?.updatedAt]);
  async function upload() {
    if (!selected) return;
    if (selected.type === "microsoft") {
      addToast({ kind: "info", title: "正版皮肤由 Microsoft 管理", message: "请在 minecraft.net 更换正版皮肤；离线皮肤只对离线账户开放。" });
      return;
    }
    setBusy(true);
    try {
      const account = await window.bamboo.chooseAndUploadSkin(selected.id);
      if (account) {
        addToast({ kind: "success", title: "皮肤已种下", message: `${account.name} 将使用新的皮肤，下次启动生效。` });
        setSkinVersion((v) => v + 1);
        const bootstrapNext = await window.bamboo.bootstrap();
        useBamboo.setState({ bootstrap: bootstrapNext });
      }
    } catch (error) {
      addToast({ kind: "error", title: "皮肤没有换好", message: messageOf(error) });
    } finally {
      setBusy(false);
    }
  }
  async function saveModel(next) {
    if (!selected) return;
    setModel(next);
    if (selected.type === "microsoft" || !selected.skin) return;
    try {
      await window.bamboo.setSkinModel(selected.id, next);
      addToast({ kind: "success", title: "模型已切换", message: next === "slim" ? "已设置为 Alex 细手臂模型。" : "已设置为 Steve 经典模型。" });
      const bootstrapNext = await window.bamboo.bootstrap();
      useBamboo.setState({ bootstrap: bootstrapNext });
    } catch (error) {
      addToast({ kind: "error", title: "切换失败", message: messageOf(error) });
    }
  }
  async function activate(account) {
    setSelectedId(account.id);
    await setActiveAccount(account.id);
  }
  if (!accounts.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "YOUR SKIN", title: "皮肤", subtitle: "给离线世界的自己，换一件喜欢的衣服。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card empty-page-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shirt, { size: 32 }),
          title: "还没有旅行者",
          description: "添加一个离线账户，就可以上传 64×64 的 PNG 皮肤。",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", onClick: () => setAccountModalOpen(true), children: "添加账户" })
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page skins-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "YOUR SKIN",
        title: "皮肤",
        subtitle: "离线账户也能有自己的样子。上传 PNG，Bamboo 会在启动时把它带进游戏。",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost", type: "button", onClick: () => setAccountModalOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { size: 15 }),
          " 账户管理"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-account-strip", children: [
      accounts.map((account) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `skin-account-chip ${selected?.id === account.id ? "active" : ""}`,
          onClick: () => void activate(account),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SkinFace, { dataUrl: account.skin?.dataUrl, name: account.name, size: 34, round: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: account.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: account.type === "microsoft" ? "Microsoft" : "离线账户" })
            ] }),
            selected?.id === account.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 })
          ]
        },
        account.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "skin-account-add", onClick: () => setAccountModalOpen(true), children: "+ 新账户" })
    ] }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "skin-stage glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skin-stage-glow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-stage-top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "SKIN PREVIEW" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: selected.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              selected.type === "microsoft" ? "Microsoft 正版档案" : "离线漫游者",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dot-sep" }),
              selected.skin ? `更新于 ${timeAgo(selected.skin.updatedAt)}` : "默认外观"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: selected.type === "microsoft" ? "blue" : "green", children: selected.type === "microsoft" ? "正版在线" : "离线可定制" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-canvas-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SkinPreview,
            {
              dataUrl: selected.skin?.dataUrl,
              model,
              name: selected.name,
              width: 252,
              height: 340
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skin-canvas-bamboo", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 22 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skin-canvas-bamboo two", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 15 }) })
        ] }, `${selected.id}-${skinVersion}-${selected.skin?.updatedAt}`),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-stage-foot", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shirt, { size: 13 }),
            " ",
            model === "slim" ? "Alex · 细手臂" : "Steve · 经典"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13 }),
            " 64 × 64 PNG"
          ] }),
          selected.skin && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void window.bamboo.copyText(selected.skin?.dataUrl ?? ""), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 }),
            " 复制数据"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "skin-controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card skin-control-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-control-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "WARDROBE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "换一件衣服" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { size: 20 })
          ] }),
          selected.type === "microsoft" ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 17 }), title: "正版皮肤由 Microsoft 管理", children: "你的皮肤已经跟随正版档案自动同步。若要更换，请到 minecraft.net 的个人资料页修改，Bamboo 会在下次登录时更新预览。" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "skin-upload-zone", type: "button", onClick: () => void upload(), disabled: busy, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "skin-upload-icon", children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 22 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 22 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: busy ? "正在读取 PNG…" : "选择一张皮肤" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "支持 64×64 / 64×32 的 PNG，也可以直接拖进窗口" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-model-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "手臂模型" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "影响游戏内角色手臂的宽度。" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Segmented,
                {
                  size: "small",
                  value: model,
                  onChange: (value) => void saveModel(value),
                  options: [
                    { value: "classic", label: "经典" },
                    { value: "slim", label: "细手臂" }
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card skin-note-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skin-note-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "离线皮肤是怎么进入游戏的？" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "启动离线账户时，Bamboo 会启动一个仅监听本机的皮肤桥接服务，并临时挂载 authlib-injector，让游戏从本地读取你的皮肤。不会上传到第三方。" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-note-checks", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                " 仅本机访问"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                " 不改动游戏核心"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                " 可在实例设置中关闭"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-button small", type: "button", onClick: () => setPage("instances"), children: [
              "检查实例开关 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { size: 13 })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-tips glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "TIPS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "画一张适合竹林的皮肤" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "留下清晰的 8×8 面部，使用相近的绿色与米色；过于细碎的花纹在低分辨率下会消失。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skin-palette", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: "#92c98e" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: "#d7e9b1" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: "#264a35" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: "#e7ddc4" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: "#bb8e6a" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: "#0d1c14" } })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function StatsPage() {
  const addToast = useBamboo((s) => s.addToast);
  const setPage = useBamboo((s) => s.setPage);
  const bootstrap = useBamboo((s) => s.bootstrap);
  const [stats, setStats] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    void load();
  }, []);
  reactExports.useEffect(() => {
    void load();
  }, [bootstrap?.sessions.length, bootstrap?.instances.length]);
  async function load() {
    try {
      setStats(await window.bamboo.getStats());
    } catch (error) {
      addToast({ kind: "error", title: "读取统计失败", message: messageOf(error) });
    } finally {
      setLoading(false);
    }
  }
  const maxDay = Math.max(1, ...stats?.daily.map((d) => d.durationMs) ?? [0]);
  const total = stats?.totalPlayTimeMs ?? 0;
  const today = stats?.todayPlayTimeMs ?? 0;
  const week = stats?.weekPlayTimeMs ?? 0;
  const recent = stats?.sessions.slice(0, 8) ?? [];
  const totalHours = Math.floor(total / 36e5);
  const totalMinutes = Math.floor(total % 36e5 / 6e4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page stats-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "TIME WELL SPENT",
        title: "统计",
        subtitle: "不是浪费时间，是把时间种进了另一个世界。",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost", type: "button", onClick: () => void load(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 15 }),
          " 刷新数据"
        ] })
      }
    ),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-loading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 24 }),
      " 正在数竹叶…"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-hero-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "stats-total glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stats-total-glow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "ALL TIME" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-total-number", children: [
            totalHours > 0 ? totalHours : totalMinutes,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: totalHours > 0 ? "小时" : "分钟" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "在方块世界里度过的总时间" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-total-foot", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 13 }),
              " ",
              stats?.sessions.length ?? 0,
              " 次出发记录"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 13 }),
              " 最长一次 ",
              formatDuration(Math.max(0, ...stats?.sessions.map((s) => s.durationMs) ?? [0]), "short")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-metric-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-metric-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { size: 19 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-metric-label", children: "今天" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatDuration(today, "short") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: today > 0 ? "竹林今天很热闹。" : "今天还没有回去看看。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-metric-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-metric-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 19 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-metric-label", children: "最近 7 天" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatDuration(week, "short") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: week > 0 ? "稳定的竹风。" : "等待下一次出发。" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-chart-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-card stats-chart-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-heading compact", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "LAST 7 DAYS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "一周的竹影" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "chart-legend", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}),
              " 游玩时长"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stats-chart", children: (stats?.daily ?? []).map((day, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-chart-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stats-chart-value", children: day.durationMs > 0 ? formatDuration(day.durationMs, "short") : "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stats-chart-track", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `stats-chart-bar ${index === (stats?.daily.length ?? 1) - 1 ? "today" : ""}`,
                style: { height: `${Math.max(2, day.durationMs / maxDay * 100)}%` },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bar-leaf" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stats-chart-label", children: day.date.slice(5).replace("-", "/") })
          ] }, day.date)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-card stats-ranking", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-heading compact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "FAVORITE GROVES" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "最常去的地方" })
          ] }) }),
          stats?.byInstance.filter((i) => i.playTimeMs > 0).length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ranking-list", children: stats.byInstance.filter((i) => i.playTimeMs > 0).slice(0, 5).map((item, index) => {
            const instance = bootstrap?.instances.find((i) => i.id === item.instanceId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "ranking-row",
                onClick: () => {
                  void useBamboo.getState().setActiveInstance(item.instanceId);
                  setPage("instances");
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ranking-number", children: String(index + 1).padStart(2, "0") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InstanceGlyph, { icon: instance?.icon, size: 34 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ranking-copy", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: item.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                      item.launches,
                      " 次出发 · ",
                      item.lastPlayedAt ? `上次 ${formatDate(item.lastPlayedAt)}` : "尚无记录"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ranking-time", children: formatDuration(item.playTimeMs, "short") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 13 })
                ]
              },
              item.instanceId
            );
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { compact: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { size: 24 }), title: "还没有游玩记录", description: "启动一次游戏，这里就会长出第一根竹子。" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-card stats-sessions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-heading compact", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "JOURNEY LOG" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "出发记录" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted tiny", children: [
            "最近 ",
            recent.length,
            " 次"
          ] })
        ] }),
        recent.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-table-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "世界" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "账户" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "开始" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "时长" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "结果" })
          ] }),
          recent.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-table-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "session-world", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "session-dot" }),
              session.instanceName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: session.accountName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(session.startedAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDuration(session.durationMs, "short") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: session.crashed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "red", children: "崩溃" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "green", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 10 }),
              " 正常"
            ] }) })
          ] }, session.id))
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { compact: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { size: 24 }), title: "时间还停在出发前", description: "去启动一个世界吧，回来就能看到记录。", action: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-soft small", type: "button", onClick: () => setPage("instances"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 13 }),
          " 去实例"
        ] }) })
      ] })
    ] })
  ] });
}
const DOWNLOADS = [
  { major: 25, label: "Java 25", hint: "Minecraft 26.x / 未来版本", tone: "green" },
  { major: 21, label: "Java 21", hint: "Minecraft 1.20.5 – 1.21.x", tone: "blue" },
  { major: 17, label: "Java 17", hint: "Minecraft 1.18 – 1.20.4", tone: "blue" },
  { major: 16, label: "Java 16", hint: "Minecraft 1.17 – 1.17.1", tone: "amber" },
  { major: 8, label: "Java 8", hint: "Minecraft 1.16.5 及更早", tone: "neutral" }
];
function JavaPage() {
  const bootstrap = useBamboo((s) => s.bootstrap);
  const addToast = useBamboo((s) => s.addToast);
  const jobs = useBamboo((s) => s.jobs);
  const updateSettings = useBamboo((s) => s.updateSettings);
  const [list, setList] = reactExports.useState(bootstrap?.javaCache ?? []);
  const [loading, setLoading] = reactExports.useState(false);
  const [scanning, setScanning] = reactExports.useState(false);
  const [downloadJobId, setDownloadJobId] = reactExports.useState(null);
  const [downloadMajor, setDownloadMajor] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void load();
  }, []);
  reactExports.useEffect(() => {
    if (!downloadJobId) return;
    const job = jobs[downloadJobId];
    if (!job || job.status === "running") return;
    if (job.status === "success") {
      addToast({ kind: "success", title: "Java 已下载", message: job.detail });
      void load();
    } else {
      addToast({ kind: "error", title: "Java 下载失败", message: job.error ?? job.detail });
    }
    setDownloadJobId(null);
    setDownloadMajor(null);
  }, [jobs, downloadJobId]);
  async function load() {
    setLoading(true);
    try {
      setList(await window.bamboo.listJava());
    } catch (error) {
      addToast({ kind: "error", title: "读取 Java 失败", message: messageOf(error) });
    } finally {
      setLoading(false);
    }
  }
  async function scan() {
    setScanning(true);
    try {
      const found = await window.bamboo.scanJava();
      setList(found);
      addToast({ kind: "success", title: "扫描完成", message: `找到 ${found.length} 个可用的 Java 运行时。` });
    } catch (error) {
      addToast({ kind: "error", title: "扫描失败", message: messageOf(error) });
    } finally {
      setScanning(false);
    }
  }
  async function addManual() {
    try {
      const found = await window.bamboo.addJava();
      if (found) {
        setList(found);
        addToast({ kind: "success", title: "Java 已添加", message: "现在可以在实例设置中选择它。" });
      }
    } catch (error) {
      addToast({ kind: "error", title: "添加 Java 失败", message: messageOf(error) });
    }
  }
  async function download(major) {
    try {
      const job = await window.bamboo.downloadJava(major);
      setDownloadJobId(job.id);
      setDownloadMajor(major);
      addToast({ kind: "info", title: `开始下载 Java ${major}`, message: "进度会显示在右下角，完成后会自动出现在列表。" });
    } catch (error) {
      addToast({ kind: "error", title: "下载没有开始", message: messageOf(error) });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page java-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "JAVA RUNTIME",
        title: "Java",
        subtitle: "每片竹林都需要合适的土壤。Bamboo 会为游戏版本自动选择 Java。",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost", type: "button", onClick: () => void addManual(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
            " 手动添加"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary", type: "button", onClick: () => void scan(), disabled: scanning, children: [
            scanning ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 16 }),
            " 扫描本机"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "java-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "java-installed glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "java-section-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "DETECTED RUNTIMES" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "已检测到的 Java" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: list.length ? "green" : "amber", children: [
            list.length,
            " 个可用"
          ] })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "java-loading", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
          " 正在读取…"
        ] }) : list.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "java-list", children: list.map((runtime) => {
          const recommended = runtime.majorVersion === 21;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `java-row ${recommended ? "recommended" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `java-version-badge java-${runtime.majorVersion}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Java" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: runtime.majorVersion })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "java-main", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "java-title", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: runtime.vendor }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: runtime.source === "downloaded" ? "green" : runtime.source === "manual" ? "blue" : "neutral", children: runtime.source === "downloaded" ? "Bamboo 下载" : runtime.source === "manual" ? "手动添加" : "自动发现" }),
                recommended && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "green", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10 }),
                  " 推荐"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  className: "java-path",
                  type: "button",
                  onClick: () => {
                    void window.bamboo.copyText(runtime.path);
                    addToast({ kind: "success", title: "路径已复制", message: runtime.path });
                  },
                  title: runtime.path,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { size: 12 }),
                    " ",
                    runtime.path
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "java-meta", children: [
                runtime.version,
                " · ",
                runtime.architecture,
                " · 添加于 ",
                formatDate(runtime.addedAt)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "java-ready", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "running-dot" }),
              " 可用"
            ] })
          ] }, runtime.id);
        }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { size: 28 }),
            title: "还没有发现 Java",
            description: "Bamboo 可以扫描常见安装位置，或直接下载 Mojang 官方运行时。",
            action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", onClick: () => void scan(), children: "开始扫描" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "java-scan-note", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { size: 13 }),
          "自动扫描 Java、Adoptium、Microsoft OpenJDK、Zulu、Corretto、GraalVM 等常见目录；也可以手动指定安装位置。"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "java-side", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-card java-download-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "java-section-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "DOWNLOAD" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "获取 Java" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { size: 19 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "java-download-copy", children: "来自 Mojang 官方运行时，自动解压到 Bamboo 数据目录，不修改系统环境变量。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "java-download-grid", children: DOWNLOADS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "java-download-tile",
              disabled: downloadJobId !== null,
              onClick: () => void download(item.major),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `java-download-num tone-${item.tone}`, children: item.major }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: item.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: item.hint })
                ] }),
                downloadMajor === item.major ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { size: 15 })
              ]
            },
            item.major
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 15 }), children: "下载约 40–80 MB。安装完成后，启动器会优先使用匹配游戏版本的运行时。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass-card java-settings-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "java-section-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "AUTOMATION" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "自动管理" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { size: 19 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "switch-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "启动时自动下载 Java" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "缺少匹配版本时，从 Mojang 获取。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Toggle,
              {
                checked: bootstrap?.settings.autoDownloadJava ?? true,
                onChange: (value) => void updateSettings({ autoDownloadJava: value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "switch-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "启动时自动扫描" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "在本机寻找新安装的 Java。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Toggle,
              {
                checked: bootstrap?.settings.autoScanJava ?? true,
                onChange: (value) => void updateSettings({ autoScanJava: value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "java-mapping", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "VERSION MAP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "26.x+" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "green", children: "Java 25" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1.20.5 – 1.21.x" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "green", children: "Java 21" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1.18 – 1.20.4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "blue", children: "Java 17" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1.17 – 1.17.1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "amber", children: "Java 16" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "≤ 1.16.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { children: "Java 8" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost small java-open-folder", type: "button", onClick: () => void window.bamboo.openDataFolder(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 14 }),
            " 打开运行库目录"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "java-notes-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-tile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-tile-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "64 位优先" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "现代 Minecraft 建议使用 64 位 Java，才能分配超过 1GB 内存。" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-tile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-tile-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "游戏版本匹配" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Java 版本过高或过低都会导致启动失败，Bamboo 会自动读取版本要求。" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-tile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-tile-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "随时重扫" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "安装新的 JDK 后点击「扫描本机」，无需重启启动器。" })
        ] })
      ] })
    ] })
  ] });
}
function CrashPage() {
  const bootstrap = useBamboo((s) => s.bootstrap);
  const activeInstance = useBamboo((s) => s.bootstrap?.instances.find((i) => i.id === s.bootstrap?.activeInstanceId));
  const setActiveInstance = useBamboo((s) => s.setActiveInstance);
  const addToast = useBamboo((s) => s.addToast);
  const [crashes, setCrashes] = reactExports.useState(bootstrap?.recentCrashes ?? []);
  const [selectedId, setSelectedId] = reactExports.useState(bootstrap?.recentCrashes[0]?.id ?? "");
  const [loading, setLoading] = reactExports.useState(false);
  const [analyzing, setAnalyzing] = reactExports.useState(false);
  const [instanceId, setInstanceId] = reactExports.useState(activeInstance?.id ?? bootstrap?.instances[0]?.id ?? "");
  const selected = crashes.find((c) => c.id === selectedId) ?? crashes[0];
  reactExports.useEffect(() => {
    void load();
  }, []);
  reactExports.useEffect(() => {
    const latest = bootstrap?.recentCrashes[0];
    if (!latest) return;
    setCrashes(
      (current) => current.some((item) => item.id === latest.id) ? current : [latest, ...current]
    );
    setSelectedId((current) => current || latest.id);
  }, [bootstrap?.recentCrashes[0]?.id]);
  async function load() {
    setLoading(true);
    try {
      const list = await window.bamboo.listCrashes();
      setCrashes(list);
      if (!selectedId && list[0]) setSelectedId(list[0].id);
    } catch (error) {
      addToast({ kind: "error", title: "读取崩溃记录失败", message: messageOf(error) });
    } finally {
      setLoading(false);
    }
  }
  async function analyze() {
    setAnalyzing(true);
    try {
      const result = await window.bamboo.analyzeCrash(instanceId || void 0);
      if (result) {
        setCrashes((current) => [result, ...current.filter((c) => c.id !== result.id)]);
        setSelectedId(result.id);
        addToast({ kind: "success", title: "分析完成", message: result.reason });
      } else {
        addToast({ kind: "info", title: "没有找到可分析的崩溃", message: "请先启动一次游戏，或检查实例目录。" });
      }
    } catch (error) {
      addToast({ kind: "warning", title: "暂时没有可分析的报告", message: messageOf(error) });
    } finally {
      setAnalyzing(false);
    }
  }
  async function clear() {
    try {
      await window.bamboo.clearCrashes();
      setCrashes([]);
      setSelectedId("");
      addToast({ kind: "success", title: "已清空诊断记录" });
    } catch (error) {
      addToast({ kind: "error", title: "清空失败", message: messageOf(error) });
    }
  }
  const affected = reactExports.useMemo(() => {
    if (!selected) return void 0;
    return bootstrap?.instances.find((i) => i.id === selected.instanceId);
  }, [selected, bootstrap?.instances]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page crash-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "CRASH DIAGNOSTICS",
        title: "诊断",
        subtitle: "不猜原因。读取日志、堆栈和模组列表，把问题定位到具体枝叶。",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "select compact-select",
              value: instanceId,
              onChange: (event) => {
                setInstanceId(event.target.value);
                void setActiveInstance(event.target.value);
              },
              children: (bootstrap?.instances ?? []).map((instance) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: instance.id, children: instance.name }, instance.id))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", disabled: analyzing || !instanceId, onClick: () => void analyze(), children: analyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "spin" }),
            " 正在分析"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 16 }),
            " 分析最近崩溃"
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "crash-history glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-history-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "RECENT REPORTS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "诊断记录" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "crash-count", children: crashes.length })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-loading", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
          " 正在读取…"
        ] }) : crashes.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "crash-list", children: crashes.map((crash) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: `crash-row ${selected?.id === crash.id ? "selected" : ""}`,
            onClick: () => setSelectedId(crash.id),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `crash-dot ${crash.severity}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "crash-row-copy", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: crash.reason }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
                  crash.instanceName,
                  " · ",
                  timeAgo(crash.createdAt)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
            ]
          },
          crash.id
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            compact: true,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 25 }),
            title: "还没有诊断记录",
            description: "游戏崩溃后会自动分析；也可以手动分析最近一份报告。",
            action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-soft small", type: "button", onClick: () => void analyze(), disabled: analyzing, children: "分析一次" })
          }
        ),
        crashes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "crash-clear", type: "button", onClick: () => void clear(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 }),
          " 清空记录"
        ] })
      ] }),
      selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "crash-detail glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `crash-detail-banner severity-${selected.severity}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "crash-banner-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 22 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "LIKELY CAUSE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: selected.reason }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              selected.instanceName,
              " · ",
              formatDate(selected.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: selected.severity === "high" ? "red" : selected.severity === "medium" ? "amber" : "neutral", children: selected.severity === "high" ? "高概率问题" : selected.severity === "medium" ? "需要留意" : "轻微异常" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-detail-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-summary-block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: "WHAT HAPPENED" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "crash-summary-text", children: selected.summary }),
            selected.exception && /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "crash-exception", children: selected.exception })
          ] }),
          selected.likelyMods.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-section-head", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "可能相关的模组" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                selected.likelyMods.length,
                " 个"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "likely-mods", children: selected.likelyMods.map((mod) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "likely-mod", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "likely-mod-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 15 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: mod.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: mod.fileName ?? mod.id ?? "未知文件" })
              ] })
            ] }, `${mod.id}-${mod.fileName}`)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-section-head", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "下一步可以这样试" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "crash-suggestions", children: selected.suggestions.map((suggestion, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: String(index + 1).padStart(2, "0") }),
              suggestion
            ] }, suggestion)) })
          ] }),
          selected.logExcerpt && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "crash-log", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { size: 15 }),
              " 查看堆栈摘要"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: selected.logExcerpt })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "crash-detail-foot", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            affected && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "crash-affected", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13 }),
              " 受影响实例：",
              affected.name
            ] }),
            selected.exitCode !== null && selected.exitCode !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "crash-exit", children: [
              "退出码 ",
              selected.exitCode
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-actions", children: [
            selected.reportPath && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-soft small", type: "button", onClick: () => void window.bamboo.openCrashReport(selected.reportPath), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileWarning, { size: 14 }),
              " 打开报告"
            ] }),
            affected && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost small", type: "button", onClick: () => void setActiveInstance(affected.id), children: [
              "选中实例 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
            ] })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "crash-detail crash-empty glass-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-empty-art", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 42 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leaf-dot one" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leaf-dot two" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "目前没有崩溃记录" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "如果游戏异常退出，Bamboo 会自动读取 crash-report 与 latest.log，分析 Java、模组依赖、内存、图形驱动等常见原因。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "crash-feature-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { size: 14 }),
            " 定位疑似模组"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { size: 14 }),
            " 给出修复建议"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileWarning, { size: 14 }),
            " 一键打开报告"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", type: "button", disabled: !instanceId || analyzing, onClick: () => void analyze(), children: analyzing ? "正在分析…" : "分析最近一份报告" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "neutral", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15 }), children: "崩溃分析基于本地日志和模组元数据，不会上传你的文件。若模组作者需要日志，请直接分享 crash-report。" })
  ] });
}
const FEATURE_LABELS = [
  { key: "mods", label: "模组", hint: "搜索、安装与开关 Mod", icon: Puzzle },
  { key: "modpacks", label: "整合包", hint: "拖入整合包自动安装", icon: Cloud },
  { key: "multiplayer", label: "联机", hint: "局域网扫描与端口映射", icon: Gauge },
  { key: "skins", label: "皮肤", hint: "离线皮肤与角色预览", icon: Sparkles },
  { key: "stats", label: "游玩统计", hint: "时长、世界与出发记录", icon: MonitorCog },
  { key: "java", label: "Java 管理", hint: "扫描与下载运行时", icon: Coffee },
  { key: "crash", label: "崩溃诊断", hint: "崩溃原因与模组定位", icon: RefreshCw }
];
const THEMES = [
  { id: "bamboo", name: "新竹", hint: "清透、温润、带一点晨光", swatches: ["#0b1710", "#8fce9b", "#d8efa9", "#e8dfc7"] },
  { id: "moss", name: "苔庭", hint: "更深、更静、像雨后的林地", swatches: ["#10150e", "#7f9d65", "#c7d49a", "#d9d0b8"] },
  { id: "moon", name: "月竹", hint: "冷调、月光、薄雾", swatches: ["#09131a", "#8dbcc2", "#c8e4dd", "#dbe7e8"] }
];
function SettingsPage() {
  const bootstrap = useBamboo((s) => s.bootstrap);
  const updateSettings = useBamboo((s) => s.updateSettings);
  const refresh = useBamboo((s) => s.refresh);
  const addToast = useBamboo((s) => s.addToast);
  const updateInfo = useBamboo((s) => s.updateInfo);
  const updateChecking = useBamboo((s) => s.updateChecking);
  const checkForUpdates = useBamboo((s) => s.checkForUpdates);
  const downloadUpdate = useBamboo((s) => s.downloadUpdate);
  const jobs = useBamboo((s) => s.jobs);
  const settings = bootstrap?.settings;
  const updateJob = Object.values(jobs).find(
    (job) => job.kind === "other" && job.title.startsWith("下载更新") && job.status === "running"
  );
  const [msClientId, setMsClientId] = reactExports.useState(settings?.microsoftClientId ?? "");
  const [cfKey, setCfKey] = reactExports.useState("");
  const [showCf, setShowCf] = reactExports.useState(false);
  const [testingCf, setTestingCf] = reactExports.useState(false);
  const [savingMs, setSavingMs] = reactExports.useState(false);
  const [savingCf, setSavingCf] = reactExports.useState(false);
  const [showMsGuide, setShowMsGuide] = reactExports.useState(false);
  const [memory, setMemory] = reactExports.useState(settings?.defaultMemoryMb ?? 4096);
  const [concurrency, setConcurrency] = reactExports.useState(settings?.downloadConcurrency ?? 12);
  reactExports.useEffect(() => {
    setMsClientId(settings?.microsoftClientId ?? "");
    setMemory(settings?.defaultMemoryMb ?? 4096);
    setConcurrency(settings?.downloadConcurrency ?? 12);
  }, [settings?.microsoftClientId, settings?.defaultMemoryMb, settings?.downloadConcurrency]);
  if (!settings) return null;
  async function saveMicrosoft() {
    setSavingMs(true);
    try {
      await updateSettings({ microsoftClientId: msClientId.trim() });
      await refresh();
      addToast({ kind: "success", title: "微软应用 ID 已保存", message: "现在可以在账户面板发起设备代码登录。" });
    } finally {
      setSavingMs(false);
    }
  }
  async function saveCurseForge() {
    setSavingCf(true);
    try {
      const result = await window.bamboo.setCurseForgeKey(cfKey.trim() || null);
      await refresh();
      setCfKey("");
      addToast({
        kind: result.configured ? "success" : "info",
        title: result.configured ? "CurseForge 已接入" : "已清除 CurseForge Key",
        message: result.configured ? "现在可以搜索和安装 CurseForge 项目。" : "CurseForge 搜索将提示需要密钥。"
      });
    } catch (error) {
      addToast({ kind: "error", title: "保存失败", message: messageOf(error) });
    } finally {
      setSavingCf(false);
    }
  }
  async function testCurseForge() {
    setTestingCf(true);
    try {
      const result = await window.bamboo.testCurseForgeKey(cfKey.trim() || void 0);
      addToast({ kind: result.ok ? "success" : "error", title: result.ok ? "连接成功" : "连接失败", message: result.message });
    } catch (error) {
      addToast({ kind: "error", title: "测试失败", message: messageOf(error) });
    } finally {
      setTestingCf(false);
    }
  }
  function toggleFeature(key) {
    const next = { ...settings.features, [key]: !settings.features[key] };
    void updateSettings({ features: next });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page settings-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        eyebrow: "MAKE IT YOURS",
        title: "设置",
        subtitle: "把竹林调成你喜欢的风。所有设置都会保存在本地。",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost", type: "button", onClick: () => void window.bamboo.openDataFolder(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 15 }),
          " 数据目录"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "settings-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { size: 19 }), kicker: "APPEARANCE", title: "外观", hint: "毛玻璃、主题与动效" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "theme-grid", children: THEMES.map((theme) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `theme-card ${settings.theme === theme.id ? "active" : ""}`,
              onClick: () => void updateSettings({ theme: theme.id }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `theme-preview theme-${theme.id}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "theme-preview-side" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "theme-preview-hero" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "theme-preview-card" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "theme-copy", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: theme.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: theme.hint })
                ] }),
                settings.theme === theme.id && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "theme-check", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) })
              ]
            },
            theme.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "毛玻璃强度" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "通透、均衡或更实的背景，影响所有面板。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Segmented,
              {
                value: settings.glass,
                onChange: (value) => void updateSettings({ glass: value }),
                options: [
                  { value: "clear", label: "通透" },
                  { value: "balanced", label: "均衡" },
                  { value: "solid", label: "柔和" }
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "switch-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "收起侧边栏" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "只保留图标，给世界更多空间。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { checked: settings.compactSidebar, onChange: (value) => void updateSettings({ compactSidebar: value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "switch-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "减少动效" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "关闭竹叶漂浮与大部分过渡动画。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { checked: settings.reduceMotion, onChange: (value) => void updateSettings({ reduceMotion: value }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "settings-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 19 }), kicker: "VISIBILITY", title: "功能入口", hint: "只保留你需要的入口" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-toggle-grid", children: FEATURE_LABELS.map(({ key, label, hint, icon: Icon2 }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `feature-toggle ${settings.features[key] ? "on" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "feature-toggle-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { size: 17 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: hint })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { checked: settings.features[key], onChange: () => toggleFeature(key) })
          ] }, key)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "settings-footnote", children: "关闭后，侧边栏、首页快捷入口和快速通道都会隐藏对应入口；底层数据不会被删除。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "settings-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { size: 19 }), kicker: "DOWNLOADS", title: "下载与性能", hint: "资源来源和并发数" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "下载源" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "官方源稳定；BMCLAPI 对国内网络更友好，失败时自动回退。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Segmented,
              {
                value: settings.downloadSource,
                onChange: (value) => void updateSettings({ downloadSource: value }),
                options: [
                  { value: "official", label: "官方" },
                  { value: "bmclapi", label: "BMCLAPI" }
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "并发下载数 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: concurrency })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: 2,
                max: 32,
                step: 2,
                value: concurrency,
                onChange: (event) => setConcurrency(Number(event.target.value)),
                onMouseUp: () => void updateSettings({ downloadConcurrency: concurrency }),
                onTouchEnd: () => void updateSettings({ downloadConcurrency: concurrency }),
                onKeyUp: () => void updateSettings({ downloadConcurrency: concurrency }),
                onBlur: () => void updateSettings({ downloadConcurrency: concurrency })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "range-labels", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2 · 稳定" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "12 · 推荐" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "32 · 极速" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "switch-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "启动后最小化启动器" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "游戏出现窗口后自动收起，方便快速进入。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { checked: settings.minimizeOnLaunch, onChange: (value) => void updateSettings({ minimizeOnLaunch: value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "switch-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "启动后关闭启动器" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "游戏运行后隐藏到系统托盘；离线皮肤需要启动器保持运行。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { checked: settings.closeLauncherOnLaunch, onChange: (value) => void updateSettings({ closeLauncherOnLaunch: value }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "settings-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { size: 19 }), kicker: "DEFAULTS", title: "游戏默认值", hint: "新实例会继承这些设置" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "默认最大内存 ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                memory,
                " MB"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: 1024,
                max: 16384,
                step: 512,
                value: memory,
                onChange: (event) => setMemory(Number(event.target.value)),
                onMouseUp: () => void updateSettings({ defaultMemoryMb: memory }),
                onTouchEnd: () => void updateSettings({ defaultMemoryMb: memory }),
                onKeyUp: () => void updateSettings({ defaultMemoryMb: memory }),
                onBlur: () => void updateSettings({ defaultMemoryMb: memory })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "range-labels", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1 GB" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "8 GB" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "16 GB" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "默认 JVM 预设" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "均衡适合大多数设备；性能模式启用 Aikar 风格 G1 参数。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Segmented,
              {
                value: settings.defaultJvmProfile,
                onChange: (value) => void updateSettings({ defaultJvmProfile: value }),
                options: [
                  { value: "balanced", label: "均衡" },
                  { value: "performance", label: "性能" },
                  { value: "compatibility", label: "兼容" }
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "settings-side", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "settings-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { size: 19 }), kicker: "ACCOUNTS", title: "Microsoft 登录", hint: "配置 Azure 应用" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "settings-copy", children: "Bamboo 使用 OAuth 2.0 设备代码流，不会接触或保存你的密码。需要一个启用了「公共客户端流」的 Azure 应用 ID。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Azure 客户端 ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input mono",
                value: msClientId,
                placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                onChange: (event) => setMsClientId(event.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-button-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-soft small", type: "button", disabled: savingMs, onClick: () => void saveMicrosoft(), children: [
              savingMs ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
              " 保存"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-button small", type: "button", onClick: () => setShowMsGuide(!showMsGuide), children: [
              "如何获取 ID？ ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 13, className: showMsGuide ? "rotate" : "" })
            ] })
          ] }),
          showMsGuide && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ms-guide", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "在 Azure Portal 注册一个应用（个人 Microsoft 账户即可）。" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "账户类型选择「个人 Microsoft 账户」。" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "在「身份验证」中启用「允许公共客户端流」。" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "不需要填写重定向 URI；设备代码流由 Microsoft 托管。" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "复制「应用程序(客户端) ID」粘贴到上方并保存。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-button small", type: "button", onClick: () => void window.bamboo.openExternal("https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade"), children: [
              "打开 Azure 应用注册 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 12 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: bootstrap?.microsoftClientIdConfigured ? "success" : "warning", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { size: 15 }), children: bootstrap?.microsoftClientIdConfigured ? "应用 ID 已配置，可以发起微软登录。" : "尚未配置，离线账户不受影响。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "settings-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 19 }), kicker: "CURSEFORGE", title: "CurseForge 接入", hint: "搜索与下载生态" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "settings-copy", children: "CurseForge 的官方 API 需要个人密钥。Bamboo 只将它加密保存在本机，不发送到除 CurseForge 之外的服务。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `service-status ${bootstrap?.hasCurseForgeKey ? "on" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "service-status-dot" }),
            bootstrap?.hasCurseForgeKey ? "CurseForge 已连接" : "CurseForge 未连接",
            bootstrap?.hasCurseForgeKey && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "green", children: "API Key 已保存" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "API Key" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "password-field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "input mono",
                  type: showCf ? "text" : "password",
                  value: cfKey,
                  placeholder: bootstrap?.hasCurseForgeKey ? "已保存，输入新值可替换" : "粘贴 CurseForge API Key",
                  onChange: (event) => setCfKey(event.target.value)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "icon-button", onClick: () => setShowCf(!showCf), "aria-label": "显示密钥", children: showCf ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-button-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary small", type: "button", disabled: savingCf, onClick: () => void saveCurseForge(), children: [
              savingCf ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
              " 保存 Key"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost small", type: "button", disabled: testingCf || !cfKey && !bootstrap?.hasCurseForgeKey, onClick: () => void testCurseForge(), children: [
              testingCf ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 }),
              " 测试连接"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-button small", type: "button", onClick: () => void window.bamboo.openExternal("https://console.curseforge.com/"), children: [
            "获取 CurseForge API Key ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 12 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InlineNotice, { tone: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 15 }), children: "Modrinth 无需密钥，始终可用。CurseForge 部分作者禁止第三方 API 下载时，仍需在网页端手动获取文件。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "settings-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 19 }), kicker: "STORAGE", title: "存储", hint: "数据目录与磁盘" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "storage-path", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { size: 17 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: bootstrap?.dataRoot, children: bootstrap?.dataRoot }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
              void window.bamboo.copyText(bootstrap?.dataRoot ?? "");
              addToast({ kind: "success", title: "路径已复制" });
            }, title: "复制路径", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "storage-stats", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "实例" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: bootstrap?.instances.length ?? 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "账户" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: bootstrap?.accounts.length ?? 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "诊断记录" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: bootstrap?.recentCrashes.length ?? 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost small storage-open", type: "button", onClick: () => void window.bamboo.openDataFolder(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 14 }),
            " 打开数据目录"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "about-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "about-brand", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "about-mark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Bamboo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "v",
                bootstrap?.appVersion ?? "1.0.1"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { tone: "green", children: "Java Edition" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "update-panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "update-status", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: updateInfo?.available ? "available" : "latest", children: updateInfo?.available ? `可更新至 v${updateInfo.latestVersion}` : updateInfo ? `已是最新 v${updateInfo.currentVersion}` : "尚未检查更新" }),
              updateInfo?.source && updateInfo.source !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: updateInfo.source === "github" ? "GitHub" : updateInfo.source === "website" ? "官网" : "仓库" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "update-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  className: "btn btn-ghost small",
                  type: "button",
                  disabled: updateChecking,
                  onClick: () => void checkForUpdates(true),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 13, className: updateChecking ? "spin" : "" }),
                    " 检查更新"
                  ]
                }
              ),
              updateInfo?.available ? updateInfo.downloadUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  className: "btn btn-soft small",
                  type: "button",
                  disabled: Boolean(updateJob),
                  onClick: () => void downloadUpdate(),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { size: 13 }),
                    " ",
                    updateJob ? "下载中…" : "下载更新"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  className: "btn btn-soft small",
                  type: "button",
                  onClick: () => void window.bamboo.openExternal(updateInfo.releaseUrl ?? "https://github.com/Ti-68281/Bamboo-Launcher/releases"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 13 }),
                    " 打开发布页"
                  ]
                }
              ) : updateInfo?.error ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "update-error", children: "检查失败" }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "switch-row update-toggle-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "自动检查更新" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "启动时从 GitHub 与官网获取最新版本。" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Toggle,
                {
                  checked: settings.autoCheckUpdate,
                  onChange: (value) => void updateSettings({ autoCheckUpdate: value })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "about-links", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void window.bamboo.openExternal("https://github.com/Ti-68281/Bamboo-Launcher"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { size: 12 }),
              " GitHub"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void window.bamboo.openExternal("https://bamboo.xbkjz.icu/"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { size: 12 }),
              " 官网"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void window.bamboo.openExternal("https://www.minecraft.net/"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 12 }),
              " Minecraft"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "contact-card glass-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contact-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "contact-mark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 17 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "联系作者" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "contact-mail",
              onClick: () => {
                void window.bamboo.copyText("Ti68281@xbkjz.icu");
                addToast({ kind: "success", title: "邮箱已复制", message: "Ti68281@xbkjz.icu" });
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ti68281@xbkjz.icu" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "contact-mail",
              onClick: () => {
                void window.bamboo.copyText("xiaobao@xbkjz.cn");
                addToast({ kind: "success", title: "邮箱已复制", message: "xiaobao@xbkjz.cn" });
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "xiaobao@xbkjz.cn" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function SettingsHeader({
  icon,
  kicker,
  title,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card-head", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-head-icon", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "section-kicker", children: kicker }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: hint })
    ] })
  ] });
}
const PAGES = {
  home: HomePage,
  instances: InstancesPage,
  downloads: DownloadsPage,
  mods: ModsPage,
  modpacks: ModpacksPage,
  multiplayer: MultiplayerPage,
  skins: SkinsPage,
  stats: StatsPage,
  java: JavaPage,
  crash: CrashPage,
  settings: SettingsPage
};
const TITLES = {
  home: "首页",
  instances: "实例",
  downloads: "下载",
  mods: "模组",
  modpacks: "整合包",
  multiplayer: "联机",
  skins: "皮肤",
  stats: "统计",
  java: "Java",
  crash: "诊断",
  settings: "设置"
};
function App() {
  const boot = useBamboo((s) => s.boot);
  const booting = useBamboo((s) => s.booting);
  const bootError = useBamboo((s) => s.bootError);
  const page = useBamboo((s) => s.page);
  const settings = useBamboo((s) => s.bootstrap?.settings);
  const scroller = reactExports.useRef(null);
  reactExports.useEffect(() => {
    void boot();
    const unsubscribe = window.bamboo.onEvent(useBamboo.getState().handleEvent);
    return unsubscribe;
  }, [boot]);
  reactExports.useEffect(() => {
    if (!settings) return;
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.dataset.glass = settings.glass;
    document.documentElement.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
  }, [settings?.theme, settings?.glass, settings?.reduceMotion]);
  reactExports.useEffect(() => {
    document.title = `Bamboo · ${TITLES[page] ?? "竹启动器"}`;
    scroller.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);
  if (booting) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "boot-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "boot-orb o1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "boot-orb o2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "boot-mark", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 48 48", fill: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M13 42c0-14 2-25 10-35M25 42c0-11 4-19 12-24M17 26c-6-3-9-7-10-13 6 .2 10 3 13 8M25 16c2-8 7-12 14-13 0 7-4 12-10 15",
          stroke: "currentColor",
          strokeWidth: "2.2",
          strokeLinecap: "round"
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "boot-wordmark", children: "BAMBOO" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "boot-caption", children: "正在把竹林铺开…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "boot-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}) })
    ] });
  }
  if (bootError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "error-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "error-card glass-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "error-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 28 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "竹林暂时没有醒来" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: bootError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary", type: "button", onClick: () => void boot(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15 }),
        " 再试一次"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "如果问题持续，请检查数据目录权限或查看应用日志。" })
    ] }) });
  }
  const Page = PAGES[page] ?? HomePage;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ambient-layer", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ambient-orb orb-a" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ambient-orb orb-b" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ambient-orb orb-c" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ambient-grain" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TitleBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "page-scroller", ref: scroller, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {}) }, page),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-bottom-mark", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 13 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bamboo · grow slow, play well" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(JobShelf, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toasts, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandPalette, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AccountModal, {})
  ] });
}
const now = Date.now();
const DAY = 864e5;
function makeSession(instance, daysAgo, minutes, crashed = false) {
  const startedAt = now - daysAgo * DAY - 3 * 36e5;
  return {
    id: `mock_session_${instance.id}_${daysAgo}_${minutes}`,
    instanceId: instance.id,
    instanceName: instance.name,
    accountName: "竹间风",
    startedAt,
    endedAt: startedAt + minutes * 6e4,
    durationMs: minutes * 6e4,
    exitCode: crashed ? 1 : 0,
    crashed
  };
}
const instances = [
  {
    id: "inst_bamboo_1",
    name: "竹影生存",
    gameDir: "C:\\Users\\Bamboo\\AppData\\Roaming\\Bamboo\\data\\instances\\bamboo-survival",
    versionId: "fabric-loader-0.16.10-1.21.4",
    mcVersion: "1.21.4",
    loader: { type: "fabric", version: "0.16.10" },
    accountId: "acc_offline_1",
    memoryMb: 6144,
    minMemoryMb: 1024,
    jvmArgs: [],
    fullscreen: false,
    width: 1280,
    height: 720,
    playTimeMs: 76 * 36e5 + 24 * 6e4,
    lastSessionMs: 2 * 36e5 + 13 * 6e4,
    createdAt: now - 80 * DAY,
    updatedAt: now - 1 * DAY,
    lastPlayedAt: now - 1 * DAY,
    icon: "bamboo",
    notes: "主世界生存，少量优化模组。",
    offlineSkin: true,
    autoInstallJava: true,
    jvmProfile: "balanced"
  },
  {
    id: "inst_forge_1",
    name: "机械竹林",
    gameDir: "C:\\Users\\Bamboo\\AppData\\Roaming\\Bamboo\\data\\instances\\mechanical-bamboo",
    versionId: "1.20.1-forge-47.2.0",
    mcVersion: "1.20.1",
    loader: { type: "forge", version: "47.2.0" },
    accountId: "acc_offline_1",
    memoryMb: 8192,
    minMemoryMb: 1024,
    jvmArgs: [],
    fullscreen: false,
    width: 1600,
    height: 900,
    playTimeMs: 41 * 36e5 + 8 * 6e4,
    lastSessionMs: 3 * 36e5,
    createdAt: now - 52 * DAY,
    updatedAt: now - 5 * DAY,
    lastPlayedAt: now - 5 * DAY,
    icon: "sprout",
    notes: "Create 整合包测试。",
    offlineSkin: true,
    autoInstallJava: true,
    jvmProfile: "performance"
  },
  {
    id: "inst_vanilla_1",
    name: "原版·月下",
    gameDir: "C:\\Users\\Bamboo\\AppData\\Roaming\\Bamboo\\data\\instances\\vanilla-moon",
    versionId: "1.21.4",
    mcVersion: "1.21.4",
    loader: { type: "vanilla" },
    accountId: "acc_ms_1",
    memoryMb: 4096,
    minMemoryMb: 1024,
    jvmArgs: [],
    fullscreen: false,
    width: 1280,
    height: 720,
    playTimeMs: 12 * 36e5 + 45 * 6e4,
    lastSessionMs: 45 * 6e4,
    createdAt: now - 20 * DAY,
    updatedAt: now - 9 * DAY,
    lastPlayedAt: now - 9 * DAY,
    icon: "leaf",
    notes: "",
    offlineSkin: false,
    autoInstallJava: true,
    jvmProfile: "balanced"
  }
];
[
  makeSession(instances[0], 0, 132),
  makeSession(instances[1], 1, 84),
  makeSession(instances[0], 2, 45),
  makeSession(instances[2], 3, 26),
  makeSession(instances[0], 4, 168),
  makeSession(instances[1], 5, 62),
  makeSession(instances[0], 6, 38),
  makeSession(instances[0], 9, 120),
  makeSession(instances[1], 12, 90)
];
({
  activeInstanceId: instances[0].id,
  totalPlayTimeMs: instances.reduce((sum, item) => sum + item.playTimeMs, 0)
});
[
  ...["1.21.5", "1.21.4", "1.21.3", "1.21.1", "1.21", "1.20.6", "1.20.4", "1.20.1", "1.19.4", "1.18.2", "1.17.1", "1.16.5", "1.12.2", "1.8.9", "1.7.10"].map(
    (id, index) => ({
      id,
      type: "release",
      releaseTime: new Date(now - index * 24 * DAY * 12).toISOString(),
      url: "",
      installed: ["1.21.4", "1.20.1", "1.12.2"].includes(id)
    })
  ),
  ...["24w46a", "24w45a", "24w44a"].map((id, index) => ({
    id,
    type: "snapshot",
    releaseTime: new Date(now - index * 7 * DAY).toISOString(),
    url: "",
    installed: false
  }))
];
if (!window.bamboo) {
  {
    const fail = async () => {
      throw new Error("Bamboo preload bridge failed to load. 请重新启动启动器。");
    };
    window.bamboo = new Proxy(
      { onEvent: () => () => void 0 },
      {
        get(target, property) {
          if (property === "onEvent") return target.onEvent;
          return fail;
        }
      }
    );
  }
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
