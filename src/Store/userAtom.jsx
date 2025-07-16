// store/userAtom.js
import { atom } from "recoil";

const userAtom = atom({
  key: "userdetails",
  default:
    JSON.parse(localStorage.getItem("user")) || {
      userName: "",
      userEmail: "",
      userId: "",
    },
});

export default userAtom;
