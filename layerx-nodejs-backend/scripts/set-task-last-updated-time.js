/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
db.getCollection('AnnotationHistory').aggregate([{ $group: { _id: "$taskId", lastUpdated: { $last: "$dateTime" } } }]).forEach(function (obj) {
    db.AnnotationTask.update({ _id: obj._id }, { $set: { updatedAt: obj.lastUpdated } });
});
