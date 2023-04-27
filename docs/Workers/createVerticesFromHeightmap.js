/*! For license information please see createVerticesFromHeightmap.js.LICENSE.txt */
define(["./Matrix3-81054f0f","./AxisAlignedBoundingBox-2c0751ca","./Transforms-20461479","./Matrix2-413c4048","./defaultValue-f6d5e6da","./TerrainEncoding-7a03fd29","./Math-2ce22ee9","./OrientedBoundingBox-fc7f7ca4","./WebMercatorProjection-943e2226","./RuntimeError-9b4ce3fb","./createTaskProcessorWorker","./combine-0c102d93","./AttributeCompression-48e336db","./ComponentDatatype-ab629b88","./WebGLConstants-7f557f93","./EllipsoidTangentPlane-d430e7d5","./IntersectionTests-a57eed59","./Plane-6add0ae1"],(function(e,t,i,a,n,r,s,l,o,f,u,c,d,h,m,g,p,x){"use strict";var w=Object.freeze({NONE:0,LERC:1});const k={};k.DEFAULT_STRUCTURE=Object.freeze({heightScale:1,heightOffset:0,elementsPerHeight:1,stride:1,elementMultiplier:256,isBigEndian:!1});const y=new e.Cartesian3,I=new a.Matrix4,b=new e.Cartesian3,U=new e.Cartesian3;k.computeVertices=function(f){const u=Math.cos,c=Math.sin,d=Math.sqrt,h=Math.atan,m=Math.exp,g=s.CesiumMath.PI_OVER_TWO,p=s.CesiumMath.toRadians,x=f.heightmap,w=f.width,M=f.height,T=f.skirtHeight,V=T>0,v=n.defaultValue(f.isGeographic,!0),A=n.defaultValue(f.ellipsoid,e.Ellipsoid.WGS84),B=1/A.maximumRadius,D=a.Rectangle.clone(f.nativeRectangle),S=a.Rectangle.clone(f.rectangle);let P,E,C,F;n.defined(S)?(P=S.west,E=S.south,C=S.east,F=S.north):v?(P=p(D.west),E=p(D.south),C=p(D.east),F=p(D.north)):(P=D.west*B,E=g-2*h(m(-D.south*B)),C=D.east*B,F=g-2*h(m(-D.north*B)));let N=f.relativeToCenter;const O=n.defined(N);N=O?N:e.Cartesian3.ZERO;const R=n.defaultValue(f.includeWebMercatorT,!1),L=n.defaultValue(f.exaggeration,1),z=n.defaultValue(f.exaggerationRelativeHeight,0),H=1!==L,_=n.defaultValue(f.structure,k.DEFAULT_STRUCTURE),Y=n.defaultValue(_.heightScale,k.DEFAULT_STRUCTURE.heightScale),W=n.defaultValue(_.heightOffset,k.DEFAULT_STRUCTURE.heightOffset),X=n.defaultValue(_.elementsPerHeight,k.DEFAULT_STRUCTURE.elementsPerHeight),Z=n.defaultValue(_.stride,k.DEFAULT_STRUCTURE.stride),j=n.defaultValue(_.elementMultiplier,k.DEFAULT_STRUCTURE.elementMultiplier),G=n.defaultValue(_.isBigEndian,k.DEFAULT_STRUCTURE.isBigEndian);let q=a.Rectangle.computeWidth(D),Q=a.Rectangle.computeHeight(D);const J=q/(w-1),K=Q/(M-1);v||(q*=B,Q*=B);const $=A.radiiSquared,ee=$.x,te=$.y,ie=$.z;let ae=65536,ne=-65536;const re=i.Transforms.eastNorthUpToFixedFrame(N,A),se=a.Matrix4.inverseTransformation(re,I);let le,oe;R&&(le=o.WebMercatorProjection.geodeticLatitudeToMercatorAngle(E),oe=1/(o.WebMercatorProjection.geodeticLatitudeToMercatorAngle(F)-le));const fe=b;fe.x=Number.POSITIVE_INFINITY,fe.y=Number.POSITIVE_INFINITY,fe.z=Number.POSITIVE_INFINITY;const ue=U;ue.x=Number.NEGATIVE_INFINITY,ue.y=Number.NEGATIVE_INFINITY,ue.z=Number.NEGATIVE_INFINITY;let ce=Number.POSITIVE_INFINITY;const de=w*M,he=de+(T>0?2*w+2*M:0),me=new Array(he),ge=new Array(he),pe=new Array(he),xe=R?new Array(he):[],we=H?new Array(he):[];let ke=0,ye=M,Ie=0,be=w;V&&(--ke,++ye,--Ie,++be);const Ue=1e-5;for(let t=ke;t<ye;++t){let i=t;i<0&&(i=0),i>=M&&(i=M-1);let n=D.north-K*i;n=v?p(n):g-2*h(m(-n*B));let r=(n-E)/(F-E);r=s.CesiumMath.clamp(r,0,1);const l=t===ke,f=t===ye-1;T>0&&(l?n+=Ue*Q:f&&(n-=Ue*Q));const k=u(n),I=c(n),b=ie*I;let U;R&&(U=(o.WebMercatorProjection.geodeticLatitudeToMercatorAngle(n)-le)*oe);for(let t=Ie;t<be;++t){let n=t;n<0&&(n=0),n>=w&&(n=w-1);const o=i*(w*Z)+n*Z;let h;if(1===X)h=x[o];else{let e;if(h=0,G)for(e=0;e<X;++e)h=h*j+x[o+e];else for(e=X-1;e>=0;--e)h=h*j+x[o+e]}h=h*Y+W,ne=Math.max(ne,h),ae=Math.min(ae,h);let m=D.west+J*n;v?m=p(m):m*=B;let g=(m-P)/(C-P);g=s.CesiumMath.clamp(g,0,1);let V=i*w+n;if(T>0){const e=t===Ie,a=t===be-1,r=l||f||e||a;if((l||f)&&(e||a))continue;r&&(h-=T,e?(V=de+(M-i-1),m-=Ue*q):f?V=de+M+(w-n-1):a?(V=de+M+w+i,m+=Ue*q):l&&(V=de+M+w+M+n))}const S=k*u(m),E=k*c(m),F=ee*S,N=te*E,O=1/d(F*S+N*E+b*I),L=F*O,z=N*O,_=b*O,Q=new e.Cartesian3;Q.x=L+S*h,Q.y=z+E*h,Q.z=_+I*h,a.Matrix4.multiplyByPoint(se,Q,y),e.Cartesian3.minimumByComponent(y,fe,fe),e.Cartesian3.maximumByComponent(y,ue,ue),ce=Math.min(ce,h),me[V]=Q,pe[V]=new a.Cartesian2(g,r),ge[V]=h,R&&(xe[V]=U),H&&(we[V]=A.geodeticSurfaceNormal(Q))}}const Me=i.BoundingSphere.fromPoints(me);let Te,Ve;n.defined(S)&&(Te=l.OrientedBoundingBox.fromRectangle(S,ae,ne,A)),O&&(Ve=new r.EllipsoidalOccluder(A).computeHorizonCullingPointPossiblyUnderEllipsoid(N,me,ae));const ve=new t.AxisAlignedBoundingBox(fe,ue,N),Ae=new r.TerrainEncoding(N,ve,ce,ne,re,!1,R,H,L,z),Be=new Float32Array(he*Ae.stride);let De=0;for(let e=0;e<he;++e)De=Ae.encode(Be,De,me[e],pe[e],ge[e],void 0,xe[e],we[e]);return{vertices:Be,maximumHeight:ne,minimumHeight:ae,encoding:Ae,boundingSphere3D:Me,orientedBoundingBox:Te,occludeePointInScaledSpace:Ve}};var M,T=k,V={};M={get exports(){return V},set exports(e){V=e}},function(){var e,t,i,a,n,r,s,l,o,f,u,c,d,h,m,g,p=(e={defaultNoDataValue:-34027999387901484e22,decode:function(r,s){var l=(s=s||{}).encodedMaskData||null===s.encodedMaskData,o=n(r,s.inputOffset||0,l),f=null!==s.noDataValue?s.noDataValue:e.defaultNoDataValue,u=t(o,s.pixelType||Float32Array,s.encodedMaskData,f,s.returnMask),c={width:o.width,height:o.height,pixelData:u.resultPixels,minValue:u.minValue,maxValue:o.pixels.maxValue,noDataValue:f};return u.resultMask&&(c.maskData=u.resultMask),s.returnEncodedMask&&o.mask&&(c.encodedMaskData=o.mask.bitset?o.mask.bitset:null),s.returnFileInfo&&(c.fileInfo=i(o),s.computeUsedBitDepths&&(c.fileInfo.bitDepths=a(o))),c}},t=function(e,t,i,a,n){var s,l,o,f=0,u=e.pixels.numBlocksX,c=e.pixels.numBlocksY,d=Math.floor(e.width/u),h=Math.floor(e.height/c),m=2*e.maxZError,g=Number.MAX_VALUE;i=i||(e.mask?e.mask.bitset:null),l=new t(e.width*e.height),n&&i&&(o=new Uint8Array(e.width*e.height));for(var p,x,w=new Float32Array(d*h),k=0;k<=c;k++){var y=k!==c?h:e.height%c;if(0!==y)for(var I=0;I<=u;I++){var b=I!==u?d:e.width%u;if(0!==b){var U,M,T,V,v=k*e.width*h+I*d,A=e.width-b,B=e.pixels.blocks[f];if(B.encoding<2?(0===B.encoding?U=B.rawData:(r(B.stuffedData,B.bitsPerPixel,B.numValidPixels,B.offset,m,w,e.pixels.maxValue),U=w),M=0):T=2===B.encoding?0:B.offset,i)for(x=0;x<y;x++){for(7&v&&(V=i[v>>3],V<<=7&v),p=0;p<b;p++)7&v||(V=i[v>>3]),128&V?(o&&(o[v]=1),g=g>(s=B.encoding<2?U[M++]:T)?s:g,l[v++]=s):(o&&(o[v]=0),l[v++]=a),V<<=1;v+=A}else if(B.encoding<2)for(x=0;x<y;x++){for(p=0;p<b;p++)g=g>(s=U[M++])?s:g,l[v++]=s;v+=A}else for(g=g>T?T:g,x=0;x<y;x++){for(p=0;p<b;p++)l[v++]=T;v+=A}if(1===B.encoding&&M!==B.numValidPixels)throw"Block and Mask do not match";f++}}}return{resultPixels:l,resultMask:o,minValue:g}},i=function(e){return{fileIdentifierString:e.fileIdentifierString,fileVersion:e.fileVersion,imageType:e.imageType,height:e.height,width:e.width,maxZError:e.maxZError,eofOffset:e.eofOffset,mask:e.mask?{numBlocksX:e.mask.numBlocksX,numBlocksY:e.mask.numBlocksY,numBytes:e.mask.numBytes,maxValue:e.mask.maxValue}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,numBytes:e.pixels.numBytes,maxValue:e.pixels.maxValue,noDataValue:e.noDataValue}}},a=function(e){for(var t=e.pixels.numBlocksX*e.pixels.numBlocksY,i={},a=0;a<t;a++){var n=e.pixels.blocks[a];0===n.encoding?i.float32=!0:1===n.encoding?i[n.bitsPerPixel]=!0:i[0]=!0}return Object.keys(i)},n=function(e,t,i){var a={},n=new Uint8Array(e,t,10);if(a.fileIdentifierString=String.fromCharCode.apply(null,n),"CntZImage"!==a.fileIdentifierString.trim())throw"Unexpected file identifier string: "+a.fileIdentifierString;t+=10;var r=new DataView(e,t,24);if(a.fileVersion=r.getInt32(0,!0),a.imageType=r.getInt32(4,!0),a.height=r.getUint32(8,!0),a.width=r.getUint32(12,!0),a.maxZError=r.getFloat64(16,!0),t+=24,!i)if(r=new DataView(e,t,16),a.mask={},a.mask.numBlocksY=r.getUint32(0,!0),a.mask.numBlocksX=r.getUint32(4,!0),a.mask.numBytes=r.getUint32(8,!0),a.mask.maxValue=r.getFloat32(12,!0),t+=16,a.mask.numBytes>0){var s=new Uint8Array(Math.ceil(a.width*a.height/8)),l=(r=new DataView(e,t,a.mask.numBytes)).getInt16(0,!0),o=2,f=0;do{if(l>0)for(;l--;)s[f++]=r.getUint8(o++);else{var u=r.getUint8(o++);for(l=-l;l--;)s[f++]=u}l=r.getInt16(o,!0),o+=2}while(o<a.mask.numBytes);if(-32768!==l||f<s.length)throw"Unexpected end of mask RLE encoding";a.mask.bitset=s,t+=a.mask.numBytes}else 0==(a.mask.numBytes|a.mask.numBlocksY|a.mask.maxValue)&&(a.mask.bitset=new Uint8Array(Math.ceil(a.width*a.height/8)));r=new DataView(e,t,16),a.pixels={},a.pixels.numBlocksY=r.getUint32(0,!0),a.pixels.numBlocksX=r.getUint32(4,!0),a.pixels.numBytes=r.getUint32(8,!0),a.pixels.maxValue=r.getFloat32(12,!0),t+=16;var c=a.pixels.numBlocksX,d=a.pixels.numBlocksY,h=c+(a.width%c>0?1:0),m=d+(a.height%d>0?1:0);a.pixels.blocks=new Array(h*m);for(var g=0,p=0;p<m;p++)for(var x=0;x<h;x++){var w=0,k=e.byteLength-t;r=new DataView(e,t,Math.min(10,k));var y={};a.pixels.blocks[g++]=y;var I=r.getUint8(0);if(w++,y.encoding=63&I,y.encoding>3)throw"Invalid block encoding ("+y.encoding+")";if(2!==y.encoding){if(0!==I&&2!==I){if(I>>=6,y.offsetType=I,2===I)y.offset=r.getInt8(1),w++;else if(1===I)y.offset=r.getInt16(1,!0),w+=2;else{if(0!==I)throw"Invalid block offset type";y.offset=r.getFloat32(1,!0),w+=4}if(1===y.encoding)if(I=r.getUint8(w),w++,y.bitsPerPixel=63&I,I>>=6,y.numValidPixelsType=I,2===I)y.numValidPixels=r.getUint8(w),w++;else if(1===I)y.numValidPixels=r.getUint16(w,!0),w+=2;else{if(0!==I)throw"Invalid valid pixel count type";y.numValidPixels=r.getUint32(w,!0),w+=4}}var b;if(t+=w,3!==y.encoding)if(0===y.encoding){var U=(a.pixels.numBytes-1)/4;if(U!==Math.floor(U))throw"uncompressed block has invalid length";b=new ArrayBuffer(4*U),new Uint8Array(b).set(new Uint8Array(e,t,4*U));var M=new Float32Array(b);y.rawData=M,t+=4*U}else if(1===y.encoding){var T=Math.ceil(y.numValidPixels*y.bitsPerPixel/8),V=Math.ceil(T/4);b=new ArrayBuffer(4*V),new Uint8Array(b).set(new Uint8Array(e,t,T)),y.stuffedData=new Uint32Array(b),t+=T}}else t++}return a.eofOffset=t,a},r=function(e,t,i,a,n,r,s){var l,o,f,u=(1<<t)-1,c=0,d=0,h=Math.ceil((s-a)/n),m=4*e.length-Math.ceil(t*i/8);for(e[e.length-1]<<=8*m,l=0;l<i;l++){if(0===d&&(f=e[c++],d=32),d>=t)o=f>>>d-t&u,d-=t;else{var g=t-d;o=(f&u)<<g&u,o+=(f=e[c++])>>>(d=32-g)}r[l]=o<h?a+o*n:s}return r},e),x=(s=function(e,t,i,a,n,r,s,l){var o,f,u,c,d,h=(1<<i)-1,m=0,g=0,p=4*e.length-Math.ceil(i*a/8);if(e[e.length-1]<<=8*p,n)for(o=0;o<a;o++)0===g&&(u=e[m++],g=32),g>=i?(f=u>>>g-i&h,g-=i):(f=(u&h)<<(c=i-g)&h,f+=(u=e[m++])>>>(g=32-c)),t[o]=n[f];else for(d=Math.ceil((l-r)/s),o=0;o<a;o++)0===g&&(u=e[m++],g=32),g>=i?(f=u>>>g-i&h,g-=i):(f=(u&h)<<(c=i-g)&h,f+=(u=e[m++])>>>(g=32-c)),t[o]=f<d?r+f*s:l},l=function(e,t,i,a,n,r){var s,l=(1<<t)-1,o=0,f=0,u=0,c=0,d=0,h=[],m=4*e.length-Math.ceil(t*i/8);e[e.length-1]<<=8*m;var g=Math.ceil((r-a)/n);for(f=0;f<i;f++)0===c&&(s=e[o++],c=32),c>=t?(d=s>>>c-t&l,c-=t):(d=(s&l)<<(u=t-c)&l,d+=(s=e[o++])>>>(c=32-u)),h[f]=d<g?a+d*n:r;return h.unshift(a),h},o=function(e,t,i,a,n,r,s,l){var o,f,u,c,d=(1<<i)-1,h=0,m=0,g=0;if(n)for(o=0;o<a;o++)0===m&&(u=e[h++],m=32,g=0),m>=i?(f=u>>>g&d,m-=i,g+=i):(f=u>>>g&d,m=32-(c=i-m),f|=((u=e[h++])&(1<<c)-1)<<i-c,g=c),t[o]=n[f];else{var p=Math.ceil((l-r)/s);for(o=0;o<a;o++)0===m&&(u=e[h++],m=32,g=0),m>=i?(f=u>>>g&d,m-=i,g+=i):(f=u>>>g&d,m=32-(c=i-m),f|=((u=e[h++])&(1<<c)-1)<<i-c,g=c),t[o]=f<p?r+f*s:l}return t},f=function(e,t,i,a,n,r){var s,l=(1<<t)-1,o=0,f=0,u=0,c=0,d=0,h=0,m=[],g=Math.ceil((r-a)/n);for(f=0;f<i;f++)0===c&&(s=e[o++],c=32,h=0),c>=t?(d=s>>>h&l,c-=t,h+=t):(d=s>>>h&l,c=32-(u=t-c),d|=((s=e[o++])&(1<<u)-1)<<t-u,h=u),m[f]=d<g?a+d*n:r;return m.unshift(a),m},u=function(e,t,i,a){var n,r,s,l,o=(1<<i)-1,f=0,u=0,c=4*e.length-Math.ceil(i*a/8);for(e[e.length-1]<<=8*c,n=0;n<a;n++)0===u&&(s=e[f++],u=32),u>=i?(r=s>>>u-i&o,u-=i):(r=(s&o)<<(l=i-u)&o,r+=(s=e[f++])>>>(u=32-l)),t[n]=r;return t},c=function(e,t,i,a){var n,r,s,l,o=(1<<i)-1,f=0,u=0,c=0;for(n=0;n<a;n++)0===u&&(s=e[f++],u=32,c=0),u>=i?(r=s>>>c&o,u-=i,c+=i):(r=s>>>c&o,u=32-(l=i-u),r|=((s=e[f++])&(1<<l)-1)<<i-l,c=l),t[n]=r;return t},d={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(e){for(var t=65535,i=65535,a=e.length,n=Math.floor(a/2),r=0;n;){var s=n>=359?359:n;n-=s;do{t+=e[r++]<<8,i+=t+=e[r++]}while(--s);t=(65535&t)+(t>>>16),i=(65535&i)+(i>>>16)}return 1&a&&(i+=t+=e[r]<<8),((i=(65535&i)+(i>>>16))<<16|(t=(65535&t)+(t>>>16)))>>>0},readHeaderInfo:function(e,t){var i=t.ptr,a=new Uint8Array(e,i,6),n={};if(n.fileIdentifierString=String.fromCharCode.apply(null,a),0!==n.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+n.fileIdentifierString;i+=6;var r,s=new DataView(e,i,8),l=s.getInt32(0,!0);if(n.fileVersion=l,i+=4,l>=3&&(n.checksum=s.getUint32(4,!0),i+=4),s=new DataView(e,i,12),n.height=s.getUint32(0,!0),n.width=s.getUint32(4,!0),i+=8,l>=4?(n.numDims=s.getUint32(8,!0),i+=4):n.numDims=1,s=new DataView(e,i,40),n.numValidPixel=s.getUint32(0,!0),n.microBlockSize=s.getInt32(4,!0),n.blobSize=s.getInt32(8,!0),n.imageType=s.getInt32(12,!0),n.maxZError=s.getFloat64(16,!0),n.zMin=s.getFloat64(24,!0),n.zMax=s.getFloat64(32,!0),i+=40,t.headerInfo=n,t.ptr=i,l>=3&&(r=l>=4?52:48,this.computeChecksumFletcher32(new Uint8Array(e,i-r,n.blobSize-14))!==n.checksum))throw"Checksum failed.";return!0},checkMinMaxRanges:function(e,t){var i=t.headerInfo,a=this.getDataTypeArray(i.imageType),n=i.numDims*this.getDataTypeSize(i.imageType),r=this.readSubArray(e,t.ptr,a,n),s=this.readSubArray(e,t.ptr+n,a,n);t.ptr+=2*n;var l,o=!0;for(l=0;l<i.numDims;l++)if(r[l]!==s[l]){o=!1;break}return i.minValues=r,i.maxValues=s,o},readSubArray:function(e,t,i,a){var n;if(i===Uint8Array)n=new Uint8Array(e,t,a);else{var r=new ArrayBuffer(a);new Uint8Array(r).set(new Uint8Array(e,t,a)),n=new i(r)}return n},readMask:function(e,t){var i,a,n=t.ptr,r=t.headerInfo,s=r.width*r.height,l=r.numValidPixel,o=new DataView(e,n,4),f={};if(f.numBytes=o.getUint32(0,!0),n+=4,(0===l||s===l)&&0!==f.numBytes)throw"invalid mask";if(0===l)i=new Uint8Array(Math.ceil(s/8)),f.bitset=i,a=new Uint8Array(s),t.pixels.resultMask=a,n+=f.numBytes;else if(f.numBytes>0){i=new Uint8Array(Math.ceil(s/8));var u=(o=new DataView(e,n,f.numBytes)).getInt16(0,!0),c=2,d=0,h=0;do{if(u>0)for(;u--;)i[d++]=o.getUint8(c++);else for(h=o.getUint8(c++),u=-u;u--;)i[d++]=h;u=o.getInt16(c,!0),c+=2}while(c<f.numBytes);if(-32768!==u||d<i.length)throw"Unexpected end of mask RLE encoding";a=new Uint8Array(s);var m=0,g=0;for(g=0;g<s;g++)7&g?(m=i[g>>3],m<<=7&g):m=i[g>>3],128&m&&(a[g]=1);t.pixels.resultMask=a,f.bitset=i,n+=f.numBytes}return t.ptr=n,t.mask=f,!0},readDataOneSweep:function(e,t,i){var a,n=t.ptr,r=t.headerInfo,s=r.numDims,l=r.width*r.height,o=r.imageType,f=r.numValidPixel*d.getDataTypeSize(o)*s,u=t.pixels.resultMask;if(i===Uint8Array)a=new Uint8Array(e,n,f);else{var c=new ArrayBuffer(f);new Uint8Array(c).set(new Uint8Array(e,n,f)),a=new i(c)}if(a.length===l*s)t.pixels.resultPixels=a;else{t.pixels.resultPixels=new i(l*s);var h=0,m=0,g=0,p=0;if(s>1)for(g=0;g<s;g++)for(p=g*l,m=0;m<l;m++)u[m]&&(t.pixels.resultPixels[p+m]=a[h++]);else for(m=0;m<l;m++)u[m]&&(t.pixels.resultPixels[m]=a[h++])}return n+=f,t.ptr=n,!0},readHuffmanTree:function(e,t){var i=this.HUFFMAN_LUT_BITS_MAX,a=new DataView(e,t.ptr,16);if(t.ptr+=16,a.getInt32(0,!0)<2)throw"unsupported Huffman version";var n=a.getInt32(4,!0),r=a.getInt32(8,!0),s=a.getInt32(12,!0);if(r>=s)return!1;var l=new Uint32Array(s-r);d.decodeBits(e,t,l);var o,f,u,c,m=[];for(o=r;o<s;o++)m[f=o-(o<n?0:n)]={first:l[o-r],second:null};var g=e.byteLength-t.ptr,p=Math.ceil(g/4),x=new ArrayBuffer(4*p);new Uint8Array(x).set(new Uint8Array(e,t.ptr,g));var w,k=new Uint32Array(x),y=0,I=0;for(w=k[0],o=r;o<s;o++)(c=m[f=o-(o<n?0:n)].first)>0&&(m[f].second=w<<y>>>32-c,32-y>=c?32===(y+=c)&&(y=0,w=k[++I]):(y+=c-32,w=k[++I],m[f].second|=w>>>32-y));var b,U=0,M=new h;for(o=0;o<m.length;o++)void 0!==m[o]&&(U=Math.max(U,m[o].first));b=U>=i?i:U,U>=30&&console.log("WARning, large NUM LUT BITS IS "+U);var T,V,v,A,B,D=[];for(o=r;o<s;o++)if((c=m[f=o-(o<n?0:n)].first)>0)if(T=[c,f],c<=b)for(V=m[f].second<<b-c,v=1<<b-c,u=0;u<v;u++)D[V|u]=T;else for(V=m[f].second,B=M,A=c-1;A>=0;A--)V>>>A&1?(B.right||(B.right=new h),B=B.right):(B.left||(B.left=new h),B=B.left),0!==A||B.val||(B.val=T[1]);return{decodeLut:D,numBitsLUTQick:b,numBitsLUT:U,tree:M,stuffedData:k,srcPtr:I,bitPos:y}},readHuffman:function(e,t,i){var a,n,r,s,l,o,f,u,c,d=t.headerInfo,h=d.numDims,m=t.headerInfo.height,g=t.headerInfo.width,p=g*m,x=this.readHuffmanTree(e,t),w=x.decodeLut,k=x.tree,y=x.stuffedData,I=x.srcPtr,b=x.bitPos,U=x.numBitsLUTQick,M=x.numBitsLUT,T=0===t.headerInfo.imageType?128:0,V=t.pixels.resultMask,v=0;b>0&&(I++,b=0);var A,B=y[I],D=1===t.encodeMode,S=new i(p*h),P=S;for(A=0;A<d.numDims;A++){if(h>1&&(P=new i(S.buffer,p*A,p),v=0),t.headerInfo.numValidPixel===g*m)for(u=0,o=0;o<m;o++)for(f=0;f<g;f++,u++){if(n=0,l=s=B<<b>>>32-U,32-b<U&&(l=s|=y[I+1]>>>64-b-U),w[l])n=w[l][1],b+=w[l][0];else for(l=s=B<<b>>>32-M,32-b<M&&(l=s|=y[I+1]>>>64-b-M),a=k,c=0;c<M;c++)if(!(a=s>>>M-c-1&1?a.right:a.left).left&&!a.right){n=a.val,b=b+c+1;break}b>=32&&(b-=32,B=y[++I]),r=n-T,D?(r+=f>0?v:o>0?P[u-g]:v,r&=255,P[u]=r,v=r):P[u]=r}else for(u=0,o=0;o<m;o++)for(f=0;f<g;f++,u++)if(V[u]){if(n=0,l=s=B<<b>>>32-U,32-b<U&&(l=s|=y[I+1]>>>64-b-U),w[l])n=w[l][1],b+=w[l][0];else for(l=s=B<<b>>>32-M,32-b<M&&(l=s|=y[I+1]>>>64-b-M),a=k,c=0;c<M;c++)if(!(a=s>>>M-c-1&1?a.right:a.left).left&&!a.right){n=a.val,b=b+c+1;break}b>=32&&(b-=32,B=y[++I]),r=n-T,D?(f>0&&V[u-1]?r+=v:o>0&&V[u-g]?r+=P[u-g]:r+=v,r&=255,P[u]=r,v=r):P[u]=r}t.ptr=t.ptr+4*(I+1)+(b>0?4:0)}t.pixels.resultPixels=S},decodeBits:function(e,t,i,a,n){var r=t.headerInfo,d=r.fileVersion,h=0,m=new DataView(e,t.ptr,5),g=m.getUint8(0);h++;var p=g>>6,x=0===p?4:3-p,w=(32&g)>0,k=31&g,y=0;if(1===x)y=m.getUint8(h),h++;else if(2===x)y=m.getUint16(h,!0),h+=2;else{if(4!==x)throw"Invalid valid pixel count type";y=m.getUint32(h,!0),h+=4}var I,b,U,M,T,V,v,A,B,D=2*r.maxZError,S=r.numDims>1?r.maxValues[n]:r.zMax;if(w){for(t.counter.lut++,A=m.getUint8(h),h++,M=Math.ceil((A-1)*k/8),T=Math.ceil(M/4),b=new ArrayBuffer(4*T),U=new Uint8Array(b),t.ptr+=h,U.set(new Uint8Array(e,t.ptr,M)),v=new Uint32Array(b),t.ptr+=M,B=0;A-1>>>B;)B++;M=Math.ceil(y*B/8),T=Math.ceil(M/4),b=new ArrayBuffer(4*T),(U=new Uint8Array(b)).set(new Uint8Array(e,t.ptr,M)),I=new Uint32Array(b),t.ptr+=M,V=d>=3?f(v,k,A-1,a,D,S):l(v,k,A-1,a,D,S),d>=3?o(I,i,B,y,V):s(I,i,B,y,V)}else t.counter.bitstuffer++,B=k,t.ptr+=h,B>0&&(M=Math.ceil(y*B/8),T=Math.ceil(M/4),b=new ArrayBuffer(4*T),(U=new Uint8Array(b)).set(new Uint8Array(e,t.ptr,M)),I=new Uint32Array(b),t.ptr+=M,d>=3?null==a?c(I,i,B,y):o(I,i,B,y,!1,a,D,S):null==a?u(I,i,B,y):s(I,i,B,y,!1,a,D,S))},readTiles:function(e,t,i){var a=t.headerInfo,n=a.width,r=a.height,s=a.microBlockSize,l=a.imageType,o=d.getDataTypeSize(l),f=Math.ceil(n/s),u=Math.ceil(r/s);t.pixels.numBlocksY=u,t.pixels.numBlocksX=f,t.pixels.ptr=0;var c,h,m,g,p,x,w,k,y=0,I=0,b=0,U=0,M=0,T=0,V=0,v=0,A=0,B=0,D=0,S=0,P=0,E=0,C=0,F=new i(s*s),N=r%s||s,O=n%s||s,R=a.numDims,L=t.pixels.resultMask,z=t.pixels.resultPixels;for(b=0;b<u;b++)for(M=b!==u-1?s:N,U=0;U<f;U++)for(B=b*n*s+U*s,D=n-(T=U!==f-1?s:O),k=0;k<R;k++){if(R>1&&(z=new i(t.pixels.resultPixels.buffer,n*r*k*o,n*r)),V=e.byteLength-t.ptr,h={},C=0,C++,A=(v=(c=new DataView(e,t.ptr,Math.min(10,V))).getUint8(0))>>6&255,(v>>2&15)!=(U*s>>3&15))throw"integrity issue";if((p=3&v)>3)throw t.ptr+=C,"Invalid block encoding ("+p+")";if(2!==p)if(0===p){if(t.counter.uncompressed++,t.ptr+=C,S=(S=M*T*o)<(P=e.byteLength-t.ptr)?S:P,m=new ArrayBuffer(S%o==0?S:S+o-S%o),new Uint8Array(m).set(new Uint8Array(e,t.ptr,S)),g=new i(m),E=0,L)for(y=0;y<M;y++){for(I=0;I<T;I++)L[B]&&(z[B]=g[E++]),B++;B+=D}else for(y=0;y<M;y++){for(I=0;I<T;I++)z[B++]=g[E++];B+=D}t.ptr+=E*o}else if(x=d.getDataTypeUsed(l,A),w=d.getOnePixel(h,C,x,c),C+=d.getDataTypeSize(x),3===p)if(t.ptr+=C,t.counter.constantoffset++,L)for(y=0;y<M;y++){for(I=0;I<T;I++)L[B]&&(z[B]=w),B++;B+=D}else for(y=0;y<M;y++){for(I=0;I<T;I++)z[B++]=w;B+=D}else if(t.ptr+=C,d.decodeBits(e,t,F,w,k),C=0,L)for(y=0;y<M;y++){for(I=0;I<T;I++)L[B]&&(z[B]=F[C++]),B++;B+=D}else for(y=0;y<M;y++){for(I=0;I<T;I++)z[B++]=F[C++];B+=D}else t.counter.constant++,t.ptr+=C}},formatFileInfo:function(e){return{fileIdentifierString:e.headerInfo.fileIdentifierString,fileVersion:e.headerInfo.fileVersion,imageType:e.headerInfo.imageType,height:e.headerInfo.height,width:e.headerInfo.width,numValidPixel:e.headerInfo.numValidPixel,microBlockSize:e.headerInfo.microBlockSize,blobSize:e.headerInfo.blobSize,maxZError:e.headerInfo.maxZError,pixelType:d.getPixelType(e.headerInfo.imageType),eofOffset:e.eofOffset,mask:e.mask?{numBytes:e.mask.numBytes}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,maxValue:e.headerInfo.zMax,minValue:e.headerInfo.zMin,noDataValue:e.noDataValue}}},constructConstantSurface:function(e){var t=e.headerInfo.zMax,i=e.headerInfo.numDims,a=e.headerInfo.height*e.headerInfo.width,n=a*i,r=0,s=0,l=0,o=e.pixels.resultMask;if(o)if(i>1)for(r=0;r<i;r++)for(l=r*a,s=0;s<a;s++)o[s]&&(e.pixels.resultPixels[l+s]=t);else for(s=0;s<a;s++)o[s]&&(e.pixels.resultPixels[s]=t);else if(e.pixels.resultPixels.fill)e.pixels.resultPixels.fill(t);else for(s=0;s<n;s++)e.pixels.resultPixels[s]=t},getDataTypeArray:function(e){var t;switch(e){case 0:t=Int8Array;break;case 1:t=Uint8Array;break;case 2:t=Int16Array;break;case 3:t=Uint16Array;break;case 4:t=Int32Array;break;case 5:t=Uint32Array;break;case 6:default:t=Float32Array;break;case 7:t=Float64Array}return t},getPixelType:function(e){var t;switch(e){case 0:t="S8";break;case 1:t="U8";break;case 2:t="S16";break;case 3:t="U16";break;case 4:t="S32";break;case 5:t="U32";break;case 6:default:t="F32";break;case 7:t="F64"}return t},isValidPixelValue:function(e,t){if(null==t)return!1;var i;switch(e){case 0:i=t>=-128&&t<=127;break;case 1:i=t>=0&&t<=255;break;case 2:i=t>=-32768&&t<=32767;break;case 3:i=t>=0&&t<=65536;break;case 4:i=t>=-2147483648&&t<=2147483647;break;case 5:i=t>=0&&t<=4294967296;break;case 6:i=t>=-34027999387901484e22&&t<=34027999387901484e22;break;case 7:i=t>=5e-324&&t<=17976931348623157e292;break;default:i=!1}return i},getDataTypeSize:function(e){var t=0;switch(e){case 0:case 1:t=1;break;case 2:case 3:t=2;break;case 4:case 5:case 6:t=4;break;case 7:t=8;break;default:t=e}return t},getDataTypeUsed:function(e,t){var i=e;switch(e){case 2:case 4:i=e-t;break;case 3:case 5:i=e-2*t;break;case 6:i=0===t?e:1===t?2:1;break;case 7:i=0===t?e:e-2*t+1;break;default:i=e}return i},getOnePixel:function(e,t,i,a){var n=0;switch(i){case 0:n=a.getInt8(t);break;case 1:n=a.getUint8(t);break;case 2:n=a.getInt16(t,!0);break;case 3:n=a.getUint16(t,!0);break;case 4:n=a.getInt32(t,!0);break;case 5:n=a.getUInt32(t,!0);break;case 6:n=a.getFloat32(t,!0);break;case 7:n=a.getFloat64(t,!0);break;default:throw"the decoder does not understand this pixel type"}return n}},h=function(e,t,i){this.val=e,this.left=t,this.right=i},{decode:function(e,t){var i=(t=t||{}).noDataValue,a=0,n={};if(n.ptr=t.inputOffset||0,n.pixels={},d.readHeaderInfo(e,n)){var r=n.headerInfo,s=r.fileVersion,l=d.getDataTypeArray(r.imageType);d.readMask(e,n),r.numValidPixel===r.width*r.height||n.pixels.resultMask||(n.pixels.resultMask=t.maskData);var o,f=r.width*r.height;if(n.pixels.resultPixels=new l(f*r.numDims),n.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0},0!==r.numValidPixel)if(r.zMax===r.zMin)d.constructConstantSurface(n);else if(s>=4&&d.checkMinMaxRanges(e,n))d.constructConstantSurface(n);else{var u=new DataView(e,n.ptr,2),c=u.getUint8(0);if(n.ptr++,c)d.readDataOneSweep(e,n,l);else if(s>1&&r.imageType<=1&&Math.abs(r.maxZError-.5)<1e-5){var h=u.getUint8(1);if(n.ptr++,n.encodeMode=h,h>2||s<4&&h>1)throw"Invalid Huffman flag "+h;h?d.readHuffman(e,n,l):d.readTiles(e,n,l)}else d.readTiles(e,n,l)}n.eofOffset=n.ptr,t.inputOffset?(o=n.headerInfo.blobSize+t.inputOffset-n.ptr,Math.abs(o)>=1&&(n.eofOffset=t.inputOffset+n.headerInfo.blobSize)):(o=n.headerInfo.blobSize-n.ptr,Math.abs(o)>=1&&(n.eofOffset=n.headerInfo.blobSize));var m={width:r.width,height:r.height,pixelData:n.pixels.resultPixels,minValue:r.zMin,maxValue:r.zMax,validPixelCount:r.numValidPixel,dimCount:r.numDims,dimStats:{minValues:r.minValues,maxValues:r.maxValues},maskData:n.pixels.resultMask};if(n.pixels.resultMask&&d.isValidPixelValue(r.imageType,i)){var g=n.pixels.resultMask;for(a=0;a<f;a++)g[a]||(m.pixelData[a]=i);m.noDataValue=i}return n.noDataValue=i,t.returnFileInfo&&(m.fileInfo=d.formatFileInfo(n)),m}},getBandCount:function(e){for(var t=0,i=0,a={ptr:0,pixels:{}};i<e.byteLength-58;)d.readHeaderInfo(e,a),i+=a.headerInfo.blobSize,t++,a.ptr=i;return t}}),w=(m=new ArrayBuffer(4),g=new Uint8Array(m),new Uint32Array(m)[0]=1,1===g[0]),k={decode:function(e,t){if(!w)throw"Big endian system is not supported.";var i,a,n=(t=t||{}).inputOffset||0,r=new Uint8Array(e,n,10),s=String.fromCharCode.apply(null,r);if("CntZImage"===s.trim())i=p,a=1;else{if("Lerc2"!==s.substring(0,5))throw"Unexpected file identifier string: "+s;i=x,a=2}for(var l,o,f,u,c,d,h=0,m=e.byteLength-10,g=[],k={width:0,height:0,pixels:[],pixelType:t.pixelType,mask:null,statistics:[]};n<m;){var y=i.decode(e,{inputOffset:n,encodedMaskData:l,maskData:f,returnMask:0===h,returnEncodedMask:0===h,returnFileInfo:!0,pixelType:t.pixelType||null,noDataValue:t.noDataValue||null});n=y.fileInfo.eofOffset,0===h&&(l=y.encodedMaskData,f=y.maskData,k.width=y.width,k.height=y.height,k.dimCount=y.dimCount||1,k.pixelType=y.pixelType||y.fileInfo.pixelType,k.mask=y.maskData),a>1&&y.fileInfo.mask&&y.fileInfo.mask.numBytes>0&&g.push(y.maskData),h++,k.pixels.push(y.pixelData),k.statistics.push({minValue:y.minValue,maxValue:y.maxValue,noDataValue:y.noDataValue,dimStats:y.dimStats})}if(a>1&&g.length>1){for(d=k.width*k.height,k.bandMasks=g,(f=new Uint8Array(d)).set(g[0]),u=1;u<g.length;u++)for(o=g[u],c=0;c<d;c++)f[c]=f[c]&o[c];k.maskData=f}return k}};M.exports?M.exports=k:this.Lerc=k}();var v=V;return u((function(t,i){if(t.encoding===w.LERC){let e;try{e=v.decode(t.heightmap)}catch(e){throw new f.RuntimeError(e)}if(e.statistics[0].minValue===Number.MAX_VALUE)throw new f.RuntimeError("Invalid tile data");t.heightmap=e.pixels[0],t.width=e.width,t.height=e.height}t.ellipsoid=e.Ellipsoid.clone(t.ellipsoid),t.rectangle=a.Rectangle.clone(t.rectangle);const n=T.computeVertices(t),r=n.vertices;return i.push(r.buffer),{vertices:r.buffer,numberOfAttributes:n.encoding.stride,minimumHeight:n.minimumHeight,maximumHeight:n.maximumHeight,gridWidth:t.width,gridHeight:t.height,boundingSphere3D:n.boundingSphere3D,orientedBoundingBox:n.orientedBoundingBox,occludeePointInScaledSpace:n.occludeePointInScaledSpace,encoding:n.encoding,westIndicesSouthToNorth:n.westIndicesSouthToNorth,southIndicesEastToWest:n.southIndicesEastToWest,eastIndicesNorthToSouth:n.eastIndicesNorthToSouth,northIndicesWestToEast:n.northIndicesWestToEast}}))}));