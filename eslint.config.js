// eslint.config.js
// Импорт рекомендуемых правил JavaScript (eslint:recommended) в формате Flat Config.
import js from "@eslint/js"
// Подключаем ESLint-плагин для интеграции Prettier
import prettier from "eslint-plugin-prettier"
// Подключаем правила React (например проверка корректности JSX).
import react from "eslint-plugin-react"
// Правила для React Hooks (useEffect, useMemo, т.д.).
// Например:
// - запрещает использовать хуки вне компонентов
// - проверяет deps массива useEffect.
import reactHooks from "eslint-plugin-react-hooks"
// Плагин сортировки импортов (очень быстрый и лучший вариант).
import simpleImportSort from "eslint-plugin-simple-import-sort"
// Библиотека с наборами глобальных переменных: browser, node, es2021
import globals from "globals"
// Это набор всего для ESLint + TypeScript:
// - парсер
// - плагин
// - рекомендации
import tseslint from "typescript-eslint"

export default [
  {
    // игнорируемые папки
    ignores: ["dist", "node_modules", "*.html", "*.css",]
  },

  {
    // На какие файлы распространяются правила
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    languageOptions: {
      // Используется TypeScript parser (иначе ESLint не понимает TS).
      parser: tseslint.parser,
      // Современный JavaScript
      ecmaVersion: "latest",
      // Поддержка import/export
      sourceType: "module",
      // Добавляет глобальные переменные браузера
      globals: {
        ...globals.browser,
        ...globals.es2021,
      }
    },

    plugins: {
      // Подключаем TS‑плагин (для правил типа no-unused-vars)
      "@typescript-eslint": tseslint.plugin,
      // Включаем React‑правила
      react,
      // Включаем строгие правила хуков.
      "react-hooks": reactHooks,
      // Плагин сортировки импортов/экспортов.
      "simple-import-sort": simpleImportSort,
      // Прогоняет Prettier через ESLint.
      prettier
    },

    rules: {
      // Рекомендованные правила JS.
      ...js.configs.recommended.rules,
      "no-unused-vars": "off",
      // Рекомендованные TS‑правила.
      ...tseslint.configs.recommended[0].rules,

      // Правила React.
      ...react.configs.recommended.rules,

      // useEffect/useCallback/useMemo — строгая проверка.
      ...reactHooks.configs.recommended.rules,

      // Если код нарушает стиль — ESLint покажет ошибку.
      "prettier/prettier": ["error", { "endOfLine": "auto" }],

      // Импорты сортируются сами
      "simple-import-sort/imports": "error",
      // Экспорты сортируются сами
      "simple-import-sort/exports": "error",

      // Выдаёт ошибку, если переменная не используется
      // Но допускает параметры вида: function handler(_event) {}
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" }
      ],

      // React 17+ — JSX без импорта React
      "react/react-in-jsx-scope": "off"
    },

    settings: {
      react: {
        // ESLint сам определит установленную версию React и применит подходящие правила.
        version: "detect"
      }
    }
  }
]
