"use strict";
(self["webpackChunkvelodb_doris_app"] = self["webpackChunkvelodb_doris_app"] || []).push([[590],{

/***/ 6472
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ withErrorHandler)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1269);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7045);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7708);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4749);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9071);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}





const GLOBAL_ERROR_KEY = 'global_request_error';
function showGlobalError(msg) {
    antd__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.error({
        content: msg,
        key: GLOBAL_ERROR_KEY,
        duration: 3
    });
}
function getFirstResultError(data) {
    const results = data === null || data === void 0 ? void 0 : data.results;
    if (!results) {
        return undefined;
    }
    const refId = Object.keys(results).find((key)=>{
        var _results_key, _results_key1;
        return ((_results_key = results[key]) === null || _results_key === void 0 ? void 0 : _results_key.error) || ((_results_key1 = results[key]) === null || _results_key1 === void 0 ? void 0 : _results_key1.status) >= 400;
    });
    if (!refId) {
        return undefined;
    }
    return _object_spread({
        refId
    }, results[refId]);
}
function getErrorText(error) {
    var _error_response, _responseData_error;
    const responseData = (error === null || error === void 0 ? void 0 : error.data) || (error === null || error === void 0 ? void 0 : (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.data);
    const resultError = getFirstResultError(responseData);
    return (error === null || error === void 0 ? void 0 : error.backendError) || (resultError === null || resultError === void 0 ? void 0 : resultError.error) || (responseData === null || responseData === void 0 ? void 0 : (_responseData_error = responseData.error) === null || _responseData_error === void 0 ? void 0 : _responseData_error.message) || (responseData === null || responseData === void 0 ? void 0 : responseData.message) || (error === null || error === void 0 ? void 0 : error.statusText) || (error === null || error === void 0 ? void 0 : error.message) || 'Request failed';
}
function createBackendError(res, defaultMessage) {
    const resultError = getFirstResultError(res === null || res === void 0 ? void 0 : res.data);
    const err = new Error(getErrorText({
        data: res === null || res === void 0 ? void 0 : res.data,
        statusText: res === null || res === void 0 ? void 0 : res.statusText,
        message: defaultMessage
    }));
    err.name = 'BackendQueryError';
    err.data = res === null || res === void 0 ? void 0 : res.data;
    err.status = res === null || res === void 0 ? void 0 : res.status;
    err.statusText = res === null || res === void 0 ? void 0 : res.statusText;
    err.backendError = resultError === null || resultError === void 0 ? void 0 : resultError.error;
    err.backendStatus = resultError === null || resultError === void 0 ? void 0 : resultError.status;
    err.errorSource = resultError === null || resultError === void 0 ? void 0 : resultError.errorSource;
    err.refId = resultError === null || resultError === void 0 ? void 0 : resultError.refId;
    return err;
}
function withErrorHandler(source$, options) {
    const { showBackendError = true, defaultMessage = 'Request failed' } = options || {};
    return source$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__/* .map */ .T)((res)=>{
        const resultError = getFirstResultError(res === null || res === void 0 ? void 0 : res.data);
        if ((res === null || res === void 0 ? void 0 : res.ok) === false || resultError) {
            throw createBackendError(res, defaultMessage);
        }
        return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__/* .catchError */ .W)((err)=>{
        (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__.logError)((0,_utils_errors__WEBPACK_IMPORTED_MODULE_5__/* .toError */ .i)(err), {
            source: 'withErrorHandler'
        });
        if (showBackendError) {
            showGlobalError(getErrorText(err));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.throwError)(()=>err);
    }));
}


/***/ },

/***/ 7116
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ho: () => (/* binding */ filterDatasourcesByTeamPermissions),
/* harmony export */   jS: () => (/* binding */ fetchTeams),
/* harmony export */   lp: () => (/* binding */ fetchCurrentUserTeams),
/* harmony export */   tH: () => (/* binding */ getMysqlDatasources)
/* harmony export */ });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1269);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}


function fetchCurrentUserTeams() {
    return _async_to_generator(function*() {
        const response = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.lastValueFrom)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.getBackendSrv)().fetch({
            url: '/api/user/teams',
            method: 'GET'
        }));
        return Array.isArray(response.data) ? response.data : [];
    })();
}
function fetchTeams() {
    return _async_to_generator(function*() {
        var _response_data;
        const response = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.lastValueFrom)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.getBackendSrv)().fetch({
            url: '/api/teams/search?perpage=100&page=1',
            method: 'GET'
        }));
        return Array.isArray((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.teams) ? response.data.teams : [];
    })();
}
function getMysqlDatasources(datasources) {
    return datasources.filter((ds)=>ds.type === 'mysql');
}
function filterDatasourcesByTeamPermissions(datasources, teams, permissions = []) {
    const mysqlDatasources = getMysqlDatasources(datasources);
    if (teams.length === 0) {
        return mysqlDatasources;
    }
    const teamIds = new Set(teams.map((team)=>team.id));
    const allowedDatasourceUids = new Set();
    permissions.forEach((permission)=>{
        if (!teamIds.has(permission.teamId)) {
            return;
        }
        permission.datasourceUids.forEach((uid)=>{
            if (uid) {
                allowedDatasourceUids.add(uid);
            }
        });
    });
    return mysqlDatasources.filter((ds)=>allowedDatasourceUids.has(ds.uid));
}


/***/ },

/***/ 8161
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dr: () => (/* binding */ getInvertedIndexColumns),
/* harmony export */   H1: () => (/* binding */ getFieldsService),
/* harmony export */   Hm: () => (/* binding */ getDatabases),
/* harmony export */   Rw: () => (/* binding */ getTablesService),
/* harmony export */   UD: () => (/* binding */ getApplicationValuesService),
/* harmony export */   bf: () => (/* binding */ getColumn),
/* harmony export */   s1: () => (/* binding */ getIndexesService)
/* harmony export */ });
/* unused harmony exports getApplicationValuesSQL, getColumnFromFieldService */
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7781);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1269);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6472);
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9071);
/* harmony import */ var _utils_sql_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2721);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = {}, sourceKeys, key, i;
    if (typeof Reflect !== "undefined" && Reflect.ownKeys) {
        sourceKeys = Reflect.ownKeys(Object(source));
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
        return target;
    }
    target = _object_without_properties_loose(source, excluded);
    if (Object.getOwnPropertySymbols) {
        sourceKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {}, sourceKeys = Object.getOwnPropertyNames(source), key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
    }
    return target;
}






