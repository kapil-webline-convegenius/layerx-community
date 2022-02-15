/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
let params = [
  { $match: { assignedAnnotatorId: new ObjectId(userId) } },
  { $lookup: { from: 'AnnotationFrame', foreignField: 'taskId', localField: '_id', as: 'frames' } },
  { $unwind: { path: '$frames' } },
  { $match: { updatedAt: { $gte: new Date(dayMonthYear) } } },
  { $project: { frameCount: { $size: "$frames.boxes" } } },
  { $group: { _id: null, count: { $sum: "$frameCount" } } },
]
return await this.aggregate(params);
