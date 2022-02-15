/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
db.getCollection('AnnotationFrame').aggregate([{ $match: { taskId: ObjectId("614b2756fa84a977fcc41d97"), "boxes.boundaries.attributeValues.state": { $in: ["Disposed", "Improper Disposal"] } } },
{ $unwind: { path: '$boxes' } },
{ $match: { "boxes.boundaries.attributeValues.state": { $in: ["Disposed", "Improper Disposal"] } } },
{ $count: 'total' }
])
