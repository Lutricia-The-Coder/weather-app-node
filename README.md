# Async Weather & News Dashboard - weather-app-node

##  Project Overview

The **Async Weather & News Dashboard** is a Node.js and TypeScript application created to demonstrate asynchronous programming in JavaScript.

The application retrieves:

* Current weather information from the **Open-Meteo API**
* News posts from the **DummyJSON API**

The same general functionality is implemented using three different asynchronous programming approaches:

1. **Callbacks**
2. **Promises**
3. **Async/Await**

The Promise implementation also demonstrates:

* Promise chaining
* `Promise.all()`
* `Promise.race()`

The project is designed to demonstrate how Node.js handles asynchronous operations and how different asynchronous programming techniques affect code structure, readability, and error handling.

---

#  Project Objectives

The main objectives of this project are to:

* Demonstrate asynchronous programming in Node.js.
* Demonstrate how the Node.js event loop works at a basic level.
* Retrieve data from public APIs.
* Implement asynchronous API requests using callbacks.
* Demonstrate callback nesting and callback hell.
* Implement asynchronous operations using Promises.
* Demonstrate Promise chaining.
* Demonstrate `Promise.all()`.
* Demonstrate `Promise.race()`.
* Refactor Promise-based code using async/await.
* Demonstrate asynchronous error handling.
* Use TypeScript interfaces to provide type safety.
* Compare callbacks, Promises, and async/await.

---

#  Technologies Used

The project uses the following technologies:

* **Node.js** — JavaScript runtime environment
* **TypeScript** — Provides static typing
* **tsx** — Runs TypeScript files directly
* **Node.js `https` module** — Makes HTTP requests
* **Open-Meteo API** — Provides weather information
* **DummyJSON API** — Provides news-style posts
* **npm** — Package and script management
* **Git** — Version control

---

#  APIs Used

##  Open-Meteo

Open-Meteo is used to retrieve current weather information.

The application requests:

* Temperature
* Wind speed
* Weather code

The weather request uses latitude and longitude coordinates.

Example coordinates used by the application:

```text
Latitude: -23.9045
Longitude: 29.4689
```

The weather API returns structured JSON data containing the current weather information and its corresponding units.

---

##  DummyJSON

DummyJSON is used to retrieve posts that are displayed as news headlines.

The application requests five posts:

```text
https://dummyjson.com/posts?limit=5
```

The application displays the title of each returned post.

---

#  Project Structure

```text
weather-app-node/
│
├── src/
│   ├── api.ts
│   ├── types.ts
│   ├── callbackVersion.ts
│   ├── promiseVersion.ts
│   └── asyncAwaitVersion.ts
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
└── .gitignore
```

## File Responsibilities

### `src/api.ts`

Contains the API request functions.

It contains callback-based functions as well as Promise-based functions.

The file is responsible for communicating with the external APIs.

---

### `src/types.ts`

Contains TypeScript interfaces used to describe the expected API response structures.

The main interfaces are:

* `WeatherData`
* `NewsPost`
* `NewsData`

Using interfaces provides better type safety than using `any`.

---

### `src/callbackVersion.ts`

Demonstrates asynchronous programming using callbacks.

The weather request is performed first and the news request is performed inside the weather callback.

This intentionally demonstrates callback nesting/callback hell.

---

### `src/promiseVersion.ts`

Demonstrates asynchronous programming using Promises.

It contains examples of:

* Promise chaining
* `Promise.all()`
* `Promise.race()`

---

### `src/asyncAwaitVersion.ts`

Demonstrates asynchronous programming using async/await.

It also demonstrates:

* `try...catch`
* Sequential asynchronous operations
* Parallel asynchronous operations using `Promise.all()`

---

### `package.json`

Contains project information, dependencies, and npm scripts used to run the application.

---

### `tsconfig.json`

Contains the TypeScript compiler configuration.

---

### `README.md`

Contains documentation explaining the project, setup instructions, implementation approaches, testing, and learning outcomes.

---

#  Installation

## Prerequisites

Before running the project, make sure the following are installed:

* Node.js
* npm
* Git

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

## Install Dependencies

Open a terminal in the project directory:

```bash
cd weather-app-node
```

Install the project dependencies:

```bash
npm install
```

---

#  Running the Application

The project provides separate npm scripts for each asynchronous programming approach.

---

##  Callback Version

Run:

```bash
npm run callback
```

This executes:

```text
src/callbackVersion.ts
```

The callback version performs the following:

```text
Start
  ↓
Fetch weather
  ↓
Weather callback
  ↓
Fetch news
  ↓
News callback
  ↓
Display results
```

The nested structure demonstrates callback hell.

---

##  Promise Version

Run:

```bash
npm run promise
```

This executes:

```text
src/promiseVersion.ts
```

