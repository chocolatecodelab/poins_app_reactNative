import { connect } from 'react-redux';
import { resetAuth, resetLogin, setEmail, setPassword, uploadLoginAsync } from '../../redux/features/auth/authSlice';
import { NAV_NAME_FORGET_PASSWORD, NAV_NAME_OTP_LOGIN, NAV_NAME_REGISTER } from '../../tools/constant';
import NavigationService from '../../tools/navigationService';
import LoginScreen from './Login';

const mapStateToProps = state => {
    return ({
        email: state.auth.email,
        password: state.auth.password,
        isError: state.auth.isError,
        isSuccess: state.auth.isSuccess,
        isLoading: state.auth.isLoading,
        message: state.auth.message,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: () => {
        dispatch(resetLogin())
        dispatch(resetAuth())
    },
    onChangeEmail: (e) => dispatch(setEmail(e)),
    onChangePassword: (e) => dispatch(setPassword(e)),
    onSubmitPressed: (email, password, setErrorPassword, setErrorEmail) => {
        !password && setErrorPassword('This field is required.')
        !email && setErrorEmail('This field is required.')
        if (email && password) {
            const data = {
                EMAIL: email,
                PASSWORD: password
            }
            dispatch(uploadLoginAsync(data));
        }
    },
    onNavigationOtp: () => {
        dispatch(resetAuth())
        NavigationService.navigate(NAV_NAME_OTP_LOGIN)
    },
    onNavigationRegister: () => {
        dispatch(resetLogin())
        dispatch(resetAuth())
        NavigationService.navigate(NAV_NAME_REGISTER)
    },
    onNavigationForgetPassword: () => {
        dispatch(resetLogin())
        dispatch(resetAuth())
        NavigationService.navigate(NAV_NAME_FORGET_PASSWORD)
    },
    onCloseModalError: () => dispatch(resetAuth()),
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
