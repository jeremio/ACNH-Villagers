# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `FEATURES.md` file to list potential new features.

### Changed
- Updated `README.md` with installation instructions and clarifications.
- Refactored state management to move filtering logic into the Pinia store.
- Improved TypeScript typings in the router.

### Fixed
- Corrected an issue with peer dependencies by downgrading Vite to a stable version.
- Fixed a logic issue in the page title update mechanism.

## [2.0.0] - 2024-05-20

### Added
- **TypeScript:** Integrated TypeScript for better code quality and maintainability.
- **UI Framework:** Added `naive-ui` as the component library.
- **State Management:** Implemented `pinia` for centralized state management.
- **Routing:** Added `vue-router` to handle navigation.
- **Internationalization:** Added `vue-i18n` for multi-language support.
- **Linting:** Integrated `@antfu/eslint-config` for consistent code style.
- **Dev Tools:** Added `vite-plugin-vue-devtools` for an improved development experience.

### Changed
- **Build System:** Switched from `npm` to `pnpm` for dependency management.
- **Refactoring:** Major refactoring of components to align with the new tech stack.
- **Dependencies:** Updated most dependencies to their latest versions.

## [1.0.1] - 2021-09-07

### Changed
- Migrated from Options API to Composition API with `<script setup>`.
- Replaced event bus (Mitt) with Vuex for state management.

### Removed
- Removed `vue-router`.
- Removed `vuetify`.

## [1.0.0] - 2021-04-15

### Added
- Initial project setup.
