import {
  GoogleAuthProvider, signInWithPopup,GithubAuthProvider,
  getAuth, signOut, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth } from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [loggedInUser , setLoggedInUser] = useContext(UserContext)
  const [newUser , setNewUser] = useState(false);
  const [user , setUser] = useState({
    isSigned : false,
    name : "",
    email : "",
    password : "",
    photo : "",
  })
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider)
    .then(res => {
      const {displayName, email , photoURL} = res.user ;
      const signInUser = {
        isSigned : true,
        name : displayName,
        email : email,
        photo : photoURL
      }
      setUser(signInUser)
    })
    .catch(err => {
      console.log(err)
    })
  };
  const googleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
      const signOutUser = {
        isSigned : false,
        name : '',
        email : '',
        photo : '',
        error : '',
        success : false
      }
      setUser(signOutUser)
    })
  }

  const gitHubLogin = () => {
    const provider = new GithubAuthProvider()
    signInWithPopup(auth , provider)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  } 
   // email password login 
   const handleBlur = (e) => {
    //  console.log(e.target.name , e.target.value);
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /^\S+@\S+\.\S+$/.test(e.target.value);
      
    } if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6 ;
      const passswordHasNumber = /\d+/g.test(e.target.value);
      isFieldValid = (isPasswordValid && passswordHasNumber);

    } if (isFieldValid) {
      const newUserInfo = {...user} ;
      newUserInfo[e.target.name] = e.target.value ;
      setUser(newUserInfo)
    }
    
   }

   const handleSubmit = (e) => {
    //  console.log(user.email , user.password)

    if ( newUser && user.email && user.password) {
        createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name)
          // const user = res.user ;
          console.log(res)
        })
        .catch((error) => {
          const newUserInfo = {...user} ;
          newUserInfo.error = error.message ;
          newUserInfo.success = false;
          setUser(newUserInfo)
          // console.log(errorMessage, errorCode);
        })
    }


    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(auth , user.email , user.password)
      .then((res) => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        navigate(from, { replace: true });
        console.log("sign in user info" , res.user);
      })
      .catch((error) => {
        const newUserInfo = {...user} ;
          newUserInfo.error = error.message ;
          newUserInfo.success = false;
          setUser(newUserInfo)
      })
    }


      e.preventDefault();
   };

   const updateUserName = (name) => {

     updateProfile(auth.currentUser , {
       displayName : name ,
     })
     .then(() => {
       console.log("User name updated Successfully")
     })
     .catch(error => {
       console.log(error);
     })
   }
  return (
    <div style = {{textAlign: 'center'}}>
     {user.isSigned ? <button onClick={googleLogOut}>Google Sign Out</button> : 
                      <button onClick={googleLogin}>Googel Sign In</button>
     }

      {
        user.isSigned && <div>
          <h6>Name : {user.name}</h6>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      } <br /><br />
      <button onClick={gitHubLogin}>Git Hub Login</button>
       <br /> <br />

       <form onSubmit={handleSubmit} action="">
         <h2>Our Authentication System</h2>
         <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id="" /> <label htmlFor="newUser">New User</label> <br /> <br />
        { newUser &&  <input type="text" name="name" placeholder="Your Name" required onBlur={handleBlur} />} <br /> <br />
         <input type="text" name="email"onBlur={handleBlur} placeholder="Your Email" required id="" /> <br /> <br />
         <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required id="" /> <br /> <br />
         <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
       </form>
        <p style={{color : "red"}}>  {user.error}</p>
        {user.success &&  <p style ={{color : "green"}}> User {newUser ?"Create" : "Login"} Successfully</p>}
    </div>
  );
}

export default Login;
