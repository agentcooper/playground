function* iterateIndicesOfEnabledBits(n) {
  let index = 0;
  let k = n;
  while (k > 0) {
    let remainder = k & 1;
    if (remainder === 1) {
      yield index;
    }
    index++;
    k = k >> 1;
  }
}

function* iterateSubsets(set) {
  for (let i = 0; i < Math.pow(2, set.length); i++) {
    const subset = [...iterateIndicesOfEnabledBits(i)].map(
      (index) => set[index],
    );
    yield subset;
  }
}

for (const subset of iterateSubsets(["a", "b", "c", "d", "e", "f"])) {
  console.log(subset);
}
