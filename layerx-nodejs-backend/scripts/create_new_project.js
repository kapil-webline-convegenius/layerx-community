/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
var tasksArray = db.getCollection('AnnotationTask').find({ projectId: { $in: [ObjectId("6131c5fce2ae93bb86979bcf"), ObjectId("6135a746e2ae93bb869a3932")] } }).toArray()
//print(tasksArray)
var projectId = ObjectId("61ded782aa3ddcc1df433362")
for (var i in tasksArray) {
    tasksArray[i].projectId = projectId
    tasksArray[i].status = 0
    tasksArray[i].createdAt = new Date()
    tasksArray[i].updatedAt = new Date()
    tasksArray[i].taskStatus = 0
    tasksArray[i].auditStatus = 0
    tasksArray[i].completedFrames = 0
    tasksArray[i].progress = 0
    tasksArray[i].isAutoAnnotated = false
    delete tasksArray[i]._id
    delete tasksArray[i].labelCounts
    delete tasksArray[i].datasetVersions
    delete tasksArray[i].assignedAnnotatorId
    delete tasksArray[i].completedAt
    db.getCollection('AnnotationTask').insert(tasksArray[i])
}
