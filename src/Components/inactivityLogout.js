import { useEffect } from 'react';
import SignOut from '../FirebaseFunctions/SignoutFunctions';

const useInactivityLogout = (timeout = 600000,setOpen,open,setMessage,setSeverity,handleClose,handleOpen,history) => { 
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        SignOut(setOpen,open,setMessage,setSeverity,handleClose,handleOpen,history)
      }, timeout);
    };

    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [timeout]);
};

export default useInactivityLogout;
