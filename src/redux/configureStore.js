import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Dishes} from "./dishes";
import {Leaders} from "./leaders";
import {Promotions} from "./promotions";
import {Comments} from "./comments";
import {InitialFeedback} from "./forms";
import {createForms} from "react-redux-form";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            leaders:Leaders,
            comments:Comments,
            promotions:Promotions,
            ...createForms({
                feedback: InitialFeedback,
            })
        }),
        applyMiddleware(logger, thunk)
    );
    return store;
}