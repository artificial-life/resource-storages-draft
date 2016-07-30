'use strict'

 var Storage = require("./Storage.js");

 var Layer = require("./Layer.js");
 var Plan = require("./Plan.js");

var data = [[0,100][600,1200]];


 describe("Storage", () => {
   var tested;

   beforeEach(() => {
     tested = new Storage( {});
   });

   it("#constructor",()=>{
     expect(tested).to.be.an.instanceof(Storage);
     });

   describe("basic", () => {

     describe("#build", () => {
         it("extend",()=>{
           let layer = new Layer();
           let plan = new Plan();
           plan.extend(data);
           
           layer.addAttribute('name',plan);
         });
     });

   });
 });
