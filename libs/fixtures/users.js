var bcrypt = require('bcrypt');

module.exports = [
  {
    username: 'andrey_9828',
    email: 'aaa73731919@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    groups: ['USER', 'ADMIN', 'MODERATOR']
  },
  {
    username: 'skip',
    email: 'aaa73731919@yandex.com',
    password: bcrypt.hashSync('123789456', 10),
    groups: ['USER', 'MODERATOR']
  },
  {
    username: 'stupid_user',
    email: 'stupid_user@yandex.com',
    password: bcrypt.hashSync('stupid_user', 10),
    groups: ['USER']
  }
]
