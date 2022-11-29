require('dotenv').config();

const authService = require('./authService');
const jwt = require('jsonwebtoken');
const { requestError } = require('../utils');
const { User } = require('../model');

const _id = 1;
const email = 'user1@asdf.com';
const subscription = 'pro';
const token = jwt.sign({ _id, email, subscription }, process.env.JWT_SECRET);
const incorrectToken = jwt.sign({ _id: 5, email, subscription: `${subscription}` }, process.env.JWT_SECRET);
const invalidToken = jwt.sign({ _id, email, subscription: `${subscription}` }, 'asdfasdf');
const mDbUser = { _id, email, subscription, token };

const mFindById = async () => mDbUser;

describe('Auth middleware test', () => {
  it('correct request: add user and token to "req" and call "next()"', async () => {
    const mReq = { headers: { authorization: `Bearer ${token}` }, mDbUser };
    const mRes = {};

    const mockNext = jest.fn();

    jest.spyOn(User, 'findById').mockImplementationOnce(mFindById);

    await authService(mReq, mRes, mockNext);

    expect(mReq.user).toEqual({ ...mDbUser, token });
    expect(mockNext).toHaveBeenCalled();
  });

  it('no auth header: call next() with requestError "TokenMismatch")', async () => {
    const mReq = { headers: {} };
    const mRes = {};

    const mockNext = jest.fn();

    await authService(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(requestError(401, 'Not authorized', 'TokenMismatch'));
  });

  it('no Bearer: call next() with requestError "InvalidHeader"', async () => {
    const mReq = { headers: { authorization: token } };
    const mRes = {};

    const mockNext = jest.fn();

    await authService(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(requestError(401, 'Auth scheme unsupported', 'InvalidHeader'));
  });

  it('no token: call next() with requestError "InvalidHeader"', async () => {
    const mReq = { headers: { authorization: 'Bearer ' } };
    const mRes = {};

    const mockNext = jest.fn();

    await authService(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(requestError(401, 'Not authorized', 'InvalidHeader'));
  });

  it('invalid token: call next() with requestError "TokenInvalid"', async () => {
    const mReq = { headers: { authorization: `Bearer ${invalidToken}` } };
    const mRes = {};

    const mockNext = jest.fn();

    await authService(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(requestError(401, 'Not authorized', 'TokenInvalid'));
  });

  it('valid token, no user: call "next() with requestError "NoTokenUser"', async () => {
    const mReq = { headers: { authorization: `Bearer ${token}` } };
    const mRes = {};

    const mockNext = jest.fn();

    jest.spyOn(User, 'findById').mockImplementationOnce(() => null);

    await authService(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(requestError(401, 'Not authorized', 'NoTokenUser'));
  });

  it('valid but incorrect (not in DB) token: call "next() with requestError "TokenMismatch"', async () => {
    const mReq = { headers: { authorization: `Bearer ${token}` }, mDbUser };
    const mRes = {};

    const mockNext = jest.fn();

    jest.spyOn(User, 'findById').mockImplementationOnce(async () => ({ ...mDbUser, token: incorrectToken }));
    jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(async () => ({ ...mDbUser, token: '' }));

    await authService(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(requestError(401, 'Not authorized', 'TokenMismatch'));
  });
});
