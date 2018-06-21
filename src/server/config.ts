export interface IConfig {
    port: number;
    prettyLog: boolean;
}

const config = {
    port: process.env.NODE_PORT || 3000,
    prettyLog: true,
};

export { config };