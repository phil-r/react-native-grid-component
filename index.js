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
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

// http://stackoverflow.com/questions/8495687/split-array-into-chunks
// I don't see the reason to take lodash.chunk for this
const chunk = (arr: Array<any>, n: number): Array<Array<any>> => Array.from(Array(Math.ceil(arr.length/n)), (_,i)=>arr.slice(i*n,i*n+n));

type Props = {
  itemsPerRow: number,
  onEndReached: () => void,
  rowHasChanged: (data1: any, data2: any) => boolean,
  renderItem: (data: any, i: number) => void,
  renderPlaceholder: (i: number) => void,
  data: Array<any>
};

type State = {
  dataSource: ListView.DataSource
};

export default class Grid extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    itemsPerRow: 3,
    onEndReached() {},
    rowHasChanged(r1, r2) {
      return r1 !== r2;
    }
  }
  constructor(props: Object) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: this.props.rowHasChanged
    });
    this.state = {
      dataSource: ds.cloneWithRows(this._prepareData(this.props.data))
    };
  }

  componentWillReceiveProps(nextProps: Object) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._prepareData(nextProps.data))
    });
  }

  _renderPlaceholder = (i: number) => (<View key={i} style={{ width: width / this.props.itemsPerRow}} />);

  _prepareData = (data: Array<any>) => {
    const rows = chunk(data, this.props.itemsPerRow);
    if (rows.length) {
      const lastRow = rows[rows.length-1];
      for (let i=0; lastRow.length < this.props.itemsPerRow; i++) {
        lastRow.push(null);
      }
    }
    return rows;
  }

  _renderRow = (rowData: Array<any>, sectionID: number, rowID: number) => {
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
