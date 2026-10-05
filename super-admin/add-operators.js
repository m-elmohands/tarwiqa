const $=id=>document.getElementById(id);
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const write=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const hashPassword=async value=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value)))).map(byte=>byte.toString(16).padStart(2,"0")).join("");

const zones=["New Cairo","Nasr City","Maadi","Heliopolis","6th October","Dokki","Mohandessin"];
const days=["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
const serviceNames=["Home Cleaning","Office Cleaning","Deep Cleaning","Move In / Out","Kitchen Cleaning","Laundry & Ironing"];
const seedMaids=[{id:"MD-1098",name:"Hoda Ali",operatorId:"OP-1024"},{id:"MD-1401",name:"Laila Mostafa",operatorId:"OP-1024"},{id:"MD-1510",name:"Rana Fouad",operatorId:"OP-1024"},{id:"MD-1042",name:"Amina Mostafa",operatorId:"OP-1031"}];
const reserved=[{username:"ops.mona",email:"partner@tarwiqa.com",phone:"+201002204411"},{username:"ops.karim",email:"karim@tarwiqa.app",phone:"+201014421188"},{username:"ops.ahmed",email:"ahmed@tarwiqa.app",phone:"+201228874011"}];
const permissionData=[
{section:"Dashboard & Schedule",page:"partner-dashboard.html",items:[["View dashboard KPIs and today's schedule",0],["View protected customer data after the release countdown",0],["View Partner Notifications Center",0]]},
{section:"Assigned Orders",page:"partner-dashboard.html#ordersSection",items:[["View and filter assigned orders for Today, Tomorrow, or All",0],["Open released order details, payment method, offer, and extras",0],["Assign one or more eligible maids to an order",1],["Submit the Order Handover Checklist",1]]},
{section:"Done Orders",page:"partner-done-orders.html",items:[["View completed order summaries without private customer details",0]]},
{section:"Managed Maids",page:"partner-dashboard.html#maidsSection",items:[["View assigned maids and availability",0],["Open read-only maid profiles",0],["Upload a document to an assigned maid profile",1],["Submit a request to add a new maid",1]]},
{section:"Messages",page:"partner-messages.html",items:[["View messages from Super Admin and Supporters",0],["Reply to Super Admin and Supporters",1]]},
{section:"Partner Profile & Finance",page:"partner-profile.html",items:[["View account, Work Zone, financial details, and profits",0],["View completed and upcoming order totals",0]]}
];
let pending=null;

function renderSetup(){
 $("workZonesList").innerHTML=zones.map(x=>'<label class="choice-option"><input name="workZone" type="checkbox" value="'+x+'"> '+x+'</label>').join("");
 $("workingDaysList").innerHTML=days.map((x,i)=>'<label class="choice-option"><input name="workingDay" type="checkbox" value="'+x+'" '+(i<6?"checked":"")+'> '+x+'</label>').join("");
 $("servicesList").innerHTML=serviceNames.map(x=>'<label class="choice-option"><input name="service" type="checkbox" value="'+x+'" checked> '+x+'</label>').join("");
 const overrides=read("maidProfileOverrides",{}), maids=[...seedMaids,...read("createdMaids",[])].map(x=>({...x,...(overrides[x.id]||{})})).filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i);
 $("assignedMaids").innerHTML=maids.map(x=>'<option value="'+esc(x.id)+'">'+esc(x.name)+' ('+esc(x.id)+') - '+(x.operatorId?"Assigned":"Unassigned")+'</option>').join("");
}
function renderPermissions(){
 $("permissionsSections").innerHTML=permissionData.map((g,gi)=>'<article class="permission-section"><div class="section-head"><div><p class="eyebrow">'+g.page+'</p><h3>'+g.section+'</h3></div></div><div class="permission-list">'+g.items.map((item,ii)=>{const k=gi+"-"+ii;return '<div class="permission-row"><div class="permission-info"><strong>'+item[0]+'</strong><div class="permission-meta">'+(item[1]?"Operational action available only to an Editor.":"View-only Partner Workspace capability.")+'</div></div><div class="toggle-group"><label class="toggle-label"><input class="view-toggle" data-key="'+k+'" type="checkbox" checked> View</label><label class="toggle-label edit"><input class="edit-toggle" data-key="'+k+'" type="checkbox" '+(!item[1]?'disabled data-fixed="1"':"")+'> Edit</label></div></div>'}).join("")+'</div></article>').join("");
 document.querySelectorAll(".view-toggle").forEach(x=>x.onchange=()=>{const e=document.querySelector('.edit-toggle[data-key="'+x.dataset.key+'"]');if(!x.checked)e.checked=false;summary()});
 document.querySelectorAll(".edit-toggle").forEach(x=>x.onchange=()=>{const v=document.querySelector('.view-toggle[data-key="'+x.dataset.key+'"]');if(x.checked)v.checked=true;summary()});
 roleUI();summary();
}
const role=()=>document.querySelector('input[name="operatorRole"]:checked')?.value||"viewer";
function roleUI(){const viewer=role()==="viewer";$("viewerRoleOption").classList.toggle("active",viewer);$("editorRoleOption").classList.toggle("active",!viewer);$("selectedRoleLabel").textContent=viewer?"Viewer":"Operational Editor";document.querySelectorAll(".edit-toggle").forEach(x=>{if(viewer)x.checked=false;x.disabled=viewer||x.dataset.fixed==="1"})}
function summary(){$("viewPermissionsCount").textContent=document.querySelectorAll(".view-toggle:checked").length;$("editPermissionsCount").textContent=document.querySelectorAll(".edit-toggle:checked").length}
function permissions(){return permissionData.map((g,gi)=>({section:g.section,page:g.page,items:g.items.map((item,ii)=>{const k=gi+"-"+ii;return{name:item[0],canView:!!document.querySelector('.view-toggle[data-key="'+k+'"]')?.checked,canEdit:!!document.querySelector('.edit-toggle[data-key="'+k+'"]')?.checked}}).filter(x=>x.canView||x.canEdit)})).filter(x=>x.items.length)}
const checked=name=>[...document.querySelectorAll('input[name="'+name+'"]:checked')].map(x=>x.value);
const selected=id=>[...$(id).selectedOptions].map(x=>x.value);
const norm=x=>String(x||"").trim().toLowerCase().replace(/\s+/g,"");
function toast(message){$("operatorToast").textContent=message;$("operatorToast").classList.remove("hidden");clearTimeout(toast.timer);toast.timer=setTimeout(()=>$("operatorToast").classList.add("hidden"),3200)}
function fail(message,id){toast(message);$(id)?.focus();return null}
function doc(id,type,expiry){const f=$(id).files[0];return f?{type,name:f.name,size:f.size,mimeType:f.type||"unknown",expiry,uploadedAt:new Date().toISOString()}:null}

