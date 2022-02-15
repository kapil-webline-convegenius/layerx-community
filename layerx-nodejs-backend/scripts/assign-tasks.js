/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */var tasks = db.getCollection('AnnotationTask').find({ projectId: ObjectId("6131c5fce2ae93bb86979bcf"), status: 0, assignedAnnotatorId: ObjectId("6134a4106f9c44c4f8efb4ef") }).sort({ uploadId: 1 }).limit(5).toArray();
tasks.forEach(function (task) {
    db.AnnotationTask.update({ _id: task._id }, { $set: { assignedAnnotatorId: ObjectId("61512fd6aa479f0666575ef6") } });
});
