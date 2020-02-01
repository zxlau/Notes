#### git 新建分支并push到远程
```
git checkout -b dev(分支名)  // 新建分支并切换

git push origin dev(分支名)  // push分支到远程

git branch --set-upstream-to=origin/dev  // 设置默认提交或者拉取分支

git branch --unset-upstream master  // 取消对master的跟踪

```

#### git 拉取远程分支
```
git fetch origin 远程分支名x:本地分支名x

git branch --set-upstream-to=origin/dev(远程分支名)

git branch --unset-upstream master 
```

#### git 本地项目关联远程仓库

```
git init

git remote add origin xx/xx/xx.git  (git 地址)

git push -u origin master
```

#### 开发中常用
```
git add .

git commit -m 'feat: update'

git fetch

git rebase

git push
```