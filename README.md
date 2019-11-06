# draft-js-regex-decorator

A RegEx based DraftJS decorator

## Usage:

```jsx
import { Editor, EditorState, CompositeDecorator } from 'draft-js';
import createRegExDecorator from 'draft-js-regex-decorator';

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = editorState => {
    setEditorState(
      EditorState.set(editorState, {
        decorator: new CompositeDecorator(createRegExDecorator(/hello/gi)),
      })
    );
  };

  return <Editor {...{ editorState, onChange }} />;
}
```
