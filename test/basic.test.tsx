import * as React from 'react';
import { render } from '@testing-library/react';
import {
  Editor,
  EditorState,
  ContentState,
  CompositeDecorator,
} from 'draft-js';
import createRegExDecorator from '../src';

const Greeting: React.FC = ({ children }) => {
  return <span className="greeting">{children}</span>;
};

const helloDecorator = createRegExDecorator(/hello/gi, Greeting);

function getContainer(input: string) {
  const state = EditorState.createWithContent(
    ContentState.createFromText(input),
    new CompositeDecorator([helloDecorator])
  );
  const { container } = render(
    <Editor editorState={state} onChange={() => null} />
  );
  return container;
}

test('It does not wrap partial text', () => {
  expect(getContainer('hell').querySelector('.greeting')).toBeNull();
});

test('It wraps text correctly', () => {
  expect(getContainer('hello world').querySelector('.greeting')).not.toBeNull();
});
