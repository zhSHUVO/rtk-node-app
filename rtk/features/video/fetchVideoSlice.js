const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

// initial state
const initialState = {
    video: [],
    relatedVideos: [],
};

// create async thunk
const fetchVideos = createAsyncThunk("video/fetchVideos", async () => {
    const res = await fetch("http://localhost:9000/videos");
    const videos = await res.json();
    return videos;
});

const fetchRelatedVideos = createAsyncThunk(
    "video/fetchRelatedVideos",
    async (tags) => {
        const queryString = tags.map((tag) => `tags_like=${tag}`).join("&");
        const res = await fetch(`http://localhost:9000/videos?${queryString}`);
        const relatedVideos = await res.json();
        console.log(`http://localhost:9000/videos?${queryString}`);
        return relatedVideos;
    }
);

// create slice
const videoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.video = action.payload;
        });

        builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
            state.relatedVideos = action.payload.sort((a, b) => {
                if (b.views < a.views) {
                    return -1;
                }
            });
        });
    },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;
module.exports.fetchRelatedVideos = fetchRelatedVideos;

loading: false,