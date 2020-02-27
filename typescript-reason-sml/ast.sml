(* Standard ML *)

datatype Expression =
    Identifier of string
  | And of Expression * Expression
  | Or of Expression * Expression
  | Not of Expression

fun serialize(e: Expression): string =
  case e of
    Identifier s => s
  | And(lhs, rhs) => serialize(lhs) ^ " && " ^ serialize(rhs)
  | Or(lhs, rhs) => serialize(lhs) ^ " || " ^ serialize(rhs)
  | Not arg => "!" ^ serialize(arg)

val expr = And(Identifier("a"), Not(Identifier("b")))

val _ = print ((serialize expr) ^ "\n")
