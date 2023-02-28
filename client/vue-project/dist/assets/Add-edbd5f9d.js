import{d as E,a as U,r as i,o as y,ag as k,w as a,e as l,h as g,E as f,k as C}from"./index-43bae569.js";import{E as G,a as N}from"./el-input-e4b17d31.js";import{E as w}from"./el-input-number-5b974fa1.js";import{E as B,s as I}from"./request-dedb50ba.js";const A=E({__name:"Add",setup(T){let m=!0,d=null;const u=U(),o=i({integral:0,name:"",phone:"",glasses:"",eyeglass:"",sunglasses:"",oldGlasses:"",degrees:""}),V=i({name:[{required:!0,message:"姓名不能为空",trigger:"blur"}],phone:[{required:!0,message:"手机号不能为空",trigger:"blur"}]}),_=r=>{r&&r.resetFields()},b=()=>{},x=r=>{r&&(clearTimeout(d),d=setTimeout(()=>{m=!0},200),m&&(m=!1,r.validate(e=>{if(e)I({url:"/api/create",method:"post",data:{action:"add",...o}}).then(t=>{t.code===0?(f.success("添加用户成功"),u.value.resetFields()):f.error("创建用户失败")});else return console.log("error submit!"),!1})))};return(r,e)=>{const t=B,n=G,F=w,p=C,v=N;return y(),k(v,{ref_key:"ruleFormRef",ref:u,model:o,"status-icon":"",rules:V,"label-width":"120px",class:"demo-ruleForm"},{default:a(()=>[l(n,{label:"姓名",prop:"name"},{default:a(()=>[l(t,{modelValue:o.name,"onUpdate:modelValue":e[0]||(e[0]=s=>o.name=s),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(n,{label:"手机号",prop:"phone"},{default:a(()=>[l(t,{modelValue:o.phone,"onUpdate:modelValue":e[1]||(e[1]=s=>o.phone=s),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(n,{label:"眼镜架",prop:"glasses"},{default:a(()=>[l(t,{modelValue:o.glasses,"onUpdate:modelValue":e[2]||(e[2]=s=>o.glasses=s),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(n,{label:"眼镜片",prop:"eyeglass"},{default:a(()=>[l(t,{modelValue:o.eyeglass,"onUpdate:modelValue":e[3]||(e[3]=s=>o.eyeglass=s),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(n,{label:"太阳镜",prop:"sunglasses"},{default:a(()=>[l(t,{modelValue:o.sunglasses,"onUpdate:modelValue":e[4]||(e[4]=s=>o.sunglasses=s),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(n,{label:"老花镜",prop:"oldGlasses"},{default:a(()=>[l(t,{modelValue:o.oldGlasses,"onUpdate:modelValue":e[5]||(e[5]=s=>o.oldGlasses=s),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(n,{label:"度数",prop:"degrees"},{default:a(()=>[l(t,{modelValue:o.degrees,"onUpdate:modelValue":e[6]||(e[6]=s=>o.degrees=s),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(n,{label:"积分",prop:"integral"},{default:a(()=>[l(F,{modelValue:o.integral,"onUpdate:modelValue":e[7]||(e[7]=s=>o.integral=s),min:1,"controls-position":"right",onChange:b},null,8,["modelValue"])]),_:1}),l(n,null,{default:a(()=>[l(p,{type:"primary",onClick:e[8]||(e[8]=s=>x(u.value))},{default:a(()=>[g("确定")]),_:1}),l(p,{onClick:e[9]||(e[9]=s=>_(u.value))},{default:a(()=>[g("清空")]),_:1})]),_:1})]),_:1},8,["model","rules"])}}});export{A as default};