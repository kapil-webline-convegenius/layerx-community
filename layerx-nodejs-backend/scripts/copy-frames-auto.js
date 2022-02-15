/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var c = db.getCollection('AnnotationTask').find({ projectId: ObjectId("6131c5fce2ae93bb86979bcf"), isDuplicate: { $exists: false } }).sort({ taskName: 1, progress: -1 }).limit(100);
var prevTaskName = false;
while (c.hasNext()) {
    var r = c.next();
    print('Checking ' + r.taskName);
    if (r.taskName == prevTaskName) {
        print('Duplicate task ' + r._id.valueOf());
        if (r.progress == 0) {
            db.AnnotationTask.update({ _id: r._id }, { $set: { isDuplicate: true } });
        } else {
            print('Already annotated ' + r.completedFrames);
        }
    }
    prevTaskName = r.taskName;
    if (r.completedFrames > 0) {
        continue;
    }
    var c0 = db.AnnotationTask.find({ projectId: ObjectId("6139e5f890c3e07972b20370"), taskName: r.taskName });
    if (c0.hasNext()) {
        //copy frames to new task
        var r0 = c0.next();
        var framesArr = db.AnnotationFrame.find({ taskId: r0._id }, { _id: 0 }).toArray();
        for (i = 0; i < framesArr.length; i++) {
            framesArr[i].taskId = r._id;
            framesArr[i].isUserAnnotated = false;
            framesArr[i].isAuto = true;
        }
        db.AnnotationTask.update({ _id: r._id }, { $set: { isAutoAnnotated: true, frameCount: framesArr.length } });
        print('Writing ' + framesArr.length + ' to task ' + r._id.valueOf());
        db.AnnotationFrame.insertMany(framesArr);
    } else {
        print('Task ' + r.taskName + ' not found');
    }
    //db.AnnotationFrame.updateMany({taskId: r._id},{$set:{isUserAnnotated: false }});
}
