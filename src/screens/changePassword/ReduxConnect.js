import { connect } from 'react-redux';
import ChangePasswordScreen from './ChangePassword';
import { resetAllForgetPassword, resetStateForgetPassword, uploadNewPasswordAsync } from '../../redux/features/forgetPassword/forgetPasswordSlice';
import { NAV_NAME_LOGIN } from '../../tools/constant';
import NavigationService from '../../tools/navigationService';

const mapStateToProps = (state, props) => {
    return ({
        isError: state.forgetPassword.isError,
        isSuccess: state.forgetPassword.isSuccess,
        isLoading: state.forgetPassword.isLoading,
        message: state.forgetPassword.message,
        email: state.forgetPassword?.email ? state.forgetPassword?.email : props.route.params?.email,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onSubmitPressed: (email, password) => {
        const data = {
            EMAIL: email,
            PASSWORD: password
        }
        dispatch(uploadNewPasswordAsync(data))
    },
    onCloseModalError: () => {
        dispatch(resetStateForgetPassword());
    },
    onCloseModalSuccess: () => {
        dispatch(resetAllForgetPassword());
        NavigationService.reset(NAV_NAME_LOGIN)
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);
