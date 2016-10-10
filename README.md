# :black_square_button: [WIP] react-native-grid-component

Easy to use grid component for your [react-native](https://github.com/facebook/react-native/) project. Supports iOS and Android.

Based on [react-native framework](https://github.com/facebook/react-native/) by Facebook.

## Installation

`npm install react-native-grid-component --save`

## Example

![android low](https://cloud.githubusercontent.com/assets/577316/18456263/d6b977e2-794f-11e6-878f-5737355111ac.gif) ![ios low](https://cloud.githubusercontent.com/assets/577316/18456262/d6b7a39a-794f-11e6-8587-06757dc42e14.gif)

```js
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Grid from 'react-native-grid-component';

class Simple extends Component {

  _renderItem = (data, i) => <View style={[{backgroundColor: data}, styles.item]} key={i}/>

  render() {
    return (
      <Grid
        style={styles.list}
        renderItem={this._renderItem}
        data={['black', 'white', 'red', 'green', 'blue']}
        itemsPerRow={2}/>
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
  },
});

```

[Full example code](Examples/Simple)

## Props

`data` - Array that will be used to render items

`renderItem` - function that accepts data and returns Element that will be rendered

`itemsPerRow` (optional) - number of elements per one row

`onEndReached` (optional) - function to call when the end of the grid reached (can be used to add new elements)

`rowHasChanged` (optional) - function that is passed to ListView.DataSource to determine whether the row was updated

`renderPlaceholder` (optional) - function that returns placeholder Elements that ere rendered to fill the space at the end of the grid


## [TODO](https://github.com/phil-r/react-native-grid-component/projects/1)



## See also
 - [React Native Buyscreen](https://github.com/appintheair/react-native-buyscreen)
 - [React Native Looped Carousel](https://github.com/appintheair/react-native-looped-carousel)


ISC License (ISC)
-------

Copyright (c) 2016, Phil Rukin <<philipp@rukin.me>>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
