const store = require("./app/store");

const { fetchVideos } = require("./features/video/fetchVideoSlice");

store.subscribe(() => {});

store.dispatch(fetchVideos());
