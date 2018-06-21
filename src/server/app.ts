import "reflect-metadata";

import { createConnection } from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import { config } from "./config";
import { logger } from "./logging";
import { AppRoutes } from "./routes";

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
(async () => {
    try {
        const paymentConnection = await createConnection('payment');
        const userConnection = await createConnection('user');
        // create koa app
        const app = new Koa();
        const router = new Router();

        // register all application routes
        AppRoutes.forEach(route => router[route.method](route.path, route.action));

        // run app
        app.use(logger);
        app.use(bodyParser());
        app.use(router.routes());
        app.use(router.allowedMethods());
        app.listen(config.port);

        console.log(`Koa application is up and running on port ${config.port}`);
    } catch (err) {
        return Promise.reject(err);
    }
})();
