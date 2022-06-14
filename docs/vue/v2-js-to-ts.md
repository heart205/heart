---
title: vue2 js升级为ts 实现
---

<!-- TODO: -->

[v2 class components docs](https://class-component.vuejs.org/)

[v2 ts class components 开发实践](https://juejin.cn/post/7106441797567512583#heading-3)

1. 安装 typescript 所需的包

```json
{
  "dependencies": {
    "@typescript-eslint/eslint-plugin": "^5.27.1",
    "@typescript-eslint/parser": "^5.22.0",
    "@vue/cli-plugin-typescript": "^5.0.4",
    "@vue/eslint-config-prettier": "^7.0.0",
    "@vue/eslint-config-typescript": "^10.0.0",
    "@types/jest": "^28.1.1",
  }
}
```

2. 修改`eslint` 配置

```js
module.export = {
  // ....
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript',
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  // ....
}
```
