/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var c = db.getCollection('AnnotationTask').find({ projectId: ObjectId("6131c5fce2ae93bb86979bcf"), isDarkent: { $exists: false }, completedFrames: 0 }).sort({ taskName: 1 }).limit(1);
while (c.hasNext()) {
    var r = c.next();
    print('Checking ' + r._id.valueOf());

    var c0 = db.AnnotationTask.find({ projectId: ObjectId("614c0d6ac95e2b29fa3aa84c"), taskName: r.taskName });
    if (c0.hasNext()) {
        db.AnnotationFrame.remove({ taskId: r._id });
        //copy frames to new task
        var r0 = c0.next();
        var framesArr = db.AnnotationFrame.find({ taskId: r0._id }, { _id: 0 }).toArray();
        for (i = 0; i < framesArr.length; i++) {
            framesArr[i].taskId = r._id;
            framesArr[i].isUserAnnotated = false;
            framesArr[i].isAuto = true;
        }
        db.AnnotationTask.update({ _id: r._id }, { $set: { isAutoAnnotated: true, isDarkent: true, frameCount: framesArr.length } });
        print('Writing ' + framesArr.length + ' to task ' + r._id.valueOf());
        db.AnnotationFrame.insertMany(framesArr);
    } else {
        print('Task ' + r.taskName + ' not found');
    }
    //db.AnnotationFrame.updateMany({taskId: r._id},{$set:{isUserAnnotated: false }});
}
