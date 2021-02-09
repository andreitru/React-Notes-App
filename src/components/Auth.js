import React from 'react';
import firebase from "firebase";

function Auth({user, setUser, setNotes}) {
  const handleLogin = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential;
        const token = credential.accessToken;
        user = result.user;
        setUser(user.uid)
      }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
  }

  const handleLogout = (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      setUser('')
      setNotes([])
    }).catch((error) => {
      console.log(error.message)
    });
  }

  return (
    <div className='position-absolute top-50'>
      <button
        type="button"
        onClick={handleLogin}
        className='btn btn-primary btn-login'
        style={user ? {display: 'none'} : {display: 'block'}}
      >
        Войти
      </button>
      <button
        type="button"
        onClick={handleLogout}
        className='btn btn-warning btn-logout'
        style={user ? {display: 'block'} : {display: 'none'}}
      >
        Выйти
      </button>
    </div>

  )
}

export default Auth;
