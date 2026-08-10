"use strict";
(self["webpackChunkvelodb_doris_app"] = self["webpackChunkvelodb_doris_app"] || []).push([[625],{

/***/ 879
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ TraceDetail)
});

// EXTERNAL MODULE: external "@grafana/data"
var data_ = __webpack_require__(7781);
// EXTERNAL MODULE: external "@grafana/runtime"
var runtime_ = __webpack_require__(8531);
// EXTERNAL MODULE: external "@grafana/ui"
var ui_ = __webpack_require__(2007);
// EXTERNAL MODULE: ../node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(5285);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);
// EXTERNAL MODULE: ../node_modules/dayjs/plugin/utc.js
var utc = __webpack_require__(4486);
var utc_default = /*#__PURE__*/__webpack_require__.n(utc);
// EXTERNAL MODULE: ../node_modules/jotai/esm/react.mjs
var react = __webpack_require__(3689);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(5959);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./constants.ts + 1 modules
var constants = __webpack_require__(2351);
// EXTERNAL MODULE: ./services/traces.ts + 1 modules
var traces = __webpack_require__(3764);
// EXTERNAL MODULE: ./store/discover.ts
var discover = __webpack_require__(6247);
// EXTERNAL MODULE: ./store/traces.ts
var store_traces = __webpack_require__(3982);
// EXTERNAL MODULE: ./types/plugin-settings.ts
var plugin_settings = __webpack_require__(325);
// EXTERNAL MODULE: ./utils/data.ts
var utils_data = __webpack_require__(6700);
// EXTERNAL MODULE: ./utils/errors.ts
var errors = __webpack_require__(9071);
;// ./utils/utils.routing.ts

// Prefixes the route with the base URL of the plugin
function prefixRoute(route) {
    return `${constants/* PLUGIN_BASE_URL */.Gy}/${route}`;
}

;// ./components/trace-detail/index.tsx
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















const SPAN_LOGS_WINDOW_PADDING_MS = 30 * 1000;
dayjs_min_default().extend((utc_default()));
function escapeLucenePhrase(value) {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
function getSpanTimeRange(span) {
    const spanStartTimeMs = Math.floor(Number(span.startTime || 0) / 1000);
    const spanDurationMs = Math.ceil(Number(span.duration || 0) / 1000);
    const start = dayjs_min_default().utc(spanStartTimeMs - SPAN_LOGS_WINDOW_PADDING_MS);
    const end = dayjs_min_default().utc(spanStartTimeMs + Math.max(spanDurationMs, 0) + SPAN_LOGS_WINDOW_PADDING_MS);
    return {
        start,
        end
    };
}
function buildDiscoverLogsUrl(params) {
    const searchParams = new URLSearchParams();
    const traceQuery = `trace_id:"${escapeLucenePhrase(params.traceId)}"`;
    const spanScopeQuery = [
        params.spanId ? `span_id:"${escapeLucenePhrase(params.spanId)}"` : '',
        params.serviceName ? `service_name:"${escapeLucenePhrase(params.serviceName)}"` : ''
    ].filter(Boolean);
    if (params.datasource) {
        searchParams.set('datasource', params.datasource);
    }
    if (params.database) {
        searchParams.set('database', params.database);
    }
    if (params.table) {
        searchParams.set('table', params.table);
    }
    searchParams.set('mode', 'Lucene');
    searchParams.set('query', spanScopeQuery.length > 0 ? `${traceQuery} AND (${spanScopeQuery.join(' OR ')})` : traceQuery);
    searchParams.set('timeField', params.timeField || 'timestamp');
    searchParams.set('startTime', params.start.format(constants/* FORMAT_DATE */.fU));
    searchParams.set('endTime', params.end.format(constants/* FORMAT_DATE */.fU));
    return `${prefixRoute(constants/* ROUTES */.bw.Discover)}?${searchParams.toString()}`;
}
function TraceDetail(props) {
    var _context_meta_jsonData;
    const currentTable = (0,react/* useAtomValue */.md)(store_traces/* currentTraceTableAtom */.AZ);
    const currentCatalog = (0,react/* useAtomValue */.md)(discover/* currentCatalogAtom */.K0);
    const currentDatabase = (0,react/* useAtomValue */.md)(discover/* currentDatabaseAtom */.Cf);
    const [traceData, setTraceData] = (0,react/* useAtom */.fp)(discover/* tableTracesDataAtom */.UB);
    const selectedRow = (0,react/* useAtomValue */.md)(discover/* selectedRowAtom */.nn);
    const selectdbDS = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const traceTable = (props === null || props === void 0 ? void 0 : props.traceTable) || currentTable || 'otel_traces';
    const [loading, setLoading] = external_react_default().useState(false);
    const context = (0,data_.usePluginContext)();
    const logsConfig = (0,plugin_settings/* mergeLogsConfig */.oW)((_context_meta_jsonData = context.meta.jsonData) === null || _context_meta_jsonData === void 0 ? void 0 : _context_meta_jsonData.logsConfig);
    const { open, traceId } = props;
    const createSpanLink = external_react_default().useCallback((span)=>{
        var _span_process;
        const traceId = span.traceID || props.traceId || '';
        const spanId = span.spanID || '';
        const serviceName = ((_span_process = span.process) === null || _span_process === void 0 ? void 0 : _span_process.serviceName) || '';
        if (!traceId) {
            return undefined;
        }
        const { start, end } = getSpanTimeRange(span);
        const href = buildDiscoverLogsUrl({
            datasource: (selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.uid) || (selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.name) || '',
            database: logsConfig.database || currentDatabase,
            table: logsConfig.logsTable || 'otel_logs',
            timeField: 'timestamp',
            traceId,
            spanId,
            serviceName,
            start,
            end
        });
        return [
            {
                href,
                content: 'Logs',
                title: 'Logs for this span',
                type: 'log',
                field: {
                    name: 'span_id',
                    type: data_.FieldType.string,
                    config: {},
                    values: []
                },
                onClick: ()=>{
                    window.location.assign(href);
                }
            }
        ];
    }, [
        currentDatabase,
        logsConfig.database,
        logsConfig.logsTable,
        props.traceId,
        selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.name,
        selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.uid
    ]);
    const getTraceData = external_react_default().useCallback(()=>{
        let payload = {
            catalog: currentCatalog,
            database: currentDatabase,
            table: traceTable,
            cluster: '',
            sort: 'DESC',
            trace_id: traceId || ''
        };
        setLoading(true);
        (0,traces/* getTableDataTraceService */.hA)(_object_spread({
            selectdbDS
        }, payload)).subscribe({
            next: ({ data, ok })=>{
                setLoading(false);
                if (ok) {
                    const formatedData = (0,utils_data/* formatTracesResData */.O1)(data.results.getTableDataTrace.frames[0]);
                    setTraceData(formatedData);
                }
            },
            error: (err)=>{
                setLoading(false);
                (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                    source: 'TraceDetail',
                    action: 'getTraceData'
                });
            }
        });
    }, [
        currentCatalog,
        currentDatabase,
        traceTable,
        selectdbDS,
        setTraceData,
        traceId
    ]);
    (0,external_react_.useEffect)(()=>{
        if (traceId) {
            getTraceData();
        }
    }, [
        selectedRow.trace_id,
        currentCatalog,
        currentDatabase,
        selectdbDS,
        setTraceData,
        getTraceData,
        traceId
    ]);
    function renderTracePanel() {
        if (traceData) {
            return /*#__PURE__*/ external_react_default().createElement(runtime_.PanelRenderer, {
                title: "trace panel",
                width: 200,
                height: 300,
                pluginId: "traces",
                options: {
                    createSpanLink
                },
                data: {
                    state: loading ? data_.LoadingState.Loading : data_.LoadingState.Done,
                    series: [
                        traceData
                    ],
                    timeRange: {
                        from: new Date(Date.now() - 15 * 60 * 1000),
                        to: new Date(),
                        raw: {
                            from: 'now-15m',
                            to: 'now'
                        }
                    }
                }
            });
        }
        return null;
    }
    return /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, open && /*#__PURE__*/ external_react_default().createElement(ui_.Drawer, {
        title: "Trace Panel",
        onClose: ()=>{
            var _props_onClose;
            props === null || props === void 0 ? void 0 : (_props_onClose = props.onClose) === null || _props_onClose === void 0 ? void 0 : _props_onClose.call(props);
        },
        size: "lg"
    }, loading ? /*#__PURE__*/ external_react_default().createElement(ui_.LoadingPlaceholder, {
        text: `Loading`
    }) : renderTracePanel()));
}


