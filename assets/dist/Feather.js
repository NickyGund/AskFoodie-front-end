var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.getImageSourceSync=exports.getImageSource=exports.Button=exports.default=void 0;var _createIconSet=_interopRequireDefault(require("./lib/create-icon-set"));var _Feather=_interopRequireDefault(require("./glyphmaps/Feather.json"));var iconSet=(0,_createIconSet.default)(_Feather.default,'Feather','Feather.ttf');var _default=iconSet;exports.default=_default;var Button=iconSet.Button,getImageSource=iconSet.getImageSource,getImageSourceSync=iconSet.getImageSourceSync;exports.getImageSourceSync=getImageSourceSync;exports.getImageSource=getImageSource;exports.Button=Button;