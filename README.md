# web-watch


## 1. User

* Base URL: http://localhost:3001/api/user/
* Đối tượng User

| Field       | Type    | Require | Desciption                        |
| ----------- | ------- | ------- | --------------------------------- |
| userId      | string  | require | id người dùng                     |
| fullName    | string  | require | họ tên của người dùng             |
| email       | string  | require | email của người dùng              |
| password    | string  | require | mật khẩu của người dùng           |
| phone       | number  | require | số điện thoại của người dùng      |
| address     | string  | require | Địa chỉ của người dùng           |
| role        | string  | require | vai trò của người dùng            |

### 1.1 Login

- **Request**:

  - Method: POST
  - Path: /user/sign-in
  - Body:

  | Field    | Type   | Require | Description             |
  | -------- | ------ | ------- | ----------------------- |
  | email    | string | require | email của người dùng    |
  | password | string | require | mật khẩu của người dùng |

### 1.2 Register

- **Request**:

  - Method: POST
  - Path: /users/sign-up
  - Body:

  | Field     | Type    | Require | Desciption                   |
  | --------- | ------ | ------- | ----------------------------- |
  | fullName  | string | require | họ tên của người dùng         |
  | email     | string | require | email của người dùng          |
  | password  | string | require | mật khẩu của người dùng       |
  | phone     | number | require | số điện thoại  của người dùng |
  | address   | string | require | địa chỉ của người dùng       |

  ### 1.4 Forgot password

- **Request**:

  - Method: POST
  - Path: /user/forgot-password
  - Body:

  | Field | Type   | Require | Description          |
  | ----- | ------ | ------- | -------------------- |
  | email | string | require | email của người dùng |

  ### 1.5 Reset password

- **Request**:

  - Method: POST
  - Path: /users/reset-password/:resetPasswordToken
  - Body:

  | Field    | Type   | Require | Description  |
  | -------- | ------ | ------- | ------------ |
  | password | string | require | mật khẩu mới |

  ### 1.6 Update user

- **Request**:

  - Method: PATCH
  - Path: /users/:userId
  - body:

  | Field              | Type   | Require | Description                      |
  | ------------------ | ------ | ------- | -------------------------------- |
  | fullName           | string | require | họ tên của người dùng            |
  | email              | string | require | email của người dùng             |
  | password           | string | require | mật khẩu của người dùng          |
  | phone              | number | require | số điện thoại  của người dùng    |
  | address            | string | require | địa chỉ của người dùng           |

### 1.7 Delete user

- **Request**:

  - Method: DELETE
  - Path: /user/::userId
  - Body:

  | Field              | Type   | Require | Description                      |
  | ------------------ | ------ | ------- | -------------------------------- |
  | fullName           | string | require | họ tên của người dùng            |
  | email              | string | require | email của người dùng             |
  | password           | string | require | mật khẩu của người dùng          |
  | phone              | number | require | số điện thoại  của người dùng    |
  | address            | string | require | địa chỉ của người dùng           |

### 1.8 Get user

- **Request**:

  - Method: Get
  - Path: /user/

  ### 1.9 Get list

- **Request**:

  - Method: GET
  - Path: /user/list

## 2. Product
* Base URL: http://localhost:3001/api/product/
* Đối tượng Product

| Field       | Type    | Require | Desciption                        |
| ----------- | ------- | ------- | --------------------------------- |
| producId    | string  | require | id của sản phẩm                   |
| name        | string  | require | tên của sản phẩm                  |
| images      | string  | require | ảnh của sản phẩm                  |
| type        | string  | require | kiểu dáng của sản phẩm            |
| brand       | string  | require | thương hiệu của sản phẩm          |
| category    | string  | require | loại sản phẩm                     |
| price       | number  | require | giá bán của sản phẩm              |
| quantity    | number  | require | số lượng sản phẩm                 |
| description | string  | require | mô tả của sản phẩm                |
| caliber     | string  | require | bộ máy của sản phẩm               |
| rating      | number  | require | số sao của sản phẩm               |
| numReviews  | number  | require | Số lượng đánh giá sản phẩm        |
| blog        | string  | require | bài viết của sản phẩm             |


### 2.1 add product

- **Request**:

  - Method: POST
  - Path: /
  - Body:

| Field       | Type    | Require | Desciption                        |
| ----------- | ------- | ------- | --------------------------------- |
| name        | string  | require | tên của sản phẩm                  |
| images      | string  | require | ảnh của sản phẩm                  |
| type        | string  | require | kiểu dáng của sản phẩm            |
| brand       | string  | require | thương hiệu của sản phẩm          |
| category    | string  | require | loại sản phẩm                     |
| price       | number  | require | giá bán của sản phẩm              |
| quantity    | number  | require | số lượng sản phẩm                 |
| description | string  | require | mô tả của sản phẩm                |
| caliber     | string  | require | bộ máy của sản phẩm               |

### 2.2 Edit product
  - Method: PATCH
  - Path: /:id,
  - Body:

| Field       | Type    | Require | Desciption                        |
| ----------- | ------- | ------- | --------------------------------- |
| name        | string  | require | tên của sản phẩm                  |
| images      | string  | require | ảnh của sản phẩm                  |
| type        | string  | require | kiểu dáng của sản phẩm            |
| brand       | string  | require | thương hiệu của sản phẩm          |
| category    | string  | require | loại sản phẩm                     |
| price       | number  | require | giá bán của sản phẩm              |
| quantity    | number  | require | số lượng sản phẩm                 |
| description | string  | require | mô tả của sản phẩm                |
| caliber     | string  | require | bộ máy của sản phẩm               |

### 2.3 Delete product
  - Method: DELETE
  - Path: /:id,
  - Body:

### 2.4 Get product
  - Method: GET
  - Path: /:id,
  - Body:

### 2.5 Get list product
  - Method: GET
  - Path: /list,
  - Body:

### 2.6 Get list product
  - Method: GET
  - Path: /search/:name,
  - Body:

### 2.7 Get filter product
  - Method: GET
  - Path: /filter,
  - Body:

## 3. Order
* Base URL: http://localhost:3001/api/order/
* Đối tượng Order

### 3.1 Get list order

  - Method: GET
  - Path: /,
  - Body:
  