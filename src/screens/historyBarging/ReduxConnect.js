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
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (userId) => {
        dispatch(resetHistoryBarging())
        dispatch(downloadingHistoryBargingAsync(userId))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryBargingScreen)
