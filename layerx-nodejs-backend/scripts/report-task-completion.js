/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
db.getCollection('AnnotationTask').aggregate([{ $match: { projectId: ObjectId("6131c5fce2ae93bb86979bcf"), taskStatus: 1 } },
{ $project: { frameCount: 1, completedFrames: 1, videoDuration: 1, taskName: 1, start: { $divide: ["$frameStart", 30] } } }, { $sort: { taskName: 1, start: 1 } },
{ $project: { taskId: { $toString: "$_id" }, videoDuration: 1, taskName: 1, mins: { $floor: { $divide: ["$start", 60] } }, secs: { $round: { $mod: ["$start", 60] } } } }])
    .forEach(function (taskObj) {
        print(taskObj.taskId + ',' + taskObj.taskName + ',' + taskObj.videoDuration + ',' + taskObj.mins + ':' + taskObj.secs);
    });
