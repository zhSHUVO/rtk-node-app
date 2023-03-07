const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

// initial state
const initialState = {
    loading: false,
    videos: [],
    error: "",
};

// create async thunk
const fetchVideos = createAsyncThunk("video/fetchVideos", async () => {
    const res = await fetch("http://localhost:9000/videos");
    const videos = await res.json();
    return videos;
});


// create slice
const videoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideos.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.videos = action.payload;
        });

        builder.addCase(fetchVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.videos = [];
        });
    },
});



module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;
