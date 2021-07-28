/**
 * 현재 커리에 인자args가 있는 경우 즉시 함수 실행
 * 그렇지 않으면 새로운 인자 받아서 지연 실행
 */
export const curry = (f: Function) => (a, ...args) =>
  args.length ? f(a, ...args) : (...newArgs) => f(a, ...newArgs);

/** 일반 함수 또는 Promise 의 결과값 */
const getResult = (a: any, f: any) => (a instanceof Promise ? a.then(f) : f(a));

/** 베열의 첫 원소만 추출 */
export const getHead = (iter: Iterable<any>) =>
  getResult(take(1, iter), ([h]) => h);

const nop = Symbol('nop');

const resolvableFunc = (acc, a, f: Function) =>
  a instanceof Promise
    ? a.then(
        res => f(acc, res),
        err => (err == nop ? acc : Promise.reject(err))
      )
    : f(acc, a);

export const reduce = curry((f: Function, acc: any, iter: Iterable<any>) => {
  if (!iter) return reduce(f, getHead((iter = acc[Symbol.iterator]())), iter);

  return getResult(acc, function recursion(acc) {
    for (const i of iter) {
      acc = resolvableFunc(acc, i, f);
      if (acc instanceof Promise) return acc.then(recursion);
    }
    return acc;
  });
});

export const go = (...args) => reduce((data, func) => func(data), args);

export const pipe = (func, ...funcs) => (...args) =>
  go(func(...args), ...funcs);

export const take = curry((length: number = Infinity, iter: Iterable<any>) => {
  const res = [];
  return (function recursion() {
    for (const i of iter) {
      if (i instanceof Promise)
        return i
          .then(i => ((res.push(i), res).length == length ? res : recursion()))
          .catch(err => (err == nop ? recursion() : Promise.reject(err)));
      res.push(i);
      if (res.length == length) return res;
    }
    return res;
  })();
});

export const lazyMap = curry(function*(f: Function, iter: Iterable<any>) {
  for (const a of iter) yield getResult(a, f);
});

export const map = curry(
  pipe(
    lazyMap,
    take(Infinity)
  )
);

export const lazyFilter = curry(function*(f: Function, iter: Iterable<any>) {
  for (const i of iter) {
    const res = getResult(i, f);
    if (res instanceof Promise)
      yield res.then(r => (r ? i : Promise.reject(nop)));
    else if (res) yield i;
  }
});

export const filter = curry(
  pipe(
    lazyFilter,
    take(Infinity)
  )
);

export const findOne = curry((f: Function, iter: Iterable<any>) =>
  go(iter, lazyFilter(f), take(1), ([r]) => r)
);

export const entries = function*(obj) {
  let i = 0;
  for (const k in obj) yield [k, obj[k], i++];
};
