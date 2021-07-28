import {
  curry,
  reduce as lReduce,
  take as lTake,
  pipe,
  lazyMap,
  lazyFilter
} from './lazyFunctions';

const noop = () => {};

/** Promise 객체 중 에러 있는 경우 무시하고 전달 */
/** Promise 객체인 경우 Promise 체인으로 보내면서 병렬 처리 */
const catchNoop = ([...arr]) => (
  arr.forEach(a => (a instanceof Promise ? a.catch(noop) : a)), arr
);

export const reduce = curry((f: Function, acc, iter?: Iterable<any>) =>
  iter ? lReduce(f, acc, catchNoop(iter)) : lReduce(f, catchNoop(acc))
);

export const take = curry((length: number, iter: Iterable<any>) =>
  lTake(length, catchNoop(iter))
);

export const map = curry(
  pipe(
    lazyMap,
    take(Infinity)
  )
);

export const filter = curry(
  pipe(
    lazyFilter,
    take(Infinity)
  )
);
