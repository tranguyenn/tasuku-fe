import { jwtDecode } from "jwt-decode";

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  console.log("decode jwt",decoded);
  const currentTime = Date.now() / 1000;
  console.log("current time",currentTime)
  console.log("check boolean",decoded.exp > currentTime)
  return decoded.exp > currentTime;
};