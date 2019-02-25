/* -*- mode: js; js-indent-level:2; -*-
   SPDX-License-Identifier: Apache-2.0 */
/* Copyright 2018-present Samsung Electronics France
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var console = require('console')

var SensorController = null
try {
  SensorController = require('../color-sensor-js')
} catch (err) {
  SensorController = require('color-sensor-js')
}

/* Class inspired by W3C's generic-sensor API */
var ColorSensor = function (options) {
  this.state = 'construct'
  this.type = 'color'
  this.color = '#000000'
  this.level = 'low'
  this.activated = false
  this.interval = null
  this.onerror = function (err) {
    throw new Error(err)
  }
  this.options = options || {}
  this.options.frequency = this.options.frequency || 1
  this.options.controller = this.options.controller || 'simulator'

  return this
}

ColorSensor.prototype.update = function () {
  var that = this
  try {
    that.hasReading = false
    that.sensor.read(function (err, data) {
      if (err || data === null || typeof data === 'undefined') {
        return that.onerror(data)
      }
      that.timestamp = new Date()
      that.color = '#'
      for (var idx = 0; idx < 3; idx += 1) {
        var num = Math.floor(Number(data[idx]) / 0xFFFF * 0xFF)
        if (num <= 0xF) {
          that.color += '0'
        }
        that.color += num.toString(0x10)
      }
      that.hasReading = true
      if (that.onreading) {
        that.onreading()
      }
      that.hasReading = false
    })
  } catch (err) {
    that.onerror(err)
  }
}

ColorSensor.prototype.stop = function () {
  if (this.state === 'idle') {
    return
  }
  this.interval = clearInterval(this.interval)
  this.state = 'idle'
}

ColorSensor.prototype.start = function () {
  var that = this
  if (!this.sensor) {
    try {
      var controller = this.options.controller.charAt(0).toUpperCase() + this.options.controller.slice(1)
      this.sensor = new SensorController[controller]()
      this.state = 'idle'
    } catch (err) {
      if (that.onerror) {
        return that.onerror(err)
      }
    }
  }

  that.state = 'activating'
  try {
    if (!that.interval) {
      that.interval = setInterval(
        function () {
          that.update()
        },
        1000.0 / that.options.frequency
      )
      that.state = 'activated'
      if (that.onactivate) {
        that.onactivate()
      }
    }
  } catch (err) {
    that.onerror(err)
  }
}

module.exports = ColorSensor

if (module.parent === null) {
  var controller = null
  if (process.argv[2]) {
    controller = String(process.argv[2])
  } else {
    controller = 'simulator'
  }
  var sensor = new ColorSensor({ controller: controller })

  sensor.onreading = function () {
    console.log('{"color": "' + sensor.color + '"}')
  }
  sensor.start()
}
