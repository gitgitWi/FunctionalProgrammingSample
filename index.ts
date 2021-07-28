import { log } from './utils';
import { data } from './bulk';

import {
  curry,
  pipe,
  go,
  findOne,
  getHead,
  map as lmap,
  reduce as lreduce,
  filter as lfilter,
  lazyMap,
  entries
} from './lazyFunctions';

import {
  map as cmap,
  reduce as creduce,
  filter as cfilter,
  take as ctake
} from './concurrentFunctions';

(function App() {
  log(`---
Functional Programming with JS
---`);

  const { c, l, h, o, v } = data;
  const size = c.length;
  log(`data size: ${size}`);
  log(getHead(c));

  const criteria = 3750;

  log(`findOne GTE ${criteria}: ${findOne(i => i > criteria, data.c)}`);

  log(
    `Size of findAll GTE ${criteria}: ${
      cfilter(i => i > criteria, data.c).length
    }`
  );

  const basicRefiner = pipe(
    lazyMap(i => Math.floor(i)),
    res => new Set(res),
    ctake(20)
  );

  // log(basicRefiner(c));

  const refined = Array.from({ length: size }, () => ({}));

  go(
    entries(data),
    cfilter(([k]) => 'o,c,h,l,v'.includes(k)),
    cmap(([k, arr]) =>
      arr.forEach((v: number, i: number) => (refined[i][k] = v))
    )
  );

  log(refined.slice(0, 100));
})();
