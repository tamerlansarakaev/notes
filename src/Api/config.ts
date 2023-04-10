// Import the functions you need from the SDKs you need
import Axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import axios from 'axios';

const firebaseConfig = {
  apiKey: 'AIzaSyC3xlx1Wh79vhWaEQaq5fsYPeooaAQP7L8',
  authDomain: 'notes-1dff0.firebaseapp.com',
  databaseURL:
    'https://notes-1dff0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'notes-1dff0',
  storageBucket: 'notes-1dff0.appspot.com',
  messagingSenderId: '680406759476',
  appId: '1:680406759476:web:f707b521d36d12cee03261',
  measurementId: 'G-29LK6LQ34F',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

const token = firebaseConfig.apiKey;

const axiosConfig = {
  baseURL: 'https://notes-1dff0-default-rtdb.europe-west1.firebasedatabase.app',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${'AIzaSyC3xlx1Wh79vhWaEQaq5fsYPeooaAQP7L8'}`,
  },
};

export const api = axios.create(axiosConfig);
