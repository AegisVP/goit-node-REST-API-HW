describe('Create default avatar', () => {
  const createDefaultAvatar = require('./createDefaultAvatar');
  const getHash = require('../utils/getHash');
  const fs = require('fs').promises;
  const defaultAvatarPath = './utils/defaultAvatar.jpg';
  require('dotenv').config();

  test('valid email passed', async () => {
    const passedEmail = 'user1@asdf.com';
    const result = await createDefaultAvatar(passedEmail);
    
    jest.mock('fs');

    const expectedResult = `${getHash(passedEmail)}.jpg`;
    const createdFilePath = `./public/avatars/${expectedResult}`;
    const createdAvatar = await fs.readFile(createdFilePath);
    const defaultAvatar = await fs.readFile(defaultAvatarPath);

    expect(result).toEqual(expectedResult);
    expect(createdAvatar).toEqual(defaultAvatar);

    fs.unlink(createdFilePath);
  });

  test('invalid email passed', async () => {
    const passedEmail = 'asdfasdfasdf';
    const result = await createDefaultAvatar(passedEmail);    

    jest.mock('fs');

    const expectedResult = `${getHash(passedEmail)}.jpg`;
    const createdFilePath = `./public/avatars/${expectedResult}`;
    const createdAvatar = await fs.readFile(createdFilePath);
    const defaultAvatar = await fs.readFile(defaultAvatarPath);

    expect(result).toEqual(expectedResult);
    expect(createdAvatar).toEqual(defaultAvatar);

    fs.unlink(createdFilePath);
  });

  test('number passed', async () => {
    const passedEmail = 12345678;
    const result = await createDefaultAvatar(passedEmail);  
    
    jest.mock('fs');

    const expectedResult = `${getHash(passedEmail)}.jpg`;
    const createdFilePath = `./public/avatars/${expectedResult}`;
    const createdAvatar = await fs.readFile(createdFilePath);
    const defaultAvatar = await fs.readFile(defaultAvatarPath);

    expect(result).toEqual(expectedResult);
    expect(createdAvatar).toEqual(defaultAvatar);

    fs.unlink(createdFilePath);
  });

  test('nothing passed', async () => {
    const passedEmail = null;
    const result = await createDefaultAvatar(passedEmail);   
    
    jest.mock('fs');

    const expectedResult = `${getHash(passedEmail)}.jpg`;
    const createdFilePath = `./public/avatars/${expectedResult}`;
    const createdAvatar = await fs.readFile(createdFilePath);
    const defaultAvatar = await fs.readFile(defaultAvatarPath);

    expect(result).toEqual(expectedResult);
    expect(createdAvatar).toEqual(defaultAvatar);

    fs.unlink(createdFilePath);
  });
});
