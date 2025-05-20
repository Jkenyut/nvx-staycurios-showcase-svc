const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compresion = require("compresion");
const http = require("http");
const {ApolloServer} = require("apollo-server-express");
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/upload");
const bodyParser = require("body-parser");
require("dotenv").config();

const isAuth = require("./middleware/auth");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
// const app = express();
const isDevelopment = process.env.NODE_ENV === "development";

async function startApolloServer(typeDefs, resolvers) {
    const app = express();

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),
            ApolloServerPluginLandingPageLocalDefault({embed: true}),
        ],
        context: ({req}) => {
            return {req: req};
        },
        formatError: (err) => {
            console.log(err.originalError);
            if (err.message.startsWith("Database Error: ")) {
                return new Error("Internal server error");
            }
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.data;
            const message = err.message || "An error occurred";
            const code = err.originalError.code || 500;
            return {message: message, status: code, data: data};
        },
    });

    await server.start();
    app.use(isAuth);
    app.use(cors());
    app.disable("x-powered-by");
    app.use(compresion());
    app.use(
        helmet({
            crossOriginEmbedderPolicy: !isDevelopment,
            contentSecurityPolicy: !isDevelopment,
        })
    );
    app.post("/ok", (req, res, next) => {
        res.status(200).json({message: "ok"});
    });
    app.use(uploadRoutes);
    app.use(bodyParser.urlencoded({extended: false})); //x-www-form-uploded<form>
    app.use(bodyParser.json());
    server.applyMiddleware({app});
    await new Promise((resolve) => httpServer.listen({port: 4000}, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

mongoose
    .connect(process.env.MONGODB_URI)
    .then((result) => {
        startApolloServer(typeDefs, resolvers);
    })
    .catch((err) => console.lof(err));
