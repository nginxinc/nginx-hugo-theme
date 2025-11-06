
---
description: Callout - Lists
title: Callout - Lists
weight: 200
---


## Text with Ordered List in note

- **Using an instance's configuration for the group configuration**: If an instance is the first to join a config sync group and the group's configuration hasn't been defined, the instance’s configuration will become the group’s configuration. Any instances added later will automatically inherit this configuration. 

  {{< call-out "note" >}} If you add multiple instances to a single config sync group, simultaneously (with automation), follow these steps. Your instances will inherit your desired configuration:
  
  1. Create a config sync group.
  1. Add a configuration to the config sync group, so all instances inherit it.
  1. Add the instances in a separate operation.
  
  Your instances should synchronize with your desired configuration within 30 seconds. {{< /call-out >}}


## Text with Unordered List in note

- **Using an instance's configuration for the group configuration**: If an instance is the first to join a config sync group and the group's configuration hasn't been defined, the instance’s configuration will become the group’s configuration. Any instances added later will automatically inherit this configuration. 

  {{< call-out "note" >}} If you add multiple instances to a single config sync group, simultaneously (with automation), follow these steps. Your instances will inherit your desired configuration:
  
  - Create a config sync group.
  - Add a configuration to the config sync group, so all instances inherit it.
  - Add the instances in a separate operation.
  
  Your instances should synchronize with your desired configuration within 30 seconds. {{< /call-out >}}


## Callout within list

1. Open the JSON Web Token file you downloaded from [MyF5](https://my.f5.com/manage/s/subscriptions) and copy its contents. 

   {{<call-out "tip" "Copying the JWT token" "" >}} Make sure there are **no extra characters or spaces** when copying the contents of the JWT token: they can invalidate the token and cause 401 errors during authentication.{{</call-out>}}

2. Log in to the Docker registry using the contents of the JSON Web Token file:

   ```bash
   docker login private-registry.nginx.com --username=<JWT_CONTENTS> --password=none
   ```

