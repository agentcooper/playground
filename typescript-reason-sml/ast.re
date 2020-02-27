/* Reason */

type expression =
| Identifier(string)
| And(expression, expression)
| Or(expression, expression)
| Not(expression);

let rec serialize = e =>
  switch (e) {
    | Identifier(s) => s
    | And(lhs, rhs) => serialize(lhs) ++ " && " ++ serialize(rhs)
    | Or(lhs, rhs) => serialize(lhs) ++ " || " ++ serialize(rhs)
    | Not(arg) => "!" ++ serialize(arg)
  };

let expr = And(Identifier("a"), Not(Identifier("b")));

Js.log(serialize(expr));
