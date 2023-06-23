import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import NavigationService from '../../tools/navigationService';
import { H3 } from '../labels/Labels';
import { COLOR_DISABLED, COLOR_PRIMARY, COLOR_WHITE } from '../../tools/constant';
import { iconTools, ios } from "../../tools/helper";


const styles = {
  container: {
    height: 50,
    width: '100%',
    backgroundColor: COLOR_PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderCollor: COLOR_DISABLED,
    position: 'relative',
  },
};

const renderBackButton = (backButton, onBackPressed,) => {
  if (backButton) {
    return (
      <TouchableOpacity
        style={{ marginLeft: 10, position: 'absolute', zIndex: 9 }}
        onPress={onBackPressed}
      >
        <iconTools.Ionicons
          name={'chevron-back-outline'}
          color={COLOR_WHITE}
          size={25}
        />
      </TouchableOpacity>
    );
  }
  return null;
};

const renderRightIcon = (rightButton, onRightPressed, iconType, iconName) => {
  if (rightButton && iconType) {
    let Tag = iconType;
    return (
      <TouchableOpacity
        onPress={onRightPressed}
      >
        <Tag
          name={iconName}
          color={COLOR_WHITE}
          size={25}
        />
      </TouchableOpacity>
    );
  }
  return null;
};

const renderTitle = (pageTitle, fontSize) => (
  <H3
    style={{
      flex: 1,
      color: COLOR_WHITE,
      fontWeight: 'bold',
      fontSize: fontSize ? fontSize : 16,
      textAlign: 'center'
    }}>
    {pageTitle}
  </H3>
);

const PageHeader = ({
  pageTitle, backButton, onBackPressed, onRightPressed,
  customHeader, fontSize, iconType, iconName, rightButton
}) => (
  <View style={[styles.container, customHeader]}>
    {renderBackButton(backButton, onBackPressed, iconName)}
    {renderTitle(pageTitle, fontSize)}
    {renderRightIcon(rightButton, onRightPressed, iconType, iconName)}
  </View>
);

export default PageHeader;

PageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  backButton: PropTypes.bool,
  rightButton: PropTypes.bool,
  onBackPressed: PropTypes.func,
  onRightPressed: PropTypes.func,
  iconName: PropTypes.string,
};

PageHeader.defaultProps = {
  backButton: false,
  rightButton: false,
  onBackPressed: () => { NavigationService.back(); },
};
