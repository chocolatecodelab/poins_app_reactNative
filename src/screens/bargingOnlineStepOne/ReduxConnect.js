import { connect } from 'react-redux';
import { downloadingCustomerAsync, resetDataBarginOnline, resetStatuBarginOnline, uploadingAddTugBoatAsync, uploadingAddBargeAsync } from '../../redux/features/barginOnline/barginOnlineSlice';
import BargingOnlineStepOneScreen from './BargingOnlineStepOne';

const mapStateToProps = state => {
    return ({
        isUploadingSuccess: state.barginOnline.isUploadingSuccess,
        isUploadingSuccessBargeTugboat: state.barginOnline.isUploadingSuccessBargeTugboat,
        customers: state.barginOnline.customers,
        isLoading: state.barginOnline.isLoading,
        isSuccess: state.barginOnline.isSuccess,
        isError: state.barginOnline.isError,
        message: state.barginOnline.message,
        companyUserId: state.profile.data.companyId,
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
    onSubmitAddBarge: (params) => {
        dispatch(uploadingAddBargeAsync(params))
    },
    onSubmitAddTugBoat: (params) => {
        dispatch(uploadingAddTugBoatAsync(params))
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(BargingOnlineStepOneScreen);
