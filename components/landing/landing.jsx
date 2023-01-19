import React,{use, useEffect, useState} from 'react'
import Navbar from "../navbar/Navbar"
import { Row,Col, Button,Card,Image,Spin, message } from 'antd'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import {LeftCircleOutlined,CloseOutlined,PlusCircleFilled,LoadingOutlined} from '@ant-design/icons'

export default function Landing() {
  const router = useRouter()
  const [pages,setPages] = useState([])
  const [data,setData] = useState([])
  const [visisble,setVisible] = useState(false)
  const [flag,setFlag] = useState(false)
  const [errorMessage,setErrorMessage] = useState()
  const [loading, setLoading] = useState(true);
  const [routeFlag, setRouteFlag] = useState(false);
  const { appId } = router.query;
  
  // console.log(appId)
  const onNewPageCreate = ()=>{
  router.push(`/developer/apps/${appId}/pages/new`)
  // setVisible(false)
  }
  
  useEffect(()=>{
    const reQBody = {
      "collection":"dev_apps",
      "database":"App-x",
      "dataSource":"Cluster0",
    }
      axios.post('/api/apps/getApps',reQBody,{
    }) 
    .then(response => {
      if(response.status === 200){
        setData(response.data.documents)
        setLoading(false)
      }
    })
    .catch(error => {
      console.log(error)
    });
   },[])

  useEffect(()=>{
    localStorage.setItem('appId',appId);
    if (appId !== undefined && data.length > 0) {
      // console.log("route")
      let fl = "N";
      data?.map(res=>{
        if( res.app_id == appId){
          setFlag(true);
          fl = "Y";
        }
      })
      if (fl === "N") {
        setRouteFlag(true);
      }
    }
  },[appId,data])

  useEffect(() => {
    if (routeFlag === true) {
      router.push("/");
    }
  }, [routeFlag]);

  useEffect(()=>{
    setLoading(true)
    if(flag===true){
      const reQBody = {
            "collection":"dev_pages",
            "database":"App-x",
            "dataSource":"Cluster0",
            "filter": {"appId":`${appId}`}
          }
          axios.post('/api/apps/getPages',reQBody,{
          })
          .then(response => {
            if(response.status === 200){
              if (response.data.documents.length !== 0) {
                setPages(response.data.documents)
                response.data.documents?localStorage.setItem('currApp',response.data.documents[0]?.appName):null
                setLoading(false)
                setErrorMessage(null)
              }else{
               setLoading(false)
              }
            }
          })
          .catch(error => {
            console.log(error)
          });
       }
  },[flag])

  const onPage = (key) =>{
   router.push(`/developer/apps/${appId}/pages/form/${key.key}`)
  }
  const onAdd=()=>{
    setVisible(true)
    let arr=[];
    arr.push({
      appName:localStorage.getItem('currApp'),
      appId:appId,
      description:'',
      pages:[]
    })
    localStorage.setItem('apps',JSON.stringify(arr))
  }

 
  return (
    
    <div style={{backgroundColor:'#e5e5e5'}}>
      
     <Navbar/>
     <br/>
     {errorMessage ? <p className="error-message">{errorMessage}</p>:
     <Spin indicator={<LoadingOutlined  style={{ fontSize: "55px", color: "#0C173A" }} />} spinning={loading}>
     { pages.length > 0   && visisble === false ? <div>
        <Row style={{height:'110px',margin:'1% 1.5% 0% 1.5%',backgroundColor:'white',borderRadius:'6px'}}>
          <Col style={{paddingTop:35,paddingLeft:40}} span={2}>
            <LeftCircleOutlined onClick={()=>{router.push('/')}} style={{opacity:0.3,fontSize:30,cursor:'pointer'}}/>
          </Col>
          <Col style={{paddingTop:10}} span={6}>
           <p style={{fontFamily:'Inter',fontSize:"26px",fontWeight:500,marginBottom:0}}>{localStorage.getItem("currApp")}</p>
           <p style={{fontFamily:'Inter',fontSize:"13px",fontWeight:400}}>The stock update mechanism prevents accidental overselling by reserving inventory</p>
          </Col>
          <Col span={13}/>
          <Col style={{paddingTop:35}} span={3}>
           <Button style={{backgroundColor:'#0C173A',color:'white',fontFamily:'Roboto',fontWeight:700,width:'80%',height:'36px',borderRadius:'100px'}} >Preview</Button>
          </Col>
        </Row>
        <Row style={{marginLeft:'2em',marginTop:'1.5em'}}>
         <p style={{fontFamily:'Inter',fontWeight:500,fontSize:'18px'}}>All Pages &nbsp; <PlusCircleFilled onClick={onAdd} style={{fontSize:20}} color='#0C173A' /></p>
        </Row>
        <Row>
          {pages.map(res=>{
            return(
              <Col span={4}>
              <Card key={res.pageId} onClick={()=>onPage({key:res.pageId})} style={{height:'270px',borderRadius:'8px',width:'98%',cursor:'pointer'}}>
                <p style={{fontFamily:'Inter',fontWeight:500,fontSize:'18px',marginLeft:'20%'}}>{res.pageName}</p>
                <p style={{fontFamily:'Inter',fontWeight:300,fontSize:'14px',marginLeft:'3%'}}>Accept payments,track your sales,generate reports, get data up to date with this new</p>
                <p style={{fontFamily:'Inter',fontWeight:500,fontSize:'14px',marginLeft:'30%'}}> View&nbsp;<Image src='/images/viewArrow.svg' alt=''/></p>
              </Card>
              </Col>
            )
          })}
        </Row>
        </div>:
         loading ? "" :
        <div style={{marginLeft:'3%'}} >
        <Row style={{marginTop:'20px',padding:'0px 20px'}}>
               <Col span={1}>
               <LeftCircleOutlined style={{fontSize:27,opacity:0.5}}/>
               </Col>
               <Col span={21}>
                   <p style={{fontFamily:'Inter',fontWeight:400,fontSize:'16px',color:'#192228', paddingTop: '10'}}>{localStorage.getItem("currApp")}</p>
               </Col>
               <Col style={{display:'grid'}} span={1}>
                <Link href='/'>
               <CloseOutlined style={{fontSize:20,opacity:0.5}}/>
               </Link>
               </Col>
           </Row>
           <br/>
           <Row >
             <Col span={1}/>
   
             <Col span={8}>
               <h1 style={{fontFamily:'Inter',fontSize:'31px'}}>
                 Create pages for your App
               </h1>
               <span style={{fontSize:'16px',fontFamily:'Inter',fontWeight:400}}>
                 Name your Page,Select page type - Form,Report or Dashboard and Start designing your very own app
               </span>
             </Col>
             <Col span={15}>
             <Image style={{height:250}} preview={false} src='/images/createavatar.png' alt='' />
             <br/><br/><br/>
             <Button onClick={onNewPageCreate} style={{marginLeft:'7%',borderRadius:'4px',color:'white',backgroundColor:'#0C173A',fontfamily:'Roboto',fontWeight:700}}>Create New Page</Button>
             </Col>
           </Row>
           <Row>
             <Col span={8}/>
            
             {/* <Col span={4}/> */}
           </Row>
           </div>}
     
           </Spin>}
    </div>
  )
}

// Landing.getInitialProps = async (ctx) => {
//   const appId = ctx.query.appId;
//   return { appId };
// }