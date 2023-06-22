import React from 'react';
import {StyleSheet, View, ViewPropTypes, TextInput} from 'react-native';
import PropTypes from 'prop-types';


 const CustomTextInput = (props) => {
  const {
    containerStyle,
    style,
    LeftComponent,
    RightComponent,
    refCallback,
    ...remainingProps
  } = props;
  return (
    <>
     <View style={[styles.containerStyle, containerStyle]}>
      {LeftComponent}
      <TextInput
        {...remainingProps}
        style={[styles.textInputStyle, style]}
        ref={refCallback}
      />
      {RightComponent}
    </View>
    </>
   
  );
};

export default CustomTextInput

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    // borderRadius: 4,
    // padding: 8,
    // backgroundColor:'red'
  },
  textInputStyle: {
    // flex:1,
    // padding: 0,
  },
});
