module.exports = {
    entry: "./Content/src/food.tsx",
    mode: "development",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx']
    },

    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'awesome-typescript-loader'
                },
                include: __dirname
            }
        ]
    }
};

