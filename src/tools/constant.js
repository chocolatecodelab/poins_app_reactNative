export const NAV_NAME_SPLASH = 'NAV_NAME_SPLASH';
export const NAV_NAME_HOME = 'NAV_NAME_HOME';
export const NAV_NAME_LOGIN = 'NAV_NAME_LOGIN';
export const NAV_NAME_REGISTER = 'NAV_NAME_REGISTER';
export const NAV_NAME_FORGET_PASSWORD = 'NAV_NAME_FORGET_PASSWORD';
export const NAV_NAME_OTP_LOGIN = 'NAV_NAME_OTP_LOGIN';
export const NAV_NAME_OTP_FORGET_PASSWORD = 'NAV_NAME_OTP_FORGET_PASSWORD';
export const NAV_NAME_CHANGE_NEW_PASSWORD = 'NAV_NAME_CHANGE_NEW_PASSWORD';
export const NAV_NAME_BARGIN_ONLINE_STEP_ONE = 'NAV_NAME_BARGIN_ONLINE_STEP_ONE';
export const NAV_NAME_BARGIN_ONLINE_STEP_TWO = 'NAV_NAME_BARGIN_ONLINE_STEP_TWO';
export const NAV_NAME_BARGIN_ONLINE_STEP_THREE = 'NAV_NAME_BARGIN_ONLINE_STEP_THREE';
export const NAV_NAME_PROFILE = 'NAV_NAME_PROFILE';
export const NAV_NAME_HISTORY = 'NAV_NAME_HISTORY';
export const NAV_NAME_HOME_MENU = 'NAV_NAME_HOME_MENU';

export const REST_BASE_URL = 'https://ap.kppmining.com:12201/api';
export const REST_URL_LOGIN = '/login/Login';
export const REST_URL_OTP_LOGIN = '/login/ValidateOtp';
export const REST_URL_LOGOUT = 'login/Logout'
export const REST_URL_REGISTER = '/login/Create_Register';
export const REST_URL_EDIT_PROFILE = '/login/Update_Profile/{id}';
export const REST_URL_UPLOAD_IMAGE_PROFILE = '/login/Upload_Image/{id}';
export const REST_URL_MY_PROFILE = '/login/Get_Profile/{id}';
export const REST_URL_MENU_APP = '/menu/Get_Menu';
export const REST_URL_CHECK_VERSION = '/version/Get_Version';
export const REST_URL_BARGIN_ONLINE_CUSTOMER = '/barging_online/Get_BargingOnline';
export const REST_URL_CREATE_BARGIN_ONLINE = '/barging_online/Create_BarginOnline';
export const REST_URL_BARGIN_ONLINE_BOOKING_DATE = '/barging_online/Get_BargingOnlineByStartTime/{id}';
export const REST_URL_FORGET_PASSWORD_STEP_ONE = '/login/ForgetPassword';
export const REST_URL_FORGET_PASSWORD_STEP_TWO = '/login/ValidateOtp_ForgetPassword';
export const REST_URL_FORGET_PASSWORD_STEP_THREE = '/login/ChangePassword';
export const REST_URL_HISTORY_BARGIN_ONLINE = '/barging_online/Get_BargininOnlineByUserId/{id}';
export const REST_URL_TIME_BARGIN_ONLINE = '/barging_online/Get_ValidasiBookingTime?filterDate={date}';

export const REST_METHOD_GET = 'Get';
export const REST_METHOD_POST = 'Post';
export const REST_METHOD_PUT = 'Put';
export const REST_METHOD_DELETE = 'Delete';

export const HTTP_HEADER_VALUE_JSON = 'application/json';

export const COLOR_PRIMARY = '#23286B';
export const COLOR_SECONDARY_MAIN_IOS = '#F9603B';
export const COLOR_SECONDARY_MAIN_ANDROID = '#F77E21';
export const COLOR_SECONDARY_SUB = '#FFF3E9';
export const COLOR_ERROR = '#B00020'
export const COLOR_WHITE = '#FFFFFF';
export const COLOR_BLACK = '#000000';
export const COLOR_DISABLED = '#A4A4A4';
export const COLOR_TRANSPARENT_DARK = 'rgba(0, 0, 0, 0.1)';
export const COLOR_HORIZONTAL_LINE = '#E5E5E5';
export const COLOR_TRANSPARENT_DISABLED = '#F5F4F7'

export const FONT_NUNITO_REGULAR = 'Nunito-Regular';
export const FONT_NUNITO_BOLD = 'Nunito-Bold';
export const FONT_NUNITO_SEMI_BOLD = 'Nunito-SemiBold';
export const FONT_NUNITO_EXTRA_BOLD = 'Nunito-ExtraBold';

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