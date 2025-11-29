import {
  argsOrArgArray,
  filter,
  not,
  raceWith
} from "./chunk-43EE4BUE.js";
import {
  __read,
  __spreadArray,
  init_tslib_es6
} from "./chunk-WLQ4F4C6.js";

// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/partition.js
function partition(predicate, thisArg) {
  return function(source) {
    return [filter(predicate, thisArg)(source), filter(not(predicate, thisArg))(source)];
  };
}

// node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/race.js
init_tslib_es6();
function race() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return raceWith.apply(void 0, __spreadArray([], __read(argsOrArgArray(args))));
}

export {
  partition,
  race
};
//# sourceMappingURL=chunk-T3HOYESR.js.map
