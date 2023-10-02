import{o as Ke,p as He,q as Ue,V as u,r as S,s as x,Q as fe,t as be,u as p,e as Ze}from"./three.module.4827dcf2.js";const ye={type:"change"},G={type:"start"},ge={type:"end"},Z=new Ke,Ee=new He,Fe=Math.cos(70*Ze.DEG2RAD);class We extends Ue{constructor(F,Pe){super(),this.object=F,this.domElement=Pe,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new u,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:S.ROTATE,MIDDLE:S.DOLLY,RIGHT:S.PAN},this.touches={ONE:x.ROTATE,TWO:x.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return s.phi},this.getAzimuthalAngle=function(){return s.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(t){t.addEventListener("keydown",W),this._domElementKeyEvents=t},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",W),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(ye),e.update(),i=a.NONE},this.update=function(){const t=new u,o=new fe().setFromUnitVectors(F.up,new u(0,1,0)),r=o.clone().invert(),c=new u,l=new fe,L=new u,b=2*Math.PI;return function(ze=null){const de=e.object.position;t.copy(de).sub(e.target),t.applyQuaternion(o),s.setFromVector3(t),e.autoRotate&&i===a.NONE&&R(Te(ze)),e.enableDamping?(s.theta+=m.theta*e.dampingFactor,s.phi+=m.phi*e.dampingFactor):(s.theta+=m.theta,s.phi+=m.phi);let h=e.minAzimuthAngle,d=e.maxAzimuthAngle;isFinite(h)&&isFinite(d)&&(h<-Math.PI?h+=b:h>Math.PI&&(h-=b),d<-Math.PI?d+=b:d>Math.PI&&(d-=b),h<=d?s.theta=Math.max(h,Math.min(d,s.theta)):s.theta=s.theta>(h+d)/2?Math.max(h,s.theta):Math.min(d,s.theta)),s.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,s.phi)),s.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(O,e.dampingFactor):e.target.add(O),e.zoomToCursor&&Y||e.object.isOrthographicCamera?s.radius=v(s.radius):s.radius=v(s.radius*y),t.setFromSpherical(s),t.applyQuaternion(r),de.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(m.theta*=1-e.dampingFactor,m.phi*=1-e.dampingFactor,O.multiplyScalar(1-e.dampingFactor)):(m.set(0,0,0),O.set(0,0,0));let H=!1;if(e.zoomToCursor&&Y){let k=null;if(e.object.isPerspectiveCamera){const C=t.length();k=v(C*y);const U=C-k;e.object.position.addScaledVector(Q,U),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const C=new u(f.x,f.y,0);C.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/y)),e.object.updateProjectionMatrix(),H=!0;const U=new u(f.x,f.y,0);U.unproject(e.object),e.object.position.sub(U).add(C),e.object.updateMatrixWorld(),k=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;k!==null&&(this.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(k).add(e.object.position):(Z.origin.copy(e.object.position),Z.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(Z.direction))<Fe?F.lookAt(e.target):(Ee.setFromNormalAndCoplanarPoint(e.object.up,e.target),Z.intersectPlane(Ee,e.target))))}else e.object.isOrthographicCamera&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/y)),e.object.updateProjectionMatrix(),H=!0);return y=1,Y=!1,H||c.distanceToSquared(e.object.position)>B||8*(1-l.dot(e.object.quaternion))>B||L.distanceToSquared(e.target)>0?(e.dispatchEvent(ye),c.copy(e.object.position),l.copy(e.object.quaternion),L.copy(e.target),H=!1,!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",me),e.domElement.removeEventListener("pointerdown",ue),e.domElement.removeEventListener("pointercancel",I),e.domElement.removeEventListener("wheel",pe),e.domElement.removeEventListener("pointermove",V),e.domElement.removeEventListener("pointerup",I),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",W),e._domElementKeyEvents=null)};const e=this,a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let i=a.NONE;const B=1e-6,s=new be,m=new be;let y=1;const O=new u,g=new p,E=new p,M=new p,P=new p,T=new p,w=new p,j=new p,A=new p,N=new p,Q=new u,f=new p;let Y=!1;const n=[],_={};function Te(t){return t!==null?2*Math.PI/60*e.autoRotateSpeed*t:2*Math.PI/60/60*e.autoRotateSpeed}function z(){return Math.pow(.95,e.zoomSpeed)}function R(t){m.theta-=t}function K(t){m.phi-=t}const J=function(){const t=new u;return function(r,c){t.setFromMatrixColumn(c,0),t.multiplyScalar(-r),O.add(t)}}(),$=function(){const t=new u;return function(r,c){e.screenSpacePanning===!0?t.setFromMatrixColumn(c,1):(t.setFromMatrixColumn(c,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(r),O.add(t)}}(),D=function(){const t=new u;return function(r,c){const l=e.domElement;if(e.object.isPerspectiveCamera){const L=e.object.position;t.copy(L).sub(e.target);let b=t.length();b*=Math.tan(e.object.fov/2*Math.PI/180),J(2*r*b/l.clientHeight,e.object.matrix),$(2*c*b/l.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(J(r*(e.object.right-e.object.left)/e.object.zoom/l.clientWidth,e.object.matrix),$(c*(e.object.top-e.object.bottom)/e.object.zoom/l.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function X(t){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?y/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function ee(t){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?y*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function te(t){if(!e.zoomToCursor)return;Y=!0;const o=e.domElement.getBoundingClientRect(),r=t.clientX-o.left,c=t.clientY-o.top,l=o.width,L=o.height;f.x=r/l*2-1,f.y=-(c/L)*2+1,Q.set(f.x,f.y,1).unproject(e.object).sub(e.object.position).normalize()}function v(t){return Math.max(e.minDistance,Math.min(e.maxDistance,t))}function oe(t){g.set(t.clientX,t.clientY)}function Oe(t){te(t),j.set(t.clientX,t.clientY)}function ne(t){P.set(t.clientX,t.clientY)}function Me(t){E.set(t.clientX,t.clientY),M.subVectors(E,g).multiplyScalar(e.rotateSpeed);const o=e.domElement;R(2*Math.PI*M.x/o.clientHeight),K(2*Math.PI*M.y/o.clientHeight),g.copy(E),e.update()}function we(t){A.set(t.clientX,t.clientY),N.subVectors(A,j),N.y>0?X(z()):N.y<0&&ee(z()),j.copy(A),e.update()}function je(t){T.set(t.clientX,t.clientY),w.subVectors(T,P).multiplyScalar(e.panSpeed),D(w.x,w.y),P.copy(T),e.update()}function Ae(t){te(t),t.deltaY<0?ee(z()):t.deltaY>0&&X(z()),e.update()}function De(t){let o=!1;switch(t.code){case e.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?K(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):D(0,e.keyPanSpeed),o=!0;break;case e.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?K(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):D(0,-e.keyPanSpeed),o=!0;break;case e.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?R(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):D(e.keyPanSpeed,0),o=!0;break;case e.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?R(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):D(-e.keyPanSpeed,0),o=!0;break}o&&(t.preventDefault(),e.update())}function ae(){if(n.length===1)g.set(n[0].pageX,n[0].pageY);else{const t=.5*(n[0].pageX+n[1].pageX),o=.5*(n[0].pageY+n[1].pageY);g.set(t,o)}}function ie(){if(n.length===1)P.set(n[0].pageX,n[0].pageY);else{const t=.5*(n[0].pageX+n[1].pageX),o=.5*(n[0].pageY+n[1].pageY);P.set(t,o)}}function se(){const t=n[0].pageX-n[1].pageX,o=n[0].pageY-n[1].pageY,r=Math.sqrt(t*t+o*o);j.set(0,r)}function Le(){e.enableZoom&&se(),e.enablePan&&ie()}function Se(){e.enableZoom&&se(),e.enableRotate&&ae()}function re(t){if(n.length==1)E.set(t.pageX,t.pageY);else{const r=q(t),c=.5*(t.pageX+r.x),l=.5*(t.pageY+r.y);E.set(c,l)}M.subVectors(E,g).multiplyScalar(e.rotateSpeed);const o=e.domElement;R(2*Math.PI*M.x/o.clientHeight),K(2*Math.PI*M.y/o.clientHeight),g.copy(E)}function ce(t){if(n.length===1)T.set(t.pageX,t.pageY);else{const o=q(t),r=.5*(t.pageX+o.x),c=.5*(t.pageY+o.y);T.set(r,c)}w.subVectors(T,P).multiplyScalar(e.panSpeed),D(w.x,w.y),P.copy(T)}function le(t){const o=q(t),r=t.pageX-o.x,c=t.pageY-o.y,l=Math.sqrt(r*r+c*c);A.set(0,l),N.set(0,Math.pow(A.y/j.y,e.zoomSpeed)),X(N.y),j.copy(A)}function xe(t){e.enableZoom&&le(t),e.enablePan&&ce(t)}function Ne(t){e.enableZoom&&le(t),e.enableRotate&&re(t)}function ue(t){e.enabled!==!1&&(n.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",V),e.domElement.addEventListener("pointerup",I)),Ye(t),t.pointerType==="touch"?ke(t):Re(t))}function V(t){e.enabled!==!1&&(t.pointerType==="touch"?Ce(t):Ie(t))}function I(t){_e(t),n.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",V),e.domElement.removeEventListener("pointerup",I)),e.dispatchEvent(ge),i=a.NONE}function Re(t){let o;switch(t.button){case 0:o=e.mouseButtons.LEFT;break;case 1:o=e.mouseButtons.MIDDLE;break;case 2:o=e.mouseButtons.RIGHT;break;default:o=-1}switch(o){case S.DOLLY:if(e.enableZoom===!1)return;Oe(t),i=a.DOLLY;break;case S.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;ne(t),i=a.PAN}else{if(e.enableRotate===!1)return;oe(t),i=a.ROTATE}break;case S.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;oe(t),i=a.ROTATE}else{if(e.enablePan===!1)return;ne(t),i=a.PAN}break;default:i=a.NONE}i!==a.NONE&&e.dispatchEvent(G)}function Ie(t){switch(i){case a.ROTATE:if(e.enableRotate===!1)return;Me(t);break;case a.DOLLY:if(e.enableZoom===!1)return;we(t);break;case a.PAN:if(e.enablePan===!1)return;je(t);break}}function pe(t){e.enabled===!1||e.enableZoom===!1||i!==a.NONE||(t.preventDefault(),e.dispatchEvent(G),Ae(t),e.dispatchEvent(ge))}function W(t){e.enabled===!1||e.enablePan===!1||De(t)}function ke(t){switch(he(t),n.length){case 1:switch(e.touches.ONE){case x.ROTATE:if(e.enableRotate===!1)return;ae(),i=a.TOUCH_ROTATE;break;case x.PAN:if(e.enablePan===!1)return;ie(),i=a.TOUCH_PAN;break;default:i=a.NONE}break;case 2:switch(e.touches.TWO){case x.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Le(),i=a.TOUCH_DOLLY_PAN;break;case x.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Se(),i=a.TOUCH_DOLLY_ROTATE;break;default:i=a.NONE}break;default:i=a.NONE}i!==a.NONE&&e.dispatchEvent(G)}function Ce(t){switch(he(t),i){case a.TOUCH_ROTATE:if(e.enableRotate===!1)return;re(t),e.update();break;case a.TOUCH_PAN:if(e.enablePan===!1)return;ce(t),e.update();break;case a.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;xe(t),e.update();break;case a.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ne(t),e.update();break;default:i=a.NONE}}function me(t){e.enabled!==!1&&t.preventDefault()}function Ye(t){n.push(t)}function _e(t){delete _[t.pointerId];for(let o=0;o<n.length;o++)if(n[o].pointerId==t.pointerId){n.splice(o,1);return}}function he(t){let o=_[t.pointerId];o===void 0&&(o=new p,_[t.pointerId]=o),o.set(t.pageX,t.pageY)}function q(t){const o=t.pointerId===n[0].pointerId?n[1]:n[0];return _[o.pointerId]}e.domElement.addEventListener("contextmenu",me),e.domElement.addEventListener("pointerdown",ue),e.domElement.addEventListener("pointercancel",I),e.domElement.addEventListener("wheel",pe,{passive:!1}),this.update()}}export{We as OrbitControls};
