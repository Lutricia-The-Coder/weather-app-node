# Async Weather & News Dashboard - weather-app-node

##  Project Overview

The **Async Weather & News Dashboard** is a Node.js and TypeScript project demonstrating asynchronous programming using  **callbacks, Promises, and async/await.**

The application allows the user to enter a city, searches for its coordinates, retrieves current weather information, and displays sample news headlines.
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
* Demonstrate how the Node.js event loop works
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
* Working with JSON APIs
* Compare callbacks, Promises, and async/await.

---

#  Technologies Used

The project uses the following technologies:

* **Node.js** — JavaScript runtime environment
* **TypeScript** — Provides static typing
* **tsx** — Runs TypeScript files directly
* **Node.js `https` module** — Makes HTTP requests
* **Open-Meteo API** — Provides weather information
* **Open-Meteo Geocoding API** - Gets location
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

The weather API returns structured JSON data containing the current weather information and its corresponding units.

---

##  Open-Meteo Geocoding API

Open-Meteo is used to search for a city and obtain:

* City name
* Latitude
* Longitude

This allows the user to enter different cities instead of using hard-coded coordinates.

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

It includes:

*City search
*Callback weather request
*Callback news request
*Promise weather request
*Promise news request
*Weather-code conversion

---

### `src/types.ts`

Contains TypeScript interfaces used to describe the expected API response structures.

The main interfaces are:

* `WeatherData`
* `City Locations`
* `NewsPost`
* `News API responses`

---

### `src/callbackVersion.ts`

Demonstrates asynchronous programming using callbacks.

This intentionally demonstrates callback nesting/callback hell.

---

### `src/promiseVersion.ts`

Demonstrates 

* Promise chaining
* `Promise.all()`
* `Promise.race()`
* `Promise error handling`

---

### `src/asyncAwaitVersion.ts`

Demonstrates asynchronous programming using async/await.

It also demonstrates:

* `try...catch`
* `async`
* `await`
* Sequential asynchronous operations
* `Refactoring Promise-based code using async/await`

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

The program asks:

```text
Enter a city:
```

Example:

Enter a city: Mbombela

The application then searches for the city and retrieves its weather and sample news.

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
* Error handlingwith `.catch()`

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

---

#  Callback Implementation

The callback version uses Node.js callbacks to handle asynchronous operations.

The flow is:

User enters city
       ↓
Search city
       ↓
Get latitude and longitude
       ↓
Fetch weather
       ↓
Fetch news
       ↓
Display results

The operations are performed sequentially because the weather request needs the coordinates returned by the city search.

The news request is started after the weather request completes.
---

#  Callback Hell

Callback hell occurs when multiple asynchronous operations depend on each other and callbacks become deeply nested.

The structure is:

searchCity()
    ↓
fetchWeather()
    ↓
fetchNews()
    ↓
display results

Each asynchronous operation is placed inside the callback of the previous operation.

```

---

#  Promise Implementation

The Promise version replaces deeply nested asynchronous logic with Promises.

The main sequence is:

Search city
    ↓
Fetch weather
    ↓
Fetch news
    ↓
Display results

Promise chaining is performed using:

.then()
.then()
.catch()

Errors are handled using:

.catch()

This makes the asynchronous flow easier to follow than deeply nested callbacks.

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

The Promise version also demonstrates Promise.race().

Two asynchronous requests are started:

Weather request ──────┐
                      ├──→ First completed request
News request ─────────┘

Promise.race() settles when the first Promise settles.

The project uses this to demonstrate how multiple asynchronous operations can run at the same time and how the first completed operation can be identified.

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

The async/await version focuses specifically on using async/await to make asynchronous code easier to read.

The operations are performed sequentially:

Fetch weather
      ↓
Fetch news
      ↓
Display results

The async/await version handles errors using:

try {
  // asynchronous operations
} catch (error) {
  // error handling
}

This demonstrates how Promise-based code can be written in a more readable style using async and await.

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
Enter a city: Mbombela

City found: Mbombela

=== WEATHER ===
Temperature: 24 °C
Wind: 7.4 km/h
Weather: Mainly clear

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
Enter a city: Mbombela

City found: Mbombela

=== WEATHER ===
Temperature: 29.1 °C
Wind: 6.3 km/h
Weather: Mainly clear

=== NEWS HEADLINES ===
1. His mother had always taught him
2. He was an expert but not in a discipline
3. Dave watched as the forest burned up on the hill.
4. All he wanted was a candy bar.
5. Hopes and dreams were dashed that day.

Promise chain completed!

Starting Promise.all()...

=== PROMISE.ALL RESULTS ===
Temperature: 29.1 °C
Wind: 6.3 km/h
Weather: Mainly clear
Number of news articles: 5
Promise.all() completed!

Starting Promise.race()...

=== PROMISE.RACE RESULT ===
Weather request finished first
Promise.race() completed!
```

The result of Promise.race() may be different between runs because it depends on which asynchronous request settles first.

---

#  Sample Async/Await Output

Example:

```text
Starting city search...
Enter a city: Mbombela

City found: Mbombela

Starting async/await version...

=== WEATHER ===
City: Mbombela
Temperature: 29.1 °C
Wind: 6.3 km/h
Weather: Mainly clear

=== NEWS HEADLINES ===
1. His mother had always taught him
2. He was an expert but not in a discipline
3. Dave watched as the forest burned up on the hill.
4. All he wanted was a candy bar.
5. Hopes and dreams were dashed that day.

Async/await version completed!
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

The project also demonstrates API requests, TypeScript type safety, error handling, city searching, weather-code conversion, and sequential versus parallel asynchronous operations.

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
