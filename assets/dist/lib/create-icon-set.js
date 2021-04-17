var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.default=createIconSet;exports.DEFAULT_ICON_COLOR=exports.DEFAULT_ICON_SIZE=exports.NativeIconAPI=void 0;var _toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf3=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _react=_interopRequireWildcard(require("react"));var _propTypes=_interopRequireDefault(require("prop-types"));var _reactNative=require("./react-native");var _ensureNativeModuleAvailable=_interopRequireDefault(require("./ensure-native-module-available"));var _createIconSourceCache=_interopRequireDefault(require("./create-icon-source-cache"));var _iconButton=_interopRequireDefault(require("./icon-button"));var _jsxFileName="/Users/joelarvidsson/Code/react-native-vector-icons/lib/create-icon-set.js";var NativeIconAPI=_reactNative.NativeModules.RNVectorIconsManager||_reactNative.NativeModules.RNVectorIconsModule;exports.NativeIconAPI=NativeIconAPI;var DEFAULT_ICON_SIZE=12;exports.DEFAULT_ICON_SIZE=DEFAULT_ICON_SIZE;var DEFAULT_ICON_COLOR='black';exports.DEFAULT_ICON_COLOR=DEFAULT_ICON_COLOR;function createIconSet(glyphMap,fontFamily,fontFile,fontStyle){var fontBasename=fontFile?fontFile.replace(/\.(otf|ttf)$/,''):fontFamily;var fontReference=_reactNative.Platform.select({windows:"/Assets/"+fontFile+"#"+fontFamily,android:fontBasename,web:fontBasename,default:fontFamily});var IconNamePropType=_propTypes.default.oneOf(Object.keys(glyphMap));var Icon=function(_PureComponent){(0,_inherits2.default)(Icon,_PureComponent);function Icon(){var _getPrototypeOf2;var _this;(0,_classCallCheck2.default)(this,Icon);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=(0,_possibleConstructorReturn2.default)(this,(_getPrototypeOf2=(0,_getPrototypeOf3.default)(Icon)).call.apply(_getPrototypeOf2,[this].concat(args)));_this.root=null;_this.handleRef=function(ref){_this.root=ref;};return _this;}(0,_createClass2.default)(Icon,[{key:"setNativeProps",value:function setNativeProps(nativeProps){if(this.root){this.root.setNativeProps(nativeProps);}}},{key:"render",value:function render(){var _this$props=this.props,name=_this$props.name,size=_this$props.size,color=_this$props.color,style=_this$props.style,children=_this$props.children,props=(0,_objectWithoutProperties2.default)(_this$props,["name","size","color","style","children"]);var glyph=name?glyphMap[name]||'?':'';if(typeof glyph==='number'){glyph=String.fromCodePoint(glyph);}var styleDefaults={fontSize:size,color:color};var styleOverrides={fontFamily:fontReference,fontWeight:'normal',fontStyle:'normal'};props.style=[styleDefaults,style,styleOverrides,fontStyle||{}];props.ref=this.handleRef;return _react.default.createElement(_reactNative.Text,(0,_extends2.default)({},props,{__source:{fileName:_jsxFileName,lineNumber:91}}),glyph,children);}}]);return Icon;}(_react.PureComponent);Icon.propTypes={allowFontScaling:_propTypes.default.bool,name:IconNamePropType,size:_propTypes.default.number,color:_propTypes.default.any,children:_propTypes.default.node,style:_propTypes.default.any};Icon.defaultProps={size:DEFAULT_ICON_SIZE,allowFontScaling:false};var imageSourceCache=(0,_createIconSourceCache.default)();function resolveGlyph(name){var glyph=glyphMap[name]||'?';if(typeof glyph==='number'){return String.fromCodePoint(glyph);}return glyph;}function getImageSourceSync(name){var size=arguments.length>1&&arguments[1]!==undefined?arguments[1]:DEFAULT_ICON_SIZE;var color=arguments.length>2&&arguments[2]!==undefined?arguments[2]:DEFAULT_ICON_COLOR;(0,_ensureNativeModuleAvailable.default)();var glyph=resolveGlyph(name);var processedColor=(0,_reactNative.processColor)(color);var cacheKey=glyph+":"+size+":"+processedColor;if(imageSourceCache.has(cacheKey)){return imageSourceCache.get(cacheKey);}try{var imagePath=NativeIconAPI.getImageForFontSync(fontReference,glyph,size,processedColor);var value={uri:imagePath,scale:_reactNative.PixelRatio.get()};imageSourceCache.setValue(cacheKey,value);return value;}catch(error){imageSourceCache.setError(cacheKey,error);throw error;}}function getImageSource(name){var size,color,glyph,processedColor,cacheKey,imagePath,value,_args=arguments;return _regenerator.default.async(function getImageSource$(_context){while(1){switch(_context.prev=_context.next){case 0:size=_args.length>1&&_args[1]!==undefined?_args[1]:DEFAULT_ICON_SIZE;color=_args.length>2&&_args[2]!==undefined?_args[2]:DEFAULT_ICON_COLOR;(0,_ensureNativeModuleAvailable.default)();glyph=resolveGlyph(name);processedColor=(0,_reactNative.processColor)(color);cacheKey=glyph+":"+size+":"+processedColor;if(!imageSourceCache.has(cacheKey)){_context.next=8;break;}return _context.abrupt("return",imageSourceCache.get(cacheKey));case 8:_context.prev=8;_context.next=11;return _regenerator.default.awrap(NativeIconAPI.getImageForFont(fontReference,glyph,size,processedColor));case 11:imagePath=_context.sent;value={uri:imagePath,scale:_reactNative.PixelRatio.get()};imageSourceCache.setValue(cacheKey,value);return _context.abrupt("return",value);case 17:_context.prev=17;_context.t0=_context["catch"](8);imageSourceCache.setError(cacheKey,_context.t0);throw _context.t0;case 21:case"end":return _context.stop();}}},null,null,[[8,17]]);}function loadFont(){var file,_args2=arguments;return _regenerator.default.async(function loadFont$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:file=_args2.length>0&&_args2[0]!==undefined?_args2[0]:fontFile;if(!(_reactNative.Platform.OS==='ios')){_context2.next=7;break;}(0,_ensureNativeModuleAvailable.default)();if(file){_context2.next=5;break;}throw new Error('Unable to load font, because no file was specified. ');case 5:_context2.next=7;return _regenerator.default.awrap(NativeIconAPI.loadFontWithFileName.apply(NativeIconAPI,(0,_toConsumableArray2.default)(file.split('.'))));case 7:case"end":return _context2.stop();}}});}function hasIcon(name){return Object.prototype.hasOwnProperty.call(glyphMap,name);}function getRawGlyphMap(){return glyphMap;}function getFontFamily(){return fontReference;}Icon.Button=(0,_iconButton.default)(Icon);Icon.getImageSource=getImageSource;Icon.getImageSourceSync=getImageSourceSync;Icon.loadFont=loadFont;Icon.hasIcon=hasIcon;Icon.getRawGlyphMap=getRawGlyphMap;Icon.getFontFamily=getFontFamily;return Icon;}