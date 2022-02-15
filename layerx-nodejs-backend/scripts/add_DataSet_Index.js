/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
//add index to get data set video set
db.AnnotationDataSetGroup.createIndex({ "projectId": 1, "_id": 1 }, { name: "dataSet_videoSet" })

