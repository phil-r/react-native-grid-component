/**
 * React Native Grid Component
 * https://github.com/phil-r/react-native-grid-component
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

// http://stackoverflow.com/questions/8495687/split-array-into-chunks
// I don't see the reason to take lodash.chunk for this
const chunk = (arr: Array<any>, n: number): Array<Array<any>> =>
  Array.from(Array(Math.ceil(arr.length / n)), (_, i) => arr.slice(i * n, (i * n) + n));

type Props = {
  itemsPerRow: number,
  onEndReached: () => void,
  itemHasChanged: (data1: any, data2: any) => boolean,
  renderItem: (data: any, i: number) => React$Element<any>,
  renderPlaceholder?: (i: number) => React$Element<any>,
  data: Array<any>,
  refreshControl: () => React$Element<any>,
  renderFooter: () => React$Element<any>
};

type State = {
  dataSource: ListView.DataSource
};

export default class Grid extends Component {
  state: State;
  props: Props;

  static defaultProps = {
    itemsPerRow: 3,
    onEndReached() {},
    itemHasChanged(r1, r2) {
      return r1 !== r2;
    },
  }
  constructor(props: Object) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.some((e, i) => props.itemHasChanged(e, r2[i])),
    });
    this.state = {
      dataSource: ds.cloneWithRows(this._prepareData(this.props.data)),
    };
  }

  componentWillReceiveProps(nextProps: Object) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._prepareData(nextProps.data)),
    });
  }

  _prepareData = (data: Array<any>) => {
    const rows = chunk(data, this.props.itemsPerRow);
    if (rows.length) {
      const lastRow = rows[rows.length - 1];
      for (let i = 0; lastRow.length < this.props.itemsPerRow; i += 1) {
        lastRow.push(null);
      }
    }
    return rows;
  }

  _renderPlaceholder = (i: number) =>
    <View key={i} style={{ width: width / this.props.itemsPerRow }} />

  _renderRow = (rowData: Array<any>) =>
    <View style={styles.row}>
      {rowData.map((item, i) => {
        if (item) {
          return this.props.renderItem(item, i);
        }
        // render a placeholder
        if (this.props.renderPlaceholder) {
          return this.props.renderPlaceholder(i);
        }
        return this._renderPlaceholder(i);
      })}
    </View>

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          enableEmptySections
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={height}
          refreshControl={this.props.refreshControl}
          renderFooter={this.props.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1,
  },
});
