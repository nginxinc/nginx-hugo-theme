---
description: Table - Bootstrap
title: Table - Bootstrap
weight: 100
---


{{< bootstrap-table "table table-striped table-bordered" >}}

| Field        | Datatype | Possible Values     | Description                                        | Required | Default               |
|--------------|----------|---------------------|----------------------------------------------------|----------|-----------------------|
| `users.id`   | integer  | A unique int >= 1   | {{ <note> }}Description for value. {{ </note> }}                             | Yes      | System assigned       |
| `users.name` | string   | Example: `Jane Doe` | A short description of what the field is used for. | Yes      | Add the default value |
| `user.age`   | integer  | 1–110               | Description for the value                          | Yes      |                       |

{{< /bootstrap-table >}}