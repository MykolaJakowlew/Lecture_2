const mongoose = require("mongoose");
const { createDish } = require("../src/api/handlers/dishes/create");
const { Dishes } = require("../src/models");

describe("[integration] createDish", () => {

 beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_DB_URI, {
   auth: {
    username: process.env.MONGO_DB_LOGIN,
    password: process.env.MONGO_DB_PASSWORD,
   }
  });
 });

 afterAll(async () => {
  await Dishes.deleteMany({});
 });


 it('data will be save in collection', async () => {
  const mockBody = { price: 45, isAvailable: true };
  const req = { body: mockBody };
  const res = {
   status: jest.fn().mockImplementation(() => res),
   send: jest.fn()
  };

  await createDish(req, res);

  const _id = res.send.mock.calls[0][0]._id;

  const doc = await Dishes.findOne({ _id });

  expect(doc).not.toBeNull();
  expect(doc.isAvailable).toBe(true);
  expect(doc.price).toBe(45);
 });
});