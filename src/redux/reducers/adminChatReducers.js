import * as actionTypes from "../constants/chatConstants";

const CHAT_INITIAL_STATE = {
  chatRooms: {},
};

export const adminChatReducer = (state = CHAT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CHATROOMS:
      let currentState = { ...state };
      if (state.chatRooms[action.payload.user]) {
        currentState.chatRooms[action.payload.user].push({
          client: action.payload.message,
        });
        return {
          ...state,
          chatRooms: { ...currentState.chatRooms },
        };
      } else {
        return {
          ...state,
          chatRooms: {
            ...currentState.chatRooms,
            [action.payload.user]: [{ client: action.payload.message }],
          },
        };
      }
    default:
      return state;
  }
};
