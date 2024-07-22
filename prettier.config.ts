import type {PluginConfig} from '@trivago/prettier-plugin-sort-imports';
import type {Config} from 'prettier';

export default {
  bracketSpacing: false,
  trailingComma: 'all',
  arrowParens: 'avoid',
  singleQuote: true,
  bracketSameLine: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'explicitResourceManagement',
    'decoratorAutoAccessors',
    'decorators',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCaseInsensitive: true,
} satisfies Config & PluginConfig;
