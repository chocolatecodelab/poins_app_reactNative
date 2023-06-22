import { connect } from 'react-redux';
import { setEmail, uploadEmailForgetPasswordAsync, resetStateForgetPassword, resetAllForgetPassword } from '../../redux/features/forgetPassword/forgetPasswordSlice';
import { NAV_NAME_OTP_FORGET_PASSWORD } from '../../tools/constant';
import NavigationService from '../../tools/navigationService';
import ForgetPasswordScreen from './ForgetPassword';

const mapStateToProps = state => {
    return ({
        isError: state.forgetPassword.isError,
        isSuccess: state.forgetPassword.isSuccess,
        isLoading: state.forgetPassword.isLoading,
        message: state.forgetPassword.message,
        email: state.forgetPassword.email,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: () => {
        dispatch(resetAllForgetPassword());
    },
    onSubmitPressed: (email, setErrorEmail) => {
        !email && setErrorEmail('This field is required.')
        if (email) {
            const data = {
                EMAIL: email,
            }
            dispatch(uploadEmailForgetPasswordAsync(data));
        }
    },
    onNavigationOtp: () => {
        dispatch(resetStateForgetPassword());
        NavigationService.navigate(NAV_NAME_OTP_FORGET_PASSWORD);
    },
    onChangeEmail: (e) => dispatch(setEmail(e)),
    onCloseModalError: () => {
        dispatch(resetStateForgetPassword());
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordScreen);
