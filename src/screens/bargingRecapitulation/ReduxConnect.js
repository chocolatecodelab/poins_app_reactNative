import { connect } from 'react-redux';
import { downloadingBargingRecapitulationAsync, resetBargingRecapitulation, downloadingExportAsync } from '../../redux/features/bargingRecapitulation/bargingRecapitulattionSlice';
import BargingRecapitulationScreen from './BargingRecapitulation';

const mapStateToProps = state => {
    return ({
        listHistory: state.bargingRecapitulation.listHistory,
        isLoading: state.bargingRecapitulation.isLoading,
        isSuccess: state.bargingRecapitulation.isSuccess,
        isError: state.bargingRecapitulation.isError,
        message: state.bargingRecapitulation.message,
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
        companyUserId: state.profile.data.companyId,
        customers: state.barginOnline.customers,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (companyUserId, startDate, finishDate) => {
        const today = new Date()
        const transfromStartDate = startDate ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const transfromFinishDate = finishDate ? `${finishDate.getFullYear()}-${finishDate.getMonth() + 1}-${finishDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const params = { compUserId: companyUserId, startDate: transfromStartDate, finishDate: transfromFinishDate }
        dispatch(downloadingBargingRecapitulationAsync(params))
    },
    exportData: (companyUserId, startDate, finishDate, exportType) => {
        const today = new Date()
        const transfromStartDate = startDate ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const transfromFinishDate = finishDate ? `${finishDate.getFullYear()}-${finishDate.getMonth() + 1}-${finishDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const params = {
            companyId: companyUserId, start: transfromStartDate, finish: transfromFinishDate, type: exportType
        }
        dispatch(downloadingExportAsync(params));
    },
    onCloseModalError: () => {
        dispatch(resetBargingRecapitulation())
    },
    onDetailPressed: () => {
        // NavigationService.navigate(NAV_NAME_BARGING_RECAPITULATION_DETAIL)
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(BargingRecapitulationScreen);
