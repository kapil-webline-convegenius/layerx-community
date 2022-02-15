/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
//add label text and value test for projects
var projectArray = db.getCollection('AnnotationProject').find({ labels: { $exists: true, $not: { $size: 0 } } }).toArray();
var matchedCount = 0;
var modifiedCount = 0;
projectArray.forEach(function (project) {


  for (var label of project.labels) {
    label.labelText = label.label;
    for (var index in label.attributes) {
      label.attributes[index].labelText = label.attributes[index].label;
      for (var k in label.attributes[index].values) {
        label.attributes[index].values[k].valueText = label.attributes[index].values[k].valueName;
      }
    }
  }

  var update = db.AnnotationProject.update({ _id: project._id }, { $set: { labels: project.labels } });

  matchedCount += update.nMatched;
  modifiedCount += update.nModified;
});

print({
  matchedCount: matchedCount,
  modifiedCount: modifiedCount
})
