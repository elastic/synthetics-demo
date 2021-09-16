// note that `env` is the `env` argument passed to the synthetics program
// the default being `development`
export default (env) => {
  const params: {[key: string]: any} = {};
  if (env === "production") {
    params.url = "https://elastic.github.io/synthetics-demo/"
  } else {
    params.url = "http://localhost:8080";
    params.devWebserver = {port: 8080}
  }
  return {params};
};
