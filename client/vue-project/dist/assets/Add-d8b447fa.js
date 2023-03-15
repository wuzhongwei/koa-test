import{d as E,a as b,r as _,o as F,c as N,e as l,w as t,b as h,i as x,l as U,m as I,t as C,x as J,_ as O}from"./index-7a550e0f.js";import{E as T,a as B,b as A,c as j}from"./el-date-picker-5b2d1fde.js";import"./el-checkbox-3737b2a6.js";import{E as q,a as R}from"./el-input-878481fb.js";import{s as $,E as G}from"./request-42007cba.js";const z=m=>(C("data-v-91a37032"),m=m(),J(),m),H={class:"w1050"},K=z(()=>h("div",null,null,-1)),L={class:"footer"},Q=E({__name:"Add",setup(m){let p=!0,f=null,c=[{name:"远用",left:"右眼",spheric:"",luminosity:"",axial:"",distance:"",height:"",corrected:"",naked:""},{name:"远用",left:"左眼",spheric:"",luminosity:"",axial:"",distance:"",height:"",corrected:"",naked:""},{name:"近用",left:"右眼",spheric:"",luminosity:"",axial:"",distance:"",height:"",corrected:"",naked:""},{name:"近用",left:"左眼",spheric:"",luminosity:"",axial:"",distance:"",height:"",corrected:"",naked:""}];const g=b(JSON.parse(JSON.stringify(c))),i=b(),w=({row:r,column:a,rowIndex:n,columnIndex:d})=>{if(d===0)return n%2===0?{rowspan:2,colspan:1}:{rowspan:0,colspan:0}},P=({row:r,column:a,rowIndex:n,columnIndex:d})=>{if(r[0].colSpan=2,d===1)return{display:"none"}},o=_({integral:0,name:"",phone:"",glasses:"",eyeglass:"",sunglasses:"",oldGlasses:"",degrees:"",age:"",address:"",birthday:"",occupation:"",purchaseDate:"",takingDate:"",glassesModel:"",glassescolor:"",glassesPrice:"",glassesSellingPrice:"",eyeglassPrice:"",eyeglassSellingPrice:"",totalPrice:"",frontmoney:"",notyetPrice:""}),v=_({name:[{required:!0,message:"姓名不能为空",trigger:"blur"}],phone:[{required:!0,message:"电话不能为空",trigger:"blur"}]}),S=r=>{r&&(g.value=JSON.parse(JSON.stringify(c)),r.resetFields())},k=r=>{r&&(clearTimeout(f),f=setTimeout(()=>{p=!0},200),p&&(p=!1,r.validate(a=>{if(a)$({url:"/api/create",method:"post",data:{action:"add",json:JSON.stringify(g.value),...o}}).then(n=>{n.code===0?(U.success("添加用户成功"),i.value.resetFields()):U.error("创建用户失败")});else return console.log("error submit!"),!1})))};return(r,a)=>{const n=G,d=q,V=T,D=B,M=R,u=A,Y=j,y=I;return F(),N("div",H,[l(M,{ref_key:"ruleFormRef",ref:i,model:o,"status-icon":"",rules:v,"label-width":"70px",class:"demo-ruleForm",inline:""},{default:t(()=>[l(d,{label:"姓名",prop:"name"},{default:t(()=>[l(n,{modelValue:o.name,"onUpdate:modelValue":a[0]||(a[0]=e=>o.name=e),maxlength:"100",style:{width:"196px"}},null,8,["modelValue"])]),_:1}),l(d,{label:"电话",prop:"phone"},{default:t(()=>[l(n,{modelValue:o.phone,"onUpdate:modelValue":a[1]||(a[1]=e=>o.phone=e),maxlength:"100",style:{width:"196px"}},null,8,["modelValue"])]),_:1}),l(d,{label:"年龄",prop:"age"},{default:t(()=>[l(n,{modelValue:o.age,"onUpdate:modelValue":a[2]||(a[2]=e=>o.age=e),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(d,{label:"地址",prop:"address"},{default:t(()=>[l(n,{modelValue:o.address,"onUpdate:modelValue":a[3]||(a[3]=e=>o.address=e),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(d,{label:"生日",prop:"birthday"},{default:t(()=>[l(V,{modelValue:o.birthday,"onUpdate:modelValue":a[4]||(a[4]=e=>o.birthday=e),type:"date",placeholder:"请输入生日","value-format":"YYYY-MM-DD",style:{width:"196px"}},null,8,["modelValue"])]),_:1}),l(d,{label:"职业",prop:"occupation"},{default:t(()=>[l(n,{modelValue:o.occupation,"onUpdate:modelValue":a[5]||(a[5]=e=>o.occupation=e),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(d,{label:"购买日期",prop:"purchaseDate"},{default:t(()=>[l(V,{modelValue:o.purchaseDate,"onUpdate:modelValue":a[6]||(a[6]=e=>o.purchaseDate=e),type:"date",placeholder:"购买日期","value-format":"YYYY-MM-DD"},null,8,["modelValue"])]),_:1}),l(d,{label:"取镜日期",prop:"takingDate"},{default:t(()=>[l(V,{modelValue:o.takingDate,"onUpdate:modelValue":a[7]||(a[7]=e=>o.takingDate=e),type:"date",placeholder:"取镜日期","value-format":"YYYY-MM-DD"},null,8,["modelValue"])]),_:1}),K,l(d,{label:"镜架",prop:"glasses"},{default:t(()=>[l(n,{modelValue:o.glasses,"onUpdate:modelValue":a[8]||(a[8]=e=>o.glasses=e),maxlength:"100",style:{width:"100px"}},null,8,["modelValue"])]),_:1}),l(d,{label:"镜架型号",prop:"glassesModel"},{default:t(()=>[l(n,{modelValue:o.glassesModel,"onUpdate:modelValue":a[9]||(a[9]=e=>o.glassesModel=e),maxlength:"100",style:{width:"100px"}},null,8,["modelValue"])]),_:1}),l(d,{label:"镜架颜色",prop:"glassescolor"},{default:t(()=>[l(n,{modelValue:o.glassescolor,"onUpdate:modelValue":a[10]||(a[10]=e=>o.glassescolor=e),maxlength:"100",style:{width:"100px"}},null,8,["modelValue"])]),_:1}),l(d,{label:"镜架价格",prop:"glassesPrice"},{default:t(()=>[l(n,{modelValue:o.glassesPrice,"onUpdate:modelValue":a[11]||(a[11]=e=>o.glassesPrice=e),maxlength:"100",style:{width:"100px"}},null,8,["modelValue"])]),_:1}),l(d,{label:"镜架售价",prop:"glassesSellingPrice"},{default:t(()=>[l(n,{modelValue:o.glassesSellingPrice,"onUpdate:modelValue":a[12]||(a[12]=e=>o.glassesSellingPrice=e),maxlength:"100",style:{width:"100px"}},null,8,["modelValue"])]),_:1}),l(d,{label:"镜片",prop:"eyeglass"},{default:t(()=>[l(n,{modelValue:o.eyeglass,"onUpdate:modelValue":a[13]||(a[13]=e=>o.eyeglass=e),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(d,{label:"镜片价格",prop:"eyeglassPrice"},{default:t(()=>[l(n,{modelValue:o.eyeglassPrice,"onUpdate:modelValue":a[14]||(a[14]=e=>o.eyeglassPrice=e),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(d,{label:"镜片售价",prop:"eyeglassSellingPrice"},{default:t(()=>[l(n,{modelValue:o.eyeglassSellingPrice,"onUpdate:modelValue":a[15]||(a[15]=e=>o.eyeglassSellingPrice=e),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(d,{label:"总价",prop:"totalPrice"},{default:t(()=>[l(n,{modelValue:o.totalPrice,"onUpdate:modelValue":a[16]||(a[16]=e=>o.totalPrice=e),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(d,{label:"定金",prop:"frontmoney"},{default:t(()=>[l(n,{modelValue:o.frontmoney,"onUpdate:modelValue":a[17]||(a[17]=e=>o.frontmoney=e),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(d,{label:"尚欠",prop:"notyetPrice"},{default:t(()=>[l(n,{modelValue:o.notyetPrice,"onUpdate:modelValue":a[18]||(a[18]=e=>o.notyetPrice=e),maxlength:"100"},null,8,["modelValue"])]),_:1}),l(d,{label:"积分",prop:"integral"},{default:t(()=>[l(D,{modelValue:o.integral,"onUpdate:modelValue":a[19]||(a[19]=e=>o.integral=e),min:0,"controls-position":"right"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),l(Y,{data:g.value,border:"","span-method":w,"header-cell-style":P,stripe:""},{default:t(()=>[l(u,{align:"center",prop:"name",label:""}),l(u,{align:"center",prop:"left",label:""}),l(u,{align:"center",prop:"spheric",label:"球镜"},{default:t(e=>[l(n,{modelValue:e.row.spheric,"onUpdate:modelValue":s=>e.row.spheric=s},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(u,{align:"center",prop:"luminosity",label:"光度"},{default:t(e=>[l(n,{modelValue:e.row.luminosity,"onUpdate:modelValue":s=>e.row.luminosity=s},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(u,{align:"center",prop:"axial",label:"轴位"},{default:t(e=>[l(n,{modelValue:e.row.axial,"onUpdate:modelValue":s=>e.row.axial=s},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(u,{align:"center",prop:"distance",label:"瞳距"},{default:t(e=>[l(n,{modelValue:e.row.distance,"onUpdate:modelValue":s=>e.row.distance=s},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(u,{align:"center",prop:"height",label:"瞳高"},{default:t(e=>[l(n,{modelValue:e.row.height,"onUpdate:modelValue":s=>e.row.height=s},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(u,{align:"center",prop:"corrected",label:"矫正视力"},{default:t(e=>[l(n,{modelValue:e.row.corrected,"onUpdate:modelValue":s=>e.row.corrected=s},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(u,{align:"center",prop:"naked",label:"裸眼视力"},{default:t(e=>[l(n,{modelValue:e.row.naked,"onUpdate:modelValue":s=>e.row.naked=s},null,8,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1},8,["data"]),h("div",L,[l(y,{type:"primary",onClick:a[20]||(a[20]=e=>k(i.value))},{default:t(()=>[x("确定")]),_:1}),l(y,{onClick:a[21]||(a[21]=e=>S(i.value))},{default:t(()=>[x("清空")]),_:1})])])}}});const ae=O(Q,[["__scopeId","data-v-91a37032"]]);export{ae as default};
