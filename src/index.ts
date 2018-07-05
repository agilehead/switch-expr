export type SyncSwitchExpression<T> = [() => boolean, (() => T) | T];

export type AsyncSwitchExpression<T> = [
  () => boolean,
  (() => T | Promise<T>) | T
];

export function first<T>(expressions: SyncSwitchExpression<T>[]) {
  for (const [predicate, expr] of expressions) {
    if (predicate()) {
      return typeof expr === "function" ? expr() : expr;
    }
  }
}

export async function firstAsync<T>(expressions: AsyncSwitchExpression<T>[]) {
  for (const [predicate, expr] of expressions) {
    if (predicate()) {
      return await (typeof expr === "function" ? expr() : expr);
    }
  }
}

export function collect<T>(expressions: SyncSwitchExpression<T>[]) {
  const results: T[] = [];
  for (const [predicate, expr] of expressions) {
    if (predicate()) {
      results.push(typeof expr === "function" ? expr() : expr);
    }
  }
  return results;
}

export async function collectAsync<T>(expressions: AsyncSwitchExpression<T>[]) {
  const results: (Promise<T> | T)[] = [];
  for (const [predicate, expr] of expressions) {
    if (predicate()) {
      results.push(typeof expr === "function" ? expr() : expr);
    }
  }
  return Promise.all(results);
}
