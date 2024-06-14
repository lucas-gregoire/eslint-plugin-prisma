import ts, { Symbol, SymbolFlags } from 'typescript';

// eslint-disable-next-line @typescript-eslint/ban-types
type SymbolObject = Symbol & {
  parent?: SymbolObject;
};

export function findNamespaceNameOfType(type: ts.Type): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  let symbol: SymbolObject = type.symbol;

  while (symbol && symbol.parent) {
    if (symbol.parent.flags & SymbolFlags.Namespace) {
      return symbol.parent.getName();
    }
    symbol = symbol.parent;
  }
  return undefined;
}
