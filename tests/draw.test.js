import {
  afterEach,
  beforeEach, expect, test,
} from '@jest/globals';
import {
  settings, handleEvents, getPrompt, removePrompt,
} from '../app/index.js';
import { COMMAND_DRAW } from '../constants/command.js';
import storage from '../storage/index.js';
import { createEvents, TIMEOUT, USER_ID } from './utils.js';

beforeEach(() => {
  storage.initialize(settings);
});

afterEach(() => {
  removePrompt(USER_ID);
});

test('COMMAND_DRAW', async () => {
  const events = [
    ...createEvents([`${COMMAND_DRAW.text}人工智慧`]),
  ];
  let results;
  try {
    results = await handleEvents(events);
  } catch (err) {
    console.error(err);
  }
  expect(getPrompt(USER_ID).lines.length).toEqual(3 * 2);
  const replies = results.map(({ messages }) => messages.map(({ originalContentUrl }) => originalContentUrl));
  expect(replies).toEqual(
    [
      ['OK!'],
    ],
  );
}, TIMEOUT);
