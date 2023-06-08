export const quizReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'QUIZ_LOADED_SUCCESS':
        return {
          ...state,
          questions: payload
        };
      case 'QUIZ_LOADED_FAIL':
        return {
          ...state,
          questions: []
        };
      case 'CORRECT_ANSWER':
        return {
          ...state,
          score: payload
        };
      case 'NEXT_QUESTION':
        return {
          ...state,
          questionIndex: payload
        };
      default:
        return state;
    }
  };
  