/**
 * React Native Grid Component
 * https://github.com/phil-r/react-native-grid-component
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  SectionList
} from 'react-native';

const { width } = Dimensions.get('window');

// http://stackoverflow.com/questions/8495687/split-array-into-chunks
// I don't see the reason to take lodash.chunk for this
const chunk = (arr, n) =>
  Array.from(Array(Math.ceil(arr.length / n)), (_, i) =>
    arr.slice(i * n, i * n + n)
  );

const prepareData = ({ data, numColumns, itemsPerRow }) => {
  const col = numColumns || itemsPerRow;
  const missing = data.length % col;
  return [
    ...data,
    ...Array.from(Array(col - missing)).map(() => ({ __empty: true }))
  ];
};

const prepareSectionedData = ({ data, numColumns, itemsPerRow }) => {
  const col = numColumns || itemsPerRow;
  if (Array.isArray(data)) {
    return data.map(row => ({
      ...row,
      data: chunk(prepareData({ data: row.data, numColumns: col }), col)
    }));
  } else if (typeof data === 'object') {
    // support of v1
    return Object.keys(data).map(title => ({
      title,
      data: chunk(prepareData({ data: data[title], numColumns: col }), col)
    }));
  }
  return [];
};

export default class Grid extends Component {
  static propTypes = {
    itemsPerRow: PropTypes.number,
    numColumns: PropTypes.number,
    renderItem: PropTypes.func.isRequired,
    renderPlaceholder: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    sections: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    itemsPerRow: 3,
    renderPlaceholder: null,
    sections: false
  };

  constructor(props) {
    super(props);
    if (props.sections === true) {
      this.state = {
        data: prepareSectionedData(this.props)
      };
    } else {
      this.state = {
        data: prepareData(this.props)
      };
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.sections === true) {
      return {
        data: prepareSectionedData(nextProps)
      };
    } else {
      return {
        data: prepareData(nextProps)
      };
    }
  }

  _renderPlaceholder = () => (
    <View style={{ width: width / this.props.itemsPerRow }} />
  );

  _renderItem = ({ item, index }) => {
    if (item) {
      if (typeof item === 'object' && item.__empty) {
        // render a placeholder
        if (this.props.renderPlaceholder) {
          return this.props.renderPlaceholder(index);
        }
        return this._renderPlaceholder(index);
      }
      return this.props.renderItem(item, index);
    }
  };

  _renderRow = ({ item }) => (
    <View style={styles.row}>
      {item.map((item, i) => {
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
  );

  render() {
    // TODO: find a better way to filter props that we pass to ListView
    /* eslint-disable no-unused-vars */
    const {
      renderPlaceholder,
      renderItem,
      itemsPerRow,
      sections,
      style,
      data,
      numColumns, // To depricate itemsPerRow
      ...props
    } = this.props;
    /* eslint-enable no-unused-vars */

    return (
      <View style={styles.container}>
        {sections ? (
          <SectionList
            {...props}
            sections={this.state.data}
            numColumns={numColumns || itemsPerRow}
            style={[styles.list, style]}
            renderItem={this._renderRow}
          />
        ) : (
          <FlatList
            {...props}
            data={this.state.data}
            numColumns={numColumns || itemsPerRow}
            style={[styles.list, style]}
            renderItem={this._renderItem}
          />
        )}
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
