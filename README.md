# ecommerce
Creating eCommerce Customer site \
Technologi use :
* Frontend use Framwork Vue Engine
* Backend use Sequelize, Express
* Deploy in Heroku and Firebase

Visit to :
* https://ecommerce-shopper.web.app/

### Utillity
```
1. Views Product
2. Add to Cart
3. Edit and Delete Cart
4. Checkout Cart / History
```
```
# ecommerce shoppers API Documentation
```
------------------------------------

# Route Shopers
### POST /shopers/register
> Create account shoper
>
*Request Body*
```
{
    "name": "<asset name>",
    "email": "<asset email>",
    "password": "<asset password>"
    "address": "<asset address>"
    "phone": "<asset phone>"
}
```
*Respons (201)*
```
  "akses_token": "<returned akses_token>"
  "username": "<returned username>"
```
*Respons (404-bad request / data not found)*
```
{
  "message": "<returned error message>"
}
```
*Respons (400-bad request / vadation error)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### POST /shopers/login
> Enter account user
>
*Request Body*
```
{
    "email": "<asset email>",
    "password": "<asset password>"
}
```
*Respons (200)*
```
  "akses_token": "<returned akses_token>"
  "user_id": "<returned user_id>"
  "username": "<returned username>"
```
*Respons (401-bad request / email or password invalid)*
```
{
  "message": "<returned error message>"
}
```
*Respons (404-bad request / shopers not found)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>

### GET /shopers/transaction
> Get Transaction in json array of objects
>
*Request Header*
```
not needed
```
*Request Body*
```
not needed
```
*Respons (200)*
```
[
    {
        "id": 23,
        "ShoperId": 6,
        "ProductId": 1,
        "delivery": "JNE",
        "items": 1,
        "price": 123000,
        "createdAt": "2020-06-03T11:46:10.909Z",
        "updatedAt": "2020-06-03T11:46:10.909Z",
        "Product": {
            "id": 1,
            "name": "tshirt",
            "image_url": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
            "stock": 20,
            "price": 123000,
            "createdAt": "2020-05-16T14:03:56.448Z",
            "updatedAt": "2020-06-03T11:11:06.522Z"
        }
    },
    {
        "id": 28,
        "ShoperId": 6,
        "ProductId": 5,
        "delivery": "JNE",
        "items": 1,
        "price": 90000,
        "createdAt": "2020-06-03T12:16:37.508Z",
        "updatedAt": "2020-06-03T12:16:37.508Z",
        "Product": {
            "id": 5,
            "name": "tshirt",
            "image_url": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "stock": 18,
            "price": 90000,
            "createdAt": "2020-05-27T17:01:42.706Z",
            "updatedAt": "2020-06-03T11:10:32.859Z"
        }
    },
]
```
*Responses Error(404-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>

### POST /shopers/transaction
> Add product to transaction
>
*Request Header*
```
{
    "access_token": "<assets access_token>"
}
```
*Request Body*
```
{
    "ShoperId": "<asset ShopertId>",
    "ProductId": "<asset ProductId>",
    "delivery": "<asset delivery>"
    "items": "<asset items>"
    "price": "<asset price>"
}
```
*Respons (200)*
```
{
    "id": 37,
    "ShoperId": 6,
    "ProductId": 6,
    "delivery": "JNE",
    "items": 3,
    "price": 125000,
    "updatedAt": "2020-06-04T09:31:47.923Z",
    "createdAt": "2020-06-04T09:31:47.923Z"
}   
```
*Responses Error(400-bad request / validation error)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(404-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(500-error server)*
```
{
  "message": "<returned error message>"
}
```
### GET /shopers/transaction/:id

### PUT /shopers/transaction/:id
> Delete Products on trnsaction
>
*Request Params*
```
{
    "id": "<assets id>"
}
```
*Request Header*
```
{
    "access_token": "<assets access_token>"
}
```
*Request Body*
```
{
    "ShoperId": "<asset ShopertId>",
    "ProductId": "<asset ProductId>",
    "delivery": "<asset delivery>"
    "items": "<asset items>"
    "price": "<asset price>"
}
```
*Respons (200)*
```
{
    "id": 37,
    "ShoperId": 6,
    "ProductId": 6,
    "delivery": "JNE",
    "items": 3,
    "price": 125000,
    "updatedAt": "2020-06-04T09:31:47.923Z",
    "createdAt": "2020-06-04T09:31:47.923Z"
}   
```
*Responses Error(400-bad request / validation error)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(404-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(500-error server)*
```
{
  "message": "<returned error message>"
}
```
### DELETE /shopers/transaction/:id
> Delete Products on trnsaction
>
*Request Params*
```
{
    "id": "<assets id>"
}
```
*Request Header*
```
{
    "access_token": "<assets access_token>"
}
```
*Request Body*
```
not needed
```
*Respons (200)*
```
{
    "msg": "Data successfully deleted"
}   
```
*Responses Error(400-bad request / validation error)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(404-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(500-error server)*
```
{
  "message": "<returned error message>"
}
```

### GET /shopers/checkout/
> Get checkout in json array of objects
>
*Request Header*
```
not needed
```
*Request Body*
```
not needed
```
*Respons (200)*
```
[
    {
        "id": 3,
        "ShoperId": 6,
        "ProductId": 1,
        "codeTransaction": "XX/C/Wed Jun 03",
        "productName": "tshirt",
        "amount": 2,
        "subtotal": 258000,
        "date": "2020-06-03",
        "delivery": "TIKI",
        "status": "unpaid",
        "createdAt": "2020-06-03T04:24:27.835Z",
        "updatedAt": "2020-06-03T04:24:27.835Z"
    },
    {
        "id": 4,
        "ShoperId": 6,
        "ProductId": 5,
        "codeTransaction": "XX/C/Wed Jun 03",
        "productName": "tshirt",
        "amount": 12,
        "subtotal": 1090000,
        "date": "2020-06-03",
        "delivery": "JNE",
        "status": "unpaid",
        "createdAt": "2020-06-03T04:24:27.843Z",
        "updatedAt": "2020-06-03T04:24:27.843Z"
    }
]
```
*Responses Error(404-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>

### POST /shopers/checkout/
> Get checkout in json array of objects
>
*Request Header*
```
{
    "access_token": "<assets access_token>"
}
```
*Request Body*
```
{
    "ShoperId": "<asset ShopertId>",
    "ProductId": "<asset ProductId>",
    "codeTransaction": "<asset codeTransaction>",
    "productName": "<asset productName>",
    "amount": "<asset amount>"
    "subtotal": "<asset subtotal>"
    "delivery": "<asset delivery>"
    "date": "<asset date>"
    "status": "<asset status>"
}
```
*Respons (200)*
```
[
    {
        "id": 3,
        "ShoperId": 6,
        "ProductId": 1,
        "codeTransaction": "XX/C/Wed Jun 03",
        "productName": "tshirt",
        "amount": 2,
        "subtotal": 258000,
        "date": "2020-06-03",
        "delivery": "TIKI",
        "status": "unpaid",
        "createdAt": "2020-06-03T04:24:27.835Z",
        "updatedAt": "2020-06-03T04:24:27.835Z"
    },
]
```
*Responses Error(404-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>