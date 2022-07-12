import { allSettled, fork } from 'effector';

import { createJsonQuery } from '../create_json_query';

describe('remote_data/query/json.fetching', () => {
  // Does not matter
  const response = {
    contract: {
      data: { validate: () => null, extract: <T>(v: T) => v },
      error: { is: () => false, extract: <T>(v: T) => v },
    },
    mapData: <T>(v: T) => v,
  };

  // Does not matter
  const request = {
    url: 'http://api.salo.com',
    method: 'GET' as const,
  };

  test('perform fetching on start', async () => {
    const requestMock = jest.fn();

    const query = createJsonQuery({
      request,
      response,
    });

    const scope = fork({
      handlers: [[query.__.executeFx, requestMock]],
    });

    await allSettled(query.start, { scope });

    expect(requestMock).toHaveBeenCalledTimes(1);
  });
});