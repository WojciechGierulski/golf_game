import {BOX_SIZE} from "../game_params/params.js";

function load_images()
{
  var images = {};
  var allImages = document.getElementsByTagName('img');
  for(var i = 1; i <= allImages.length ; i++)
  {
    var id = allImages[i-1].id;
    allImages[i-1].width = BOX_SIZE;
    allImages[i-1].height = BOX_SIZE;
    images[id] = allImages[i-1];
  }
  return images;
}

export  {load_images};
