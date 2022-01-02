export const checkUser_type = "checkUser";
export const loginUser_type = "loginUser";
export const userLoading_type = "userLoading";

export const initState = {
  loginStatus: false,
  initLoading:true,
  user: {
    name: "",
    email: "",
    image: "",
  },
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case checkUser_type:
      const { photoURL, displayName, email } = action.payload;
      return {
        ...state,
        loginStatus: true,
        initLoading:false,
        user: { ...state.user, name: displayName, email, image: photoURL },
      };
    case loginUser_type:
        return{
            ...state,initLoading:false,loginStatus:false,user:{name:"",email:"",image:""}
        }
    case userLoading_type:
        return{
            ...state,initLoading:true
        }

    default:
      break;
  }
};
