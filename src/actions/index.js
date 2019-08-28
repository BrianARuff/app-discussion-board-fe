// import axios from "axios";
// import Cookies from "js-cookie" // might not need...


/**
 * section to export constants like such
 * export const CONST_NAME = "CONST_NAME";
*/

export const EXP = "EXP";

/**
 * section for area for functions to exported to components like such...
 *
 * export const getNotes = () => {
 *   return dispatch => { // first dispatch
 *     setTimeout(() => {
 *       dispatch({type: FETCHING_NOTES});
 *       setTimeout(() => {
           axios.get("https://url.herokuapp.com/endpoints/here", {
             headers: {
               authorization: Cookies.get("token");
             }
           })
              // SECOND DISPATCH!!
             .then(resp => dispatch({type: FETCHING_NOTES_SUCCESS, payload: resp.data}))
             .catch(error => dispatch({type: FETCHING_NOTES_FAILURE, payload: new Error(error)}));
         }, 500);
 *     })
 *   }
 * }
*/