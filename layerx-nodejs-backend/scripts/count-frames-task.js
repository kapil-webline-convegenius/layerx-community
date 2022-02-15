/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var c = db.getCollection('AnnotationTask').find({ projectId: ObjectId("6131c5fce2ae93bb86979bcf") })
while (c.hasNext()) {
    var r = c.next();
    var originalLen = JSON.parse(r.original_frames).length;
    if (r.frameCount != originalLen) {
        print('Mismatch: id = ' + r._id.valueOf() + ", original = " + originalLen + ", count = " + r.frameCount);
    }
}
