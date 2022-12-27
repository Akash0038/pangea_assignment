// S_no: 1
// acv: 2724
// line_of_business: "LOB-2"
// month: "April"
// product: "Product - 17"
// revenue: 6.2
// revenue_type: "Revenue Type -11"
// tcv: 2724
// year: 2020

// need to plot acv against month
// filters are product, revenue_type, month

import './App.css'
import { useEffect, useState } from 'react'
import { ChartView } from './components/chart/chartView'
import { Container, Form, Menu, Segment } from 'semantic-ui-react'
import { CustomTable } from './components/table'

function App() {

  const [apiData, setApiData] = useState([])
  const [revenueTypeOptions, setRevenueTypeOptions] = useState([])

  const [selectedRevenueTypes, setSelectedRevenueTypes] = useState([])

  const fetchData = () => {
    fetch("http://fetest.pangeatech.net/data")
      .then(res => {
        res.json().then(jsonRes => {
          if (jsonRes && jsonRes.length) {
            let tempRevenueTypeOptions = []
            setApiData([...jsonRes])
            
            jsonRes.map((d, index) => {
              if(!revenueTypeOptions.includes(d.revenue_type)) {
                tempRevenueTypeOptions.push({
                  text: d.revenue_type,
                  value: d.revenue_type,
                  key: `revenue_type_${index}`
                })
              }
            })

            setRevenueTypeOptions([...tempRevenueTypeOptions])
          }
        })
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className='App'>
        <Menu size='large' style={{backgroundColor: "#094a81", borderRadius: "0px"}}>
          <Menu.Item style={{color: "#ffffff"}}>Hi User !</Menu.Item>
          <Menu.Item style={{color: "#ffffff"}} position='right'>
            <Form>
              <Form.Field>
                <Form.Select
                  multiple
                  options={revenueTypeOptions}
                  placeholder="All Revenue Types"
                  onChange={(_e, {value}) => setSelectedRevenueTypes([...value])}
                />
              </Form.Field>
            </Form>
          </Menu.Item>
        </Menu>
        <Container>
          <Segment>
            <ChartView
              apiData={apiData}
              selectedRevenueTypesHome={selectedRevenueTypes}
            />
          </Segment>
          <Segment>
            <div className='scrollable_table_parent'>
              <CustomTable
                records={apiData}
                selectedRevenueTypesHome={selectedRevenueTypes}
              />
            </div>
          </Segment>
        </Container>
      </div>
    </>
  )
}

export default App
