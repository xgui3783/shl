#! /bin/bash

# find all jpgs, but does not end with -square.jpg
for f in $(find . -type f -name "*.jpg" -not -name "*-square.jpg"); do
  
  # get the width and height
  width=$(identify -format '%w' $f)
  height=$(identify -format '%h' $f)

  # assume portrait, so width is the limiting factor
  output_filename=${f%.jpg}-square.jpg
  convert $f -crop "$width"x"$width"+0+0 $output_filename
  
done