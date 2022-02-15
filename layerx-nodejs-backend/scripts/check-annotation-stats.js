/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
db.getCollection('AnnotationHistory').aggregate([{ $match: { userId: ObjectId("6134a3376f9c44c4f8efb4ee"), dateTime: { $lt: new Date('2021-09-23'), $gt: new Date('2021-09-22') } } },
{ $sort: { dateTime: 1 } },
{ $group: { _id: { taskId: "$taskId", frame: "$action" }, annotatedDate: { $last: "$dateTime" }, annotations: { $last: "$data" } } },
{ $project: { date: "$annotatedDate", count: { $size: "$annotations.boxes" } } },
{ $group: { _id: null, total: { $sum: "$count" } } }])
