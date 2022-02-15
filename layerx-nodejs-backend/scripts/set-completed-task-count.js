/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var c = db
  .getCollection('AnnotationTask')
  .find({
    projectId: ObjectId('6131c5fce2ae93bb86979bcf'),
    assignedAnnotatorId: { $exists: true },
  });
while (c.hasNext()) {
  var r = c.next();
  var completedCount = db.AnnotationFrame.count({
    taskId: r._id,
    isUserAnnotated: true,
  });
  var progressVal = (completedCount * 100) / r.frameCount;
  db.AnnotationTask.update(
    { _id: r._id },
    {
      $set: {
        completedFrames: completedCount,
        progress: progressVal,
        contentType: 1,
      },
    },
  );
}
