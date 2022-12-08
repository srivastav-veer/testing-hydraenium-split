# Testing Hydraenium with AWS Ec2

In this repo we have a client and a server. The server hosts 6-7 digit numbers in a array and client requests these number one by one, to perform some mathematical calculation and then gets the next number.

This test is intended to calculate how much time does the client takes to complete all the numbers in the server.

### Calculating the time
To calculate the total time of execution, the server keeps a track of time when the first number from the array was fetched by the client for execution until the last number was returned.

The difference between these two is the total number of seconds it took to complete the array.

And to track this server maintains two array of numbers. 

- get array: The get array is mapped the `get` API. Once the first get API is called and the first number of the array pops out from the array, the server writes the timestamp to file.

- set array: This maintains a count of numbers executed; and is mapped to `set` api. Once the last number in this array is inserted, the server writes the timestamp to another file to mark the end.

------

## Server

The server is written in nodejs with express. 

Running the server:

> #> cd server \
#> npm i \
#> node cluster.js 

There are two files `cluster.js` and `www.js`. 

- `www.js`: This runs the server and listens on the mentioned port.
- `cluster.js`: If using multi-core processor, then cluster.js runs an instance of `www.js` on each core.

#### Server APIs

There are two APIs in the server.

- get API: to fetch the number from the server.

> GET _https://<ServerAPI&gt;:&lt;PORT>/numbers/get_

- set API: to send a calculated number back to server. 

> GET _https://<ServerAPI&gt;:&lt;PORT>/numbers/set?number=<returnValue&gt;_

## Client

The client is written in Python, because JavaScript has a limitation on the size of number it can handle. Client program runs on each CPU core.

The client has a very simple algorithm - 

- Make a `get` API call to the server and fetch a number.
- Perform mathematical calculation resulting in large digits on the fetched number.
- Send the number back to the server. And repeat from step 1. _**Sending the exact number is an optional part, and is not implemented because of the limittion of number size in the JavaScript._

Run the client code:

> #> pip3 install requests \
#> python3 client.py
