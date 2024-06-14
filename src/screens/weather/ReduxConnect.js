import {connect} from 'react-redux';
import Weather from './Weather';
import { downloadingWeatherAsync } from '../../redux/features/weather/weatherSlice';

const mapStateToProps = state => {
    return ({
        isLoading: state.weather.isLoading,
        isSuccess: state.weather.isSuccess,
        isError: state.weather.isError,
        message: state.weather.message,
        weather: state.weather?.weather
    })
};

const mapDispatchToProps = (dispatch) => ({
    onAppear: () => {
        dispatch(downloadingWeatherAsync())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather)