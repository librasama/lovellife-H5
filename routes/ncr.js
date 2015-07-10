String.prototype.ncr2c = function( ) {
    return this
        .replace( /&#x([\da-f]{2,4});/gi,
        function( $0, $1 ) { return String.fromCharCode( "0x" + $1 ) } )
}
String.prototype.c2ncr = function( ) {
    return this .ncr2c( ).replace( /./g,
        function( $0 ) { return "&#x" + $0.charCodeAt( ).toString( 16 ).toUpperCase( ) + ";" } )
}

module.exports = String;