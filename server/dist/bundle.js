/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar _a;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst auth_route_1 = __webpack_require__(/*! @routes/auth.route */ \"./src/routes/auth.route.ts\");\nconst db_1 = __importDefault(__webpack_require__(/*! ./config/db */ \"./src/config/db.ts\"));\nconst todo_route_1 = __importDefault(__webpack_require__(/*! @routes/todo.route */ \"./src/routes/todo.route.ts\"));\nconst cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ \"cookie-parser\"));\nconst port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5001;\nconst app = (0, express_1.default)();\nconst corsOptions = {\n    origin: 'http://localhost:3000',\n    credentials: true,\n};\n(0, db_1.default)();\napp.use((0, cors_1.default)(corsOptions));\napp.use(express_1.default.json());\napp.use((0, cookie_parser_1.default)());\napp.use(auth_route_1.authRouter);\napp.use('/todos', todo_route_1.default);\napp.use((err, req, res, next) => {\n    console.log(err.stack);\n    res.status(500).send('Smt went wrong');\n});\napp.listen(port, () => {\n    console.log(`Server is running at http://localhost:${port}`);\n});\n\n\n//# sourceURL=webpack://server/./src/app.ts?");

/***/ }),

/***/ "./src/appTypes/todo.type.ts":
/*!***********************************!*\
  !*** ./src/appTypes/todo.type.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TodoStatus = void 0;\nvar TodoStatus;\n(function (TodoStatus) {\n    TodoStatus[\"IN_PROGRESS\"] = \"in progress\";\n    TodoStatus[\"DONE\"] = \"done\";\n    TodoStatus[\"UNDONE\"] = \"undone\";\n})(TodoStatus || (exports.TodoStatus = TodoStatus = {}));\n\n\n//# sourceURL=webpack://server/./src/appTypes/todo.type.ts?");

/***/ }),

/***/ "./src/config/db.ts":
/*!**************************!*\
  !*** ./src/config/db.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst connectDB = () => __awaiter(void 0, void 0, void 0, function* () {\n    yield mongoose_1.default.connect(\"mongodb+srv://grechuckartemac:YqFnruYLL2orYcQk@cluster0.cxvy3ez.mongodb.net/dev\");\n    console.log('MongoDB connected');\n});\nexports[\"default\"] = connectDB;\n\n\n//# sourceURL=webpack://server/./src/config/db.ts?");

/***/ }),

/***/ "./src/controllers/auth.controller.ts":
/*!********************************************!*\
  !*** ./src/controllers/auth.controller.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AuthController = void 0;\nconst user_model_1 = __importDefault(__webpack_require__(/*! @models/user.model */ \"./src/models/user.model.ts\"));\nconst jwt_service_1 = __webpack_require__(/*! @services/jwt.service */ \"./src/services/jwt.service.ts\");\nconst hashPassword_1 = __webpack_require__(/*! utils/hashPassword */ \"./src/utils/hashPassword.ts\");\nconst user_service_1 = __webpack_require__(/*! @services/user.service */ \"./src/services/user.service.ts\");\nconst bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ \"bcrypt\"));\nconst registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const { name, email, password } = req.body;\n    if (!name || !email || !password) {\n        res.sendStatus(400);\n    }\n    const createdUser = yield new user_model_1.default({\n        name,\n        email,\n        password: yield bcrypt_1.default.hash(password, 10),\n    })\n        .save();\n    try {\n        const JWTCode = jwt_service_1.jwtService.sign({\n            id: createdUser.id,\n            email: createdUser.email\n        });\n        res.cookie('todo', JWTCode, {\n            secure: false,\n            domain: 'localhost',\n            sameSite: 'lax',\n            httpOnly: true\n        });\n        res.sendStatus(201);\n    }\n    catch (err) {\n        res.sendStatus(500);\n        throw new Error(err);\n    }\n});\nconst verification = (req, res, next) => {\n    const jwtCode = req.cookies.todo;\n    const user = jwt_service_1.jwtService.verify(jwtCode);\n    if (!user) {\n        res.clearCookie('todo', { path: '/' });\n        res.sendStatus(401);\n        return;\n    }\n    res.locals.userId = user.id;\n    next();\n};\nconst login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const { email, password } = req.body;\n    const user = yield user_service_1.UserService.getOne(email);\n    if (!user) {\n        res.sendStatus(404);\n        return;\n    }\n    const isPasswordCompare = yield (0, hashPassword_1.comparePassword)({\n        hash: user === null || user === void 0 ? void 0 : user.password,\n        pass: password\n    });\n    if (!isPasswordCompare) {\n        res.sendStatus(401);\n    }\n    try {\n        const JWTCode = jwt_service_1.jwtService.sign({\n            id: user.id,\n            email: user.email\n        });\n        res.cookie('todo', JWTCode, {\n            secure: false,\n            domain: 'localhost',\n            sameSite: 'lax',\n            httpOnly: true\n        });\n        res.sendStatus(201);\n    }\n    catch (err) {\n        res.sendStatus(500);\n        throw new Error(err);\n    }\n});\nexports.AuthController = {\n    registration,\n    verification,\n    login\n};\n\n\n//# sourceURL=webpack://server/./src/controllers/auth.controller.ts?");