const escapeSqlLiteral = (value)=>value.replace(/'/g, "''");
const normalizeColumnType = ({ dataType, columnType })=>{
    const source = (columnType || dataType || '').trim();
    if (!source) {
        return '';
    }
    const lower = source.toLowerCase();
    if (lower.startsWith('nullable(') && lower.endsWith(')')) {
        const inner = source.slice(9, -1);
        const normalizedInner = normalizeColumnType({
            dataType: inner,
            columnType: undefined
        });
        return normalizedInner ? `Nullable(${normalizedInner})` : source;
    }
    if (lower.startsWith('map')) {
        return source.replace(/^map/i, 'Map');
    }
    if (lower.startsWith('array')) {
        return source.replace(/^array/i, 'Array');
    }
    if (lower.startsWith('json')) {
        return 'JSON';
    }
    if (lower.startsWith('variant')) {
        return 'Variant';
    }
    if (lower === 'bool' || lower === 'boolean' || lower.startsWith('tinyint(1)')) {
        return 'Bool';
    }
    if (lower.startsWith('tinyint')) {
        return 'Int8';
    }
    if (lower.startsWith('smallint')) {
        return 'Int16';
    }
    if (lower.startsWith('mediumint')) {
        return 'Int32';
    }
    if (lower.startsWith('bigint') || lower.startsWith('int') || lower.startsWith('integer')) {
        return 'Int64';
    }
    if (lower.startsWith('float') || lower.startsWith('double') || lower.startsWith('real')) {
        return 'Float64';
    }
    if (lower.startsWith('decimal') || lower.startsWith('numeric')) {
        return 'Float64';
    }
    if (lower.startsWith('date')) {
        return source.replace(/^date/i, 'Date');
    }
    if (lower.startsWith('timestamp') || lower.startsWith('datetime')) {
        return 'DateTime';
    }
    if (lower.startsWith('enum')) {
        return source.replace(/^enum/i, 'Enum');
    }
    if (lower.startsWith('uuid')) {
        return 'UUID';
    }
    if (lower.startsWith('ipv4')) {
        return 'IPv4';
    }
    if (lower.startsWith('ipv6')) {
        return 'IPv6';
    }
    if (lower.startsWith('tuple')) {
        return source.replace(/^tuple/i, 'Tuple');
    }
    if (lower.startsWith('struct')) {
        return source.replace(/^struct/i, 'Tuple');
    }
    if (lower.startsWith('char') || lower.startsWith('varchar') || lower.startsWith('text') || lower.startsWith('string')) {
        return 'String';
    }
    return source;
};
function getColumn(_0) {
    return _async_to_generator(function*({ connectionId, database, table, column, datasourceType = 'mysql' }) {
        if (!connectionId || !database || !table || !column) {
            return null;
        }
        const query = `
SELECT
  COLUMN_NAME AS Field,
  DATA_TYPE AS DataType,
  COLUMN_TYPE AS ColumnType
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = '${escapeSqlLiteral(database)}'
  AND TABLE_NAME = '${escapeSqlLiteral(table)}'
  AND COLUMN_NAME = '${escapeSqlLiteral(column)}'
LIMIT 1;
`;
        const response$ = (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getBackendSrv)().fetch({
            url: '/api/ds/query',
            method: 'POST',
            data: {
                queries: [
                    {
                        refId: 'getColumn',
                        datasource: {
                            type: datasourceType,
                            uid: connectionId
                        },
                        rawSql: query,
                        format: 'table'
                    }
                ]
            }
        }));
        try {
            var _dataFrame_fields_find;
            var _resultData_results_getColumn_frames, _resultData_results_getColumn, _resultData_results, _nameField_values_get, _nameField_values, _dataTypeField_values_get, _dataTypeField_values, _columnTypeField_values_get, _columnTypeField_values;
            const { data, ok } = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.lastValueFrom)(response$);
            if (!ok) {
                return null;
            }
            const resultData = data;
            const frame = resultData === null || resultData === void 0 ? void 0 : (_resultData_results = resultData.results) === null || _resultData_results === void 0 ? void 0 : (_resultData_results_getColumn = _resultData_results.getColumn) === null || _resultData_results_getColumn === void 0 ? void 0 : (_resultData_results_getColumn_frames = _resultData_results_getColumn.frames) === null || _resultData_results_getColumn_frames === void 0 ? void 0 : _resultData_results_getColumn_frames[0];
            if (!frame) {
                return null;
            }
            const dataFrame = (0,_grafana_data__WEBPACK_IMPORTED_MODULE_0__.toDataFrame)(frame);
            const nameField = (_dataFrame_fields_find = dataFrame.fields.find((field)=>field.name === 'Field')) !== null && _dataFrame_fields_find !== void 0 ? _dataFrame_fields_find : dataFrame.fields[0];
            const dataTypeField = dataFrame.fields.find((field)=>field.name === 'DataType');
            const columnTypeField = dataFrame.fields.find((field)=>field.name === 'ColumnType');
            const name = nameField === null || nameField === void 0 ? void 0 : (_nameField_values = nameField.values) === null || _nameField_values === void 0 ? void 0 : (_nameField_values_get = _nameField_values.get) === null || _nameField_values_get === void 0 ? void 0 : _nameField_values_get.call(_nameField_values, 0);
            if (!name) {
                return null;
            }
            const dataTypeValue = dataTypeField === null || dataTypeField === void 0 ? void 0 : (_dataTypeField_values = dataTypeField.values) === null || _dataTypeField_values === void 0 ? void 0 : (_dataTypeField_values_get = _dataTypeField_values.get) === null || _dataTypeField_values_get === void 0 ? void 0 : _dataTypeField_values_get.call(_dataTypeField_values, 0);
            const columnTypeValue = columnTypeField === null || columnTypeField === void 0 ? void 0 : (_columnTypeField_values = columnTypeField.values) === null || _columnTypeField_values === void 0 ? void 0 : (_columnTypeField_values_get = _columnTypeField_values.get) === null || _columnTypeField_values_get === void 0 ? void 0 : _columnTypeField_values_get.call(_columnTypeField_values, 0);
            const columnInfo = {
                name: String(name),
                dataType: dataTypeValue != null ? String(dataTypeValue) : undefined,
                columnType: columnTypeValue != null ? String(columnTypeValue) : undefined
            };
            const normalizedType = normalizeColumnType({
                dataType: columnInfo.dataType,
                columnType: columnInfo.columnType
            });
            return _object_spread_props(_object_spread({}, columnInfo), {
                normalizedType
            });
        } catch (error) {
            (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.logError)((0,_utils_errors__WEBPACK_IMPORTED_MODULE_4__/* .toError */ .i)(error), {
                source: 'metaservice',
                action: 'getColumnInfo'
            });
            return null;
        }
    }).apply(this, arguments);
}
function getInvertedIndexColumns(_0) {
    return _async_to_generator(function*({ connectionId, database, table, datasourceType = 'mysql' }) {
        if (!connectionId || !database || !table) {
            return [];
        }
        const query = `SHOW INDEXES FROM \`${database}\`.\`${table}\``;
        const response$ = (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getBackendSrv)().fetch({
            url: '/api/ds/query',
            method: 'POST',
            data: {
                queries: [
                    {
                        refId: 'getInvertedIndexes',
                        datasource: {
                            type: datasourceType,
                            uid: connectionId
                        },
                        rawSql: query,
                        format: 'table'
                    }
                ]
            }
        }));
        try {
            var _ref, _dataFrame_fields_find, _dataFrame_fields_find1, _columnNameField_values, _indexTypeField_values;
            var _resultData_results_getInvertedIndexes_frames, _resultData_results_getInvertedIndexes, _resultData_results, _resultData_results_getIndexes_frames, _resultData_results_getIndexes, _resultData_results1;
            const { data, ok } = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.lastValueFrom)(response$);
            if (!ok) {
                return [];
            }
            const resultData = data;
            const frame = (_ref = resultData === null || resultData === void 0 ? void 0 : (_resultData_results = resultData.results) === null || _resultData_results === void 0 ? void 0 : (_resultData_results_getInvertedIndexes = _resultData_results.getInvertedIndexes) === null || _resultData_results_getInvertedIndexes === void 0 ? void 0 : (_resultData_results_getInvertedIndexes_frames = _resultData_results_getInvertedIndexes.frames) === null || _resultData_results_getInvertedIndexes_frames === void 0 ? void 0 : _resultData_results_getInvertedIndexes_frames[0]) !== null && _ref !== void 0 ? _ref : resultData === null || resultData === void 0 ? void 0 : (_resultData_results1 = resultData.results) === null || _resultData_results1 === void 0 ? void 0 : (_resultData_results_getIndexes = _resultData_results1.getIndexes) === null || _resultData_results_getIndexes === void 0 ? void 0 : (_resultData_results_getIndexes_frames = _resultData_results_getIndexes.frames) === null || _resultData_results_getIndexes_frames === void 0 ? void 0 : _resultData_results_getIndexes_frames[0];
            if (!frame) {
                return [];
            }
            const dataFrame = (0,_grafana_data__WEBPACK_IMPORTED_MODULE_0__.toDataFrame)(frame);
            const columnNameField = (_dataFrame_fields_find = dataFrame.fields.find((field)=>field.name === 'Column_name')) !== null && _dataFrame_fields_find !== void 0 ? _dataFrame_fields_find : dataFrame.fields.find((field)=>field.name === 'COLUMN_NAME');
            const indexTypeField = (_dataFrame_fields_find1 = dataFrame.fields.find((field)=>field.name === 'Index_type')) !== null && _dataFrame_fields_find1 !== void 0 ? _dataFrame_fields_find1 : dataFrame.fields.find((field)=>field.name === 'INDEX_TYPE');
            if (!columnNameField || !indexTypeField) {
                return [];
            }
            const columnNames = Array.from((_columnNameField_values = columnNameField.values) !== null && _columnNameField_values !== void 0 ? _columnNameField_values : []);
            const indexTypes = Array.from((_indexTypeField_values = indexTypeField.values) !== null && _indexTypeField_values !== void 0 ? _indexTypeField_values : []);
            const indexedColumns = new Set();
            for(let i = 0; i < columnNames.length; i += 1){
                const columnName = columnNames[i];
                const indexType = indexTypes[i];
                if (typeof columnName !== 'string' || columnName.length === 0) {
                    continue;
                }
                if (typeof indexType !== 'string') {
                    continue;
                }
                if (indexType.toUpperCase().includes('INVERT')) {
                    indexedColumns.add(columnName);
                }
            }
            return Array.from(indexedColumns);
        } catch (error) {
            (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.logError)((0,_utils_errors__WEBPACK_IMPORTED_MODULE_4__/* .toError */ .i)(error), {
                source: 'metaservice',
                action: 'getInvertedIndexColumns'
            });
            return [];
        }
    }).apply(this, arguments);
}
function getDatabases(selectdbDS) {
    const response$ = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getDatabases',
                    datasource: {
                        type: 'mysql',
                        uid: selectdbDS.uid
                    },
                    rawSql: 'SHOW DATABASES',
                    format: 'table'
                }
            ]
        }
    });
    return (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .F)(response$);
}
function getTablesService({ selectdbDS, database }) {
    return (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getTables',
                    datasource: {
                        type: 'mysql',
                        uid: selectdbDS.uid
                    },
                    rawSql: `SHOW TABLES FROM \`${database}\``,
                    format: 'table'
                }
            ]
        }
    }));
}
function getFieldsService({ selectdbDS, database, table }) {
    return (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getFields',
                    datasource: {
                        type: 'mysql',
                        uid: selectdbDS.uid
                    },
                    rawSql: `SHOW COLUMNS FROM \`${database}\`.\`${table}\``,
                    format: 'table'
                }
            ]
        }
    }));
}
function getApplicationValuesSQL({ database, table, timeField, startDate, endDate, attributeKey }) {
    const resourceAttributes = (0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_5__/* .escapeSqlIdentifier */ .LT)('resource_attributes');
    const applicationExpression = `CAST(${resourceAttributes}[${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_5__/* .quoteSqlLiteral */ .Ck)(attributeKey)}] AS STRING)`;
    return `
SELECT ${applicationExpression} AS application
FROM ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_5__/* .escapeSqlIdentifier */ .LT)(database)}.${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_5__/* .escapeSqlIdentifier */ .LT)(table)}
WHERE ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_5__/* .escapeSqlIdentifier */ .LT)(timeField)} BETWEEN ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_5__/* .quoteSqlLiteral */ .Ck)(startDate)} AND ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_5__/* .quoteSqlLiteral */ .Ck)(endDate)}
  AND ${applicationExpression} IS NOT NULL
  AND ${applicationExpression} != ''
GROUP BY application
ORDER BY application
LIMIT 200;
`;
}
function getApplicationValuesService(params) {
    const { selectdbDS } = params, queryParams = _object_without_properties(params, [
        "selectdbDS"
    ]);
    return (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getApplicationValues',
                    datasource: {
                        type: 'mysql',
                        uid: selectdbDS.uid
                    },
                    rawSql: getApplicationValuesSQL(queryParams),
                    format: 'table'
                }
            ]
        }
    }));
}
function getColumnFromFieldService({ selectdbDS, database, table }) {
// return getBackendSrv().fetch({
//     url: '/api/ds/query',
//     method: 'POST',
//     data: {
//         queries: [
//             {
//                 refId: 'getColumnFromFieldService',
//                 datasource: { type: 'mysql', uid: selectdbDS.uid },
//                 rawSql: `SHOW COLUMNS FROM \`${database}\`.\`${table}\``,
//                 format: 'table',
//             },
//         ],
//     },
// });
}
function getIndexesService({ selectdbDS, database, table }) {
    return (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getIndexes',
                    datasource: {
                        type: 'mysql',
                        uid: selectdbDS.uid
                    },
                    rawSql: `SHOW INDEXES FROM \`${database}\`.\`${table}\``,
                    format: 'table'
                }
            ]
        }
    }));
}


