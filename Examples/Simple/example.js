import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Grid from 'react-native-grid-component';

export default class Simple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: generateRandomColorsArray(21)
    };
  }

  _renderItem = (data, i) => <View style={[{backgroundColor: data}, styles.item]} key={i}/>

  render() {
    return (
      <Grid
        style={styles.list}
        renderItem={this._renderItem}
        data={this.state.data}
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

// Helper functions
// thanks materialuicolors.co
const colors = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722', '#795548', '#9E9E9E', '#607D8B'
]

function generateRandomColorsArray(length) {
  return Array.from(Array(length)).map(() => colors[Math.floor(Math.random()*colors.length)])
}
