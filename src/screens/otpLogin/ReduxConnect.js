import { connect } from 'react-redux';
import { resetAuth, resetLogin, uploadOtpLoginAsync } from '../../redux/features/auth/authSlice';
import { NAV_NAME_HOME_MENU } from '../../tools/constant';
import NavigationService from '../../tools/navigationService';
import OtpLoginScreen from './OtpLogin';

const mapStateToProps = state => {
    return ({
        email: state.auth.email,
        password: state.auth.password,
        isError: state.auth.isError,
        isSuccess: state.auth.isSuccess,
        isLoading: state.auth.isLoading,
        message: state.auth.message,
        otpUser: state.auth.otpUser,
        companyUserId: state.auth?.loginInfo?.ID_COMPANY ? state.auth?.loginInfo?.ID_COMPANY : '',
    })
};

const mapDispatchToProps = (dispatch) => ({
    validateOtpLogin: (email, otpArray) => {
        const data = {
            EMAIL: email,
            OTP: otpArray.join('')
        };
        dispatch(uploadOtpLoginAsync(data))
    },
    onNavigationHome: () => {
        dispatch(resetAuth())
        dispatch(resetLogin())
        NavigationService.reset(NAV_NAME_HOME_MENU)
    },
    onCloseModalError: () => dispatch(resetAuth()),
});


export default connect(mapStateToProps, mapDispatchToProps)(OtpLoginScreen);
