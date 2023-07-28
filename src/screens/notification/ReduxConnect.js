import { connect } from 'react-redux';
import { downlodingCheckVersionAsync, downlodingMenuAppsAsync, resetHome, showInfo, addMessage, downlodingListNotificationAsync } from '../../redux/features/home/homeSlice';
import { downlodingProfileAsync, resetProfile } from '../../redux/features/profile/profileSlice';
import NotificationScreen from './Notification';
import NavigationService from '../../tools/navigationService';
import { NAV_NAME_PROFILE } from '../../tools/constant';
import { Linking } from 'react-native';
import { downloadingActiveBargingAsync } from '../../redux/features/activeBarging/activeBargingSlice';

const transformDataBarging = (state) => {
    const dummyData = [
        {
            EndDate: "2023-07-13T08:42:00",
            Customer: "Not Order",
            Barge: "Not Order",
            Tug_Boat: "Not Order",
            StartWeight: 0,
            Target_Barging: 0,
            persentasevolumeProgres: 0,
            Jetty: "JETTY-J",
            Kode: "STAND BY"
        },
        {
            EndDate: "2023-07-13T08:42:00",
            Customer: "Not Order",
            Barge: "Not Order",
            Tug_Boat: "Not Order",
            StartWeight: 0,
            Target_Barging: 0,
            persentasevolumeProgres: 0,
            Jetty: "JETTY-U",
            Kode: "STAND BY"
        },
        {
            EndDate: null,
            Customer: "Not Order",
            Barge: "Not Order",
            Tug_Boat: "Not Order",
            StartWeight: 0,
            Target_Barging: 0,
            persentasevolumeProgres: 0,
            Jetty: "JETTY-K",
            Kode: "STAND BY"
        }
    ];
    if (state.activeBarging.listHistory.length === 0) {
        return dummyData
    } else {
        let data = state.activeBarging.listHistory.map((item) => item);
        return data
    }
};

const mapStateToProps = state => {
    return ({
        isError: state.home.isError,
        isInfo: state.home.isInfo,
        message: state.home.message,
        apps: state.home?.apps,
        data: state.home?.notification,
        listHistory: transformDataBarging(state),
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
        isDownloadingApps: state.home.isDownloadingApps
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (userId) => {
        dispatch(resetHome())
        dispatch(resetProfile())
        dispatch(downlodingProfileAsync(userId))
        dispatch(downlodingMenuAppsAsync(userId))
        dispatch(downlodingCheckVersionAsync())
    },
    onAppearFocus: (userId) => {
        dispatch(resetHome())
        dispatch(downlodingListNotificationAsync(userId))
        dispatch(downloadingActiveBargingAsync())
    },
    onCloseModal: () => {
        dispatch(resetHome())
    },
    onProfilePressed: () => {
        NavigationService.navigate(NAV_NAME_PROFILE)
    },
    onItemPressed: async (url) => {
        if (url === null) {
            dispatch(showInfo(true))
            dispatch(addMessage("Tahap Development"))
        } else {
            await Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url)
                        .then(aa => console.log('openURL resp.:', aa))
                        .catch(err => console.log('openURL error:', err));
                } else {
                    console.log('url not valid');
                }
            });

        }
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
