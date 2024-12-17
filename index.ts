import App from "./core/app";

const app = new App();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(PORT);
