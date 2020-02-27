// TypeScript

enum ExpressionKind {
  Identifier,
  And,
  Or,
  Not,
}

type Expression = Identifier | And | Or | Not;

interface Identifier {
  type: ExpressionKind.Identifier;
  name: string;
}
interface And {
  type: ExpressionKind.And;
  lhs: Expression;
  rhs: Expression;
}
interface Or {
  type: ExpressionKind.Or;
  lhs: Expression;
  rhs: Expression;
}
interface Not {
  type: ExpressionKind.Not;
  arg: Expression;
}

function Identifier(name: string): Identifier {
  return { type: ExpressionKind.Identifier, name };
}
function And(lhs: Expression, rhs: Expression): And {
  return { type: ExpressionKind.And, lhs, rhs };
}
function Or(lhs: Expression, rhs: Expression): Or {
  return { type: ExpressionKind.Or, lhs, rhs };
}
function Not(arg: Expression): Not {
  return { type: ExpressionKind.Not, arg };
}

function serialize(e: Expression): string {
  switch (e.type) {
    case ExpressionKind.Identifier:
      return e.name;
    case ExpressionKind.And:
      return `${serialize(e.lhs)} && ${serialize(e.rhs)}`;
    case ExpressionKind.Or:
      return `${serialize(e.lhs)} || ${serialize(e.rhs)}`;
    case ExpressionKind.Not:
      return `!${serialize(e.arg)}`;
  }
}

const expr = And(Identifier("a"), Not(Identifier("b")));
console.log(serialize(expr));