/***/ }),

/***/ "./src/controllers/todo.controller.ts":
/*!********************************************!*\
  !*** ./src/controllers/todo.controller.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst todo_type_1 = __webpack_require__(/*! @appTypes/todo.type */ \"./src/appTypes/todo.type.ts\");\nconst todo_service_1 = __importDefault(__webpack_require__(/*! @services/todo.service */ \"./src/services/todo.service.ts\"));\nconst getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const userId = res.locals.userId;\n    const todo = yield todo_service_1.default.getOne(userId);\n    res.send(todo);\n});\nconst getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const userId = res.locals.userId;\n    const todo = yield todo_service_1.default.getAll(userId);\n    res.send(todo);\n});\nconst createOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const { content, status = todo_type_1.TodoStatus.UNDONE, priority = 1, } = req.body;\n    const userId = res.locals.userId;\n    if (!content && !userId) {\n        res.sendStatus(404);\n    }\n    const createdTodo = yield todo_service_1.default.createOne({\n        content,\n        status,\n        priority,\n        userId\n    });\n    res.send(createdTodo);\n});\nconst updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const { id } = req.params;\n    const { content, priority, status } = req.body;\n    console.log(content, priority, status);\n    if (!id) {\n        res.sendStatus(404);\n    }\n    try {\n        const updatedTodo = yield todo_service_1.default.updateOne({\n            id,\n            content,\n            priority,\n            status\n        });\n        res.send(updatedTodo);\n    }\n    catch (error) {\n        console.log(error);\n        res.sendStatus(500);\n    }\n});\nconst removeOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const { id } = req.params;\n    if (!id) {\n        res.sendStatus(404);\n    }\n    try {\n        yield todo_service_1.default.removeOne(id);\n        res.sendStatus(204);\n    }\n    catch (err) {\n        res.sendStatus(500);\n        throw new Error(err);\n    }\n});\nconst TodoController = {\n    getOne,\n    createOne,\n    getAll,\n    removeOne,\n    updateOne\n};\nexports[\"default\"] = TodoController;\n\n\n//# sourceURL=webpack://server/./src/controllers/todo.controller.ts?");

/***/ }),

/***/ "./src/models/todo.model.ts":
/*!**********************************!*\
  !*** ./src/models/todo.model.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst todo_type_1 = __webpack_require__(/*! appTypes/todo.type */ \"./src/appTypes/todo.type.ts\");\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst taskSchema = new mongoose_1.default.Schema({\n    content: {\n        type: String,\n        required: true,\n    },\n    status: {\n        type: String,\n        enum: todo_type_1.TodoStatus\n    },\n    priority: {\n        type: Number,\n        required: true,\n        min: 1,\n        max: 10,\n    },\n    userId: {\n        type: mongoose_1.default.Schema.Types.ObjectId,\n        ref: 'Client',\n        required: true,\n    }\n});\nexports[\"default\"] = mongoose_1.default.model('Todo', taskSchema);\n\n\n//# sourceURL=webpack://server/./src/models/todo.model.ts?");

/***/ }),

/***/ "./src/models/user.model.ts":
/*!**********************************!*\
  !*** ./src/models/user.model.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst clientSchema = new mongoose_1.default.Schema({\n    name: {\n        type: String,\n        required: true,\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    password: {\n        type: String,\n        required: true,\n    },\n});\nexports[\"default\"] = mongoose_1.default.model('User', clientSchema);\n\n\n//# sourceURL=webpack://server/./src/models/user.model.ts?");

/***/ }),

/***/ "./src/routes/auth.route.ts":
/*!**********************************!*\
  !*** ./src/routes/auth.route.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.authRouter = void 0;\nconst auth_controller_1 = __webpack_require__(/*! @controllers/auth.controller */ \"./src/controllers/auth.controller.ts\");\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nexports.authRouter = express_1.default.Router();\nexports.authRouter.post('/registration', auth_controller_1.AuthController.registration);\nexports.authRouter.post('/login', auth_controller_1.AuthController.login);\n\n\n//# sourceURL=webpack://server/./src/routes/auth.route.ts?");

/***/ }),

/***/ "./src/routes/todo.route.ts":
/*!**********************************!*\
  !*** ./src/routes/todo.route.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst todo_controller_1 = __importDefault(__webpack_require__(/*! @controllers/todo.controller */ \"./src/controllers/todo.controller.ts\"));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst auth_controller_1 = __webpack_require__(/*! @controllers/auth.controller */ \"./src/controllers/auth.controller.ts\");\nconst todoRouter = express_1.default.Router();\ntodoRouter.use(auth_controller_1.AuthController.verification);\ntodoRouter.get('/', todo_controller_1.default.getAll);\ntodoRouter.get('/:id', todo_controller_1.default.getOne);\ntodoRouter.post('/', todo_controller_1.default.createOne);\ntodoRouter.patch('/:id', todo_controller_1.default.updateOne);\ntodoRouter.delete('/:id', todo_controller_1.default.removeOne);\nexports[\"default\"] = todoRouter;\n\n\n//# sourceURL=webpack://server/./src/routes/todo.route.ts?");

