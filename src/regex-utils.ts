export function* iterateMatches(regex: RegExp, text: string) {
  let matchArr = regex.exec(text);
  while (matchArr !== null) {
    let { index } = matchArr;
    let [match] = matchArr;
    yield { index, match };
    matchArr = regex.exec(text);
  }
}
