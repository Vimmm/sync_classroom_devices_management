数据库密码：XiaoShuai@207
所有用户登录：
post /api/login
request {
    inputAccount,  varchar 输入账户
    inputPasswords,  varchar 输入密码
    inputIdentity   varchar 身份 （'user', 'school'）
}
response {
    教学点： "ID": , "account": , "passwords": 
    维修员、维修员： "ID": , "account":  , "passwords":  , "role": 
}

一、管理员
教学点管理：
1、get /api/getallSchool   获取所有教学点信息
query {}
response: [{
    Array(*,*,*,...)
    ID,name,type,location,tel,account,passwords,repairer,devices
}]

2、post /api/addSchool   添加教学点
request: {
    全部必传
    name,   教学点名称 varchar
    type,   教学点类型 （1：教学点，2：中心校） int
    location,  地址 varchar
    tel, 电话 varchar
    account,  varchar 登录账户  
    passwords varchar 登录密码
}
response: [{
    *
}]

3、post /api/saveSchool  编辑教学点基本信息
request : {
    全部必传
    ID,    该教学点ID  int
    name,  changed名称 varchar
    type,  changed类型 int
    location, changed地址 varchar
    tel, changed电话 varchar
    account,  varchar 登录账户  
    passwords varchar 登录密码
}
response: [{
    *
}]

4、post /api/saveDevice   编辑教学点的某一个设备的信息
request : {
    ID,    int 设备ID 必传
    name,   varchar 设备名称 必传
    deviceNumber,  varchar 设备编号  可空
    deviceModel,  varchar 设备型号  可空
    type, int 设备类型（1：屏幕 2：摄像头，3：话筒，4：多媒体计算机）
    productTime, double 生产日期
    startTime,  double 安装使用日期
    endTime,   double 预计报废日期
    school,  int 所属教学点ID
    deviceStatus int 设备状态：0正常，1待维修，2报废
}
response: [{
    *
}]

5、get /api/removeDevice 删除某一设备
query {ID}
response = {ctx.body='ok'}

6、get /api/removeSchool 删除某一教学点
query {ID}
response = {ctx.body='ok'}

7、post /api/addDevice  添加教学点的设备
request: {
    name,   varchar 设备名称 必传
    deviceNumber,  varchar 设备编号  可空
    deviceModel,  varchar 设备型号  可空
    type, int 设备类型（1：屏幕 2：摄像头，3：话筒，4：多媒体计算机）
    productTime, double 生产日期
    startTime,  double 安装使用日期
    endTime,   double 预计报废日期
    school,  int 所属教学点ID
    deviceStatus int 设备状态：0正常，1待维修，2报废
}
response: [{ * }]

维修员管理：
1、get /api/getallRepairer   获取所有维修员的信息
note:需要查教学点表去更新维修员的教学点分配信息
query {}
response: [{
    ID,name,address,tel,weixin,role,account,password,schools
}]

2、post /api/addRepairer   添加维修人员
note:需要查教学点表去更新维修员的教学点分配信息
request: {
    name,   varchar 名字
    address, varchar 地址
    tel, varchar 电话
    weixin, varchar 微信 可空
    role, int 角色(1：管理员 2：维修员)
    account, varchar 登陆账户
    password, varchar 登陆密码
    schools 管理的教学点 可空
},
response:{*,+ schools}

3、post /api/saveRepairer 编辑维修员信息
request {
    ID, int ID
    name,   varchar 名字
    address, varchar 地址
    tel, varchar 电话
    weixin, varchar 微信 可空
    role, int 角色(1：管理员 2：维修员)
    account, varchar 登陆账户
    password, varchar 登陆密码
    schools 管理的教学点ID 可空
}

4、get /api/removeRepairer 删除某一维修员
query {ID}
response = {ctx.body='ok'}


统计报表：
note: 查询维修记录表   
*****没做*****    get /api/get

站点维护：
*****没做*****   问题手册：
note:目前前端写死



二、教学点：
教学点信息：
1、get  /api/getSchool 查询单个教学点信息：
query: {
    account varchar 登录账号
}
response： {
    学校所有信息，（放在教学点信息Tab这里，√）
    设备信息（放在设备管理，第三个Tab那里）
}

