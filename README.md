# starter-grub-dash-back-end
This Project makes the backend for the Grub Dash Project providing all the apis to serve the UI.

# Routes
Below are the routes :

# GET /dishes
This route will respond with a list of all existing dish data.

Example request

GET http://localhost:5000/dishes

Example response
{
  "data": [
    {
      "id": "d351db2b49b69679504652ea1cf38241",
      "name": "Dolcelatte and chickpea spaghetti",
      "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
      "price": 19,
      "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
    }
  ]
}

# POST /dishes
This route will save the dish and respond with the newly created dish.

Example request

POST http://localhost:5000/dishes
Body:

{
  "data": {
    "name": "Dolcelatte and chickpea spaghetti",
    "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
    "price": 19,
    "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
  }
}
Example response

Status 201

{
  "data": {
    "id": "d351db2b49b69679504652ea1cf38241",
    "name": "Dolcelatte and chickpea spaghetti",
    "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
    "price": 19,
    "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
  }
}

# GET /dishes/:dishId
This route will respond with the dish where id === :dishId or return 404 if no matching dish is found.

Example request

GET http://localhost:5000/dishes/3c637d011d844ebab1205fef8a7e36ea

Example response

Status 200

{
  "data": {
    "id": "d351db2b49b69679504652ea1cf38241",
    "name": "Dolcelatte and chickpea spaghetti",
    "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
    "price": 19,
    "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
  }
}

# PUT /dishes/:dishId
This route will update the dish where id === :dishId or return 404 if no matching dish is found.

Example request

PUT http://localhost:5000/dishes/3c637d011d844ebab1205fef8a7e36ea

Body:

{
  "data": {
    "id": "3c637d011d844ebab1205fef8a7e36ea",
    "name": "Century Eggs",
    "description": "Whole eggs preserved in clay and ash for a few months",
    "image_url": "some-valid-url",
    "price": "17"
  }
}

Example response

{
  "data": {
    "id": "3c637d011d844ebab1205fef8a7e36ea",
    "name": "Century Eggs",
    "description": "Whole eggs preserved in clay and ash for a few months",
    "image_url": "some-valid-url",
    "price": "17"
  }
}

# GET /orders
This route will respond with a list of all existing order data.

Example request

GET http://localhost:5000/orders

Example response
Status 200

{
  "data": [
    {
      "id": "5a887d326e83d3c5bdcbee398ea32aff",
      "deliverTo": "308 Negra Arroyo Lane, Albuquerque, NM",
      "mobileNumber": "(505) 143-3369",
      "status": "delivered",
      "dishes": [
        {
          "id": "d351db2b49b69679504652ea1cf38241",
          "name": "Dolcelatte and chickpea spaghetti",
          "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
          "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
          "price": 19,
          "quantity": 2
        }
      ]
    }
  ]
}

# POST /orders
This route will save the order and respond with the newly created order.

Example request

POST http://localhost:5000/orders
Body:

{
  "data": {
    "deliverTo": "308 Negra Arroyo Lane, Albuquerque, NM",
    "mobileNumber": "(505) 143-3369",
    "status": "delivered",
    "dishes": [
      {
        "id": "d351db2b49b69679504652ea1cf38241",
        "name": "Dolcelatte and chickpea spaghetti",
        "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
        "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
        "price": 19,
        "quantity": 2
      }
    ]
  }
}

Example Response

Status 201

{
  "data": {
    "id": "5a887d326e83d3c5bdcbee398ea32aff",
    "deliverTo": "308 Negra Arroyo Lane, Albuquerque, NM",
    "mobileNumber": "(505) 143-3369",
    "status": "delivered",
    "dishes": [
      {
        "id": "d351db2b49b69679504652ea1cf38241",
        "name": "Dolcelatte and chickpea spaghetti",
        "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
        "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
        "price": 19,
        "quantity": 2
      }
    ]
  }
}

# GET /orders/:orderId
This route will respond with the order where id === :orderId or return 404 if no matching order is found.

Example request

GET http://localhost:5000/orders/f6069a542257054114138301947672ba

Example response

Status 200

{
  "data": {
    "id": "f6069a542257054114138301947672ba",
    "deliverTo": "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    "mobileNumber": "(202) 456-1111",
    "status": "out-for-delivery",
    "dishes": [
      {
        "id": "90c3d873684bf381dfab29034b5bba73",
        "name": "Falafel and tahini bagel",
        "description": "A warm bagel filled with falafel and tahini",
        "image_url": "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        "price": 6,
        "quantity": 1
      }
    ]
  }
}

# PUT /orders/:orderId
This route will update the order where id === :orderId, or return 404 if no matching order is found.
Note : A delivered order cannot be changed.

Example request

PUT http://localhost:5000/orders/3c637d011d844ebab1205fef8a7e36ea

Body:

{
  "data": {
    "deliverTo": "Rick Sanchez (C-132)",
    "mobileNumber": "(202) 456-1111",
    "status": "delivered",
    "dishes": [
      {
        "id": "90c3d873684bf381dfab29034b5bba73",
        "name": "Falafel and tahini bagel",
        "description": "A warm bagel filled with falafel and tahini",
        "image_url": "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        "price": 6,
        "quantity": 1
      }
    ]
  }
}

Example response

{
  "data": {
    "id": "f6069a542257054114138301947672ba",
    "deliverTo": "Rick Sanchez (C-132)",
    "mobileNumber": "(202) 456-1111",
    "status": "delivered",
    "dishes": [
      {
        "id": "90c3d873684bf381dfab29034b5bba73",
        "name": "Falafel and tahini bagel",
        "description": "A warm bagel filled with falafel and tahini",
        "image_url": "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        "price": 6,
        "quantity": 1
      }
    ]
  }
}

# DELETE /orders/:orderId
This route will delete the order and return a 204 where id === :orderId, or return 404 if no matching order is found.

An order cannot be deleted unless it is pending. Returns a 400 status code

Example request

DELETE http://localhost:5000/dishes/3c637d011d844ebab1205fef8a7e36ea

Example response
Status 204 and no response body.
