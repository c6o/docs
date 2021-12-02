## Creating a Development Profile

A development profile is created through running CLI commands with a --save-profile flag:

```bash
➜  czctl namespace teleport sample-project -f env.sh --save-profile profile1.yaml

Command has been saved to a Development Profile. (profile1.yaml)
```

### Appending More

Commands can be added by running another command and saving to the same profile with a "save-profile-mode" flag 
with the value "append". Other values for this falg are 'create' amd 'replace'.

```bash
➜  czctl service intercept sample-project-core -n sample-project --save-profile profile1.yaml --save-profile-mode append

Command has been saved to a Development Profile. (profile1.yaml)
```

If you forget this flag, the CLI will ask you if you are
appending or replacing the contents of the Development Profile file.

```bash
czctl service intercept sample-project-leaf -n sample-project --save-profile profile1.yaml
? This profile already exists.  What would you like to do with the existing profile? (Use arrow keys)
❯ append 
  replace 
```

