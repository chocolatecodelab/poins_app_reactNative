export const NAV_NAME_SPLASH = 'NAV_NAME_SPLASH';
export const NAV_NAME_HOME = 'NAV_NAME_HOME';
export const NAV_NAME_LOGIN = 'NAV_NAME_LOGIN';
export const NAV_NAME_REGISTER = 'NAV_NAME_REGISTER';
export const NAV_NAME_FORGET_PASSWORD = 'NAV_NAME_FORGET_PASSWORD';
export const NAV_NAME_OTP_LOGIN = 'NAV_NAME_OTP_LOGIN';
export const NAV_NAME_OTP_FORGET_PASSWORD = 'NAV_NAME_OTP_FORGET_PASSWORD';
export const NAV_NAME_CHANGE_NEW_PASSWORD = 'NAV_NAME_CHANGE_NEW_PASSWORD';
export const NAV_NAME_BARGING_ONLINE_STEP_ONE = 'NAV_NAME_BARGING_ONLINE_STEP_ONE';
export const NAV_NAME_BARGING_ONLINE_STEP_TWO = 'NAV_NAME_BARGING_ONLINE_STEP_TWO';
export const NAV_NAME_PROFILE = 'NAV_NAME_PROFILE';
export const NAV_NAME_BARGING_RECAPITULATION = 'NAV_NAME_BARGING_RECAPITULATION';
export const NAV_NAME_HOME_MENU = 'NAV_NAME_HOME_MENU';
export const NAV_NAME_BARGING_RECAPITULATION_DETAIL = 'NAV_NAME_BARGING_RECAPITULATION_DETAIL';
export const NAV_NAME_BARGING_SCHEDULE = 'NAV_NAME_BARGING_SCHEDULE';
export const NAV_NAME_NOTIFICATION = 'NAV_NAME_NOTIFICATION';
export const NAV_NAME_HISTORY_BARGING = 'NAV_NAME_HISTORY_BARGING';
export const NAV_NAME_CCTV = 'NAV_NAME_CCTV';
export const NAV_NAME_DETAIL_CCTV = 'NAV_NAME_DETAIL_CCTV';
export const NAV_NAME_WEATHER = 'NAV_NAME_WEATHER';
export const NAV_NAME_SENSLOG = 'NAV_NAME_SENSLOG';
export const NAV_NAME_DELIVERY_CARGO = 'NAV_NAME_DELIVERY_CARGO';
export const NAV_NAME_BALANCE_CARGO = 'NAV_NAME_BALANCE_CARGO';

export const REST_BASE_URL = 'https://opr-poins-mobile-01-kpd.azurewebsites.net/api';
export const REST_BASE_URL_ADMIN = 'http://Opr-poins-admin-01-kpd.azurewebsites.net/api';
// export const REST_BASE_URL = 'https://ap.kppmining.com:12201/api';
// export const REST_BASE_URL = 'http://10.90.32.32/api';
export const REST_URL_LOGIN = '/login/Login';
export const REST_URL_OTP_LOGIN = '/login/ValidateOtp';
export const REST_URL_LOGOUT = 'login/Logout'
export const REST_URL_REGISTER = '/login/Create_Register';
export const REST_URL_EDIT_PROFILE = '/login/Update_Profile/{id}';
export const REST_URL_UPLOAD_IMAGE_PROFILE = '/login/Upload_Image/{id}';
export const REST_URL_MY_PROFILE = '/login/Get_Profile/{id}';
export const REST_URL_MENU_APP = '/menu/Get_Menu/{id}';
export const REST_URL_CHECK_VERSION = '/version/Get_Version';
export const REST_URL_BARGIN_ONLINE_CUSTOMER = '/barging_online/Get_BargingOnline';
export const REST_URL_BARGIN_ONLINE_TUGBOAT = '/barging_online/Create_Request_TugBoat?name={name}';
export const REST_URL_BARGIN_ONLINE_BARGE = '/barging_online/Create_Request_Barge?name={name}';
export const REST_URL_CREATE_BARGIN_ONLINE = '/barging_online/Create_BarginOnline';
export const REST_URL_BARGIN_ONLINE_BOOKING_DATE = '/barging_online/Get_BargingOnlineByStartTime/{id}?jetty={jetty}';
export const REST_URL_FORGET_PASSWORD_STEP_ONE = '/login/ForgetPassword';
export const REST_URL_FORGET_PASSWORD_STEP_TWO = '/login/ValidateOtp_ForgetPassword';
export const REST_URL_FORGET_PASSWORD_STEP_THREE = '/login/ChangePassword';
export const REST_URL_BARGING_RECAPITULATION = '/barging_online/Get_BargingOnlineByFilter/{id}?startDate={startDate}&endDate={finishDate}';
export const REST_URL_BARGING_RECAPITULATION_EXPORT_TO_EXCEL = '/barging_online/ExportDataToExcel?startDate={startDate}&endDate={endDate}&company_id={company_id}';
export const REST_URL_BARGING_RECAPITULATION_EXPORT_TO_PDF = '/barging_online/ExportDataToPDF?startDate={startDate}&endDate={endDate}&company_id={company_id}';
export const REST_URL_HISTORY_BARGING = '/barging_online/Get_BargingOnlineByCompanyId/{id}';
export const REST_URL_TIME_BARGIN_ONLINE = '/barging_online/Get_ValidasiBookingTime?filterDate={date}&jetty={jetty}';
export const REST_URL_BARGING_SCHEDULE = '/barging_online/Get_BargingSchedule/{id}?startDate={startDate}&endDate={finishDate}';
export const REST_URL_ACTIVE_BARGING = '/barging_online/RilDashboard';
export const REST_URL_LIST_NOTIFICATION = '/notifikasi/Get_Notifikasi/{id}';
export const REST_URL_CHANGE_NOTIFICATION = '/notifikasi/Change_Notifikasi_Status?id_notifikasi={id_notifikasi}';
export const REST_URL_DELETE_ACCOUNT = '/login/update_verification_user/{id}';
export const REST_URL_LIST_CCTV = '/cctv/Get_Cctv';
export const REST_URL_WEATHER = "https://api.weatherlink.com/v2/current/173608?api-key=pz8qlxocm2avjyicc0mcri4uzo1uhyo6";
export const REST_URL_GET_LAST_SENSELOG_WATER_BENDER = '/senselog/Get_Last_Senselog';
export const REST_URL_GET_AVG_SENSELOG_WATER_BENDER = '/senselog/Get_Avg_Senselog?startDate={startDate}&endDate={endDate}';
export const REST_URL_GET_MONTHLY_SENSELOG_WATER_BENDER = '/senselog/Get_MonthlyTrans_WaterBender?year={year}';
export const REST_URL_GET_DAILY_SENSELOG_WATER_BENDER = '/senselog/Get_TodayTrans_WaterBender';
export const REST_URL_GET_DELIVERY_CARGO = '/cargo/GetDevCargoDate?startDate={startDate}&endDate={endDate}';
export const REST_URL_DELIVERY_CARGO_EXPORT_TO_EXCEL = '/cargo/ExportDataToExcel?startDate={startDate}&endDate={endDate}&shift={shift}&jetty={jetty}';
export const REST_URL_DELIVERY_CARGO_EXPORT_TO_PDF = '/cargo/ExportDataToPDF?startDate={startDate}&endDate={endDate}&shift={shift}&jetty={jetty}';
export const REST_URL_BALANCE_CARGO = '/cargo/GetRTBalanceCargo';
export const REST_URL_BALANCE_CARGO_HISTORY = '/cargo/GetBalanceCargoHistory';
export const REST_URL_BALANCE_CARGO_HISTORY_PERIODIC = '/Cargo/GetPeriodicBalanceCargo?startDateTime={startDateTime}&endDateTime={endDateTime}';

