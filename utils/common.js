import Cookies from "js-cookie";
var CryptoJs = require("crypto-js");

//Function to encrypt dat using AES encryption
export const encrypt = (key, data) => {
  return CryptoJs.AES.encrypt(JSON.stringify(data), key).toString();
};

//Function to decrypt dat using AES decryption
export const decrypt = (key, data) => {
  var decryptData = CryptoJs.AES.decrypt(data, key);
  return JSON.parse(decryptData.toString(CryptoJs.enc.Utf8));
};

//Function to set a cookie with encrypted data

export const setCookie = (key, data) => {
  const encryptData = encrypt(key + "ADMIN@123!", data); // encrypt data with a key
  Cookies.set(key, encryptData, { secure: true, expires: 1 }); // set cookie with secure flag and expiry of 1 day
};

//Function to get and decrypt a cookie
export const getCookie = (key) => {
  const cookieData = Cookies.get(key);
  return cookieData ? decrypt(key + "ADMIN@123!", cookieData) : null;
};

// Function to delete a Cookie
export const deleteCookie = (key) => {
  Cookies.remove(key, { path: "", domain: "localhost" });
};

//Function to get the authentiated user detail
export const getAuthToken =()=>{
    const user = getCookie('_USER_AUTH_');
    try {
        return user ? JSON.parse(user) : null
    }catch(err){
        return null
    }
}