import axios from "axios";

axios.interceptors.response.use(null, (error) => {
    const expectedError=error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
      alert("An error has occurred");
      console.log(error);
    }
    return Promise.reject(error);
  });

  function setJWT(jwt){
    axios.defaults.headers.common['x-auth-token']=jwt;
  }

  const http={
      get:axios.get,
      post:axios.post,
      put:axios.put,
      delete:axios.delete,
      setJWT
  };
  export default http;