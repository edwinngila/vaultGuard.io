import CryptoJS from 'crypto-js';

export const GetOTP = (handleClose, handleOpen, history, setMessage, setSeverity, open, setOpen, OTP) => {
    handleOpen()
        // Convert OTP to string if necessary
        const sentOTP = String(OTP); // Ensure OTP is converted to string if it's not already

        // Decrypt ciphertext from localStorage
        const ciphertext =JSON.parse(localStorage.getItem('ciphertext'));
        if (!ciphertext) {
            throw new Error('Ciphertext not found in localStorage');
        }

        const bytes = CryptoJS.AES.decrypt(ciphertext,'72ee941d66f446a7bcd354');
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        
        console.log('Decrypted OTP:', originalText);
        console.log('Sent OTP:', sentOTP);

        // Compare originalText with sentOTP or use it as needed
        // Example comparison
        if (originalText == sentOTP) {
            handleClose()
            setMessage("OTP success");
            setSeverity("success");
            setOpen(true);
            history('/HomePage')
            // Proceed with further actions if OTP is correct
        } else {
            handleClose()
            setMessage("OTP did not match");
            setSeverity("error");
            setOpen(true);
            // Handle incorrect OTP scenario
        }
};
