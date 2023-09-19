export default function authHeader() {
    const userStr = localStorage.getItem("token");
    let user = null;
    if (userStr)
        user = userStr;

    if (user) {
        return { 'x-api-key': user };
    } else {
        return { 'x-api-key': '' };
    }
}