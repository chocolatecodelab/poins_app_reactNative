import { connect } from 'react-redux';
import { downloadingHistoryBarginOnlineAsync, resetHistoryBarginOnline } from '../../redux/features/history/historyBarginOnlineSlice';
import HistoryBarginOnlineStepOneScreen from './History';

const mapStateToProps = state => {
    return ({
        listHistory: state.historyBarginOnline.listHistory,
        isLoading: state.historyBarginOnline.isLoading,
        isSuccess: state.historyBarginOnline.isSuccess,
        isError: state.historyBarginOnline.isError,
        message: state.historyBarginOnline.message,
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (id) => {
        dispatch(downloadingHistoryBarginOnlineAsync(id))
    },
    onCloseModalError: () => {
        dispatch(resetHistoryBarginOnline())
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(HistoryBarginOnlineStepOneScreen);
