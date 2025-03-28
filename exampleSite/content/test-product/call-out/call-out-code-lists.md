
---
description: Callout - Lists
title: Callout - Lists
weight: 200
---


## Text with Ordered List in note

- **Using an instance's configuration for the group configuration**: If an instance is the first to join a config sync group and the group's configuration hasn't been defined, the instance’s configuration will become the group’s configuration. Any instances added later will automatically inherit this configuration. 

  {{< note >}} If you add multiple instances to a single config sync group, simultaneously (with automation), follow these steps. Your instances will inherit your desired configuration:
  
  1. Create a config sync group.
  1. Add a configuration to the config sync group, so all instances inherit it.
  1. Add the instances in a separate operation.
  
  Your instances should synchronize with your desired configuration within 30 seconds. {{< /note >}}


## Text with Unordered List in note

- **Using an instance's configuration for the group configuration**: If an instance is the first to join a config sync group and the group's configuration hasn't been defined, the instance’s configuration will become the group’s configuration. Any instances added later will automatically inherit this configuration. 

  {{< note >}} If you add multiple instances to a single config sync group, simultaneously (with automation), follow these steps. Your instances will inherit your desired configuration:
  
  - Create a config sync group.
  - Add a configuration to the config sync group, so all instances inherit it.
  - Add the instances in a separate operation.
  
  Your instances should synchronize with your desired configuration within 30 seconds. {{< /note >}}