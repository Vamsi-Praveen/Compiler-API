# Simple Compiler API

Executes and compiles the program and gives output we can use by api endpoint

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Code Execution](#code-execution)

## Description

COMPILER_API it is RESTAPI which helps to compile execute your code and produces output ,I implemented api for that you can simply request the api endpoint
*NOTE* it uses compilers or interpreters installed in your localmachine

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Vamsi-Praveen/Compiler-API.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-project
    ```

3. Install dependencies:

    ```bash
    npm install
    ```
4. Start Server

    ```bash
    npm run dev
    npm start
    ```
5.  API endpoint
     ```
     http://localhost:port/api/v1/execute
     ```

## Usage

Simply request the api with code,language and inputs as a request body to api call it gives output/error

## Code Execution

This project uses built-in compilers to run and execute code.

