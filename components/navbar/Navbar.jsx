import React,{useState,useEffect} from 'react';
import {Menu,Row,Col,Select,Popover,Dropdown} from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import "antd/dist/antd.css";

export default function Navbar() {
  const router = useRouter()
  const [data,setData] = useState()
  const [selectedKey,setSelectedKey] = useState('')
  useEffect(()=>{
    const reQBody = {
      "collection":"ntn_apps",
      "database":"App-x",
      "dataSource":"Cluster0"
    }
      axios.post('/api/apps/getApps',reQBody,{
    })
    .then(response => {
      if(response.status === 200){
        let data = response.data
        console.log(data.documents)
        setData(data.documents)
      }
    })
    .catch(error => {
      console.log(error)
    });
  },[])

const onAppMenu = (key) =>{
  console.log(key)
  let appId = key.key
  setSelectedKey(appId)
  // const reQBody = {
  //   "collection":"dev_pages",
  //   "database":"App-x",
  //   "dataSource":"Cluster0",
  //   "filter": {"appId":`${appId}`}
  // }
  //   axios.post('/api/apps/getPages',reQBody,{
  // })
  // .then(response => {
  //   if(response.status === 200){
  //     // console.log(JSON.st(response.data.documents))
  //     localStorage.setItem("pages",JSON.stringify(response.data.documents))
  //   }
  // })
  // .catch(error => {
  //   console.log(error)
  // });
  router.push(`/developer/apps/${appId}`)
  const appName = key.name
  localStorage.setItem("currApp",appName)
  
}

    const responsiveDesignNew = {
        xxl: 24,
        xl: 24,
        lg: 24,
        xs: 24,
        sm: 24,
        md: 24,
      };
    
      const responsiveDesignForColumn = {
        xxl: 8,
        xl: 8,
        lg: 8,
        xs: 8,
        sm: 7,
        md: 8,
      };
    
      const responsiveSearch = {
        xxl: 8,
        xl: 8,
        lg: 8,
        xs: 6,
        sm: 6,
        md: 8,
      };
      const globalSearch = {
        xxl: 7,
        xl: 7,
        lg: 7,
        xs: 10,
        sm: 10,
        md: 8,
      };
    
      const responsiveSearch1 = {
        xxl: 14,
        xl: 14,
        lg: 14,
        xs: 20,
        sm: 12,
        md: 8,
      };
    
      const responsiveToggle = {
        xxl: 24,
        xl: 24,
        lg: 24,
        xs: 0,
        sm: 0,
        md: 24,
      };
    
      const responsiveIcons = {
        xxl: 2,
        xl: 2,
        lg: 2,
        xs: 0,
        sm: 0,
        md: 0,
      };
    
      const responsiveUserText = {
        xxl: 7,
        xl: 7,
        lg: 9,
        xs: 0,
        sm: 0,
        md: 0,
      };
    
      const responsiveUserIcon = {
        xxl: 0,
        xl: 0,
        lg: 0,
        xs: 12,
        sm: 12,
        md: 6,
      };
    
      const responsiveUserIconDown = {
        xxl: 0,
        xl: 0,
        lg: 0,
        xs: 16,
        sm: 16,
        md: 12,
      };
    
      const responsiveSpace = {
        xxl: 11,
        xl: 11,
        lg: 8,
        xs: 0,
        sm: 0,
        md: 0,
      };
  return (
    <div>
      <Row style={{height:'39px',paddingBottom:'2px'}}>
      <Col span={24}>
        <Menu style={{color:"white",backgroundColor:"#0C173A",height:'39px',fontFamily:'Inter',fontWeight:'600'}} mode='horizontal'>
          
            <Menu.Item key={1}>Point of Sale</Menu.Item>
            <Menu.Item key={2}>Noton</Menu.Item>
            <Menu.Item key={3}>Finance</Menu.Item>
        </Menu>
       </Col>
     </Row>
     <Row justify="space-between" style={{height:"65px",backgroundColor:"#FFFFFF",paddingTop:'12px'}}>
        <Col {...responsiveDesignForColumn}>
          <Row>
          <Col {...responsiveSearch1} style={{ marginTop: "-2px" }}>
           
                    <img
                      onClick={()=>{router.push('/')}}
                      style={{ cursor: "pointer",width:'65%',paddingLeft:'7%'}}
                      src="/images/cwlogo.svg"
                      alt="Logo"
                    />
            </Col>
          </Row>
        </Col>
        <Col {...globalSearch} >
            <Select
            className="global-sel"
            showSearch
            style={{ width: "100%" ,padding:0,borderRadius:'5px',borderColor:'#D7DADE',border:'0.5px'}}
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
          
        </Col>
        <Col {...responsiveSearch}>
          <Row justify='space-between'>
            <Col {...responsiveSpace} />
            <Col {...responsiveIcons} style={{ textAlign: "right"}}>
            <img src="/images/mail.svg" alt='' style={{cursor:'pointer'}} />
            </Col>
            <Col {...responsiveIcons} style={{ textAlign: "right" }}>
            <Popover
                className="favouritesPopup"
                title={<p style={{ paddingBottom: "0px", marginBottom: "0px", textAlign: "center" }}>Favourites</p>}
                placement="bottom"
                style={{top:'50px'}}
                // content={favMenuContent}
                // visible={favouritesVisible}
                // onVisibleChange={handleFavouritesChange}
              >
             <img src="/images/star.svg" alt='' style={{cursor:'pointer'}} />
            </Popover>
            </Col>
            <Col {...responsiveIcons} style={{ textAlign: "right"}}>
            <img src="/images/setting.svg" alt='' style={{cursor:'pointer'}} />&nbsp;&nbsp;
            </Col>
            <Col {...responsiveUserText} style={{ textAlign: "center",marginTop:'2px',flexBasis:"fit-content"}}>
              <Popover  placement="topRight" arrowPointAtCenter>
                <span style={{color:'#0C173A',whiteSpace:"nowrap",fontFamily:'Inter',fontWeight:600,fontWeight:'bold',textAlign:'right'}}>
                  Rachel Green&nbsp; &nbsp;&nbsp;
                  {/* <img src={DownArrow} width="11px" preview={false} /> */}
                </span>
              </Popover>
            </Col>
            <Col {...responsiveUserIconDown} />
            {/* <Col {...responsiveUserIcon} style={{ textAlign: "right", marginTop: "-10px" }}>
              <Dropdown trigger={["click"]} >
                <img style={{ cursor: "pointer",backgroundColor:'#FFFFFF' }} src={MoreNavs} preview={false} />
              </Dropdown>
            </Col>
            <Col {...responsiveUserIcon} style={{ textAlign:"center", marginTop: "-10px" }}>
              <Popover  trigger="click" placement="topRight">
                <img style={{ cursor: "pointer",backgroundColor:'#FFFFFF' }} src={UserIcon} preview={false} />
              </Popover>
            </Col> */}
          </Row>
        </Col>
      </Row>
      <Row style={{height:'25px'}}>
      <Col {...responsiveToggle}>
      <Menu selectedKeys={selectedKey}  className="secondMenu" style={{backgroundColor: "white",lineHeight:'36px', height:"22px",fontFamily:'Inter',fontWeight:400,alignItems:"center",opacity:'100%',borderBottom:'none'}} mode="horizontal">
      {data?.map(res=>{
        return (
               <Menu.Item onClick={()=>onAppMenu({name:res.app_name,key:res.app_id})} style={{marginTop:'-19px'}} key={res.app_id}>{res.app_name}</Menu.Item>
               )
      })}
       <Menu.Item style={{marginTop:'-19px'}} key={6}>Developer</Menu.Item>
      </Menu>
      </Col>
      </Row>
    </div>
  )
}
