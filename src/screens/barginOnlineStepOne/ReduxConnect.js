import { connect } from 'react-redux';
import { downloadingCustomerAsync, resetDataBarginOnline, resetStatuBarginOnline } from '../../redux/features/barginOnline/barginOnlineSlice';
import BarginOnlineStepOneScreen from './BarginOnlineStepOne';

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
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(BarginOnlineStepOneScreen);
