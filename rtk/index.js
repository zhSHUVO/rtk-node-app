const store = require("./app/store");

const {
    fetchVideos,
    fetchRelatedVideos,
} = require("./features/video/fetchVideoSlice");

async function finalResult() {
    try {
        const result = await store.dispatch(fetchVideos());
        // const tags = result.payload.tags;
        await store.dispatch(fetchRelatedVideos(result.payload.tags));
    } catch (error) {
        console.log(error);
    }
}

finalResult();
