var a = ['a', 'b', 'c', 'e','g', 'e', 'f', 'd'];
var s = ['b', 'a', 'c', 'd', 'e'];

function Sort(sort, resort) {
    var newArr = [];
    sort.forEach(elem => {
        var i = resort.indexOf(elem);
        if (i > -1) {
            newArr.push(elem);
            resort.splice(i, 1);
        }

    });

    return newArr.concat(resort);
}

var the = Sort(s, a);
console.log(the);