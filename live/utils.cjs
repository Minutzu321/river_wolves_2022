function rInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genId(l) {
    var rez             = '';
    var caractere       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var lungimeCaractere = caractere.length;
    for ( var i = 0; i < l; i++ ) {
      result += caractere.charAt(Math.floor(Math.random() * lungimeCaractere));
   }
   return rez;
}

module.exports = {rInRange, genId}