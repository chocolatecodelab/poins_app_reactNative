import { connect } from 'react-redux';
import { downloadingCustomerAsync, resetDataBarginOnline, resetStatuBarginOnline } from '../../redux/features/barginOnline/barginOnlineSlice';
import BargingOnlineStepOneScreen from './BargingOnlineStepOne';

const mapStateToProps = state => {
    return ({
        customers: state.barginOnline.customers,
        isLoading: state.barginOnline.isLoading,
        isSuccess: state.barginOnline.isSuccess,
        isError: state.barginOnline.isError,
        message: state.barginOnline.message,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: () => {
        dispatch(resetDataBarginOnline())
        dispatch(downloadingCustomerAsync())
    },
    onCloseModalError: () => {
        dispatch(resetStatuBarginOnline())
    },
    onSubmitAddTugBoat: (data) => {
        // dispatch(uploadingAddTugBoatAsync(data))
    },
    onSubmitAddBarge: (data) => {
        // dispatch(uploadingAddBargeAsync(data))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(BargingOnlineStepOneScreen);