/***/ },

/***/ 6247
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $w: () => (/* binding */ currentTableAtom),
/* harmony export */   AW: () => (/* binding */ settingDatabasesAtom),
/* harmony export */   CA: () => (/* binding */ currentTimeFieldAtom),
/* harmony export */   CL: () => (/* binding */ tableFieldValuesAtom),
/* harmony export */   Cf: () => (/* binding */ currentDatabaseAtom),
/* harmony export */   D_: () => (/* binding */ tableFieldsAtom),
/* harmony export */   EA: () => (/* binding */ dataFilterAtom),
/* harmony export */   Eq: () => (/* binding */ indexesAtom),
/* harmony export */   Gg: () => (/* binding */ timeFieldsAtom),
/* harmony export */   HC: () => (/* binding */ tableTotalCountAtom),
/* harmony export */   IH: () => (/* binding */ disabledOptionsAtom),
/* harmony export */   JT: () => (/* binding */ locationAtom),
/* harmony export */   K0: () => (/* binding */ currentCatalogAtom),
/* harmony export */   L: () => (/* binding */ settingTablesAtom),
/* harmony export */   MM: () => (/* binding */ searchFocusAtom),
/* harmony export */   Mb: () => (/* binding */ searchableAtom),
/* harmony export */   NJ: () => (/* binding */ afterTimeFieldPageSizeAtom),
/* harmony export */   Ol: () => (/* binding */ pageSizeAtom),
/* harmony export */   P8: () => (/* binding */ searchValueAtom),
/* harmony export */   Ps: () => (/* binding */ discoverRowsExpandedAtom),
/* harmony export */   SK: () => (/* binding */ databasesAtom),
/* harmony export */   SW: () => (/* binding */ selectedDatasourceAtom),
/* harmony export */   TY: () => (/* binding */ currentIndexAtom),
/* harmony export */   U9: () => (/* binding */ timeRangeAtom),
/* harmony export */   UB: () => (/* binding */ tableTracesDataAtom),
/* harmony export */   UR: () => (/* binding */ aggregatableAtom),
/* harmony export */   WM: () => (/* binding */ searchTypeAtom),
/* harmony export */   WN: () => (/* binding */ discoverCurrentAtom),
/* harmony export */   Wg: () => (/* binding */ selectedFieldsAtom),
/* harmony export */   Zb: () => (/* binding */ currentDateAtom),
/* harmony export */   b9: () => (/* binding */ tablesAtom),
/* harmony export */   bP: () => (/* binding */ currentClusterAtom),
/* harmony export */   cn: () => (/* binding */ beforeCountAtom),
/* harmony export */   f5: () => (/* binding */ afterCountAtom),
/* harmony export */   fs: () => (/* binding */ pageAtom),
/* harmony export */   gj: () => (/* binding */ surroundingSelectedFieldsAtom),
/* harmony export */   jU: () => (/* binding */ discoverLoadingAtom),
/* harmony export */   l_: () => (/* binding */ topDataAtom),
/* harmony export */   le: () => (/* binding */ intervalAtom),
/* harmony export */   m5: () => (/* binding */ fieldTypeAtom),
/* harmony export */   m_: () => (/* binding */ activeShortcutAtom),
/* harmony export */   mj: () => (/* binding */ surroundingTableDataAtom),
/* harmony export */   nn: () => (/* binding */ selectedRowAtom),
/* harmony export */   pB: () => (/* binding */ tableDataChartsAtom),
/* harmony export */   pG: () => (/* binding */ selectedIndexesAtom),
/* harmony export */   ps: () => (/* binding */ afterTimeAtom),
/* harmony export */   q3: () => (/* binding */ tableDataAtom),
/* harmony export */   qX: () => (/* binding */ beforeTimeFieldPageSizeAtom),
/* harmony export */   tF: () => (/* binding */ timeZoneAtom),
/* harmony export */   ui: () => (/* binding */ datasourcesAtom),
/* harmony export */   uz: () => (/* binding */ beforeTimeAtom),
/* harmony export */   wc: () => (/* binding */ surroundingDataFilterAtom)
/* harmony export */ });
/* unused harmony exports dorisInfoAtom, tableEChartsDataAtom, surroundingTableFieldsAtom */
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4945);
/* harmony import */ var jotai_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6303);
/* harmony import */ var jotai_location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7264);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7781);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _types_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7944);
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6700);
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1157);


// import { focusAtom } from 'jotai-optics'





