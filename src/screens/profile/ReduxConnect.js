import { connect } from 'react-redux';
import ProfileScreen from './Profile';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { NativeModules } from 'react-native';
import { downlodingProfileAsync, resetProfile, updatingProfileAsync, uploadImageProfileAsync } from '../../redux/features/profile/profileSlice';
import { logout } from '../../redux/features/auth/authSlice';
import NavigationService from '../../tools/navigationService';
import { NAV_NAME_LOGIN } from '../../tools/constant';
// const RNFetchBlob = NativeModules.RNFetchBlob

const mapStateToProps = state => {
    return ({
        isError: state.profile.isError,
        isUpdatingProfile: state.profile.isUpdatingProfile,
        isUpdatingProfileSuccess: state.profile.isUpdatingProfileSuccess,
        isUpdatingImage: state.profile.isUpdatingImage,
        isUpdatingImageSuccess: state.profile.isUpdatingImageSuccess,
        message: state.profile.message,
        data: state.profile.data,
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
    })
};

const mapDispatchToProps = (dispatch) => ({
    onSelectedGallery: (setShowModalFilePicker, userId) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.8,
            cropperCircleOverlay: true
        }).then(image => {
            RNFetchBlob.fs.readFile(image.path, 'base64')
                .then(base64Data => {
                    const data = {
                        id: userId,
                        photo: base64Data,
                    }
                    dispatch(uploadImageProfileAsync(data))
                    // setShowModalFilePicker(false)
                })
        })
            .catch(error => {
                console.log(error);
            });
    },
    onSelectedCamera: (setShowModalFilePicker, userId) => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.8,
            cropperCircleOverlay: true
        }).then(image => {
            RNFetchBlob.fs.readFile(image.path, 'base64')
                .then(base64Data => {
                    const data = {
                        id: userId,
                        photo: base64Data,
                    }
                    dispatch(uploadImageProfileAsync(data))
                    // setShowModalFilePicker(false)
                })
        })
            .catch(error => {
                console.log(error);
            });
    },
    onUpdateProfile: (name, email, phoneNumber, password, userId) => {
        const data = {
            id: userId,
            name,
            email,
            phoneNumber,
            password
        }
        dispatch(updatingProfileAsync(data))
    },
    onAppear: () => {
        dispatch(resetProfile())
    },
    onCloseModalSuccess: (userId) => {
        dispatch(downlodingProfileAsync(userId));
        dispatch(resetProfile());
    },
    onCloseModalError: () => {
        dispatch(resetProfile());
    },
    onLogoutPressed: () => {
        dispatch(logout())
        NavigationService.reset(NAV_NAME_LOGIN)
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
