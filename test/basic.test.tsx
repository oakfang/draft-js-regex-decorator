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

const Curse: React.FC = ({ children }) => {
  return <span className="curse">{children}</span>;
};

const helloDecorator = createRegExDecorator(/hello/gi, Greeting);
const hellDecorator = createRegExDecorator(
  /(?:^|\W)(hell)(?:$|\W)/gi,
  Curse,
  {}
);

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

test('Trim option', () => {
  const state = EditorState.createWithContent(
    ContentState.createFromText('hello world'),
    new CompositeDecorator([hellDecorator, helloDecorator])
  );
  const { container } = render(
    <Editor editorState={state} onChange={() => null} />
  );
  expect(container.querySelector('.curse')).toBeNull();
  expect(container.querySelector('.greeting')).not.toBeNull();
});