/***/ },

/***/ 9693
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ useDatasourcePermissions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_grafana_permissions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7116);
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9071);
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




const EMPTY_PERMISSIONS = [];
function useDatasourcePermissions(permissions = EMPTY_PERMISSIONS, source) {
    const permissionRules = permissions !== null && permissions !== void 0 ? permissions : EMPTY_PERMISSIONS;
    const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0___default().useState({
        allowedDatasources: [],
        allowedDatasourceUids: new Set(),
        loading: true
    });
    react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(()=>{
        let isMounted = true;
        function loadPermissions() {
            return _async_to_generator(function*() {
                try {
                    const teams = yield (0,_services_grafana_permissions__WEBPACK_IMPORTED_MODULE_2__/* .fetchCurrentUserTeams */ .lp)();
                    const allowedDatasources = (0,_services_grafana_permissions__WEBPACK_IMPORTED_MODULE_2__/* .filterDatasourcesByTeamPermissions */ .ho)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getDataSourceSrv)().getList(), teams, permissionRules);
                    if (!isMounted) {
                        return;
                    }
                    setState({
                        allowedDatasources,
                        allowedDatasourceUids: new Set(allowedDatasources.map((ds)=>ds.uid)),
                        loading: false
                    });
                } catch (error) {
                    const err = (0,_utils_errors__WEBPACK_IMPORTED_MODULE_3__/* .toError */ .i)(error);
                    (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.logError)(err, {
                        source,
                        action: 'loadDatasourcePermissions'
                    });
                    if (!isMounted) {
                        return;
                    }
                    setState({
                        allowedDatasources: [],
                        allowedDatasourceUids: new Set(),
                        loading: false,
                        error: err
                    });
                }
            })();
        }
        void loadPermissions();
        return ()=>{
            isMounted = false;
        };
    }, [
        permissionRules,
        source
    ]);
    return state;
}


/***/ },

