/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
function getReadableTime(seconds) {
  var sec_num = Math.round(seconds);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

var taskArr = db.getCollection('AnnotationTask').aggregate([{ $match: { projectId: ObjectId("6131c5fce2ae93bb86979bcf"), taskName: /WIN/ } },
{ $lookup: { from: "AnnotationContentUpload", localField: "uploadId", "foreignField": "_id", as: "upload" } }, { $unwind: { path: "$upload" } },
{
  $project: {
    taskId: { $toString: "$_id" }, frameCount: 1, completedFrames: 1, taskStatus: 1, videoDuration: 1, taskName: 1, clip: "$upload.clipName",
    start: { $divide: ["$frameStart", 30] }, end: { $divide: ["$frameEnd", 30] }
  }
}, { $sort: { uploadId: 1, taskName: 1 } }])
  .toArray();
for (i = 0; i < taskArr.length; i++) {
  //(function(taskObj){
  var taskObj = taskArr[i];
  var nameArr = taskObj.taskName.split('-');
  taskArr[i].clipNumber = -1;
  if (nameArr[1]) {
    taskArr[i].clipNumber = NumberInt(nameArr[1]);
  }

}
var outArr = taskArr.sort(function (a, b) {
  //if(a.clip == b.clip)
  //return a.clipNumber > b.clipNumber;
  //else
  return a.clip - b.clip;
});

for (i = 0; i < outArr.length; i++) {
  //(function(taskObj){
  var taskObj = outArr[i];
  print(taskObj.taskId + ',' + taskObj.clip + ',' + taskObj.clipNumber + ',' + taskObj.frameCount + ',' + taskObj.videoDuration + ',' +
    getReadableTime(taskObj.start) + ',' + getReadableTime(taskObj.end) + "," + (taskObj.taskStatus == 2 ? 'Done' : ''));
}
