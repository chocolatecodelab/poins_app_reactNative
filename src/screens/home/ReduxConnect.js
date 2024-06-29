import { connect } from 'react-redux';
import { downlodingCheckVersionAsync, downlodingMenuAppsAsync, resetHome, showInfo, addMessage, downlodingListNotificationAsync } from '../../redux/features/home/homeSlice';
import { downlodingProfileAsync, resetProfile } from '../../redux/features/profile/profileSlice';
import HomeScreen from './Home';
import NavigationService from '../../tools/navigationService';
import { NAV_NAME_NOTIFICATION, NAV_NAME_PROFILE } from '../../tools/constant';
import { Linking } from 'react-native';
import { downloadingActiveBargingAsync } from '../../redux/features/activeBarging/activeBargingSlice';
import { downloadingCustomerAsync } from '../../redux/features/barginOnline/barginOnlineSlice';
import { downloadingBalanceCargoAsync } from '../../redux/features/balanceCargo/balanceCargoSlice';

const mapStateToProps = state => {
    return ({
        email: state.auth.email,
        isError: state.home.isError,
        isInfo: state.home.isInfo,
        message: state.home.message,
        apps: state.home?.apps,
        notification: state.home?.notification,
        listHistory: state.activeBarging?.listHistory,
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
        isDownloadingApps: state.home.isDownloadingApps,
        companyUserId: state.profile.data.companyId,
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
        dispatch(downloadingCustomerAsync())
        dispatch(downloadingBalanceCargoAsync())
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