/***/ 4161
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EX: () => (/* binding */ buildTimeRangePredicate),
/* harmony export */   ZN: () => (/* binding */ timeLowerBound),
/* harmony export */   aW: () => (/* binding */ timeUpperBound),
/* harmony export */   bF: () => (/* binding */ getSurroundingSQL),
/* harmony export */   ij: () => (/* binding */ getQueryTableResultSQL),
/* harmony export */   jY: () => (/* binding */ getQueryTableResultCountSQL),
/* harmony export */   sE: () => (/* binding */ getQueryTableChartsSQL)
/* harmony export */ });
/* harmony import */ var _utils_sql_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2721);
/**
 * 构造时间范围谓词。
 *
 * 有 epoch 就用 FROM_UNIXTIME(epoch):时间点是绝对的,不受浏览器时区和
 * 服务端 time_zone 影响。实测 Doris 对 FROM_UNIXTIME(常量) 仍能做分区裁剪
 * (partitions=1/N),没有性能代价。
 *
 * 没有 epoch 时退回原来的裸串写法,保证兼容旧调用方。
 */ function buildTimeRangePredicate(params) {
    const field = `\`${params.timeField}\``;
    if (typeof params.startEpoch === 'number' && typeof params.endEpoch === 'number') {
        return `(${field} BETWEEN FROM_UNIXTIME(${params.startEpoch}) AND FROM_UNIXTIME(${params.endEpoch}))`;
    }
    return `(${field} BETWEEN '${params.startDate}' AND '${params.endDate}')`;
}


/**
 * 时间范围的上下界表达式(单独取用)。
 * 同 buildTimeRangePredicate:有 epoch 走 FROM_UNIXTIME,否则退回裸串。
 */ function timeLowerBound(params) {
    return typeof params.startEpoch === 'number' ? `FROM_UNIXTIME(${params.startEpoch})` : `'${params.startDate}'`;
}
function timeUpperBound(params) {
    return typeof params.endEpoch === 'number' ? `FROM_UNIXTIME(${params.endEpoch})` : `'${params.endDate}'`;
}
function getQueryTableResultSQL(params) {
    const indexesStatement = params.indexes_statement;
    let statement = `SELECT * FROM \`${params.database}\`.\`${params.table}\` WHERE`;
    if (indexesStatement && params.search_type === 'Search') {
        statement += ` (${indexesStatement}) AND`;
    }
    // timeField 加上反引号
    statement += ` ${buildTimeRangePredicate(params)} `;
    statement = params.data_filters.reduce((prev, curr)=>{
        return (0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_0__/* .addSqlFilter */ .QI)(prev, curr);
    }, statement);
    if (params.search_type === 'SQL' && params.search_value) {
        statement = statement + ` AND ${params.search_value}`;
    }
    if (params.search_type === 'Lucene' && params.lucene_where) {
        statement = statement + ` AND (${params.lucene_where})`;
    }
    // ORDER BY 的 timeField 也加反引号
    statement = statement + ` ORDER BY \`${params.timeField}\` DESC LIMIT ${+params.page_size} OFFSET ${(+(params === null || params === void 0 ? void 0 : params.page) - 1) * params.page_size} `;
    return statement;
}
function getQueryTableChartsSQL(params) {
    const indexes = params.indexes;
    let statement = `SELECT ${params.interval}_FLOOR(table_per_time.T,${params.interval_value}) as TT,sum(table_per_time.cnt) FROM (SELECT ${params.interval}_FLOOR(${params.timeField}) as T,count(*) as cnt FROM \`${params.database}\`.\`${params.table}\` WHERE`;
    if (indexes && params.search_type === 'Search') {
        statement += ` (${indexes}) AND`;
    }
    statement += ` ${buildTimeRangePredicate(params)} `;
    if (params.data_filters.length > 0) {
        statement = params.data_filters.reduce((prev, curr)=>{
            return (0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_0__/* .addSqlFilter */ .QI)(prev, curr);
        }, statement);
    }
    if (params.search_type === 'SQL' && params.search_value) {
        statement = statement + ` ` + `AND ${params.search_value}`;
    }
    if (params.search_type === 'Lucene' && params.lucene_where) {
        statement = statement + ` AND (${params.lucene_where})`;
    }
    statement = statement + ` ` + `GROUP BY T ORDER BY T) as table_per_time GROUP BY TT ORDER BY TT`;
    return statement;
}
function getQueryTableResultCountSQL(params) {
    const indexes = params.indexes;
    let statement = `SELECT SUM(table_per_time.cnt) AS total_count
        FROM (
          SELECT ${params.interval}_FLOOR(${params.timeField}) as T, COUNT(*) as cnt
          FROM \`${params.database}\`.\`${params.table}\`
          WHERE`;
    if (indexes && params.search_type === 'Search') {
        statement += ` (${indexes}) AND`;
    }
    statement += ` ${buildTimeRangePredicate(params)}`;
    if (params.data_filters.length > 0) {
        statement = params.data_filters.reduce((prev, curr)=>{
            return (0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_0__/* .addSqlFilter */ .QI)(prev, curr);
        }, statement);
    }
    if (params.search_type === 'SQL' && params.search_value) {
        statement = statement + ` ` + `AND ${params.search_value}`;
    }
    if (params.search_type === 'Lucene' && params.lucene_where) {
        statement = statement + ` AND (${params.lucene_where})`;
    }
    statement = statement + ` ` + `GROUP BY T) AS table_per_time;`;
    return statement;
}
function getSurroundingSQL(params) {
    let statement = `SELECT * FROM \`${params.database}\`.\`${params.table}\` WHERE`;
    statement += ` (\`${params.timeField}\` ${params.operator} '${params.time}')`;
    statement = params.data_filters.reduce((prev, curr)=>{
        return (0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_0__/* .addSqlFilter */ .QI)(prev, curr);
    }, statement);
    const orderSymbol = params.operator === '<' ? 'DESC' : 'ASC';
    statement = statement + ` ` + `ORDER BY \`${params.timeField}\` ${orderSymbol} LIMIT ${+params.pageSize}`;
    return statement;
}


