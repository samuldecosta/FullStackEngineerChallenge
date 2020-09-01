module.exports = {
  host:
    process.env.NODE_ENV === "production"
      ? window.location.protocol + "//" + window.location.hostname + "/"
      : "http://localhost:5000/",
};
