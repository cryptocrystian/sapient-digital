"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {useEffect,useMemo,useRef,useState} from "react";
import * as THREE from "three";
import styles from "./ResultantScene.module.css";

type TrackProps={index:number; color:string; progress:number};
function Track({index,color,progress}:TrackProps){
  const geometry=useMemo(()=>{
    const startY=[-1.8,0,1.8][index];
    const points:THREE.Vector3[]=[];
    for(let i=0;i<=90;i++){
      const t=i/90;
      const align=THREE.MathUtils.smoothstep(t,.3,.82)*progress;
      const y=THREE.MathUtils.lerp(startY,0.06*(index-1),align);
      const z=Math.sin(t*Math.PI*1.7+index*1.6)*(1-align)*.85+Math.sin(t*Math.PI*1.4)*align*.22;
      points.push(new THREE.Vector3(-4.2+t*8.6,y,z));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),140,.053,8,false);
  },[index,progress]);
  useEffect(()=>()=>geometry.dispose(),[geometry]);
  return <mesh geometry={geometry}><meshStandardMaterial color={color} metalness={.32} roughness={.3} emissive={color} emissiveIntensity={.13}/></mesh>;
}
function Motion({enabled}:{enabled:boolean}){
 const group=useRef<THREE.Group>(null);
 const [progress,setProgress]=useState(1);
 const pointer=useRef({x:0,y:0});
 useEffect(()=>{
   const onMove=(e:PointerEvent)=>{
     pointer.current={x:(e.clientX/window.innerWidth-.5)*2,y:(e.clientY/window.innerHeight-.5)*2};
   };
   if(enabled)window.addEventListener("pointermove",onMove,{passive:true});
   return ()=>window.removeEventListener("pointermove",onMove);
 },[enabled]);
 useFrame((state,delta)=>{
   if(!group.current)return;
   const next=enabled?(Math.sin(state.clock.elapsedTime*.28-Math.PI/2)+1)/2:1;
   setProgress(old=>Math.abs(old-next)>.035?next:old);
   const x=enabled?pointer.current.x:0;
   const y=enabled?pointer.current.y:0;
   group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,x*.15,2,delta);
   group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,-y*.1,2,delta);
   group.current.rotation.z=enabled?Math.sin(state.clock.elapsedTime*.16)*.025:0;
 });
 return <group ref={group}>
   <Track index={0} color="#ff5722" progress={progress}/>
   <Track index={1} color="#24262b" progress={progress}/>
   <Track index={2} color="#a6a8b1" progress={progress}/>
   <mesh position={[4.32,0,0]} rotation={[0,0,-Math.PI/2]}><coneGeometry args={[.23,.65,3]}/><meshStandardMaterial color="#ff5722" metalness={.25} roughness={.35}/></mesh>
   <mesh position={[-4.2,-1.8,0]}><sphereGeometry args={[.09,16,16]}/><meshBasicMaterial color="#ff5722"/></mesh>
 </group>;
}
export default function ResultantScene(){
 const [motion,setMotion]=useState(false);
 const [supported,setSupported]=useState(false);
 useEffect(()=>{
   const m=window.matchMedia("(prefers-reduced-motion: reduce)");
   const touch=window.matchMedia("(pointer: coarse)").matches;
   const read=()=>setMotion(!m.matches&&!touch);
   read();m.addEventListener("change",read);
   try{const c=document.createElement("canvas");setSupported(!!(c.getContext("webgl2")||c.getContext("webgl")));}catch{}
   return ()=>m.removeEventListener("change",read);
 },[]);
 return <div className={styles.scene}>
    <div className={styles.top}><span>THE RESULTANT FRAMEWORK™</span><span>THREE PRACTICES / ONE STRATEGIC DIRECTION</span></div>
    {supported?<Canvas dpr={[1,1.6]} camera={{position:[0,0,10.8],fov:48}} gl={{antialias:true,alpha:true,powerPreference:"low-power"}} fallback={<Fallback/>}>
      <ambientLight intensity={1.7}/>
      <directionalLight position={[2,5,7]} intensity={2}/>
      <Motion enabled={motion}/>
    </Canvas>:<Fallback/>}
    <div className={styles.legend}><span><b className={styles.orange}/>DIGITAL PR</span><span><b className={styles.ink}/>STRATEGIC CONTENT</span><span><b className={styles.silver}/>SEARCH &amp; AI VISIBILITY</span></div>
    <div className={styles.bottom}><span>INDEPENDENT STRENGTH</span><strong>+</strong><span>SHARED DIRECTION</span><strong>=</strong><span>AMPLIFIED IMPACT</span></div>
    <div className={styles.caption}>Interactive spatial study · subtle pointer parallax on desktop · reduced motion and touch use a stationary aligned state.</div>
 </div>
}
function Fallback(){return <div className={styles.fallback} role="img" aria-label="Three independent practice vectors coordinated toward a shared direction"><span className={styles.lineA}/><span className={styles.lineB}/><span className={styles.lineC}/><span className={styles.result}>↗</span></div>}
