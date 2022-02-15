/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var c = db.getCollection('AnnotationTask').find({ projectId: ObjectId("6139e5f890c3e07972b20370") });
while (c.hasNext()) {
    var r = c.next();
    var actualCount = db.AnnotationFrame.count({ taskId: r._id });
    if (actualCount / r.frameCount >= 2) {
        var deletingCount = actualCount / 2;
        var arrLast = db.AnnotationFrame.find({ taskId: r._id }, { _id: 1 }).sort({ _id: -1 }).limit(deletingCount).toArray();
        print('Task ' + r._id.valueOf() + ': Deleting Count = ' + arrLast.length);
        var deleteIds = [];
        arrLast.forEach(function (obj) {
            deleteIds.push(obj._id);
        });
        //print(deleteIds);
        db.AnnotationFrame.remove({ _id: { $in: deleteIds } });
    }

    //db.AnnotationFrame.remove({
}