const locationAtom = (0,jotai_location__WEBPACK_IMPORTED_MODULE_2__/* .atomWithLocation */ .N)();
const dataFilterAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const discoverCurrentAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-current', _utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_DEFAULT_STATUS */ .lv);
// databases
const databasesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const settingDatabasesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const tablesAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-tables', []);
const settingTablesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const currentCatalogAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-current-catalog', 'internal');
const searchTypeAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-search-type', 'Lucene');
const currentDatabaseAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .selectAtom */ .mg)(discoverCurrentAtom, (current)=>current.database);
const currentTableAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-current-table', '');
const currentClusterAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)('');
const currentTimeFieldAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .selectAtom */ .mg)(discoverCurrentAtom, (current)=>current.timeField);
const currentDateAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_SHORTCUTS */ .oU[3].range());
const currentIndexAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const selectedIndexesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const searchValueAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)('');
const searchFocusAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(false);
const activeShortcutAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_SHORTCUTS */ .oU[3]);
const dorisInfoAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({});
const disabledOptionsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const selectedFieldsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const tableFieldsAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-table-fields', []);
const discoverRowsExpandedAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-rows-expanded', false);
const timeFieldsAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-time-fields', []);
const tableDataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const topDataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const surroundingTableDataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const tableDataChartsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const intervalAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_types_type__WEBPACK_IMPORTED_MODULE_4__/* .IntervalEnum */ .B.Auto);
const tableTotalCountAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(0);
const tableEChartsDataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const tableTracesDataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)();
// Filter Content Atom
const searchableAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .SearchableEnum */ .Yp.ANY);
const aggregatableAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .AggregatableEnum */ .SY.ANY);
const fieldTypeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .FieldTypeEnum */ .wI.ANY);
const indexesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const selectedRowAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({});
const tableFieldValuesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const pageAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(1);
const pageSizeAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-pagination-size', 50);
// Surrounding Data Atoms
const surroundingDataFilterAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const beforeTimeFieldPageSizeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(5);
const afterTimeFieldPageSizeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(5);
const beforeTimeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)('');
const afterTimeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)('');
const beforeCountAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(0);
const afterCountAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(0);
const surroundingTableFieldsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const surroundingSelectedFieldsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const datasourcesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const selectedDatasourceAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-selected-datasource', undefined);
const timeZoneAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-time-zone', (0,_utils_time__WEBPACK_IMPORTED_MODULE_6__/* .getGrafanaUserTimeZone */ .XP)());
const timeRangeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({
    from: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_3__.dateTime)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_SHORTCUTS */ .oU[3].range()[0].toDate()),
    to: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_3__.dateTime)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_SHORTCUTS */ .oU[3].range()[1].toDate()),
    raw: _utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_SHORTCUTS */ .oU[3].raw
});
const discoverLoadingAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({
    getTableData: false,
    getTopData: false,
    getSurroundingData: false,
    getTableDataCharts: false,
    getTableFieldValues: false,
    getIndexes: false,
    getTimeFields: false,
    getTableFields: false
});


/***/ },

/***/ 325
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TO: () => (/* binding */ DEFAULT_LOGS_CONFIG),
/* harmony export */   oW: () => (/* binding */ mergeLogsConfig)
/* harmony export */ });
/* unused harmony export normalizeApplicationAttributeKey */
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
const DEFAULT_LOGS_CONFIG = {
    datasource: 'doris',
    database: 'otel',
    logsTable: 'otel_logs',
    targetTraceTable: 'otel_traces',
    applicationAttributeKey: 'app'
};
function normalizeApplicationAttributeKey(value) {
    return (value === null || value === void 0 ? void 0 : value.trim()) || DEFAULT_LOGS_CONFIG.applicationAttributeKey || 'app';
}
function mergeLogsConfig(logsConfig) {
    return _object_spread_props(_object_spread({}, DEFAULT_LOGS_CONFIG, logsConfig !== null && logsConfig !== void 0 ? logsConfig : {}), {
        applicationAttributeKey: normalizeApplicationAttributeKey(logsConfig === null || logsConfig === void 0 ? void 0 : logsConfig.applicationAttributeKey)
    });
}


/***/ },

/***/ 7944
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ IntervalEnum)
/* harmony export */ });
var IntervalEnum = /*#__PURE__*/ function(IntervalEnum) {
    IntervalEnum["Auto"] = "auto";
    IntervalEnum["Day"] = "day";
    IntervalEnum["Week"] = "week";
    IntervalEnum["Month"] = "month";
    IntervalEnum["Year"] = "year";
    IntervalEnum["Hour"] = "hour";
    IntervalEnum["Minute"] = "minute";
    IntervalEnum["Second"] = "second";
    return IntervalEnum;
}({});


/***/ },

/***/ 6700
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $X: () => (/* binding */ SEARCHABLE),
/* harmony export */   F9: () => (/* binding */ generateHighlightedResults),
/* harmony export */   HL: () => (/* binding */ convertColumnToRow),
/* harmony export */   My: () => (/* binding */ formatTimestampToDateTime),
/* harmony export */   NG: () => (/* binding */ TIME_INTERVALS),
/* harmony export */   O1: () => (/* binding */ formatTracesResData),
/* harmony export */   Q3: () => (/* binding */ isValidTimeFieldType),
/* harmony export */   Re: () => (/* binding */ getFieldType),
/* harmony export */   SY: () => (/* binding */ AggregatableEnum),
/* harmony export */   WG: () => (/* binding */ encodeBase64),
/* harmony export */   Wd: () => (/* binding */ getChartsData),
/* harmony export */   Yp: () => (/* binding */ SearchableEnum),
/* harmony export */   ZD: () => (/* binding */ escapeHtml),
/* harmony export */   cE: () => (/* binding */ getIndexesStatement),
/* harmony export */   hC: () => (/* binding */ getLatestTime),
/* harmony export */   hO: () => (/* binding */ AGGREGATABLE),
/* harmony export */   lv: () => (/* binding */ DISCOVER_DEFAULT_STATUS),
/* harmony export */   ml: () => (/* binding */ convertColumnToRowViaFieldsType),
/* harmony export */   mt: () => (/* binding */ parseJsonLikeValue),
/* harmony export */   oU: () => (/* binding */ DISCOVER_SHORTCUTS),
/* harmony export */   t9: () => (/* reexport safe */ _sql_filter__WEBPACK_IMPORTED_MODULE_7__.t9),
/* harmony export */   tF: () => (/* binding */ isComplexType),
/* harmony export */   wI: () => (/* binding */ FieldTypeEnum),
/* harmony export */   we: () => (/* binding */ OPERATORS),
/* harmony export */   xW: () => (/* binding */ formatFieldDisplayValue)
/* harmony export */ });
/* unused harmony exports SQL_OPERATORS, TIME_FIELD_TYPES, CAN_SEARCH_FIELD_TYPE, ENABLE_SEARCH_FIELD_TYPE, isVariantType, ParamsKeyEnum, SURROUNDING_LOGS_OPERATORS, PAGESIZE_OPTIONS, FIELD_TYPES, decodeBase64, formatDate, resetDate, getDateRange, QUERY_TRACE_FIELDS */
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2351);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5285);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8880);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3819);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1163);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8987);
/* harmony import */ var _types_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7944);
/* harmony import */ var _sql_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2721);
/* harmony import */ var js_tokens__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4132);
/* harmony import */ var js_tokens__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(js_tokens__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(892);
/* harmony import */ var dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7781);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4486);
/* harmony import */ var dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_11__);










