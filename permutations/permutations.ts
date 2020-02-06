function* insertAtIndex<T>(items: Array<T>, index: number, item: T) {
  for (let i = 0; i < items.length; i++) {
    if (i === index) {
      yield item;
    }
    yield items[i];
  }
  if (index >= items.length) {
    yield item;
  }
}

function* permutations<T>(items: Array<T>): Generator<T[], void, void> {
  if (items.length === 1) {
    yield items;
  } else {
    let [first, ...rest] = items;
    for (let permutation of permutations(rest)) {
      for (let i = 0; i < items.length; i++) {
        /** Slower */
        yield [...insertAtIndex(permutation, i, first)];

        /** Faster */
        // let start = permutation.slice(0, i);
        // let rest = permutation.slice(i);
        // yield [...start, first, ...rest];
      }
    }
  }
}

console.time("permutations");
let counter = 0;
for (const permutation of permutations([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) {
  counter++;
}
console.log(counter);
console.timeEnd("permutations");
