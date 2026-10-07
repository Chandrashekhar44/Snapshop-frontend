import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "@/firebase/firebase";
import axios from "axios";


export const registerDeviceToken = async () => {



  const messaging = getFirebaseMessaging();


  if (!messaging) {
    console.log("Messaging unavailable");
    return false;
  }



  let permission = Notification.permission;


  if(permission === "default"){



    permission =
      await Notification.requestPermission();


    

  }


  if(permission !== "granted"){

    console.log(
      "Notification permission not granted"
    );

    return false;

  }


  try{

   

    const token = await getToken(
      messaging,
      {
        vapidKey:
        process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      }
    );


    if(!token){

      console.log(
        "No FCM token generated"
      );

      return false;

    }


    


   const res = await axios.post(

      "https://snapshopo.onrender.com/api/products/device-token",

      {
        token
      },

      {
        withCredentials:true
      }

    );


    console.log(
      "res",res
    );

    if(!res){
      return false
    }
    return true;


  }catch(error){

    console.error(
      "FCM error:",
      error
    );

    return false;

  }

};