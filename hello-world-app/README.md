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

    cd ./folder-app-name 
    npx lint-staged
    ```

6. Make the file executable: `chmod +x .husky/pre-commit.sh`.

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

3. Run `npm run test:unit` to see the tests pass.

### e2e testing

1. Add the following code to `test/e2e/specs/test.ts`:

    ```typescript
    it("Visits the about page", () => {
      cy.visit("/about");
      cy.contains("h1", "This is an about page");
    });
    ```

2. Run `npm run test:e2e` to see the tests pass.

### Github actions

1. Create a new file in the `.github/workflows` folder called `ci.yml` and add the following code:

    ```yaml
    name: Build, Test and Dockerize

    on:
      push:
        branches:
          - main

    jobs:
      build:
        runs-on: ubuntu-latest

        steps:
          - name: Checkout code
            uses: actions/checkout@v4

          - name: Set up Node.js
            uses: actions/setup-node@v4
            with:
              node-version: 20

          - name: Install dependencies
            run: npm install

          - name: Build app
            run: npm run build

      test:
        needs: build
        runs-on: ubuntu-latest

        steps:
          - name: Checkout code
            uses: actions/checkout@v4

          - name: Set up Node.js
            uses: actions/setup-node@v4
            with:
              node-version: 20

          - name: Install dependencies
            run: npm install

          - name: Run unit tests
            run: npm run test:unit
    ```

Fix build and test:

```yaml
- name: Build app
  run: |
    cd app-folder-name 
    npm install
    npm run build
```

### Create a container

1. Create a `Dockerfile` and add the following code:

    ```dockerfile
    FROM node:alpine as develop-stage
    
    WORKDIR /app

    COPY package*.json ./
    RUN npm install
    COPY . .

    # build stage
    FROM develop-stage as build-stage
    RUN npm run build

    # production stage
    FROM nginx:alpine as production-stage
    COPY --from=build-stage /app/dist /usr/share/nginx/html
    EXPOSE 90
    CMD ["nginx", "-g", "daemon off;"]
    ```

2. Run `docker build -t app-name .` to build the container.
3. Run `docker run -p 90:80 app-name` to run the container.

### Adding a job to build the container

1. Add the following code to the `ci.yml` file:

    ```yaml
    build-container:
      needs: test
      name: Build Container
      runs-on: ubuntu-latest
      permissions:
        contents: read
        packages: write
      outputs:
        image: ${{ steps.build-image.outputs.image }}

      steps:
        - uses: actions/checkout@v4
        - name: Build image and push it to the registry
          id: build-image
          env:
            CONTAINER_REGISTRY: ghcr.io/fourco-ffgm
            CONTAINER_REPOSITORY: fourco-workshop
            IMAGE_TAG: ${{ github.sha }}
          run: |
            cd app-folder-name
            docker build -t $CONTAINER_REGISTRY/$CONTAINER_REPOSITORY:$IMAGE_TAG . --file Dockerfile
            echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u $GITHUB_ACTOR --password-stdin
            docker push $CONTAINER_REGISTRY/$CONTAINER_REPOSITORY:$IMAGE_TAG
    ```

2. commit and push the code to your repository.
