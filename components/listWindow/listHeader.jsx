import React from 'react'
import { Row,Col,Input,AutoComplete,Image,Button} from 'antd'
import windowDef from '../JSON/window.JSON';
import { useRouter } from 'next/router'

export default function ListWindowHeader(props) {
  const {selectedRowKeys,treeSearchInput,setTreeSearchInput} =props;
  const router = useRouter();
  const getSearchTreeData = (e) => {
    const searchValue = e.target.value;
    setTreeSearchInput(searchValue);
  };
  return (
    <div>
      <br/>
      <Row>
        <Col span={5}>
        <AutoComplete style={{ width: "100%" }}>
            <Input
                placeholder="Search..."
                value={treeSearchInput}
                onChange={getSearchTreeData}
                style={{ border: "0.25px solid #D7DADE" }}
                prefix={<Image src='/images/searchIcon.svg' />}
              />
            </AutoComplete>
        </Col>
        <Col span={6}/>
        <Col span={11}>
        <div className='flex-spread'>
          <Button style={{padding:0}} color="primary" className='listActionButtons'>
            <Image style={{ paddingBottom: "6px", width: "20px" }} src='/images/settingIcon.svg' alt="invoice" />
          </Button>
        
          <Button style={{padding:0}} color="primary" className='listActionButtons'>
            <Image style={{ paddingBottom: "6px", width: "12px" }} src='/images/filter.svg' alt="invoice" />
          </Button>
       {windowDef.Form.enabled.enableedit === "Y" && selectedRowKeys.length === 1 ?
          <Button  style={{padding:0}} color="primary" className='listActionButtons'>
            <Image style={{ paddingBottom: "6px", width: "12px" }} src='/images/edit.svg' alt="invoice" />
          </Button>:null}
       {/* {console.log(windowDef.Form.enabled[0].enableedit)} */}
          <Button style={{padding:0}} color="primary" className='listActionButtons'>
            <Image style={{ paddingBottom: "6px", width: "12px" }} src='/images/trash.svg' alt="invoice" />
          </Button>
       
          <Button style={{padding:0}} color="primary" className='listActionButtons'>
            <Image style={{ paddingBottom: "6px", width: "17px" }} src='/images/print.svg' alt="invoice" />
          </Button>
        
          <Button style={{padding:0}} color="primary" className='listActionButtons'>
            <Image style={{ paddingBottom: "6px", width: "12px" }} src='/images/trash.svg' alt="invoice" />
          </Button>
          </div>
        </Col>
        <Col span={2} style={{display:windowDef.Form.enabled.enablenew ?'block':'none'}}>
        <Button onClick={()=>{router.push(`/form1/NEWRECORD`)}}  style={{height:'33px',width:'100%',border:'0.5px solid #8AAD30',backgroundColor:'#A0C838',borderRadius:'2px',boxShadow:'-1px -1px 3px #00000029',opacity:1,letterSpacing:'0.28px',font: 'normal normal medium 14px/19px Roboto',color:'#FFFFFF'}}>
           New
        </Button>
        </Col>
      </Row>
    </div>
  )
}
