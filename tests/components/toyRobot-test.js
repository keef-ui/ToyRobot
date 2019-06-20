"use strict"
const chai = require('chai');
const expect = chai.expect; 
const toyRobot = require('../../components/toyRobot');

describe('toyRobot', function() {
  // Test toyRobot.parseCommand method
  it('Component should be a function ', function() {

    expect(toyRobot).to.be.a('function');
  });
  it('method toyRobot.parseCommand should return an object', function() {
    let newToyRobot= new toyRobot("");
    expect(newToyRobot.parseCommand()).to.be.a('object');
  });
  it('method toyRobot.parseCommand should return an object of  three elements when a valid place command has been entered ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 0,0,NORTH";
    expect(newToyRobot.parseCommand(input)).to.be.a('object');
   //  expect(newToyRobot.parseCommand(input)).to.deep.include({ 'response':{'message':'Place succesfully completed','pos':{'x':0,'y':0,'f':'NORTH'}}});
  });
  it('method toyRobot.parseCommand should not accept place commands that do not have exactly three arguments', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 0";
    const input2= "PLACE 0,3,3,4";
    expect(newToyRobot.parseCommand(input)).to.be.a('object');
    expect(newToyRobot.parseCommand(input)).to.deep.include({'currentCommand':{'command':'INVALID'}});
    expect(newToyRobot.parseCommand(input2)).to.deep.include({'currentCommand':{'command':'INVALID'}});

  });
  it('method toyRobot.parseCommand should return command property with value invalid when a invalid place command has been entered ', function() {
    var newToyRobot= new toyRobot();
    const input="PLACEx 0,0,NORTH";
    expect(newToyRobot.parseCommand(input)).to.be.a('object');
    expect(newToyRobot.parseCommand(input)).to.deep.include({'currentCommand':{'command':'INVALID'}});
    const input2="PLACE 0,0,NORTHesat";
    expect(newToyRobot.parseCommand(input2)).to.be.a('object');
    expect(newToyRobot.parseCommand(input2)).to.deep.include({'currentCommand':{'command':'INVALID'}});
    const input3="PLACE 0,eee,NORTHesat";
    expect(newToyRobot.parseCommand(input3)).to.be.a('object');
    expect(newToyRobot.parseCommand(input3)).to.deep.include({'currentCommand':{'command':'INVALID'}});
  });

  it('method toyRobot.parseCommand should not accept any commands until a place command has been issued ', function() {
    var newToyRobot= new toyRobot();
    const input="MOVE";
    expect(newToyRobot.parseCommand(input)).to.be.a('object');
    expect(newToyRobot.parseCommand(input)).to.deep.include({'currentCommand':{'command':'INVALID'}});

  });
  it('method toyRobot.parseCommand should  accept commands after a place command has been issued ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 0,0,NORTH";
    const input2="MOVE";
    const input3="LEFT";
    expect(newToyRobot.parseCommand(input)).to.be.a('object');
    expect(newToyRobot.parseCommand(input2)).to.deep.include({'currentCommand':{'command':'MOVE','x':0,'y':0,'f':0}});
    expect(newToyRobot.parseCommand(input3)).to.deep.include({'currentCommand':{'command':'LEFT','x':0,'y':0,'f':0}});

  });
  // Test toyRobot.executeCommand method

  it('method toyRobot.executes executes a valid  place command ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 4,5,NORTH";
    const parsedCommand=newToyRobot.parseCommand(input);
    expect(newToyRobot.executeCommand(parsedCommand.currentCommand)).to.have.property('message','Place succesfully completed');
    expect(newToyRobot.executeCommand(parsedCommand.currentCommand)).to.deep.include({ "pos": { 'x': 4,"y":5,"f":"NORTH" } });
  });
  it('method toyRobot.executes executes an invalide place command  with out of bounds x or y value ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE -1,5,NORTH";
    const parsedCommand=newToyRobot.parseCommand(input);
    expect(newToyRobot.executeCommand(parsedCommand.currentCommand)).to.have.property('message','Place command was unsuccessful');
    expect(newToyRobot.executeCommand(parsedCommand.currentCommand)).to.deep.include({ "pos": { "x": 0,"y":0,"f":"" } });
  });
  it('method toyRobot.executes executes an valid move command ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 3,5,WEST";
    const input2= "MOVE";
    const parsedCommand=newToyRobot.parseCommand(input);
    const parsedCommand2=newToyRobot.parseCommand(input2);
    expect(newToyRobot.executeCommand(parsedCommand.currentCommand)).to.have.property('message','Place succesfully completed');
    expect(newToyRobot.executeCommand(parsedCommand2.currentCommand)).to.deep.include({ "pos": { 'x': 2,"y":5,"f":"WEST" } });
 
  });
  it('method toyRobot.executes executes an left rotate ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 3,5,WEST";
    const input2= "LEFT";
    const parsedCommand=newToyRobot.parseCommand(input);
    const parsedCommand2=newToyRobot.parseCommand(input2);
    expect(newToyRobot.executeCommand(parsedCommand.currentCommand)).to.have.property('message','Place succesfully completed');
    expect(newToyRobot.executeCommand(parsedCommand2.currentCommand)).to.deep.include({ "pos": { 'x': 3,"y":5,"f":"SOUTH" } });

  });
  it('method toyRobot.executes executes an right rotate and report ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 3,5,NORTH";
    const input2= "RIGHT";
    const input3= "REPORT";
    const parsedCommand=newToyRobot.parseCommand(input);
    const parsedCommand2=newToyRobot.parseCommand(input2);
    const parsedCommand3=newToyRobot.parseCommand(input3);
    expect(newToyRobot.executeCommand(parsedCommand.currentCommand)).to.have.property('message','Place succesfully completed');
    expect(newToyRobot.executeCommand(parsedCommand2.currentCommand)).to.deep.include({ "pos": { 'x': 3,"y":5,"f":"EAST" } });
    expect(newToyRobot.executeCommand(parsedCommand3.currentCommand)).to.deep.include({ "pos": { 'x': 3,"y":5,"f":"EAST" } });
    // expect(newToyRobot.executeCommand(parsedCommand2)).to.deep.include({ "pos": { 'x': 1,"y":2,"f":"NORTH" } });
  });
  it('method toyRobot.executes executes a combomination of moves ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 1,2,EAST";
    const input2= "MOVE";
    const input3= "MOVE";
    const input4= "LEFT";
    const input5= "MOVE";
    const input6= "REPORT";
    const parsedCommand=newToyRobot.parseCommand(input);
    const parsedCommand2=newToyRobot.parseCommand(input2);
    const parsedCommand3=newToyRobot.parseCommand(input3);
    const parsedCommand4=newToyRobot.parseCommand(input4);
    const parsedCommand5=newToyRobot.parseCommand(input5);
    const parsedCommand6=newToyRobot.parseCommand(input6);
    expect(newToyRobot.executeCommand(parsedCommand.currentCommand)).to.have.property('message','Place succesfully completed');
    expect(newToyRobot.executeCommand(parsedCommand2.currentCommand)).to.deep.include({ "pos": { 'x': 2,"y":2,"f":"EAST" } });
    expect(newToyRobot.executeCommand(parsedCommand3.currentCommand)).to.deep.include({ "pos": { 'x': 3,"y":2,"f":"EAST" } });
    expect(newToyRobot.executeCommand(parsedCommand4.currentCommand)).to.deep.include({ "pos": { 'x': 3,"y":2,"f":"NORTH" } });
    expect(newToyRobot.executeCommand(parsedCommand5.currentCommand)).to.deep.include({ "pos": { 'x': 3,"y":3,"f":"NORTH" } });
    expect(newToyRobot.executeCommand(parsedCommand6.currentCommand)).to.deep.include({ "pos": { 'x': 3,"y":3,"f":"NORTH" } });

  });
});
