import SwiftUI
import PlaygroundSupport

struct Child: View {
    let initialText: String
    @State var text: String = ""

    init(initialText: String) {
        self.initialText = initialText;
        self._text = State(initialValue: initialText)
    }

    var body: some View {
        Button(action: {
            self.text += "🐍"
        }) {
            Text(text)
        }
    }
}

struct ContentView: View {
    var body: some View {
        Group {
            Child(initialText: "Hi Foo")
            Child(initialText: "Hi Bar")
        }

    }
}

PlaygroundPage.current.setLiveView(ContentView())
