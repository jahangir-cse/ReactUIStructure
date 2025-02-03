
const config = {
    dev: {
        host: "https://localhost:7297",
        // token: localStorage.getItem('accessToken') || "defaultToken"
    },
    host: process.env.REACT_APP_API_HOST || "https://localhost:7297"
};

export default config;
