import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSF28_jSpgzVvTzQh_5_afU_nmrVnjOqg",
  authDomain: "cart-7ed7f.firebaseapp.com",
  databaseURL: "https://cart-7ed7f.firebaseio.com",
  projectId: "cart-7ed7f",
  storageBucket: "cart-7ed7f.appspot.com",
  messagingSenderId: "1094172136022",
  appId: "1:1094172136022:web:d2780dbbf45191e646a1f7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