The Promise version demonstrates:

* Promise chaining
* `Promise.all()`
* `Promise.race()`

---

##  Async/Await Version

Run:

```bash
npm run async
```

This executes:

```text
src/asyncAwaitVersion.ts
```

The async/await version demonstrates:

* `async`
* `await`
* `try...catch`
* `Promise.all()`

---

#  TypeScript Checking

To check the project for TypeScript errors without generating JavaScript files:

```bash
npm run check
```

This runs:

```bash
tsc --noEmit
```

A successful check should report:

```text
Found 0 errors.
```

---

#  Building the Project

To compile the TypeScript source files into JavaScript:

```bash
npm run build
```

The TypeScript compiler uses `tsconfig.json` to determine how the files should be compiled.

The generated JavaScript files are placed inside the `dist` directory.

Example:

```text
dist/
├── api.js
├── types.js
├── callbackVersion.js
├── promiseVersion.js
└── asyncAwaitVersion.js
```

The files inside `dist` are generated files and should not be edited manually.

---

#  NPM Scripts

The project uses the following npm scripts:

```json
"scripts": {
  "callback": "tsx src/callbackVersion.ts",
  "promise": "tsx src/promiseVersion.ts",
  "async": "tsx src/asyncAwaitVersion.ts",
  "build": "tsc",
  "check": "tsc --noEmit"
}
```

## Script Summary

| Script             | Purpose                             |
| ------------------ | ----------------------------------- |
| `npm run callback` | Runs the callback implementation    |
| `npm run promise`  | Runs the Promise implementation     |
| `npm run async`    | Runs the async/await implementation |
| `npm run check`    | Checks TypeScript for errors        |
| `npm run build`    | Compiles TypeScript to JavaScript   |

---

#  Callback Implementation

Callbacks are functions that are passed to another function and executed later when an asynchronous operation has completed.

A simplified example is:

```typescript
fetchWeather((error, weather) => {
    // Handle the result
});
```

The callback receives two possible values:

* An error
* The requested data

The API implementation follows the common Node.js callback pattern:

```text
callback(error, data)
```

When the request succeeds:

```typescript
callback(null, weather);
```

When an error occurs:

```typescript
callback(error);
```

---

#  Callback Hell

Callback hell occurs when multiple asynchronous operations depend on each other and callbacks become deeply nested.

The project intentionally demonstrates this because understanding callback hell is one of the learning objectives.

The structure is approximately:

```text
fetchWeather()
    │
    └── weather callback
            │
            └── fetchNews()
                    │
                    └── news callback
```

The code looks like:

```typescript
fetchWeather((weatherError, weather) => {

    if (weatherError) {
        console.error(weatherError.message);
        return;
    }

    console.log(weather);

    fetchNews((newsError, news) => {

        if (newsError) {
            console.error(newsError.message);
            return;
        }

        console.log(news);
    });
});
```

For only two operations this is manageable, but if more dependent operations were added, the nesting could become difficult to read and maintain.

---

#  Promise Implementation

Promises provide another way of handling asynchronous operations.

A Promise represents the eventual result of an asynchronous operation.

A Promise can be:

* Pending
* Fulfilled
* Rejected

The project creates Promise-based API functions:

```typescript
fetchWeatherPromise()
fetchNewsPromise()
```

These functions return:

```typescript
Promise<WeatherData>
```

and:

```typescript
Promise<NewsData>
```

---

#  Promise Chaining

The Promise version demonstrates dependent requests using `.then()`.

The basic structure is:

```typescript
fetchWeatherPromise()
    .then((weather) => {
        return fetchNewsPromise();
    })
    .then((news) => {
        // Display news
    })
    .catch((error) => {
        // Handle error
    });
```

The second request is started after the first request has completed.

The structure is:

```text
Weather Promise
      ↓
    .then()
      ↓
News Promise
      ↓
    .then()
      ↓
Display results
      ↓
   .catch()
```

The `.catch()` handles rejected Promises.

---

#  Promise.all()

`Promise.all()` is useful when multiple asynchronous operations are independent of each other.

In this project, the weather and news requests do not need each other's results.

Therefore, they can be started together.

Example:

```typescript
const [weather, news] = await Promise.all([
    fetchWeatherPromise(),
    fetchNewsPromise()
]);
```

The structure is:

```text
             ┌── Weather ──┐
Start ───────┤             ├──→ Results
             └── News ─────┘
```

`Promise.all()` waits for all the supplied Promises to fulfill.

If one of the Promises rejects, the `Promise.all()` operation rejects.

This allows independent asynchronous operations to be handled together.

---

#  Promise.race()

`Promise.race()` waits for the first supplied Promise to settle.

In this project, the weather and news requests are placed into a race.

Example:

```typescript
Promise.race([
    fetchWeatherPromise()
        .then(() => "Weather request finished first"),

    fetchNewsPromise()
        .then(() => "News request finished first")
])
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.error(error);
});
```

The result depends on network response times.

For example, one run might produce:

```text
Weather request finished first
```

Another run could produce:

```text
News request finished first
```

This is expected because the response times of network requests can vary.

---

#  Async/Await Implementation

Async/await provides a cleaner syntax for working with Promises.

An asynchronous function is declared using:

```typescript
async function runAsyncAwaitVersion(): Promise<void>
```

A Promise can then be waited for using:

```typescript
const weather = await fetchWeatherPromise();
```

The project then waits for the news request:

```typescript
const news = await fetchNewsPromise();
```

The structure is:

```text
async function
      │
      ├── await weather
      │
      ├── display weather
      │
      ├── await news
      │
      └── display news
```

Although the code looks synchronous, the API requests remain asynchronous.

---

#  Error Handling

The project demonstrates error handling in all three approaches.

## Callback Error Handling

Callbacks receive an error value:

```typescript
if (weatherError) {
    console.error(
        "Weather error:",
        weatherError.message
    );
    return;
}
```

---

## Promise Error Handling

Promise errors are handled with `.catch()`:

```typescript
fetchWeatherPromise()
    .then(...)
    .catch((error) => {
        console.error(
            "Promise error:",
            error.message
        );
    });
```

---

## Async/Await Error Handling

Async/await uses `try...catch`:

```typescript
try {
    const weather = await fetchWeatherPromise();
    const news = await fetchNewsPromise();
} catch (error) {
    console.error(error);
}
```

This makes it possible to handle rejected Promises using familiar `try...catch` syntax.

---

#  Node.js Event Loop

Node.js uses an event-driven, non-blocking approach to handle asynchronous operations.

When the application starts an HTTP request, Node.js does not need to stop the entire program while waiting for the network response.

For example:

```text
JavaScript code
      │
      ↓
Start HTTP request
      │
      ↓
Node.js continues running
      │
      ↓
Network response arrives
      │
      ↓
Callback / Promise handler executes
      │
      ↓
Result displayed
```

This allows Node.js applications to handle I/O operations efficiently.

The callback, Promise, and async/await versions all use the same underlying asynchronous network behavior.

The main difference is how the application handles the result of the asynchronous operation.

---

#  Comparing the Three Approaches

## Callbacks

Callbacks are functions that are executed after an asynchronous operation completes.

Example:

```typescript
fetchWeather((error, weather) => {
    // Handle weather
});
```

### Advantages

* Simple concept
* Common in older Node.js APIs
* Works well for simple asynchronous operations

### Disadvantages

* Nested callbacks can become difficult to read
* Error handling can become repetitive
* Complex workflows can lead to callback hell

---

## Promises

Promises represent the future result of an asynchronous operation.

Example:

```typescript
fetchWeatherPromise()
    .then((weather) => {
        return fetchNewsPromise();
    })
    .then((news) => {
        // Handle news
    })
    .catch((error) => {
        // Handle error
    });
```

### Advantages

* Reduces callback nesting
* Easier to chain asynchronous operations
* Centralized error handling using `catch()`
* Works well with `Promise.all()` and `Promise.race()`

### Disadvantages

* Long Promise chains can still become harder to read
* Requires understanding Promise states and chaining

---

## Async/Await

Async/await provides syntax for working with Promises.

Example:

```typescript
const weather = await fetchWeatherPromise();
const news = await fetchNewsPromise();
```

### Advantages

* Easy to read
* Makes asynchronous code look more like sequential code
* Works naturally with `try...catch`
* Works with Promise utilities such as `Promise.all()`

### Disadvantages

* Must be used inside an async function
* Developers still need to understand Promises
* Sequential `await` operations can be slower when operations are independent and could run concurrently

---

#  Sequential vs Parallel Requests

The project demonstrates both sequential and parallel asynchronous operations.

## Sequential

The async/await version first retrieves weather:

```typescript
const weather = await fetchWeatherPromise();
```

Then it retrieves news:

```typescript
const news = await fetchNewsPromise();
```

The structure is:

```text
Weather
   ↓
News
```

The news request starts after the weather request has completed.

---

## Parallel

With `Promise.all()`:

```typescript
const [weather, news] = await Promise.all([
    fetchWeatherPromise(),
    fetchNewsPromise()
]);
```

The structure is:

```text
       ┌── Weather ──┐
Start ─┤             ├──→ Results
       └── News ─────┘
```

Both independent requests can be in progress at the same time.

---

#  Sample Callback Output

Example:

```text
Starting callback version...

=== WEATHER ===
Temperature: 24 °C
Wind: 7.4 km/h

=== NEWS HEADLINES ===
1. His mother had always taught him
2. He was an expert but not in a discipline
3. Dave watched as the forest burned up on the hill.
4. All he wanted was a candy bar.
5. Hopes and dreams were dashed that day.

Callback version completed!
```

---

#  Sample Promise Output

Example:

```text
Starting Promise version...

Starting Promise.all()...

Starting Promise.race()...

=== PROMISE.RACE RESULT ===
Weather request finished first
Promise.race() completed!

=== WEATHER ===
Temperature: 24 °C
Wind: 7.4 km/h

=== PROMISE.ALL RESULTS ===
Temperature: 24 °C
Wind: 7.4 km/h
Number of news articles: 5
Promise.all() completed!

=== NEWS HEADLINES ===
1. His mother had always taught him
2. He was an expert but not in a discipline
3. Dave watched as the forest burned up on the hill.
4. All he wanted was a candy bar.
5. Hopes and dreams were dashed that day.

Promise chain completed!
```

The exact order may change because the asynchronous requests have different response times.

---

#  Sample Async/Await Output

Example:

```text
Starting async/await version...

=== WEATHER ===
Temperature: 23.4 °C
Wind: 6.3 km/h

=== NEWS HEADLINES ===
1. His mother had always taught him
2. He was an expert but not in a discipline
3. Dave watched as the forest burned up on the hill.
4. All he wanted was a candy bar.
5. Hopes and dreams were dashed that day.

Async/await version completed!

Starting parallel requests...

=== PARALLEL RESULTS ===
Temperature: 23.4 °C
Wind: 6.3 km/h
News articles: 5

Parallel requests completed!
```

Weather values can change because the application retrieves live weather data.

---

#  Testing

The following commands can be used to test the project.

## Check TypeScript

```bash
npm run check
```

Expected result:

```text
Found 0 errors.
```

## Build

```bash
npm run build
```

## Test Callback Version

```bash
npm run callback
```

## Test Promise Version

```bash
npm run promise
```

## Test Async/Await Version

```bash
npm run async
```

All three versions should successfully retrieve weather and news data.

---

#  Error Scenarios

The application includes error handling for possible problems such as:

* Network errors
* Failed HTTP requests
* Invalid JSON responses
* Rejected Promises
* Missing callback data

The application reports errors using messages such as:

```text
Weather error: ...
```

```text
News error: ...
```

```text
Promise error: ...
```

```text
Async/await error: ...
```

This prevents errors from failing silently.

---

`node_modules` contains installed dependencies and can be recreated using:

```bash
npm install
```

The `dist` directory contains generated JavaScript files and can be recreated using:

```bash
npm run build
```

---

#  Learning Outcomes

After completing this project, I can:

* Explain asynchronous programming in Node.js.
* Explain the basic role of the Node.js event loop.
* Explain why Node.js can perform non-blocking I/O.
* Make HTTP requests using Node.js.
* Work with public APIs.
* Process JSON API responses.
* Implement asynchronous operations using callbacks.
* Explain callback functions.
* Identify callback hell.
* Explain the disadvantages of deeply nested callbacks.
* Implement asynchronous operations using Promises.
* Chain Promises using `.then()`.
* Handle rejected Promises using `.catch()`.
* Use `Promise.all()` for multiple independent asynchronous operations.
* Use `Promise.race()` to identify the first Promise to settle.
* Use async/await with Promise-based functions.
* Handle async/await errors using `try...catch`.
* Use TypeScript interfaces to improve type safety.
* Compare callbacks, Promises, and async/await.
* Use npm scripts to simplify project execution.
* Use Git to track project development.

---

#  Conclusion

The Async Weather & News Dashboard demonstrates three major approaches to asynchronous programming in Node.js:

```text
Callbacks
    ↓
Promises
    ↓
Async/Await
```

The callback implementation demonstrates how asynchronous results can be handled using functions and also demonstrates callback hell through nested asynchronous requests.

The Promise implementation demonstrates how asynchronous operations can be chained and coordinated using Promise utilities such as `Promise.all()` and `Promise.race()`.

The async/await implementation provides a cleaner syntax for working with Promises and uses `try...catch` for error handling.

The project also demonstrates that asynchronous operations do not block the Node.js event loop while waiting for network responses.

Overall, the project provides a practical comparison of different asynchronous programming techniques and demonstrates how modern JavaScript and TypeScript applications can handle asynchronous API operations.

---

#  Quick Start

For a quick test after installing dependencies:

```bash
npm install
npm run check
npm run callback
npm run promise
npm run async
```

To compile the project:

```bash
npm run build
```

The project is now ready to demonstrate callbacks, Promises, async/await, `Promise.all()`, `Promise.race()`, error handling, and the Node.js event loop.
