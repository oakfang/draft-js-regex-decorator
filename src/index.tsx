import { ComponentType } from 'react';
import { DraftDecorator, ContentBlock } from 'draft-js';
import { iterateMatches } from './regex-utils';

type StrategyCallback = (start: number, end: number) => void;

interface DecoratorRegexOptions {
  trim: boolean;
}

const decorateRegex = (
  regex: RegExp,
  options?: Partial<DecoratorRegexOptions>
) => {
  const { trim = false } = options || {};
  return (contentBlock: ContentBlock, callback: StrategyCallback) => {
    for (let { match, index } of iterateMatches(
      regex,
      contentBlock.getText()
    )) {
      if (trim) {
        match = match.trim();
        index;
      }
      callback(index, index + match.length);
    }
  };
};

export default function createRegExDecorator(
  regex: RegExp,
  component: ComponentType<{}>,
  options?: Partial<DecoratorRegexOptions>
): DraftDecorator {
  return {
    component,
    strategy: decorateRegex(regex, options),
  };
}

export function createWorldListDecorator(
  words: string[],
  component: ComponentType<{}>,
  options?: Partial<DecoratorRegexOptions>
): DraftDecorator {
  const regex = new RegExp(`(?:^|(?<= ))(${words.join('|')})(?:(?= )|$)`, 'ig');
  return createRegExDecorator(regex, component, options);
}
