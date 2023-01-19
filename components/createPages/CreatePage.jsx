import React,{useState} from 'react'
import {Button, Card,Row,Col,Tabs,Input,Image} from "antd"
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function CreatePage() {
  const [selectedKey,setSelectedKeys] = useState("1")
  const [pageName,setPageName] = useState('')
  // const [pageID,setPageID] = useState(1997)
  const router = useRouter()
  const appId = router.query.appId
  const responsiveAppCard = {
    xxl: 19,
    xl: 19,
    lg: 19,
    xs: 22,
    sm: 22,
    md: 19,
}
const responsiveSpace = {
  xxl: 5,
  xl: 5,
  lg: 5,
  xs: 2,
  sm: 2,
  md: 5,
}
const responsiveBox = {
  xxl: 7,
  xl: 7,
  lg: 7,
  xs: 12,
  sm: 12,
  md: 12,
}
const responsiveBox2 = {
  xxl: 6,
  xl: 6,
  lg: 6,
  xs: 12,
  sm: 12,
  md: 8,
}
const onPageNext = ()=>{
  
  // let initial = JSON.parse(localStorage.getItem("apps")) ;
  // console.log(localStorage.getItem('currApp'))
  // const mainData = [...initial];
  // mainData.map(res=>{
  //   if(res.appName === localStorage.getItem('currApp')){
  //       res.pages.push({
  //         pageName:pageName
  //       })
  //   }
  // })
  // localStorage.setItem("apps", JSON.stringify(mainData));
  setSelectedKeys('2')
  // setPageID(pageID+1)
}
const pageType = (e) =>{
localStorage.setItem('pageType',e)
let initial = JSON.parse(localStorage.getItem("apps")) ;
const mainData = [...initial];
const random = Math.floor(1000 + Math.random() * 9000);
mainData.map(res=>{
  if(res.appName === localStorage.getItem('currApp')){
      res.pages.push({
        pageName:pageName,
        pageId:random,
        type:e,
        enabled:{
          enablenew:"Y",
          enablefilter:"Y",
          enableedit:"Y",
          enableprint:"Y",
          enableview:"Y",
          enableattachment:"Y",
          enabledelete:"Y",
          enableauditlog:"Y",
          enableemail:"Y",
          treeView:"Y"
        },
        Tabs:[
          {
          card_id: "123",
          name: "Header",
          cardtype: "Form",
          position: "Left",
          height: "16",
          width: "24",
          level: "0",
          seqno: "10",
          ad_tab_id: "3C90B95A91204B3090668AD6D2C4D4D5",
        fields:[]
      }]
      })
  }
})
localStorage.setItem("apps", JSON.stringify(mainData));
localStorage.setItem("currPage",pageName)
setSelectedKeys('3')
}
const onStart = () =>{
  router.push(`/developer/apps/${appId}/pages/form/new`)
}

  return (
    <Card bordered={false} style={{height:'100%',width:'100%',backgroundColor:'#e5e5e5'}}>
      <Card style={{backgroundColor:'white',height:'700px'}}
      title={
        <Row>
          <Col span={20}>
         <p style={{fontFamily:'Inter',fontWeight:600}}>Create New Page</p>
         </Col>
         <Col span={4}>
         <Button style={{backgroundColor:'#0C173A',color:"white",float:'right',fontFamily:'Roboto',fontWeight:700,border:'none',borderRadius:'4px',width:'auto'}}>Cancel</Button>
         </Col>
        </Row>
          }>
        <Row style={{}}>
          <Col {...responsiveSpace}/>
          <Col {...responsiveAppCard}>
        <Tabs style={{}} className='maintabs' defaultActiveKey={selectedKey} activeKey={selectedKey}>
        <Tabs.TabPane  tab={<p onClick={()=>{setSelectedKeys('1')}} style={{fontFamily:'Inter',fontSize:'16px',fontWeight:400,margin:'0px 0px',color:'black',borderBottom:selectedKey == '1'? ' 2px solid #A4CD38 ' :null}}>Page Name</p>} key="1">
          <Row style={{marginLeft:'9%'}}>
            <br/>
          <Col span={24}>
        <h1 style={{fontFamily:'Inter',fontSize:'30px',fontWeight:500,marginLeft:'10%'}}>Name Your Page</h1>
        </Col>
        </Row>
        <Row style={{marginLeft:'9%'}}>
         <Col span={24}>
        <Input value={pageName} onChange={(e)=>{setPageName(e.target.value)}} style={{margin:'10px 0px',width:'auto',marginLeft:'12%'}}/>
        </Col>
        </Row>
        <br/>
        <Row style={{marginLeft:'9%'}}>
          <Col span={24}>
        <Button onClick={onPageNext} style={{marginLeft:'15%',backgroundColor:'#0C173A',height:'40px',top:'20px',color:"white",fontFamily:'Roboto',fontWeight:700,border:'none',borderRadius:'4px',width:'auto'}}>Select Page Type</Button>
        </Col>
        </Row>
       </Tabs.TabPane>
       <Tabs.TabPane tab={<p onClick={()=>{setSelectedKeys('2')}} style={{fontFamily:'Inter',fontSize:'16px',fontWeight:400,margin:'0px 0px',color:'black',borderBottom:selectedKey == '2'? ' 2px solid #A4CD38 ' :null}}>Page Type</p>} key="2">
       <h1 style={{fontFamily:'Inter'}}>Select The Type Of Page You Would Like To Create</h1>
       <Row gutter={16}>
        <Col {...responsiveBox}>
          <Card  onClick={()=>{pageType('form')}}  key='form' style={{cursor:'pointer',height:'220px',border:'1px solid #CDCDCD',borderRadius:'8px',textAlign:'center'}}><br/><br/>
            <span style={{fontFamily:'Inter',fontSize:'22px',fontWeight:600}}>Form</span>
            <br/>
            <span style={{fontFamily:'Inter',fontSize:'16px',fontWeight:300}}>Best for Google Search Adds</span>
          </Card>
          
        </Col>
        <Col {...responsiveBox}>
          <Card key='report' style={{height:'220px',border:'1px solid #CDCDCD',borderRadius:'8px',textAlign:'center'}}><br/><br/>
            <span style={{fontFamily:'Inter',fontSize:'22px',fontWeight:600}}>Reports</span>
            <br/>
            <span style={{fontFamily:'Inter',fontSize:'16px',fontWeight:300}}>Best for Google Search Adds</span>
          </Card>
        </Col>
        <Col {...responsiveBox}>
          <Card type='dash' style={{height:'220px',border:'1px solid #CDCDCD',borderRadius:'8px',textAlign:'center'}}><br/><br/>
            <span style={{fontFamily:'Inter',marginTop:'20px',fontSize:'22px',fontWeight:600,width:'%'}}>Dashboards</span>
            <br/>
            <span style={{fontFamily:'Inter',fontSize:'16px',fontWeight:300}}>Best for Google Search Adds</span>
          </Card>
        </Col>
      </Row>
    </Tabs.TabPane>
    <Tabs.TabPane tab={<p onClick={()=>{setSelectedKeys('3')}} style={{fontFamily:'Inter',fontSize:'16px',fontWeight:400,margin:'0px 0px',color:'black',borderBottom:selectedKey == '3'? ' 2px solid #A4CD38 ' :null}}>Select Template</p>} key="3">
      <h1 style={{fontFamily:'Inter'}}>Select a Template For Your Page</h1>
      <Row gutter={16}>
        <Col {...responsiveBox2}>
          
          <Card style={{height:'300px',border:'1px solid #CDCDCD',borderRadius:'8px',textAlign:'center'}}><br/><br/>
            <span style={{fontFamily:'Inter',fontSize:'22px',fontWeight:600}}>Start with a Blank Page</span>
            <br/>
            {/* <Link href='/form'> */}
            <Button onClick={onStart} style={{backgroundColor:'#0C173A',height:'35px',top:'20px',color:"white",fontFamily:'Roboto',fontWeight:700,border:'none',borderRadius:'4px',width:'50%'}}>Start</Button>
            {/* </Link> */}
          </Card>
          
        </Col>
        <Col {...responsiveBox2}>
          <Card  style={{height:'300px',border:'1px solid #CDCDCD',borderRadius:'8px',textAlign:'center'}}><br/><br/>
            <span style={{fontFamily:'Inter',fontSize:'22px',fontWeight:600}}>Form</span>
            <br/>
            {/* <span style={{fontFamily:'Inter',fontSize:'16px',fontWeight:300}}>Best for Google Search Adds</span> */}
            <Button style={{backgroundColor:'#0C173A',height:'35px',top:'20px',color:"white",fontFamily:'Roboto',fontWeight:700,border:'none',borderRadius:'4px',width:'50%'}}>Start</Button>
            <br/>
            <Button style={{backgroundColor:'white',height:'35px',top:'40px',color:"black",fontFamily:'Roboto',fontWeight:700,border:'1px dashed black',borderRadius:'4px',width:'50%'}}>Preview</Button>
          </Card>
        </Col>
        </Row>
    </Tabs.TabPane>
        </Tabs>
        </Col>
        {/* <Col span={}/> */}
        </Row>
      </Card>
    </Card>
  )
}
