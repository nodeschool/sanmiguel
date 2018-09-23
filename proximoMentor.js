"use strict"
const moment = require("moment")
const args = require("yargs").argv

console.log(moment().format("dddd") === "Sunday")
console.log((args.token + "").split("").sort(e=>0.5 - Math.random()).join(""))
