// Core
import env from 'postcss-preset-env';

// cssnano → минификация
const loadPostcss = (
    { sourceMap = false, minify = false } = { sourceMap: false, minify: false },
) => ({
    loader:  'postcss-loader',
    options: {
        sourceMap,
        plugins: [
            // цепочка плагинов postcss

            env({
                stage:    0, // default: stage 2
                features: {
                    'custom-media-queries': {
                        importFrom: [
                            {
                                customMedia: {
                                    '--phonePortrait':  '(width <= 414px)',
                                    '--phoneLandscape':
                                        '(width >= 415px) and (width <= 667px)',
                                    '--tabletPortrait':
                                        '(width >= 668px) and (width <= 768px)',
                                    '--tabletLandscape':
                                        '(width >= 769px) and (width <= 1024px)',
                                    '--desktopS':
                                        '(width >= 1025px) and (width <= 1366px)',
                                    '--desktopM':
                                        '(width >= 1367px) and (width <= 1680px)',
                                    '--desktopL':
                                        '(width >= 1681px) and (width <= 1920px)',
                                    '--desktopXL': '(width >= 1921px)',
                                },
                            },
                        ],
                    },
                },
            }),
        ],
    },
});

const loadCss = ({ sourceMap = false } = { sourceMap: false }) => ({
    loader:  'css-loader',
    options: {
        modules:        true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
        sourceMap,
    },
});

export const loadDevCss = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  [
                    'style-loader',
                    loadCss({ sourceMap: true }),
                    loadPostcss({ sourceMap: true }),
                ],
            },
        ],
    },
});

export const loadProdCss = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  [
                    // ! TODO: mini-css-extract-plugin
                    loadCss({ sourceMap: false }),
                    loadPostcss({ sourceMap: false }),
                ],
            },
        ],
    },
});

export const loadSass = () => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                use:  [
                    'style-loader',
                    {
                        loader:  'css-loader',
                        options: {
                            modules:        true,
                            localIdentName:
                                '[path][name]__[local]--[hash:base64:5]',
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
});
