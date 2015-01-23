# simple-configure

A simple node.js configuration management module.

## Documentation

simple-configure is a node.js module that provides a simple container for properties. To create this container, simply require the module:

<pre>
var simpleConfigure = require('simple-configure');
</pre>

Thanks to require's singleton mechanism, this container is global, so wherever you require it, you get all properties that you added
somewhere else in your code - even if you added them in other modules.


### Inserting Properties into the Container

Properties can be entered in different ways:

#### From a JavaScript object:

<pre>
simpleConfigure.addProperties({property1: 'value1', property2: 'value2'});
</pre>

#### From one or more JSON files:

<pre>
simpleConfigure.addFiles(['default-properties.json', 'special-properties.json']);
</pre>

### Reading Properties from the Container

<pre>
var value = simpleConfigure.get('property1');
</pre>

### Replacing / Updating Properties that are already in the Container

In order to replace a property that has already been inserted into the container, just overwrite it by setting its new value.

### Resetting the Container

To remove all properties from the container, you can invoke

<pre>
simpleConfigure.reset();
</pre>

### Why is it called "simple"-configure?

Because it is really simple. This simplicity includes the following aspects:

#### No Namespaces

All properties are simply stored by their name - no matter how they were entered into the container. If you add two files or objects
that both contain the same property, the latter will overwrite the former.

#### Silent Failures

When you try to add a file that does not exist, there is no error or info message - the file is silently ignored.
When you try to add an empty object or an unsupported object, e.g. an array, `null` or `undefined`,
there is no error or info message - the object is silently ignored.

#### Silent Overwrite of Properties

If a property is overwritten by a subsequent addition, this happens silently - there are no error or info messages.
