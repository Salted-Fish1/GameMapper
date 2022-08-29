/* 新建类型 */
INSERT INTO
    type (name, type)
VALUES
    ("赐福", 0),
    ("捷径", 0),
    ("半神BOSS", 1),
    ("红灵", 1),
    ("黄金种子", 2),
    ("死根", 2);

/* 新建地点 */
INSERT INTO
    location (x, y)
VALUES
    (?, ?);

/* 查询地点 */
SELECT
    *
FROM
    location
WHERE
    x = ?
    AND y = ?;

/* 新建讯息 */
INSERT INTO
    message(name, desc, loc_id, type_id, eval_id)
VALUES
    (?, ?, ?, ?, ?);