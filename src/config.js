
const config = {
    dev: {
        host: "https://powerload-backend.gerosto.com",
        token: localStorage.getItem('accessToken') || "defaultToken"
    },
    host: process.env.REACT_APP_API_HOST || "https://powerload-backend.gerosto.com"
};

export default config;
