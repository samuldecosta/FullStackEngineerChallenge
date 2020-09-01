import {
  SAVE_FEEDBACK_REQUESTS,
  SAVE_FEEDBACK_LIST,
  REMOVE_FEEDBACK,
  REMOVE_FEEDBACK_REQUEST,
} from "../actions/types";

const initialState = {
  feedbackRequests: [],
  feedbackList: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_FEEDBACK_REQUESTS:
      return { ...state, feedbackRequests: payload.openRequests };
    case SAVE_FEEDBACK_LIST:
      return { ...state, feedbackList: payload.data };
    case REMOVE_FEEDBACK:
      return {
        ...state,
        feedbackList: state.feedbackList.filter((feed) => feed._id !== payload),
      };
    case REMOVE_FEEDBACK_REQUEST:
      return {
        ...state,
        feedbackRequests: state.feedbackRequests.filter(
          (req) => req._id !== payload
        ),
      };
    default:
      return state;
  }
}
