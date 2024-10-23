import { configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
import playerReducer from './player'


const store = configureStore({
    reducer: {
        auth: authReducer,
        player: playerReducer,  // Add the player reducer here if you want to include a player state. For example, {player: playerReducer} in the reducer object.  // Add other reducers here if needed. For example, podcast: podcastReducer, user: userReducer, etc.      
    },
    // Add other reducers here if needed. For example, podcast: podcastReducer, user: userReducer, etc.
})


export default store