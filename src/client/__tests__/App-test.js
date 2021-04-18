/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import chat from '../client-communication/chat'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}
async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}

test('some test', async() => {
  let response = await asyncCall();
  expect(response).not.toBeNull();
});


/***chat tests***/
test('test sendMessage', async() => {
  let response = await chat.sendMessage('1', '1');
  expect(response).not.toBeNull();
});
