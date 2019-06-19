"use strict"
/**
 *usage :   This will test ToyRobot component. The input.txt file contains the test data.
 *  
 */
const toyRobot = require("./components/toyRobot");

const newToyRobot = new toyRobot();

let lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt")
});

lineReader.on("line", (line) => {
  console.log("Command:", line);
  let robot = newToyRobot.parseCommand(line);

  if (robot.resultCommand.command === "REPORT") {
    console.log(robot.response.pos);
  }
});
