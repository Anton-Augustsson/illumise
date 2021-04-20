/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import App from '../App';
 import request from '../client-communication/request';
 import chat from '../client-communication/chat';
 import account from '../client-communication/account';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

describe("Testing client communication", () =>
{
    beforeAll(async () =>
    {
        renderer.create(<App />);
    });

    it("test completeRequest", async () =>
    {
        let response = await request.completeRequest('antonabcdefg');
        expect(response).not.toBeNull();
    });

    it("test createAccount", async () =>
    {
        var credentials = {"firstName":"J", "lastName":"j", "email":"e", "token":"s" };
        let response = await account.createAccount(credentials);
        expect(response).not.toBeNull();
    });

    it("test sendMessage", async () =>
    {
        let response = await chat.sendMessage('antonabcdefg', 'chat123');
        expect(response).not.toBeNull();
    });

    afterAll(async () =>
    {
        // if needed
    });
});


/*
 test('test completeRequest', async() => {
  let response = await request.completeRequest('antonabcdefg');
  expect(response).not.toBeNull();
});

test('test createAccount', async() => {
  var credentials = {"firstName":"J", "lastName":"j", "email":"e", "token":"s" };
  let response = await account.createAccount(credentials);
  expect(response).not.toBeNull();
});

test('test sendMessage', async() => {
  let response = await chat.sendMessage('antonabcdefg', 'chat123');
  expect(response).not.toBeNull();
});


test('test set', async() => {
  let response = await request.provider.set('gdfs', 'sdaf');
  expect(response).not.toBeNull();
});

test('test getUserProviding', async() => {
  let response = await request.provider.getUserProviding('gdsf', '1');
  expect(response).not.toBeNull();
});

test('test newRequest', async() => {
  let response = await request.requester.newRequest('anton', 'some data');
  expect(response).not.toBeNull();
});*/
