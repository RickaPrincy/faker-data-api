# FakerJS Backend

This is a backend server for generating fake data using the [FakerJS](https://github.com/faker-js/faker.git) library. 
It allows you to generate SQL insert statements for a given table, with a specified number of rows and columns.

## Usage

To use the server, simply run `npm install` and then `npm start` in your terminal. By default, the server will listen on port 5000. 
You can change the port by setting the `PORT` environment variable to a different value.

![Step 1](/img/Step1.png "step 1")

<hr>

Once the server is running, you can send a POST request to `http://localhost:5000/` with the following JSON body:

```JSON
{
    "tableName": "example",
    "numberOfRows": 55,
    "columns": [
        { "name": "id", "type": "int", "constraint": "primary key"},
        { "name": "first name", "type": "first_name", "constraint": "not null"},
        { "name": "email", "type": "email", "constraint": "unique"}
    ]   
}
```


This will generate a file named `insertExample.sql` in the server's `output` directory, containing SQL insert statements for the specified table and columns. 
The server will respond with a JSON object containing a URL to the generated file:

```JSON
{
    "url": "http://localhost:5000/file/insertExample.sql"
}
```


Note that for column constraints, you should put spaces between each keyword. For example, `length=255` will not work, but `length = 255` will. Similarly, `check in('hello','world')` should be written as `check in ( 'hello' , 'world' )`.

## Cleanup

Currently, you will need to manually delete the generated files from the `output` directory after downloading or copying them.I'm working on adding automatic cleanup functionality in a future release.

## Default Port

By default, the server uses port 5000. Other ports you can use for this kind of application include 8000, 8080, or 9000. However, you can choose any port that is not already in use on your system.
