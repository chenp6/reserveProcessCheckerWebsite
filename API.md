## 備取進度資料API

### 1. 取得學校學年考試列表
- **Method / Path**: `GET /getExamSelect`
- **Query 參數**
  - `school` (必填)：學校編號。 (ex:`NTU`)
- **成功回應**：
    - `name`：學年考試名稱。
    - `examNo`：考試編號。
```json
[
    {
        "_id": "69282729648b20f8a3111014",
        "name": "115學年度碩士班甄試",
        "school": "NTU",
        "examNo": "regchk/stu_query",
        "year": "115"
    },
    {
        "_id": "67e60722afa7075ec4adf7b5",
        "name": "114學年度碩士班一般考試",
        "school": "NTU",
        "examNo": "regbchk/stu_query",
        "year": "114"
    },
    ...
]
```

### 2. 取得(所有)系所組別之備取進度列表
- **Method / Path**: `GET /getGroupSelect`
- **Query 參數**
  - `school` (必填)：學校編號。(ex:`NTU`)
  - `examNo` (必填)：考試編號。(ex:`regchk/stu_query`)
  - `year` (必填)：學年。(ex:`115`)
- **成功回應**：
    - `currentReserve`：目前備取進度。
    - `name`：系所/組別名稱。
    - `registered`：目前報到人數。
    - `want`：正取人數。
    - `groupNo`：系所組別編號。
```json
[
    {
        "_id": "692826712a3ed189580206dd",
        "name": "1010中國文學系碩士班",
        "currentReserve": "尚未有遞補名額",
        "registered": 8,
        "want": 8,
        "year": "115",
        "school": "NTU",
        "examNo": "regchk/stu_query",
        "groupNo": "1010"
    },
    {
        "_id": "692826722a3ed189580206f0",
        "name": "1020外國語文學系碩士班",
        "currentReserve": "尚未有遞補名額",
        "registered": 9,
        "want": 9,
        "year": "115",
        "school": "NTU",
        "examNo": "regchk/stu_query",
        "groupNo": "1020"
    },
    ...
```
### 3. 取得單一系所組別之備取進度
- **Method / Path**: `GET /getReserveProcess`
- **Query 參數**
  - `school` (必填)：學校編號。
  - `examNo` (必填)：考試編號。
  - `groupNo` (必填)：系所組別編號。
  - `year` (必填)：學年。
- **成功回應**：
    - `currentReserve`：目前備取進度。
    - `name`：系所/組別名稱。
    - `registered`：目前報到人數。
    - `want`：正取人數。
    - `groupNo`：系所組別編號。
```
    {
        "_id": "692826712a3ed189580206dd",
        "name": "1010中國文學系碩士班",
        "currentReserve": "尚未有遞補名額",
        "registered": 8,
        "want": 8,
        "year": "115",
        "school": "NTU",
        "examNo": "regchk/stu_query",
        "groupNo": "1010"
    }
```


### 4. 取得使用者備取進度
- **Method / Path**: `GET /getUserRank`
- **Query 參數**
  - `groupId` (必填)：`school`_`groupNo`。
  - `userId` (必填)： 考生編號/准考證號碼。
  - `year` (必填)：學年。
- **成功回應**：
    - `rank`：實際排名。
    - `status`：目前備取狀態。
    - `year`：學年。
    - `userId`：考生編號/准考證號碼。
    - `groupNo`：系所組別編號。
```
{
    "_id": "692826712a3ed189580206d7",
    "index": 1,
    "rank": "正取1-1",
    "status": "已報到",
    "year": "115",
    "groupId": "NTU_regchk/stu_query_1010",
    "userId": "1010028"
}
```

### 5. 取得資料更新時間
- **Method / Path**: `GET /getUpdateTime`
- **Query 參數**
  - `school` (必填)：學校編號。
  - `examNo` (必填)：考試編號。
  - `year` (必填)：學年。
- **成功回應**：
  -`time`：資料更新時間
```
{
    "_id": "69282729648b20f8a3111015",
    "time": "2025-12-04 13:37:43",
    "school": "NTU",
    "examNo": "regchk/stu_query",
    "year": "115"
}
```
## 無相應回應
```json
{
  "result": null
}
```
