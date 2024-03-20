
module.exports = {
  "testTimeout": 60000,
  setupFiles: ['@babel/register'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  silent: true
};

