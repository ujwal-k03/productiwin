let num = 60;
let mult = 75000;

let time = new Date('2023-02-25T00:00:00.000');
time.setTime(time.getTime() + num*mult);

console.log(time.toLocaleTimeString('en-US', {
    hour:   '2-digit',
    minute: '2-digit',
}));