#### git 新建分支并push到远程
```
git checkout -b dev(分支名)  // 新建分支并切换

git push origin dev(分支名)  // push分支到远程

git branch --set-upstream-to=origin/dev  // 设置默认提交或者拉取分支

git branch --unset-upstream master  // 取消对master的跟踪

```