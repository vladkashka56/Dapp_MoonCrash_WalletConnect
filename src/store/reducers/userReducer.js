import {SET_PUBLICKEY, GET_MY_RECENT_WINS_SUCCESS, CHANGE_CURRENT_PAGE,
    GET_LOGIN_REQUEST_REQUEST, GET_LOGIN_REQUEST_SUCCESS, GET_LOGIN_REQUEST_ERROR,
    GET_REGISTERED_STATUS_SUCCESS, GET_REGISTERED_STATUS_ERROR, LOGOUT_REQUEST,
    GET_STATS_REQUEST, GET_STATS_SUCCESS, GET_STATS_ERROR, SET_PASSWORD_RESET_DATA,
    GET_USER_STATS_REQUEST, GET_USER_STATS_SUCCESS, GET_USER_STATS_ERROR,
    GET_USERNAME_REQUEST, GET_USERNAME_SUCCESS, GET_USERNAME_ERROR, ADD_FRIEND, REMOVE_FRIEND, 
    CHANGE_USE_CHAIN_ID, SET_SIGNED,
    CHANGE_CURRENT_CHAIN_ID } from '../../utils/types';

import {setPopUp} from "../../actions/gameActions";

const initialState = {
    publicKey: "",
    useChainData: {},
    currentChainId: "",
    userName: "",
    myRecentWin: [],
    stats: {
        users: 0,
        bets: 0,
        wagered: 0,
        investorProfit: 0,
        investorProfitATH: 0,
        avgDailyBet: 0,
        avgWeeklyBet: 0,
        avgMonthlyBet: 0,
        bankRoll: 0
    },
    userStats: [],
    currentPage: "play",
    logged: false,
    signed: false,
    registered: false,
    friends: [],
    loading: true,
    passwordResetData: {
        userHash: "",
        publicKey: ""
    },
    newFriendAdded: false
}

const userReducer = (state = initialState, action) => {

    switch(action.type){

        case SET_PUBLICKEY:
        return {
            ...state,
            publicKey: action.payload,
            loading: false

        }
        case GET_USERNAME_SUCCESS:
        return {
            ...state,
            userName: action.payload
        }
        case CHANGE_CURRENT_CHAIN_ID:
        return {
            ...state,
            currentChainId: action.payload
        }
        
        case GET_MY_RECENT_WINS_SUCCESS:
        return {
            ...state,
            myRecentWin: action.payload.map(myWinData => 
                {
                    return { 
                        bet: myWinData[0], 
                        multiplier:myWinData[1], 
                        payout:myWinData[2]
                    }
                }),
            
            loading: false
        }
        case CHANGE_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.payload
        }
        case GET_LOGIN_REQUEST_SUCCESS:
        return {
            ...state,
            logged: true
        }
        case GET_LOGIN_REQUEST_ERROR:
        return {
            ...state,
            logged: false
        }
        case LOGOUT_REQUEST:
        return {
            ...state,
            logged: false
        }
        case GET_REGISTERED_STATUS_SUCCESS:
            return {
                ...state,
                registered: action.payload
            }
        case GET_REGISTERED_STATUS_ERROR:
        return {
            ...state,
            registered: false
        }
        case SET_PASSWORD_RESET_DATA:
            return {
                ...state,
                passwordResetData: {
                    userHash: action.payload.userHash,
                    publicKey: action.payload.publicKey
                }
            }
        case SET_SIGNED:
            return {
                ...state,
                signed: action.payload
            }
            
        case GET_STATS_SUCCESS:
            if(action.payload.length > 0) {
                return {
                    ...state,
                    stats: {
                        users: action.payload[0][0],
                        bets: action.payload[0][1],
                        wagered: action.payload[0][2],
                        investorProfit: action.payload[0][3],
                        investorProfitATH: action.payload[0][4],
                        avgDailyBet: action.payload[0][5],
                        avgWeeklyBet: action.payload[0][6],
                        avgMonthlyBet: action.payload[0][7],
                        bankRoll: action.payload[0][8]
                    }
                }
            }
        case GET_STATS_ERROR:
        return {
            ...state
        }
        case CHANGE_USE_CHAIN_ID:
        return {
            ...state,
            useChainData: action.payload
        }
        
        case ADD_FRIEND:
            if(state.friends.includes(action.payload)) {
                setPopUp("The user is already your friend")
                return {
                    ...state,
                }
            }
            return {
                ...state,
                friends: [...state.friends, action.payload],
                newFriendAdded: true
            }
        case REMOVE_FRIEND:
            const selectedIndex = state.friends.indexOf(action.payload);
            let _friends = [...state.friends];
            _friends.splice(selectedIndex, 1)
            return {
                ...state,
                friends: _friends
            }
        default: return state
    }

}

export default userReducer;