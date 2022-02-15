/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var c = db.getCollection('AnnotationTask').find({ projectId: ObjectId("6131c5fce2ae93bb86979bcf") });
while (c.hasNext()) {
    var r = c.next();
    var actualCount = db.AnnotationFrame.count({ taskId: r._id, isUserAnnotated: true });
    var totalCount = db.AnnotationFrame.count({ taskId: r._id });

    if (r.completedFrames < actualCount) {
        print('incorrect completed count in ' + r._id.valueOf() + ': actual count = ' + actualCount);
    }

    if (r.frameCount < totalCount) {
        print('incorrect total count in ' + r._id.valueOf() + ': correct count = ' + totalCount);
    }

}
