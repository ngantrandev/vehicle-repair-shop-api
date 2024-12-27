import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * Swagger definition setup.
 */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Chọn version OpenAPI
        info: {
            title: 'Vehicle Repair Shop API',
            version: '1.0.0',
            description:
                'API documentation for Vehicle Repair Shop application',
        },
        servers: [
            {
                url: `http://localhost:8000/v1/api`, // Địa chỉ của API server
            },
        ],
    },
    apis: ['./src/swaggers/**/*.yaml'], // Đường dẫn đến các file API và controller
};

// Khởi tạo swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
