/* -*- mode: js; js-indent-level:2;  -*-
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2019-present Samsung Electronics Co., Ltd. and other contributors
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

var webthing = require('webthing')
// HAL
var ColorSensor = require('../index.js')

function main () {
  var that = this
  this.port = process.argv[2] ? Number(process.argv[2]) : 8888
  this.controller = process.argv[3] ? String(process.argv[3]) : 'simulator'
  this.thing = new webthing.Thing('ColorSensor', ['ColorControl'])
  this.value = new webthing.Value('#000000')
  this.thing.addProperty(new webthing.Property(
    this.thing, 'color', this.value,
    {
      '@type': 'ColorProperty',
      readOnly: true,
      type: 'string'
    }
  ))
  that.sensor = new ColorSensor({ controller: this.controller })
  this.sensor.onreading = function () {
    that.value.notifyOfExternalUpdate(that.sensor.color)
  }

  this.sensor.onactivate = function () {
    that.server = new webthing.WebThingServer(new webthing.SingleThing(that.thing),
      that.port)
    process.on('SIGINT', function () {
      that.server.stop()
      process.exit()
    })
    that.server.start()
  }
  this.sensor.start()
}

if (module.parent === null) {
  main()
}
