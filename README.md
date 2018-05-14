# :black_square_button: react-native-grid-component

[![NPM version](http://img.shields.io/npm/v/react-native-grid-component.svg?style=flat)](https://www.npmjs.com/package/react-native-grid-component)
[![Build Status](https://travis-ci.org/phil-r/react-native-grid-component.svg?branch=master)](https://travis-ci.org/phil-r/react-native-grid-component)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Easy to use grid component for your [react-native](https://github.com/facebook/react-native/) project. Supports iOS and Android.

Based on [react-native framework](https://github.com/facebook/react-native/) by Facebook.

## Installation

```
npm install react-native-grid-component --save
```

or

```
yarn add react-native-grid-component
```

## Examples

* [Simple](https://snack.expo.io/@phil/react-native-grid-component-example)
* [Sections](https://snack.expo.io/@phil/grid-with-sections-example)

## Demo

![android low](https://cloud.githubusercontent.com/assets/577316/18456263/d6b977e2-794f-11e6-878f-5737355111ac.gif) ![ios low](https://cloud.githubusercontent.com/assets/577316/18456262/d6b7a39a-794f-11e6-8587-06757dc42e14.gif)

## Usage

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Grid from 'react-native-grid-component';

class Simple extends Component {
  _renderItem = (data, i) => (
    <View style={[{ backgroundColor: data }, styles.item]} key={i} />
  );

  _renderPlaceholder = i => <View style={styles.item} key={i} />;

  render() {
    return (
      <Grid
        style={styles.list}
        renderItem={this._renderItem}
        renderPlaceholder={this._renderPlaceholder}
        data={['black', 'white', 'red', 'green', 'blue']}
        itemsPerRow={2}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 160,
    margin: 1
  },
  list: {
    flex: 1
  }
});
```

[Full interactive example](https://snack.expo.io/@phil/react-native-grid-component-example)

## Props

| Name                           | propType                                       | description                                                                                                                                                                                                                                                                               |
| ------------------------------ | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` _required_              | Array                                          | Array that will be used to render items                                                                                                                                                                                                                                                   |
| `renderItem` _required_        | func `(data: any, i: number) => React$Element` | function that accepts data and returns React Element that will be rendered for each `data` item                                                                                                                                                                                           |
| `renderPlaceholder` _optional_ | func `(i: number) => React$Element`            | function that returns placeholder React Elements that ere rendered to fill the space at the end of the grid                                                                                                                                                                               |
| `renderFooter` _optional_      | func `() => React$Element`                     | underlying ListView [renderFooter prop](https://facebook.github.io/react-native/docs/listview.html#renderfooter)                                                                                                                                                                          |
| `refreshControl` _optional_    | func `() => React$Element`                     | underlying ListView [refreshControl prop](https://facebook.github.io/react-native/docs/refreshcontrol.html)                                                                                                                                                                               |
| `itemsPerRow` _optional_       | number                                         | number of elements per one row                                                                                                                                                                                                                                                            |
| `onEndReached` _optional_      | func                                           | function that is called when the end of the grid reached (can be used to add new elements, like in [example](Examples/Simple))                                                                                                                                                            |
| `itemHasChanged` _optional_    | func `(data1: any, data2: any) => boolean`     | function that is used in `rowHasChanged` function in `ListView.DataSource` to determine whether the row was updated. **IMPORTANT:** It's possible to get `null` as one or both of arguments, so you'll want to check for that ( e.g. `(d1, d2) => d1 && d2 ? d1.data !== d2.data : true`) |

## [TODO](https://github.com/phil-r/react-native-grid-component/projects/1)

## See also

* [React Native Looped Carousel](https://github.com/appintheair/react-native-looped-carousel)
* [React Native Buyscreen](https://github.com/appintheair/react-native-buyscreen)

## ISC License (ISC)

Copyright (c) 2016-2018, Phil Rukin <mailto:<philipp@rukin.me>>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
