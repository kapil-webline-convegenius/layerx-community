/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var c = db.getCollection('AnnotationTask').find({ isAutoAnnotated: true }).sort({ completedFrames: -1 });
while (c.hasNext()) {
    var r = c.next();
    var actualCount = db.AnnotationFrame.count({ taskId: r._id });
    if (actualCount > 120) {
        print('invalid count in ' + r._id.valueOf());
        db.AnnotationFrame.remove({ taskId: r._id, frameId: 1 });

    }
    //Check whether 1st frame is there
    var c0 = db.AnnotationFrame.find({ taskId: r._id, frameId: { $gt: 1 } }).sort({ frameId: 1 }).limit(1);
    if (c0.hasNext()) {
        var firstFrame = c0.next();
        if (firstFrame.frameId == 3) {
            print('Correcting frame ids in ' + r._id.valueOf());
            db.AnnotationFrame.updateMany({ taskId: r._id }, { $inc: { frameId: -1 } });
        }
    }
}
