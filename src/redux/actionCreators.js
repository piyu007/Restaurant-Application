import * as ActionTypes from './actionTypes';
import { baseUrl } from '../shared/baseUrl';

export const postFeedback = (feedback) => () => {
    return (
        fetch(baseUrl + 'feedback', {
            method: 'POST',
            body: JSON.stringify(feedback),
            headers: {
                'content-Type': 'application/JSON',
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if(response.ok)
                    return response;
                else {
                    var err = new Error('Error' + response.status + ':' + response.statusText);
                    err.response = response;
                    throw err;
                }
            })
            .then(response => response.json())
            .then(feedback => console.log(feedback))
            .catch(error => console.log(error.message))
    );
}

export const addComment = (comment) => (
    {
       type: ActionTypes.ADD_COMMENT,
       payload: comment,
    });

export const postComment = (dishId, rating, comment, author) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        comment: comment,
        author: author,
    }
    newComment.date = new Date().toISOString();
    return (
      fetch(baseUrl + 'comments', {
          method: 'POST',
          body: JSON.stringify(newComment),
          headers: {
              'content-Type': 'application/JSON',
          },
          credentials: 'same-origin'
      })
          .then(response => {
              if(response.ok)
                  return response;
              else {
                  var err = new Error('Error' + response.status + ':' + response.statusText);
                  err.response = response;
                  throw err;
              }
          })
          .then(response => response.json())
          .then(comment => dispatch(addComment(comment)))
          .catch(error => console.log(error.message))
    );
}
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok)
                return response;
            else {
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                return error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                return errMess;
            }
        )
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess,
});

export const addDishes = (dishes) => ({
   type: ActionTypes.ADD_DISHES,
   payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if(response.ok)
                    return response;
                else {
                    var error = new Error('Error' + response.status + ':' + response.statusText);
                    error.response = response;
                    return error;
                }
            },
            error => {
                var errMess = new Error(error.message);
                return errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};


export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if(response.ok)
                    return response;
                else {
                    var error = new Error('Error' + response.status + ':' + response.statusText);
                    error.response = response;
                    return error;
                }
            },
            error => {
                var errMess = new Error(error.message);
                return errMess;
            }
        )
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));;
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());
    return (
      fetch(baseUrl+'leaders')
          .then(response => {
              if(response.ok)
                  return response;
              else {
                  var error = new Error('Error' + response.status + ':' + response.statusText);
                  error.response = response;
                  throw error;
              }
          })
          .then(response => response.json())
          .then(leaders => dispatch(addLeaders(leaders)))
          .catch(error => dispatch(leadersFailed(error.message)))
    );
}

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const leadersLoading = () => ({
   type:  ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMess) => ({
   type: ActionTypes.LEADERS_FAILED,
   payload: errMess
});