import{d as b,u as h,r as V,a as x,b as c,o as I,c as S,e as p,f as t,w as r,g as f,h as q,i as C,j as B,k as L,E as N,s as U,l as j,m as E,p as K,n as O,_ as R}from"./index-a72879b9.js";import{s as T}from"./request-ed690f3a.js";const $=l=>(K("data-v-4f1cb784"),l=l(),O(),l),F={class:"login-wrapper"},M={class:"ms-login"},Q=$(()=>p("div",{class:"ms-title"},"后台管理系统",-1)),z={class:"btn-wrapper"},A=b({__name:"Login",setup(l){const g=h(),v=B(),i=L(),s=V({account:"admin",password:"admin123"}),y={account:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},d=x(),k=n=>Object.keys(n).reduce((e,o)=>(o!=="redirect"&&(e[o]=n[o]),e),{}),_=n=>{n&&n.validate(e=>{if(e)T({url:"/api/token",method:"post",data:{...s,type:"101"}}).then(({data:o})=>{N.success("登录成功"),U(o.token),g.token=o.token;const u=i.query.redirect||"";v.push({path:u,query:k(i.query)})});else return!1})};return(n,e)=>{const o=c("el-button"),u=c("el-input"),m=c("el-form-item"),w=c("el-form");return I(),S("div",F,[p("div",M,[Q,t(w,{rules:y,ref_key:"login",ref:d,model:s,class:"ms-content"},{default:r(()=>[t(m,{prop:"account"},{default:r(()=>[t(u,{modelValue:s.account,"onUpdate:modelValue":e[0]||(e[0]=a=>s.account=a),placeholder:"请输入用户名"},{prepend:r(()=>[t(o,{icon:f(j)},null,8,["icon"])]),_:1},8,["modelValue"])]),_:1}),t(m,{prop:"password"},{default:r(()=>[t(u,{onKeyup:e[1]||(e[1]=q(a=>_(d.value),["enter"])),type:"password",modelValue:s.password,"onUpdate:modelValue":e[2]||(e[2]=a=>s.password=a),placeholder:"请输入密码"},{prepend:r(()=>[t(o,{icon:f(E)},null,8,["icon"])]),_:1},8,["modelValue"])]),_:1}),p("div",z,[t(o,{type:"primary",onClick:e[3]||(e[3]=a=>_(d.value))},{default:r(()=>[C("登录")]),_:1})])]),_:1},8,["model"])])])}}});const H=R(A,[["__scopeId","data-v-4f1cb784"]]);export{H as default};