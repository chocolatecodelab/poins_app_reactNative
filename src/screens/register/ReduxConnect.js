import { connect } from 'react-redux';
import { fetchRegister, resetError, resetRegister } from '../../redux/features/register/registerSlice';
import { downloadingCustomerAsync } from '../../redux/features/barginOnline/barginOnlineSlice';
import RegisterScreen from './Register';

const mapStateToProps = state => {
    return ({
        isError: state.register.isError,
        isSuccess: state.register.isSuccess,
        isLoading: state.register.isLoading,
        message: state.register.message,
        customers: state.barginOnline.customers,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onSubmitPressed: (data) => {
        const userData = {
            EMAIL: data.email,
            PASSWORD: data.password,
            TELEPON: data.phoneNumber,
            NAMA: data.name,
            ID_COMPANY: data.idCompany,
        }
        dispatch(fetchRegister(userData))
    },
    onAppear: () => {
        dispatch(resetRegister())
        dispatch(downloadingCustomerAsync())
    },
    onCloseModal: () => dispatch(resetError()),
});


export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
