# COLOR-SENSOR-JS #

[![GitHub forks](https://img.shields.io/github/forks/rzr/color-sensor-js.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/rzr/color-sensor-js/network/)
[![license](https://img.shields.io/badge/license-Apache-2.0.svg)](LICENSE)
[![NPM](https://img.shields.io/npm/v/color-sensor-js.svg)](https://www.npmjs.com/package/color-sensor-js)
[![IRC Channel](https://img.shields.io/badge/chat-on%20freenode-brightgreen.svg)](https://kiwiirc.com/client/irc.freenode.net/#tizen)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9eaea080afea42e295b8778133446bbd)](https://app.codacy.com/app/rzr/color-sensor-js?utm_source=github.com&utm_medium=referral&utm_content=rzr/color-sensor-js&utm_campaign=Badge_Grade_Dashboard)

[![NPM](https://nodei.co/npm/color-sensor-js.png)](https://npmjs.org/package/color-sensor-js)

## INTRODUCTION ##

This module is supporting TCS34725 I2C sensor
and also provide a simulator that return random colors.

[![Presentation](
https://camo.githubusercontent.com/a31c09f76b5309cc7fbf0122a271913a5c9d91a3/68747470733a2f2f696d6167652e736c696465736861726563646e2e636f6d2f776f7478722d3230313930333230727a722d3139303332313133333434362f39352f776f7478723230313930333230727a722d312d3633382e6a7067#./file/wotxr-20190320rzr.jpg
)](
http://www.slideshare.net/slideshow/embed_code/key/cPtJI8DNhzpE4#wotxr-20190320rzr
"WoTxR")

It should work with Adafruit RGB Color Sensor
with IR Filter and White LED - TCS34725 [ADA1334] :

* <https://www.amazon.com/Adafruit-Color-Sensor-Filter-White/dp/B00OKCRU5M/ref=rzr-21#>
* <https://www.adafruit.com/product/1334>

## USAGE ##

Node.js and IoT.js runtimes are supported.

Usage is straightforward.

By default simulator is used, and output are in web hex format (#RrGgBb),
but lower level use is also possible.

For using I2C TCS34725 sensor, check i2c chapter first.

### USING IOT.JS ###

Install recent version of IoT.js:

* <https://github.com/rzr/webthing-iotjs/wiki/IotJs>

```sh
git clone --recursive --depth 1 https://github.com/rzr/color-sensor-js
cd color-sensor-js

make test
#| iotjs lib/simulator.js
#| log: value=[7779,36778,11173,42766]
#| log: test: test/iotjs

make start
#| {"color": "#badc0d"}
#| {"color": "#c0ffee"}
#| (...)

# Or to use actual sensor:
make start run_args=tcs34725
#| iotjs example tcs34725
#| {"color": "#ff514a"}
#| (...)

# Raw driver's values:
iotjs lib/tcs34725.js
#| log: value=[65535,20885,19074,65535]

```

### USING NODE.JS ###

```sh
# git clone or use install released package:

npm install color-sensor-js
cd node_modules/color-sensor-js

npm install --only=prod
npm test
#| > node lib/simulator
#| log: value=[11409,49339,1907,5849]

npm start
#| node example
#| {"color": "#c0ffee"}
#| (...)

# Or to use actual sensor:
node example tcs34725
#| {"color": "#ff514a"}
#| (...)

# Raw driver's values:
node lib/tcs34725.js
#| log: value=[65535,20908,19103,65535]
```

### NOTES ###

On issues make sure that your system have I2C,
device should be visible by user before using it:

```sh
sudo apt-get install i2c-tools make git
i2cdetect -y 1
#|      0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
#| (...)
#| 20: -- -- -- -- -- -- -- -- -- 29 -- -- -- -- -- --
#| (...)
```

On Raspbian, pi "user" is in "i2c" group of file "/dev/i2c-1"
(matching RaspberryPi's header).

## WEBTHING EXAMPLE ##

An extra example is provided for use from the Web (WebOfThings).

It's using Mozilla's IoT Schema and can be used as standalone
or connected to things Gateway:

```sh
cd example/color-sensor-webthing
npm install
npm start

curl http://localhost:8888/properties/color
#| {"color":"#6ab302"}
```

TCS34725 sensor can be selected from command line, and port eventually changed:

```sh
cd example/color-sensor-webthing/
npm install
npm start 8888 tcs34725
```

May I recommend to give a try with IoT.js runtime,
it is faster and consuming much less resources:

```sh
make -C example/color-sensor-webthing start
```

[![schemas](
http://image.slidesharecdn.com/iot-javascript-2019-fosdem-190206130525/95/iotjavascript2019fosdem-26-638.jpg
)](
https://www.slideshare.net/rzrfreefr/iotjavascript2019fosdem/26
"Schema")

### CLIENTS ###

Webthings servers are designed to be connected Mozilla's IoT
which play the client role, but nothing prevent to create your own,
in CLI (using IoT.js or Node.js) or browser.

For web app clients try to open this page, some are listed:

* <http://samsunginter.net/color-sensor-js/>
* HTML one: Background should be updated in realtime
* A-Frame one: will also display update in 3D in browser or VR/AR headset

Note, if you want to create your app offline you can use static contents:

* <http://samsunginter.net/color-sensor-js/example/color-sensor-webthing/extra/json/>

Off course, prefix path (and suffix if loading from file:) should be adjusted,
or overloaded using CGI params.

You can even run webthings in the cloud:

* <http://samsunginter.net/color-sensor-js/example/color-sensor-webthing/extra/aframe.html?&url=https://color-sensor-webthing.glitch.me>

[![aframe-webthing](
https://speakerd.s3.amazonaws.com/presentations/9d6091c2266448b88daab13082337882/slide_29.jpg#aframe-webthing
)](
http://purl.org/aframe-webthing#
"aframe-webthing")

## DEMOS ##

[![demo](
https://image.slidesharecdn.com/mozilla-things-fosdem-2019-190207162845/95/mozillathingsfosdem2019-24-638.jpg
)](
https://www.slideshare.net/rzrfreefr/mozillathingsfosdem2019/25
"Demo")

In "webthing-iotjs-opendata-20190202rzr" video, sensor is observing the lamp color,
but it can work with any regular material.

[![Presentation](
https://cf.mastohost.com/v1/AUTH_91eb37814936490c95da7b85993cc2ff/socialsamsunginternet/preview_cards/images/000/004/182/original/863b031e1ab0e255.jpeg
)](
https://social.samsunginter.net/@rzr/101564201618024415#
"WebThingIotJs"
)

A-Frame can also been used for rendering.

## RESOURCES ##

* <https://libraries.io/npm/color-sensor-js>
* <https://hacks.mozilla.org/2019/03/connecting-real-things-to-virtual-worlds-using-web/>
* <https://social.samsunginter.net/@rzr/101564201618024415>
* <https://ams.com/tcs34725>
* <https://ams.com/documents/20143/36005/TCS3472_DS000390_2-00.pdf>
* <https://www.broadcom.com/products/optical-sensors/integrated-ambient-light-and-proximity-sensors/apds-9960>
* <https://github.com/rzr/webthing-iotjs/wiki/Sensor>
* <https://github.com/rzr/generic-sensors-lite>
* <https://github.com/rzr/mozilla-iot-generic-sensors-adapter/>
* <https://fosdem.org/2019/schedule/event/project_things/>
* <https://api.npms.io/v2/package/color-sensor-js>
* <https://npm.runkit.com/color-sensor-js>
* <https://github.com/jerryscript-project/iotjs-modules>
* <https://github.com/w3c/ambient-light/issues/9>
* <https://www.af83.com/in-realtime/laval-virtual-2019>
* <https://en.wikipedia.org/wiki/Colorimetry>
* <https://github.com/kelly/node-i2c/issues/90>
* <https://github.com/WiringPi/WiringPi-Node/blob/master/DOCUMENTATION.md#tcs34725>
