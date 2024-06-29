import { connect } from 'react-redux';
import DeliveryCargoScreen from './DeliveryCargo';
import { downloadingDeliveryCargoAsync, downloadingExportAsync, resetDeliveryCargo } from '../../redux/features/deliveryCargo/deliveryCargoSlice';


const mapStateToProps = state => {
    return ({
        listDeliveryCargo: state.deliveryCargo.listDeliveryCargo,
        isLoading: state.deliveryCargo.isLoading,
        isSuccess: state.deliveryCargo.isSuccess,
        isError: state.deliveryCargo.isError,
        message: state.deliveryCargo.message,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: (startDate, finishDate) => {
        dispatch(resetDeliveryCargo())
        const today = new Date();
        // Transform start date
        const transformStartDate = startDate ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}` : `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        // Transform finish date
        let transformFinishDate;
        if (finishDate) {
            if (finishDate < startDate) {
                finishDate = new Date(startDate); // Ubah finishDate menjadi sama dengan startDate
            }
            transformFinishDate = `${finishDate.getFullYear()}-${finishDate.getMonth() + 1}-${finishDate.getDate()}`;
        } else {
            transformFinishDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        }
        const params = { startDate: transformStartDate, endDate: transformFinishDate };
        dispatch(downloadingDeliveryCargoAsync(params))
    },
    exportData: (startDate, finishDate, shift, jetty, exportType) => {
        const today = new Date()
        const transfromStartDate = startDate ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const transfromFinishDate = finishDate ? `${finishDate.getFullYear()}-${finishDate.getMonth() + 1}-${finishDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const params = {
            start: transfromStartDate, finish: transfromFinishDate, shift: shift, jetty: jetty, type: exportType
        }
        dispatch(downloadingExportAsync(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryCargoScreen)
