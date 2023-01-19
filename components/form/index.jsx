import React, { useEffect, useState } from 'react';
import {Row,Col,Image, Button,Menu,Spin, Form,Card, Input,Modal, Checkbox, DatePicker, Switch, Tabs} from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { v4 as uuid } from "uuid";
import {LoadingOutlined} from '@ant-design/icons'
 
export default function FormCreator() {
  const router = useRouter()
  const data  = router.query
  const appId = data.appId
  const formId = data.formId
  const [visible,setVisible]=useState(false)
  const [type,setType] = useState('')
  const [loading,setLoading] = useState(false)
  const [pubApp,setPubApp] = useState()
  const [description,setDescription] = useState()
  const [pageName,setPageName] = useState() 
  const [labelName,setLabelName] =useState('')
  const [dragged, setDragged] = useState([]);
  const [enabled,setEnabled] = useState()
  const [tabs,setTabs] = useState([])
  const [disable,setDisable] = useState(false)
  const [counter,setCounter] = useState(0)
  const [pages,setPages] =useState()

const responsiveBar = {
  xxl: 5,
  xl: 5,
  lg: 6,
  xs: 8,
  sm: 9,
  md: 8,
}
const responsiveSpace = {
  xxl: 8,
  xl: 8,
  lg: 7,
  xs: 2,
  sm: 4,
  md: 6,
}
const responsiveSpace1 = {
  xxl: 5,
  xl: 5,
  lg: 5,
  xs: 2,
  sm: 4,
  md: 4,
}
useEffect(()=>{
  localStorage.setItem('appId',appId)
  setPageName(localStorage.getItem('currPage'))
  if(formId !== 'new'){
    setLoading(true)
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
          // console.log(response.data.documents,formId)
          setPages(response.data.documents)
          response.data.documents.map(res=>{
            if(res.pageId == formId){
              // console.log(res)
              setDragged(res.Tabs[0].fields)
              setTabs(res.Tabs[0])
              setEnabled(res.enabled)
              setPageName(res.pageName)
              // localStorage.setItem('currApp',response.data.documents)
              localStorage.setItem('currPage',res.pageName)
              localStorage.setItem('pageType',res.type)
              // setAppData(response.data.documents)
            }
          })
          setLoading(false)
        }
      })
      .catch(error => {
        console.log(error)
      });
    }
},[appId])

useEffect(()=>{
  let parAppID = Number(appId)
  const reQBody = {
    "collection":"dev_apps",
    "database":"App-x",
    "dataSource":"Cluster0",
    "filter": {"app_id":parAppID}
  }
 
    axios.post('/api/apps/getParticularApp',reQBody,{
  })
  .then(response => {
    if(response.status === 200){
      // console.log(response.data.document)
      setPubApp(response.data.document)
      setDescription(response.data.document[0].description)
    }
  })
  .catch(error => {
    console.log(error)
  });
 },[appId])

const onLabelOK = ()=>{
    let arr=[...dragged]
    setCounter(counter+1)
    const unqId = uuid()
    arr.push({
        fieldType:type,
        labelName:labelName,
        seqNo:counter,
        controls:{
            "readOnly":"N",
            "active":"Y",
            "displayed":"N",
            "required":"Y",
            "session":"Y",
            "showinaddline":"N",
            "showninstatusbar":"N",
            "enableautocomplete": "N"
         },
         field_id:unqId
    })
    // console.log(arr)
    setDragged(arr)
    setVisible(false)
   setLabelName('')
}
// console.log(dragged)
const saveField=(item)=>{
setVisible(true)
setType(item.key)
}