/***/ }),

/***/ "./src/services/jwt.service.ts":
/*!*************************************!*\
  !*** ./src/services/jwt.service.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.jwtService = void 0;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nfunction sign(user) {\n    const token = jsonwebtoken_1.default.sign(user, \"wurh54893^&%RT*@(P){II@*(&*@%^@UJDK{_W}{DOIW(*FYE&*FEU*(FE)&#(&@))}})}\", { expiresIn: '1h' });\n    return token;\n}\nfunction verify(token) {\n    try {\n        const payload = jsonwebtoken_1.default.verify(token, \"wurh54893^&%RT*@(P){II@*(&*@%^@UJDK{_W}{DOIW(*FYE&*FEU*(FE)&#(&@))}})}\");\n        return payload;\n    }\n    catch (err) {\n        return null;\n    }\n}\nexports.jwtService = {\n    sign,\n    verify\n};\n\n\n//# sourceURL=webpack://server/./src/services/jwt.service.ts?");

/***/ }),

/***/ "./src/services/todo.service.ts":
/*!**************************************!*\
  !*** ./src/services/todo.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst todo_model_1 = __importDefault(__webpack_require__(/*! @models/todo.model */ \"./src/models/todo.model.ts\"));\nconst getOne = (id) => {\n    return todo_model_1.default.findById(id);\n};\nconst getAll = (userId) => __awaiter(void 0, void 0, void 0, function* () {\n    return yield todo_model_1.default.find({ userId });\n});\nconst createOne = ({ content, status, priority, userId }) => {\n    const createdTask = new todo_model_1.default({\n        content,\n        status,\n        priority,\n        userId,\n    });\n    return createdTask.save();\n};\nconst updateOne = ({ id, content, priority, status }) => {\n    const updatedTask = todo_model_1.default.findByIdAndUpdate(id, {\n        content,\n        status,\n        priority\n    }, { new: true });\n    return updatedTask;\n};\nconst removeOne = (todoId) => __awaiter(void 0, void 0, void 0, function* () {\n    yield todo_model_1.default.findByIdAndDelete(todoId);\n});\nconst removeMany = (userId) => {\n    todo_model_1.default.deleteMany({\n        userId,\n    });\n};\nconst TodoService = {\n    getOne,\n    getAll,\n    createOne,\n    updateOne,\n    removeOne,\n    removeMany\n};\nexports[\"default\"] = TodoService;\n\n\n//# sourceURL=webpack://server/./src/services/todo.service.ts?");

/***/ }),

/***/ "./src/services/user.service.ts":
/*!**************************************!*\
  !*** ./src/services/user.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserService = void 0;\nconst user_model_1 = __importDefault(__webpack_require__(/*! @models/user.model */ \"./src/models/user.model.ts\"));\nconst todo_service_1 = __importDefault(__webpack_require__(/*! ./todo.service */ \"./src/services/todo.service.ts\"));\nconst removeOne = (id) => {\n    todo_service_1.default.removeMany(id);\n    user_model_1.default.findByIdAndDelete(id);\n};\nconst createOne = ({ email, password, name }) => {\n    const createdUser = new user_model_1.default({\n        name,\n        email,\n        password\n    });\n    return createdUser.save();\n};\nconst getOne = (email) => {\n    const user = user_model_1.default.findOne({ email });\n    return user;\n};\nexports.UserService = {\n    removeOne,\n    getOne,\n    createOne\n};\n\n\n//# sourceURL=webpack://server/./src/services/user.service.ts?");

/***/ }),

/***/ "./src/utils/hashPassword.ts":
/*!***********************************!*\
  !*** ./src/utils/hashPassword.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.comparePassword = exports.hashPass = void 0;\nconst bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ \"bcrypt\"));\nfunction hashPass(pass) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const a = bcrypt_1.default.hash(pass, 10, function (err, hash) {\n            if (err) {\n                throw new Error(err);\n            }\n            return hash;\n        });\n        return a;\n    });\n}\nexports.hashPass = hashPass;\nfunction comparePassword(_a) {\n    return __awaiter(this, arguments, void 0, function* ({ pass, hash }) {\n        try {\n            const match = yield bcrypt_1.default.compare(pass, hash);\n            return match;\n        }\n        catch (err) {\n            throw new Error(err);\n        }\n    });\n}\nexports.comparePassword = comparePassword;\n\n\n//# sourceURL=webpack://server/./src/utils/hashPassword.ts?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;