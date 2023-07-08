import { connect } from 'react-redux';
import { downlodingCheckVersionAsync, downlodingMenuAppsAsync, resetHome, showInfo, addMessage } from '../../redux/features/home/homeSlice';
import { downlodingProfileAsync, resetProfile } from '../../redux/features/profile/profileSlice';
import HomeScreen from './Home';
import NavigationService from '../../tools/navigationService';
import { NAV_NAME_PROFILE } from '../../tools/constant';
import { Linking } from 'react-native';
import { ios } from '../../tools/helper';

const transformDataApp = (state) => {
    let item = []
    let size = 2;
    let listApp = [...state.home.apps];
    if (!state.home.isDownloadingApps) {
        while (listApp?.length > 0)
            item.push(listApp?.splice(0, size));
        return item
    } else {
        return []
    }
};

const mapStateToProps = state => {
    return ({
        isError: state.home.isError,
        isInfo: state.home.isInfo,
        message: state.home.message,
        apps: transformDataApp(state),
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
        isDownloadingApps: state.home.isDownloadingApps
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (userId) => {
        dispatch(resetHome())
        dispatch(resetProfile())
        dispatch(downlodingProfileAsync(userId))
        dispatch(downlodingMenuAppsAsync())
        dispatch(downlodingCheckVersionAsync())
    },
    onCloseModal: () => { dispatch(resetHome()) },
    onProfilePressed: () => {
        NavigationService.navigate(NAV_NAME_PROFILE)
    },
    onItemPressed: (url) => {
        if (url === null) {
            dispatch(showInfo(true))
            dispatch(addMessage("Tahap Development"))
        } else {
            Linking.openURL(url)
        }
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
