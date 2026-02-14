# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint and auto-fix with ESLint

## Architecture

This is a Vue 3 single-page application for calculating nutritional values per serving from total recipe values (or vice versa). Deployed on Netlify at https://ration-ratio.netlify.app/.

### Tech Stack
- Vue 3 with Composition API (`<script setup>`)
- Pinia for state management
- Vite for build tooling
- SCSS for styling (scoped styles in components)
- ESLint with vue/flat/essential config

### Key Structure
- `src/stores/Store.js` - Pinia store managing `foodList` array and `isReverse` toggle
- `src/composables/useCalculation.js` - Utility functions for rounding/formatting calculated values
- `src/components/RatioCalculator.vue` - Main calculator form with validation and save logic
- `src/components/FoodWrapper.vue` / `FoodList.vue` / `FoodItem.vue` / `FoodTotal.vue` - Display saved food items and totals

### Path Alias
`@` is aliased to `./src` in vite.config.js