const onSubmit =()=>{
  setLoading(true)
    let initial = JSON.parse(localStorage.getItem("apps")) ;
    const mainData = [...initial];
    let paId;
    let enabled;
    let tabs;
    mainData.map(res=>{
        if(res.appName === localStorage.getItem('currApp')){
           res.pages.map(pag=>{
            if(pag.pageName === localStorage.getItem('currPage')){
               pag.Tabs.map(reslt=>{
                reslt.fields=dragged
                paId=pag.pageId
                enabled=pag.enabled
               })
              tabs=pag.Tabs
            }
           })
        }
      })
      let obj={}
      obj["appName"] = localStorage.getItem('currApp')
      obj["appId"] = data.appId
      obj["pageName"] =  localStorage.getItem('currPage')
      obj["pageId"] = paId
      obj["type"] = localStorage.getItem('pageType')
      obj["Tabs"] = tabs
      obj["enabled"] = enabled
      // console.log(obj)
      localStorage.setItem("apps", JSON.stringify(mainData));
      let reQBody = {
        "collection":"dev_pages",
        "database":"App-x",
        "dataSource":"Cluster0",
        "document":obj
      }
        axios.post('/api/apps/createPage',reQBody,{
      })
      .then(response => {
        if(response.status === 200){
          // console.log("response=============>",response)
          setLoading(false)
          setDisable(true)
          router.push(`/developer/apps/${appId}/pages/form/${paId}`)
        }
        // do something with the response data
      })
      .catch(error => {
        // handle the error
      });
}
const update =()=>{
  setLoading(true)
  tabs.fields=dragged
  let obj={}
    obj["appName"] = localStorage.getItem('currApp')
    obj["appId"] = appId
    obj["pageName"] =  localStorage.getItem('currPage')
    obj["pageId"] = formId
    obj["type"] = localStorage.getItem('pageType')
    obj["Tabs"] = [tabs]
    obj["enabled"] = enabled
  // console.log('==============>obj',obj)
  let pagId = Number(formId)
  const reQBody = {
    "collection":"dev_pages",
    "database":"App-x",
    "dataSource":"Cluster0",
    "filter": {"pageId":pagId},
    "update":{
      "$set":obj
      }
  }
    axios.post('/api/apps/updatePage',reQBody,{
  })
  .then(response => {
    if(response.status === 200){
      // console.log("response=============>",response)
      setLoading(false)
    }
  })
  .catch(error => {
   
    console.log(error)
  }); 
}

