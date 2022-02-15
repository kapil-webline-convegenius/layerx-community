/*
 * Copyright (c) 2022 ZOOMi Technologies Inc.
 *
 * all rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in the root directory of this source tree.
 *
 */
db.getCollection('AnnotationFrame').update({ "boxes.boundaries.attributeValues.state": "Grouped" },
  { $set: { "boxes.$[elem].boundaries.attributeValues.state": "Set" } },
  { multi: true, arrayFilters: [{ "elem.boundaries.attributeValues.state": "Grouped" }] })
