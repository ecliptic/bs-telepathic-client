// Generated by BUCKLESCRIPT VERSION 2.2.2, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var WebSockets = require("bs-websockets/src/webSockets.js");
var TitleCase = require("title-case");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Actions$BsTelepathic = require("./Actions.bs.js");
var ProjectNameGenerator = require("project-name-generator");

var Config = /* module */[/* keys : record */[/* userName */"telepathic:userName"]];

function chooseName() {
  return TitleCase(ProjectNameGenerator({
                  alliterative: /* true */1
                }).spaced);
}

function getName() {
  return Js_primitive.null_to_opt(localStorage.getItem("telepathic:userName"));
}

function updateName(name) {
  localStorage.setItem("telepathic:userName", name);
  return /* () */0;
}

function makeName() {
  var name = chooseName(/* () */0);
  updateName(name);
  return name;
}

function getOrCreateUserName() {
  var name = getName(/* () */0);
  if (name) {
    return name[0];
  } else {
    return makeName(/* () */0);
  }
}

function sendMessage(linkId, text, client) {
  var userName = getOrCreateUserName(/* () */0);
  var message = /* MessageSend */Block.__(0, [
      linkId,
      userName,
      text
    ]);
  client[/* ws */0].send(JSON.stringify(Actions$BsTelepathic.Encode[/* action */1](message)));
  return /* () */0;
}

function receiveMessage(onMessage, $$event) {
  var json = JSON.parse($$event.data);
  var match = Actions$BsTelepathic.Decode[/* action */2](json);
  if (match) {
    var match$1 = match[0];
    switch (match$1.tag | 0) {
      case 1 : 
          return Curry._1(onMessage, {
                      userName: match$1[0],
                      text: match$1[1]
                    });
      case 0 : 
      case 2 : 
          return /* () */0;
      
    }
  } else {
    return /* () */0;
  }
}

function register(client) {
  var message = /* ClientRegister */Block.__(2, [client[/* linkId */1]]);
  client[/* ws */0].send(JSON.stringify(Actions$BsTelepathic.Encode[/* action */1](message)));
  return /* () */0;
}

function make($staropt$star, linkId, onMessage, url) {
  var socket = $staropt$star ? $staropt$star[0] : /* None */0;
  var ws = socket ? socket[0] : Curry._1(WebSockets.WebSocket[/* make */0], url);
  var client = /* record */[
    /* ws */ws,
    /* linkId */linkId
  ];
  WebSockets.WebSocket[/* on */5](/* Close */Block.__(0, [(function ($$event) {
              console.log("WebSocket closed: " + $$event.reason);
              return /* () */0;
            })]), WebSockets.WebSocket[/* on */5](/* Error */Block.__(1, [(function (error) {
                  console.log("WebSocket error: " + error);
                  return /* () */0;
                })]), WebSockets.WebSocket[/* on */5](/* Message */Block.__(2, [(function (param) {
                      return receiveMessage(onMessage, param);
                    })]), WebSockets.WebSocket[/* on */5](/* Open */Block.__(3, [(function () {
                          return register(client);
                        })]), ws))));
  return client;
}

exports.Config = Config;
exports.chooseName = chooseName;
exports.getName = getName;
exports.updateName = updateName;
exports.makeName = makeName;
exports.getOrCreateUserName = getOrCreateUserName;
exports.sendMessage = sendMessage;
exports.receiveMessage = receiveMessage;
exports.register = register;
exports.make = make;
/* title-case Not a pure module */
