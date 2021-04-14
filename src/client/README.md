# Client

### Dependencies
##### Nodejs version 12 or greater
https://nodejs.org/en/download/
##### Expo
```npm install -g expo-cli```

##### Hopefully only for linux users
If you are using **vscode** you need to change number of files that is allowed to be monitored by the filesystem.   

To change it on Debian based flavour

```sudo vi /etc/sysctl.conf```

Add a line at the bottom

```fs.inotify.max_user_watches=524288```

Then save and exit!

```sudo sysctl -p```

to check it

Answer taken from: https://stackoverflow.com/questions/55763428/react-native-error-enospc-system-limit-for-number-of-file-watchers-reached


### How to run the app 
Be inside the client directory and run: ```make start```  
Then you need to login to expo with: 
* Email: ```illumise420@gmail.com```
* Password: ```expologin123```






