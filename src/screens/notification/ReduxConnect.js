import { connect } from 'react-redux';
import { resetHome, downlodingListNotificationAsync, uploadNotificationChangeAsync } from '../../redux/features/home/homeSlice';
import NotificationScreen from './Notification';



const mapStateToProps = state => {
    return ({
        isError: state.home.isError,
        isInfo: state.home.isInfo,
        message: state.home.message,
        apps: state.home?.apps,
        notification: state.home?.notification,
        isChangeNotificationStatus: state.home?.isChangeNotificationStatus,
        isChangeNotificationStatusSuccess: state.home?.isChangeNotificationStatusSuccess,
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
        isDownloadingApps: state.home.isDownloadingApps
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (userId) => {
        dispatch(resetHome())
        dispatch(downlodingListNotificationAsync(userId))
    },
    onCloseModalError: (userId) => {
        console.log(userId);
        dispatch(resetHome())
        dispatch(downlodingListNotificationAsync(userId))
    },
    onChangeNotification: (params) => {
        dispatch(uploadNotificationChangeAsync(params))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
