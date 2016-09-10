/**
 * React Native Grid Component
 * https://github.com/phil-r/react-native-grid-component
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

// http://stackoverflow.com/questions/8495687/split-array-into-chunks
// I don't see the reason to take lodash.chunk for this
const chunk = (arr, n) => Array.from(Array(Math.ceil(arr.length/n)), (_,i)=>arr.slice(i*n,i*n+n));

export default class Grid extends Component {
  static defaultProps = {
    itemsPerRow: 3,
    onEndReached() {},
    rowHasChanged(r1, r2) {
      return r1 !== r2;
    }
  }
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: this.props.rowHasChanged
    });
    this.state = {
      dataSource: ds.cloneWithRows(this._prepareData(this.props.data))
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._prepareData(nextProps.data))
    });
  }

  _renderPlaceholder = (i) => (<View key={i} style={{ width: width / this.props.itemsPerRow}} />);

  _prepareData = (data) => {
    const rows = chunk(data, this.props.itemsPerRow);
    if (rows.length) {
      const lastRow = rows[rows.length-1];
      for (let i=0; lastRow.length < this.props.itemsPerRow; i++) {
        lastRow.push(null);
      }
    }
    return rows;
  }

  _renderRow = (rowData, sectionID, rowID) => {
    return (
      <View style={styles.row}>
        {rowData.map((item, i) => {
          if (item) {
            return this.props.renderItem(item, i);
          } else { // render a placeholder
            return this._renderPlaceholder(i) || this.props.renderPlaceholder(i);
          }
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          enableEmptySections={true}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={height}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1
  },
  row: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1
  }
});
