# animated\_led\_matrix
Tools and libraries for creating Arduino powered LED matrix animations.


## Pattern Builder
The Pattern builder is a web based tool for creating pixel scale animations that can be consumed by the micro processor code.

The workflow is generally:

1. Design pattern
2. Duplicate pattern and tweak
3. Organize patterns into a sequence

I have placed a short demo on YouTube.
[![YouTube Demo](http://img.youtube.com/vi/50_QiZe9XAU/0.jpg)](http://www.youtube.com/watch?v=50_QiZe9XAU "Video Title")

The tool requires Python3 with Flask, primarily to persist pattern and sequence data to disk.

Currently, colors and canvas dimensions must be manually configured in the path below.
````
/animated_led_matrix/pattern_builder/static/js/Config.js 
````

## Arduino sketch
Coming soon

## Hardware
Coming soon