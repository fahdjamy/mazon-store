import axios from '../../../api/axiosInit';

import {register, registerSuccess, registerFailure} from "../../reducers/authSlice";
import {loginAsync} from "./login";

export const signupAsync = (data) => {
  return async dispatch => {
    dispatch(register());
    try {
      const response = await axios.post("/users", data);
      dispatch(registerSuccess(response.data));
      dispatch(loginAsync({
        password: data.password,
        username: data.username
      }));
    } catch (e) {
      console.log("||||||", e);
      dispatch(registerFailure("check your fields"));
    }
  }
}