const onPublish = () =>{
  setLoading(true)
  // console.log(appId,pubApp)
  let reQBody = {
    "collection":"ntn_apps",
    "database":"App-x",
    "dataSource":"Cluster0",
    "document":pubApp
  }
    axios.post('/api/apps/upsertApp',reQBody,{
  })
  .then(response => {
    if(response.status === 200){
      console.log("response=============>",response)
    }
    
  })
  .catch(error => {
    console.log(error)
  });
  let reQbody = {
    "collection":"ntn_pages",
    "database":"App-x",
    "dataSource":"Cluster0",
    "document":{pages}
  }
    axios.post('/api/apps/createPage',reQbody,{
  })
  .then(response => {
    if(response.status === 200){
      // console.log("response=============>",response)
      setLoading(false)
    }
    
  })
  .catch(error => {
    console.log(error)
  });
}
  return (
    <Spin indicator={<LoadingOutlined  style={{ fontSize: "55px", color: "#0C173A" }} />} spinning={loading}>
        <Row style={{height:'60px',backgroundColor:'white'}}>
          <Col style={{top:'1em',left:'1em'}} span={3}>
            <Link href='/'>
            <Image preview={false} src='/images/cwlogo.svg' alt=''/>
            </Link>
          </Col>
          <Col {...responsiveSpace}/>
          <Col style={{top:'1em'}} span={3}>
            <span style={{fontFamily:'Inter'}}>Page:{pageName} <Image src='/images/downArrow.svg' alt=''/> </span>
          </Col>
          <Col {...responsiveSpace1}/>
          <Col style={{top:'1em'}} {...responsiveBar}>
          <span>
            <Image preview={false} src='/images/pubArrow.png' alt=''/> &nbsp;
            <Button onClick={()=>onPublish({appId:appId})} style={{backgroundColor:'#0C173A',color:'white',border:'none',fontFamily:'Roboto',fontWeight:600,width:'35%',height:'35px',borderRadius:'4px'}}>Publish</Button>
             &nbsp;&nbsp;
          <Image preview={false} style={{borderRadius:'100px'}} src='/images/Avatar.png' alt='' /> &nbsp;
            <span style={{fontWeight:600,fontFamily:'Inter',fontSize:'15px'}}>Rachel Green</span>
            </span>
          </Col>
        </Row>
        <br/>
        <Row justify='space-evenly' style={{margin:'0px 10px'}}>
            <Col span={4} style={{backgroundColor:"white"}}>
                <Menu>
                          <Menu.Item key='input' onClick={(item)=>{saveField(item)}} style={{fontFamily:'Inter'}}>Input</Menu.Item>
                          <Menu.Item key='switch' onClick={(item)=>{saveField(item)}} style={{fontFamily:'Inter'}}>Switch</Menu.Item>
                          <Menu.Item key='checkbox' onClick={(item)=>{saveField(item)}} style={{fontFamily:'Inter'}}>Checkbox</Menu.Item>
                          <Menu.Item key='date' onClick={(item)=>{saveField(item)}} style={{fontFamily:'Inter'}}>Date</Menu.Item>
                </Menu>
            </Col>
            <Col span={19} style={{marginLeft:''}}>
                    <Row >
                        <Col span={7}/>
                        <Col span={17}>
                        <Menu mode='horizontal' style={{backgroundColor:'transparent',border:'none'}}>
                <Menu.Item style={{fontFamily:'Inter'}}>Design</Menu.Item>
                    <Menu.Item style={{fontFamily:'Inter'}}>Workflow</Menu.Item>
                    <Menu.Item style={{fontFamily:'Inter'}}>Settings</Menu.Item>
                </Menu>
                        </Col>
                    </Row>
                    <Card style={{marginTop:'0.5em'}}>
                    <Form layout='vertical'>
                      {formId === 'new' && disable == false ? 
                        <Row style={{float:'right'}}>
                            <Button disabled={disable} onClick={onSubmit} style={{backgroundColor:'#0C173A',color:'white',border:'none',fontFamily:'Roboto',fontWeight:600,width:'',height:'35px',borderRadius:'4px'}}>Submit</Button>
                        </Row> : 
                        <Row style={{float:'right'}}>
                            <Button onClick={update} style={{backgroundColor:'#0C173A',color:'white',border:'none',fontFamily:'Roboto',fontWeight:600,width:'',height:'35px',borderRadius:'4px'}}>Update</Button>
                        </Row>}
                    <Row style={{}} gutter={8}>
                          {dragged?.map(res=>{
                            return(
                            res.fieldType === 'input' ? 
                            <Col span={10}>
                            <Form.Item label={<span style={{fontFamily:'Inter',fontWeightr:400,opacity:0.5}}>{res.labelName}</span>}>
                                <Input/>
                            </Form.Item>
                            </Col>:
                            res.fieldType === 'checkbox' ? 
                            <Col span={10}>
                            <Form.Item label={<span style={{fontFamily:'Inter',fontWeightr:400,opacity:0.5}}>{res.labelName}</span>}>
                                <Checkbox/>
                            </Form.Item>
                            </Col>:
                            res.fieldType === 'date' ? 
                            <Col span={10}>
                            <Form.Item label={<span style={{fontFamily:'Inter',fontWeightr:400,opacity:0.5}}>{res.labelName}</span>}>
                                <DatePicker/>
                            </Form.Item>
                            </Col>:
                            res.fieldType === 'switch' ? 
                            <Col span={10}>
                            <Form.Item label={<span style={{fontFamily:'Inter',fontWeightr:400,opacity:0.5}}>{res.labelName}</span>}>
                                <Switch/>
                            </Form.Item>
                            </Col>:''
                            )
                          })}
                          
                    </Row>
                    </Form>
                    </Card>
            </Col>
        </Row>
        {/* <Button onClick={update}>update</Button> */}
        <Modal open={visible}
         onCancel={()=>setVisible(false)}
         title="Label Name"
         okText='Save'
         onOk={onLabelOK}>
         <Input value={labelName} onChange={(e)=>setLabelName(e.target.value)} placeholder='Enter labelname...'/>
        </Modal>
    </Spin>
  )
}
