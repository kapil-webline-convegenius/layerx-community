/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var tasks = db.getCollection('AnnotationTask').find({ projectId: ObjectId("6131c5fce2ae93bb86979bcf") }, { assignedAnnotatorId: 1, taskName: 1, taskStatus: 1 }).sort({ taskName: 1 }).toArray();
var prevTask = '';
for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskName == prevTask) {
        print('Duplicate task ' + tasks[i]._id.valueOf() + ', ' + tasks[i].taskName + ', assigned to ' + tasks[i].assignedAnnotatorId.valueOf() + ', status = ' + tasks[i].taskStatus);
    }
    prevTask = tasks[i].taskName;
}
