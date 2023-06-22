import { NAV_NAME_BARGIN_ONLINE_STEP_ONE } from "./constant"

const config = {
    screens: {
        [NAV_NAME_BARGIN_ONLINE_STEP_ONE]: {
            path: 'bargin-online/step-one'
        }
    }
}

const linking = {
    prefixes: ["https://ap.kppmining.com:8787/mok", "poins://app"],
    config
}

export default linking