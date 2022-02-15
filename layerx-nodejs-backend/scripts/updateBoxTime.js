/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var annotatorList = db.AnnotationUser.find({ "userType": 0 }).toArray()

//var annotator = ObjectId("616e57454383f42fa9e06364")

for (let obj of annotatorList) {

    var y = { _id: obj._id }

    //var annotator = obj._id

    //print(y)

    var boxArray = db.getCollection('AnnotationTask').aggregate([

        { $match: { "assignedAnnotatorId": y._id } },

        { $lookup: { from: 'AnnotationFrame', localField: '_id', foreignField: 'taskId', as: 'frames' } },

        { $project: { frames: 1 } },

        { $unwind: "$frames" }

    ]).toArray()

    //print(boxArray);

    var array = []

    for (let item of boxArray) {

        for (let i in item.frames.boxes) {

            if (item.frames.boxes[i].boundaries.label == "Lap Sponge") {

                item.frames.boxes[i].boundaries.createdAt = item.frames.annotatedAt;

                item.frames.boxes[i].boundaries.annotatorId = y._id

            }
        }

        array.push(item)

    }



    for (let i in boxArray) {

        if (boxArray[i].frames) {

            //print(boxArray[i].frames)

            var x = { _id: boxArray[i].frames._id }



            db.AnnotationFrame.updateOne({ _id: x._id }, { $set: { boxes: boxArray[i].frames.boxes } })

        }
    }

}
