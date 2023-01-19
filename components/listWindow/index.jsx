import React,{useState} from 'react'
import windowDefinition from '../JSON/windowDef.JSON'
import ListWindowHeader from './listHeader'
import ListWindowLines from './listLines'

export default function ListWindow() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [treeSearchInput, setTreeSearchInput] = useState('');
    // console.log(windowDefinition)
  return (
    <div style={{padding:'0px 10px'}}>
        <ListWindowHeader
         selectedRowKeys={selectedRowKeys}
         treeSearchInput={treeSearchInput}
          setTreeSearchInput={setTreeSearchInput}/>
          <br/>
        <ListWindowLines 
        selectedRowKeys={selectedRowKeys}
        treeSearchInput={treeSearchInput}
        setSelectedRowKeys={setSelectedRowKeys}
        />
    </div>
  )
}
