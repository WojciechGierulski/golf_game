var BOX_SIZE = 80;

var canvas = document.getElementById("canvas");
var div_width = document.getElementById('wrapper1').clientWidth;
if (div_width > 1520)
{
    div_width = 1520;
}
if(div_width < 800)
{
    div_width = 800;
}
var height = Math.round(div_width * 72/152);
var SCALE = 1520/div_width;
var SIZE = [div_width, height];
console.log(SIZE);
canvas.width = SIZE[0];
canvas.height = SIZE[1];
export {BOX_SIZE, SCALE, SIZE, canvas};
