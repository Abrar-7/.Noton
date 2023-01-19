import React,{useEffect, useState} from 'react'
import {Row,Col,Card,Select, Button,Modal, Input,Form,Image,Spin} from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import {LoadingOutlined} from '@ant-design/icons'
// import Image from 'next/image';

export default function AppPage() {
    const [visible,setVisible] = useState(false)
    const [apps,setApps] = useState([])
    const [data,setData] = useState()
    const [appName,setAppName] = useState()
    const [description,setDescription] = useState()
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();
    const { TextArea } = Input;
    const [form] = Form.useForm()
 
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
          // console.log(response.data.documents)
          setData(response.data.documents)
          setLoading(false)
        }
      })
      .catch(error => {
        console.log(error)
      });
     },[])

    const responsiveAppCard = {
        xxl: 4,
        xl: 4,
        lg: 4,
        xs: 12,
        sm: 8,
        md: 6,
    }

    const createApp  = () =>{
      let val =form.getFieldsValue(true)
      const random = Math.floor(1000 + Math.random() * 9000);
      // console.log(random);
      setLoading(true)
      let reQBody = {
        "collection":"dev_apps",
        "database":"App-x",
        "dataSource":"Cluster0",
        "document":{
        "app_name":val.appName,
        "app_id":random,
        "description":val.description,
        "devloper_id":"4",
        "is_app_published":"N"
        }
      }
        axios.post('/api/apps/upsertApp',reQBody,{
      })
      .then(response => {
        if(response.status === 200){
          form.resetFields()
          let data = JSON.parse(response.config.data)
          router.push(`/developer/apps/${data.document.app_id}`)
          // console.log(val)
          localStorage.setItem('currApp',val.appName)
          let arr =[...apps];
          arr.push({
            appName:val.appName,
            appId:data.document.app_id,
            description:val.description,
            pages:[]
          })
          setApps(arr)
          localStorage.setItem('apps',JSON.stringify(arr))
          setVisible(false)
        }
        // console.log("response=============>",response)
      })
      .catch(error => {
        // handle the error
      });
    }

    const onEditApp = (e) => {
    //  console.log(e)
     setVisible(true)
     data.map(res=>{
      if(res.app_id === e){
        setDescription(res.description)
        setAppName(res.app_name)
      }
     })
    }

    // const onAppMenu = (key) =>{
    //   console.log(key)
    //   localStorage.setItem("currApp",key.name)
    //   let appId = key.key
    //   setSelectedKey(appId)
    //   router.push(`/developer/apps/${appId}`)
    // }
  return (
    <Spin indicator={<LoadingOutlined  style={{ fontSize: "55px", color: "#0C173A" }} />} spinning={loading}>
              <div style={{backgroundImage:`url(/images/appBackground.svg)`,height:'100px',margin:'12px 17px 0px 17px'}}>
           <Row>
          <Col span={20} style={{fontFamily:'Inter',fontWeight:'600',fontSize:'20px',paddingTop:'17px',paddingLeft:'15px'}}>
            My Apps
          </Col>
          <Col span={4}>
            <Button onClick={()=>{setVisible(true)}} style={{backgroundColor:'#0C173A',color:'white',fontFamily:'Roboto',fontWeight:'bold',float:'right',marginTop:'20px',border:"none",borderRadius:"4px",marginRight:'15px'}}>
              Create New App
            </Button>
          </Col>
          </Row>
          <Row>
        <Select
            showSearch
            style={{ width: "33%" ,padding:"2px 0px 0px 17px",borderRadius:'5px',borderColor:'#D7DADE',border:'0.5px'}}
            value={null}
            // onSelect={selectMenuToNavigate}
            placeholder={
              <Row>
                <Col style={{ textAlign: "right" }} span={1}>
                  <img src="/images/searchIcon.svg" alt='' style={{opacity:0.83}}/>
                </Col>
                <Col span={23} style={{color:'#868B8F',width:'100%',fontFamily:'Inter',paddingLeft:11,textAlign:'left',fontWeight:400}}>Search......</Col>
              </Row>
            }
            showArrow={false}
            // className="search-arrow placeHolder"
          >
           
          </Select>
        </Row>
        </div>
        <Row gutter={16} style={{margin:"10px 12px 10px 12px"}}>
             {data?.map(res=>{
              return(
                  <Col {...responsiveAppCard}>
                <Card onClick={()=>onAppMenu({name:res.app_name,key:res.app_id})} className='appCard' style={{height:'220px',borderRadius:'5px',cursor:'pointer'}}>
                  <Image preview={false} width='100%' height={110} src='/images/appImg.png' alt=''/>
                  <p style={{font:' 14px Inter',fontWeight:500,paddingTop:'5px'}}>{res.app_name}</p>
                  {/* <p style={{font:"12px Inter",fontWeight:400}}>Date created: 29-12-2022</p> */}
                  <div className='maxIcon' style={{marginTop:'-22px',float:'right',background:'transparent'}}>
                  <Button onClick={(e)=>{onEditApp({appId:res.app_id}); e.stopPropagation() }} style={{borderRadius:'7px'}}>
                    <img  src='/images/editPen.svg' alt=''/> 
                 </Button>
                 {" "}
                 <Button style={{borderRadius:'7px'}}>
                    <img src='/images/gear.svg' alt=''/> 
                 </Button>
                 </div>
                </Card>
                </Col> 
                )
              })}
              
                {/* <Col {...responsiveAppCard}>
                <Card className='appCard' style={{height:'220px',borderRadius:'5px'}}>
                <Image preview={false} width='100%' height={110} src='/images/appImg.png' alt=''/>
                <p style={{font:' 14px Inter',fontWeight:500,paddingTop:'5px'}}>Inventory Checker</p>
                  <p style={{font:"12px Inter",fontWeight:400}}>Date created: 29-12-2022</p>
                  <div className='maxIcon' style={{marginTop:'-22px',float:'right',background:'transparent'}}>
                  <Button style={{borderRadius:'7px'}}>
                    <img src='/images/editPen.svg' alt=''/> 
                 </Button>
                 {" "}
                 <Button style={{borderRadius:'7px'}}>
                    <img src='/images/gear.svg' alt=''/> 
                 </Button>
                 </div>
                </Card>
                </Col>
                <Col {...responsiveAppCard}>
                <Card className='appCard' style={{height:'220px',borderRadius:'5px'}}>
                <Image preview={false} width='100%' height={110} src='/images/appImg.png' alt=''/>
                <p style={{font:' 14px Inter',fontWeight:500,paddingTop:'5px'}}>Inventory Checker</p>
                  <p style={{font:"12px Inter",fontWeight:400}}>Date created: 29-12-2022</p>
                  <div className='maxIcon' style={{marginTop:'-22px',float:'right',background:'transparent'}}>
                  <Button style={{borderRadius:'7px'}}>
                    <img src='/images/editPen.svg' alt=''/> 
                 </Button>
                 {" "}
                 <Button style={{borderRadius:'7px'}}>
                    <img src='/images/gear.svg' alt=''/> 
                 </Button>
                 </div>
                </Card>
                </Col>
                <Col {...responsiveAppCard}>
                <Card className='appCard' style={{height:'220px',borderRadius:'5px'}}>
                <Image preview={false} width='100%' height={110} src='/images/appImg.png' alt=''/>
                <p style={{font:' 14px Inter',fontWeight:500,paddingTop:'5px'}}>Inventory Checker</p>
                  <p style={{font:"12px Inter",fontWeight:400}}>Date created: 29-12-2022</p>
                  <div className='maxIcon' style={{marginTop:'-22px',float:'right',background:'transparent'}}>
                  <Button style={{borderRadius:'7px'}}>
                    <img src='/images/editPen.svg' alt=''/> 
                 </Button>
                 {" "}
                 <Button style={{borderRadius:'7px'}}>
                    <img src='/images/gear.svg' alt=''/> 
                 </Button>
                 </div>
                </Card>
                </Col>
                <Col {...responsiveAppCard}>
                <Card className='appCard' style={{height:'220px',borderRadius:'5px'}}>
                <Image preview={false} width='100%' height={110} src='/images/appImg.png' alt=''/>
                <p style={{font:' 14px Inter',fontWeight:500,paddingTop:'5px'}}>Inventory Checker</p>
                  <p style={{font:"12px Inter",fontWeight:400}}>Date created: 29-12-2022</p>
                  <div className='maxIcon' style={{marginTop:'-22px',float:'right',background:'transparent'}}>
                  <Button style={{borderRadius:'7px'}}>
                    <img src='/images/editPen.svg' alt=''/> 
                 </Button>
                 {" "}
                 <Button style={{borderRadius:'7px'}}>
                    <img src='/images/gear.svg' alt=''/> 
                 </Button>
                 </div>
                </Card>
                </Col>
                <Col {...responsiveAppCard}>
                <Card className='appCard' style={{height:'220px',borderRadius:'5px'}}>
                <Image preview={false} width='100%' height={110} src='/images/appImg.png' alt=''/>
                <p style={{font:' 14px Inter',fontWeight:500,paddingTop:'5px'}}>Inventory Checker</p>
                  <p style={{font:"12px Inter",fontWeight:400}}>Date created: 29-12-2022</p>
                  <div className='maxIcon' style={{marginTop:'-22px',float:'right',background:'transparent'}}>
                  <Button style={{borderRadius:'7px'}}>
                    <img src='/images/editPen.svg' alt=''/> 
                 </Button>
                 {" "}
                 <Button style={{borderRadius:'7px'}}>
                    <img src='/images/gear.svg' alt=''/> 
                 </Button>
                 </div>
                </Card>
                </Col>                             */}
            </Row>
        <Modal 
         open={visible}
         footer={null}
         onCancel={()=>{setVisible(false)}}>
           <Spin indicator={<LoadingOutlined  style={{ fontSize: "55px", color: "#0C173A" }} />} spinning={loading}>
         <div style={{display:'flex',justifyContent:'center'}}>
            <img style={{justifyItems:"center"}} src='/images/createImg.svg' alt='' />
            </div>
            <Form name='form' form={form} layout='vertical' style={{padding:'0px 20px'}}>
            <Form.Item 
             name='appName'
             
             label={<span style={{fontWeight:400,opacity:0.5,fontSize:12,fontFamily:"Inter"}}>Name your App</span>} 
             labelCol                            >
                <Input value={appName}   style={{height:'36px'}}/>
            </Form.Item>
            <Form.Item 
            name='description'
             label={<span style={{fontWeight:400,opacity:0.5,fontSize:12,fontFamily:"Inter"}}>Add Description</span>} 
             labelCol                            >
                <TextArea  />
            </Form.Item>
            </Form>
            {/* <Link href='/developer/apps/new_app' style={{display:'flex',justifyContent:'center'}}> */}
            <Button onClick={createApp} style={{backgroundColor:'#0C173A',fontFamily:'Roboto',fontWeight:700,color:'white',width:'25%',height:'40px',borderRadius:'4px'}}>Next</Button>
            {/* </Link> */}
            </Spin>
        </Modal>
        </Spin>

  )
}
