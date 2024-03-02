# tt-app


## Overview

This is a tic tac toe web application built using a Next.js/React.js/Typescript frontend and a Nest.js/Typescript backend. The frontend communicates to the backend using a REST API and updates are syndicated out to players using websockets. The matches are stored in a local sqlite database. User authentication is handled using session cookies.


## Getting Started

1. First install the backend npm packages and start the development server. `cd backend && npm install && npm run start`. The api server will be running on localhost:3001 by default

2. Then install the frontend npm packages and start the development server. `cd frontend && npm install && npm run dev`. The next.js server will be running on localhost:3000 by default.

3. You can now access http://localhost:3000 and start a new game in a browser. To play yourself open another tab in an incognito window to join as an opponent.


## Test Suite

1. To run the e2e tests for the API use the following command `cd backend && npm run test:e2e`. The primary test cases for the application can be found in `match.e2e-spec.ts`

