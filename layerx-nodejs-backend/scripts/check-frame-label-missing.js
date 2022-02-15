/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
db.AnnotationHistory.aggregate([
   { $match: { taskId: ObjectId("61363e4737a47c5692eb25f1"), dateTime: { $gt: new Date('2021-10-12') }, action: 'save-frame #54' } },
   {
      $project: {
         "dateTime": 1,
         "firstBox": {
            $filter: {
               input: "$data.boxes",
               as: "box",
               cond: { $eq: ["$$box.id", 0] }
            }
         }
      }
   },
   { $unwind: { path: "$firstBox" } },
   { $match: { "firstBox.boundaries.attributeValues.state": { $exists: true } } }
])