/***/ },

/***/ 3764
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  jo: () => (/* binding */ getOperationListService),
  FC: () => (/* binding */ getServiceListService),
  hA: () => (/* binding */ getTableDataTraceService),
  Cy: () => (/* binding */ getTracesService)
});

// EXTERNAL MODULE: external "@grafana/runtime"
var runtime_ = __webpack_require__(8531);
// EXTERNAL MODULE: ./services/sql.ts
var sql = __webpack_require__(4161);
;// ./services/traces.sql.ts

function getQueryTableTraceSQL(params) {
    const { table, trace_id, database } = params;
    const sql = `
      SELECT
      trace_id AS traceID,
      span_id AS spanID,
      parent_span_id AS parentSpanID,
      span_name AS operationName,
      service_name AS serviceName,

      CAST(resource_attributes AS TEXT) AS serviceTags,

      UNIX_TIMESTAMP(timestamp) * 1000 AS startTime,
      duration / 1000 AS duration,

      CAST(span_attributes AS TEXT) AS tags,
      CAST(ARRAY_MAP(e -> NAMED_STRUCT(
        'timestamp', CAST(UNIX_TIMESTAMP(STRUCT_ELEMENT(e, 'timestamp')) * 1000 AS BIGINT),
        'name', STRUCT_ELEMENT(e, 'name'),
        'attributes', STRUCT_ELEMENT(e, 'attributes')
      ), events) AS JSON) AS logs,

      span_kind AS kind,
      CASE
        WHEN status_code IN ('STATUS_CODE_ERROR', 'ERROR') THEN 2
        WHEN status_code IN ('STATUS_CODE_OK', 'OK') THEN 1
        ELSE 0
      END AS statusCode,
      status_message AS statusMessage,
      scope_name AS instrumentationLibraryName,
      scope_version AS instrumentationLibraryVersion,
      trace_state AS traceState
    FROM ${database}.\`${table}\`
    WHERE trace_id = '${trace_id}';
    `;
    return sql;
}
function parseDuration(input) {
    if (!input) {
        return 0;
    }
    const normalizedInput = input.trim().toLowerCase();
    if (!normalizedInput) {
        return 0;
    }
    if (normalizedInput.endsWith('ms')) {
        return parseFloat(normalizedInput.replace('ms', ''));
    } else if (normalizedInput.endsWith('us')) {
        return parseFloat(normalizedInput.replace('us', '')) / 1000;
    } else if (normalizedInput.endsWith('s')) {
        return parseFloat(normalizedInput.replace('s', '')) * 1000;
    }
    // Treat bare numeric input as milliseconds for simpler filtering.
    const numericDuration = parseFloat(normalizedInput);
    return Number.isFinite(numericDuration) ? numericDuration : 0;
}
function tagsToDorisSQLConditions(tags, tableAlias) {
    if (!tags) {
        return '1=1';
    }
    const conditions = [];
    const regex = /([\w.]+)=(?:"([^"]+)"|'([^']+)'|([^\s]+))/g;
    let match;
    while((match = regex.exec(tags)) !== null){
        const key = match[1];
        const val = match[2] || match[3] || match[4];
        const spanAttributes = tableAlias ? `${tableAlias}.span_attributes` : 'span_attributes';
        conditions.push(`${spanAttributes}['${key}'] = '${val}'`);
    }
    return conditions.length > 0 ? conditions.join(' AND ') : '1=1';
}
function buildMostRecentTraceAggSQL(params, limit, offset, durationFilter) {
    const rootFilters = [
        'root_rank = 1'
    ];
    if (params.service_name && params.service_name !== 'all') {
        rootFilters.push(`root_service = '${params.service_name}'`);
    }
    if (params.operation && params.operation !== 'all') {
        rootFilters.push(`operation = '${params.operation}'`);
    }
    const extendedTimeFilter = (alias)=>`${alias}.${params.timeField} >= ${(0,sql/* timeLowerBound */.ZN)(params)} - INTERVAL 2 DAY
      AND ${alias}.${params.timeField} < ${(0,sql/* timeUpperBound */.aW)(params)} + INTERVAL 2 DAY`;
    const optionalCtes = [];
    const eligibilityJoins = [];
    const eligibilityFilters = [
        '1=1'
    ];
    if (params.statusCode && params.statusCode !== 'all') {
        optionalCtes.push(`status_trace_ids AS (
    SELECT DISTINCT t.trace_id
    FROM ${params.table} t
    JOIN selected_roots r ON t.trace_id = r.trace_id
    WHERE ${extendedTimeFilter('t')}
      AND t.status_code = '${params.statusCode}'
  )`);
        eligibilityJoins.push('JOIN status_trace_ids s ON r.trace_id = s.trace_id');
    }
    if (params.tags) {
        optionalCtes.push(`tag_trace_ids AS (
    SELECT DISTINCT t.trace_id
    FROM ${params.table} t
    JOIN selected_roots r ON t.trace_id = r.trace_id
    WHERE ${extendedTimeFilter('t')}
      AND ${tagsToDorisSQLConditions(params.tags, 't')}
  )`);
        eligibilityJoins.push('JOIN tag_trace_ids g ON r.trace_id = g.trace_id');
    }
    if (durationFilter !== '1=1') {
        optionalCtes.push(`trace_durations AS (
    SELECT
      t.trace_id,
      MAX(UNIX_TIMESTAMP(t.${params.timeField}) * 1000 + t.duration / 1000)
        - MIN(UNIX_TIMESTAMP(t.${params.timeField}) * 1000) AS trace_duration_ms
    FROM ${params.table} t
    JOIN selected_roots r ON t.trace_id = r.trace_id
    WHERE ${extendedTimeFilter('t')}
    GROUP BY t.trace_id
  )`);
        eligibilityJoins.push('JOIN trace_durations d ON r.trace_id = d.trace_id');
        eligibilityFilters.push(durationFilter.replace(/trace_duration_ms/g, 'd.trace_duration_ms'));
    }
    const ctes = [
        `root_span_candidates AS (
    SELECT
      trace_id,
      ${params.timeField} AS root_time,
      span_name AS operation,
      service_name AS root_service,
      duration AS root_duration,
      ROW_NUMBER() OVER (
        PARTITION BY trace_id
        ORDER BY ${params.timeField} ASC, span_id ASC
      ) AS root_rank
    FROM ${params.table}
    WHERE ${params.timeField} >= ${(0,sql/* timeLowerBound */.ZN)(params)}
      AND ${params.timeField} < ${(0,sql/* timeUpperBound */.aW)(params)}
      AND (parent_span_id IS NULL OR parent_span_id = '')
  )`,
        `selected_roots AS (
    SELECT trace_id, root_time, operation, root_service, root_duration
    FROM root_span_candidates
    WHERE ${rootFilters.join('\n      AND ')}
  )`,
        ...optionalCtes,
        `eligible_roots AS (
    SELECT r.*
    FROM selected_roots r
    ${eligibilityJoins.join('\n    ')}
    WHERE ${eligibilityFilters.join('\n      AND ')}
  )`,
        `counted_roots AS (
    SELECT r.*, COUNT(*) OVER() AS total_count
    FROM eligible_roots r
  )`,
        `page_root_spans AS (
    SELECT *
    FROM counted_roots
    ORDER BY root_time DESC, trace_id DESC
    LIMIT ${limit} OFFSET ${offset}
  )`
    ];
    return `
USE ${params.database};

WITH
  ${ctes.join(',\n  ')}

SELECT
  UNIX_TIMESTAMP(p.root_time) AS time,
  t.trace_id,
  p.operation,
  p.root_service,
  COLLECT_SET(t.service_name) AS services,
  COUNT(*) AS spans,
  SUM(IF(t.status_code IN ('STATUS_CODE_ERROR', 'ERROR'), 1, 0)) AS error_spans,
  MAX(t.duration) / 1000 AS max_span_duration_ms,
  MAX(UNIX_TIMESTAMP(t.${params.timeField}) * 1000 + t.duration / 1000)
    - MIN(UNIX_TIMESTAMP(t.${params.timeField}) * 1000) AS trace_duration_ms,
  p.root_duration / 1000 AS root_span_duration_ms,
  p.total_count,
  p.total_count AS total
FROM ${params.table} t
JOIN page_root_spans p ON t.trace_id = p.trace_id
WHERE ${extendedTimeFilter('t')}
GROUP BY
  p.root_time,
  t.trace_id,
  p.operation,
  p.root_service,
  p.root_duration,
  p.total_count
ORDER BY p.root_time DESC, t.trace_id DESC;
`;
}
function buildTraceAggSQLFromParams(params) {
    var _params_page_size, _params_page;
    const timeFilter = `${params.timeField} >= ${(0,sql/* timeLowerBound */.ZN)(params)} AND ${params.timeField} < ${(0,sql/* timeUpperBound */.aW)(params)}`;
    const serviceFilter = params.service_name && params.service_name !== 'all' ? `service_name = '${params.service_name}'` : '1=1';
    const operationFilter = params.operation && params.operation !== 'all' ? `span_name = '${params.operation}'` : '1=1';
    const statusFilter = params.statusCode && params.statusCode !== 'all' ? `status_code = '${params.statusCode}'` : '1=1';
    const minDuration = parseDuration(params.minDuration);
    const maxDuration = parseDuration(params.maxDuration);
    let durationFilter = '1=1';
    if (minDuration > 0 && maxDuration > 0) {
        durationFilter = `trace_duration_ms BETWEEN ${minDuration} AND ${maxDuration}`;
    } else if (minDuration > 0) {
        durationFilter = `trace_duration_ms >= ${minDuration}`;
    } else if (maxDuration > 0) {
        durationFilter = `trace_duration_ms <= ${maxDuration}`;
    }
    const tagsFilter = tagsToDorisSQLConditions(params.tags);
    let rootSpansFilter = '1=1';
    if (params.service_name && params.service_name !== 'all') {
        rootSpansFilter = `service_name = '${params.service_name}'`;
    }
    if (params.operation && params.operation !== 'all') {
        rootSpansFilter += ` AND span_name = '${params.operation}'`;
    }
    const limit = (_params_page_size = params.page_size) !== null && _params_page_size !== void 0 ? _params_page_size : 1000;
    const offset = Math.max((((_params_page = params.page) !== null && _params_page !== void 0 ? _params_page : 1) - 1) * limit, 0);
    if (!params.sortBy || params.sortBy === 'most-recent') {
        return buildMostRecentTraceAggSQL(params, limit, offset, durationFilter);
    }
    let rowNumberOrderBy = 'time DESC';
    switch(params.sortBy){
        case 'longest-duration':
            rowNumberOrderBy = 'trace_duration_ms DESC';
            break;
        case 'shortest-duration':
            rowNumberOrderBy = 'trace_duration_ms ASC';
            break;
        case 'most-spans':
            rowNumberOrderBy = 'spans DESC';
            break;
        case 'least-spans':
            rowNumberOrderBy = 'spans ASC';
            break;
        case 'most-recent':
            rowNumberOrderBy = 'time DESC';
            break;
    }
    const query = `
USE ${params.database};

WITH
  trace_durations AS (
    SELECT
      trace_id,
      MAX(UNIX_TIMESTAMP(timestamp) * 1000 + duration / 1000) - MIN(UNIX_TIMESTAMP(timestamp) * 1000) AS trace_duration_ms
    FROM ${params.table}
    WHERE ${timeFilter}
    GROUP BY trace_id
  ),
  all_trace_ids AS (
    SELECT
      t.trace_id,
      MIN(t.${params.timeField}) AS time,
      d.trace_duration_ms
    FROM ${params.table} t
    JOIN trace_durations d ON t.trace_id = d.trace_id
    WHERE
      ${timeFilter}
      AND ${serviceFilter}
      AND ${operationFilter}
      AND ${statusFilter}
      AND ${tagsFilter}
      AND 1=1
      AND ${durationFilter}
    GROUP BY t.trace_id, d.trace_duration_ms
  ),
  root_spans AS (
    SELECT trace_id, span_name AS operation, service_name AS root_service
    FROM ${params.table}
    WHERE (parent_span_id IS NULL
    OR parent_span_id = '')
    AND ${timeFilter}
    AND ${rootSpansFilter}
    group by trace_id,operation,root_service
  ),
  aggregated AS (
    SELECT
      UNIX_TIMESTAMP(MIN(t.${params.timeField})) AS time,
      t.trace_id,
      r.operation,
      r.root_service,
      COLLECT_SET(t.service_name) AS services,
      COUNT(*) AS spans,
      SUM(IF(status_code = 'STATUS_CODE_ERROR', 1, 0)) AS error_spans,
      MAX(duration) / 1000 AS max_span_duration_ms,
      MAX(UNIX_TIMESTAMP(t.timestamp) * 1000 + duration / 1000) - MIN(UNIX_TIMESTAMP(t.timestamp) * 1000) AS trace_duration_ms,
      MAX(IF(t.parent_span_id IS NULL OR t.parent_span_id = '', duration, 0)) / 1000 AS root_span_duration_ms
    FROM ${params.table} t
    JOIN all_trace_ids a ON t.trace_id = a.trace_id
    JOIN root_spans r ON t.trace_id = r.trace_id
    GROUP BY t.trace_id, r.operation, r.root_service
  ),
  numbered AS (
    SELECT
      a.*,
      COUNT(*) OVER() AS total_count,
      ROW_NUMBER() OVER(ORDER BY ${rowNumberOrderBy}) AS rn
    FROM aggregated a
  )

SELECT
  *,
  total_count AS total
FROM numbered
WHERE rn > ${offset} AND rn <= ${offset + limit}
ORDER BY ${rowNumberOrderBy};
`;
    return query;
}
function getServiceListSQL(params) {
    return `
    SELECT DISTINCT service_name 
    FROM ${params.table} 
    WHERE ${(0,sql/* buildTimeRangePredicate */.EX)(params)} 
    ORDER BY service_name ASC
  `;
}
function getOperationListSQL(params) {
    return `
    SELECT DISTINCT span_name 
    FROM ${params.table} 
    WHERE ${(0,sql/* buildTimeRangePredicate */.EX)(params)} 
    AND service_name = '${params.service_name}'
    ORDER BY span_name ASC
  `;
}

