/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
//Add wildcard index for data grid
db.AnnotationFrame.createIndex({ "$**": 1 },
  {
    "wildcardProjection": {
      "taskId": 1,
      "awsExpiredDate": 1,
      "awsThumbnailExpiredDate": 1,
      "datasetVersions.versionId": 1,
      "datasetVersions.datasetType": 1,
      "boxes.boundaries.label": 1,
      "boxes.attributeValues": 1
    }
  })
//add index to aggregate data set versions related to a  data set
db.AnnotationDatasetVersion.createIndex({ "dataSetGroupId": 1 })

db.AnnotationFrame.createIndex(
  {
    "taskId": 1,
    "awsExpiredDate": 1,
    "awsThumbnailExpiredDate": 1,
    "datasetVersions": 1,
  })

db.AnnotationTask.createIndex(
  {
    "uploadId": 1
  })

//add index to get annotation data for developers
db.AnnotationFrame.createIndex({ "taskId": 1, " boxes.boundaries.label": 1 }, { name: " annotation_data_for_developers" })

db.AnnotationFrame.createIndex({ "taskId": 1 })

db.AnnotationTask.createIndex({ "projectId": 1 })

//get project list
db.AnnotationProject.createIndex({ "teamId": 1, "name": 1 }, { name: "project list" })

//get content progress
db.AnnotationContentUpload.createIndex({ "projectId": 1 }, { name: "content progress" })

//get team member list
db.AnnotationUser.createIndex({ "teamId": 1, "isAll": 1 }, { name: "team members" })
//dashboard stats
db.AnnotationUser.createIndex({ "userType": 1 }, { name: "dashboard stats" })
//user list
db.AnnotationUser.createIndex({ "userType": 1, "teamId": 1 }, { name: "user list" })
