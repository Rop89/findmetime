"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var groq_sdk_1 = require("groq-sdk");
var groq = new groq_sdk_1["default"]({ apiKey: process.env.GROQ_API_KEY });
var previousEventTitles = new Set();
var analyzeWithGroq = function (eventSummary) { return __awaiter(void 0, void 0, Promise, function () {
    var prompt, response, choices, choice, suggestions, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                // Check if this event title has been analyzed before
                if (previousEventTitles.has(eventSummary)) {
                    console.log("Event with title \"" + eventSummary + "\" has already been analyzed. Skipping prompt request.");
                    return [2 /*return*/, []]; // Return empty array as no new prompt is needed
                }
                prompt = "Analyse the following event summary: \"" + eventSummary + "\". Based on the event details, provide specific time optimisation suggestions, such as rearranging tasks for efficiency, identifying potential areas for automation, or recommending ways to streamline the process. Suggest appropriate tools or methods to implement automation and focus on practical and actionable improvements. If the event summary is unclear or too vague, assume a typical scenario and provide time optimization suggestions accordingly. Instead of asking more questions, directly suggest improving the Google event or task title to make it clearer and more descriptive for better analysis. Your response should be returned as HTML content that can be rendered using 'dangerouslySetInnerHTML'. Please ensure that the text is properly formatted (e.g., using <ul>, <li>, <p>, etc.) to be easily displayed on a web page.";
                return [4 /*yield*/, groq.chat.completions.create({
                        model: 'gemma2-9b-it',
                        messages: [
                            { role: 'system', content: 'You are an assistant that provides time optimisation suggestions for events.' },
                            { role: 'user', content: prompt },
                        ],
                        temperature: 0.5,
                        max_completion_tokens: 7000,
                        top_p: 1,
                        stop: null,
                        stream: false
                    })];
            case 1:
                response = _b.sent();
                choices = response.choices;
                if (choices && choices.length > 0) {
                    choice = choices[0];
                    // Check if message exists on the first choice
                    if ((_a = choice === null || choice === void 0 ? void 0 : choice.message) === null || _a === void 0 ? void 0 : _a.content) {
                        suggestions = choice.message.content
                            .split('\n')
                            .map(function (line) { return line.trim(); })
                            .filter(Boolean);
                        // Add event title to the set of previously analyzed titles
                        previousEventTitles.add(eventSummary);
                        return [2 /*return*/, suggestions || []];
                    }
                }
                // Return an empty array if no suggestions are available
                return [2 /*return*/, []];
            case 2:
                error_1 = _b.sent();
                // Check if the error is a standard JavaScript Error
                if (error_1 instanceof Error) {
                    // Now that we know it's a standard Error, we can safely access error.message
                    console.error('Error during NLP analysis with Groq:', error_1.message);
                    // Handle specific error messages or conditions
                    if (error_1.message === 'You have run out of tokens') {
                        throw new Error('You have run out of tokens'); // Example custom error handling
                    }
                    throw error_1; // Rethrow the error for proper handling
                }
                else {
                    // If the error is not an instance of Error, handle it here
                    console.error('Unknown error type:', error_1);
                    throw error_1; // Rethrow the error for proper handling
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var analyzeEvents = function (events) { return __awaiter(void 0, void 0, Promise, function () {
    var suggestions, _i, events_1, event, nlpSuggestions, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                suggestions = [];
                _i = 0, events_1 = events;
                _a.label = 1;
            case 1:
                if (!(_i < events_1.length)) return [3 /*break*/, 6];
                event = events_1[_i];
                if (!event) return [3 /*break*/, 5];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, analyzeWithGroq(event.title)];
            case 3:
                nlpSuggestions = _a.sent();
                if (nlpSuggestions.length > 0) {
                    suggestions.push("Suggestions for \"" + event.title + "\": " + nlpSuggestions.join(', '));
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error('Error during NLP analysis:', error_2);
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, suggestions];
        }
    });
}); };
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var events, optimizationSuggestions, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    events = req.body.tasks;
                    if (!events || events.length === 0) {
                        return [2 /*return*/, res.status(400).json({ error: 'No events provided.' })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, analyzeEvents(events)];
                case 2:
                    optimizationSuggestions = _a.sent();
                    res.status(200).json({ suggestions: optimizationSuggestions });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    // Check if the error is an instance of the Error object
                    if (error_3 instanceof Error) {
                        console.error('Error during event analysis:', error_3.message);
                        // Check if the error message matches the rate-limited error from Groq
                        if (error_3.message === 'You have run out of tokens') {
                            return [2 /*return*/, res.status(429).json({ error: "We're experiencing high demand. Please try again later or:" })];
                        }
                        res.status(500).json({ error: 'Error during event analysis.' });
                    }
                    else {
                        // If the error isn't an instance of Error, handle it safely
                        console.error('Unexpected error:', error_3);
                        res.status(500).json({ error: 'An unexpected error occurred.' });
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = handler;
