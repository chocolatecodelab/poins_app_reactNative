import React from 'react';
import { View, TextInput } from 'react-native';
import {
  COLOR_DISABLED, COLOR_WHITE, COLOR_BLACK, COLOR_TRANSPARENT_DISABLED, COLOR_PRIMARY,
} from '../../tools/constant';
import {
  iconTools
} from '../../tools/helper';
import { Body } from '../labels/Labels';

const styles = {
  container: (activeIcon) => ({
    height: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR_TRANSPARENT_DISABLED,
    borderRadius: 50,
    paddingHorizontal: activeIcon ? 18 : 0,
  }),
  searchText: (activeIcon) => ({
    flex: 1,
    paddingHorizontal: activeIcon ? 4 : 0,
    color: COLOR_BLACK
  }),
  spacer: {
    height: 1,
    width: 5,
  },
};

const renderTextInput = (value, onFocus, placeholder, autoFocus, disabled, onTextChanged, customColor, activeIcon) => {
  if (disabled) {
    return (
      <View style={styles.searchText(activeIcon)}>
        <Body>{placeholder}</Body>
      </View>
    );
  }
  return (
    <TextInput
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      value={value}
      style={styles.searchText(activeIcon)}
      onChangeText={text => onTextChanged(text)}
      onFocus={onFocus}
      autoFocus={autoFocus}
      editalbe={!disabled}
      placeholderTextColor={customColor ? customColor : COLOR_DISABLED}
    />
  );
};
const SearchBar = ({
  placeholder, value, onTextChanged, onDeletePressed, containerStyle, disabled, onFocus, autoFocus, customColor,
  activeIcon, iconSearch
}) => (
  <View style={[styles.container(activeIcon), containerStyle]}>
    {activeIcon &&
      <iconTools.Ionicons
        name="search"
        size={20}
        color={customColor ? customColor : COLOR_DISABLED}
      />
    }
    {activeIcon &&
      <View style={styles.spacer} />
    }

    {renderTextInput(value, onFocus, placeholder, autoFocus, disabled, onTextChanged, customColor, activeIcon)}
    {activeIcon &&
      <iconTools.Feather
        name="x"
        size={20}
        color={customColor ? customColor : COLOR_DISABLED}
        onPress={onDeletePressed}
        disabled={disabled}
      />
    }
    {iconSearch === 'right' &&
      <iconTools.Ionicons
        name="search"
        size={20}
        style={{ paddingRight: 15 }}
        color={customColor ? customColor : COLOR_DISABLED}
      />
    }
  </View>
);

export default SearchBar;
