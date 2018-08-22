module.exports.autoreload = {
  active: true,
  usePolling: false,
  dirs: ["api/models", "api/controllers", "api/services", "api/helpers"],
  ignored: [
    // Ignore all files with .ts extension
    //"**.ts"
  ]
};
