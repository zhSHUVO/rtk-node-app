const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");

const videoReducer = require("../features/video/fetchVideoSlice");

// redux logger
const logger = createLogger();

// store
const store = configureStore({
    reducer: {
        video: videoReducer,
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(logger),
});

module.exports = store;
