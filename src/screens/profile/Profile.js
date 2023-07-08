import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Button, TextInputFloating, BaseScreen, MyModalSuccess, MyModalError, MyModal, Body, BodyLarge, MyHeader, HorizontalLine } from "../../components";
import {
  COLOR_BLACK, COLOR_ERROR, COLOR_MAIN_SECONDARY, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_TRANSPARENT_DISABLED, COLOR_WHITE
} from '../../tools/constant';
import { iconTools, ios } from '../../tools/helper';
import LocalizedString from '../../tools/localization';

const Profile = ({
  onAppear, data, onSelectedGallery, onUpdateProfile, isUpdatingProfile, isUpdatingProfileSuccess,
  isUpdatingImage, isUpdatingImageSuccess, isError, message, onCloseModalSuccess, onCloseModalError,
  onSelectedCamera, onLogoutPressed, userId, version
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [editProfile, setEditProfile] = useState(false)
  const [showModalFilePicker, setShowModalFilePicker] = useState(false)
  useEffect(() => {
    onAppear()
  }, [])

  useEffect(() => {
    if (isUpdatingProfileSuccess === true) {
      setEditProfile(false)
    }
    if (isUpdatingImageSuccess) {
      setShowModalFilePicker(false)
    }
  }, [isUpdatingImageSuccess, isUpdatingProfileSuccess])

  return (
    <BaseScreen
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}
      translucent
      containerStyle={{ paddingTop: ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
    >
      <MyHeader
        pageTitle='Profile'
        backButton
        rightButton
        iconType={iconTools.MaterialCommunityIcons}
        iconName={'logout'}
        onRightPressed={onLogoutPressed}
      />
      <View style={{ paddingHorizontal: 25 }}>
        {/* <H1 bold style={styles.title}>PROFILE</H1> */}
        <View style={{ marginVertical: 50, width: '100%', alignItems: 'center' }}>
          <View style={styles.wrapperAvatar}>
            {data.photo ?
              <Image
                source={{ uri: data?.photo }}
                style={styles.avatar}
              /> :
              <Image
                source={require('../../assets/images/user.png')}
                style={styles.avatar}
              />
            }
            <TouchableOpacity
              style={styles.addPicture}
              onPress={() => setShowModalFilePicker(!showModalFilePicker)}>
              <iconTools.Ionicons
                name={'camera'}
                size={18}
                color={COLOR_WHITE}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10 }}>
            <Body>Nama :</Body>
            <Body style={{ flex: 0.8, textAlign: 'right' }}>{data?.name}</Body>
          </View>
          <HorizontalLine width={'100%'} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginVertical: 10 }}>
            <Body>Email :</Body>
            <Body style={{ flex: 0.8, textAlign: 'right' }}>{data?.email}</Body>
          </View>
          <HorizontalLine width={'100%'} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 10 }}>
            <Body>Nomor HP :</Body>
            <Body style={{ flex: 0.8, textAlign: 'right' }}>{data?.phoneNumber}</Body>
          </View>
        </View>

        <Button
          caption={'Edit'}
          containerStyle={{ backgroundColor: COLOR_MAIN_SECONDARY, marginVertical: 5 }}
          disabled={isUpdatingProfile || isUpdatingImage}
          loading={isUpdatingProfile || isUpdatingImage}
          onPress={() => setEditProfile(!editProfile)}
        />
      </View>
      {showModalFilePicker &&
        <MyModal
          contentStyle={{ padding: 15 }}
          isVisible={showModalFilePicker}
          closeModal={() => setShowModalFilePicker(!showModalFilePicker)}>
          <View style={{ padding: 5 }}>
            <BodyLarge style={{
              color: COLOR_PRIMARY,
              textAlign: 'center'
            }} bold>EDIT PHOTO</BodyLarge>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={() => onSelectedCamera(setShowModalFilePicker, userId)}
              >
                <iconTools.Ionicons
                  name={'camera-outline'}
                  size={50}
                  color={COLOR_WHITE}
                />
                <Body style={{ color: COLOR_WHITE }}>Camera</Body>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={() => onSelectedGallery(setShowModalFilePicker, userId)}
              >
                <iconTools.Ionicons
                  name={'images-outline'}
                  size={50}
                  color={COLOR_WHITE}
                />
                <Body style={{ color: COLOR_WHITE }}>Gallery</Body>
              </TouchableOpacity>
            </View>
            <Button
              caption={'Cancel'}
              containerStyle={{ backgroundColor: COLOR_ERROR, marginTop: 15 }}
              onPress={() => setShowModalFilePicker(!setShowModalFilePicker)}
            />
          </View>
        </MyModal>
      }
      {editProfile &&
        <MyModal
          isVisible={editProfile}
          contentStyle={{ padding: 15 }}
          closeModal={() => setEditProfile(!editProfile)}>
          <View style={{ marginTop: 10, marginBottom: 20, }}>
            <BodyLarge bold style={{ color: COLOR_PRIMARY }}>EDIT INFO PROFILE</BodyLarge>
          </View>
          <View>
            <TextInputFloating
              style={[{ marginBottom: 30 }]}
              iconType={iconTools.MaterialCommunityIcons}
              IconName={'account'}
              iconSize={24}
              iconColor={COLOR_PRIMARY}
              iconActive={true}
              value={name ? name : data.name}
              label="Name"
              editable={editProfile}
              onChangeText={(text) => setName(text)}
            />
            <TextInputFloating
              style={[{ marginBottom: 30 }]}
              iconType={iconTools.MaterialCommunityIcons}
              IconName={'email'}
              iconSize={24}
              iconColor={COLOR_PRIMARY}
              iconActive={true}
              value={email ? email : data.email}
              label="Email"
              editable={editProfile}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Button
              caption={'Cancel'}
              containerStyle={{ backgroundColor: COLOR_ERROR, marginVertical: 5, flex: 1, marginRight: 5 }}
              disabled={isUpdatingProfile}
              loading={isUpdatingProfile}
              onPress={() => setEditProfile(false)}
            />
            <Button
              caption={'Update'}
              containerStyle={{ backgroundColor: COLOR_PRIMARY, marginVertical: 5, flex: 1, marginLeft: 5 }}
              disabled={isUpdatingProfile}
              loading={isUpdatingProfile}
              onPress={() => {
                // setEditProfile(false)
                onUpdateProfile(name ? name : data.name, email ? email : data.email, data.phoneNumber, data.password, userId)
              }}
            />
          </View>
        </MyModal>
      }
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 15, alignItems: 'center' }}>
        <Body>Versi {ios ? version[1].app_version : version[0].app_version}</Body>
      </View>
      <MyModalSuccess
        isVisible={isUpdatingProfileSuccess || isUpdatingImageSuccess}
        closeModal={() => onCloseModalSuccess(userId)}
        message={LocalizedString.profileScreen.updateSuccess}
      />
      <MyModalError
        isVisible={isError}
        closeModal={onCloseModalError}
        message={message}
      />
    </BaseScreen>
  )
}

export default Profile

const styles = StyleSheet.create({
  title: {
    color: COLOR_PRIMARY,
    alignSelf: 'center'
  },
  wrapperAvatar: {
    borderWidth: 2.5,
    height: 135,
    width: 135,
    borderRadius: 135,
    borderColor: COLOR_TRANSPARENT_DISABLED
  },
  avatar: {
    height: 130,
    width: 130,
    alignSelf: 'center',
    borderRadius: 130
  },
  addPicture: {
    position: 'absolute',
    top: 90,
    left: 96,
    backgroundColor: COLOR_MAIN_SECONDARY,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: COLOR_WHITE,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoButton: {
    height: 120,
    width: '47%',
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 5,
  },
  card: {
    backgroundColor: COLOR_WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR_TRANSPARENT_DARK,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    padding: 15,
    marginBottom: 15
  }
})