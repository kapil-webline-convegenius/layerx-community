/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
db.getCollection('AnnotationTask').aggregate([{
    $match: {
        projectId: ObjectId("6131c5fce2ae93bb86979bcf"), taskStatus: 2,
        assignedAnnotatorId: ObjectId("6134a4106f9c44c4f8efb4ef")
    }
},
{ $lookup: { from: 'AnnotationFrame', foreignField: 'taskId', localField: '_id', as: 'frames' } },
{ $unwind: { path: '$frames' } }]),
    { $project: { frameCount: { $size: "$frames.boxes" } } },
    { $group: { _id: null, count: { $sum: "$frameCount" } } }])
