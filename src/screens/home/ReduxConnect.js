import { connect } from 'react-redux';
import { downlodingCheckVersionAsync, downlodingMenuAppsAsync, resetHome, showInfo, addMessage, downlodingListNotificationAsync } from '../../redux/features/home/homeSlice';
import { downlodingProfileAsync, resetProfile } from '../../redux/features/profile/profileSlice';
import HomeScreen from './Home';
import NavigationService from '../../tools/navigationService';
import { NAV_NAME_NOTIFICATION, NAV_NAME_PROFILE } from '../../tools/constant';
import { Linking } from 'react-native';
import { downloadingActiveBargingAsync } from '../../redux/features/activeBarging/activeBargingSlice';

const transformDataBarging = (state) => {
    console.log('test',state.activeBarging.listHistory);
    const dummyData = [
        {
            EndDate: "2023-07-13T08:42:00",
            Company: "Not Order",
            Barge: "Not Order",
            Boat: "Not Order",
            Weight: 0,
            Planload: 0,
            WeightPercentage: 0,
            nodeDesc: "JETTY-J",
            Kode: "STAND BY"
        },
        {
            EndDate: "2023-07-13T08:42:00",
            Company: "Not Order",
            Barge: "Not Order",
            Boat: "Not Order",
            Weight: 0,
            Planload: 0,
            WeightPercentage: 0,
            nodeDesc: "JETTY-U",
            Kode: "STAND BY"
        },
        {
            EndDate: null,
            Company: "Not Order",
            Barge: "Not Order",
            Boat: "Not Order",
            Weight: 0,
            Planload: 0,
            WeightPercentage: 0,
            nodeDesc: "JETTY-K",
            Kode: "STAND BY"
        }
    ];
    if (state.activeBarging.listHistory.length === 0) {
        return dummyData
    } else {
        console.log('test',state.activeBarging.listHistory);
        return state.activeBarging.listHistory
    }
};

const mapStateToProps = state => {
    return ({
        isError: state.home.isError,
        isInfo: state.home.isInfo,
        message: state.home.message,
        apps: state.home?.apps,
        notification: state.home?.notification,
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
        dispatch(downloadingActiveBargingAsync())
        dispatch(downlodingListNotificationAsync(userId))
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
    onFiturDevelopmentPressed: () => {
        dispatch(showInfo(true))
        dispatch(addMessage("Tahap Development"))
    },
    onNotificationPressed: () => {
        NavigationService.navigate(NAV_NAME_NOTIFICATION)
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
