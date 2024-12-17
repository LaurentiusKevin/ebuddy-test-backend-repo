import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a REST API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: `http://localhost:${
          process.env.PORT ? parseInt(process.env.PORT) : 3000
        }`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.ts", "./entities/*.ts"], // files containing annotations
};

export const specs = swaggerJsdoc(options);
