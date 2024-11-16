# style-dictionary-practice

style-dictionaryの練習用リポジトリ

## style-dictionary build資料

https://zenn.dev/mybest_dev/articles/68e4cfadca4746

## 各プラグインと資料

### Figma Color Variables Import / Export

https://note.com/taka_piya/n/nadb22ef442a4
https://www.figma.com/community/plugin/1246363189684042100/figma-color-variables-import-export

```
figma-color-variables-import-export.json
```

<br>

### Export/Import Variables

https://www.figma.com/community/plugin/1246363189684042100/figma-color-variables-import-export

```
export-import-variables.json
```

構築方法
※build出来ないので検証中

https://qiita.com/rhrh__8/items/8732e8be2cd9ec24b671

```
npm install @types/node
npm install ts-node
```

```
// package.json
// transformVariablesを追加しておく
"build-token": "ts-node scripts/transformVariables.ts",
```

<br>

### Figma-to-Style-Dictionary JSON Converter

https://note.com/satofaction/n/n1fb9ddfcf94e
https://www.figma.com/community/plugin/1362710514082324638/figma-to-style-dictionary-json-converter

```
figma-to-style-dictionary-json-converter.json
```
