const dec = document.getElementById("dec");
const bin = document.getElementById("bin");
const hex = document.getElementById("hex");

let selection = "dec"; //Used to track what the user wants converted

function decToBin(value)
{
    if(value == 0) return "";
    return decToBin(Math.floor(value / 2)) + "" + (value%2);
}

function binToDec(value)
{
  let sum = 0;
  for(let i = 0; i < value.length; i++)
    sum += parseInt(value.charAt(i))*Math.pow(2, (value.length-1)-i);
  return sum;
}

function convert()
{
    if(selection == "") return;

    switch(selection)
    {
      case "dec":
        if(dec.value == "0") bin.value = "0";
        else bin.value = decToBin(dec.value);

        hex.value = Number(dec.value).toString(16).toUpperCase();
        break;
      case "bin":
        dec.value = binToDec(bin.value);
        hex.value = Number(binToDec(bin.value)).toString(16).toUpperCase();
        break;
      case "hex":
        dec.value = parseInt(hex.value, 16);
        bin.value = decToBin(parseInt(hex.value, 16));
        break;
    }
    selection = "";
    resetColors();
}

// Handle events here //
const activeCol = "#7ff0a5", defaultCol = "#def7fc", hoverCol = "#c5e0e6";

function resetColors()
{
  if(selection != 'dec') dec.style.backgroundColor = defaultCol;
  if(selection != 'bin') bin.style.backgroundColor = defaultCol;
  if(selection != 'hex') hex.style.backgroundColor = defaultCol;
}

let areas = document.getElementsByClassName("field");
for(let i = 0; i < areas.length; i++)
{
  areas[i].addEventListener("mousedown", function() {
    selection = areas[i].id;
    resetColors();
    areas[i].style.backgroundColor = activeCol;
  });
  areas[i].addEventListener("mouseover", function() {
    resetColors();
    if(selection != areas[i].id) areas[i].style.backgroundColor = hoverCol;
  });
}
