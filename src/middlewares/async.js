// When writing middle ware not the signature you need to use.
// This has been modeled from redux-promise
// So best to check out how redux-promise is implemented.

export default function ({ dispatch }){
  return next => action => {
    // If action does not have a payload
    // or, the payload does not have a .then property
    // we dont care about it. send it on
    if(!action.payload || !action.payload.then){
      return next(action);
    }
    //Make sure the action's promise resolves.
    action.payload
    .then(response =>{
      // create a new action with the old type, but
      // replace the promise with the response data
      // ie payload for promise is replaced with response.data.
      // we know it was data. If we console log the response we should see
      // all of the data under data.
      const newAction = {...action, payload:response.data}
      //note we use dispatch instead of next because we want to send the new
      // action through all of the reducers again.
      dispatch(newAction);
    });

    }
}