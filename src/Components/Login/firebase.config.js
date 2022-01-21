import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCYOXY1zZr0JEOSbGTiYLPoDKcgi2SwjOA",
    authDomain: "ema-jhon-auth-d9aff.firebaseapp.com",
    projectId: "ema-jhon-auth-d9aff",
    storageBucket: "ema-jhon-auth-d9aff.appspot.com",
    messagingSenderId: "181596524190",
    appId: "1:181596524190:web:f26028542cb58bca5af58f"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);