export const REST_METHOD_GET = 'Get';
export const REST_METHOD_POST = 'Post';
export const REST_METHOD_PUT = 'Put';
export const REST_METHOD_DELETE = 'Delete';

export const HTTP_HEADER_VALUE_JSON = 'application/json';
export const HTTP_HEADER_X_API_SECRET_WEATHER = "bomzyccksqcnooo2vfqokuc7t2p2pemi";


export const COLOR_PRIMARY = '#009C4E';
export const COLOR_BLUE = '#03AED2';
export const COLOR_SECONDARY_MAIN_IOS = '#FFAC1F';
export const COLOR_SECONDARY_MAIN_ANDROID = '#FFAC1F';
export const COLOR_MAIN_SECONDARY = '#FFAC1F';
export const COLOR_SECONDARY_SUB = '#FFF3E9';
export const COLOR_ERROR = '#B00020';
export const COLOR_RED = '#A91D3A';
export const COLOR_WHITE = '#FFFFFF';
export const COLOR_BLACK = '#000000';
export const COLOR_MEDIUM_BLACK = '#2C3333';
export const COLOR_DISABLED = '#A4A4A4';
export const COLOR_GRAY_1 = '#D8D8E0'
export const COLOR_GRAY_2 = '#636363'
export const COLOR_TRANSPARENT_DARK = 'rgba(0, 0, 0, 0.15)';
export const COLOR_HORIZONTAL_LINE = '#E5E5E5';
export const COLOR_TRANSPARENT_DISABLED = '#F5F4F7';
export const COLOR_TRANSPARENT_PRIMARY = 'rgba(0,156,78, 0.1)';
export const COLOR_TRANSPARENT_SECONDARY = 'rgba(255,172,31, 0.1)';

export const STATUS_TRANSPARENT = 'transparent'

export const FONT_NUNITO_REGULAR = 'Nunito-Regular';
export const FONT_NUNITO_BOLD = 'Nunito-Bold';
export const FONT_NUNITO_SEMI_BOLD = 'Nunito-SemiBold';
export const FONT_NUNITO_EXTRA_BOLD = 'Nunito-ExtraBold';
export const FONT_POPPINS_REGULAR = 'Poppins-Regular';

export const FONT_SIZE_PAGE_TITLE = 24;
export const FONT_SIZE_BUTTON = 14;
export const FONT_SIZE_SECTION_TITLE = 16;
export const FONT_SIZE_TEXTINPUT = 16;
export const FONT_SIZE_PIN = 30;
export const FONT_SIZE_H1 = 24;
export const FONT_SIZE_H2 = 22;
export const FONT_SIZE_H3 = 20;
export const FONT_SIZE_H4 = 18;
export const FONT_SIZE_BODY_TITLE = 16;
export const FONT_SIZE_BODY_LARGE = 16;
export const FONT_SIZE_BODY = 14;
export const FONT_SIZE_BODY_SMALL = 12;
export const FONT_SIZE_BODY_EXTRA_SMALL = 11;