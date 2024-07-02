import { connect } from 'react-redux';
import BalanceCargoScreen from './BalanceCargo';
import { downloadingBalanceCargoAsync, downloadingBalanceCargoHistoryAsync } from '../../redux/features/balanceCargo/balanceCargoSlice';

const mapStateToProps = state => {
    // console.log(state?.balanceCargo?.listBalanceCargoHistory)
    return ({
        listBalanceCargo: state?.balanceCargo?.listBalanceCargo,
        listBalanceCargoHistory: state?.balanceCargo?.listBalanceCargoHistory,
        isLoading: state.balanceCargo.isLoading,
        isSuccess: state.balanceCargo.isSuccess,
        isError: state.balanceCargo.isError,
        message: state.balanceCargo.message,
        companyUserId: state.profile.data.companyId,
        company: state.barginOnline.customers?.company,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (startDate) => {
        const finishDate = startDate;
        const formatDateTime = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}T00:00:00`;
        };
        const today = new Date()
        const transfromStartDate = startDate ? formatDateTime(startDate) : formatDateTime(today);
        const transfromFinishDate = finishDate ? formatDateTime(finishDate) : formatDateTime(today);
        const params = { startDate: transfromStartDate, finishDate: transfromFinishDate }
        dispatch(downloadingBalanceCargoAsync())
        console.log(params);
        dispatch(downloadingBalanceCargoHistoryAsync(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceCargoScreen)