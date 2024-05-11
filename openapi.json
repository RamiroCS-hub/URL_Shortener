{
  "openapi": "3.0.3",
  "info": {
    "title": "URL Shortener",
    "version": "1.0.0",
    "description": "This API serves as a URL shortener, allowing users to convert long URLs into shorter, more manageable links. It’s implemented using Node.js, Express as the web framework, and MongoDB as the backend database. With this API, users can create custom short URLs for sharing on social media, messaging apps, or any platform where space is limited",
    "contact": {
      "email": "ramirocarnicersouble8@gmail.com",
      "name": "LinkedIn",
      "url": "www.linkedin.com/in/ramirocarnicersouble"
    }
  },
  "tags": [
    {
      "name": "Endpoints",
      "description": "All the endpoints"
    }
  ],
  "servers": [
    {
      "url": "https://localhost:3000"
    }
  ],
  "paths": {
    "/{shortId}": {
      "get": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Redirect to the original URL",
        "description": "Redirect to the original URL with the ShortId provided",
        "operationId": "getLink",
        "parameters": [
          {
            "name": "shortId",
            "in": "path",
            "description": "ID of the shortened link",
            "required": true,
            "schema": {
              "type": "string",
              "format": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation. You´ll be redirect to the original link"
          },
          "404": {
            "description": "Original link not found"
          }
        }
      }
    },
    "/": {
      "post": {
        "tags": [
          "Endpoints"
        ],
        "summary": "Make a short link",
        "description": "Returns the short link for the link provided in the body",
        "operationId": "makeShort",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Query"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Response"
                }
              }
            }
          },
          "400": {
            "description": "Invalid status value"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Response": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "string",
            "example": "663fb3fae1e4b3a8a071d31f"
          },
          "url": {
            "type": "string",
            "format": "string",
            "example": "wwww.google.com"
          },
          "shortUrl": {
            "type": "string",
            "format": "string",
            "example": "https://localhost:3000/9ebb"
          },
          "shortId": {
            "type": "string",
            "format": "string",
            "example": "9ebb"
          }
        }
      },
      "Query": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "format": "string",
            "example": "https://www.a-very-very-long-url/yes-is-long.com"
          }
        }
      }
    }
  }
}