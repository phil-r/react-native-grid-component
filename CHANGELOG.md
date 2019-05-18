# Changelog

## [2.0.0] - 2019-05-18

- `FlatList` and `SectionList` are used now 🎉
- **Breaking** `renderSectionHeader` now works as in [SectionList](https://facebook.github.io/react-native/docs/sectionlist#rendersectionheader), you **need** to update this or your section titles will disappear
- _Deprecation_ sectioned grid will no longer support `data` as an object in the future, new format is `[{title, data:[]}, ...]`
- _Deprecation_ `itemsPerRow` is now deprecated in favor of [`numColumns`](https://facebook.github.io/react-native/docs/flatlist#numcolumns)
- [`keyExtractor`](https://facebook.github.io/react-native/docs/sectionlist#keyextractor) prop is needed now
- `itemHasChanged` prop is no longer needed

## [1.1.0] - 2018-05-19

### Changed

- Replace `componentWillReceiveProps` with `getDerivedStateFromProps`
- Bump `peerDependencies` for `react` and `react-native`
