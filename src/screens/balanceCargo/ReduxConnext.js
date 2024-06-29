import {connect} from 'react-redux';
import BalanceCargoScreen from './BalanceCargo';
import { downloadingBalanceCargoAsync, downloadingBalanceCargoHistoryAsync } from '../../redux/features/balanceCargo/balanceCargoSlice';

const mapStateToProps = state => {
    return ({
        listBalanceCargo: state?.balanceCargo?.listBalanceCargo,
        listBalanceCargoHistory: state?.balanceCargo?.listBalanceCargoHistory,
        isLoading: state.balanceCargo.isLoading,
        isSuccess: state.balanceCargo.isSuccess,
        isError: state.balanceCargo.isError,
        message: state.balanceCargo.message,
        companyUserId: state.profile.data.companyId,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: () => {
        dispatch(downloadingBalanceCargoAsync())
        dispatch(downloadingBalanceCargoHistoryAsync())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceCargoScreen)