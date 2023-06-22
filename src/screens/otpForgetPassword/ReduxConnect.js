import { connect } from 'react-redux';
import { uploadValidateOtpForgetPasswordAsync, resetStateForgetPassword } from '../../redux/features/forgetPassword/forgetPasswordSlice';
import { NAV_NAME_CHANGE_NEW_PASSWORD } from '../../tools/constant';
import NavigationService from '../../tools/navigationService';
import OtpForgetPasswordScreen from './OtpForgetPassword';

const mapStateToProps = state => {
    return ({
        email: state.forgetPassword.email,
        forgetPasswordInfo: state.forgetPassword.forgetPasswordInfo,
        isError: state.forgetPassword.isError,
        isSuccess: state.forgetPassword.isSuccess,
        isLoading: state.forgetPassword.isLoading,
        message: state.forgetPassword.message,
    })
};

const mapDispatchToProps = (dispatch) => ({
    validateOtpLogin: (email, otpArray) => {
        const data = {
            Email: email,
            Otp: otpArray.join('')
        };
        dispatch(uploadValidateOtpForgetPasswordAsync(data))
    },
    onNavigation: (email) => {
        dispatch(resetStateForgetPassword())
        NavigationService.reset(NAV_NAME_CHANGE_NEW_PASSWORD, { email: email })
    },
    onCloseModalError: () => dispatch(resetStateForgetPassword()),
});


export default connect(mapStateToProps, mapDispatchToProps)(OtpForgetPasswordScreen);
