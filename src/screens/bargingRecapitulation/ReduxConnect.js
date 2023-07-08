import { connect } from 'react-redux';
import { downloadingHistoryBarginOnlineAsync, resetHistoryBarginOnline } from '../../redux/features/history/historyBarginOnlineSlice';
import BargingRecapitulationScreen from './BargingRecapitulation';
import NavigationService from '../../tools/navigationService';
import { NAV_NAME_BARGING_RECAPITULATION_DETAIL } from '../../tools/constant';

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
    onAppear: (id, startDate, finishDate) => {
        const today = new Date()
        const transfromStartDate = startDate ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const transfromFinishDate = finishDate ? `${finishDate.getFullYear()}-${finishDate.getMonth() + 1}-${finishDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const params = { id, startDate: transfromStartDate, finishDate: transfromFinishDate }
        dispatch(downloadingHistoryBarginOnlineAsync(params))
    },
    onCloseModalError: () => {
        dispatch(resetHistoryBarginOnline())
    },
    onDetailPressed: () => {
        // NavigationService.navigate(NAV_NAME_BARGING_RECAPITULATION_DETAIL)
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(BargingRecapitulationScreen);
