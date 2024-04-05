import React from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { COLOR_HORIZONTAL_LINE } from '../../tools/constant';

const { width: screenWidth } = Dimensions.get('window');

const styles = {
  divider: {
    borderWidth: 0.7,
  },
};

const DividerLine = ({ width, borderColor }) => (
  <View style={[styles.divider, { width, borderColor, marginVertical: 5 }]} />
);

export default DividerLine;

DividerLine.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderColor: PropTypes.string,
};

DividerLine.defaultProps = {
  width: screenWidth,
  borderColor: COLOR_HORIZONTAL_LINE,
};
