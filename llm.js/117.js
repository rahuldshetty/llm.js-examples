import*as e from"./wasm/llamacpp-cpu.js";var t={d:(e,a)=>{for(var o in a)t.o(a,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:a[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const a=[/main:.*/,/.*_model_load:.*/],o=(l={default:()=>e.default},n={},t.d(n,l),n);var l,n;let s;const d=e=>{console.log("model:"+e),(e=>{for(var t=0;t<a.length;t+=1)if(a[t].test(e))return!1;return!0})(e)&&postMessage({event:3,line:e})};self.addEventListener("message",(e=>{switch(e.data.event){case 0:(async e=>{const t={noInitialRun:!0,print:d};s=await(0,o.default)(t),s.FS_createPath("/","models",!0,!0),s.FS_createDataFile("/models","model.bin",e,!0,!0,!0),postMessage({event:1}),console.log("Model loaded successfully.")})(e.data.model_bytes);break;case 2:((e,t,a,o,l,n,d,r,p)=>{console.log(t);const i=["-p",e.toString(),"-n",a.toString(),"-c",p.toString(),"--top_k",o.toString(),"--top_p",l.toString(),"--temp",n.toString(),"-m","/models/model.bin"];console.log("model: calling main with prompt: "+e.toString()),s.callMain(i),postMessage({event:4}),console.log("model: Completed")})(e.data.prompt,e.data.seed,e.data.max_token_len,e.data.top_k,e.data.top_p,e.data.temp,e.data.repeat_last_n,e.data.repeat_penalty,e.data.context_size)}}),!1);