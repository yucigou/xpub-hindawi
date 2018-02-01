# AWS S3 File Upload

In order to use `xpub-aws` you first need to have a `.env` file containing AWS data in the root folder of the starting point of your applications.

The `.env` file should look like this:
```bash
AWS_ACCESS_KEY = exampleKey
AWS_SECRET_KEY = exampleKey/sads/21
AWS_REGION = region-name
AWS_BUCKET = bucket-name
```

Then, as soon as possible in your app you should add the `dotenv` package:
```js
require('dotenv').config()
```

# `xpub-aws` API
A list of endpoints that help you upload, download and delete S3 files.

## Upload a file [POST]
#### Request
`POST /api/aws`
#### Request body
```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryWfPNVh4wuWBlyEyQ

------WebKitFormBoundaryWfPNVh4wuWBlyEyQ
Content-Disposition: form-data; name="fileType"

supplementary
------WebKitFormBoundaryWfPNVh4wuWBlyEyQ
Content-Disposition: form-data; name="fragmentId"

545
------WebKitFormBoundaryWfPNVh4wuWBlyEyQ
Content-Disposition: form-data; name="file"; filename="attachment.txt"
Content-Type: text/plain

[file content goes there]
------WebKitFormBoundaryWfPNVh4wuWBlyEyQ
```
#### Response
```json
{
	"id": "unique-file-id",
	"name": "Document Name.doc",
	"size": 452097
}
```

## Retrieve file signed URL [GET]
This endpoint allows you to retrieve a file's signed URL that can be used to download the file.
#### Request
`GET /api/aws/{fragmentId}/{fileId}`

| URI Parameter | Requiered | Requirements | Description |
| -------- | -------- | -------- | -------- |
| fragmentId | Yes | String | The ID of the fragment to which the file belongs to |
| fileId | Yes | String | The ID of the file |

#### Response
```json
HTTP/1.1 200
{
	"signedUrl": "aws-url"
}
```

## Delete file [DELETE]
#### Request
`DELETE /api/aws/{fragmentId}/{fileId}`

| URI Parameter | Requiered | Requirements | Description |
| -------- | -------- | -------- | -------- |
| fragmentId | Yes | String | The ID of the fragment to which the file belongs to |
| fileId | Yes | String | The ID of the file |

#### Response
```json
HTTP/1.1 204
```
---





