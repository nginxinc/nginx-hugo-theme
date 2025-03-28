---
description: Code Blocks - with root and non-root
title: Code Blocks - with root and non-root
weight: 200
---

## Example using `#`

```console
# chown -R unit:unit /path/to/app/  # User and group that Unit's router runs as by default
```

## Example using `$`

```console
   $ cd :nxt_ph:`/path/to/app/ <Path to the application directory; use a real path in your configuration>`
   $ :nxt_hint:`python3 --version <Make sure your virtual environment version matches the module version>`
         Python :nxt_hint:`3.Y.Z <Major version, minor version, and revision number>`
   $ python3 -m venv :nxt_hint:`venv <Arbitrary name of the virtual environment>`
   $ source :nxt_hint:`venv <Name of the virtual environment from the previous command>`/bin/activate
   $ pip install |app-pip-package|
   $ deactivate
```
