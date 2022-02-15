/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
db.getCollection('AnnotationTask').aggregate([{ $match: { status: 2 } },
{ $group: { _id: "$assignedAnnotatorId", completed: { $sum: 1 } } }]).toArray().forEach(function (userStat) {
    db.AnnotationUser.update({ _id: userStat._id }, { $set: { "taskStats.completedCount": NumberInt(userStat.completed) } });
})
