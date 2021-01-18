import React, {createContext, useReducer} from 'react';
import {initialState, UserReducer} from '../reducers/UserReducers';

export const UserCxt = createContext();

const UserContext = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserCxt.Provider value={{state, dispatch}}>{children}</UserCxt.Provider>
  );
};
export default UserContext;
