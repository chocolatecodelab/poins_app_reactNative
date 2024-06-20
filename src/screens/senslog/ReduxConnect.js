import { connect } from 'react-redux';
import { downloadingWaterBenderAvgAsync, downloadingWaterBenderLastAsync, downloadingWaterBenderMonthlyAsync, resetSenslog } from '../../redux/features/senslog/senslogSlice';
import moment from 'moment';
import SenslogScreen from './Senslog';

const mapStateToProps = state => {
    return ({
        isLoading: state.senslog.isLoading,
        isSuccess: state.senslog.isSuccess,
        isError: state.senslog.isError,
        message: state.senslog.message,
        waterBenderLast: state.senslog?.waterBenderLast[0]?.Surface,
        waterBenderAvg : state.senslog?.waterBenderAvg?.Data?.[0]?.Rata_Rata_Surface ?? 0, // 0 atau nilai default lainnya
        waterBenderAvgDistance: state.senslog?.waterBenderAvg?.Data?.[0]?.Data ?? 0,
        waterBenderMonthly: state.senslog?.waterBenderMonthly,
        waterBenderPeriod: state.senslog?.waterBenderAvg.Data,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: ( startDate) => {
        const today = new Date()
        let finishDate;
        if(startDate == new Date()){
            finishDate = new Date();
        }else if(startDate < new Date()) {
        console.log("cek");
        finishDate = new Date(startDate);
        finishDate.setDate(finishDate.getDate() + 3);
        }
        const transfromStartDate = startDate ? `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const transfromFinishDate = finishDate ? `${finishDate.getFullYear()}-${finishDate.getMonth() + 1}-${finishDate.getDate()}` : `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        const params = { startDate: transfromStartDate, endDate: transfromFinishDate }
        const year = moment(startDate).format('YYYY');
        dispatch(downloadingWaterBenderAvgAsync(params))
        dispatch(downloadingWaterBenderLastAsync())
        dispatch(downloadingWaterBenderMonthlyAsync(year))
    },
    onCloseModalError: () => {
        dispatch(resetSenslog())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(SenslogScreen);
