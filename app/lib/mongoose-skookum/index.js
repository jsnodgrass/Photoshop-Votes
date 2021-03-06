module.exports = {
  validators: require('./lib/validators'),
  plugins: {
    attachment: require('./lib/plugins/attachment'),
    crud: require('./lib/plugins/crud'),
    timestamps: require('./lib/plugins/timestamps'),
    password: require('./lib/plugins/password')
  }
};