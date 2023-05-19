# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index /product [GET]
- Show /product/:id [GET]
- Create /product/create [POST] [token required]
    body: {
        "name": string,
        "price": number
    }

#### Users
- Index /user [GET] [token required]
- Show /user/:id [GET] [token required]
- Get-token /user/get-token [POST]
    body: {
        "firstname": string,
        "lastname": string,
        "password": string
    }
- Create /user/create [POST] [token required]
    body: {
        "firstname": string,
        "lastname": string,
        "password": string
    }

#### Orders
- Index /order [GET] [token required]
- Create /order [POST] [token required]
    body: {
        "user_id": number,
        "status": string  ['active','complete']
    }
- Current Order by user (args: user id) /order/:user_id [GET]  [token required]
- [ADD] /detail/:order_id [GET] [token required]
- [ADD] /detail/add_product [POST] [token required]
    body: {
        "order_id": number,
        "product_id": number,
        "quantity": number
    }

## Data Shapes
#### Product
-  id
- name
- price
```
Table products (id serial primary key, name varchar(255) not null, price integer not null)
```
#### User
- id
- firstname
- lastname
- password
```
Table products (id serial primary key, firstname varchar(255) not null, lastname varchar(255) not null, password varchar(255) not null)
```
#### Orders
- id
- user_id
- status

```
Table orders (id serial primary key, user_id bigint not null [foreign key to users table], status boolean not null)
```
#### Product Orders
- id
- order_id
- product_id
- quantity 

```
Table product_order (id serial primary key, product_id bigint not null [foreign key to products table], quanlity interger not null,order_id bigint not null [foreign key to orders table])
```