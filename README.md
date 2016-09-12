# :black_square_button: [WIP] react-native-grid-component

## Installation

`npm install react-native-grid-component --save`

## Example

```
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



*WIP* *WIP* *WIP* *WIP* *WIP* *WIP* *WIP* *WIP*

:construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction::construction:

*WIP* *WIP* *WIP* *WIP* *WIP* *WIP* *WIP* *WIP*

## TODO:
- [x] Example
- [ ] Props description
- [ ] Lint
- [ ] Check iOS



ISC License (ISC)
-------

Copyright (c) 2016, Phil Rukin <<philipp@rukin.me>>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
