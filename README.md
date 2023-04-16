# 3DShop.com MERN FSOC Project

## Project - 3DShop.com

### Project Link ==

### Overview - 3DShop.com is website where user can download 3DS Max Interior and Exterior source file
### with V-ray render setup & materials, after payement. Unauthorized user can not download file. LoggedIn user can see there purchase details.

## FEATURE I - User

### Models

- User Model

```yaml
{
  name: { string, mandatory },
  email: { string, mandatory, valid email, unique },
  password: { string, mandatory, valid password },
  createdAt: { timestamp },
  updatedAt: { timestamp },
}
```

## User APIs

### POST /register

- Create a user document from request body.
- Save password in encrypted format. (use bcrypt-js)
- **Response format**

```yaml
{
  "message": "User registration successfull",
  "data":
    {
      "name": "bruce",
      "email": "ash@gmail.com",
      "role": "user",
      "_id": "643c2495e44153efbabecb8f",
      "createdAt": "2023-04-16T16:38:45.110Z",
      "updatedAt": "2023-04-16T16:38:45.110Z",
    },
}
```

### POST /login

- Allow an user to login with their email and password.
- On a successful login attempt return the userId and a JWT token contatining the userId, exp, iat.
  > **_NOTE:_** There is a slight change in response body. You should also return userId in addition to the JWT token.
- **Response format**

```yaml
{
  "message": "Login Success",
  "data":
    {
      "_id": "6433e4e016a27dfe09b9337f",
      "name": "bruce",
      "email": "batman@gmail.com",
      "role": "admin",
      "createdAt": "2023-04-10T10:28:48.448Z",
      "updatedAt": "2023-04-11T13:15:56.868Z",
    },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMzZTRlMDE2YTI3ZGZlMDliOTMzN2YiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODE1Mzk3NjYsImV4cCI6MTY4MTYyNjE2Nn0.6y9aKeZMKtRrsqLW9v-1T6IlkcDMaybTC3D-fXgyj5M",
}
```

## FEATTURE II - Files

### Models

- File Model

```yaml
{
  {
    title: { type: String, require: true, lowercase: true },
    description: { type: String, require: true },
    fileSize: { type: String, require: true },
    prize: { type: Number, require: true, default: 0 },
    filePath: { type: String, require: true },
    imgPath: { type: String, require: true },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
}
```

## File API (authentication required / only admin can create, update and deleti file)

### POST /FIle

- Create a file document from request body.
- Upload file image to S3 bucket and save image public url in document.
- Upload file path to S3 bucket and save image public url in document.
- **Response format**

```yaml
{
  "message": "file Created successfully",
  "data":
    {
      "title": "modern livingroom 2",
      "description": "3ds max vray",
      "fileSize": "200",
      "prize": 4000,
      "imgPath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
      "isDeleted": false,
      "_id": "6437ee55be7216124fe0c425",
      "createdAt": "2023-04-13T11:58:13.564Z",
      "updatedAt": "2023-04-13T11:58:13.564Z",
    },
}
```

### GET /File

- Returns all products in the collection that aren't deleted.

  - **Filters**
    - Size (The key for this filter will be 'title')

- **Response format**

```yaml

{
    "data": [
        {
            "_id": "6431916c09569017e98eba0a",
            "title": "Modern LivingRoom 2",
            "description": "3ds max vray",
            "fileSize": "200",
            "prize": 4000,
            "imgPath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
            "isDeleted": false,
            "createdAt": "2023-04-08T16:08:12.085Z",
            "updatedAt": "2023-04-08T16:08:12.085Z",
            "__v": 0
        },
        {
            "_id": "643acb615d695ad86ee1956d",
            "title": "413 living room 3d max interior scene",
            "description": "Please comment if you found the link was error. 3dsMax + obj (Vray) + Corona Modern Low poly. More materials you can find in the Material Editor. (Note for beginners: If you need color variations or material variations, please do not import the model in the Slate Material Editor. use Compact Material Editor)",
            "fileSize": "300mb",
            "prize": 1500,
            "imgPath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/413-Living-Room-3d-Max-Interior-Scene-1024x914.jpg%20%281%29.webp",
            "isDeleted": false,
            "createdAt": "2023-04-15T16:05:53.942Z",
            "updatedAt": "2023-04-15T16:05:53.942Z",
            "__v": 0
        },

}

```

### GET /file/:fileId

