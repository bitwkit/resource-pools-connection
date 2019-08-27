
// Dependencies

const {Connection} = require('tedious');
const {readyEventSym, errorEventSym, closeMethodSym} = require('resource-pools');


// Extended Connection object to match ResoursePool requirements

class ConnectionResource extends Connection {
    constructor(...args) {
        super(...args);
        this.once('connect', err => this.emit(err ? errorEventSym : readyEventSym, err) );
        this.once('error', err => this.emit(errorEventSym, err) );
        this.once('errorMessage', err => this.emit(errorEventSym, err) );
    }

    execSql(...[request, rest]) {
        super.execSql(...[request, rest]);
        request.once('requestCompleted', () => this.emit(readyEventSym));
    }
}

ConnectionResource.prototype[closeMethodSym] = function(...args) { this.close(...args) };


// Exports

exports.ConnectionResource = ConnectionResource;
