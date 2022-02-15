/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var c = db.AnnotationTask.find({ projectId: ObjectId("6131c5fce2ae93bb86979bcf"), completedFrames: { $gt: 0 } });
while (c.hasNext()) {
    var r = c.next();
    var countData = db.AnnotationFrame.aggregate([
        { $match: { taskId: r._id, isUserAnnotated: true } },
        { $unwind: "$boxes" },
        { $group: { _id: "$boxes.boundaries.label", count: { $sum: 1 } } },
        { $project: { label: "$_id", count: 1, _id: 0 } }
    ]).toArray();

    print(countData);

    var labelCounts = {
        "totalCount": countData[0].count,
        "labelList": [
            {
                "label": "Lap Sponge",
                "color": "#fff400",
                "count": countData[0].count
            }
        ]
    };
    db.AnnotationTask.update({ _id: r._id }, { $set: { labelCounts: labelCounts } });
}

