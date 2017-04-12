import { expect } from 'chai';
import sinon from 'sinon';

import Polling from '~/api/polling';


describe('Polling', function () {
  const sandbox = sinon.sandbox.create();
  let apiRequestFn;
  let polling;

  beforeEach(function () {
    apiRequestFn = sandbox.spy();
    polling = Polling({
      apiRequestFn: apiRequestFn,
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('defines a simple function constructor', function () {
    expect(Polling).to.exist;
    expect(polling).to.exist;
    expect(typeof polling).to.equal('object');
  });

  it('defines an interface', function () {
    expect(polling.start).to.exist;
    expect(polling.stop).to.exist;
  });

  it('will execute a provided function', function (done) {
    this.timeout(100);
    const options = {
      apiRequestFn: async function () {
        polling.stop();
        done();
      },
      timeout: 10,
    };

    polling = Polling(options);
    polling.start();
  });
});