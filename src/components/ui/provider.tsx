"use client"

import {ChakraProvider, createSystem, defaultConfig} from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

const system = createSystem(defaultConfig, {
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
        secondary: { value: "#EE0F0F" },
        neutral: { value: "#9B9895" },
      },
      borders: {
        button: { value: "1px solid {colors.primary}" },
        divider: { value: "2px dotted {colors.neutral}" },
        // composite value
      }
    },
  },

})

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