- Returns product details by file id
- **Response format**

  ```yaml
  {
    "data":
      {
        "_id": "6431916c09569017e98eba0a",
        "title": "Modern LivingRoom 2",
        "description": "3ds max vray",
        "fileSize": "200",
        "prize": 4000,
        "imgPath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
        "isDeleted": false,
        "createdAt": "2023-04-08T16:08:12.085Z",
        "updatedAt": "2023-04-08T16:08:12.085Z",
        "__v": 0,
      },
  }
  ```

### PUT /file/:fileId

- Updates a file by changing at least one or all fields
- Check if the fileId exists (must have isDeleted false and is present in collection).
- **Response format**

```yaml
{
  "message": "file Updated successfully",
  "data":
    {
      "title": "modern livingroom 2",
      "description": "3ds max vray",
      "fileSize": "200",
      "prize": 4000,
      "imgPath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
      "isDeleted": false,
      "_id": "6437ee55be7216124fe0c425",
      "createdAt": "2023-04-13T11:58:13.564Z",
      "updatedAt": "2023-04-13T11:58:13.564Z",
    },
}
```

### DELETE /products/:productId

- Deletes a product by file id if it's not already deleted
- **Response format**

```yaml
{ "message": "file Deleted successfully" }
```

## FEATURE III - Order

### Models

- Order Model

```yaml
{
   userId: {
      type: ObjectId,
      ref: "User",
    },

    fileId: {
      type: ObjectId,
      ref: "File",
      // unique: true,
    },

    status: {
      type: String,
      default: PENDING,
      enum: [PENDING, COMPLETED, CANCELLED],
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }

```

## Create/Order APIs (Authentication and authorization required)

### POST /orders/files/fileId

- Create an order for the user
- Make sure the userId in params and in JWT token match.
- Make sure the user exist

- **Response format**

```yaml
{
  "message": "order created successfully",
  "data":
    {
      "userId": "6433e4e016a27dfe09b9337f",
      "fileId":
        {
          "_id": "6431916c09569017e98eba0a",
          "title": "Modern LivingRoom 2",
          "description": "3ds max vray",
          "fileSize": "200",
          "prize": 4000,
          "filePath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/E-commerceapp-main.zip",
          "imgPath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
          "isDeleted": false,
          "createdAt": "2023-04-08T16:08:12.085Z",
          "updatedAt": "2023-04-08T16:08:12.085Z",
          "__v": 0,
        },
      "status": "pending",
      "amount": 4000,
      "_id": "643c2d6be44153efbabecb97",
      "createdAt": "2023-04-16T17:16:27.465Z",
      "updatedAt": "2023-04-16T17:16:27.465Z",
      "__v": 0,
    },
}
```

## order/payment/orderId APIs (Authentication and authorization required)

    - make payement for that order and change its status to complete
    - generate jwt token and send file download url in responce

# response

```yaml
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDMzZTRlMDE2YTI3ZGZlMDliOTMzN2YiLCJmaWxlSUQiOiI2NDMxOTE0NDA5NTY5MDE3ZTk4ZWJhMDYiLCJvcmRlcklkIjoiNjQzN2MxNTNjOTgyOTg5MGI2MDA0NDhkIiwiaWF0IjoxNjgxMzc1NTg5fQ.BmadpZ5y-HXg3W5HJq9f8xXCfiBUlNS1r_iQRWJDfP0",
  "data":
    {
      "_id": "6437c153c9829890b600448d",
      "userId": "6433e4e016a27dfe09b9337f",
      "fileId":
        {
          "_id": "6431914409569017e98eba06",
          "title": "Modern Bedroom 3",
          "description": "3ds max vray",
          "fileSize": "200",
          "prize": 4000,
          "filePath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/E-commerceapp-main.zip",
          "imgPath": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/master_bedroom_interior_design_1641210145_853463c6_progressive.jpg",
          "isDeleted": false,
          "createdAt": "2023-04-08T16:07:32.410Z",
          "updatedAt": "2023-04-08T16:07:32.410Z",
          "__v": 0,
        },
      "status": "completed",
      "amount": 4000,
      "createdAt": "2023-04-13T08:46:11.725Z",
      "updatedAt": "2023-04-13T08:46:29.642Z",
      "__v": 0,
    },
}
```

## file/download/:token APIs (Authentication and authorization required)

- get token in params and verify that user is login or not
- redirect to download filePath

  # If user is authenticated, file will get download

  # on failed responce

```yaml
{ "status": false, "message": "You are not loggedIn / You are not authorized " }
```
