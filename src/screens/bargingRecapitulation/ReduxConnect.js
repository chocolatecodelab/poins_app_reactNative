import { connect } from 'react-redux';
import { downloadingBargingRecapitulationAsync, resetBargingRecapitulation } from '../../redux/features/bargingRecapitulation/bargingRecapitulattionSlice';
import BargingRecapitulationScreen from './BargingRecapitulation';
import NavigationService from '../../tools/navigationService';
import { NAV_NAME_BARGING_RECAPITULATION_DETAIL } from '../../tools/constant';

const mapStateToProps = state => {
    return ({
        listHistory: state.bargingRecapitulation.listHistory,
        isLoading: state.bargingRecapitulation.isLoading,
        isSuccess: state.bargingRecapitulation.isSuccess,
        isError: state.bargingRecapitulation.isError,
        message: state.bargingRecapitulation.message,
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (id, startDate, finishDate) => {
        const today = new Date()
        const transfromStartDate = startDate ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const transfromFinishDate = finishDate ? `${finishDate.getFullYear()}-${finishDate.getMonth() + 1}-${finishDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const params = { id, startDate: transfromStartDate, finishDate: transfromFinishDate }
        dispatch(downloadingBargingRecapitulationAsync(params))
    },
    onCloseModalError: () => {
        dispatch(resetBargingRecapitulation())
    },
    onDetailPressed: () => {
        // NavigationService.navigate(NAV_NAME_BARGING_RECAPITULATION_DETAIL)
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(BargingRecapitulationScreen);
