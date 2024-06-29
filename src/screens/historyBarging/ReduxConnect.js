import {connect} from 'react-redux';
import HistoryBargingScreen from './historyBarging';
import { downloadingHistoryBargingAsync, resetHistoryBarging } from '../../redux/features/historyBarging/historyBargingSlice';


const mapStateToProps = state => {
    return ({
        listHistoryBarging: state.historyBarging?.listHistoryBarging,
        isLoading: state.historyBarging.isLoading,
        isSuccess: state.historyBarging.isSuccess,
        isError: state.historyBarging.isError,
        message: state.historyBarging.message,
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
        companyUserId: state.profile.data.companyId,
        customers: state.barginOnline.customers,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (companyUserId) => {
        dispatch(resetHistoryBarging())
        dispatch(downloadingHistoryBargingAsync(companyUserId))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryBargingScreen)
