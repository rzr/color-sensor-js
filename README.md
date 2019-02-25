# COLOR-SENSOR-JS #

[![GitHub forks](https://img.shields.io/github/forks/samsunginternet/color-sensor-js.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/samsunginternet/color-sensor-js/network/)
[![license](https://img.shields.io/badge/license-Apache-2.0.svg)](LICENSE)
[![NPM](https://img.shields.io/npm/v/color-sensor-js.svg)](https://www.npmjs.com/package/color-sensor-js)
[![IRC Channel](https://img.shields.io/badge/chat-on%20freenode-brightgreen.svg)](https://kiwiirc.com/client/irc.freenode.net/#tizen)

[![NPM](https://nodei.co/npm/color-sensor-js.png)](https://npmjs.org/package/color-sensor-js)


## INTRODUCTION ##

This module is supporting TCS34725 I2C sensor
and also provide a simulator that return random colors.

[![Presentation](https://cf.mastohost.com/v1/AUTH_91eb37814936490c95da7b85993cc2ff/socialsamsunginternet/preview_cards/images/000/004/182/original/863b031e1ab0e255.jpeg)](https://social.samsunginter.net/@rzr/101564201618024415# "WebThingIotJs")


## USAGE: ##

Node.js and IoT.js runtimes are supported.

Usage is straightforward.

```sh
# git clone or use install released package:

npm install sensor-color-js
cd node_modules/sensor-color-js

npm install --only=prod
npm start
#| {"color": "#badc0d"}
#| {"color": "#c0ffee"}
```

By default simulator is used, if you want to run example using I2C TCS34725 sensor.

```sh
node example tcs34725
```

Using IoT.js:

```sh
git clone --recursive --depth 1 https://github.com/samsunginternet/color-sensor-js
cd color-sensor-js
iotjs example/index.js tcs34725
```

Lower level use is also possible:

```sh
node lib/tcs34725.js 
log: value=[17824,31876,49742,65535]
```

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


## WEBTHING EXAMPLE: ##

An extra example is provided for use from the Web (WebOfThings).

It's using Mozilla's IoT Schema and can be used as standalone
or connected to things Gateway:

```sh
cd example/color-sensor-webthing 
npm install
npm start

curl http://localhost:8888/properties/color
{"color":"#6ab302"}
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
make -C example/color-sensor-webthing iotjs/run
```

[![schemas](http://image.slidesharecdn.com/iot-javascript-2019-fosdem-190206130525/95/iotjavascript2019fosdem-26-638.jpg)](https://www.slideshare.net/rzrfreefr/iotjavascript2019fosdem/26 "Schema")


## DEMO: ##

[![demo](https://image.slidesharecdn.com/mozilla-things-fosdem-2019-190207162845/95/mozillathingsfosdem2019-24-638.jpg)](https://www.slideshare.net/rzrfreefr/mozillathingsfosdem2019/25 "Demo")

In "webthing-iotjs-opendata-20190202rzr" video, sensor is observing the lamp color,
but it can work with any regular material.


## RESOURCES: ##

* https://social.samsunginter.net/@rzr/101564201618024415
* https://ams.com/documents/20143/36005/TCS3472_DS000390_2-00.pdf
* https://www.broadcom.com/products/optical-sensors/integrated-ambient-light-and-proximity-sensors/apds-9960
* https://github.com/rzr/webthing-iotjs/wiki/Sensor
* https://github.com/rzr/generic-sensors-lite
* https://fosdem.org/2019/schedule/event/project_things/
* https://api.npms.io/v2/package/color-sensor-js
* https://npm.runkit.com/color-sensor-js
* https://github.com/pando-project/iotjs-modules/pull/17
