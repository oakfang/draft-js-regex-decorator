import { ComponentType } from 'react';
import { DraftDecorator, ContentBlock } from 'draft-js';
import { iterateMatches } from './regex-utils';

type StrategyCallback = (start: number, end: number) => void;

const decorateRegex = (regex: RegExp) => (
  contentBlock: ContentBlock,
  callback: StrategyCallback
) => {
  for (let { match, index } of iterateMatches(regex, contentBlock.getText())) {
    callback(index, index + match.length);
  }
};

export default function createRegExDecorator(
  regex: RegExp,
  component: ComponentType<{}>
): DraftDecorator {
  return {
    component,
    strategy: decorateRegex(regex),
  };
}
