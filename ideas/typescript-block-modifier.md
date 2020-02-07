# TypeScript `block` modifier

[View on TypeScript playground](https://www.typescriptlang.org/play/index.html?ssl=1&ssc=1&pln=32&pc=4#code/PQKhCgAIUgxBXAdgYwC4EsD2iDOkCGANoZgO6TL4AOq8ATuogOaQBu+D+ARoQKZ4AzOpgC2kVAAtekTPFS86kHMkxVeAOigwAKhPR5kdXvnl58kAETISOerwuboWyAElES0dJzpaJrLnEpSCphJjp8EREFSBF0JglUSFJ8RETUTGCjVl5UwP1HGAB5RGleAA8Iqj5IfUgBJDR-JQV0InQALz9sdVcBQOl6lAxsGrxETET4b2YZOWjlVV4AGmdJHJrEyncuL3wBXkIAT2bOQg7eABMC5xcRfCZGaXMAIRJkAGsAHm0APnFDtQUbA4VB0eBoTB0LTOQaNEZgxDFADqvC4SMh7wUAAoBIgAFyQV6YD6fLEASkgAF4-qxMOgLj8KQBvZyQSDAYCQACMPQAyi02u0Bu50gQlKDGEwCmz2ZyAEw9ACqOGkAAMqJgQQBZfg4e68VXiDIq3JrcUMGai8woriQdF0TFQ6AyjmQADMPQAouxCP1zZKarh6dIzTa7RiFM4AL7Q52wSF1BrDdwXXjWDhdAIpAgXC4+fxESCqnjE96GkSYPMCdDRWqMUGV8GXPGxmAlj6JoZNASYTDkyAs51s11bADkkxVs3kigWgKkRmjrcgAEFxmtFFNpJRJ7VkFN0mIACK8gAyOAKwHAsOTkARyNR9sdOPx7JgRJJ0E5-epbDpF1fkB-CAwDMlAAHqBBn7gDG4B8JssipNElKQAADAA3OAd6IDaj7Yt+fyDkCSDTmhspKBIsiEP+OwEO4CjCIojDeKmfrtu80FkmhQA).

```typescript
/**
 * Functions allow capturing variables from the outer scope.
 * This creates a "closure".
 *
 * In some situations the programmer might want to prevent this.
 * One example is function serialization. If the function is not using outer scope,
 * then it can be safely serialized.
 *
 * Imagine a Block<T> type constructor
 *
 * function runOnWebWorker(fn: Block<() => void>) {
 *   // 1. Serialize fn to a string.
 *   // 2. Use `postMessage` to sent the string to a Web Worker
 *   // 3. Eval the string inside the Web Worker
 * }
 *
 * For function declarations an additional `block` modifier is introduced:
 *
 * block function foo() {
 *   // can't use outer scope here
 * }
 *
 * Another use case is custom DSLs.
 */
function runOnWebWorker(fn: /* Block< */ () => void /* > */) {
  /* ... */
}

let counter = 0;
runOnWebWorker(() => {
  counter; // should be an error inside the block
});
```
