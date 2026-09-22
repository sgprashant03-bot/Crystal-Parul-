const http=require('http'), fs=require('fs'), path=require('path');
const root=__dirname;
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'};
function json(res,status,data){res.writeHead(status,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});res.end(JSON.stringify(data))}
function body(req){return new Promise((resolve,reject)=>{let b='';req.on('data',c=>b+=c);req.on('end',()=>{try{resolve(JSON.parse(b||'{}'))}catch(e){reject(e)}})})}
const server=http.createServer(async(req,res)=>{
  if(req.method==='POST' && (req.url==='/api/orders'||req.url==='/api/contact')){
    try{const data=await body(req);if(req.url==='/api/orders'){const orderNumber='CP-'+new Date().getFullYear()+'-'+Math.floor(100000+Math.random()*899999);console.log(`[email] Order confirmation from crystalparul@gmail.com for ${orderNumber}`);return json(res,201,{ok:true,orderNumber})}console.log('[email] Contact enquiry routed to crystalparul@gmail.com',data.customer?.email||data.email);return json(res,201,{ok:true,message:'Received'})}catch(e){return json(res,400,{ok:false,error:'Invalid request'})}
  }
  let file=req.url.split('?')[0];if(file==='/')file='/index.html';let full=path.join(root,file);if(!full.startsWith(root)||!fs.existsSync(full))return json(res,404,{error:'Not found'});res.writeHead(200,{'Content-Type':mime[path.extname(full)]||'application/octet-stream'});fs.createReadStream(full).pipe(res);
});server.listen(4173,'0.0.0.0',()=>console.log('Crystal Parul server listening on 4173'));