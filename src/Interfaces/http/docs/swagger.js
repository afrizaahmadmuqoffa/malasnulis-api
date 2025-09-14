/* eslint-disable camelcase */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MalasNulis API',
      version: '1.0.0',
      description: 'API Documentation for MalasNulis',
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
    tags: [
      { name: 'Users', description: 'User management' },
      { name: 'Auth', description: 'Auth management' },
      { name: 'Reset Password', description: 'Reset password management' },
      { name: 'Contents', description: 'User contents management' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'user-123' },
            email: { type: 'string', example: 'john@mail.com' },
            is_verified: { type: 'boolean', example: false },
            created_at: { type: 'string', format: 'date-time', example: '2025-09-13T12:34:56Z' },
          },
        },
        Content: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'thread-123' },
            platform: { type: 'string', example: 'facebook' },
            type: { type: 'string', example: 'full' },
            tone: { type: 'string', example: 'formal' },
            language: { type: 'string', example: 'indonesia' },
            input_prompt: { type: 'string', example: 'lorem ipsum dolor sit amet' },
            generated_content: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  caption: { type: 'string', example: 'lorem ipsum dolor sit amet' },
                  description: { type: 'string', example: 'lorem ipsum dolor sit amet' },
                  hashtags: { type: 'array', example: ['#fake1', '#implement1', '#awesome1'] }
                }
              }
            },
            createdAt: { type: 'string', format: 'date-time', example: '2025-09-13T12:34:56Z' },
          },
        },
        // Comment: {
        //   type: 'object',
        //   properties: {
        //     id: { type: 'string', example: 'comment-123' },
        //     content: { type: 'string', example: 'Saya setuju dengan pendapat ini!' },
        //     owner: { $ref: '#/components/schemas/User' },
        //     createdAt: { type: 'string', format: 'date-time' },
        //   },
        // },
        // Reply: {
        //   type: 'object',
        //   properties: {
        //     id: { type: 'string', example: 'reply-123' },
        //     content: { type: 'string', example: 'Terima kasih atas komentarnya!' },
        //     owner: { $ref: '#/components/schemas/User' },
        //     createdAt: { type: 'string', format: 'date-time' },
        //   },
        // },
        // Like: {
        //   type: 'object',
        //   properties: {
        //     id: { type: 'string', example: 'like-123' },
        //     userId: { type: 'string', example: 'user-123' },
        //     commentId: { type: 'string', example: 'comment-123' },
        //   },
        // },
        BaseResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'fail' },
            message: { type: 'string', example: 'Invalid request' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/Interfaces/http/api/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