// EXTERNAL MODULE: ./components/with-error-handler/withErrorHandler.tsx
var withErrorHandler = __webpack_require__(6472);
;// ./services/traces.ts
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



// 获取table的Trace数据
function getTableDataTraceService(payload, options) {
    const { selectdbDS } = payload, rest = _object_without_properties(payload, [
        "selectdbDS"
    ]);
    const traceSQL = getQueryTableTraceSQL(rest);
    return (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getTableDataTrace',
                    datasource: {
                        type: 'mysql',
                        uid: selectdbDS.uid
                    },
                    rawSql: traceSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), options);
}
// 查询Traces
function getTracesService(payload, options) {
    const { selectdbDS } = payload, rest = _object_without_properties(payload, [
        "selectdbDS"
    ]);
    const getTracesSQL = buildTraceAggSQLFromParams(rest);
    return (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getTraces',
                    datasource: {
                        type: 'mysql',
                        uid: selectdbDS.uid
                    },
                    rawSql: getTracesSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), options);
}
// 查询Trace Services
function getServiceListService(payload, options) {
    const { selectdbDS } = payload, rest = _object_without_properties(payload, [
        "selectdbDS"
    ]);
    const serviceListSQL = getServiceListSQL(rest);
    return (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getServiceList',
                    datasource: {
                        type: 'mysql',
                        uid: selectdbDS.uid
                    },
                    rawSql: serviceListSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), options);
}
// 查询Trace Operations
function getOperationListService(payload, options) {
    const { selectdbDS } = payload, rest = _object_without_properties(payload, [
        "selectdbDS"
    ]);
    const operationListSQL = getOperationListSQL(rest);
    return (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getOperationList',
                    datasource: {
                        type: 'mysql',
                        uid: selectdbDS.uid
                    },
                    rawSql: operationListSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), options);
}


