module.exports = {
    extend: function (target, source, flag) {
        for (var key in source) {
            if (source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    flat: function (arr, keyArr, valKeyArr, valArr, newObjName) {
        let newArr = [];
        if(!arr) return newArr;
        for (let item of arr) {
            let index = indexOfArr(newArr, item, keyArr);//检查有没有新建的数组元素,返回索引
            if (index < 0) {//没有则新建
                index = newArr.length;
                newArr.push(setDNewElement(item, valArr))
                newArr[index][newObjName] = [];
            }
            let newItem = setNewElement(item, valArr);//将元素整合成新元素,准备加入新数组
            if (Object.keys(newItem).length > 0) {//判断这个元素是否为空
                if (valKeyArr.length > 0) {
                    if (indexOfArr(newArr[index][newObjName], newItem, valKeyArr) < 0) {//检查是否已经存在这个元素,是就跳过
                        newArr[index][newObjName].push(newItem);//在索引处插入新数据
                    }
                } else {
                    newArr[index][newObjName].push(newItem);
                }
            }
        }
        return newArr;
    },
    mapping: function (obj1, obj2, ignoreCase = false) {
        if (ignoreCase) {
            let propertyArr_obj1 = Object.getOwnPropertyNames(obj1);
            let propertyArr_obj2 = Object.getOwnPropertyNames(obj2);
            for (let item1 of propertyArr_obj1) {
                for (let item2 of propertyArr_obj2) {
                    if (item1.toUpperCase() === item2.toUpperCase()) {
                        obj1[item1] = obj2[item2];
                    }
                }
            }
        } else {
            for (itemName in obj2) {
                if (obj1[itemName]) {
                    obj1[itemName] = obj2[itemName];
                }
            }
        }
        return obj1;
    },
    left:(str,maxLength,joinStr="0")=>{
        return (Array(maxLength+1).join(joinStr) + str).slice(-m);
    }
}
function setDNewElement(item, diffKeyArr) {
    let newItem = {};
    for (key in item) {
        if (diffKeyArr.indexOf(key) < 0) {//判断是否为缩并的元素,如果不是就写入新数组的对象中
            newItem[key] = item[key];
        }
    }
    return newItem;
}

function setNewElement(item, keyArr) {
    let newItem = {};
    let counter = 0;//
    for (key in item) {
        if (keyArr.indexOf(key) >= 0) {//判断是否为缩并的元素,如果不是就写入新数组的对象中
            if (!item[key])
                counter++;
            newItem[key] = item[key];
        }
    }
    if (keyArr.length === counter)
        return {};
    else
        return newItem;
}

function indexOfArr(arr, item, keyArr) {
    let isExists = false;
    for (let i = 0; i < arr.length; i++) {
        isExists = true;
        for (let j = 0; j < keyArr.length; j++) {
            if (arr[i][keyArr[j]] != item[keyArr[j]]) {
                isExists = false;
                break;
            }
        }
        if (isExists) {
            return i;
        }
    }
    return -1;
}
