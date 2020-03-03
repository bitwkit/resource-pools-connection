# resource-pools-connection
Extension of 'tedious' connection class for using as a pooled resource with [**resource-pools** package](https://www.npmjs.com/package/resource-pools) package, without blocking in busy state.

## usage

Setup connection pool:
```javascript
const {ResourcePool} = require('resource-pools');
const {ConnectionResource} = require('resource-pools-connection');

const config = {
    constructor: ConnectionResource,
    arguments: [/* your 'tedious' connection config object here */],
    maxCount: /* number of maximum pooled connections */
} ;
const dbConnections = new ResourcePool(config);
```

Run DB request:
```javascript
dbConnections.allocate().then( conn => {
    conn.execSql(request);
})
```