function collect(){
 const type=$("partnerAccountType").value,name=$("partnerName").value.trim(),username=$("operatorUsername").value.trim(),email=$("partnerEmail").value.trim().toLowerCase(),phone=$("partnerPhone").value.trim();
 const password=$("operatorPassword").value,confirm=$("confirmPartnerPassword").value,gov=$("partnerGovernorate").value,zone=$("partnerPrimaryZone").value;
 const workZones=[...new Set([zone,...checked("workZone")].filter(Boolean))],workDays=checked("workingDay"),services=checked("service"),maids=selected("assignedMaids");
 const method=$("settlementMethod").value,commission=Number($("commissionPercent").value),capacity=Number($("maxDailyOrders").value),expiry=$("documentExpiry").value,today=new Date().toISOString().slice(0,10);
 const all=[...reserved,...read("createdPartners",[])];
 if(!name)return fail("Enter the partner full or company name.","partnerName");
 if(!/^[a-zA-Z0-9._-]{4,}$/.test(username))return fail("Enter a unique username of at least 4 valid characters.","operatorUsername");
 if(all.some(x=>norm(x.username)===norm(username)))return fail("This username is already used.","operatorUsername");
 if(!email||!$("partnerEmail").checkValidity())return fail("Enter a valid email address.","partnerEmail");
 if(all.some(x=>norm(x.email)===norm(email)))return fail("This email is already used.","partnerEmail");
 if(!phone)return fail("Enter the partner phone number.","partnerPhone");
 if(all.some(x=>norm(x.phone)===norm(phone)))return fail("This phone number is already used.","partnerPhone");
 if(!gov||!zone)return fail("Select the assigned governorate and primary Work Zone.",!gov?"partnerGovernorate":"partnerPrimaryZone");
 if(!$("partnerAddress").value.trim())return fail("Enter the registered address.","partnerAddress");
 if(!$("emergencyName").value.trim()||!$("emergencyPhone").value.trim())return fail("Enter complete emergency contact details.","emergencyName");
 if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password))return fail("Password needs uppercase, lowercase, a number, and at least 8 characters.","operatorPassword");
 if(password!==confirm)return fail("Password confirmation does not match.","confirmPartnerPassword");
 if($("accountExpiry").value&&$("accountExpiry").value<=today)return fail("Account expiry must be a future date.","accountExpiry");
 if(!workDays.length)return fail("Select at least one working day.");
 if(!$("workStart").value||!$("workEnd").value||$("workStart").value>=$("workEnd").value)return fail("Working end time must be after start time.","workEnd");
 if(!Number.isInteger(capacity)||capacity<1||capacity>100)return fail("Maximum daily orders must be from 1 to 100.","maxDailyOrders");
 if(!services.length)return fail("Select at least one supported service.");
 if(!Number.isFinite(commission)||commission<0||commission>100)return fail("Commission must be from 0 to 100.","commissionPercent");
 if(method==="bank"&&(!$("bankName").value.trim()||!$("accountHolder").value.trim()||!$("bankAccount").value.trim()))return fail("Complete all bank settlement details.","bankName");
 if(method==="wallet"&&!$("walletPhone").value.trim())return fail("Enter the settlement wallet phone.","walletPhone");
 if(type==="individual"&&!/^\d{14}$/.test($("nationalId").value.trim()))return fail("National ID must contain 14 digits.","nationalId");
 if(type==="company"&&(!$("commercialRegistration").value.trim()||!$("taxNumber").value.trim()))return fail("Enter commercial registration and tax number.","commercialRegistration");
 if(!expiry||expiry<=today)return fail("Select a future legal document expiry date.","documentExpiry");
 if(!$("identityFile").files.length)return fail("Upload the identity or registration file.","identityFile");
 if(!$("contractFile").files.length)return fail("Upload the signed contract.","contractFile");
 if(!$("paymentProofFile").files.length)return fail("Upload the settlement proof.","paymentProofFile");
 const access=permissions();if(!access.length)return fail("Select at least one Partner Workspace permission.");
 const next=Math.max(1100,...read("createdPartners",[]).map(x=>Number(String(x.id).replace(/\D/g,""))||0))+1,id="OP-"+next;
 return{id,name,username,email,phone,_password:password,status:$("partnerStatus").value,role:role(),accountType:type,governorate:gov,zone,workZone:zone,workZones,address:$("partnerAddress").value.trim(),emergencyContact:{name:$("emergencyName").value.trim(),phone:$("emergencyPhone").value.trim()},workingDays:workDays,workingHours:{start:$("workStart").value,end:$("workEnd").value},maxDailyOrders:capacity,services,assignedMaidIds:maids,managedMaids:maids.length,completedOrders:0,lastMessage:"Partner account created and ready for onboarding.",commissionPercent:commission,settlement:{method,bankName:$("bankName").value.trim(),accountHolder:$("accountHolder").value.trim(),accountNumber:$("bankAccount").value.trim(),walletPhone:$("walletPhone").value.trim()},legal:{nationalId:$("nationalId").value.trim(),commercialRegistration:$("commercialRegistration").value.trim(),taxNumber:$("taxNumber").value.trim(),documentExpiry:expiry},documents:[doc("identityFile","Identity / Registration",expiry),doc("contractFile","Signed Contract",expiry),doc("paymentProofFile","Settlement Proof",expiry)].filter(Boolean),forcePasswordChange:$("forcePasswordChange").checked,twoFactorEnabled:$("twoFactorEnabled").checked,accountExpiry:$("accountExpiry").value||null,notes:$("internalNotes").value.trim(),permissions:access,joinedAt:new Date().toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"}),createdAt:new Date().toISOString()}
}
function modal(title,body,button,action){$("operatorModalEyebrow").textContent="Create Partner";$("operatorModalTitle").textContent=title;$("operatorModalBody").innerHTML=body;$("operatorModalPrimary").textContent=button;$("operatorModalPrimary").onclick=action;$("operatorModal").classList.remove("hidden");$("operatorModal").setAttribute("aria-hidden","false")}
function closeModal(){$("operatorModal").classList.add("hidden");$("operatorModal").setAttribute("aria-hidden","true");$("operatorModalPrimary").onclick=null}
const accessRows=p=>p.permissions.flatMap(g=>g.items.map(x=>'<div class="modal-row"><div><strong>'+esc(g.section)+'</strong><span>'+esc(x.name)+'</span></div><b>'+(x.canEdit?"Editor":"Viewer")+'</b></div>')).join("");
function preview(){const p=collect();if(!p)return;pending=p;modal("Create "+esc(p.name),'<div class="modal-summary-grid"><div><span>Partner ID</span><strong>'+p.id+'</strong></div><div><span>Work Scope</span><strong>'+esc(p.governorate+" / "+p.zone)+'</strong></div><div><span>Work Zones</span><strong>'+p.workZones.length+'</strong></div><div><span>Assigned Maids</span><strong>'+p.managedMaids+'</strong></div><div><span>Commission</span><strong>'+p.commissionPercent+'%</strong></div></div><div class="review-block"><strong>Security</strong><p>First-login password change: '+(p.forcePasswordChange?"Required":"Not required")+' / 2FA: '+(p.twoFactorEnabled?"Enabled":"Disabled")+'</p></div><div class="modal-table">'+accessRows(p)+'</div>',"Confirm & Create",save)}
async function save(){if(!pending)return;const stored={...pending,passwordHash:await hashPassword(pending._password)};delete stored._password;const partners=read("createdPartners",[]);partners.push(stored);write("createdPartners",partners);if(stored.assignedMaidIds.length){const overrides=read("maidProfileOverrides",{});stored.assignedMaidIds.forEach(id=>overrides[id]={...(overrides[id]||{}),operatorId:stored.id,operator:stored.name});write("maidProfileOverrides",overrides)}closeModal();$("createPartnerBtn").textContent="Partner Created";$("createPartnerBtn").disabled=true;toast(stored.name+" created successfully and added to Partners List.");pending=null}
function previewAccess(){const p={permissions:permissions()};modal("Partner Workspace Permissions",'<div class="modal-table">'+(accessRows(p)||'<p class="empty-state">No permissions selected.</p>')+'</div>',"Print",()=>window.print())}
function toggle(id,button){const input=$(id),show=input.type==="password";input.type=show?"text":"password";button.textContent=show?"Hide":"Show"}
function legal(){const company=$("partnerAccountType").value==="company";document.querySelectorAll(".legal-company").forEach(x=>x.classList.toggle("hidden",!company));document.querySelectorAll(".legal-individual").forEach(x=>x.classList.toggle("hidden",company))}
function finance(){const method=$("settlementMethod").value;document.querySelectorAll(".financial-field").forEach(x=>x.classList.toggle("hidden",x.dataset.method!==method))}
function primaryZone(){document.querySelectorAll('input[name="workZone"]').forEach(x=>{x.disabled=x.value===$("partnerPrimaryZone").value;if(x.disabled)x.checked=true})}

document.querySelectorAll('input[name="operatorRole"]').forEach(x=>x.onchange=()=>{roleUI();summary()});
$("partnerAccountType").onchange=legal;$("settlementMethod").onchange=finance;$("partnerPrimaryZone").onchange=primaryZone;
$("togglePartnerPassword").onclick=e=>toggle("operatorPassword",e.currentTarget);$("toggleConfirmPassword").onclick=e=>toggle("confirmPartnerPassword",e.currentTarget);
$("createPartnerBtn").onclick=preview;$("exportPermissionsBtn").onclick=previewAccess;$("operatorsListBtn").onclick=()=>location.href="./operators-list.html";
$("operatorModalClose").onclick=closeModal;$("operatorModalSecondary").onclick=closeModal;$("operatorModal").onclick=e=>{if(e.target===$("operatorModal"))closeModal()};document.onkeydown=e=>{if(e.key==="Escape")closeModal()};
renderSetup();renderPermissions();legal();finance();