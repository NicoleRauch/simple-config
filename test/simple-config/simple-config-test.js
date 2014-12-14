'use strict';

var expect = require('must');

var simpleConfig = require('../../lib/simple-config/index');

describe('simple-config', function () {

  beforeEach(function () {
    simpleConfig.reset();
  });

  it('adds no properties if no json files are given', function () {
    simpleConfig.addFiles([]);
    expect(simpleConfig.get('prop1')).to.be.undefined();
    expect(simpleConfig.get('prop2')).to.be.undefined();
    expect(simpleConfig.get('prop3')).to.be.undefined();
    expect(simpleConfig.get('prop4')).to.be.undefined();
  });

  it('adds all properties from a json file', function () {
    simpleConfig.addFiles([__dirname + '/testdata.json']);
    expect(simpleConfig.get('prop1')).to.equal('value1');
    expect(simpleConfig.get('prop2')).to.equal('value2');
  });

  it('adds all properties from a properties object', function () {
    simpleConfig.addProperties({prop3: 'value3', prop4: 'value4'});
    expect(simpleConfig.get('prop3')).to.equal('value3');
    expect(simpleConfig.get('prop4')).to.equal('value4');
  });

  it('aggregates properties that are set independently', function () {
    simpleConfig.addFiles([__dirname + '/testdata.json']);
    simpleConfig.addProperties({prop3: 'value3', prop4: 'value4'});
    expect(simpleConfig.get('prop1')).to.equal('value1');
    expect(simpleConfig.get('prop2')).to.equal('value2');
    expect(simpleConfig.get('prop3')).to.equal('value3');
    expect(simpleConfig.get('prop4')).to.equal('value4');
  });

  it('overwrites properties when they are set twice (via file and object)', function () {
    simpleConfig.addFiles([__dirname + '/testdata.json']);
    simpleConfig.addProperties({prop2: 'value2new'});
    expect(simpleConfig.get('prop1')).to.equal('value1');
    expect(simpleConfig.get('prop2')).to.equal('value2new');
  });

  it('overwrites properties when they are set twice (via two objects)', function () {
    simpleConfig.addProperties({prop3: 'value3', prop4: 'value4'});
    simpleConfig.addProperties({prop3: 'value3new'});
    expect(simpleConfig.get('prop3')).to.equal('value3new');
    expect(simpleConfig.get('prop4')).to.equal('value4');
  });
});