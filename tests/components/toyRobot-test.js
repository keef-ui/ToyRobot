
const chai = require('chai');
const expect = chai.expect; 
const toyRobot = require('../../components/toyRobot');


describe('toyRobot', function() {
  it('Component should be a function ', function() {

    expect(toyRobot).to.be.a('function');
  });
  it('method toyRobot.parsedCommand should return an object', function() {
    let newToyRobot= new toyRobot("");
    expect(newToyRobot.parsedCommand()).to.be.a('object');
  });
  it('method toyRobot.parsedCommand should return an object of  three elements when a valid place command has been entered ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 0,0,NORTH";
    expect(newToyRobot.parsedCommand(input)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input)).to.have.property('command','PLACE');
    expect(newToyRobot.parsedCommand(input)).to.have.property('x',0);
    expect(newToyRobot.parsedCommand(input)).to.have.property('y',0);
    expect(newToyRobot.parsedCommand(input)).to.have.property('f','NORTH');
  });
  it('method toyRobot.parsedCommand should not accept place commands that do not have exactly three arguments', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 0";
    const input2= "PLACE 0,3,3,4";
    expect(newToyRobot.parsedCommand(input)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input)).to.have.property('command','INVALID');
    expect(newToyRobot.parsedCommand(input2)).to.have.property('command','INVALID');

  });
  it('method toyRobot.parsedCommand should return command property with value invalid when a invalid place command has been entered ', function() {
    var newToyRobot= new toyRobot();
    const input="PLACEx 0,0,NORTH";
    expect(newToyRobot.parsedCommand(input)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input)).to.have.property('command','INVALID');
    const input2="PLACE 0,0,NORTHesat";
    expect(newToyRobot.parsedCommand(input2)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input2)).to.have.property('command','INVALID');
    const input3="PLACE 0,eee,NORTHesat";
    expect(newToyRobot.parsedCommand(input3)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input3)).to.have.property('command','INVALID');
  });

  it('method toyRobot.parsedCommand should not accept any commands until a place command has been issued ', function() {
    var newToyRobot= new toyRobot();
    const input="MOVE";
    expect(newToyRobot.parsedCommand(input)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input)).to.have.property('command','INVALID');

  });
  it('method toyRobot.parsedCommand should  accept commands after a place command has been issued ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 0,0,NORTH";
    const input2="MOVE";
    const input3="LEFT";
    expect(newToyRobot.parsedCommand(input)).to.be.a('object');
    expect(newToyRobot.parsedCommand(input2)).to.have.property('command','MOVE');
    expect(newToyRobot.parsedCommand(input3)).to.have.property('command','LEFT');

  });
  // Test toyRobot.executeCommand method

  it('method toyRobot.executes executes a valid  place command ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 4,5,NORTH";
    const parsedCommand=newToyRobot.parsedCommand(input);
    expect(newToyRobot.executeCommand(parsedCommand)).to.have.property('message','Place succesfully completed');
    expect(newToyRobot.executeCommand(parsedCommand)).to.deep.include({ "pos": { 'x': 4,"y":5,"f":"NORTH" } });
  });
  it('method toyRobot.executes executes an invalide place command  with out of bounds x or y value ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE -1,5,NORTH";
    const parsedCommand=newToyRobot.parsedCommand(input);
    expect(newToyRobot.executeCommand(parsedCommand)).to.have.property('message','Place command was unsuccessful');
    expect(newToyRobot.executeCommand(parsedCommand)).to.deep.include({ "pos": { "x": 0,"y":0,"f":"" } });
  });
  it('method toyRobot.executes executes an valid move command ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 3,5,WEST";
    const input2= "MOVE";
    const parsedCommand=newToyRobot.parsedCommand(input);
    const parsedCommand2=newToyRobot.parsedCommand(input2);
    expect(newToyRobot.executeCommand(parsedCommand)).to.have.property('message','Place succesfully completed');
    expect(newToyRobot.executeCommand(parsedCommand2)).to.deep.include({ "pos": { 'x': 2,"y":5,"f":"WEST" } });
    // expect(newToyRobot.executeCommand(parsedCommand2)).to.deep.include({ "pos": { 'x': 1,"y":2,"f":"NORTH" } });
  });
  it('method toyRobot.executes executes an left rotate ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 3,5,WEST";
    const input2= "LEFT";
    const parsedCommand=newToyRobot.parsedCommand(input);
    const parsedCommand2=newToyRobot.parsedCommand(input2);
    expect(newToyRobot.executeCommand(parsedCommand)).to.have.property('message','Place succesfully completed');
    expect(newToyRobot.executeCommand(parsedCommand2)).to.deep.include({ "pos": { 'x': 3,"y":5,"f":"SOUTH" } });
    // expect(newToyRobot.executeCommand(parsedCommand2)).to.deep.include({ "pos": { 'x': 1,"y":2,"f":"NORTH" } });
  });
  it('method toyRobot.executes executes an right rotate and report ', function() {
    var newToyRobot= new toyRobot();
    const input= "PLACE 3,5,NORTH";
    const input2= "RIGHT";
    const input3= "REPORT";
    const parsedCommand=newToyRobot.parsedCommand(input);
    const parsedCommand2=newToyRobot.parsedCommand(input2);
    const parsedCommand3=newToyRobot.parsedCommand(input3);
    expect(newToyRobot.executeCommand(parsedCommand)).to.have.property('message','Place succesfully completed');
    expect(newToyRobot.executeCommand(parsedCommand2)).to.deep.include({ "pos": { 'x': 3,"y":5,"f":"EAST" } });
    expect(newToyRobot.executeCommand(parsedCommand3)).to.deep.include({ "pos": { 'x': 3,"y":5,"f":"EAST" } });
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
    const parsedCommand=newToyRobot.parsedCommand(input);
    const parsedCommand2=newToyRobot.parsedCommand(input2);
    const parsedCommand3=newToyRobot.parsedCommand(input3);
    const parsedCommand4=newToyRobot.parsedCommand(input4);
    const parsedCommand5=newToyRobot.parsedCommand(input5);
    const parsedCommand6=newToyRobot.parsedCommand(input6);
    expect(newToyRobot.executeCommand(parsedCommand)).to.have.property('message','Place succesfully completed');
    expect(newToyRobot.executeCommand(parsedCommand2)).to.deep.include({ "pos": { 'x': 2,"y":2,"f":"EAST" } });
    expect(newToyRobot.executeCommand(parsedCommand3)).to.deep.include({ "pos": { 'x': 3,"y":2,"f":"EAST" } });
    expect(newToyRobot.executeCommand(parsedCommand4)).to.deep.include({ "pos": { 'x': 3,"y":2,"f":"NORTH" } });
    expect(newToyRobot.executeCommand(parsedCommand5)).to.deep.include({ "pos": { 'x': 3,"y":3,"f":"NORTH" } });
    expect(newToyRobot.executeCommand(parsedCommand6)).to.deep.include({ "pos": { 'x': 3,"y":3,"f":"NORTH" } });


    // expect(newToyRobot.executeCommand(parsedCommand2)).to.deep.include({ "pos": { 'x': 1,"y":2,"f":"NORTH" } });
  });
});