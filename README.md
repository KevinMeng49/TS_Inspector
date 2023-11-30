# TS_Inspector

This is an interactive tool for you to inspect multiple time series with multiple variables.

## Upload File Format
The tool now only supports time series data in the form of json.

```sh
{
    "Metric1": [
        {
            "Time": "2022-11-27",
            "value": 3
        },
        {
            "Time": "2022-11-28",
            "value": 4
        },
        {
            "Time": "2022-11-29",
            "value": 5
        }
    ],
    "Metric2": [
        {
            "Time": "2022-11-27",
            "value": 5
        },
        {
            "Time": "2022-11-28",
            "value": 6
        },
        {
            "Time": "2022-11-29",
            "value": 8
        }
    ]
}
```

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
