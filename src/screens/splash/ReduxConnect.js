import { connect } from 'react-redux';
import SplashScreen from './Splash';
import NavigationService from '../../tools/navigationService';
import { NAV_NAME_HOME_MENU, NAV_NAME_LOGIN, NAV_NAME_SENSLOG, NAV_NAME_WEATHER } from '../../tools/constant';

const mapStateToProps = state => {
    return ({
        loginInfo: state.auth.loginInfo,
    })
};

const mapDispatchToProps = () => ({
    onAppear: (loginInfo) => {
        if (loginInfo?.STATUS_LOGIN) {
            return NavigationService.replace(NAV_NAME_HOME_MENU)
        } else {
            return NavigationService.replace(NAV_NAME_LOGIN)
        }
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
