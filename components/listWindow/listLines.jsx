import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import windowDef from '../JSON/window.JSON';
import Data from "../JSON/data.JSON"

export default function ListWindowLines(props) {
  let dtara=[];
   Data.Data.map(res=>{
   
      dtara.push(res)
    
    
  })
  console.log(dtara)
  const router = useRouter()
    const [columnsData,setColumnsData] = useState([])
    const {setSelectedRowKeys} = props
    // console.log(windowDef)
    useEffect(()=>{
     
       let arr =[]
       windowDef.Form.Tabs[0].fields.map(con=>{
        if(con.nt_base_reference_id !=='13'){
          arr.push({
            title:con.name,
            dataIndex:con.name,
            key:con.field_id
          })}
        })
      setColumnsData(arr)
      },[])
  const dada=Data.Data
  const [rowSelectionKeys, setRowSelectionKeys] = useState([]);
  const onSelectChange = (keys, selectedRows) => {
    setRowSelectionKeys([...keys]);
    setSelectedRowKeys([...selectedRows]);
  }
  const rowSelection = {
    selectedRowKeys: rowSelectionKeys,
    onChange: onSelectChange,
    hideSelectAll: false,
    fixed: true,
  };
  return (
    <div>
        <Table
            size="small"
            scroll={{ y: "67vh", x: "100%" }}
            sticky={true}
            pagination={false}
            rowSelection={rowSelection}
            dataSource={dada}
            columns={columnsData}
            onRow={(record )=>(
               {
                onClick:()=>{
                  router.push(`/form1/${record.key}`)
                  console.log(record.key)
                }
               }
            )}
          />
    </div>
  )
}
