const DBconfig = { 
  user: "sa", // sql user
  password: "BarDatatest$789", //sql user password
  //server: "10.0.0.186\\COMBILL", // if it does not work try- localhost
  server: "10.0.25.106", // if it does not work try- localhost
  database: "QuickRec",

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

const MessageDBconfig = {
  user: "sa", // sql user
  password: "123@com", //sql user password
  server: "10.3.0.211",
  database: "Services",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

export default DBconfig;
