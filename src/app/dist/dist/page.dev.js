'use client';
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

exports.__esModule = true;

var react_1 = require("react");

var axios_1 = require("axios");

var js_cookie_1 = require("js-cookie");

var EventsTasksList_1 = require("@/components/EventsTasksList/EventsTasksList");

var ErrorComponent_1 = require("@/components/ErrorComponent/ErrorComponent");

var SuggestionsView_1 = require("@/components/SuggestionsView/SuggestionsView");

var LoadingSpinner_1 = require("@/components/LoadingSpinner/LoadingSpinner");

var RateLimitError_1 = require("@/components/RateLimitError/RateLimitError");

var GroqTermsAlert_1 = require("@/components/GroqTerms/GroqTermsAlert");

function Home() {
  var _a;

  var _this = this;

  var _b;

  var _c = react_1.useState([]),
      events = _c[0],
      setEvents = _c[1];

  var _d = react_1.useState([]),
      tasks = _d[0],
      setTasks = _d[1];

  var _e = react_1.useState([]),
      combinedItems = _e[0],
      setCombinedItems = _e[1];

  var _f = react_1.useState({}),
      suggestions = _f[0],
      setSuggestions = _f[1];

  var _g = react_1.useState(false),
      loading = _g[0],
      setLoading = _g[1];

  var _h = react_1.useState(null),
      error = _h[0],
      setError = _h[1];

  var _j = react_1.useState(null),
      authToken = _j[0],
      setAuthToken = _j[1];

  var _k = react_1.useState(false),
      showSuggestions = _k[0],
      setShowSuggestions = _k[1];

  var _l = react_1.useState({}),
      storedSuggestions = _l[0],
      setStoredSuggestions = _l[1];

  var _m = react_1.useState(null),
      selectedItemId = _m[0],
      setSelectedItemId = _m[1];

  var _o = react_1.useState(false),
      termsAccepted = _o[0],
      setTermsAccepted = _o[1];

  var _p = react_1.useState(true),
      isTermsModalOpen = _p[0],
      setIsTermsModalOpen = _p[1];

  var fetchItems = function fetchItems() {
    return __awaiter(_this, void 0, void 0, function () {
      var currentDate, nextWeekDate, timeMin, timeMax, data, eventsData, tasksData, limitedEvents, limitedTasks, seenTitles_1, combined, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!authToken) {
              setError('No valid Google token found.');
              return [2
              /*return*/
              ];
            }

            setLoading(true);
            setError(null);
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3, 4, 5]);

            currentDate = new Date();
            nextWeekDate = new Date(currentDate);
            nextWeekDate.setDate(currentDate.getDate() + 15);
            timeMin = currentDate.toISOString();
            timeMax = nextWeekDate.toISOString();
            return [4
            /*yield*/
            , axios_1["default"].get('/api/events', {
              headers: {
                Authorization: "Bearer " + authToken
              },
              params: {
                timeMin: timeMin,
                timeMax: timeMax
              }
            })];

          case 2:
            data = _a.sent().data;
            eventsData = data.events || [];
            tasksData = data.tasks || [];
            limitedEvents = eventsData.slice(0, 5);
            limitedTasks = tasksData.slice(0, 5);
            setEvents(limitedEvents);
            setTasks(limitedTasks);
            seenTitles_1 = new Set();
            combined = __spreadArrays(limitedEvents.map(function (event) {
              var title = event.summary; // If the title is already seen, skip this event

              if (seenTitles_1.has(title)) {
                return null; // Return null for duplicate event
              }

              seenTitles_1.add(title); // Add the title to the set

              return {
                id: event.id,
                type: 'event',
                title: event.summary,
                details: event.description || 'No description',
                start: event.start,
                end: event.end
              };
            }), limitedTasks.map(function (task) {
              var title = task.title; // If the title is already seen, skip this task

              if (seenTitles_1.has(title)) {
                return null; // Return null for duplicate task
              }

              seenTitles_1.add(title); // Add the title to the set

              return {
                id: task.id,
                type: 'task',
                title: task.title,
                details: task.notes || 'No details',
                start: task.due
              };
            })).filter(function (item) {
              return item !== null;
            }); // Sort combined events and tasks by start date

            combined.sort(function (a, b) {
              var dateA = new Date(a.start || 0).getTime();
              var dateB = new Date(b.start || 0).getTime();
              return dateA - dateB;
            });
            setCombinedItems(combined);
            return [3
            /*break*/
            , 5];

          case 3:
            err_1 = _a.sent();
            setError(err_1.message || 'Failed to fetch data');
            return [3
            /*break*/
            , 5];

          case 4:
            setLoading(false);
            return [7
            /*endfinally*/
            ];

          case 5:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  var analyzeEventsAndTasks = function analyzeEventsAndTasks() {
    return __awaiter(_this, void 0, void 0, function () {
      var analysis, storedData, parsedData, err_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (combinedItems.length === 0) {
              setError('No events or tasks to analyze.');
              return [2
              /*return*/
              ];
            } // Check if there are stored suggestions, if so, use them and return


            if (Object.keys(storedSuggestions).length > 0) {
              setSuggestions(storedSuggestions); // Directly set stored suggestions

              return [2
              /*return*/
              ];
            }

            setLoading(true);
            setError(null);
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3, 4, 5]);

            return [4
            /*yield*/
            , axios_1["default"].post('/api/analyse', {
              tasks: combinedItems
            })];

          case 2:
            analysis = _a.sent().data; // Store the analysis (which could be an array) in sessionStorage

            sessionStorage.setItem('suggestions', JSON.stringify(analysis));
            storedData = sessionStorage.getItem('suggestions');
            parsedData = void 0;

            if (storedData !== null) {
              parsedData = JSON.parse(storedData);
            } else {
              parsedData = {}; // Or handle the case when data doesn't exist
            } // Set the suggestions and store them in the state


            setSuggestions(parsedData);
            setStoredSuggestions(parsedData);
            return [3
            /*break*/
            , 5];

          case 3:
            err_2 = _a.sent();

            if (err_2.response && err_2.response.status === 429) {
              setError("We're experiencing high demand. Please try again later or:");
            } else {
              setError(err_2.message || 'Failed to analyze events and tasks');
            }

            return [3
            /*break*/
            , 5];

          case 4:
            setLoading(false);
            return [7
            /*endfinally*/
            ];

          case 5:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  react_1.useEffect(function () {
    var storedSuggestionsData = sessionStorage.getItem('suggestions');

    if (storedSuggestionsData) {
      try {
        var parsedData = JSON.parse(storedSuggestionsData); // Ensure parsedData is an object of type Suggestions, not an array

        if (_typeof(parsedData) === 'object' && parsedData !== null) {
          setStoredSuggestions(parsedData);
        } else {
          console.error('Stored suggestions are not in the expected format.');
        }
      } catch (error) {
        console.error('Error parsing stored suggestions:', error);
      }
    }

    console.log(storedSuggestions, suggestions);
  }, []);
  react_1.useEffect(function () {
    var token = js_cookie_1["default"].get('access_token');
    setAuthToken(token || null);
  }, []);
  react_1.useEffect(function () {
    fetchItems();
  }, [authToken]);
  react_1.useEffect(function () {
    analyzeEventsAndTasks();
  }, [combinedItems]);
  react_1.useEffect(function () {
    // If suggestions are already stored in sessionStorage, load them
    var storedSuggestionsData = sessionStorage.getItem('suggestions');

    if (storedSuggestionsData) {
      setStoredSuggestions(JSON.parse(storedSuggestionsData));
    }
  }, []);

  var handleItemClick = function handleItemClick(id) {
    setSelectedItemId(id.toString()); // Store it as a string if needed

    setShowSuggestions(true);
  };

  react_1.useEffect(function () {
    if (storedSuggestions) {
      setSelectedItemId('0'); // Default to a known key

      setShowSuggestions(true);
    }
  }, [storedSuggestions]);
  var filteredSuggestions = selectedItemId && ((_b = storedSuggestions === null || storedSuggestions === void 0 ? void 0 : storedSuggestions.suggestions) === null || _b === void 0 ? void 0 : _b[selectedItemId]) ? (_a = {}, _a[selectedItemId] = storedSuggestions === null || storedSuggestions === void 0 ? void 0 : storedSuggestions.suggestions[selectedItemId], _a) : {
    "default": 'No suggestions available'
  };
  return react_1["default"].createElement("div", null, authToken && !loading && react_1["default"].createElement("div", {
    className: "flex bg-gray-900 text-white flex-col",
    style: {
      marginLeft: '100px',
      width: '80%'
    }
  }, showSuggestions && react_1["default"].createElement(SuggestionsView_1["default"], {
    suggestions: filteredSuggestions
  }), combinedItems && react_1["default"].createElement(EventsTasksList_1["default"], {
    combinedItems: combinedItems,
    onItemClick: handleItemClick
  }), react_1["default"].createElement(ErrorComponent_1["default"], {
    error: error
  }), error === "We're experiencing high demand. Please try again later or:" && react_1["default"].createElement(RateLimitError_1["default"], {
    error: error
  })), !authToken && react_1["default"].createElement("div", {
    className: 'p-12'
  }, react_1["default"].createElement("div", {
    className: "text-center"
  }, react_1["default"].createElement("h1", {
    className: "text-4xl font-extrabold text-center mb-4 text-yellow-300"
  }, "Find Me Time"), react_1["default"].createElement("p", {
    className: 'mb-6 text-lg font-medium text-center'
  }, "AI Time Finder"), react_1["default"].createElement("div", null, !termsAccepted ? react_1["default"].createElement("button", {
    className: "bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-200 p-4 cursor-not-allowed",
    disabled: true
  }, "Connect Google") : react_1["default"].createElement("button", {
    className: "bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-200 p-4",
    onClick: function onClick() {
      return window.location.href = '/api/googleauth';
    }
  }, "Connect Google")), !termsAccepted && react_1["default"].createElement("p", {
    onClick: function onClick() {
      return setIsTermsModalOpen(true);
    },
    className: "text-red-500 text-m mt-4"
  }, "To continue, please agree to the ", react_1["default"].createElement("u", null, "terms"), ".")), react_1["default"].createElement("div", {
    className: "m-6 p-3 pb-8 bg-white rounded-lg shadow-md border border-gray-300 max-w-md mx-auto px-3"
  }, react_1["default"].createElement("p", {
    className: "text-gray-700 text-lg font-medium text-center"
  }, "This app helps you optimize your weekly schedule by analyzing your calendar with the help of AI to find ways to save time."), react_1["default"].createElement("p", {
    className: 'text-gray-700 text-lg font-medium text-center'
  }, "To optimize effectively, please ensure that the main titles of your google events and tasks contain sufficient and clear information for analysis."), !authToken && !termsAccepted && react_1["default"].createElement("p", {
    className: "text-gray-600 mt-4 text-center"
  }, "Connect your Google account first. Afterward, please allow a few minutes for the system to analyze your tasks and events. This will enable the AI model to provide feedback based on the information gathered.")), !error && !events && !suggestions && react_1["default"].createElement(GroqTermsAlert_1["default"], {
    onAccept: function onAccept() {
      setTermsAccepted(true);
    },
    onDecline: function onDecline() {
      setTermsAccepted(false);
    }
  })), loading && react_1["default"].createElement(LoadingSpinner_1["default"], null), isTermsModalOpen && events.length === 0 && react_1["default"].createElement(GroqTermsAlert_1["default"], {
    onAccept: function onAccept() {
      setTermsAccepted(true);
      setIsTermsModalOpen(false);
    },
    onDecline: function onDecline() {
      setTermsAccepted(false);
      setIsTermsModalOpen(false);
    }
  }));
}

var _default = Home;
exports["default"] = _default;