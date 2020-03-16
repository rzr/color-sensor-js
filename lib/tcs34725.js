/* -*- mode: js; js-indent-level:2; -*-
   SPDX-License-Identifier: Apache-2.0 */
/* Copyright 2019-present Samsung Electronics France
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
var I2c = require('wiringpi-iotjs/lib/i2c')

var TCS34725 = function (options) {
  this.i2c = new I2c(options)
  this.i2c.writeSync([0x80 | 0x0F, 0xEB]) // Command ATime
  this.i2c.writeSync([0x80 | 0x00, 0x01]) // Command Enable
  this.i2c.writeSync([0x80 | 0x00, 0x01 | 0x02]) // Command Enable
}

TCS34725.prototype.read = function (callback) {
  this.i2c.writeSync([
    0x80 | 0x00,
    0x01 | 0x02
  ]) // Command Enable

  this.i2c.readBytes(0x80 | 0x14, 8, function (err, res) { // Command Data
    if (err) {
      return callback && callback(err, null)
    }
    var clear = (res[1] << 8 | res[0])
    var gain = 0xFFFF / clear
    var data = [
      gain * (res[3] << 8 | res[2]), // Red
      gain * (res[5] << 8 | res[4]), // Green
      gain * (res[7] << 8 | res[6]), // Blue
      clear
    ]
    if (callback) {
      callback(null, data)
    }
  })
}

module.exports = TCS34725

if (module.parent === null) {
  var sensor = new TCS34725()
  sensor.read(function (err, value) {
    if (err) {
      console.error('error: ' + err)
      throw err
    } else {
      console.log('log: value=' + JSON.stringify(value))
    }
  })
}
