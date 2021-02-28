import Actions from "../Action/Action"

export default function reducer(state={},action) {
    switch(action.type) {
        case Actions.LOGIN: {
            // return { ...state, userData: [action.payload] }
            const { token ,userid, username} = action.payload
            const userData = {
                token : token,
                userid : userid,
                username : username
            }
            return userData
        }

        case Actions.LOGOUT: {
            return {token:null ,userid:null ,username:null }
        }

        default: {
            return state
        }
    }
}

