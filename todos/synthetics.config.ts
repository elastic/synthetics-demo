// note that `env` is the `env` argument passed to the synthetics program
// the default being `development`
export default (env) => {
  let url = "http://localhost:8080";
  if (env === "production") {
    url = "https://elastic.github.io/synthetics-demo/"
  }
  return {
    params: {
      url,
      devWebserver: {
        port: 8080
      }
    },
  };
};