dayjs__WEBPACK_IMPORTED_MODULE_1___default().extend((dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_11___default()));
dayjs__WEBPACK_IMPORTED_MODULE_1___default().extend((dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_9___default()));
const OPERATORS = [
    '=',
    '!=',
    'in',
    'not in',
    'is null',
    'is not null',
    'like',
    'not like',
    'between',
    'not between',
    'match_any',
    'match_all',
    'match_phrase',
    'match_phrase_prefix'
];
const SQL_OPERATORS = (/* unused pure expression or super */ null && ([
    '=',
    '!=',
    '>',
    '<',
    '>=',
    '<=',
    'LIKE',
    'IN',
    'AND',
    'OR',
    'BETWEEN'
]));
const TIME_FIELD_TYPES = [
    'DATETIME',
    'DATE',
    'DATETIMEV2',
    'DATEV2',
    'TIME'
];
function isValidTimeFieldType(fieldType) {
    // 提取基础字段类型（移除括号及其内容）
    const baseFieldType = fieldType.split('(')[0];
    return TIME_FIELD_TYPES.includes(baseFieldType);
}
const CAN_SEARCH_FIELD_TYPE = [
    'STRING',
    'ARRAY',
    'NUMBER',
    'VARIANT'
];
const ENABLE_SEARCH_FIELD_TYPE = (/* unused pure expression or super */ null && ([
    'DATETIME',
    'TIMESTAMP',
    'TIME'
]));
const getFieldType = (columnType)=>{
    if (!columnType) {
        return '';
    }
    const currentColumnType = FIELD_TYPES.find((item)=>item.value.some((val)=>columnType.toLocaleUpperCase().includes(val)));
    return currentColumnType === null || currentColumnType === void 0 ? void 0 : currentColumnType.key;
};
const isVariantType = (columnType)=>{
    return String(columnType || '').toLocaleUpperCase().includes('VARIANT');
};
function parseJsonLikeValue(value) {
    if (typeof value !== 'string') {
        if (Array.isArray(value)) {
            return value.map((item)=>parseJsonLikeValue(item));
        }
        if (value && typeof value === 'object') {
            return Object.entries(value).reduce((result, [key, item])=>{
                result[key] = parseJsonLikeValue(item);
                return result;
            }, {});
        }
        return value;
    }
    const trimmed = value.trim();
    if (!trimmed) {
        return value;
    }
    let normalized = trimmed;
    if (normalized.includes('\\"')) {
        try {
            normalized = JSON.parse(`"${normalized}"`);
        } catch (unused) {
            normalized = trimmed;
        }
    }
    const looksJsonLike = normalized.startsWith('{') && normalized.endsWith('}') || normalized.startsWith('[') && normalized.endsWith(']') || normalized.startsWith('"') && normalized.endsWith('"');
    if (!looksJsonLike) {
        return value;
    }
    try {
        return parseJsonLikeValue(JSON.parse(normalized));
    } catch (unused) {
        return value;
    }
}
function formatFieldDisplayValue(value, mode = 'compact') {
    if (value === null || value === undefined) {
        return '-';
    }
    const parsedValue = parseJsonLikeValue(value);
    if (parsedValue === null || parsedValue === undefined) {
        return '-';
    }
    if (typeof parsedValue === 'object') {
        try {
            return JSON.stringify(parsedValue, null, mode === 'pretty' ? 2 : 0);
        } catch (unused) {
            return String(parsedValue);
        }
    }
    return String(parsedValue);
}
function escapeHtml(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
const DISCOVER_DEFAULT_STATUS = {
    catalog: 'internal',
    database: '',
    table: '',
    cluster: '',
    timeField: '',
    date: []
};
var SearchableEnum = /*#__PURE__*/ function(SearchableEnum) {
    SearchableEnum["ANY"] = "ANY";
    SearchableEnum["YES"] = "YES";
    SearchableEnum["NO"] = "NO";
    return SearchableEnum;
}({});
var AggregatableEnum = /*#__PURE__*/ function(AggregatableEnum) {
    AggregatableEnum["ANY"] = "ANY";
    AggregatableEnum["YES"] = "YES";
    AggregatableEnum["NO"] = "NO";
    return AggregatableEnum;
}({});
const SEARCHABLE = [
    {
        label: `Any`,
        value: "ANY"
    },
    {
        label: 'Yes',
        value: "YES"
    },
    {
        label: 'No',
        value: "NO"
    }
];
const AGGREGATABLE = [
    {
        label: `Any`,
        value: "ANY"
    },
    {
        label: 'Yes',
        value: "YES"
    },
    {
        label: 'No',
        value: "NO"
    }
];
var FieldTypeEnum = /*#__PURE__*/ function(FieldTypeEnum) {
    FieldTypeEnum["ANY"] = "ANY";
    FieldTypeEnum["STRING"] = "STRING";
    FieldTypeEnum["NUMBER"] = "NUMBER";
    FieldTypeEnum["DATE"] = "DATE";
    FieldTypeEnum["VARIANT"] = "VARIANT";
    return FieldTypeEnum;
}({});
var ParamsKeyEnum = /*#__PURE__*/ function(ParamsKeyEnum) {
    ParamsKeyEnum["sqlCatalog"] = "sqlCatalog";
    ParamsKeyEnum["sqlDatabase"] = "sqlDatabase";
    ParamsKeyEnum["startDate"] = "startDateRange";
    ParamsKeyEnum["endDate"] = "endDateRange";
    ParamsKeyEnum["sqlSearch"] = "sqlSearch";
    ParamsKeyEnum["selectedTable"] = "selectedTable";
    ParamsKeyEnum["dateInterval"] = "dateInterval";
    ParamsKeyEnum["selectedField"] = "selectedField";
    ParamsKeyEnum["dataFilter"] = "dataFilter";
    ParamsKeyEnum["selectedTimeField"] = "selectedTimeField";
    ParamsKeyEnum["sortedField"] = "sortedField";
    ParamsKeyEnum["searchType"] = "searchType";
    ParamsKeyEnum["selectedIndex"] = "selectedIndex";
    ParamsKeyEnum["selectedCluster"] = "selectedCluster";
    return ParamsKeyEnum;
}({});
function isWrappedInQuotes(inputString) {
    const pattern = /(["'])(.*?)\1/;
    return pattern.test(inputString);
}
function getIndexesStatement(indexes, allField, keywords) {
    let operator = 'MATCH_ANY';
    let searchValue = keywords.trim();
    if (!searchValue || !indexes) {
        return '';
    }
    if (isWrappedInQuotes(keywords)) {
        operator = 'MATCH_PHRASE';
    } else {
        searchValue = `'${searchValue}'`;
    }
    const indexesNames = indexes.map((item)=>item.columnName);
    return indexesNames.reduce((prevValue, currValue)=>{
        var _getFieldType;
        const currentField = allField.find((field)=>`${field.value}` === currValue);
        const currentFieldType = (_getFieldType = getFieldType(currentField.Type)) === null || _getFieldType === void 0 ? void 0 : _getFieldType.toUpperCase();
        if (currentFieldType === 'NUMBER') {
            operator = '=';
        }
        if (currentFieldType === 'STRING' || currentFieldType === 'ARRAY') {
            if (isWrappedInQuotes(keywords)) {
                operator = 'MATCH_PHRASE';
            } else {
                operator = 'MATCH_ANY';
            }
        }
        const canSearchField = CAN_SEARCH_FIELD_TYPE.includes(currentFieldType);
        if (canSearchField) {
            if (prevValue) {
                return `${prevValue} OR \`${currValue}\` ${operator} ${searchValue}`;
            } else {
                return `\`${currValue}\` ${operator} ${searchValue}`;
            }
        }
        return prevValue;
    }, '');
}
const DISCOVER_SHORTCUTS = [
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_5__/* .nanoid */ .Ak)(),
        text: `Last 5 Minutes`,
        label: `Last 5 Minutes`,
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_1___default()())=>[
                now.add(-5, 'minute').startOf('second'),
                now
            ],
        format: 'HH:mm',
        raw: {
            from: 'now-5m',
            to: 'now'
        },
        type: 'minute',
        number: -5
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_5__/* .nanoid */ .Ak)(),
        text: `Last 15 Minutes`,
        label: `Last 15 Minutes`,
        raw: {
            from: 'now-15m',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_1___default()())=>[
                now.add(-15, 'minute').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'minute',
        number: -15
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_5__/* .nanoid */ .Ak)(),
        text: `Last 1 Hour`,
        label: `Last 1 Hour`,
        raw: {
            from: 'now-1h',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_1___default()())=>[
                now.add(-1, 'hour').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'hour',
        number: -1
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_5__/* .nanoid */ .Ak)(),
        text: `Last 1 Day`,
        label: `Last 1 Day`,
        raw: {
            from: 'now-1d',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_1___default()())=>[
                now.add(-1, 'day').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'day',
        number: -1
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_5__/* .nanoid */ .Ak)(),
        text: `Last 7 Days`,
        label: `Last 1 Days`,
        raw: {
            from: 'now-7d',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_1___default()())=>[
                now.add(-7, 'day').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'day',
        number: -7
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_5__/* .nanoid */ .Ak)(),
        text: `Last 1 Month`,
        label: `Last 1 Month`,
        raw: {
            from: 'now-1M',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_1___default()())=>[
                now.add(-1, 'month').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'month',
        number: -1
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_5__/* .nanoid */ .Ak)(),
        text: `Last 3 Months`,
        label: `Last 3 Months`,
        raw: {
            from: 'now-3M',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_1___default()())=>[
                now.add(-3, 'month').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'month',
        number: -3
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_5__/* .nanoid */ .Ak)(),
        text: `Last 1 Year`,
        label: `Last 1 Year`,
        raw: {
            from: 'now-1y',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_1___default()())=>[
                now.add(-1, 'year').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'year',
        number: -1
    }
];
const SURROUNDING_LOGS_OPERATORS = [
    {
        label: '5',
        value: '5'
    },
    {
        label: '10',
        value: '10'
    }
];
function getLatestTime(id) {
    if (!id) {
        return null;
    }
    const selectedItem = DISCOVER_SHORTCUTS.find((item)=>item.key === id);
    return selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.range();
}
const TIME_INTERVALS = [
    {
        value: 'auto',
        label: `Auto`
    },
    {
        value: 'second',
        label: `Second`
    },
    {
        value: 'minute',
        label: `Minute`
    },
    {
        value: 'hour',
        label: `Hour`
    },
    {
        value: 'day',
        label: `Day`
    },
    {
        value: 'week',
        label: `Week`
    },
    {
        value: 'month',
        label: `Month`
    },
    {
        value: 'year',
        label: `Year`
    }
];
const PAGESIZE_OPTIONS = (/* unused pure expression or super */ null && ([
    10,
    20,
    50,
    100,
    200
]));
const FIELD_TYPES = [
    {
        key: 'STRING',
        value: [
            'VARCHAR',
            'STRING',
            'CHAR',
            'TEXT'
        ],
        icon: ''
    },
    {
        key: 'NUMBER',
        value: [
            'INT',
            'LARGEINT',
            'SMALLINT',
            'TINYINT',
            'DECIMAL',
            'BIGINT',
            'FLOAT',
            'DOUBLE'
        ],
        icon: ''
    },
    {
        key: 'DATE',
        value: [
            'DATE',
            'DATETIME',
            'DATEV2',
            'DATETIMEV2'
        ],
        icon: ''
    },
    {
        key: 'JSONB',
        value: [
            'JSONB'
        ],
        icon: '',
        complex: true
    },
    {
        key: 'ARRAY',
        value: [
            'ARRAY'
        ],
        icon: '',
        complex: true
    },
    {
        key: 'BOOLEAN',
        value: [
            'BOOLEAN'
        ],
        icon: ''
    },
    {
        key: 'BITMAP',
        value: [
            'BITMAP'
        ],
        icon: '',
        complex: true
    },
    {
        key: 'HLL',
        value: [
            'HLL'
        ],
        icon: '',
        complex: true
    },
    {
        key: 'VARIANT',
        value: [
            'VARIANT'
        ],
        icon: '',
        complex: true
    },
    {
        key: 'JSON',
        value: [
            'JSON'
        ],
        icon: '',
        complex: true
    }
];
function encodeBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1)=>String.fromCharCode(parseInt('0x' + p1, 10))));
}
function decodeBase64(base64) {
    return decodeURIComponent(Array.from(atob(base64)).map((c)=>'%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
}
const isComplexType = (columnType)=>{
    if (!columnType) {
        return false;
    }
    const currentColumnType = FIELD_TYPES.find((item)=>item.value.some((val)=>columnType.toLocaleUpperCase().includes(val)));
    if (currentColumnType) {
        return !!currentColumnType.complex;
    }
    return true;
};
function formatDate(interval) {
    let date_format = 'YYYY-MM-DD HH:mm:ss';
    switch(interval){
        case 'year':
            date_format = 'YYYY';
            break;
        case 'month':
            date_format = 'YYYY-MM';
            break;
        case 'week':
            date_format = 'YYYY-MM-DD';
            break;
        case 'day':
            date_format = 'YYYY-MM-DD';
            break;
        case 'hour':
            date_format = 'YYYY-MM-DD HH:mm:ss';
            break;
        case 'minute':
            date_format = 'YYYY-MM-DD HH:mm:ss';
            break;
        case 'second':
        default:
            date_format = 'YYYY-MM-DD HH:mm:ss';
            break;
    }
    return date_format;
}
function resetDate(date, interval) {
    let date_reset = date;
    switch(interval){
        case 'year':
            date_reset.set('month', 1).set('date', 1).set('hour', 0).set('minute', 0).set('second', 0);
            break;
        case 'month':
            date_reset.set('date', 1).set('hour', 0).set('minute', 0).set('second', 0);
            break;
        case 'week':
            date_reset.set('hour', 0).set('minute', 0).set('second', 0);
            break;
        case 'day':
            date_reset.set('hour', 0).set('minute', 0).set('second', 0);
            break;
        case 'hour':
            date_reset.set('minute', 0).set('second', 0);
            break;
        case 'minute':
            date_reset.set('second', 0);
            break;
        case 'second':
        default:
            break;
    }
    return date_reset;
}
function getDateRange(startDate, endDate, interval) {
    const DATE_FORMAT = formatDate(interval.interval_unit);
    if (dayjs__WEBPACK_IMPORTED_MODULE_1___default()(startDate, DATE_FORMAT).isSame(dayjs__WEBPACK_IMPORTED_MODULE_1___default()(endDate, DATE_FORMAT), interval.interval_unit)) {
        return [
            endDate
        ];
    }
    let date = resetDate(startDate, interval.interval_unit);
    const formatStartDate = date.format(DATE_FORMAT);
    const dates = [
        formatStartDate
    ];
    do {
        date = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(date).add(interval.interval_value, interval.interval_unit);
        if (dayjs__WEBPACK_IMPORTED_MODULE_1___default()(date).isBefore(endDate)) {
            dates.push(date.format(DATE_FORMAT));
        }
    }while (dayjs__WEBPACK_IMPORTED_MODULE_1___default()(date).isBefore(endDate))
    return dates;
}
function getChartsData(tableDataCharts, currentDate) {
    const selectInterval = (0,_constants__WEBPACK_IMPORTED_MODULE_0__/* .getAutoInterval */ .Vy)(currentDate);
    const [startDate, endDate] = currentDate;
    const intervalUnit = selectInterval.interval_unit || _types_type__WEBPACK_IMPORTED_MODULE_6__/* .IntervalEnum */ .B.Auto;
    const timeInterval = intervalUnit === _types_type__WEBPACK_IMPORTED_MODULE_6__/* .IntervalEnum */ .B.Auto ? selectInterval : {
        interval_value: 1,
        interval_unit: intervalUnit
    };
    const dates = getDateRange(startDate, endDate, timeInterval);
    const tableDataMap = new Map();
    const result = [];
    const DATE_FORMAT_FROM_INTERVAL = formatDate(timeInterval.interval_unit);
    tableDataCharts.forEach((e)=>{
        const currentLocale = dayjs__WEBPACK_IMPORTED_MODULE_1___default().locale();
        const date = dayjs__WEBPACK_IMPORTED_MODULE_1___default().utc(e['TT']).locale(currentLocale).format(DATE_FORMAT_FROM_INTERVAL);
        tableDataMap.set(date, e['sum(cnt)']);
    });
    dates.forEach((date)=>{
        const newDate = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(date).format(DATE_FORMAT_FROM_INTERVAL);
        if (!tableDataMap.get(newDate)) {
            tableDataMap.set(newDate, null);
        }
    });
    tableDataMap.forEach((value, key)=>{
        result.push({
            TT: key,
            ['sum(cnt)']: value
        });
    });
    return (0,lodash_es__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(result, [
        'TT'
    ], [
        'asc'
    ]);
}
function convertColumnToRow(frame) {
    const fieldNames = frame.schema.fields.map((f)=>f.name);
    const columns = frame.data.values;
    if (columns.length === 0) {
        return [];
    }
    const numRows = columns[0].length;
    const rows = [];
    for(let i = 0; i < numRows; i++){
        const row = {};
        for(let j = 0; j < columns.length; j++){
            row[fieldNames[j]] = columns[j][i];
            if (isValidTimeFieldType(frame.schema.fields[j].type.toUpperCase())) {
                // 如果是时间字段，转换为 Dayjs 对象
                row[fieldNames[j]] = formatTimestampToDateTime(row[fieldNames[j]], frame.schema.fields[j].precision || 3);
            }
            if (isVariantType(frame.schema.fields[j].type)) {
                // 如果是 VARIANT 类型，转换为 JSON 对象
                row[fieldNames[j]] = parseJsonLikeValue(row[fieldNames[j]]);
            }
        }
        rows.push(row);
    }
    return rows;
}
// 通过查询 Doris 的字段判断类型，不依赖 Grafana 类型
function convertColumnToRowViaFieldsType(frame, fields) {
    const fieldNames = frame.schema.fields.map((f)=>f.name);
    const columns = frame.data.values;
    if (columns.length === 0) {
        return [];
    }
    const numRows = columns[0].length;
    const rows = [];
    for(let i = 0; i < numRows; i++){
        const row = {};
        for(let j = 0; j < columns.length; j++){
            row[fieldNames[j]] = columns[j][i];
            if (isValidTimeFieldType(frame.schema.fields[j].type.toUpperCase())) {
                // 如果是时间字段，转换为 Dayjs 对象
                row[fieldNames[j]] = formatTimestampToDateTime(row[fieldNames[j]], frame.schema.fields[j].precision || 3);
            // row[fieldNames[j]] = dayjs.utc(row[fieldNames[j]]).locale(currentLocale).format('YYYY-MM-DD HH:mm:ss.SSS');
            }
            const currentFieldInfo = fields.filter((item)=>item.Field === frame.schema.fields[j].name)[0];
            // 如果是 VARIANT 类型，转换为 JSON 对象
            if (currentFieldInfo && isVariantType(currentFieldInfo.Type)) {
                row[fieldNames[j]] = parseJsonLikeValue(row[fieldNames[j]]);
            }
        }
        rows.push(row);
    }
    return rows;
}
// 格式化时间戳为 DATETIME([number]) 格式
function formatTimestampToDateTime(timestamp, precision = 3) {
    const currentLocale = dayjs__WEBPACK_IMPORTED_MODULE_1___default().locale();
    // 基础格式：YYYY-MM-DD HH:mm:ss
    let formatString = 'YYYY-MM-DD HH:mm:ss';
    // 根据精度添加毫秒部分
    if (precision > 0) {
        formatString += `.${'S'.repeat(precision)}`;
    }
    // 转换时间戳并格式化
    return dayjs__WEBPACK_IMPORTED_MODULE_1___default().utc(timestamp).locale(currentLocale).format(formatString);
}
function parseJsonIfString(item) {
    if (typeof item !== 'string') {
        return item;
    }
    const trimmed = item.trim();
    if (!trimmed) {
        return item;
    }
    try {
        return JSON.parse(trimmed);
    } catch (unused) {
        return item;
    }
}
function normalizeTraceTags(item) {
    const parsed = parseJsonIfString(item);
    if (Array.isArray(parsed)) {
        return parsed.map((tag)=>{
            if (tag && typeof tag === 'object' && 'key' in tag && 'value' in tag) {
                return tag;
            }
            return {
                key: String(tag),
                value: ''
            };
        });
    }
    if (parsed && typeof parsed === 'object') {
        return Object.entries(parsed).map(([key, value])=>({
                key,
                value
            }));
    }
    return [];
}
function normalizeTraceLogTimestamp(timestamp) {
    if (typeof timestamp === 'number' && Number.isFinite(timestamp)) {
        return timestamp;
    }
    if (typeof timestamp === 'string') {
        const numericTimestamp = Number(timestamp);
        if (Number.isFinite(numericTimestamp)) {
            return numericTimestamp;
        }
        const parsedTimestamp = dayjs__WEBPACK_IMPORTED_MODULE_1___default().utc(timestamp.replace(' ', 'T'));
        if (parsedTimestamp.isValid()) {
            return parsedTimestamp.valueOf();
        }
    }
    return timestamp;
}
function normalizeTraceLogs(item) {
    const parsed = parseJsonIfString(item);
    if (!Array.isArray(parsed)) {
        return [];
    }
    return parsed.map((event)=>{
        var _ref, _parsedEvent_name, _ref1, _parsedEvent_attributes, _parsedEvent_timestamp;
        const parsedEvent = parseJsonIfString(event);
        if (!parsedEvent || typeof parsedEvent !== 'object') {
            return {
                timestamp: 0,
                fields: [
                    {
                        key: 'event',
                        value: parsedEvent
                    }
                ]
            };
        }
        const existingFields = Array.isArray(parsedEvent.fields) ? normalizeTraceTags(parsedEvent.fields) : [];
        const eventName = (_ref = (_parsedEvent_name = parsedEvent.name) !== null && _parsedEvent_name !== void 0 ? _parsedEvent_name : parsedEvent.event) !== null && _ref !== void 0 ? _ref : parsedEvent.event_name;
        const eventAttributes = normalizeTraceTags((_ref1 = (_parsedEvent_attributes = parsedEvent.attributes) !== null && _parsedEvent_attributes !== void 0 ? _parsedEvent_attributes : parsedEvent.event_attributes) !== null && _ref1 !== void 0 ? _ref1 : {});
        const extraFields = Object.entries(parsedEvent).filter(([key])=>![
                'timestamp',
                'time',
                'name',
                'event',
                'event_name',
                'attributes',
                'event_attributes',
                'fields'
            ].includes(key)).map(([key, value])=>({
                key,
                value
            }));
        return {
            timestamp: normalizeTraceLogTimestamp((_parsedEvent_timestamp = parsedEvent.timestamp) !== null && _parsedEvent_timestamp !== void 0 ? _parsedEvent_timestamp : parsedEvent.time),
            fields: [
                ...eventName !== undefined ? [
                    {
                        key: 'event',
                        value: eventName
                    }
                ] : [],
                ...existingFields,
                ...eventAttributes,
                ...extraFields
            ]
        };
    });
}
function formatTracesResData(frame) {
    var _frame_schema, _frame_schema1;
    const { data } = frame;
    const traceDataFrame = {
        name: 'Trace ID',
        refId: ((_frame_schema = frame.schema) === null || _frame_schema === void 0 ? void 0 : _frame_schema.refId) || 'Trace ID',
        fields: (_frame_schema1 = frame.schema) === null || _frame_schema1 === void 0 ? void 0 : _frame_schema1.fields.map((f, i)=>({
                name: f.name,
                type: f.type,
                values: data.values[i],
                typeInfo: f.typeInfo,
                config: {}
            })),
        length: data.values[0].length
    };
    traceDataFrame.fields.forEach((f)=>{
        if (f.name === 'serviceTags' || f.name === 'tags') {
            f.type = _grafana_data__WEBPACK_IMPORTED_MODULE_10__.FieldType.other;
            f.values = f.values.map((item)=>normalizeTraceTags(item));
        }
        if (f.name === 'logs') {
            f.type = _grafana_data__WEBPACK_IMPORTED_MODULE_10__.FieldType.other;
            f.values = f.values.map((item)=>normalizeTraceLogs(item));
        }
    });
    return traceDataFrame;
}
function getSearchTableData(tokenizeFields, tableResult) {
    const result = [
        ...tokenizeFields
    ];
    tableResult.forEach((tableItem)=>{
        result.forEach((token)=>{
            token['searchValue'] = tableItem[token.columnName];
        });
    });
    return result;
}
function searchField(data, searchString) {
    return (0,lodash_es__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(data, (item)=>item.columnName === searchString);
}
function parseKeywords(keyword) {
    if (keyword.length >= 2 && keyword[0] === keyword[keyword.length - 1] && (keyword[0] === `'` || keyword[0] === `"`)) {
        keyword = keyword.substring(1, keyword.length - 1);
    }
    return keyword;
}
function insertUnderscore(arr) {
    return arr.reduce((result, item, index)=>{
        result.push(item);
        if (index < arr.length - 1) {
            result.push('_');
        }
        return result;
    }, []);
}
function generateHighlightedResults(data, result) {
    const keyword = data.search_value || '';
    const searchTableData = getSearchTableData(data.indexes, result);
    // Detect simple Lucene "field:value" pattern so we can highlight the specified field
    // even when `indexes` (tokenizeFields) is empty. Example: "service_name:frontend"
    const luceneFieldMatch = keyword && keyword.match(/^\s*([^\s:]+)\s*:/);
    const luceneField = luceneFieldMatch ? luceneFieldMatch[1].replace(/['"]+/g, '') : null;
    const _sourceResult = result.map((item)=>{
        let itemSource = '';
        for(const key in item){
            let highlightValue = formatFieldDisplayValue(item[key], 'compact');
            let itemValue = highlightValue;
            if (keyword && (searchField(searchTableData, key) || luceneField && key === luceneField)) {
                const strValue = typeof itemValue === 'string' ? itemValue : itemValue + '';
                if (isWrappedInQuotes(keyword)) {
                    const parsedKeyword = parseKeywords(keyword);
                    if (parsedKeyword === strValue) {
                        // highlightValue = `<mark>${itemValue}</mark>`;
                        highlightValue = itemValue;
                    } else if (strValue.includes(parsedKeyword)) {
                        // highlightValue = highlightDelimiter(strValue, parsedKeyword);
                        highlightValue = strValue;
                    }
                } else {
                    const tokenizedAns = Array.from(js_tokens__WEBPACK_IMPORTED_MODULE_8___default()(strValue)).map((item)=>item.value);
                    let ans = [];
                    if (tokenizedAns.includes(keyword)) {
                        ans = tokenizedAns;
                    } else {
                        const ansWithUnderscore = (0,lodash_es__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(tokenizedAns.map((item)=>{
                            if (item.includes('_')) {
                                return insertUnderscore(item.split('_'));
                            }
                            return item;
                        }));
                        ans = ansWithUnderscore;
                    }
                    if (ans.length > 0) {
                        highlightValue = ans.reduce((acc, curr)=>{
                            // if (
                            //     keywordsTokens.filter(token => !isIgnorableHighlightToken(token)).find(token => compare_ignore_quotes(token, curr.toLowerCase())) ||
                            //     compare_ignore_quotes(keyword.toLowerCase(), curr.toLowerCase())
                            // ) {
                            //     return acc + `<mark>${curr}</mark>`;
                            // }
                            return acc + curr;
                        }, '');
                    }
                }
            }
            // ✅ 这里改成用 data-trace-id + class，方便事件委托识别
            if (key === 'trace_id') {
                const traceId = typeof itemValue === 'string' ? itemValue : String(itemValue);
                const content = highlightValue || traceId;
                highlightValue = `<a 
                href="javascript:void(0)" 
                class="trace-link" 
                data-trace-id="${escapeHtml(traceId)}"
            >${escapeHtml(content)}</a>`;
            } else {
                highlightValue = escapeHtml(highlightValue);
            }
            itemSource += `<span class="field-key">${escapeHtml(key)}:</span>${highlightValue} `;
        }
        return {
            _original: item,
            _source: itemSource.trim()
        };
    });
    return _sourceResult;
}
const QUERY_TRACE_FIELDS = (/* unused pure expression or super */ null && ([
    'trace_id',
    'span_id',
    'parent_span_id',
    'span_name',
    'service_name'
]));


/***/ },

/***/ 9071
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ toError)
/* harmony export */ });
function toError(value) {
    if (value instanceof Error) {
        return value;
    }
    if (typeof value === 'string') {
        return new Error(value);
    }
    if (value && typeof value === 'object') {
        const maybeMessage = value.message;
        if (typeof maybeMessage === 'string' && maybeMessage.trim().length > 0) {
            return new Error(maybeMessage);
        }
    }
    return new Error('Unknown error');
}


/***/ },

/***/ 2721
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ck: () => (/* binding */ quoteSqlLiteral),
/* harmony export */   LT: () => (/* binding */ escapeSqlIdentifier),
/* harmony export */   QI: () => (/* binding */ addSqlFilter),
/* harmony export */   t9: () => (/* binding */ getFilterSQL)
/* harmony export */ });
/* unused harmony exports escapeSqlLiteral, transformFieldPath */
function escapeSqlIdentifier(identifier) {
    return `\`${String(identifier).replace(/`/g, '``')}\``;
}
function escapeSqlLiteral(value) {
    return String(value).replace(/\\/g, '\\\\').replace(/'/g, "''");
}
function quoteSqlLiteral(value) {
    return `'${escapeSqlLiteral(value)}'`;
}
function transformFieldPath(fieldPath) {
    const parts = fieldPath.split('.');
    const root = parts.shift() || '';
    return escapeSqlIdentifier(root) + parts.map((part)=>`[${quoteSqlLiteral(part)}]`).join('');
}
function getFilterFieldReference({ fieldName, variantKey }) {
    if (variantKey !== undefined) {
        return `${escapeSqlIdentifier(fieldName)}[${quoteSqlLiteral(variantKey)}]`;
    }
    return transformFieldPath(fieldName);
}
function getFilterValue(value) {
    return typeof value === 'string' ? quoteSqlLiteral(value) : String(value);
}
function getFilterSQL(filter) {
    const { operator, value } = filter;
    const fieldReference = getFilterFieldReference(filter);
    const values = value.map(getFilterValue);
    if (operator === '=' || operator === '!=' || operator === 'like' || operator === 'not like' || operator === 'match_all' || operator === 'match_any' || operator === 'match_phrase' || operator === 'match_phrase_prefix') {
        return `${fieldReference} ${operator} ${values[0]}`;
    }
    if (operator === 'is null' || operator === 'is not null') {
        return `${fieldReference} ${operator}`;
    }
    if (operator === 'between' || operator === 'not between') {
        return `${fieldReference} ${operator} ${values[0]} AND ${values[1]}`;
    }
    if (operator === 'in' || operator === 'not in') {
        return `${fieldReference} ${operator} (${values.join(', ')})`;
    }
    return '';
}
function addSqlFilter(sql, dataFilterValue) {
    const conjunction = sql.toUpperCase().includes('WHERE') ? ' AND' : ' WHERE';
    return `${sql}${conjunction} (${getFilterSQL(dataFilterValue)})`;
}


/***/ },

