# Ecommerce API

API for getting all details of ecommerce store

### Base Endpoint

```sh
GET /api/v1/products
```

#### Get all products with pagination

```sh
GET  /?currentPage=1&productsPerPage=10
```

#### Sort products by any field

- {key} can be title,description,price or rating

```sh
GET /sort={key}-desc&currentPage=1&productsPerPage=10
```

#### Get single product

```sh
GET /{product-id}
```

#### Get all categories

```sh
GET /categories
```

#### Get all products by category

```sh
GET /category?type={category}
```
