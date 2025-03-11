import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";

export const config = defineConfig({
    globalCss: {
        "html, body": {
            fontFamily: "body",
            fontSize: "18px",
            color: "#2E2E3A",
        },
        "p, span, li": {
            fontFamily: "body",
        },
        "h1, h2, h3": {
            fontFamily: "heading",
        },
        "h1": {
            fontSize: "18px",
            lineHeight: '24px'
        },
        "a, button": {
            fontFamily: "heading",
            color: "#2E2E3A",
        },
    },
    theme: {
        tokens: {
            fonts: {
                heading: { value: "Roboto Slab, sans-serif" },
                body: { value: "Noto Serif" },
            },
            colors: {
                primary: { value: "#000086" },
                text: { value: "#2E2E3A" },
                neutral: { value: "#9B9895" },
                secondary: { value: "rgba(0,166, 118, 1)" },
                highlight: { value: "rgba(199,215, 255, 1)" },
            },
            borders: {
                button: { value: "1px solid {colors.primary}" },
                divider: { value: "2px dotted {colors.neutral}" },
                // composite value
            },
            shadows: {
                button: { value: "2px 2px 7px 1px rgba(0, 0, 0, 0.25)" },
            }
        },
    },
})

export default createSystem({
    ...defaultConfig,
    ...config
})
