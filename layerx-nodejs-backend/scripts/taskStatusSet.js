/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var taskArr = db.getCollection('AnnotationTask').find({}).toArray();

taskArr.forEach(function (task) {

    var status
    if (0 < task.completedFrames < task.frameCount) {
        status = 1
    }

    if (task.completedFrames == 0) {
        status = 0
    }
    if (task.completedFrames == task.frameCount) {
        status = 2
    }

    db.AnnotationTask.update({ _id: task._id }, { $set: { taskStatus: status } });

});
