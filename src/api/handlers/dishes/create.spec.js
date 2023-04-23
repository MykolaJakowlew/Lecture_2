const { createDish } = require('./create');
const Models = require('../../../models');

const DishesMock = {};
jest.mock('../../../models', () => {
  DishesMock.save = jest.fn();
  return {
    Dishes: jest.fn().mockImplementation(() => ({
      save: DishesMock.save
    }))
  };
});

describe("createDish", () => {
  const res = {
    status: jest.fn().mockImplementation(() => res),
    send: jest.fn(),
  };

  describe("default value isAvailable", () => {
    it("is use ", async () => {
      const req = { body: { price: 23 } };
      const spyOn = jest.spyOn(Models, 'Dishes');
      await createDish(req, res);
      expect(spyOn.mock.calls[0])
        .toEqual([{ ...req.body, isAvailable: true }]);
    });

    it("is not use ", async () => {
      const req = { body: { price: 23, isAvailable: false } };
      const spyOn = jest.spyOn(Models, 'Dishes');
      await createDish(req, res);
      expect(spyOn.mock.calls[0])
        .toEqual([req.body]);
    });
  });

  it('data will be save in collection', async () => {
    const req = { body: { price: 23 } };
    await createDish(req, res);
    expect(DishesMock.save).toBeCalled();
  });

  describe('response will be correct', () => {
    it("should return 200 status code", async () => {
      const req = { body: { price: 23 } };
      await createDish(req, res);
      expect(res.status).toBeCalledWith(200);
    });

    it("should return doc from collection", async () => {
      const req = { body: { price: 23 } };
      await createDish(req, res);
      expect(res.status).toBeCalledWith(200);
    });

  });

});

const fs = require('fs');

describe("group 1", () => {

  beforeAll(() => {
    fs.appendFileSync('./log', "Run before all in group 1\n");
  });
  beforeEach(() => {
    fs.appendFileSync('./log', "Run before each in group 1\n");
  });

  afterEach(() => {
    fs.appendFileSync('./log', "Run after each in group 1\n");
  });
  afterAll(() => {
    fs.appendFileSync('./log', "Run after all in group 1\n");
  });

  it("test 1 from group 1", () => { fs.appendFileSync('./log', "Run test 1 from group 1\n"); });
  describe("group 2", () => {
    beforeAll(() => {
      fs.appendFileSync('./log', "Run before all in group 2\n");
    });
    beforeEach(() => {
      fs.appendFileSync('./log', "Run before each in group 2\n");
    });

    afterEach(() => {
      fs.appendFileSync('./log', "Run after each in group 2\n");
    });
    afterAll(() => {
      fs.appendFileSync('./log', "Run after all in group 2\n");
    });
    it("test 2 from group 2", () => { fs.appendFileSync('./log', "Run test 2 from group 2\n"); });
    it("test 3 from group 2", () => { fs.appendFileSync('./log', "Run test 3 from group 3\n"); });
  });
});