const { registerUser } = require('./userController');

describe('register user', () => {
  test('send new user Object', () => {
    const {
        email: 'test@test.com',
        password: '123456',
        subscription: 'starter',
        token: '',
        avatarURL: ' ',
      }
    expect(
      registerUser({
        email: 'test@test.com',
        password: '123456',
        subscription: 'starter',
        token: '',
        avatarURL: ' ',
      })
    ).toBe({
      email: 'test@test.com',
      password: '123456',
      subscription: 'starter',
      token: '',
      avatarURL: 'default.jpg',
    });
  });
});