2、post /api/saveSchool  编辑教学点基本信息（和管理员的接口是同一个）
request : {
     全部必传
    ID,    该教学点ID  int
    name,  changed名称 varchar
    type,  changed类型 int
    location, changed地址 varchar
    tel, changed电话 varchar
    account,  varchar 登录账户  不让修改账户
    passwords varchar 登录密码
}
response: [{
    *
}]


设备管理：（更新设备，包括添加和修改、删除等操作，以及申请报修）
1、get  /api/getSchool 查询单个教学点信息的全部设备：
query: {
    account varchar 登录账号
}
response： {
    学校所有信息，（放在教学点信息Tab这里）
    设备信息（放在设备管理，√）
}
2、post /api/saveDevice   编辑某一个设备的信息
request : {
    ID,    int 设备ID 必传
    name,   varchar 设备名称 必传
    deviceNumber,  varchar 设备编号  可空
    deviceModel,  varchar 设备型号  可空
    type, int 设备类型（1：屏幕 2：摄像头，3：话筒，4：多媒体计算机）
    productTime, double 生产日期
    startTime,  double 安装使用日期
    endTime,   double 预计报废日期
    school,  int 所属教学点ID
    deviceStatus int 设备状态：0正常，1待维修，2报废
}
response: [{
    *
}]
3、post /api/addDevice  添加设备
request: {
    name,   varchar 设备名称 必传
    deviceNumber,  varchar 设备编号  可空
    deviceModel,  varchar 设备型号  可空
    type, int 设备类型（1：屏幕 2：摄像头，3：话筒，4：多媒体计算机）
    productTime, double 生产日期
    startTime,  double 安装使用日期
    endTime,   double 预计报废日期
    school,  int 所属教学点ID
    deviceStatus int 设备状态：0正常，1待维修，2报废
}
response: [{ * }]

4、get /api/removeDevice 删除某一设备
query {ID}
response = {ctx.body='ok'}

5、post /api/applyRepair  选择某一设备发起维修申请
Note: 更改维修记录表，增加一条记录。
request: {
    学校ID,  int
    设备ID，  int
    申请文本， varchar
}
response { 
    repair_records 所有数据
}

6、post /api/changeDevicestatus   修改设备状态
request: {
    **deviceId,currentStatus, changedStatus**
    deviceId,  int 设备ID
    changedStatus  int 设备状态
}
设备状态：0正常，1待维修，2报废

常见问题手册
/***没做**/   get /api/get  写死

查询维修记录
note:缺一张页面，查询申请报修列表
1、get /api/getSchoolRepairecord   查询该教学点的所有申请报修列表（前端根据检修表的status分为已完成申请列表、未完成申请列表分开显示 查询）
query { schollId }  int 学校ID
response {
    repair_records表的所有数据
}

2、get /api/getRepairecord   查询某一条申请报修记录的状态
query { cordId }   int,维修表的ID
response: {
    该维修记录的所有数据
}


三、维修员:
1、get /api/getUserinfo  获取维修员信息
query: { account }
response {
    基本信息+schools(包括 所有设备)
}

2、post /api/saveUserinfo  修改维修员基本信息（address, tel, weixin,passwords，account不让修改，如有必要联系管理员修改）
request {
    ID,  Int 维修员ID  不可更改
    name, varchar 名字  不可更改
    address,  varchar 地址  
    tel,   varchar  电话  
    weixin,  varchar 微信
    role,  int 角色   不可更改
    account,  varchar 不可更改
    passwords  varchar 
}
response { * + schools(+device)} (如果该维修员没有分配教学点，则不存在schools数组)

3、get /api/getApplyrecords  获取所有申请信息
note: 查询repair_records检修表
request: {
    repairerID,  int  维修员的ID
}
response {
    repair_records表的所有数据 （可以根据维修表的status分为已完成订单和未完成订单，方便查询。）
}

4、post /api/changerecordstatus  修改某一记录的状态（通过修改按钮文本，让维修员点击按钮俩修改状态）
request: {
    ID, 维修记录表ID,
    changedStatus 修改后的状态,
    currentTime  当前时间,
    waiTime  点击接受申请时，提交，其余状态不提交
}
记录表状态：0等待受理（教学点发起申请，即生成一条记录，状态为0，修改create_time为发起时间），1接受申请， 2维修员到达， 3维修完成
