import { createContext, useContext, useEffect, useReducer } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  checkUser_type,
  initState,
  loginUser_type,
  Reducer,
  userLoading_type,
} from "../reducer/AppReducer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initState);

  const handleLogin = async () => {
    let googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error, "Login Error");
    }
  };

  const hadnleLogout = async () => {
    await signOut(auth);
  };

  const checkUser = (user) => {
    dispatch({ type: userLoading_type });
    if (user) {
      const { photoURL, displayName, email,uid } = user;
      dispatch({
        type: checkUser_type,
        payload: { photoURL, displayName, email ,uid},
      });
    } else {
      dispatch({
        type: loginUser_type,
      });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, checkUser);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, hadnleLogout, handleLogin }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
