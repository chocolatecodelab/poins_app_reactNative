import { connect } from 'react-redux';
import { downloadingBargingScheduleAsync, onChangeData, resetBargingSchedule } from '../../redux/features/bargingSchedule/bargingScheduleSlice';
import BargingScheduleScreen from './BargingSchedule';

const mapStateToProps = state => {
    return ({
        listHistory: state.bargingSchedule.listHistory,
        isLoading: state.bargingSchedule.isLoading,
        isSuccess: state.bargingSchedule.isSuccess,
        isError: state.bargingSchedule.isError,
        message: state.bargingSchedule.message,
        userId: state.auth?.loginInfo?.ID ? state.auth?.loginInfo?.ID : '',
        companyUserId: state.profile.data.companyId,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (id, startDate, finishDate) => {
        dispatch(resetBargingSchedule())
        const today = new Date();
        const transfromStartDate = startDate ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const transfromFinishDate = finishDate ? `${finishDate.getFullYear()}-${finishDate.getMonth() + 1}-${finishDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const params = { id, startDate: transfromStartDate, finishDate: transfromFinishDate }
        // const transfromFinishDate = `2023-7-31`
        console.log(params.startDate, params.finishDate);
        dispatch(onChangeData())
        dispatch(downloadingBargingScheduleAsync(params))
    },
    onCloseModalError: () => {
        dispatch(resetBargingSchedule())
    },
    onDetailPressed: () => {
        NavigationService.navigate(NAV_NAME_BARGING_RECAPITULATION_DETAIL)
    },
    onExpandPressed: (id, data) => {
        let updatedData
        updatedData = data.map((item) => ({
            ...item,
            Data: item.Data.map((dataItem) => {
                if (dataItem.ID === id) {
                    return ({
                        ...dataItem,
                        SHOW_DETAIL: !dataItem.SHOW_DETAIL, // Example formula: Update SHOW_DETAIL based on ID
                    })
                }
                return ({ ...dataItem })
            }),
        }));
        dispatch(onChangeData(updatedData))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(BargingScheduleScreen);
