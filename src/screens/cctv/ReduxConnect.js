import { connect } from 'react-redux';
import CCTVScreen from './CCTV';
import { downlodingRealtimeCCTVAsync } from '../../redux/features/realtimeCCTV/realtimeCCTVSlice';

const mapStateToProps = state => {
    return ({
        data: state.realtimeCCTV.data,
        isDownloading: state.realtimeCCTV.isDownloading,
        isSuccess: state.realtimeCCTV.isSuccess,
        isError: state.realtimeCCTV.isError,
        message: state.realtimeCCTV.message,
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: () => {
        dispatch(downlodingRealtimeCCTVAsync())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(CCTVScreen);
