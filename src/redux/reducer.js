import COMMENTS from '../data/comments';
import { combineReducers } from 'redux';
import *as actionTypes from './actionTypes';
import { InitialContactForm } from './froms';
import { createForms } from 'react-redux-form';

const dishReducer = (dishState = { isloading: false, dishes: [] }, action) => {
    switch (action.type) {
        case actionTypes.DISHES_LOADING:
            return {
                ...dishState,
                isloading: true,
                dishes: []
            }
        case actionTypes.LOAD_DISHES:
            return {
                ...dishState,
                isloading: false,
                dishes: action.payload
            }
        default:
            return dishState;
    }

}

const commentReducer = (commentState = COMMENTS, action) => {
    switch (action.type) {
        case actionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = commentState.length;
            comment.date = new Date().toDateString();
            return commentState.concat(comment);
        default:
            return commentState;
    }

}

export const Reducer = combineReducers({
    dishes: dishReducer,
    comments: commentReducer,
    ...createForms({
        feedback: InitialContactForm
    })
})