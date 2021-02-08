//add a goal to array every time it is completed in days.  (cap goal completion at 70 years)

var array = [2, 10, 4, 5, 5, 5, 3, 3, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,11, 5];
let test=[];
var sorter = [];
sortedArray = [];
var a = 0;

for(var i=0; i < array.length; i++){
    if (array[i] >= a) {
        a = array[i];
      }
};

for(i=0; i<=a; i++){
sorter.push({value: 0, counter: 1})
};


for(i=0; i < array.length; i++){
    a = parseInt(array[i]);
    if (sorter[a].value != 0){
        sorter[a].value += array[i];
        sorter[a].counter ++;
    }
    sorter[a].value = array[i];
};

for(i=0; i<sorter.length; i++){
    if(sorter[i].value != 0){
        sortedArray.push(sorter[i].value + ` Appears: ${sorter[i].counter} x`)
        test.push(sorter[i].value)
    }
}
// console.log(test);
let index=0
let firstIndexCount = sortedArray[index].split(' ')[2]
let firstIndexValue = sortedArray[index].split(' ')[0]
let biggest = {
    value: 0,
    count: 0
}

// console.log(sortedArray)
while (index < sortedArray.length){

    firstIndexValue = sortedArray[index].split(' ')[0]

    firstIndexCount = sortedArray[index].split(' ')[2]


    if (firstIndexCount > biggest.count){
        // console.log('line', 60)
        biggest.value = [firstIndexValue],
        biggest.count = firstIndexCount

    }
    else if (firstIndexCount === biggest.count) {
        // console.log('line', 66)
        biggest.value.push(firstIndexValue)
    }
        
    index++;
}

console.log(biggest)



