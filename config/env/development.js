const devConfig = {
  //database
  jwt_key: "muddynight96",
  jwt_expiration: 360000,
dbConnectionString: 'mongodb+srv://admin:kodigochinguph@assetmanagement.km9vk.mongodb.net/assetmanagement?retryWrites=true&w=majority',
  mongoDebug: true,
  //nodemailer
  gmail_password: "zcxzgmskngzjcpog",
  //oauth
  SECRET_TOKEN: "b3assetmanagement",
  SECRET_TOKEN_EXPIRED_IN: "24h",
  REFRESH_SECRET_TOKEN: "b3assetmanagementsecretrefreshtokenkey",
  REFRESH_SECRET_TOKEN_EXPIRED_IN: "30d",
  GOOGLE_OAUTH_CLIENT_ID:
    "327108575861-4e88u5hnp4ot23p9lisplpgfkgtvbhue.apps.googleusercontent.com",
  GOOGLE_OAUTH_CLIENT_SECRET: "E0UX-xJfpmU00cttayRH2Ulu",
  GOOGLE_OAUTH_CALLBACK: "http://localhost:5000/users/google/callback",
  FACEBOOK_OAUTH_CLIENT_ID: "231302151732871",
  FACEBOOK_OAUTH_CLIENT_SECRET: "e68ba7731ad16540b1bc65ae5e716429",
  FACEBOOK_OAUTH_CALLBACK: "http://localhost:5000/users/facebook/callback",
};

export default devConfig;
