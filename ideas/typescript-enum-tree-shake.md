In TypeScript following declaration:

```typescript
export enum Fruit {
    apple,
    banana,
}
```

produces following JavaScript (target = ESNext, module = ESNext):

```javascript
export var Fruit;
(function (Fruit) {
    Fruit[Fruit["apple"] = 0] = "apple";
    Fruit[Fruit["banana"] = 1] = "banana";
})(Fruit || (Fruit = {}));
```

The top level IIFE code is flagged as a side effect with static code analysis tools like Webpack's tree shaking.

A new mode can be introduced where the output JavaScript will be following:

```javascript
export const Fruit = {
    apple: 0,
    banana: 0,
    0: "apple",
    1: "banana",
};
```

This output is much friendlier to the static code analysis.

One problem is that multiple declarations are allowed today:

```typescript
enum Fruit {
    apple = 0,
    banana = 1,
}

enum Fruit {
    orange = 2,
}
```

In the new mode those can be banned.
