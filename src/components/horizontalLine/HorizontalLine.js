import React from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { COLOR_HORIZONTAL_LINE } from '../../tools/constant';

const { width: screenWidth } = Dimensions.get('window');

const styles = {
  horizontalLine: {
    borderWidth: 1,
  },
};

const HorizontalLine = ({ width, borderColor }) => (
  <View style={[styles.horizontalLine, { width, borderColor }]} />
);

export default HorizontalLine;

HorizontalLine.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderColor: PropTypes.string,
};

HorizontalLine.defaultProps = {
  width: screenWidth,
  borderColor: COLOR_HORIZONTAL_LINE,
};
