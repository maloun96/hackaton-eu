export const swaggerJson = {
  definition: {
    info: {
      "description": "Volunteer Sharing Grocery",
      "version": "1.0.0",
      "title": "Swagger",
      "contact": {
        "email": "victor.malai@endava.com"
      }
    },
    securityDefinitions: {
      Bearer: {
        "name": "Authorization",
        "in": "header",
        "type": "apiKey"
      }
    },
    "definitions": {
      "ApiResponse": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "type": {
            "type": "string"
          },
          "message": {
            "type": "string"
          }
        }
      },
    },
    "schemes": [
      "https",
      "http",
    ],
    "basePath": "/",
  },

  // Path to the API docs
  apis:  [
    process.cwd()+'/src/**/*.controller.ts',
  ]

}