/***/ },

/***/ 3982
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AZ: () => (/* binding */ currentTraceTableAtom),
/* harmony export */   E: () => (/* binding */ tracesServicesAtom),
/* harmony export */   VA: () => (/* binding */ traceOperationsAtom),
/* harmony export */   fy: () => (/* binding */ currentSortAtom),
/* harmony export */   gL: () => (/* binding */ currentServiceAtom),
/* harmony export */   jB: () => (/* binding */ tagsAtom),
/* harmony export */   mH: () => (/* binding */ currentOperationAtom),
/* harmony export */   oC: () => (/* binding */ minDurationAtom),
/* harmony export */   ok: () => (/* binding */ tracesAtom),
/* harmony export */   uS: () => (/* binding */ maxDurationAtom)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2351);
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4945);
/* harmony import */ var jotai_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6303);



const currentTraceTableAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_2__/* .atomWithStorage */ .tG)('trace-current-table', '');
const currentServiceAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)(_constants__WEBPACK_IMPORTED_MODULE_0__/* .DEFAULT_SERVICE */ .aR);
const currentOperationAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)(_constants__WEBPACK_IMPORTED_MODULE_0__/* .DEFAULT_OPERATION */ .UB);
const currentSortAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)('most-recent');
const tagsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)('');
const tracesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)([]);
const tracesServicesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)([]);
const traceOperationsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)([]);
const minDurationAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)('');
const maxDurationAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)('');


