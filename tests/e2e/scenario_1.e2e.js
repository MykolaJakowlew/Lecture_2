/**
 * Клієнт може зробити замовлення страви, та отримати чек з цією стравою/стравами
 */

const request = require('supertest');
const bootstrapResult = require('../../src');
const { Dishes } = require('../../src/models');

describe("scenario 1", () => {
 let app;
 const responses = {};
 let orderId;
 let orderCreatedAt;
 let dishId;
 beforeAll(async () => {
  app = await bootstrapResult;
  const dishDocs = await Dishes.insertMany([
   { price: 10, isAvailable: true },
   { price: 20, isAvailable: false },
   { price: 30, isAvailable: false },
   { price: 40, isAvailable: true },
  ]);

  responses.createOrder = await request(app)
   .post('/orders')
   .send({ dishes: [] });

  // const { body: { _id: orderId } } = responses.createOrder;
  orderId = responses.createOrder.body._id;
  orderCreatedAt = responses.createOrder.body.createdAt;
  dishId = dishDocs[0]._id.toString();
  responses.addFirstDish = await request(app)
   .patch(`/orders/${orderId}/dishes`)
   .send({ dishId, quantity: 5 });
 });
 it("step 1", async () => {
  expect(responses.createOrder.statusCode).toBe(200);
  expect(responses.createOrder.body).toMatchObject({
   createdAt: expect.anything(),
   isOpen: true,
   dishes: [],
   _id: expect.anything(),
   __v: 0
  });

 });
 it("step 2", async () => {
  expect(responses.addFirstDish.statusCode).toBe(200);
  expect(responses.addFirstDish.body).toMatchObject({
   _id: orderId,
   createdAt: orderCreatedAt,
   isOpen: true,
   dishes: [
    {
     dishId,
     quantity: 5,
     price: 10,
     _id: expect.anything(),
    }
   ],
   __v: 0
  });
 });
 it("step 3", async () => {
  const response = await request(app)
   .patch(`/orders/${orderId}`)
   .send({ isOpen: false });
  expect(response.statusCode).toBe(200);
  expect(response.body).toMatchObject({
   _id: orderId,
   createdAt: orderCreatedAt,
   isOpen: false,
   dishes: [
    {
     dishId,
     quantity: 5,
     price: 10,
     _id: expect.anything(),
    }
   ],
   __v: 0
  });
 });

 it('step 4', async () => {
  const response = await request(app)
   .get(`/orders/${orderId}`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toMatchObject({
   _id: orderId,
   createdAt: orderCreatedAt,
   isOpen: false,
   dishes: [
    {
     dishId,
     quantity: 5,
     price: 10,
     _id: expect.anything(),
    }
   ],
   __v: 0,
   totalPrice: 45
  });
 });
});