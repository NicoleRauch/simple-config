'use strict';

var expect = require('must');

var simpleConfigure = require('../../lib/simple-configure/index');

describe('simple-configure', function () {

  beforeEach(function () {
    simpleConfigure.reset();
  });

  it('adds no properties if no json files are given', function () {
    simpleConfigure.addFiles([]);
    expect(simpleConfigure.get('prop1')).to.be.undefined();
    expect(simpleConfigure.get('prop2')).to.be.undefined();
    expect(simpleConfigure.get('prop3')).to.be.undefined();
    expect(simpleConfigure.get('prop4')).to.be.undefined();
  });

  it('adds all properties from a json file', function () {
    simpleConfigure.addFiles([__dirname + '/testdata.json']);
    expect(simpleConfigure.get('prop1')).to.equal('value1');
    expect(simpleConfigure.get('prop2')).to.equal('value2');
  });

  it('adds all properties from a properties object', function () {
    simpleConfigure.addProperties({prop3: 'value3', prop4: 'value4'});
    expect(simpleConfigure.get('prop3')).to.equal('value3');
    expect(simpleConfigure.get('prop4')).to.equal('value4');
  });

  it('aggregates properties that are set independently', function () {
    simpleConfigure.addFiles([__dirname + '/testdata.json']);
    simpleConfigure.addProperties({prop3: 'value3', prop4: 'value4'});
    expect(simpleConfigure.get('prop1')).to.equal('value1');
    expect(simpleConfigure.get('prop2')).to.equal('value2');
    expect(simpleConfigure.get('prop3')).to.equal('value3');
    expect(simpleConfigure.get('prop4')).to.equal('value4');
  });

  it('overwrites properties when they are set twice (via file and object)', function () {
    simpleConfigure.addFiles([__dirname + '/testdata.json']);
    simpleConfigure.addProperties({prop2: 'value2new'});
    expect(simpleConfigure.get('prop1')).to.equal('value1');
    expect(simpleConfigure.get('prop2')).to.equal('value2new');
  });

  it('overwrites properties when they are set twice (via two objects)', function () {
    simpleConfigure.addProperties({prop3: 'value3', prop4: 'value4'});
    simpleConfigure.addProperties({prop3: 'value3new'});
    expect(simpleConfigure.get('prop3')).to.equal('value3new');
    expect(simpleConfigure.get('prop4')).to.equal('value4');
  });

  it('adds no properties if the given file does not exist', function () {
    simpleConfigure.addFiles(['nonexistent.txt']);
    expect(simpleConfigure.get('prop1')).to.be.undefined();
    expect(simpleConfigure.get('prop2')).to.be.undefined();
    expect(simpleConfigure.get('prop3')).to.be.undefined();
    expect(simpleConfigure.get('prop4')).to.be.undefined();
  });

});