/***/ },

/***/ 2551
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gw: () => (/* binding */ trimSpacesAroundEquals),
/* harmony export */   sd: () => (/* binding */ generateTableDataUID)
/* harmony export */ });
/* unused harmony exports generateUid, isIgnorableHighlightToken */
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
// --- stable stringify: 递归排序键，避免循环引用导致崩溃 ---
function stableStringify(value) {
    const seen = new WeakSet();
    const recur = (v)=>{
        if (v === null) {
            return 'null';
        }
        const t = typeof v;
        if (t === 'number') {
            return Number.isFinite(v) ? String(v) : 'null';
        }
        if (t === 'boolean') {
            return v ? 'true' : 'false';
        }
        if (t === 'string') {
            return JSON.stringify(v);
        }
        if (t === 'bigint') {
            return JSON.stringify(v.toString());
        }
        if (t === 'undefined' || t === 'function' || t === 'symbol') {
            return 'null';
        }
        // object / array
        if (seen.has(v)) {
            return '"[Circular]"';
        }
        seen.add(v);
        if (Array.isArray(v)) {
            return '[' + v.map(recur).join(',') + ']';
        }
        const keys = Object.keys(v).sort();
        const body = keys.map((k)=>JSON.stringify(k) + ':' + recur(v[k])).join(',');
        return '{' + body + '}';
    };
    return recur(value);
}
// --- 小工具 ---
function u8ToHex(u8) {
    let out = '';
    for(let i = 0; i < u8.length; i++){
        out += u8[i].toString(16).padStart(2, '0');
    }
    return out;
}
function hasSubtle() {
    var _window_crypto_subtle;
    return typeof window !== 'undefined' && !!window.crypto && !!window.isSecureContext && typeof ((_window_crypto_subtle = window.crypto.subtle) === null || _window_crypto_subtle === void 0 ? void 0 : _window_crypto_subtle.digest) === 'function';
}
// --- 纯 JS 的 SHA-256 fallback（简实现，无依赖） ---
function sha256HexJS(data) {
    // 常量
    const K = new Uint32Array([
        0x428a2f98,
        0x71374491,
        0xb5c0fbcf,
        0xe9b5dba5,
        0x3956c25b,
        0x59f111f1,
        0x923f82a4,
        0xab1c5ed5,
        0xd807aa98,
        0x12835b01,
        0x243185be,
        0x550c7dc3,
        0x72be5d74,
        0x80deb1fe,
        0x9bdc06a7,
        0xc19bf174,
        0xe49b69c1,
        0xefbe4786,
        0x0fc19dc6,
        0x240ca1cc,
        0x2de92c6f,
        0x4a7484aa,
        0x5cb0a9dc,
        0x76f988da,
        0x983e5152,
        0xa831c66d,
        0xb00327c8,
        0xbf597fc7,
        0xc6e00bf3,
        0xd5a79147,
        0x06ca6351,
        0x14292967,
        0x27b70a85,
        0x2e1b2138,
        0x4d2c6dfc,
        0x53380d13,
        0x650a7354,
        0x766a0abb,
        0x81c2c92e,
        0x92722c85,
        0xa2bfe8a1,
        0xa81a664b,
        0xc24b8b70,
        0xc76c51a3,
        0xd192e819,
        0xd6990624,
        0xf40e3585,
        0x106aa070,
        0x19a4c116,
        0x1e376c08,
        0x2748774c,
        0x34b0bcb5,
        0x391c0cb3,
        0x4ed8aa4a,
        0x5b9cca4f,
        0x682e6ff3,
        0x748f82ee,
        0x78a5636f,
        0x84c87814,
        0x8cc70208,
        0x90befffa,
        0xa4506ceb,
        0xbef9a3f7,
        0xc67178f2
    ]);
    // 初始哈希
    let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a, h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
    // 预处理：填充
    const l = data.length;
    const bitLenHi = l >>> 29 >>> 0;
    const bitLenLo = l << 3 >>> 0;
    const nBlocks = (l + 9 >> 6) + 1 << 4; // 以 16 个 32bit 为一组
    const M = new Uint32Array(nBlocks);
    for(let i = 0; i < l; i++){
        M[i >> 2] |= data[i] << (3 - (i & 3) << 3);
    }
    M[l >> 2] |= 0x80 << (3 - (l & 3) << 3);
    M[nBlocks - 2] = bitLenHi;
    M[nBlocks - 1] = bitLenLo;
    const W = new Uint32Array(64);
    const rotr = (x, n)=>x >>> n | x << 32 - n;
    for(let i = 0; i < nBlocks; i += 16){
        for(let t = 0; t < 16; t++){
            W[t] = M[i + t];
        }
        for(let t = 16; t < 64; t++){
            const s0 = (rotr(W[t - 15], 7) ^ rotr(W[t - 15], 18) ^ W[t - 15] >>> 3) >>> 0;
            const s1 = (rotr(W[t - 2], 17) ^ rotr(W[t - 2], 19) ^ W[t - 2] >>> 10) >>> 0;
            W[t] = W[t - 16] + s0 + W[t - 7] + s1 >>> 0;
        }
        let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
        for(let t = 0; t < 64; t++){
            const S1 = (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) >>> 0;
            const ch = (e & f ^ ~e & g) >>> 0;
            const T1 = h + S1 + ch + K[t] + W[t] >>> 0;
            const S0 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) >>> 0;
            const maj = (a & b ^ a & c ^ b & c) >>> 0;
            const T2 = S0 + maj >>> 0;
            h = g;
            g = f;
            f = e;
            e = d + T1 >>> 0;
            d = c;
            c = b;
            b = a;
            a = T1 + T2 >>> 0;
        }
        h0 = h0 + a >>> 0;
        h1 = h1 + b >>> 0;
        h2 = h2 + c >>> 0;
        h3 = h3 + d >>> 0;
        h4 = h4 + e >>> 0;
        h5 = h5 + f >>> 0;
        h6 = h6 + g >>> 0;
        h7 = h7 + h >>> 0;
    }
    const out = new Uint8Array(32);
    const H = [
        h0,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        h7
    ];
    for(let i = 0; i < 8; i++){
        out[i * 4 + 0] = H[i] >>> 24 & 0xff;
        out[i * 4 + 1] = H[i] >>> 16 & 0xff;
        out[i * 4 + 2] = H[i] >>> 8 & 0xff;
        out[i * 4 + 3] = H[i] & 0xff;
    }
    return u8ToHex(out);
}
// --- 通用 SHA-256（浏览器优先，fallback 到纯 JS） ---
function sha256Hex(input) {
    return _async_to_generator(function*() {
        const data = new TextEncoder().encode(input);
        if (hasSubtle()) {
            const buf = yield window.crypto.subtle.digest('SHA-256', data);
            return u8ToHex(new Uint8Array(buf));
        }
        // 非 https 或老环境：走纯 JS
        return sha256HexJS(data);
    })();
}
// --- 你的两个导出函数 ---
function generateUid(obj) {
    return _async_to_generator(function*() {
        const json = stableStringify(obj);
        return sha256Hex(json);
    })();
}
function generateTableDataUID(items) {
    return _async_to_generator(function*() {
        // 允许 _original 缺失时退回整个 item；并发计算，更快
        const sources = items.map((it)=>{
            var _ref;
            return (_ref = it && it._original) !== null && _ref !== void 0 ? _ref : it;
        });
        const uids = yield Promise.all(sources.map(generateUid));
        return items.map((it, i)=>_object_spread_props(_object_spread({}, it), {
                _uid: uids[i]
            }));
    })();
}
function isIgnorableHighlightToken(token) {
    const ignoreChars = new Set([
        ',',
        '.',
        ';',
        ':',
        '(',
        ')',
        '{',
        '}',
        '[',
        ']',
        '+',
        '-',
        '*',
        '/',
        '=',
        '<',
        '>',
        '!',
        '?',
        '|',
        '&',
        '%',
        '^',
        '$',
        '#',
        '@',
        '~',
        '`',
        '\\',
        "'",
        '"'
    ]);
    // 全是空格或换行
    if (!token.trim()) {
        return true;
    }
    // 单个字符且在 ignoreChars 中
    if (token.length === 1 && ignoreChars.has(token)) {
        return true;
    }
    // 多个字符但全是标点符号
    if (/^[\u2000-\u206F\u2E00-\u2E7F!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/.test(token)) {
        return true;
    }
    return false;
}
function trimSpacesAroundEquals(str) {
    // 去掉等于号两边所有空格
    return str.replace(/\s*=\s*/g, '=');
}


/***/ }

}]);
//# sourceMappingURL=625.js.map?_cache=ea9951b34e28165a841a