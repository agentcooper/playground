import Foundation

indirect enum Value {
  // primitive
  case string(String)
  case number(Double)
  case boolean(Bool)

  // complex
  case array([Value])
  case dictionary([String:Value])
}

struct Component: Codable {
  let props: [String: Value]
}

extension Value: Codable {
  func encode(to encoder: Encoder) throws {
    var container = encoder.singleValueContainer()
    switch self {
    case let .string(stringValue):
      try container.encode(stringValue)
    case let .number(numberValue):
      try container.encode(numberValue)
    case let .boolean(booleanValue):
      try container.encode(booleanValue)
    case let .array(arrayValue):
      try container.encode(arrayValue)
    case let .dictionary(dictionaryValue):
      try container.encode(dictionaryValue)
    }
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.singleValueContainer()
    
    if let stringValue = try? container.decode(String.self) {
      self = .string(stringValue)
      return
    }
    if let numberValue = try? container.decode(Double.self) {
      self = .number(numberValue)
      return
    }
    if let boolValue = try? container.decode(Bool.self) {
      self = .boolean(boolValue)
      return
    }
    if let arrayValue = try? container.decode([Value].self) {
      self = .array(arrayValue)
      return
    }
    if let dictionaryValue = try? container.decode([String:Value].self) {
      self = .dictionary(dictionaryValue)
      return
    }

    let context = DecodingError.Context(
      codingPath: decoder.codingPath,
      debugDescription: "Invalid value!"
    )
    throw DecodingError.dataCorrupted(context)
  }
}

let decoder = JSONDecoder()

let data = """
{
  "props": {
    "string": "value",
    "number": 42,
    "boolean": true,
    "array": ["value", 42, true, [false]],
    "dictionary": { "a": "b", "nested": { "c": "d" } }
  }
}
""".data(using: .utf8)!

let component = try decoder.decode(Component.self, from: data)
print(component)
