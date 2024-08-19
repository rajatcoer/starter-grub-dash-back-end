const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// Implemented the /orders handlers needed to make the tests pass
function list(req, res) {
  res.json({ data: orders});
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;    
    if (data[propertyName]) {
      return next();
    }
    next({
        status: 400,
        message: `Order must include a ${propertyName}`
    });
  };
}

function bodyDataHasArray() {
  return function (req, res, next) {
    const { data = {} } = req.body;
    const dishes = data["dishes"];
    if (Array.isArray(dishes) && dishes.length>0) {
      return next();
    }
    next({
        status: 400,
        message: `Order must include at least one dish`
    });
  };
}

function quantityIsValidNumber(req, res, next){
  const { data = {} } = req.body;
  const dishes = data["dishes"];
  for(let index=0; index < dishes.length; index++){
    const quantity = dishes[index]["quantity"]
    if (quantity <= 0 || !Number.isInteger(quantity)){
      return next({
          status: 400,
          message: `dish ${index} must have a quantity that is an integer greater than 0`
      });
    }
  }
  
  next();
}

function create(req, res) {
  const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;
  const newOrder = {
    id: nextId(), // Assigns next Id
    deliverTo: deliverTo,
    mobileNumber: mobileNumber,
    status: status,
    dishes: dishes,
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

function orderExists(req, res, next) {
  const { orderId } = req.params;
  const foundOrder = orders.find(order => order.id === orderId);
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  }
  next({
    status: 404,
    message: `Order does not exist: ${orderId}`,
  });
};

function read(req, res, next) {
  res.json({ data: res.locals.order });
};

function orderIdMatches(req, res, next) {
  const { orderId } = req.params;
  const { data: { id } = {} } = req.body;
  if( !id ){
    return next();
  }
  if (id === orderId) {
    return next();
  }
  next({
    status: 400,
    message: `Order id does not match route id. Order: ${id}, Route: ${orderId}`,
  });
};

function statusIsValidForUpdate(req, res, next) {
  const { data: { status } = {} } = req.body;
  const validStatus = ["pending", "out-for-delivery"];
  if (status) {
    if(validStatus.includes(status)) {
      return next();
    }
    else if(status === "delivered"){
      next({
        status: 400,
        message: `A delivered order cannot be changed`,
      });
    }
    else{
      next({
        status: 400,
        message: `Invalid status`,
      });
    }
  }
  next({
    status: 400,
    message: `Order must have a status of pending, preparing, out-for-delivery, delivered`,
  });
}

function update(req, res) {
  const order = res.locals.order;
  const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;

  // update the dish
  order.deliverTo = deliverTo;
  order.mobileNumber = mobileNumber;
  order.status = status;
  order.dishes = dishes;

  res.json({ data: order });
}

function statusIsValidForDelete(req, res, next) {
  const order = res.locals.order;
  if(order.status === "pending") {
    return next();
  }
  next({
    status: 400,
    message: `An order cannot be deleted unless it is pending.`,
  });
}

function destroy(req, res) {
  const { orderId } = req.params;
  const index = orders.findIndex((order) => order.id === Number(orderId));
  // `splice()` returns an array of the deleted elements, even if it is one element
  const deletedOrders = orders.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  create: [
      bodyDataHas("deliverTo"),
      bodyDataHas("mobileNumber"),
      bodyDataHas("dishes"),
      bodyDataHasArray("dishes"),
      quantityIsValidNumber,
      create
  ],
  list,
  read: [orderExists, read],
  update: [
      orderExists,
      orderIdMatches,
      bodyDataHas("deliverTo"),
      bodyDataHas("mobileNumber"),
      bodyDataHas("dishes"),
      bodyDataHasArray("dishes"),
      quantityIsValidNumber,
      statusIsValidForUpdate,
      update
  ],
  delete: [
      orderExists, 
      statusIsValidForDelete,
      destroy],
};