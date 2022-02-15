/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
db.getCollection('AnnotationHistory').aggregate([{ $match: { action: /save-frame/ } },
{ $project: { taskId: 1, dateTime: 1, action: { $split: ["$action", "#"] } } },
{ $group: { _id: { taskId: "$taskId", frame: { $last: "$action" } }, annotations: { $push: "$dateTime" } } },
{ $project: { firstAnnotation: { $first: "$annotations" } } }]).forEach(function (taskFrame) {
    db.AnnotationFrame.update({ taskId: taskFrame.taskId, frameId: NumberInt(taskFrame.frame) }, { $set: { annotatedAt: new Date(taskFrame.firstAnnotation) } });
})
