/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
db.AnnotationTask.find({ projectId: ObjectId("6131c5fce2ae93bb86979bcf"), status: { $gt: 1 } }).toArray().forEach(function (task) {
    db.getCollection('AnnotationFrame').updateMany({ taskId: task._id, isUserAnnotated: true, boxes: { $elemMatch: { "boundaries.label": "" } } },
        { $pull: { boxes: { "boundaries.label": "" } } });
});
