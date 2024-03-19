# hello-world-app

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your unit tests

```bash
npm run test:unit
```

### Run your end-to-end tests

```bash
npm run test:e2e
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### pre-commit hook

1. Install husky and lint-staged `npm install --save-dev lint-staged husky`.
2. In package.json, add the following:

    ```json
    "lint-staged": {
      "*.{js,ts,vue}": [
        "npm run lint",
      ]
    }
    ```

3. Add a prepare script to package.json:

    ```json
    "scripts": {
      // ... other scripts
      "prepare": "cd .. && husky app-folder-name/.husky"
    }
    ```

4. run `npm install`.
5. Add the `pre-commit.sh` file to the `.husky` folder:

    ```bash
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    cd ./folder-app-name && npx lint-staged
    ```

### unit testing

1. Create a new file in the `src/shared` folder called `helpers.ts` and add the following function:

    ```typescript
      export function increment(current: number, max = 10) {
      if (current < max) {
        return current + 1;
      }
      return current;
    }
    ```

2. Add the following code to `test/unit/example.spec.ts`:

    ```typescript
    import { increment } from './helpers'

    describe('increment', () => {
      test('increments the current number by 1', () => {
        expect(increment(0, 10)).toBe(1)
      })

      test('does not increment the current number over the max', () => {
        expect(increment(10, 10)).toBe(10)
      })

      test('has a default max of 10', () => {
        expect(increment(10)).toBe(10)
      })
    })
    ```