/***/ 1157
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F9: () => (/* binding */ normalizeTimeZone),
/* harmony export */   FA: () => (/* binding */ renderTimeInZone),
/* harmony export */   K$: () => (/* binding */ toDayjsRange),
/* harmony export */   Oh: () => (/* binding */ formatTimeInZone),
/* harmony export */   XP: () => (/* binding */ getGrafanaUserTimeZone),
/* harmony export */   kh: () => (/* binding */ buildAbsoluteTimeRange),
/* harmony export */   mL: () => (/* binding */ toEpochSeconds),
/* harmony export */   mk: () => (/* binding */ parseTimeInZone),
/* harmony export */   n: () => (/* binding */ buildRelativeTimeRange)
/* harmony export */ });
/* unused harmony export DEFAULT_TIME_ZONE */
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7781);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5285);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2351);




const DEFAULT_TIME_ZONE = 'browser';
function getGrafanaUserTimeZone() {
    var _config_bootData_user, _config_bootData;
    return ((_config_bootData = _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.config.bootData) === null || _config_bootData === void 0 ? void 0 : (_config_bootData_user = _config_bootData.user) === null || _config_bootData_user === void 0 ? void 0 : _config_bootData_user.timezone) || DEFAULT_TIME_ZONE;
}
function normalizeTimeZone(timeZone) {
    const normalized = timeZone === null || timeZone === void 0 ? void 0 : timeZone.trim();
    return normalized ? normalized : undefined;
}
function parseTimeInZone(value, timeZone = getGrafanaUserTimeZone()) {
    if (!value) {
        return undefined;
    }
    const parsedDate = (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTimeParse)(value, {
        timeZone,
        format: _constants__WEBPACK_IMPORTED_MODULE_3__/* .FORMAT_DATE */ .fU
    });
    return (parsedDate === null || parsedDate === void 0 ? void 0 : parsedDate.isValid()) ? dayjs__WEBPACK_IMPORTED_MODULE_2___default()(parsedDate.toDate()) : undefined;
}
function formatTimeInZone(value, timeZone) {
    return (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTimeFormat)((0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTime)(value.toDate()), {
        timeZone,
        format: _constants__WEBPACK_IMPORTED_MODULE_3__/* .FORMAT_DATE */ .fU
    });
}
function toDayjsRange(timeRange) {
    return [
        dayjs__WEBPACK_IMPORTED_MODULE_2___default()(timeRange.from.toDate()),
        dayjs__WEBPACK_IMPORTED_MODULE_2___default()(timeRange.to.toDate())
    ];
}
function buildRelativeTimeRange(rawFrom, rawTo, timeZone) {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_1__.rangeUtil.convertRawToRange({
        from: rawFrom,
        to: rawTo
    }, timeZone);
}
function buildAbsoluteTimeRange(start, end) {
    return {
        from: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTime)(start.toDate()),
        to: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTime)(end.toDate()),
        raw: {
            from: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTime)(start.toDate()),
            to: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTime)(end.toDate())
        }
    };
}
/**
 * 把时间点转成 Unix 秒。
 *
 * 时间范围过滤不要再拼 'YYYY-MM-DD HH:mm:ss' 裸串:那种写法把时区解释权
 * 交给了服务端 —— Doris 会按自己的 time_zone 解释这个字符串。只要浏览器
 * (或用户选的时区)与 Doris 的 time_zone 不一致,查询窗口就整体平移,
 * 页面查不到最新数据,而且不报错。
 *
 * 换成 epoch 之后,时间点是绝对的,与两端时区设置无关。
 * 配合 SQL 里的 FROM_UNIXTIME() 使用。
 */ function toEpochSeconds(value) {
    if (!value) {
        return undefined;
    }
    const ms = value.valueOf();
    return Number.isFinite(ms) ? Math.floor(ms / 1000) : undefined;
}
/**
 * 把 Doris 返回的时间值按指定时区渲染出来。
 *
 * Doris 里存的是不带时区的 DATETIME,取回来是 'YYYY-MM-DD HH:mm:ss.SSS'
 * 这样的裸串,按 Doris 自己的 time_zone 记录(我们是 UTC)。直接显示的话
 * 用户看到的是 UTC 时刻,而时间选择器上写的是他选的时区(比如 CST),
 * 两边对不上 —— 图表 X 轴、表格时间列都会比预期差几个小时。
 *
 * 所以显示前要把它当作 sourceTimeZone 的时刻解析,再换算到 timeZone。
 *
 * 数字(epoch 毫秒)直接按 timeZone 渲染,不需要 sourceTimeZone。
 */ function renderTimeInZone(value, timeZone, sourceTimeZone = 'utc') {
    if (value === null || value === undefined || value === '') {
        return '';
    }
    if (typeof value === 'number' || typeof value === 'string' && value !== '' && !Number.isNaN(Number(value))) {
        return (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTimeFormat)((0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTime)(Number(value)), {
            timeZone,
            format: _constants__WEBPACK_IMPORTED_MODULE_3__/* .FORMAT_DATE_MS */ .uU
        });
    }
    const raw = String(value);
    const parsed = (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTimeParse)(raw, {
        timeZone: sourceTimeZone,
        format: _constants__WEBPACK_IMPORTED_MODULE_3__/* .FORMAT_DATE_MS */ .uU
    });
    if (!(parsed === null || parsed === void 0 ? void 0 : parsed.isValid())) {
        return raw;
    }
    return (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.dateTimeFormat)(parsed, {
        timeZone,
        format: _constants__WEBPACK_IMPORTED_MODULE_3__/* .FORMAT_DATE_MS */ .uU
    });
}


/***/ }

}]);
//# sourceMappingURL=590.js.map?_cache=733a363f0cec334afca0